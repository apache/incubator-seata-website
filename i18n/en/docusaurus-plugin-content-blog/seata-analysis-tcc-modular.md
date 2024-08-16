---
title: Seata TCC Module Source Code Analysis
author: runze.zhao
keywords: [Seata, distributed transaction]
date: 2019/12/25
---
## 一. Introduction

In the analysis of the Spring module, it is noted that Seata's Spring module handles beans involved in distributed transactions. Upon project startup, when the `GlobalTransactionalScanner` detects references to TCC services (i.e., TCC transaction participants), it dynamically proxies them by weaving in the implementation class of `MethodInterceptor` under the TCC mode. The initiator of the TCC transaction still uses the `@GlobalTransactional` annotation to initiate it, and a generic implementation class of `MethodInterceptor` is woven in.

The implementation class of `MethodInterceptor` under the TCC mode is referred to as `TccActionInterceptor` (in the Spring module). This class invokes `ActionInterceptorHandler` (in the TCC module) to handle the transaction process under the TCC mode.

The primary functions of TCC dynamic proxy are: generating the TCC runtime context, propagating business parameters, and registering branch transaction records.

## 二. Introduction to TCC Mode

In the Two-Phase Commit (2PC) protocol, the transaction manager coordinates resource management in two phases. The resource manager provides three operations: the prepare operation in the first phase, and the commit operation and rollback operation in the second phase.


```java
public interface TccAction {

    @TwoPhaseBusinessAction(name = "tccActionForTest" , commitMethod = "commit", rollbackMethod = "rollback")
    public boolean prepare(BusinessActionContext actionContext,
                           @BusinessActionContextParameter(paramName = "a") int a,
                           @BusinessActionContextParameter(paramName = "b", index = 0) List b,
                           @BusinessActionContextParameter(isParamInProperty = true) TccParam tccParam);

    public boolean commit(BusinessActionContext actionContext);
    
    public boolean rollback(BusinessActionContext actionContext);
}
```

This is a participant instance in TCC. Participants need to implement three methods, where the first parameter must be BusinessActionContext, and the return type of the methods is fixed. These methods are exposed as microservices to be invoked by the transaction manager.

- prepare: Checks and reserves resources. For example, deducting the account balance and increasing the same frozen balance.
- commit: Uses the reserved resources to complete the actual business operation. For example, reducing the frozen balance to complete the fund deduction business.
- cancel: Releases the reserved resources. For example, adding back the frozen balance to the account balance.

The BusinessActionContext encapsulates the context environment of the current transaction: xid, branchId, actionName, and parameters annotated with @BusinessActionContextParam.

There are several points to note in participant business:
1. Ensure business idempotence, supporting duplicate submission and rollback of the same transaction.
2. Prevent hanging, i.e., the rollback of the second phase occurs before the try phase.
3. Relax consistency protocols, eventually consistent, so it is read-after-write.

##  Three. Remoting package analysis

![Remoting Package Analysis](https://img-blog.csdnimg.cn/20191124211806237.png?)

All classes in the package serve DefaultRemotingParser. Dubbo, LocalTCC, and SofaRpc are responsible for parsing classes under their respective RPC protocols.

Main methods of DefaultRemotingParser:
1. Determine if the bean is a remoting bean, code: 


```java
    @Override
    public boolean isRemoting(Object bean, String beanName) throws FrameworkException {
        //判断是否是服务调用方或者是否是服务提供方
        return isReference(bean, beanName) || isService(bean, beanName);
    }
```
2. Remote bean parsing, parses rpc classes into RemotingDesc.

Code:


```java
@Override
    public boolean isRemoting(Object bean, String beanName) throws FrameworkException {
        //判断是否是服务调用方或者是否是服务提供方
        return isReference(bean, beanName) || isService(bean, beanName);
    }
```

Utilize allRemotingParsers to parse remote beans. allRemotingParsers is dynamically loaded in initRemotingParser() by calling EnhancedServiceLoader.loadAll(RemotingParser.class), which implements the SPI loading mechanism for loading subclasses of RemotingParser.

For extension purposes, such as implementing a parser for feign remote calls, simply write the relevant implementation classes of RemotingParser in the SPI configuration. This approach offers great extensibility.

RemotingDesc contains specific information about remote beans required for the transaction process, such as targetBean, interfaceClass, interfaceClassName, protocol, isReference, and so on.

3. TCC Resource Registration


```java
public RemotingDesc parserRemotingServiceInfo(Object bean, String beanName) {
        RemotingDesc remotingBeanDesc = getServiceDesc(bean, beanName);
        if (remotingBeanDesc == null) {
            return null;
        }
        remotingServiceMap.put(beanName, remotingBeanDesc);

        Class<?> interfaceClass = remotingBeanDesc.getInterfaceClass();
        Method[] methods = interfaceClass.getMethods();
        if (isService(bean, beanName)) {
            try {
                //service bean, registry resource
                Object targetBean = remotingBeanDesc.getTargetBean();
                for (Method m : methods) {
                    TwoPhaseBusinessAction twoPhaseBusinessAction = m.getAnnotation(TwoPhaseBusinessAction.class);
                    if (twoPhaseBusinessAction != null) {
                        TCCResource tccResource = new TCCResource();
                        tccResource.setActionName(twoPhaseBusinessAction.name());
                        tccResource.setTargetBean(targetBean);
                        tccResource.setPrepareMethod(m);
                        tccResource.setCommitMethodName(twoPhaseBusinessAction.commitMethod());
                        tccResource.setCommitMethod(ReflectionUtil
                            .getMethod(interfaceClass, twoPhaseBusinessAction.commitMethod(),
                                new Class[] {BusinessActionContext.class}));
                        tccResource.setRollbackMethodName(twoPhaseBusinessAction.rollbackMethod());
                        tccResource.setRollbackMethod(ReflectionUtil
                            .getMethod(interfaceClass, twoPhaseBusinessAction.rollbackMethod(),
                                new Class[] {BusinessActionContext.class}));
                        //registry tcc resource
                        DefaultResourceManager.get().registerResource(tccResource);
                    }
                }
            } catch (Throwable t) {
                throw new FrameworkException(t, "parser remoting service error");
            }
        }
        if (isReference(bean, beanName)) {
            //reference bean, TCC proxy
            remotingBeanDesc.setReference(true);
        }
        return remotingBeanDesc;
    }
```

Firstly, determine if it is a transaction participant. If so, obtain the interfaceClass from RemotingDesc, iterate through the methods in the interface, and check if there is a @TwoParserBusinessAction annotation on the method. If found, encapsulate the parameters into TCCResource and register the TCC resource through DefaultResourceManager.

Here, DefaultResourceManager will search for the corresponding resource manager based on the BranchType of the Resource. The resource management class under the TCC mode is in the tcc module.

This RPC parsing class is mainly provided for use by the spring module. parserRemotingServiceInfo() is encapsulated into the TCCBeanParserUtils utility class in the spring module. During project startup, the GlobalTransactionScanner in the spring module parses TCC beans through the utility class. TCCBeanParserUtils calls TCCResourceManager to register resources. If it is a global transaction service provider, it will weave in the TccActionInterceptor proxy. These processes are functionalities of the spring module, where the tcc module provides functional classes for use by the spring module.

## Three. TCC Resource Manager

TCCResourceManager is responsible for managing the registration, branching, committing, and rolling back of resources under the TCC mode.

1. During project startup, when the GlobalTransactionScanner in the spring module detects that a bean is a tcc bean, it caches resources locally and registers them with the server:


```java
    @Override
    public void registerResource(Resource resource) {
        TCCResource tccResource = (TCCResource)resource;
        tccResourceCache.put(tccResource.getResourceId(), tccResource);
        super.registerResource(tccResource);
    }
```

The logic for communicating with the server is encapsulated in the parent class AbstractResourceManager. Here, TCCResource is cached based on resourceId. When registering resources in the parent class AbstractResourceManager, resourceGroupId + actionName is used, where actionName is the name specified in the @TwoParseBusinessAction annotation, and resourceGroupId defaults to DEFAULT.

2. Transaction branch registration is handled in the rm-datasource package under AbstractResourceManager. During registration, the parameter lockKeys is null, which differs from the transaction branch registration under the AT mode.

3. Committing or rolling back branches:


```java
    @Override
    public BranchStatus branchCommit(BranchType branchType, String xid, long branchId, String resourceId,
                                     String applicationData) throws TransactionException {
        TCCResource tccResource = (TCCResource)tccResourceCache.get(resourceId);
        if (tccResource == null) {
            throw new ShouldNeverHappenException("TCC resource is not exist, resourceId:" + resourceId);
        }
        Object targetTCCBean = tccResource.getTargetBean();
        Method commitMethod = tccResource.getCommitMethod();
        if (targetTCCBean == null || commitMethod == null) {
            throw new ShouldNeverHappenException("TCC resource is not available, resourceId:" + resourceId);
        }
        try {
            boolean result = false;
            //BusinessActionContext
            BusinessActionContext businessActionContext = getBusinessActionContext(xid, branchId, resourceId,
                applicationData);
            Object ret = commitMethod.invoke(targetTCCBean, businessActionContext);
            if (ret != null) {
                if (ret instanceof TwoPhaseResult) {
                    result = ((TwoPhaseResult)ret).isSuccess();
                } else {
                    result = (boolean)ret;
                }
            }
            return result ? BranchStatus.PhaseTwo_Committed : BranchStatus.PhaseTwo_CommitFailed_Retryable;
        } catch (Throwable t) {
            LOGGER.error(msg, t);
            throw new FrameworkException(t, msg);
        }
    }
```
Restore the business context using parameters xid, branchId, resourceId, and applicationData.

Execute the commit method through reflection based on the retrieved context and return the execution result. The rollback method follows a similar approach.

Here, branchCommit() and branchRollback() are provided for AbstractRMHandler, an abstract class for resource processing in the rm module. This handler is a further implementation class of the template method defined in the core module. Unlike registerResource(), which actively registers resources during spring scanning.

## Four. Transaction Processing in TCC Mode

The invoke() method of TccActionInterceptor in the spring module is executed when the proxied rpc bean is called. This method first retrieves the global transaction xid passed by the rpc interceptor, and then the transaction process of global transaction participants under TCC mode is still handed over to the ActionInterceptorHandler in the tcc module.

In other words, transaction participants are proxied during project startup. The actual business methods are executed through callbacks in ActionInterceptorHandler.


```java
    public Map<String, Object> proceed(Method method, Object[] arguments, String xid, TwoPhaseBusinessAction businessAction,
                                       Callback<Object> targetCallback) throws Throwable {
        Map<String, Object> ret = new HashMap<String, Object>(4);

        //TCC name
        String actionName = businessAction.name();
        BusinessActionContext actionContext = new BusinessActionContext();
        actionContext.setXid(xid);
        //set action anme
        actionContext.setActionName(actionName);

        //Creating Branch Record
        String branchId = doTccActionLogStore(method, arguments, businessAction, actionContext);
        actionContext.setBranchId(branchId);

        //set the parameter whose type is BusinessActionContext
        Class<?>[] types = method.getParameterTypes();
        int argIndex = 0;
        for (Class<?> cls : types) {
            if (cls.getName().equals(BusinessActionContext.class.getName())) {
                arguments[argIndex] = actionContext;
                break;
            }
            argIndex++;
        }
        //the final parameters of the try method
        ret.put(Constants.TCC_METHOD_ARGUMENTS, arguments);
        //the final result
        ret.put(Constants.TCC_METHOD_RESULT, targetCallback.execute());
        return ret;
    }
```

Here are two important operations:

1. In the doTccActionLogStore() method, two crucial methods are called:
- fetchActionRequestContext(method, arguments): This method retrieves parameters annotated with @BusinessActionContextParam and inserts them into BusinessActionComtext along with transaction-related parameters in the init method below.
- DefaultResourceManager.get().branchRegister(BranchType.TCC, actionName, null, xid, applicationContextStr, null): This method performs the registration of transaction branches for transaction participants under TCC mode.

2. Callback execution of targetCallback.execute(), which executes the specific business logic of the proxied bean, i.e., the prepare() method.

## Five. Summary
The tcc module primarily provides the following functionalities:
1. Defines annotations for two-phase protocols, providing attributes needed for transaction processes under TCC mode.
2. Provides implementations of ParserRemoting for parsing remoting beans of different RPC frameworks, to be invoked by the spring module.
3. Provides the TCC ResourceManager for resource registration, transaction branch registration, submission, and rollback under TCC mode.
4. Provides classes for handling transaction processes under TCC mode, allowing MethodInterceptor proxy classes to delegate the execution of specific mode transaction processes to the tcc module.

## Related
Author: Zhao Runze, [Series Link](https://blog.csdn.net/qq_37804737/category_9530078.html).
