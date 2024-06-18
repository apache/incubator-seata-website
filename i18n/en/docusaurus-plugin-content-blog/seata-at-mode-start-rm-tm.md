---
title: Does Seata Client Need to Start RM and TM Simultaneously?
author: chenghui.zhang
keywords: [Seata, distributed transaction, AT mode, RM, TM]
description: A discussion point regarding future optimizations for Seata
date: 2019/11/28
---

When analysing the source code of the startup section, I found that GlobalTransactionScanner will start both RM and TM client, but according to Seata's design, TM is responsible for global transaction operation, if a service does not need to open global transaction, then there is no need to start TM client, that is to say, if there is no global transaction annotation in the project, then there is no need to initialize TM client, because not every microservice needs GlobalTransactional, it just acts as an RM client. That is to say, if there is no global transaction annotation in the project, there is no need to initialise the TM client at this time, because not every microservice needs GlobalTransactional, and it is only used as an RM client at this time.


So I proceeded to change the initialisation rules of GlobalTransactionScanner slightly, since previously GlobalTransactionScanner called the initialisation method in the afterPropertiesSet() method of InitializingBean, the afterPropertySet() method was used to initialise the TM client. AfterPropertySet() is only called after the current bean is initialised, there is no way to know if the Spring container has a global transaction annotation.

Therefore, I removed the InitializingBean and implemented ApplicationListener instead, checking for GlobalTransactional annotations during bean instantiation, and then calling RM and TM client initialisation methods after the Spring container initialisation is complete. Finally, after the Spring container is initialised, the RM and TM client initialisation methods are called, and then you can decide whether to start the TM client or not, depending on whether the GlobalTransactional annotation is used in the project or not.

Here is the PR address: [https://github.com/apache/incubator-seata/pull/1936](https://github.com/apache/incubator-seata/pull/1936)

As we discussed in pr, the current design of Seata is that only the TM at the initiator can initiate GlobalRollbackRequest, and the RM can only send BranchReport(false) to report the branch status to the TC server, and cannot send GlobalRollbackRequest directly to perform global rollback. operation. The interaction logic is as follows:

! [](https://gitee.com/objcoding/md-picture/raw/master/img/20191128094250.png)

According to the above design model, the TM client can be started on demand.

However, in the later optimisation iterations of Seata, there is one more point that needs to be considered:

When an exception occurs in a participant, is it possible to initiate a global rollback directly from the participant's TM client? This also means that the cycle time of distributed transactions can be shortened, and global locks can be released as soon as possible so that other transactions with conflicting data can acquire locks and execute as soon as possible.

! [](https://gitee.com/objcoding/md-picture/raw/master/img/20191127202606.png)


That is to say, in a global transaction, as long as one RM client fails to execute a local transaction, the TM client of the current service will directly initiate a global transaction rollback, so there is no need to wait for the TM of the initiator to initiate a resolution rollback notification. To achieve this optimisation, each service needs to start both the TM client and the RM client.

# Author Bio:

Zhang Chenghui, currently working in the Information Centre of China Communication Technology, Technology Platform Department, as a Java engineer, mainly responsible for the development of China Communication messaging platform and the whole link pressure test project, love to share technology, WeChat public number "back-end advanced" author, technology blog ([https://objcoding.com/](https://objcoding.com/)) Blogger, Seata Contributor, GitHub ID: objcoding.
