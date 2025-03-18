---
title: Overview of Domain Model
keywords: [Seata, domain model]
description: Seata domain model.
---

# Overview of Domain Model

This article introduces the domain model of Seata (Simple Extensible Autonomous Transaction Architecture).

Seata is a distributed transaction product designed to address data consistency issues in a distributed architecture. It uses two-phase commit (2PC) or eventual consistency based on the BASE theory to achieve transaction consistency. For a detailed explanation of the transaction modes, please refer to the Transaction Modes section in the developer's guide. Seata offers advantages such as XA and AT support without business intrusion, TCC decoupled from specific service frameworks, independence from underlying RPC protocols, and storage media. It also provides highly customizable SAGA mode, eventual consistency, and high performance. Seata is capable of effectively establishing secure transaction protection for different business scenarios on the Seata distributed transaction platform.

## Seata Domain Model

![image](https://img.alicdn.com/tfs/TB19qmhOrY1gK0jSZTEXXXDQVXa-1330-924.png)

As shown in the diagram above, the lifecycle of a transaction in Seata mainly consists of three parts: Begin (TM), Registry (RM), and Commit/Rollback (TM & TC).

**Transaction Creation**

Transaction Manager (TM):

This is an entity in Seata used for creating and determining the transaction result. It is typically integrated into the upstream of the business invocation chain.

**Branch Transaction**

Resource Manager (RM):

This is an entity in Seata used for managing resources. In most cases, it is equivalent to a provider in a microservice, managing resources within the service, such as database resources.

**Transaction Determination**

Transaction Coordinator (TC):

This is an entity in Seata used for coordinating transactions in the two-phase commit (2PC) mode (except for SAGA). It can be driven by the transaction manager or self-driven for the two-phase transaction behavior.

- Commit:

  In Seata, when the transaction manager determines to commit, TC initiates the two-phase commit behavior for the transaction. For example, in TCC mode, it's the "confirm" step, in AT mode, it's the "undo log delete," and in XA mode, it's "XA Commit."

- Rollback:

  In Seata, when the transaction manager determines to roll back, TC initiates the two-phase rollback behavior for the transaction. For example, in TCC mode, it's the "cancel" step, in AT mode, it's "undo," and in XA mode, it's "XA Rollback."

- Timeout Rollback:

  In Seata, when the transaction manager specifies a timeout for a created transaction and that timeout is reached without determination, TC will actively perform a timeout rollback for transactions that have exceeded the timeout. The behavior for timeouts is the same as the Rollback behavior described above.

The three scenarios mentioned above are the transaction processing cases involving TC. These three states can expand into more transaction states. [For specific details, you can refer to this link](/docs/user/appendix/global-transaction-status).

**High Availability**

[Transaction Group](/docs/user/txgroup/transaction-group) (tx-service-group):

Seata's logical resource grouping allows applications (clients) to define transaction groups based on their microservices' needs, with each group having a unique name.

[Service Discovery](/docs/user/registry):

Seata supports service discovery for Eureka, Nacos, Consul, Etcd, ZooKeeper, Sofa, Redis, and file-based (using a specific file) configurations.
