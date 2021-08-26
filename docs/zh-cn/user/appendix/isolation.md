---
title: Seata事务隔离  
keywords: Seata事务隔离  
description: Seata事务隔离
---

# Seata事务隔离

> 本文目标：帮助用户明白使用Seata **AT模式**时，该如何正确实现事务隔离，防止脏读脏写。
> 
> **希望读者在阅读本文前，已阅读过seata官网中对AT模式的介绍，并且对数据库本地锁有所了解**
> 
> （例如，两个事务同时在对同一条记录做update时，只有拿到record lock的事务才能更新成功，另一个事务在record lock未释放前只能等待，直到事务超时）


```java
class YourBussinessService {

    @GlobalTransaction
    public boolean updateAll(DO do) {

        serviceA.update(do.getA());

        serviceB.update(do.getB());

    }


    @GlobalLock
    @Transactional
    public boolean updateA(DO do) {

        serviceA.selectForUpdate(do.getA());

        serviceA.update(do.getA());

    }

    @GlobalLock
    @Transactional
    public boolean queryA(DO do) {

        serviceA.selectForUpdate(do.getA());

    }

}

```

```java
class ServiceA {
    @Transactional
    public boolean update(A a) {
    
    }
}

```

```java
class ServiceB {
    @Transactional
    public boolean update(B b) {

    }
}
```
## **@GlobalLock作用 + select for update的作用**

如果像`updateA()`方法带有`@GlobalLock + select for update`，Seata在处理时，会先获取数据库本地锁，然后查询该记录是否有全局锁存在，若有，则抛出LockConflictException。



## **如何防止脏写？**

### 场景一： 某业务先调用`updateAll()`，`updateAll()`未执行完成，另一业务后调用`updateA()`


举例说明

- 情况1 
  
| 业务一                       | 业务二                                     |
| ---------------------------- | ------------------------------------------ |
| 调用 `updateAll()`           |                                            |
| 更新A，获得数据库A记录本地锁 | 调用 `updateA()`                           |
| 获得**A记录的全局锁**        | select for update 等待   A记录本地锁释放   |
| A记录 commit                 |                                            |
|                              | A记录本地锁获得成功                        |
|                              | 发现A有全局锁  抛出`LockConflictException` |
| 更新B，获得数据库B记录本地锁 |                                            |
| 获得**B记录的全局锁**        |                                            |
| B记录 commit                 |                                            |
| Global Commit，释放全局锁    |                                            |





### 场景二：  某业务先调用`updateA()`，`updateA()`未执行完成，另一业务后调用`updateAll()`
举例说明

- 情况1 
  
| 业务一                               | 业务二                                              |
| ------------------------------------ | --------------------------------------------------- |
| 某业务调用 `updateA()`               |                                                     |
| select A for update，获取A记录本地锁 | 某业务调用 `updateAll()`                            |
| 查询是否存在A全局锁                  | 由于业务一持有A记录本地锁，无法更新，等待获取本地锁 |
| 不存在A全局锁，更新A                 |                                                     |
| commit，释放A记录本地锁              |                                                     |
|                                      | 更新A，获得数据库A记录本地锁                        |
|                                      | ......                                              |


## **如何防止脏读？**

### 场景一：  某业务先调用`queryA()`，`queryA()`未执行完成，另一业务后调用`updateAll()`
- 情况1 
  
| 业务一                               | 业务二                                              |
| ------------------------------------ | --------------------------------------------------- |
| 某业务调用 `queryA()`                |                                                     |
| select A for update，获取A记录本地锁 | 某业务调用 `updateAll()`                            |
| 查询是否存在A全局锁                  | 由于业务一持有A记录本地锁，无法更新，等待获取本地锁 |
| commit，释放A记录本地锁              |                                                     |
|                                      | 更新A，获得数据库A记录本地锁                        |
|                                      | ......                                              |

### 场景二：  某业务先调用`updateAll()`，`updateAll()`未执行完成，另一业务后调用`queryA()`

- 情况1 
  
| 业务一                       | 业务二                                     |
| ---------------------------- | ------------------------------------------ |
| 调用 `updateAll()`           |                                            |
| 更新A，获得数据库A记录本地锁 | 调用 `queryA()`                           |
| 获得**A记录的全局锁**        | select for update 等待   A记录本地锁释放   |
| A记录 commit                 |                                            |
|                              | A记录本地锁获得成功                        |
|                              | 发现A有全局锁  抛出`LockConflictException` |
| 更新B，获得数据库B记录本地锁 |                                            |
| 获得**B记录的全局锁**        |                                            |
| B记录 commit                 |                                            |
| Global Commit，释放全局锁    |                                            |

