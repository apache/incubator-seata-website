---
title: Downloads
keywords: Seata, Downloads, Version
description: This article will introduce you how to understand the details of each version and upgrade matters needing attention.
---


# Downloads

# Seata

> GitHub: https://github.com/seata/seata \
> Release Notes: https://github.com/seata/seata/releases

## 0.9.0 (2019-10-16)

 [source](https://github.com/seata/seata/archive/v0.8.1.zip) |
 [binary](https://github.com/seata/seata/releases/download/v0.8.1/seata-server-0.8.1.zip) 
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
