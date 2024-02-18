---
Title: Seata parameter configuration

keywords: [Seata]

Description: Seata parameter configuration.
---

# The seata parameter configuration version 1.0.0

<a href="./configurations090">View versions before 0.9.0.1</a>

### Change record

```

20191221: Added seata. enabled, client. report. success. enable

transport.enable-client-batch-send-request、client.log.exceptionRate

```

## Attention attribute (see all attributes for detailed description)

| server side                | client side                                |
| -------------------------- | ------------------------------------------ |
| registry.type              | registry.type                              |
| config.type                | config.type                                |
| store.mode                 | service.vgroup_mapping.my_test_tx_group    |
| store.db.driver-class-name | service.default.grouplist                  |
| store.db.url               | service.disableGlobalTransaction           |
| store.db.user              | client.support.spring.datasource.autoproxy |
| store.db.password          |                                            |

## All attributes

### Public sector

| key                     | desc                                                                       | remark                                                                                     |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| transport.serialization | client and server communication codec method                               | seata (ByteBuf), protobuf, kryo, mission, default seata                                    |
| transport.compressor    | compression method of communication data between client and server         | none, gzip, default: none                                                                  |
| transport.heartbeat     | the heartbeat detection switch for communication between client and server | True is enabled by default                                                                 |
| registry.type           | registry type                                                              | default file, supporting file, nacos, eureka, redis, zk, consumer, etcd3, sofa, and custom |
| config.type             | configuration center type                                                  | Default file, supporting file, nacos, apollo, zk, consult, etcd3, and custom               |

### Server side

| key                                           | desc                                                                            | remark                                                                                                                                                                                                                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| server.undo.log.save.days                     | undo retention days                                                             | 7 days by default, log\_ Status=1 (Appendix 3) and undo not normally cleaned                                                                                                                                                                                                       |
| server.undo.log.delete.period                 | undo Cleanup thread interval                                                    | 86400000 by default, in milliseconds                                                                                                                                                                                                                                               |
| server.max.commit.retry.timeout               | Timeout duration of two-phase commit retry                                      | Unit: ms, s, m, h, d, corresponding to ms, s, min, h, d, and the default is ms. The default value of - 1 means unlimited retries. Formula: timeout>=now globalTransactionBeginTime, true means no retry if timeout occurs                                                          |
| server.max.rollback.retry.timeout             | Timeout duration of two-phase rollback retry                                    | Same as commit                                                                                                                                                                                                                                                                     |
| server.recovery.committing-retry-period       | Phase2 commit unfinished status Global transaction retry commit thread interval | 1000 by default, in milliseconds                                                                                                                                                                                                                                                   |
| server.recovery.async-committing-retry-period | Phase2 asynchronous submission status Retry submission thread interval          | 1000 by default, in milliseconds                                                                                                                                                                                                                                                   |
| server.recovery.rollback-retry-period         | Phase2 rollback status retry rollbacking thread interval                        | 1000 by default, in milliseconds                                                                                                                                                                                                                                                   |
| server.recovery.timeout-retry-period          | Timeout status detection Retry thread interval                                  | 1000 by default, in milliseconds. If timeout is detected, put the global transaction into the rollback session manager                                                                                                                                                             |
| store.mode                                    | Transaction session information storage mode                                    | file Local file (HA is not supported), db database (HA is supported)                                                                                                                                                                                                               |
| store.file.dir                                | file mode file storage folder name                                              | default sessionStore                                                                                                                                                                                                                                                               |
| store.db.datasource                           | db mode data source type                                                        | default dbcp                                                                                                                                                                                                                                                                       |
| store.db.db-type                              | db mode database type                                                           | default mysql                                                                                                                                                                                                                                                                      |
| store.db.driver-class-name                    | db mode database driver                                                         | default com.mysql.jdbc Driver                                                                                                                                                                                                                                                      |
| store.db.url                                  | db mode database url                                                            | default jdbc: mysql://127.0.0.1:3306/seata                                                                                                                                                                                                                                         |
| store.db.user                                 | db mode database account                                                        | default MySQL                                                                                                                                                                                                                                                                      |
| store.db.password                             | db mode database account password                                               | default MySQL                                                                                                                                                                                                                                                                      |
| store.db.min-conn                             | The number of initial connections to the database in db mode                    | 1 by default                                                                                                                                                                                                                                                                       |
| store.db.max-conn                             | maximum number of connections to database in db mode                            | 3 by default                                                                                                                                                                                                                                                                       |
| store.db.global.table                         | db mode global transaction table name                                           | default global\_ table                                                                                                                                                                                                                                                             |
| store.db.branch.table                         | db mode branch transaction table name                                           | default branch\_ table                                                                                                                                                                                                                                                             |
| store.db.lock-table                           | db mode global lock table name                                                  | default lock\_ table                                                                                                                                                                                                                                                               |
| store.db.query-limit                          | The maximum number of global transactions queried in db mode                    | 100 by default                                                                                                                                                                                                                                                                     |
| metrics.enabled                               | whether to enable Metrics                                                       | False is off by default. In the false state, all Metrics related components will not be initialized to minimize the performance loss                                                                                                                                               |
| metrics.registry-type                         | indicator registrar type                                                        | The indicator registrar type used by Metrics is a built-in compact (simple) implementation by default. Meters in this implementation only use limited memory counts, and the performance is high enough to meet most scenarios; Currently, only one indicator registrar can be set |
| metrics.exporter-list                         | indicator result Measurement data outputter list                                | default prometheus. Multiple outputters are separated by English commas, such as "prometheus, jmx". Currently, only the prometheus outputters are connected                                                                                                                        |
| metrics.exporter-prometheus-port              | prometheus exporter client port number                                          | 9898 by default                                                                                                                                                                                                                                                                    |

### client 端

| key                                        | desc                                              | remark                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| seata.enabled                              | whether to enable spring boot automatic assembly  | true、false，default true（appendix 4）                                                                                    |
| client.report.success.enable               | whether to report success in the first phase      | true, false, default true is used to keep the branch transaction lifecycle records complete, false can improve performance |
| transport.enable-client-batch-send-request | client.log.exceptionRate                          | whether to batch merge and send the client transaction message requests                                                    | The default is true and false                                                                                                                                                                                     |
| service.vgroup_mapping.my_test_tx_group    | service.default.grouplist                         | log exception output probability                                                                                           | 100 by default, currently used for exception stack output when undo rollback fails, 1% probability output, rollback failure is basically dirty data, and the output stack does not need to occupy hard disk space |
| service.disableGlobalTransaction           | service.enableDegrade                             | transaction Group (Appendix 1)                                                                                             | my* test* tx\_ Group refers to grouping, and the configuration item value is TC cluster name                                                                                                                      |
| client.rm.async.commit.buffer.limit        | client.rm.lock.retry.internal                     | TC Service List (Appendix 2)                                                                                               | Only used when the registry is file                                                                                                                                                                               |
| client.rm.lock.retry.times                 | client.rm.lock.retry.policy.branch-rollback-on-co | global transaction switch                                                                                                  | False by default. false is on, true is off                                                                                                                                                                        |
| client.rm.report.retry.count               | client.rm.table.meta.check.enable                 | degradation switch (to be implemented)                                                                                     | False by default. The business side automatically downgrades according to the number of consecutive errors and does not go through the seata transaction                                                          |
| client.tm.commit.retry.count               | client.tm.rollback.retry.count                    | asynchronous commit cache queue length                                                                                     | 10000 by default. Phase II commit succeeded. RM asynchronously cleans the undo queue                                                                                                                              |
| client.undo.data.validation                | client.undo.log.serialization                     | check or occupy the global lock retry interval                                                                             | 10 by default, in milliseconds                                                                                                                                                                                    |
| client.undo.log.table                      | client.support.spring.datasource.autoproxy        | number of retries to verify or occupy the global lock                                                                      | 30 by default                                                                                                                                                                                                     |

### Not in used

| key         | desc       | remark        |
| ----------- | ---------- | ------------- |
| lock.mode   | 锁存储方式 | local、remote |
| lock.local  |            |               |
| lock.remote |            |               |

### synchronize parameters to the configuration center for use demo

#### Nacos

shell:

```bash
sh $\{SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca
```

Parameter description:

-h: Host, the default is localhost

-p: Port, default 8848

-g: Configure grouping. The default value is' SEATA\_ GROUP'

-t: Tenant information, corresponding to the namespace ID field of Nacos, the default value is null ''

#### Apollo

```bash
sh $\{SEATAPATH}/script/config-center/apollo/apollo-config.sh -h localhost -p 8070 -e DEV -a seata-server -c default -n application -d apollo -r apollo -t 3aa026fc8435d0fc4505b345b8fa4578fb646a2c
```

Parameter description:

-h: Host, the default is localhost

-p: Port, the default value is 8070

-e: Managed configuration environment, default value DEV

-a: AppId of the Namespace. The default value is seata server

-c: The name of the managed configuration cluster is generally passed in as default. If it is a special cluster, just pass in the name of the corresponding cluster. The default value is default

-n: The name of the namespace under management, if it is not in the properties format, needs to add a suffix, such as sample Yml, default value application

-d: The creator of the item, in the format of domain account, that is, the user ID of the sso system

-r: Publisher, domain account, note: if Apollo ConfigDB namespace.lock in ServerConfig If the switch is set to true (false by default), the environment does not allow the publisher and editor to be the same person. So if the editor is zhangsan, the publisher can no longer be zhangsan.

-t: The Apollo administrator can click http://\{portal_address}/open/manage Html To create a third-party application, you'd better first query whether this AppId has been created. After successful creation, a token will be generated

For details of the above parameters, see:

https://github.com/ctripcorp/apollo/wiki/Apollo%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0

#### Consul

```bash
sh $\{SEATAPATH}/script/config-center/consul/consul-config.sh -h localhost -p 8500
```

Parameter description:

-h: host, the default is localhost

-p: port, the default value is 8500

#### Etcd3

```bash
sh $\{SEATAPATH}/script/config-center/etcd3/etcd3-config.sh -h localhost -p 2379
```

Parameter description:

-h: Host, the default is localhost

-p: Port, the default value is 2379

python:

```bash
python $\{SEATAPATH}/script/config-center/nacos/nacos-config.py localhost:8848
```

#### ZK

```bash
sh $\{SEATAPATH}/script/config-center/zk/zk-config.sh -h localhost -p 2181 -z "/Users/zhangchenghui/zookeeper-3.4.14"
```

Parameter description:

-h: Host, the default is localhost

-p: Port, the default value is 2181

-z: zk path

### Appendix 1:

Description of transaction grouping.

1. What is a transaction group?

Transaction grouping is the resource logic of seata, similar to service instance. My in file.conf* test* tx\_ A group is a transaction group.

2. How to find the back-end cluster through transaction grouping?

First, the program configures transaction grouping (txServiceGroup parameter of GlobalTransactionScanner construction method), and the program will search for service.vgroup through the user configured configuration center\_ mapping. Transaction grouping configuration item. The value of the configuration item obtained is the name of the TC cluster. The program that obtains the cluster name constructs the service name through a certain prefix+cluster name. The service name of each configuration center is different. Get the service name, go to the corresponding registry, pull the service list of the corresponding service name, and get the real TC service list of the back-end.

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

### Appendix 3:

log\_ Status=1 is defensive. It means that a global rollback request is received, but it is uncertain whether the local transaction of a transaction branch has been executed. At this time, a piece of data with the same branch ID is inserted in advance, and the inserted false data is successful. If the local transaction continues to execute, the master key conflict will be automatically rolled back.

If the insertion is unsuccessful, it indicates that the local transaction has been completed, and the undo data is taken out for reverse rollback.

### Appendix 4:

Whether to enable spring boot automatic assembly. If it is enabled, the integration of seata and spring boot will be automatically configured, including the automatic proxy of data source and initialization of GlobalTransactionScanner.

Note: New features of version 1.0 need to rely on seata spring boot starter.
