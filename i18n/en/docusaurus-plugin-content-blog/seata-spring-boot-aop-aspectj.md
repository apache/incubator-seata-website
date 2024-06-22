---
title: Dynamically Creating/Closing Seata Distributed Transactions through AOP
keywords: [Seata, Nacos, distributed transaction, spring]
description: This article explains how to dynamically create/close Seata distributed transactions using AOP.
author: FUNKYE
date: 2019/12/23
---
Dynamically create/close Seata distributed transactions through AOP

This article was written by FUNKYE (Chen Jianbin), the main programmer of an Internet company in Hangzhou.

# Foreword

Through the GA conference on the senior R & D engineering Chen Pengzhi drop trip in the drop two-wheeler business practice, found that the need for dynamic degradation is very high, so this simple use of spring boot aop to simply deal with degradation of the relevant processing, this is very thankful to Chen Pengzhi's sharing!

can use this demo [project address](https://gitee.com/itCjb/springboot-dubbo-mybatisplus-seata )

through the following code transformation practice .

## Preparation

1. Create a TestAspect for testing.

```java
package org.test.config;

import java.lang.reflect.

import org.apache.commons.lang3.StringUtils; import org.aspectj.
import org.aspectj.lang.JoinPoint; import org.aspectj.lang.
import org.aspectj.lang.annotation.AfterReturning; import org.aspectj.lang.annotation.
import org.aspectj.lang.annotation.AfterThrowing; import org.aspectj.lang.annotation.
import org.aspectj.lang.JoinPoint.import org.aspectj.annotation.AfterReturning; import org.aspectj.lang.annotation.
import org.aspectj.lang.annotation.
import org.aspectj.lang.reflect.MethodSignature; import org.aspectj.lang.reflect.
import org.aspectj.lang.annotation.Aspect; import org.aspectj.lang.reflect.
import org.slf4j.LoggerFactory; import org.springframework.
import org.springframework.stereotype.Component; import org.springframework.stereotype.

import io.seata.core.context.
import io.seata.core.exception.TransactionException; import io.seata.core.exception.
import io.seata.tm.api.GlobalTransaction; import io.seata.tm.api.
import io.seata.tm.api.GlobalTransactionContext; import io.seata.tm.api.

@Aspect
GlobalTransactionContext; @Aspect
public class TestAspect {
private final static Logger logger = LoggerFactory.getLogger(TestAspect.class); @Before("execution"); @Before("execution")

    @Before("execution(* org.test.service.*. *(...))")
    public void before(JoinPoint joinPoint) throws TransactionException {
        MethodSignature signature = (MethodSignature)joinPoint.getSignature();
        Method method = signature.getMethod(); logger.info
        logger.info("Intercepted method that requires a distributed transaction, " + method.getName()); // Use redis or redis.getName() here.
        // Here you can use redis or a timed task to get a key to determine if the distributed transaction needs to be closed.
        // Simulate a dynamic shutdown of a distributed transaction
        if ((int)(Math.random() * 100) % 2 == 0) {
            GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();
            tx.begin(300000, "test-client");
        } else {
            logger.info("Closing distributed transaction"); }
        }
    }

    @AfterThrowing(throwing = "e", pointcut = "execution(* org.test.service. *(...))")
    public void doRecoveryActions(Throwable e) throws TransactionException {
        logger.info("Method Execution Exception: {}", e.getMessage());
        if (!StringUtils.isBlank(RootContext.getXID()))
            GlobalTransactionContext.reload(RootContext.getXID()).rollback();
    }

    @AfterReturning(value = "execution(* org.test.service.*. *(...))" , returning = "result")
    public void afterReturning(JoinPoint point, Object result) throws TransactionException {
        logger.info("End of method execution: {}", result);
        if ((Boolean)result) {
            if (!StringUtils.isBlank(RootContext.getXID())) {
                logger.info("DistributedTransactionId:{}", RootContext.getXID());
                GlobalTransactionContext.reload(RootContext.getXID()).commit();
            }
        }
    }

}
```

Please note that the package name above can be changed to your own service package name: ``.

2. Change the service code.

```java
    public Object seataCommit() {
        testService.Commit(); return true; return true; testService.Commit(); testService.Commit()
        testService.Commit(); return true; }
    }
```

Because of the exception and return results we will intercept, so this side can trycatch or directly let him throw an exception to intercept the line, or directly judge the return results, such as your business code code = 200 for success, then the commit, and vice versa in the interception of the return value of that section of the code plus rollback; # Debugging.

# Debugging

1. Change the code to actively throw exceptions

```java
    public Object seataCommit() {
        try {
            testService.Commit();
            testService.Commit(); int i = 1 / 0; return true; return
            return true; } catch (Exception e) { testService.
        } catch (Exception e) {
            // TODO: handle exception
            throw new RuntimeException(); } catch (Exception e) { // TODO: handle exception.
        }
    }
```

View log:

```java
2019-12-23 11:57:55.386 INFO 23952 --- [.0-28888-exec-7] org.test.controller.TestController : Intercepted method requiring distributed transaction, seataCommit
2019-12-23 11:57:55.489 INFO 23952 --- [.0-28888-exec-7] i.seata.tm.api.DefaultGlobalTransaction : Begin new global transaction [192.168.14.67 :8092:2030765910]
2019-12-23 11:57:55.489 INFO 23952 --- [.0-28888-exec-7] org.test.controller.TestController : Creating distributed transaction complete 192.168.14.67 :8092:2030765910
2019-12-23 11:57:55.709 INFO 23952 --- [.0-28888-exec-7] org.test.controller.TestController : Method execution exception:null
2019-12-23 11:57:55.885 INFO 23952 --- [.0-28888-exec-7] i.seata.tm.api.DefaultGlobalTransaction : [192.168.14.67:8092:2030765910] rollback status: Rollbacked
2019-12-23 11:57:55.888 ERROR 23952 --- [.0-28888-exec-7] o.a.c.c.C. [. [. [/]. [dispatcherServlet] : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.RuntimeException] with root cause

```

You can see that it has been intercepted and triggered a rollback.

2. Restore the code to debug the normal situation:

```java
    public Object seataCommit() {
        testService.Commit(); testService.Commit(); testService.Commit(); testService.Commit()
        testService.Commit(); return true; }
    }
```

Viewing logs.

```
2019-12-23 12:00:20.876 INFO 23952 --- [.0-28888-exec-2] org.test.controller.TestController : Intercepted method requiring distributed transaction, seataCommit
2019-12-23 12:00:20.919 INFO 23952 --- [.0-28888-exec-2] i.seata.tm.api.DefaultGlobalTransaction : Begin new global transaction [192.168.14.67 :8092:2030765926]
2019-12-23 12:00:20.920 INFO 23952 --- [.0-28888-exec-2] org.test.controller.TestController : Creating distributed transaction complete 192.168.14.67 :8092:2030765926
2019-12-23 12:00:21.078 INFO 23952 --- [.0-28888-exec-2] org.test.controller.TestController : End of method execution:true
2019-12-23 12:00:21.078 INFO 23952 --- [.0-28888-exec-2] org.test.controller.TestController : Distributed transaction Id:192.168.14.67:8092:2030765926
2019-12-23 12:00:21.213 INFO 23952 --- [.0-28888-exec-2] i.seata.tm.api.DefaultGlobalTransaction : [192.168.14.67:8092:2030765926] commit status: Committed
```

You can see that the transaction has been committed.

# Summary

For more details, we hope you will visit the following address to read the detailed documentation.

[nacos website](https://nacos.io/zh-cn/index.html)

[dubbo website](http://dubbo.apache.org/en-us/)

[seata official website](https://seata.apache.org/zh-cn/)

[docker official website](https://www.docker.com/)
