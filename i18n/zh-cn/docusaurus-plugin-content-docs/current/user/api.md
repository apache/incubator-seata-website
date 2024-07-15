---
title: API 支持
keywords: [Seata]
description: Seata API 分为两大类：High-Level API 和 Low-Level API。
---

# 1. 概述

Seata API 分为两大类：High-Level API 和 Low-Level API ：

- **High-Level API** ：用于事务边界定义、控制及事务状态查询。
- **Low-Level API** ：用于控制事务上下文的传播。

# 2. High-Level API

## 2.1 GlobalTransaction

全局事务：包括开启事务、提交、回滚、获取当前状态等方法。

```java
public interface GlobalTransaction {

    /**
     * 开启一个全局事务（使用默认的事务名和超时时间）
     */
    void begin() throws TransactionException;

    /**
     * 开启一个全局事务，并指定超时时间（使用默认的事务名）
     */
    void begin(int timeout) throws TransactionException;

    /**
     * 开启一个全局事务，并指定事务名和超时时间
     */
    void begin(int timeout, String name) throws TransactionException;

    /**
     * 全局提交
     */
    void commit() throws TransactionException;

    /**
     * 全局回滚
     */
    void rollback() throws TransactionException;

    /**
     * 获取事务的当前状态
     */
    GlobalStatus getStatus() throws TransactionException;

    /**
     * 获取事务的 XID
     */
    String getXid();

}
```

## 2.2 GlobalTransactionContext

GlobalTransaction 实例的获取需要通过 GlobalTransactionContext：

```java

    /**
     * 获取当前的全局事务实例，如果没有则创建一个新的实例。
     */
    public static GlobalTransaction getCurrentOrCreate() {
        GlobalTransaction tx = getCurrent();
        if (tx == null) {
            return createNew();
        }
        return tx;
    }

    /**
     * 重新载入给定 XID 的全局事务实例，这个实例不允许执行开启事务的操作。
     * 这个 API 通常用于失败的事务的后续集中处理。
     * 比如：全局提交超时，后续集中处理通过重新载入该实例，通过实例方法获取事务当前状态，并根据状态判断是否需要重试全局提交操作。
     */
    public static GlobalTransaction reload(String xid) throws TransactionException {
        GlobalTransaction tx = new DefaultGlobalTransaction(xid, GlobalStatus.UnKnown, GlobalTransactionRole.Launcher) {
            @Override
            public void begin(int timeout, String name) throws TransactionException {
                throw new IllegalStateException("Never BEGIN on a RELOADED GlobalTransaction. ");
            }
        };
        return tx;
    }
```

## 2.3 TransactionalTemplate

事务化模板：通过上述 GlobalTransaction 和 GlobalTransactionContext API 把一个业务服务的调用包装成带有分布式事务支持的服务。

```java
public class TransactionalTemplate {

    public Object execute(TransactionalExecutor business) throws TransactionalExecutor.ExecutionException {

        // 1. 获取当前全局事务实例或创建新的实例
        GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();

        // 2. 开启全局事务
        try {
            tx.begin(business.timeout(), business.name());

        } catch (TransactionException txe) {
            // 2.1 开启失败
            throw new TransactionalExecutor.ExecutionException(tx, txe,
                TransactionalExecutor.Code.BeginFailure);

        }

        Object rs = null;
        try {
            // 3. 调用业务服务
            rs = business.execute();

        } catch (Throwable ex) {

            // 业务调用本身的异常
            try {
                // 全局回滚
                tx.rollback();

                // 3.1 全局回滚成功：抛出原始业务异常
                throw new TransactionalExecutor.ExecutionException(tx, TransactionalExecutor.Code.RollbackDone, ex);

            } catch (TransactionException txe) {
                // 3.2 全局回滚失败：
                throw new TransactionalExecutor.ExecutionException(tx, txe,
                    TransactionalExecutor.Code.RollbackFailure, ex);

            }

        }

        // 4. 全局提交
        try {
            tx.commit();

        } catch (TransactionException txe) {
            // 4.1 全局提交失败：
            throw new TransactionalExecutor.ExecutionException(tx, txe,
                TransactionalExecutor.Code.CommitFailure);

        }
        return rs;
    }

}
```

模板方法执行的异常：ExecutionException

```
    class ExecutionException extends Exception {

        // 发生异常的事务实例
        private GlobalTransaction transaction;

        // 异常编码：
        // BeginFailure（开启事务失败）
        // CommitFailure（全局提交失败）
        // RollbackFailure（全局回滚失败）
        // RollbackDone（全局回滚成功）
        private Code code;

        // 触发回滚的业务原始异常
        private Throwable originalException;
```

外层调用逻辑 try-catch 这个异常，根据异常编码进行处理：

- **BeginFailure** （开启事务失败）：getCause() 得到开启事务失败的框架异常，getOriginalException() 为空。
- **CommitFailure** （全局提交失败）：getCause() 得到全局提交失败的框架异常，getOriginalException() 为空。
- **RollbackFailure** （全局回滚失败）：getCause() 得到全局回滚失败的框架异常，getOriginalException() 业务应用的原始异常。
- **RollbackDone** （全局回滚成功）：getCause() 为空，getOriginalException() 业务应用的原始异常。

# 3. Low-Level API

## 3.1 RootContext

事务的根上下文：负责在应用的运行时，维护 XID 。

```java
    /**
     * 得到当前应用运行时的全局事务 XID
     */
    public static String getXID() {
        return CONTEXT_HOLDER.get(KEY_XID);
    }

    /**
     * 将全局事务 XID 绑定到当前应用的运行时中
     */
    public static void bind(String xid) {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("bind " + xid);
        }
        CONTEXT_HOLDER.put(KEY_XID, xid);
    }

    /**
     * 将全局事务 XID 从当前应用的运行时中解除绑定，同时将 XID 返回
     */
    public static String unbind() {
        String xid = CONTEXT_HOLDER.remove(KEY_XID);
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("unbind " + xid);
        }
        return xid;
    }

    /**
     * 判断当前应用的运行时是否处于全局事务的上下文中
     */
    public static boolean inGlobalTransaction() {
        return CONTEXT_HOLDER.get(KEY_XID) != null;
    }
```
High-Level API 的实现都是基于 RootContext 中维护的 XID 来做的。

应用的当前运行的操作是否在一个全局事务的上下文中，就是看 RootContext 中是否有 XID。

RootContext 的默认实现是基于 ThreadLocal 的，即 XID 保存在当前线程上下文中。

Low-Level API 的两个典型的应用场景：

### 1. 远程调用事务上下文的传播

远程调用前获取当前 XID：

```java
String xid = RootContext.getXID();
```

远程调用过程把 XID 也传递到服务提供方，在执行服务提供方的业务逻辑前，把 XID 绑定到当前应用的运行时：

```java
RootContext.bind(rpcXid);
```

### 2. 事务的暂停和恢复

在一个全局事务中，如果需要某些业务逻辑不在全局事务的管辖范围内，则在调用前，把 XID 解绑：

```java
String unbindXid = RootContext.unbind();
```
待相关业务逻辑执行完成，再把 XID 绑定回去，即可实现全局事务的恢复：

```java
RootContext.bind(unbindXid);
```


# 4. TCC API

TCC接口定义
```java
public interface NormalTccAction {

    /**
     * Prepare boolean.
     *
     * @param a             the a
     * @param b             the b
     * @param tccParam      the tcc param
     * @return the boolean
     */
    String prepare(int a, List b, TccParam tccParam);

    /**
     * Commit boolean.
     *
     * @param actionContext the action context
     * @return the boolean
     */
    boolean commit(BusinessActionContext actionContext, TccParam param);

    /**
     * Rollback boolean.
     *
     * @param actionContext the action context
     * @return the boolean
     */
    boolean rollback(BusinessActionContext actionContext, TccParam param);
}
```

TCC接口定义实现
```java
@LocalTCC
public class NormalTccActionImpl implements NormalTccAction {

    @TwoPhaseBusinessAction(name = "tccActionForTest", commitMethod = "commit", rollbackMethod = "rollback", commitArgsClasses = {BusinessActionContext.class, TccParam.class}, rollbackArgsClasses = {BusinessActionContext.class, TccParam.class})
    @Override
    public String prepare(@BusinessActionContextParameter("a") int a,
                          @BusinessActionContextParameter(paramName = "b", index = 0) List b,
                          @BusinessActionContextParameter(isParamInProperty = true) TccParam tccParam) {
        return "a";
    }

    @Override
    public boolean commit(BusinessActionContext actionContext,
                          @BusinessActionContextParameter("tccParam") TccParam param) {
        return false;
    }

    @Override
    public boolean rollback(BusinessActionContext actionContext, @BusinessActionContextParameter("tccParam") TccParam param) {
        return false;
    }

    public boolean otherMethod(){
        return true;
    }

}
```

TCC API 使用方式
```java
    @Test
    public void testTcc() {

        // 实例化一个未代理的普通TCC接口实现类
        NormalTccAction tccAction = new NormalTccActionImpl();

        // 通过代理工具ProxyUtil，创建一个代理的TCC接口类
        NormalTccAction tccActionProxy = ProxyUtil.createProxy(tccAction);

        // 准备一些TCC接口的参数
        TccParam tccParam = new TccParam(1, "abc@163.com");
        List<String> listB = Arrays.asList("b");

        // TCC一阶段提交
        String result = tccActionProxy.prepare(0, listB, tccParam);

        // 验证
        Assertions.assertEquals("a", result);
        Assertions.assertNotNull(result);
        Assertions.assertEquals("tccActionForTest", branchReference.get());

    }
```
简述说明
- 1，首先定义TCC接口，prepare，confirm，rollback。
- 2，实现接口，注意：注解@LocalTCC要修饰在实现类上，注解@TwoPhaseBusinessAction要修饰在实现类方法prepare上，可以通过BusinessActionContext来传递参数。
- 3，用ProxyUtil.createProxy(T target)创建TCC代理对象。(io.seata.integration.tx.api.util.ProxyUtil)
- 4，用代理类一阶段提交。


## 4.1 TCC注解描述

TCC有两个核心注解，分别是TwoPhaseBusinessAction和LocalTCC。

### 4.1.1 @TwoPhaseBusinessAction

@TwoPhaseBusinessAction表示了当前方法使用TCC模式管理事务提交。

- name属性，给当前事务注册了一个全局唯一的的TCC bean name。
如代码示例中，name = "TccActionOne"

TCC模式的三个执行阶段分别是：

- Try 阶段，预定操作资源（Prepare）
这一阶段所以执行的方法便是被@TwoPhaseBusinessAction所修饰的方法。如示例代码中的prepare方法。

- Confirm 阶段，执行主要业务逻辑（Commit）
这一阶段使用commitMethod属性所指向的方法，来执行Confirm的工作。

- Cancel 阶段，事务回滚（Rollback）
这一阶段使用rollbackMethod属性所指向的方法，来执行Rollback的工作。

### 4.1.2 @LocalTCC
@LocalTCC注解用来表示实现了二阶段提交的本地的TCC接口。如果使用Dubbo作为RPC通信组件则无须用此注解。


## 4.2 重要参数描述


## 4.2.1 BusinessActionContext
可以使用此入参在TCC模式下，在事务上下文中，传递查询参数。如下属性：
- xid 全局事务id
- branchId 分支事务id
- actionName 分支资源id，（resource id）
- actionContext 业务传递参数Map，可以通过@BusinessActionContextParameter来标注需要传递的参数。


## 4.2.2 @BusinessActionContextParameter
用此注解标注需要在事务上下文中传递的参数。被此注解修饰的参数，会被设置在BusinessActionContext中，
可以在commit和rollback阶段中，可以通过BusinessActionContext的getActionContext方法获取传递的业务参数值。
如下：
```java
context.getActionContext("id").toString();
```



