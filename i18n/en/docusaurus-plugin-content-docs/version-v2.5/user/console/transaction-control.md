---
title: Transaction Control and Global Lock
keywords: [console, transaction, lock]
description: The Seata console provides manual control for 4 types of distributed transactions and control over global locks in AT mode.
---
The Seata console provides manual control for 4 types of distributed transactions and control over global locks in AT mode. The specific implementation principle is to allow manual transaction changes for transactions in different statuses based on the distributed transaction status machine. This is achieved by changing the status of distributed transactions in storage (supporting all Seata Server storage modes: file, db, redis, and raft) to trigger the process of the next status. The currently supported features include:

**Global Transaction Operations:**

+ Delete Global Transaction: Allows deleting data stored on the server for global transactions that have reached a final status.
+ Force Delete Global Transaction: Skips transaction status checks and directly deletes global transaction data stored on the server.
+ Stop Global Transaction: Stops global transactions that are in the process of committing or rollbacking.
+ Retry Global Transaction: Restarts retrying stopped global transactions.
+ Commit or Rollback Global Transaction: Attempts to commit or rollback transactions that are in the process of committing, rolling back, or stopped.
+ Change Global Transaction Status: Re-attempts to commit or rollback transactions that failed to commit or roll back.

**Branch Transaction Operations:**

+ Delete Branch Transaction: Allows deleting data stored on the server for branch transactions that have reached a final status.
+ Force Delete Branch Transaction: Skips transaction status checks and directly deletes branch transaction data stored on the server.
+ Start/Stop Branch Transaction: Stops branch transactions that are in the process of committing or rollingback, or restarts stopped branch transactions.

**Global Lock Operations:**

+ Delete Global Lock: Deletes global lock records.

# Background Knowledge
To better use the transaction and global lock features, the following provides a brief explanation of global transaction statuses, branch transaction statuses, global locks, and Seata Server storage modes. If you want to get started quickly, you can directly refer to the feature description section below.

## Global Transactions
+ Unknown: The status of the global transaction is unclear, usually before the global transaction starts.
+ Begin: The global transaction has just started, and branch transactions may or may not be executing.
+ Committing: The second phase is committing (after all branch transactions are completed, the TM initiates a global commit to the TC).
+ CommitRetrying: The commit of branch transactions returns a status other than `PhaseTwo_Committed` or `PhaseTwo_CommitFailed_Unretryable`, or an exception occurs during the branch transaction commit. This status indicates a retry due to recoverable failure.
+ Rollbacking: The second phase is rolling back (the TM initiates a global rollback, and the TC changes the status after receiving it).
+ TimeoutRollbacking: A scheduled task detects that the global transaction has timed out and sets the status to rollback. If an exception occurs or the branch status is not `PhaseTwo_Rollbacked` or `PhaseTwo_RollbackFailed_Unretryable` (e.g., XA branch retry status or `PhaseTwo_RollbackFailed_Retryable`), the following statuses may be set:
  - TimeoutRollbackRetrying: Rollback failed, and the global transaction timed out (usually detected by a scheduled task).
  - RollbackRetrying: Rollback failed, but the global transaction has not timed out.
+ AsyncCommitting: If asynchronous commit is possible during the commit phase, the TC performs an asynchronous commit (specific to AT mode).
+ Committed: Final status, successfully committed.
+ CommitFailed: Final status, set when the branch transaction commit returns `PhaseTwo_CommitFailed_Unretryable`.
+ Rollbacked: Final status, successfully rollback.
+ TimeoutRollbacked: Final status, all branch transactions have been successfully rolled back, but the global transaction was later found to have timed out.
+ RollbackFailed: Final status, set when the branch transaction rollback returns `PhaseTwo_RollbackFailed_Unretryable` or the scheduled task retry rollback times out (exceeding `MAX_ROLLBACK_RETRY_TIMEOUT`).
+ TimeoutRollbackFailed: Final status, set when the branch transaction rollback returns `PhaseTwo_RollbackFailed_Unretryable` and the global transaction timed out.
+ Finished: Final status, marks non-existent or unclear transactions. In Saga mode, this status is persisted when a branch transaction returns `PhaseOne_Failed`.
+ CommitRetryTimeout: Final status, retrying commit timed out.
+ RollbackRetryTimeout: Final status, retrying rollback timed out.
+ Deleting: The transaction is being deleted.
+ StopCommitOrCommitRetry: Stops transaction commit or commit retry.
+ StopRollbackOrRollbackRetry: Stops transaction rollback or rollback retry.

## Branch Transactions
+ Unknown: The status of the branch transaction is unclear.
+ Registered: The branch is registered with the TC.
+ PhaseOne_Done: Set when the branch transaction commits.
+ PhaseOne_Failed: Set when the branch transaction rolls back.
+ PhaseOne_Timeout: Not used.
+ PhaseTwo_Committed: The TC sends a branch transaction commit, and the RM returns this status after a successful commit (not persisted, directly removed).
+ PhaseTwo_CommitFailed_Retryable: The TC sends a branch transaction commit, and the RM returns this status after a failed commit.
+ PhaseTwo_CommitFailed_Unretryable: The TC sends a branch transaction commit, and the RM returns this status when an exception occurs during the branch transaction commit.
+ PhaseTwo_Rollbacked: The TC sends a branch transaction rollback, and the RM returns this status after a successful rollback (not persisted, directly removed).
+ PhaseTwo_RollbackFailed_Retryable: The TC sends a branch transaction rollback, and the RM returns this status after a failed rollback.
+ PhaseTwo_RollbackFailed_Unretryable: The TC sends a branch transaction rollback, and the RM returns this status when an exception occurs during the branch transaction rollback.
+ PhaseTwo_CommitFailed_XAER_NOTA_Retryable: Retryable failure during XA commit.
+ PhaseTwo_RollbackFailed_XAER_NOTA_Retryable: Retryable failure during XA rollback.
+ PhaseOne_RONLU: In Oracle databases, after executing branch preparation, only pure read-only queries are executed.
+ STOP_RETRY: Stops retrying.

## Global Lock
Global locks are specific to AT mode. Releasing locks abnormally may result in dirty writes.

## Storage Modes
Seata Server supports the following storage modes:

- **File Mode**: Suitable for small projects or test environments. Data is stored in local files, with relatively low performance and reliability.
- **DB Mode**: Suitable for production environments. Data is stored in databases (e.g., MySQL, Oracle), offering high performance and reliability but requiring additional database maintenance.
- **Redis Mode**: Suitable for scenarios with high performance requirements and existing Redis usage. Data is stored in Redis, offering high read/write speed but potentially increasing Redis load.
- **Raft Mode**: Encapsulates the non-highly available file mode and uses the Raft algorithm to synchronize data between multiple TCs.

When performing operations on transactions and global locks through the console, the storage status in the database may change. You can view the corresponding storage mode for details.

# Feature Description
## Global Transaction Operations
To avoid errors when manually changing the status of global transactions, transaction status checks are often performed before operations. Based on the global transaction background knowledge, the statuses are categorized as follows, and transaction status checks often involve validation of the following status categories:

### Transaction Status Categories
#### Retry Operation Statuses

1. **Commit Retry Set**
   `RETRY_COMMIT_STATUS`: CommitRetrying
2. **Rollback Retry Set**
   `RETRY_ROLLBACK_STATUS`: RollbackRetrying, TimeoutRollbackRetrying, TimeoutRollbacking
3. **Comprehensive Retry Set**
   `RETRY_STATUS`: CommitRetrying, RollbackRetrying, TimeoutRollbackRetrying, TimeoutRollbacking

---

#### In-Progress Operation Statuses

1. **Committing Set**
   `COMMIT_ING_STATUS`: Committing, CommitRetrying
2. **Rollbacking Set**
   `ROLLBACK_ING_STATUS`: Rollbacking, RollbackRetrying, TimeoutRollbackRetrying, TimeoutRollbacking

---

#### Failure Termination Statuses

1. **Commit Failure Set**
   `FAIL_COMMIT_STATUS`: CommitFailed, CommitRetryTimeout
2. **Rollback Failure Set**
   `FAIL_ROLLBACK_STATUS`: TimeoutRollbacked, RollbackFailed, RollbackRetryTimeout
3. **Comprehensive Failure Set**
   `FAIL_STATUS`: CommitFailed, CommitRetryTimeout, TimeoutRollbacked, RollbackFailed, RollbackRetryTimeout

---

#### Completion Termination Statuses

`FINISH_STATUS`: Committed, Finished, Rollbacked

### Delete Global Transaction
Before deleting a global transaction, the current transaction status is validated. Only transactions in the statuses `FAIL_COMMIT_STATUS`, `FAIL_ROLLBACK_STATUS`, `RETRY_COMMIT_STATUS`, `RETRY_ROLLBACK_STATUS`, `Committed`, `Finished`, `Rollbacked`, `Deleting`, `StopCommitRetry`, or `StopRollbackRetry` are allowed to be deleted. When deletion starts, the global transaction is changed to the `Deleting` status. During deletion, branch transactions under the global transaction are retrieved. If the branch transaction failed in phase one, it is directly deleted; otherwise, different operations are performed based on the transaction mode:

+ AT Mode: Initiates a commit operation on the branch transaction to trigger undo log deletion and release the global lock.
+ TCC Mode: Initiates a rollback operation on the branch transaction.
+ SAGA Mode: No branch transaction concept, directly completes the operation.
+ XA Mode: Initiates a rollback operation on the branch transaction.

For more details, refer to the source code in `org.apache.seata.server.console.impl.AbstractGlobalService`.

![del-global-trx](/img/console/del-global-trx.png)

### Force Delete Global Transaction
Force deleting a global transaction may result in dirty writes. It only deletes the global transaction and its branch transaction sessions stored on the server.

![force-del-global-trx](/img/console/force-del-global-trx.png)

### Stop Global Transaction Retry
Before stopping a global transaction, the current transaction status is validated. Only transactions in the statuses `Committing`, `CommitRetrying`, `TimeoutRollbacking`, `TimeoutRollbackRetrying`, `RollbackRetrying`, or `Rollbacking` are allowed to be stopped. When stopped, the status is changed to `StopCommitOrCommitRetry` or `StopRollbackOrRollbackRetry`, depending on whether it is in a commit or rollback-related status, to prevent operations by the transaction compensation thread pool (branch transaction statuses are not directly modified).

![stop-global-trx](/img/console/stop-global-trx.png)

After stopping, a corresponding prompt appears.

![stop-global-trx-hint](/img/console/stop-global-trx-hint.png)

### Start Global Transaction Retry
Before starting a global transaction retry, the current transaction status is validated. Only transactions in the statuses `StopCommitOrCommitRetry` or `StopRollbackOrRollbackRetry` are allowed to be started. When started, the status is changed to `CommitRetrying` or `RollbackRetrying`, depending on whether it is in a stopped commit-related or rollback-related status, to trigger operations by the transaction compensation thread pool (branch transaction statuses are not directly modified).

![start-global-trx](/img/console/start-global-trx.png)

### Commit or Rollback Global Transaction
Before committing or rolling back a global transaction, the current transaction status is validated. Only transactions in the statuses `Committing`, `CommitRetrying`, `TimeoutRollbacking`, `TimeoutRollbackRetrying`, `RollbackRetrying`, `Rollbacking`, `StopCommitOrCommitRetry`, or `StopRollbackOrRollbackRetry` are allowed to be committed or rolled back.

If it is a commit-related status, a global commit is triggered (asynchronous commit in AT mode). If it is a rollback-related status, a global rollback is triggered.

![commit-or-rollback](/img/console/commit-or-rollback.png)

### Change Global Transaction Status
Before updating the global transaction status, the current transaction status is validated. Only transactions in the statuses `FAIL_COMMIT_STATUS` and `FAIL_ROLLBACK_STATUS` are allowed to update the global transaction status. If it is a commit-related status, a global commit is triggered. If it is a rollback-related status, a global rollback is triggered.

![update-global-trx](/img/console/update-global-trx.png)

## Branch Transaction Operations
The transaction console displays global transaction operations by default. To access branch transaction operations, click the button to switch to the relevant features.

![branch-trx](/img/console/branch-trx.png)

After switching, you can view branch transaction information on the operation page and click to view branch transaction details.

![branch-trx-detail](/img/console/branch-trx-detail.png)

### Delete Branch Transaction
Before deleting a branch transaction, the current transaction status is validated. Branch transactions can only be deleted if the global transaction status allows deletion. During deletion, the branch transaction status is retrieved, and the same operations are performed as when deleting a global transaction.

![del-branch-trx](/img/console/del-branch-trx.png)

### Force Delete Branch Transaction
Force deleting a branch transaction may result in dirty writes. It only deletes the branch transaction session stored on the server.

![force-del-branch-trx](/img/console/force-del-branch-trx.png)

### Stop Branch Transaction
Before stopping a branch transaction, the current transaction status is validated. If it is in Saga mode, an error is directly reported (as Saga mode has no branch transactions), and the following status checks are performed:

- The branch transaction is in `Unknown`, `Registered`, or `PhaseOne_Done`.
- The global transaction is in `RETRY_STATUS`, `Rollbacking`, `Committing`, `StopRollbackOrRollbackRetry`, or `StopCommitOrCommitRetry`.

After passing the checks, the transaction status can be changed to stopped.

![stop-branch-trx.png](/img/console/stop-branch-trx.png)

### Start Branch Transaction
The start branch transaction feature is only available when the branch transaction is stopped. After starting, the branch transaction status changes to `Registered`.

![start-branch-trx](/img/console/start-branch-trx.png)

## Global Lock Operations
Under a global transaction, you can view the global locks it holds. Only transactions in AT mode hold global locks.

![global-lock](/img/console/global-lock.png)

You can delete the global locks held by a transaction. Note that after deletion, the data corresponding to the global lock may experience dirty writes.

![del-global-lock](/img/console/del-global-lock.png)
