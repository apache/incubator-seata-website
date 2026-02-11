---

Title: Seata parameter configuration version 0.9.0

keywords: [Seata]

Description: The seata parameter configuration version is 0.9.0.

---



#Seata parameter configuration version 0.9.0



###Public sector



| key | desc | remark|

|---------------|--------------|----|

|transport.serialization | client and server communication codec method | seata, protobuf|

|transport.heartbeat | the heartbeat detection switch for client server communication | The default value is true|

|registry.type | registry type | Default file, which supports file, nacos, redis, eureka, zk, consumer, etcd3, sofa, and custom | Version 1.6.0 Server supports simultaneous registration to multiple registries, separated by commas|

|config.type | configuration center type | default file, supporting file, nacos, apollo, zk, consult, etcd3, springcloud, custom|


###Server side

| key | desc | remark|

|---------------|--------------|----|

| transaction.undo.log.save.days | undo retention days | 7 days by default, log_ Status=1 (Appendix 3) and undo not normally cleaned|

| transaction.undo.log.delete.period | undo Cleanup thread interval | 86400000 by default, in milliseconds|

| service.max.commit.retry.timeout | timeout duration of two-phase commit retry | Unit: ms, s, m, h, d, corresponding to ms, s, min, h, d, and the default is ms. The default value of - 1 means unlimited retries. Formula: timeout>=now globalTransactionBeginTime, true means no retry if timeout occurs|

| service.max.rollback.retry.timeout | timeout duration of two-phase rollback retry | Same as commit|

| recovery.committing-retry-period | Phase2 commit unfinished status Global transaction retry commit thread interval | 1000 by default, in milliseconds|

| recovery.async-committing-retry-period | Phase2 asynchronous submission status Retry submission thread interval | 1000 by default, in milliseconds|

| recovery.rollback-retry-period | Phase2 rollback status Retry rollback thread interval | 1000 by default, in milliseconds|

| recovery.timeout-retry-period | Timeout status detection Retry thread interval | 1000 by default, in milliseconds. If timeout is detected, put the global transaction into the rollback session manager|

| store.mode | Transaction session information storage mode | file Local file (HA is not supported), db database (HA is supported)|

| store.file.dir | file mode file storage folder name | default sessionStore|

| store.file.maxBranchSessionSize | file mode file storage branch session maximum bytes | 16384 (16kb) by default, in bytes|

| store.file.maxGlobalSessionSize | file mode file stores the maximum number of global session bytes | 512b by default, in bytes|

| store.file.fileWriteBufferCacheSize | file mode file storage buffer maximum cache size | 16384 (16kb) by default, in bytes. When the amount of data such as session written is greater than this value, an exception will be thrown|

| store.file.flushDiskMode | file mode file storage flushing policy | default async, optional sync|

| store.file.sessionReloadReadSize | file mode File storage The maximum number of session or lock keys recovered from the backup file after the server node restarts | 100 by default|

| store.db.datasource | db mode data source type | default dbcp|

| store.db.db type | db mode database type | default mysql|

| store.db.driver class name | db mode database driver | default com.mysql.jdbc Driver |

| store.db.url | db mode data source library url | default jdbc: mysql://127.0.0.1:3306/seata |

| store.db.user | db mode database account | default MySQL|

| store.db.min-conn | the number of initial connections to the database in db mode | 1 by default|

| store.db.max-conn | Maximum number of database connections in db mode | 3 by default|

| store.db.global.table | db mode global transaction table name | default global_ table |

| store.db.branch.table | db mode branch transaction table name | default branch_ table |

| store.db.lock table | db mode global lock table name | default lock_ table |

| store.db.query-limit | the maximum number of global transactions queried in db mode | 1000 by default|

| metrics.enabled | whether to enable Metrics | False is off by default. In the false state, all Metrics related components will not be initialized to minimize the performance loss|

| metrics.registry-type | indicator registrar type | The indicator registrar type used by Metrics is a built-in compact (simple) implementation by default. Meters in this implementation only use limited memory counts, and the performance is high enough to meet most scenarios; Currently, only one indicator registrar can be set|

| metrics.exporter list | indicator result Measurement data outputter list | default prometheus. Multiple outputters are separated by English commas, such as "prometheus, jmx". Currently, only the prometheus outputters are connected|

| metrics.exporter-prometheus-port | prometheus exporter client port number | 9898 by default|

###Client side



| key | role | desc | remark|

|----------|--------|--------------|----|

| service.vgroup_mapping.my_test_tx_group | TM, RM | Transaction group (Appendix 1) | my_ test_ tx_ Group refers to grouping, and the configuration item value is TC cluster name|

| service.default.grouplist | TM, RM | TC service list (Appendix 2) | Only used when the registry is file|

| service.disableGlobalTransaction | TM, RM | Global Transaction Switch | False by default. false is on, true is off|

| service.enableDegradation | TM | Degradation switch (to be implemented) | False by default. The business side automatically downgrades according to the number of consecutive errors and does not go through the seata transaction|

| client.async.commit.buffer.limit | RM | Asynchronous commit cache queue length | 10000 by default. Phase II commit succeeded. RM asynchronously cleans the undo queue|

| client.lock.retry.internal | RM | Check or occupy the global lock retry interval | 10 by default, in milliseconds|

| client.lock.retry.times | RM | Number of retries to verify or occupy the global lock | 30 by default|

| client.lock.retry.policy.branch-rollback-on-conflict | RM | The lock policy when a branch transaction conflicts with other global rollback transactions | The default is true. The local lock is released first to allow rollback to succeed|

| client.report.retry.count | TM, RM | Number of TC retries for reporting the results of the first phase | 5 by default|

| client.tm.commit.retry.count | TM | The number of TC retries for reporting the results of the first phase global submission | 1 by default, it is recommended to be greater than 1|

| client.tm.rollback.retry.count | TM | The number of TC retries reported in the first phase global rollback results | 1 by default, and it is recommended to be greater than 1|

| client.table.meta.check.enable | RM | Automatically refresh the table structure in the cache | Default true|

| transaction.undo.data.validation | RM | Phase II rollback image verification | True is enabled by default, false is disabled|

| transaction.undo.log.serialization | RM | undo serialization method | default jackson|

| transaction.undo.log.table | RM | User defined undo table name | Default undo_ log |

| support.spring.datasource.autoproxy | RM | Data source auto proxy switch | False is off by default|


### Not in used
| key         | desc         | remark|
|---------------|--------------|----|
| lock.mode            | lock store mode   |local、remote |
| lock.local          |  |    |
| lock.remote          |  |  |

###Appendix 1:

Description of transaction grouping.

1. What is a transaction group?

Transaction grouping is the resource logic of seata, similar to service instance. My in file.conf_ test_ tx_ A group is a transaction group.

2. How to find the back-end cluster through transaction grouping?

First, the program configures transaction grouping (txServiceGroup parameter of GlobalTransactionScanner construction method), and the program will search for service.vgroup through the user configured configuration center_ mapping. Transaction grouping configuration item. The value of the configuration item obtained is the name of the TC cluster. The program that obtains the cluster name constructs the service name through a certain prefix+cluster name. The service name of each configuration center is different. Get the service name, go to the corresponding registry, pull the service list of the corresponding service name, and get the real TC service list of the back-end.

3. Why is the design so that the service name is not directly taken?

There is an additional layer to obtain the configuration of transaction groups to the mapping cluster. After this design, the transaction group can be used as the logical isolation unit of resources, which can quickly fail over when a failure occurs.



###Appendix 2:

About the grouplist question.

1. When will the default.grouplist in file.conf be used?

It is used when registry.type=file. It is not read in other times.

2. Can multiple value lists be configured for default.grouplist?

Multiple can be configured, which means cluster, but when store When mode=file, an error will be reported. The reason is that the file storage mode does not provide synchronization of local files, so you need to use store.mode=db to share data between TC clusters through db

3. Is default.grouplist recommended?

Not recommended. For example, question 1, when registering It is used when type=file, which means that the real registry is not used here, and the health check mechanism without specific services cannot automatically remove the list when the tc is unavailable. It is recommended to use nacos, eureka, redis, zk, consumer, etcd3, and sofa. Registry. type=file or config The original purpose of type=file design is to enable users to quickly verify the seata service through direct connection without relying on a third-party registry or configuration center.



###Appendix 3:

log_ Status=1 is defensive. It means that a global rollback request is received, but it is uncertain whether the local transaction of a transaction branch has been executed. At this time, a piece of data with the same branch ID is inserted in advance, and the inserted false data is successful. If the local transaction continues to execute, the master key conflict will be automatically rolled back.

If the insertion is unsuccessful, it indicates that the local transaction has been completed, and the undo data is taken out for reverse rollback.