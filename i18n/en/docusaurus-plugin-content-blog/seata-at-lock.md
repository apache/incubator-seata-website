---
title: In-Depth Analysis of Seata AT Mode Transaction Isolation Levels and Global Lock Design
author: chenghui.zhang
keywords: [Seata, distributed transaction, AT mode, Transaction, GlobalLock]
description: The transaction isolation in Seata AT mode is built on the basis of local isolation levels of supporting transactions. Assuming a database local isolation level of Read Committed or higher, Seata designs a global write-exclusive lock maintained by the transaction coordinator to ensure write isolation between transactions. Meanwhile, the default isolation level for global transactions is defined at Read Uncommitted.
date: 2022/01/12
---

# Preface

Seata AT mode is a non-intrusive distributed transaction solution. Seata internally implements a proxy layer for database operations. When using Seata AT mode, we actually use the built-in data source proxy DataSourceProxy provided by Seata. Seata adds a lot of logic in this proxy layer, such as inserting rollback undo_log records and checking global locks.

Why check global locks? This is because the transaction isolation of Seata AT mode is based on the local isolation level of supporting transactions. Under the premise of database local isolation level of read committed or above, Seata designs a global write exclusive lock maintained by the transaction coordinator to ensure write isolation between transactions. At the same time, global transactions are by default defined at the read uncommitted isolation level.

# Understanding Seata Transaction Isolation Levels

Before discussing Seata transaction isolation levels, let's review the isolation levels of database transactions. Currently, there are four types of database transaction isolation levels, from lowest to highest:

1. Read uncommitted
2. Read committed
3. Repeatable read
4. Serializable

The default isolation level for databases is usually read committed, such as Oracle, while some databases default to repeatable read, such as MySQL. Generally, the read committed isolation level of databases can satisfy the majority of business scenarios.

We know that a Seata transaction is a global transaction, which includes several local transaction branches. During the execution of a global transaction (before the global transaction is completed), if a local transaction commits and Seata does not take any measures, it may lead to reading of committed local transactions, causing dirty reads. If a local transaction that has been committed before the global transaction commits is modified, it may cause dirty writes.

From this, we can see that traditional dirty reads involve reading uncommitted data, while Seata's dirty reads involve reading data that has not been committed under the global transaction, where the global transaction may include multiple local transactions. The fact that one local transaction commits does not mean that the global transaction commits.

Working under the read committed isolation level is fine for the vast majority of applications. In fact, the majority of scenarios that work under the read uncommitted isolation level also work fine.

In extreme scenarios, if an application needs to achieve global read committed, Seata also provides a global lock mechanism to implement global transaction read committed. However, by default, Seata's global transactions work under the read uncommitted isolation level to ensure efficiency in the majority of scenarios.

# Implementation of Global Locks

In AT mode, Seata uses the internal data source proxy DataSourceProxy, and the implementation of global locks is hidden within this proxy. Let's see what happens during the execution and submission processes.

## 1. Execution Process

The execution process is in the StatementProxy class. During execution, if the executed SQL is `select for update`, the SelectForUpdateExecutor class is used. If the executed method is annotated with `@GlobalTransactional` or `@GlobalLock`, it checks if there is a global lock. If a global lock exists, it rolls back the local transaction and continuously competes to obtain local and global locks through a while loop.


io.seata.rm.datasource.exec.SelectForUpdateExecutor#doExecute

```java
public T doExecute(Object... args) throws Throwable {
    Connection conn = statementProxy.getConnection();
    // ... ...
    try {
        // ... ...
        while (true) {
            try {
                // ... ...
                if (RootContext.inGlobalTransaction() || RootContext.requireGlobalLock()) {
                    // Do the same thing under either @GlobalTransactional or @GlobalLock, 
                    // that only check the global lock  here.
                    statementProxy.getConnectionProxy().checkLock(lockKeys);
                } else {
                    throw new RuntimeException("Unknown situation!");
                }
                break;
            } catch (LockConflictException lce) {
                if (sp != null) {
                    conn.rollback(sp);
                } else {
                    conn.rollback();
                }
                // trigger retry
                lockRetryController.sleep(lce);
            }
        }
    } finally {
        // ...
    }
```

## 2. Submission Process

The submission process occurs in the doCommit method of ConnectionProxy.

1) If the executed method is annotated with `@GlobalTransactional`, it will acquire the global lock during branch registration:

- Requesting TC to register a branch

io.seata.rm.datasource.ConnectionProxy#register

```java
private void register() throws TransactionException {
    if (!context.hasUndoLog() || !context.hasLockKey()) {
        return;
    }
    Long branchId = DefaultResourceManager.get().branchRegister(BranchType.AT, getDataSourceProxy().getResourceId(),
                                                                null, context.getXid(), null, context.buildLockKeys());
    context.setBranchId(branchId);
}
```

- When a TC registers a branch, it obtains a global lock

io.seata.server.transaction.at.ATCore#branchSessionLock

```java
protected void branchSessionLock(GlobalSession globalSession, BranchSession branchSession) throws TransactionException {
    if (!branchSession.lock()) {
        throw new BranchTransactionException(LockKeyConflict, String
                                             .format("Global lock acquire failed xid = %s branchId = %s", globalSession.getXid(),
                                                     branchSession.getBranchId()));
    }
}
```

2）If the execution method has a '@GlobalLock' annotation, the global lock is checked for existence before committing, and if it does, an exception is thrown:

io.seata.rm.datasource.ConnectionProxy#processLocalCommitWithGlobalLocks

```java
private void processLocalCommitWithGlobalLocks() throws SQLException {
    checkLock(context.buildLockKeys());
    try {
        targetConnection.commit();
    } catch (Throwable ex) {
        throw new SQLException(ex);
    }
    context.reset();
}
```

## GlobalLock Annotation Explanation

From the execution process and submission process, it can be seen that since opening a global transaction with the `@GlobalTransactional` annotation can check if the global lock exists before transaction submission, why does Seata still provide a `@GlobalLock` annotation?

This is because not all database operations require opening a global transaction, and opening a global transaction is a relatively heavy operation that involves initiating RPC processes to TC. The `@GlobalLock` annotation only checks the existence of the global lock during the execution process and does not initiate a global transaction. Therefore, when there is no need for a global transaction but the global lock needs to be checked to avoid dirty reads and writes, using the `@GlobalLock` annotation is a lighter operation.

# How to Prevent Dirty Writes

Let's first understand how dirty writes occur when using Seata AT mode:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20211226164628.png)

*Note: Other processes in the branch transaction execution are omitted.*

When Business One starts a global transaction containing branch transaction A (modifying A) and branch transaction B (modifying B), Business Two modifies A. Business One's branch transaction A obtains a local lock before Business Two, waiting for Business One to complete the execution of branch transaction A. Business Two then obtains the local lock, modifies A, and commits it to the database. However, Business One encounters an exception during the execution of branch transaction A. Since the data of branch transaction A has been modified by Business Two, Business One's global transaction cannot be rolled back.

How to prevent dirty writes?

1. Business Two uses `@GlobalTransactional` annotation:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20211226210337.png)

*Note: Other processes in the branch transaction execution are omitted.*

During the execution of the global transaction by Business Two, when registering the branch transaction before the submission of branch transaction A and acquiring the global lock, it finds that Business One's global lock has not been released yet. Therefore, Business Two cannot commit and throws an exception to roll back, thus preventing dirty writes.

2. Business Two uses `@GlobalLock` annotation:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20211226210502.png)

*Note: Other processes in the branch transaction execution are omitted.*

Similar to the effect of `@GlobalTransactional` annotation, but without the need to open a global transaction, it only checks the existence of the global lock before local transaction submission.

3. Business Two uses `@GlobalLock` annotation + `select for update` statement:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20211226172358.png)

If a `select for update` statement is added, it checks the existence of the global lock before the update operation. Business Two can only execute the updateA operation after the global lock is released.

If only `@Transactional` is used, there is a possibility of dirty writes. The fundamental reason is that without the GlobalLock annotation, the global lock is not checked, which may lead to another global transaction finding that a branch transaction has been modified when rolling back. Therefore, adding `select for update` also has a benefit, which is that it allows for retries.


# How to Prevent Dirty Reads

Dirty reads in Seata AT mode refer to the scenario where data from a branch transaction that has been committed is read by another business before the global transaction is committed. Essentially, this is because Seata's default global transaction isolation level is read uncommitted.

So how to prevent dirty reads?

Business Two queries A with `@GlobalLock` annotation + `select for update` statement:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20211226210633.png)

Adding the `select for update` statement checks the existence of the global lock before executing the SQL. The SQL can only be executed after the global lock is acquired, thus preventing dirty reads.

# Author Bio:

Zhang Chenghui currently works at Ant Group and is passionate about sharing technology. He is the author of the WeChat public account "后端进阶" (Backend Advancement) and the owner of the technical blog (https://objcoding.com/). He is also a Seata Contributor with GitHub ID: objcoding.
