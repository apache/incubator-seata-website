---
title: How is distributed transaction realized? In-depth interpretation of Seata's XA mode
keywords: [Seata,distributed transaction,XA,AT]
description: In-depth interpretation of Seata's XA mode
author: Xuan Yi
date: 2020/04/28
---

# How is distributed transaction realized? In-depth interpretation of Seata's XA mode

Author profile: Xuan Yi, GitHub ID: sharajava, responsible for the GTS development team of Alibaba Middleware, initiator of the SEATA open source project, worked for many years at Oracle Beijing R&D Center, and was engaged in WebLogic core development. He has long been focused on middleware, especially technical practices in the field of distributed transactions.

The 1.2.0 version of Seata has released a new transaction mode: XA mode, which supports the XA protocol.

Here, we will interpret this new feature in depth from three aspects:

- What: What is XA mode?
- Why: Why support XA?
- How: How is XA mode implemented and how to use it?

# 1. What is XA mode?

There are two basic preliminary concepts here:

1. What is XA?
2. What is the so-called transaction mode defined by Seata?

Based on these two points, understanding XA mode becomes quite natural.

## 1.1 What is XA?

The XA specification is a standard for distributed transaction processing (DTP) defined by the X/Open organization.

The XA specification describes the interface between the global transaction manager(TM) and the local resource manager(RM). The purpose of the XA specification is to allow multiple resources (such as databases, application servers, message queues, etc.) to access the same transaction, thus maintaining ACID properties across applications.

The XA specification uses the Two-Phase Commit (2PC) to ensure that all resources are committed or rolled back at the same time for any specific transaction.

The XA specification was proposed in the early 1990s. Currently, almost all mainstream databases support the XA specification.

## 1.2 What is Seata's transaction mode?

Seata defines the framework for global transactions.

A global transaction is defined as the overall coordination of several branch transactions:

1. The Transaction Manager (TM) requests the Transaction Coordinator (TC) to initiate (Begin), commit (Commit), or rollback (Rollback) the global transaction.
2. The TM binds the XID representing the global transaction to the branch transaction.
3. The Resource Manager (RM) registers with the TC, associating the branch transaction with the global transaction represented by XID.
4. The RM reports the execution result of the branch transaction to the TC. (optional)
5. The TC sends a branch commit or branch rollback command to the RM.

<img src="https://img.alicdn.com/tfs/TB19qmhOrY1gK0jSZTEXXXDQVXa-1330-924.png" alt="seata-mod" style={{ zoom:'50%' }} />

Seata's global transaction processing process is divided into two phases:

- Execution phase: Execute branch transactions and ensure that the execution results are *rollbackable* and *durable*.
- Completion phase: Based on the resolution of the execution phase, the application sends a request for global commit or rollback to the TC through the TM, and the TC commands the RM to drive the branch transaction to commit or rollback.

Seata's so-called transaction mode refers to the behavior mode of branch transactions running under the Seata global transaction framework. More precisely, it should be called the branch transaction mode.

The difference between different transaction modes lies in the different ways branch transactions achieve the goals of the two phases of the global transaction.  That is, answering the following two questions:

- Execution phase: How to execute and ensure that the execution results are *rollbackable* and *durable*.
- Completion phase: After receiving the command from the TC, how to submit or rollback the branch transaction?

Taking our Seata AT mode and TCC mode as examples:

AT mode

<img src="https://img.alicdn.com/tfs/TB1NTuzOBr0gK0jSZFnXXbRRXXa-1330-924.png" alt="at-mod" style={{ zoom:'50%' }} />

- Execution phase:
  - Rollbackable: Record rollback logs according to the SQL parsing result
  - Durable: Rollback logs and business SQL are committed to the database in the same local transaction

- Completion phase:
  - Branch commit: Asynchronously delete rollback log records
  - Branch rollback: Compensate and update according to the rollback log

TCC mode

<img src="https://img.alicdn.com/tfs/TB1m59pOEY1gK0jSZFCXXcwqXXa-1330-924.png" alt="tcc-mod" style={{ zoom:'50%' }} />

- Execution Phase:

  - Call the Try method defined by the business (guaranteed *rollback* and *persistence* entirely by the business layer)

- Completion Phase:

  - Branch Commit: Call the Confirm method defined for each transaction branch
  - Branch Rollback: Call the Cancel method defined for each transaction branch

## 1.3 What is XA mode in Seata?

XA mode:

Within the distributed transaction framework defined by Seata, it is a transaction mode that uses XA protocol mechanisms to manage branch transactions with the support of transaction resources (databases, message services, etc.) for the XA protocol.

<img src="https://img.alicdn.com/tfs/TB1hSpccIVl614jSZKPXXaGjpXa-1330-924.png" alt="xa-mod" style={{ zoom:'50%' }} />

- Execution Phase:

  - Rollback: Business SQL operations are performed in an XA branch, and the support of resources for the XA protocol ensures *rollback*
  - Persistence: After the XA branch is completed, XA prepare is executed, and similarly, the support of resources for the XA protocol ensures *persistence* (i.e., any unexpected occurrences will not cause situations where rollback is not possible)

- Completion Phase:

  - Branch Commit: Perform commit for XA branch
  - Branch Rollback: Perform rollback for XA branch

# 2. Why support XA?

Why add XA mode in Seata? What is the significance of supporting XA?

## 2.1 Problems with Compensatory Transaction Mode

Essentially, the 3 major transaction modes that Seata already supports: AT, TCC, and Saga, are all compensatory in nature.

Compensatory transaction processing mechanisms are built on top of transaction resources (either in the middleware layer or in the application layer), and the transaction resources themselves are unaware of distributed transactions.

<img src="https://img.alicdn.com/tfs/TB1z.qyOET1gK0jSZFrXXcNCXXa-602-460.png" alt="img" style={{ zoom:'50%' }} />

The fundamental problem with transaction resources being unaware of distributed transactions is the inability to achieve true *global consistency*.

For example, in a compensatory transaction processing process, a stock record is reduced from 100 to 50. At this point, the warehouse administrator connects to the database and sees the current quantity as 50. Later, the transaction is rolled back due to an unexpected occurrence, and the stock is compensated back to 100. Clearly, the warehouse administrator's query finding 50 is *dirty data*.

It can be seen that because compensatory distributed transaction mechanisms do not require the mechanism of transaction resources (such as a database), they cannot guarantee data consistency from a global perspective outside the transaction framework.

## 2.2 Value of XA

Unlike compensatory transaction modes, the XA protocol requires transaction resources to provide support for standards and protocols.

<img src="https://img.alicdn.com/tfs/TB1vs9kOvb2gK0jSZK9XXaEgFXa-602-486.png" alt="nct" style={{ zoom:'50%' }} />

Because transaction resources are aware of and participate in the distributed transaction processing process, they (such as databases) can guarantee effective isolation of data from any perspective and satisfy global data consistency.

For example, in the scenario of stock updates mentioned in the previous section, during the XA transaction processing process, the intermediate state of the database holding 50 is guaranteed by the database itself and will not be *seen* in the warehouse administrator's query statistics. (Of course, the isolation level needs to be READ_COMMITTED or higher.)

In addition to the fundamental value of *global consistency*, supporting XA also has the following benefits:

1. Non-invasive business: Like AT, XA mode will be non-invasive for businesses, without bringing additional burden to application design and development.
2. Wide support for databases: XA protocol is widely supported by mainstream relational databases and can be used without additional adaptation.
3. Easy multi-language support: Because it does not involve SQL parsing, the XA mode has lower requirements for Seata's RM, making it easier for different language development SDKs compared to the AT mode.
4. Migration of traditional XA-based applications: Traditional applications based on the XA protocol can be smoothly migrated to the Seata platform using the XA mode.

## 2.3 Widely Questioned Issues of XA

There is no distributed transaction mechanism that can perfectly adapt to all scenarios and meet all requirements.

The XA specification was proposed as early as the early 1990s to solve the problems in the field of distributed transaction processing.

Now, whether it's the AT mode, TCC mode, or the Saga mode, the essence of these modes' proposals stems from the inability of the XA specification to meet certain scenario requirements.

The distributed transaction processing mechanism defined by the XA specification has some widely questioned issues. What is our thinking regarding these issues?

1. **Data Locking**: Data is locked throughout the entire transaction processing until it is finished, and reads and writes are constrained according to the definition of isolation levels.

> Thinking:
>
> Data locking is the cost to obtain higher isolation and global consistency.
>
> In compensatory transaction processing mechanisms, the completion of branch (local) transactions is done during the execution stage, and data is not locked at the resource level. However, this is done at the cost of sacrificing isolation.
>
> Additionally, the AT mode uses *global locks* to ensure basic *write isolation*, effectively locking data, but the lock is managed centrally on the TC side, with high unlock efficiency and no blocking issues.

2. **Protocol Blocking**: After XA prepare, the branch transaction enters a blocking stage and must wait for XA commit or XA rollback.

> Thinking:
>
> The blocking mechanism of the protocol itself is not the problem. The key issue is the combination of protocol blocking and data locking.
>
> If a resource participating in the global transaction is "offline" (does not receive commands to end branch transactions), the data it locks will remain locked. This may even lead to deadlocks.
>
> This is the core pain point of the XA protocol and is the key problem that Seata aims to solve by introducing the XA mode.
>
> The basic idea is twofold: avoiding "loss of connection" and adding a "self-release" mechanism. (This involves a lot of technical details, which will not be discussed at the moment. They will be specifically discussed in the subsequent evolution of the XA mode.)

3. **Poor Performance**: Performance loss mainly comes from two aspects: on one hand, the transaction coordination process increases the RT of individual transactions; on the other hand, concurrent transaction data lock conflicts reduce throughput.

> Thinking:
>
> Compared to running scenarios without distributed transaction support, performance will certainly decline, there is no doubt about that.
>
> Essentially, the transaction mechanism (whether local or distributed) sacrifices some performance to achieve a simple programming model.
>
> Compared to the AT mode, which is also *non-invasive for businesses*:
>
> Firstly, because XA mode also runs under Seata's defined distributed transaction framework, it does not generate additional transaction coordination communication overhead.
>
> Secondly, in concurrent transactions, if data has hotspots and lock conflicts occur, this situation also exists in the AT mode (which defaults to using a global lock).
>
> Therefore, in the two main aspects affecting performance, the XA mode does not have a significantly obvious disadvantage compared to the AT mode.
>
> The performance advantage of the AT mode mainly lies in: centralized management of global data locks, where the release of locks does not require RM involvement and is very fast; in addition, the asynchronous completion of the global commit stage.

# 3. How Does XA Mode Work and How to Use It?

## 3.1 Design of XA Mode

### 3.1.1 Design Objectives

The basic design objectives of XA mode mainly focus on two main aspects:

1. From the perspective of *scenarios*, it meets the requirement of *global consistency*.
2. From the perspective of *applications*, it maintains the non-invasive nature consistent with the AT mode.
3. From the perspective of *mechanisms*, it adapts to the characteristics of distributed microservice architecture.

Overall idea:

1. Same as the AT mode: Construct branch transactions from local transactions in the application program.
2. Through data source proxy, wrap the interaction mechanism of the XA protocol at the framework level outside the scope of local transactions in the application program, making the XA programming model transparent.
3. Split the 2PC of XA and perform XA prepare at the end of the execution stage of branch transactions, seamlessly integrating the XA protocol into Seata's transaction framework, reducing one round of RPC interaction.

### 3.1.2 Core Design

#### 1. Overall Operating Mechanism

XA mode runs within the transaction framework defined by Seata:

<img src="https://img.alicdn.com/tfs/TB1uM2OaSslXu8jSZFuXXXg7FXa-1330-958.png" alt="xa-fw" style={{ zoom:'50%' }} />

- Execution phase (Execute):

  - XA start/XA end/XA prepare + SQL + Branch registration

- Completion phase (Finish):

  - XA commit/XA rollback

#### 2. Data Source Proxy

XA mode requires XAConnection.

There are two ways to obtain XAConnection:

- Method 1: Requires developers to configure XADataSource
- Method 2: Creation based on the developer's normal DataSource

The first method adds cognitive burden to developers, as they need to learn and use XA data sources specifically for XA mode, which contradicts the design goal of transparent XA programming model.

The second method is more user-friendly, similar to the AT mode, where developers do not need to worry about any XA-related issues and can maintain a local programming model.

We prioritize the implementation of the second method: the data source proxy creates the corresponding XAConnection based on the normal JDBC connection obtained from the normal data source.

Comparison with the data source proxy mechanism of the AT mode:

<img src="/img/xa/pics/ds1.png" alt="img" style={{ zoom:'50%' }} />

However, the second method has limitations: it cannot guarantee compatibility correctness.

In fact, this method is what database drivers should do. Different vendors and different versions of database driver implementation mechanisms are vendor-specific, and we can only guarantee correctness on fully tested driver versions, as differences in the driver versions used by developers can lead to the failure of the mechanism.

This is particularly evident in Oracle. See Druid issue: [https://github.com/alibaba/druid/issues/3707](https://github.com/alibaba/druid/issues/3707)

Taking everything into account, the data source proxy design for XA mode needs to support the first method: proxy based on XA data source.

Comparison with the data source proxy mechanism of the AT mode:

<img src="/img/xa/pics/ds2.png" alt="img" style={{ zoom:'50%' }} />

#### 3. Branch Registration

XA start requires the Xid parameter.

This Xid needs to be associated with the XID and BranchId of the Seata global transaction, so that the TC can drive the XA branch to commit or rollback.

Currently, the BranchId in Seata is generated uniformly by the TC during the branch registration process, so the timing of the XA mode branch registration needs to be before XA start.

A possible optimization in the future:

Delay branch registration as much as possible. Similar to the AT mode, register the branch before the local transaction commit to avoid meaningless branch registration in case of branch execution failure.

This optimization direction requires a change in the BranchId generation mechanism to cooperate. BranchId will not be generated through the branch registration process, but will be generated and then used to register the branch.

#### 4. Summary

Here, only a few important core designs of the XA mode are explained to illustrate its basic operation mechanism.

In addition, important aspects such as *connection maintenance* and *exception handling* are also important and can be further understood from the project code.

More information and exchange will be written and shared with everyone in the future.

### 3.1.3 Evolution Plan

The overall evolution plan of the XA mode is as follows:

1. Step 1 (already completed): The first version (1.2.0) runs the prototype mechanism of the XA mode. Ensure only addition, no modification, and no new issues introduced to other modes.
2. Step 2 (planned to be completed in May): Necessary integration and refactoring with the AT mode.
3. Step 3 (planned to be completed in July): Refine the exception handling mechanism and polish for production readiness.
4. Step 4 (planned to be completed in August): Performance optimization.
5. Step 5 (planned to be completed in 2020): Integrate with Seata project's ongoing design for cloud-native Transaction Mesh to create cloud-native capabilities.

## 3.2 Usage of XA Mode

From a programming model perspective, XA mode is exactly the same as the AT mode.

You can refer to the Seata official website sample: [seata-xa](https://github.com/seata/seata-xa)

The example scenario is the classic Seata example, involving the product ordering business of three microservices: inventory, orders, and accounts.

In the example, the upper programming model is the same as the AT mode. By simply modifying the data source proxy, you can switch between XA mode and AT mode.

```java
@Bean("dataSource")
public DataSource dataSource(DruidDataSource druidDataSource) {
    // DataSourceProxy for AT mode
    // return new DataSourceProxy(druidDataSource);

    // DataSourceProxyXA for XA mode
    return new DataSourceProxyXA(druidDataSource);
}
```

# 4. Summary

At the current stage of technological development, there is no distributed transaction processing mechanism that can perfectly meet all scenarios' requirements.

Consistency, reliability, ease of use, performance, and many other aspects of system design constraints require different transaction processing mechanisms to meet them.

The core value of the Seata project is to build a standardized platform that comprehensively addresses the distributed transaction problem.

Based on Seata, the upper application architecture can flexibly choose the appropriate distributed transaction solution according to the actual scenario's needs.

<img src="https://img.alicdn.com/tfs/TB1lTSoOqL7gK0jSZFBXXXZZpXa-1028-528.png" alt="img" style={{ zoom:'50%' }} />

The addition of XA mode fills the gap in Seata in the global consistency scenario, forming a landscape of four major transaction modes: AT, TCC, Saga, and XA, which can basically meet all scenarios' demands for distributed transaction processing.

Of course, both XA mode and the Seata project itself are not yet perfect, and there are many areas that need improvement and enhancement. We warmly welcome everyone to participate in the project's development and contribute to building a standardized distributed transaction platform together.
