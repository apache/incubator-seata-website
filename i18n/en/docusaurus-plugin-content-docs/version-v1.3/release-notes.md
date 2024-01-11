---
title: Release Notes
keywords: [Seata, Release Notes]
description: This article will introduce you how to understand the details of each version and upgrade matters needing attention.
---


# Downloads

# Seata

> GitHub: https://github.com/apache/incubator-seata
>
> Release Notes: https://github.com/apache/incubator-seata/releases

### 1.3.0 (2020-07-14)

 [source](https://github.com/apache/incubator-seata/archive/v1.3.0.zip) |
 [binary](https://github.com/apache/incubator-seata/releases/download/v1.3.0/seata-server-1.3.0.zip) 

<details>
  <summary><mark>Release notes</mark></summary>
  
  ### Seata 1.3.0

  Seata 1.3.0 Released.

  Seata is an easy-to-use, high-performance, open source distributed transaction solution.

  The version is updated as follows:
  
  ### feature：
  - [[#2398](https://github.com/apache/incubator-seata/pull/2398)] support multi pk for MySQL
  - [[#2484](https://github.com/apache/incubator-seata/pull/2484)] store mode support redis
  - [[#2817](https://github.com/apache/incubator-seata/pull/2817)] Saga StateMachine engine and Designer support Groovy Script Task
  - [[#2646](https://github.com/apache/incubator-seata/pull/2646)] server support for HikariCP
  - [[#2253](https://github.com/apache/incubator-seata/pull/2253)] support for dynamic upgrade and downgrade
  - [[#2565](https://github.com/apache/incubator-seata/pull/2565)] support for transaction annotations on classes
  - [[#2510](https://github.com/apache/incubator-seata/pull/2510)] support LZ4 compressor
  - [[#2622](https://github.com/apache/incubator-seata/pull/2622)] support version valid check
  - [[#2658](https://github.com/apache/incubator-seata/pull/2658)] dataSources support different permissions of Oracle users
  - [[#2620](https://github.com/apache/incubator-seata/pull/2620)] support group configuration in Nacos registry
  - [[#2699](https://github.com/apache/incubator-seata/pull/2699)] compatible with ACM
  - [[#2509](https://github.com/apache/incubator-seata/pull/2509)] support for undo full data columns on update operate
  - [[#2584](https://github.com/apache/incubator-seata/pull/2584)] StateHandlerInterceptor and StateRouterInterceptor support SPI 
  - [[#2808](https://github.com/apache/incubator-seata/pull/2808)] server check auth support SPI
  - [[#2616](https://github.com/apache/incubator-seata/pull/2616)] TCC adapter for Dubbo And Sofa reference annotation
  - [[#2831](https://github.com/apache/incubator-seata/pull/2831)] Saga support jackson json parser
  - [[#2554](https://github.com/apache/incubator-seata/pull/2554)] support zk serializer
  - [[#2708](https://github.com/apache/incubator-seata/pull/2708)] support jdbc type array, datalink etc
  - [[#2412](https://github.com/apache/incubator-seata/pull/2412)] xid generation strategy support snowflake
  - [[#2611](https://github.com/apache/incubator-seata/pull/2611)] support the cache of configuration values
  
  ### bugfix：
  - [[#2893](https://github.com/apache/incubator-seata/pull/2893)] fix get table meta failed in postgresql
  - [[#2887](https://github.com/apache/incubator-seata/pull/2887)] fix rm client receive response logic
  - [[#2610](https://github.com/apache/incubator-seata/pull/2610)] nacos-script adapt to Nacos 1.2 on permission control
  - [[#2588](https://github.com/apache/incubator-seata/pull/2588)] fix when the check_style does not pass, no detail information output
  - [[#2543](https://github.com/apache/incubator-seata/pull/2543)] fix ApplicationKeeper ShutdownHook signal invalid.
  - [[#2598](https://github.com/apache/incubator-seata/pull/2598)] fix unable to register Nacos
  - [[#2618](https://github.com/apache/incubator-seata/pull/2618)] fix could not create folder in zookeeper
  - [[#2628](https://github.com/apache/incubator-seata/pull/2628)] fix get tableName and alias error in mysql delete
  - [[#2639](https://github.com/apache/incubator-seata/pull/2639)] fix Apollo configuration load fail due to camel style
  - [[#2629](https://github.com/apache/incubator-seata/pull/2629)] fix duplicated resource id with different currentSchema in PostgreSQL
  - [[#2659](https://github.com/apache/incubator-seata/pull/2659)] fix mysql insert use select last_insert_id is undo_log id value
  - [[#2670](https://github.com/apache/incubator-seata/pull/2670)] fix dataSource initialize more times
  - [[#2617](https://github.com/apache/incubator-seata/pull/2617)] fix incorrect getAnnotation about class and method
  - [[#2603](https://github.com/apache/incubator-seata/pull/2603)] fix can't get generated keys value.
  - [[#2725](https://github.com/apache/incubator-seata/pull/2725)] fix other expression before insert row primary key.
  - [[#2698](https://github.com/apache/incubator-seata/pull/2698)] fix nested GlobalLock unbind prematurely
  - [[#2755](https://github.com/apache/incubator-seata/pull/2755)] fix not return value when branchCommit and branchRollback throw exception
  - [[#2777](https://github.com/apache/incubator-seata/pull/2777)] fix can't rollback when set rollback retry count was zero.
  - [[#2812](https://github.com/apache/incubator-seata/pull/2812)] fix get PostgreSQL tableMeta error when using shardingSphere
  - [[#2760](https://github.com/apache/incubator-seata/pull/2760)] fix TM rollback fail throw the seata exception, rollback retrying throw NPE
  - [[#2837](https://github.com/apache/incubator-seata/pull/2837)] fix wrong constant used in the saga SubStateMachineHandler
  - [[#2839](https://github.com/apache/incubator-seata/pull/2839)] fix business exception is lost when compensation succeed in saga mode
  - [[#2650](https://github.com/apache/incubator-seata/pull/2650)] fix TCC and Saga branches will also parse SQL in AbstractConnectionProxy
  - [[#2850](https://github.com/apache/incubator-seata/pull/2850)] Fix Saga designer rounded polylines cause page crashes
  - [[#2868](https://github.com/apache/incubator-seata/pull/2868)] fix can't find AsyncEventBus dependency
  - [[#2871](https://github.com/apache/incubator-seata/pull/2871)] fix get tableMeta failed when table name like 'schame'.'table'
  - [[#2685](https://github.com/apache/incubator-seata/pull/2685)] fix oracle insert sql use sysdate error.
  - [[#2872](https://github.com/apache/incubator-seata/pull/2872)] fix missing escape char in the primary key for the undo sql
  - [[#2875](https://github.com/apache/incubator-seata/pull/2875)] fix ColumnUtils delEscape with scheme error

  
  ### optimize： 
  - [[#2573](https://github.com/apache/incubator-seata/pull/2573)] replace Random with ThreadLocalRandom in RandomLoadBalance
  - [[#2540](https://github.com/apache/incubator-seata/pull/2540)] refactor rpc request method and rpc interface
  - [[#2642](https://github.com/apache/incubator-seata/pull/2642)] optimize unsafe double-checked locking in SofaRegistryServiceImpl
  - [[#2561](https://github.com/apache/incubator-seata/pull/2561)] keep the same logic of get tableMeta
  - [[#2591](https://github.com/apache/incubator-seata/pull/2591)] support the default timeout for zookeeper register
  - [[#2601](https://github.com/apache/incubator-seata/pull/2601)] repackage spring-boot-starter
  - [[#2415](https://github.com/apache/incubator-seata/pull/2415)] distinguish database behavior according to the branch type
  - [[#2647](https://github.com/apache/incubator-seata/pull/2647)] remove the unused variable
  - [[#2649](https://github.com/apache/incubator-seata/pull/2649)] optimize get tableMeta
  - [[#2652](https://github.com/apache/incubator-seata/pull/2652)] consul supports custom port
  - [[#2660](https://github.com/apache/incubator-seata/pull/2660)] modify IdWorker position to make it reasonable
  - [[#2625](https://github.com/apache/incubator-seata/pull/2625)] polish testing code, replace with `Mockito.verify`
  - [[#2666](https://github.com/apache/incubator-seata/pull/2666)] add using users organization logos
  - [[#2680](https://github.com/apache/incubator-seata/pull/2680)] Change GlobalTransactionalInterceptor to singleton
  - [[#2683](https://github.com/apache/incubator-seata/pull/2683)] optimize TccActionInterceptor log print
  - [[#2477](https://github.com/apache/incubator-seata/pull/2477)] refactoring client request processing logic.
  - [[#2280](https://github.com/apache/incubator-seata/pull/2280)] refactor InsertExecutor
  - [[#2044](https://github.com/apache/incubator-seata/pull/2044)] optimize ColumnUtils.addEscape method performance
  - [[#2730](https://github.com/apache/incubator-seata/pull/2730)] optimize get config type from configuration
  - [[#2723](https://github.com/apache/incubator-seata/pull/2723)] optimize get tableMeta in postgreSql
  - [[#2734](https://github.com/apache/incubator-seata/pull/2734)] change postgreSql driver scope to provide
  - [[#2749](https://github.com/apache/incubator-seata/pull/2749)] optimize logger class misWrite
  - [[#2751](https://github.com/apache/incubator-seata/pull/2751)] copy jdbc driver to image
  - [[#2759](https://github.com/apache/incubator-seata/pull/2759)] optimized the generation rules of thread name factory
  - [[#2607](https://github.com/apache/incubator-seata/pull/2607)] support insert pkValue support check
  - [[#2765](https://github.com/apache/incubator-seata/pull/2765)] optimize the processing logic of XA's RM for unsupported transaction resources.
  - [[#2771](https://github.com/apache/incubator-seata/pull/2771)] disable unstable unit tests
  - [[#2779](https://github.com/apache/incubator-seata/pull/2779)] CollectionUtils.decodeMap method variables ConcurrentHashMap refact to HashMap 
  - [[#2486](https://github.com/apache/incubator-seata/pull/2486)] refactor server handle request process logic from client
  - [[#2770](https://github.com/apache/incubator-seata/pull/2770)] TCC two phase method return type supports void
  - [[#2788](https://github.com/apache/incubator-seata/pull/2788)] optimize server log pattern and support for colored log
  - [[#2816](https://github.com/apache/incubator-seata/pull/2816)] optimize create clazz instance
  - [[#2787](https://github.com/apache/incubator-seata/pull/2787)] modify workerId generation method
  - [[#2776](https://github.com/apache/incubator-seata/pull/2776)] optimize paramsPlaceHolder generate by StringUtils.repeat()
  - [[#2799](https://github.com/apache/incubator-seata/pull/2799)] code opt format
  - [[#2829](https://github.com/apache/incubator-seata/pull/2829)] downgrade check unlock and asynchronous
  - [[#2842](https://github.com/apache/incubator-seata/pull/2842)] code opt format about the sqls and typos
  - [[#2242](https://github.com/apache/incubator-seata/pull/2242)] optimize PreparedStatementProxy initialization logic
  - [[#2613](https://github.com/apache/incubator-seata/pull/2613)] fix typo and some coding guidelines

  
  Thanks to these contributors for their code commits. Please report an unintended omission.  
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

  Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.

   #### Link
   - **Seata:** https://github.com/apache/incubator-seata  
   - **Seata-Samples:** https://github.com/apache/incubator-seata-samples   
   - **Release:** https://github.com/apache/incubator-seata/releases
   - **WebSite:** https://seata.io
   
</details>
