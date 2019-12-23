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
