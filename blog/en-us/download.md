---
title: Downloads
keywords: Seata, Downloads, Version
description: This article will introduce you how to understand the details of each version and upgrade matters needing attention.
---


# Downloads

# Seata

> GitHub: https://github.com/seata/seata \
> Release Notes: https://github.com/seata/seata/releases
>

### 1.0.0 (2019-12-21)

 [source](https://github.com/seata/seata/archive/v1.0.0.zip) |
 [binary](https://github.com/seata/seata/releases/download/v1.0.0/seata-server-1.0.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>
  
  ### Seata 1.0.0

  Seata 1.0.0 Released.

  Seata is an easy-to-use, high-performance, open source distributed transaction solution.

  The version is updated as follows:

   #### feature：
  
   - [[#1966](https://github.com/seata/seata/pull/1966)] add single send request for client
   - [[#2004](https://github.com/seata/seata/pull/2004)] add config center synchronization script
   - [[#1997](https://github.com/seata/seata/pull/1997)] provides a tool for generating graphics that show the state machine execution path
   - [[#1992](https://github.com/seata/seata/pull/1992)] support dynamic disable
   - [[#1898](https://github.com/seata/seata/pull/1898)] support dynamic config
   - [[#1983](https://github.com/seata/seata/pull/1983)] add hessian codec for rpc serialization
   - [[#1960](https://github.com/seata/seata/pull/1960)] Provide a visual graph designer for Seata Saga StateMachine based on GGEditor
   - [[#1900](https://github.com/seata/seata/pull/1900)] Saga state language support "Retry" service when error occurred
   - [[#1885](https://github.com/seata/seata/pull/1885)] add configuration for build docker image in server module
   - [[#1914](https://github.com/seata/seata/pull/1914)] support where condition exists for Oracle
   - [[#1878](https://github.com/seata/seata/pull/1878)] support exists in where condition
   - [[#1871](https://github.com/seata/seata/pull/1871)] adapt springcloud-alibaba-seata autoconfig
   - [[#1844](https://github.com/seata/seata/pull/1844)] StateMachine ServiceTask supports asynchronous execution
   - [[#1742](https://github.com/seata/seata/pull/1742)] add seata-spring-boot-starter
   - [[#1460](https://github.com/seata/seata/pull/1460)] support gzip compressor
   - [[#1492](https://github.com/seata/seata/pull/1492)] support gRpc

   #### bugfix：

   - [[#2066](https://github.com/seata/seata/pull/2066)] fix thread unsafe which missing double check when initial eureka client
   - [[#2059](https://github.com/seata/seata/pull/2059)] fix repeated rollback caused by asynchronous rollback thread
   - [[#2050](https://github.com/seata/seata/pull/2050)] fix if add configListener but dataId not exist, it will throw NPE
   - [[#2053](https://github.com/seata/seata/pull/2053)] fix when tableName is keyword, the insert operation will get afterImage fail
   - [[#2054](https://github.com/seata/seata/pull/2054)] fix RetryRollbackingSessionManager lost Rollbacking
   - [[#2043](https://github.com/seata/seata/pull/2043)] fix startup failure when dynamic proxy is turned on and use druid-spring-boot-starter
   - [[#1668](https://github.com/seata/seata/pull/1668)] fix sql statement escape symbol
   - [[#2029](https://github.com/seata/seata/pull/2029)] fix seata-spring-boot-starter does not work
   - [[#2037](https://github.com/seata/seata/pull/2037)] fix mysql connection unable to release
   - [[#2032](https://github.com/seata/seata/pull/2032)] fix Etcd3Configuration FILE_CONFIG reference incorrect
   - [[#1929](https://github.com/seata/seata/pull/1929)] fix duplicated table meta cache key
   - [[#1996](https://github.com/seata/seata/pull/1996)] fix auto proxying of datasource which has final modifier
   - [[#2001](https://github.com/seata/seata/pull/2001)] replace deprecated jvm args
   - [[#1984](https://github.com/seata/seata/pull/1984)] fix presuppose environment variable and replace base image for tool
   - [[#1978](https://github.com/seata/seata/pull/1978)] fix FileTransactionStoreManagerTest failed on wins OS
   - [[#1953](https://github.com/seata/seata/pull/1953)] fix get table meta failed with catalog
   - [[#1973](https://github.com/seata/seata/pull/1973)] fix error of get server port in container
   - [[#1905](https://github.com/seata/seata/pull/1905)] solve the lock_key length problem
   - [[#1927](https://github.com/seata/seata/pull/1927)] fix class with private access constructors should not be loaded by SPI.
   - [[#1961](https://github.com/seata/seata/pull/1961)] fix travis-ci exceeded the maximum log length
   - [[#1893](https://github.com/seata/seata/pull/1893)] fix saga dose not delete branches when transaction ended
   - [[#1932](https://github.com/seata/seata/pull/1932)] fix issue of doesn't match environment when build docker image
   - [[#1912](https://github.com/seata/seata/pull/1912)] fix string.format() method formatting error
   - [[#1917](https://github.com/seata/seata/pull/1917)] fix NullPointerException in DB mock during CI
   - [[#1909](https://github.com/seata/seata/pull/1909)] fix xidInterceptorType is null
   - [[#1902](https://github.com/seata/seata/pull/1902)] fix NPE in UndoExecutorFactory
   - [[#1789](https://github.com/seata/seata/pull/1789)] fix xid header lowercase
   - [[#1889](https://github.com/seata/seata/pull/1889)] fix register branch thread hang on tcc mode
   - [[#1813](https://github.com/seata/seata/pull/1813)] fix TCC does not support cross-service
   - [[#1825](https://github.com/seata/seata/pull/1825)] fix global status inconsistent when rollback and branch register are concurrent
   - [[#1850](https://github.com/seata/seata/pull/1850)] fix server restart not recover max sessionId on db mode
   - [[#1879](https://github.com/seata/seata/pull/1879)] fix jdbc parameter set null
   - [[#1874](https://github.com/seata/seata/pull/1874)] fix when write the new file throw ClosedChannelException
   - [[#1863](https://github.com/seata/seata/pull/1863)] fix the other of column type cause rollback fail
   - [[#1837](https://github.com/seata/seata/pull/1837)] fix saga ExpressionEvaluator not support null value
   - [[#1810](https://github.com/seata/seata/pull/1810)] fix statemachine def can't store to db and provide query the state logs
   - [[#1834](https://github.com/seata/seata/pull/1834)] fix StateInstance log can't record output parameters
   - [[#1856](https://github.com/seata/seata/pull/1856)] fix protostuff undo log get default content
   - [[#1845](https://github.com/seata/seata/pull/1845)] fix when branchCommit failed,it will trigger retry of multi-tc and throw npe
   - [[#1858](https://github.com/seata/seata/pull/1858)] fix Global transaction does not work
   - [[#1846](https://github.com/seata/seata/pull/1846)] fix multi-thread concurrent add listener problem
   - [[#1839](https://github.com/seata/seata/pull/1839)] fix filter repeated lock
   - [[#1768](https://github.com/seata/seata/pull/1768)] fix problem when set useInformationSchema true and table name was keyword
   - [[#1796](https://github.com/seata/seata/pull/1796)] fix unexcepted exception can roll back
   - [[#1805](https://github.com/seata/seata/pull/1805)] fix connectionproxy prepareStatement not in global transaction
   - [[#1780](https://github.com/seata/seata/pull/1780)] fix can't use select for update in oracle
   - [[#1802](https://github.com/seata/seata/pull/1802)] changing HashMap to LinkedHashMap for deterministic iterations
   - [[#1793](https://github.com/seata/seata/pull/1793)] fix auto proxy for multiple-datasource does not work
   - [[#1788](https://github.com/seata/seata/pull/1788)] fix mysql can not get primary key value
   - [[#1764](https://github.com/seata/seata/pull/1764)] fix jdk 11 remoteAddress is null
   - [[#1778](https://github.com/seata/seata/pull/1778)] fix clean up resources in time to avoid mutual influence between unit tests
   - [[#1777](https://github.com/seata/seata/pull/1777)] fix DeleteExecutor buildBeforeImageSQL keyword checker by db type

   #### optimize：

   - [[#2068](https://github.com/seata/seata/pull/2068)] optimize get database connection
   - [[#2056](https://github.com/seata/seata/pull/2056)] remove non-javadoc element
   - [[#1775](https://github.com/seata/seata/pull/1775)] optimize datasource manager branch rollback exception log
   - [[#2000](https://github.com/seata/seata/pull/2000)] classify script to correspond directory
   - [[#2007](https://github.com/seata/seata/pull/2007)] enhance test coverage of seata common
   - [[#1969](https://github.com/seata/seata/pull/1969)] add ops script for Docker-Compose, Kubernetes and Helm
   - [[#1967](https://github.com/seata/seata/pull/1967)] Add Dockerfile
   - [[#2018](https://github.com/seata/seata/pull/2018)] optimize about ConfigFuture
   - [[#2020](https://github.com/seata/seata/pull/2020)] optimize saga log output
   - [[#1975](https://github.com/seata/seata/pull/1975)] Flatten Saga nested transactions
   - [[#1980](https://github.com/seata/seata/pull/1980)] show the applicationId when register TM
   - [[#1994](https://github.com/seata/seata/pull/1994)] rename zk configuration root path.
   - [[#1990](https://github.com/seata/seata/pull/1990)] add netty config constant keys.
   - [[#1979](https://github.com/seata/seata/pull/1979)] optimize get select for update recognizer
   - [[#1957](https://github.com/seata/seata/pull/1957)] load keywordChecker through SPI
   - [[#1956](https://github.com/seata/seata/pull/1956)] modify no available server error more clearly, and fixed NP
   - [[#1958](https://github.com/seata/seata/pull/1958)] transform desinger json to statemachine standard json
   - [[#1951](https://github.com/seata/seata/pull/1951)] add using organization logo
   - [[#1950](https://github.com/seata/seata/pull/1950)] leak of error trace while handleAsyncCommitting
   - [[#1931](https://github.com/seata/seata/pull/1931)] nacos-config.py support namespace
   - [[#1938](https://github.com/seata/seata/pull/1938)] optimize the speed when batch insert or batch update
   - [[#1930](https://github.com/seata/seata/pull/1930)] reduce HashMap initial size
   - [[#1919](https://github.com/seata/seata/pull/1919)] force check code style
   - [[#1918](https://github.com/seata/seata/pull/1918)] optimize assert throw exception
   - [[#1911](https://github.com/seata/seata/pull/1911)] javadoc should be used for classes, class variables and methods.
   - [[#1920](https://github.com/seata/seata/pull/1920)] use iterator to remove timeout future.
   - [[#1907](https://github.com/seata/seata/pull/1907)] encapsulation determines the supported database type
   - [[#1903](https://github.com/seata/seata/pull/1903)] batch query branchSession by xid list
   - [[#1910](https://github.com/seata/seata/pull/1910)] all Override methods must be annotated with [@override](https://github.com/override)
   - [[#1906](https://github.com/seata/seata/pull/1906)] add exception system exit code when rpcServer init.
   - [[#1897](https://github.com/seata/seata/pull/1897)] remove clientTest it's not use
   - [[#1883](https://github.com/seata/seata/pull/1883)] restructure SQLRecognizer and UndoExecutor
   - [[#1890](https://github.com/seata/seata/pull/1890)] reformat saga module
   - [[#1798](https://github.com/seata/seata/pull/1798)] improving method format performance
   - [[#1884](https://github.com/seata/seata/pull/1884)] optimize auto closeable
   - [[#1869](https://github.com/seata/seata/pull/1869)] add phase one successful reporting switch
   - [[#1842](https://github.com/seata/seata/pull/1842)] add some init script
   - [[#1838](https://github.com/seata/seata/pull/1838)] simplify and groom configuration items
   - [[#1866](https://github.com/seata/seata/pull/1866)] server lack of error trace
   - [[#1867](https://github.com/seata/seata/pull/1867)] optimization of seata-spring-boot-starter
   - [[#1817](https://github.com/seata/seata/pull/1817)] add unit test for seata-tm module
   - [[#1823](https://github.com/seata/seata/pull/1823)] reduce server rpc with db
   - [[#1835](https://github.com/seata/seata/pull/1835)] SagaTransactionalTemplate provide reloadTransaction method
   - [[#1861](https://github.com/seata/seata/pull/1861)] optimize no primary key output log
   - [[#1836](https://github.com/seata/seata/pull/1836)] change "IsPersist" property value type from String to Boolean
   - [[#1824](https://github.com/seata/seata/pull/1824)] remove deprecated JVM arguments in Java 11
   - [[#1820](https://github.com/seata/seata/pull/1820)] adjust check style
   - [[#1806](https://github.com/seata/seata/pull/1806)] format error log
   - [[#1815](https://github.com/seata/seata/pull/1815)] update codecov.yml
   - [[#1811](https://github.com/seata/seata/pull/1811)] adjust codecov configuration
   - [[#1799](https://github.com/seata/seata/pull/1799)] reduce unnecessary synchronized
   - [[#1674](https://github.com/seata/seata/pull/1674)] increase rm code coverage by db mock
   - [[#1710](https://github.com/seata/seata/pull/1710)] add prefix counter for NamedThreadFactory
   - [[#1790](https://github.com/seata/seata/pull/1790)] format seata server register eureka instance id
   - [[#1760](https://github.com/seata/seata/pull/1760)] put message to logQueue
   - [[#1787](https://github.com/seata/seata/pull/1787)] make rpc remoting log easier to read
   - [[#1786](https://github.com/seata/seata/pull/1786)] simplify code
   - [[#1766](https://github.com/seata/seata/pull/1766)] remove unused method
   - [[#1770](https://github.com/seata/seata/pull/1770)] string splice and release lock

   Thanks to these contributors for their code commits. Please report an unintended omission.

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

   Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.

   #### Link
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

  Seata 0.9.0 Released.

  Seata is an easy-to-use, high-performance, open source distributed transaction solution.

  The version is updated as follows:

   #### feature：
   - [[#1608](https://github.com/seata/seata/pull/1608)] Saga implementation base on state machine
   - [[#1625](https://github.com/seata/seata/pull/1625)] support custom config and registry type
   - [[#1656](https://github.com/seata/seata/pull/1656)] support spring cloud config
   - [[#1689](https://github.com/seata/seata/pull/1689)] support -e startup parameter for specifying the environment name
   - [[#1739](https://github.com/seata/seata/pull/1739)] support retry when tm commit or rollback failed


   #### bugfix：
   - [[#1605](https://github.com/seata/seata/pull/1605)] fix deadlocks that can be caused by object locks and global locks and optimize the granularity of locks
   - [[#1685](https://github.com/seata/seata/pull/1685)] fix pk too long in lock table on db mode and optimize error log
   - [[#1691](https://github.com/seata/seata/pull/1691)] fix can't access private member of DruidDataSourceWrapper
   - [[#1699](https://github.com/seata/seata/pull/1699)] fix use 'in' and 'between' in where condition for Oracle and Mysql
   - [[#1713](https://github.com/seata/seata/pull/1713)] fix LockManagerTest.concurrentUseAbilityTest assertion condition
   - [[#1720](https://github.com/seata/seata/pull/1720)] fix can't refresh table meta data for oracle
   - [[#1729](https://github.com/seata/seata/pull/1729)] fix oracle batch insert error
   - [[#1735](https://github.com/seata/seata/pull/1735)] clean xid when tm commit or rollback failed
   - [[#1749](https://github.com/seata/seata/pull/1749)] fix undo support oracle table meta cache
   - [[#1751](https://github.com/seata/seata/pull/1751)] fix memory lock is not released due to hash conflict
   - [[#1761](https://github.com/seata/seata/pull/1761)] fix oracle rollback failed when the table has null Blob Clob value
   - [[#1759](https://github.com/seata/seata/pull/1759)] fix saga service method not support interface type parameter
   - [[#1401](https://github.com/seata/seata/pull/1401)] fix the first registration resource is null when RM starts

​    
   #### optimize： 
   - [[#1701](https://github.com/seata/seata/pull/1701)] remove unused imports
   - [[#1705](https://github.com/seata/seata/pull/1705)] Based on Java5 optimization 
   - [[#1706](https://github.com/seata/seata/pull/1706)] optimize inner class to static class
   - [[#1707](https://github.com/seata/seata/pull/1707)] default charset use StandardCharsets.UTF_8 instead
   - [[#1712](https://github.com/seata/seata/pull/1712)] abstract undolog manager class
   - [[#1722](https://github.com/seata/seata/pull/1722)] simplify to make codes more readable
   - [[#1726](https://github.com/seata/seata/pull/1726)] format log messages
   - [[#1738](https://github.com/seata/seata/pull/1738)] add server's jvm parameters
   - [[#1743](https://github.com/seata/seata/pull/1743)] improve the efficiency of the batch log
   - [[#1747](https://github.com/seata/seata/pull/1747)] use raw types instead of boxing types
   - [[#1750](https://github.com/seata/seata/pull/1750)] abstract tableMeta cache class
   - [[#1755](https://github.com/seata/seata/pull/1755)] enhance test coverage of seata-common module
   - [[#1756](https://github.com/seata/seata/pull/1756)] security: upgrade jackson to avoid security vulnerabilities
   - [[#1657](https://github.com/seata/seata/pull/1657)] optimize the problem of large direct buffer when file rolling in file storage mode


​    
   Thanks to these contributors for their code commits. Please report an unintended omission.  
​    
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

   Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.
    
   #### Link
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
  
  Seata 0.8.1 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
  
  #### feature：
  - [[#1598](https://github.com/seata/seata/pull/1598)] support profile to use absolute path
  - [[#1617](https://github.com/seata/seata/pull/1617)] support profile’s（registry.conf） name configurable
  - [[#1418](https://github.com/seata/seata/pull/1418)] support undo_log kryo serializer
  - [[#1489](https://github.com/seata/seata/pull/1489)] support protobuf maven plugin
  - [[#1437](https://github.com/seata/seata/pull/1437)] support kryo codec
  - [[#1478](https://github.com/seata/seata/pull/1478)] support db mock
  - [[#1512](https://github.com/seata/seata/pull/1512)] extended support for mysql and oracle multiple insert batch syntax
  - [[#1496](https://github.com/seata/seata/pull/1496)] support auto proxy of DataSource 
  
  
  #### bugfix：
  - [[#1646](https://github.com/seata/seata/pull/1646)] fix selectForUpdate lockQuery exception in file mode
  - [[#1572](https://github.com/seata/seata/pull/1572)] fix get tablemeta fail in oracle when table name was lower case 
  - [[#1663](https://github.com/seata/seata/pull/1663)] fix get tablemeta fail when table name was keyword
  - [[#1666](https://github.com/seata/seata/pull/1666)] fix restore connection's autocommit
  - [[#1643](https://github.com/seata/seata/pull/1643)] fix serialize and deserialize in java.sql.Blob, java.sql.Clob
  - [[#1628](https://github.com/seata/seata/pull/1628)] fix oracle support ROWNUM query
  - [[#1552](https://github.com/seata/seata/pull/1552)] fix BufferOverflow when BranchSession size too large
  - [[#1609](https://github.com/seata/seata/pull/1609)] fix thread unsafe of oracle keyword checker
  - [[#1599](https://github.com/seata/seata/pull/1599)] fix thread unsafe of mysql keyword checker
  - [[#1607](https://github.com/seata/seata/pull/1607)] fix NoSuchMethodError when the version of druid used < 1.1.3 
  - [[#1581](https://github.com/seata/seata/pull/1581)] fix missing some length in GlobalSession and FileTransactionStoreManager 
  - [[#1594](https://github.com/seata/seata/pull/1594)] fix nacos's default namespace
  - [[#1550](https://github.com/seata/seata/pull/1550)] fix calculate BranchSession size missing xidBytes.length
  - [[#1558](https://github.com/seata/seata/pull/1558)] fix NPE when the rpcMessage's body is null
  - [[#1505](https://github.com/seata/seata/pull/1505)] fix bind public network address listen failed
  - [[#1539](https://github.com/seata/seata/pull/1539)] fix nacos namespace setting does not take effect
  - [[#1537](https://github.com/seata/seata/pull/1537)] fix nacos-config.txt missing store.db.driver-class-name property
  - [[#1522](https://github.com/seata/seata/pull/1522)] fix ProtocolV1CodecTest testAll may be appears test not pass 
  - [[#1525](https://github.com/seata/seata/pull/1525)] fix when getAfterImage error, trx autocommit 
  - [[#1518](https://github.com/seata/seata/pull/1518)] fix EnhancedServiceLoader may be appears load class error
  - [[#1514](https://github.com/seata/seata/pull/1514)] fix when lack serialization dependence can't generate undolog and report true
  - [[#1445](https://github.com/seata/seata/pull/1445)] fix DefaultCoordinatorMetricsTest UT failed
  - [[#1481](https://github.com/seata/seata/pull/1481)] fix TableMetaCache refresh problem in multiple datasource
  
  
  #### optimize： 
  - [[#1629](https://github.com/seata/seata/pull/1629)] optimize the watcher efficiency of etcd3
  - [[#1661](https://github.com/seata/seata/pull/1661)] optimize global_table insert transaction_name size 
  - [[#1633](https://github.com/seata/seata/pull/1633)] optimize branch transaction repeated reporting false 
  - [[#1654](https://github.com/seata/seata/pull/1654)] optimize wrong usage of slf4j  
  - [[#1593](https://github.com/seata/seata/pull/1593)] optimize and standardize server log 
  - [[#1648](https://github.com/seata/seata/pull/1648)] optimize transaction_name length when building the table
  - [[#1576](https://github.com/seata/seata/pull/1576)] eliminate the impact of instructions reordering on session async committing task 
  - [[#1618](https://github.com/seata/seata/pull/1618)] optimize undolog manager and fix delete undolog support oracle
  - [[#1469](https://github.com/seata/seata/pull/1469)] reduce the number of lock conflict exception  
  - [[#1619](https://github.com/seata/seata/pull/1416)] replace StringBuffer with StringBuilder
  - [[#1580](https://github.com/seata/seata/pull/1580)] optimize LockKeyConflictException and change register method
  - [[#1574](https://github.com/seata/seata/pull/1574)] optimize once delete GlobalSession locks for db mode when commit success 
  - [[#1601](https://github.com/seata/seata/pull/1601)] optimize typo
  - [[#1602](https://github.com/seata/seata/pull/1602)] upgrade fastjson version to 1.2.60 for security issue 
  - [[#1583](https://github.com/seata/seata/pull/1583)] optimize get oracle primary index
  - [[#1575](https://github.com/seata/seata/pull/1575)] add UT for RegisterTMRequest 
  - [[#1559](https://github.com/seata/seata/pull/1559)] optimize delay to delete the expired undo log
  - [[#1547](https://github.com/seata/seata/pull/1547)] TableRecords delete jackson annotation 
  - [[#1542](https://github.com/seata/seata/pull/1542)] optimize  AbstractSessionManager debug log
  - [[#1535](https://github.com/seata/seata/pull/1535)] remove H2 and pgsql get primary index code and close resultSet
  - [[#1541](https://github.com/seata/seata/pull/1541)] code clean
  - [[#1544](https://github.com/seata/seata/pull/1544)] remove Chinese comment
  - [[#1533](https://github.com/seata/seata/pull/1533)] refactor of the logics of Multi-configuration Isolation
  - [[#1493](https://github.com/seata/seata/pull/1493)] add table meta checker switch
  - [[#1530](https://github.com/seata/seata/pull/1530)] throw Exception when no index in the table
  - [[#1444](https://github.com/seata/seata/pull/1444)] simplify operation of map
  - [[#1497](https://github.com/seata/seata/pull/1497)] add seata-all dependencies
  - [[#1490](https://github.com/seata/seata/pull/1490)] remove unnecessary code
  
  
  
  Thanks to these contributors for their code commits. Please report an unintended omission.  
  
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
  
  Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.
  
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases

</details>

### 0.8.0 (2019-08-16)

* [source](https://github.com/seata/seata/archive/v0.8.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.8.0/seata-server-0.8.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.8.0
  
  Seata 0.8.0 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
  
  #### feature：
  - [[#902](https://github.com/seata/seata/pull/902)] support oracle database in AT mode
  - [[#1447](https://github.com/seata/seata/pull/1447)] support oracle batch operation
  - [[#1392](https://github.com/seata/seata/pull/1392)] support undo log table name configurable 
  - [[#1353](https://github.com/seata/seata/pull/1353)] support mysql batch update and batch delete
  - [[#1379](https://github.com/seata/seata/pull/1379)] support -Dkey=value SysConfig
  - [[#1365](https://github.com/seata/seata/pull/1365)] support schedule check table mata
  - [[#1371](https://github.com/seata/seata/pull/1371)] support mysql preparedStatement batch self-increment primary keys
  - [[#1337](https://github.com/seata/seata/pull/1337)] support mysql batch insert for non-self-inc primary keys
  - [[#1235](https://github.com/seata/seata/pull/1453)] support delete expired undolog use protobuf codec
  - [[#1235](https://github.com/seata/seata/pull/1235)] support to delete undolog in back task use seata codec
  - [[#1323](https://github.com/seata/seata/pull/1323)] support database driver class configuration item
  
  
  #### bugfix：
  - [[#1456](https://github.com/seata/seata/pull/1456)] fix xid would be duplicate in cluster mode
  - [[#1454](https://github.com/seata/seata/pull/1454)] fix DateCompareUtils can not compare byte array 
  - [[#1452](https://github.com/seata/seata/pull/1452)] fix select for update retry get dirty value
  - [[#1443](https://github.com/seata/seata/pull/1443)] fix serialize the type of timestamp lost nano value
  - [[#1374](https://github.com/seata/seata/pull/1374)] fix store.mode get configuration inconsistent
  - [[#1409](https://github.com/seata/seata/pull/1409)] fix map.toString() error
  - [[#1344](https://github.com/seata/seata/pull/1344)] fix ByteBuffer allocates a fixed length, which cause BufferOverflowException
  - [[#1419](https://github.com/seata/seata/pull/1419)] fix if the connection is autocommit=false will cause fail to delete
  - [[#1370](https://github.com/seata/seata/pull/1370)] fix begin failed not release channel and throw exception
  - [[#1396](https://github.com/seata/seata/pull/1396)] fix ClassNotFound problem for Nacos config implementation
  - [[#1395](https://github.com/seata/seata/pull/1395)] fix check null channel
  - [[#1385](https://github.com/seata/seata/pull/1385)] fix get SessionManager error when rollback retry timeout
  - [[#1378](https://github.com/seata/seata/pull/1378)] fix clusterAddressMap did not remove the instance after the instance was offline
  - [[#1332](https://github.com/seata/seata/pull/1332)] fix nacos script initialization the configuration value contains ’=‘ failed
  - [[#1341](https://github.com/seata/seata/pull/1341)] fix multiple operations on the same record in the same local transaction, rollback failed
  - [[#1339](https://github.com/seata/seata/pull/1339)] fix when image is EmptyTableRecords, rollback failed
  - [[#1314](https://github.com/seata/seata/pull/1314)] fix if don't specify the startup parameters, db mode don't take effect
  - [[#1342](https://github.com/seata/seata/pull/1342)] fix ByteBuffer allocate len error
  - [[#1333](https://github.com/seata/seata/pull/1333)] fix netty memory leak
  - [[#1338](https://github.com/seata/seata/pull/1338)] fix lock is not acquired when multiple branches have cross locks
  - [[#1334](https://github.com/seata/seata/pull/1334)]  fix lock key npe bug, when tcc use protobuf
  - [[#1313](https://github.com/seata/seata/pull/1313)] fix DefaultFailureHandler check status NPE
  
  
  #### optimize： 
  - [[#1474](https://github.com/seata/seata/pull/1474)] optimize data image compare log
  - [[#1446](https://github.com/seata/seata/pull/1446)] optimize the server's schedule tasks 
  - [[#1448](https://github.com/seata/seata/pull/1448)] refactor executor class remove the duplicate code 
  - [[#1408](https://github.com/seata/seata/pull/1408)] change ChannelFactory package in TmRpcClientTest 
  - [[#1432](https://github.com/seata/seata/pull/1432)] implement equals and hashcode of the object that is used as the hash key 
  - [[#1429](https://github.com/seata/seata/pull/1429)] remove unused imports 
  - [[#1426](https://github.com/seata/seata/pull/1426)] fix syntax error 
  - [[#1425](https://github.com/seata/seata/pull/1425)] fix typo 
  - [[#1356](https://github.com/seata/seata/pull/1356)] optimize sql join 
  - [[#1416](https://github.com/seata/seata/pull/1416)] optimize some javadoc comments
  - [[#1417](https://github.com/seata/seata/pull/1417)] optimize oracle keyword
  - [[#1404](https://github.com/seata/seata/pull/1404)] optimize BranchStatus comments
  - [[#1414](https://github.com/seata/seata/pull/1414)] optimize mysql keywords
  - [[#1407](https://github.com/seata/seata/pull/1407)] disable unstable unit tests
  - [[#1398](https://github.com/seata/seata/pull/1398)] optimize eureka registry serviceUrl with default port
  - [[#1364](https://github.com/seata/seata/pull/1364)] optimize table columns name defined as constants 
  - [[#1389](https://github.com/seata/seata/pull/1389)] add the oracle support prompt information
  - [[#1375](https://github.com/seata/seata/pull/1375)] add compareRows failed log
  - [[#1358](https://github.com/seata/seata/pull/1358)] clean temporary file file runs when UT is finished
  - [[#1355](https://github.com/seata/seata/pull/1355)] add test case for rpc protocol
  - [[#1357](https://github.com/seata/seata/pull/1357)] code clean of Consul&Etcd config center implementations
  - [[#1345](https://github.com/seata/seata/pull/1345)] code clean and modify log level
  - [[#1329](https://github.com/seata/seata/pull/1329)] add `STORE_FILE_DIR` default value
  
  
  Thanks to these contributors for their code commits. Please report an unintended omission.  
  
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
  
  Also, we receive many valuable issues, questions and advices from our community. Thanks for you all.
  
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases

</details>

### 0.7.1 (2019-07-15)

* [source](https://github.com/seata/seata/archive/v0.7.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.7.1/seata-server-0.7.1.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.7.1
  
  Seata 0.7.1 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
    
  #### Bugfix & Optimize
     
  - [[#1297](https://github.com/seata/seata/pull/1297)] seata-spring add dependency seata-codec-all
  - [[#1305](https://github.com/seata/seata/pull/1305)] fix unable to instantiate org.springframework.cloud.alibaba.seata.GlobalTransactionAutoConfiguration
  - fix in the 0.7.0 version, unable to get the seata dependency problem from the central repository
       
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.7.0 (2019-07-12)

* [source](https://github.com/seata/seata/archive/v0.7.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.7.0/seata-server-0.7.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.7.0
  
  Seata 0.7.0 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   #### Feature

  - [[#1276](https://github.com/seata/seata/pull/1276)] New RPC protocol
  - [[#1266](https://github.com/seata/seata/pull/1266)] add enabled configuration for metrics ([97](https://github.com/seata/seata/issues/97))
  - [[#1236](https://github.com/seata/seata/pull/1236)] support metrics for tc server
  - [[#1214](https://github.com/seata/seata/pull/1214)] add config `shutdown.wait` and update version to 0.7.0-SNAPSHOT ([1212](https://github.com/seata/seata/issues/1212))
  - [[#1206](https://github.com/seata/seata/pull/1206)] setting default values using trinomial operators
  - [[#1174](https://github.com/seata/seata/pull/1174)] add nacos config initialization python script ([1172](https://github.com/seata/seata/issues/1172))
  - [[#1145](https://github.com/seata/seata/pull/1145)] Change LockMode from MEMORY to DB when the StoreMode is DB
  - [[#1125](https://github.com/seata/seata/pull/1125)] Add protostuff as serializer of UndoLogParser.
  - [[#1007](https://github.com/seata/seata/pull/1007)] support protobuf feature ([97](https://github.com/seata/seata/issues/97))


   #### Bugfix & Optimize
    
  - [[#1286](https://github.com/seata/seata/pull/1286)] bugfix: add some configuration and exclude log dependency ([97](https://github.com/seata/seata/issues/97))
  - [[#1278](https://github.com/seata/seata/pull/1278)] bugfix: pass txId into TCC interceptor
  - [[#1274](https://github.com/seata/seata/pull/1274)] 1. optimization SQL join
  - [[#1271](https://github.com/seata/seata/pull/1271)] bugfix: @GlobalLock get error with Response ([97](https://github.com/seata/seata/issues/97), [1224](https://github.com/seata/seata/issues/1224))
  - [[#1270](https://github.com/seata/seata/pull/1270)] bugfix: print error exception
  - [[#1269](https://github.com/seata/seata/pull/1269)] bugfix: fix TMClinet reconnect exception
  - [[#1265](https://github.com/seata/seata/pull/1265)] Invoke addBatch of targetStatement if not in global transaction
  - [[#1264](https://github.com/seata/seata/pull/1264)] configuration:update ignore and coverage ([97](https://github.com/seata/seata/issues/97))
  - [[#1263](https://github.com/seata/seata/pull/1263)] docs: add doc about contribution ([97](https://github.com/seata/seata/issues/97))
  - [[#1262](https://github.com/seata/seata/pull/1262)] bugfix: fix find target class issue if scan the web scope bean such a… ([97](https://github.com/seata/seata/issues/97))
  - [[#1261](https://github.com/seata/seata/pull/1261)] add warn log when fail to get auto-generated keys. (#1259) ([97](https://github.com/seata/seata/issues/97), [1259](https://github.com/seata/seata/issues/1259))
  - [[#1258](https://github.com/seata/seata/pull/1258)] move metrics config keys and simplify metrics modules dependency
  - [[#1250](https://github.com/seata/seata/pull/1250)] fix codecov for protobuf ([97](https://github.com/seata/seata/issues/97))
  - [[#1245](https://github.com/seata/seata/pull/1245)] refactor metrics let it initialize by configuration
  - [[#1242](https://github.com/seata/seata/pull/1242)] perfect sql
  - [[#1239](https://github.com/seata/seata/pull/1239)] bugfix:fix CME in ZK discovery implementation. ([97](https://github.com/seata/seata/issues/97))
  - [[#1237](https://github.com/seata/seata/pull/1237)] bugfix:server start  and handle remain branch session may cause NPE ([97](https://github.com/seata/seata/issues/97))
  - [[#1232](https://github.com/seata/seata/pull/1232)] Add unit tests for io.seata.common.util CompressUtil, DurationUtil, ReflectionUtil
  - [[#1230](https://github.com/seata/seata/pull/1230)] prioritize global transaction scanner #1227 ([97](https://github.com/seata/seata/issues/97), [1227](https://github.com/seata/seata/issues/1227))
  - [[#1229](https://github.com/seata/seata/pull/1229)] fix a typo ([97](https://github.com/seata/seata/issues/97))
  - [[#1225](https://github.com/seata/seata/pull/1225)] optimize the name of seata config environment. ([97](https://github.com/seata/seata/issues/97), [1209](https://github.com/seata/seata/issues/1209))
  - [[#1222](https://github.com/seata/seata/pull/1222)] fix bug of refresh cluster ([1160](https://github.com/seata/seata/issues/1160))
  - [[#1221](https://github.com/seata/seata/pull/1221)] bugfix: fix in which SQL and database field names are inconsistent#1217 ([1217](https://github.com/seata/seata/issues/1217))
  - [[#1218](https://github.com/seata/seata/pull/1218)] bugfix:containsPK ignoreCase ([1217](https://github.com/seata/seata/issues/1217))
  - [[#1210](https://github.com/seata/seata/pull/1210)] 1. optimize arrayList single value
  - [[#1207](https://github.com/seata/seata/pull/1207)] All overriding methods must be preceded by @Override annotations.
  - [[#1205](https://github.com/seata/seata/pull/1205)] remove useless code
  - [[#1202](https://github.com/seata/seata/pull/1202)] output branchRollback failed log ([97](https://github.com/seata/seata/issues/97))
  - [[#1200](https://github.com/seata/seata/pull/1200)] bugfix:DefaultCoreTest.branchRegisterTest ([1199](https://github.com/seata/seata/issues/1199))
  - [[#1198](https://github.com/seata/seata/pull/1198)] check the third-party dependencies license ([1197](https://github.com/seata/seata/issues/1197))
  - [[#1195](https://github.com/seata/seata/pull/1195)] Clear the transaction context in TCC prepare methed
  - [[#1193](https://github.com/seata/seata/pull/1193)] Get lockmode by the storemode
  - [[#1190](https://github.com/seata/seata/pull/1190)] remove unused semicolons ([97](https://github.com/seata/seata/issues/97), [540](https://github.com/seata/seata/issues/540))
  - [[#1179](https://github.com/seata/seata/pull/1179)] fix jackson default content
  - [[#1177](https://github.com/seata/seata/pull/1177)] write session may be failed，throw TransactionException but hold lock. ([97](https://github.com/seata/seata/issues/97), [1154](https://github.com/seata/seata/issues/1154))
  - [[#1169](https://github.com/seata/seata/pull/1169)] bugfix: use Set to avoid duplicate listeners. fixes #1126 ([1126](https://github.com/seata/seata/issues/1126))
  - [[#1165](https://github.com/seata/seata/pull/1165)] add a missing placeholder in INSERT_UNDO_LOG_SQL ([1164](https://github.com/seata/seata/issues/1164))
  - [[#1162](https://github.com/seata/seata/pull/1162)] Reset initialized flag & instance while destroy(). split [##1105 ([983](https://github.com/seata/seata/issues/983), [97](https://github.com/seata/seata/issues/97))
  - [[#1159](https://github.com/seata/seata/pull/1159)] bugfix: AT mode resourceId(row_key) too long ([97](https://github.com/seata/seata/issues/97), [1158](https://github.com/seata/seata/issues/1158))
  - [[#1150](https://github.com/seata/seata/pull/1150)] updates seata's version in README.md ([97](https://github.com/seata/seata/issues/97))
  - [[#1148](https://github.com/seata/seata/pull/1148)] bugfix:the buffer may cause overflows when sql statement is long
  - [[#1146](https://github.com/seata/seata/pull/1146)] revise the package name of the module ([97](https://github.com/seata/seata/issues/97))
  - [[#1105](https://github.com/seata/seata/pull/1105)] refactor TmRpcClient & RmClient for common use. ([97](https://github.com/seata/seata/issues/97))
  - [[#1075](https://github.com/seata/seata/pull/1075)] Multiple environmental isolation
  - [[#768](https://github.com/seata/seata/pull/768)] #751 add event bus mechanism and apply it in tc
     
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.6.1 (2019-05-31)

* [source](https://github.com/seata/seata/archive/v0.6.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.6.1/seata-server-0.6.1.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.6.1
  
  Seata 0.6.1 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
     
  #### Feature
   
   - [[#1119](https://github.com/seata/seata/pull/1119)] support weibo/motan 
   - [[#1075](https://github.com/seata/seata/pull/1075)] Multiple environmental isolation
   
  #### Bugfix & Optimize
   
   - [[#1099](https://github.com/seata/seata/pull/1099)] UndoLogParser change to SPI
   - [[#1113](https://github.com/seata/seata/pull/1113)] optimize check style
   - [[#1087](https://github.com/seata/seata/pull/1087)] Remove unnecessary copy of bytes
   - [[#1090](https://github.com/seata/seata/pull/1090)] Change the method definition of UndoLogParser for better extensibility
   - [[#1120](https://github.com/seata/seata/pull/1120)] bugfix : use xid wrong when do branch commit and rollback
   - [[#1135](https://github.com/seata/seata/pull/1135)] bugfix:zk vulnerability and optimize dependencies
   - [[#1138](https://github.com/seata/seata/pull/1138)] bugfix: seata-server.bat classpath too long
   - [[#1117](https://github.com/seata/seata/pull/1117)] bugfix: fix field type is datetime equals fail 
   - [[#1115](https://github.com/seata/seata/pull/1115)] modify seata-all & seata-bom deploy config
   
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.6.0 (2019-05-24)

* [source](https://github.com/seata/seata/archive/v0.6.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.6.0/seata-server-0.6.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.6.0
  
  Seata 0.6.0 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
         
   #### Feature
   
   - [[#942](https://github.com/seata/seata/pull/942)] Store the transaction log into database
   - [[#1014](https://github.com/seata/seata/pull/1014)] Support etcd3 as configuration center 
   - [[#1060](https://github.com/seata/seata/pull/1060)] Do data validation when undo
   
   #### Bugfix & Optimize
   
   - [[#1064](https://github.com/seata/seata/pull/1064)] bugfix:size wrong between xid and branchId
   - [[#1074](https://github.com/seata/seata/pull/1074)] bugfix:typos and replace AIT's with lambdas
   - [[#824](https://github.com/seata/seata/pull/824)] Add time limit when transaction retry on the server
   - [[#1082](https://github.com/seata/seata/pull/1082)] add Cache configuration instance
   - [[#1084](https://github.com/seata/seata/pull/1084)] Refactor Charset using and blob utils
   - [[#1080](https://github.com/seata/seata/pull/1080)] upgrade fastjson and nacos-client 
   
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.5.2 (2019-05-17)

* [source](https://github.com/seata/seata/archive/v0.5.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.5.2/seata-server-0.5.2.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.5.2
  
  Seata 0.5.2 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
     
   #### Feature
   
   - [[#988](https://github.com/seata/seata/pull/988)] support Consul configuration center
   - [[#1043](https://github.com/seata/seata/pull/1043)] support sofa-rpc
   
   
   #### Bugfix & Optimize
   
   - [[#987](https://github.com/seata/seata/pull/987)] optimize the use of reentrantLock instead of spinlock in concurrent scenarios within the same transaction
   - [[#943](https://github.com/seata/seata/pull/943)] fix configuration wait timeout when there is no corresponding file configuration item
   - [[#965](https://github.com/seata/seata/pull/965)] fix PreparedStatement where in,between problem
   - [[#929](https://github.com/seata/seata/pull/929)] optimize GlobalSession for the first time to wait for locks
   - [[#967](https://github.com/seata/seata/pull/967)] optimize partial log description
   - [[#970](https://github.com/seata/seata/pull/970)] fix unable to read flush-disk-mode configuration item problem
   - [[#916](https://github.com/seata/seata/pull/916)] optimize the readable index problem of decoding
   - [[#979](https://github.com/seata/seata/pull/979)] optimize copyright
   - [[#981](https://github.com/seata/seata/pull/981)] optimize pom dependencies, use caffine instead of guava cache, junit upgrade to junit5, use junit5 to transform original testng unit tests
   - [[#991](https://github.com/seata/seata/pull/991)] optimize the header of the core module import 
   - [[#996](https://github.com/seata/seata/pull/996)] fix maven-surefire-plugin compilation error in mac environment
   - [[#994](https://github.com/seata/seata/pull/994)] Fix ByteBuffer multiple flip problem
   - [[#999](https://github.com/seata/seata/pull/999)] change the community's email subscription address
   - [[#861](https://github.com/seata/seata/pull/861)] optimize the FailureHandler to periodically get the retrieved transaction result and print the successful result
   - [[#802](https://github.com/seata/seata/pull/802)] optimize the lambda code style in GlobalTransactionalInterceptor
   - [[#1026](https://github.com/seata/seata/pull/1026)] fix troubleshooting for data* code files, add local transaction file exclusion path
   - [[#1024](https://github.com/seata/seata/pull/1024)] fix Consul module SPI configuration file path problem
   - [[#1023](https://github.com/seata/seata/pull/1023)] add the seata-all.jar for client full dependency
   - [[#1029](https://github.com/seata/seata/pull/1029)] fix the delay rollback caused by no channel when the client is restarting
   - [[#1027](https://github.com/seata/seata/pull/1027)] fix release-seata can not generate zip file problem
   - [[#1033](https://github.com/seata/seata/pull/1033)] fix createDependencyReducedPom to generate redundant xml problem
   - [[#1035](https://github.com/seata/seata/pull/1035)] fix branchCommit/branchRollback in TCC mode, but branchId is null
   - [[#1040](https://github.com/seata/seata/pull/1040)] refactor exceptionHandleTemplate and fix the problem that cannot be returned when the GlobalRollback branch throw exception
   - [[#1036](https://github.com/seata/seata/pull/1036)] replace Chinese comment with English comment
   - [[#1051](https://github.com/seata/seata/pull/1051)] optimize to check data changes when rollback, stop rollback if there is no data change
   - [[#1017](https://github.com/seata/seata/pull/1017)] optimize the processing logic of mysql undo executor construct undo sql
   - [[#1063](https://github.com/seata/seata/pull/1063)] fix the problem that the new transaction id conflict fails after the server is restarted after the server is restarted
   
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.5.1 (2019-04-30)

* [source](https://github.com/seata/seata/archive/v0.5.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.5.1/seata-server-0.5.1.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.5.1
  
  Seata 0.5.1 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
    
   #### Feature
     
  - [[#774](https://github.com/seata/seata/pull/869)] support Etcd3 registration center
  - [[#793](https://github.com/seata/seata/pull/793)] support sofa-registry registration center
  - [[#856](https://github.com/seata/seata/pull/856)] add batch delete undolog processing
  - [[#786](https://github.com/seata/seata/pull/786)] support for branch transaction concurrency in global transactions
     
     
     
   #### Bugfix & Optimize
     
  - [[#879](https://github.com/seata/seata/pull/879)] fix when batch delete undolog,the preparedStatement does not close
  - [[#945](https://github.com/seata/seata/pull/945)] add the releaseLock method in the LockManager interface to optimize the calling logic
  - [[#938](https://github.com/seata/seata/pull/938)] optimize the TransactionManager service loading logic
  - [[#913](https://github.com/seata/seata/pull/913)] optimize the module structure of the RPC integration framework
  - [[#795](https://github.com/seata/seata/pull/795)] optimize the performance of server node write files
  - [[#921](https://github.com/seata/seata/pull/921)] fix NPE exception when select for update
  - [[#925](https://github.com/seata/seata/pull/925)] optimize the same DefaultCoordinator instance when the server starts
  - [[#930](https://github.com/seata/seata/pull/930)] optimize field access modifiers 
  - [[#907](https://github.com/seata/seata/pull/907)] fix hostname can't be null exception
  - [[#923](https://github.com/seata/seata/pull/923)] fix the problem that the key is not formatted when the nettyClientKeyPool connection is destroyed
  - [[#891](https://github.com/seata/seata/pull/891)] fix the NPE exception when using select union all
  - [[#888](https://github.com/seata/seata/pull/888)] fix copyright checkstyle verification
  - [[#901](https://github.com/seata/seata/pull/901)] fix parent node path does not exist when Zookeeper is registered
  - [[#904](https://github.com/seata/seata/pull/904)] optimize updated data query logic in UpdateExecutort
  - [[#802](https://github.com/seata/seata/pull/802)] optimize checkstyle and add plugins
  - [[#882](https://github.com/seata/seata/pull/882)] modify copyright, add copyright automatic plugin
  - [[#874](https://github.com/seata/seata/pull/874)] add the communication default configuration value
  - [[#866](https://github.com/seata/seata/pull/866)] fix unable to generate dubbo:reference proxy class
  - [[#877](https://github.com/seata/seata/pull/877)] fix concurrentModifyException when batch deleting undolog
  - [[#855](https://github.com/seata/seata/pull/855)] optimize the globalCommit always returns committed to the user in AT mode
  - [[#875](https://github.com/seata/seata/pull/875)] fix select for update, Boolean cast ResultSet failed
  - [[#830](https://github.com/seata/seata/pull/830)] fix RM late registration problem
  - [[#872](https://github.com/seata/seata/pull/872)] fix RegisterRMRequest decoding message length check is not accurate
  - [[#831](https://github.com/seata/seata/pull/831)] optimize CountDownLatch in MessageFuture and replace it with CompletableFuture
  - [[#834](https://github.com/seata/seata/pull/834)] fix non-SQLException in ExecuteTemplate does not throw a exception
       
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.5.0 (2019-04-19)

* [source](https://github.com/seata/seata/archive/0.5.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/0.5.0/seata-server-0.5.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.5.0
  
  Seata 0.5.0 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   #### Compatibility
   
   - [[#809](https://github.com/seata/seata/pull/809)] Change groupId,artifactId, and package
   - [[#815](https://github.com/seata/seata/pull/815)] Add maven plugin to release seata with groupId io.seata
   - [[#790](https://github.com/seata/seata/pull/790)] Change the startup parameters of seata-server to support database-storage
   - [[#769](https://github.com/seata/seata/pull/769)] Modify the RPC protocol, remove the client's resolution of xid to be stateless
   
   #### Feature
   
   - [[#774](https://github.com/seata/seata/pull/774)] optimizes the structure of config module and discovery module 
   - [[#783](https://github.com/seata/seata/pull/783)] Allow users config the count for client report retry dynamicly 
   - [[#791](https://github.com/seata/seata/pull/791)] replace magic judgement of timeout status with status enum
   - [[#836](https://github.com/seata/seata/pull/836)] Use maven-compiler-plugin to revision the version and add mvnw script to unify the maven version
   - [[#820](https://github.com/seata/seata/pull/820)] Add rollback on for GlobalTransaction
   
   
   #### Bugfix
   
   - [[#772](https://github.com/seata/seata/pull/772)] Fix FileConfiguration config listener logic
   - [[#807](https://github.com/seata/seata/pull/807)] Optimize the setting of full name of FileBasedSessionManager
   - [[#804](https://github.com/seata/seata/pull/804)] bugfix:branchCommit retry always failed
   
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.4.2 (2019-04-12)

* [source](https://github.com/seata/seata/archive/v0.4.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.2/fescar-server-0.4.2.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.4.2
  
  Seata 0.4.2 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
  
   #### Feature
   
   - [[#704](https://github.com/seata/seata/pull/704)] add local file write ByteBuffer pool
   - [[#679](https://github.com/seata/seata/issues/679)] The existing registry adds the implementation of the close interface, which optimizes the server's elegant offline 
   - [[#713](https://github.com/seata/seata/pull/713)] add local file writes enable compression for messages that exceed the configured size
   - [[#587](https://github.com/seata/seata/issues/587)] Added MySQL DDL statement support
   - [[#717](https://github.com/seata/seata/pull/717)] add Nacos Initialization Configuration Script Configuration and Completion Program Configuration File
   - [[#726](https://github.com/seata/seata/pull/726)] support for DBCP, C3P0, BoneCP, HikariCP and Tomcat-JDBC connection pools
   - [[#744](https://github.com/seata/seata/pull/744)] add ZooKeeper disconnection re-registration and subscription when reconnected
   - [[#728](https://github.com/seata/seata/pull/728)] Supports service discovery with Consul 
   
   #### Bugfix
   
   - [[#569](https://github.com/seata/seata/pull/695)] fix already jdk proxy and no target only traverses the first implementation interface problem
   - [[#721](https://github.com/seata/seata/pull/721)] fix ConfigFuture constructor timeout parameter does not work
   - [[#725](https://github.com/seata/seata/pull/725)] fix MergedSendRunnable channel is unexpectedly closed, and add fail-fast
   - [[#723](https://github.com/seata/seata/pull/723)] fix defaultServerMessageListener is not initialized
   - [[#746](https://github.com/seata/seata/pull/746)] fix the failure of the test module caused by the DataSourceManager SPI
   - [[#754](https://github.com/seata/seata/pull/754)] optimize Eureka registry
   - [[#750](https://github.com/seata/seata/pull/750)] fix undolog caused by DataSourceManager SPI cannot delete problem
   - [[#747](https://github.com/seata/seata/pull/747)] Delete MT mode, then will be replaced by TCC mode 
   - [[#757](https://github.com/seata/seata/pull/757)] fix rollback caused by RPC exception when performing BranchRollback retry
   - [[#776](https://github.com/seata/seata/pull/776)] fix connection creation failure caused by toString exception when connection pool creates channel
   
     
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.4.1 (2019-03-29)

* [source](https://github.com/seata/seata/archive/v0.4.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.1/fescar-server-0.4.1.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.4.1
  
  Seata 0.4.1 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

  - TBD
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.4.0 (2019-03-19)

* [source](https://github.com/seata/seata/archive/v0.4.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.4.0/fescar-server-0.4.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.4.0
  
  Seata 0.4.0 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   #### Feature
   
   - [[#583](https://github.com/alibaba/fescar/pull/583)] Add TCC model of Ant Financial to fescar, to suppot Local TCC bean，Dubbo TCC bean and SOFARPC TCC bean
   - [[#611](https://github.com/alibaba/fescar/pull/611)] Apply p3c pmd plugin/rules
   - [[#627](https://github.com/alibaba/fescar/pull/627)] Optimization dependency
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.3.1 (2019-03-15)

* [source](https://github.com/seata/seata/archive/v0.3.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.3.1/fescar-server-0.3.1.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.3.1
  
  Seata 0.3.1 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   #### Feature
   
   - [[#557](https://github.com/alibaba/fescar/issues/557)] add custom hook access point at each stage of the transaction process
   - [[#594](https://github.com/alibaba/fescar/pull/594)] support Zookeeper Registration Center   
   
   #### Bugfix
   
   - [[#569](https://github.com/alibaba/fescar/issues/569)] fix eureka renew url encode
   - [[#551](https://github.com/alibaba/fescar/pull/551)] fix ConfigType NPE 
   - [[#489](https://github.com/alibaba/fescar/issues/489)] fix GlobalRollback request but not receive report
   - [[#598](https://github.com/alibaba/fescar/pull/598)] fix blocker and critical level issues scanned by p3c
   
       
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.3.0 (2019-03-08)

* [source](https://github.com/seata/seata/archive/v0.3.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.3.0/fescar-server-0.3.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.3.0
  
  Seata 0.3.0 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   #### Feature
   
   - [[#510](https://github.com/alibaba/fescar/pull/510)] Support eureka registry center
   - [[#498](https://github.com/alibaba/fescar/pull/498)] Implement local transaction mode with global locks and resolve local transaction isolation issues  
   
   #### Bugfix
   
   - [[#459](https://github.com/alibaba/fescar/issues/459)] Fix mysql keyword generating sql problem as table name and column name
   - [[#312](https://github.com/alibaba/fescar/issues/312)] Fix the original business sql no where condition generation sql error problem 
   - [[#522](https://github.com/alibaba/fescar/issues/522)] Fix file path security vulnerability
   - Remove useless, format, optimize import, javadoc, copyright for all module code
   
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.2.3 (2019-03-02)

* [source](https://github.com/seata/seata/archive/v0.2.3.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.3/fescar-server-0.2.3.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.2.3
  
  Seata 0.2.3 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   #### Feature
   
   - [[#478](https://github.com/alibaba/fescar/pull/478)] Support redis registry and apollo configuration
   - [[#478](https://github.com/alibaba/fescar/pull/478)] Support redis registry and apollo configuration
   
   #### Bugfix
   
   - [[#462](https://github.com/alibaba/fescar/issues/462)] Separation configuration and registration judgment
   
   - [[#466](https://github.com/alibaba/fescar/issues/466)] Add run oldest task reject policy
   
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.2.2 (2019-02-22)

* [source](https://github.com/seata/seata/archive/v0.2.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.2/fescar-server-0.2.2.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.2.2
  
  Seata 0.2.2 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:
    
   - Fixed several bugs
   
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.2.1 (2019-02-18)

* [source](https://github.com/seata/seata/archive/v0.2.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.1/fescar-server-0.2.1.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.2.1
  
  Seata 0.2.1 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   #### Feature
   
   - Support BETWEEN in update statement
   - Add Random and RoundRobin LoadBalance
   - Add dubbo-alibaba module support Alibaba Dubbo
   
   #### Bugfix
   
   - Fix NettyClientConfig variable name isPoolFifo-> isPoolLifo
   - Fix fescar-dubbo filter SPI reference error
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.2.0 (2019-02-14)

* [source](https://github.com/seata/seata/archive/v0.2.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.2.0/fescar-server-0.2.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.2.0
  
  Seata 0.2.0 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   #### Feature
   
   - Support MySQL distributed transaction automatic mode (AT)
   - Supports Dubbo seamless integration
   - Support for distributed transaction API
   - Support Spring transaction annotation
   - Support Mybatis、JPA
   - Support Nacos Service Registration and Configuration Center
   - Add Fescar-Server automatic recovery from file unfinished transaction operations to memory when restarting
   - Support multiple IP environment, start server to specify IP parameters
   
   #### Bugfix
   
   - Fix Fescar-Server restart may cause XID duplication
   - Fix Windows startup script $EXTRA_JVM_ARGUMENTS parameter error
   - Fix distributed transaction local nested inner transaction commit/rollback causes outer transaction exception problem
   - Fix local transaction commit exception, local transaction does not rollback problem
   - Fix MySQL table alias resolution
   
   #### other
   - Upgrade depends on JDK version to 1.8
   - Upgrade dependency Alibaba Dubbo to Apache Dubbo 2.7.0
   - Optimize related dependency references
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.1.4 (2019-02-11)

* [source](https://github.com/seata/seata/archive/v0.1.4.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.1.4/fescar-server-0.1.4.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.1.4
  
  Seata 0.1.4 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

   - Fixed several bugs
   - Upgrade jdk version to 1.8
   
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.1.3 (2019-01-29)

* [source](https://github.com/seata/seata/archive/v0.1.3.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.1.3/fescar-server-0.1.3.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.1.3
  
  Seata 0.1.3 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

  - Fixed several bugs
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.1.2 (2019-01-25)

* [source](https://github.com/seata/seata/archive/V0.1.2.zip) 
* [binary](https://github.com/seata/seata/releases/download/V0.1.2/fescar-server-0.1.2.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.1.2
  
  Seata 0.1.2 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

  - Fixed several bugs
 
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.1.1 (2019-01-18)

* [source](https://github.com/seata/seata/archive/v0.1.1.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.1.1/fescar-server-0.1.1.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.1.1
  
  Seata 0.1.1 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

  - Fixed several bugs
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>

### 0.1.0 (2019-01-09)

* [source](https://github.com/seata/seata/archive/v0.1.0.zip) 
* [binary](https://github.com/seata/seata/releases/download/v0.1.0/fescar-server-0.1.0.zip) 
<details>
  <summary><mark>Release notes</mark></summary>

  ### Seata 0.1.0
  
  Seata 0.1.0 Released.
  
  Seata is an easy-to-use, high-performance, open source distributed transaction solution.
  
  The version is updated as follows:

  - Support MySQL in AT Mode
  - Support Dubbo
  - API Provided
  - Spring based annotation Provided
  - Standalone server
    
  #### Link
  - **Seata:** https://github.com/seata/seata  
  - **Seata-Samples:** https://github.com/seata/seata-samples   
  - **Release:** https://github.com/seata/seata/releases
</details>
