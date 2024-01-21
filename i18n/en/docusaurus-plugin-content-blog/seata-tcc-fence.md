---
title: Alibaba Seata Resolves Idempotence, Dangling, and Empty Rollback Issues in TCC Mode

author: Zhu Jinjun

keywords: [Seata, TCC, idempotence, dangling, empty rollback]

description: Seata version 1.5.1 from Alibaba has finally resolved the issues of idempotence, dangling, and empty rollback in TCC (Try-Confirm-Cancel) mode. This article mainly explains how Seata addresses these problems.

date: 2022/06/25
---

Translator: zhongxiang.wang（lightClouds917）

Today, let's talk about how the new version (1.5.1) of Alibaba's Seata resolves the issues of idempotence, dangling, and empty rollback in TCC mode.

## 1 TCC 

TCC mode is the most classic solution for distributed transactions. It divides the distributed transaction into two phases. In the try phase, resources are reserved for each branch transaction. If all branch transactions successfully reserve resources, the global transaction proceeds to the commit phase for committing the transaction globally. However, if any node fails to reserve resources, the global transaction enters the cancel phase to rollback the transaction globally.

Taking traditional order, inventory, and account services as an example, in the try phase, resources are attempted to be reserved by inserting orders, deducting inventory, and deducting amounts. These three services require local transaction commits, and the resources can be transferred to an intermediate table. In the commit phase, the resources reserved in the try phase are transferred to the final table. In the cancel phase, the resources reserved in the try phase are released, such as returning the account amount to the customer's account.

**Note: The try phase must involve committing local transactions. For example, when deducting the order amount, the money must be deducted from the customer's account. If it is not deducted, there will be a problem in the commit phase if the customer's account does not have enough money.**

### 1.1 try-commit

In the try phase, resources are first reserved, and then they are deducted in the commit phase. The diagram below illustrates this process:

![fence-try-commit](/img/blog/fence-try-commit.png)


### 1.2 try-cancel

In the try phase, resources are first reserved. If the deduction of inventory fails, leading to a rollback of the global transaction, the resources are released in the cancel phase. The diagram below illustrates this process:

![fence-try-cancel](/img/blog/fence-try-cancel.png)


## 2 TCC Advantages

The biggest advantage of TCC mode is its high efficiency. In the try phase, the resource locking in TCC mode is not a true lock, but rather a real local transaction submission that reserves resources in an intermediate state without the need for blocking and waiting. Therefore, it is more efficient than other modes.

Additionally, the TCC mode can be optimized as follows:

### 2.1 Asynchronous Commit

After the try phase succeeds, instead of immediately entering the confirm/cancel phase, it is considered that the global transaction has already ended. A scheduled task is started to asynchronously execute the confirm/cancel phase, which involves deducting or releasing resources. This approach can greatly improve performance.

### 2.2 Same-Database Mode

In the TCC mode, there are three roles:

- TM: Manages the global transaction, including starting the global transaction and committing/rolling back the global transaction.
- RM: Manages the branch transaction.
- TC: Manages the state of the global transaction and branch transactions.

The diagram below is from the Seata official website:

![fence-different-db](/img/blog/fence-different-db.png)

When TM starts a global transaction, RM needs to send a registration message to TC, and TC saves the state of the branch transaction. When TM requests a commit or rollback, TC needs to send commit or rollback messages to RM. In this way, in a distributed transaction with two branch transactions, there are four RPCs between TC and RM.

After optimization, the process is as shown in the diagram below:

TC saves the state of the global transaction. When TM starts a global transaction, RM no longer needs to send a registration message to TC. Instead, it saves the state of the branch transaction locally. After TM sends a commit or rollback message to TC, the asynchronous thread in RM first retrieves the uncommitted branch transactions saved locally, and then sends a message to TC to obtain the state of the global transaction in which the local branch transaction is located, in order to determine whether to commit or rollback the local transaction.

With this optimization, the number of RPCs is reduced by 50%, resulting in a significant performance improvement.

## 3 RM Code Example

Taking the inventory service as an example, the RM inventory service interface code is as follows:
```Java
@LocalTCC
public interface StorageService {

    /**
     * decrease
     * @param xid 
     * @param productId 
     * @param count 
     * @return
     */
    @TwoPhaseBusinessAction(name = "storageApi", commitMethod = "commit", rollbackMethod = "rollback", useTCCFence = true)
    boolean decrease(String xid, Long productId, Integer count);

    /**
     * commit
     * @param actionContext
     * @return
     */
    boolean commit(BusinessActionContext actionContext);

    /**
     * rollback
     * @param actionContext
     * @return
     */
    boolean rollback(BusinessActionContext actionContext);
}
```
By using the `@LocalTCC` annotation, when the RM is initialized, it registers a branch transaction with the TC. The `try` phase method (e.g., `decrease` method) is annotated with `@TwoPhaseBusinessAction`, which defines the branch transaction's `resourceId`, `commit` method, `cancel` method, and the `useTCCFence` property, which will be explained in the next section.

## 4 Issues with TCC

There are three major issues with the TCC pattern: idempotence, suspension, and empty rollback. In version 1.5.1 of Seata, a transaction control table named `tcc_fence_log` is introduced to address these issues. The `useTCCFence` property mentioned in the previous `@TwoPhaseBusinessAction` annotation is used to enable or disable this mechanism, with a default value of `false`.

The creation SQL statement for the `tcc_fence_log` table (in MySQL syntax) is as follows:

```SQL
CREATE TABLE IF NOT EXISTS `tcc_fence_log`
(
    `xid`           VARCHAR(128)  NOT NULL COMMENT 'global id',
    `branch_id`     BIGINT        NOT NULL COMMENT 'branch id',
    `action_name`   VARCHAR(64)   NOT NULL COMMENT 'action name',
    `status`        TINYINT       NOT NULL COMMENT 'status(tried:1;committed:2;rollbacked:3;suspended:4)',
    `gmt_create`    DATETIME(3)   NOT NULL COMMENT 'create time',
    `gmt_modified`  DATETIME(3)   NOT NULL COMMENT 'update time',
    PRIMARY KEY (`xid`, `branch_id`),
    KEY `idx_gmt_modified` (`gmt_modified`),
    KEY `idx_status` (`status`)
) ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4;
```

### 4.1 Idempotence

During the commit/cancel phase, if the TC does not receive a response from the branch transaction, it needs to retry the operation. Therefore, it is necessary for the branch transaction to support idempotence.

Let's take a look at how this is addressed in the new version. The following code is from the `TCCResourceManager` class:

```Java
@Override
public BranchStatus branchCommit(BranchType branchType, String xid, long branchId, String resourceId,
								 String applicationData) throws TransactionException {
	TCCResource tccResource = (TCCResource)tccResourceCache.get(resourceId);
	Object targetTCCBean = tccResource.getTargetBean();
	Method commitMethod = tccResource.getCommitMethod();
	try {
		//BusinessActionContext
		BusinessActionContext businessActionContext = getBusinessActionContext(xid, branchId, resourceId,
			applicationData);
		Object[] args = this.getTwoPhaseCommitArgs(tccResource, businessActionContext);
		Object ret;
		boolean result;
		//whether the useTCCFence property is set to true
		if (Boolean.TRUE.equals(businessActionContext.getActionContext(Constants.USE_TCC_FENCE))) {
			try {
				result = TCCFenceHandler.commitFence(commitMethod, targetTCCBean, xid, branchId, args);
			} catch (SkipCallbackWrapperException | UndeclaredThrowableException e) {
				throw e.getCause();
			}
		} else {
		}
		LOGGER.info("TCC resource commit result : {}, xid: {}, branchId: {}, resourceId: {}", result, xid, branchId, resourceId);
		return result ? BranchStatus.PhaseTwo_Committed : BranchStatus.PhaseTwo_CommitFailed_Retryable;
	} catch (Throwable t) {
		return BranchStatus.PhaseTwo_CommitFailed_Retryable;
	}
}
```
The above code shows that when executing the commit method of the branch transaction, it first checks if the `useTCCFence` property is `true`. If it is `true`, it follows the `commitFence` logic in the `TCCFenceHandler` class; otherwise, it follows the normal commit logic.

The `commitFence` method in the `TCCFenceHandler` class calls the `commitFence` method of the same class. The code is as follows:

```Java
public static boolean commitFence(Method commitMethod, Object targetTCCBean,
								  String xid, Long branchId, Object[] args) {
	return transactionTemplate.execute(status -> {
		try {
			Connection conn = DataSourceUtils.getConnection(dataSource);
			TCCFenceDO tccFenceDO = TCC_FENCE_DAO.queryTCCFenceDO(conn, xid, branchId);
			if (tccFenceDO == null) {
				throw new TCCFenceException(String.format("TCC fence record not exists, commit fence method failed. xid= %s, branchId= %s", xid, branchId),
						FrameworkErrorCode.RecordAlreadyExists);
			}
			if (TCCFenceConstant.STATUS_COMMITTED == tccFenceDO.getStatus()) {
				LOGGER.info("Branch transaction has already committed before. idempotency rejected. xid: {}, branchId: {}, status: {}", xid, branchId, tccFenceDO.getStatus());
				return true;
			}
			if (TCCFenceConstant.STATUS_ROLLBACKED == tccFenceDO.getStatus() || TCCFenceConstant.STATUS_SUSPENDED == tccFenceDO.getStatus()) {
				if (LOGGER.isWarnEnabled()) {
					LOGGER.warn("Branch transaction status is unexpected. xid: {}, branchId: {}, status: {}", xid, branchId, tccFenceDO.getStatus());
				}
				return false;
			}
			return updateStatusAndInvokeTargetMethod(conn, commitMethod, targetTCCBean, xid, branchId, TCCFenceConstant.STATUS_COMMITTED, status, args);
		} catch (Throwable t) {
			status.setRollbackOnly();
			throw new SkipCallbackWrapperException(t);
		}
	});
}
```
From the code, we can see that when committing the transaction, it first checks if there is a record in the `tcc_fence_log` table. If a record exists, it checks the transaction execution status and returns. This ensures idempotence by avoiding duplicate commits if the transaction status is already `STATUS_COMMITTED`. If there is no record in the `tcc_fence_log` table, a new record is inserted for later retry detection.

The rollback logic is similar to the commit logic and is implemented in the `rollbackFence` method of the `TCCFenceHandler` class.

### 4.2 Empty Rollback

In the scenario shown in the following diagram, the account service consists of a cluster of two nodes. During the try phase, the account service on Node 1 encounters a failure. Without considering retries, the global transaction must reach the end state, requiring a cancel operation to be performed on the account service.

![fence-empty-rollback](/img/blog/fence-empty-rollback.png)

Seata's solution is to insert a record into the `tcc_fence_log` table during the try phase, with the `status` field set to `STATUS_TRIED`. During the rollback phase, it checks if the record exists, and if it doesn't, the rollback operation is not executed. The code is as follows:

```Java
//TCCFenceHandler 
public static Object prepareFence(String xid, Long branchId, String actionName, Callback<Object> targetCallback) {
	return transactionTemplate.execute(status -> {
		try {
			Connection conn = DataSourceUtils.getConnection(dataSource);
			boolean result = insertTCCFenceLog(conn, xid, branchId, actionName, TCCFenceConstant.STATUS_TRIED);
			LOGGER.info("TCC fence prepare result: {}. xid: {}, branchId: {}", result, xid, branchId);
			if (result) {
				return targetCallback.execute();
			} else {
				throw new TCCFenceException(String.format("Insert tcc fence record error, prepare fence failed. xid= %s, branchId= %s", xid, branchId),
						FrameworkErrorCode.InsertRecordError);
			}
		} catch (TCCFenceException e) {
		} catch (Throwable t) {
		}
	});
}
```
The processing logic in the Rollback phase is as follows:

```Java
//TCCFenceHandler 
public static boolean rollbackFence(Method rollbackMethod, Object targetTCCBean,
									String xid, Long branchId, Object[] args, String actionName) {
	return transactionTemplate.execute(status -> {
		try {
			Connection conn = DataSourceUtils.getConnection(dataSource);
			TCCFenceDO tccFenceDO = TCC_FENCE_DAO.queryTCCFenceDO(conn, xid, branchId);
			// non_rollback
			if (tccFenceDO == null) {
				//The rollback logic is not executed
				return true;
			} else {
				if (TCCFenceConstant.STATUS_ROLLBACKED == tccFenceDO.getStatus() || TCCFenceConstant.STATUS_SUSPENDED == tccFenceDO.getStatus()) {
					LOGGER.info("Branch transaction had already rollbacked before, idempotency rejected. xid: {}, branchId: {}, status: {}", xid, branchId, tccFenceDO.getStatus());
					return true;
				}
				if (TCCFenceConstant.STATUS_COMMITTED == tccFenceDO.getStatus()) {
					if (LOGGER.isWarnEnabled()) {
						LOGGER.warn("Branch transaction status is unexpected. xid: {}, branchId: {}, status: {}", xid, branchId, tccFenceDO.getStatus());
					}
					return false;
				}
			}
			return updateStatusAndInvokeTargetMethod(conn, rollbackMethod, targetTCCBean, xid, branchId, TCCFenceConstant.STATUS_ROLLBACKED, status, args);
		} catch (Throwable t) {
			status.setRollbackOnly();
			throw new SkipCallbackWrapperException(t);
		}
	});
}
```
updateStatusAndInvokeTargetMethod method executes the following SQL:

```sql
update tcc_fence_log set status = ?, gmt_modified = ?
    where xid = ? and  branch_id = ? and status = ? ;
```
As we can see, it updates the value of the status field in the tcc_fence_log table from STATUS_TRIED to STATUS_ROLLBACKED. If the update is successful, the rollback logic is executed.

### 4.3 Hanging
Hanging refers to a situation where, due to network issues, the RM did not receive the try instruction initially, but after executing the rollback, the RM receives the try instruction and successfully reserves resources. This leads to the inability to release the reserved resources, as shown in the following diagram:

![fence-suspend](/img/blog/fence-suspend.png)

Seata solves this problem by checking if there is a record for the current xid in the tcc_fence_log table before executing the rollback method. If there is no record, it inserts a new record into the tcc_fence_log table with the status STATUS_SUSPENDED and does not perform the rollback operation. The code is as follows:

```Java
public static boolean rollbackFence(Method rollbackMethod, Object targetTCCBean,
									String xid, Long branchId, Object[] args, String actionName) {
	return transactionTemplate.execute(status -> {
		try {
			Connection conn = DataSourceUtils.getConnection(dataSource);
			TCCFenceDO tccFenceDO = TCC_FENCE_DAO.queryTCCFenceDO(conn, xid, branchId);
			// non_rollback
			if (tccFenceDO == null) {
				boolean result = insertTCCFenceLog(conn, xid, branchId, actionName, TCCFenceConstant.STATUS_SUSPENDED);
				return true;
			} else {
			}
			return updateStatusAndInvokeTargetMethod(conn, rollbackMethod, targetTCCBean, xid, branchId, TCCFenceConstant.STATUS_ROLLBACKED, status, args);
		} catch (Throwable t) {
		}
	});
}
```
When executing the try phase method, a record for the current xid is first inserted into the tcc_fence_log table, which causes a primary key conflict. The code is as follows:
```Java
//TCCFenceHandler 
public static Object prepareFence(String xid, Long branchId, String actionName, Callback<Object> targetCallback) {
	return transactionTemplate.execute(status -> {
		try {
			Connection conn = DataSourceUtils.getConnection(dataSource);
			boolean result = insertTCCFenceLog(conn, xid, branchId, actionName, TCCFenceConstant.STATUS_TRIED);
		} catch (TCCFenceException e) {
			if (e.getErrcode() == FrameworkErrorCode.DuplicateKeyException) {
				LOGGER.error("Branch transaction has already rollbacked before,prepare fence failed. xid= {},branchId = {}", xid, branchId);
				addToLogCleanQueue(xid, branchId);
			}
			status.setRollbackOnly();
			throw new SkipCallbackWrapperException(e);
		} catch (Throwable t) {
		}
	});
}
```
Note: The queryTCCFenceDO method in the SQL statement uses for update, so there is no need to worry about not being able to determine the execution result of the local transaction in the rollback method due to the inability to obtain records from the tcc_fence_log table.

### 5 Summary
TCC mode is a very important transaction mode in distributed transactions. However, idempotence, hanging, and empty rollback have always been issues that need to be considered in TCC mode. The Seata framework perfectly solves these problems in version 1.5.1.
The operations on the tcc_fence_log table also need to consider transaction control. Seata uses a proxy data source to execute the operations on the tcc_fence_log table and the RM business operations in the same local transaction. This ensures that the local operations and the operations on the tcc_fence_log table succeed or fail together.

