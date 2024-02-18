---
title: Fescar Integration with Spring Cloud In-Depth Analysis of Source Code
author: shukang.guo min.ji
date: 2019/04/15
keywords: [fescar, seata, Distributed, transaction]
---

# Fescar Integration with Spring Cloud: In-Depth Analysis of Source Code

### Fescar

Common distributed transaction approaches include XA based on 2PC (e.g., Atomikos), TCC (e.g., ByteTCC) focusing on the business layer, and transactional messaging (e.g., RocketMQ Half Message). XA is a protocol for distributed transactions that requires support from local databases. However, the resource locking at the database level can lead to poor performance. On the other hand, TCC, introduced by Alibaba as a preacher, requires a significant amount of business code to ensure transactional consistency, resulting in higher development and maintenance costs.

Distributed transactions are a widely discussed topic in the industry, and this is one of the reasons why Fescar has gained 6k stars in a short period of time. The name "Fescar" stands for Fast & Easy Commit And Rollback. In simple terms, Fescar drives global transactions by coordinating local RDBMS branch transactions. It is a middleware that operates at the application layer. The main advantages of Fescar are better performance compared to XA, as it does not occupy connection resources for a long time, and lower development cost and business invasiveness compared to TCC.

Similar to XA, Fescar divides roles into TC (Transaction Coordinator), RM (Resource Manager), and TM (Transaction Manager). The overall transaction process model of Fescar is as follows:

![Fescar事务过程](/img/blog/fescar-microservices.png)

```
1.The TM (Transaction Manager) requests the TC (Transaction Coordinator) to start a global transaction. The global transaction is successfully created, and a globally unique XID (Transaction ID) is generated.
2.The XID is propagated in the context of the microservice invocation chain.
3.The RM (Resource Manager) registers the branch transaction with the TC, bringing it under the jurisdiction of the global transaction corresponding to the XID.
4.The TM initiates a global commit or rollback resolution for the XID with the TC.
5.The TC schedules the completion of commit or rollback requests for all branch transactions under the jurisdiction of the XID.
```

In the current implementation version, the TC (Transaction Coordinator) is deployed as a separate process. It is responsible for maintaining the operation records and global lock records of the global transaction, as well as coordinating and driving the global transaction's commit or rollback. On the other hand, the TM (Transaction Manager) and RM (Resource Manager) work in the same application process as the application.

The RM manages the underlying database through proxying the JDBC data source. It uses syntax parsing to retain snapshots and generate undo logs during transaction execution. This ensures that the transaction can be rolled back to its previous state if needed.

This covers the general flow and model division of Fescar. Now, let's proceed with the analysis of Fescar's transaction propagation mechanism.

### Fescar Transaction Propagation Mechanism

The transaction propagation in Fescar includes both nested transaction calls within an application and transaction propagation across different services. So, how does Fescar propagate transactions in a microservices call chain? Fescar provides a transaction API that allows users to manually bind a transaction's XID and join it to the global transaction. Therefore, depending on the specific service framework mechanism, we can propagate the XID in the call chain to achieve transaction propagation.

The RPC request process consists of two parts: the caller and the callee. We need to handle the XID during the request and response. The general process is as follows: the caller (or the requester) retrieves the XID from the current transaction context and passes it to the callee through the RPC protocol. The callee extracts the XID from the request and binds it to its own transaction context, thereby participating in the global transaction. Common microservices frameworks usually provide corresponding Filter and Interceptor mechanisms. Now, let's analyze the integration process of Spring Cloud and Fescar in more detail.

### Partial Source Code Analysis of Fescar Integration with Spring Cloud Alibaba

This section of the source code is entirely from spring-cloud-alibaba-fescar. The source code analysis mainly includes three parts: AutoConfiguration, the microservice provider, and the microservice consumer. Regarding the microservice consumer, it can be further divided into two specific approaches: RestTemplate and Feign. For the Feign request approach, it is further categorized into usage patterns that integrate with Hystrix and Sentine.

#### Fescar AutoConfiguration

For the AutoConfiguration analysis, this section will only cover the parts related to the startup of Fescar. The analysis of other parts will be interspersed in the 'Microservice Provider' and 'Microservice Consumer' sections.

The startup of Fescar requires the configuration of GlobalTransactionScanner. The GlobalTransactionScanner is responsible for initializing Fescar's RM client, TM client, and automatically proxying classes annotated with the GlobalTransactional annotation. The startup of the GlobalTransactionScanner bean is loaded and injected through GlobalTransactionAutoConfiguration, which also injects FescarProperties.

FescarProperties contains important properties of Fescar, such as txServiceGroup. The value of this property can be read from the application.properties file using the key 'spring.cloud.alibaba.fescar.txServiceGroup', with a default value of '$\{spring.application.name}-fescar-service-group'. txServiceGroup represents the logical transaction group name in Fescar. This group name is obtained from the configuration center (currently supporting file and Apollo) to retrieve the TC cluster name corresponding to the logical transaction group name. The TC cluster's service name is then constructed based on the cluster name. The RM client, TM client, and TC interact through RPC by using the registry center (currently supporting Nacos, Redis, ZooKeeper, and Eureka) and the service name to find available TC service nodes.

#### Microservice Provider

Since the logic of the consumer is a bit more complex, let's first analyze the logic of the provider. For Spring Cloud projects, the default RPC transport protocol is HTTP, so the HandlerInterceptor mechanism is used to intercept HTTP requests.

HandlerInterceptor is an interface provided by Spring, and it has three methods that can be overridden.

```java
    /**
	 * Intercept the execution of a handler. Called after HandlerMapping determined
	 * an appropriate handler object, but before HandlerAdapter invokes the handler.
	 */
	default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		return true;
	}

	/**
	 * Intercept the execution of a handler. Called after HandlerAdapter actually
	 * invoked the handler, but before the DispatcherServlet renders the view.
	 * Can expose additional model objects to the view via the given ModelAndView.
	 */
	default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable ModelAndView modelAndView) throws Exception {
	}

	/**
	 * Callback after completion of request processing, that is, after rendering
	 * the view. Will be called on any outcome of handler execution, thus allows
	 * for proper resource cleanup.
	 */
	default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable Exception ex) throws Exception {
	}
```

According to the comments, we can clearly see the timing and common use cases of each method. For Fescar integration, it overrides the preHandle and afterCompletion methods as needed.

The purpose of FescarHandlerInterceptor is to bind the XID passed from the service chain to the transaction context of the service node and clean up related resources after the request is completed. FescarHandlerInterceptorConfiguration is responsible for configuring the interception of all URLs. This interceptor will be executed for all incoming requests to perform XID conversion and transaction binding.

```java
/**
 * @author xiaojing
 *
 * Fescar HandlerInterceptor, Convert Fescar information into
 * @see com.alibaba.fescar.core.context.RootContext from http request's header in
 * {@link org.springframework.web.servlet.HandlerInterceptor#preHandle(HttpServletRequest , HttpServletResponse , Object )},
 * And clean up Fescar information after servlet method invocation in
 * {@link org.springframework.web.servlet.HandlerInterceptor#afterCompletion(HttpServletRequest, HttpServletResponse, Object, Exception)}
 */
public class FescarHandlerInterceptor implements HandlerInterceptor {

	private static final Logger log = LoggerFactory
			.getLogger(FescarHandlerInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {

		String xid = RootContext.getXID();
		String rpcXid = request.getHeader(RootContext.KEY_XID);
		if (log.isDebugEnabled()) {
			log.debug("xid in RootContext {} xid in RpcContext {}", xid, rpcXid);
		}

		if (xid == null && rpcXid != null) {
			RootContext.bind(rpcXid);
			if (log.isDebugEnabled()) {
				log.debug("bind {} to RootContext", rpcXid);
			}
		}
		return true;
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
			Object handler, Exception e) throws Exception {

		String rpcXid = request.getHeader(RootContext.KEY_XID);

		if (StringUtils.isEmpty(rpcXid)) {
			return;
		}

		String unbindXid = RootContext.unbind();
		if (log.isDebugEnabled()) {
			log.debug("unbind {} from RootContext", unbindXid);
		}
		if (!rpcXid.equalsIgnoreCase(unbindXid)) {
			log.warn("xid in change during RPC from {} to {}", rpcXid, unbindXid);
			if (unbindXid != null) {
				RootContext.bind(unbindXid);
				log.warn("bind {} back to RootContext", unbindXid);
			}
		}
	}

}

```

The preHandle method is called before the request is executed. The xid parameter represents the unique identifier of the global transaction already bound to the current transaction context, while rpcXid represents the global transaction identifier that needs to be bound to the request and is passed through the HTTP header. In the preHandle method, it checks if there is no XID in the current transaction context and if rpcXid is not empty. If so, it binds rpcXid to the current transaction context.

The afterCompletion method is called after the request is completed and is used to perform resource cleanup actions. Fescar uses the RootContext.unbind() method to unbind the XID involved in the transaction context. The logic in the if statement is for code robustness. If rpcXid and unbindXid are not equal, it rebinds unbindXid.

For Spring Cloud, the default RPC method is HTTP. Therefore, for the provider, there is no need to differentiate the request interception method. It only needs to extract the XID from the header and bind it to its own transaction context. However, for the consumer, due to the variety of request components, including circuit breakers and isolation mechanisms, different situations need to be distinguished and handled. We will analyze this in more detail later.

#### Microservice Consumer

Fescar categorizes the request methods into RestTemplate, Feign, Feign+Hystrix, and Feign+Sentinel. Different components are automatically configured through Spring Boot's Auto Configuration. The specific configuration classes can be found in the spring.factories file, and we will also discuss the relevant configuration classes later in this document.

##### RestTemplate

Let's take a look at how Fescar passes XID if the consumer is using RestTemplate for requests.

```java
public class FescarRestTemplateInterceptor implements ClientHttpRequestInterceptor {
	@Override
	public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes,
			ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
		HttpRequestWrapper requestWrapper = new HttpRequestWrapper(httpRequest);

		String xid = RootContext.getXID();

		if (!StringUtils.isEmpty(xid)) {
			requestWrapper.getHeaders().add(RootContext.KEY_XID, xid);
		}
		return clientHttpRequestExecution.execute(requestWrapper, bytes);
	}
}
```

The FescarRestTemplateInterceptor implements the intercept method of the ClientHttpRequestInterceptor interface. It wraps the outgoing request and, if there is an existing Fescar transaction context XID, retrieves it and adds it to the HTTP headers of the request.

FescarRestTemplateInterceptor is configured in RestTemplate through FescarRestTemplateAutoConfiguration.

```java
@Configuration
public class FescarRestTemplateAutoConfiguration {

	@Bean
	public FescarRestTemplateInterceptor fescarRestTemplateInterceptor() {
		return new FescarRestTemplateInterceptor();
	}

	@Autowired(required = false)
	private Collection<RestTemplate> restTemplates;

	@Autowired
	private FescarRestTemplateInterceptor fescarRestTemplateInterceptor;

	@PostConstruct
	public void init() {
		if (this.restTemplates != null) {
			for (RestTemplate restTemplate : restTemplates) {
				List<ClientHttpRequestInterceptor> interceptors = new ArrayList<ClientHttpRequestInterceptor>(
						restTemplate.getInterceptors());
				interceptors.add(this.fescarRestTemplateInterceptor);
				restTemplate.setInterceptors(interceptors);
			}
		}
	}

}
```

The init method iterates through all the RestTemplate instances, retrieves the original interceptors from each RestTemplate, adds the fescarRestTemplateInterceptor, and then reorders the interceptors.

##### Feign

![Feign 类关系图](/img/blog/20190305184812.png)

Next, let's take a look at the code related to Feign. There are quite a few classes in this package, so let's start with its AutoConfiguration.

```java
@Configuration
@ConditionalOnClass(Client.class)
@AutoConfigureBefore(FeignAutoConfiguration.class)
public class FescarFeignClientAutoConfiguration {

	@Bean
	@Scope("prototype")
	@ConditionalOnClass(name = "com.netflix.hystrix.HystrixCommand")
	@ConditionalOnProperty(name = "feign.hystrix.enabled", havingValue = "true")
	Feign.Builder feignHystrixBuilder(BeanFactory beanFactory) {
		return FescarHystrixFeignBuilder.builder(beanFactory);
	}

	@Bean
	@Scope("prototype")
	@ConditionalOnClass(name = "com.alibaba.csp.sentinel.SphU")
	@ConditionalOnProperty(name = "feign.sentinel.enabled", havingValue = "true")
	Feign.Builder feignSentinelBuilder(BeanFactory beanFactory) {
		return FescarSentinelFeignBuilder.builder(beanFactory);
	}

	@Bean
	@ConditionalOnMissingBean
	@Scope("prototype")
	Feign.Builder feignBuilder(BeanFactory beanFactory) {
		return FescarFeignBuilder.builder(beanFactory);
	}

	@Configuration
	protected static class FeignBeanPostProcessorConfiguration {

		@Bean
		FescarBeanPostProcessor fescarBeanPostProcessor(
				FescarFeignObjectWrapper fescarFeignObjectWrapper) {
			return new FescarBeanPostProcessor(fescarFeignObjectWrapper);
		}

		@Bean
		FescarContextBeanPostProcessor fescarContextBeanPostProcessor(
				BeanFactory beanFactory) {
			return new FescarContextBeanPostProcessor(beanFactory);
		}

		@Bean
		FescarFeignObjectWrapper fescarFeignObjectWrapper(BeanFactory beanFactory) {
			return new FescarFeignObjectWrapper(beanFactory);
		}
	}

}
```

The FescarFeignClientAutoConfiguration is enabled when the Client.class exists and requires it to be applied before FeignAutoConfiguration. Since FeignClientsConfiguration is responsible for generating the FeignContext and is enabled by FeignAutoConfiguration, based on the dependency relationship, FescarFeignClientAutoConfiguration is also applied before FeignClientsConfiguration.

FescarFeignClientAutoConfiguration customizes the Feign.Builder and adapts it for feign.sentinel, feign.hystrix, and regular feign cases. The purpose is to customize the actual implementation of the Client in Feign to be FescarFeignClient.

```java
HystrixFeign.builder().retryer(Retryer.NEVER_RETRY)
      .client(new FescarFeignClient(beanFactory))
```

```java
SentinelFeign.builder().retryer(Retryer.NEVER_RETRY)
				.client(new FescarFeignClient(beanFactory));
```

```java
Feign.builder().client(new FescarFeignClient(beanFactory));
```

FescarFeignClient is an enhancement of the original Feign client proxy.

```java
public class FescarFeignClient implements Client {

	private final Client delegate;
	private final BeanFactory beanFactory;

	FescarFeignClient(BeanFactory beanFactory) {
		this.beanFactory = beanFactory;
		this.delegate = new Client.Default(null, null);
	}

	FescarFeignClient(BeanFactory beanFactory, Client delegate) {
		this.delegate = delegate;
		this.beanFactory = beanFactory;
	}

	@Override
	public Response execute(Request request, Request.Options options) throws IOException {

		Request modifiedRequest = getModifyRequest(request);

		try {
			return this.delegate.execute(modifiedRequest, options);
		}
		finally {

		}
	}

	private Request getModifyRequest(Request request) {

		String xid = RootContext.getXID();

		if (StringUtils.isEmpty(xid)) {
			return request;
		}

		Map<String, Collection<String>> headers = new HashMap<>();
		headers.putAll(request.headers());

		List<String> fescarXid = new ArrayList<>();
		fescarXid.add(xid);
		headers.put(RootContext.KEY_XID, fescarXid);

		return Request.create(request.method(), request.url(), headers, request.body(),
				request.charset());
	}

```

In the above process, we can see that FescarFeignClient modifies the original Request. It first retrieves the XID from the current transaction context and, if the XID is not empty, adds it to the request's header.

FeignBeanPostProcessorConfiguration defines three beans: FescarContextBeanPostProcessor, FescarBeanPostProcessor, and FescarFeignObjectWrapper. FescarContextBeanPostProcessor and FescarBeanPostProcessor both implement the Spring BeanPostProcessor interface.

Here is the implementation of FescarContextBeanPostProcessor

```java
    @Override
	public Object postProcessBeforeInitialization(Object bean, String beanName)
			throws BeansException {
		if (bean instanceof FeignContext && !(bean instanceof FescarFeignContext)) {
			return new FescarFeignContext(getFescarFeignObjectWrapper(),
					(FeignContext) bean);
		}
		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName)
			throws BeansException {
		return bean;
	}
```

The two methods in BeanPostProcessor allow for pre- and post-processing of beans in the Spring container. The postProcessBeforeInitialization method is called before initialization, while the postProcessAfterInitialization method is called after initialization. The return value of these methods can be the original bean instance or a wrapped instance using a wrapper.

FescarContextBeanPostProcessor wraps FeignContext into FescarFeignContext. FescarBeanPostProcessor wraps FeignClient into FescarLoadBalancerFeignClient and FescarFeignClient, depending on whether it inherits from LoadBalancerFeignClient.

In FeignAutoConfiguration, the FeignContext does not have any ConditionalOnXXX conditions. Therefore, Fescar uses a pre-processing approach to wrap FeignContext into FescarFeignContext.

```java
    @Bean
	public FeignContext feignContext() {
		FeignContext context = new FeignContext();
		context.setConfigurations(this.configurations);
		return context;
	}
```

For Feign Clients, the FeignClientFactoryBean retrieves an instance of FeignContext. For custom Feign Client objects configured by developers using the @Configuration annotation, they are configured into the builder, which causes the enhanced FescarFeignClient in FescarFeignBuilder to become ineffective. The key code in FeignClientFactoryBean is as follows

```java
	/**
	 * @param <T> the target type of the Feign client
	 * @return a {@link Feign} client created with the specified data and the context information
	 */
	<T> T getTarget() {
		FeignContext context = applicationContext.getBean(FeignContext.class);
		Feign.Builder builder = feign(context);

		if (!StringUtils.hasText(this.url)) {
			if (!this.name.startsWith("http")) {
				url = "http://" + this.name;
			}
			else {
				url = this.name;
			}
			url += cleanPath();
			return (T) loadBalance(builder, context, new HardCodedTarget<>(this.type,
					this.name, url));
		}
		if (StringUtils.hasText(this.url) && !this.url.startsWith("http")) {
			this.url = "http://" + this.url;
		}
		String url = this.url + cleanPath();
		Client client = getOptional(context, Client.class);
		if (client != null) {
			if (client instanceof LoadBalancerFeignClient) {
				// not load balancing because we have a url,
				// but ribbon is on the classpath, so unwrap
				client = ((LoadBalancerFeignClient)client).getDelegate();
			}
			builder.client(client);
		}
		Targeter targeter = get(context, Targeter.class);
		return (T) targeter.target(this, builder, context, new HardCodedTarget<>(
				this.type, this.name, url));
	}
```

The above code determines whether to make a direct call to the specified URL or use load balancing based on whether the URL parameter is specified in the annotation. The targeter.target method creates the object through dynamic proxy. The general process is as follows: the parsed Feign methods are stored in a map, and then passed as a parameter to generate the InvocationHandler, which in turn generates the dynamic proxy object.

The presence of FescarContextBeanPostProcessor ensures that even if developers customize operations on FeignClient, the enhancement of global transactions required by Fescar can still be achieved.

As for FescarFeignObjectWrapper, let's focus on the Wrapper method:

```java
	Object wrap(Object bean) {
		if (bean instanceof Client && !(bean instanceof FescarFeignClient)) {
			if (bean instanceof LoadBalancerFeignClient) {
				LoadBalancerFeignClient client = ((LoadBalancerFeignClient) bean);
				return new FescarLoadBalancerFeignClient(client.getDelegate(), factory(),
						clientFactory(), this.beanFactory);
			}
			return new FescarFeignClient(this.beanFactory, (Client) bean);
		}
		return bean;
	}
```

In the wrap method, if the bean is an instance of LoadBalancerFeignClient, it first retrieves the actual Client object that the LoadBalancerFeignClient proxies using the client.getDelegate() method. It then wraps the Client object into FescarFeignClient and generates a subclass of LoadBalancerFeignClient called FescarLoadBalancerFeignClient. If the bean is an instance of Client and not FescarFeignClient or LoadBalancerFeignClient, it is directly wrapped and transformed into FescarFeignClient.

The above process design is quite clever. It controls the order of configuration based on Spring Boot's Auto Configuration and customizes the Feign Builder bean to ensure that all Clients are enhanced with FescarFeignClient. It also wraps the beans in the Spring container using BeanPostProcessor, ensuring that all beans in the container are enhanced with FescarFeignClient, thus avoiding the replacement action in the getTarget method of FeignClientFactoryBean.

##### Hystrix Isolation

Now let's take a look at the Hystrix part. Why do we separate Hystrix and implement a separate strategy class in Fescar? Currently, the default implementation of the transaction context RootContext is based on ThreadLocal, which means the context is bound to the thread. Hystrix itself has two isolation modes: semaphore-based isolation and thread pool-based isolation. Hystrix officially recommends using thread pool isolation for better separation, which is the commonly used mode:

```
Thread or Semaphore
The default, and the recommended setting, is to run HystrixCommands using thread isolation (THREAD) and HystrixObservableCommands using semaphore isolation (SEMAPHORE).

Commands executed in threads have an extra layer of protection against latencies beyond what network timeouts can offer.

Generally the only time you should use semaphore isolation for HystrixCommands is when the call is so high volume (hundreds per second, per instance) that the overhead of separate threads is too high; this typically only applies to non-network calls.
```

You are correct that the service layer's business code and the thread that sends the request are not the same. Therefore, the ThreadLocal approach cannot pass the XID to the Hystrix thread and subsequently to the callee. To address this issue, Hystrix provides a mechanism for developers to customize the concurrency strategy. This can be done by extending the HystrixConcurrencyStrategy class and overriding the wrapCallable method:

```java
public class FescarHystrixConcurrencyStrategy extends HystrixConcurrencyStrategy {

	private HystrixConcurrencyStrategy delegate;

	public FescarHystrixConcurrencyStrategy() {
		this.delegate = HystrixPlugins.getInstance().getConcurrencyStrategy();
		HystrixPlugins.reset();
		HystrixPlugins.getInstance().registerConcurrencyStrategy(this);
	}

	@Override
	public <K> Callable<K> wrapCallable(Callable<K> c) {
		if (c instanceof FescarContextCallable) {
			return c;
		}

		Callable<K> wrappedCallable;
		if (this.delegate != null) {
			wrappedCallable = this.delegate.wrapCallable(c);
		}
		else {
			wrappedCallable = c;
		}
		if (wrappedCallable instanceof FescarContextCallable) {
			return wrappedCallable;
		}

		return new FescarContextCallable<>(wrappedCallable);
	}

	private static class FescarContextCallable<K> implements Callable<K> {

		private final Callable<K> actual;
		private final String xid;

		FescarContextCallable(Callable<K> actual) {
			this.actual = actual;
			this.xid = RootContext.getXID();
		}

		@Override
		public K call() throws Exception {
			try {
				RootContext.bind(xid);
				return actual.call();
			}
			finally {
				RootContext.unbind();
			}
		}

	}
}
```

Fescar also provides a FescarHystrixAutoConfiguration, which generates the FescarHystrixConcurrencyStrategy when HystrixCommand is present.

```java
@Configuration
@ConditionalOnClass(HystrixCommand.class)
public class FescarHystrixAutoConfiguration {

	@Bean
	FescarHystrixConcurrencyStrategy fescarHystrixConcurrencyStrategy() {
		return new FescarHystrixConcurrencyStrategy();
	}

}
```

### reference

- Fescar: https://github.com/alibaba/fescar

- Spring Cloud Alibaba: https://github.com/spring-cloud-incubator/spring-cloud-alibaba

- spring-cloud-openfeign: https://github.com/spring-cloud/spring-cloud-openfeign

### author

kangshu.guo，Community nickname ywind, formerly employed at Huawei Terminal Cloud, currently a Java engineer at Sohu Intelligent Media Center. Mainly responsible for development related to Sohu accounts. Has a strong interest in distributed transactions, distributed systems, and microservices architecture.
min.ji(qinming)，Community nickname slievrly, Fescar project leader, core developer of Alibaba middleware TXC/GTS. Engaged in core research and development work in distributed middleware for a long time. Has extensive technical expertise in the field of distributed transactions.
