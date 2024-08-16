---
title: 发布说明
keywords: [Seata, 发布说明, 2.0.x]
description: 2.0.x 发布说明
---

# 发布说明

## Seata

> GitHub: https://github.com/apache/incubator-seata
>
> 发布说明: https://github.com/apache/incubator-seata/releases

### 2.0.0 (2023-11-24，推荐版本)

[source](https://github.com/apache/incubator-seata/archive/v2.0.0.zip) |
[binary](https://github.com/apache/incubator-seata/releases/download/v2.0.0/seata-server-2.0.0.zip)

<details>
  <summary><mark>Release notes</mark></summary>

### Seata 2.0.0

Seata 2.0.0 发布

Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

此版本更新如下：

### feature

- [[#5165](https://github.com/apache/incubator-seata/pull/5165)] TCC 结构拆分，支持 API 方式接入。增加集成层模块（seata-integration-tx-api），对事务流程定义以及代理部分增强。
- [[#5352](https://github.com/apache/incubator-seata/pull/5352)] 在 TCC Business Action Context 中集成 jackson 和 gson 序列化功能
- [[#5377](https://github.com/apache/incubator-seata/pull/5377)] 使 AbstractHttpExecutor 类支持 PUT 方式的请求
- [[#5396](https://github.com/apache/incubator-seata/pull/5396)] TC 异常日志指标采集
- [[#5118](https://github.com/apache/incubator-seata/pull/5118)] 支持二阶段并行下发执行
- [[#5529](https://github.com/apache/incubator-seata/pull/5529)] docker 镜像支持注入 JVM 参数到容器
- [[#3887](https://github.com/apache/incubator-seata/pull/3887)] 增加 AT 模式的 SQLServer 数据库支持
- [[#4033](https://github.com/apache/incubator-seata/pull/4033)] 增加 ServerDB 存储模式的 SQLServer 支持
- [[#5600](https://github.com/apache/incubator-seata/pull/5600)] skywalking 插件支持根据 XID 追踪事务
- [[#5357](https://github.com/apache/incubator-seata/pull/5357)] seata console 集成 saga 设计器
- [[#5717](https://github.com/apache/incubator-seata/pull/5717)] 兼容 1.4.2 及以下版本的 file.conf/registry.conf 配置
- [[#5842](https://github.com/apache/incubator-seata/pull/5842)] 构建 docker 镜像时添加相关 git 信息,方便定位代码关系
- [[#5902](https://github.com/apache/incubator-seata/pull/5902)] 支持 IPv6 网络环境
- [[#5907](https://github.com/apache/incubator-seata/pull/5907)] 增加 AT 模式的 PolarDB-X 2.0 数据库支持
- [[#5932](https://github.com/apache/incubator-seata/pull/5932)] AT 模式支持达梦数据库
- [[#5946](https://github.com/apache/incubator-seata/pull/5946)] 增加 sqlserver 对控制台分页接口的适配
- [[#5226](https://github.com/apache/incubator-seata/pull/5226)] 支持 Raft 集群部署和事务存储模式

### bugfix

- [[#5677](https://github.com/apache/incubator-seata/pull/5677)] 修复 saga 模式下 serviceTask 入参 autoType 转化失败问题
- [[#5277](https://github.com/apache/incubator-seata/pull/5277)] 修复控制台全局锁查询接口查到了已释放的锁
- [[#5282](https://github.com/apache/incubator-seata/pull/5282)] 修复并行 rm 请求处理时数组索引越界问题
- [[#5294](https://github.com/apache/incubator-seata/pull/5294)] 修复 AT 模式下 pgsql/oracle 的主键列自增的问题
- [[#5298](https://github.com/apache/incubator-seata/pull/5298)] 事务提交或回滚超时不移除 global session
- [[#5304](https://github.com/apache/incubator-seata/pull/5304)] 移除基于文件存储恢复时的 RollbackRetryTimeout 事务
- [[#5310](https://github.com/apache/incubator-seata/pull/5310)] 修复生成 update 前后镜像 sql 不对关键字转义的 bug
- [[#5318](https://github.com/apache/incubator-seata/pull/5318)] 修复 jdk8 中 G1 参数
- [[#5330](https://github.com/apache/incubator-seata/pull/5330)] 修复单元测试中发现的 bug
- [[#5337](https://github.com/apache/incubator-seata/pull/5337)] 修复 feature#5165 中关于 spring 使用环境下，多 interceptor 排序问题，同时修复 order 一致时无法使用 BeforeTransaction(AfterTransaction)事务排序问题
- [[#5347](https://github.com/apache/incubator-seata/pull/5347)] 修复控制台打印 `unauthorized error` 问题
- [[#5355](https://github.com/apache/incubator-seata/pull/5355)] 修复自定义 context-path 时的问题
- [[#5362](https://github.com/apache/incubator-seata/pull/5362)] 修复当 TC 端回滚返回 RollbackFailed 时，自定义 FailureHandler 的方法未执行
- [[#5373](https://github.com/apache/incubator-seata/pull/5373)] 修复客户侧事务提交前超时未执行 hook 和 failureHandler 的问题
- [[#5395](https://github.com/apache/incubator-seata/pull/5395)] 修复 AT 模式下新增字段产生的字段找不到
- [[#5426](https://github.com/apache/incubator-seata/pull/5426)] 修复不能获取 GlobalTransactional 注解问题
- [[#5464](https://github.com/apache/incubator-seata/pull/5464)] 修复 saga 模式全局事务状态始终为 Begin 的问题
- [[#5478](https://github.com/apache/incubator-seata/pull/5478)] 修复提交事务时事务已完成不抛出异常问题
- [[#5490](https://github.com/apache/incubator-seata/pull/5490)] 修复日志中不打印方法名的问题
- [[#5449](https://github.com/apache/incubator-seata/pull/5449)] 修复 Oracle XA 模式 start 重入问题
- [[#5462](https://github.com/apache/incubator-seata/pull/5462)] 在 RM 中使用`@GlobalTransactional`时,如果 RM 执行失败会抛出`ShouldNeverHappenException`
- [[#5498](https://github.com/apache/incubator-seata/pull/5498)] 修复 Oracle 10g 中“setDate”条件的全表扫描问题
- [[#5531](https://github.com/apache/incubator-seata/pull/5531)] 修复读取 logback 文件路径错误的问题
- [[#5523](https://github.com/apache/incubator-seata/pull/5523)] 修复 GlobalStatus=9 在 DB 存储模式无法清除的问题
- [[#5558](https://github.com/apache/incubator-seata/pull/5558)] 修复 mariadb 回滚失败的问题
- [[#5556](https://github.com/apache/incubator-seata/pull/5556)] 修复 oracle 插入 undolog 失败问题
- [[#5579](https://github.com/apache/incubator-seata/pull/5579)] 修复 resourceId 为空时，获取 RM_CHANNELS 空指针问题
- [[#5577](https://github.com/apache/incubator-seata/pull/5577)] 修复 grpc 拦截器解绑 xid 失败问题
- [[#5594](https://github.com/apache/incubator-seata/pull/5594)] 修复 participant 情况下的重复日志
- [[#5604](https://github.com/apache/incubator-seata/pull/5604)] 修复在 DB 模式下 `asyncCommit` 和 `queueToRetryCommit` 两个方法总是失败的问题
- [[#5658](https://github.com/apache/incubator-seata/pull/5658)] 修复大写和小写列名称的转义字符
- [[#5661](https://github.com/apache/incubator-seata/pull/5661)] 修复 connectionProxyXA 连接复用时 timeout 为 null
- [[#5679](https://github.com/apache/incubator-seata/pull/5679)] 修复 xxx.grouplist 和 grouplist.xxx 配置项兼容问题
- [[#5715](https://github.com/apache/incubator-seata/pull/5715)] 修复取中划线配置项错误问题
- [[#5748](https://github.com/apache/incubator-seata/pull/5748)] 修复在某些情况下，业务 sql 中主键字段名大小写与表元数据中的不一致，导致回滚失败
- [[#5745](https://github.com/apache/incubator-seata/pull/5745)] 修复不满足 sofa-rpc 中 setAttachment 方法的参数前缀要求问题
- [[#5772](https://github.com/apache/incubator-seata/pull/5762)] 修复 TableMetaCache 的一些字段类型，避免溢出
- [[#5787](https://github.com/apache/incubator-seata/pull/5794)] 解决 redis 作为注册中心时 cluster 无法自定义的 BUG
- [[#5810](https://github.com/apache/incubator-seata/pull/5810)] 修复 druid 依赖冲突导致的 XA 事务开始异常与回滚失败
- [[#5821](https://github.com/apache/incubator-seata/pull/5821)] 修复 insert executor 对关键字未转义的问题
- [[#5835](https://github.com/apache/incubator-seata/pull/5835)] bugfix: 修复当 XA 事务失败回滚后，TC 还会继续重试回滚的问题
- [[#5881](https://github.com/apache/incubator-seata/pull/5880)] 修复事务回滚时锁未删除的问题
- [[#5930](https://github.com/apache/incubator-seata/pull/5930)] 修复存储为 redis 哨兵模式下哨兵密码缺失的问题
- [[#5958](https://github.com/apache/incubator-seata/pull/5958)] 在二阶段提交状态下发生重选时需要进行解除全局锁
- [[#5971](https://github.com/apache/incubator-seata/pull/5971)] 修复某些未弃用的配置显示"已弃用"
- [[#5977](https://github.com/apache/incubator-seata/pull/5977)] 修复当 raft server 关闭时,rpc server 未关闭的问题
- [[#5954](https://github.com/apache/incubator-seata/pull/5954)] 修复保存的分支会话状态与实际的分支会话状态不一致的问题
- [[#5990](https://github.com/apache/incubator-seata/pull/5990)] 修复 redis sentinel master node 宕机时，lua 脚本未同步的问题
- [[#5997](https://github.com/apache/incubator-seata/pull/5997)] 修复全局事务钩子重复执行
- [[#6018](https://github.com/apache/incubator-seata/pull/6018)] 修复错误的 metric 上报
- [[#6024](https://github.com/apache/incubator-seata/pull/6024)] 修复控制台点击事务信息页面中的"查看全局锁"按钮之后白屏的问题
- [[#6015](https://github.com/apache/incubator-seata/pull/6015)] 修复在 spring 环境下无法集成 dubbo
- [[#6049](https://github.com/apache/incubator-seata/pull/6049)] 修复客户端在 raft 注册中心类型下，网络中断时，watch 线程未暂停一秒等待重试的问题
- [[#6050](https://github.com/apache/incubator-seata/pull/6050)] 修改 RaftServer#destroy 为等待所有关闭流程结束
- [[#6033](https://github.com/apache/incubator-seata/pull/6033)] 修复 HSFRemotingParser 中 isReference 判断逻辑，去掉关于 FactoryBean 的无用判断

### optimize

- [[#5966](https://github.com/apache/incubator-seata/pull/5966)] Saga 表达式解耦并统一格式
- [[#5928](https://github.com/apache/incubator-seata/pull/5928)] 增加 Saga 模式状态机语义验证阶段
- [[#4858](https://github.com/apache/incubator-seata/pull/4858)] 重构优化 SessionManager 用法
- [[#4881](https://github.com/apache/incubator-seata/pull/4881)] 重新划分 SessionManager 和 SessionLifecycleListener 用法
- [[#5273](https://github.com/apache/incubator-seata/pull/5273)] 优化`protobuf-maven-plugin`插件的编译配置，解决高版本的命令行过长问题
- [[#5278](https://github.com/apache/incubator-seata/pull/5278)] 清理 sessionmanager 多例模式遗留代码
- [[#5302](https://github.com/apache/incubator-seata/pull/5302)] 移除启动脚本的-Xmn 参数
- [[#4880](https://github.com/apache/incubator-seata/pull/4880)] 优化提交和回滚遇到异常时的日志输出
- [[#5322](https://github.com/apache/incubator-seata/pull/5322)] 优化 SPI 加载日志
- [[#5326](https://github.com/apache/incubator-seata/pull/5326)] 为全局事务超时日志添加时间信息
- [[#5328](https://github.com/apache/incubator-seata/pull/5333)] 为全局事务和事务存储的 Redis 模式，增加对应的 lua 实现
- [[#5341](https://github.com/apache/incubator-seata/pull/5341)] 优化 gRPC TCC 模式
- [[#5342](https://github.com/apache/incubator-seata/pull/5342)] 优化 TCC fence log 清理定时任务的 delay 参数值检查
- [[#5344](https://github.com/apache/incubator-seata/pull/5344)] 添加配置中心、注册中心类型以及存储模式日志信息
- [[#5351](https://github.com/apache/incubator-seata/pull/5351)] 优化 TCC 模式下的 RPC filter
- [[#5354](https://github.com/apache/incubator-seata/pull/5354)] 重构 RPC 集成模块
- [[#5370](https://github.com/apache/incubator-seata/pull/5370)] 优化事务失败处理 handler
- [[#5431](https://github.com/apache/incubator-seata/pull/5431)] 优化 github 工作流
- [[#5461](https://github.com/apache/incubator-seata/pull/5461)] 优化 license workflow
- [[#5456](https://github.com/apache/incubator-seata/pull/5456)] 重构 ColumnUtils 和 EscapeHandler
- [[#5438](https://github.com/apache/incubator-seata/pull/5438)] 优化 code style 检测属性
- [[#5471](https://github.com/apache/incubator-seata/pull/5471)] 优化客户侧事务日志
- [[#5485](https://github.com/apache/incubator-seata/pull/5485)] 优化 Server 日志输出
- [[#4907](https://github.com/apache/incubator-seata/pull/4907)] 调整二阶段 result 线程池大小及优化代码
- [[#5487](https://github.com/apache/incubator-seata/pull/5487)] 将 branchsession 中的 lockholder 增加 final 修饰
- [[#5519](https://github.com/apache/incubator-seata/pull/5519)] 优化 Oracle FenceHandler
- [[#5501](https://github.com/apache/incubator-seata/pull/5501)] 支持乐观锁方式更新事务状态
- [[#5419](https://github.com/apache/incubator-seata/pull/5419)] 优化镜像发布流水线支持 jdk8/17 和支持 maven 3.9.0
- [[#5549](https://github.com/apache/incubator-seata/pull/5549)] 优化 gpg key 和 发布流水线
- [[#5576](https://github.com/apache/incubator-seata/pull/5576)] 仅当 useTCCFence 设置为 true 时，才开启 Fence 表清理任务
- [[#5623](https://github.com/apache/incubator-seata/pull/5623)] 优化异步提交线程和重试线程之间可能存在的冲突
- [[#5563](https://github.com/apache/incubator-seata/pull/5563)] 优化 channel 通道可用性日志输出
- [[#5553](https://github.com/apache/incubator-seata/pull/5553)] 支持表和列元数据大小写敏感设置
- [[#5644](https://github.com/apache/incubator-seata/pull/5644)] 优化 Server 日志输出
- [[#5680](https://github.com/apache/incubator-seata/pull/5680)] 优化大小写转义符
- [[#5686](https://github.com/apache/incubator-seata/pull/5686)] 优化 license check actions
- [[#5714](https://github.com/apache/incubator-seata/pull/5714)] 优化分布式锁竞争日志
- [[#5723](https://github.com/apache/incubator-seata/pull/5723)] 优化 docker 镜像的默认时区
- [[#5779](https://github.com/apache/incubator-seata/pull/5779)] 删除无用的输出日志并统一日志输出路径
- [[#5802](https://github.com/apache/incubator-seata/pull/5802)] 优化 server 端事务隔离级别为读已提交
- [[#5783](https://github.com/apache/incubator-seata/pull/5783)] 支持 nacos 上 application name 配置
- [[#5524](https://github.com/apache/incubator-seata/pull/5524)] 支持 seata-server.sh 中的更多操作命令
- [[#5836](https://github.com/apache/incubator-seata/pull/5836)] 分离 mariadb 和 mysql 的 AT 实现
- [[#5869](https://github.com/apache/incubator-seata/pull/5869)] 优化一些小的语法
- [[#5885](https://github.com/apache/incubator-seata/pull/5885)] 优化 ConnectionProxyXA 中的日志
- [[#5894](https://github.com/apache/incubator-seata/pull/5894)] 移除无 license 组件
- [[#5895](https://github.com/apache/incubator-seata/pull/5895)] 移除 7z 压缩支持
- [[#5896](https://github.com/apache/incubator-seata/pull/5896)] 移除 mariadb.jdbc 依赖
- [[#5384](https://github.com/apache/incubator-seata/pull/5384)] 统一版本号管理，只需维护 `build/pom.xml` 中的版本号即可。
- [[#5419](https://github.com/apache/incubator-seata/pull/5419)] 发布基于多个 java 版本的 docker 镜像
- [[#5829](https://github.com/apache/incubator-seata/pull/5829)] 修正 `codecov chart` 不展示的问题
- [[#5878](https://github.com/apache/incubator-seata/pull/5878)] 优化 `httpcore` 和 `httpclient` 的依赖定义
- [[#5917](https://github.com/apache/incubator-seata/pull/5917)] 升级 native-lib-loader 版本
- [[#5926](https://github.com/apache/incubator-seata/pull/5926)] 优化一些与 Apollo 相关的脚本
- [[#5938](https://github.com/apache/incubator-seata/pull/5938)] 支持 jmx 监控配置
- [[#5944](https://github.com/apache/incubator-seata/pull/5944)] 修复构建操作警告
- [[#5951](https://github.com/apache/incubator-seata/pull/5951)] 删除在 jdk17 中不支持的配置项
- [[#5959](https://github.com/apache/incubator-seata/pull/5959)] 修正代码风格问题及去除无用的类引用
- [[#6002](https://github.com/apache/incubator-seata/pull/6002)] 移除 fst 序列化模块
- [[#6045](https://github.com/apache/incubator-seata/pull/6045)] 优化 MySQL 衍生数据库判断逻辑

### security

- [[#5642](https://github.com/apache/incubator-seata/pull/5642)] 增加 Hessian 序列化黑白名单
- [[#5694](https://github.com/apache/incubator-seata/pull/5694)] 修复若干 Node.js 依赖安全漏洞
- [[#5801](https://github.com/apache/incubator-seata/pull/5801)] 修复 Java 依赖安全漏洞
- [[#5805](https://github.com/apache/incubator-seata/pull/5805)] 修复序列化漏洞
- [[#5868](https://github.com/apache/incubator-seata/pull/5868)] 修复 npm package 漏洞
- [[#5916](https://github.com/apache/incubator-seata/pull/5916)] 修复 npm package 漏洞
- [[#5942](https://github.com/apache/incubator-seata/pull/5942)] 升级依赖版本
- [[#5987](https://github.com/apache/incubator-seata/pull/5987)] 升级依赖版本
- [[#6013](https://github.com/apache/incubator-seata/pull/6013)] 升级 seata-server 依赖的 spring 版本

### test

- [[#5308](https://github.com/apache/incubator-seata/pull/5308)] 添加单元测试用例 [FileLoader, ObjectHolder, StringUtils]
- [[#5309](https://github.com/apache/incubator-seata/pull/5309)] 添加单元测试用例 [ArrayUtils, ConfigTools, MapUtil]
- [[#5335](https://github.com/apache/incubator-seata/pull/5335)] 添加单元测试用例 [EnhancedServiceLoader,ExtensionDefinition,SizeUtilTest,ReflectionUtil,LowerCaseLinkHashMap,FileLoader,ObjectHolder]
- [[#5367](https://github.com/apache/incubator-seata/pull/5367)] 修复 UpdateExecutorTest 单测失败问题
- [[#5383](https://github.com/apache/incubator-seata/pull/5383)] 修复多 Spring 版本测试失败
- [[#5391](https://github.com/apache/incubator-seata/pull/5391)] 添加 config 模块的单元测试用例
- [[#5428](https://github.com/apache/incubator-seata/pull/5428)] 修复 FileTransactionStoreManagerTest 单测失败问题
- [[#5622](https://github.com/apache/incubator-seata/pull/5622)] 添加单元测试用例 [ExporterType, RegistryType]
- [[#5637](https://github.com/apache/incubator-seata/pull/5637)] 添加单元测试用例 [BatchResultMessage, HeartbeatMessage, RegisterRMResponse, ResultCode, RegisterTMResponse, MergeResultMessage, MergedWarpMessage, Version]
- [[#5893](https://github.com/apache/incubator-seata/pull/5893)] 移除 sofa 测试用例
- [[#5845](https://github.com/apache/incubator-seata/pull/5845)] 升级 `druid` 版本，并添加 `test-druid.yml` 用于测试 seata 与 druid 各版本的兼容性。
- [[#5863](https://github.com/apache/incubator-seata/pull/5863)] 修复单元测试在 Java21 下无法正常运行的问题。
- [[#5986](https://github.com/apache/incubator-seata/pull/5986)] 修复 zookeeper 单测失败问题
- [[#5995](https://github.com/apache/incubator-seata/pull/5995)] 添加 RaftClusterMetadataMsg 模块的单元测试用例
- [[#6001](https://github.com/apache/incubator-seata/pull/6001)] 添加 RaftMsgExecute 模块 branch 包下的单元测试用例
- [[#5996](https://github.com/apache/incubator-seata/pull/5996)] 添加 RaftMsgExecute 模块 global 包下的单元测试用例
- [[#6003](https://github.com/apache/incubator-seata/pull/6003)] 添加 RaftMsgExecute 模块 lock 包下的单元测试用例
- [[#6005](https://github.com/apache/incubator-seata/pull/6005)] 修复 saga 异步测试未定义的行为
- [[#6009](https://github.com/apache/incubator-seata/pull/6009)] 添加 RaftServerFactory 的单元测试用例
- [[#6052](https://github.com/apache/incubator-seata/pull/6052)] 给 ut 升级 springboot 和服务器的 spring 版本

### Contributors

非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。

- [slievrly](https://github.com/slievrly)
- [xssdpgy](https://github.com/xssdpgy)
- [albumenj](https://github.com/albumenj)
- [PeppaO](https://github.com/PeppaO)
- [yuruixin](https://github.com/yuruixin)
- [CrazyLionLi](https://github.com/JavaLionLi)
- [xingfudeshi](https://github.com/xingfudeshi)
- [Bughue](https://github.com/Bughue)
- [pengten](https://github.com/pengten)
- [wangliang181230](https://github.com/wangliang181230)
- [GoodBoyCoder](https://github.com/GoodBoyCoder)
- [funky-eyes](https://github.com/funky-eyes)
- [isharpever](https://github.com/isharpever)
- [mxsm](https://github.com/mxsm)
- [liuqiufeng](https://github.com/liuqiufeng)
- [l81893521](https://github.com/l81893521)
- [dmego](https://github.com/dmego)
- [zsp419](https://github.com/zsp419)
- [tuwenlin](https://github.com/tuwenlin)
- [sixlei](https://github.com/sixlei)
- [yixia](https://github.com/wt-better)
- [capthua](https://github.com/capthua)
- [robynron](https://github.com/robynron)
- [XQDD](https://github.com/XQDD)
- [Weelerer](https://github.com/Weelerer)
- [Ifdevil](https://github.com/Ifdevil)
- [iquanzhan](https://github.com/iquanzhan)
- [leizhiyuan](https://github.com/leizhiyuan)
- [Aruato](https://github.com/Aruato)
- [ggbocoder](https://github.com/ggbocoder)
- [ptyin](https://github.com/ptyin)
- [jsbxyyx](https://github.com/jsbxyyx)
- [xxxcrel](https://github.com/xxxcrel)
- [fengzhenhai168](https://github.com/fengzhenhai168)
- [tobehardest](https://github.com/tobehardest)
- [leezongjie](https://github.com/leezongjie)

同时，我们收到了社区反馈的很多有价值的 issue 和建议，非常感谢大家。

#### 常用链接

- **Seata:** https://github.com/apache/incubator-seata
- **Seata-Samples:** https://github.com/apache/incubator-seata-samples
- **Release:** https://github.com/apache/incubator-seata/releases
- **WebSite:** https://seata.apache.org

</details>
