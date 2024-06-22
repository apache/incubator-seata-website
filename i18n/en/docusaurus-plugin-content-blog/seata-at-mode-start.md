---
title: Seata AT Mode Startup Source Code Analysis
author: chenghui.zhang
keywords: [Seata, distributed transaction, AT mode]
description: Seata Source Code Analysis Series
date: 2019/11/27
---
# Preface

From the previous article "[Design Principles of Distributed Transaction Middleware Seata](https://mp.weixin.qq.com/s/Pypkm5C9aLPJHYwcM6tAtA)", we talked about some design principles of Seata AT pattern, from which we also know the three roles of AT pattern (RM, TM, TC). I will update the Seata source code analysis series. Today, we are going to analyse what Seata AT mode does at startup.



# Client Startup Logic

TM is responsible for the whole global transaction manager, so a global transaction is started by TM, TM has a global management class GlobalTransaction, the structure is as follows:

io.seata.tm.api.GlobalTransaction

```java
public interface GlobalTransaction {

void begin() throws TransactionException.

void begin(int timeout) throws TransactionException.

void begin(int timeout, String name) throws TransactionException; void commit() throws TransactionException.

void commit() throws TransactionException.

void rollback() throws TransactionException.

GlobalStatus getStatus() throws TransactionException; // ...

// ...
}
```

It is possible to create a GlobalTransaction via GlobalTransactionContext and then use the GlobalTransaction to open, commit, rollback, etc., a global transaction, so we're using the Seata AT mode directly in an API way:

```java
//init seata; TMClient.init(application)
TMClient.init(applicationId, txServiceGroup); RMClient.init(applicationId, txServiceGroup)
RMClient.init(applicationId, txServiceGroup);
//trx
GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();
try {
  tx.begin(60000, "testBiz");
  // Transaction
  // ...
  tx.commit(); } catch (Exception exx)
} catch (Exception exx) {
  tx.rollback(); } catch (Exception exx) { tx.rollback(); }
  throw exx; } catch (Exception exx) { tx.rollback(); throw exx; }
}
```

If you write this every time you use a global transaction, it will inevitably cause code redundancy, our projects are based on the Spring container, we can use the characteristics of Spring AOP, with template patterns to encapsulate this redundant code in the template, reference Mybatis-spring also does this thing, so let's analyse what a Spring-based So let's analyse what a Spring-based project does when it starts Seata and registers a global transaction.

We enable a global transaction by adding the `@GlobalTransactional` annotation to the method. Seata's Spring module has a GlobalTransactionScanner, which has the following inheritance relationship:

```java
public class GlobalTransactionScanner extends AbstractAutoProxyCreator implements InitialisingBean, ApplicationContextAware, DisposableBean {
// ...
}
```

During the startup of a Spring-based project, the following initialisation process occurs for this class:

! [image-20191124155455309](https://gitee.com/objcoding/md-picture/raw/master/img/image-20191124155455309.png)

The afterPropertiesSet() method of InitialisingBean calls the initClient() method:

io.seata.spring.annotation.GlobalTransactionScanner#initClient

```java
TMClient.init(applicationId, txServiceGroup);
RMClient.init(applicationId, txServiceGroup).
```

Initialisation operations are done for TM and RM.

- TM initialisation

io.seata.tm.TMClient#init

```java
public static void init(String applicationId, String transactionServiceGroup) {
  // Get the TmRpcClient instance.
  TmRpcClient tmRpcClient = TmRpcClient.getInstance(applicationId, transactionServiceGroup); // Initialise the TM Client.
  // Initialise the TM Client
  tmRpcClient.init();
}
```

Calling the TmRpcClient.getInstance() method acquires an instance of the TM Client, and during the acquisition process creates the Netty Client Profile object, as well as the messageExecutor thread pool, which is used to handle various message interactions with the server, and during the creation of the TmRpcClient instance, the Create a ClientBootstrap, which is used to manage the start and stop of the Netty service, and a ClientChannelManager, which is used to manage the Netty client object pool, which is used in conjunction with the Netty part of Seata, and which will be discussed later in the Analysing Networks module.

io.seata.core.rpc.netty.AbstractRpcRemotingClient#init

```java
public void init() {
  clientBootstrap.start();
  // Timer to try to connect to the server
  timerExecutor.scheduleAtFixedRate(new Runnable() {
    @Override
    public void run() {
      clientChannelManager.reconnect(getTransactionServiceGroup());
    }
  }, SCHEDULE_INTERVAL_MILLS, SCHEDULE_INTERVAL_MILLS, TimeUnit.SECONDS);
  mergeSendExecutorService = new ThreadPoolExecutor(MAX_MERGE_SEND_THREAD,
                                                    MAX_MERGE_SEND_THREAD, MAX_MERGE_SEND_THREAD, KEEP_ALIVE_TIME
                                                    KEEP_ALIVE_TIME, TimeUnit.
                                                    new LinkedBlockingQueue<>(),
                                                    new NamedThreadFactory(getThreadPrefix(), MAX_MERGE_SEND_THREAD));
  mergeSendExecutorService.submit(new MergedSendRunnable());
  super.init();
}
```

Calling the TM client init() method will eventually start the netty client (it's not really started yet, it will be started when the object pool is called); a timed task is started to resend the RegisterTMRequest (the RM client sends the RegisterRMRequest) request to try to connect to the server, the logic for this is The logic is that the client channel is cached in channels in the NettyClientChannelManager, so if the channels don't exist and are out of date, then it will try to connect to the server in order to fetch the channel again and cache it in channels; a separate thread is started to handle asynchronous request sending. This is a very clever use of the network module, which will be analysed later in the analysis.

io.seata.core.rpc.netty.AbstractRpcRemoting#init


```java
public void init() {
timerExecutor.scheduleAtFixedRate(new Runnable() {
public void run() { scheduleAtFixedRate(new Runnable() {
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

In the init method of AbstractRpcRemoting, it opens a timer task, which is mainly used to clear the expired futrue of futures. futures is a future object that saves the results of sending requests, and this object has a timeout period, after which an exception will be thrown. Therefore, you need to clear the expired futures regularly.

- RM Initialisation

```java
io.seata.rm.RMClient#init
public static void init(String applicationId, String transactionServiceGroup) {
  RmRpcClient rmRpcClient = RmRpcClient.getInstance(applicationId, transactionServiceGroup);
  rmRpcClient.setResourceManager(DefaultResourceManager.get());
  rmRpcClient.setClientMessageListener(new RmMessageListener(DefaultRMHandler.get());
  rmRpcClient.init();
}
```

RmRpcClient.getInstance handles the same logic as the TM; ResourceManager is the RM resource manager responsible for branch transaction registration, commit, report, and rollback operations, as well as global lock querying operations, and DefaultResourceManager will hold all current RM resource managers. The DefaultResourceManager holds all current RM resource managers. DefaultResourceManager will hold all the current RM resource managers for unified call processing, and get() method is mainly to load the current resource manager, mainly using a mechanism similar to SPI, for flexible loading, as shown in the following figure, Seata will scan the META- INF/services/ directory for configuration classes and load them dynamically.

ClientMessageListener is a RM message listener, which is responsible for processing commands sent from TC and performing branch commit, branch rollback, and undo log deletion operations on the branch; finally, the init method follows the same logic as the TM; DefaultRMHandler encapsulates some of the specific operation logic of RM branching transactions. logic.

Let's take a look at what the wrapIfNecessary method does.

io.seata.spring.annotation.GlobalTransactionScanner#wrapIfNecessary

```java
protected Object wrapIfNecessary(Object bean, String beanName, Object cacheKey) { // Determine if there is a global transaction scanner turned on?
// Determine if global transactions are enabled
if (disableGlobalTransaction) {
Returns the bean;
}
try {
synchronized (PROXYED_SET) {
if (PROXYED_SET.contains(beanName)) {
Return the bean;
}
Interceptor = null;
// Check the TCC proxy
if (TCCBeanParserUtils.isTccAutoProxy(bean, beanName, applicationContext)) { //TCC interceptor, proxy bean for sofa:reference/dubbo.
//TCC interceptor, proxy bean for sofa:reference/dubbo:reference and LocalTCC.
interceptor = new TccActionInterceptor(TCCBeanParserUtils.getRemotingDesc(beanName));
} else {
Class<? > serviceInterface = SpringProxyUtils.findTargetClass(bean);
Class<? >[] interfacesIfJdk = SpringProxyUtils.findInterfaces(bean);

        // Determine if the bean has the GlobalTransactional and GlobalLock annotations.
        if (!existsAnnotation(new Class[]{serviceInterface}))
            && !existsAnnotation(interfacesIfJdk)) {
          Return the bean;
        }

        if (interceptor == null) { // create the proxy class
          // Create the proxy class
          interceptor = new GlobalTransactionalInterceptor(failureHandlerHook);
        }
      }

      LOGGER.info("Bean [{}] with name [{}] would use interceptor [{}]",
                  bean.getClass().getName(),beanName,interceptor.getClass().getName());
      if (!AopUtils.isAopProxy(bean)) {
        bean = super.wrapIfNecessary(bean, beanName, cacheKey);
      } else {
        AdvisedSupport advised = SpringProxyUtils.getAdvisedSupport(bean);
        // Perform wrapping the target object to the proxy object
        Advisor[] advisor = super.buildAdvisors(beanName, getAdvicesAndAdvisorsForBean(null, null, null));
        for (Advisor avr : advisor) {
          advised.addAdvisor(0, avr);
        }
      }
      PROXYED_SET.add(beanName);
      Returns the bean;
    }
} catch (Exception exx) {
throw new RuntimeException(exx);
}
}
```


GlobalTransactionScanner inherits AbstractAutoProxyCreator for Spring AOP support, and as you can see from the code, GlobalTransactionalInterceptor is used instead of the methods annotated with GlobalTransactional and GlobalLock annotated methods.

GlobalTransactionalInterceptor implements MethodInterceptor: method interceptor.

```java

io.seata.spring.annotation.GlobalTransactionalInterceptor#invoke
public Object invoke(final MethodInvocation methodInvocation) throws Throwable {
  Class<? > targetClass = methodInvocation.getThis() ! = null ? AopUtils.getTargetClass(methodInvocation.getThis()) : null;
  Method specificMethod = ClassUtils.getMostSpecificMethod(methodInvocation.getMethod(), targetClass);
  final Method method = BridgeMethodResolver.findBridgedMethod(specificMethod);

  final GlobalTransactional globalTransactionalAnnotation = getAnnotation(method, GlobalTransactional.class);
  final GlobalLock globalLockAnnotation = getAnnotation(method, GlobalLock.class);
  if (globalTransactionalAnnotation ! = null) { // globalTransactionalAnnotation !
    // globalTransactionalAnnotation
    return handleGlobalTransaction(methodInvocation, globalTransactionalAnnotation);
  } else if (globalLockAnnotation ! = null) { // globalLockAnnotation !
    // global lock annotation
    return handleGlobalLock(methodInvocation);
  } else {
    return methodInvocation.proceed();
  }
}
```

The above is the logic executed by the proxy method, where the handleGlobalTransaction() method calls the TransactionalTemplate template inside: io.seata.spring.annotation.GlobalTransactionalInterceptor #handleGlobalTransaction()

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
The handleGlobalTransaction() method executes the execute method of the TransactionalTemplate template class:

io.seata.tm.api.TransactionalTemplate#execute

```java
public Object execute(TransactionalExecutor business) throws Throwable {
// 1. get or create a transaction
GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate(); // 1.1 get transactionInfo = GlobalTransactionContext.

// 1.1 get transactionInfo
TransactionInfo txInfo = business.getTransactionInfo(); if (txInfo = txInfo.getCurrentOrCreate())
if (txInfo == null) {
throw new ShouldNeverHappenException("transactionInfo does not exist"); }
}
try {

    // 2. begin transaction


    Object rs = null; } try { // 2.
    try {

      // Do Your Business
      rs = business.execute(); } catch (Throwable ex) { // Do Your Business.

    } catch (Throwable ex) {

      // 3. the needed business exception to rollback.
      completeTransactionAfterThrowing(txInfo,tx,ex); } throw ex; }
      throw ex; } catch (Throwable ex) { // 3.
    }

    // 4. everything is fine, commit.
    commitTransaction(tx); return rs; }

    commitTransaction(tx); return rs.
} finally {
} finally { // 5. clear
triggerAfterCompletion(); cleanUp(); }
cleanUp();
}
}
```

Doesn't the above give you a sense of déjà vu? That's right, the above is often written when we use the API redundant code, now Spring through the proxy model, the redundant code are encapsulated with the template inside it, it will be those redundant code is encapsulated in a unified process processing, and do not need to show you write out, interested can also go to look at the source code of the Mybatis-spring, is also written very exciting.



# server-side processing logic

The server receives the client's connection, that is, of course, the channel is also cached up, also said that the client will send RegisterRMRequest/RegisterTMRequest request to the server, the server receives the ServerMessageListener listener will be called to deal with:

io.seata.core.rpc.ServerMessageListener

```java
public interface ServerMessageListener {
  // Handles various transactions, such as branch registration, branch commit, branch report, branch rollback, etc.
  void onTrxMessage(RpcMessage request, ChannelHandlerContext ctx, ServerMessageSender sender); // Handle the registration of RM clients.
	// Handle the registration of the RM client's connection
  void onRegRmMessage(RpcMessage request, ChannelHandlerContext ctx, ServerMessageSender sender); // Handle the registration of the RM client.
                      ServerMessageSender sender, RegisterCheckAuthHandler checkAuthHandler); // Handle the registration of the TM client.
  // Handle the registration of the TM client's connection.
  void onRegTmMessage(RpcMessage request, ChannelHandlerContext ctx, ServerMessageSender sender, RegisterCheckAuthHandler checkAuthHandler)
                      ServerMessageSender sender, RegisterCheckAuthHandler checkAuthHandler); // Handle TM client's registered connection.
  // The server maintains a heartbeat with the client
  void onCheckMessage(RpcMessage request, ChannelHandlerContext ctx, ServerMessageSender sender)

}
```

ChannelManager is the manager of the server channel, every time the server communicates with the client, it needs to get the corresponding channel of the client from the ChannelManager, which is used to save the cache structure of the TM and RM client channel as follows:

```java
/**
 * resourceId -> applicationId -> ip -> port -> RpcContext
 */
private static final ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<Integer.
RpcContext>>>>
  RM_CHANNELS = new ConcurrentHashMap<String, ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<Integer, RpcContext
RpcContext>>>>();

/**
 * ip+appname,port
 */
private static final ConcurrentMap<String, ConcurrentMap<Integer, RpcContext>> TM_CHANNELS
  = new ConcurrentHashMap<String, ConcurrentMap<Integer, RpcContext>>();
```

The above Map structure is a bit complicated:

RM_CHANNELS:

1. resourceId refers to the database address of the RM client;
2. applicationId refers to the service Id of the RM client, for example, account-service in springboot's configuration spring.application.name=account-service is the applicationId. 3. ip refers to the service Id of the RM client, for example, account-service in spring.application.name=account-service is the applicationId;
3. ip refers to the RM client service address. 4. port refers to the RM client service address;
4. port refers to the RM client service address;
5. RpcContext saves the information of this registration request.

TM_CHANNELS:

1. ip+appname: the comment here should be written wrongly, it should be appname+ip, that is, the first key of the Map structure of TM_CHANNELS is appname+ip;
2. port: the port number of the client.

The following is the RM Client registration logic:

io.seata.core.rpc.ChannelManager#registerRMChannel

```java
public static void registerRMChannel(RegisterRMRequest resourceManagerRequest, Channel channel)
throws IncompatibleVersionException {
Version.checkVersion(resourceManagerRequest.getVersion()); // Register the ResourceIds database.
// Put the ResourceIds database connection connection information into a set
Set<String> dbkeySet = dbKeytoSet(resourceManagerRequest.getResourceIds()); // put the ResourceIds database connection connection information into a set.
RpcContext rpcContext;
// Determine if the channel information is available from the cache
if (!IDENTIFIED_CHANNELS.containsKey(channel)) {
// Build the rpcContext based on the request registration information.
rpcContext = buildChannelHolder(NettyPoolKey.TransactionRole.RMROLE, resourceManagerRequest.getVersion(),
resourceManagerRequest.getApplicationId(), resourceManagerRequest.getTransactionServiceGroup(),
resourceManagerRequest.getTransactionServiceGroup(), resourceManagerRequest.getResourceIds(), channel);
// Put the rpcContext into the cache
rpcContext.holdInIdentifiedChannels(IDENTIFIED_CHANNELS); } else { rpcContext.
} else {
rpcContext = IDENTIFIED_CHANNELS.get(channel);
rpcContext.addResources(dbkeySet);
}
if (null == dbkeySet || dbkeySet.isEmpty()) { return; }
for (String resourceId : dbkeySet) {
String clientIp; // Store the request information into RM_Request.
// Store the request information into RM_CHANNELS, using java8's computeIfAbsent method.
ConcurrentMap<Integer, RpcContext> portMap = RM_CHANNELS.computeIfAbsent(resourceId, resourceIdKey -> new ConcurrentHashMap<>())
.computeIfAbsent(resourceManagerRequest.getApplicationId(), applicationId -> new ConcurrentHashMap<>())
.computeIfAbsent(clientIp = getClientIpFromChannel(channel), clientIpKey -> new ConcurrentHashMap<>());
// Put the current rpcContext into the portMap.
rpcContext.holdInResourceManagerChannels(resourceId, portMap);
updateChannelsResource(resourceId, clientIp, resourceManagerRequest.getApplicationId()); }
}
}
```

From the above code logic, we can see that the registration of RM client is mainly to put the registration request information into RM_CHANNELS cache, and at the same time, we will also judge from IDENTIFIED_CHANNELS whether the channel of this request has been verified or not, and the structure of IDENTIFIED_CHANNELS is as follows:

```java
private static final ConcurrentMap<Channel, RpcContext> IDENTIFIED_CHANNELS
  = new ConcurrentHashMap<>();
```
IDENTIFIED_CHANNELS contains all TM and RM registered channels.

The following is the TM registration logic:

io.seata.core.rpc.ChannelManager#registerTMChannel

```java
public static void registerTMChannel(RegisterTMRequest request, Channel channel)
throws IncompatibleVersionException {
Version.checkVersion(request.getVersion());
// Build the RpcContext based on the request registration information.
RpcContext rpcContext = buildChannelHolder(NettyPoolKey.TransactionRole.TMROLE, request.getVersion(),
request.getApplicationId(), request.getTransactionServiceHolder(NettyPoolKey.TransactionRole.
request.getApplicationId(), request.getTransactionServiceGroup(),
null, channel);
// Put the RpcContext into the IDENTIFIED_CHANNELS cache.


rpcContext.holdInIdentifiedChannels(IDENTIFIED_CHANNELS); // put RpcContext into IDENTIFIED_CHANNELS cache; rpcContext.
// account-service:127.0.0.1:63353
String clientIdentified = rpcContext.getApplicationId() + Constants.CLIENT_ID_SPLIT_CHAR
+ getClientIpFromChannel(channel);
// Store the request information in the TM_CHANNELS cache.
TM_CHANNELS.putIfAbsent(clientIdentified, new ConcurrentHashMap<Integer, RpcContext>()); // put the request information into the TM_CHANNELS cache.
// Create the get from the previous step, and then put the rpcContext into the value of the map.
ConcurrentMap<Integer, RpcContext> clientIdentifiedMap = TM_CHANNELS.get(clientIdentified);
rpcContext.holdInClientChannels(clientIdentifiedMap);
}
```

The registration of TM client is similar, the information registered is put into the corresponding cache, but the registration logic is simpler than that of RM client, mainly because RM client involves the information of branch transaction resources, and the information needed to be registered will be more than that of TM client.

The above source code analysis is based on version 0.9.0.


# About the Author

Zhang Chenghui, currently working in the Information Centre of China Communication Technology, Technology Platform Department, as a Java engineer, mainly responsible for the development of China Communication messaging platform and the whole link pressure test project, love to share technology, WeChat public number "back-end advanced" author, technology blog ([https://objcoding.com/](https://objcoding.com/)) Blogger, Seata Contributor, GitHub ID: objcoding.


