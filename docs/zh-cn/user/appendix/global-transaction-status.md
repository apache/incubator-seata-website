---
title: 事务状态
keywords: 事务状态
description: 全局事务状态、分支事务状态
---

#全局事务状态表

| 状态                                              | 代码 | 备注                                         |
| ------------------------------------------------- | ---- | -------------------------------------------- |
| 全局事务开始（Begin）                             | 1    | 此状态可以接受新的分支事务注册               |
| 全局事务提交中（Committing）                      | 2    | 这个状态会随时改变                           |
| 全局事务提交重试（CommitRetry）                   | 3    | 在提交异常被解决后尝试重试提交               |
| 全局事务回滚中（Rollbacking）                     | 4    | 正在重新回滚全局事务                         |
| 全局事务回滚重试中（RollbackRetrying）            | 5    | 在全局回滚异常被解决后尝试事务重试回滚中     |
| 全局事务超时回滚中（TimeoutRollbacking）          | 6    | 全局事务超时回滚中                           |
| 全局事务超时回滚重试中（TimeoutRollbackRetrying） | 7    | 全局事务超时回滚重试中                       |
| 异步提交中（AsyncCommitting）                     | 8    | 异步提交中                                   |
| 二阶段已提交（Committed）                         | 9    | 二阶段已提交，此状态后全局事务状态不会再改变 |
| 二阶段提交失败（CommitFailed）                    | 10   | 二阶段提交失败                               |
| 二阶段决议全局回滚（Rollbacked）                  | 11   | 二阶段决议全局回滚                           |
| 二阶段全局回滚失败（RollbackFailed）              | 12   | 二阶段全局回滚失败                           |
| 二阶段超时回滚（TimeoutRollbacked）               | 13   | 二阶段超时回滚                               |
| 二阶段超时回滚失败（TimeoutRollbackFailed）       | 14   | 二阶段超时回滚失败                           |
| 全局事务结束（Finished）                          | 15   | 全局事务结束                                 |
| 未知状态（UnKnown）                               | 0    | 未知状态                                     |

# 分支事务状态表
| 状态                                                         | 代码 | 备注                         |
| ------------------------------------------------------------ | ---- | ---------------------------- |
| 分支事务注册（Registered）                                   | 1    | 向TC注册分支事务             |
| 分支事务一阶段完成（PhaseOne_Done）                          | 2    | 分支事务一阶段业务逻辑完成   |
| 分支事务一阶段失败（PhaseOne_Failed）                        | 3    | 分支事务一阶段业务逻辑失败   |
| 分支事务一阶段超时（PhaseOne_Timeout）                       | 4    | 分支事务一阶段处理超时       |
| 分支事务二阶段已提交（PhaseTwo_Committed）                   | 5    | 分支事务二阶段提交           |
| 分支事务二阶段提交失败重试（PhaseTwo_CommitFailed_Retryable） | 6    | 分支事务二阶段提交失败重试   |
| 分支事务二阶段提交失败不重试（PhaseTwo_CommitFailed_Unretryable） | 7    | 分支事务二阶段提交失败不重试 |
| 分支事务二阶段已回滚（PhaseTwo_Rollbacked）                  | 8    | 分支事务二阶段已回滚         |
| 分支事务二阶段回滚失败重试（PhaseTwo_RollbackFailed_Retryable） | 9    | 分支事务二阶段回滚失败重试   |
| 分支事务二阶段回滚失败不重试（PhaseTwo_RollbackFailed_Unretryable） | 10   | 二阶段提交失败               |
| 未知状态（UnKnown）                                          | 0    | 未知状态                     |


