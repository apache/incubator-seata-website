---
title: Detailed Explanation of Seata-Client Principles and Processes in Distributed Transactions
author: fangliangsheng
date: 2019/04/15
keywords: [fescar, seata, distributed transaction]
---

## Preface

In distributed systems, distributed transactions are a problem that must be solved. Currently, the most commonly used solution is eventual consistency. Since Alibaba open-sourced Fescar (renamed Seata in early April) earlier this year, the project has received great attention, currently nearing 8000 stars. [Seata](https://github.com/apache/incubator-seata) aims to solve the problem of distributed transactions in the microservices field with high performance and zero intrusion. It is currently undergoing rapid iteration, with a near-term goal of producing a production-ready MySQL version. For a comprehensive introduction to Seata, you can check the [official WIKI](https://github.com/apache/incubator-seata/wiki/%E6%A6%82%E8%A7%88) for more detailed information.

This article is mainly based on the structure of spring cloud+spring jpa+spring cloud alibaba fescar+mysql+seata, building a distributed system demo, and analyzing and explaining its working process and principles from the perspective of the client (RM, TM) through seata's debug logs and source code.
The code in the article is based on fescar-0.4.1. Since the project was just renamed to seata not long ago, some package names, class names, and jar package names are still named fescar, so the term fescar is still used in the following text. Sample project: [https://github.com/fescar-group/fescar-samples/tree/master/springcloud-jpa-seata](https://github.com/fescar-group/fescar-samples/tree/master/springcloud-jpa-seata)

## Related Concepts

- **XID**: The unique identifier of a global transaction, composed of ip:port:sequence
- **Transaction Coordinator (TC)**: Maintains the running state of global transactions, responsible for coordinating and driving the commit or rollback of global transactions
- **Transaction Manager (TM)**: Controls the boundary of global transactions, responsible for starting a global transaction and finally initiating the decision of global commit or rollback
- **Resource Manager (RM)**: Controls branch transactions, responsible for branch registration, status reporting, and receiving instructions from the transaction coordinator to drive the commit and rollback of branch (local) transactions

## Distributed Framework Support

Fescar uses XID to represent a distributed transaction. XID needs to be transmitted in the systems involved in a distributed transaction request, to send the processing status of branch transactions to the feacar-server, and to receive commit and rollback instructions from the feacar-server. Fescar officially supports all versions of the dubbo protocol, and the community also provides corresponding implementations for spring cloud (spring-boot) distributed projects.

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-alibaba-fescar</artifactId>
    <version>2.1.0.BUILD-SNAPSHOT</version>
</dependency>
```

This component implements the XID transmission function based on RestTemplate and Feign communication.

## Business Logic

The business logic is the classic process of placing an order, deducting the balance, and reducing inventory. According to the module division, it is divided into three independent services, each connected to the corresponding database:

- Order: order-server
- Account: account-server
- Inventory: storage-server

There is also a business system that initiates distributed transactions:

- Business: business-server

The project structure is as shown in the figure below:
![Insert image description here](/img/blog/20190410114411366.png)

**Normal Business**

1. The business initiates a purchase request
2. Storage deducts inventory
3. Order creates an order
4. Account deducts balance

**Abnormal Business**

1. The business initiates a purchase request
2. Storage deducts inventory
3. Order creates an order
4. Account `deduct balance exception`

In the normal process, the data of steps 2, 3, and 4 is normally updated globally commit. In the abnormal process, the data is globally rolled back due to the exception error in step 4.

## Configuration Files

The configuration entry file for fescar is [registry.conf](https://github.com/apache/incubator-seata/blob/develop/config/src/main/resources/registry.conf). Check the code [ConfigurationFactory](https://github.com/apache/incubator-seata/blob/develop/config/src/main/java/com/alibaba/fescar/config/ConfigurationFactory.java) to find that currently, the configuration file name can only be registry.conf and cannot be specified otherwise.

```java
private static final String REGISTRY_CONF = "registry.conf";
public static final Configuration FILE_INSTANCE = new FileConfiguration(REGISTRY_CONF);
```

In `registry`, you can specify the specific configuration form, the default is to use the file type. In file.conf, there are 3 parts of the configuration content:

1. **transport**
   The transport part configuration corresponds to the [NettyServerConfig](https://github.com/apache/incubator-seata/blob/develop/core/src/main/java/com/alibaba/fescar/core/rpc/netty/NettyServerConfig.java) class, used to define Netty-related parameters. TM and RM communicate with fescar-server using Netty.

2. **service**

```js
service {
    #vgroup->rgroup
    vgroup_mapping.my_test_tx_group = "default"
    #Configure the address for the Client to connect to TC
    default.grouplist = "127.0.0.1:8091"
    #degrade current not support
    enableDegrade = false
    #disable
    Whether to enable seata distributed transaction
    disableGlobalTransaction = false
}
```

3. **client**

```js
client {
    #RM receives the upper limit of buffer after TC's commit notification
    async.commit.buffer.limit = 10000
    lock {
      retry.internal = 10
      retry.times = 30
    }
}
```

## Data Source Proxy

In addition to the previous configuration files, fescar in AT mode has a bit of code volume, which is for the proxy of the data source, and currently can only be based on the proxy of `DruidDataSource`. Note: In the latest release of version 0.4.2, it has supported any data source type.

```java
@Bean
@ConfigurationProperties(prefix = "spring.datasource")
public DruidDataSource druidDataSource() {
    DruidDataSource druidDataSource = new DruidDataSource();
    return druidDataSource;
}
@Primary
@Bean("dataSource")
public DataSourceProxy dataSource(DruidDataSource druidDataSource) {
    return new DataSourceProxy(druidDataSource);
}
```

The purpose of using `DataSourceProxy` is to introduce `ConnectionProxy`. One aspect of fescar's non-intrusiveness is reflected in the implementation of `ConnectionProxy`. The cut-in point for branch transactions to join global transactions is at the local transaction's `commit` stage. This design ensures that business data and `undo_log` are in a local transaction. The `undo_log` table needs to be created in the business library, and fescar depends on this table to record the status of each branch transaction and the rollback data of the second stage. There is no need to worry about the table's data volume becoming a single point problem. In the case of a global transaction commit, the transaction's corresponding `undo_log` will be asynchronously deleted.

```sql
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

## Start Server

Go to [https://github.com/apache/incubator-seata/releases](https://github.com/apache/incubator-seata/releases) to download the fescar-server version corresponding to the Client version to avoid protocol inconsistencies caused by different versions. Enter the bin directory after decompression and execute

```shell
./fescar-server.sh 8091 ../data
```

If the startup is successful, the following output will be shown

```shell
2019-04-09 20:27:24.637 INFO [main] c.a.fescar.core.rpc.netty.AbstractRpcRemotingServer.start:152 -Server started ...
```

## Start Client

The loading entry class of fescar is located in [GlobalTransactionAutoConfiguration](https://github.com/spring-cloud-incubator/spring-cloud-alibaba/blob/finchley/spring-cloud-alibaba-fescar/src/main/java/org/springframework/cloud/alibaba/fescar/GlobalTransactionAutoConfiguration.java), which can be automatically loaded for spring boot-based projects, and of course, it can also be instantiated by other means.

```java
@Configuration
@EnableConfigurationProperties({FescarProperties.class})
public class GlobalTransactionAutoConfiguration {
    private final ApplicationContext applicationContext;
    private final FescarProperties fescarProperties;
    public GlobalTransactionAutoConfiguration(ApplicationContext applicationContext, FescarProperties fescarProperties) {


        this.applicationContext = applicationContext;
        this.fescarProperties = fescarProperties;
    }
    /**
     * Instantiate GlobalTransactionScanner
     * scanner is the initialization initiator for the client
     */
    @Bean
    public GlobalTransactionScanner globalTransactionScanner() {
        String applicationName = this.applicationContext.getEnvironment().getProperty("spring.application.name");
        String txServiceGroup = this.fescarProperties.getTxServiceGroup();
        if (StringUtils.isEmpty(txServiceGroup)) {
            txServiceGroup = applicationName + "-fescar-service-group";
            this.fescarProperties.setTxServiceGroup(txServiceGroup);
        }
        return new GlobalTransactionScanner(applicationName, txServiceGroup);
    }
}
```

You can see that it supports a configuration item FescarProperties, used to configure the transaction group name

```json
spring.cloud.alibaba.fescar.tx-service-group=my_test_tx_group
```

If the service group is not specified, the default name generated is spring.application.name + "-fescar-service-group". Therefore, if spring.application.name is not specified, it will report an error when starting.

```java
@ConfigurationProperties("spring.cloud.alibaba.fescar")
public class FescarProperties {
    private String txServiceGroup;
    public FescarProperties() {}
    public String getTxServiceGroup() {
        return this.txServiceGroup;
    }
    public void setTxServiceGroup(String txServiceGroup) {
        this.txServiceGroup = txServiceGroup;
    }
}
```

After obtaining the applicationId and txServiceGroup, create a [GlobalTransactionScanner](https://github.com/apache/incubator-seata/blob/develop/spring/src/main/java/com/alibaba/fescar/spring/annotation/GlobalTransactionScanner.java) object, mainly seeing the initClient method in the class.

```java
private void initClient() {
    if (StringUtils.isNullOrEmpty(applicationId) || StringUtils.isNullOrEmpty(txServiceGroup)) {
        throw new IllegalArgumentException("applicationId: " + applicationId + " txServiceGroup: " + txServiceGroup);
    }
    // init TM
    TMClient.init(applicationId, txServiceGroup);
    // init RM
    RMClient.init(applicationId, txServiceGroup);
}
```

In the method, you can see that `TMClient` and `RMClient` are initialized. For a service, it can be both TM and RM roles. When it is TM or RM depends on whether the `@GlobalTransactional` annotation is marked in a global transaction. The result of the Client creation is a Netty connection with TC, so you can see two Netty Channels in the startup log, indicating that the transactionRole is `TMROLE` and `RMROLE`.

```java
2019-04-09 13:42:57.417 INFO 93715 --- [imeoutChecker_1] c.a.f.c.rpc.netty.NettyPoolableFactory : NettyPool create channel to {"address":"127.0.0.1:8091", "message":{"applicationId":"business-service", "byteBuffer":{"char":"\u0000","direct":false,"double":0.0,"float":0.0,"int":0,"long":0,"readOnly":false,"short":0},"transactionServiceGroup":"my_test_tx_group","typeCode":101,"version":"0.4.1"},"transactionRole":"TMROLE"}
2019-04-09 13:42:57.505 INFO 93715 --- [imeoutChecker_1] c.a.f.c.rpc.netty.NettyPoolableFactory : NettyPool create channel to {"address":"127.0.0.1:8091", "message":{"applicationId":"business-service", "byteBuffer":{"char":"\u0000","direct":false,"double":0.0,"float":0.0,"int":0,"long":0,"readOnly":false,"short":0},"transactionServiceGroup":"my_test_tx_group","typeCode":103,"version":"0.4.1"},"transactionRole":"RMROLE"}
2019-04-09 13:42:57.629 DEBUG 93715 --- [lector_TMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Send:RegisterTMRequest{applicationId='business-service', transactionServiceGroup='my_test_tx_group'}
2019-04-09 13:42:57.629 DEBUG 93715 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Send:RegisterRMRequest{resourceIds='null', applicationId='business-service', transactionServiceGroup='my_test_tx_group'}
2019-04-09 13:42:57.699 DEBUG 93715 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Receive:version=0.4.1,extraData=null,identified=true,resultCode=null,msg=null,messageId:1
2019-04-09 13:42:57.699 DEBUG 93715 --- [lector_TMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Receive:version=0.4.1,extraData=null,identified=true,resultCode=null,msg=null,messageId:2
2019-04-09 13:42:57.701 DEBUG 93715 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.AbstractRpcRemoting : com.alibaba.fescar.core.rpc.netty.RmRpcClient@3b06d101 msgId:1 future :com.alibaba.fescar.core.protocol.MessageFuture@28bb1abd body:version=0.4.1,extraData=null,identified=true,resultCode=null,msg=null
2019-04-09 13:42:57.701 DEBUG 93715 --- [lector_TMROLE_1] c.a.f.c.rpc.netty.AbstractRpcRemoting : com.alibaba.fescar.core.rpc.netty.TmRpcClient@65fc3fb7 msgId:2 future :com.alibaba.fescar.core.protocol.MessageFuture@9a1e3df body:version=0.4.1,extraData=null,identified=true,resultCode=null,msg=null
2019-04-09 13:42:57.710 INFO 93715 --- [imeoutChecker_1] c.a.fescar.core.rpc.netty.RmRpcClient : register RM success. server version:0.4.1 channel:[id: 0xe6468995 L:/127.0.0.1:57397 - R:/127.0.0.1:8091]
2019-04-09 13:42:57.710 INFO 93715 --- [imeoutChecker_1] c.a.f.c.rpc.netty.NettyPoolableFactory : register success cost 114 ms version:0.4.1 role:TMROLE channel:[id: 0xd22fe0c5 L:/127.0.0.1:57398 - R:/127.0.0.1:8091]
2019-04-09 13:42:57.711 INFO 93715 --- [imeoutChecker_1] c.a.f.c.rpc.netty.NettyPoolableFactory : register success cost 125 ms version:0.4.1 role:RMROLE channel:[id: 0xe6468995 L:/127.0.0.1:57397 - R:/127.0.0.1:8091]
```

The log shows

1. Create Netty connection
2. Send registration request
3. Receive response result
4. `RmRpcClient`, `TmRpcClient` successfully instantiated

## TM Process Flow

In this example, the TM role is business-service. The purchase method of BusinessService is marked with the `@GlobalTransactional` annotation.

```java
@Service
public class BusinessService {
    @Autowired
    private StorageFeignClient storageFeignClient;
    @Autowired
    private OrderFeignClient orderFeignClient;
    @GlobalTransactional
    public void purchase(String userId, String commodityCode, int orderCount) {
        storageFeignClient.deduct(commodityCode, orderCount);
        orderFeignClient.create(userId, commodityCode, orderCount);
    }
}
```

After the method is called, a global transaction will be created. First, pay attention to the function of the `@GlobalTransactional` annotation, which is intercepted and processed in the [GlobalTransactionalInterceptor](https://github.com/apache/incubator-seata/blob/develop/spring/src/main/java/com/alibaba/fescar/spring/annotation/GlobalTransactionalInterceptor.java).

```java
/**
 * AOP intercepts method calls
 */
@Override
public Object invoke(final MethodInvocation methodInvocation) throws Throwable {
    Class<?> targetClass = (methodInvocation.getThis() != null ? AopUtils.getTargetClass(methodInvocation.getThis()) : null);
    Method specificMethod = ClassUtils.getMostSpecificMethod(methodInvocation.getMethod(), targetClass);
    final Method method = BridgeMethodResolver.findBridgedMethod(specificMethod);
    // Get the GlobalTransactional annotation of the method
    final GlobalTransactional globalTransactionalAnnotation = getAnnotation(method, GlobalTransactional.class);
    final GlobalLock globalLockAnnotation = getAnnotation(method, GlobalLock.class);
    // If the method has the GlobalTransactional annotation, intercept the corresponding method processing
    if (globalTransactionalAnnotation != null) {
        return handleGlobalTransaction(methodInvocation, globalTransactionalAnnotation);
    } else if (globalLockAnnotation != null) {
        return handleGlobalLock(methodInvocation);
    } else {
        return methodInvocation.proceed();
    }
}
```

The `handleGlobalTransaction` method calls the execute method of the [TransactionalTemplate](https://github.com/apache/incubator-seata/blob/develop/tm/src/main/java

/com/alibaba/fescar/tm/api/TransactionalTemplate.java). As the class name suggests, this is a standard template method that defines the standard steps for TM to handle global transactions. The comments are already quite clear.

```java
public Object execute(TransactionalExecutor business) throws TransactionalExecutor.ExecutionException {
    // 1. get or create a transaction
    GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();
    try {
        // 2. begin transaction
        try {
            triggerBeforeBegin();
            tx.begin(business.timeout(), business.name());
            triggerAfterBegin();
        } catch (TransactionException txe) {
            throw new TransactionalExecutor.ExecutionException(tx, txe, TransactionalExecutor.Code.BeginFailure);
        }
        Object rs = null;
        try {
            // Do Your Business
            rs = business.execute();
        } catch (Throwable ex) {
            // 3. any business exception rollback.
            try {
                triggerBeforeRollback();
                tx.rollback();
                triggerAfterRollback();
                // 3.1 Successfully rolled back
                throw new TransactionalExecutor.ExecutionException(tx, TransactionalExecutor.Code.RollbackDone, ex);
            } catch (TransactionException txe) {
                // 3.2 Failed to rollback
                throw new TransactionalExecutor.ExecutionException(tx, txe, TransactionalExecutor.Code.RollbackFailure, ex);
            }
        }
        // 4. everything is fine commit.
        try {
            triggerBeforeCommit();
            tx.commit();
            triggerAfterCommit();
        } catch (TransactionException txe) {
            // 4.1 Failed to commit
            throw new TransactionalExecutor.ExecutionException(tx, txe, TransactionalExecutor.Code.CommitFailure);
        }
        return rs;
    } finally {
        // 5. clear
        triggerAfterCompletion();
        cleanUp();
    }
}
```

The begin method of [DefaultGlobalTransaction](https://github.com/apache/incubator-seata/blob/develop/tm/src/main/java/com/alibaba/fescar/tm/api/DefaultGlobalTransaction.java) is called to start a global transaction.

```java
public void begin(int timeout, String name) throws TransactionException {
    if (role != GlobalTransactionRole.Launcher) {
        check();
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Ignore Begin(): just involved in global transaction [" + xid + "]");
        }
        return;
    }
    if (xid != null) {
        throw new IllegalStateException();
    }
    if (RootContext.getXID() != null) {
        throw new IllegalStateException();
    }
    // Specific method to start the transaction, get the XID returned by TC
    xid = transactionManager.begin(null, null, name, timeout);
    status = GlobalStatus.Begin;
    RootContext.bind(xid);
    if (LOGGER.isDebugEnabled()) {
        LOGGER.debug("Begin a NEW global transaction [" + xid + "]");
    }
}
```

At the beginning of the method, `if (role != GlobalTransactionRole.Launcher)` checks the role to determine whether the current role is the initiator (Launcher) or the participant (Participant) of the global transaction. If the `@GlobalTransactional` annotation is also added to the downstream system methods in a distributed transaction, its role is Participant, and the subsequent begin will be ignored and directly returned. The determination of whether it is a Launcher or Participant is based on whether the current context already has an XID. The one without an XID is the Launcher, and the one with an XID is the Participant. Therefore, the creation of a global transaction can only be executed by the Launcher, and only one Launcher exists in a distributed transaction.

The [DefaultTransactionManager](https://github.com/apache/incubator-seata/blob/develop/tm/src/main/java/com/alibaba/fescar/tm/DefaultTransactionManager.java) is responsible for TM and TC communication, sending begin, commit, rollback instructions.

```java
@Override
public String begin(String applicationId, String transactionServiceGroup, String name, int timeout) throws TransactionException {
    GlobalBeginRequest request = new GlobalBeginRequest();
    request.setTransactionName(name);
    request.setTimeout(timeout);
    GlobalBeginResponse response = (GlobalBeginResponse) syncCall(request);
    return response.getXid();
}
```

At this point, the XID returned by fescar-server indicates that a global transaction has been successfully created. The log also reflects the above process.

```java
2019-04-09 13:46:57.417 DEBUG 31326 --- [nio-8084-exec-1] c.a.f.c.rpc.netty.AbstractRpcRemoting : offer message: timeout=60000, transactionName=purchase(java.lang.String, java.lang.String, int)
2019-04-09 13:46:57.417 DEBUG 31326 --- [geSend_TMROLE_1] c.a.f.c.rpc.netty.AbstractRpcRemoting : write message:FescarMergeMessage, timeout=60000, transactionName=purchase(java.lang.String, java.lang.String, int) channel:[id: 0xa148545e L:/127.0.0.1:56120 - R:/127.0.0.1:8091] active?true, writable?true, isopen?true
2019-04-09 13:46:57.418 DEBUG 31326 --- [lector_TMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Send:FescarMergeMessage, timeout=60000, transactionName=purchase(java.lang.String, java.lang.String, int)
2019-04-09 13:46:57.421 DEBUG 31326 --- [lector_TMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Receive:MergeResultMessage, com.alibaba.fescar.core.protocol.transaction.GlobalBeginResponse@2dc480dc, messageId:1
2019-04-09 13:46:57.421 DEBUG 31326 --- [nio-8084-exec-1] c.a.fescar.core.context.RootContext : bind 192.168.224.93:8091:2008502699
2019-04-09 13:46:57.421 DEBUG 31326 --- [nio-8084-exec-1] c.a.f.tm.api.DefaultGlobalTransaction : Begin a NEW global transaction [192.168.224.93:8091:2008502699]
```

After the global transaction is created, business.execute() is executed, which is the business code `storageFeignClient.deduct(commodityCode, orderCount)` that enters the RM processing flow. The business logic here is to call the inventory service's deduct inventory interface.

## RM Processing Flow

```java
@GetMapping(path = "/deduct")
public Boolean deduct(String commodityCode, Integer count) {
    storageService.deduct(commodityCode, count);
    return true;
}
@Transactional
public void deduct(String commodityCode, int count) {
    Storage storage = storageDAO.findByCommodityCode(commodityCode);
    storage.setCount(storage.getCount() - count);
    storageDAO.save(storage);
}
```

The interface and service method of storage do not appear to have fescar-related code and annotations, reflecting fescar's non-intrusiveness. How does it join this global transaction? The answer is in the [ConnectionProxy](https://github.com/apache/incubator-seata/blob/develop/rm-datasource/src/main/java/com/alibaba/fescar/rm/datasource/ConnectionProxy.java), which is why the `DataSourceProxy` must be used. Through DataSourceProxy, fescar can register branch transactions and send RM's processing results to TC at the cut-in point of local transaction submission in business code. Since the local transaction submission of business code is implemented by the proxy of `ConnectionProxy`, the commit method of ConnectionProxy is actually executed during local transaction submission.

```java
public void commit() throws SQLException {
    // If it is a global transaction, perform global transaction submission
    // Determine if it is a global transaction, just check if there is an XID in the current context
    if (context.inGlobalTransaction()) {
        processGlobalTransactionCommit();
    } else if (context.isGlobalLockRequire()) {
        processLocalCommitWithGlobalLocks();
    } else {
        targetConnection.commit();
    }
}

private void processGlobalTransactionCommit() throws SQLException {
    try {
        // First register RM with TC and get the branchId assigned by TC
        register();
    } catch (TransactionException e) {
        recognizeLockKeyConflictException(e);
    }
    try {
        if (context.hasUndoLog()) {
            // Write undo log
            UndoLogManager.flushUndoLogs(this);
        }
        // Commit local transaction, write undo_log and business data in a local transaction
        targetConnection.commit();
    } catch (Throwable ex) {
        // Notify TC that RM's transaction processing failed
        report(false);
        if (ex instanceof SQLException) {
            throw new SQLException(ex);
        }
    }
    // Notify TC that RM's transaction processing succeeded
    report(true);
    context.reset();
}

private void register() throws TransactionException {
    // Register RM, build request to send registration instructions to TC via netty
    Long branchId = DefaultResourceManager.get().branchRegister(BranchType.AT, getDataSourceProxy().getResourceId(), null, context.getXid(), null, context.buildLockKeys());
    // Save the returned branchId in the context
    context.setBranchId(branchId);
}
```

Verify the above process through logs.

```java
2019-04-09 21:57:48.341 DEBUG 38933 --- [nio-8081-exec-1] o.s.c.a.f.web.FescarHandlerInterceptor : xid in Root

Context null xid in RpcContext 192.168.0.2:8091:2008546211
2019-04-09 21:57:48.341 DEBUG 38933 --- [nio-8081-exec-1] c.a.fescar.core.context.RootContext : bind 192.168.0.2:8091:2008546211
2019-04-09 21:57:48.341 DEBUG 38933 --- [nio-8081-exec-1] o.s.c.a.f.web.FescarHandlerInterceptor : bind 192.168.0.2:8091:2008546211 to RootContext
2019-04-09 21:57:48.386 INFO 38933 --- [nio-8081-exec-1] o.h.h.i.QueryTranslatorFactoryInitiator : HHH000397: Using ASTQueryTranslatorFactory
Hibernate: select storage0_.id as id1_0_, storage0_.commodity_code as commodit2_0_, storage0_.count as count3_0_ from storage_tbl storage0_ where storage0_.commodity_code=?
Hibernate: update storage_tbl set count=? where id=?
2019-04-09 21:57:48.673 INFO 38933 --- [nio-8081-exec-1] c.a.fescar.core.rpc.netty.RmRpcClient : will connect to 192.168.0.2:8091
2019-04-09 21:57:48.673 INFO 38933 --- [nio-8081-exec-1] c.a.fescar.core.rpc.netty.RmRpcClient : RM will register :jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false
2019-04-09 21:57:48.673 INFO 38933 --- [nio-8081-exec-1] c.a.f.c.rpc.netty.NettyPoolableFactory : NettyPool create channel to {"address":"192.168.0.2:8091", "message":{"applicationId":"storage-service", "byteBuffer":{"char":"\u0000","direct":false,"double":0.0,"float":0.0,"int":0,"long":0,"readOnly":false,"short":0},"resourceIds":"jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false","transactionServiceGroup":"hello-service-fescar-service-group","typeCode":103,"version":"0.4.0"},"transactionRole":"RMROLE"}
2019-04-09 21:57:48.677 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Send:RegisterRMRequest{resourceIds='jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false', applicationId='storage-service', transactionServiceGroup='hello-service-fescar-service-group'}
2019-04-09 21:57:48.680 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Receive:version=0.4.1,extraData=null,identified=true,resultCode=null,msg=null,messageId:9
2019-04-09 21:57:48.680 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.AbstractRpcRemoting : com.alibaba.fescar.core.rpc.netty.RmRpcClient@7d61f5d4 msgId:9 future :com.alibaba.fescar.core.protocol.MessageFuture@186cd3e0 body:version=0.4.1,extraData=null,identified=true,resultCode=null,msg=null
2019-04-09 21:57:48.680 INFO 38933 --- [nio-8081-exec-1] c.a.fescar.core.rpc.netty.RmRpcClient : register RM success. server version:0.4.1 channel:[id: 0xd40718e3 L:/192.168.0.2:62607 - R:/192.168.0.2:8091]
2019-04-09 21:57:48.680 INFO 38933 --- [nio-8081-exec-1] c.a.f.c.rpc.netty.NettyPoolableFactory : register success cost 3 ms version:0.4.1 role:RMROLE channel:[id: 0xd40718e3 L:/192.168.0.2:62607 - R:/192.168.0.2:8091]
2019-04-09 21:57:48.680 DEBUG 38933 --- [nio-8081-exec-1] c.a.f.c.rpc.netty.AbstractRpcRemoting : offer message: transactionId=2008546211, branchType=AT, resourceId=jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false, lockKey=storage_tbl:1
2019-04-09 21:57:48.681 DEBUG 38933 --- [geSend_RMROLE_1] c.a.f.c.rpc.netty.AbstractRpcRemoting : write message:FescarMergeMessage, transactionId=2008546211, branchType=AT, resourceId=jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false, lockKey=storage_tbl:1 channel:[id: 0xd40718e3 L:/192.168.0.2:62607 - R:/192.168.0.2:8091] active?true, writable?true, isopen?true
2019-04-09 21:57:48.681 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Send:FescarMergeMessage, transactionId=2008546211, branchType=AT, resourceId=jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false, lockKey=storage_tbl:1
2019-04-09 21:57:48.687 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Receive:MergeResultMessage, BranchRegisterResponse: transactionId=2008546211, branchId=2008546212, result code=Success, getMsg=null, messageId:11
2019-04-09 21:57:48.702 DEBUG 38933 --- [nio-8081-exec-1] c.a.f.rm.datasource.undo.UndoLogManager : Flushing UNDO LOG: {"branchId":2008546212, "sqlUndoLogs":[{"afterImage":{"rows":[{"fields":[{"keyType":"PrimaryKey","name":"id","type":4,"value":1},{"keyType":"NULL","name":"count","type":4,"value":993}]}],"tableName":"storage_tbl"},"beforeImage":{"rows":[{"fields":[{"keyType":"PrimaryKey","name":"id","type":4,"value":1},{"keyType":"NULL","name":"count","type":4,"value":994}]}],"tableName":"storage_tbl"},"sqlType":"UPDATE","tableName":"storage_tbl"}],"xid":"192.168.0.2:8091:2008546211"}
2019-04-09 21:57:48.755 DEBUG 38933 --- [nio-8081-exec-1] c.a.f.c.rpc.netty.AbstractRpcRemoting : offer message: transactionId=2008546211, branchId=2008546212, resourceId=null, status=PhaseOne_Done, applicationData=null
2019-04-09 21:57:48.755 DEBUG 38933 --- [geSend_RMROLE_1] c.a.f.c.rpc.netty.AbstractRpcRemoting : write message:FescarMergeMessage, transactionId=2008546211, branchId=2008546212, resourceId=null, status=PhaseOne_Done, applicationData=null channel:[id: 0xd40718e3 L:/192.168.0.2:62607 - R:/192.168.0.2:8091] active?true, writable?true, isopen?true
2019-04-09 21:57:48.756 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Send:FescarMergeMessage, transactionId=2008546211, branchId=2008546212, resourceId=null, status=PhaseOne_Done, applicationData=null
2019-04-09 21:57:48.758 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Receive:MergeResultMessage, com.alibaba.fescar.core.protocol.transaction.BranchReportResponse@582a08cf, messageId:13
2019-04-09 21:57:48.799 DEBUG 38933 --- [nio-8081-exec-1] c.a.fescar.core.context.RootContext : unbind 192.168.0.2:8091:2008546211
2019-04-09 21:57:48.799 DEBUG 38933 --- [nio-8081-exec-1] o.s.c.a.f.web.FescarHandlerInterceptor : unbind 192.168.0.2:8091:2008546211 from RootContext
```

1. Get the XID passed from business-service
2. Bind X

ID to the current context
3. Execute business logic SQL
4. Create a Netty connection to TC
5. Send branch transaction information to TC
6. Get the branchId returned by TC
7. Record Undo Log data
8. Send the processing result of PhaseOne stage to TC
9. Unbind XID from the current context

Steps 1 and 9 are completed in the [FescarHandlerInterceptor](https://github.com/dongsheep/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-fescar/src/main/java/org/springframework/cloud/alibaba/fescar/web/FescarHandlerInterceptor.java), which is not part of fescar, but implemented in spring-cloud-alibaba-fescar. It realizes the bind and unbind of xid to the current request context during feign and rest communication.

Here, RM completes the work of the PhaseOne stage, then look at the processing logic of the PhaseTwo stage.

## Transaction Commit

After each branch transaction is completed, TC summarizes the reported results of each RM and sends commit or rollback instructions to each RM.

```java
2019-04-09 21:57:49.813 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Receive:xid=192.168.0.2:8091:2008546211, branchId=2008546212, branchType=AT, resourceId=jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false, applicationData=null, messageId:1
2019-04-09 21:57:49.813 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.AbstractRpcRemoting : com.alibaba.fescar.core.rpc.netty.RmRpcClient@7d61f5d4 msgId:1 body:xid=192.168.0.2:8091:2008546211, branchId=2008546212, branchType=AT, resourceId=jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false, applicationData=null
2019-04-09 21:57:49.814 INFO 38933 --- [atch_RMROLE_1_8] c.a.f.core.rpc.netty.RmMessageListener : onMessage:xid=192.168.0.2:8091:2008546211, branchId=2008546212, branchType=AT, resourceId=jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false, applicationData=null
2019-04-09 21:57:49.816 INFO 38933 --- [atch_RMROLE_1_8] com.alibaba.fescar.rm.AbstractRMHandler : Branch committing: 192.168.0.2:8091:2008546211, 2008546212, jdbc:mysql://127.0.0.1:3306/db_storage?useSSL=false, null
2019-04-09 21:57:49.816 INFO 38933 --- [atch_RMROLE_1_8] com.alibaba.fescar.rm.AbstractRMHandler : Branch commit result: PhaseTwo_Committed
2019-04-09 21:57:49.817 INFO 38933 --- [atch_RMROLE_1_8] c.a.fescar.core.rpc.netty.RmRpcClient : RmRpcClient sendResponse branchStatus=PhaseTwo_Committed, result code=Success, getMsg=null
2019-04-09 21:57:49.817 DEBUG 38933 --- [atch_RMROLE_1_8] c.a.f.c.rpc.netty.AbstractRpcRemoting : send response:branchStatus=PhaseTwo_Committed, result code=Success, getMsg=null channel:[id: 0xd40718e3 L:/192.168.0.2:62607 - R:/192.168.0.2:8091]
2019-04-09 21:57:49.817 DEBUG 38933 --- [lector_RMROLE_1] c.a.f.c.rpc.netty.MessageCodecHandler : Send:branchStatus=PhaseTwo_Committed, result code=Success, getMsg=null
```

The log shows

1. RM receives the commit notice of XID=192.168.0.2:8091:2008546211, branchId=2008546212
2. Execute the commit action
3. Send the commit result to TC, branchStatus is PhaseTwo_Committed

Specifically, see the execution process of the second stage commit in the doBranchCommit method of the [AbstractRMHandler](https://github.com/apache/incubator-seata/blob/develop/rm/src/main/java/com/alibaba/fescar/rm/AbstractRMHandler.java) class.

```java
/**
 * Get the key parameters such as xid and branchId notified
 * Then call the RM's branchCommit
 */
protected void doBranchCommit(BranchCommitRequest request, BranchCommitResponse response) throws TransactionException {
    String xid = request.getXid();
    long branchId = request.getBranchId();
    String resourceId = request.getResourceId();
    String applicationData = request.getApplicationData();
    LOGGER.info("Branch committing: " + xid + " " + branchId + " " + resourceId + " " + applicationData);
    BranchStatus status = getResourceManager().branchCommit(request.getBranchType(), xid, branchId, resourceId, applicationData);
    response.setBranchStatus(status);
    LOGGER.info("Branch commit result: " + status);
}
```

Eventually, the branchCommit request will be called to the branchCommit method of [AsyncWorker](https://github.com/apache/incubator-seata/blob/develop/rm-datasource/src/main/java/com/alibaba/fescar/rm/datasource/AsyncWorker.java). AsyncWorker's processing method is a key part of fescar's architecture. Since most transactions will be committed normally, they end in the PhaseOne stage. This way, locks can be released as quickly as possible. After receiving the commit instruction in the PhaseTwo stage, the asynchronous processing can be done. This excludes the time consumption of the PhaseTwo stage from a distributed transaction.

```java
private static final List<Phase2Context> ASYNC_COMMIT_BUFFER = Collections.synchronizedList(new ArrayList<Phase2Context>());

/**
 * Add the XID to be committed to the list
 */
@Override
public BranchStatus branchCommit(BranchType branchType, String xid, long branchId, String resourceId, String applicationData) throws TransactionException {
    if (ASYNC_COMMIT_BUFFER.size() < ASYNC_COMMIT_BUFFER_LIMIT) {
        ASYNC_COMMIT_BUFFER.add(new Phase2Context(branchType, xid, branchId, resourceId, applicationData));
    } else {
        LOGGER.warn("Async commit buffer is FULL. Rejected branch [" + branchId + "/" + xid + "] will be handled by housekeeping later.");
    }
    return BranchStatus.PhaseTwo_Committed;
}

/**
 * Consume the XIDs in ASYNC_COMMIT_BUFFER through scheduled tasks
 */
public synchronized void init() {
    LOGGER.info("Async Commit Buffer Limit: " + ASYNC_COMMIT_BUFFER_LIMIT);
    timerExecutor = new ScheduledThreadPoolExecutor(1, new NamedThreadFactory("AsyncWorker", 1, true));
    timerExecutor.scheduleAtFixedRate(new Runnable() {
        @Override
        public void run() {
            try {
                doBranchCommits();
            } catch (Throwable e) {
                LOGGER.info("Failed at async committing ... " + e.getMessage());
            }
        }
    }, 10, 1000 * 1, TimeUnit.MILLISECONDS);
}

private void doBranchCommits() {
    if (ASYNC_COMMIT_BUFFER.size() == 0) {
        return;
    }
    Map<String, List<Phase2Context>> mappedContexts = new HashMap<>();
    Iterator<Phase2Context> iterator = ASYNC_COMMIT_BUFFER.iterator();
    // In a timed loop, take out all pending data in ASYNC_COMMIT_BUFFER
    // Group the data to be committed with resourceId as the key. The resourceId is the database connection URL
    // This can be seen in the previous log, the purpose is to cover the multiple data sources created by the application
    while (iterator.hasNext()) {
        Phase2Context commitContext = iterator.next();
        List<Phase2Context> contextsGroupedByResourceId = mappedContexts.get(commitContext.resourceId);
        if (contextsGroupedByResourceId == null) {
            contextsGroupedByResourceId = new ArrayList<>();
            mappedContexts.put(commitContext.resourceId, contextsGroupedByResourceId);
        }
        contextsGroupedByResourceId.add(commitContext);
        iterator.remove();
    }
    for (Map.Entry<String, List<Phase2Context>> entry : mappedContexts.entrySet()) {
        Connection conn = null;
        try {
            try {
                // Get the data source and connection based on resourceId
                DataSourceProxy dataSourceProxy = DataSourceManager.get().get(entry.getKey());
                conn = dataSourceProxy.getPlainConnection();
            } catch (SQLException sqle) {
                LOGGER.warn("Failed to get connection for async committing on " + entry.getKey(), sqle);
                continue;
            }
            List<Phase2Context> contextsGroupedByResourceId = entry.getValue();
            for (Phase2Context commitContext : contextsGroupedByResourceId) {
                try {
                    // Perform undolog processing, that is, delete the records corresponding to xid and branchId
                    UndoLogManager.deleteUndoLog(commitContext.xid, commitContext.branchId, conn);
                } catch

 (Exception ex) {
                    LOGGER.warn("Failed to delete undo log [" + commitContext.branchId + "/" + commitContext.xid + "]", ex);
                }
            }
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException closeEx) {
                    LOGGER.warn("Failed to close JDBC resource while deleting undo_log ", closeEx);
                }
            }
        }
    }
}
```

So for the commit action, RM only needs to delete the undo_log corresponding to xid and branchId.

## Transaction Rollback

There are two scenarios for triggering rollback:

1. Branch transaction processing exception, that is the case of `report(false)` in the [ConnectionProxy](https://github.com/apache/incubator-seata/blob/develop/rm-datasource/src/main/java/com/alibaba/fescar/rm/datasource/ConnectionProxy.java)
2. TM catches the exceptions thrown from the downstream system, that is the exception caught by the method marked with the `@GlobalTransactional` annotation in the initiated global transaction. In the previous template method execute of the [TransactionalTemplate](https://github.com/apache/incubator-seata/blob/develop/tm/src/main/java/com/alibaba/fescar/tm/api/TransactionalTemplate.java), the call to business.execute() was caught. After the catch, it will call rollback, and TM will notify TC that the corresponding XID needs to roll back the transaction.

```java
public void rollback() throws TransactionException {
    // Only the Launcher can initiate this rollback
    if (role == GlobalTransactionRole.Participant) {
        // Participant has no responsibility of committing
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Ignore Rollback(): just involved in global transaction [" + xid + "]");
        }
        return;
    }
    if (xid == null) {
        throw new IllegalStateException();
    }
    status = transactionManager.rollback(xid);
    if (RootContext.getXID() != null) {
        if (xid.equals(RootContext.getXID())) {
            RootContext.unbind();
        }
    }
}
```

TC summarizes and sends rollback instructions to the participants. RM receives the rollback notice in the doBranchRollback method of the [AbstractRMHandler](https://github.com/apache/incubator-seata/blob/develop/rm/src/main/java/com/alibaba/fescar/rm/AbstractRMHandler.java) class.

```java
protected void doBranchRollback(BranchRollbackRequest request, BranchRollbackResponse response) throws TransactionException {
    String xid = request.getXid();
    long branchId = request.getBranchId();
    String resourceId = request.getResourceId();
    String applicationData = request.getApplicationData();
    LOGGER.info("Branch rolling back: " + xid + " " + branchId + " " + resourceId);
    BranchStatus status = getResourceManager().branchRollback(request.getBranchType(), xid, branchId, resourceId, applicationData);
    response.setBranchStatus(status);
    LOGGER.info("Branch rollback result: " + status);
}
```

Then the rollback request is passed to the branchRollback method of the [DataSourceManager](https://github.com/apache/incubator-seata/blob/develop/rm-datasource/src/main/java/com/alibaba/fescar/rm/datasource/DataSourceManager.java) class.

```java
public BranchStatus branchRollback(BranchType branchType, String xid, long branchId, String resourceId, String applicationData) throws TransactionException {
    // Get the corresponding data source based on resourceId
    DataSourceProxy dataSourceProxy = get(resourceId);
    if (dataSourceProxy == null) {
        throw new ShouldNeverHappenException();
    }
    try {
        UndoLogManager.undo(dataSourceProxy, xid, branchId);
    } catch (TransactionException te) {
        if (te.getCode() == TransactionExceptionCode.BranchRollbackFailed_Unretriable) {
            return BranchStatus.PhaseTwo_RollbackFailed_Unretryable;
        } else {
            return BranchStatus.PhaseTwo_RollbackFailed_Retryable;
        }
    }
    return BranchStatus.PhaseTwo_Rollbacked;
}
```

Ultimately, the undo method of the [UndoLogManager](https://github.com/apache/incubator-seata/blob/develop/rm-datasource/src/main/java/com/alibaba/fescar/rm/datasource/undo/UndoLogManager.java) is executed. Since it is pure JDBC operation, the code is relatively long and will not be posted here. You can view the source code on GitHub via the link. Briefly describe the undo process:

1. Find the undo_log submitted in the PhaseOne stage based on xid and branchId.
2. If found, generate the playback SQL based on the data recorded in the undo_log and execute it, that is, restore the data modified in the PhaseOne stage.
3. After step 2 is completed, delete the corresponding undo_log data.
4. If no corresponding undo_log is found in step 1, insert a new undo_log with the status `GlobalFinished`. The reason it is not found may be that the local transaction in the PhaseOne stage encountered an exception, resulting in no normal write-in. Because xid and branchId are unique indexes, the insertion in step 4 can prevent successful write-in after recovery in the PhaseOne stage. In this way, the business data will not be successfully submitted, achieving the effect of final rollback.

## Summary

Combining distributed business scenarios with local, this article analyzes the main processing flow of the fescar client side and analyzes the main source code for the TM and RM roles, hoping to help you understand the working principles of fescar. With the rapid iteration of fescar and the planning of future Roadmaps, it is believed that fescar can become a benchmark solution for open-source distributed transactions in time.
