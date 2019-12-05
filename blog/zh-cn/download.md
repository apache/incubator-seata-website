---
title: 下载中心
keywords: Seata, Downloads, Version
description: 本文将向你介绍如何点击了解各版本详情和升级注意事项。
---


# 下载中心

## Seata

> GitHub: https://github.com/seata/seata \
> 发布说明: https://github.com/seata/seata/releases
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

### 0.7.1 (2019-07-15)

* [source](https://github.com/seata/seata/archive/v0.7.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.7.1/seata-server-0.7.1.zip) 

### 0.7.0 (2019-07-12)

* [source](https://github.com/seata/seata/archive/v0.7.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.7.0/seata-server-0.7.0.zip) 

### 0.6.1 (2019-05-31)

* [source](https://github.com/seata/seata/archive/v0.6.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.6.1/seata-server-0.6.1.zip) 

### 0.6.0 (2019-05-24)

* [source](https://github.com/seata/seata/archive/v0.6.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.6.0/seata-server-0.6.0.zip) 

### 0.5.2 (2019-05-17)

* [source](https://github.com/seata/seata/archive/v0.5.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.5.2/seata-server-0.5.2.zip) 

### 0.5.1 (2019-04-30)

* [source](https://github.com/seata/seata/archive/v0.5.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.5.1/seata-server-0.5.1.zip) 

### 0.5.0 (2019-04-19)

* [source](https://github.com/seata/seata/archive/0.5.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/0.5.0/seata-server-0.5.0.zip) 

### 0.4.2 (2019-04-12)

* [source](https://github.com/seata/seata/archive/v0.4.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.2/fescar-server-0.4.2.zip) 

### 0.4.1 (2019-03-29)

* [source](https://github.com/seata/seata/archive/v0.4.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.1/fescar-server-0.4.1.zip) 

### 0.4.0 (2019-03-19)

* [source](https://github.com/seata/seata/archive/v0.4.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.0/fescar-server-0.4.0.zip) 

### 0.3.1 (2019-03-15)

* [source](https://github.com/seata/seata/archive/v0.3.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.3.1/fescar-server-0.3.1.zip) 

### 0.3.0 (2019-03-08)

* [source](https://github.com/seata/seata/archive/v0.3.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.3.0/fescar-server-0.3.0.zip) 

### 0.2.3 (2019-03-02)

* [source](https://github.com/seata/seata/archive/v0.2.3.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.3/fescar-server-0.2.3.zip) 

### 0.2.2 (2019-02-22)

* [source](https://github.com/seata/seata/archive/v0.2.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.2/fescar-server-0.2.2.zip) 

### 0.2.1 (2019-02-18)

* [source](https://github.com/seata/seata/archive/v0.2.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.1/fescar-server-0.2.1.zip) 

### 0.2.0 (2019-02-14)

* [source](https://github.com/seata/seata/archive/v0.2.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.0/fescar-server-0.2.0.zip) 

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
