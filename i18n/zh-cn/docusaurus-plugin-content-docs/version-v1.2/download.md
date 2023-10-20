---
title: 下载中心
keywords: [Seata, Downloads, Version]
description: 本文将向你介绍如何点击了解各版本详情和升级注意事项。
---


# 下载中心

## Seata

> GitHub: https://github.com/seata/seata 
> 
> 发布说明: https://github.com/seata/seata/releases

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
  - [funky-eyes](https://github.com/funky-eyes) 
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
