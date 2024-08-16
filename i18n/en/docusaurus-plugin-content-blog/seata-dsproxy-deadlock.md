---
title: Seata Deadlock Issue Caused by ConcurrentHashMap
keywords: [Seata, dynamic data source, DataSource, ConcurrentHashMap, computeIfAbsent]
description: This article primarily discusses an online issue, a Seata dynamic data source proxy deadlock caused by a ConcurrentHashMap bug.
author: xiaoyong.luo
date: 2021/03/13
---

# Background
1. seata version: 1.4.0, but all versions below 1.4 also have this problem.
2. Problem description: In a global transaction, a pure query operation on a branch transaction suddenly gets stuck without any feedback (logs/exceptions) until the RPC timeout on the consumer side

! [image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03a7f737b56e45b4b74e662033ec74f6~tplv-k3u1fbpfcp-watermark.image)

# Problem Troubleshooting
1. The whole process is in a global transaction, the consumer and provider can be seen as two branches of the global transaction, consumer --> provider.
2. the consumer first executes some local logic, and then sends an RPC request to the provider to make sure that the consumer has sent the request and the provider has received it.
3. the provider first prints a log, and then executes a pure query SQL, if the SQL is executed properly, it will print the log, but the current phenomenon is that only the log before the execution of the SQL is printed, and no SQL-related logs are printed. Find DBA to check the SQL log, and found that the SQL is not executed.
4. Determined that the operation is only a pure query operation under the global transaction, before the operation, the overall process of the global transaction is completely normal.
5. In fact, the phenomenon here has been very obvious, but at that time the idea did not change over, has been concerned about the query SQL, always thinking that even if the query timeout and other reasons should be thrown exceptions ah, should not be nothing. DBA can not find the query record, that is not to say that the SQL may not have been executed ah, but in the execution of the SQL before the problem, such as the agent?
6. With the help of arthas's watch command, there is no output. The first log output means that the method must have been executed, and the delay in outputting the result means that the current request is stuck, why is it stuck?
7. With arthas's thread command `thread -b`, `thread -n`, is to find out the current busiest thread. This works very well, there is a thread CPU usage `92%`, and because of this thread caused the other 20 or so Dubbo threads `BLOCKED`. The stack information is as follows
8. Analysing the stack information, we can clearly find the interface related to seata, which is probably related to seata's data source proxy; at the same time, we found that the thread with the highest CPU usage is stuck in the `ConcurrentHashMap#computeIfAbsent` method. Is there a bug in the `ConcurrentHashMap#computeIfAbsent` method?
9. By now, we don't know the exact cause of the problem, but it should have something to do with seata's data source proxy, and we need to analyse both the business code and the seata code to find out why.

! [image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faac0be0982e45a7a43b335e8f8b44bf~tplv-k3u1fbpfcp-watermark.image)

## Problem analysis

### ConcurrentHashMap##computeIfAbsent
This method does have the potential for problems: if two keys have the same hascode, and the computeIfAbsent operation is performed in the corresponding mappingFunction, it will lead to a dead loop, refer to this article for specific analysis: https://juejin.cn/post/ 6844904191077384200

### Seata data source autoproxy
Related content has been analysed before, let's focus on the following core classes:
1. SeataDataSourceBeanPostProcessor
2. SeataAutoDataSourceProxyAdvice
3. DataSourceProxyHolder

##### SeataDataSourceBeanPostProcessor
The `SeataDataSourceBeanPostProcessor` is a `BeanPostProcessor` implementation class that creates a `seataAutoDataSourceProxyDataSource` for the data source configured by the business side in the `postProcessAfterInitialization` method (i.e., after the bean is initialised). proxy data source

```java
public class SeataDataSourceBeanPostProcessor implements BeanPostProcessor {
@Override
public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
if (bean instanceof DataSource) {
//When not in the excludes, put and init proxy. if (!excludes.contains.
if (!excludes.contains(bean.getClass().getName())) {
//Only put and init proxy, not return proxy.
DataSourceProxyHolder.get().putDataSource((DataSource) bean, dataSourceProxyMode);
}
//If is SeataDataSourceProxy, return the original data source.
if (bean instanceof SeataDataSourceProxy) {
LOGGER.info("Unwrap the bean of the data source," +
" and return the original data source to replace the data source proxy."); return ((SeataDataSourceProxy); } }
return ((SeataDataSourceProxy) bean).getTargetDataSource();
}
}
return bean.
}
}
 ```

 ##### SeataAutoDataSourceProxyAdvice
 `SeataAutoDataSourceProxyAdvice` is a MethodInterceptor, `SeataAutoDataSourceProxyCreator` in seata creates a dynamic proxy object for `Bean` of type `DataSource`, the proxy logic is the `SeataAutoDataSourceProxyAdvice#invoke` logic. That is: when executing the relevant methods of the `DataSourceAOPProxyAdvice`, it will go through its `invoke` method, and in the `invoke` method, it will find the corresponding `SeataAutoDataSourceProxyAdvice` according to the native data source, which will ultimately execute the `SeataAutoDataSourceProxyAdvice` logic.
 ```java
 public class SeataAutoDataSourceProxyAdvice implements MethodInterceptor, IntroductionInfo {
    ......
    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        if (!RootContext.requireGlobalLock() && dataSourceProxyMode ! = RootContext.getBranchType()) {
            return invocation.proceed();
        }
        Method method = invocation.getMethod();
        Object[] args = invocation.getArguments(); } Method m = BeanUtils.getMethod(); }
        Method m = BeanUtils.findDeclaredMethod(dataSourceProxyClazz, method.getName(), method.getParameterTypes());
        if (m ! = null) {
            SeataDataSourceProxy dataSourceProxy = DataSourceProxyHolder.get().putDataSource((DataSource) invocation.getThis(), dataSourceProxyMode ); return m.invoke(dataSourceProxyHolder).
            return m.invoke(dataSourceProxy, args);
        } else {
            return invocation.proceed();
        }
    }
 }
 ```

##### DataSourceProxyHolder
The process is clear to us, now there is a question, how to maintain the relationship between `native data source` and `seata proxy data source`? It is maintained by `DataSourceProxyHolder`, which is a singleton object that maintains the relationship between the two through a ConcurrentHashMap: `native data source` as key --> `seata proxy data source` as value.

```java
public class DataSourceProxyHolder {
public SeataDataSourceProxy putDataSource(DataSource dataSource, BranchType dataSourceProxyMode) {
DataSource originalDataSource = dataSource;
......
return CollectionUtils.computeIfAbsent(this.dataSourceProxyMap, originalDataSource, BranchType.
BranchType.XA == dataSourceProxyMode ? DataSourceProxyXA::new : DataSourceProxy::new);
}
}


// CollectionUtils.java
public static <K, V> V computeIfAbsent(Map<K, V> map, K key, Function<? super K, ? extends V> mappingFunction) {
V value = map.get(key);
if (value ! = null) {
return value; }
}
return map.computeIfAbsent(key, mappingFunction);
}
 ```

 ### Client data source configuration
 1. Two data sources are configured: `DynamicDataSource`, `P6DataSource`, `P6DataSource`, `P6DataSource` and `P6DataSource`.
 2. `P6DataSource` can be seen as a wrapper for `DynamicDataSource`. 3.
 3. Let's not worry about whether this configuration makes sense or not, now we just analyse the problem purely based on this data source configuration.

 ```java
 @Qualifier("dsMaster")
 @Bean("dsMaster")
 DynamicDataSource dsMaster() {
    return new DynamicDataSource(masterDsRoute);
 }

 @Primary
 @Qualifier("p6DataSource")
 @Bean("p6DataSource")
 P6DataSource p6DataSource(@Qualifier("dsMaster") DataSource dataSource) {
    P6DataSource p6DataSource = new P6DataSource(dsMaster());
    return p6DataSource;
 }
 ```

 ### Analyse the process

 ``Assuming that by now everyone is aware of the problems that may arise from ConcurrentHashMap#computeIfAbsent``, it is known that this problem has now arisen, and in combination with the stack information, we can see roughly where this problem has arisen.

 1, `ConcurrentHashMap#computeIfAbsent` will produce this problem precondition is: `two key hashcode is the same`; `mappingFunction corresponds to a put operation`. Combined with our seata usage scenario, the mappingFunction corresponds to `DataSourceProxy::new`, suggesting that the put operation may be triggered in the DataSourceProxy's constructor method

 ! [image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00d8e13f71644c63b3bbb58c93b30e0c~tplv-k3u1fbpfcp-watermark.image)
 ```java
 Execute AOP proxy data source related methods =>
 Enter SeataAutoDataSourceProxyAdvice cutover logic =>
 Execute DataSourceProxyHolder#putDataSource method =>
 Execute DataSourceProxy::new =>
 AOP proxy data source's getConnection method =>
 The getConnection method of the native data source =>
 Enter SeataAutoDataSourceProxyAdvice cutover logic =>
 Execute DataSourceProxyHolder#putDataSource method =>
 Execute DataSourceProxy::new =>
 DuridDataSource's getConnection method
 ```

2, What is the `AOP proxy data source` and `native data source` stated in step 1? Look at the following diagram
! [image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3579631f58df4d17bfcd6f28ccc3fd79~tplv-k3u1fbpfcp-watermark.image)

3, the above also said to produce this problem there is a condition ` two key hashcode the same `, but I see that these two data source objects are not overriding the ` hashcode ` method, so by definition, these two objects must be different hashcode. After looking at the ConcurrentHashMap problem again, I feel that the statement `two keys have the same hashcode` is not correct, and `two keys will generate hash conflict` is more reasonable, which explains why two objects with different hashcodes will encounter this problem. To prove this, I've given an example below.
```java
public class Test {
public static void main(String[] args) {
ConcurrentHashMap map = new ConcurrentHashMap(8); Num n1 = new Num(8)
Num n1 = new Num(3);
Num n2 = new Num(19); Num n3 = new Num(19); Num n3 = new Num(19)
Num n3 = new Num(20);

// map.computeIfAbsent(n1, k1 -> map.computeIfAbsent(n3, k2 -> 200)); // This line of code does not cause the program to loop.
map.computeIfAbsent(n1, k1 -> map.computeIfAbsent(n2, k2 -> 200)); // this line of code will cause the program to die
}

    static class Num{
        private int i; public Num(int i){
        public Num(int i){
            this.i = i; } static class Num{ private int i; public Num(int i){ this.
        }

        public int hashCode() { this.i = i; this.i = i; }
        public int hashCode() {
            return i; } @Override public int hashCode() { this.i = i; }
        }
    }
}
 ```
 1. To make it easier to reproduce the problem, we rewrite the `Num#hashCode` method to ensure that the constructor input is the hashcode value.
 2. create a ConcurrentHashMap object, initialCapacity is 8, sizeCtl calculated value is 16, that is, the default length of the array in the map is 16
 3. create object `n1`, the input parameter is 3, that is, the hashcode is 3, the calculation of its corresponding array subscript 3
 4. create object `n2`, the input parameter is 19, that is, the hashcode is 19, calculate its corresponding array subscript is 3, at this time we can think of `n1 and n2 hash conflict`.
 5. create object `n3` with input 20, i.e., hashcode 20, and its corresponding array subscript is 4.
 6. execute `map.computeIfAbsent(n1, k1 -> map.computeIfAbsent(n3, k2 -> 200))`, the programme exits normally: `Because there is no hash conflict between n1 and n3, the programme terminates normally`.
 7. Execute `map.computeIfAbsent(n1, k1 -> map.computeIfAbsent(n2, k2 -> 200))`, the programme exits normally: ` because n1 and n2 have a hash conflict, so it is in a dead loop`.


 4、During the initialisation of the object, hasn't `SeataDataSourceBeanPostProcessor` already initialised the corresponding data source proxy of the object? Why the corresponding data source proxy is still created in `SeataAutoDataSourceProxyAdvice`?
 1. First of all, the `SeataDataSourceBeanPostProcessor` execution period is later than the creation of the AOP proxy object, so when executing the `SeataDataSourceBeanPostProcessor` related methods, the `SeataAutoDataSourceBeanPostProcessor` method is executed. SeataAutoDataSourceProxyAdvice` should actually take effect when the `SeataDataSourceBeanPostProcessor` related methods are executed.
 2. when adding elements to the map in `SeataDataSourceBeanPostProcessor`, the key is `AOP proxy datasource`; in `SeataAutoDataSourceProxyAdvice`, the key is `native datasource`, so the key is not the same as `invocation.getThis()`, so the key is not the same. `, so the key is not the same

 ! [image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/747b664a0b6c4f58843947576dd0856e~tplv-k3u1fbpfcp-watermark.image)

 5, there is another problem, `SeataAutoDataSourceProxyAdvic#invoke` method does not filter `toString, hashCode` and other methods, the proxy object created by cglib will override these methods by default, if these methods of the proxy object are triggered when putting elements into the map. If these methods are triggered when putting elements into the map, the proxy object will re-enter the `SeataAutoDataSourceProxyAdvic#invoke` cut until the thread stack benefits.



 # Summary of the problem
 1. in two key will produce hash conflict, will trigger `ConcurrentHashMap#computeIfAbsent` BUG, the performance of this BUG is to make the current thread into a dead loop
 2. business feedback, the problem is occasional, occasional for two reasons: first, the application is a multi-node deployment, but only one node on the line triggered the BUG (hashcode conflict), so only when the request hits this node may trigger the BUG; second, because each restart object address (hashcode) are not sure, so not triggered after every app restart, but if once triggered, the node will always have this problem. Having a thread that keeps dying and blocking other threads that are trying to get the proxy data source from the map is business feedback that the request is stuck. If this happens to successive requests, the business side may restart the service, and then, ``because the hash conflict does not necessarily exist after the restart, the business may behave normally after the restart, but it is also possible that the bug will be triggered again on the next restart.
 3. when encountering this problem, from the perspective of the whole problem, it is indeed a deadlock, because the dead loop thread occupant lock has not been released, resulting in other threads operating on the map is BLOCKED!
 4. essentially because `ConcurrentHashMap#computeIfAbsent method may trigger a bug`, and seata's usage scenario just triggered the bug.
 5. The following demo is actually a complete simulation of what happens when something goes wrong online, as follows:

 ```java
 public class Test {
    public static void main(String[] args) {

        ConcurrentHashMap map = new ConcurrentHashMap(8);

        Num n1 = new Num(3);
        Num n2 = new Num(19);

        for(int i = 0; i< 20; i++){
            new Thread(()-> {
                try {
                    Thread.sleep(1000); } catch (InterruptedException e.g.
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                map.computeIfAbsent(n1, k-> 200); }).start(); }
            }).start();
        }
        map.computeIfAbsent(n1, k1 -> map.computeIfAbsent(n2, k2 -> 200));
    }


    static class Num{
        private int i; public Num(int i){

        public Num(int i){
            this.i = i; }
        }
        public int hashCode() { this.i = i; this.i = i; }
        public int hashCode() {
            return i; } @Override public int hashCode() { this.i = i; }
        }
    }
 }
 ```

! [image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6134c6498fa49c4a68b2745ba0895e3~tplv-k3u1fbpfcp-watermark.image)


### Solving the problem
The problem can be solved in two ways:
1. business changes: P6DataSource and DynamicDataSource do not need to be proxied, directly proxy P6DataSource can be, DynamicDataSource does not need to be declared as a bean; or through the excludes property excludes P6DataSource, so that there is no duplicate proxy problem. There will be no problem of duplicate proxies
2. Seata refinement: improve the logic related to data source proxy

##### Business changes
1. Data source related configuration can be changed to the following:
 ```java
 @Primary
 @Qualifier("p6DataSource")
 @Bean("p6DataSource")
 P6DataSource p6DataSource(@Qualifier("dsMaster") DataSource dataSource) {
    P6DataSource p6DataSource = new P6DataSource(new TuYaDynamicDataSource(masterDsRoute));
    logger.warn("dsMaster={}, hashcode={}",p6DataSource, p6DataSource.hashCode());
    return p6DataSource.
 }
 ```

2. Or leave the current data source configuration unchanged and add the excludes property
 ```java
 @EnableAutoDataSourceProxy(excludes={"P6DataSource"})
 ```

##### Seata refinement

1. `ConcurrentHashMap#computeIfAbsent` method is changed to double check as follows:
 ``` java
 SeataDataSourceProxy dsProxy = dataSourceProxyMap.get(originalDataSource);
 if (dsProxy == null) {
    synchronized (dataSourceProxyMap) {
        dsProxy = dataSourceProxyMap.get(originalDataSource);
        if (dsProxy == null) {
            dsProxy = createDsProxyByMode(dataSourceProxyMode, originalDataSource);
            dataSourceProxyMap.put(originalDataSource, dsProxy);
        }
    }
 }
 return dsProxy;
 ```

I wanted to change the `CollectionUtils#computeIfAbsent` method directly, and the feedback from the group was that this might cause the data source to be created multiple times, which is indeed a problem: as follows
```java
public static <K, V> V computeIfAbsent(Map<K, V> map, K key, Function<? super K, ? extends V> mappingFunction) {
V value = map.get(key);
if (value ! = null) {
return value; }
}
value = mappingFunction.apply(key);
return map.computeIfAbsent(key, value);
}
 ```

 2. Add some filtering to the SeataAutoDataSourceProxyAdvice cutout logic
 ```java
 Method m = BeanUtils.findDeclaredMethod(dataSourceProxyClazz, method.getName(), method.getParameterTypes());
 if (m ! = null && DataSource.class.isAssignableFrom(method.getDeclaringClass())) {
    SeataDataSourceProxy dataSourceProxy = DataSourceProxyHolder.get().putDataSource((DataSource) invocation.getThis(), dataSourceProxyMode ); return m.invoke(dataSourceProxyHolder).
    return m.invoke(dataSourceProxy, args);
 } else {
    return invocation.proceed();
 }
 ```

### Legacy issues
In the corresponding methods of `SeataDataSourceBeanPostProcessor` and `SeataAutoDataSourceProxyAdvice`, the keys corresponding to initialising the `seata datasource proxy` into the map are fundamentally different, the ` The key in `SeataDataSourceBeanPostProcessor` is the `AOP proxy data source`; the key in `SeataAutoDataSourceProxyAdvice` is the native object, which results in the unnecessary creation of the `seata data source proxy` object.

What is the best suggestion for this problem? Is it possible to specify an order for `SeataDataSourceBeanPostProcessor` to take effect before the AOP proxy object is created?


# Link to original article

https://juejin.cn/post/6939041336964153352/
