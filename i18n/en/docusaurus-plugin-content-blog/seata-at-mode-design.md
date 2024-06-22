---
title: Design Principles of Distributed Transaction Middleware Seata
author: chenghui.zhang
keywords: [Seata、distributed transaction、AT mode]
description: Design principles of AT mode
date: 2019/07/11
---

# Foreword

Under the microservices architecture system, we can layered design according to business modules, deployed separately, reducing the pressure of service deployment, but also decoupled from the business coupling, to avoid the application gradually become a monster, so that it can be easily scaled up, and in the case of failure of some services will not affect the normal operation of other services. In short, microservices in the rapid development of business brings us more and more advantages, but microservices are not perfect, so we can not blindly over-abuse, it has a lot of shortcomings, and will bring a certain degree of complexity to the system, which is accompanied by distributed transactions, is a microservices architectural system is bound to need to deal with a pain point, but also the industry has always been concerned about a field, and therefore there is a Theories such as CAP and BASE have emerged.

At the beginning of this year, Ali open source a distributed transaction middleware, initially named Fescar, later renamed Seata, in the beginning of its open source, I know it must be fire, because this is an open source project to solve the pain points, Seata began to rush to the business of non-intrusive and high-performance direction to go, which is exactly the solution to the problem of distributed transactions of the urgent needs of us. Because several companies have stayed with the microservices architecture, but in solving the problem of distributed transactions are not very elegant, so I have been concerned about the development of Seata, today it is briefly about some of its design principles, followed by the various modules I will be in-depth analysis of the source code , interested in can continue to pay attention to my public number or blog, do not lose with.




# What are the solutions for distributed transaction resolution?

Currently distributed transaction solutions mainly have no invasion of business and invasive solutions, no invasive solutions are mainly based on the database XA protocol two-part submission (2PC) scheme, its advantage is no invasion of business code, but its shortcomings are also very obvious: the database must be required to support the XA protocol, and because of the characteristics of the XA protocol itself, it will result in a long period of time without the release of transactional resources, the locking cycle is long, and in the case of the XA protocol, it will cause a long period of time, but it will not be released. release, locking cycle is long, and in the application layer can not intervene, so it is very poor performance, its existence is equivalent to the fist of seven injuries as "hurt seven points, the loss of their own three points", so in the Internet project is not very popular this solution.

In order to make up for the low performance of this solution, the big boys have come up with a variety of solutions to solve the problem, but this invariably need to be done through the application layer, that is, invasion of the business approach, such as the well-known TCC programme, based on the TCC, there are also many mature frameworks, such as ByteTCC, tcc-transaction and so on. As well as based on the ultimate consistency of reliable messages to achieve, such as RocketMQ transaction messages.

Invasive code solutions are based on the existing situation of "last resort" solution, in fact, they are very inelegant to implement, a transaction call is usually accompanied by a series of reverse operations on the transaction interface to add a series of, for example, TCC three-stage commit, the logic of the inevitable rollback of the logic of the logic of the logic of the commit, so that the code will make the project very bloated. code will make the project very bloated, high maintenance costs.



# Relationships between Seata modules

In response to the above pain points of distributed transaction solutions, it is clear that our ideal distributed transaction solution must be good performance and no intrusion into the business, the business layer does not need to care about the constraints of the distributed transaction mechanism, Seata is precisely in this direction, so it is very much worth looking forward to, it will bring qualitative improvements to our microservices architecture.

So how does Seata do it? Here's how its modules relate to each other.

Seata's design idea is that a distributed transaction can be understood as a global transaction, under which a number of branch transactions are hung, and a branch transaction is a local transaction that meets the ACID, so we can operate the distributed transaction as if it were a local transaction.

Seata internally defines three modules to deal with the relationship and processing of global and branch transactions, these three components are:

- Transaction Coordinator (TC): The transaction coordinator maintains the state of the global transaction and is responsible for coordinating and driving the commit or rollback of the global transaction.
- Transaction Manager (TM): Controls the boundaries of the global transaction and is responsible for opening a global transaction and ultimately initiating a global commit or global rollback resolution.
- Resource Manager (RM): Controls branch transactions and is responsible for branch registration, status reporting, and receiving instructions from the Transaction Coordinator to drive the commit and rollback of branch (local) transactions.

![](https://gitee.com/objcoding/md-picture/raw/master/img/seata.png)

Briefly describe the execution steps of the whole global transaction:

1. TM requests TC to open a global transaction. TC creates the global transaction and returns a globally unique XID, which is propagated in the context of the global transaction;
2. the RM registers a branch transaction with the TC, which is attributed to the global transaction with the same XID;
3. the TM initiates a global commit or rollback to the TC;
4. TC schedules the branch transaction under the XID to complete the commit or rollback.



# How is it different from the XA scheme?

Seata's transaction commit method is basically the same as the XA protocol's two-stage commit in general, so what is the difference between them?

We all know that the XA protocol relies on the database level to ensure the consistency of transactions, that is, XA branch transactions are driven at the database level, because XA branch transactions need to have XA drivers, on the one hand, it will lead to the database and the XA driver coupling, on the other hand, it will lead to a long period of locking the resources of the transaction of the various branches, which is not popular in the Internet company! This is also an important factor that it is not popular in Internet companies.

Based on the above problems of the XA protocol, Seata another way, since the dependence on the database layer will lead to so many problems, then I'll do from the application layer to do the trick, which also has to start from Seata's RM module, the previous also said that the main role of RM, in fact, RM in the database operation of the internal agent layer, as follows:

![](https://gitee.com/objcoding/md-picture/raw/master/img/seata5.png)

Seata in the data source to do a layer of proxy layer, so we use Seata, we use the data source is actually using Seata's own data source proxy DataSourceProxy, Seata in this layer of the proxy to add a lot of logic, mainly parsing SQL, business data before and after the update of the data mirror organised into a rollback log, and insert the undo log log into the undo_log table to ensure that every business sql that updates data has a corresponding rollback log.

The advantage of doing this is that after the local transaction is executed, the resources locked by the local transaction can be released immediately, and then the branch status can be reported to the TC. When the TM decides to commit globally, there is no need for synchronous coordination, the TC will asynchronously schedule each RM branch transaction to delete the corresponding undo log, which is a very fast step; when the TM decides to roll back globally, the RM receives a rollback request from the TC, and then finds the corresponding undo log through the XID, and then executes the log to complete the rollback operation. operation.

RM will find the corresponding undo log through XID and execute the rollback log to complete the rollback operation. ![](https://gitee.com/objcoding/md-picture/raw/master/img/seata6.png)

As shown in the above figure, the RM of the XA scheme is placed in the database layer, and it relies on the XA driver of the database.

The XA scenario RM is placed at the database level as shown in the figure above.
![](https://gitee.com/objcoding/md-picture/raw/master/img/Seata7.png)

As shown above, Seata's RM is actually placed in the application layer as middleware, and does not rely on the database for protocol support, completely stripping out the protocol support requirements of the database for distributed transaction scenarios.


# How are branching transactions committed and rolled back?

Here is a detailed description of how branching transactions are committed and rolled back:

- Stage one:


Branching transactions make use of the JDBC data source proxy in the RM module to join several processes, interpret business SQL, organise the data mirroring of business data before and after updates into a rollback log, generate an undo log log, check global transaction locks, and register branching transactions, etc., and make use of the ACID feature of the local transaction to write the business SQL and the undo log into the same The local transaction ACID feature is used to write the business SQL and undo log into the same thing and submit them to the database together to ensure that the corresponding rollback log must exist for the business SQL, and finally the branch transaction status is reported to the TC.

![](https://gitee.com/objcoding/md-picture/raw/master/img/seata2.png)

- Phase II:


TM resolution global commit:

When the TM resolution is committed, there is no need for synchronous orchestration, the TC will asynchronously schedule each RM branch transaction to delete the corresponding undo logs, and this step can be completed very quickly. This mechanism is critical for performance improvement. We know that the success rate of transaction execution is very high during normal business operation, so it is possible to commit directly in the local transaction, which is a very significant step for performance improvement.



This step is very significant for performance improvement. ![](https://gitee.com/objcoding/md-picture/raw/master/img/seata3.png)



TM resolution global rollback:

When TM resolves to rollback, RM receives the rollback request from TC, RM finds the corresponding undo log through XID, then uses the ACID feature of the local transaction to execute the rollback log to complete the rollback operation and delete the undo log, and finally reports the rollback result to TC.

The last step is to report the rollback result to the TC. ![](https://gitee.com/objcoding/md-picture/raw/master/img/seata4.png)

The business is not aware of all the above processes, the business does not care about the specific global transaction commit and rollback, and the most important point is that Seata will be two-stage commit synchronisation coordination is decomposed into various branch transactions, branch transactions and ordinary local transactions are not any different, which means that after we use Seata, distributed transactions like the use of local transactions, the database layer of transaction coordination mechanism to the middleware layer. transaction coordination mechanism to the middleware layer Seata to do , so that although the transaction coordination moved to the application layer , but still can do zero intrusion into the business , thus stripping the distributed transaction scheme on the database in the protocol support requirements , and Seata in the branch transaction is completed directly after the release of resources , greatly reducing the branch transaction on the resources of the locking time , perfectly avoiding the XA protocol needs to be The problem of long resource locking time due to synchronous coordination of XA protocol is perfectly avoided.



# Supplementation of other solutions

The above is actually the default mode of Seata, also known as AT mode, which is similar to the XA scheme of the two-stage submission scheme, and is non-intrusive on the business, but this mechanism still needs to rely on the database local transaction ACID characteristics, have you noticed that I have stressed in the above chart must be to support the ACID characteristics of relational databases, then the problem is, non-relational or databases that do not support ACID can not use Seata, do not panic, Seata is now prepared for us another mode, called MT mode, which is a business invasive solution, commit rollback and other operations need to be defined by us, the business logic needs to be broken down into Prepare/Commit/Rollback 3 parts, forming a MT branch The purpose of the MT model is to reach more scenarios for Seata by adding global transactions.

The point of this is to reach more scenarios for Seata. ![](https://gitee.com/objcoding/md-picture/raw/master/img/seata8.png)

Only, it is not Seata's "main" model, it exists only as a complementary solution, from the above official development vision can be seen, Seata's goal is to always be a non-invasive solution to the business.

*Note: The design of the pictures in this article refers to the official Seata diagram*.

# Author Bio:

Zhang Chenghui, currently working in the technology platform department of Zhongtong Technology Information Centre as a Java engineer, mainly responsible for the development of Zhongtong messaging platform and all-links pressure testing project, love to share technology, WeChat public number "back-end progression" author, technology blog ([https://objcoding.com/](https://objcoding.com/)) Blogger, Seata Contributor, GitHub ID: objcoding.
