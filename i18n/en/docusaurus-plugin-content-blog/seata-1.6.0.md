---
title: Seata 1.6.0 Released with Significant Performance Improvement
author: Seata Community
keywords: [seata, distributed transaction, 1.6.0]
description: Seata 1.6.0 Released with Significant Performance Improvement
date: 2022/12/17
---
### Seata 1.6.0 Released with Significant Performance Improvement

Seata is an open-source distributed transaction solution that provides high performance and easy-to-use distributed transaction services.

**Download Links for seata-server:**

[source](https://github.com/apache/incubator-seata/archive/v1.6.0.zip) |
[binary](https://github.com/apache/incubator-seata/releases/download/v1.6.0/seata-server-1.6.0.zip)

Updates in this version:

### feature：
- [[#4863](https://github.com/apache/incubator-seata/pull/4863)] Support for multiple primary keys in Oracle and PostgreSQL
- [[#4649](https://github.com/apache/incubator-seata/pull/4649)] Support for multiple registry centers in seata-server
- [[#4779](https://github.com/apache/incubator-seata/pull/4779)] Support for Apache Dubbo3
- [[#4479](https://github.com/apache/incubator-seata/pull/4479)] TCC annotations can now be added to interfaces and implementation classes
- [[#4877](https://github.com/apache/incubator-seata/pull/4877)] Client SDK supports JDK17
- [[#4914](https://github.com/apache/incubator-seata/pull/4914)] Support for update join syntax for MySQL
- [[#4542](https://github.com/apache/incubator-seata/pull/4542)] Support for Oracle timestamp type
- [[#5111](https://github.com/apache/incubator-seata/pull/5111)] Support for Nacos contextPath configuration
- [[#4802](https://github.com/apache/incubator-seata/pull/4802)] Dockerfile supports arm64

### Bug Fixes:
- [[#4780](https://github.com/apache/incubator-seata/pull/4780)] Fixed the issue where TimeoutRollbacked event wasn't sent after a successful timeout rollback.
- [[#4954](https://github.com/apache/incubator-seata/pull/4954)] Fixed NullPointerException when the output expression was incorrect.
- [[#4817](https://github.com/apache/incubator-seata/pull/4817)] Fixed the problem with non-standard configuration in higher versions of Spring Boot.
- [[#4838](https://github.com/apache/incubator-seata/pull/4838)] Fixed the issue where undo log wasn't generated when using Statement.executeBatch().
- [[#4533](https://github.com/apache/incubator-seata/pull/4533)] Fixed inaccurate metric data caused by duplicate events handling for handleRetryRollbacking.
- [[#4912](https://github.com/apache/incubator-seata/pull/4912)] Fixed the issue where mysql InsertOnDuplicateUpdate couldn't correctly match column names due to inconsistent case.
- [[#4543](https://github.com/apache/incubator-seata/pull/4543)] Fixed support for Oracle nclob data type.
- [[#4915](https://github.com/apache/incubator-seata/pull/4915)] Fixed the problem of not obtaining ServerRecoveryProperties attributes.
- [[#4919](https://github.com/apache/incubator-seata/pull/4919)] Fixed the issue where XID's port and address appeared as null:0.
- [[#4928](https://github.com/apache/incubator-seata/pull/4928)] Fixed NPE issue in rpcContext.getClientRMHolderMap.
- [[#4953](https://github.com/apache/incubator-seata/pull/4953)] Fixed the issue where InsertOnDuplicateUpdate could bypass primary key modification.
- [[#4978](https://github.com/apache/incubator-seata/pull/4978)] Fixed kryo support for cyclic dependencies.
- [[#4985](https://github.com/apache/incubator-seata/pull/4985)] Fixed the issue of duplicate undo_log id.
- [[#4874](https://github.com/apache/incubator-seata/pull/4874)] Fixed startup failure with OpenJDK 11.
- [[#5018](https://github.com/apache/incubator-seata/pull/5018)] Fixed server startup failure issue due to loader path using relative path in startup script.
- [[#5004](https://github.com/apache/incubator-seata/pull/5004)] Fixed the issue of duplicate row data in mysql update join.
- [[#5032](https://github.com/apache/incubator-seata/pull/5032)] Fixed the abnormal SQL statement in mysql InsertOnDuplicateUpdate due to incorrect calculation of condition parameter fill position.
- [[#5033](https://github.com/apache/incubator-seata/pull/5033)] Fixed NullPointerException issue in SQL statement of InsertOnDuplicateUpdate due to missing insert column field.
- [[#5038](https://github.com/apache/incubator-seata/pull/5038)] Fixed SagaAsyncThreadPoolProperties conflict issue.
- [[#5050](https://github.com/apache/incubator-seata/pull/5050)] Fixed the issue where global status under Saga mode wasn't correctly changed to Committed.
- [[#5052](https://github.com/apache/incubator-seata/pull/5052)] Fixed placeholder parameter issue in update join condition.
- [[#5031](https://github.com/apache/incubator-seata/pull/5031)] Fixed the issue of using null value index as query condition in InsertOnDuplicateUpdate.
- [[#5075](https://github.com/apache/incubator-seata/pull/5075)] Fixed the inability to intercept SQL statements with no primary key and unique index in InsertOnDuplicateUpdate.
- [[#5093](https://github.com/apache/incubator-seata/pull/5093)] Fixed accessKey loss issue after seata server restart.
- [[#5092](https://github.com/apache/incubator-seata/pull/5092)] Fixed the issue of incorrect AutoConfiguration order when seata and jpa are used together.
- [[#5109](https://github.com/apache/incubator-seata/pull/5109)] Fixed NPE issue when @GlobalTransactional is not applied on RM side.
- [[#5098](https://github.com/apache/incubator-seata/pull/5098)] Disabled oracle implicit cache for Druid.
- [[#4860](https://github.com/apache/incubator-seata/pull/4860)] Fixed metrics tag override issue.
- [[#5028](https://github.com/apache/incubator-seata/pull/5028)] Fixed null value issue in insert on duplicate SQL.
- [[#5078](https://github.com/apache/incubator-seata/pull/5078)] Fixed interception issue for SQL statements without primary keys and unique keys.
- [[#5097](https://github.com/apache/incubator-seata/pull/5097)] Fixed accessKey loss issue when Server restarts.
- [[#5131](https://github.com/apache/incubator-seata/pull/5131)] Fixed issue where XAConn cannot rollback when in active state.
- [[#5134](https://github.com/apache/incubator-seata/pull/5134)] Fixed issue where hikariDataSource auto proxy fails in some cases.
- [[#5163](https://github.com/apache/incubator-seata/pull/5163)] Fixed compilation failure in higher versions of JDK.

### Optimization:
- [[#4681](https://github.com/apache/incubator-seata/pull/4681)] Optimized the process of competing locks.
- [[#4774](https://github.com/apache/incubator-seata/pull/4774)] Optimized mysql8 dependency in seataio/seata-server image.
- [[#4750](https://github.com/apache/incubator-seata/pull/4750)] Optimized the release of global locks in AT branch to not use xid.
- [[#4790](https://github.com/apache/incubator-seata/pull/4790)] Added automatic OSSRH github action publishing.
- [[#4765](https://github.com/apache/incubator-seata/pull/4765)] XA mode in mysql8.0.29 and above no longer holds connection to the second phase.
- [[#4797](https://github.com/apache/incubator-seata/pull/4797)] Optimized all github actions scripts.
- [[#4800](https://github.com/apache/incubator-seata/pull/4800)] Added NOTICE file.
- [[#4761](https://github.com/apache/incubator-seata/pull/4761)] Used hget instead of hmget in RedisLocker.
- [[#4414](https://github.com/apache/incubator-seata/pull/4414)] Removed log4j dependency.
- [[#4836](https://github.com/apache/incubator-seata/pull/4836)] Improved readability of BaseTransactionalExecutor#buildLockKey(TableRecords rowsIncludingPK) method.
- [[#4865](https://github.com/apache/incubator-seata/pull/4865)] Fixed security vulnerabilities in Saga visualization designer GGEditor.
- [[#4590](https://github.com/apache/incubator-seata/pull/4590)] Dynamic configuration support for automatic degradation switch.
- [[#4490](https://github.com/apache/incubator-seata/pull/4490)] Optimized tccfence record table to delete by index.
- [[#4911](https://github.com/apache/incubator-seata/pull/4911)] Added header and license checks.
- [[#4917](https://github.com/apache/incubator-seata/pull/4917)] Upgraded package-lock.json to fix vulnerabilities.
- [[#4924](https://github.com/apache/incubator-seata/pull/4924)] Optimized pom dependencies.
- [[#4932](https://github.com/apache/incubator-seata/pull/4932)] Extracted default values for some configurations.
- [[#4925](https://github.com/apache/incubator-seata/pull/4925)] Optimized javadoc comments.
- [[#4921](https://github.com/apache/incubator-seata/pull/4921)] Fixed security vulnerabilities in console module and upgraded skywalking-eyes version.
- [[#4936](https://github.com/apache/incubator-seata/pull/4936)] Optimized storage configuration reading.
- [[#4946](https://github.com/apache/incubator-seata/pull/4946)] Passed SQL exceptions encountered when acquiring locks to the client.
- [[#4962](https://github.com/apache/incubator-seata/pull/4962)] Optimized build configuration and corrected base image of docker image.
- [[#4974](https://github.com/apache/incubator-seata/pull/4974)] Removed limitation on querying globalStatus quantity under redis mode.
- [[#4981](https://github.com/apache/incubator-seata/pull/4981)] Improved error message when tcc fence record cannot be found.
- [[#4995](https://github.com/apache/incubator-seata/pull/4995)] Fixed duplicate primary key query conditions in the SQL statement after mysql InsertOnDuplicateUpdate.
- [[#5047](https://github.com/apache/incubator-seata/pull/5047)] Removed unused code.
- [[#5051](https://github.com/apache/incubator-seata/pull/5051)] When undolog generates dirty write during rollback, throw exception BranchRollbackFailed_Unretriable.
- [[#5075](https://github.com/apache/incubator-seata/pull/5075)] Intercept insert on duplicate update statements without primary keys and unique indexes.
- [[#5104](https://github.com/apache/incubator-seata/pull/5104)] ConnectionProxy is no longer dependent on druid.
- [[#5124](https://github.com/apache/incubator-seata/pull/5124)] Support deleting TCC fence record table for oracle.
- [[#4468](https://github.com/apache/incubator-seata/pull/4968)] Support kryo 5.3.0.
- [[#4807](https://github.com/apache/incubator-seata/pull/4807)] Optimized image and OSS repository publishing pipelines.
- [[#4445](https://github.com/apache/incubator-seata/pull/4445)] Optimized transaction timeout judgment.
- [[#4958](https://github.com/apache/incubator-seata/pull/4958)] Optimized execution of triggerAfterCommit() for timeout transactions.
- [[#4582](https://github.com/apache/incubator-seata/pull/4582)] Optimized transaction sorting in redis storage mode.
- [[#4963](https://github.com/apache/incubator-seata/pull/4963)] Added ARM64 pipeline CI testing.
- [[#4434](https://github.com/apache/incubator-seata/pull/4434)] Removed seata-server CMS GC parameters.

### Testing:
- [[#4411](https://github.com/apache/incubator-seata/pull/4411)] Tested Oracle database AT mode type support.
- [[#4794](https://github.com/apache/incubator-seata/pull/4794)] Refactored code and attempted to fix unit test `DataSourceProxyTest.getResourceIdTest()`.
- [[#5101](https://github.com/apache/incubator-seata/pull/5101)] Fixed ClassNotFoundException issue in zk registration and configuration center `DataSourceProxyTest.getResourceIdTest()`.

Special thanks to the following contributors for their code contributions. If there are any unintentional omissions, please report.

<!-- 请确保您的 GitHub ID 在以下列表中 -->
- [slievrly](https://github.com/slievrly)
- [renliangyu857](https://github.com/renliangyu857)
- [wangliang181230](https://github.com/wangliang181230)
- [funky-eyes](https://github.com/funky-eyes)
- [tuwenlin](https://github.com/tuwenlin)
- [conghuhu](https://github.com/conghuhu)
- [a1104321118](https://github.com/a1104321118)
- [duanqiaoyanyu](https://github.com/duanqiaoyanyu)
- [robynron](https://github.com/robynron)
- [lcmvs](https://github.com/lcmvs)
- [github-ganyu](https://github.com/github-ganyu)
- [1181954449](https://github.com/1181954449)
- [zw201913](https://github.com/zw201913)
- [wingchi-leung](https://github.com/wingchi-leung)
- [AlexStocks](https://github.com/AlexStocks)
- [liujunlin5168](https://github.com/liujunlin5168)
- [pengten](https://github.com/pengten)
- [liuqiufeng](https://github.com/liuqiufeng)
- [yujianfei1986](https://github.com/yujianfei1986)
- [Bughue](https://github.com/Bughue)
- [AlbumenJ](https://github.com/AlbumenJ)
- [doubleDimple](https://github.com/doubleDimple)
- [jsbxyyx](https://github.com/jsbxyyx)
- [tuwenlin](https://github.com/tuwenlin)
- [CrazyLionLi](https://github.com/JavaLionLi)
- [whxxxxx](https://github.com/whxxxxx)
- [neillee95](https://github.com/neillee95)
- [crazy-sheep](https://github.com/crazy-sheep)
- [zhangzq7](https://github.com/zhangzq7)
- [l81893521](https://github.com/l81893521)
- [zhuyoufeng](https://github.com/zhuyoufeng)
- [xingfudeshi](https://github.com/xingfudeshi)
- [odidev](https://github.com/odidev)
- [miaoxueyu](https://github.com/miaoxueyu)

At the same time, we have received many valuable issues and suggestions from the community, and we are very grateful to everyone.

#### Link

- **Seata:** https://github.com/apache/incubator-seata
- **Seata-Samples:** https://github.com/apache/incubator-seata-samples
- **Release:** https://github.com/apache/incubator-seata/releases
- **WebSite:** https://seata.apache.org
