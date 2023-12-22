---
title: 发布说明
keywords: [Seata, 发布说明]
description: 本文将向你介绍如何点击了解各版本详情和升级注意事项。
---


# 发布说明

## Seata

> GitHub: https://github.com/seata/seata 
> 
> 发布说明: https://github.com/seata/seata/releases


### 1.5.2 (2022-07-12)

[source](https://github.com/seata/seata/archive/v1.5.2.zip) |
[binary](https://github.com/seata/seata/releases/download/v1.5.2/seata-server-1.5.2.zip)

<details>
  <summary><mark>Release notes</mark></summary>


### Seata 1.5.2

Seata 1.5.2 发布。

Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

此版本更新如下：

### feature：
- [[#4661](https://github.com/seata/seata/pull/4713)] 支持根据xid负载均衡算法
- [[#4676](https://github.com/seata/seata/pull/4676)] 支持Nacos作为注册中心时，server通过挂载SLB暴露服务
- [[#4642](https://github.com/seata/seata/pull/4642)] 支持client批量请求并行处理
- [[#4567](https://github.com/seata/seata/pull/4567)] 支持where条件中find_in_set函数


### bugfix：
- [[#4515](https://github.com/seata/seata/pull/4515)] 修复develop分支SeataTCCFenceAutoConfiguration在客户端未使用DB时，启动抛出ClassNotFoundException的问题。
- [[#4661](https://github.com/seata/seata/pull/4661)] 修复控制台中使用PostgreSQL出现的SQL异常
- [[#4667](https://github.com/seata/seata/pull/4682)] 修复develop分支RedisTransactionStoreManager迭代时更新map的异常
- [[#4678](https://github.com/seata/seata/pull/4678)] 修复属性transport.enableRmClientBatchSendRequest没有配置的情况下缓存穿透的问题
- [[#4701](https://github.com/seata/seata/pull/4701)] 修复命令行参数丢失问题
- [[#4607](https://github.com/seata/seata/pull/4607)] 修复跳过全局锁校验的缺陷
- [[#4696](https://github.com/seata/seata/pull/4696)] 修复 oracle 存储模式时的插入问题
- [[#4726](https://github.com/seata/seata/pull/4726)] 修复批量发送消息时可能的NPE问题
- [[#4729](https://github.com/seata/seata/pull/4729)] 修复AspectTransactional.rollbackForClassName设置错误
- [[#4653](https://github.com/seata/seata/pull/4653)] 修复 INSERT_ON_DUPLICATE 主键为非数值异常

### optimize：
- [[#4650](https://github.com/seata/seata/pull/4650)] 修复安全漏洞
- [[#4670](https://github.com/seata/seata/pull/4670)] 优化branchResultMessageExecutor线程池的线程数
- [[#4662](https://github.com/seata/seata/pull/4662)] 优化回滚事务监控指标
- [[#4693](https://github.com/seata/seata/pull/4693)] 优化控制台导航栏
- [[#4700](https://github.com/seata/seata/pull/4700)] 修复 maven-compiler-plugin 和 maven-resources-plugin 执行失败
- [[#4711](https://github.com/seata/seata/pull/4711)] 分离部署时 lib 依赖
- [[#4720](https://github.com/seata/seata/pull/4720)] 优化pom描述
- [[#4728](https://github.com/seata/seata/pull/4728)] 将logback版本依赖升级至1.2.9
- [[#4745](https://github.com/seata/seata/pull/4745)] 发行包中支持 mysql8 driver
- [[#4626](https://github.com/seata/seata/pull/4626)] 使用 `easyj-maven-plugin` 插件代替 `flatten-maven-plugin`插件，以修复`shade` 插件与 `flatten` 插件不兼容的问题
- [[#4629](https://github.com/seata/seata/pull/4629)] 更新globalSession状态时检查更改前后的约束关系
- [[#4662](https://github.com/seata/seata/pull/4662)] 优化 EnhancedServiceLoader 可读性


### test：
- [[#4544](https://github.com/seata/seata/pull/4544)] 优化TransactionContextFilterTest中jackson包依赖问题
- [[#4731](https://github.com/seata/seata/pull/4731)] 修复 AsyncWorkerTest 和 LockManagerTest 的单测问题。


非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。

<!-- 请确保您的 GitHub ID 在以下列表中 -->
- [slievrly](https://github.com/slievrly)
- [pengten](https://github.com/pengten)
- [YSF-A](https://github.com/YSF-A)
- [tuwenlin](https://github.com/tuwenlin)
- [2129zxl](https://github.com/2129zxl)
- [Ifdevil](https://github.com/Ifdevil)
- [wingchi-leung](https://github.com/wingchi-leung)
- [liurong](https://github.com/robynron)
- [opelok-z](https://github.com/opelok-z)
- [funky-eyes](https://github.com/funky-eyes)
- [Smery-lxm](https://github.com/Smery-lxm)
- [lvekee](https://github.com/lvekee)
- [doubleDimple](https://github.com/doubleDimple)
- [wangliang181230](https://github.com/wangliang181230)
- [Bughue](https://github.com/Bughue)
- [AYue-94](https://github.com/AYue-94)
- [lingxiao-wu](https://github.com/lingxiao-wu)
- [caohdgege](https://github.com/caohdgege)

同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。

#### Link

- **Seata:** https://github.com/seata/seata
- **Seata-Samples:** https://github.com/seata/seata-samples
- **Release:** https://github.com/seata/seata/releases
- **WebSite:** https://seata.io

</details>


### 1.5.1 (2022-05-17)

[source](https://github.com/seata/seata/archive/v1.5.1.zip) |
[binary](https://github.com/seata/seata/releases/download/v1.5.1/seata-server-1.5.1.zip)

<details>
  <summary><mark>Release notes</mark></summary>


### Seata 1.5.1

Seata 1.5.1 发布。

Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

此版本更新如下：

### feature：
[#4115](https://github.com/seata/seata/pull/4115) 支持用户控制台   
[#3652](https://github.com/seata/seata/pull/3652) 支持 APM SkyWalking 集成   
[#3472](https://github.com/seata/seata/pull/3472) 添加 redisLocker 的 lua 模式   
[#3575](https://github.com/seata/seata/pull/3575) 支持对锁和会话不同存储的混合使用   
[#3009](https://github.com/seata/seata/pull/3009) 支持 server 端以 springboot的方式的启动   
[#3374](https://github.com/seata/seata/pull/3374) 支持 MySQL INSERT ON DUPLICATE KEY UPDATE   
[#3642](https://github.com/seata/seata/pull/3642) TCC 模式支持使用 API 的形式进行二阶段参数传递   
[#3064](https://github.com/seata/seata/pull/3064) 支持可配置 GlobalTransactionInterceptor 和 TccActionInterceptor 的order值   
[#2852](https://github.com/seata/seata/pull/2852) 支持自定义 GlobalTransactionScanner 的扫描对象   
[#3683](https://github.com/seata/seata/pull/3683) 支持 Redis 分布式锁来避免多TC竞争执行任务   
[#3545](https://github.com/seata/seata/pull/3545) TCC 模式支持幂等控制、防悬挂和空回滚   
[#3823](https://github.com/seata/seata/pull/3823) TCC 模式二阶段方法参数列表支持自定义   
[#3642](https://github.com/seata/seata/pull/3642) TCC 模式一阶段支持 BusinessActionContext 隐式传递   
[#3856](https://github.com/seata/seata/pull/3856) 支持 Edas-Hsf RPC 框架   
[#3869](https://github.com/seata/seata/pull/3869) 支持从环境 ENV 获取配置   
[#2568](https://github.com/seata/seata/pull/2568) 支持 GlobalTransactionInterceptor 配置切面表达式   
[#3886](https://github.com/seata/seata/pull/3886) 支持注册中心注册 ip 的网络偏好设置   
[#3906](https://github.com/seata/seata/pull/3906) 支持 SPI 卸载   
[#3668](https://github.com/seata/seata/pull/3668) 支持 kotlin 协程   
[#3968](https://github.com/seata/seata/pull/3968) 支持 bRPC-java RPC框架    
[#4268](https://github.com/seata/seata/pull/4268) 增加控制台 Global Session页面File模式实现   
[#4281](https://github.com/seata/seata/pull/4281) 增加控制台 Global Session页面和Global LockRedis模式实现   
[#4293](https://github.com/seata/seata/pull/4293) 增加控制台 Global Lock页面File模式实现   
[#4335](https://github.com/seata/seata/pull/4335) 实现配置中心上传配置交互脚本(nacos,etcd3)   
[#4360](https://github.com/seata/seata/pull/4360) 实现配置中心上传配置交互脚本(apollo,consul,zk)   
[#4320](https://github.com/seata/seata/pull/4320) 实现控制台db模式全局事务、锁查询接口   
[#4435](https://github.com/seata/seata/pull/4435) 控制台前端页面实现   
[#4480](https://github.com/seata/seata/pull/4480) 实现 DefaultAuthSigner 的默认签名加密方法   
[#3487](https://github.com/seata/seata/pull/3487) 增加分布式锁的 DB 实现    
[#3951](https://github.com/seata/seata/pull/3951) 支持 zstd 压缩   
[#2838](https://github.com/seata/seata/pull/2838) Saga 支持 springboot 项目的自动配置   


### bugfix：
[#3497](https://github.com/seata/seata/pull/3497) 修复 TCC 模式并发量较大时线程池导致的超时问题   
[#3686](https://github.com/seata/seata/pull/3686) 修复 Apollo 集群配置项错误及NPE错误   
[#3716](https://github.com/seata/seata/pull/3716) 修复 findTargetClass 方法的错误   
[#3773](https://github.com/seata/seata/pull/3773) 修复 consul 注册中心在自定义集群名下无法获取 TC 集群   
[#3695](https://github.com/seata/seata/pull/3695) 修复 mariadb 无法创建XA连接的问题   
[#3783](https://github.com/seata/seata/pull/3783) 修复 store mode 不生效问题   
[#3740](https://github.com/seata/seata/pull/3740) 修复在某些情况下，当Saga事务结束时 LocalThread 未被清除的问题   
[#3792](https://github.com/seata/seata/pull/3792) 修复 Server 无法获取 Redis host的问题   
[#3828](https://github.com/seata/seata/pull/3828) 修复 StringUtils 抛出 StackOverflowError 的问题   
[#3817](https://github.com/seata/seata/pull/3817) 修复 TC 在SkyWalking拓扑图节点不汇聚的问题   
[#3803](https://github.com/seata/seata/pull/3803) 修复 ReflectionUtil 抛出不预期异常问题   
[#3879](https://github.com/seata/seata/pull/3879) 修复 PosrgreSQL多schema无法找到channel问题    
[#3881](https://github.com/seata/seata/pull/3881) 修复不存在的相同 DataId 不同默认值返回相同值的问题   
[#3897](https://github.com/seata/seata/pull/3897) 修复 FastjsonUndoLogParser 中 localdatatime类型不能回滚的问题   
[#3901](https://github.com/seata/seata/pull/3901) 修复 seataio/seata-server 镜像中 servlet-api 冲突无法启动问题    
[#3931](https://github.com/seata/seata/pull/3931) 修复 线程池拒绝执行情况下,dump内存文件名和路径错误的问题   
[#3949](https://github.com/seata/seata/pull/3949) 修复 nacos-config.py 空白选项的问题和内容丢失的问题   
[#3988](https://github.com/seata/seata/pull/3988) 修复 nacos 的密码带有特殊字符导致用户名不存在问题   
[#3978](https://github.com/seata/seata/pull/3978) 修复 future timeout 引发的 NPE 问题   
[#3998](https://github.com/seata/seata/pull/3978) 修复 jedis multi.exec 的 NPE 问题   
[#4011](https://github.com/seata/seata/pull/4011) 修复 springboot下无法获取distributed-lock-table配置   
[#4023](https://github.com/seata/seata/pull/4023) 修复 dubbo部分场景存在xid未清除的问题   
[#4032](https://github.com/seata/seata/pull/4032) 修复 server端的ShutdownHook在资源释放时，ApplicationContext已关闭的问题   
[#4039](https://github.com/seata/seata/pull/4039) 修复本地事务抛出异常后 RM 没有清除xid问题   
[#4074](https://github.com/seata/seata/pull/4074) 修复 XA 模式资源悬挂问题   
[#4107](https://github.com/seata/seata/pull/4107) 修复项目构建时的死锁问题   
[#4158](https://github.com/seata/seata/pull/4158) 修复 logback 无法加载到 RPC_PORT 的问题   
[#4162](https://github.com/seata/seata/pull/4162) 修复  Redis 注册中心内置配置名导致启动报错问题   
[#4165](https://github.com/seata/seata/pull/4165) 修复 StringUtils.toString(obj) 当obj是基本数据数组时，抛出ClassCastException的问题   
[#4169](https://github.com/seata/seata/pull/4169) 修复 XA 模式originalConnection已关闭，导致二阶段无法执行    
[#4177](https://github.com/seata/seata/pull/4177) 修复当事务超时且TM发起commit决议时,意外造成全局锁释放的问题    
[#4174](https://github.com/seata/seata/pull/4174) 修复删除 undolog 时连接关闭问题   
[#4189](https://github.com/seata/seata/pull/4189) 修复 kafka-appender.xml 和 logstash-appender.xml 配置文件表达式中的默认值问题   
[#4213](https://github.com/seata/seata/pull/4213) 修复部分"sessionMode"代码未执行导致启动失败问题   
[#4220](https://github.com/seata/seata/pull/4220) 修复 zstd-compressor 模块未合并到 seata-all 中的问题   
[#4222](https://github.com/seata/seata/pull/4222) 修复字段列表为空时，插入语句无法回滚的问题   
[#4253](https://github.com/seata/seata/pull/4253) 修复 UpdateExecutor只存储set 字段问题   
[#4233](https://github.com/seata/seata/pull/4233) 修复 lock 和 branch 数据残留问题   
[#4278](https://github.com/seata/seata/pull/4278) 修复 MySQL 的Blob/Clob/NClob数据类型无法反序列化的问题   
[#4302](https://github.com/seata/seata/pull/4302) 修复 ORM 可能存在获取不到自增主键值的问题   
[#4308](https://github.com/seata/seata/pull/4308) 修复PostgreSQL多个schema下存在相同表的TableMetaCache解析问题   
[#4326](https://github.com/seata/seata/pull/4326) 修复使用 MariaDB 驱动程序时无法构建 Executor 的问题   
[#4355](https://github.com/seata/seata/pull/4355) 修复使用 MySQL Loadbalance模式resourceId被误判为resourceIds的问题   
[#4310](https://github.com/seata/seata/pull/4310) 修复通过 SELECT LAST_INSERT_ID 获取数据库自增id失败的问题   
[#4331](https://github.com/seata/seata/pull/4331) 修复使用 ONLY_CARE_UPDATE_COLUMNS 配置可能出现的脏写校验异常   
[#4408](https://github.com/seata/seata/pull/4408) 修复容器环境中设置环境变量无效的问题    
[#4441](https://github.com/seata/seata/pull/4441) 修复Redis 存储模式下查询时未关闭 Pipeline 
和分支注册后添加分支session时branchSessions为null的问题   
[#4438](https://github.com/seata/seata/pull/4438) 修复 file 模式下 GlobalSession 在延迟删除的情况下无法被正常删除的问题   
[#4432](https://github.com/seata/seata/pull/4432) 修复 ServerApplicationListener无法读取配置中心配置的问题    
[#4452](https://github.com/seata/seata/pull/4452) 修复 service.disableGlobalTransaction 配置的日志输出错误   
[#4449](https://github.com/seata/seata/pull/4449) 修复 Redis 分页查询 NPE 问题,优化readession限制查询条数后均衡返回结果   
[#4459](https://github.com/seata/seata/pull/4459) 修复 Oracle 和 PostgreSQL 数据库生成前后镜像失败的问题    
[#4471](https://github.com/seata/seata/pull/4471) 修复运行时切换事务分组对应集群引起的错误   
[#4474](https://github.com/seata/seata/pull/4474) 修复 MySQL 多位Bit类型字段回滚错误   
[#4492](https://github.com/seata/seata/pull/4492) 修复 eureka 注册中心无法动态更新服务列表的问题   
[#4228](https://github.com/seata/seata/pull/4228) 修复 TC 获取不同 ip 的 RM 连接导致的xa模式资源悬挂问题   
[#4561](https://github.com/seata/seata/pull/4561) 修复 allSessions/findGlobalSessions 某些情况下返回null 的问题   
[#4505](https://github.com/seata/seata/pull/4505) 修复 time类型的fastjson序列化问题   
[#4579](https://github.com/seata/seata/pull/4579) 修复 MySQLInsertOrUpdateExecutor的prepareUndoLogAll   
[#4005](https://github.com/seata/seata/pull/4005) 修复 PK 约束名称与属于PK的唯一索引名称不同   
[#4062](https://github.com/seata/seata/pull/4062) 修复 Saga 复杂参数序列化问题   
[#4199](https://github.com/seata/seata/pull/4199) 修复 RPC TM 请求超时问题   
[#4352](https://github.com/seata/seata/pull/4352) 修复 SQL 解析器的一些问题   
[#3687](https://github.com/seata/seata/pull/3687) 修复某些场景下无法重试全局锁的问题   

### optimize/test：
[#3700](https://github.com/seata/seata/pull/3700) 优化buildLockKey方法的效率   
[#3615](https://github.com/seata/seata/pull/3615) 优化二阶段同步提交时全局事务记录可异步删除   
[#3689](https://github.com/seata/seata/pull/3689) 修正script/server/config/file.properties中属性编写错误   
[#3588](https://github.com/seata/seata/pull/3588) 优化数据源自动代理的流程   
[#3528](https://github.com/seata/seata/pull/3528) 优化Redis存储模式内存占用   
[#3626](https://github.com/seata/seata/pull/3626) 移除重复的changeStatus代码   
[#3722](https://github.com/seata/seata/pull/3722) 添加分布式锁的代码    
[#3713](https://github.com/seata/seata/pull/3713) 统一enableClientBatchSendRequest的默认值   
[#3120](https://github.com/seata/seata/pull/3120) 优化Configuration的部分代码，并添加单元测试   
[#3735](https://github.com/seata/seata/pull/3735) 当TC只有单个节点时，不进行非必要的负载均衡操作   
[#3770](https://github.com/seata/seata/pull/3770) 关闭一些未关闭的对象   
[#3627](https://github.com/seata/seata/pull/3627) 使用TreeMap替换 TableMeta 中的 LinkedHashMap 以兼容高版本的MySQL   
[#3760](https://github.com/seata/seata/pull/3760) 优化seata-server的logback相关的配置   
[#3765](https://github.com/seata/seata/pull/3765) 将添加配置类的操作从AutoConfiguration转移到EnvironmentPostProcessor中并提升该操作的优先级   
[#3730](https://github.com/seata/seata/pull/3730) 重构TCC模式相关的代码   
[#3820](https://github.com/seata/seata/pull/3820) 在表tcc_fence_log中新增字段action_name   
[#3738](https://github.com/seata/seata/pull/3738) JacksonUndoLogParser支持解析LocalDateTime(支持微秒时间)   
[#3794](https://github.com/seata/seata/pull/3794) 优化seata-server的打包配置，修正Dockerfile的错误配置，并将Dockerfile也打包进去   
[#3795](https://github.com/seata/seata/pull/3795) 优化zkRegistrylookup方法性能   
[#3840](https://github.com/seata/seata/pull/3840) 优化apm-skwalking操作方法生成规则   
[#3834](https://github.com/seata/seata/pull/3834) 优化seata-distribution增加apm-seata-skywalking包   
[#3847](https://github.com/seata/seata/pull/3847) 优化ConcurrentHashMap.newKeySet替换ConcurrentSet   
[#3849](https://github.com/seata/seata/pull/3849) 优化字符串拼接    
[#3890](https://github.com/seata/seata/pull/3890) 优化insert后镜像仅查询插入字段   
[#3895](https://github.com/seata/seata/pull/3895) 优化解码异常   
[#3212](https://github.com/seata/seata/pull/3212) 优化解析OrderBy，Limit条件代码结构   
[#3898](https://github.com/seata/seata/pull/3898) 增加docker maven 插件   
[#3904](https://github.com/seata/seata/pull/3904) 增强 metrics 和修复 seata-server 单测不运行的问题   
[#3905](https://github.com/seata/seata/pull/3905) 优化 nacos-config.sh 支持 ash   
[#3935](https://github.com/seata/seata/pull/3935) 优化以Redis为注册中心时,发送多条命令使用pipeline    
[#3916](https://github.com/seata/seata/pull/3916) 优化注册中心服务节点列表地址探活   
[#3918](https://github.com/seata/seata/pull/3918) 缓存Field和Method的反射结果   
[#3311](https://github.com/seata/seata/pull/3311) 支持从consul单一key中读取所有配置   
[#3907](https://github.com/seata/seata/pull/3907) 优化设置 Server 端口   
[#3912](https://github.com/seata/seata/pull/3912) 支持通过env配置JVM参数   
[#3939](https://github.com/seata/seata/pull/3939) 使用map优化大量的判断代码   
[#3955](https://github.com/seata/seata/pull/3955) 添加启动banner   
[#4266](https://github.com/seata/seata/pull/4266) 修改由于修改记录过多导致分支注册及lock释放失败的问题   
[#3949](https://github.com/seata/seata/pull/3949) nacos-config.py 支持默认参数和选择性输入参数   
[#3954](https://github.com/seata/seata/pull/3954) 移除对druid依赖中过期方法的调用   
[#3981](https://github.com/seata/seata/pull/3981) 优化服务端口的优先级设置   
[#4013](https://github.com/seata/seata/pull/4013) 优化可用TC地址检测   
[#3982](https://github.com/seata/seata/pull/3982) 优化 readme 文档和升级POM依赖   
[#3991](https://github.com/seata/seata/pull/3991) 关闭SpringBoot下无用的fileListener   
[#3994](https://github.com/seata/seata/pull/3994) 优化tcc_fence_log表定时删除任务的机制   
[#3327](https://github.com/seata/seata/pull/3327) 支持从etcd3单一key中读取所有配置   
[#4001](https://github.com/seata/seata/pull/4001) 支持从Nacos,Zookeeper,Consul,Etcd3 中读取 yml   
[#4017](https://github.com/seata/seata/pull/4017) 优化文件配置   
[#4018](https://github.com/seata/seata/pull/4018) 优化 Apollo 配置   
[#4021](https://github.com/seata/seata/pull/4021) 优化 Nacos、Consul、Zookeeper、Etcd3 配置   
[#4055](https://github.com/seata/seata/pull/4055) 优化NetUtil的getLocalAddress0方法   
[#4086](https://github.com/seata/seata/pull/4086) 分支事务支持懒加载并优化任务调度    
[#4056](https://github.com/seata/seata/pull/4056) 优化 DurationUtil    
[#4103](https://github.com/seata/seata/pull/4103) 减少分支事务注册无需竞争锁时的内存占用   
[#3733](https://github.com/seata/seata/pull/3733) 优化本地事务下的锁竞争机制   
[#4144](https://github.com/seata/seata/pull/4144) 支持默认的事务分组配置    
[#4157](https://github.com/seata/seata/pull/4157) 优化客户端批量发送请求   
[#4191](https://github.com/seata/seata/pull/4191) RPC 请求超时时间支持配置化   
[#4216](https://github.com/seata/seata/pull/4216) 非 AT 模式无须清理undolog表   
[#4176](https://github.com/seata/seata/pull/4176) 优化 Redis 注册中心存储，改用自动过期key替代hash.   
[#4196](https://github.com/seata/seata/pull/4196) TC 批量响应客户端   
[#4212](https://github.com/seata/seata/pull/4212) 控制台接口合并优化   
[#4237](https://github.com/seata/seata/pull/4237) 当所有的 before image均为空的时候，跳过 checkLock 的步骤   
[#4251](https://github.com/seata/seata/pull/4251) 优化部分代码处理   
[#4262](https://github.com/seata/seata/pull/4262) 优化 TCC 模块代码处理   
[#4235](https://github.com/seata/seata/pull/4235) 优化 eureka 注册中心保存实例信息   
[#4277](https://github.com/seata/seata/pull/4277) 优化 Redis-pipeline模式本地事务下的锁竞争机制   
[#4284](https://github.com/seata/seata/pull/4284) 支持 MSE-Nacos 的 ak/sk 鉴权方式   
[#4299](https://github.com/seata/seata/pull/4299) 优化异常提示   
[#4300](https://github.com/seata/seata/pull/4300) 优化NettyRemotingServer的close()   
[#4270](https://github.com/seata/seata/pull/4270) 提高全局提交和全局回滚的性能，分支事务清理异步化   
[#4307](https://github.com/seata/seata/pull/4307) 优化在 TCC 模式减少不必要的全局锁删除   
[#4303](https://github.com/seata/seata/pull/4303) tcc_fence_log表悬挂日志记录异步删除   
[#4328](https://github.com/seata/seata/pull/4328) 配置上传脚本支持注释   
[#4305](https://github.com/seata/seata/pull/4305) 优化 TC 端全局锁获取失败时的日志打印   
[#4336](https://github.com/seata/seata/pull/4336) 添加 AT 模式不支持的SQL语句异常提示   
[#4359](https://github.com/seata/seata/pull/4359) 支持配置元数据读取环境变量   
[#4353](https://github.com/seata/seata/pull/4353) seata-all.jar 瘦身   
[#4393](https://github.com/seata/seata/pull/4393) Redis & DB 模式下启动不需要reload   
[#4247](https://github.com/seata/seata/pull/4247) 在github actions上，添加基于 java17 和 springboot 各版本的测试   
[#4400](https://github.com/seata/seata/pull/4400) 异步二阶段任务支持并行处理提升效率   
[#4391](https://github.com/seata/seata/pull/4391) commit/rollback 重试超时事件   
[#4282](https://github.com/seata/seata/pull/4282) 优化回滚镜像构建逻辑   
[#4276](https://github.com/seata/seata/pull/4276) 修复 seata-test 单测不运行的问题   
[#4407](https://github.com/seata/seata/pull/4407) file模式下无需延迟删除globasession   
[#4436](https://github.com/seata/seata/pull/4436) 优化file模式下的global session查询接口   
[#4431](https://github.com/seata/seata/pull/4431) 优化Redis模式查询globalSession限制查询条数   
[#4465](https://github.com/seata/seata/pull/4465) 优化TC 批量响应客户端模式客户端版本传输方式   
[#4469](https://github.com/seata/seata/pull/4469) 优化控制台db模式下获取配置的方式   
[#4478](https://github.com/seata/seata/pull/4478) 优化 Nacos 配置和注册元数据属性   
[#4522](https://github.com/seata/seata/pull/4522) 优化 GC 参数   
[#4517](https://github.com/seata/seata/pull/4517) 增强失败/超时状态的监控   
[#4451](https://github.com/seata/seata/pull/4451) fileSessionManager改为单例并优化任务线程池处理   
[#4551](https://github.com/seata/seata/pull/4551) 优化 metrics rt 统计问题   
[#4574](https://github.com/seata/seata/pull/4574) 支持 accessKey/secretKey 配置自动注入   
[#4583](https://github.com/seata/seata/pull/4583) DefaultAuthSigner 的默认签名加密方法替换为HmacSHA256   
[#4591](https://github.com/seata/seata/pull/4591) 优化开关默认值   
[#3780](https://github.com/seata/seata/pull/3780) 升级 Druid 版本   
[#3797](https://github.com/seata/seata/pull/3797) 支持在Try 方法外由用户自己实例化BusinessActionContext   
[#3909](https://github.com/seata/seata/pull/3909) 优化collectRowLocks 方法   
[#3763](https://github.com/seata/seata/pull/3763) 优化 github actions   
[#4345](https://github.com/seata/seata/pull/4345) 修正包目录名   
[#4346](https://github.com/seata/seata/pull/4346) 优化服务器日志并移除lombok   
[#4348](https://github.com/seata/seata/pull/4348) 统一管理maven插件及其版本   
[#4354](https://github.com/seata/seata/pull/4354) 优化saga测试用例   
[#4227](https://github.com/seata/seata/pull/4227) 统一管理依赖的版本，并且升级spring-boot到2.4.13   
[#4453](https://github.com/seata/seata/pull/4453) 升级 eureka-clients 和 xstream 的版本    
[#4481](https://github.com/seata/seata/pull/4481) 优化nacos配置和命名属性    
[#4477](https://github.com/seata/seata/pull/4477) 优化调试级别日志并修复拼写错误   
[#4484](https://github.com/seata/seata/pull/4484) 优化TM/RM注册时TC的日志打印   
[#4458](https://github.com/seata/seata/pull/4458) 修复 metrices 模块 README.md 的配置遗漏问题   
[#4482](https://github.com/seata/seata/pull/4482) [#3654](https://github.com/seata/seata/pull/3654) 修复typos   
[#3880](https://github.com/seata/seata/pull/3880) 贡献文档增加中文版本   
[#4134](https://github.com/seata/seata/pull/4134) 初始化控制台基础代码   
[#3870](https://github.com/seata/seata/pull/3870) 让seata-bom成为真正的Bill-Of-Material   
[#3889](https://github.com/seata/seata/pull/3889) 支持注册中心添加心跳   
[#3702](https://github.com/seata/seata/pull/3702) 修改注释   
[#4608](https://github.com/seata/seata/pull/4608) [#3110](https://github.com/seata/seata/pull/4465) 修复测试用例   
[#4163](https://github.com/seata/seata/pull/4163) 完善开发者奉献文档   
[#3678](https://github.com/seata/seata/pull/3678) 补充遗漏的配置及新版本pr登记md文件   
[#4449](https://github.com/seata/seata/pull/4449) 优化 Redis limit 并修复 Redis 分页问题   
[#4535](https://github.com/seata/seata/pull/4535) 修复 FileSessionManagerTest单测错误   
[#4025](https://github.com/seata/seata/pull/4025) 优化潜在的数据库资源泄露   


非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。

- [slievrly](https://github.com/slievrly)
- [wangliang181230](https://github.com/wangliang181230)
- [funky-eyes](https://github.com/funky-eyes)
- [lvekee](https://github.com/lvekee)
- [caohdgege](https://github.com/caohdgege)
- [lightClouds917](https://github.com/lightClouds917)
- [objcoding](https://github.com/objcoding)
- [siyu](https://github.com/Pinocchio2018)
- [GoodBoyCoder](https://github.com/GoodBoyCoder)
- [pengten](https://github.com/pengten)
- [Bughue](https://github.com/Bughue)
- [doubleDimple](https://github.com/doubleDimple)
- [zhaoyuguang](https://github.com/zhaoyuguang)
- [liuqiufeng](https://github.com/liuqiufeng)
- [jsbxyyx](https://github.com/jsbxyyx)
- [lcmvs](https://github.com/lcmvs)
- [onlinechild](https://github.com/onlinechild)
- [xjlgod](https://github.com/xjlgod)
- [h-zhi](https://github.com/h-zhi)
- [tanzzj](https://github.com/tanzzj)
- [miaoxueyu](https://github.com/miaoxueyu)
- [selfishlover](https://github.com/selfishlover)
- [tuwenlin](https://github.com/tuwenlin)
- [dmego](https://github.com/dmego)
- [xiaochangbai](https://github.com/xiaochangbai)
- [Rubbernecker](https://github.com/Rubbernecker)
- [ruanun](https://github.com/ruanun)
- [huan415](https://github.com/huan415)
- [drgnchan](https://github.com/drgnchan)
- [cmonkey](https://github.com/cmonkey)
- [13414850431](https://github.com/13414850431)
- [ls9527](https://github.com/ls9527)
- [xingfudeshi](https://github.com/xingfudeshi)
- [spilledyear](https://github.com/spilledyear)
- [kaka2code](https://github.com/kaka2code)
- [iqinning](https://github.com/iqinning)
- [yujianfei1986](https://github.com/yujianfei1986)
- [elrond-g](https://github.com/elrond-g)
- [jameslcj](https://github.com/jameslcj)
- [zhouchuhang](https://github.com/zch0214)
- [xujj](https://github.com/XBNGit)
- [mengxzh](https://github.com/mengxzh)
- [portman](https://github.com/iportman)
- [anselleeyy](https://github.com/anselleeyy)
- [wangyuewen](https://github.com/2858917634)
- [imherewait](https://github.com/imherewait)
- [wfnuser](https://github.com/wfnuser)
- [zhixing](https://github.com/chenlei3641)


同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。

#### Link

- **Seata:** https://github.com/seata/seata
- **Seata-Samples:** https://github.com/seata/seata-samples
- **Release:** https://github.com/seata/seata/releases
- **WebSite:** https://seata.io

</details>

