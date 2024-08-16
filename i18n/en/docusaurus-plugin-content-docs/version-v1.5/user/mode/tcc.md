---
title: Seata TCC Mode
keywords: [Seata, TCC]
description: User guide for Seata TCC mode
---

# Seata TCC Mode

## Overview

TCC Mode is a distributed transaction solution supported by Seata that allows fine-grained control by business entities. It is an intrusive solution, meaning it directly impacts the service layer, independent of the underlying database. TCC Mode is the second transaction mode supported by Seata, initially contributed by Ant Financial. Its distributed transaction model operates directly on the service layer, does not rely on the underlying database, offers flexibility in choosing the granularity of business resource locking, reduces resource lock holding time, exhibits good scalability, and is designed for independently deployable SOA services.

![Overview of a global transaction](/img/seata_tcc-1.png)

In this document, we will focus on the usage of Seata TCC Mode. If you are interested in the principles behind TCC Mode and want to understand how Seata TCC addresses idempotence, empty rollback, and hanging issues, please refer to the corresponding [Developer Guide](../../dev/mode/tcc-mode).

### Advantages

TCC is entirely independent of the underlying database, allowing for the management of resources across databases and applications, providing more granular control to business entities.

### Disadvantages

TCC is an intrusive distributed transaction solution that requires business systems to implement the Try, Confirm, and Cancel operations. It has a significant impact on business systems and is relatively complex in design.

### Use Cases

TCC Mode is a high-performance distributed transaction solution suitable for scenarios with high performance requirements, such as core systems.

## Overall Mechanism

In the two-phase commit protocol, the Resource Manager (RM) needs to provide "prepare," "commit," and "rollback" operations. The Transaction Manager (TM) coordinates all Resource Managers in two phases. In the first phase, it queries all Resource Managers to check if the "prepare" is successful. If all resources are prepared successfully, it executes the "commit" operations in the second phase. Otherwise, it executes the "rollback" operations, ensuring that the final state of all resources is consistent, either all committed or all rolled back.

There are many ways to implement Resource Managers, and TCC (Try-Confirm-Cancel) is a service-oriented implementation of Resource Managers. TCC is a mature distributed transaction solution used to address data consistency issues in operations across databases and services. TCC, with its Try, Confirm, and Cancel methods, is implemented by business code, making it a service-oriented Resource Manager.

The TCC Try operation serves as the first phase, responsible for checking and reserving resources. The Confirm operation is the second-phase commit operation, executing the actual business logic. Cancel is the second-phase rollback operation, canceling the reserved resources and reverting them to their initial state.

## Basic Usage

In contrast to AT Mode, where data source proxy is used to shield distributed transaction details, in TCC Mode, business entities need to define the "prepare," "commit," and "rollback" for TCC resources. For example:

```java
public interface TccActionOne {
    @TwoPhaseBusinessAction(name = "DubboTccActionOne", commitMethod = "commit", rollbackMethod = "rollback")
    public boolean prepare(BusinessActionContext actionContext, @BusinessActionContextParameter(paramName = "a") String a);
    public boolean commit(BusinessActionContext actionContext);
    public boolean rollback(BusinessActionContext actionContext);
}
```

Seata treats a TCC interface as a resource, also known as a TCC Resource. The core annotation in the business interface is `@TwoPhaseBusinessAction`, indicating that the current method uses TCC Mode for transaction management and specifying the Try, Confirm, and Cancel phases. The `name` attribute registers a globally unique TCC bean name for the current transaction. The three execution phases of TCC Mode are:

- Try phase: Reserving operational resources (Prepare). The method executed in this phase is the one annotated with `@TwoPhaseBusinessAction`, such as the `prepare` method in the example code.
- Confirm phase: Executing the main business logic (Commit). This phase uses the method specified by the `commitMethod` attribute to perform the Confirm work.
- Cancel phase: Transaction rollback (Rollback). This phase uses the method specified by the `rollbackMethod` attribute to perform the Cancel work.

Additionally, in TCC Mode, you can use the `BusinessActionContext` to pass query parameters in the transaction context. The attributes include:

- `xid`: Global transaction ID.
- `branchId`: Branch transaction ID.
- `actionName`: Branch resource ID (resource ID).
- `actionContext`: Parameters passed by the business, which can be annotated with `@BusinessActionContextParameter` to indicate the parameters to be passed.

After defining the TCC interface, you can open a distributed transaction using `@GlobalTransactional`, similar to AT Mode:

```java
@GlobalTransactional
public String doTransactionCommit(){
    tccActionOne.prepare(null,"one");
    tccActionTwo.prepare(null,"two");
}
```

Note that if TCC participants are local beans (non-remote RPC services), you need to add the `@LocalTCC` annotation to the interface definition, as shown in the following example:

```java
@LocalTCC
public interface TccActionTwo {
    @TwoPhaseBusinessAction(name = "TccActionTwo", commitMethod = "commit", rollbackMethod = "rollback")
    public boolean prepare(BusinessActionContext actionContext, @BusinessActionContextParameter(paramName = "a") String a);
    public boolean commit(BusinessActionContext actionContext);
    public boolean rollback(BusinessActionContext actionContext);
}
```

## Getting Started

Follow the [seata-samples/tcc](https://github.com/apache/incubator-seata-samples/tree/master/tcc) section for several examples to experiment with. You can start [local-tcc-example](https://github.com/apache/incubator-seata-samples/tree/master/tcc/local-tcc-sample) to view an example of local bean usage or [dubbo-tcc-example](https://github.com/apache/incubator-seata-samples/tree/master/tcc/local-tcc-sample) for a remote TCC example.
