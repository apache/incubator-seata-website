---
title: Downloads
keywords: [Seata, Downloads, Version]
description: This article will introduce you how to understand the details of each version and upgrade matters needing attention.
---


# Downloads

# Seata

> GitHub: https://github.com/seata/seata
>
> Release Notes: https://github.com/seata/seata/releases

### 1.4.2 (2021-04-26)

[source](https://github.com/seata/seata/archive/v1.4.2.zip) |
[binary](https://github.com/seata/seata/releases/download/v1.4.2/seata-server-1.4.2.zip)

<details>
  <summary><mark>Release notes</mark></summary>


### Seata 1.4.2

Seata 1.4.2 Released.

Seata is an easy-to-use, high-performance, open source distributed transaction solution.

The version is updated as follows:

### feature：

- [[#2933](https://github.com/seata/seata/pull/2933)] add antlr for mysql sqlparser
- [[#3228](https://github.com/seata/seata/pull/3228)] support custom serialization plugin
- [[#3172](https://github.com/seata/seata/pull/3172)] support undo_loge compression mode in AT
- [[#3372](https://github.com/seata/seata/pull/3372)] Saga support customize whether update last retry log
- [[#3411](https://github.com/seata/seata/pull/3411)] support seata-server thread pool parameters configuration
- [[#3348](https://github.com/seata/seata/pull/3348)] support redis sentinel storage mode in TC
- [[#2667](https://github.com/seata/seata/pull/2667)] support password decryption	when using db and redis storage mode
- [[#3427](https://github.com/seata/seata/pull/3427)] add distributed lock interface
- [[#3443](https://github.com/seata/seata/pull/3443)] support send the `seata-server` log to `logstash` or `kafka`
- [[#3486](https://github.com/seata/seata/pull/3486)] add transaction service group for metric
- [[#3317](https://github.com/seata/seata/pull/3317)] support to obtain multiple configurations through a single node when using zookeeper as configuration center
- [[#3516](https://github.com/seata/seata/pull/3516)] support acl-token when consul is used registry and configuration center
- [[#3116](https://github.com/seata/seata/pull/3116)] support configuring apollo configService and cluster
- [[#3468](https://github.com/seata/seata/pull/3468)] saga support loop execution on state
- [[#3447](https://github.com/seata/seata/pull/3447)] support Transaction context printing in logging framework


### bugfix：

- [[#3258](https://github.com/seata/seata/pull/3258)] fix AsyncWorker potential OOM problem
- [[#3293](https://github.com/seata/seata/pull/3293)] fix configuration cache get value type mismatch exception
- [[#3241](https://github.com/seata/seata/pull/3241)] forbidden use order by or limit in multi sql
- [[#3406](https://github.com/seata/seata/pull/3406)] fix the value can not be push to nacos when special charset in config.txt
- [[#3418](https://github.com/seata/seata/pull/3418)] fix getGeneratedKeys may get history pk
- [[#3408](https://github.com/seata/seata/pull/3408)] fix the NPE problem of jar running mode when the third-dependency on separate packaging
- [[#3431](https://github.com/seata/seata/pull/3431)] fix property bean may not be initialized when reading configuration
- [[#3413](https://github.com/seata/seata/pull/3413)] fix the logic of rollback to savepoint and release to savepoint
- [[#3367](https://github.com/seata/seata/pull/3367)] when the xa branch is rollback, it cannot be executed due to idle state
- [[#3448](https://github.com/seata/seata/pull/3448)] reduce unnecessary competition and remove missing locks
- [[#3451](https://github.com/seata/seata/pull/3451)] fix set auto-commit to true when local transactions are not being used. Failure to compete for a lock causes the global transaction to exit, invaliding the global row lock and dirty writing of the data.
- [[#3481](https://github.com/seata/seata/pull/3481)] fix seata node refresh failure because of consul client throws exceptions
- [[#3491](https://github.com/seata/seata/pull/3491)] fix typo in README.md
- [[#3531](https://github.com/seata/seata/pull/3531)] fix the NPE of RedisTransactionStoreManager when get branch transactions
- [[#3500](https://github.com/seata/seata/pull/3500)] fix oracle and postgreSQL can't query column info
- [[#3560](https://github.com/seata/seata/pull/3560)] fix the problem that the asynchronous task of the transactions in the committing state has no time threshold and cannot recover the transaction
- [[#3555](https://github.com/seata/seata/pull/3555)] do not call setBlob to invalid the jdbc exception
- [[#3540](https://github.com/seata/seata/pull/3540)] fix server distribution missing files
- [[#3597](https://github.com/seata/seata/pull/3597)] fix the possible NPE
- [[#3568](https://github.com/seata/seata/pull/3568)] fix automatic datasource agent caused by ConcurrentHashMap.computeIfAbsent Deadlock problem
- [[#3402](https://github.com/seata/seata/pull/3402)] fix the problem that the updated column cannot be resolved because the field name in the updated SQL contains the database name
- [[#3464](https://github.com/seata/seata/pull/3464)] fix test case NPE and StackTraceLogger's log.
- [[#3522](https://github.com/seata/seata/pull/3522)] fix register branch and store undolog when AT branch does not need compete lock
- [[#3635](https://github.com/seata/seata/pull/3635)] fix pushing notification failed when the configuration changed in zookeeper
- [[#3133](https://github.com/seata/seata/pull/3133)] fix the case that could not retry acquire global lock
- [[#3156](https://github.com/seata/seata/pull/3156)] optimize the logic of SpringProxyUtils.findTargetClass


### optimize：

- [[#3341](https://github.com/seata/seata/pull/3341)] optimize the format of the path to the specified configuration file
- [[#3385](https://github.com/seata/seata/pull/3385)] optimize github action and fix unit test failure
- [[#3175](https://github.com/seata/seata/pull/3175)] improve UUIDGenerator using "history time" version of snowflake algorithm
- [[#3291](https://github.com/seata/seata/pull/3291)] mysql jdbc connect param
- [[#3336](https://github.com/seata/seata/pull/3336)] support using System.getProperty to get netty config property
- [[#3369](https://github.com/seata/seata/pull/3369)] add github action secrets env for dockerHub
- [[#3343](https://github.com/seata/seata/pull/3343)] Migrate CI provider from Travis CI to Github Actions
- [[#3397](https://github.com/seata/seata/pull/3397)] add the change records folder
- [[#3303](https://github.com/seata/seata/pull/3303)] supports reading all configurations from a single Nacos dataId
- [[#3380](https://github.com/seata/seata/pull/3380)] globalTransactionScanner listener optimize
- [[#3123](https://github.com/seata/seata/pull/3123)] optimize the packing strategy of seata-server
- [[#3415](https://github.com/seata/seata/pull/3415)] optimize maven clean plugin to clear the distribution directory
- [[#3316](https://github.com/seata/seata/pull/3316)] optimize the property bean may not be initialized while reading config value
- [[#3420](https://github.com/seata/seata/pull/3420)] optimize enumerated classes and add unit tests
- [[#3533](https://github.com/seata/seata/pull/3533)] added interface to get current transaction role
- [[#3436](https://github.com/seata/seata/pull/3436)] optimize typo in SQLType class
- [[#3439](https://github.com/seata/seata/pull/3439)] adjust the order of springApplicationContextProvider so that it can be called before the XML bean
- [[#3248](https://github.com/seata/seata/pull/3248)] optimize the config of load-balance migration to belong the client node
- [[#3441](https://github.com/seata/seata/pull/3441)] optimize the auto-configuration processing of starter
- [[#3466](https://github.com/seata/seata/pull/3466)] String comparison uses equalsIgnoreCase()
- [[#3476](https://github.com/seata/seata/pull/3476)] support when the server parameter passed is hostname, it will be automatically converted to IP
- [[#3236](https://github.com/seata/seata/pull/3236)] optimize the conditions for executing unlocking
- [[#3485](https://github.com/seata/seata/pull/3485)] optimize useless codes in ConfigurationFactory
- [[#3505](https://github.com/seata/seata/pull/3505)] optimize useless if judgments in the GlobalTransactionScanner class
- [[#3544](https://github.com/seata/seata/pull/3544)] optimize the get pks by auto when auto generated keys is false
- [[#3549](https://github.com/seata/seata/pull/3549)] unified the length of xid in different tables when using DB storage mode
- [[#3551](https://github.com/seata/seata/pull/3551)] make RETRY_DEAD_THRESHOLD bigger and configurable
- [[#3589](https://github.com/seata/seata/pull/3589)] Changed exception check by JUnit API usage
- [[#3601](https://github.com/seata/seata/pull/3601)] make `LoadBalanceProperties` compatible with `spring-boot:2.x` and above
- [[#3513](https://github.com/seata/seata/pull/3513)] Saga SpringBeanService invoker support switch json parser
- [[#3318](https://github.com/seata/seata/pull/3318)] make CLIENT_TABLE_META_CHECKER_INTERVAL configurable
- [[#3371](https://github.com/seata/seata/pull/3371)] add applicationId for metric
- [[#3459](https://github.com/seata/seata/pull/3459)] remove duplicate validAddress code
- [[#3215](https://github.com/seata/seata/pull/3215)] opt the reload during startup in file mode
- [[#3631](https://github.com/seata/seata/pull/3631)] optimize  nacos-config.py  parameter
- [[#3638](https://github.com/seata/seata/pull/3638)] optimize the error when use update or delete with join in sql
- [[#3523](https://github.com/seata/seata/pull/3523)] optimize release savepoint when use oracle
- [[#3458](https://github.com/seata/seata/pull/3458)] reversion the deleted md
- [[#3574](https://github.com/seata/seata/pull/3574)] repair Spelling errors in comments in EventBus.java files
- [[#3573](https://github.com/seata/seata/pull/3573)] fix designer directory path in README.md
- [[#3662](https://github.com/seata/seata/pull/3662)] update gpg key
- [[#3664](https://github.com/seata/seata/pull/3664)] optimize some javadocs
- [[#3637](https://github.com/seata/seata/pull/3637)] register the participating companies and  pull request information

### test

- [[#3381](https://github.com/seata/seata/pull/3381)] test case for tmClient
- [[#3607](https://github.com/seata/seata/pull/3607)] fixed bugs in EventBus unit tests
- [[#3579](https://github.com/seata/seata/pull/3579)] add test case for StringFormatUtils
- [[#3365](https://github.com/seata/seata/pull/3365)] optimize ParameterParserTest test case failed
- [[#3359](https://github.com/seata/seata/pull/3359)] remove unused test case
- [[#3578](https://github.com/seata/seata/pull/3578)] fix UnfinishedStubbing Exception in unit test case
- [[#3383](https://github.com/seata/seata/pull/3383)] optimize StatementProxyTest unit test



Thanks to these contributors for their code commits. Please report an unintended omission.

- [slievrly](https://github.com/slievrly)
- [caohdgege](https://github.com/caohdgege)
- [a364176773](https://github.com/a364176773)
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

Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.
</details>

### 1.4.1 (2021-02-08)

[source](https://github.com/seata/seata/archive/v1.4.1.zip) |
[binary](https://github.com/seata/seata/releases/download/v1.4.1/seata-server-1.4.1.zip)

<details>
  <summary><mark>Release notes</mark></summary>


### Seata 1.4.1

Seata 1.4.1 Released.

Seata is an easy-to-use, high-performance, open source distributed transaction solution.

The version is updated as follows:

### feature：

- [[#3238](https://github.com/seata/seata/pull/3238)] add deflater support for seata compressor


### bugfix：

- [[#2879](https://github.com/seata/seata/pull/2879)] fix deadlock during springboot project startup
- [[#3296](https://github.com/seata/seata/pull/3296)] when mixed use of AT and TCC, AT branchs is not deleted
- [[#3254](https://github.com/seata/seata/pull/3254)] clear the listener map of zk registry
- [[#3309](https://github.com/seata/seata/pull/3309)] Saga statemachine definition json cannot enable jackson parser, and when no choice matched in choice state will throw NPE
- [[#3287](https://github.com/seata/seata/pull/3287)] throw exception when update pk
- [[#3323](https://github.com/seata/seata/pull/3323)] clean root context when state machine inst record failed
- [[#3281](https://github.com/seata/seata/pull/3281)] fix wrong status when exception
- [[#2949](https://github.com/seata/seata/pull/2949)] fix throw NPE when get the state list
- [[#3351](https://github.com/seata/seata/pull/3351)] fix throw IllegalArgumentException when use hystrix when using SCA 2.2.3.RELEASE and below
- [[#3349](https://github.com/seata/seata/pull/3349)] the problem test case
- [[#3325](https://github.com/seata/seata/pull/3325)] fix retry commit unsuccess when record subMachineInst failed
- [[#3357](https://github.com/seata/seata/pull/3357)] fix deploy staging rule check failed


### optimize：

- [[#3188](https://github.com/seata/seata/pull/3188)] Local variable 'map' is redundant and check queue offer return value
- [[#3247](https://github.com/seata/seata/pull/3247)] change client.log.exceptionRate to log.exceptionRate
- [[#3260](https://github.com/seata/seata/pull/3260)] use PriorityQueue to simply ShutdownHook
- [[#3319](https://github.com/seata/seata/pull/3319)] delete unnecessary @Sharable
- [[#3313](https://github.com/seata/seata/pull/3313)] replace StringBuffer to StringBuilder
- [[#3335](https://github.com/seata/seata/pull/3335)] modify TransactionPropagationInterceptor name
- [[#3310](https://github.com/seata/seata/pull/3310)] enable NamedThreadFactory to get ThreadGroup from the SecurityManager or Current thread
- [[#3320](https://github.com/seata/seata/pull/3320)] load balance strategy use constants
- [[#3345](https://github.com/seata/seata/pull/3345)] adjust GlobalLockTemplateTest


Thanks to these contributors for their code commits. Please report an unintended omission.

- [slievrly](https://github.com/slievrly)
- [dongzl](https://github.com/dongzl)
- [wangliang181230](https://github.com/wangliang181230)
- [ls9527](https://github.com/ls9527)
- [long187](https://github.com/long187)
- [81519434](https://github.com/81519434)
- [anselleeyy](https://github.com/anselleeyy)
- [a364176773](https://github.com/a364176773)
- [selfishlover](https://github.com/selfishlover)
- [suichen](https://github.com/suichen)
- [h-zhi](https://github.com/h-zhi)
- [jxlgzwh](https://github.com/jxlgzwh)
- [LiWenGu](https://github.com/LiWenGu)

Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.


#### Link

- **Seata:** https://github.com/seata/seata
- **Seata-Samples:** https://github.com/seata/seata-samples
- **Release:** https://github.com/seata/seata/releases
- **WebSite:** https://seata.io

</details>

### 1.4.0 (2020-10-30)

 [source](https://github.com/seata/seata/archive/v1.4.0.zip) |
 [binary](https://github.com/seata/seata/releases/download/v1.4.0/seata-server-1.4.0.zip) 

<details>
  <summary><mark>Release notes</mark></summary>


  ### Seata 1.4.0

  Seata 1.4.0 Released.

  Seata is an easy-to-use, high-performance, open source distributed transaction solution.

  The version is updated as follows:
   
  ### feature：
  - [[#2380](https://github.com/seata/seata/pull/2380)] support yml configuration
  - [[#3191](https://github.com/seata/seata/pull/3191)] support jdbc type nclob
  - [[#2676](https://github.com/seata/seata/pull/2676)] support least active load balance
  - [[#3198](https://github.com/seata/seata/pull/3198)] spring boot support for custom config and registry type
  - [[#2806](https://github.com/seata/seata/pull/2806)] support configuring default global transaction timeoutMillis
  - [[#2941](https://github.com/seata/seata/pull/2941)] add apollo secret key configuration
  - [[#2080](https://github.com/seata/seata/pull/2080)] support ConsistentHashLoadBalance
  - [[#2950](https://github.com/seata/seata/pull/2950)] support the reentrant lock in redis module
  - [[#2913](https://github.com/seata/seata/pull/2913)] The data source proxy mode can be selected as AT or XA
  - [[#2856](https://github.com/seata/seata/pull/2856)] support for undoLog using Fst serialization
  - [[#3076](https://github.com/seata/seata/pull/3076)] check lock in TC when use @GlobalLock
  - [[#2825](https://github.com/seata/seata/pull/2825)] support send authentication msg
  - [[#2962](https://github.com/seata/seata/pull/2962)] @GlobalTransactional and @GlobalLock can support customize lock retry config
  
  ### bugfix：
  - [[#3214](https://github.com/seata/seata/pull/3214)] fix the 'RootContext.DEFAULT_BRANCH_TYPE' is wrong in some cases
  - [[#3129](https://github.com/seata/seata/pull/3129)] forbidding execute SQL which update pk value
  - [[#3205](https://github.com/seata/seata/pull/3205)] fix can not get boolean value in configuration
  - [[#3170](https://github.com/seata/seata/pull/3170)] the disposables tree set won't accept another Disposable with the same priority
  - [[#3180](https://github.com/seata/seata/pull/3180)] serializer fst package name error
  - [[#3178](https://github.com/seata/seata/pull/3178)] remove next line to space
  - [[#2929](https://github.com/seata/seata/pull/2929)] fix the application was configured to degrade at startup and can't be dynamically switch to upgraded
  - [[#3050](https://github.com/seata/seata/pull/3050)] fix fetch before images when delete and update statements
  - [[#2935](https://github.com/seata/seata/pull/2935)] fix saga designer bug that the property box does not switch when switching nodes
  - [[#3140](https://github.com/seata/seata/pull/3140)] fix Propagation.REQUIRES_NEW and add some comments
  - [[#3130](https://github.com/seata/seata/pull/3130)] fix some problems in the automatic data source proxy
  - [[#3148](https://github.com/seata/seata/pull/3148)] the redis lock key and the session key has conflict
  - [[#3136](https://github.com/seata/seata/pull/3136)] fix the redis pipeline
  - [[#2551](https://github.com/seata/seata/pull/2551)] Saga can't be used when the dataSource is AT's dataSourceProxy
  - [[#3073](https://github.com/seata/seata/pull/3073)] do not proxy connections without an xid
  - [[#3074](https://github.com/seata/seata/pull/3074)] There is no need to retry if the XA schema cannot find the XID
  - [[#3097](https://github.com/seata/seata/pull/3097)] fix HttpAutoConfiguration always instantiation in springboot env
  - [[#3071](https://github.com/seata/seata/pull/3071)] part of the connection is not unpacked
  - [[#3056](https://github.com/seata/seata/pull/3056)] fixed a bug that after branch deletion, there are still remaining branch lock
  - [[#3025](https://github.com/seata/seata/pull/3025)] fix the wrong package path
  - [[#3031](https://github.com/seata/seata/pull/3031)] redis locker delete lock incomplete 
  - [[#2973](https://github.com/seata/seata/pull/2973)] fix oracle database in field size over 1000
  - [[#2986](https://github.com/seata/seata/pull/2986)] fix checkstyle plugin can't exclude single file
  - [[#2910](https://github.com/seata/seata/pull/2910)] fix error registry type comment 
  - [[#2914](https://github.com/seata/seata/pull/2914)] fix branchType not cleaned when consumer is in TCC mode
  - [[#2926](https://github.com/seata/seata/pull/2926)] fastjson write undo log not parser
  - [[#2897](https://github.com/seata/seata/pull/2897)] fix jedis unlock fail 
  - [[#2918](https://github.com/seata/seata/pull/2918)] fix the isolation problem when rollback in AT mode
  - [[#2972](https://github.com/seata/seata/pull/2972)] UUIDGenerator generates duplicated id
  - [[#2932](https://github.com/seata/seata/pull/2932)] nacos-config.py script could not run with namespace
  - [[#2900](https://github.com/seata/seata/pull/2900)] ColumnUtils add escape with scheme
  - [[#2904](https://github.com/seata/seata/pull/2904)] fix getConfig cache value is 'null'
  - [[#2890](https://github.com/seata/seata/pull/2890)] fix misspelling in statelang examples
  - [[#3040](https://github.com/seata/seata/pull/3040)] fix repeated commit when autocommit is false
  - [[#3230](https://github.com/seata/seata/pull/3230)] fix use @EnableAutoDataSourceProxy startup failed
  - [[#2979](https://github.com/seata/seata/pull/2979)] columns of resultset integrated with sharingjdbc need to be lowercase
  - [[#3233](https://github.com/seata/seata/pull/3233)] fix Collections NPE
  - [[#3242](https://github.com/seata/seata/pull/3242)] fix batch sql getTableMeta error
  - [[#3246](https://github.com/seata/seata/pull/3246)] fix the exception when limit condition contains VariantRefExpr
  
   
  ### optimize： 
  - [[#3062](https://github.com/seata/seata/pull/3062)] refactor the redis session store 
  - [[#3201](https://github.com/seata/seata/pull/3201)] optimize the wrong stack not fully display
  - [[#3117](https://github.com/seata/seata/pull/3117)] make log more clearly and remove the useless code
  - [[#3134](https://github.com/seata/seata/pull/3134)] optimize codes related to Map and List
  - [[#3195](https://github.com/seata/seata/pull/3195)] optimize XID related codes
  - [[#3200](https://github.com/seata/seata/pull/3200)] optimize rpc message when message was substring
  - [[#3186](https://github.com/seata/seata/pull/3186)] remove duplicated in string utils
  - [[#3162](https://github.com/seata/seata/pull/3162)] remove repeated conditional tests
  - [[#2969](https://github.com/seata/seata/pull/2969)] upgrade to druid 1.1.23
  - [[#3141](https://github.com/seata/seata/pull/3141)] upgrade nacos and FastJSON dependencies
  - [[#3118](https://github.com/seata/seata/pull/3118)] add more configuration tips in additional-spring-configuration-metadata.json
  - [[#2597](https://github.com/seata/seata/pull/2597)] judging xid status to avoid repeated processing
  - [[#3102](https://github.com/seata/seata/pull/3102)] optimize ContextCore, can be set 'Object' value
  - [[#3016](https://github.com/seata/seata/pull/3016)] refactor the redis lock string to hash
  - [[#3046](https://github.com/seata/seata/pull/3046)] remove unused code in serializer factory
  - [[#3053](https://github.com/seata/seata/pull/3053)] jedis pool adds maxtotal configuration
  - [[#3012](https://github.com/seata/seata/pull/3012)] remove set port repeatedly
  - [[#2978](https://github.com/seata/seata/pull/2978)] optimize globalCommit for mixed use of AT and TCC
  - [[#2967](https://github.com/seata/seata/pull/2967)] replace with lambda
  - [[#2968](https://github.com/seata/seata/pull/2968)] ensure that the register message is sent after RM client initialization
  - [[#2945](https://github.com/seata/seata/pull/2945)] optimize async commit and reduce one update
  - [[#2952](https://github.com/seata/seata/pull/2952)] optimize additional-spring-configuration-metadata.json
  - [[#2920](https://github.com/seata/seata/pull/2920)] optimize some grammatical errors
  - [[#2906](https://github.com/seata/seata/pull/2906)] added some configuration items to keep consistent with official documents 
  - [[#3222](https://github.com/seata/seata/pull/3222)] optimize fileListener to decrease cpu time usage
  - [[#2843](https://github.com/seata/seata/pull/2843)] removed Reloadable from the redis/db SessionManager
  - [[#3209](https://github.com/seata/seata/pull/3209)] add using company logos
  
  
  Thanks to these contributors for their code commits. Please report an unintended omission. 

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

  Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.

  #### Link

  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
  - **WebSite:** https://seata.io
  
</details>

