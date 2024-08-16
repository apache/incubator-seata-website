---
title: Integration of Spring Cloud with Seata for Distributed Transaction - TCC Mode
keywords: [TCC,Seata,Spring Cloud,Distributed,Transaction]
description: This article mainly introduces the integration of Spring Cloud with Seata for distributed transaction using the TCC mode.
author: gongxing(zhijian.tan)
date: 2021-01-23

---

# Integration of Spring Cloud with Seata for Distributed Transaction - TCC Mode

This article will introduce how to integrate Seata (1.4.0) with Spring Cloud and Feign using the TCC mode. In practice, Seata's AT mode can meet about 80% of our distributed transaction needs. However, when dealing with operations on databases and middleware (such as Redis) that do not support transactions, or when using databases that are not currently supported by the AT mode (currently AT supports MySQL, Oracle, and PostgreSQL), cross-company service invocations, cross-language application invocations, or the need for manual control of the entire two-phase commit process, we need to combine the TCC mode. Moreover, the TCC mode also supports mixed usage with the AT mode.


# 一、The concept of TCC mode

In Seata, a distributed global transaction follows a two-phase commit model with a Try-[Confirm/Cancel] pattern. Both the AT (Automatic Transaction) mode and the TCC (Try-Confirm-Cancel) mode in Seata are implementations of the two-phase commit. The main differences between them are as follows:

AT mode is based on relational databases that support local ACID transactions (currently supporting MySQL, Oracle, and PostgreSQL):

The first phase, prepare: In the local transaction, it combines the submission of business data updates and the recording of corresponding rollback logs.
The second phase, commit: It immediately completes successfully and automatically asynchronously cleans up the rollback logs.
The second phase, rollback: It automatically generates compensation operations through the rollback logs to complete data rollback.

On the other hand, TCC mode does not rely on transaction support from underlying data resources:

The first phase, prepare: It calls a custom-defined prepare logic.
The second phase, commit: It calls a custom-defined commit logic.
The second phase, rollback: It calls a custom-defined rollback logic.

TCC mode refers to the ability to include custom-defined branch transactions in the management of global transactions.

In summary, Seata's TCC mode is a manual implementation of the AT mode that allows you to define the processing logic for the two phases without relying on the undo_log used in the AT mode.

# 二、prepare

- regist center [nacos](https://nacos.io/zh-cn/ "nacos") 
- [seata server(TC）](/docs/ops/deploy-guide-beginner/ "seata服务端(TC）")


# 三、Building TM and TCC-RM

This chapter focuses on the implementation of TCC using Spring Cloud + Feign. For the project setup, please refer to the source code (this project provides demos for both AT mode and TCC mode).

[DEMO](https://github.com/tanzzj/springcloud-seata-feign "服务端搭建文档")

## 3.1 build seata server 

[build server doc](/docs/ops/deploy-guide-beginner/ "服务端搭建文档")

## 3.2 build TM

[service-tm](https://github.com/tanzzj/springcloud-seata-feign/tree/master/service-tm)

## 3.3 build RM-TCC

### 3.3.1 Defining TCC Interface

Since we are using Spring Cloud + Feign, which relies on HTTP for communication, we can use @LocalTCC here. It is important to note that @LocalTCC must be annotated on the interface. This interface can be a regular business interface as long as it implements the corresponding methods for the two-phase commit in TCC. The TCC-related annotations are as follows:

- @LocalTCC: Used for TCC in the Spring Cloud + Feign mode.
- @TwoPhaseBusinessAction: Annotates the try method. The name attribute represents the bean name of the current TCC method, which can be the method name (globally unique). The commitMethod attribute points to the commit method, and the rollbackMethod attribute points to the transaction rollback method. After specifying these three methods, Seata will automatically invoke the commit or rollback method based on the success or failure of the global transaction.
- @BusinessActionContextParameter: Annotates the parameters to be passed to the second phase (commitMethod/rollbackMethod) methods.
- BusinessActionContext: Represents the TCC transaction context.

Here is an example:

```java
/**
 * Here we define the TCC interface.
 * It must be defined on the interface.
 * We are using Spring Cloud for remote invocation.
 * Therefore, we can use LocalTCC here.
 *
 */
@LocalTCC
public interface TccService {
 
    /**
     * Define the two-phase commit.
     * name = The bean name of this TCC, globally unique.
     * commitMethod = The method for the second phase confirmation.
     * rollbackMethod = The method for the second phase cancellation.
     * Use the BusinessActionContextParameter annotation to pass parameters to the second phase.
     *
     * @param params  
     * @return String
     */
    @TwoPhaseBusinessAction(name = "insert", commitMethod = "commitTcc", rollbackMethod = "cancel")
    String insert(
            @BusinessActionContextParameter(paramName = "params") Map<String, String> params
    );
 
    /**
     *  The confirmation method can be named differently, but it must be consistent with the commitMethod.
     *  The context can be used to pass the parameters from the try method.
     * @param context 
     * @return boolean
     */
    boolean commitTcc(BusinessActionContext context);
 
    /**
     * two phase cancel
     *
     * @param context 
     * @return boolean
     */
    boolean cancel(BusinessActionContext context);
}
```

### 3.3.2 Business Implementation of TCC Interface

To keep the code concise, we will combine the routing layer with the business layer for explanation here. However, in actual projects, this may not be the case.

- Using @Transactional in the try method allows for direct rollback of operations in relational databases through Spring transactions. The rollback of operations in non-relational databases or other middleware can be handled in the rollbackMethod.
- By using context.getActionContext("params"), you can retrieve the parameters defined in the try phase and perform business rollback operations on these parameters in the second phase.
- Note 1: It is not advisable to catch exceptions here (similarly, handle exceptions with aspects), as doing so would cause TCC to recognize the operation as successful, and the second phase would directly execute the commitMethod.
- Note 2: In TCC mode, it is the responsibility of the developer to ensure idempotence and transaction suspension prevention.

```java
@Slf4j
@RestController
public class TccServiceImpl implements  TccService {
 
    @Autowired
    TccDAO tccDAO;
 
    /**
     * tcc t（try）method
     * Choose the actual business execution logic or resource reservation logic based on the actual business scenario.
     *
     * @param params - name
     * @return String
     */
    @Override
    @PostMapping("/tcc-insert")
    @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
    public String insert(@RequestBody Map<String, String> params) {
        log.info("xid = " + RootContext.getXID());
        //todo Perform actual operations or operations on MQ, Redis, etc.
        tccDAO.insert(params);
        //Remove the following annotations to throw an exception
        //throw new RuntimeException("服务tcc测试回滚");
        return "success";
    }
 
    /**
     * TCC service confirm method
     * If resource reservation is used in the first phase, the reserved resources should be committed during the second phase confirmation
     * @param context 
     * @return boolean
     */
    @Override
    public boolean commitTcc(BusinessActionContext context) {
        log.info("xid = " + context.getXid() + "提交成功");
        //todo If resource reservation is used in the first phase, resources should be committed here.
        return true;
    }
 
    /**
     * tcc  cancel method
     *
     * @param context 
     * @return boolean
     */
    @Override
    public boolean cancel(BusinessActionContext context) {
        //todo Here, write the rollback operations for middleware or non-relational databases.
        System.out.println("please manually rollback this data:" + context.getActionContext("params"));
        return true;
    }
}
```

### 3.3.3 Starting a Global Transaction in TM and Invoking RM-TCC Interface

Please refer to the project source code in section 3.2.

With this, the integration of TCC mode with Spring Cloud is complete.

