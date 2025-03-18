---
title: 领域模型概述
keywords: [Seata、领域模型]
description: Seata 领域模型。
---

# 领域模型概述

本文为您介绍 Seata(Simpe Extensible Autonomous Transaction Architecture) 的领域模型。

Seata 是一款针对分布式架构下产生的数据一致性问题而诞生的分布式事务产品，使用2pc或基于base理论的最终一致性来达成事务。事务模式的具体说明，请参考开发者指南中的事务模式介绍。 Seata 产品具备XA&AT无业务入侵的即插即用模式,TCC不与具体的服务框架耦合,与底层 RPC 协议无关,与底层存储介质无关性的优势,SAGA模式的高度自定义,最终一致性,高性能的优势,针对每个业务场景的不同可有效的基于Seata分布式事务平台,快速高效的建立安全的事务保障。

## Seata 领域模型

![image](https://img.alicdn.com/tfs/TB19qmhOrY1gK0jSZTEXXXDQVXa-1330-924.png)

如上图所示，Seata 中事务生命周期主要分为Begin(TM),Registry(RM),Commit/Rollback(TM&TC)这三部分。

事务管理者(TM)通过rpc至事务协调者(TC)创建全局事务(Global Transaction)，将TC生成的XID传递至其TM所调用的任意资源管理者(RM)中，RM通过其接收到的XID,将其所管理的资源且被该调用锁使用到的资源注册为一个事务分支(Branch Transaction),当该请求的调用链全部结束时TM将事务的决议结果(Commit/Rollback)通知TC,TC将协调所有RM进行事务的二阶段动作.

**事务创建**

事务管理者(TM)：

Seata 中用于创建和决议事务结果的实体,一般集成于业务调用链路的上游.

**分支事务**

资源管理者(RM)：

Seata 中用于管理资源的实体,一般情况下等同于微服务中的提供方(provider),管理其所在服务中的资源,如数据库资源等.

**事务决议**

事务协调者(TC)：

Seata 中用于2pc方式的事务模式统一协调事务的实体(SAGA除外),其可由事务管理者驱动或自身驱动进行事务的二阶段行为.

- Commit：

  Seata 中当事务管理器决议为提交时,TC才会进行对事务的二阶段提交行为下发,如TCC模式中的confirm,AT模式的undolog delete,XA模式的XA Commit。

- Rollback：

  Seata 中当事务管理器决议为回滚时,TC会进行对事务的二阶段回滚行为下发,如TCC模式中的cancel,AT模式的undo,XA模式的XA Rollback。

- TimeoutRollback：

  Seata 中当事务管理器创建事务时指定的Timeout时间到达后还未决议时,TC会主动将已超时的事务进行超时回滚,其超时行为等同上述Rollback行为.

以上为TC涉及事务处理的三种情况,其三种状态会扩展出更多的事务状态,[具体可点击此处查看](/docs/user/appendix/global-transaction-status/).

**高可用**

[事务分组](/docs/user/txgroup/transaction-group/)(tx-service-group)：

seata的资源逻辑，可以按微服务的需要，在应用程序（客户端）对自行定义事务分组，每组取一个名字。

[服务发现](/docs/user/registry/)：

Seata 中服务发现支持eureka,nacos,consul,etcd,zookeeper,sofa,redis,file(文件指定)
