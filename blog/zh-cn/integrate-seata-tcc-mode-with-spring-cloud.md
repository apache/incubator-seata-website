---
title: Spring Cloud集成Seata分布式事务-TCC模式
keywords: TCC,Seata,Spring Cloud,分布式,事务
description: 本文主要介绍Spring Cloud集成Seata分布式事务TCC模式
author: 弓行（谭志坚）
date: 2021-01-23

---

# Spring Cloud集成Seata分布式事务-TCC模式

本文将介绍基于Spring Cloud + feign 如何集成 Seata(1.4.0)的TCC模式。实际上，Seata的AT模式基本上能满足我们使用分布式事务80%的需求，但涉及不支持事务的数据库与中间件（如redis）等的操作，或AT模式暂未支持的数据库（目前AT支持Mysql、Oracle与PostgreSQL）、跨公司服务的调用、跨语言的应用调用或有手动控制整个二阶段提交过程的需求，则需要结合TCC模式。不仅如此，TCC模式还支持与AT模式混合使用。

本文作者：弓行（谭志坚）

# 一、TCC模式的概念

一个分布式的全局事务，整体是两阶段提交**Try-[Comfirm/Cancel]** 的模型。在Seata中，AT模式与TCC模式事实上都是两阶段提交的具体实现。他们的区别在于：

AT 模式基于**支持本地 ACID 事务** 的 **关系型数据库**（目前支持Mysql、Oracle与PostgreSQL）：

一阶段 prepare 行为：在本地事务中，一并提交业务数据更新和相应回滚日志记录。
二阶段 commit 行为：马上成功结束，**自动**异步批量清理回滚日志。
二阶段 rollback 行为：通过回滚日志，**自动**生成补偿操作，完成数据回滚。

相应的，TCC 模式，不依赖于底层数据资源的事务支持：

一阶段 prepare 行为：调用 自定义 的 prepare 逻辑。
二阶段 commit 行为：调用 **自定义**的 commit 逻辑。
二阶段 rollback 行为：调用 **自定义**的 rollback 逻辑。

所谓 TCC 模式，是指支持把 **自定义** 的分支事务纳入到全局事务的管理中。

简单点概括，SEATA的TCC模式就是**手工的AT模式**，它允许你自定义两阶段的处理逻辑而不依赖AT模式的undo_log。

# 二、前提准备

- 注册中心 [nacos](https://nacos.io/zh-cn/ "nacos") 
- [seata服务端(TC）](http://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html "seata服务端(TC）")


# 三、TM与TCC-RM的搭建

本章着重讲基于Spring Cloud + Feign的TCC的实现，项目的搭建直接看源码(本工程提供了AT模式与TCC模式的DEMO)

[DEMO工程源码](https://github.com/tanzzj/springcloud-seata-feign "服务端搭建文档")

## 3.1 seata服务端的搭建

[服务端搭建文档](http://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html "服务端搭建文档")

## 3.2 TM的搭建

[service-tm](https://github.com/tanzzj/springcloud-seata-feign/tree/master/service-tm)

## 3.3 RM-TCC的搭建

### 3.3.1 定义TCC接口

由于我们使用的是 SpringCloud + Feign，Feign的调用基于http，因此此处我们使用`@LocalTCC`便可。值得注意的是，`@LocalTCC`一定需要注解在接口上，此接口可以是寻常的业务接口，只要实现了TCC的两阶段提交对应方法便可，TCC相关注解如下：

-  `@LocalTCC` 适用于SpringCloud+Feign模式下的TCC
-  `@TwoPhaseBusinessAction` 注解try方法，其中name为当前tcc方法的bean名称，写方法名便可（全局唯一），commitMethod指向提交方法，rollbackMethod指向事务回滚方法。指定好三个方法之后，seata会根据全局事务的成功或失败，去帮我们自动调用提交方法或者回滚方法。
-  `@BusinessActionContextParameter` 注解可以将参数传递到二阶段（commitMethod/rollbackMethod）的方法。
-  `BusinessActionContext` 便是指TCC事务上下文

实例如下：

```java
/**
 * 这里定义tcc的接口
 * 一定要定义在接口上
 * 我们使用springCloud的远程调用
 * 那么这里使用LocalTCC便可
 *
 * @author tanzj
 */
@LocalTCC
public interface TccService {
 
    /**
     * 定义两阶段提交
     * name = 该tcc的bean名称,全局唯一
     * commitMethod = commit 为二阶段确认方法
     * rollbackMethod = rollback 为二阶段取消方法
     * BusinessActionContextParameter注解 传递参数到二阶段中
     *
     * @param params  -入参
     * @return String
     */
    @TwoPhaseBusinessAction(name = "insert", commitMethod = "commitTcc", rollbackMethod = "cancel")
    String insert(
            @BusinessActionContextParameter(paramName = "params") Map<String, String> params
    );
 
    /**
     * 确认方法、可以另命名，但要保证与commitMethod一致
     * context可以传递try方法的参数
     *
     * @param context 上下文
     * @return boolean
     */
    boolean commitTcc(BusinessActionContext context);
 
    /**
     * 二阶段取消方法
     *
     * @param context 上下文
     * @return boolean
     */
    boolean cancel(BusinessActionContext context);
}
```

### 3.3.2 TCC接口的业务实现

为了保证代码的简洁，此处将路由层与业务层结合讲解，实际项目则不然。

- 在try方法中使用`@Transational`可以直接通过spring事务回滚关系型数据库中的操作，而非关系型数据库等中间件的回滚操作可以交给rollbackMethod方法处理。
- 使用context.getActionContext("params")便可以得到一阶段try中定义的参数，在二阶段对此参数进行业务回滚操作。
- **注意1：**此处亦不可以捕获异常（同理切面处理异常），否则TCC将识别该操作为成功，二阶段直接执行commitMethod。
- **注意2：**TCC模式要**开发者自行**保证幂等和事务防悬挂

```java
@Slf4j
@RestController
public class TccServiceImpl implements  TccService {
 
    @Autowired
    TccDAO tccDAO;
 
    /**
     * tcc服务t（try）方法
     * 根据实际业务场景选择实际业务执行逻辑或者资源预留逻辑
     *
     * @param params - name
     * @return String
     */
    @Override
    @PostMapping("/tcc-insert")
    @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
    public String insert(@RequestBody Map<String, String> params) {
        log.info("xid = " + RootContext.getXID());
        //todo 实际的操作，或操作MQ、redis等
        tccDAO.insert(params);
        //放开以下注解抛出异常
        //throw new RuntimeException("服务tcc测试回滚");
        return "success";
    }
 
    /**
     * tcc服务 confirm方法
     * 若一阶段采用资源预留，在二阶段确认时要提交预留的资源
     *
     * @param context 上下文
     * @return boolean
     */
    @Override
    public boolean commitTcc(BusinessActionContext context) {
        log.info("xid = " + context.getXid() + "提交成功");
        //todo 若一阶段资源预留，这里则要提交资源
        return true;
    }
 
    /**
     * tcc 服务 cancel方法
     *
     * @param context 上下文
     * @return boolean
     */
    @Override
    public boolean cancel(BusinessActionContext context) {
        //todo 这里写中间件、非关系型数据库的回滚操作
        System.out.println("please manually rollback this data:" + context.getActionContext("params"));
        return true;
    }
}
```

### 3.3.3 在TM中开启全局事务，调用RM-TCC接口

工程源码见3.2

---
至此，Spring Cloud整合TCC模式完成

