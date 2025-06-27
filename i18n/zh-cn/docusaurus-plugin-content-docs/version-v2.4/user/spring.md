---
title: Seata Spring支持
keywords: [Seata]
description: Seata Spring支持。
---

# Spring支持
## 注解拦截

### 全局事务

```java
@GetMapping(value = "testCommit")
@GlobalTransactional
public Object testCommit(@RequestParam(name = "id",defaultValue = "1") Integer id,
    @RequestParam(name = "sum", defaultValue = "1") Integer sum) {
    Boolean ok = productService.reduceStock(id, sum);
    if (ok) {
        LocalDateTime now = LocalDateTime.now();
        Orders orders = new Orders();
        orders.setCreateTime(now);
        orders.setProductId(id);
        orders.setReplaceTime(now);
        orders.setSum(sum);
        orderService.save(orders);
        return "ok";
    } else {
        return "fail";
    }
}
```

### TCC

```java
/**
 * 定义两阶段提交 name = 该tcc的bean名称,全局唯一 commitMethod = commit 为二阶段确认方法 rollbackMethod = rollback 为二阶段取消方法
 * useTCCFence=true 为开启防悬挂
 * BusinessActionContextParameter注解 传递参数到二阶段中
 *
 * @param params  -入参
 * @return String
 */
@TwoPhaseBusinessAction(name = "beanName", commitMethod = "commit", rollbackMethod = "rollback", useTCCFence = true)
public void insert(@BusinessActionContextParameter(paramName = "params") Map<String, String> params) {
    logger.info("此处可以预留资源,或者利用tcc的特点,与AT混用,二阶段时利用一阶段在此处存放的消息,通过二阶段发出,比如redis,mq等操作");
}

/**
 * 确认方法、可以另命名，但要保证与commitMethod一致 context可以传递try方法的参数
 *
 * @param context 上下文
 * @return boolean
 */
public void commit(BusinessActionContext context) {
    logger.info("预留资源真正处理,或者发出mq消息和redis入库");
}

/**
 * 二阶段取消方法
 *
 * @param context 上下文
 * @return boolean
 */
public void rollback(BusinessActionContext context) {
    logger.info("预留资源释放,或清除一阶段准备让二阶段提交时发出的消息缓存");
}
```

## 切点表达式

### 全局事务

```java
    @Bean
    public AspectTransactionalInterceptor aspectTransactionalInterceptor () {
        return new AspectTransactionalInterceptor();
    }

    @Bean
    public Advisor txAdviceAdvisor(AspectTransactionalInterceptor aspectTransactionalInterceptor ) {
        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        pointcut.setExpression("配置切点表达式使全局事务拦截器生效");
        return new DefaultPointcutAdvisor(pointcut, aspectTransactionalInterceptor);
    }
```

