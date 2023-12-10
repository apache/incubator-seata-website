---
title: Seata Parameter Configuration
keywords: [Seata]
description: Seata parameter configuration.
---

# The Seata Parameter Configuration

## Attention attribute (see all attributes for detailed description)



|Server side | client side|
|---------------|------------|
| registry.type |registry.type|
| config.type |config.type|
| #store.mode=db requires the following configuration | service.vgroupMapping.my_ test_ tx_ group|
| store.db.driverClassName | service.default. grouplist |
| store.db.url |service. disableGlobalTransaction |
| store.db.user | |
| store.db.password | |
| #store.mode=Redis requires the following configurations ||
| store.redis.host | |
| store.redis.port | |
| store.redis.database | |
| store.redis.password | |



## All attributes



### Public sector



| key | desc | remark| change record |
|---------------|--------------|----|----------------------------|
|transport.type | Socket communication mode | TCP, UNIX_ DOMAIN_ SOCKET, default TCP|
|transport.server | socket channel type | NIO, NATIVE (select KQueue or Epoll according to the operating system type and socket communication mode. Note that Windows only supports NIO, and NATIVE mode will throw an exception)|
|transport.enableTmClientBatchSendRequest | TM Batch Send Request Message Switch | Default false | new in 1.5.1 version|
|transport.enableRmClientBatchSendRequest | RM Batch Send Request Message Switch | Default true | new in 1.5.1 version|
|transport.enableTcServerBatchSendResponse | TC Batch Send Reply Message Switch | Default false | new in 1.5.1 version|
|transport.rpcRmRequestTimeout | RM sending request timeout | 30 seconds by default | new in 1.5.1 version|
|transport.rpcTmRequestTimeout | TM sending request timeout | 30 seconds by default | new in 1.5.1 version|
|transport.rpcTcRequestTimeout | TC sending request timeout | 30 seconds by default | new in 1.5.1 version|
|transport.threadFactory. bossThreadSize | Netty communication model Boss group threads | Default 1|
|transport.threadFactory. workerThreadSize | Netty communication model Worker group threads | The number of threads can be configured or the number of threads in a specific thread working mode can be selected. There are four default working modes of threads: Auto (2 * CPU cores+1), Pin (CPU cores, applicable to computing intensive tasks), BusyPin (CPU cores+1, applicable to computing intensive and memory limited scenarios) Default (2 * CPU cores, applicable to IO intensive tasks), the default value is Default mode|
|transport.shutdown. wait | Time to wait for service offline before the Netty thread pool on the server is closed | 3 seconds by default|
|transport.serialization | Client and server communication codec method | seata (ByteBuf), protobuf, kryo, hessian, fst, default seata|
|transport.compressor | Compression method of communication data between client and server | none, gzip, zip, sevenz, bzip2, lz4, deflater, zstd, default none | Before 1.2.0: gzip<br/>1.2.0: zip, sevenz, bzip2<br/>1.3.0: lz4<br/>1.4.1: deflater <br/> 1.5.1: zstd|
|transport.heartbeat | The heartbeat detection switch for client server communication | The default value is true|
|Registry.type | Registry type | Default file, supports file, nacos, redis, eureka, zk, consumer, etcd3, sofa, and custom | 1.6.0 Server supports simultaneous registration to multiple registries, separating registry names with commas|
|Config.type | Configuration center type | default file, supporting file, nacos, apollo, zk, consult, etcd3, springcloud, custom|

### Server side



| key| desc | remark| change record |
|-------------------------------------------|---------------------------------|----------------------------|----------------|
| server.undo.logSaveDays | undo retention days | 7 days by default, log_ Status=1 (Appendix 3) and undo not normally cleaned|
| server.undo.logDeletePeriod | undo Cleanup Thread Interval | 86,400,000 by default, in milliseconds|
| server.maxCommitRetryTimeout | Timeout duration of two-phase commit retry | Unit: ms, s, m, h, d, corresponding to ms, s, min, h, day, default ms. The default value of - 1 means unlimited retries. Formula: timeout>=now globalTransactionBeginTime, true means no more retries after timeout (Note: no retries will be made after the timeout is reached, and there is a risk of data inconsistency, unless the business can calibrate the data itself, otherwise use with caution)|
| server.maxRollbackRetryTimeout | Phase2 rollback retry timeout duration | Same as commit|
| server.recovery.committingRetryPeriod | Phase2 commit unfinished status Global transaction retry commit thread interval | 1000 by default, in milliseconds|
| server.recovery.asyncCommittingRetryPeriod | Phase2 asynchronous submission status Retry submission thread interval | 1000 by default, in milliseconds|
| server.recovery.rollbackRetryPeriod | Phase2 rollback status Retry rollback thread interval | 1000 by default, in milliseconds|
| server.recovery.timeoutRetryPeriod | Timeout status detection retry thread interval | 1000 by default, in milliseconds. If timeout is detected, put the global transaction into the rollback session manager|
| server.rollbackRetryTimeoutUnlockEnable | Whether to release the lock after the two-phase rollback timeout | False by default|
| server.distributedLockExpireTime | Server side transaction management global lock timeout | 10000 by default, in milliseconds | new in 1.5.1 version|
| server.server.xaerNotaRetryTimeout | Retry timeout to prevent XA branch transactions from hanging | 60000 by default, in milliseconds | new in 1.5.1 version|
| server.session.branchAsyncQueueSize | Branch transaction session asynchronously deletes the thread pool queue size | 5000 by default | new in 1.5.1 version|
| server.session.enableBranchAsyncRemove | Asynchronous deletion switch of branch transaction session | Default false | new in 1.5.1 version|
| server.enableParallelRequestHandle | Parallel processing switch for batch request messages | Default false | new in 1.5.2 version|
| store.mode | Transaction session information storage mode | file Local file (HA is not supported), db database, redis (HA is supported) | The 1.5.1 version uses lock and session for separate storage|
| store.lock.mode | Transaction lock information storage method | file Local file (HA is not supported), db database, Redis (HA is supported); When the configuration is empty, take the store Mode configuration item value | New in 1.5.1 version, and session and lock can be stored separately|
| store.session.mode | Transaction echo information storage method | file Local file (HA is not supported), db database, Redis (HA is supported); When the configuration is empty, take the store Mode configuration item value | New in 1.5.1 version, and session and lock can be stored separately|
| store.publicKey | Public key for storing and decrypting passwords in db or Redis | | supported in version 1.4.2|
| store.file.dir | file mode file storage folder name | default sessionStore|
| store.file.maxBranchSessionSize | File mode file storage branch session maximum bytes | 16384 (16kb) by default, in bytes|
| store.file.maxGlobalSessionSize | File mode file stores the maximum number of global session bytes | 512b by default, in bytes|
| store.file.fileWriteBufferCacheSize | File mode file storage buffer maximum cache size | 16384 (16kb) by default, in bytes. When the amount of data such as session written is greater than this value, an exception will be thrown|
| store.file.flushDiskMode | file mode file storage flushing policy | default async, optional sync|
| store.file.sessionReloadReadSize | File mode File storage The maximum number of session or lock keys recovered from the backup file after the server node restarts | 100 by default|
| store.db.datasource | db mode data source type | dbcp, druid, hikari; No default value, store Must be specified when mode=db|
| store.db.dbType | db mode database type | mysql, oracle, db2, sqlserver, sybaee, h2, sqlite, access, postgresql, oceanbase; No default value, store Mode=db must be specified|
| store.db.driverClassName | db mode database driver | store Must be specified when mode=db|
| store.db.url | db mode database url | store When mode=db, it must be specified. When using MySQL as the data source, it is recommended to add 'rewriteBatchedStatements=true' to the connection parameters (see Appendix 7 for detailed reasons)|
| store.db.user | db mode database account | store Must be specified when mode=db|
| store.db.password | db mode database account password | store Must be specified when mode=db|
| store.db.minConn | initial connections of db mode database | 1 by default|
| store.db.maxConn | maximum number of connections to database in db mode | 20 by default|
| store.db.maxWait | the maximum waiting time for db mode to obtain a connection | 5000 by default, in milliseconds|
| store.db.globalTable | db mode global transaction table name | default global_ table |
| store.db.branchTable | db mode branch transaction table name | default branch_ table |
| store.db.LockTable | db mode global lock table name | default lock_ table |
| store.db.queryLimit | the maximum number of global transactions queried in db mode at one time | 100 by default|
| store.db.distributedLockTable | db mode Sever side transaction management global lock storage table name | default distributed_ Lock. Under multiple server clusters, only one server is guaranteed to handle the submission or rollback at the same time | New in 1.5.1|
| store.redis.mode | redis mode | default single, optional sentinel | New sentinel mode in 1.4.2|
| store.redis.single.host | The Redis host in stand-alone mode is compatible with versions earlier than 1.4.2. If this configuration is empty, select store.redis Host as a configuration item | New in 1.4.2|
| store.redis.single.port | The port of Redis in stand-alone mode is compatible with versions earlier than 1.4.2. If this configuration is empty, select store.redis Port as a configuration item | New in 1.4.2|
| store.redis.sentinel.masterName | Redis master database name in sentinel mode | | New in 1.4.2|
| store.redis.sentinel.sentinelHosts | sentinel hosts in sentinel mode | Multiple hosts are separated by commas | New in 1.4.2|
| store.redis.host | redis mode IP | Default 127.0.0.1 | Version 1.4.2 deprecated|
| store.redis.port | redis mode port | 6379 by default | Version 1.4.2 is deprecated|
| store.redis.maxConn | maximum connections in Redis mode | 10 by default|
| store.redis.minConn | minimum connections in Redis mode | 1 by default|
| store.redis.database | redis mode default library | default 0|
| store.redis.password | redis mode password (optional) | null by default|
| store.redis.queryLimit | The maximum number of Redis queries at a time | 100 by default|
| metrics.enabled | Whether to enable Metrics | False is off by default. In the false state, all Metrics related components will not be initialized to minimize the performance loss|
| metrics.registryType | Indicator registrar type | The indicator registrar type used by Metrics is a built-in compact (simple) implementation by default. Meters in this implementation only use a limited memory count, and the performance is high enough to meet most scenarios; Currently, only one indicator registrar can be set|
| metrics.exporterList | Index result Measurement data outputter list | default prometheus. Multiple outputters are separated by English commas, such as "prometheus, jmx". Currently, only the prometheus outputters are connected|
| metrics.exporterPrometheusPort | prometheus exporter client port number | 9898 by default|

### Client side



| key| desc | remark| change record |
|-------------------------------------------|----------------------------|----------------------------|----------------|
| seata.enabled | whether to enable spring boot automatic assembly | true, false, (SSBS) special configuration, default true (Appendix 4)|
| seata.enableAutoDataSourceProxy=true | whether to enable automatic proxy of data source | True, false, data spring boot starter (SSBS) is a special configuration. SSBS will enable automatic proxy of data source by default and can be closed through this configuration item|
| seata.useJdkProxy=false | whether to use JDK proxy as the implementation method of data source automatic proxy | true, false, (SSBS) proprietary configuration, false by default, CGLIB as the implementation method of data source automatic proxy|
| transport.enableClientBatchSendRequest | whether to batch merge and send client transaction message requests | The default is true and false|
| client.log.exceptionRate | log exception output probability | 100 by default, currently used for exception stack output in case of undo rollback failure, 1% probability output, rollback failure is basically dirty data, no need to output stack to occupy hard disk space|
| service.vgroupMapping.my_test_tx_Group | transaction group (Appendix 1) | my_ test_ tx_ Group refers to grouping, and the configuration item value is TC cluster name|
| service.default.grouplist | TC service list (Appendix 2) | Only used when the registry is file|
| service.disableGlobalTransaction | global transaction switch | False by default. false is on, true is off|
| client.tm.downgradeCheck | demote switch | False by default. The business side automatically downgrades the seata transaction based on the number of consecutive errors (see Appendix 6 for details)|
| client.tm.gradeCheckAllowTimes | threshold value for reaching the standard of promotion and demotion | 10 by default|
| client.tm.downgradeCheckPeriod | service self check cycle | 2000 by default, in ms Conduct a service self check every 2 seconds to decide|
| client.rm.reportSuccessEnable | whether to report phase I success | True, false, starting from version 1.1.0. The default is false true is used to keep the life cycle records of branch transactions complete. false can improve performance|
| client.rm.asyncCommitBufferLimit | asynchronous commit cache queue length | 10000 by default. Phase II commit succeeded. RM asynchronously cleans the undo queue|
| client.rm.lock.retryInterval | retry interval for verifying or occupying the global lock | 10 by default, in milliseconds|
| client.rm.lock.retryTimes | number of retries to verify or occupy the global lock | 30 by default|
| client.rm.lock.retryPolicyBranchRollbackOnConflict | the lock policy when a branch transaction conflicts with other global rollback transactions | The default is true. Release the local lock first to allow rollback to succeed|
| client.rm.reportRetryCount | the number of TC retries for reporting the results in the first phase | 5 by default | New in 1.4.1|
| client.rm.tableMetaCheckEnable | automatically refresh the table structure in the cache | Default false | New in 1.5.1|
| client.rm.tableMetaCheckerInterval | interval between scheduled refreshing of table structures in cache | 60 seconds by default|
| client.rm.sagaBranchRegisterEnable | whether to enable saga branch registration | In Saga mode, the branch state is stored in the local database of the state machine and can be submitted or rolled back through the state machine. To improve performance, you can consider not registering Saga branches with the TC, but you need to consider the availability of the state machine. The default is false|
| client.rm.sagaJsonParser | data serialization method in saga mode | Fastjson by default, jackson by choice | New in 1.5.1|
| client.rm.tccActionInterceptorOrder | tcc interceptor order | default Ordered HIGHEST_ PRECEDENCE+1000 ensures that the interceptor is executed before the local transaction interceptor. You can also customize the execution order of the interceptor for tcc and business development | New in 1.5.1|
| client.tm.commitRetryCount | the number of TC retries for reporting the results of the first phase global submission | 1 by default, it is recommended to be greater than 1|
| client.tm.rollbackRetryCount | the number of TC retries reported for the global rollback results in the first phase | 1 by default, it is recommended to be greater than 1|
| client.tm.defaultGlobalTransactionTimeout | global transaction timeout | The default is 60 seconds. After TM detects a branch transaction timeout or TC detects that TM has not made a two-phase report timeout, it initiates a rollback of the branch transaction | New in 1.4.0|
| client.tm.interceptorOrder | TM global transaction interceptor order | Ordered by default HIGHEST_ PRECEDENCE+1000 ensures that the interceptor is executed before the local transaction interceptor. You can also customize the execution order of the interceptor for global transactions and business development | New in 1.5.1|
| client.undo.dataValidation | Phase2 rollback image verification | By default, true is enabled and false is disabled|
| client.undo.logSerialization | undo serialization method | default jackson|
| client.undo.logTable | user defined undo table name | Default undo_ log |
| client.undo.onlyCareUpdateColumns | only images of updated columns are generated | Default true|
| client.undo.compress.enable | undo log compression switch | default true | New in 1.4.1|
| client.undo.compress.type | undo log compression algorithm | Default zip. Options include NONE, GZIP, ZIP, SEVENZ, BZIP2, LZ4, DEFLATER, and ZSTD | New in 1.4.1|
| client.undo.compress.threshold | undo log compression threshold | The default value is 64k. Compression occurs when the compression switch is on and the undo log size exceeds the threshold value | New in 1.4.1|
| client.rm.sqlParserType | sql resolution type | default druid, optional antlr|


<details>
  <summary><mark>synchronize parameters to the configuration center for use demo</mark></summary>

#### Nacos
shell:
```bash
sh ${SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca
```

Parameter description:



-h: Host, the default is localhost



-p: Port, default 8848



-g: Configure grouping. The default value is' SEATA_ GROUP'



-t: Tenant information, corresponding to the namespace ID field of Nacos, the default value is null ''

#### Apollo
```bash
sh ${SEATAPATH}/script/config-center/apollo/apollo-config.sh -h localhost -p 8070 -e DEV -a seata-server -c default -n application -d apollo -r apollo -t 3aa026fc8435d0fc4505b345b8fa4578fb646a2c
```
Parameter description:

-h: Host, the default is localhost

-p: Port, the default value is 8070

-e: Managed configuration environment, default value DEV

-a: AppId of the Namespace. The default value is seata server

-c: The name of the managed configuration cluster is generally passed in as default. If it is a special cluster, just pass in the name of the corresponding cluster. The default value is default

-n: The name of the namespace under management. If it is not in the properties format, it needs to add a suffix, such as sample.yml. The default value is application

-d: The creator of the item, in the format of domain account, that is, the user ID of the sso system

-r: Publisher, domain account. Note: If the namespace. lock. switch in Apollo ConfigDB. ServerConfig is set to true (false by default), the environment does not allow the publisher and editor to be the same person. So if the editor is zhangsan, the publisher can no longer be zhangsan.

-t: The Apollo administrator creates a third-party application at http://{portal_address}/open/manage.html. Before creating it, it is better to query whether the AppId has been created. After successful creation, a token will be generated

For details of the above parameters, see:

https://github.com/ctripcorp/apollo/wiki/Apollo%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0

#### Consul
```bash
sh ${SEATAPATH}/script/config-center/consul/consul-config.sh -h localhost -p 8500
```
Parameter description:

-h: host, the default is localhost

-p: port, the default value is 8500

#### Etcd3
```bash
sh ${SEATAPATH}/script/config-center/etcd3/etcd3-config.sh -h localhost -p 2379
```

Parameter description:

-h: Host, the default is localhost

-p: Port, the default value is 2379

python:
```bash
python ${SEATAPATH}/script/config-center/nacos/nacos-config.py localhost:8848
```

#### ZK
```bash
sh ${SEATAPATH}/script/config-center/zk/zk-config.sh -h localhost -p 2181 -z "/Users/zhangchenghui/zookeeper-3.4.14"
```
Parameter description:

-h: host, the default is localhost

-p: port, the default value is 2181

-z: zk path

</details>

### Appendix 1:

Description of transaction grouping.

1. What is a transaction group?

Transaction grouping is the resource logic of seata, similar to service instance. My in file.conf_ test_ tx_ A group is a transaction group.

2. How to find the back-end cluster through transaction grouping?

First, the program configures transaction grouping (txServiceGroup parameter of GlobalTransactionScanner construction method). The program will search for service.vgroupMapping through the user configured configuration center

Transaction grouping configuration item. The value of the configuration item obtained is the name of the TC cluster. The program that obtains the cluster name constructs the service name through a certain prefix+cluster name. The service name of each configuration center is different. Get the service name, go to the corresponding registry, pull the service list of the corresponding service name, and get the real TC service list of the back-end.

3. Why is the design so that the service name is not directly taken?

There is an additional layer to obtain the configuration of transaction groups to the mapping cluster. After this design, the transaction group can be used as the logical isolation unit of resources, which can quickly fail over when a failure occurs.

### Appendix 2:

About the grouplist question.

1. When will the default.grouplist in file.conf be used?

It is used when registry.type=file. It is not read in other times.

2. Can multiple value lists be configured for default.grouplist?

Multiple can be configured, which means cluster, but when store When mode=file, an error will be reported. The reason is that the file storage mode does not provide synchronization of local files, so you need to use store.mode=db to share data between TC clusters through db

3. Is default.grouplist recommended?

Not recommended. For example, question 1, when registering It is used when type=file, which means that the real registry is not used here, and the health check mechanism without specific services cannot automatically remove the list when the tc is unavailable. It is recommended to use nacos, eureka, redis, zk, consumer, etcd3, and sofa. Registry. type=file or config The original purpose of type=file design is to enable users to quickly verify the seata service through direct connection without relying on a third-party registry or configuration center.

4. Why is the configuration in seata spring boot starter grouplist.default, that is, the default in file.conf Is the writing of grouplist just reversed?

Due to the syntax requirements of the spring boot configuration file itself, the default.grouplist in file.conf needs to be written as grouplist.default in this place. The effect is the same

### Appendix 3:

log_ Status=1 is defensive. It is a global rollback request received, but it is uncertain whether the local transaction of a transaction branch has been executed. At this time, a piece of data with the same branch ID is inserted in advance, and the inserted false data is successful. If the local transaction continues to execute, the only index conflict will be reported for automatic rollback.

If the insertion is unsuccessful, it indicates that the local transaction has been completed, and the undo data is taken out for reverse rollback.

### Appendix 4:

Whether to enable spring boot automatic assembly. If it is enabled, the integration of seata and spring boot will be automatically configured, including the automatic proxy of data source and initialization of GlobalTransactionScanner.

Note: New features of version 1.0 need to rely on seata spring boot starter.

### Appendix 5:

The following annotations have been added to seata 1.1.0 to enable the automatic proxy function of data sources

@EnableAutoDataSourceProxy

| attribute| desc | remark|
|-------------------------------------------|----------------------------|----------------------------|

|UseJdkProxy | Whether to use JDK proxy as the implementation method of data source automatic proxy | false, true, false by default, CGLIB as the implementation method of data source automatic proxy|

1. For the method of using seata spring boot starter, the data source automatic proxy is enabled by default. If you need to close it, please configure seata. enableAutoDataSourceProxy=false, which is true by default.

To switch the proxy implementation mode, please click seata UseJdkProxy=false. The default value is false. CGLIB is used as the implementation method of automatic proxy for data sources.

2. For the method of using seata all, please use @ EnableAutoDataSourceProxy to explicitly enable the automatic proxy function of the data source. If necessary, you can use the useJdkProxy attribute of the annotation to implement the proxy

Switch of. The default value is false. CGLIB is used as the implementation method of automatic proxy for data sources.

### Appendix 6:

```

Introduction to the implementation of automatic service degradation policy:

First, decide whether to start the self-test thread by reading whether client.tm.degradeCheck is true. Then read degradeCheckAllowTimes and degradeCheckPeriod to confirm the threshold value and self-test cycle

Assume that degradeCheckAllowTimes=10, and degradeCheckPeriod=2000

Then a start and commit test will be performed every 2 seconds. If it fails, the number of consecutive failures will be recorded. If it succeeds, the number of consecutive failures will be cleared The continuous errors are accumulated by the user interface and the self checking thread until the number of continuous failures reaches the user's threshold, then the Seata distributed transaction is closed to avoid the user's own business being unavailable for a long time

On the contrary, if the current distributed transaction is closed, the self-test thread will continue to perform the self-test every 2 seconds until the number of consecutive successes reaches the threshold set by the user, then the Seata distributed transaction will be restored to use

```

### Appendix 7:

In the store mode=db. Because seata inserts global locks in batches through the executeBatch of jdbc, according to the MySQL official website, when the rewriteBatchedStatements in the connection parameter is true, when executeBatch is executed and the operation type is insert, the jdbc driver will optimize the corresponding SQL to the form of 'insert into () values (), ()' to improve the performance of batch insert.

According to the actual test, when this parameter is set to true, the corresponding batch insert performance is more than 10 times of the original. Therefore, it is recommended to set this parameter to true when the data source is MySQL.