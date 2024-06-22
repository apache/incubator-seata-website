---
title: Comprehensive Explanation of Distributed Transaction Seata and Its Three Modes
keywords: [Saga, Seata, AT, TCC, consistency, finance, distributed, transaction]
description: This article focuses on sharing the background and theoretical foundation of distributed transactions, as well as the principles of Seata distributed transactions and the implementation of three modes (AT, TCC, Saga) of distributed transactions.
author: long187
date: 2019-08-11
---

# Distributed Transactions with Seata and its three patterns in detail

Author: Yi Yuan (Chen Long), Ant Gold Services distributed transaction framework core development.
<br />This article is based on the topic of "Distributed Transaction Seata and its Three Patterns" shared at SOFA Meetup#3 on 11 August in Guangzhou, focusing on the background and theoretical foundation of distributed transaction, as well as the principle of Seata distributed transaction and the implementation of distributed transaction in three patterns (AT, TCC, and Saga).

The video and PPT are at the end of this article.

![3 Distributed Transaction Seata Three Modes Explained-Eiyuan.jpg](/img/saga/sofameetup3_img/1.jpeg)

<a name="Ad95d"></a>
## I. Background of the emergence of distributed transactions

<a name="Q2ayF"></a>
### 1.1 Distributed Architecture Evolution - Horizontal Splitting of Database

AntGold's business database was initially a single database with a single table, but with the rapid development of the business data scale, the data volume is getting bigger and bigger, and the single database with a single table is gradually becoming a bottleneck. So we split the database horizontally, splitting the original single database and single table into database slices.

As shown in the figure below, after splitting the database and table, the original write operation that can be completed on a database may be across multiple databases, which gives rise to cross-database transaction problems.

![image.png](/img/saga/sofameetup3_img/2.png)


<a name="WBQbC"></a>
### 1.2 Distributed Architecture Evolution - Business Service Splitting

In the early stage of business development, the single business system architecture of "one piece of cake" can meet the basic business needs. However, with the rapid development of the business, the system's access and business complexity are growing rapidly, single-system architecture has gradually become the bottleneck of business development, to solve the problem of high coupling and scalability of the business system demand is becoming stronger and stronger.

As shown in the figure below, Ant Financial Services splits the single business system into multiple business systems in accordance with the design principles of Service Oriented Architecture (SOA), which reduces the coupling between the systems and enables different business systems to focus on their own business, which is more conducive to the development of the business and the scaling of the system capacity.

![image.png](/img/saga/sofameetup3_img/3.png)

After the business system is split according to services, a complete business often needs to call multiple services, how to ensure data consistency between multiple services becomes a difficult problem.


<a name="3oIxE"></a>
## II. Theoretical foundation of distributed transaction

<a name="akRiW"></a>
### 2.1 Two-stage commit protocols

![16_16_18__08_13_2019.jpg](/img/saga/sofameetup3_img/4.jpeg)

Two phase commit protocol: transaction manager coordinates resource manager in two phases, the first phase prepares resources, that is, reserve the resources needed for the transaction, if every resource manager resource reservation succeeds, the second phase resource commit is performed, otherwise the coordinated resource manager rolls back the resources.

<a name="8tfKI"></a>
### 2.2 TCC

![16_16_51__08_13_2019.jpg](/img/saga/sofameetup3_img/5.jpeg)

TCC (Try-Confirm-Cancel) is actually a two-phase commit protocol for servitisation, business developers need to implement these three service interfaces, the first phase of the service is choreographed by the business code to call the Try interface for resource reservation, the Try interface for all participants is successful, the transaction manager will commit the transaction and call the Confirm interface for each participant The transaction manager will commit the transaction and call the Confirm interface of each participant to actually commit the business operation, otherwise the Cancel interface of each participant will be called to rollback the transaction.

<a name="IXxpF"></a>
### 2.3 Saga

![3 Distributed Transactions Seata Three Patterns Explained - Yi Yuan-9.jpg](/img/saga/sofameetup3_img/6.jpeg)

Saga is a compensation protocol. In Saga mode, there are multiple participants within a distributed transaction, and each participant is an offsetting compensation service that requires the user to implement its forward and reverse rollback operations according to the business scenario.

During the execution of a distributed transaction, the forward operations of each participant are executed sequentially, and if all forward operations are executed successfully, the distributed transaction commits. If any of the forward operations fails, the distributed transaction backs out and performs a reverse rollback on the previous participants, rolling back the committed participants and returning the distributed transaction to its initial state.

Saga theory is from the paper Sagas published by Hector & Kenneth in 1987.<br />
<br />Saga Positive Service and Compensation Service also need to be implemented by business developers.

<a name="fZPaN"></a>
## III. Seata and its three patterns explained in detail

<a name="IgVM7"></a>
### 3.1 Distributed transaction Seata introduction

Seata (Simple Extensible Autonomous Transaction Architecture) is a distributed transaction solution jointly open-sourced by Ant Financial Services and Alibaba in January 2019.Seata has been open-sourced for about half a year, and currently has more than 11,000 stars. Seata has been open source for about half a year, and now has more than 11,000 stars and a very active community. We warmly welcome you to participate in the Seata community construction, together will Seata become the open source distributed transaction benchmark product.

Seata: [https://](https://github.com/apache/incubator-seata)[github.com/apache/incubator-seata](https://github.com/apache/incubator -seata)<br />
<br />![image.png](/img/saga/sofameetup3_img/7.png)

<a name="zyy0l"></a>
### 3.2 Distributed Transactions Seata Product Module

As shown in the figure below, there are three major modules in Seata, namely TM, RM and TC. TM and RM are integrated with the business system as clients of Seata, and TC is deployed independently as the server of Seata.

TC is deployed independently as a Seata server. [image.png](/img/saga/sofameetup3_img/8.png)

The execution flow of a distributed transaction in Seata:

- TM opens distributed transaction (TM registers global transaction record with TC);
- According to the business scenario, arrange the resources in the transaction such as database and service (RM reports the resource readiness status to TC);
- TM ends the distributed transaction, and the transaction phase ends (TM notifies TC to commit/rollback the distributed transaction);
- TC aggregates the transaction information and decides whether the distributed transaction should be committed or rolled back;
- TC notifies all RMs to commit/rollback resources, transaction phase 2 ends;

<a name="1QKqI"></a>
### 3.3 Distributed Transactions Seata Solution

Seata has four distributed transaction solutions, AT mode, TCC mode, Saga mode and XA mode.

![15_49_23__08_13_2019.jpg](/img/saga/sofameetup3_img/9.jpeg)<br />

<a name="784n4"></a>
#### 2.3.1 AT Mode

In January, Seata open sourced AT Mode, a non-intrusive distributed transaction solution. In AT mode, users only need to focus on their own "business SQL", the user's "business SQL" as a phase, Seata framework will automatically generate the transaction of the two-phase commit and rollback operations.

![image.png](/img/saga/sofameetup3_img/10.png)<br />

<a name="Acfeo"></a>
##### How the AT model is non-intrusive to business :

- Phase I:

In phase 1, Seata intercepts the "business SQL", first parses the semantics of the SQL, finds the business data to be updated by the "business SQL", and then saves it as a "before image" before updating the business data. Before the business data is updated, it will save it as "before image", then execute "business SQL" to update the business data, and after the business data is updated, it will save it as "after image", and finally generate row locks. The above operations are all done within a single database transaction, which ensures the atomicity of one phase of operation.

This ensures the atomicity of a phase of operations. [image3.png](/img/saga/sofameetup3_img/11.png)

- Second-phase commit:

If the second phase is a commit, since the "business SQL" has already been committed to the database in the first phase, the Seata framework only needs to delete the snapshot data and row locks saved in the first phase to complete the data cleanup.

![image 4.png](/img/saga/sofameetup3_img/12.png)

- Phase 2 rollback:

If the second phase is a rollback, Seata needs to rollback the "business SQL" that has been executed in the first phase to restore the business data. The way to rollback is to use "before image" to restore the business data; however, before restoring, we must first verify the dirty writing, compare the "current business data in the database" and the "after image", if the two data are not in the same state, then we will use the "after image" to restore the business data. However, before restoring, we should first check the dirty writing, compare the "current business data in database" and "after image", if the two data are completely consistent, it means there is no dirty writing, and we can restore the business data, if it is inconsistent, it means there is dirty writing, and we need to transfer the dirty writing to manual processing.

![image 5.png](/img/saga/sofameetup3_img/13.png)

AT mode one phase, two phase commit and rollback are automatically generated by Seata framework, user only need to write "business SQL", then can easily access distributed transaction, AT mode is a kind of distributed transaction solution without any intrusion to business.

<a name="FnD1S"></a>
#### 2.3.2 TCC Mode

In March 2019, Seata open-sourced the TCC pattern, which is contributed by Ant Gold. the TCC pattern requires users to implement Try, Confirm and Cancel operations according to their business scenarios; the transaction initiator executes the Try method in the first stage, the Confirm method in the second-stage commit, and the Cancel method in the second-stage rollback.

The transaction initiator performs Try in the first stage, Confirm in the second stage, and Cancel in the second stage. [image 6.png](/img/saga/sofameetup3_img/14.png)

TCC Three method descriptions:

- Try: detection and reservation of resources;
- Confirm: the execution of the business operation submitted; require Try success Confirm must be successful;
- Cancel: the release of the reserved resources;

**Ant Gold's practical experience in TCC**<br />**<br />![16_48_02__08_13_2019.jpg](/img/saga/sofameetup3_img/15.jpeg)

**1 TCC Design - Business model is designed in 2 phases:**

The most important thing for users to consider when accessing TCC is how to split their business model into two phases.

Take the "debit" scenario as an example, before accessing TCC, the debit of account A can be completed with a single SQL for updating the account balance; however, after accessing TCC, the user needs to consider how to split the original one-step debit operation into two phases and implement it into three methods, and to ensure that the first-phase Try will be successful and the second-phase Confirm will be successful if Try is successful. If Try succeeds in the first stage, Confirm will definitely succeed in the second stage.

![image 7.png](/img/saga/sofameetup3_img/16.png)

As shown above, the

Try method as a one-stage preparation method needs to do resource checking and reservation. In the deduction scenario, what Try has to do is to check whether the account balance is sufficient and reserve funds for transfer, and the way to reserve is to freeze the transfer funds of account A. After the execution of the Try method, although the balance of account A is still 100, but $30 of it has been frozen and cannot be used by other transactions.

The second stage, the Confirm method, performs the real debit operation; Confirm will use the funds frozen in the Try stage to perform the debit operation; after the Confirm method is executed, the $30 frozen in the first stage has been deducted from account A, and the balance of account A becomes $70.

If the second stage is a rollback, you need to release the $30 frozen in the first stage of Try in the Cancel method, so that account A is back to the initial state, and all $100 is available.

The most important thing for users to access TCC mode is to consider how to split the business model into 2 phases, implement it into 3 methods of TCC, and ensure that Try succeeds and Confirm succeeds. Compared to AT mode, TCC mode is somewhat intrusive to the business code, but TCC mode does not have the global line locks of AT mode, and the performance of TCC will be much higher than AT mode.

**2 TCC Design - Allow Null Rollback:**<br />**<br />![16_51_44__08_13_2019.jpg](/img/saga/sofameetup3_img/17.jpeg)

The Cancel interface needs to be designed to allow null rollbacks. When the Try interface is not received due to packet loss, the transaction manager triggers a rollback, which triggers the Cancel interface, which needs to return to the success of the rollback when it finds that there is no corresponding transaction xid or primary key during the execution of Cancel. If the transaction service manager thinks it has been rolled back, otherwise it will keep retrying, and Cancel has no corresponding business data to roll back.

**3 TCC Design - Anti-Suspension Control:**<br />**<br />![16_51_56__08_13_2019.jpg](/img/saga/sofameetup3_img/18.jpeg)

The implication of the suspension is that the Cancel is executed before the Try interface, which occurs because the Try times out due to network congestion, the transaction manager generates a rollback that triggers the Cancel interface, and the Try interface call is eventually received, but the Cancel arrives before the Try. According to the previous logic of allowing empty rollback, the rollback will return successfully, the transaction manager thinks the transaction has been rolled back successfully, then the Try interface should not be executed at this time, otherwise it will generate data inconsistency, so we record the transaction xid or business key before the Cancel empty rollback returns successfully, marking this record has been rolled back, the Try interface checks the transaction xid or business key first. The Try interface first checks the transaction xid or business key to identify that the record has been rolled back, and then does not perform the business operation of Try if it has already been marked as rolled back successfully.

**4 TCC Design - Power Control:**<br />**<br />![16_52_07__08_13_2019.jpg](/img/saga/sofameetup3_img/19.jpeg)

Idempotence means that for the same system, using the same conditions, a single request and repeated multiple requests have the same impact on system resources. Because network jitter or congestion may timeout, transaction manager will retry operation on resources, so it is very likely that a business operation will be called repeatedly, in order not to occupy resources many times because of repeated calls, it is necessary to control idempotency when designing the service, usually we can use the transaction xid or the business primary key to judge the weight to control.

<a name="dsMch"></a>
#### 2.3.3 Saga Patterns

Saga mode is Seata's upcoming open source solution for long transactions, which will be mainly contributed by Ant Gold. In Saga mode, there are multiple participants within a distributed transaction, and each participant is an offsetting compensation service that requires users to implement its forward and reverse rollback operations according to business scenarios.

During the execution of a distributed transaction, the forward operations of each participant are executed sequentially, and if all forward operations are executed successfully, the distributed transaction commits. If any of the forward operations fails, the distributed transaction will go back and execute the reverse rollback operations of the previous participants to roll back the committed participants and bring the distributed transaction back to the initial state.

![image 8.png](/img/saga/sofameetup3_img/20.png)


Saga Pattern Distributed transactions are usually event-driven and executed asynchronously between the various participants, Saga Pattern is a long transaction solution.

**1 Saga pattern usage scenario**<br />**<br />![16_44_58__08_13_2019.jpg](/img/saga/sofameetup3_img/21.jpeg)

Saga pattern is suitable for business systems with long business processes and the need to ensure the final consistency of transactions. Saga pattern commits local transactions at one stage, and performance can be guaranteed in the case of lock-free and long processes.

Transaction participants may be services from other companies or legacy systems that cannot be transformed and provide the interfaces required by TCC, and can use the Saga pattern.

The advantages of the Saga pattern are:

- One-stage commit of local database transactions, lock-free, high performance;
- Participants can use transaction-driven asynchronous execution, high throughput;
- The compensation service is the "reverse" of the forward service, which is easy to understand and implement;

Disadvantages: The Saga pattern does not guarantee isolation because the local database transaction has already been committed in the first phase and no "reservation" action has been performed. Later we will talk about the lack of isolation of the countermeasures. <br />**2 Saga implementation based on a state machine engine*** <br />**2 Saga implementation based on a state machine engine*** <br />**3

![17_13_19__08_13_2019.jpg](/img/saga/sofameetup3_img/22.png)

Currently there are generally two types of Saga implementations, one is achieved through event-driven architecture, and the other is based on annotations plus interceptors to intercept the business of the positive service implementation.Seata is currently implemented using an event-driven mechanism, Seata implements a state machine, which can orchestrate the call flow of the service and the compensation service of the positive service, generating a state diagram defined by a json file, and the state machine The state machine engine is driven to the operation of this map, when an exception occurs, the state machine triggers a rollback and executes the compensation services one by one. Of course, it is up to the user to decide when to trigger the rollback. The state machine can achieve the needs of service orchestration, it supports single selection, concurrency, asynchrony, sub-state machine call, parameter conversion, parameter mapping, service execution state judgement, exception catching and other functions.

**3 State Machine Engine Principles**<br />

![16_45_32__08_13_2019.jpg](/img/saga/sofameetup3_img/23.png)

The basic principle of this state machine engine is that it is based on an event-driven architecture, where each step is executed asynchronously, and steps flow through an event queue between steps, <br />greatly improving system throughput. Transaction logs are recorded at the time of execution of each step for use when rolling back in the event of an exception. Transaction logs are recorded in the database where the business tables are located to improve performance.

**4 State Machine Engine Design

![16_45_46__08_13_2019.jpg](/img/saga/sofameetup3_img/24.jpeg)

The state machine engine is divided into a three-tier architecture design, the bottom layer is the "event-driven" layer, the implementation of the EventBus and the consumption of events in the thread pool, is a Pub-Sub architecture. The second layer is the "process controller" layer, which implements a minimalist process engine framework that drives an "empty" process execution. node does, it just executes the process method of each node and then executes the route method to flow to the next node. This is a generic framework, based on these two layers, developers can implement any process engine. The top layer is the "state machine engine" layer, which implements the "behaviour" and "route" logic code of each state node, provides APIs and statechart repositories, and has some other components, such as expression languages, logic languages, and so on. There are also a number of other components, such as expression languages, logic calculators, flow generators, interceptors, configuration management, transaction logging, and so on.

**5 The Saga Service Design Experience**

Similar to TCC, Saga's forward and reverse services need to follow the following design principles:

**1) Saga Service Design - Allow Null Compensation**<br />**<br />![16_52_22__08_13_2019.jpg](/img/saga/sofameetup3_img/25.jpeg)

**2) Saga Service Design - Anti-Suspension Control**<br />**<br />![16_52_52__08_13_2019.jpg](/img/saga/sofameetup3_img/26.jpeg)

**3) Saga Service Design - Power Control**<br />**<br />![3 Distributed Transactions Seata Three Patterns Explained - Yi Yuan-31.jpg](/img/saga/sofameetup3_img/27.jpeg)

**4) Saga Design - Custom Transaction Recovery Strategies**<br />**<br />![16_53_07__08_13_2019.jpg](/img/saga/sofameetup3_img/28.jpeg)

As mentioned earlier, the Saga pattern does not guarantee transaction isolation, and dirty writes can occur in extreme cases. For example, in the case of a distributed transaction is not committed, the data of the previous service was modified, and the service behind the anomaly needs to be rolled back, may not be able to compensate for the operation due to the data of the previous service was modified. One way to deal with this situation is to "retry" and continue forward to complete the distributed transaction. Since the entire business process is arranged by the state machine, even after the recovery can continue to retry. So you can configure the transaction policy of the process according to the business characteristics, whether to give priority to "rollback" or "retry", when the transaction timeout, the Server side will continue to retry according to this policy.

Since Saga does not guarantee isolation, we need to achieve the principle of "long money rather than short money" in business design. Long money refers to the situation when there is a mistake and the money is too much from our point of view, and the money is too little, because if the money is too long, we can refund the money to the customer, but if it is too short, the money may not be recovered, which means that in the business design, we must give priority to "rollback" or "retry". That is, when the business is designed, it must be deducted from the customer's account before crediting the account, and if the override update is caused by the isolation problem, there will not be a case of less money.

**6 Annotation and Interceptor Based Saga Implementation**<br />**<br />![17_13_37__08_13_2019.jpg](/img/saga/sofameetup3_img/29.jpeg)

There is another implementation of Saga that is based on annotations + interceptors, which Seata does not currently implement. You can look at the pseudo-code above to understand it, the @SagaCompensable annotation is defined on the one method, and the compensation method used to define the one method is the compensateOne method. Then the @SagaTransactional annotation is defined on the processA method of the business process code, which starts a Saga distributed transaction, intercepts each forward method with an interceptor, and triggers a rollback operation when an exception occurs, calling the compensation method of the forward method.

**7 Comparison of Advantages and Disadvantages of the Two Saga Implementations

The following table compares the advantages and disadvantages of the two Saga implementations:

![17_13_49__08_13_2019.jpg](/img/saga/sofameetup3_img/30.jpeg)

The biggest advantage of the state machine engine is that it can be executed asynchronously through an event-driven approach to improve system throughput, service scheduling requirements can be achieved, and in the absence of isolation in the Saga model, there can be an additional "retry forward" strategy to recover from things. The biggest advantage of annotations and interceptors is that they are easy to develop and low cost to learn.

<a name="Gpkrf"></a>
## Summary

This article first reviewed the background and theoretical basis of distributed transactions, and then focused on the principles of Seata distributed transactions and three patterns (AT, TCC, Saga) of distributed transaction implementation.

Seata's positioning is a full-scenario solution for distributed transactions, and in the future there will also be XA mode of distributed transaction implementation, each mode has its own application scenarios, AT mode is a non-intrusive distributed transaction solution for scenes that do not want to transform the business, with almost zero learning cost. TCC mode is a high-performance distributed transaction solution for core systems and other scenes that have a high demand for performance. Saga mode is a long transaction solution for business systems that have long business processes and need to ensure the ultimate consistency of transactions. Saga mode submits local transactions at one stage, with no locks, and can ensure performance in the case of long processes, and is mostly used in the channel layer and integration layer of business systems. Transaction participants may be services from other companies or legacy systems that can't be transformed to provide the interfaces required by TCC, Saga mode can also be used.

The video review and PPT of this sharing can be viewed at: [https://tech.antfin.com/community/activities/779/review](https://tech.antfin.com/community/activities/779/ review)
