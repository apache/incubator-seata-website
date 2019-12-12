---
title: Seata AT 模式启动源码分析
author: 张乘辉
keywords: Seata、分布式事务、AT模式
description: Seata 源码分析系列
date: 2019/11/27
---


# 前言

从上一篇文章「[分布式事务中间件Seata的设计原理](https://mp.weixin.qq.com/s/Pypkm5C9aLPJHYwcM6tAtA)」讲了下 Seata AT 模式的一些设计原理，从中也知道了 AT 模式的三个角色（RM、TM、TC），接下来我会更新 Seata 源码分析系列文章。今天就来分析 Seata AT 模式在启动的时候都做了哪些操作。



# 客户端启动逻辑

TM 是负责整个全局事务的管理器，因此一个全局事务是由 TM 开启的，TM 有个全局管理类 GlobalTransaction，结构如下：

io.seata.tm.api.GlobalTransaction

```java
public interface GlobalTransaction {

  void begin() throws TransactionException;

  void begin(int timeout) throws TransactionException;

  void begin(int timeout, String name) throws TransactionException;

  void commit() throws TransactionException;

  void rollback() throws TransactionException;
  
  GlobalStatus getStatus() throws TransactionException;
  
  // ...
}
```

可以通过 GlobalTransactionContext 创建一个 GlobalTransaction，然后用 GlobalTransaction 进行全局事务的开启、提交、回滚等操作，因此我们直接用 API 方式使用 Seata AT 模式：

```java
//init seata;
TMClient.init(applicationId, txServiceGroup);
RMClient.init(applicationId, txServiceGroup);
//trx
GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();
try {
  tx.begin(60000, "testBiz");
  // 事务处理
  // ...
  tx.commit();
} catch (Exception exx) {
  tx.rollback();
  throw exx;
}
```

如果每次使用全局事务都这样写，难免会造成代码冗余，我们的项目都是基于 Spring 容器，这时我们可以利用 Spring AOP 的特性，用模板模式把这些冗余代码封装模版里，参考 Mybatis-spring 也是做了这么一件事情，那么接下来我们来分析一下基于 Spring 的项目启动 Seata 并注册全局事务时都做了哪些工作。

我们开启一个全局事务是在方法上加上 `@GlobalTransactional`注解，Seata 的 Spring 模块中，有个 GlobalTransactionScanner，它的继承关系如下：

```java
public class GlobalTransactionScanner extends AbstractAutoProxyCreator implements InitializingBean, ApplicationContextAware, DisposableBean {
  // ...
}
```

在基于 Spring 项目的启动过程中，对该类会有如下初始化流程：

![image-20191124155455309](https://raw.githubusercontent.com/objcoding/objcoding.github.io/master/images/image-20191124155455309.png)

InitializingBean 的 afterPropertiesSet() 方法调用了 initClient() 方法：

io.seata.spring.annotation.GlobalTransactionScanner#initClient

```java
TMClient.init(applicationId, txServiceGroup);
RMClient.init(applicationId, txServiceGroup);
```

对 TM 和 RM 做了初始化操作。

- TM 初始化

io.seata.tm.TMClient#init

```java
public static void init(String applicationId, String transactionServiceGroup) {
  // 获取 TmRpcClient 实例
  TmRpcClient tmRpcClient = TmRpcClient.getInstance(applicationId, transactionServiceGroup);
  // 初始化 TM Client
  tmRpcClient.init();
}
```

调用 TmRpcClient.getInstance() 方法会获取一个 TM 客户端实例，在获取过程中，会创建 Netty 客户端配置文件对象，以及创建 messageExecutor 线程池，该线程池用于在处理各种与服务端的消息交互，在创建 TmRpcClient 实例时，创建 ClientBootstrap，用于管理 Netty 服务的启停，以及 ClientChannelManager，它是专门用于管理 Netty 客户端对象池，Seata 的 Netty 部分配合使用了对象池，后面在分析网络模块会讲到。

io.seata.core.rpc.netty.AbstractRpcRemotingClient#init

```java
public void init() {
  clientBootstrap.start();
  // 定时尝试连接服务端
  timerExecutor.scheduleAtFixedRate(new Runnable() {
    @Override
    public void run() {
      clientChannelManager.reconnect(getTransactionServiceGroup());
    }
  }, SCHEDULE_INTERVAL_MILLS, SCHEDULE_INTERVAL_MILLS, TimeUnit.SECONDS);
  mergeSendExecutorService = new ThreadPoolExecutor(MAX_MERGE_SEND_THREAD,
                                                    MAX_MERGE_SEND_THREAD,
                                                    KEEP_ALIVE_TIME, TimeUnit.MILLISECONDS,
                                                    new LinkedBlockingQueue<>(),
                                                    new NamedThreadFactory(getThreadPrefix(), MAX_MERGE_SEND_THREAD));
  mergeSendExecutorService.submit(new MergedSendRunnable());
  super.init();
}
```

调用 TM 客户端 init() 方法，最终会启动 netty 客户端（此时还未真正启动，在对象池被调用时才会被真正启动）；开启一个定时任务，定时重新发送 RegisterTMRequest（RM 客户端会发送 RegisterRMRequest）请求尝试连接服务端，具体逻辑是在 NettyClientChannelManager 中的 channels 中缓存了客户端 channel，如果此时 channels 不存在获取已过期，那么就会尝试连接服务端以重新获取 channel 并将其缓存到 channels 中；开启一条单独线程，用于处理异步请求发送，这里用得很巧妙，之后在分析网络模块在具体对其进行分析。

io.seata.core.rpc.netty.AbstractRpcRemoting#init

```java
public void init() {
  timerExecutor.scheduleAtFixedRate(new Runnable() {
    @Override
    public void run() {
      for (Map.Entry<Integer, MessageFuture> entry : futures.entrySet()) {
        if (entry.getValue().isTimeout()) {
          futures.remove(entry.getKey());
          entry.getValue().setResultMessage(null);
          if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("timeout clear future: {}", entry.getValue().getRequestMessage().getBody());
          }
        }
      }

      nowMills = System.currentTimeMillis();
    }
  }, TIMEOUT_CHECK_INTERNAL, TIMEOUT_CHECK_INTERNAL, TimeUnit.MILLISECONDS);
}
```

在 AbstractRpcRemoting 的 init 方法中，又是开启了一个定时任务，该定时任务主要是用于定时清除 futures 已过期的 futrue，futures 是保存发送请求需要返回结果的 future 对象，该对象有个超时时间，过了超时时间就会自动抛异常，因此需要定时清除已过期的 future 对象。

- RM 初始化

io.seata.rm.RMClient#init

```java
public static void init(String applicationId, String transactionServiceGroup) {
  RmRpcClient rmRpcClient = RmRpcClient.getInstance(applicationId, transactionServiceGroup);
  rmRpcClient.setResourceManager(DefaultResourceManager.get());
  rmRpcClient.setClientMessageListener(new RmMessageListener(DefaultRMHandler.get()));
  rmRpcClient.init();
}
```

 RmRpcClient.getInstance 处理逻辑与 TM 大致相同；ResourceManager 是 RM 资源管理器，负责分支事务的注册、提交、上报、以及回滚操作，以及全局锁的查询操作，DefaultResourceManager 会持有当前所有的 RM 资源管理器，进行统一调用处理，而 get() 方法主要是加载当前的资源管理器，主要用了类似 SPI 的机制，进行灵活加载，如下图，Seata 会扫描 META-INF/services/ 目录下的配置类并进行动态加载。

ClientMessageListener 是 RM 消息处理监听器，用于负责处理从 TC 发送过来的指令，并对分支进行分支提交、分支回滚，以及 undo log 删除操作；最后 init 方法跟 TM 逻辑也大体一致；DefaultRMHandler 封装了 RM 分支事务的一些具体操作逻辑。

接下来再看看 wrapIfNecessary 方法究竟做了哪些操作。

io.seata.spring.annotation.GlobalTransactionScanner#wrapIfNecessary

```java
protected Object wrapIfNecessary(Object bean, String beanName, Object cacheKey) {
  // 判断是否有开启全局事务
  if (disableGlobalTransaction) {
    return bean;
  }
  try {
    synchronized (PROXYED_SET) {
      if (PROXYED_SET.contains(beanName)) {
        return bean;
      }
      interceptor = null;
      //check TCC proxy
      if (TCCBeanParserUtils.isTccAutoProxy(bean, beanName, applicationContext)) {
        //TCC interceptor, proxy bean of sofa:reference/dubbo:reference, and LocalTCC
        interceptor = new TccActionInterceptor(TCCBeanParserUtils.getRemotingDesc(beanName));
      } else {
        Class<?> serviceInterface = SpringProxyUtils.findTargetClass(bean);
        Class<?>[] interfacesIfJdk = SpringProxyUtils.findInterfaces(bean);

        // 判断 bean 中是否有 GlobalTransactional 和 GlobalLock 注解
        if (!existsAnnotation(new Class[]{serviceInterface})
            && !existsAnnotation(interfacesIfJdk)) {
          return bean;
        }

        if (interceptor == null) {
          // 创建代理类
          interceptor = new GlobalTransactionalInterceptor(failureHandlerHook);
        }
      }

      LOGGER.info("Bean[{}] with name [{}] would use interceptor [{}]",
                  bean.getClass().getName(), beanName, interceptor.getClass().getName());
      if (!AopUtils.isAopProxy(bean)) {
        bean = super.wrapIfNecessary(bean, beanName, cacheKey);
      } else {
        AdvisedSupport advised = SpringProxyUtils.getAdvisedSupport(bean);
        // 执行包装目标对象到代理对象  
        Advisor[] advisor = super.buildAdvisors(beanName, getAdvicesAndAdvisorsForBean(null, null, null));
        for (Advisor avr : advisor) {
          advised.addAdvisor(0, avr);
        }
      }
      PROXYED_SET.add(beanName);
      return bean;
    }
  } catch (Exception exx) {
    throw new RuntimeException(exx);
  }
}
```


GlobalTransactionScanner 继承了 AbstractAutoProxyCreator，用于对 Spring AOP 支持，从代码中可看出，用GlobalTransactionalInterceptor 代替了被 GlobalTransactional 和 GlobalLock 注解的方法。

GlobalTransactionalInterceptor 实现了 MethodInterceptor：

io.seata.spring.annotation.GlobalTransactionalInterceptor#invoke

```java
public Object invoke(final MethodInvocation methodInvocation) throws Throwable {
  Class<?> targetClass = methodInvocation.getThis() != null ? AopUtils.getTargetClass(methodInvocation.getThis()) : null;
  Method specificMethod = ClassUtils.getMostSpecificMethod(methodInvocation.getMethod(), targetClass);
  final Method method = BridgeMethodResolver.findBridgedMethod(specificMethod);

  final GlobalTransactional globalTransactionalAnnotation = getAnnotation(method, GlobalTransactional.class);
  final GlobalLock globalLockAnnotation = getAnnotation(method, GlobalLock.class);
  if (globalTransactionalAnnotation != null) {
    // 全局事务注解
    return handleGlobalTransaction(methodInvocation, globalTransactionalAnnotation);
  } else if (globalLockAnnotation != null) {
    // 全局锁注解
    return handleGlobalLock(methodInvocation);
  } else {
    return methodInvocation.proceed();
  }
}
```

以上是代理方法执行的逻辑逻辑，其中 handleGlobalTransaction() 方法里面调用了 TransactionalTemplate 模版：

io.seata.spring.annotation.GlobalTransactionalInterceptor#handleGlobalTransaction

```java
private Object handleGlobalTransaction(final MethodInvocation methodInvocation,
                                       final GlobalTransactional globalTrxAnno) throws Throwable {
  try {
    return transactionalTemplate.execute(new TransactionalExecutor() {
      @Override
      public Object execute() throws Throwable {
        return methodInvocation.proceed();
      }
      @Override
      public TransactionInfo getTransactionInfo() {
        // ...
      }
    });
  } catch (TransactionalExecutor.ExecutionException e) {
    // ...
  }
}
```

handleGlobalTransaction() 方法执行了就是 TransactionalTemplate 模版类的 execute 方法：

io.seata.tm.api.TransactionalTemplate#execute

```java
public Object execute(TransactionalExecutor business) throws Throwable {
  // 1. get or create a transaction
  GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();

  // 1.1 get transactionInfo
  TransactionInfo txInfo = business.getTransactionInfo();
  if (txInfo == null) {
    throw new ShouldNeverHappenException("transactionInfo does not exist");
  }
  try {

    // 2. begin transaction
    beginTransaction(txInfo, tx);

    Object rs = null;
    try {

      // Do Your Business
      rs = business.execute();

    } catch (Throwable ex) {

      // 3.the needed business exception to rollback.
      completeTransactionAfterThrowing(txInfo,tx,ex);
      throw ex;
    }

    // 4. everything is fine, commit.
    commitTransaction(tx);

    return rs;
  } finally {
    //5. clear
    triggerAfterCompletion();
    cleanUp();
  }
}
```

以上是不是有一种似曾相识的感觉？没错，以上就是我们使用 API 时经常写的冗余代码，现在 Spring 通过代理模式，把这些冗余代码都封装带模版里面了，它将那些冗余代码统统封装起来统一流程处理，并不需要你显示写出来了，有兴趣的也可以去看看 Mybatis-spring 的源码，也是写得非常精彩。



# 服务端处理逻辑

服务端收到客户端的连接，那当然是将其 channel 也缓存起来，前面也说到客户端会发送 RegisterRMRequest/RegisterTMRequest 请求给服务端，服务端收到后会调用 ServerMessageListener 监听器处理：

io.seata.core.rpc.ServerMessageListener

```java
public interface ServerMessageListener {
  // 处理各种事务，如分支注册、分支提交、分支上报、分支回滚等等
  void onTrxMessage(RpcMessage request, ChannelHandlerContext ctx, ServerMessageSender sender);
	// 处理 RM 客户端的注册连接
  void onRegRmMessage(RpcMessage request, ChannelHandlerContext ctx,
                      ServerMessageSender sender, RegisterCheckAuthHandler checkAuthHandler);
  // 处理 TM 客户端的注册连接
  void onRegTmMessage(RpcMessage request, ChannelHandlerContext ctx,
                      ServerMessageSender sender, RegisterCheckAuthHandler checkAuthHandler);
  // 服务端与客户端保持心跳
  void onCheckMessage(RpcMessage request, ChannelHandlerContext ctx, ServerMessageSender sender)

}
```

ChannelManager 是服务端 channel 的管理器，服务端每次和客户端通信，都需要从 ChannelManager 中获取客户端对应的 channel，它用于保存 TM 和 RM 客户端 channel 的缓存结构如下：

```java
/**
 * resourceId -> applicationId -> ip -> port -> RpcContext
 */
private static final ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<Integer,
RpcContext>>>>
  RM_CHANNELS = new ConcurrentHashMap<String, ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<Integer,
RpcContext>>>>();

/**
 * ip+appname,port
 */
private static final ConcurrentMap<String, ConcurrentMap<Integer, RpcContext>> TM_CHANNELS
  = new ConcurrentHashMap<String, ConcurrentMap<Integer, RpcContext>>();
```

以上的 Map 结构有点复杂：

RM_CHANNELS：

1. resourceId 指的是 RM client 的数据库地址；
2. applicationId 指的是 RM client 的服务 Id，比如 springboot 的配置 spring.application.name=account-service 中的 account-service 即是  applicationId；
3. ip 指的是 RM client 服务地址；
4. port 指的是 RM client 服务地址；
5. RpcContext 保存了本次注册请求的信息。

TM_CHANNELS：

1. ip+appname：这里的注释应该是写错了，应该是 appname+ip，即 TM_CHANNELS 的 Map 结构第一个 key 为 appname+ip；
2. port：客户端的端口号。

以下是 RM Client 注册逻辑：

io.seata.core.rpc.ChannelManager#registerRMChannel

```java
public static void registerRMChannel(RegisterRMRequest resourceManagerRequest, Channel channel)
  throws IncompatibleVersionException {
  Version.checkVersion(resourceManagerRequest.getVersion());
  // 将 ResourceIds 数据库连接连接信息放入一个set中
  Set<String> dbkeySet = dbKeytoSet(resourceManagerRequest.getResourceIds());
  RpcContext rpcContext;
  // 从缓存中判断是否有该channel信息
  if (!IDENTIFIED_CHANNELS.containsKey(channel)) {
    // 根据请求注册信息，构建 rpcContext
    rpcContext = buildChannelHolder(NettyPoolKey.TransactionRole.RMROLE, resourceManagerRequest.getVersion(),
                                    resourceManagerRequest.getApplicationId(), resourceManagerRequest.getTransactionServiceGroup(),
                                    resourceManagerRequest.getResourceIds(), channel);
    // 将 rpcContext 放入缓存中
    rpcContext.holdInIdentifiedChannels(IDENTIFIED_CHANNELS);
  } else {
    rpcContext = IDENTIFIED_CHANNELS.get(channel);
    rpcContext.addResources(dbkeySet);
  }
  if (null == dbkeySet || dbkeySet.isEmpty()) { return; }
  for (String resourceId : dbkeySet) {
    String clientIp;
    // 将请求信息存入 RM_CHANNELS 中，这里用了 java8 的 computeIfAbsent 方法操作
    ConcurrentMap<Integer, RpcContext> portMap = RM_CHANNELS.computeIfAbsent(resourceId, resourceIdKey -> new ConcurrentHashMap<>())
      .computeIfAbsent(resourceManagerRequest.getApplicationId(), applicationId -> new ConcurrentHashMap<>())
      .computeIfAbsent(clientIp = getClientIpFromChannel(channel), clientIpKey -> new ConcurrentHashMap<>());
		// 将当前 rpcContext 放入 portMap 中
    rpcContext.holdInResourceManagerChannels(resourceId, portMap);
    updateChannelsResource(resourceId, clientIp, resourceManagerRequest.getApplicationId());
  }
}
```

从以上代码逻辑能够看出，注册 RM client 主要是将注册请求信息，放入 RM_CHANNELS 缓存中，同时还会从 IDENTIFIED_CHANNELS 中判断本次请求的 channel 是否已验证过，IDENTIFIED_CHANNELS 的结构如下：

```java
private static final ConcurrentMap<Channel, RpcContext> IDENTIFIED_CHANNELS
  = new ConcurrentHashMap<>();
```

IDENTIFIED_CHANNELS 包含了所有 TM 和 RM 已注册的 channel。

以下是 TM 注册逻辑：

io.seata.core.rpc.ChannelManager#registerTMChannel

```java
public static void registerTMChannel(RegisterTMRequest request, Channel channel)
  throws IncompatibleVersionException {
  Version.checkVersion(request.getVersion());
  // 根据请求注册信息，构建 RpcContext
  RpcContext rpcContext = buildChannelHolder(NettyPoolKey.TransactionRole.TMROLE, request.getVersion(),
                                             request.getApplicationId(),
                                             request.getTransactionServiceGroup(),
                                             null, channel);
  // 将 RpcContext 放入 IDENTIFIED_CHANNELS 缓存中
  rpcContext.holdInIdentifiedChannels(IDENTIFIED_CHANNELS);
  // account-service:127.0.0.1:63353
  String clientIdentified = rpcContext.getApplicationId() + Constants.CLIENT_ID_SPLIT_CHAR
    + getClientIpFromChannel(channel);
  // 将请求信息存入 TM_CHANNELS 缓存中
  TM_CHANNELS.putIfAbsent(clientIdentified, new ConcurrentHashMap<Integer, RpcContext>());
  // 将上一步创建好的get出来，之后再将rpcContext放入这个map的value中
  ConcurrentMap<Integer, RpcContext> clientIdentifiedMap = TM_CHANNELS.get(clientIdentified);
  rpcContext.holdInClientChannels(clientIdentifiedMap);
}
```

TM client 的注册大体类似，把本次注册的信息放入对应的缓存中保存，但比 RM client 的注册逻辑简单一些，主要是 RM client 会涉及分支事务资源的信息，需要注册的信息也会比 TM client 多。

以上源码分析基于 0.9.0 版本。


# 作者简介

张乘辉，目前就职于中通科技信息中心技术平台部，担任 Java 工程师，主要负责中通消息平台与全链路压测项目的研发，热爱分享技术，微信公众号「后端进阶」作者，技术博客（[https://objcoding.com/](https://objcoding.com/)）博主，Seata Contributor，GitHub ID：objcoding。




