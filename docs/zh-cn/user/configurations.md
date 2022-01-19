---
title: Seata 参数配置
keywords: Seata
description: Seata 参数配置。
---

# seata参数配置 1.3.0版本
<a href="./configurations100.html">查看1.0.0版本</a>  
<a href="./configurations090.html">查看0.9.0.1之前版本</a>

### 变更记录
```
20200716(1.3.0):
1.增加了store.redis相关配置
2.增加了nacos注册中心配置group项,Server和Client端的值需一致
20200421(1.2.0): 
1.增加registry.nacos.application属性，默认seata-server，Server和Client端的值需一致
20200220(1.1.0): 
1.file.conf和registry.conf两个配置文件中的格式统一转换为驼峰格式.
2.统一所有配置文件的默认值(file.conf、registry.conf、seata-spring-boot-starter)
3.优化seata-spring-boot-starter中对于事务分组和TC集群的配置
4.移除client.support.spring.datasource.autoproxy,增加@EnableAutoDataSourceProxy
注解用于开启数据源自动代理,同时可选择代理实现方式(具体请查阅附录5)
20191221: 
1.增加seata.enabled、client.report.success.enable、
transport.enable-client-batch-send-request、client.log.exceptionRate
```
## 关注属性(详细描述见全属性)

| server端         | client端|
|---------------|----|
| registry.type            |registry.type|
| config.type            |config.type|
| #store.mode=db需要以下配置 |service.vgroupMapping.my_test_tx_group|
| store.db.driverClassName            | service.default.grouplist |
| store.db.url            |service.disableGlobalTransaction |
| store.db.user            | |
| store.db.password | |
| #store.mode=redis 需要以下配置 | |
| store.redis.host | |
| store.redis.port | |
| store.redis.database | |
| store.redis.password | |



## 全属性

### 公共部分

| key         | desc         | remark|
|---------------|--------------|----|
| transport.serialization            | client和server通信编解码方式   |seata(ByteBuf)、protobuf、kryo、hession、fst，默认seata |
| transport.compressor            | client和server通信数据压缩方式   |none、gzip，默认none |
| transport.heartbeat            | client和server通信心跳检测开关   |默认true开启 |
| registry.type            | 注册中心类型                  |默认file，支持file 、nacos 、eureka、redis、zk、consul、etcd3、sofa、custom |
| config.type            | 配置中心类型                  |默认file，支持file、nacos 、apollo、zk、consul、etcd3、custom |

### server端

| key| desc         | remark|
|-------------------------------------------|---------------------------------|----------------------------|
| server.undo.logSaveDays            | undo保留天数                  |默认7天,log_status=1（附录3）和未正常清理的undo |
| server.undo.logDeletePeriod        | undo清理线程间隔时间          |默认86400000，单位毫秒    |
| server.maxCommitRetryTimeout          | 二阶段提交重试超时时长          | 单位ms,s,m,h,d,对应毫秒,秒,分,小时,天,默认毫秒。默认值-1表示无限重试。公式: timeout>=now-globalTransactionBeginTime,true表示超时则不再重试(注: 达到超时时间后将不会做任何重试,有数据不一致风险,除非业务自行可校准数据,否者慎用) |
| server.maxRollbackRetryTimeout        | 二阶段回滚重试超时时长           |  同commit  |
| server.recovery.committingRetryPeriod          | 二阶段提交未完成状态全局事务重试提交线程间隔时间 |默认1000，单位毫秒    |
| server.recovery.asynCommittingRetryPeriod     | 二阶段异步提交状态重试提交线程间隔时间       |默认1000，单位毫秒    |
| server.recovery.rollbackingRetryPeriod         | 二阶段回滚状态重试回滚线程间隔时间      |默认1000，单位毫秒    |
| server.recovery.timeoutRetryPeriod             | 超时状态检测重试线程间隔时间        |默认1000，单位毫秒，检测出超时将全局事务置入回滚会话管理器    |
| store.mode                                | 事务会话信息存储方式 |file本地文件(不支持HA)，db数据库\|redis(支持HA)    |
| store.file.dir                            | file模式文件存储文件夹名 |默认sessionStore    |
| store.db.datasource                       | db模式数据源类型 |dbcp、druid、hikari；无默认值，store.mode=db时必须指定。    |
| store.db.dbType                          | db模式数据库类型 |mysql、oracle、db2、sqlserver、sybaee、h2、sqlite、access、postgresql、oceanbase；无默认值，store.mode=db时必须指定。   |
| store.db.driverClassName                | db模式数据库驱动 |store.mode=db时必须指定    |
| store.db.url                              | db模式数据库url | store.mode=db时必须指定，在使用mysql作为数据源时，建议在连接参数中加上`rewriteBatchedStatements=true`(详细原因请阅读附录7)   |
| store.db.user                             | db模式数据库账户 |store.mode=db时必须指定    |
| store.db.password                         | db模式数据库账户密码 |store.mode=db时必须指定    |
| store.db.minConn                         | db模式数据库初始连接数 |默认1    |
| store.db.maxConn                         | db模式数据库最大连接数|默认20    |
| store.db.maxWait                         | db模式获取连接时最大等待时间 |默认5000，单位毫秒    |
| store.db.globalTable                     | db模式全局事务表名 |默认global_table    |
| store.db.branchTable                     | db模式分支事务表名 |默认branch_table    |
| store.db.lockTable                       | db模式全局锁表名 |默认lock_table    |
| store.db.queryLimit                      | db模式查询全局事务一次的最大条数 |默认100    |
| store.redis.host | redis模式ip |默认127.0.0.1 |
| store.redis.port | redis模式端口 |默认6379 |
| store.redis.maxConn | redis模式最大连接数 |默认10 |
| store.redis.minConn | redis模式最小连接数 |默认1 |
| store.redis.database | redis模式默认库 |默认0 |
| store.redis.password | redis模式密码(无可不填) |默认null |
| store.redis.queryLimit | redis模式一次查询最大条数 |默认100 |
| metrics.enabled                           | 是否启用Metrics  |默认false关闭，在False状态下，所有与Metrics相关的组件将不会被初始化，使得性能损耗最低|
| metrics.registryType                     | 指标注册器类型    |Metrics使用的指标注册器类型，默认为内置的compact（简易）实现，这个实现中的Meter仅使用有限内存计数，性能高足够满足大多数场景；目前只能设置一个指标注册器实现 |
| metrics.exporterList                     | 指标结果Measurement数据输出器列表   |默认prometheus，多个输出器使用英文逗号分割，例如"prometheus,jmx"，目前仅实现了对接prometheus的输出器 |
| metrics.exporterPrometheusPort          | prometheus输出器Client端口号   |默认9898 |

### client端

| key| desc    | remark|
|-------------------------------------------|----------------------------|----------------------------|
| seata.enabled   | 是否开启spring-boot自动装配   |true、false,(SSBS)专有配置，默认true（附录4） |
| seata.enableAutoDataSourceProxy=true | 是否开启数据源自动代理 | true、false,seata-spring-boot-starter(SSBS)专有配置,SSBS默认会开启数据源自动代理,可通过该配置项关闭.|
| seata.useJdkProxy=false |  是否使用JDK代理作为数据源自动代理的实现方式| true、false,(SSBS)专有配置,默认false,采用CGLIB作为数据源自动代理的实现方式 |
| transport.enableClientBatchSendRequest            | 客户端事务消息请求是否批量合并发送   |默认true，false单条发送 |
| client.log.exceptionRate                | 日志异常输出概率 |  默认100，目前用于undo回滚失败时异常堆栈输出，百分之一的概率输出，回滚失败基本是脏数据，无需输出堆栈占用硬盘空间  |
| service.vgroupMapping.my_test_tx_group   | 事务群组（附录1）   |my_test_tx_group为分组，配置项值为TC集群名 |
| service.default.grouplist                 | TC服务列表（附录2） |  仅注册中心为file时使用  |
| service.disableGlobalTransaction          | 全局事务开关 |  默认false。false为开启，true为关闭  |
| client.tm.degradeCheck | 降级开关 |  默认false。业务侧根据连续错误数自动降级不走seata事务(详细介绍请阅读附录6)  |
| client.tm.degradeCheckAllowTimes | 升降级达标阈值 | 默认10 |
| client.tm.degradeCheckPeriod | 服务自检周期 | 默认2000,单位ms.每2秒进行一次服务自检,来决定 |
| client.rm.reportSuccessEnable   | 是否上报一阶段成功   |true、false，从1.1.0版本开始,默认false.true用于保持分支事务生命周期记录完整，false可提高不少性能 |
| client.rm.asyncCommitBufferLimit          | 异步提交缓存队列长度 | 默认10000。 二阶段提交成功，RM异步清理undo队列  |
| client.rm.lock.retryInterval                | 校验或占用全局锁重试间隔 |  默认10，单位毫秒  |
| client.rm.lock.retryTimes                   | 校验或占用全局锁重试次数 |  默认30  |
| client.rm.lock.retryPolicyBranchRollbackOnConflict    | 分支事务与其它全局回滚事务冲突时锁策略 |  默认true，优先释放本地锁让回滚成功  |
| client.rm.reportRetryCount                 | 一阶段结果上报TC重试次数 |  默认5次  |
| client.rm.tableMetaCheckEnable            | 自动刷新缓存中的表结构 |  默认false  |
| client.tm.commitRetryCount              | 一阶段全局提交结果上报TC重试次数 |  默认1次，建议大于1  |
| client.tm.rollbackRetryCount            | 一阶段全局回滚结果上报TC重试次数 |  默认1次，建议大于1  |
| client.undo.dataValidation          | 二阶段回滚镜像校验 |  默认true开启，false关闭 |
| client.undo.logSerialization        | undo序列化方式 |  默认jackson  |
| client.undo.logTable                | 自定义undo表名 |  默认undo_log  |
| client.rm.sqlParserType                | sql解析类型 |  默认druid,可选antlr  |


<details>
  <summary><mark>参数同步到配置中心使用demo</mark></summary>

#### Nacos
shell:
```bash
sh ${SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca
```

参数说明：

-h: host，默认值 localhost

-p: port，默认值 8848

-g: 配置分组，默认值为 'SEATA_GROUP'

-t: 租户信息，对应 Nacos 的命名空间ID字段, 默认值为空 ''

#### Apollo
```bash
sh ${SEATAPATH}/script/config-center/apollo/apollo-config.sh -h localhost -p 8070 -e DEV -a seata-server -c default -n application -d apollo -r apollo -t 3aa026fc8435d0fc4505b345b8fa4578fb646a2c
```
参数说明：

-h: host，默认值 localhost

-p: port，默认值 8070

-e: 所管理的配置环境，默认值 DEV

-a: Namespace 所属的 AppId，默认值 seata-server

-c: 所管理的配置集群名， 一般情况下传入 default 即可。如果是特殊集群，传入相应集群的名称即可，默认值 default

-n: 所管理的 Namespace 的名称，如果是非 properties 格式，需要加上后缀名，如 sample.yml，默认值 application

-d: item 的创建人，格式为域账号，也就是 sso 系统的 User ID

-r: 发布人，域账号，注意：如果 ApolloConfigDB.ServerConfig 中的 namespace.lock.switch 设置为 true 的话（默认是 false），那么该环境不允许发布人和编辑人为同一人。所以如果编辑人是 zhangsan，发布人就不能再是 zhangsan。

-t: Apollo 管理员在 http://{portal_address}/open/manage.html 创建第三方应用，创建之前最好先查询此AppId是否已经创建。创建成功之后会生成一个 token

以上参数说明详情请看：

https://github.com/ctripcorp/apollo/wiki/Apollo%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0

#### Consul
```bash
sh ${SEATAPATH}/script/config-center/consul/consul-config.sh -h localhost -p 8500
```
参数说明：

-h: host，默认值 localhost

-p: port，默认值 8500

#### Etcd3
```bash
sh ${SEATAPATH}/script/config-center/etcd3/etcd3-config.sh -h localhost -p 2379
```

参数说明：

-h: host，默认值 localhost

-p: port，默认值 2379

python:
```bash
python ${SEATAPATH}/script/config-center/nacos/nacos-config.py localhost:8848
```

#### ZK
```bash
sh ${SEATAPATH}/script/config-center/zk/zk-config.sh -h localhost -p 2181 -z "/Users/zhangchenghui/zookeeper-3.4.14"
```
参数说明：

-h: host，默认值 localhost

-p: port，默认值 2181

-z: zk所属路径

</details>

### 附录1：
    事务分组说明。
    1.事务分组是什么？
    事务分组是seata的资源逻辑，类似于服务实例。在file.conf中的my_test_tx_group就是一个事务分组。
    2.通过事务分组如何找到后端集群？
    首先程序中配置了事务分组（GlobalTransactionScanner 构造方法的txServiceGroup参数），程序会通过用户配置的配置中心去寻找service.vgroupMapping
    .事务分组配置项，取得配置项的值就是TC集群的名称。拿到集群名称程序通过一定的前后缀+集群名称去构造服务名，各配置中心的服务名实现不同。拿到服务名去相应的注册中心去拉取相应服务名的服务列表，获得后端真实的TC服务列表。
    3.为什么这么设计，不直接取服务名？
    这里多了一层获取事务分组到映射集群的配置。这样设计后，事务分组可以作为资源的逻辑隔离单位，当发生故障时可以快速failover。

### 附录2：
    关于grouplist问题说明下。
    1. 什么时候会用到file.conf中的default.grouplist？
    当registry.type=file时会用到，其他时候不读。
    2. default.grouplist的值列表是否可以配置多个？
    可以配置多个，配置多个意味着集群，但当store.mode=file时，会报错。原因是在file存储模式下未提供本地文件的同步，所以需要使用store.mode=db，通过db来共享TC集群间数据
    3. 是否推荐使用default.grouplist？
    不推荐，如问题1，当registry.type=file时会用到，也就是说这里用的不是真正的注册中心，不具体服务的健康检查机制当tc不可用时无法自动剔除列表，推荐使用nacos 、eureka、redis、zk、consul、etcd3、sofa。registry.type=file或config.type=file 设计的初衷是让用户再不依赖第三方注册中心或配置中心的前提下，通过直连的方式，快速验证seata服务。    
    4.seata-spring-boot-starter中的配置为什么是grouplist.default,也就是说和file.conf中的default.grouplist写法刚好颠倒了位置?  
    由于spring-boot本身配置文件语法的要求,这个地方需要将file.conf中的default.grouplist写成grouplist.default,效果是一样的.
### 附录3：
    log_status=1的是防御性的，是收到全局回滚请求，但是不确定某个事务分支的本地事务是否已经执行完成了，这时事先插入一条branchid相同的数据，插入的假数据成功了，本地事务继续执行就会报唯一索引冲突自动回滚。
    假如插入不成功说明表里有数据这个本地事务已经执行完成了，那么取出这条undolog数据做反向回滚操作。

### 附录4：
    是否开启spring-boot自动装配，如果开启，则会自动配置seata与spring-boot的集成，包括数据源的自动代理以及GlobalTransactionScanner初始化。
    注：1.0版本新特性，需依赖seata-spring-boot-starter。
### 附录5:
    seata1.1.0版本新加入以下注解,用于开启数据源自动代理功能
    @EnableAutoDataSourceProxy

| attribute| desc    | remark|
|-------------------------------------------|----------------------------|----------------------------|
| useJdkProxy   | 是否使用JDK代理作为数据源自动代理的实现方式    |false、true,默认false,采用CGLIB作为数据源自动代理的实现方式  |


    1.对于使用seata-spring-boot-starter的方式，默认已开启数据源自动代理,如需关闭，请配置seata.enableAutoDataSourceProxy=false，该项配置默认为true。
      如需切换代理实现方式，请通过seata.useJdkProxy=false进行配置,默认为false，采用CGLIB作为数据源自动代理的实现方式。
    2.对于使用seata-all的方式，请使用@EnableAutoDataSourceProxy来显式开启数据源自动代理功能。如有需要，可通过该注解的useJdkProxy属性进行代理实现方式
      的切换。默认为false,采用CGLIB作为数据源自动代理的实现方式。

### 附录6:

```
关于服务自动降级策略的具体实现介绍:
首先通过读取client.tm.degradeCheck是否为true,决定是否开启自检线程.随后读取degradeCheckAllowTimes和degradeCheckPeriod,确认阈值与自检周期.
假设degradeCheckAllowTimes=10,degradeCheckPeriod=2000
那么每2秒钟会进行一个begin,commit的测试,如果失败,则记录连续失败数,如果成功则清空连续失败数.连续错误由用户接口及自检线程进行累计,直到连续失败次数达到用户的阈值,则关闭Seata分布式事务,避免用户自身业务长时间不可用.
反之,假如当前分布式事务关闭,那么自检线程继续按照2秒一次的自检,直到连续成功数达到用户设置的阈值,那么Seata分布式事务将恢复使用
```

### 附录7:
    在store.mode=db，由于seata是通过jdbc的executeBatch来批量插入全局锁的，根据MySQL官网的说明，连接参数中的rewriteBatchedStatements为true时，在执行executeBatch，并且操作类型为insert时，jdbc驱动会把对应的SQL优化成`insert into () values (), ()`的形式来提升批量插入的性能。
    根据实际的测试，该参数设置为true后，对应的批量插入性能为原来的10倍多，因此在数据源为MySQL时，建议把该参数设置为true。