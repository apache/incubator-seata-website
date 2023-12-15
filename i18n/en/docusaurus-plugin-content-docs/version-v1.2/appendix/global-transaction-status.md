---
title: Global Transaction Status
keywords: [Seata, Transaction Status]
description: Global Transaction Status, Branch Transaction Status
---


# Global Transaction Status Table
Taking the db mode as an example, global_table is the global transaction table of Seata. You can determine which state the global transaction is in by observing the status field in the global_table.


| Status                                          | Code | Remark                                                |
| ------------------------------------------------ | ---- | ----------------------------------------------------- |
| Global transaction begins (Begin)                | 1    | This status can accept new branch transaction registration |
| Global transaction committing (Committing)              | 2    | This status can change at any time                    |
| Global transaction commit retry (CommitRetry)          | 3    | Retry commit after resolving commit exceptions        |
| Global transaction rolling back (Rollbacking)          | 4    | Rolling back global transaction in progress           |
| Global transaction rollback retrying (RollbackRetry)     | 5    | Retry transaction rollback after resolving global rollback exceptions |
| Global transaction timeout rollbacking (TimoutRollbacking)  | 6    | <a href="#TimeoutRollbacking_description" target="_self">Global transaction timeout rollbacking</a> |
| Global transaction timeout rollback retrying (TimeoutRollbackRetrying)    | 7    | Global transaction timeout rollback retrying           |
| Asynchronous committing (AsyncCommitting)                | 8    | Asynchronous commit                                    |
| Two-phase committed (Committed)                            | 9    | Two-phase committed, the global transaction status will not change after this state |
| Two-phase commit failed (CommitFailed)               | 10   | Two-phase commit failed                               |
| Two-phase global rollback (Rollbacked)                | 11   | Two-phase global rollback                              |
| Two-phase global rollback failed (RollbackFailed)                | 12   | Two-phase global rollback failed                       |
| Two-phase timeout rollback (TimeoutRollbacked)            | 13   | Two-phase timeout rollback                             |
| Two-phase timeout rollback failed (TimeoutRollbackFailed)               | 14   | Two-phase timeout rollback failed                       |
| Global transaction finished (Finished)             | 15   | Global transaction finished                            |
| Two-phase commit retry timeout (CommitRetryTimeout)         | 16   | Two-phase commit failed due to exceeding retry time limit |
| Two-phase rollback retry timeout (RollbackRetryTimeout)       | 17   | Two-phase rollback failed due to exceeding retry time limit |
| Unknown status                                   | 0    | Unknown status                                         |


# Branch Transaction Status Table
| Status                                                                | Code | Note                         |
| ------------------------------------------------------------------- | ---- | ---------------------------- |
| Branch Transaction Registered                                        | 1    | Register branch transaction with TC (Registered)     |
| Branch Transaction Phase One Done (PhaseOne_Done)              | 2    | Branch transaction phase one business logic completed   |
| Branch Transaction Phase One Failed (PhaseOne_Failed)              | 3    | Branch transaction phase one business logic failed   |
| Branch Transaction Phase One Timeout (PhaseOne_Timeout)         | 4    | Branch transaction phase one processing timed out       |
| Branch Transaction Phase Two Committed (PhaseTwo_Committed)                  | 5    | Branch transaction phase two committed           |
| Branch Transaction Phase Two Commit Failed Retryable (PhaseTwo_CommitFailed_Retryable)               | 6    | Branch transaction phase two commit failed and retriable   |
| Branch Transaction Phase Two Commit Failed Unretryable (PhaseTwo_CommitFailed_Unretryable)      | 7    | Branch transaction phase two commit failed and not retriable |
| Branch Transaction Phase Two Rolled Back (PhaseTwo_Rollbacked)          | 8    | Branch transaction phase two rolled back         |
| Branch Transaction Phase Two Rollback Failed Retryable (PhaseTwo_RollbackFailed_Retryable)             | 9    | Branch transaction phase two rollback failed and retriable   |
| Branch Transaction Phase Two Rollback Failed Unretryable (PhaseTwo_RollbackFailed_Unretryable)           | 10   | Branch transaction phase two rollback failed and not retriable |
| Unknown Status                                                        | 0    | Unknown status                     |



For better understanding, below are additional descriptions for individual states:


<h3 id='TimeoutRollbacking_description'> Global Transaction Timeout Rollbacking (TimeoutRollbacking) </h3>
  How does it occur?

  1. When a seata global transaction is unable to complete business logic during execution.
  2. A scheduled task in TC (specifically used to find timed out global transactions) discovers that the global transaction has not completed rollback, it will change this global transaction to **Global Transaction Timeout Rollbacking (TimeoutRollbacking)** and start rollback, until the global_table data is deleted after rollback is completed.

  Recommendation: When you find a global transaction in this state, investigate why the business cannot complete within the specified time. If it is indeed unable to complete, the global transaction timeout should be extended. (If everything is normal, please check if the tc cluster's time zone is consistent with the database. If not, please make it consistent).
