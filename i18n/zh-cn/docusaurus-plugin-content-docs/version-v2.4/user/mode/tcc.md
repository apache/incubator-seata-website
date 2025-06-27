---
title: Seata TCC 模式
keywords: [Seata, TCC]
description: Seata TCC 模式用户文档
---

# Seata TCC 模式

## 概述

TCC 模式是 Seata 支持的一种由业务方细粒度控制的侵入式分布式事务解决方案，是继 AT 模式后第二种支持的事务模式，最早由蚂蚁金服贡献。其分布式事务模型直接作用于服务层，不依赖底层数据库，可以灵活选择业务资源的锁定粒度，减少资源锁持有时间，可扩展性好，可以说是为独立部署的 SOA 服务而设计的。

![Overview of a global transaction](/img/seata_tcc-1.png)

本文中，我们将重点介绍 Seata TCC 模式的使用，如果您对于 TCC 模式原理感兴趣，想要了解 Seata TCC 对于幂等、空回滚、悬挂问题的解决，还请阅读对应于本篇文章的[开发者指南](../../dev/mode/tcc-mode)。

### 优势

TCC 完全不依赖底层数据库，能够实现跨数据库、跨应用资源管理，可以提供给业务方更细粒度的控制。

### 缺点

TCC 是一种侵入式的分布式事务解决方案，需要业务系统自行实现 Try，Confirm，Cancel 三个操作，对业务系统有着非常大的入侵性，设计相对复杂。

### 适用场景

TCC 模式是高性能分布式事务解决方案，适用于核心系统等对性能有很高要求的场景。



## 整体机制

在两阶段提交协议中，资源管理器（RM, Resource Manager）需要提供“准备”、“提交”和“回滚” 3 个操作；而事务管理器（TM, Transaction Manager）分 2 阶段协调所有资源管理器，在第一阶段询问所有资源管理器“准备”是否成功，如果所有资源均“准备”成功则在第二阶段执行所有资源的“提交”操作，否则在第二阶段执行所有资源的“回滚”操作，保证所有资源的最终状态是一致的，要么全部提交要么全部回滚。

资源管理器有很多实现方式，其中 TCC（Try-Confirm-Cancel）是资源管理器的一种服务化的实现；TCC 是一种比较成熟的分布式事务解决方案，可用于解决跨数据库、跨服务业务操作的数据一致性问题；TCC 其 Try、Confirm、Cancel 3 个方法均由业务编码实现，故 TCC 可以被称为是服务化的资源管理器。

TCC 的 Try 操作作为一阶段，负责资源的检查和预留；Confirm 操作作为二阶段提交操作，执行真正的业务；Cancel 是二阶段回滚操作，执行预留资源的取消，使资源回到初始状态。



## 基本使用

区别于在 AT 模式直接使用数据源代理来屏蔽分布式事务细节，业务方需要自行定义 TCC 资源的“准备”、“提交”和“回滚” 。比如在下方的例子中，

```java
public interface TccActionOne {
    @TwoPhaseBusinessAction(name = "DubboTccActionOne", commitMethod = "commit", rollbackMethod = "rollback")
    public boolean prepare(BusinessActionContext actionContext, @BusinessActionContextParameter(paramName = "a") String a);
    public boolean commit(BusinessActionContext actionContext);
    public boolean rollback(BusinessActionContext actionContext);
}
```

Seata 会把一个 TCC 接口当成一个 Resource，也叫 TCC Resource。在业务接口中核心的注解是 `@TwoPhaseBusinessAction`，表示当前方法使用 TCC 模式管理事务提交，并标明了 Try，Confirm，Cancel 三个阶段。name属性，给当前事务注册了一个全局唯一的的 TCC bean name。同时 TCC 模式的三个执行阶段分别是：

- Try 阶段，预定操作资源（Prepare） 这一阶段所以执行的方法便是被 `@TwoPhaseBusinessAction` 所修饰的方法。如示例代码中的 `prepare` 方法。
- Confirm 阶段，执行主要业务逻辑（Commit） 这一阶段使用 `commitMethod` 属性所指向的方法，来执行Confirm 的工作。
- Cancel 阶段，事务回滚（Rollback） 这一阶段使用 `rollbackMethod` 属性所指向的方法，来执行 Cancel 的工作。

其次，可以在 TCC 模式下使用 `BusinessActionContext` 在事务上下文中传递查询参数。如下属性：

- `xid` 全局事务id
- `branchId` 分支事务id
- `actionName` 分支资源id，（resource id）
- `actionContext` 业务传递的参数，可以通过 `@BusinessActionContextParameter` 来标注需要传递的参数。

在定义好 TCC 接口之后，我们可以像 AT 模式一样，通过 `@GlobalTransactional` 开启一个分布式事务。

```java
@GlobalTransactional
public String doTransactionCommit(){
    tccActionOne.prepare(null,"one");
    tccActionTwo.prepare(null,"two");
}
```

注意，如果 TCC 参与者是本地 bean（非远程RPC服务），本地 TCC bean 还需要在接口定义中添加 @LocalTCC 注解，比如,

```java
@LocalTCC
public interface TccActionTwo {
    @TwoPhaseBusinessAction(name = "TccActionTwo", commitMethod = "commit", rollbackMethod = "rollback")
    public boolean prepare(BusinessActionContext actionContext, @BusinessActionContextParameter(paramName = "a") String a);
    public boolean commit(BusinessActionContext actionContext);
    public boolean rollback(BusinessActionContext actionContext);
}
```

## 快速开始

请跟随 [seata-samples/tcc](https://github.com/apache/incubator-seata-samples/tree/master/tcc) 中若干种示例进行实验，可以启动 [local-tcc-example](https://github.com/apache/incubator-seata-samples/tree/master/tcc/local-tcc-sample) 查看本地 bean 的示例，或者 [dubbo-tcc-example](https://github.com/apache/incubator-seata-samples/tree/master/tcc/local-tcc-sample) 查看远程 TCC 示例。