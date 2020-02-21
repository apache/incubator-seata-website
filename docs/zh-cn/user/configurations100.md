---
title: Seata 参数配置
keywords: Seata
description: Seata 参数配置。
---

# seata参数配置 1.0.0版本
<a href="./configurations090.html">查看0.9.0.1之前版本</a>

### 变更记录
```
20191221: 增加seata.enabled、client.report.success.enable、
transport.enable-client-batch-send-request、client.log.exceptionRate
```
## 关注属性(详细描述见全属性)

| server端         | client端|
|---------------|----|
| registry.type            |registry.type|
| config.type            |config.type|
| store.mode            |service.vgroup_mapping.my_test_tx_group|
| store.db.driver-class-name            | service.default.grouplist |
| store.db.url            |service.disableGlobalTransaction |
| store.db.user            | client.support.spring.datasource.autoproxy|
| store.db.password            | |



## 全属性

### 公共部分

| key         | desc         | remark|
|---------------|--------------|----|
| transport.serialization            | client和server通信编解码方式   |seata（ByteBuf）、protobuf、kryo、hession，默认seata |
| transport.compressor            | client和server通信数据压缩方式   |none、gzip，默认none |
| transport.heartbeat            | client和server通信心跳检测开关   |默认true开启 |
| registry.type            | 注册中心类型                  |默认file，支持file 、nacos 、eureka、redis、zk、consul、etcd3、sofa、custom |
| config.type            | 配置中心类型                  |默认file，支持file、nacos 、apollo、zk、consul、etcd3、custom |

### server端

| key| desc         | remark|
|-------------------------------------------|---------------------------------|----------------------------|
| server.undo.log.save.days            | undo保留天数                  |默认7天,log_status=1（附录3）和未正常清理的undo |
| server.undo.log.delete.period        | undo清理线程间隔时间          |默认86400000，单位毫秒    |
| server.max.commit.retry.timeout          | 二阶段提交重试超时时长          | 单位ms,s,m,h,d,对应毫秒,秒,分,小时,天,默认毫秒。默认值-1表示无限重试。公式: timeout>=now-globalTransactionBeginTime,true表示超时则不再重试   |
| server.max.rollback.retry.timeout        | 二阶段回滚重试超时时长           |  同commit  |
| server.recovery.committing-retry-period          | 二阶段提交未完成状态全局事务重试提交线程间隔时间 |默认1000，单位毫秒    |
| server.recovery.asyn-committing-retry-period     | 二阶段异步提交状态重试提交线程间隔时间       |默认1000，单位毫秒    |
| server.recovery.rollbacking-retry-period         | 二阶段回滚状态重试回滚线程间隔时间      |默认1000，单位毫秒    |
| server.recovery.timeout-retry-period             | 超时状态检测重试线程间隔时间        |默认1000，单位毫秒，检测出超时将全局事务置入回滚会话管理器    |
| store.mode                                | 事务会话信息存储方式 |file本地文件(不支持HA)，db数据库(支持HA)    |
| store.file.dir                            | file模式文件存储文件夹名 |默认sessionStore    |
| store.db.datasource                       | db模式数据源类型 |默认dbcp    |
| store.db.db-type                          | db模式数据库类型 |默认mysql    |
| store.db.driver-class-name                | db模式数据库驱动 |默认com.mysql.jdbc.Driver    |
| store.db.url                              | db模式数据库url | 默认jdbc:mysql://127.0.0.1:3306/seata   |
| store.db.user                             | db模式数据库账户 |默认mysql    |
| store.db.password                         | db模式数据库账户密码 |默认mysql    |
| store.db.min-conn                         | db模式数据库初始连接数 |默认1    |
| store.db.max-conn                         | db模式数据库最大连接数|默认3    |
| store.db.global.table                     | db模式全局事务表名 |默认global_table    |
| store.db.branch.table                     | db模式分支事务表名 |默认branch_table    |
| store.db.lock-table                       | db模式全局锁表名 |默认lock_table    |
| store.db.query-limit                      | db模式查询全局事务一次的最大条数 |默认100    |
| metrics.enabled                           | 是否启用Metrics  |默认false关闭，在False状态下，所有与Metrics相关的组件将不会被初始化，使得性能损耗最低|
| metrics.registry-type                     | 指标注册器类型    |Metrics使用的指标注册器类型，默认为内置的compact（简易）实现，这个实现中的Meter仅使用有限内存计数，性能高足够满足大多数场景；目前只能设置一个指标注册器实现 |
| metrics.exporter-list                     | 指标结果Measurement数据输出器列表   |默认prometheus，多个输出器使用英文逗号分割，例如"prometheus,jmx"，目前仅实现了对接prometheus的输出器 |
| metrics.exporter-prometheus-port          | prometheus输出器Client端口号   |默认9898 |

### client端

| key| desc    | remark|
|-------------------------------------------|----------------------------|----------------------------|
| seata.enabled   | 是否开启spring-boot自动装配   |true、false，默认true（附录4） |
| client.report.success.enable   | 是否上报一阶段成功   |true、false，默认true用于保持分支事务生命周期记录完整，false可提高不少性能 |
| transport.enable-client-batch-send-request            | 客户端事务消息请求是否批量合并发送   |默认true，false单条发送 |
| client.log.exceptionRate                | 日志异常输出概率 |  默认100，目前用于undo回滚失败时异常堆栈输出，百分之一的概率输出，回滚失败基本是脏数据，无需输出堆栈占用硬盘空间  |
| service.vgroup_mapping.my_test_tx_group   | 事务群组（附录1）   |my_test_tx_group为分组，配置项值为TC集群名 |
| service.default.grouplist                 | TC服务列表（附录2） |  仅注册中心为file时使用  |
| service.disableGlobalTransaction          | 全局事务开关 |  默认false。false为开启，true为关闭  |
| service.enableDegrade                     | 降级开关（待实现） |  默认false。业务侧根据连续错误数自动降级不走seata事务  |
| client.rm.async.commit.buffer.limit          | 异步提交缓存队列长度 | 默认10000。 二阶段提交成功，RM异步清理undo队列  |
| client.rm.lock.retry.internal                | 校验或占用全局锁重试间隔 |  默认10，单位毫秒  |
| client.rm.lock.retry.times                   | 校验或占用全局锁重试次数 |  默认30  |
| client.rm.lock.retry.policy.branch-rollback-on-conflict    | 分支事务与其它全局回滚事务冲突时锁策略 |  默认true，优先释放本地锁让回滚成功  |
| client.rm.report.retry.count                 | 一阶段结果上报TC重试次数 |  默认5次  |
| client.rm.table.meta.check.enable            | 自动刷新缓存中的表结构 |  默认false  |
| client.tm.commit.retry.count              | 一阶段全局提交结果上报TC重试次数 |  默认1次，建议大于1  |
| client.tm.rollback.retry.count            | 一阶段全局回滚结果上报TC重试次数 |  默认1次，建议大于1  |
| client.undo.data.validation          | 二阶段回滚镜像校验 |  默认true开启，false关闭 |
| client.undo.log.serialization        | undo序列化方式 |  默认jackson  |
| client.undo.log.table                | 自定义undo表名 |  默认undo_log  |
| client.support.spring.datasource.autoproxy       | 数据源自动代理开关 |  默认false关闭  |


### 未使用
| key         | desc         | remark|
|---------------|--------------|----|
| lock.mode            | 锁存储方式   |local、remote |
| lock.local          |  |    |
| lock.remote          |  |  |

### 参数同步到配置中心使用demo

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

### 附录1：
    事务分组说明。
    1.事务分组是什么？
    事务分组是seata的资源逻辑，类似于服务实例。在file.conf中的my_test_tx_group就是一个事务分组。
    2.通过事务分组如何找到后端集群？
    首先程序中配置了事务分组（GlobalTransactionScanner 构造方法的txServiceGroup参数），程序会通过用户配置的配置中心去寻找service.vgroup_mapping.事务分组配置项，取得配置项的值就是TC集群的名称。拿到集群名称程序通过一定的前后缀+集群名称去构造服务名，各配置中心的服务名实现不同。拿到服务名去相应的注册中心去拉取相应服务名的服务列表，获得后端真实的TC服务列表。
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

### 附录3：
    log_status=1的是防御性的，是收到全局回滚请求，但是不确定某个事务分支的本地事务是否已经执行完成了，这时事先插入一条branchid相同的数据，插入的假数据成功了，本地事务继续执行就会报主键冲突自动回滚。
    假如插入不成功说明表里有数据这个本地事务已经执行完成了，那么取出这条undolog数据做反向回滚操作。

### 附录4：
    是否开启spring-boot自动装配，如果开启，则会自动配置seata与spring-boot的集成，包括数据源的自动代理以及GlobalTransactionScanner初始化。
    注：1.0版本新特性，需依赖seata-spring-boot-starter。
