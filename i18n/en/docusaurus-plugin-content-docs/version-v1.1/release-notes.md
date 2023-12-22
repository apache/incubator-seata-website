---
title: Release Notes
keywords: [Seata, Release Notes]
description: This article will introduce you how to understand the details of each version and upgrade matters needing attention.
---


# Downloads

# Seata

> GitHub: https://github.com/seata/seata
>
> Release Notes: https://github.com/seata/seata/releases

### 1.1.0 (2020-02-19)

 [source](https://github.com/seata/seata/archive/v1.1.0.zip) |
 [binary](https://github.com/seata/seata/releases/download/v1.1.0/seata-server-1.1.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>
  
  ### Seata 1.1.0

  Seata 1.1.0 Released.

  Seata is an easy-to-use, high-performance, open source distributed transaction solution.

  The version is updated as follows:
  
  ### feature：
  - [[#2200](https://github.com/seata/seata/pull/2200)] support postgresql(client and server) 
  - [[#1746](https://github.com/seata/seata/pull/1746)] integrate with httpClient
  - [[#2240](https://github.com/seata/seata/pull/2240)] support custom saga transaction recovery strategy on transaction timeout
  - [[#1693](https://github.com/seata/seata/pull/1693)] support for druid class isolation loading
  - [[#2245](https://github.com/seata/seata/pull/2245)] zookeeper digest support
  - [[#2239](https://github.com/seata/seata/pull/2239)] compatibility dubbo 2.7.4+
  - [[#2203](https://github.com/seata/seata/pull/2203)] support nacos configuration group
  - [[#2086](https://github.com/seata/seata/pull/2086)] support apollo configuration namespace
  - [[#2106](https://github.com/seata/seata/pull/2106)] support FastThreadLocalContextCore
  - [[#1703](https://github.com/seata/seata/pull/1703)] create sql parser SPI and a druid type sql parser
  - [[#2151](https://github.com/seata/seata/pull/2151)] Saga provide a switch to skip branch report on branch success
  
  
  ### bugfix：
  - [[#2270](https://github.com/seata/seata/pull/2270)] fix worker size not support enum type and some minor problem
  - [[#2258](https://github.com/seata/seata/pull/2258)] fix channelHandler not sharable
  - [[#2261](https://github.com/seata/seata/pull/2261)] fix ApplicationContext has not been refreshed
  - [[#2262](https://github.com/seata/seata/pull/2262)] fix nacos script set group error
  - [[#2249](https://github.com/seata/seata/pull/2249)] fix saga statemachine status incorrect on register branch failed
  - [[#2262](https://github.com/seata/seata/pull/2262)] fix nacos script set group error
  - [[#2126](https://github.com/seata/seata/pull/2126)] fix escape characters for column and table names
  - [[#2234](https://github.com/seata/seata/pull/2234)] fix type error when fastjson deserialize long type
  - [[#2237](https://github.com/seata/seata/pull/2237)] fix DefaultCoordinatorTest failed in Windows OS
  - [[#2233](https://github.com/seata/seata/pull/2233)] fix fastjson undo filter tableMeta
  - [[#2172](https://github.com/seata/seata/pull/2172)] fix configuration center can't read configuration using SpringCloudConfig
  - [[#2217](https://github.com/seata/seata/pull/2217)] correct wrong property names in seata-spring-boot-starter
  - [[#2219](https://github.com/seata/seata/pull/2219)] fix the value of disableGlobalTransaction not being read correctly
  - [[#2187](https://github.com/seata/seata/pull/2187)] fix the wrong rollback sequence caused by the same record request from different transaction branches on different servers
  - [[#2175](https://github.com/seata/seata/pull/2175)] fix direct buffer OOM
  - [[#2210](https://github.com/seata/seata/pull/2210)] fix retry expired commit and rollback globalSession can't be removed
  - [[#2179](https://github.com/seata/seata/pull/2179)] fix type casting problem when using redis as registry
  - [[#2192](https://github.com/seata/seata/pull/2192)] fix override eureka getHostName() return ipAddress
  - [[#2198](https://github.com/seata/seata/pull/2198)] fix global lock not released when rollback retry timeout
  - [[#2167](https://github.com/seata/seata/pull/2167)] fix saga concurrent asynchronous execution with duplicate primary key xid
  - [[#2185](https://github.com/seata/seata/pull/2185)] fix issue of judgement container in kubernetes
  - [[#2145](https://github.com/seata/seata/pull/2145)] fix Saga report branch status incorrect when service retried succeed
  - [[#2113](https://github.com/seata/seata/pull/2113)] fix when branchRollback failed, it will trigger retry of multi-tc
  
  
  ### optimize： 
  - [[#2255](https://github.com/seata/seata/pull/2255)] optimize some default configuration value
  - [[#2230](https://github.com/seata/seata/pull/2230)] unify the config style and keep defaults consistent
  - [[#1935](https://github.com/seata/seata/pull/1935)] some about rpc optimize
  - [[#2215](https://github.com/seata/seata/pull/2215)] optimize handing saga transaction timeout 
  - [[#2227](https://github.com/seata/seata/pull/2227)] separate tc In/Outbound interface 
  - [[#2033](https://github.com/seata/seata/pull/2033)] an optimization about DefaultRemotingParser
  - [[#1688](https://github.com/seata/seata/pull/1688)] reduce unnecessary dependences in client side
  - [[#2134](https://github.com/seata/seata/pull/2134)] separate the different transaction pattern processing logic
  - [[#2224](https://github.com/seata/seata/pull/2224)] optimize ContextCoreLoader code style
  - [[#2171](https://github.com/seata/seata/pull/2171)] optimize script and add script usage demo
  - [[#2208](https://github.com/seata/seata/pull/2208)] replace getDbType with LoadLevel name
  - [[#2182](https://github.com/seata/seata/pull/2182)] optimize configuration item prefix judgment
  - [[#2211](https://github.com/seata/seata/pull/2211)] optimize RootContext code style
  - [[#2140](https://github.com/seata/seata/pull/2140)] optimize GzipUtil code style
  - [[#2209](https://github.com/seata/seata/pull/2209)] refactor seata-discovery more readable
  - [[#2055](https://github.com/seata/seata/pull/2055)] refactor tableMetaCache and undoLogManager with SPI
  - [[#2184](https://github.com/seata/seata/pull/2184)] refactor seata-config more readable
  - [[#2095](https://github.com/seata/seata/pull/2095)] refactor of auto proxying of datasource
  - [[#2178](https://github.com/seata/seata/pull/2178)] saga statemachine designer add default properties for catch node
  - [[#2103](https://github.com/seata/seata/pull/2103)] optimize tcc module code style
  - [[#2125](https://github.com/seata/seata/pull/2125)] change the package path of MySQL recognizer
  - [[#2176](https://github.com/seata/seata/pull/2176)] fix typos
  - [[#2156](https://github.com/seata/seata/pull/2156)] refactor sql parser type druid as constant
  - [[#2170](https://github.com/seata/seata/pull/2170)] enhance test coverage of seata common
  - [[#2139](https://github.com/seata/seata/pull/2139)] gracefully close resources
  - [[#2097](https://github.com/seata/seata/pull/2097)] use serializer package name instead of codec 
  - [[#2159](https://github.com/seata/seata/pull/2159)] optimize spring module code style
  - [[#2036](https://github.com/seata/seata/pull/2036)] optimize Dubbo parser
  - [[#2062](https://github.com/seata/seata/pull/2062)] optimize seata-rm-datasource module code style
  - [[#2146](https://github.com/seata/seata/pull/2146)] optimize log specifications
  - [[#2038](https://github.com/seata/seata/pull/2038)] simplify to make seata-common more readable 
  - [[#2120](https://github.com/seata/seata/pull/2120)] fix typos 
  - [[#2078](https://github.com/seata/seata/pull/2078)] enhance oracle table meta cache code coverage 
  - [[#2115](https://github.com/seata/seata/pull/2115)] fix typos
  - [[#2099](https://github.com/seata/seata/pull/2099)] optimize tm module code style
  
  Thanks to these contributors for their code commits. Please report an unintended omission.  
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
  - [funky-eyes](https://github.com/funky-eyes)   
  - [caioguedes](https://github.com/caioguedes)   
  - [helloworlde](https://github.com/helloworlde)   
  - [wxbty](https://github.com/wxbty)    
  - [bao-hp](https://github.com/bao-hp)   
  - [guojingyinan219](https://github.com/guojingyinan219)   
  - [CharmingRabbit](https://github.com/CharmingRabbit)   
  - [jaspercloud](https://github.com/jaspercloud)   
  - [jsbxyyx](https://github.com/jsbxyyx)   
  
  Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.

   #### Link
   - **Seata:** https://github.com/seata/seata  
   - **Seata-Samples:** https://github.com/seata/seata-samples   
   - **Release:** https://github.com/seata/seata/releases
   - **WebSite:** https://seata.io
   
</details>
