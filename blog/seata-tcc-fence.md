---
title: 阿里 Seata 新版本终于解决了 TCC 模式的幂等、悬挂和空回滚问题

author: 朱晋君

keywords: [Seata、TCC、幂等、悬挂、空回滚]

description: Seata 在 1.5.1 版本解决了 TCC 模式的幂等、悬挂和空回滚问题，这篇文章主要讲解 Seata 是怎么解决的。

date: 2022/06/25
---
今天来聊一聊阿里巴巴 Seata 新版本（1.5.1）是怎么解决 TCC 模式下的幂等、悬挂和空回滚问题的。

## 1 TCC 回顾

TCC 模式是最经典的分布式事务解决方案，它将分布式事务分为两个阶段来执行，try 阶段对每个分支事务进行预留资源，如果所有分支事务都预留资源成功，则进入 commit 阶段提交全局事务，如果有一个节点预留资源失败则进入 cancel 阶段回滚全局事务。

以传统的订单、库存、账户服务为例，在 try 阶段尝试预留资源，插入订单、扣减库存、扣减金额，这三个服务都是要提交本地事务的，这里可以把资源转入中间表。在 commit 阶段，再把 try 阶段预留的资源转入最终表。而在 cancel 阶段，把 try 阶段预留的资源进行释放，比如把账户金额返回给客户的账户。

**注意：try 阶段必须是要提交本地事务的，比如扣减订单金额，必须把钱从客户账户扣掉，如果不扣掉，在 commit 阶段客户账户钱不够了，就会出问题。**

### 1.1 try-commit

try 阶段首先进行预留资源，然后在 commit 阶段扣除资源。如下图：

![fence-try-commit](/img/blog/fence-try-commit.png)


### 1.2 try-cancel

try 阶段首先进行预留资源，预留资源时扣减库存失败导致全局事务回滚，在 cancel 阶段释放资源。如下图：

![fence-try-cancel](/img/blog/fence-try-cancel.png)


## 2 TCC 优势

TCC 模式最大的优势是效率高。TCC 模式在 try 阶段的锁定资源并不是真正意义上的锁定，而是真实提交了本地事务，将资源预留到中间态，并不需要阻塞等待，因此效率比其他模式要高。

同时 TCC 模式还可以进行如下优化：

### 2.1 异步提交

try 阶段成功后，不立即进入 confirm/cancel 阶段，而是认为全局事务已经结束了，启动定时任务来异步执行 confirm/cancel，扣减或释放资源，这样会有很大的性能提升。

### 2.2 同库模式

TCC 模式中有三个角色：

- TM：管理全局事务，包括开启全局事务，提交/回滚全局事务；
- RM：管理分支事务；
- TC: 管理全局事务和分支事务的状态。

下图来自 Seata 官网：

![fence-fiffrent-db](/img/blog/fence-fiffrent-db.png)

TM 开启全局事务时，RM 需要向 TC 发送注册消息，TC 保存分支事务的状态。TM 请求提交或回滚时，TC 需要向 RM 发送提交或回滚消息。这样包含两个个分支事务的分布式事务中，TC 和 RM 之间有四次 RPC。

优化后的流程如下图：

![fence-same-db](/img/blog/fence-same-db.png)


TC 保存全局事务的状态。TM 开启全局事务时，RM 不再需要向 TC 发送注册消息，而是把分支事务状态保存在了本地。TM 向 TC 发送提交或回滚消息后，RM 异步线程首先查出本地保存的未提交分支事务，然后向 TC 发送消息获取（本地分支事务）所在的全局事务状态，以决定是提交还是回滚本地事务。

这样优化后，RPC 次数减少了 50%，性能大幅提升。

## 3 RM 代码示例

以库存服务为例，RM 库存服务接口代码如下：
```Java
@LocalTCC
public interface StorageService {

    /**
     * 扣减库存
     * @param xid 全局xid
     * @param productId 产品id
     * @param count 数量
     * @return
     */
    @TwoPhaseBusinessAction(name = "storageApi", commitMethod = "commit", rollbackMethod = "rollback", useTCCFence = true)
    boolean decrease(String xid, Long productId, Integer count);

    /**
     * 提交事务
     * @param actionContext
     * @return
     */
    boolean commit(BusinessActionContext actionContext);

    /**
     * 回滚事务
     * @param actionContext
     * @return
     */
    boolean rollback(BusinessActionContext actionContext);
}
```

通过 @LocalTCC 这个注解，RM 初始化的时候会向 TC 注册一个分支事务。在 try 阶段的方法（decrease方法）上有一个 @TwoPhaseBusinessAction 注解，这里定义了分支事务的 resourceId，commit 方法和 cancel 方法，useTCCFence 这个属性下一节再讲。

## 4 TCC 存在问题

TCC 模式中存在的三大问题是幂等、悬挂和空回滚。在 Seata1.5.1 版本中，增加了一张事务控制表，表名是 tcc_fence_log 来解决这个问题。而在上一节 @TwoPhaseBusinessAction 注解中提到的属性 useTCCFence 就是来指定是否开启这个机制，这个属性值默认是 false。

tcc_fence_log 建表语句如下（MySQL 语法）：
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

### 4.1 幂等

在 commit/cancel 阶段，因为 TC 没有收到分支事务的响应，需要进行重试，这就要分支事务支持幂等。

我们看一下新版本是怎么解决的。下面的代码在 TCCResourceManager 类：
```Java
@Override
public BranchStatus branchCommit(BranchType branchType, String xid, long branchId, String resourceId,
								 String applicationData) throws TransactionException {
	TCCResource tccResource = (TCCResource)tccResourceCache.get(resourceId);
	//省略判断
	Object targetTCCBean = tccResource.getTargetBean();
	Method commitMethod = tccResource.getCommitMethod();
	//省略判断
	try {
		//BusinessActionContext
		BusinessActionContext businessActionContext = getBusinessActionContext(xid, branchId, resourceId,
			applicationData);
		Object[] args = this.getTwoPhaseCommitArgs(tccResource, businessActionContext);
		Object ret;
		boolean result;
		//注解 useTCCFence 属性是否设置为 true
		if (Boolean.TRUE.equals(businessActionContext.getActionContext(Constants.USE_TCC_FENCE))) {
			try {
				result = TCCFenceHandler.commitFence(commitMethod, targetTCCBean, xid, branchId, args);
			} catch (SkipCallbackWrapperException | UndeclaredThrowableException e) {
				throw e.getCause();
			}
		} else {
			//省略逻辑
		}
		LOGGER.info("TCC resource commit result : {}, xid: {}, branchId: {}, resourceId: {}", result, xid, branchId, resourceId);
		return result ? BranchStatus.PhaseTwo_Committed : BranchStatus.PhaseTwo_CommitFailed_Retryable;
	} catch (Throwable t) {
		//省略
		return BranchStatus.PhaseTwo_CommitFailed_Retryable;
	}
}
```
上面的代码可以看到，执行分支事务提交方法时，首先判断 useTCCFence 属性是否为 true，如果为 true，则走 TCCFenceHandler 类中的 commitFence 逻辑，否则走普通提交逻辑。

TCCFenceHandler 类中的 commitFence 方法调用了 TCCFenceHandler 类的 commitFence 方法，代码如下：
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

从代码中可以看到，提交事务时首先会判断 tcc_fence_log 表中是否已经有记录，如果有记录，则判断事务执行状态并返回。这样如果判断到事务的状态已经是 STATUS_COMMITTED，就不会再次提交，保证了幂等。如果 tcc_fence_log 表中没有记录，则插入一条记录，供后面重试时判断。

Rollback 的逻辑跟 commit 类似，逻辑在类 TCCFenceHandler 的 rollbackFence 方法。

### 4.2 空回滚

如下图，账户服务是两个节点的集群，在 try 阶段账户服务 1 这个节点发生了故障，try 阶段在不考虑重试的情况下，全局事务必须要走向结束状态，这样就需要在账户服务上执行一次 cancel 操作。

![fence-empty-rollback](/img/blog/fence-empty-rollback.png)


Seata 的解决方案是在 try 阶段 往 tcc_fence_log  表插入一条记录，status 字段值是 STATUS_TRIED，在 Rollback 阶段判断记录是否存在，如果不存在，则不执行回滚操作。代码如下：
```Java
//TCCFenceHandler 类
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
			//省略
		} catch (Throwable t) {
			//省略
		}
	});
}
```
在 Rollback 阶段的处理逻辑如下:
```Java
//TCCFenceHandler 类
public static boolean rollbackFence(Method rollbackMethod, Object targetTCCBean,
									String xid, Long branchId, Object[] args, String actionName) {
	return transactionTemplate.execute(status -> {
		try {
			Connection conn = DataSourceUtils.getConnection(dataSource);
			TCCFenceDO tccFenceDO = TCC_FENCE_DAO.queryTCCFenceDO(conn, xid, branchId);
			// non_rollback
			if (tccFenceDO == null) {
				//不执行回滚逻辑
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

updateStatusAndInvokeTargetMethod 方法执行的 sql 如下：
```sql
update tcc_fence_log set status = ?, gmt_modified = ?
    where xid = ? and  branch_id = ? and status = ? ;
```
可见就是把 tcc_fence_log 表记录的  status  字段值从 STATUS_TRIED 改为 STATUS_ROLLBACKED，如果更新成功，就执行回滚逻辑。

### 4.3 悬挂

悬挂是指因为网络问题，RM 开始没有收到 try 指令，但是执行了 Rollback 后 RM 又收到了 try 指令并且预留资源成功，这时全局事务已经结束，最终导致预留的资源不能释放。如下图：


![fence-suspend](/img/blog/fence-suspend.png)


Seata 解决这个问题的方法是执行 Rollback 方法时先判断 tcc_fence_log 是否存在当前 xid 的记录，如果没有则向 tcc_fence_log 表插入一条记录，状态是 STATUS_SUSPENDED，并且不再执行回滚操作。代码如下：
```Java
public static boolean rollbackFence(Method rollbackMethod, Object targetTCCBean,
									String xid, Long branchId, Object[] args, String actionName) {
	return transactionTemplate.execute(status -> {
		try {
			Connection conn = DataSourceUtils.getConnection(dataSource);
			TCCFenceDO tccFenceDO = TCC_FENCE_DAO.queryTCCFenceDO(conn, xid, branchId);
			// non_rollback
			if (tccFenceDO == null) {
			    //插入防悬挂记录
				boolean result = insertTCCFenceLog(conn, xid, branchId, actionName, TCCFenceConstant.STATUS_SUSPENDED);
				//省略逻辑
				return true;
			} else {
				//省略逻辑
			}
			return updateStatusAndInvokeTargetMethod(conn, rollbackMethod, targetTCCBean, xid, branchId, TCCFenceConstant.STATUS_ROLLBACKED, status, args);
		} catch (Throwable t) {
			//省略逻辑
		}
	});
}
```

而后面执行 try 阶段方法时首先会向 tcc_fence_log 表插入一条当前 xid 的记录，这样就造成了主键冲突。代码如下：
```Java
//TCCFenceHandler 类
public static Object prepareFence(String xid, Long branchId, String actionName, Callback<Object> targetCallback) {
	return transactionTemplate.execute(status -> {
		try {
			Connection conn = DataSourceUtils.getConnection(dataSource);
			boolean result = insertTCCFenceLog(conn, xid, branchId, actionName, TCCFenceConstant.STATUS_TRIED);
			//省略逻辑
		} catch (TCCFenceException e) {
			if (e.getErrcode() == FrameworkErrorCode.DuplicateKeyException) {
				LOGGER.error("Branch transaction has already rollbacked before,prepare fence failed. xid= {},branchId = {}", xid, branchId);
				addToLogCleanQueue(xid, branchId);
			}
			status.setRollbackOnly();
			throw new SkipCallbackWrapperException(e);
		} catch (Throwable t) {
			//省略
		}
	});
}
```

**注意：queryTCCFenceDO 方法 sql 中使用了 for update，这样就不用担心 Rollback 方法中获取不到 tcc_fence_log 表记录而无法判断 try 阶段本地事务的执行结果了。**

## 5 总结

TCC 模式是分布式事务中非常重要的事务模式，但是幂等、悬挂和空回滚一直是 TCC 模式需要考虑的问题，Seata 框架在 1.5.1 版本完美解决了这些问题。

对 tcc_fence_log 表的操作也需要考虑事务的控制，Seata 使用了代理数据源，使 tcc_fence_log 表操作和 RM 业务操作在同一个本地事务中执行，这样就能保证本地操作和对 tcc_fence_log 的操作同时成功或失败。


