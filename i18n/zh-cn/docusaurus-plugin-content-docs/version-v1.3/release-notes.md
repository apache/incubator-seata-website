---
title: 发布说明
keywords: [Seata, 发布说明]
description: 本文将向你介绍如何点击了解各版本详情和升级注意事项。
---


# 发布说明

## Seata

> GitHub: https://github.com/apache/incubator-seata 
> 
> 发布说明: https://github.com/apache/incubator-seata/releases

### 1.3.0 (2020-07-14)

 [source](https://github.com/apache/incubator-seata/archive/v1.3.0.zip) |
 [binary](https://github.com/apache/incubator-seata/releases/download/v1.3.0/seata-server-1.3.0.zip) 

<details>
  <summary><mark>Release notes</mark></summary>


  ### Seata 1.3.0

 Seata 1.3.0 发布。
 
 Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。
 
 此版本更新如下：

  ### feature：

  - [[#2398](https://github.com/apache/incubator-seata/pull/2398)] 支持 MySQL 多主键
  - [[#2484](https://github.com/apache/incubator-seata/pull/2484)] 支持 Redis 存储模式
  - [[#2817](https://github.com/apache/incubator-seata/pull/2817)] Saga 流程设计器 Groovy Script Task
  - [[#2646](https://github.com/apache/incubator-seata/pull/2646)] Server 支持 HikariCP 数据源
  - [[#2253](https://github.com/apache/incubator-seata/pull/2253)] 支持根据连续错误数动态升降级
  - [[#2565](https://github.com/apache/incubator-seata/pull/2565)] 支持事务注解类标注
  - [[#2510](https://github.com/apache/incubator-seata/pull/2510)] 协议新增 LZ4 压缩支持
  - [[#2622](https://github.com/apache/incubator-seata/pull/2622)] Server 支持版本检查
  - [[#2658](https://github.com/apache/incubator-seata/pull/2658)] 支持 Oracle 同一实例下不同用户的事务
  - [[#2620](https://github.com/apache/incubator-seata/pull/2620)] 支持使用 Nacos 注册中心配置 group 属性
  - [[#2699](https://github.com/apache/incubator-seata/pull/2699)] 支持 ACM 配置中心
  - [[#2509](https://github.com/apache/incubator-seata/pull/2509)] 支持 update 操作回滚所有数据列和更新列
  - [[#2584](https://github.com/apache/incubator-seata/pull/2584)] StateHandlerInterceptor 和 StateRouterInterceptor 支持 SPI 
  - [[#2808](https://github.com/apache/incubator-seata/pull/2808)] Server 鉴权支持 SPI
  - [[#2616](https://github.com/apache/incubator-seata/pull/2616)] TCC 模式支持 Dubbo 和 Sofa-RPC 注解调用
  - [[#2831](https://github.com/apache/incubator-seata/pull/2831)] Saga 模式支持 jackson parser
  - [[#2554](https://github.com/apache/incubator-seata/pull/2554)] 增加 zookeeper 序列化支持
  - [[#2708](https://github.com/apache/incubator-seata/pull/2708)] 支持 array, datalink 等 JDBC 类型
  - [[#2412](https://github.com/apache/incubator-seata/pull/2412)] xid 生成支持雪花算法
  - [[#2611](https://github.com/apache/incubator-seata/pull/2611)] 支持配置缓存，去除配置中心强依赖

  ### bugfix：

  - [[#2893](https://github.com/apache/incubator-seata/pull/2893)] 修复 postgresql 表名中含 schema 取 tableMeta 错误的问题
  - [[#2887](https://github.com/apache/incubator-seata/pull/2887)] 修复 RM 接收 response 的逻辑
  - [[#2610](https://github.com/apache/incubator-seata/pull/2610)] Nacos 配置同步脚本加入Nacos权限属性控制
  - [[#2588](https://github.com/apache/incubator-seata/pull/2588)] 修复check style不通过时，无详细信息报出的问题
  - [[#2543](https://github.com/apache/incubator-seata/pull/2543)] 修复 ShutdownHook signal 无效问题
  - [[#2598](https://github.com/apache/incubator-seata/pull/2598)] 修复无法注册到 Nacos 的问题
  - [[#2618](https://github.com/apache/incubator-seata/pull/2618)] 修复 zookeeper 无法创建目录的问题
  - [[#2628](https://github.com/apache/incubator-seata/pull/2628)] 修复 delete 操作时表名加别名找不到表名问题
  - [[#2639](https://github.com/apache/incubator-seata/pull/2639)] 修复 Apollo 配置中心由于属性大小写导致的无法加载问题
  - [[#2629](https://github.com/apache/incubator-seata/pull/2629)] 修复 PostgreSQL 相同实例不同 currentSchema 导致的 resourceId 重复问题
  - [[#2659](https://github.com/apache/incubator-seata/pull/2659)] 修复 MySQL 使用 last_insert_id 获取到 undo_log id 问题
  - [[#2670](https://github.com/apache/incubator-seata/pull/2670)] 修复 Server dataSource 初始化多次的问题
  - [[#2617](https://github.com/apache/incubator-seata/pull/2617)] 修复类和方法上注解获取不正确的问题
  - [[#2603](https://github.com/apache/incubator-seata/pull/2603)] 修复无法获取 generated keys value 的问题
  - [[#2725](https://github.com/apache/incubator-seata/pull/2725)] 修复 insert 操作时主键前含有其他表达式导致的索引位置不正确的问题
  - [[#2698](https://github.com/apache/incubator-seata/pull/2698)] 修复嵌套 GlobalLock 被提前解绑的问题
  - [[#2755](https://github.com/apache/incubator-seata/pull/2755)] 修复 TCC 模式 branchCommit 和 branchRollback 抛出异常无返回值的问题
  - [[#2777](https://github.com/apache/incubator-seata/pull/2777)] 修复 rollback 重试次数设置为 0 无法回滚的问题
  - [[#2812](https://github.com/apache/incubator-seata/pull/2812)] 修复使用 shardingSphere & Seata 获取 PostgreSQL tableMeta错误的问题
  - [[#2760](https://github.com/apache/incubator-seata/pull/2760)] 修复回滚失败 failureHandler 无法抛出失败异常的问题
  - [[#2837](https://github.com/apache/incubator-seata/pull/2837)] 修复 SubStateMachineHandler 中错误的常量引用
  - [[#2839](https://github.com/apache/incubator-seata/pull/2839)] 修复 Saga 模式补偿成功业务异常丢失的问题
  - [[#2650](https://github.com/apache/incubator-seata/pull/2650)] 修复 TCC 和 Saga 模式在 AbstractConnectionProxy解析SQL的问题
  - [[#2850](https://github.com/apache/incubator-seata/pull/2850)] 修复 Saga 流程设计器导致浏览器崩溃的问题
  - [[#2868](https://github.com/apache/incubator-seata/pull/2868)] 修复找不到 AsyncEventBus 依赖的问题
  - [[#2871](https://github.com/apache/incubator-seata/pull/2871)] 修复获取 'schame'.'table' 类型 tableMeta 错误的问题
  - [[#2685](https://github.com/apache/incubator-seata/pull/2685)] 修复 Oracle insert 操作使用 sysdate 报错的问题.
  - [[#2872](https://github.com/apache/incubator-seata/pull/2872)] 修复 undo sql 中主键缺失转义符的问题
  - [[#2875](https://github.com/apache/incubator-seata/pull/2875)] 修复 ColumnUtils delEscape删除表名带 schema 转义符错误的问题.


  ### optimize： 

  - [[#2573](https://github.com/apache/incubator-seata/pull/2573)] 在随机负载均衡中使用 ThreadLocalRandom 代替 Random
  - [[#2540](https://github.com/apache/incubator-seata/pull/2540)] 重构 RPC 处理方法名和接口
  - [[#2642](https://github.com/apache/incubator-seata/pull/2642)] 优化 SofaRegistryServiceImpl 线程不安全的 double check
  - [[#2561](https://github.com/apache/incubator-seata/pull/2561)] 获取 tableMeta 逻辑统一
  - [[#2591](https://github.com/apache/incubator-seata/pull/2591)] 支持 zookeeper sessionTimeout和 connectTimeout 默认值
  - [[#2601](https://github.com/apache/incubator-seata/pull/2601)] 优化 spring-boot-starter 包结构
  - [[#2415](https://github.com/apache/incubator-seata/pull/2415)] 按照分支事务类型决定数据库操作行为
  - [[#2647](https://github.com/apache/incubator-seata/pull/2647)] 移除无用的变量
  - [[#2649](https://github.com/apache/incubator-seata/pull/2649)] 优化获取 tableMeta 的逻辑
  - [[#2652](https://github.com/apache/incubator-seata/pull/2652)] 支持 consul 自定义服务端口
  - [[#2660](https://github.com/apache/incubator-seata/pull/2660)] 优化 IdWorker 包路径
  - [[#2625](https://github.com/apache/incubator-seata/pull/2625)] Mockito.verify 代替 Mockito.doAnswer
  - [[#2666](https://github.com/apache/incubator-seata/pull/2666)] 补充使用用户 logo
  - [[#2680](https://github.com/apache/incubator-seata/pull/2680)] 优化 GlobalTransactionalInterceptor 为单例
  - [[#2683](https://github.com/apache/incubator-seata/pull/2683)] 优化 TccActionInterceptor 的日志打印
  - [[#2477](https://github.com/apache/incubator-seata/pull/2477)] 重构 RPC 客户端请求处理
  - [[#2280](https://github.com/apache/incubator-seata/pull/2280)] 重构 InsertExecutor
  - [[#2044](https://github.com/apache/incubator-seata/pull/2044)] 优化 ColumnUtils.addEscape
  - [[#2730](https://github.com/apache/incubator-seata/pull/2730)] 优化 配置中心类型校验
  - [[#2723](https://github.com/apache/incubator-seata/pull/2723)] 优化 postgreSql 获取 tableMeta 的处理逻辑
  - [[#2734](https://github.com/apache/incubator-seata/pull/2734)] 优化 postgreSql 依赖的 scope
  - [[#2749](https://github.com/apache/incubator-seata/pull/2749)] 优化 logger class 错误问题
  - [[#2751](https://github.com/apache/incubator-seata/pull/2751)] 拷贝 jdbc driver 到 docker 镜像
  - [[#2759](https://github.com/apache/incubator-seata/pull/2759)] 优化线程池线程命名风格
  - [[#2607](https://github.com/apache/incubator-seata/pull/2607)] insert 操作检查 pk 表达式支持
  - [[#2765](https://github.com/apache/incubator-seata/pull/2765)] 优化 XA 对不支持的 resource 的逻辑处理
  - [[#2771](https://github.com/apache/incubator-seata/pull/2771)] 禁用不稳定的单元测试
  - [[#2779](https://github.com/apache/incubator-seata/pull/2779)] 方法变量 ConcurrentHashMap 替换为 HashMap 
  - [[#2486](https://github.com/apache/incubator-seata/pull/2486)] 重构 RPC server 端的处理逻辑 
  - [[#2770](https://github.com/apache/incubator-seata/pull/2770)] TCC confirm 和 cancel 支持 void 返回值
  - [[#2788](https://github.com/apache/incubator-seata/pull/2788)] 优化 server 日志格式和样式
  - [[#2816](https://github.com/apache/incubator-seata/pull/2816)] 优化实例的创建逻辑
  - [[#2787](https://github.com/apache/incubator-seata/pull/2787)] 优化雪花算法中的 workId
  - [[#2776](https://github.com/apache/incubator-seata/pull/2776)] 优化字符串拼接
  - [[#2799](https://github.com/apache/incubator-seata/pull/2799)] 优化操作符
  - [[#2829](https://github.com/apache/incubator-seata/pull/2829)] 升降级检查去除加锁和异步化
  - [[#2842](https://github.com/apache/incubator-seata/pull/2842)] 优化 sql 格式
  - [[#2242](https://github.com/apache/incubator-seata/pull/2242)] 优化 PreparedStatementProxy 初始化逻辑
  - [[#2613](https://github.com/apache/incubator-seata/pull/2613)] 优化 DTO 和 typo


  非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。  

  - [slievrly](https://github.com/slievrly) 
  - [funky-eyes](https://github.com/funky-eyes) 
  - [wangliang181230](https://github.com/wangliang181230) 
  - [jsbxyyx](https://github.com/jsbxyyx) 
  - [l81893521](https://github.com/l81893521) 
  - [objcoding](https://github.com/objcoding) 
  - [long187](https://github.com/long187) 
  - [CharmingRabbit](https://github.com/CharmingRabbit) 
  - [diguage](https://github.com/diguage) 
  - [helloworlde](https://github.com/helloworlde) 
  - [chenxi-null](https://github.com/chenxi-null) 
  - [ph3636](https://github.com/ph3636) 
  - [xianlaioy](https://github.com/xianlaioy) 
  - [qq925716471](https://github.com/qq925716471) 
  - [horoc](https://github.com/horoc) 
  - [XavierChengZW](https://github.com/XavierChengZW) 
  - [anic](https://github.com/anic) 
  - [fxtahe](https://github.com/fxtahe) 
  - [wangwengeek](https://github.com/wangwengeek) 
  - [yangfuhai](https://github.com/yangfuhai) 
  - [PeineLiang](https://github.com/PeineLiang) 
  - [f654c32](https://github.com/f654c32) 
  - [dagmom](https://github.com/dagmom) 
  - [caohdgege](https://github.com/caohdgege) 
  - [zjinlei](https://github.com/zjinlei) 
  - [yyjgit66](https://github.com/yyjgit66) 
  - [lj2018110133](https://github.com/lj2018110133) 
  - [wxbty](https://github.com/wxbty) 
  - [hsoftxl](https://github.com/hsoftxl) 
  - [q294881866](https://github.com/q294881866) 
  - [81519434](https://github.com/81519434) 

  同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。

   #### Link

   - **Seata:** https://github.com/apache/incubator-seata  
   - **Seata-Samples:** https://github.com/apache/incubator-seata-samples   
   - **Release:** https://github.com/apache/incubator-seata/releases
   - **WebSite:** https://seata.io

</details>

