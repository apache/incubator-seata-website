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

### 1.4.2 (2021-04-26)

[source](https://github.com/apache/incubator-seata/archive/v1.4.2.zip) |
[binary](https://github.com/apache/incubator-seata/releases/download/v1.4.2/seata-server-1.4.2.zip)

<details>
  <summary><mark>Release notes</mark></summary>


### Seata 1.4.2

Seata 1.4.2 发布。

Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

此版本更新如下：

### feature：

- [[#2933](https://github.com/apache/incubator-seata/pull/2933)] 支持mysql antlr sqlparser
- [[#3228](https://github.com/apache/incubator-seata/pull/3228)] 支持自定义序列化插件
- [[#3172](https://github.com/apache/incubator-seata/pull/3172)] 支持 AT 模式 undo_log 压缩模式
- [[#3372](https://github.com/apache/incubator-seata/pull/3372)] 支持saga模式下用户自定义是否更新最后一次重试日志
- [[#3411](https://github.com/apache/incubator-seata/pull/3411)] 支持seata-server 线程池参数可配置
- [[#3348](https://github.com/apache/incubator-seata/pull/3348)] 支持 TC 存储模式使用 redis-sentinel
- [[#2667](https://github.com/apache/incubator-seata/pull/2667)] 支持使用db和redis存储模式时密码的加解密
- [[#3427](https://github.com/apache/incubator-seata/pull/3427)] 支持分布式锁接口
- [[#3443](https://github.com/apache/incubator-seata/pull/3443)] 支持将seata-server的日志发送到logstash或kafka中
- [[#3486](https://github.com/apache/incubator-seata/pull/3486)] 支持Metrics增加事务分组属性
- [[#3317](https://github.com/apache/incubator-seata/pull/3317)] 支持当zookeeper作为配置中心时从单node获取全部配置
- [[#3516](https://github.com/apache/incubator-seata/pull/3516)] 支持 consul 作为注册中心和配置中心时的 acl-token
- [[#3116](https://github.com/apache/incubator-seata/pull/3116)] 支持配置 apollo 配置中心配置 configService 和 cluster
- [[#3468](https://github.com/apache/incubator-seata/pull/3468)] 支持saga模式下任务循环执行
- [[#3447](https://github.com/apache/incubator-seata/pull/3447)] 支持日志框架中事务上下文的打印


### bugfix：

- [[#3258](https://github.com/apache/incubator-seata/pull/3258)] 修复AsyncWorker潜在的OOM问题
- [[#3293](https://github.com/apache/incubator-seata/pull/3293)] 修复配置缓存获取值类型不匹配的问题
- [[#3241](https://github.com/apache/incubator-seata/pull/3241)] 禁止在多SQL的情况下使用 limit 和 order by 语法
- [[#3406](https://github.com/apache/incubator-seata/pull/3406)] 修复当config.txt中包含特殊字符时无法推送至 nacos 的问题
- [[#3367](https://github.com/apache/incubator-seata/pull/3367)] 修复最后一个XA分支二阶段时偶发无法回滚的异常
- [[#3418](https://github.com/apache/incubator-seata/pull/3418)] 修复 getGeneratedKeys 可能会取到历史的主键的问题
- [[#3448](https://github.com/apache/incubator-seata/pull/3448)] 修复多个锁竞争失败时，仅删除单个锁，并优化锁竞争逻辑提升处理性能
- [[#3408](https://github.com/apache/incubator-seata/pull/3408)] 修复jar运行模式第三方依赖分离打包时的NPE问题
- [[#3431](https://github.com/apache/incubator-seata/pull/3431)] 修复在读取配置时Property Bean可能未初始化的问题
- [[#3413](https://github.com/apache/incubator-seata/pull/3413)] 修复回滚到savepoint以及releaseSavepoint的逻辑
- [[#3451](https://github.com/apache/incubator-seata/pull/3451)] 修复autoCommit=true，全局锁竞争失败时的脏写问题
- [[#3481](https://github.com/apache/incubator-seata/pull/3481)] 修复当 consul client 抛出异常时导致刷新任务中断的问题
- [[#3491](https://github.com/apache/incubator-seata/pull/3491)] 修复README.md文件中的拼写错误
- [[#3531](https://github.com/apache/incubator-seata/pull/3531)] 修复RedisTransactionStoreManager 获取 brachTransaction 可能的 NPE 问题
- [[#3500](https://github.com/apache/incubator-seata/pull/3500)] 修复 oracle 和 postgreSql 无法获取 column info 的问题
- [[#3560](https://github.com/apache/incubator-seata/pull/3560)] 修复 Committing 状态的事务异步任务没有时间阈值和无法进行事务恢复的问题
- [[#3555](https://github.com/apache/incubator-seata/pull/3555)] 通过setBytes代替setBlob，避免高版本jdbc驱动工作异常
- [[#3540](https://github.com/apache/incubator-seata/pull/3540)] 修复server发布打包时缺失文件的问题
- [[#3597](https://github.com/apache/incubator-seata/pull/3597)] 修复可能的 NPE问题
- [[#3568](https://github.com/apache/incubator-seata/pull/3568)] 修复自动数据源代理因 ConcurrentHashMap.computeIfAbsent 导致的死锁问题
- [[#3402](https://github.com/apache/incubator-seata/pull/3402)] 修复更新SQL中字段名含有库名无法解析更新列的问题
- [[#3464](https://github.com/apache/incubator-seata/pull/3464)] 修复测试用例空指针异常和StackTraceLogger中错误的日志格式.
- [[#3522](https://github.com/apache/incubator-seata/pull/3522)] 修复当 DML 影响行数为0时注册分支和插入undo_log的问题
- [[#3635](https://github.com/apache/incubator-seata/pull/3635)] 修复zookeeper 配置变更无法推送通知的问题
- [[#3133](https://github.com/apache/incubator-seata/pull/3133)] 修复某些场景下无法重试全局锁的问题
- [[#3156](https://github.com/apache/incubator-seata/pull/3156)] 修复嵌套代理类无法 获取target的问题


### optimize：

- [[#3341](https://github.com/apache/incubator-seata/pull/3341)] 优化获取指定配置文件的路径格式问题
- [[#3385](https://github.com/apache/incubator-seata/pull/3385)] 优化 GitHub Actions 配置,修复单测失败问题
- [[#3175](https://github.com/apache/incubator-seata/pull/3175)] 支持雪花算法时钟回拨
- [[#3291](https://github.com/apache/incubator-seata/pull/3291)] 优化mysql连接参数
- [[#3336](https://github.com/apache/incubator-seata/pull/3336)] 支持使用System.getProperty获取Netty配置参数
- [[#3369](https://github.com/apache/incubator-seata/pull/3369)] 添加github action的dockerHub秘钥
- [[#3343](https://github.com/apache/incubator-seata/pull/3343)] 将CI程序从Travis CI迁移到Github Actions
- [[#3397](https://github.com/apache/incubator-seata/pull/3397)] 增加代码变更记录
- [[#3303](https://github.com/apache/incubator-seata/pull/3303)] 支持从nacos单一dataId中读取所有配置
- [[#3380](https://github.com/apache/incubator-seata/pull/3380)] 优化 globalTransactionScanner 中的 DISABLE_GLOBAL_TRANSACTION listener
- [[#3123](https://github.com/apache/incubator-seata/pull/3123)] 优化 seata-server 打包策略
- [[#3415](https://github.com/apache/incubator-seata/pull/3415)] 优化 maven 打包时清除 distribution 目录
- [[#3316](https://github.com/apache/incubator-seata/pull/3316)] 优化读取配置值时属性bean未初始化的问题
- [[#3420](https://github.com/apache/incubator-seata/pull/3420)] 优化枚举类的使用并添加单元测试
- [[#3533](https://github.com/apache/incubator-seata/pull/3533)] 支持获取当前事务角色
- [[#3436](https://github.com/apache/incubator-seata/pull/3436)] 优化SQLType类中的错别字
- [[#3439](https://github.com/apache/incubator-seata/pull/3439)] 调整springApplicationContextProvider order以使其可以在xml bean之前被调用
- [[#3248](https://github.com/apache/incubator-seata/pull/3248)] 优化负载均衡配置迁移到client节点下
- [[#3441](https://github.com/apache/incubator-seata/pull/3441)] 优化starter的自动配置处理
- [[#3466](https://github.com/apache/incubator-seata/pull/3466)] 优化使用equalsIgnoreCase() 进行字符串比较
- [[#3476](https://github.com/apache/incubator-seata/pull/3476)] 支持 server 参数传入hostname时自动将其转换为 ip
- [[#3236](https://github.com/apache/incubator-seata/pull/3236)] 优化执行解锁操作的条件，减少不必要的 unlock 操作
- [[#3485](https://github.com/apache/incubator-seata/pull/3485)] 删除 ConfigurationFactory 中无用的代码
- [[#3505](https://github.com/apache/incubator-seata/pull/3505)] 删除 GlobalTransactionScanner 中无用的 if 判断
- [[#3544](https://github.com/apache/incubator-seata/pull/3544)] 优化无法通过Statement#getGeneratedKeys时，只能获取到批量插入的第一个主键的问题
- [[#3549](https://github.com/apache/incubator-seata/pull/3549)] 统一DB存储模式下不同表中的xid字段的长度
- [[#3551](https://github.com/apache/incubator-seata/pull/3551)] 调大RETRY_DEAD_THRESHOLD的值以及设置成可配置
- [[#3589](https://github.com/apache/incubator-seata/pull/3589)] 使用JUnit API做异常检查
- [[#3601](https://github.com/apache/incubator-seata/pull/3601)] 使`LoadBalanceProperties`与`spring-boot:2.x`及以上版本兼容
- [[#3513](https://github.com/apache/incubator-seata/pull/3513)] Saga SpringBeanService调用器支持切换 json 解析器
- [[#3318](https://github.com/apache/incubator-seata/pull/3318)] 支持 CLIENT_TABLE_META_CHECKER_INTERVAL 可配置化
- [[#3371](https://github.com/apache/incubator-seata/pull/3371)] 支持 metric 按 applicationId 分组
- [[#3459](https://github.com/apache/incubator-seata/pull/3459)] 删除重复的ValidadAddress代码
- [[#3215](https://github.com/apache/incubator-seata/pull/3215)] 优化seata-server 在file模式下启动时的reload逻辑
- [[#3631](https://github.com/apache/incubator-seata/pull/3631)] 优化 nacos-config.py 脚本的入参问题
- [[#3638](https://github.com/apache/incubator-seata/pull/3638)] 优化 update 和 delete 的 SQL 不支持 join 的错误提示
- [[#3523](https://github.com/apache/incubator-seata/pull/3523)] 优化当使用oracle时调用releaseSavepoint()方法报异常的问题
- [[#3458](https://github.com/apache/incubator-seata/pull/3458)] 还原已删除的md
- [[#3574](https://github.com/apache/incubator-seata/pull/3574)] 修复EventBus.java文件中注释拼写错误
- [[#3573](https://github.com/apache/incubator-seata/pull/3573)] 修复 README.md 文件中设计器路径错误
- [[#3662](https://github.com/apache/incubator-seata/pull/3662)] 更新gpg密钥对
- [[#3664](https://github.com/apache/incubator-seata/pull/3664)] 优化 javadoc
- [[#3637](https://github.com/apache/incubator-seata/pull/3637)] 登记使用seata的公司和1.4.2版本包含的新增pr信息

### test

- [[#3381](https://github.com/apache/incubator-seata/pull/3381)] 添加 TmClient 的测试用例
- [[#3607](https://github.com/apache/incubator-seata/pull/3607)] 修复 EventBus 的单元测试问题
- [[#3579](https://github.com/apache/incubator-seata/pull/3579)] 添加 StringFormatUtils 测试用例
- [[#3365](https://github.com/apache/incubator-seata/pull/3365)] 修复ParameterParserTest测试用例
- [[#3359](https://github.com/apache/incubator-seata/pull/3359)] 删除未使用的测试用例
- [[#3383](https://github.com/apache/incubator-seata/pull/3383)] 优化StatementProxyTest单元测试
- [[#3578](https://github.com/apache/incubator-seata/pull/3578)] 修复单元测试case里的UnfinishedStubbing异常


非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。

- [slievrly](https://github.com/slievrly)
- [caohdgege](https://github.com/caohdgege)
- [funky-eyes](https://github.com/funky-eyes)
- [wangliang181230](https://github.com/wangliang181230)
- [xingfudeshi](https://github.com/xingfudeshi)
- [jsbxyyx](https://github.com/jsbxyyx)
- [selfishlover](https://github.com/selfishlover)
- [l8189352](https://github.com/l81893521)
- [Rubbernecker](https://github.com/Rubbernecker)
- [lj2018110133](https://github.com/lj2018110133)
- [github-ganyu](https://github.com/github-ganyu)
- [dmego](https://github.com/dmego)
- [spilledyear](https://github.com/spilledyear)
- [hoverruan](https://github.com/hoverruan )
- [anselleeyy](https://github.com/anselleeyy)
- [Ifdevil](https://github.com/Ifdevil)
- [lvxianzheng](https://github.com/lvxianzheng)
- [MentosL](https://github.com/MentosL)
- [lian88jian](https://github.com/lian88jian)
- [litianyu1992](https://github.com/litianyu1992)
- [xyz327](https://github.com/xyz327)
- [13414850431](https://github.com/13414850431)
- [xuande](https://github.com/xuande)
- [tanggen](https://github.com/tanggen)
- [eas5](https://github.com/eas5)
- [nature80](https://github.com/nature80)
- [ls9527](https://github.com/ls9527)
- [drgnchan](https://github.com/drgnchan)
- [imyangyong](https://github.com/imyangyong)
- [sunlggggg](https://github.com/sunlggggg)
- [long187](https://github.com/long187)
- [h-zhi](https://github.com/h-zhi)
- [StellaiYang](https://github.com/StellaiYang)
- [slinpq](https://github.com/slinpq)
- [sustly](https://github.com/sustly)
- [cznc](https://github.com/cznc)
- [squallliu](https://github.com/squallliu)
- [81519434](https://github.com/81519434)
- [luoxn28](https://github.com/luoxn28)


同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。

#### Link

- **Seata:** https://github.com/apache/incubator-seata
- **Seata-Samples:** https://github.com/apache/incubator-seata-samples
- **Release:** https://github.com/apache/incubator-seata/releases
- **WebSite:** https://seata.io

</details>


### 1.4.1 (2021-02-08)

[source](https://github.com/apache/incubator-seata/archive/v1.4.1.zip) |
[binary](https://github.com/apache/incubator-seata/releases/download/v1.4.1/seata-server-1.4.1.zip)

<details>
  <summary><mark>Release notes</mark></summary>


### Seata 1.4.1

Seata 1.4.1 发布。

Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

此版本更新如下：

### feature：

- [[#3238](https://github.com/apache/incubator-seata/pull/3238)] 添加deflater压缩算法支持

### bugfix：

- [[#2879](https://github.com/apache/incubator-seata/pull/2879)] 修复springboot项目启动过程中可能产生死锁的问题
- [[#3296](https://github.com/apache/incubator-seata/pull/3296)] 修复当AT模式和TCC模式混用的时候，AT的分支无法被删除
- [[#3254](https://github.com/apache/incubator-seata/pull/3254)] 在调用恢复在恢复之前清除监听器映射
- [[#3309](https://github.com/apache/incubator-seata/pull/3309)] 修复Saga状态机无法使用Jackson parser以及当没有选择正确的状态会抛出NPE的问题
- [[#3287](https://github.com/apache/incubator-seata/pull/3287)] 修复当更新主键时抛出异常
- [[#3323](https://github.com/apache/incubator-seata/pull/3323)] Saga模式下创建状态机实例并存入数据库时出现异常，移除xid和branchType，避免影响其他事务执行
- [[#3281](https://github.com/apache/incubator-seata/pull/3281)] 修复Saga模式下，分支事务启动异常，上报TC状态不正确
- [[#2949](https://github.com/apache/incubator-seata/pull/2949)] 修复当获取state列表时的NPE
- [[#3351](https://github.com/apache/incubator-seata/pull/3351)] 修复使用hystrix和SCA 2.2.3.RELEASE及以下版本时抛出IllegalArgumentException异常的问题
- [[#3349](https://github.com/apache/incubator-seata/pull/3349)] 修复测试用例中的问题
- [[#3325](https://github.com/apache/incubator-seata/pull/3325)] 修复找不到上一次子状态机实例，导致重试一直失败问题
- [[#3357](https://github.com/apache/incubator-seata/pull/3357)] 修复发布规则检测失败的问题


### optimize：

- [[#3188](https://github.com/apache/incubator-seata/pull/3188)] 优化检查队列offer的返回值
- [[#3247](https://github.com/apache/incubator-seata/pull/3247)] 把client.log.exceptionRate配置移动到log.exceptionRate
- [[#3260](https://github.com/apache/incubator-seata/pull/3260)] 通过PriorityQueue来简化ShutdownHook的代码
- [[#3319](https://github.com/apache/incubator-seata/pull/3319)] 删除无用的@Sharable
- [[#3313](https://github.com/apache/incubator-seata/pull/3313)] 把StringBuffer替换成StringBuilder
- [[#3335](https://github.com/apache/incubator-seata/pull/3335)] 把TransactionPropagationIntercepter重命名为TransactionPropagationInterceptor
- [[#3310](https://github.com/apache/incubator-seata/pull/3310)] 支持NamedThreadFactory从SecurityManager或当前线程中获取ThreadGroup
- [[#3320](https://github.com/apache/incubator-seata/pull/3320)] 使用常量去优化负载均衡配置策略的可读性
- [[#3345](https://github.com/apache/incubator-seata/pull/3345)] 调整GlobalLockTemplateTest的测试用例


非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。

- [slievrly](https://github.com/slievrly)
- [dongzl](https://github.com/dongzl)
- [wangliang181230](https://github.com/wangliang181230)
- [ls9527](https://github.com/ls9527)
- [long187](https://github.com/long187)
- [81519434](https://github.com/81519434)
- [anselleeyy](https://github.com/anselleeyy)
- [funky-eyes](https://github.com/funky-eyes)
- [selfishlover](https://github.com/selfishlover)
- [suichen](https://github.com/suichen)
- [h-zhi](https://github.com/h-zhi)
- [jxlgzwh](https://github.com/jxlgzwh)
- [LiWenGu](https://github.com/LiWenGu)

同时，我们收到了社区反馈的很多有价值的issue和建议，非常感谢大家。

#### Link

- **Seata:** https://github.com/apache/incubator-seata
- **Seata-Samples:** https://github.com/apache/incubator-seata-samples
- **Release:** https://github.com/apache/incubator-seata/releases
- **WebSite:** https://seata.io

</details>


### 1.4.0 (2020-10-30)

 [source](https://github.com/apache/incubator-seata/archive/v1.4.0.zip) |
 [binary](https://github.com/apache/incubator-seata/releases/download/v1.4.0/seata-server-1.4.0.zip) 

<details>
  <summary><mark>Release notes</mark></summary>


  ### Seata 1.4.0

  Seata 1.4.0 发布。
  
  Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。
  
  此版本更新如下：

  ### feature：
  
   - [[#2380](https://github.com/apache/incubator-seata/pull/2380)] 支持yml配置文件
   - [[#3191](https://github.com/apache/incubator-seata/pull/3191)] 支持oracle nclob类型
   - [[#2676](https://github.com/apache/incubator-seata/pull/2676)] 支持客户端最少的活动负载均衡
   - [[#2080](https://github.com/apache/incubator-seata/pull/2080)] 支持客户端一致性哈希的负载均衡
   - [[#3198](https://github.com/apache/incubator-seata/pull/3198)] 支持Spring Boot 使用自定义配置中心和注册中心
   - [[#2806](https://github.com/apache/incubator-seata/pull/2806)] 支持配置默认全局事务超时时间
   - [[#2941](https://github.com/apache/incubator-seata/pull/2941)] 支持apollo密钥key配置
   - [[#2950](https://github.com/apache/incubator-seata/pull/2950)] 支持redis存储模式可重入锁
   - [[#2913](https://github.com/apache/incubator-seata/pull/2913)] 支持配置AT或XA事务模式的数据源代理
   - [[#2856](https://github.com/apache/incubator-seata/pull/2856)] 支持undo_log 使用 fst 序列化
   - [[#3076](https://github.com/apache/incubator-seata/pull/3076)] 支持 GlobalLock 锁重试
   - [[#2825](https://github.com/apache/incubator-seata/pull/2825)] 支持客户端发送鉴权信息
   - [[#2962](https://github.com/apache/incubator-seata/pull/2962)] 支持在 @GlobalTransactional和@GlobalLock 注解上锁的重试配置
  
  
  ### bugfix：
  
   - [[#3214](https://github.com/apache/incubator-seata/pull/3214)] 修复在某些情况下'RootContext.DEFAULT_BRANCH_TYPE' 的取值错误的问题
    - [[#3129](https://github.com/apache/incubator-seata/pull/3129)] 修复禁止执行更新主键值的SQL
    - [[#3205](https://github.com/apache/incubator-seata/pull/3205)] 修复在配置中获取boolean类型配置异常
    - [[#3170](https://github.com/apache/incubator-seata/pull/3170)] 修复Disposable 同优先级的无法执行的问题
    - [[#3180](https://github.com/apache/incubator-seata/pull/3180)] 修复fst序列化包名错误
    - [[#3178](https://github.com/apache/incubator-seata/pull/3178)] 修复sqlparser 换行替换为空格问题
    - [[#2929](https://github.com/apache/incubator-seata/pull/2929)] 修复将应用配置为在启动时降级但在运行中无法升级问题
    - [[#3050](https://github.com/apache/incubator-seata/pull/3050)] 修复update和delete不支持order，limit语法问题
    - [[#2935](https://github.com/apache/incubator-seata/pull/2935)] 修复了Saga Designer在切换节点时属性框不会切换的问题
    - [[#3140](https://github.com/apache/incubator-seata/pull/3140)] 修复`Propagation.REQUIRES_NEW`无效的问题
    - [[#3130](https://github.com/apache/incubator-seata/pull/3130)] 修复数据源多重代理和使用非代理类方法的问题
    - [[#3148](https://github.com/apache/incubator-seata/pull/3148)] 修复 Redis 存储模式下lock和session存储时key冲突问题
    - [[#3136](https://github.com/apache/incubator-seata/pull/3136)] 修复Redis pipeline执行报错问题
    - [[#2551](https://github.com/apache/incubator-seata/pull/2551)] 修复当使用AT数据源代理时Saga事务模式无法使用的问题
    - [[#3073](https://github.com/apache/incubator-seata/pull/3073)] 修复在没有xid的情况下使用XA模式的问题
    - [[#3074](https://github.com/apache/incubator-seata/pull/3074)] 修复若XA模式找不到 xid 重试问题
    - [[#3097](https://github.com/apache/incubator-seata/pull/3097)] 修复HttpAutoConfiguration只在springboot web项目中启动
    - [[#3071](https://github.com/apache/incubator-seata/pull/3071)] 修复XA 模式中无法获取真实连接的问题
    - [[#3056](https://github.com/apache/incubator-seata/pull/3056)] 修复了删除分支后仍然存在分支锁的错误
    - [[#3025](https://github.com/apache/incubator-seata/pull/3025)] 修复错误的包装路径问题
    - [[#3031](https://github.com/apache/incubator-seata/pull/3031)] 修复 redis 存储模式锁删除锁不完整问题
    - [[#2973](https://github.com/apache/incubator-seata/pull/2973)] 修复oracle数据库 where in 超过1000的问题
    - [[#2986](https://github.com/apache/incubator-seata/pull/2986)] 修复 checkstyle插件无法排除单个文件的问题
    - [[#2910](https://github.com/apache/incubator-seata/pull/2910)] 修复错误的注释 
    - [[#2914](https://github.com/apache/incubator-seata/pull/2914)] 修复TCC模式下，调用方未清除branchType的问题
    - [[#2926](https://github.com/apache/incubator-seata/pull/2926)] 修复 fastjson 序列化不记录类名的问题
    - [[#2897](https://github.com/apache/incubator-seata/pull/2897)] 修复Jedis删除锁失败的问题 
    - [[#2918](https://github.com/apache/incubator-seata/pull/2918)] 修复 AT 模式下回滚时的未加锁的问题
    - [[#2972](https://github.com/apache/incubator-seata/pull/2972)] 修复UUIDGenerator高并发下生成重复的id问题
    - [[#2932](https://github.com/apache/incubator-seata/pull/2932)] 修复nacos-config.py 不支持namespace 问题
    - [[#2900](https://github.com/apache/incubator-seata/pull/2900)] 修复数据库转义符问题
    - [[#2904](https://github.com/apache/incubator-seata/pull/2904)] 修复getConfig配置不存在获取到null的问题
    - [[#2890](https://github.com/apache/incubator-seata/pull/2890)] 修复statelang示例中的拼写错误
    - [[#3040](https://github.com/apache/incubator-seata/pull/3040)] 修复 autocommit=false时的重复提交问题
    - [[#3230](https://github.com/apache/incubator-seata/pull/3230)] 修复使用@EnableAutoDataSourceProxy启动失败问题
    - [[#2979](https://github.com/apache/incubator-seata/pull/2979)] 修复与sharedjdbc集成postgresql 无法获取元数据问题
    - [[#3233](https://github.com/apache/incubator-seata/pull/3233)] 修复Collections空指针异常
    - [[#3242](https://github.com/apache/incubator-seata/pull/3242)] 修复批处理SQL获取TableMeta错误问题
  
  
   ### optimize:
  
   - [[#3201](https://github.com/apache/incubator-seata/pull/3201)] 修复异常时报错堆栈显示不全的问题
   - [[#3062](https://github.com/apache/incubator-seata/pull/3062)] 重构Redis存储模式下session的存储结构 
   - [[#3117](https://github.com/apache/incubator-seata/pull/3117)] 优化日志输出以及清除无用代码
   - [[#3134](https://github.com/apache/incubator-seata/pull/3134)] 优化Map 和 List 相关写法
   - [[#3195](https://github.com/apache/incubator-seata/pull/3195)] 优化 XID 相关的代码写法
   - [[#3200](https://github.com/apache/incubator-seata/pull/3200)] 优化 rpc 日志提示
   - [[#3186](https://github.com/apache/incubator-seata/pull/3186)] 移除 StringUtils 的重复代码
   - [[#3162](https://github.com/apache/incubator-seata/pull/3162)] 删除重复的代码
   - [[#2969](https://github.com/apache/incubator-seata/pull/2969)] 升级druid的依赖到1.1.23
   - [[#3141](https://github.com/apache/incubator-seata/pull/3141)] 升级Nacos和FastJSON的依赖版本
   - [[#3118](https://github.com/apache/incubator-seata/pull/3118)] 添加`additional-spring-configuration-metadata.json` 配置提示信息
   - [[#2597](https://github.com/apache/incubator-seata/pull/2597)]  优化web拦截器中的xid状态避免重复处理
   - [[#3102](https://github.com/apache/incubator-seata/pull/3102)] 优化ContextCore 接口可设置非 String 类型的值
   - [[#3016](https://github.com/apache/incubator-seata/pull/3016)] 重构 Redis 存储模式下 的lock的存储结构 
   - [[#3046](https://github.com/apache/incubator-seata/pull/3046)] 删除SerializerFactory类
   - [[#3053](https://github.com/apache/incubator-seata/pull/3053)] 支持 TC端jedis连接池最大数量配置
   - [[#3012](https://github.com/apache/incubator-seata/pull/3012)] 移除重复设置端口的代码
   - [[#2978](https://github.com/apache/incubator-seata/pull/2978)] 优化AT和TCC 事务模式混用时，AT模式可异步提交
   - [[#2967](https://github.com/apache/incubator-seata/pull/2967)] 优化代码为lambda风格
   - [[#2968](https://github.com/apache/incubator-seata/pull/2968)] 优化在RM客户端初始化后发送注册消息
   - [[#2945](https://github.com/apache/incubator-seata/pull/2945)] 优化DB存储模式异步提交，减少更新操作
   - [[#2952](https://github.com/apache/incubator-seata/pull/2952)] 支持 additional-spring-configuration-metadata.json配置提示信息
   - [[#2920](https://github.com/apache/incubator-seata/pull/2920)] 修正 README.md 中的单词和语法错误
   - [[#3222](https://github.com/apache/incubator-seata/pull/3222)] 优化fileListener的CPU利用率
   - [[#2843](https://github.com/apache/incubator-seata/pull/2843)] 移除 redis和db 存储模式的中移除接口Reloadable 和 重构 reload`方法 
   - [[#3209](https://github.com/apache/incubator-seata/pull/3209)] 新增使用用户 logo 信息


  非常感谢以下 contributors 的代码贡献。若有无意遗漏，请报告。 

  - [slievrly](https://github.com/slievrly) 
  - [wangliang181230](https://github.com/wangliang181230) 
  - [funky-eyes](https://github.com/funky-eyes) 
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

   - **Seata:** https://github.com/apache/incubator-seata  
   - **Seata-Samples:** https://github.com/apache/incubator-seata-samples   
   - **Release:** https://github.com/apache/incubator-seata/releases
   - **WebSite:** https://seata.io

</details>
