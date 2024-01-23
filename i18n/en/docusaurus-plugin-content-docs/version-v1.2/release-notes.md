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

### 1.2.0 (2020-04-20)

 [source](https://github.com/apache/incubator-seata/archive/v1.2.0.zip) |
 [binary](https://github.com/apache/incubator-seata/releases/download/v1.2.0/seata-server-1.2.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>
  
  ### Seata 1.2.0

  Seata 1.2.0 Released.

  Seata is an easy-to-use, high-performance, open source distributed transaction solution.

  The version is updated as follows:
  
  ### feature：
  - [[#2381](https://github.com/apache/incubator-seata/pull/2381)] support XA transaction mode
  - [[#2206](https://github.com/apache/incubator-seata/pull/2206)] support REQUIRED、REQUIRES_NEW、SUPPORTS and NOT_SUPPORTED transaction propagation
  - [[#2112](https://github.com/apache/incubator-seata/pull/2112)] support batch update and delete with multiple sql
  - [[#2275](https://github.com/apache/incubator-seata/pull/2275)] support hsf on TCC transaction mode
  - [[#2108](https://github.com/apache/incubator-seata/pull/2108)] support zip bzip2 7z compressor
  - [[#2328](https://github.com/apache/incubator-seata/pull/2328)] support for isolated loading of mysql 5.x and 8.x jdbc drivers classes                                                                                     
  - [[#2367](https://github.com/apache/incubator-seata/pull/2367)] add permission configuration support for Nacos 1.2
  - [[#2359](https://github.com/apache/incubator-seata/pull/2359)] support propagation.never, propagation.mandatory and transaction suspend and resume api
  - [[#2418](https://github.com/apache/incubator-seata/pull/2418)] support fst serialization
  - [[#2135](https://github.com/apache/incubator-seata/pull/2135)] support SPI scope
  - [[#2370](https://github.com/apache/incubator-seata/pull/2370)] support failureHandler implement can be read from the container
  - [[#2481](https://github.com/apache/incubator-seata/pull/2481)] support the max wait configuration for db
  - [[#2379](https://github.com/apache/incubator-seata/pull/2379)] support custom service name when registering with Nacos
  - [[#2308](https://github.com/apache/incubator-seata/pull/2308)] add switch to control whether to register branch on Saga transaction mode
  - [[#2301](https://github.com/apache/incubator-seata/pull/2301)] support default expr and nextval for postgresql
  
  
  ### bugfix：
  - [[#2575](https://github.com/apache/incubator-seata/pull/2575)] fix executeBatch can not get targetSql in Statement mode 
  - [[#2283](https://github.com/apache/incubator-seata/pull/2283)] fix oracle get tableMeta fail
  - [[#2312](https://github.com/apache/incubator-seata/pull/2312)] fix the judgement of configuration condition
  - [[#2309](https://github.com/apache/incubator-seata/pull/2309)] fix timestamp deserialize lost nano
  - [[#2292](https://github.com/apache/incubator-seata/pull/2292)] fix some configuration not converted to camel style
  - [[#2306](https://github.com/apache/incubator-seata/pull/2306)] fix deprecated maven prerequisites
  - [[#2287](https://github.com/apache/incubator-seata/pull/2287)] fix connection context can't be remove when global lock retry
  - [[#2361](https://github.com/apache/incubator-seata/pull/2361)] fix the error configuration name
  - [[#2333](https://github.com/apache/incubator-seata/pull/2333)] fix wrong exception information when rollback fails due to dirty data
  - [[#2390](https://github.com/apache/incubator-seata/pull/2390)] fix configuration item containing spaces
  - [[#2408](https://github.com/apache/incubator-seata/pull/2408)] fix missing sequence in undo_log table
  - [[#2391](https://github.com/apache/incubator-seata/pull/2391)] fix configuration exceptions lead to increased CPU usage
  - [[#2427](https://github.com/apache/incubator-seata/pull/2427)] fix StringUtils.toString(o) StackOverflowError
  - [[#2384](https://github.com/apache/incubator-seata/pull/2384)] fix StateMachineRepository#getStateMachineById will replace the last version in cache
  - [[#2323](https://github.com/apache/incubator-seata/pull/2323)] fix wrong proxy of datasource bean
  - [[#2466](https://github.com/apache/incubator-seata/pull/2466)] fix memory visibility of active attribute in file mode
  - [[#2349](https://github.com/apache/incubator-seata/pull/2349)] fix insert sql primary key value support check
  - [[#2479](https://github.com/apache/incubator-seata/pull/2479)] fix postgresql schema when not use lowerCase
  - [[#2449](https://github.com/apache/incubator-seata/pull/2449)] fix can't get table structure when startup
  - [[#2505](https://github.com/apache/incubator-seata/pull/2505)] fix bug of session store path value judgment
  - [[#2456](https://github.com/apache/incubator-seata/pull/2456)] fix server encode request error
  - [[#2495](https://github.com/apache/incubator-seata/pull/2495)] fix the NPE and reduce the request when lockkey is null
  - [[#2490](https://github.com/apache/incubator-seata/pull/2490)] fix RpcContext.addResource when resource is null
  - [[#2419](https://github.com/apache/incubator-seata/pull/2419)] fix http testcase run failed
  - [[#2535](https://github.com/apache/incubator-seata/pull/2535)] fix wrong configuration name in config.txt
  - [[#2524](https://github.com/apache/incubator-seata/pull/2524)] registration service configuration missing and inconsistent
  - [[#2473](https://github.com/apache/incubator-seata/pull/2473)] fix flush condition of disk in file mode
  - [[#2455](https://github.com/apache/incubator-seata/pull/2455)] fix child module can't execute copyright and checkstyle inspection
  
  
  ### optimize： 
  - [[#2409](https://github.com/apache/incubator-seata/pull/2409)] reduce the db and network request when undoLog or lockKey is empty
  - [[#2329](https://github.com/apache/incubator-seata/pull/2329)] separate the different storage pattern processing logic
  - [[#2354](https://github.com/apache/incubator-seata/pull/2354)] optimize the unsupported listener logic for spring cloud config
  - [[#2320](https://github.com/apache/incubator-seata/pull/2320)] optimize protostuff and kryo serialize timestamp
  - [[#2307](https://github.com/apache/incubator-seata/pull/2307)] optimize transaction context switch logic when switch transaction mode
  - [[#2364](https://github.com/apache/incubator-seata/pull/2364)] optimize generated instances that were not actually used when the class was loaded
  - [[#2368](https://github.com/apache/incubator-seata/pull/2368)] add zk missing configuration
  - [[#2351](https://github.com/apache/incubator-seata/pull/2351)] add get local global status
  - [[#2529](https://github.com/apache/incubator-seata/pull/2529)] optimize druid parameter
  - [[#2288](https://github.com/apache/incubator-seata/pull/2288)] codecov.yml ignore mock test
  - [[#2297](https://github.com/apache/incubator-seata/pull/2297)] remove duplicated dependency
  - [[#2336](https://github.com/apache/incubator-seata/pull/2336)] add using organization logos
  - [[#2348](https://github.com/apache/incubator-seata/pull/2348)] remove redundant configuration
  - [[#2362](https://github.com/apache/incubator-seata/pull/2362)] optimize stackTraceLogger param
  - [[#2382](https://github.com/apache/incubator-seata/pull/2382)] optimize RegistryFactory singleton pattern and RegistryType judgement
  - [[#2400](https://github.com/apache/incubator-seata/pull/2400)] optimize the magic num of date at UUIDGenerator
  - [[#2397](https://github.com/apache/incubator-seata/pull/2397)] fix typo
  - [[#2407](https://github.com/apache/incubator-seata/pull/2407)] inaccurate judgment may be lead to NPE
  - [[#2402](https://github.com/apache/incubator-seata/pull/2402)] optimize the rm and tm register log
  - [[#2422](https://github.com/apache/incubator-seata/pull/2422)] add link of script in document
  - [[#2440](https://github.com/apache/incubator-seata/pull/2440)] optimize contact us and startup log
  - [[#2445](https://github.com/apache/incubator-seata/pull/2445)] optimize the class registration method for kryo and fst
  - [[#2372](https://github.com/apache/incubator-seata/pull/2372)] refactor lock store sql with SPI
  - [[#2453](https://github.com/apache/incubator-seata/pull/2453)] optimize unnecessary server configuration item
  - [[#2369](https://github.com/apache/incubator-seata/pull/2369)] refactor log store sql with SPI
  - [[#2526](https://github.com/apache/incubator-seata/pull/2526)] optimize spring-boot startup log
  - [[#2530](https://github.com/apache/incubator-seata/pull/2530)] remove use connPool
  - [[#2489](https://github.com/apache/incubator-seata/pull/2489)] optimize exceptionHandler's method signature
  - [[#2494](https://github.com/apache/incubator-seata/pull/2494)] reduce the redundant code
  - [[#2523](https://github.com/apache/incubator-seata/pull/2523)] optimize abnormal global transaction's output logs by  frequency
  - [[#2549](https://github.com/apache/incubator-seata/pull/2549)] optimize the exception log for ZookeeperConfiguration 
  - [[#2558](https://github.com/apache/incubator-seata/pull/2558)] optimize config and server module log
  - [[#2464](https://github.com/apache/incubator-seata/pull/2464)] enhance Saga transaction editor
  - [[#2553](https://github.com/apache/incubator-seata/pull/2553)] add some notes about using scripts
  
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
   - **Seata:** https://github.com/apache/incubator-seata  
   - **Seata-Samples:** https://github.com/apache/incubator-seata-samples   
   - **Release:** https://github.com/apache/incubator-seata/releases
   - **WebSite:** https://seata.apache.org
   
</details>
