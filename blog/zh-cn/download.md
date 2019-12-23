---
title: 下载中心
keywords: Seata, Downloads, Version
description: 本文将向你介绍如何点击了解各版本详情和升级注意事项。
---


# 下载中心

## Seata

> GitHub: https://github.com/seata/seata \
> 发布说明: https://github.com/seata/seata/releases
### 1.0.0 (2019-12-21)

 [source](https://github.com/seata/seata/archive/v1.0.0.zip) | 
 [binary](https://github.com/seata/seata/releases/download/v0.9.0/seata-server-1.0.0.zip)
<details>
    <summary><mark>Release notes</mark></summary>
   
   ### Seata 1.0.0 GA版本重磅发布
   Seata 1.0.0 GA版本重磅发布。

   Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。
    
   此版本更新如下：

      
   
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
