---
title: 事务控制及全局锁
keywords: [console, transaction, lock]
description: Seata控制台提供对4种分布式事务的手工控制及AT模式下的全局锁的控制
---
Seata控制台提供对4种分布式事务的手工控制及AT模式下的全局锁的控制。具体实现原理为根据分布式事务状态机来允许处于不同状态的事务手工事务变更操作，通过更改在存储中（支持Seata Server的所有存储模式file，db，redis及raft）的分布式事务状态来触发下一状态的流程运行。目前支持的功能有：

**全局事务操作：**

+ 删除全局事务：允许已经到达终态的全局事务删除在Server端存储的数据
+ 强制删除全局事务：跳过事务状态检查，直接删除全局事务在在Server端存储的数据
+ 停止全局事务：将正在提交或者回滚中的全局事务停止运行
+ 开启全局事务重试：将停止的全局事务重新开启重试
+ 提交或回滚全局事务：将正在提交、回滚或停止的事务再次尝试提交或者回滚
+ 更新全局事务状态：将提交或者回滚失败的事务再次进行提交或者回滚

**分支事务操作：**

+ 删除分支事务：允许已经达到终态的分支事务删除在Server端存储的数据
+ 强制删除分支事务：跳过事务状态检查，直接删除分支事务在在Server端存储的数据
+ 开启/停止分支事务：停止正在提交或回滚的分支事务，提交或者回滚停止的分支事务

**全局锁操作：**

+ 删除全局锁：删除全局锁记录

# 背景知识
为了更好的使用事务及全局锁功能，下面对全局事务状态、分支事务状态、全局锁及Seata Server的存储模式进行简要说明。如只想快速开始，可直接查看后续的功能说明章节。

## 全局事务
+ Unknown：全局事务状态不明确，一般在全局事务开始前处于该状态
+ Begin：刚开启全局事务，分支事务可能正在执行或未执行
+ Committing：二阶段正在提交（所有分支事务执行完后，TM向TC发起全局提交）
+ CommitRetrying：提交分支事务返回的不是PhaseTwo_Committed跟PhaseTwo_CommitFailed_Unretryable，或者分支事务提交出现异常，设置为该状态，表示因为可恢复的失败正在重试
+ Rollbacking：二阶段正在回滚（TM发起全局回滚，TC接受后更改的状态）
+ TimeoutRollbacking：定时任务检查出该全局事务超时后设置某个分支事务回滚时出现异常或返回的分支状态不是PhaseTwo_Rollbacked或PhaseTwo_RollbackFailed_Unretryable（比如返回的是XA分支重试状态或者PhaseTwo_RollbackFailed_Retryable）：会设置如下状态
  - TimeoutRollbackRetrying：回滚失败且全局事务超时（通常是被定时任务检查出的）
  - RollbackRetrying：回滚失败但全局事务并没有超时
+ AsyncCommitting：TC在提交时，如果可以异步提交便异步提交，仅仅针对AT模式
+ Committed：最终状态，已经成功提交
+ CommitFailed：最终状态，提交分支事务返回PhaseTwo_CommitFailed_Unretryable时会设置
+ Rollbacked：最终状态，已经成功回滚
+ TimeoutRollbacked：最终状态，所有分支事务已经成功回滚，不过后续发现全局事务超时
+ RollbackFailed：最终状态，回滚分支事务时返回PhaseTwo_RollbackFailed_Unretryable或者定时任务重试回滚时超时（超过 MAX_ROLLBACK_RETRY_TIMEOUT ）
+ TimeoutRollbackFailed：最终状态，回滚分支事务返回PhaseTwo_RollbackFailed_Unretryable且全局事务超时
+ Finished：最终状态，标注不存在的事务或者状态不明确的事务，在saga模式在分支事务返回PhaseOne_Failed会进行持久化
+ CommitRetryTimeout：最终状态，定时任务重试提交超时
+ RollbackRetryTimeout：最终状态，定时任务重试回滚超时
+ Deleting：事务正在删除中
+ StopCommitOrCommitRetry：停止事务提交或事务提交重试
+ StopRollbackOrRollbackRetry：停止事务回滚或事务回滚重试

## 分支事务
+ Unknown：分支事务状态不明确
+ Registered：向TC注册分支
+ PhaseOne_Done：分支事务commit时设置
+ PhaseOne_Failed：分支事务rollback时设置
+ PhaseOne_Timeout：未使用
+ PhaseTwo_Committed：TC向RM发送分支事务提交，提交成功后RM返回该状态（不会持久化，
+ 直接remove分支）
+ PhaseTwo_CommitFailed_Retryable：TC向RM发送分支事务提交，提交失败后RM返回该状态
+ PhaseTwo_CommitFailed_Unretryable：TC向RM发送分支事务提交，分支事务提交出现异常返回该状态
+ PhaseTwo_Rollbacked：TC向RM发送分支事务回滚，回滚成功后RM返回该状态（不会持久化，直接remove分支）
+ PhaseTwo_RollbackFailed_Retryable：TC向RM发送分支事务提交，提交失败后RM返回该状态
+ PhaseTwo_RollbackFailed_Unretryable：TC向RM发送分支事务提交，分支事务提交出现异常返回该状态
+ PhaseTwo_CommitFailed_XAER_NOTA_Retryable：针对XA提交失败重试
+ PhaseTwo_RollbackFailed_XAER_NOTA_Retryable：针对XA回滚失败重试
+ PhaseOne_RONLU：在Oracle数据库中执行分支准备后，只执行纯只读的查询语句
+ STOP_RETRY：停止重试

## 全局锁
全局锁仅仅针对AT模式，非正常情况下释放锁后可能会出现脏写问题

## 存储模式
Seata Server的存储模式有以下四种：

- **File模式**：适用于小型项目或测试环境，数据存储在本地文件中，性能和可靠性相对较低。
- **DB模式**：适用于生产环境，数据存储在数据库中（如MySQL、Oracle等），具有较高的性能和可靠性，但需要额外维护数据库。
- **Redis模式**：适用于对性能要求较高且已使用Redis的场景，数据存储在Redis中，具有较高的读写速度，但可能会增加Redis的负载。
- **Raft模式**：通过封装无法高可用的file模式，利用Raft算法实现多个TC之间数据的同步。

当通过控制台及事务及全局事务进行操作后，可能会更改在数据库中的存储状态，可根据对应存储模式进行查看。

# 功能说明
## 全局事务操作
为了避免人工对全局事务操作时对事务状态的改变发生错误，往往在操作前会进行事务的状态检查。基于背景知识中的全局事务，对其分为以下几类，事务状态的检查往往会涉及以下状态分类的校验：
### 事务状态分类
#### 重试操作状态

1. **提交重试集合**
   `RETRY_COMMIT_STATUS`: CommitRetrying
2. **回滚重试集合**
   `RETRY_ROLLBACK_STATUS`: RollbackRetrying, TimeoutRollbackRetrying, TimeoutRollbacking
3. **综合重试集合**
   `RETRY_STATUS`: CommitRetrying, RollbackRetrying, TimeoutRollbackRetrying, TimeoutRollbacking

---

#### 进行中操作状态

1. **提交中集合**
   `COMMIT_ING_STATUS`: Committing, CommitRetrying
2. **回滚中集合**
   `ROLLBACK_ING_STATUS`: Rollbacking, RollbackRetrying, TimeoutRollbackRetrying, TimeoutRollbacking

---

#### 失败终止状态

1. **提交失败集合**
   `FAIL_COMMIT_STATUS`: CommitFailed, CommitRetryTimeout
2. **回滚失败集合**
   `FAIL_ROLLBACK_STATUS`: TimeoutRollbacked, RollbackFailed, RollbackRetryTimeout
3. **综合失败集合**
   `FAIL_STATUS`: CommitFailed, CommitRetryTimeout, TimeoutRollbacked, RollbackFailed, RollbackRetryTimeout

---

#### 完成终止状态

`FINISH_STATUS`: Committed, Finished, Rollbacked

### 删除全局事务
删除全局事务在删除前会对当前事务状态进行校验，只有处于 FAIL_COMMIT_STATUS，FAIL_ROLLBACK_STATUS，RETRY_COMMIT_STATUS，RETRY_ROLLBACK_STATUS，Committed，Finished ，Rollbacked，Deleting，StopCommitRetry，StopRollbackRetry 这些状态下才允许删除。删除开始时会将全局事务改为Deleting状态。在删除过程中会获取全局事务下的分支事务，如果在一阶段失败则直接删除，其余则根据事务模式进行不同的操作：

+ AT模式：对分支事务发起commit操作去触发undo log的删除，释放全局锁
+ TCC模式：对分支事务发起rollback操作
+ SAGA模式：没有分支事务概念，直接完成操作
+ XA模式：对分支事务发起rollback操作

更多细节可参考源码中的`org.apache.seata.server.console.impl.AbstractGlobalService`

![del-global-trx](/img/console/del-global-trx.png)

### 强制删除全局事务
强制删除全局事务可能会发生事务脏写的情况，仅仅只对Server端的存储的全局事务和全局事务下的分支事务Session进行删除

![force-del-global-trx](/img/console/force-del-global-trx.png)

### 停止全局事务重试
停止全局事务在停止前会对当前事务状态进行校验，只有处于处于`Committing`，`CommitRetrying`，`TimeoutRollbacking`，`TimeoutRollbackRetrying`，`RollbackRetrying`, `Rollbacking`这种状态才允许停止。 停止时会根据是处于提交或回滚的相关状态改为`StopCommitOrCommitRetry`或者`StopRollbackOrRollbackRetry`状态，以此阻止事务补偿线程池的相关操作（不会当场间接修改分支事务状态）。

![stop-global-trx](/img/console/stop-global-trx.png)

停止后会出现相应提示

![stop-global-trx-hint](/img/console/stop-global-trx-hint.png)

### 开启全局事务重试
开启全局事务重试在开启前会当前事务状态进行校验，只有处于`StopCommitOrCommitRetry`，`StopRollbackOrRollbackRetry`这种状态才允许开启。开启时会根据是处于停止提交或停止回滚的相关状态改为`CommitRetrying`或者`RollbackRetrying`状态，以此触发事务补偿线程的相关操作（不会当场间接修改分支事务状态）。

![start-global-trx](/img/console/start-global-trx.png)

### 提交或回滚全局事务
提交或回滚全局事务在开始前会对当前事务状态进行校验，只有处于`Committing`, `CommitRetrying`, `TimeoutRollbacking`, `TimeoutRollbackRetrying`, `RollbackRetrying`, `Rollbacking`, `StopCommitOrCommitRetry`, `StopRollbackOrRollbackRetry`这种状态才允许提交或回滚全局事务。

如果是提交的相关状态，触发事务全局提交（AT模式是异步提交）。如果是回滚的相关状态，触发事务全局回滚。

![commit-or-rollback](/img/console/commit-or-rollback.png)

### 更新全局事务状态
更新全局事务状态在开始前会对当前事务状态进行校验，只有处于`FAIL_COMMIT_STATUS`和`FAIL_ROLLBACK_STATUS`这种状态才允许进行更新全局事务状态。如果是提交的相关状态，触发事务全局提交。如果是回滚相关的状态，触发事务全局回滚。

![update-global-trx](/img/console/update-global-trx.png)

## 分支事务操作
事务控制台默认显示的是全局事务操作，需要点击按钮切换能够操作分支事务的相关功能

![branch-trx](/img/console/branch-trx.png)

切换后即可在操作页面查看分支事务信息，点击即可查看分支事务详情

![branch-trx-detail](/img/console/branch-trx-detail.png)

### 删除分支事务
删除分支事务在删除前会对当前事务状态进行校验，只有全局事务的状态允许进行删除时才能进行分支事务的删除。在删除过程中会获取分支事务状态，并根据全局事务删除时对分支事务的操作进行相同处理

![del-branch-trx](/img/console/del-branch-trx.png)

### 强制删除分支事务
强制删除分支事务可能会发生事务脏写的情况，仅仅只对Server端的存储的分支事务Session进行删除

![force-del-branch-trx](/img/console/force-del-branch-trx.png)

### 停止分支事务
在停止分支事务前会对当前事务状态进行校验，如果是 Saga 模式会直接报错（因为 Saga 模式没有分支事务），并进行如下状态检查：

- 分支事务为 `Unknown`、`Registered` 或 `PhaseOne_Done`。
- 全局事务处于 `RETRY_STATUS`、`Rollbacking`、`Committing`、`StopRollbackOrRollbackRetry`、`StopCommitOrCommitRetry`。

通过检查后即可将事务状态更改为停止。

![stop-branch-trx.png](/img/console/stop-branch-trx.png)

### 开始分支事务
开始分支事务功能只有在分支事务是停止时才会出现。开启后分支事务状态变为Registered

![start-branch-trx](/img/console/start-branch-trx.png)

## 全局锁操作
全局事务下可查看其所拥有的全局锁，这里只有AT模式下的事务才会持有全局锁

![global-lock](/img/console/global-lock.png)

对于事务拥有的全局锁可以对其进行删除，需注意删除后全局锁所对应的数据可能会发生脏写

![del-global-lock](/img/console/del-global-lock.png)
