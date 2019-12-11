---
title: Seata Saga 模式
keywords: Seata
description: Seata Saga 模式。
---

# SEATA Saga 模式
## 概述
Saga模式是SEATA提供的长事务解决方案，在Saga模式中，业务流程中每个参与者都提交本地事务，当出现某一个参与者失败则补偿前面已经成功的参与者，一阶段正向服务和二阶段补偿服务都由业务开发实现。

![Saga模式示意图](/img/saga/sagas.png?raw=true)

理论基础：Hector & Kenneth 发表论⽂ Sagas （1987）

## Saga的实现：
### 基于状态机引擎的 Saga 实现：

目前SEATA提供的Saga模式是基于状态机引擎来实现的，机制是：
  1. 通过状态图来定义服务调用的流程并生成 json 状态语言定义文件
  2. 状态图中一个节点可以是调用一个服务，节点可以配置它的补偿节点
  3. 状态图 json 由状态机引擎驱动执行，当出现异常时状态引擎反向执行已成功节点对应的补偿节点将事务回滚
   > 注意: 异常发生时是否进行补偿也可由用户自定义决定
  4. 可以实现服务编排需求，支持单项选择、并发、子流程、参数转换、参数映射、服务执行状态判断、异常捕获等功能

示例状态图:

![示例状态图](/img/saga/demo_statelang.png?raw=true)

## 设计
### 状态机引擎原理:

![状态机引擎原理](/img/saga/saga_engine_mechanism.png?raw=true)

* 图中的状态图是先执行stateA, 再执行stataB，然后执行stateC
* "状态"的执行是基于事件驱动的模型，stataA执行完成后，会产生路由消息放入EventQueue，事件消费端从EventQueue取出消息，执行stateB
* 在整个状态机启动时会调用Seata Server开启分布式事务，并生产xid, 然后记录"状态机实例"启动事件到本地数据库
* 当执行到一个"状态"时会调用Seata Server注册分支事务，并生产branchId, 然后记录"状态实例"开始执行事件到本地数据库
* 当一个"状态"执行完成后会记录"状态实例"执行结束事件到本地数据库, 然后调用Seata Server上报分支事务的状态
* 当整个状态机执行完成, 会记录"状态机实例"执行完成事件到本地数据库, 然后调用Seata Server提交或回滚分布式事务

### 状态机引擎设计:

![状态机引擎设计](/img/saga/saga_engine.png?raw=true)

状态机引擎的设计主要分成三层, 上层依赖下层，从下往上分别是：
* Eventing 层:
  * 实现事件驱动架构, 可以压入事件, 并由消费端消费事件, 本层不关心事件是什么消费端执行什么，由上层实现
* ProcessController 层:
  * 由于上层的Eventing驱动一个“空”流程引擎的执行，"state"的行为和路由都未实现, 由上层实现
> 基于以上两层理论上可以自定义扩展任何"流程"引擎
* StateMachineEngine 层:
  * 实现状态机引擎每种state的行为和路由逻辑
  * 提供 API、状态机语言仓库
