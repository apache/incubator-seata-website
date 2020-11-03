---
title: 下载中心
keywords: Seata, Downloads, Version
description: 本文将向你介绍如何点击了解各版本详情和升级注意事项。
---


# 下载中心

## Seata

> GitHub: https://github.com/seata/seata 
> 发布说明: https://github.com/seata/seata/releases

### 1.4.0 (2020-10-30)

 [source](https://github.com/seata/seata/archive/v1.4.0.zip) |
 [binary](https://github.com/seata/seata/releases/download/v1.4.0/seata-server-1.4.0.zip) 

<details>
  <summary><mark>Release notes</mark></summary>


  ### Seata 1.4.0

  Seata 1.4.0 发布。
  
  Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。
  
  此版本更新如下：

  ### feature：
  
   - [[#2380](https://github.com/seata/seata/pull/2380)] 支持yml配置文件
   - [[#3191](https://github.com/seata/seata/pull/3191)] 支持oracle nclob类型
   - [[#2676](https://github.com/seata/seata/pull/2676)] 支持客户端最少的活动负载均衡
   - [[#2080](https://github.com/seata/seata/pull/2080)] 支持客户端一致性哈希的负载均衡
   - [[#3198](https://github.com/seata/seata/pull/3198)] 支持Spring Boot 使用自定义配置中心和注册中心
   - [[#2806](https://github.com/seata/seata/pull/2806)] 支持配置默认全局事务超时时间
   - [[#2941](https://github.com/seata/seata/pull/2941)] 支持apollo密钥key配置
   - [[#2950](https://github.com/seata/seata/pull/2950)] 支持redis存储模式可重入锁
   - [[#2913](https://github.com/seata/seata/pull/2913)] 支持配置AT或XA事务模式的数据源代理
   - [[#2856](https://github.com/seata/seata/pull/2856)] 支持undo_log 使用 fst 序列化
   - [[#3076](https://github.com/seata/seata/pull/3076)] 支持 GlobalLock 锁重试
   - [[#2825](https://github.com/seata/seata/pull/2825)] 支持客户端发送鉴权信息
   - [[#2962](https://github.com/seata/seata/pull/2962)] 支持在 @GlobalTransactional和@GlobalLock 注解上锁的重试配置
  
  
  ### bugfix：
  
   - [[#3214](https://github.com/seata/seata/pull/3214)] 修复在某些情况下'RootContext.DEFAULT_BRANCH_TYPE' 的取值错误的问题
    - [[#3129](https://github.com/seata/seata/pull/3129)] 修复禁止执行更新主键值的SQL
    - [[#3205](https://github.com/seata/seata/pull/3205)] 修复在配置中获取boolean类型配置异常
    - [[#3170](https://github.com/seata/seata/pull/3170)] 修复Disposable 同优先级的无法执行的问题
    - [[#3180](https://github.com/seata/seata/pull/3180)] 修复fst序列化包名错误
    - [[#3178](https://github.com/seata/seata/pull/3178)] 修复sqlparser 换行替换为空格问题
    - [[#2929](https://github.com/seata/seata/pull/2929)] 修复将应用配置为在启动时降级但在运行中无法升级问题
    - [[#3050](https://github.com/seata/seata/pull/3050)] 修复update和delete不支持order，limit语法问题
    - [[#2935](https://github.com/seata/seata/pull/2935)] 修复了Saga Designer在切换节点时属性框不会切换的问题
    - [[#3140](https://github.com/seata/seata/pull/3140)] 修复`Propagation.REQUIRES_NEW`无效的问题
    - [[#3130](https://github.com/seata/seata/pull/3130)] 修复数据源多重代理和使用非代理类方法的问题
    - [[#3148](https://github.com/seata/seata/pull/3148)] 修复 Redis 存储模式下lock和session存储时key冲突问题
    - [[#3136](https://github.com/seata/seata/pull/3136)] 修复Redis pipeline执行报错问题
    - [[#2551](https://github.com/seata/seata/pull/2551)] 修复当使用AT数据源代理时Saga事务模式无法使用的问题
    - [[#3073](https://github.com/seata/seata/pull/3073)] 修复在没有xid的情况下使用XA模式的问题
    - [[#3074](https://github.com/seata/seata/pull/3074)] 修复若XA模式找不到 xid 重试问题
    - [[#3097](https://github.com/seata/seata/pull/3097)] 修复HttpAutoConfiguration只在springboot web项目中启动
    - [[#3071](https://github.com/seata/seata/pull/3071)] 修复XA 模式中无法获取真实连接的问题
    - [[#3056](https://github.com/seata/seata/pull/3056)] 修复了删除分支后仍然存在分支锁的错误
    - [[#3025](https://github.com/seata/seata/pull/3025)] 修复错误的包装路径问题
    - [[#3031](https://github.com/seata/seata/pull/3031)] 修复 redis 存储模式锁删除锁不完整问题
    - [[#2973](https://github.com/seata/seata/pull/2973)] 修复oracle数据库 where in 超过1000的问题
    - [[#2986](https://github.com/seata/seata/pull/2986)] 修复 checkstyle插件无法排除单个文件的问题
    - [[#2910](https://github.com/seata/seata/pull/2910)] 修复错误的注释 
    - [[#2914](https://github.com/seata/seata/pull/2914)] 修复TCC模式下，调用方未清除branchType的问题
    - [[#2926](https://github.com/seata/seata/pull/2926)] 修复 fastjson 序列化不记录类名的问题
    - [[#2897](https://github.com/seata/seata/pull/2897)] 修复Jedis删除锁失败的问题 
    - [[#2918](https://github.com/seata/seata/pull/2918)] 修复 AT 模式下回滚时的未加锁的问题
    - [[#2972](https://github.com/seata/seata/pull/2972)] 修复UUIDGenerator高并发下生成重复的id问题
    - [[#2932](https://github.com/seata/seata/pull/2932)] 修复nacos-config.py 不支持namespace 问题
    - [[#2900](https://github.com/seata/seata/pull/2900)] 修复数据库转义符问题
    - [[#2904](https://github.com/seata/seata/pull/2904)] 修复getConfig配置不存在获取到null的问题
    - [[#2890](https://github.com/seata/seata/pull/2890)] 修复statelang示例中的拼写错误
    - [[#3040](https://github.com/seata/seata/pull/3040)] 修复 autocommit=false时的重复提交问题
    - [[#3230](https://github.com/seata/seata/pull/3230)] 修复使用@EnableAutoDataSourceProxy启动失败问题
    - [[#2979](https://github.com/seata/seata/pull/2979)] 修复与sharedjdbc集成postgresql 无法获取元数据问题
    - [[#3233](https://github.com/seata/seata/pull/3233)] 修复Collections空指针异常
    - [[#3242](https://github.com/seata/seata/pull/3242)] 修复批处理SQL获取TableMeta错误问题
  
  
   ### optimize:
  
   - [[#3201](https://github.com/seata/seata/pull/3201)] 修复异常时报错堆栈显示不全的问题
   - [[#3062](https://github.com/seata/seata/pull/3062)] 重构Redis存储模式下session的存储结构 
   - [[#3117](https://github.com/seata/seata/pull/3117)] 优化日志输出以及清除无用代码
   - [[#3134](https://github.com/seata/seata/pull/3134)] 优化Map 和 List 相关写法
   - [[#3195](https://github.com/seata/seata/pull/3195)] 优化 XID 相关的代码写法
   - [[#3200](https://github.com/seata/seata/pull/3200)] 优化 rpc 日志提示
   - [[#3186](https://github.com/seata/seata/pull/3186)] 移除 StringUtils 的重复代码
   - [[#3162](https://github.com/seata/seata/pull/3162)] 删除重复的代码
   - [[#2969](https://github.com/seata/seata/pull/2969)] 升级druid的依赖到1.1.23
   - [[#3141](https://github.com/seata/seata/pull/3141)] 升级Nacos和FastJSON的依赖版本
   - [[#3118](https://github.com/seata/seata/pull/3118)] 添加`additional-spring-configuration-metadata.json` 配置提示信息
   - [[#2597](https://github.com/seata/seata/pull/2597)]  优化web拦截器中的xid状态避免重复处理
   - [[#3102](https://github.com/seata/seata/pull/3102)] 优化ContextCore 接口可设置非 String 类型的值
   - [[#3016](https://github.com/seata/seata/pull/3016)] 重构 Redis 存储模式下 的lock的存储结构 
   - [[#3046](https://github.com/seata/seata/pull/3046)] 删除SerializerFactory类
   - [[#3053](https://github.com/seata/seata/pull/3053)] 支持 TC端jedis连接池最大数量配置
   - [[#3012](https://github.com/seata/seata/pull/3012)] 移除重复设置端口的代码
   - [[#2978](https://github.com/seata/seata/pull/2978)] 优化AT和TCC 事务模式混用时，AT模式可异步提交
   - [[#2967](https://github.com/seata/seata/pull/2967)] 优化代码为lambda风格
   - [[#2968](https://github.com/seata/seata/pull/2968)] 优化在RM客户端初始化后发送注册消息
   - [[#2945](https://github.com/seata/seata/pull/2945)] 优化DB存储模式异步提交，减少更新操作
   - [[#2952](https://github.com/seata/seata/pull/2952)] 支持 additional-spring-configuration-metadata.json配置提示信息
   - [[#2920](https://github.com/seata/seata/pull/2920)] 修正 README.md 中的单词和语法错误
   - [[#3222](https://github.com/seata/seata/pull/3222)] 优化fileListener的CPU利用率
   - [[#2843](https://github.com/seata/seata/pull/2843)] 移除 redis和db 存储模式的中移除接口Reloadable 和 重构 reload`方法 
   - [[#3209](https://github.com/seata/seata/pull/3209)] 新增使用用户 logo 信息


  非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。 

  - [slievrly](https://github.com/slievrly) 
  - [wangliang181230](https://github.com/wangliang181230) 
  - [a364176773](https://github.com/a364176773) 
  - [jsbxyyx](https://github.com/jsbxyyx)
  - [l81893521](https://github.com/l81893521)
  - [lightClouds917](https://github.com/lightClouds917)
  - [caohdgege](https://github.com/caohdgege)
  - [yujianfei1986](https://github.com/yujianfei1986)
  - [ph3636](https://github.com/ph3636)
  - [PeineLiang](https://github.com/PeineLiang)
  - [heyaping388](https://github.com/heyaping388)
  - [guang384](https://github.com/guang384)
  - [zdrjson](https://github.com/zdrjson)
  - [ITAlexSun](https://github.com/ITAlexSun)
  - [dongzl](https://github.com/dongzl)
  - [81519434](https://github.com/81519434)
  - [wangwei-yin](https://github.com/wangwei-yin)
  - [jujinghao](https://github.com/jujinghao)
  - [JRial95](https://github.com/JRial95)
  - [mxszs1](https://github.com/mxszs1)
  - [RayneHwang](https://github.com/RayneHwang)
  - [everyhook1](https://github.com/everyhook1)
  - [li469791221](https://github.com/li469791221)
  - [luorenjin](https://github.com/luorenjin)
  - [yangxb2010000](https://github.com/yangxb2010000)
  - [selfishlover](https://github.com/selfishlover)
  - [yyjgit66](https://github.com/yyjgit66)

  同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。

   #### Link

   - **Seata:** https://github.com/seata/seata  
   - **Seata-Samples:** https://github.com/seata/seata-samples   
   - **Release:** https://github.com/seata/seata/releases
   - **WebSite:** https://seata.io

</details>

### 1.3.0 (2020-07-14)

 [source](https://github.com/seata/seata/archive/v1.3.0.zip) |
 [binary](https://github.com/seata/seata/releases/download/v1.3.0/seata-server-1.3.0.zip) 

<details>
  <summary><mark>Release notes</mark></summary>


  ### Seata 1.3.0

 Seata 1.3.0 发布。
 
 Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。
 
 此版本更新如下：

  ### feature：

  - [[#2398](https://github.com/seata/seata/pull/2398)] 支持 MySQL 多主键
  - [[#2484](https://github.com/seata/seata/pull/2484)] 支持 Redis 存储模式
  - [[#2817](https://github.com/seata/seata/pull/2817)] Saga 流程设计器 Groovy Script Task
  - [[#2646](https://github.com/seata/seata/pull/2646)] Server 支持 HikariCP 数据源
  - [[#2253](https://github.com/seata/seata/pull/2253)] 支持根据连续错误数动态升降级
  - [[#2565](https://github.com/seata/seata/pull/2565)] 支持事务注解类标注
  - [[#2510](https://github.com/seata/seata/pull/2510)] 协议新增 LZ4 压缩支持
  - [[#2622](https://github.com/seata/seata/pull/2622)] Server 支持版本检查
  - [[#2658](https://github.com/seata/seata/pull/2658)] 支持 Oracle 同一实例下不同用户的事务
  - [[#2620](https://github.com/seata/seata/pull/2620)] 支持使用 Nacos 注册中心配置 group 属性
  - [[#2699](https://github.com/seata/seata/pull/2699)] 支持 ACM 配置中心
  - [[#2509](https://github.com/seata/seata/pull/2509)] 支持 update 操作回滚所有数据列和更新列
  - [[#2584](https://github.com/seata/seata/pull/2584)] StateHandlerInterceptor 和 StateRouterInterceptor 支持 SPI 
  - [[#2808](https://github.com/seata/seata/pull/2808)] Server 鉴权支持 SPI
  - [[#2616](https://github.com/seata/seata/pull/2616)] TCC 模式支持 Dubbo 和 Sofa-RPC 注解调用
  - [[#2831](https://github.com/seata/seata/pull/2831)] Saga 模式支持 jackson parser
  - [[#2554](https://github.com/seata/seata/pull/2554)] 增加 zookeeper 序列化支持
  - [[#2708](https://github.com/seata/seata/pull/2708)] 支持 array, datalink 等 JDBC 类型
  - [[#2412](https://github.com/seata/seata/pull/2412)] xid 生成支持雪花算法
  - [[#2611](https://github.com/seata/seata/pull/2611)] 支持配置缓存，去除配置中心强依赖

  ### bugfix：

  - [[#2893](https://github.com/seata/seata/pull/2893)] 修复 postgresql 表名中含 schema 取 tableMeta 错误的问题
  - [[#2887](https://github.com/seata/seata/pull/2887)] 修复 RM 接收 response 的逻辑
  - [[#2610](https://github.com/seata/seata/pull/2610)] Nacos 配置同步脚本加入Nacos权限属性控制
  - [[#2588](https://github.com/seata/seata/pull/2588)] 修复check style不通过时，无详细信息报出的问题
  - [[#2543](https://github.com/seata/seata/pull/2543)] 修复 ShutdownHook signal 无效问题
  - [[#2598](https://github.com/seata/seata/pull/2598)] 修复无法注册到 Nacos 的问题
  - [[#2618](https://github.com/seata/seata/pull/2618)] 修复 zookeeper 无法创建目录的问题
  - [[#2628](https://github.com/seata/seata/pull/2628)] 修复 delete 操作时表名加别名找不到表名问题
  - [[#2639](https://github.com/seata/seata/pull/2639)] 修复 Apollo 配置中心由于属性大小写导致的无法加载问题
  - [[#2629](https://github.com/seata/seata/pull/2629)] 修复 PostgreSQL 相同实例不同 currentSchema 导致的 resourceId 重复问题
  - [[#2659](https://github.com/seata/seata/pull/2659)] 修复 MySQL 使用 last_insert_id 获取到 undo_log id 问题
  - [[#2670](https://github.com/seata/seata/pull/2670)] 修复 Server dataSource 初始化多次的问题
  - [[#2617](https://github.com/seata/seata/pull/2617)] 修复类和方法上注解获取不正确的问题
  - [[#2603](https://github.com/seata/seata/pull/2603)] 修复无法获取 generated keys value 的问题
  - [[#2725](https://github.com/seata/seata/pull/2725)] 修复 insert 操作时主键前含有其他表达式导致的索引位置不正确的问题
  - [[#2698](https://github.com/seata/seata/pull/2698)] 修复嵌套 GlobalLock 被提前解绑的问题
  - [[#2755](https://github.com/seata/seata/pull/2755)] 修复 TCC 模式 branchCommit 和 branchRollback 抛出异常无返回值的问题
  - [[#2777](https://github.com/seata/seata/pull/2777)] 修复 rollback 重试次数设置为 0 无法回滚的问题
  - [[#2812](https://github.com/seata/seata/pull/2812)] 修复使用 shardingSphere & Seata 获取 PostgreSQL tableMeta错误的问题
  - [[#2760](https://github.com/seata/seata/pull/2760)] 修复回滚失败 failureHandler 无法抛出失败异常的问题
  - [[#2837](https://github.com/seata/seata/pull/2837)] 修复 SubStateMachineHandler 中错误的常量引用
  - [[#2839](https://github.com/seata/seata/pull/2839)] 修复 Saga 模式补偿成功业务异常丢失的问题
  - [[#2650](https://github.com/seata/seata/pull/2650)] 修复 TCC 和 Saga 模式在 AbstractConnectionProxy解析SQL的问题
  - [[#2850](https://github.com/seata/seata/pull/2850)] 修复 Saga 流程设计器导致浏览器崩溃的问题
  - [[#2868](https://github.com/seata/seata/pull/2868)] 修复找不到 AsyncEventBus 依赖的问题
  - [[#2871](https://github.com/seata/seata/pull/2871)] 修复获取 'schame'.'table' 类型 tableMeta 错误的问题
  - [[#2685](https://github.com/seata/seata/pull/2685)] 修复 Oracle insert 操作使用 sysdate 报错的问题.
  - [[#2872](https://github.com/seata/seata/pull/2872)] 修复 undo sql 中主键缺失转义符的问题
  - [[#2875](https://github.com/seata/seata/pull/2875)] 修复 ColumnUtils delEscape删除表名带 schema 转义符错误的问题.


  ### optimize： 

  - [[#2573](https://github.com/seata/seata/pull/2573)] 在随机负载均衡中使用 ThreadLocalRandom 代替 Random
  - [[#2540](https://github.com/seata/seata/pull/2540)] 重构 RPC 处理方法名和接口
  - [[#2642](https://github.com/seata/seata/pull/2642)] 优化 SofaRegistryServiceImpl 线程不安全的 double check
  - [[#2561](https://github.com/seata/seata/pull/2561)] 获取 tableMeta 逻辑统一
  - [[#2591](https://github.com/seata/seata/pull/2591)] 支持 zookeeper sessionTimeout和 connectTimeout 默认值
  - [[#2601](https://github.com/seata/seata/pull/2601)] 优化 spring-boot-starter 包结构
  - [[#2415](https://github.com/seata/seata/pull/2415)] 按照分支事务类型决定数据库操作行为
  - [[#2647](https://github.com/seata/seata/pull/2647)] 移除无用的变量
  - [[#2649](https://github.com/seata/seata/pull/2649)] 优化获取 tableMeta 的逻辑
  - [[#2652](https://github.com/seata/seata/pull/2652)] 支持 consul 自定义服务端口
  - [[#2660](https://github.com/seata/seata/pull/2660)] 优化 IdWorker 包路径
  - [[#2625](https://github.com/seata/seata/pull/2625)] Mockito.verify 代替 Mockito.doAnswer
  - [[#2666](https://github.com/seata/seata/pull/2666)] 补充使用用户 logo
  - [[#2680](https://github.com/seata/seata/pull/2680)] 优化 GlobalTransactionalInterceptor 为单例
  - [[#2683](https://github.com/seata/seata/pull/2683)] 优化 TccActionInterceptor 的日志打印
  - [[#2477](https://github.com/seata/seata/pull/2477)] 重构 RPC 客户端请求处理
  - [[#2280](https://github.com/seata/seata/pull/2280)] 重构 InsertExecutor
  - [[#2044](https://github.com/seata/seata/pull/2044)] 优化 ColumnUtils.addEscape
  - [[#2730](https://github.com/seata/seata/pull/2730)] 优化 配置中心类型校验
  - [[#2723](https://github.com/seata/seata/pull/2723)] 优化 postgreSql 获取 tableMeta 的处理逻辑
  - [[#2734](https://github.com/seata/seata/pull/2734)] 优化 postgreSql 依赖的 scope
  - [[#2749](https://github.com/seata/seata/pull/2749)] 优化 logger class 错误问题
  - [[#2751](https://github.com/seata/seata/pull/2751)] 拷贝 jdbc driver 到 docker 镜像
  - [[#2759](https://github.com/seata/seata/pull/2759)] 优化线程池线程命名风格
  - [[#2607](https://github.com/seata/seata/pull/2607)] insert 操作检查 pk 表达式支持
  - [[#2765](https://github.com/seata/seata/pull/2765)] 优化 XA 对不支持的 resource 的逻辑处理
  - [[#2771](https://github.com/seata/seata/pull/2771)] 禁用不稳定的单元测试
  - [[#2779](https://github.com/seata/seata/pull/2779)] 方法变量 ConcurrentHashMap 替换为 HashMap 
  - [[#2486](https://github.com/seata/seata/pull/2486)] 重构 RPC server 端的处理逻辑 
  - [[#2770](https://github.com/seata/seata/pull/2770)] TCC confirm 和 cancel 支持 void 返回值
  - [[#2788](https://github.com/seata/seata/pull/2788)] 优化 server 日志格式和样式
  - [[#2816](https://github.com/seata/seata/pull/2816)] 优化实例的创建逻辑
  - [[#2787](https://github.com/seata/seata/pull/2787)] 优化雪花算法中的 workId
  - [[#2776](https://github.com/seata/seata/pull/2776)] 优化字符串拼接
  - [[#2799](https://github.com/seata/seata/pull/2799)] 优化操作符
  - [[#2829](https://github.com/seata/seata/pull/2829)] 升降级检查去除加锁和异步化
  - [[#2842](https://github.com/seata/seata/pull/2842)] 优化 sql 格式
  - [[#2242](https://github.com/seata/seata/pull/2242)] 优化 PreparedStatementProxy 初始化逻辑
  - [[#2613](https://github.com/seata/seata/pull/2613)] 优化 DTO 和 typo


  非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。  

  - [slievrly](https://github.com/slievrly) 
  - [a364176773](https://github.com/a364176773) 
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

   - **Seata:** https://github.com/seata/seata  
   - **Seata-Samples:** https://github.com/seata/seata-samples   
   - **Release:** https://github.com/seata/seata/releases
   - **WebSite:** https://seata.io

</details>


### 1.2.0 (2020-04-20)

 [source](https://github.com/seata/seata/archive/v1.2.0.zip) |
 [binary](https://github.com/seata/seata/releases/download/v1.2.0/seata-server-1.2.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 1.2.0

  Seata 1.2.0 发布。

  Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

  此版本更新如下：

  ### feature：
  - [[#2381](https://github.com/seata/seata/pull/2381)] 支持 XA 事务模式
  - [[#2206](https://github.com/seata/seata/pull/2206)] 支持 REQUIRED、REQUIRES_NEW、SUPPORTS 和 NOT_SUPPORTED 事务传播模式
  - [[#2112](https://github.com/seata/seata/pull/2112)] 支持 SQL 的批量更新和批量删除
  - [[#2275](https://github.com/seata/seata/pull/2275)] TCC 模式支持 HSF 调用
  - [[#2108](https://github.com/seata/seata/pull/2108)] 支持 zip、bzip2、7z 压缩
  - [[#2328](https://github.com/seata/seata/pull/2328)] server 支持 mysql5.x 和 mysql8.x 类隔离加载        
  - [[#2367](https://github.com/seata/seata/pull/2367)] 支持 Nacos 1.2 权限配置
  - [[#2359](https://github.com/seata/seata/pull/2359)] 支持 NEVER、MANDATORY 事务传播模式 和 事务挂起恢复 API
  - [[#2418](https://github.com/seata/seata/pull/2418)] 支持 fst 序列化
  - [[#2135](https://github.com/seata/seata/pull/2135)] 支持 SPI 定义 scope
  - [[#2370](https://github.com/seata/seata/pull/2370)] 支持 failureHandler 从 Spring 容器注入
  - [[#2481](https://github.com/seata/seata/pull/2481)] 支持数据库连接池的 max-wait 配置
  - [[#2379](https://github.com/seata/seata/pull/2379)] 支持使用 Nacos 注册服务时自定义服务名
  - [[#2308](https://github.com/seata/seata/pull/2308)] 增加 Saga 模式是否注册分支的开关
  - [[#2301](https://github.com/seata/seata/pull/2301)] 支持 postgresql 的 default 和 nextval 语法支持


  ### bugfix：
  - [[#2575](https://github.com/seata/seata/pull/2575)] 修复 executeBatch 无法获取 targetSql 问题
  - [[#2283](https://github.com/seata/seata/pull/2283)] 修复 oracle 获取 tableMeta 失败问题
  - [[#2312](https://github.com/seata/seata/pull/2312)] 修复 SeataDataSourceBeanPostProcessor 启动判断条件
  - [[#2309](https://github.com/seata/seata/pull/2309)] 修复数据库 timestamp 类型反序列化丢失 nano 精度问题
  - [[#2292](https://github.com/seata/seata/pull/2292)] 修复一些未转驼峰风格的配置项
  - [[#2306](https://github.com/seata/seata/pull/2306)] 修复 maven-enforcer-plugin 打包版本的限制
  - [[#2287](https://github.com/seata/seata/pull/2287)] 修复全局锁重试时 connection context 未移除问题
  - [[#2361](https://github.com/seata/seata/pull/2361)] 修复错误的配置项名称
  - [[#2333](https://github.com/seata/seata/pull/2333)] 修复由于脏写导致回滚失败错误的日志输出
  - [[#2390](https://github.com/seata/seata/pull/2390)] 修复同步脚本中配置项对于含有空格的处理
  - [[#2408](https://github.com/seata/seata/pull/2408)] 修复 postgresql undo_log 建表脚本缺少 sequence
  - [[#2391](https://github.com/seata/seata/pull/2391)] 修复获取配置异常导致的 CPU 飙升问题
  - [[#2427](https://github.com/seata/seata/pull/2427)] 修复 debug时 调用StringUtils.toString(o) 栈溢出问题
  - [[#2384](https://github.com/seata/seata/pull/2384)] 修复 Saga模式 StateMachineRepository#getStateMachineById 方法会覆盖内存中缓存的最新版本的状态机定义问题
  - [[#2323](https://github.com/seata/seata/pull/2323)] 修复数据源自动代理问题
  - [[#2466](https://github.com/seata/seata/pull/2466)] 修复文件存储模式多线程变量可见性问题
  - [[#2349](https://github.com/seata/seata/pull/2349)] 修复批量 insert 不同主键类型检查
  - [[#2479](https://github.com/seata/seata/pull/2479)] 修复postgresql schema 非小写问题
  - [[#2449](https://github.com/seata/seata/pull/2449)] 修复 server 启动时无法获取表结构问题
  - [[#2505](https://github.com/seata/seata/pull/2505)] 修复 session store 路径判断条件
  - [[#2456](https://github.com/seata/seata/pull/2456)] 修复 server 极端异常情况下编码错误问题
  - [[#2495](https://github.com/seata/seata/pull/2495)] 修复 NPE 和减少lockKey 为 null 时的分支注册请求
  - [[#2490](https://github.com/seata/seata/pull/2490)] 修复 RpcContext.addResource 参数为 null 的处理判断
  - [[#2419](https://github.com/seata/seata/pull/2419)] 修复 http 部分的集成测试失败问题
  - [[#2535](https://github.com/seata/seata/pull/2535)] 修复 config.txt 中错误的配置名称
  - [[#2524](https://github.com/seata/seata/pull/2524)] 修复客户端注册服务名配置冗余导致的配置不一致问题
  - [[#2473](https://github.com/seata/seata/pull/2473)] 修复文件存储模式刷盘条件的判断逻辑
  - [[#2455](https://github.com/seata/seata/pull/2455)] 修复子模块下无法执行copyright 和 checkstyle maven 插件问题


  ### optimize： 
  - [[#2409](https://github.com/seata/seata/pull/2409)] 当 undolog 和 lockKey 为空时减少不必要的db 和 server 交互
  - [[#2329](https://github.com/seata/seata/pull/2329)] 按照不同的存储模式重构抽象相关逻辑
  - [[#2354](https://github.com/seata/seata/pull/2354)] 优化 spring cloud config 不支持 listener 的逻辑
  - [[#2320](https://github.com/seata/seata/pull/2320)] 优化 protostuff 和 kryo 序列化 timestamp 类型的逻辑，提升序列化性能
  - [[#2307](https://github.com/seata/seata/pull/2307)] 优化事务模式切换时的事务上下文逻辑
  - [[#2364](https://github.com/seata/seata/pull/2364)] 优化启动时不必要的类初始化加载
  - [[#2368](https://github.com/seata/seata/pull/2368)] 增加zk 作为注册中心和配置中心缺少的配置属性
  - [[#2351](https://github.com/seata/seata/pull/2351)] 增加获取本地全局事务状态的接口
  - [[#2529](https://github.com/seata/seata/pull/2529)] 优化 druid 连接池参数
  - [[#2288](https://github.com/seata/seata/pull/2288)] 忽略 mock 测试部分的单元测试覆盖度
  - [[#2297](https://github.com/seata/seata/pull/2297)] 移除重复 pom 依赖
  - [[#2336](https://github.com/seata/seata/pull/2336)] 添加使用用户的 logo
  - [[#2348](https://github.com/seata/seata/pull/2348)] 去除重复的配置项
  - [[#2362](https://github.com/seata/seata/pull/2362)] 优化按频率打印堆栈 stackTraceLogger 的方法
  - [[#2382](https://github.com/seata/seata/pull/2382)] 优化 RegistryFactory 为单例模式 和 RegistryType 的判断逻辑
  - [[#2400](https://github.com/seata/seata/pull/2400)] 优化 UUIDGenerator 的魔数逻辑
  - [[#2397](https://github.com/seata/seata/pull/2397)] 修复 typo
  - [[#2407](https://github.com/seata/seata/pull/2407)] 修复可能导致 NPE 的逻辑
  - [[#2402](https://github.com/seata/seata/pull/2402)] 优化 RM 和 TM 的注册日志
  - [[#2422](https://github.com/seata/seata/pull/2422)] 增加文档的 script 链接
  - [[#2440](https://github.com/seata/seata/pull/2440)] 优化联系我们和启动日志
  - [[#2445](https://github.com/seata/seata/pull/2445)] 优化 kryo 和 fst 的注册方法
  - [[#2372](https://github.com/seata/seata/pull/2372)] 将 lock store sql 重构为 SPI 实现
  - [[#2453](https://github.com/seata/seata/pull/2453)] 优化不必要的 server 配置项
  - [[#2369](https://github.com/seata/seata/pull/2369)] 将 log store sql 重构为 SPI 实现
  - [[#2526](https://github.com/seata/seata/pull/2526)] 优化 seata-spring-boot-starter 的启动日志
  - [[#2530](https://github.com/seata/seata/pull/2530)] 移除 netty 的 connPool
  - [[#2489](https://github.com/seata/seata/pull/2489)] 优化 exceptionHandler 的方法签名
  - [[#2494](https://github.com/seata/seata/pull/2494)] 移除不必要的代码
  - [[#2523](https://github.com/seata/seata/pull/2523)] server 按照频率输出不正常事务的异常详细堆栈信息
  - [[#2549](https://github.com/seata/seata/pull/2549)] 优化 ZookeeperConfiguration 日志级别和异常信息不打印的问题 
  - [[#2558](https://github.com/seata/seata/pull/2558)] 规范统一 config 和 server 模块的日志
  - [[#2464](https://github.com/seata/seata/pull/2464)] 增强 Saga 状态流程设计器
  - [[#2553](https://github.com/seata/seata/pull/2553)] 增加使用同步脚本的一些说明

  Thanks to these contributors for their code commits. Please report an unintended omission.  
  - [slievrly](https://github.com/slievrly) 
  - [a364176773](https://github.com/a364176773) 
  - [ph3636](https://github.com/ph3636) 
  - [lightClouds917](https://github.com/lightClouds917) 
  - [l81893521](https://github.com/l81893521) 
  - [jsbxyyx](https://github.com/jsbxyyx) 
  - [objcoding](https://github.com/objcoding) 
  - [CharmingRabbit](https://github.com/CharmingRabbit) 
  - [xingfudeshi](https://github.com/xingfudeshi) 
  - [lovepoem](https://github.com/lovepoem) 
  - [SevenSecondsOfMemory](https://github.com/SevenSecondsOfMemory ) 
  - [zjinlei](https://github.com/zjinlei) 
  - [ggndnn](https://github.com/ggndnn) 
  - [tauntongo](https://github.com/tauntongo) 
  - [threefish](https://github.com/threefish) 
  - [helloworlde](https://github.com/helloworlde) 
  - [long187](https://github.com/long187) 
  - [jaspercloud](https://github.com/jaspercloud) 
  - [dk-lockdown](https://github.com/dk-lockdown) 
  - [wxbty](https://github.com/wxbty) 
  - [sharajava](https://github.com/sharajava) 
  - [ppj19891020](https://github.com/ppj19891020) 
  - [YuKongEr](https://github.com/YuKongEr) 
  - [Zh1Cheung](https://github.com/Zh1Cheung) 
  - [wangwei-ying](https://github.com/wangwei-ying) 
  - [mxszs](https://github.com/mxszs) 
  - [q294881866](https://github.com/q294881866)  
  - [HankDevelop](https://github.com/HankDevelop)  

  Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.

   #### Link
   - **Seata:** https://github.com/seata/seata  
   - **Seata-Samples:** https://github.com/seata/seata-samples   
   - **Release:** https://github.com/seata/seata/releases
   - **WebSite:** https://seata.io

</details>


### Seata 1.1.0 (2020-02-19)

 [source](https://github.com/seata/seata/archive/v1.1.0.zip) | 
 [binary](https://github.com/seata/seata/releases/download/v1.1.0/seata-server-1.1.0.zip)
<details>
    <summary><mark>Release notes</mark></summary>

Seata 1.1.0 发布。

Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

此版本更新如下：

### feature：
- [[#2200](https://github.com/seata/seata/pull/2200)] 支持 postgresql (业务侧和 TC server) 
- [[#1746](https://github.com/seata/seata/pull/1746)] 支持 httpClient 自动集成
- [[#2240](https://github.com/seata/seata/pull/2240)] 支持自定义 Saga 恢复策略超时时间
- [[#1693](https://github.com/seata/seata/pull/1693)] 支持 druid 类隔离加载，隔离中间件和业务侧的 druid 使用
- [[#2245](https://github.com/seata/seata/pull/2245)] 支持 zookeeper 鉴权
- [[#2239](https://github.com/seata/seata/pull/2239)] 支持 dubbo 2.7.4+
- [[#2203](https://github.com/seata/seata/pull/2203)] 支持 nacos 配置中心设置 group 属性
- [[#2086](https://github.com/seata/seata/pull/2086)] 支持 apollo 配置中心设置 namespace 属性
- [[#2106](https://github.com/seata/seata/pull/2106)] 支持 FastThreadLocalContextCore 存储事务上下文
- [[#1703](https://github.com/seata/seata/pull/1703)] 支持 sql parser SPI，提供 druid sql parser
- [[#2151](https://github.com/seata/seata/pull/2151)] 支持 Saga 模式跳过成功分支事务的 report


### bugfix：
- [[#2270](https://github.com/seata/seata/pull/2270)] 修复 worker size 不支持枚举配置和其他配置问题
- [[#2258](https://github.com/seata/seata/pull/2258)] 修复 channelHandler 重连时 not sharable 问题
- [[#2261](https://github.com/seata/seata/pull/2261)] 修复定时任务启动但 ApplicationContext 未刷新问题
- [[#2262](https://github.com/seata/seata/pull/2262)] 修复 nacos 初始化脚本设置 group 错误问题
- [[#2249](https://github.com/seata/seata/pull/2249)] 修复 Saga 模式注册分支失败状态机状态错误问题
- [[#2126](https://github.com/seata/seata/pull/2126)] 修复表名和列名转义符错误问题
- [[#2234](https://github.com/seata/seata/pull/2234)] 修复使用 fastjson 反序列化 bigint 错误问题
- [[#2237](https://github.com/seata/seata/pull/2237)] 修复 DefaultCoordinatorTest 在 wins 测试错误问题
- [[#2233](https://github.com/seata/seata/pull/2233)] 修复使用 fastjson 忽略 tableMeta 失效问题
- [[#2172](https://github.com/seata/seata/pull/2172)] 修复使用 SpringCloudConfig 配置中心无法读取配置问题
- [[#2217](https://github.com/seata/seata/pull/2217)] 修复 seata-spring-boot-starter 错误配置名称
- [[#2219](https://github.com/seata/seata/pull/2219)] 修复 seata-spring-boot-starter 读取disableGlobalTransaction 配置错误问题
- [[#2187](https://github.com/seata/seata/pull/2187)] 修复有相同数据依赖的不同事务分支路由到不同server时回滚顺序错误问题
- [[#2175](https://github.com/seata/seata/pull/2175)] 修复 server direct buffer OOM 问题
- [[#2210](https://github.com/seata/seata/pull/2210)] 修复二阶段 commit 和 rollback 重试超时 globalSession 无法删除问题
- [[#2179](https://github.com/seata/seata/pull/2179)] 修复 redis 注册中心 db 属性转型错误问题
- [[#2192](https://github.com/seata/seata/pull/2192)] 修复 eureka getHostName() 返回 ipAddress 问题
- [[#2198](https://github.com/seata/seata/pull/2198)] 修复 rollback 超时无法自动删除全局锁问题
- [[#2167](https://github.com/seata/seata/pull/2167)] 修复 Saga 异步执行返回相同 id 问题
- [[#2185](https://github.com/seata/seata/pull/2185)] 修复 server 启动时 kubernetes 的判断条件
- [[#2145](https://github.com/seata/seata/pull/2145)] 修复 Saga 模式重试成功上报状态错误问题
- [[#2113](https://github.com/seata/seata/pull/2113)] 修复分支 rollback 失败触发多个 TC 重试导致的并发异常


### optimize： 
- [[#2255](https://github.com/seata/seata/pull/2255)] 优化配置项的默认配置值
- [[#2230](https://github.com/seata/seata/pull/2230)] 统一配置项命名风格和保持 seata-all 和 spring boot starter相同默认值
- [[#1935](https://github.com/seata/seata/pull/1935)] 重构 client 和 server RPC
- [[#2215](https://github.com/seata/seata/pull/2215)] 优化 Saga 模式的超时处理 
- [[#2227](https://github.com/seata/seata/pull/2227)] 分离 TC In/Outbound 接口 
- [[#2033](https://github.com/seata/seata/pull/2033)] DefaultRemotingParser 逻辑优化
- [[#1688](https://github.com/seata/seata/pull/1688)] 减少客户端无用依赖
- [[#2134](https://github.com/seata/seata/pull/2134)] 按照事务模式区分 TC 逻辑重构
- [[#2224](https://github.com/seata/seata/pull/2224)] 优化 ContextCoreLoader 代码风格
- [[#2171](https://github.com/seata/seata/pull/2171)] 优化配置初始化同步脚本和添加使用说明
- [[#2208](https://github.com/seata/seata/pull/2208)] 使用 SPI LoadLevel name 代替 getDbType 接口方法
- [[#2182](https://github.com/seata/seata/pull/2182)] 优化 seata-spring-boot-starter 前缀判断逻辑
- [[#2211](https://github.com/seata/seata/pull/2211)] 优化 RootContext 代码风格
- [[#2140](https://github.com/seata/seata/pull/2140)] 优化 GzipUtil 代码风格
- [[#2209](https://github.com/seata/seata/pull/2209)] 重构 seata-discovery 模块，增加可读性
- [[#2055](https://github.com/seata/seata/pull/2055)] 使用 SPI 重构 tableMetaCache 和 undoLogManager
- [[#2184](https://github.com/seata/seata/pull/2184)] 重构 seata-config 模块，增加可读性
- [[#2095](https://github.com/seata/seata/pull/2095)] 重构数据源自动代理，区分 jdk 和 cglib 代理属性设置
- [[#2178](https://github.com/seata/seata/pull/2178)] Saga 状态机设计器添加默认 catch 节点
- [[#2103](https://github.com/seata/seata/pull/2103)] 优化 tcc 模块代码，增加可读性
- [[#2125](https://github.com/seata/seata/pull/2125)] 修改 MySQL recognizer package 路径
- [[#2176](https://github.com/seata/seata/pull/2176)] 修复 typos
- [[#2156](https://github.com/seata/seata/pull/2156)] 重构 sqlparser druid 名称为常量
- [[#2170](https://github.com/seata/seata/pull/2170)] 增加 seata common 模块的单测覆盖率
- [[#2139](https://github.com/seata/seata/pull/2139)] 优雅关闭 resources
- [[#2097](https://github.com/seata/seata/pull/2097)] 将 codec 模块重命名为 serializer 模块
- [[#2159](https://github.com/seata/seata/pull/2159)] 优化 spring 模块代码风格，增加可读性
- [[#2036](https://github.com/seata/seata/pull/2036)] 优化 Dubbo parser 逻辑
- [[#2062](https://github.com/seata/seata/pull/2062)] 优化 seata-rm-datasource 模块代码风格，增加可读性
- [[#2146](https://github.com/seata/seata/pull/2146)] 优化日志输出字符拼接
- [[#2038](https://github.com/seata/seata/pull/2038)] 优化 common 模块代码风格，增加可读性 
- [[#2120](https://github.com/seata/seata/pull/2120)] 修复 typos 
- [[#2078](https://github.com/seata/seata/pull/2078)] 增加 oracle table meta cache 单测覆盖度
- [[#2115](https://github.com/seata/seata/pull/2115)] 修复 typos
- [[#2099](https://github.com/seata/seata/pull/2099)] 优化 tm 模块代码风格，增加可读性

非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。

- [slievrly](https://github.com/slievrly) 
- [xingfudeshi](https://github.com/xingfudeshi)   
- [objcoding](https://github.com/objcoding)   
- [long187](https://github.com/long187)   
- [zjinlei](https://github.com/zjinlei)   
- [ggndnn](https://github.com/ggndnn)  
- [lzf971107](https://github.com/lzf971107)    
- [CvShrimp](https://github.com/CvShrimp)   
- [l81893521](https://github.com/l81893521)   
- [ph3636](https://github.com/ph3636)   
- [koonchen](https://github.com/koonchen)   
- [leizhiyuan](https://github.com/leizhiyuan)   
- [a364176773](https://github.com/a364176773)   
- [caioguedes](https://github.com/caioguedes)   
- [helloworlde](https://github.com/helloworlde)   
- [wxbty](https://github.com/wxbty)    
- [bao-hp](https://github.com/bao-hp)   
- [guojingyinan219](https://github.com/guojingyinan219)   
- [CharmingRabbit](https://github.com/CharmingRabbit)   
- [jaspercloud](https://github.com/jaspercloud)   
- [jsbxyyx](https://github.com/jsbxyyx)   

同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。

**常用链接**   

**Seata**: https://github.com/seata/seata   
**Seata-Samples**: https://github.com/seata/seata-samples   
**Release**: https://github.com/seata/seata/releases   
**Seata 官网**: https://seata.io/zh-cn/
</details>

 ### 1.0.0 (2019-12-21)
 [source](https://github.com/seata/seata/archive/v1.0.0.zip) | 
 [binary](https://github.com/seata/seata/releases/download/v1.0.0/seata-server-1.0.0.zip)
<details>
    <summary><mark>Release notes</mark></summary>

   ### Seata 1.0.0 GA版本重磅发布
   Seata 1.0.0 GA版本重磅发布。

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。
    
   此版本更新如下：

​      

   ### feature：
   - [[#1966](https://github.com/seata/seata/pull/1966)] 增加client端单条消息发送方式
   - [[#2004](https://github.com/seata/seata/pull/2004)] 增加配置中心配置同步脚本
   - [[#1997](https://github.com/seata/seata/pull/1997)] 提供图像生成工具便于查看Saga状态机执行路径
   - [[#1992](https://github.com/seata/seata/pull/1992)] 支持动态降级
   - [[#1898](https://github.com/seata/seata/pull/1898)] 支持动态配置
   - [[#1983](https://github.com/seata/seata/pull/1983)] 支持hessian序列化
   - [[#1960](https://github.com/seata/seata/pull/1960)] 提供基于GGEditor的可视化图形Saga状态机设计器
   - [[#1900](https://github.com/seata/seata/pull/1900)] Saga状态语言支持重试服务
   - [[#1885](https://github.com/seata/seata/pull/1885)] 增加Docker image构建配置
   - [[#1914](https://github.com/seata/seata/pull/1914)] 支持Oracle exists表达式
   - [[#1878](https://github.com/seata/seata/pull/1878)] 支持Mysql exists表达式
   - [[#1871](https://github.com/seata/seata/pull/1871)] 适配springcloud-alibaba-seata自动配置
   - [[#1844](https://github.com/seata/seata/pull/1844)] Saga状态机支持异步调用服务
   - [[#1742](https://github.com/seata/seata/pull/1742)] 增加seata-spring-boot-starter
   - [[#1460](https://github.com/seata/seata/pull/1460)] 支持gzip压缩
   - [[#1492](https://github.com/seata/seata/pull/1492)] 支持grpc事务自动传递和绑定

   ### bugfix：
   - [[#2066](https://github.com/seata/seata/pull/2066)] 修复初始化eureka client线程安全问题
   - [[#2059](https://github.com/seata/seata/pull/2059)] 修复异步回滚线程导致重复回滚问题
   - [[#2050](https://github.com/seata/seata/pull/2050)] 修复监听不存在的配置导致空指针
   - [[#2053](https://github.com/seata/seata/pull/2053)] 修复Insert的表名为关键字,无法构建前置镜像
   - [[#2054](https://github.com/seata/seata/pull/2054)] 修复状态为Rollbacking的事务无法被检测出
   - [[#2043](https://github.com/seata/seata/pull/2043)] 修复使用druid-spring-boot-starter动态代理失败
   - [[#1668](https://github.com/seata/seata/pull/1668)] 修复sql语句转义符号问题
   - [[#2029](https://github.com/seata/seata/pull/2029)] 修复seata-spring-boot-starter无效
   - [[#2037](https://github.com/seata/seata/pull/2037)] 修复mysql连接无法自动释放
   - [[#2032](https://github.com/seata/seata/pull/2032)] 修复Etcd3配置错误
   - [[#1929](https://github.com/seata/seata/pull/1929)] 修复元数据有可能出现重复缓存
   - [[#1996](https://github.com/seata/seata/pull/1996)] 修复小部分情况下无法代理数据源
   - [[#2001](https://github.com/seata/seata/pull/2001)] 移除无效jvm参数
   - [[#1984](https://github.com/seata/seata/pull/1984)] 修复预设容器环境变量问题，替换基础镜像
   - [[#1978](https://github.com/seata/seata/pull/1978)] 修复在windows下FileTransactionStoreManager单元测试无法通过
   - [[#1953](https://github.com/seata/seata/pull/1953)] 修复在小部分情况下获取表元数据失败
   - [[#1973](https://github.com/seata/seata/pull/1973)] 修复容器下无法获取server端口
   - [[#1905](https://github.com/seata/seata/pull/1905)] 解决lock_key长度问题
   - [[#1927](https://github.com/seata/seata/pull/1927)] 修复SPI有可能加载私有类
   - [[#1961](https://github.com/seata/seata/pull/1961)] 修复CI日志过长问题
   - [[#1893](https://github.com/seata/seata/pull/1893)] 修复Saga模式不会删除分支信息问题
   - [[#1932](https://github.com/seata/seata/pull/1932)] 修复构建Docker镜像时环境不匹配
   - [[#1912](https://github.com/seata/seata/pull/1912)] 修复部分异常日志打印不完整
   - [[#1917](https://github.com/seata/seata/pull/1917)] 修复CI部分测试用例出现空指针异常
   - [[#1909](https://github.com/seata/seata/pull/1909)] 修复xid类型为空导致空指针
   - [[#1902](https://github.com/seata/seata/pull/1902)] 修复回滚时如遇不支持的数据库出现空指针
   - [[#1789](https://github.com/seata/seata/pull/1789)] 修复xid header大小写问题
   - [[#1889](https://github.com/seata/seata/pull/1889)] 修复TCC下分支注册导致线程挂起
   - [[#1813](https://github.com/seata/seata/pull/1813)] 修复部分情况TCC不支持跨服务
   - [[#1825](https://github.com/seata/seata/pull/1825)] 修复并发情况下事务状态不一致
   - [[#1850](https://github.com/seata/seata/pull/1850)] 修复Server重启时sessionId未重置
   - [[#1879](https://github.com/seata/seata/pull/1879)] 修复jdbc传入空参数导致异常
   - [[#1874](https://github.com/seata/seata/pull/1874)] 修复部分情况下Channel关闭的问题
   - [[#1863](https://github.com/seata/seata/pull/1863)] 修复Other类型无法序列化
   - [[#1837](https://github.com/seata/seata/pull/1837)] 修复saga ExpressionEvaluator不支持空值
   - [[#1810](https://github.com/seata/seata/pull/1810)] 修复saga状态机无法保存并提供状态日志查询
   - [[#1834](https://github.com/seata/seata/pull/1834)] 修复StateInstance无法记录输出参数
   - [[#1856](https://github.com/seata/seata/pull/1856)] 修复protostuff undo log获取默认content
   - [[#1845](https://github.com/seata/seata/pull/1845)] 修复分支提交失败, 导致空指针异常
   - [[#1858](https://github.com/seata/seata/pull/1858)] 修复分布式事务不生效
   - [[#1846](https://github.com/seata/seata/pull/1846)] 修复并发下增加监听器异常
   - [[#1839](https://github.com/seata/seata/pull/1839)] 修复重复加锁
   - [[#1768](https://github.com/seata/seata/pull/1768)] 修复设置数据库连接参数useInformationSchema为true无法获取元数据
   - [[#1796](https://github.com/seata/seata/pull/1796)] 修复回滚时异常判断不完整
   - [[#1805](https://github.com/seata/seata/pull/1805)] 修复连接代理和prepareStatement未在全局事务管理下
   - [[#1780](https://github.com/seata/seata/pull/1780)] 修复Oracle无法执行select for update语句
   - [[#1802](https://github.com/seata/seata/pull/1802)] 部分方法修改HashMap为LinkedHashMap
   - [[#1793](https://github.com/seata/seata/pull/1793)] 修复多数据源下无法自动代理
   - [[#1788](https://github.com/seata/seata/pull/1788)] 修复Mysql无法获取主键值
   - [[#1764](https://github.com/seata/seata/pull/1764)] 修复Jdk11下远程地址为空
   - [[#1778](https://github.com/seata/seata/pull/1778)] 修复单元测试未清空测试资源
   - [[#1777](https://github.com/seata/seata/pull/1777)] 修复DeleteExecutor未根据数据库类型来构建前置镜像

   ### optimize： 
   - [[#2068](https://github.com/seata/seata/pull/2068)] 优化数据库连接获取
   - [[#2056](https://github.com/seata/seata/pull/2056)] 移除代码中非java doc注释
   - [[#1775](https://github.com/seata/seata/pull/1775)] 优化分支事务回滚日志输出频率
   - [[#2000](https://github.com/seata/seata/pull/2000)] 统一归类初始化脚本
   - [[#2007](https://github.com/seata/seata/pull/2007)] 提高common模块单元测试覆盖率
   - [[#1969](https://github.com/seata/seata/pull/1969)] 增加Docker-Compose, Kubernetes, Helm脚本
   - [[#1967](https://github.com/seata/seata/pull/1967)] 增加Docker file
   - [[#2018](https://github.com/seata/seata/pull/2018)] 优化ConfigFuture
   - [[#2020](https://github.com/seata/seata/pull/2020)] 优化saga日志输出
   - [[#1975](https://github.com/seata/seata/pull/1975)] 扁平化saga嵌套事务
   - [[#1980](https://github.com/seata/seata/pull/1980)] 分支注册时显示applicationId
   - [[#1994](https://github.com/seata/seata/pull/1994)] 修改zookeeper根路径配置名称
   - [[#1990](https://github.com/seata/seata/pull/1990)] 增加netty配置常量
   - [[#1979](https://github.com/seata/seata/pull/1979)] 优化select for update识别器
   - [[#1957](https://github.com/seata/seata/pull/1957)] 获取关键字检查对象改为SPI的方法
   - [[#1956](https://github.com/seata/seata/pull/1956)] 找不到有效服务时,提示更加友好
   - [[#1958](https://github.com/seata/seata/pull/1958)] 支持将设计器的JSON转换成状态机标准JSON
   - [[#1951](https://github.com/seata/seata/pull/1951)] 增加使用企业logo
   - [[#1950](https://github.com/seata/seata/pull/1950)] 优化异步提交时日志的缺失
   - [[#1931](https://github.com/seata/seata/pull/1931)] nacos-config.py支持namespace
   - [[#1938](https://github.com/seata/seata/pull/1938)] 优化批量插入和批量更新
   - [[#1930](https://github.com/seata/seata/pull/1930)] 减少HashMap初始化大小
   - [[#1919](https://github.com/seata/seata/pull/1919)] 强制代码风格检查
   - [[#1918](https://github.com/seata/seata/pull/1918)] 优化单元测试抛出的异常
   - [[#1911](https://github.com/seata/seata/pull/1911)] 优化部分注释
   - [[#1920](https://github.com/seata/seata/pull/1920)] 使用迭代器来移除过期Future
   - [[#1907](https://github.com/seata/seata/pull/1907)] 优化UndoExecutorFactory获取实例的方式
   - [[#1903](https://github.com/seata/seata/pull/1903)] 增加批量查询分支事务
   - [[#1910](https://github.com/seata/seata/pull/1910)] 优化部分方法缺少@override
   - [[#1906](https://github.com/seata/seata/pull/1906)] 初始化时增加非正常退出日志
   - [[#1897](https://github.com/seata/seata/pull/1897)] 移除clientTest单元测试
   - [[#1883](https://github.com/seata/seata/pull/1883)] 优化SQLRecognizer, UndoExecutor代码结构
   - [[#1890](https://github.com/seata/seata/pull/1890)] 格式化部分saga代码
   - [[#1798](https://github.com/seata/seata/pull/1798)] 提高部分方法format效率
   - [[#1884](https://github.com/seata/seata/pull/1884)] 封装关闭资源的方法
   - [[#1869](https://github.com/seata/seata/pull/1869)] 增加当成功时,可以关闭分支汇报参数
   - [[#1842](https://github.com/seata/seata/pull/1842)] 增加部分初始化脚本
   - [[#1838](https://github.com/seata/seata/pull/1838)] 简化配置
   - [[#1866](https://github.com/seata/seata/pull/1866)] 优化TC日志输出
   - [[#1867](https://github.com/seata/seata/pull/1867)] 优化seata-spring-boot-starter
   - [[#1817](https://github.com/seata/seata/pull/1817)] 增加tm单元测试
   - [[#1823](https://github.com/seata/seata/pull/1823)] 减少db的访问次数
   - [[#1835](https://github.com/seata/seata/pull/1835)] Saga事务模版增加重新加载事务方法
   - [[#1861](https://github.com/seata/seata/pull/1861)] 优化当主键不存在时日志输出
   - [[#1836](https://github.com/seata/seata/pull/1836)] 修改IsPersist属性类型为Boolean
   - [[#1824](https://github.com/seata/seata/pull/1824)] 移除部分过期的Jvm11参数
   - [[#1820](https://github.com/seata/seata/pull/1820)] 修改部分代码风格
   - [[#1806](https://github.com/seata/seata/pull/1806)] 格式化错误日志
   - [[#1815](https://github.com/seata/seata/pull/1815)] 更新codecov.yml
   - [[#1811](https://github.com/seata/seata/pull/1811)] 适配codecov配置
   - [[#1799](https://github.com/seata/seata/pull/1799)] 移除没用的同步锁
   - [[#1674](https://github.com/seata/seata/pull/1674)] 增加Rm单元测试覆盖率
   - [[#1710](https://github.com/seata/seata/pull/1710)] NamedThreadFactory增加计数器
   - [[#1790](https://github.com/seata/seata/pull/1790)] 格式化Eureka实例id
   - [[#1760](https://github.com/seata/seata/pull/1760)] put message to logQueue
   - [[#1787](https://github.com/seata/seata/pull/1787)] 优化rpc通信日志可读性
   - [[#1786](https://github.com/seata/seata/pull/1786)] 简化Eureka注册实现类代码
   - [[#1766](https://github.com/seata/seata/pull/1766)] 移除无用方法
   - [[#1770](https://github.com/seata/seata/pull/1770)] 优化String拼接方式和无用的释放锁方法

   非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。
   - [slievrly](https://github.com/slievrly)
   - [long187](https://github.com/long187)
   - [jsbxyyx](https://github.com/jsbxyyx)
   - [l81893521](https://github.com/l81893521)
   - [helloworlde](https://github.com/helloworlde)
   - [xingfudeshi](https://github.com/xingfudeshi)
   - [zjinlei](https://github.com/zjinlei)
   - [CharmingRabbit](https://github.com/CharmingRabbit)
   - [objcoding](https://github.com/objcoding)
   - [cmonkey](https://github.com/cmonkey)
   - [lzf971107](https://github.com/lzf971107)
   - [ggndnn](https://github.com/ggndnn)
   - [lightClouds917](https://github.com/lightClouds917)
   - [ruqinhu](https://github.com/ruqinhu)
   - [yuhuangbin](https://github.com/yuhuangbin)
   - [anrror](https://github.com/anrror)
   - [a364176773](https://github.com/a364176773)
   - [caohdgege](https://github.com/caohdgege)
   - [contextshuffling](https://github.com/contextshuffling)
   - [echooymxq](https://github.com/echooymxq)
   - [github-ygy](https://github.com/github-ygy)
   - [iapplejohn](https://github.com/iapplejohn)
   - [jKill](https://github.com/jKill)
   - [Justice-love](https://github.com/Justice-love)
   - [lovepoem](https://github.com/lovepoem)
   - [niaoshuai](https://github.com/niaoshuai)
   - [ph3636](https://github.com/ph3636)
   - [wangwei-ying](https://github.com/wangwei-ying)
   - [whjjay](https://github.com/whjjay)
   - [yangfuhai](https://github.com/yangfuhai)
   - [zhongfuhua](https://github.com/zhongfuhua)
   - [lizwmaster](https://github.com/lizwmaster)

   同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。

   ### 常用链接
   - **Seata:** https://github.com/seata/seata  
   - **Seata-Samples:** https://github.com/seata/seata-samples   
   - **Release:** https://github.com/seata/seata/releases

</details>

### 0.9.0 (2019-10-16)

 [source](https://github.com/seata/seata/archive/v0.9.0.zip) | 
 [binary](https://github.com/seata/seata/releases/download/v0.9.0/seata-server-0.9.0.zip)
<details>
  <summary><mark>Release notes</mark></summary>

   ### Seata 0.9.0   
   Seata 0.9.0 正式发布。

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   此版本更新如下：
    

   #### feature：
   - [[#1608](https://github.com/seata/seata/pull/1608)] 长事务解决方案: Saga 模式（基于状态机实现）
   - [[#1625](https://github.com/seata/seata/pull/1625)] 支持自定义配置和注册中心类型
   - [[#1656](https://github.com/seata/seata/pull/1656)] 支持 spring cloud config 配置中心
   - [[#1689](https://github.com/seata/seata/pull/1689)] 支持 -e 启动参数，用于指定环境名称
   - [[#1739](https://github.com/seata/seata/pull/1739)] 支持 TM commit 或rollback 失败时的重试


   #### bugfix：
   - [[#1605](https://github.com/seata/seata/pull/1605)] 修复对象锁和全局锁可能造成的死锁和优化锁的粒度
   - [[#1685](https://github.com/seata/seata/pull/1685)] 修复db存储类异常被忽略的问题
   - [[#1691](https://github.com/seata/seata/pull/1691)] 修复 DruidDataSourceWrapper 反射问题
   - [[#1699](https://github.com/seata/seata/pull/1699)] 修复 mysql 和 oracle 中 'in' 和 'between' 在 where 条件的支持
   - [[#1713](https://github.com/seata/seata/pull/1713)] 修复 LockManagerTest.concurrentUseAbilityTest 中的测试条件
   - [[#1720](https://github.com/seata/seata/pull/1720)] 修复了不能获取 oracle tableMeta 问题
   - [[#1729](https://github.com/seata/seata/pull/1729)] 修复 oracle 的批量获取问题
   - [[#1735](https://github.com/seata/seata/pull/1735)] 修复当 TM commit 或 rollback 出现网络异常无法清除 xid 的问题
   - [[#1749](https://github.com/seata/seata/pull/1749)] 修复无法获取 oracle tableMeta cache 问题
   - [[#1751](https://github.com/seata/seata/pull/1751)] 修复文件存储模式下由于hash冲突导致的锁无法释放问题
   - [[#1761](https://github.com/seata/seata/pull/1761)] 修复 oracle 在回滚时 Blob 或 Clob null 值回滚失败问题
   - [[#1759](https://github.com/seata/seata/pull/1759)] 修复 saga 模式下 service method 不支持接口类型参数问题
   - [[#1401](https://github.com/seata/seata/pull/1401)] 修复 RM 启动时第一次注册 resource 为 null 的问题

   

   #### optimize： 
   - [[#1701](https://github.com/seata/seata/pull/1701)] 移除无用的 imports
   - [[#1705](https://github.com/seata/seata/pull/1705)] 优化了一些基于 java5 的语法结构
   - [[#1706](https://github.com/seata/seata/pull/1706)] 将内部类声明为 static
   - [[#1707](https://github.com/seata/seata/pull/1707)] 使用 StandardCharsets.UTF_8 代替 utf-8 编码
   - [[#1712](https://github.com/seata/seata/pull/1712)] 抽象 undologManager 的通用方法
   - [[#1722](https://github.com/seata/seata/pull/1722)] 简化代码提高代码的可读性
   - [[#1726](https://github.com/seata/seata/pull/1726)] 格式化日志输出
   - [[#1738](https://github.com/seata/seata/pull/1738)] 增加 seata-server jvm 参数
   - [[#1743](https://github.com/seata/seata/pull/1743)] 提高批量打印日志的性能
   - [[#1747](https://github.com/seata/seata/pull/1747)] 使用基本类型避免数据装箱
   - [[#1750](https://github.com/seata/seata/pull/1750)] 抽象 tableMetaCache 方法
   - [[#1755](https://github.com/seata/seata/pull/1755)] 提高 seata-common 模块的单测覆盖率
   - [[#1756](https://github.com/seata/seata/pull/1756)] 升级 jackson 版本防止潜在的安全漏洞
   - [[#1657](https://github.com/seata/seata/pull/1657)] 优化文件存储模式下文件 rolling 时占用较大 direct buffer的问题

   非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。

   - [slievrly](https://github.com/slievrly)
   - [long187](https://github.com/long187)
   - [ggndnn](https://github.com/ggndnn)
   - [xingfudeshi](https://github.com/xingfudeshi)
   - [BeiKeJieDeLiuLangMao](https://github.com/BeiKeJieDeLiuLangMao)
   - [zjinlei](https://github.com/zjinlei)
   - [cmonkey](https://github.com/cmonkey)
   - [jsbxyyx](https://github.com/jsbxyyx)
   - [zaqweb](https://github.com/zaqweb)
   - [tjnettech](https://github.com/tjnettech)
   - [l81893521](https://github.com/l81893521)
   - [abel533](https://github.com/abel533)
   - [suhli](https://github.com/suhli)
   - [github-ygy](https://github.com/github-ygy)
   - [worstenemy](https://github.com/worstenemy)
   - [caioguedes](https://github.com/caioguedes)

   同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。


   #### 常用链接
   - **Seata:** https://github.com/seata/seata  
   - **Seata-Samples:** https://github.com/seata/seata-samples   
   - **Release:** https://github.com/seata/seata/releases

</details>

### 0.8.1 (2019-09-18)

 [source](https://github.com/seata/seata/archive/v0.8.1.zip) |
 [binary](https://github.com/seata/seata/releases/download/v0.8.1/seata-server-0.8.1.zip)  
<details>
    <summary><mark>Release notes</mark></summary>

   ### Seata 0.8.1 

   Seata 0.8.1 正式发布。

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   此版本更新如下：


   #### feature：
   - [[#1598](https://github.com/seata/seata/pull/1598)] 支持配置文件使用绝对路径
   - [[#1617](https://github.com/seata/seata/pull/1617)] 支持配置文件名称（registry.conf） 可配置
   - [[#1418](https://github.com/seata/seata/pull/1418)] 支持 undo_log 数据的 kryo 序列化
   - [[#1489](https://github.com/seata/seata/pull/1489)] 支持 protobuf 生成插件
   - [[#1437](https://github.com/seata/seata/pull/1437)] 支持通信协议的 kryo 编解码
   - [[#1478](https://github.com/seata/seata/pull/1478)] 支持 db mock
   - [[#1512](https://github.com/seata/seata/pull/1512)] 扩展支持 mysql 和 oracle 的多种批量插入语法
   - [[#1496](https://github.com/seata/seata/pull/1496)] 支持 DataSource 的自动代理


   #### bugfix：
   - [[#1646](https://github.com/seata/seata/pull/1646)] 修复 file 存储模式的 selectForUpdate lockQuery exception
   - [[#1572](https://github.com/seata/seata/pull/1572)] 修复在oracle 小写表名时获取 tablemeta 失败问题 
   - [[#1663](https://github.com/seata/seata/pull/1663)] 修复表名为关键字获取 tablemeta 失败问题
   - [[#1666](https://github.com/seata/seata/pull/1666)] 修复数据库连接使用后的 autocommit 问题
   - [[#1643](https://github.com/seata/seata/pull/1643)] 修复 java.sql.Blob, java.sql.Clob 类型的序列化
   - [[#1628](https://github.com/seata/seata/pull/1628)] 修复 oracle 支持 ROWNUM 查询
   - [[#1552](https://github.com/seata/seata/pull/1552)] 修复当分支太大时的 BufferOverflow 问题
   - [[#1609](https://github.com/seata/seata/pull/1609)] 修复 oracle 关键字的线程安全问题
   - [[#1599](https://github.com/seata/seata/pull/1599)] 修复 mysql 关键字的线程安全问题
   - [[#1607](https://github.com/seata/seata/pull/1607)] 修复当druid版本小于1.1.3时 NoSuchMethodError
   - [[#1581](https://github.com/seata/seata/pull/1581)] 修复文件存储模式下 GlobalSession 长度计算不准确问题 
   - [[#1594](https://github.com/seata/seata/pull/1594)] 修复 nacos 配置中心的默认 namespace
   - [[#1550](https://github.com/seata/seata/pull/1550)] 修复计算 BranchSession 丢失 xidBytes 长度问题
   - [[#1558](https://github.com/seata/seata/pull/1558)] 修复 rpcMessage 的 body 字段 NPE问题
   - [[#1505](https://github.com/seata/seata/pull/1505)] 修复绑定公网注册地址server监听失败问题
   - [[#1539](https://github.com/seata/seata/pull/1539)] 修复 nacos namespace 配置项不生效
   - [[#1537](https://github.com/seata/seata/pull/1537)] 修复 nacos-config.txt 缺失 store.db.driver-class-name 配置项
   - [[#1522](https://github.com/seata/seata/pull/1522)] 修复 ProtocolV1CodecTest 中 testAll 运行中可能出现测试失败问题
   - [[#1525](https://github.com/seata/seata/pull/1525)] 修复当 getAfterImage 获取失败时，事务自动被提交问题
   - [[#1518](https://github.com/seata/seata/pull/1518)] 修复 EnhancedServiceLoader SPI 顺序加载第三方依赖失败问题
   - [[#1514](https://github.com/seata/seata/pull/1514)] 修复当缺少序列化依赖无法生成undolog并report true问题
   - [[#1445](https://github.com/seata/seata/pull/1445)] 修复 DefaultCoordinatorMetricsTest 单测失败问题
   - [[#1481](https://github.com/seata/seata/pull/1481)] 修复 TableMetaCache 在多数据源刷新失败问题

   

   #### optimize： 
   - [[#1629](https://github.com/seata/seata/pull/1629)] 优化etcd3中watcher订阅的效率
   - [[#1661](https://github.com/seata/seata/pull/1661)] 优化 global_table 中 transaction_name 长度问题
   - [[#1633](https://github.com/seata/seata/pull/1633)] 优化分支事务获取全局锁失败重复report（false）问题 
   - [[#1654](https://github.com/seata/seata/pull/1654)] 优化 slf4j 的错误使用
   - [[#1593](https://github.com/seata/seata/pull/1593)] 优化和规范化 server 的日志 
   - [[#1648](https://github.com/seata/seata/pull/1648)] 优化 transaction_name 在建表时的长度
   - [[#1576](https://github.com/seata/seata/pull/1576)] 消除重排序对 session 异步提交的影响 
   - [[#1618](https://github.com/seata/seata/pull/1618)] 优化 undolog manager 和 修复oracle undolog 的删除
   - [[#1469](https://github.com/seata/seata/pull/1469)] 提供不释放数据库锁情况下等待全局锁的释放以减少锁冲突
   - [[#1619](https://github.com/seata/seata/pull/1416)] 使用 StringBuffer 代替 StringBuilder
   - [[#1580](https://github.com/seata/seata/pull/1580)] 优化 LockKeyConflictException 和更改 register 方法
   - [[#1574](https://github.com/seata/seata/pull/1574)] 优化db存储模式下globalCommit 一次性删除全局锁 
   - [[#1601](https://github.com/seata/seata/pull/1601)] 优化 typo
   - [[#1602](https://github.com/seata/seata/pull/1602)] 升级 fastjson 版本至 1.2.60 应对安全漏洞
   - [[#1583](https://github.com/seata/seata/pull/1583)] 优化 oracle 主键的获取
   - [[#1575](https://github.com/seata/seata/pull/1575)] 增加 RegisterTMRequest 的单元测试
   - [[#1559](https://github.com/seata/seata/pull/1559)] 启动时延迟删除过期 undo_log
   - [[#1547](https://github.com/seata/seata/pull/1547)] 删除 TableRecords 的 jackson 注解 
   - [[#1542](https://github.com/seata/seata/pull/1542)] 优化 AbstractSessionManager 日志
   - [[#1535](https://github.com/seata/seata/pull/1535)] 去除 H2 和 pgsql 获取主键代码，修复 resultset 关闭问题
   - [[#1541](https://github.com/seata/seata/pull/1541)] 代码清理
   - [[#1544](https://github.com/seata/seata/pull/1544)] 去除中文注释
   - [[#1533](https://github.com/seata/seata/pull/1533)] 重构多环境配置的代码逻辑 
   - [[#1493](https://github.com/seata/seata/pull/1493)] 增加 tableMeta 检测任务开关
   - [[#1530](https://github.com/seata/seata/pull/1530)] 优化当数据表无索引时抛出显式异常
   - [[#1444](https://github.com/seata/seata/pull/1444)] 简化map操作
   - [[#1497](https://github.com/seata/seata/pull/1497)] 增加 seata-all 依赖
   - [[#1490](https://github.com/seata/seata/pull/1490)] 移除不必要代码

   非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。

   - [slievrly](https://github.com/slievrly)
   - [BeiKeJieDeLiuLangMao](https://github.com/BeiKeJieDeLiuLangMao)
   - [jsbxyyx](https://github.com/jsbxyyx)
   - [ldcsaa](https://github.com/ldcsaa)
   - [zjinlei](https://github.com/zjinlei)
   - [l81893521](https://github.com/l81893521)
   - [ggndnn](https://github.com/ggndnn)
   - [github-ygy](https://github.com/github-ygy)
   - [chenxi-null](https://github.com/chenxi-null)
   - [tq02ksu](https://github.com/tq02ksu)
   - [AjaxXu](https://github.com/AjaxXu)
   - [finalcola](https://github.com/finalcola)
   - [lovepoem](https://github.com/lovepoem)
   - [cmonkey](https://github.com/cmonkey)
   - [xingfudeshi](https://github.com/xingfudeshi)
   - [andyqian](https://github.com/andyqian)
   - [tswstarplanet](https://github.com/tswstarplanet)
   - [zhengyangyong](https://github.com/zhengyangyong)

   同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。


   #### 常用链接
   - **Seata:** https://github.com/seata/seata  
   - **Seata-Samples:** https://github.com/seata/seata-samples   
   - **Release:** https://github.com/seata/seata/releases

</details>

### 0.8.0 (2019-08-16)

* [source](https://github.com/seata/seata/archive/v0.8.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.8.0/seata-server-0.8.0.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   ## Seata 0.8.0 
   Seata 0.8.0 正式发布。

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   ### feature：
   - [[#902](https://github.com/seata/seata/pull/902)] 支持 oracle 数据库的 AT 模式
   - [[#1447](https://github.com/seata/seata/pull/1447)] 支持 oracle 数据库的批量操作
   - [[#1392](https://github.com/seata/seata/pull/1392)] 支持 undo_log 表名可配置 
   - [[#1353](https://github.com/seata/seata/pull/1353)] 支持 mysql 数据库的批量更新和删除操作
   - [[#1379](https://github.com/seata/seata/pull/1379)] 配置中心所有配置项支持-D参数传入
   - [[#1365](https://github.com/seata/seata/pull/1365)] 支持定时更新mysql的表结构，可不停机更改表结构
   - [[#1371](https://github.com/seata/seata/pull/1371)] 支持 mysql preparedStatement 自增批量插入
   - [[#1337](https://github.com/seata/seata/pull/1337)] 支持 mysql preparedStatement 非自增批量插入
   - [[#1235](https://github.com/seata/seata/pull/1453)] 支持兜底定时删除 undolog 使用protobuf codec 
   - [[#1235](https://github.com/seata/seata/pull/1235)] 支持兜底定时删除 undolog 使用 seata codec
   - [[#1323](https://github.com/seata/seata/pull/1323)] 支持db driver class 可配置


   ### bugfix：
   - [[#1456](https://github.com/seata/seata/pull/1456)] 修复 xid 在 db 模式可重复的问题
   - [[#1454](https://github.com/seata/seata/pull/1454)] 修复 DateCompareUtils 不能比对 byte array 的问题
   - [[#1452](https://github.com/seata/seata/pull/1452)] 修复 select for update 重试获取到脏数据的问题
   - [[#1443](https://github.com/seata/seata/pull/1443)] 修复 timestamp 反序列化丢失纳秒精度的问题
   - [[#1374](https://github.com/seata/seata/pull/1374)] 修复 store.mode 启动参数与获取锁配置不一致的问题
   - [[#1409](https://github.com/seata/seata/pull/1409)] 修复 map.toString() 错误
   - [[#1344](https://github.com/seata/seata/pull/1344)] 修复 ByteBuffer 分配固定长度, 导致 BufferOverflowException 的问题
   - [[#1419](https://github.com/seata/seata/pull/1419)] 修复数据库连接默认autocommit=false 无法删除undolog的问题
   - [[#1370](https://github.com/seata/seata/pull/1370)] 修复begin事务失败释放channel和继续进行事务的问题
   - [[#1396](https://github.com/seata/seata/pull/1396)] 修复 Nacos config SPI 加载 class not found 的问题
   - [[#1395](https://github.com/seata/seata/pull/1395)] 修复获取 channel 检测逻辑
   - [[#1385](https://github.com/seata/seata/pull/1385)] 在rollback重试时修复获取 SessionManager 错误的问题
   - [[#1378](https://github.com/seata/seata/pull/1378)] 修复 eureka注册中心clusterAddressMap 在实例下线列表不清除的问题
   - [[#1332](https://github.com/seata/seata/pull/1332)] 修复 nacos 配置初始化脚本初始化含 ’=‘ 配置值错误的问题
   - [[#1341](https://github.com/seata/seata/pull/1341)] 修复同一个本地事务中对同一数据反复修改回滚错误的问题
   - [[#1339](https://github.com/seata/seata/pull/1339)] 修复数据镜像是 EmptyTableRecords, 回滚失败的问题
   - [[#1314](https://github.com/seata/seata/pull/1314)] 修复不指定db模式启动参数，配置文件不生效的问题
   - [[#1342](https://github.com/seata/seata/pull/1342)] 修复 ByteBuffer 长度分配错误
   - [[#1333](https://github.com/seata/seata/pull/1333)] 修复 netty 内存泄露问题
   - [[#1338](https://github.com/seata/seata/pull/1338)] 修复db模式下可重入锁后不再获取其他所的问题
   - [[#1334](https://github.com/seata/seata/pull/1334)] 修复使用 protobuf 时 tcc 模式下lock key NPE 的问题
   - [[#1313](https://github.com/seata/seata/pull/1313)] 修复 DefaultFailureHandler 检查 status NPE 的问题


   ### optimize： 
   - [[#1474](https://github.com/seata/seata/pull/1474)] 优化数据镜像比对日志
   - [[#1446](https://github.com/seata/seata/pull/1446)] 优化了 server 的 schedule tasks 
   - [[#1448](https://github.com/seata/seata/pull/1448)] 重构了 executor 类删除了多余的重复代码
   - [[#1408](https://github.com/seata/seata/pull/1408)] 更改 TmRpcClientTest 类中的 ChannelFactory package路径
   - [[#1432](https://github.com/seata/seata/pull/1432)] 实现了作为 hash key类型对象的equals 和 hashcode 方法 
   - [[#1429](https://github.com/seata/seata/pull/1429)] 删除了无用的 imports 
   - [[#1426](https://github.com/seata/seata/pull/1426)] 修复语法错误 
   - [[#1425](https://github.com/seata/seata/pull/1425)] 修复 typo 
   - [[#1356](https://github.com/seata/seata/pull/1356)] 优化 sql 拼接语法 
   - [[#1416](https://github.com/seata/seata/pull/1416)] 优化 javadoc 和注释
   - [[#1417](https://github.com/seata/seata/pull/1417)] 梳理优化了 oracle 的关键字
   - [[#1404](https://github.com/seata/seata/pull/1404)] 优化了 BranchStatus 的注释
   - [[#1414](https://github.com/seata/seata/pull/1414)] 梳理优化了 mysql 的关键字
   - [[#1407](https://github.com/seata/seata/pull/1407)] 禁用了不稳定的单元测试
   - [[#1398](https://github.com/seata/seata/pull/1398)] 优化了 eureka 注册中心 serviceUrl 默认值使用默认端口
   - [[#1364](https://github.com/seata/seata/pull/1364)] 优化 table 列字段名称定义为常量 
   - [[#1389](https://github.com/seata/seata/pull/1389)] 增加 oracle 支持提示信息
   - [[#1375](https://github.com/seata/seata/pull/1375)] 增加 compareRows 比对失败日志
   - [[#1358](https://github.com/seata/seata/pull/1358)] 运行完成单测用例时清理临时文件
   - [[#1355](https://github.com/seata/seata/pull/1355)] 增加 rpc protocol 的单测
   - [[#1357](https://github.com/seata/seata/pull/1357)] 优化 Consul&Etcd 配置中心代码
   - [[#1345](https://github.com/seata/seata/pull/1345)] 代码清理和调整日志级别
   - [[#1329](https://github.com/seata/seata/pull/1329)] 增加 `STORE_FILE_DIR` 配置项的默认值


   非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告.  

   - [slievrly](https://github.com/slievrly)
   - [Justice-love](https://github.com/Justice-love)
   - [l81893521](https://github.com/l81893521)
   - [ggndnn](https://github.com/ggndnn)
   - [zjinlei](https://github.com/zjinlei)
   - [andyqian](https://github.com/andyqian)
   - [cmonkey](https://github.com/cmonkey)
   - [wangjin](https://github.com/wangjin)
   - [Arlmls](https://github.com/Arlmls)
   - [lukairui](https://github.com/lukairui)
   - [kongwang](https://github.com/kongwang)
   - [lightClouds917](https://github.com/lightClouds917)
   - [xingfudeshi](https://github.com/xingfudeshi)
   - [alicexiaoshi](https://github.com/alicexiaoshi)
   - [itxingqing](https://github.com/itxingqing)
   - [wanghuizuo](https://github.com/wanghuizuo)
   - [15168326318](https://github.com/15168326318)
   - [github-ygy](https://github.com/github-ygy)
   - [ujjboy](https://github.com/ujjboy)
   - [leizhiyuan](https://github.com/leizhiyuan)
   - [vikenlove](https://github.com/vikenlove)

   同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。


   ### 常用链接
   - **Seata:** https://github.com/seata/seata  
   - **Seata-Samples:** https://github.com/seata/seata-samples   
   - **Release:** https://github.com/seata/seata/releases

</details>

### 0.7.1 (2019-07-15)

* [source](https://github.com/seata/seata/archive/v0.7.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.7.1/seata-server-0.7.1.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Seata 0.7.1 发布

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   0.7.1 版本是针对0.7.0 版本问题的紧急修复，本次更新主要内容如下：


   ## Bug 修复及优化

   - [[#1297](https://github.com/seata/seata/pull/1297)] 兼容seata-spring独立依赖用法，对seata-spring添加了seata-codec-all依赖
   - [[#1305](https://github.com/seata/seata/pull/1305)] 修复GlobalTransactionScanner 切面优先级导致的Spring Cloud 的AutoConfiguration无法初始化问题
   - 修复了0.7.0 因mvn插件过低导致的版本号无替换，无法从中央仓库拉取依赖的问题。


   ## 相关链接
   - Seata: https://github.com/seata/seata 
   - Seata-Samples: https://github.com/seata/seata-samples   
   - Release：https://github.com/seata/seata/releases
</details>

### 0.7.0 (2019-07-12)

* [source](https://github.com/seata/seata/archive/v0.7.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.7.0/seata-server-0.7.0.zip) 
<details>
    <summary><mark>Release notes</mark></summary>
​    

   Seata 0.7.0 发布

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新主要内容如下：


   ## 功能特性

   - [[#1276](https://github.com/seata/seata/pull/1276)] 新的 RPC 通信协议
   - [[#1266](https://github.com/seata/seata/pull/1266)] metrics 可配置 ([97](https://github.com/seata/seata/issues/97))
   - [[#1236](https://github.com/seata/seata/pull/1236)] tc server 支持metrics
   - [[#1214](https://github.com/seata/seata/pull/1214)] 添加 `shutdown.wait` ([1212](https://github.com/seata/seata/issues/1212))
   - [[#1206](https://github.com/seata/seata/pull/1206)] 可以设置默认值
   - [[#1174](https://github.com/seata/seata/pull/1174)] 添加nacos 初始化脚本 ([1172](https://github.com/seata/seata/issues/1172))
   - [[#1145](https://github.com/seata/seata/pull/1145)] 修复lock模式和存储模式的关联
   - [[#1125](https://github.com/seata/seata/pull/1125)] 支持 protostuff 作为 UndoLogParser 的序列化
   - [[#1007](https://github.com/seata/seata/pull/1007)] 支持 Protobuf 作为序列化 ([97](https://github.com/seata/seata/issues/97))

   ## Bug 修复及优化

   - [[#1286](https://github.com/seata/seata/pull/1286)] 排除 log 依赖 ([97](https://github.com/seata/seata/issues/97))
   - [[#1278](https://github.com/seata/seata/pull/1278)] 传递 txId 到 TCC 拦截器
   - [[#1274](https://github.com/seata/seata/pull/1274)] 优化 SQL join
   - [[#1271](https://github.com/seata/seata/pull/1271)] @GlobalLock 修复报错 ([97](https://github.com/seata/seata/issues/97), [1224](https://github.com/seata/seata/issues/1224))
   - [[#1270](https://github.com/seata/seata/pull/1270)] 打印异常信息
   - [[#1269](https://github.com/seata/seata/pull/1269)] 修复 TMClinet 重连异常
   - [[#1265](https://github.com/seata/seata/pull/1265)] 非全局事物，添加 addBatch
   - [[#1264](https://github.com/seata/seata/pull/1264)] 更新ci配置 ([97](https://github.com/seata/seata/issues/97))
   - [[#1263](https://github.com/seata/seata/pull/1263)] 添加贡献文档 ([97](https://github.com/seata/seata/issues/97))
   - [[#1262](https://github.com/seata/seata/pull/1262)] 修复target class的寻找问题 ([97](https://github.com/seata/seata/issues/97))
   - [[#1261](https://github.com/seata/seata/pull/1261)] 添加异常信息，当获取自增长的key时 (#1259) ([97](https://github.com/seata/seata/issues/97), [1259](https://github.com/seata/seata/issues/1259))
   - [[#1258](https://github.com/seata/seata/pull/1258)] 优化 metrics 模块配置
   - [[#1250](https://github.com/seata/seata/pull/1250)] 修复 protobuf 的配置 ([97](https://github.com/seata/seata/issues/97))
   - [[#1245](https://github.com/seata/seata/pull/1245)] 重构 metrics
   - [[#1242](https://github.com/seata/seata/pull/1242)] sql 优化
   - [[#1239](https://github.com/seata/seata/pull/1239)] 修复 CME 在 ZK 服务发现的问题. ([97](https://github.com/seata/seata/issues/97))
   - [[#1237](https://github.com/seata/seata/pull/1237)] 修复分支session 可能的 NPE ([97](https://github.com/seata/seata/issues/97))
   - [[#1232](https://github.com/seata/seata/pull/1232)] 添加单测 io.seata.common.util CompressUtil, DurationUtil, ReflectionUtil
   - [[#1230](https://github.com/seata/seata/pull/1230)] 优化全局🍜扫描器 #1227 ([97](https://github.com/seata/seata/issues/97), [1227](https://github.com/seata/seata/issues/1227))
   - [[#1229](https://github.com/seata/seata/pull/1229)] 修复拼写错误 ([97](https://github.com/seata/seata/issues/97))
   - [[#1225](https://github.com/seata/seata/pull/1225)] 优化 seata 配置环境信息. ([97](https://github.com/seata/seata/issues/97), [1209](https://github.com/seata/seata/issues/1209))
   - [[#1222](https://github.com/seata/seata/pull/1222)] 修复 refresh cluster的bug  ([1160](https://github.com/seata/seata/issues/1160))
   - [[#1221](https://github.com/seata/seata/pull/1221)] 修复sql的字段和数据库不一致的问题 ([1217](https://github.com/seata/seata/issues/1217))
   - [[#1218](https://github.com/seata/seata/pull/1218)] containsPK 忽略大小写 ([1217](https://github.com/seata/seata/issues/1217))
   - [[#1210](https://github.com/seata/seata/pull/1210)] 优化 arrayList 的并发问题
   - [[#1207](https://github.com/seata/seata/pull/1207)] @Override 注解强制
   - [[#1205](https://github.com/seata/seata/pull/1205)] 移除无用代码
   - [[#1202](https://github.com/seata/seata/pull/1202)] 输出 branchRollback 失败日志 ([97](https://github.com/seata/seata/issues/97))
   - [[#1200](https://github.com/seata/seata/pull/1200)] 修复 DefaultCoreTest.branchRegisterTest 测试 ([1199](https://github.com/seata/seata/issues/1199))
   - [[#1198](https://github.com/seata/seata/pull/1198)] 检查三方依赖的 license ([1197](https://github.com/seata/seata/issues/1197))
   - [[#1195](https://github.com/seata/seata/pull/1195)] TCC prepare 阶段晴空 上下文
   - [[#1193](https://github.com/seata/seata/pull/1193)] 通过 storemode 关联 lockmode
   - [[#1190](https://github.com/seata/seata/pull/1190)] 代码优化 ([97](https://github.com/seata/seata/issues/97), [540](https://github.com/seata/seata/issues/540))
   - [[#1179](https://github.com/seata/seata/pull/1179)] jackson 内容存储
   - [[#1177](https://github.com/seata/seata/pull/1177)] 修复 TransactionException 异常未能释放锁的问题. ([97](https://github.com/seata/seata/issues/97), [1154](https://github.com/seata/seata/issues/1154))
   - [[#1169](https://github.com/seata/seata/pull/1169)] 禁止重复的listener ([1126](https://github.com/seata/seata/issues/1126))
   - [[#1165](https://github.com/seata/seata/pull/1165)] 修复 INSERT_UNDO_LOG_SQL 缺失的占位符 ([1164](https://github.com/seata/seata/issues/1164))
   - [[#1162](https://github.com/seata/seata/pull/1162)] destroy() 时 重置 initialized flag 和  instance [##1105 ([983](https://github.com/seata/seata/issues/983), [97](https://github.com/seata/seata/issues/97))
   - [[#1159](https://github.com/seata/seata/pull/1159)] 修复 AT 模式  resourceId(row_key) 过长的问题 ([97](https://github.com/seata/seata/issues/97), [1158](https://github.com/seata/seata/issues/1158))
   - [[#1150](https://github.com/seata/seata/pull/1150)] README.md 中更新seata 的版本 ([97](https://github.com/seata/seata/issues/97))
   - [[#1148](https://github.com/seata/seata/pull/1148)] buffer 溢出bug 修复 
   - [[#1146](https://github.com/seata/seata/pull/1146)] 修改包名称 ([97](https://github.com/seata/seata/issues/97))
   - [[#1105](https://github.com/seata/seata/pull/1105)] 重构 TmRpcClient & RmClient. ([97](https://github.com/seata/seata/issues/97))
   - [[#1075](https://github.com/seata/seata/pull/1075)] 多环境隔离
   - [[#768](https://github.com/seata/seata/pull/768)] #751 添加事件机制

   ## 相关链接
   - Seata: https://github.com/seata/seata 
   - Seata-Samples: https://github.com/seata/seata-samples   
   - Release：https://github.com/seata/seata/releases

</details>

### 0.6.1 (2019-05-31)

* [source](https://github.com/seata/seata/archive/v0.6.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.6.1/seata-server-0.6.1.zip) 
<details>
    <summary><mark>Release notes</mark></summary>
​    

   Seata 0.6.1 发布

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新主要内容如下：


   ## 功能特性

   - [[#1119](https://github.com/seata/seata/pull/1119)] 支持 weibo/motan 上下文透传
   - [[#1075](https://github.com/seata/seata/pull/1075)] 支持多环境配置隔离

   ## Bug 修复及优化

   - [[#1099](https://github.com/seata/seata/pull/1099)] 将UndoLogParser修改成SPI形式
   - [[#1113](https://github.com/seata/seata/pull/1113)] 优化代码格式
   - [[#1087](https://github.com/seata/seata/pull/1087)] 去掉无用的字节复制
   - [[#1090](https://github.com/seata/seata/pull/1090)] 修改UndoLogParser的方法的返回格式，便于后续扩展
   - [[#1120](https://github.com/seata/seata/pull/1120)] 修复分支事务提交和回滚时 xid使用错误的问题
   - [[#1135](https://github.com/seata/seata/pull/1135)] 升级zookeeper以修复安全漏洞
   - [[#1138](https://github.com/seata/seata/pull/1138)] 修复windows下seata-server.bat classpath过长的问题
   - [[#1117](https://github.com/seata/seata/pull/1117)] 修复脏写校验时时间类型数据校验失败问题
   - [[#1115](https://github.com/seata/seata/pull/1115)] 配置 seata-all 和 seata-bom 打包发布环境


   ## 相关链接
   - Seata: https://github.com/seata/seata 
   - Seata-Samples: https://github.com/seata/seata-samples   
   - Release：https://github.com/seata/seata/releases

</details>

### 0.6.0 (2019-05-24)

* [source](https://github.com/seata/seata/archive/v0.6.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.6.0/seata-server-0.6.0.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Seata 0.6.0 发布

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新主要内容如下：


   ## 功能特性

   - [[#942](https://github.com/seata/seata/pull/942)] 服务端使用数据库存储事务日志，支持服务端集群部署
   - [[#1014](https://github.com/seata/seata/pull/1014)] 支持 etcd3 作为配置中心
   - [[#1060](https://github.com/seata/seata/pull/1060)] 添加事务回滚时脏写校验

   ## Bug 修复及优化

   - [[#1064](https://github.com/seata/seata/pull/1064)] 修复 xid 和 branchId 长度错误
   - [[#1074](https://github.com/seata/seata/pull/1074)] 修复一些拼写错误，并用lambda替换匿名类 
   - [[#824](https://github.com/seata/seata/pull/824)] 添加事务恢复重试超时时间限制
   - [[#1082](https://github.com/seata/seata/pull/1082)] 添加配置中心单实例缓存
   - [[#1084](https://github.com/seata/seata/pull/1084)] 重构字符集和blob工具类
   - [[#1080](https://github.com/seata/seata/pull/1080)] 升级fastjson和nacos-client版本

   

   ## 相关链接
   - Seata: https://github.com/seata/seata 
   - Seata-Samples: https://github.com/seata/seata-samples   
   - Release：https://github.com/seata/seata/releases

</details>

### 0.5.2 (2019-05-17)

* [source](https://github.com/seata/seata/archive/v0.5.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.5.2/seata-server-0.5.2.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Seata 0.5.2 发布

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新主要内容如下：


   ## 功能特性

   - [[#988](https://github.com/seata/seata/pull/988)] 增加配置中心Consul支持
   - [[#1043](https://github.com/seata/seata/pull/1043)] 增加sofa-rpc支持


   ## Bug 修复及优化

   - [[#987](https://github.com/seata/seata/pull/987)] 优化同事务内并发使用 reentrantLock 代替 spinlock
   - [[#943](https://github.com/seata/seata/pull/943)] 修复无相应文件配置项时取配置等待超时问题
   - [[#965](https://github.com/seata/seata/pull/965)] 修复PreparedStatement 时where语句中 in、between 报错问题
   - [[#929](https://github.com/seata/seata/pull/929)] 优化GlobalSession第一次取锁等待问题
   - [[#967](https://github.com/seata/seata/pull/967)] 优化部分日志描述
   - [[#970](https://github.com/seata/seata/pull/970)] 修复无法读取flush-disk-mode配置项问题
   - [[#916](https://github.com/seata/seata/pull/916)] 优化解码时readable index
   - [[#979](https://github.com/seata/seata/pull/979)] 优化copyright
   - [[#981](https://github.com/seata/seata/pull/981)] 优化pom依赖，使用 caffine 代替 guava cache，junit升级至junit5，使用junit5改造原有testng单元测试
   - [[#991](https://github.com/seata/seata/pull/991)] 优化core模块的文件头import
   - [[#996](https://github.com/seata/seata/pull/996)] 修复maven-surefire-plugin在mac环境下编译错误问题
   - [[#994](https://github.com/seata/seata/pull/994)] 修复ByteBuffer多次flip问题
   - [[#999](https://github.com/seata/seata/pull/999)] 更改社区邮件订阅地址
   - [[#861](https://github.com/seata/seata/pull/861)] 优化FailureHandler定时获取重试的事务结果，并将成功结果打印
   - [[#802](https://github.com/seata/seata/pull/802)] 优化GlobalTransactionalInterceptor中lambda代码风格
   - [[#1026](https://github.com/seata/seata/pull/1026)] 修复错误排除data*代码文件问题，增加本地事务文件排除路径
   - [[#1024](https://github.com/seata/seata/pull/1024)] 修复Consul模块SPI配置文件路径错误问题
   - [[#1023](https://github.com/seata/seata/pull/1023)] 增加seata-all客户端依赖jar包
   - [[#1029](https://github.com/seata/seata/pull/1029)] 修复回滚中客户端宕机重启回滚时无channel导致的延迟回滚问题
   - [[#1027](https://github.com/seata/seata/pull/1027)] 修复release-seata无法生成压缩包问题
   - [[#1033](https://github.com/seata/seata/pull/1033)] 修复createDependencyReducedPom生成多余xml问题
   - [[#1035](https://github.com/seata/seata/pull/1035)] 修复TCC模式中branchCommit/branchRollback，branchId为null问题
   - [[#1040](https://github.com/seata/seata/pull/1040)] 重构exceptionHandleTemplate,修复GlobalRollback 分支异常时无法返回状态问题
   - [[#1036](https://github.com/seata/seata/pull/1036)] 替换中文注释为相应英文注释
   - [[#1051](https://github.com/seata/seata/pull/1051)] 优化回滚时校验数据变化，若无变化停止回滚
   - [[#1017](https://github.com/seata/seata/pull/1017)] 优化mysql undo executor构造undo sql逻辑处理
   - [[#1063](https://github.com/seata/seata/pull/1063)] 修复server重启后事务恢复后，可能造成新事务id冲突失败问题

   


   ## 相关链接
   - Seata: https://github.com/seata/seata 
   - Seata-Samples: https://github.com/seata/seata-samples   
   - Release：https://github.com/seata/seata/releases

</details>

### 0.5.1 (2019-04-30)

* [source](https://github.com/seata/seata/archive/v0.5.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.5.1/seata-server-0.5.1.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Seata 0.5.1 发布

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新主要内容如下：


   ## 功能特性

   - [[#774](https://github.com/seata/seata/pull/869)] 增加注册中心Etcd3支持
   - [[#793](https://github.com/seata/seata/pull/793)] 增加注册中心sofa-registry支持
   - [[#856](https://github.com/seata/seata/pull/856)] 增加批量删除undolog处理
   - [[#786](https://github.com/seata/seata/pull/786)] 增加全局事务内分支事务并发支持

   

   ## Bug 修复及优化

   - [[#879](https://github.com/seata/seata/pull/879)] 修复批量删除undolog PreparedStatement不关闭问题
   - [[#945](https://github.com/seata/seata/pull/945)] 增加LockManager中releaseLock接口，优化调用逻辑
   - [[#938](https://github.com/seata/seata/pull/938)] 优化TransactionManager服务加载逻辑
   - [[#913](https://github.com/seata/seata/pull/938)] 优化与RPC集成框架的模块结构
   - [[#795](https://github.com/seata/seata/pull/795)] 优化server节点写文件的性能
   - [[#921](https://github.com/seata/seata/pull/921)] 修复select for update时的NPE异常
   - [[#925](https://github.com/seata/seata/pull/925)] 优化server启动时复用同一DefaultCoordinator实例
   - [[#930](https://github.com/seata/seata/pull/930)] 优化字段访问修饰符
   - [[#907](https://github.com/seata/seata/pull/907)] 修复hostname can't be null异常
   - [[#923](https://github.com/seata/seata/pull/923)] 修复nettyClientKeyPool连接销毁时Key未format问题
   - [[#891](https://github.com/seata/seata/pull/891)] 修复select union all时NPE异常
   - [[#888](https://github.com/seata/seata/pull/888)] 修复copyright checkstyle验证问题
   - [[#901](https://github.com/seata/seata/pull/901)] 修复Zookeeper 注册时父节点路径不存在问题
   - [[#904](https://github.com/seata/seata/pull/904)] 优化UpdateExecutort后镜像数据查询
   - [[#802](https://github.com/seata/seata/pull/802)] 优化checkstyle，增加插件校验
   - [[#882](https://github.com/seata/seata/pull/882)] 更改copyright，增加copyright自动插件
   - [[#874](https://github.com/seata/seata/pull/874)] 增加通讯传输层默认配置值
   - [[#866](https://github.com/seata/seata/pull/866)] 修复无法生成dubbo:reference代理类问题
   - [[#877](https://github.com/seata/seata/pull/877)] 修复批量删除undolog时concurrentModifyException异常
   - [[#855](https://github.com/seata/seata/pull/855)] 优化AT模式时globalCommit时始终返回committed给用户
   - [[#875](https://github.com/seata/seata/pull/875)] 修复select for update，Boolean转型ResultSet失败问题
   - [[#830](https://github.com/seata/seata/pull/830)] 修复RM延迟注册问题
   - [[#872](https://github.com/seata/seata/pull/872)] 修复RegisterRMRequest解码消息长度校验不准确问题
   - [[#831](https://github.com/seata/seata/pull/831)] 优化MessageFuture中CountDownLatch，使用CompletableFuture替代
   - [[#834](https://github.com/seata/seata/pull/834)] 修复ExecuteTemplate中非SQLException异常不抛出问题

   


   ## 相关链接
   - Seata: https://github.com/seata/seata 
   - Seata-Samples: https://github.com/seata/seata-samples   
   - Release：https://github.com/seata/seata/releases

</details>

### 0.5.0 (2019-04-19)

* [source](https://github.com/seata/seata/archive/0.5.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/0.5.0/seata-server-0.5.0.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Seata 0.5.0 发布

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新主要内容如下：

   ### 兼容性变更

   - [[#809](https://github.com/seata/seata/pull/809)] 更改 groupid、artifactid和包路径
   - [[#815](https://github.com/seata/seata/pull/815)] 添加maven 插件，以支持使用 groupId “io.seata” 发包
   - [[#790](https://github.com/seata/seata/pull/790)] 修改服务器的启动参数以支持数据库存储模式
   - [[#769](https://github.com/seata/seata/pull/769)] 重构RPC协议，在客户端中去掉XID的解析，使得服务端变成无状态

   ## 功能特性

   - [[#774](https://github.com/seata/seata/pull/774)] 优化配置中心和注册中心的结构
   - [[#783](https://github.com/seata/seata/pull/783)] 允许用户自定义分支事务记录报告重试次数
   - [[#791](https://github.com/seata/seata/pull/791)] 用状态枚举替换超时状态的模糊判断
   - [[#836](https://github.com/seata/seata/pull/836)] 添加maven插件，管理工程版本号
   - [[#820](https://github.com/seata/seata/pull/820)] 添加按异常回滚事务的特性


   ## Bug 修复

   - [[#772](https://github.com/seata/seata/pull/772)] 修复文件配置中心监听器问题
   - [[#807](https://github.com/seata/seata/pull/807)] 优化服务端文件存储器的文件路径
   - [[#804](https://github.com/seata/seata/pull/804)] 修复分支提交不断重试问题

   

   ## 相关链接
   - Seata: https://github.com/seata/seata 
   - Seata-Samples: https://github.com/fescar-group/fescar-samples   
   - Release：https://github.com/seata/seata/releases

</details>

### 0.4.2 (2019-04-12)

* [source](https://github.com/seata/seata/archive/v0.4.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.2/fescar-server-0.4.2.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Seata 0.4.2 发布

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新主要内容如下：

   ## 特性

   - [[#704](https://github.com/seata/seata/pull/704)] 增加 本地文件写入时 ByteBuffer 池
   - [[#679](https://github.com/seata/seata/issues/679)] 增加 现有注册中心增加了 close 接口实现，优化了 server 优雅下线 
   - [[#713](https://github.com/seata/seata/pull/713)] 增加 本地文件写入对超过配置大小的消息启用压缩功能  
   - [[#587](https://github.com/seata/seata/issues/587)] 增加 MySQL DDL 语句支持 
   - [[#717](https://github.com/seata/seata/pull/717)] 增加 Nacos 初始化配置脚本配置和补全程序配置文件
   - [[#726](https://github.com/seata/seata/pull/726)] 增加 DBCP, C3P0, BoneCP, HikariCP 和 Tomcat-JDBC 连接池的支持
   - [[#744](https://github.com/seata/seata/pull/744)] 增加 ZooKeeper 断线重连时重新注册和订阅
   - [[#728](https://github.com/seata/seata/pull/728)] 增加 Consul 注册中心支持

   ## Bug 修复

   - [[#569](https://github.com/seata/seata/pull/695)] 修复 已是jdk代理且无 target 只遍历第一个实现接口的问题
   - [[#721](https://github.com/seata/seata/pull/721)] 修复 ConfigFuture 构造方法超时参数不起作用的问题
   - [[#725](https://github.com/seata/seata/pull/725)] 修复 MergedSendRunnable channel被意外关闭问题，增加 fail-fast 机制
   - [[#723](https://github.com/seata/seata/pull/723)] 修复 defaultServerMessageListener 未初始化的问题
   - [[#746](https://github.com/seata/seata/pull/746)] 修复 DataSourceManager SPI 导致的test module 集测用例全部失效问题
   - [[#754](https://github.com/seata/seata/pull/754)] 优化 Eureka 注册中心实现
   - [[#750](https://github.com/seata/seata/pull/750)] 修复 DataSourceManager SPI 导致的 undolog 无法删除问题
   - [[#747](https://github.com/seata/seata/pull/747)] 删除 MT 模式，之后将被 TCC 模式代替 
   - [[#757](https://github.com/seata/seata/pull/757)] 修复 BranchRollback 异常后回滚重试被终止问题
   - [[#776](https://github.com/seata/seata/pull/776)] 修复 连接池创建 channel 时 toString 异常导致的连接创建失败问题

   

   ## 相关链接
   - Seata: https://github.com/seata/seata 
   - Seata-Samples: https://github.com/fescar-group/fescar-samples   
   - Release：https://github.com/seata/seata/releases

</details>

### 0.4.1 (2019-03-29)

* [source](https://github.com/seata/seata/archive/v0.4.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.1/fescar-server-0.4.1.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

</details>

### 0.4.0 (2019-03-19)

* [source](https://github.com/seata/seata/archive/v0.4.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.0/fescar-server-0.4.0.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Alibaba Fescar 0.4.0 发布

   Fescar 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新内容如下：

   ## 特性

   - [[#583](https://github.com/alibaba/fescar/pull/583)] 新增蚂蚁金服的TCC模式，自动代理Dubbo服务和SOFARPC服务，使fescar支持除数据库以外的其他资源（RPC服务、restful服务、消息以及NoSQL等）作为分布式事务资源
   - [[#594](https://github.com/alibaba/fescar/pull/611)] 新增 p3c pmd Maven插件，自动进行代码扫描并找出不规范的代码格式
   - [[#627](https://github.com/alibaba/fescar/pull/627)] Maven依赖优化


   ## 相关链接
   - Fescar: https://github.com/alibaba/fescar   
   - Fescar-Samples: https://github.com/fescar-group/fescar-samples   
   - Release：https://github.com/alibaba/fescar/releases

</details>

### 0.3.1 (2019-03-15)

* [source](https://github.com/seata/seata/archive/v0.3.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.3.1/fescar-server-0.3.1.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Alibaba Fescar 0.3.1 发布

   Fescar 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新内容如下：

   ## 特性

   - [[#557](https://github.com/alibaba/fescar/issues/557)] 增加事务处理各阶段用户自定义 hook 接入点支持
   - [[#594](https://github.com/alibaba/fescar/pull/594)] 增加 ZooKeeper 注册中心支持   

   ## Bug 修复

   - [[#569](https://github.com/alibaba/fescar/issues/569)] 修复 Eureka renew 问题
   - [[#551](https://github.com/alibaba/fescar/pull/551)] 修复 ConfigType NPE 问题   
   - [[#489](https://github.com/alibaba/fescar/issues/489)] 修复 GlobalRollback 请求时未收到分支 branchReport 问题
   - [[#598](https://github.com/alibaba/fescar/pull/598)] 修复 p3c 扫描出不符合规范的若干问题；

   

   ## 相关链接
   - Fescar: https://github.com/alibaba/fescar   
   - Fescar-Samples: https://github.com/fescar-group/fescar-samples   
   - Release：https://github.com/alibaba/fescar/releases

</details>

### 0.3.0 (2019-03-08)

* [source](https://github.com/seata/seata/archive/v0.3.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.3.0/fescar-server-0.3.0.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Alibaba Fescar 0.3.0 发布

   Fescar 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新内容如下：

   ## 特性

   - [[#510](https://github.com/alibaba/fescar/pull/510)] 新增 eureka 注册中心支持
   - [[#498](https://github.com/alibaba/fescar/pull/498)] 实现带全局锁的本地事务模式并解决本地事务隔离性问题   

   ## Bug 修复

   - [[#459](https://github.com/alibaba/fescar/issues/459)] 修复了 mysql 关键字作为表名和列名生成 sql 问题
   - [[#312](https://github.com/alibaba/fescar/issues/312)] 修复了原始业务 sql 无 where 条件生成 sql 出错问题   
   - [[#522](https://github.com/alibaba/fescar/issues/522)] 修复文件路径安全漏洞问题
   - 对所有模块代码进行了 remove useless、 format 、optimize import、javadoc、copyright 整理

   

   ## 相关链接
   - Fescar: https://github.com/alibaba/fescar   
   - Fescar-Samples: https://github.com/fescar-group/fescar-samples   
   - Release：https://github.com/alibaba/fescar/releases

</details>

### 0.2.3 (2019-03-02)

* [source](https://github.com/seata/seata/archive/v0.2.3.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.3/fescar-server-0.2.3.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Alibaba Fescar 0.2.3 发布

   Fescar 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新内容如下：

   ## 特性

   - [[#478](https://github.com/alibaba/fescar/pull/478)] 支持 Redis 注册中心
   - [[#478](https://github.com/alibaba/fescar/pull/478)] 支持 Apollo 配置中心

   ## Bug 修复

   - [[#462](https://github.com/alibaba/fescar/issues/462)] 分离注册中心和配置中心入口
   
   - [[#466](https://github.com/alibaba/fescar/issues/466)] 修正RM线程池的拒绝策略


   ## 相关链接
   - Fescar: https://github.com/alibaba/fescar   
   - Fescar-Samples: https://github.com/fescar-group/fescar-samples   
   - Release：https://github.com/alibaba/fescar/releases

</details>

### 0.2.2 (2019-02-22)

* [source](https://github.com/seata/seata/archive/v0.2.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.2/fescar-server-0.2.2.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

</details>

### 0.2.1 (2019-02-18)

* [source](https://github.com/seata/seata/archive/v0.2.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.1/fescar-server-0.2.1.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Alibaba Fescar 0.2.1 发布

   Fescar 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新内容如下：

   ## 特性

   - 支持 update 语句中的 between 语法
   - 支持 Random 和 RoundRobin 负载策略
   - 增加 dubbo-alibaba 模块以支持 Alibaba Dubbo

   ## Bug 修复

   - 修复 NettyClientConfig 方法及变量名 fifo-> lifo
   - 修复 fescar-dubbo 模块中 filter SPI 引用错误问题


   ## 相关链接
   - Fescar: https://github.com/alibaba/fescar   
   - Fescar-Samples: https://github.com/fescar-group/fescar-samples   
   - Release：https://github.com/alibaba/fescar/releases

</details>

### 0.2.0 (2019-02-14)

* [source](https://github.com/seata/seata/archive/v0.2.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.0/fescar-server-0.2.0.zip) 
<details>
    <summary><mark>Release notes</mark></summary>

   Alibaba Fescar 0.2.0 发布

   Fescar 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

   本次更新内容如下：

   ## 特性

   - 支持 MySQL 分布式事务自动模式（AT）
   - 支持 Dubbo 无缝集成
   - 支持 分布式事务 API
   - 支持 Spring 事务注解
   - 支持 Mybatis、JPA
   - 支持 Nacos 服务注册和配置中心
   - 增加 server 重启时从文件自动恢复未完成事务操作至内存
   - 支持 多 IP 环境下，启动 server 指定 IP 参数

   ## Bug 修复

   - 修复 server 重启可能导致 XID 重复问题
   - 修复 Windows 启动脚本 $EXTRA_JVM_ARGUMENTS 参数报错
   - 修复分布式事务本地嵌套内层事务提交/回滚导致外层事务异常问题
   - 修复本地事务提交时异常，本地事务不回滚问题
   - 修复 MySQL 表别名解析问题

   ## 其他
   - 升级依赖 JDK 版本至 1.8
   - 将依赖 Alibaba Dubbo 升级至 Apache Dubbo 2.7.0
   - 优化相关依赖引用


   ## 相关链接
   - Fescar: https://github.com/alibaba/fescar   
   - Fescar-Samples: https://github.com/fescar-group/fescar-samples   
   - Release：https://github.com/alibaba/fescar/releases

</details>

### 0.1.4 (2019-02-11)

* [source](https://github.com/seata/seata/archive/v0.1.4.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.1.4/fescar-server-0.1.4.zip) 

### 0.1.3 (2019-01-29)

* [source](https://github.com/seata/seata/archive/v0.1.3.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.1.3/fescar-server-0.1.3.zip) 

### 0.1.2 (2019-01-25)

* [source](https://github.com/seata/seata/archive/V0.1.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/V0.1.2/fescar-server-0.1.2.zip) 

### 0.1.1 (2019-01-18)

* [source](https://github.com/seata/seata/archive/v0.1.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.1.1/fescar-server-0.1.1.zip) 

### 0.1.0 (2019-01-09)

* [source](https://github.com/seata/seata/archive/v0.1.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.1.0/fescar-server-0.1.0.zip) 

