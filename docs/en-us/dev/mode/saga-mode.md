---
title: Seata Saga Mode
keywords: Seata, Saga mode
description: The Saga model is a long transaction solution provided by SEATA. In the Saga model, each participant in the business process submits a local transaction. When a participant fails, the previous successful participant is compensated. One stage is positive serving and The two-stage compensation services are implemented by business development.
---

# SEATA Saga Mode
## Overview

The Saga model is a long transaction solution provided by SEATA. In the Saga model, each participant in the business process submits a local transaction. When a participant fails, the previous successful participant is compensated. One stage is positive serving and The two-stage compensation services are implemented by business development.

![Saga mode diagram](/img/saga/sagas.png?raw=true)

Theoretical basis: Hector & Kenneth Post a comment Sagas （1987）

## Saga's implementation:
### Saga implementation based on state machine engine:

Currently, the Saga mode provided by SEATA is implemented based on the state machine engine. The mechanism is:
   1. Define the process of service invocation through state diagram and generate json state language definition file
   2. A node in the state diagram can call a service, and the node can configure its compensation node
   3. The state diagram json is driven by the state machine engine. When an exception occurs, the state engine reversely executes the compensation node corresponding to the successful node and rolls back the transaction
   > Note: Whether to compensate when an exception occurs can also be determined by the user
   4. Support the realization of service orchestration requirements, support single selection, concurrency, sub-process, parameter conversion, parameter mapping, service execution status judgment, exception capture and other functions

Example state diagram:

![Example state diagram](/img/saga/demo_statelang.png?raw=true)

## Design
### State Machine Engine Principle:

![State Machine Engine Principle](/img/saga/saga_engine_mechanism.png?raw=true)

* The state diagram in the figure is to execute stateA, then stateB, and then stateC
* The execution of "state" is based on the event-driven model. After the execution of stateA, routing messages will be generated and put into EventQueue. The event consumer will fetch messages from EventQueue and execute stateB.
* When the entire state machine is started, it will call Seata Server to start distributed transactions, and generate xid, and then record "state machine instance" startup events to the local database
* When the execution reaches a "state", it will call Seata Server to register branch transactions and produce branchId, and then record the "state instance" to start executing events to the local database
* When a "status" execution is completed, the "status instance" execution end event is recorded to the local database, and then the Seata Server is called to report the status of the branch transaction
* When the execution of the entire state machine is completed, the "state machine instance" execution completion event is recorded to the local database, and then Seata Server is called to submit or roll back the distributed transaction

### State Machine Engine Design:

![State Machine Engine Design](/img/saga/saga_engine.png?raw=true)

The design of the state machine engine is mainly divided into three layers. The upper layer depends on the lower layer. From bottom to top:
* Eventing layer:
    * Implement event-driven architecture, which can push events and consume events by the consumer. This layer does not care what the event is and what the consumer performs.
* ProcessController layer:
    * Because the upper-level Eventing drives the execution of an "empty" process engine, the behavior and routing of "state" are not implemented.
> Based on the above two layers, in theory, you can customize and extend any "process" engine
* StateMachineEngine layer:
    * Implement the behavior and routing logic of each state of the state machine engine
    * Provide API, state machine language warehouse
