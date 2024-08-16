---
title: Seata 1.5.2 Released with XID Load Balancing Support
author: Seata Community
keywords: [seata, distributed transaction, 1.5.2]
description: Seata 1.5.2 Released with XID Load Balancing Support
date: 2022/07/12
---

### Seata 1.5.2 Released with XID Load Balancing Support

Seata is an open-source distributed transaction solution that provides high-performance and easy-to-use distributed transaction services.

**seata-server Download Links:**

[source](https://github.com/apache/incubator-seata/archive/v1.5.2.zip) |
[binary](https://github.com/apache/incubator-seata/releases/download/v1.5.2/seata-server-1.5.2.zip)

The key updates in this version include:

### Features:
- [[#4661](https://github.com/apache/incubator-seata/pull/4713)] Added support for XID load balancing algorithm.
- [[#4676](https://github.com/apache/incubator-seata/pull/4676)] Added support for Seata server to expose services through SLB when using Nacos as the registry center.
- [[#4642](https://github.com/apache/incubator-seata/pull/4642)] Added support for parallel processing of client batch requests.
- [[#4567](https://github.com/apache/incubator-seata/pull/4567)] Added support for the `find_in_set` function in the WHERE condition.

### Bug Fixes:
- [[#4515](https://github.com/apache/incubator-seata/pull/4515)] Fixed an issue where SeataTCCFenceAutoConfiguration on the develop branch throws a ClassNotFoundException when the client does not use a DB.
- [[#4661](https://github.com/apache/incubator-seata/pull/4661)] Fixed SQL exceptions when using PostgreSQL in the console.
- [[#4667](https://github.com/apache/incubator-seata/pull/4682)] Fixed an exception when updating the map in RedisTransactionStoreManager on the develop branch.
- [[#4678](https://github.com/apache/incubator-seata/pull/4678)] Fixed the issue of cache penetration when the property `transport.enableRmClientBatchSendRequest` is not configured.
- [[#4701](https://github.com/apache/incubator-seata/pull/4701)] Fixed the issue of missing command line parameters.
- [[#4607](https://github.com/apache/incubator-seata/pull/4607)] Fixed a defect in skipping global lock verification.
- [[#4696](https://github.com/apache/incubator-seata/pull/4696)] Fixed the insertion issue when using the Oracle storage mode.
- [[#4726](https://github.com/apache/incubator-seata/pull/4726)] Fixed a possible NPE issue when sending messages in batches.
- [[#4729](https://github.com/apache/incubator-seata/pull/4729)] Fixed the issue of incorrect setting of `AspectTransactional.rollbackForClassName`.
- [[#4653](https://github.com/apache/incubator-seata/pull/4653)] Fixed the exception of non-numeric primary key in INSERT_ON_DUPLICATE.

### Optimizations:
- [[#4650](https://github.com/apache/incubator-seata/pull/4650)] Fixed a security vulnerability.
- [[#4670](https://github.com/apache/incubator-seata/pull/4670)] Optimized the number of threads in the `branchResultMessageExecutor` thread pool.
- [[#4662](https://github.com/apache/incubator-seata/pull/4662)] Optimized the monitoring metrics for rolling back transactions.
- [[#4693](https://github.com/apache/incubator-seata/pull/4693)] Optimized the console navigation bar.
- [[#4700](https://github.com/apache/incubator-seata/pull/4700)] Fixed failures in the execution of maven-compiler-plugin and maven-resources-plugin.
- [[#4711](https://github.com/apache/incubator-seata/pull/4711)] Separated the lib dependency during deployment.
- [[#4720](https://github.com/apache/incubator-seata/pull/4720)] Optimized pom descriptions.
- [[#4728](https://github.com/apache/incubator-seata/pull/4728)] Upgraded the logback version dependency to 1.2.9.
- [[#4745](https://github.com/apache/incubator-seata/pull/4745)] Added support for mysql8 driver in the distribution package.
- [[#4626](https://github.com/apache/incubator-seata/pull/4626)] Used `easyj-maven-plugin` plugin instead of `flatten-maven-plugin` to fix compatibility issues between `shade` plugin and `flatten` plugin.
- [[#4629](https://github.com/apache/incubator-seata/pull/4629)] Checked the constraint relationship before and after updating the globalSession status.
- [[#4662](https://github.com/apache/incubator-seata/pull/4662)] Optimized the readability of EnhancedServiceLoader.

### Tests:
- [[#4544](https://github.com/apache/incubator-seata/pull/4544)] Optimized the jackson package dependency issue in TransactionContextFilterTest.
- [[#4731](https://github.com/apache/incubator-seata/pull/4731)] Fixed unit test issues in AsyncWorkerTest and LockManagerTest.

A big thanks to the contributors for their valuable code contributions. If inadvertently omitted, please report.


<!-- Make sure your GitHub ID is in the list below -->
- [slievrly](https://github.com/slievrly)
- [pengten](https://github.com/pengten)
- [YSF-A](https://github.com/YSF-A)
- [tuwenlin](https://github.com/tuwenlin)
- [2129zxl](https://github.com/2129zxl)
- [Ifdevil](https://github.com/Ifdevil)
- [wingchi-leung](https://github.com/wingchi-leung)
- [liurong](https://github.com/robynron)
- [opelok-z](https://github.com/opelok-z)
- [funky-eyes](https://github.com/funky-eyes)
- [Smery-lxm](https://github.com/Smery-lxm)
- [lvekee](https://github.com/lvekee)
- [doubleDimple](https://github.com/doubleDimple)
- [wangliang181230](https://github.com/wangliang181230)
- [Bughue](https://github.com/Bughue)
- [AYue-94](https://github.com/AYue-94)
- [lingxiao-wu](https://github.com/lingxiao-wu)
- [caohdgege](https://github.com/caohdgege)

At the same time, we have received many valuable issues and suggestions from the community, thank you very much.

#### Link

- **Seata:** https://github.com/apache/incubator-seata
- **Seata-Samples:** https://github.com/apache/incubator-seata-samples
- **Release:** https://github.com/apache/incubator-seata/releases
- **WebSite:** https://seata.io
