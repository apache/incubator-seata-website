---
title: FAQ
keywords: [Seata]
description: Seata FAQ.
---

# FAQ

<a href="#1" target="_self">1.Can Seata be used in a production environment?</a>
<br/>

<a href="#2" target="_self">2.Dose Seata support high availability ?</a>
<br/>

<a href="#3" target="_self">3.What is the use of the record of undo log table log status = 1 ?</a>
<br/>

<a href="#4" target="_self">4.How to use the Seata framework to ensure transaction isolation?</a>
<br/>

<a href="#5" target="_self">5.When Failed to roll back dirty data, what shall I do ?</a>
<br/>

<a href="#6" target="_self">6.Why the global transaction state is not "begin" when a branch transaction is registered ?</a>
<br/>

<a href="#7" target="_self">7.When Nacos is used as the Seata configuration center, the project startup error report cannot find the service. How to check and deal with it ?</a>
<br/>

<a href="#8" target="_self">8.When Eureka is the registry and TC is highly available, how to overwrite Eureka properties at the TC end?</a>
<br/>

<a href="#9" target="_self">9.java.lang.NoSuchMethodError: com.fasterxml.jackson.databind.jsontype.TypeSerializer.typeId(Ljava/lang/Object;Lcom/fasterxml/jackson/core/JsonToken;)?</a>
<br/>

<a href="#10" target="_self">10. Why didn't my mybatis operation return auto-generated ID? </a>
<br/>

<a href="#11" target="_self">11.I can't find this package:io.seata.codec.protobuf.generated,and cant't run seata server?</a>
<br/>

<a href="#12" target="_self">12.How TC uses mysql8?</a>
<br/>

<a href="#13" target="_self">13.Support multiple primary keys?</a>
<br/>

<a href="#14" target="_self">14.How to solve the error reported by HikariDataSource?</a>
<br/>

<a href="#15" target="_self">15.Can I write the configuration directly to application.properties without using the conf type configuration file?</a>
<br/>

<a href="#16" target="_self">16.How to package seata-server after modifying the source code?</a>
<br/>

<a href="#17" target="_self">17.What RPC frameworks does seata support now?</a>
<br/>

<a href="#18" target="_self">18. java.lang.NoSuchMethodError: com.alibaba.druid.sql.ast.statement
.SQLSelect.getFirstQueueBlockLcom/alibaba/druid/sql/ast/statement/SQLSelectQueryBlock;</a>
<br/>

<a href="#19" target="_self">19. NoSuchMethodError in apache-dubbo 2.7.0?</a>
<br/>

<a href="#20" target="_self">20.What are the precautions for using AT mode?</a>
<br/>

<a href="#21" target="_self">21.Why will the win system have one more empty line for the properties when configured with synchronization script?</a>
<br/>

<a href="#22" target="_self">22.What to note for the AT mode and Spring @Transactional annotation hyphenation?</a>
<br/>

<a href="#23" target="_self">23.Spring boot 1.5.x appear the Jackson related NoClassDefFoundException?</a>
<br/>

<a href="#24" target="_self">24.SpringCloud/HTTP xid cannot transmit?</a>
<br/>

<a href="#25" target="_self">25.undo_log cannot be deleted after using the mybatis plus dynamic data source component?</a>
<br/>

<a href="#26" target="_self">26.Could not found global transaction xid = %s, may be has finished.</a>
<br/>

<a href="#27" target="_self">27.Why does TC reported this error: An exceptionCaught() event was fired, and it reached at the tail of the pipeline. It usually means the last handler in the pipeline did not handle the exception?</a>
<br/>

<a href="#28" target="_self">28.The database enables automatic update timestamp, which makes dirty data unable to be rolled back?</a>
<br/>

<a href="#29" target="_self">29.timeoutrollching occurs before the global transaction timeout?</a>
<br/>

<a href="#30" target="_self">30.What database and table splitting solutions does Seata support at this stage?</a>
<br/>

<a href="#31" target="_self">31.What are the restrictions on Seata's address registered with the registry?</a>
<br/>

<a href="#32" target="_self">32.seata-server cannot be started due to Unrecognized VM option 'CMSParallelRemarkEnabled'
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.?</a>
<br/>

<a href="#33" target="_self">33. What is the scope of SQL support for Seata? </a>
<br/>

<a href="#34" target="_self">34. What are the JDK version requirements for Seata? </a>
<br/>

<a href="#35" target="_self">35. When the length of Oracle's NUMBER exceeds 19, entities use Long mapping, which results in the inability to obtain row information, causing undo_log to be unable to be inserted and also unable to be rolled back? </a>
<br/>

<a href="#36" target="_self">36. How to deal with the io.seata.rm.datasource.exec.LockConflictException: get global lock fail ? </a>
<br/>

<a href="#37" target="_self">37. Why does the java.nio.ByteBuffer.flip()Ljava/nio/ByteBuffer error occur when the client's JDK version is 1.8 when compiling and running ? </a>
<br/>

<a href="#38" target="_self">38. Why when using Apple M1 chip maven dependence, unable to download the dependence `com.google.protobuf:protoc:exe:3.3.0`? </a>
<br/>

<a href="#39" target="_self">39. Versions 1.4.2 and below throw "Cannot construct instance of 'java.time.LocalDateTime'" when rolling back </a>
<br/>

<a href="#40" target="_self">40. What are the precautions when Seata-Server uses DB as the storage mode? </a>
<br/>

<a href="#41" target="_self">41. Did Oracle fail to roll back using the timestamp field type? </a>
<br/>

<a href="#42" target="_self">42. Did the transaction not roll back after an exception was thrown? </a>
<br/>

<a href="#43" target="_self">43. How to deal with the @FeignClient annotation url not working and the error prompt "Load balancer does not have available server for client"? </a>
<br/>

<a href="#44" target="_self">44. Why does the error "pk contains illegal character!" occur? </a>
<br/>

<a href="#45" target="_self">45. Why do namingserver and console require JDK 25 for packaging and compiling? & Why are namingserver and console not involved in the compilation and packaging process? </a>
<br/>

---

<h3 id='1'>Q: 1.Can Seata be used in a production environment?</h3>

**A:**
Since version 0.4.2,it is supported in production environment,Users who are using seata are welcome to complete this issue together:[who's using Seata](https://github.com/apache/incubator-seata/issues/1246)

---

<h3 id='2'>Q: 2.Dose Seata support high availability ?</h3>

**A:**
supported from version 0.6, tc USES db mode to share global transaction session information, and the registry USES non-file seata-supported third-party registries

---

<h3 id='3'>Q: 3.What is the use of the record of undo log table log status = 1 ?</h3>

**A:**

**Scenario:** after A branch transaction A registers TC, A global transaction rollback occurs before A local transaction commits

**Consequence:** global transaction rollback succeeds, a resource is occupied, resulting in resource suspension problem

**Anti-suspension measures:** when a rolls back and finds that the rollback undo has not been inserted, an undo record with log_status=1 is inserted. When a local transaction (business write operation SQL and corresponding undo are a local transaction) is committed, it fails due to the unique key conflict of the undo table.

---

<h3 id='4'>Q: 4.How to use the Seata framework to ensure transaction isolation?</h3>

**A:**
Since seata phase 1 local transactions have been committed, enhanced isolation is needed to prevent other transactions from dirty reads and dirty writes.

1. Dirty read Select statement with for update, proxy method with @GlobalLock+@Transactional or @GlobalTransaction
2. Dirty write You must use @GlobalTransactional

   note：If the interface of the business you are querying does not use the @GlobalTransactional annotation, which means there is no need for distributed transactions on the method, you can annotate the @globallock+@Transactional annotation on the method and add a for update statement to the query.
   If your query interface has the @GlobalTransactional annotation on the outer edge of the transactional link, you can simply add a for update statement to your query. The reason for designing this annotation is that before it is available, distributed transactions need to query the committed data, but the business does not need distributed transactions.
   Using the @GlobalTransactional annotation adds some unnecessary additional RPC overhead such as begin returning xid, commit transaction, etc. GlobalLock simplifies the RPC process for higher performance.

---

<h3 id='5'>Q: 5.When Failed to roll back dirty data, what shall I do ?</h3>

**A:**

1. The dirty data needs to be processed manually, and the data can be corrected according to the log prompt, or the corresponding undo can be deleted (the FailureHandler can be customized for email notification or other purposes).
2. This option is not recommended when "undo" mirror validation is turned off during rollback.

   node：It is recommended to isolate the dirty data in advance

---

<h3 id='6'>Q: 6.Why the global transaction state is not "begin" when a branch transaction is registered ?</h3>

**A:**

**abnormal：** Could not register branch into global session xid = status = Rollbacked（Two phase state and Rollbacking, AsyncCommitting, etc） while expecting Begin

**describe：** When a branch transaction is registered, the global transaction status must be a one-phase state "begin", and registration other than "begin" is not allowed. It belongs to the normal processing at the seata framework level, and users can solve it from their own business level.

This exception can occur in the following situations (you can continue to add).

1. The branch transaction is asynchronous. The global transaction is not aware of its progress. The global transaction has entered phase 2 before the asynchronous branch comes to register.
2. Service a rpc service b timed out (dubbo, feign, etc. timeout by default for 1 second), a throws an exception to tm, tm informs tc to roll back, but b still receives the request (network delay or rpc framework retry), and then registers at tc Global transaction was found to be rolling back.
3. Tc is aware of the global transaction timeout (@GlobalTransactional (timeoutMills = default 60 seconds)), actively changes the state and notifies each branch transaction to rollback when a new branch transaction is registered.

---

<h3 id='7'>Q: 7.When Nacos is used as the Seata configuration center, the project startup error report cannot find the service. How to check and deal with it ?</h3>

**A:**
abnormal：io.seata.common.exception.FrameworkException: can not register RM,err:can not connect to services-server.

1. Check the nacos configuration list to see if the seata configuration has been imported successfully.
2. Check the list of nacos services to see if serverAddr has been registered successfully.
3. Check the namespace, registry.nacos.namespace and config.nacos.namespace in the client's registry.conf and enter the nacos namespace ID. The default is "". The server and client correspond to the namespace.
   It is public and is a reserved control of nacos. If you need to create your own namespace, it is better not to use the same name as public, and use a name that has specific semantics in an actual business scenario.
4. For the list of services on nacos, the IP address corresponding to serverAddr address should be the IP address specified for seata startup, such as: sh seata-server.sh-p 8091-h 122.51.204.197-m file.
5. Check to see if the seata/conf/nacos-config.txt, transaction group service.vgroupMapping.trade_group=default

   configuration is the same as the project group configuration name.

6. Telnet IP port view ports are open as well as firewall status.

   note：1.Version 080 starts the specified IP problem, the exception "Exception in thread "main" java.lang.RuntimeException: java.net.BindException: Cannot assign request address", please upgrade to version 081 or above.
   The project USES jdk13 and starts with

```verilog
   Error: Could not create the Java Virtual Machine
   Error: A fatal exception has occurred. Program will exit.
```

 If the environment is sh, replace the last paragraph in the script：

```shell
        exec "$JAVACMD" $JAVA_OPTS -server -Xmx2048m -Xms2048m -Xmn1024m -Xss512k -XX:SurvivorRatio=10 -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -XX:
MaxDirectMemorySize=1024m -XX:-OmitStackTraceInFastThrow -XX:-UseAdaptiveSizePolicy -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath="$BASEDIR"/logs
/java_heapdump.hprof -XX:+DisableExplicitGC -XX:+CMSParallelRemarkEnabled -XX:+
UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=75 -verbose:gc -Dio.netty.leakDetectionLevel=advanced \
          -classpath "$CLASSPATH" \
          -Dapp.name="seata-server" \
          -Dapp.pid="$$" \
          -Dapp.repo="$REPO" \
          -Dapp.home="$BASEDIR" \
          -Dbasedir="$BASEDIR" \
          io.seata.server.Server \
          "$@"
```

---

<h3 id='8'>Q: 8.When Eureka is the registry and TC is highly available, how to overwrite Eureka properties at the TC end?</h3>

**A:**
Add the eureka-client.properties file in the seata\conf directory and add the Eureka properties to be overwritten.
For example, to overwrite eureka.instance.lease-renewal-interval-in-seconds and eureka.instance.lease-expiration-duration-in-seconds, add the following:

```java
eureka.lease.renewalInterval=1
eureka.lease.duration=2
```

The attribute prefix is eureka, and the subsequent attribute names can refer to the class com.netflix.appinfo.PropertyBasedInstanceConfigConstants. You can also study the seata-discovery-eureka project of the discovery module in the seata source code.

---

<h3 id='9'>Q: 9.What's the reason of java.lang.NoSuchMethodError: com.fasterxml.jackson.databind.jsontype.TypeSerializer.typeId(Ljava/lang/Object;Lcom/fasterxml/jackson/core/JsonToken;) ?</h3>

**A:**
when the undolog serialization is configured as Jackson, the Jackson version needs to be 2.9.9+

---

<h3 id='10'>Q: 10. Why didn't my mybatis operation return auto-generated ID? </h3>

**A:**
plan1.You should update the configuraton of `mybatis`: set annotation `@Options(useGeneratedKeys = true, keyProperty = "id")` or set the value of useGeneratedKeys and keyProperty in `mybatis` xml configuraton
plan2.Delete the id field of the undo_log table

---

<h3 id='11'>Q: 11.I can't find this package:io.seata.codec.protobuf.generated,and cant't run seata server?</h3>

**A:**
You can execute this command: `./mvnw clean install -DskipTests=true` (Mac,Linux) or `mvnw.cmd clean install -DskipTests=true`, (Win)[reference issues/2438](https://github.com/apache/incubator-seata/issues/2438),These codes have been removed in version 0.8.1.

---

<h3 id='12'>Q: 12.How TC uses mysql8?</h3>

**A:**

1. Modify the driver configuration `store.db.driver-class-name` of `file.conf`;

2. Delete mysql5 driver and add mysql8 driver under lib directory

   ps: The same is true for Oracle; `1.2.0` supports MySQL driver multi version isolation without adding drivers

---

<h3 id='13'>Q: 13.Support multiple primary keys?</h3>

**A:**

For the time being, only MySQL is supported. For other types of databases, it is recommended to create a column of self incremented ID primary keys first, and change the original composite primary keys to unique keys to avoid the problem.

---

<h3 id='14'>Q: 14.How to solve the error reported by HikariDataSource?</h3>

**A:**

```markdown
**Error1**:ClassCastException: com.sun.proxy.$Proxy153 cannot be cast to com.zaxxer.hikari.HikariDataSource
**Reason**:Instance type conversion error during automatic proxy, injected with $Proxy153 instance, not HikariDataSource's own or subclass instance.
**Solution**: The Seata automatic proxy data source function uses JDK proxy to proxy DataSource. The generated proxy class extends Proxy implements DataSource can be changed by the receiver to DataSource receive implementation.
1.1.0 will support both JDK proxy and cglib, and cglib will also be able to switch to solve the problem.
```

---

<h3 id='15'>Q: 15.Can I write the configuration directly to application.properties without using the conf type configuration file?</h3>

**A:**

At present, `seata-all` needs to use conf type `conf` files, and `properties` and `yml` type files will be supported later. At present, you can rely on `seata-spring-boot-starter` in the project, and then write the configuration item to the `application.properties` so that the conf type file is not used.

---

<h3 id='16'>Q: 16.How to package seata-server after modifying the source code?</h3>

**A:**

1. Delete the `bin`,`conf`,and `lib` directories of the `distribution` module.
2. `./mvnw clean install -DskipTests=true(Mac,Linux)` OR `mvnw.cmd clean install -DskipTests=true(Win) -P release-seata`。
3. Unzip the corresponding compressed package in the target directory of the `distribution` module.
4. Packaging commands after seata-1.5 (the latest development branch), `mvn -Prelease-seata -Dmaven.test.skip=true clean install -U`
5. If you are on macOS platform with ARM architecture, please use: `mvn -Prelease-seata -Dmaven.test.skip=true clean install -U`

---

<h3 id='17'>Q: 17.What RPC frameworks does seata support now?</h3>

**A:**

```html
Dubbo, Spring Cloud, Motan, gRPC , sofa-RPC , EDAS-HSF and bRPC
```

---

<h3 id='18'>Q: 18. java.lang.NoSuchMethodError: com.alibaba.druid.sql.ast.statement
.SQLSelect.getFirstQueueBlockLcom/alibaba/druid/sql/ast/statement/SQLSelectQueryBlock;</h3>

**A：**

The dependent version of `druid` needs to be upgraded to version `1.1.12 +`, and the default dependent version in Seata is `1.1.12` (provided).

---

<h3 id='19'>Q: 19.NoSuchMethodError in apache-dubbo 2.7.0？</h3>

**A:**

When apache-dubbo loads the filter, it will load the filter of Alibaba Dubbo together, and it will be found in `com.alibaba.dubbo.rpc.invoker` in version `2.7.0`(`Result invoke(org.apache.dubbo.rpc.Invocation invocation) throws RpcException;`), Misuse of `org.apache.dubbo.rpc.invocation` to enter parameters (fixed in` 2.7.1`), resulting in `java.lang.NoSuchMethodError: com.alibaba.dubbo.rpc.Invoker.invoke(Lcom/alibaba/dubbo/rpc/Invocation;)Lcom/alibaba/dubbo/rpc/Result;`

So please upgrade `dubbo` to `2.7.1` or above to ensure compatibility. It is `alibaba-dubbo` and can be used safely. `alibaba-dubbo` does not contain `apache-dubbo` packages.

---

<h3 id='20'>Q: 20.What are the precautions for using AT mode?</h3>

**A:**

1. Proxy data sources must be used. There are three forms of proxy data sources:

- When relying on `seata-spring-boot-starter`, the data source is automatically proxied without additional processing.
- When relying on `seata-all`, use @EnableAutoDatasourceProxy (since 1.1.0) annotation. JDK proxy or cglib proxy can be selected as annotation parameters.
- When relying on `seata-all`, you can also manually wrap the DataSource with DatasourceProxy.

2. To configure `GlobalTransactionScanner`, you need to configure it manually when using `seata-all`, and no additional processing is required when using `seata-spring-boot-starter`.
3. The business table must contain a single column primary key. If there is a composite primary key, please refer to question 13.
4. Each business library must contain undo\_ log table. If it is used in conjunction with the sub-treasury and split-table component, can be sub-treasury but cannot be split-table
5. Transactions across microservice links need support for the corresponding RPC framework, which is currently supported in seata-all: `Apache Dubbo, Alibaba Dubbo, sofa-RPC, Motan, gRpc, httpClient`, for support from Spring Cloud, please kindly cite `spring-cloud-alibaba-seata`. Other self research framework, asynchronous model, message consumption transaction model please support itself in combination with the API.
6. The databases currently supported by AT mode are: MySQL, Oracle, PostgreSQL, and TIDB.
7. When opening distributed transactions with annotations, provider may not annotate transactions if the default service provider side joins transactions on the consumer side.However, provider similarly requires corresponding dependencies and configurations, and only annotations may be omitted.
8. On opening the distributed transactions with annotations, if transactions are required to roll back, the exception must be thrown to the originator of the transaction, perceived by the @GlobalTransactional annotation of the transaction originator.Provide directly throws exceptions or defines error code to throw exceptions again as judged by consumer.

---

<h3 id='21'>Q: 21.Why will the win system have one more empty line for the properties when configured with synchronization script?</h3>

**A:**

It is currently known why the configuration will have a `\r`, presumably because this file you write in win, so there are permutations to `\r\n`, and then you execute it with git bash (this can be considered Linux) to recognize `\n` permutations, so there is more `\r`

The solution is currently twofold:

1. `sed -i ""s/\r//"" config.txt`

2. `vim` into the text with the command `set fileformat = unix` (the pro test is available)

---

<h3 id='22'>Q: 22.What to note for the AT mode and Spring @Transactional annotation hyphenation?</h3>

**A:**

`@Transactional` can be coupled with `DataSourceTransactionManager` and `JTATransactionManager` to represent local transactions and XA distributed transactions, respectively. Common to everyone is the combination with local affairs.

When combined with local transactions`@Transactial` and `@GlobalTransactional` are hyphenated,`@Transactial` can only be located in the same method hierarchy annotated at `@GlobalTransaction` or within the inner layer of `@GlobalTransaction` annotation methods.

Here the concept of distributed transactions is larger than local transactions, annotating `@Transactional` outside results in a distributed transaction empty submission, a global transaction being submitted when the `@Transactional` corresponding connection submission is declared or the XID of the global transaction is absent.

---

<h3 id='23'>Q: 23.Spring boot 1.5.x appear the Jackson related NoClassDefFoundException?</h3>

**A:**

```
Caused by: java.lang.NoClassDefFoundError: Could not initialize class com.fasterxml.jackson.databind.ObjectMapper
```

It is currently found that too low a version of Jackson that was originally introduced in spring boot version 1.5.x, can cause Seata to rely on Jackson to find new features, Seata requires that the Jackson version 2.9.9+, but the use of the Jackson version 2.9.9 + version can cause the Jackson API used in spring boot to not find, and is a problem with forward compatibility in the Jackson itself. Therefore, it is recommended that you switch Seata's serialization to non Jackson serialization, such as kryo, with the configuration term `client.undo.logSerialization = "kryo"`

---

<h3 id='24'>Q: 24.SpringCloud/HTTP xid cannot transmit?</h3>

**A:**

1. If it is the springcloud application, make sure you have introduced `spring-cloud-starter-alibaba-seata` as a dependency.
2. If the xid hasn't been accepted yet, please confirm whether you have implemented the `WebMvcConfigurer`; if you have, please add `org.apache.seata.integration.http.TransactionPropagationInterceptor.SeataHandlerInterceptor` to your interception chain. You can refer to how `org.apache.seata.integration.http.SeataWebMvcConfigurer` is implemented.
3. If it isn't a SpringCloud application, you can use `org.apache.seata.integration.http.DefaultHttpExecutor#getInstance `to invoke http when necessary, or refer to its implementation and encapsulate the httpclient to transfer xid by yourself.

---

<h3 id='25'>Q: 25.undo_log cannot be deleted after using the mybatis plus dynamic data source component?</h3>

**A:**

The `dynamic-datasource-spring-boot-starter` component will automatically use `DataSourceProxy` to wrap the `DataSource` after opening Seata. Therefore, the following methods are required to maintain compatibility:

1. If you imported `seata-all`, please do not use @EnableAutoDatasourceProxy annotation
2. If you imported `seata-spring-boot-starter`, please turn off the automatic agent

```yaml
seata:
  enable-auto-data-source-proxy: false
```

---

<h3 id='26'>Q: 26. Could not found global transaction xid = %s, may be has finished.</h3>

**A:**

Examples：

@GlobalTransactional(timeout=60000)
public void A（）\{

 call remoting B();//Remote call B service
 local DB operation;

}

public void B() \{

}

Possible causes:

1. The overall execution time of service A exceeds 60000ms, causing the global transaction to initiate a global rollback. At this time, method A or B continues to execute DB operation, verify the global transaction status, and find that the global transaction has been rolled back.

2. When service B executes the readTimeout beyond its setting, it returns an exception to a and throws the exception, causing the global transaction to be rolled back. At this time, when service B performs the DB operation, it verifies the global transaction status and finds that the global transaction has been rolled back.

Impact: in this case, the data will be rolled back to the initial state of the data before the execution of method A. from the perspective of data consistency, the data is consistent as a whole.

---

<h3 id='27'>Q: 27. Why does TC reported this error: An exceptionCaught() event was fired, and it reached at the tail of the pipeline. It usually means the last handler in the pipeline did not handle the exception?</h3>

**A:**

This error is caused by the connection established by an abnormal Seata client (such as accessing the Seata server port through HTTP, port scanning of ECS, etc.). This connection does not send registration information and is considered a useless connection. This exception can be ignored.

---

<h3 id='28'>Q: 28. The database enables automatic update timestamp, which makes dirty data unable to be rolled back?</h3>

**A:**

Due to the business submission, after Seata records the current image, the database updates the timestamp again, resulting in the failure of image verification.

**Solution 1:** Turn off automatic timestamp update of the database. The timestamp update of data, such as modification and creation time, is maintained at the code level. For example, MybatisPlus can automatically fill in.

**Solution 2:**UPDATE statement don't put the fields that haven't been updated into the update statement.

---

<h3 id='29'>Q: 29. timeoutrollching occurs before the global transaction timeout?</h3>

**A:**

It is recommended that the time zone of TC database be inconsistent with the time zone of DB database.

---

<h3 id='30'>Q: 30. What database and table splitting solutions does Seata support at this stage?</h3>

**A:**

Only shardingsphere is supported at this stage. With regard to the compatibility of sub-treasury and split-table with Seata, Seata supports a sub database and sub table scheme by requiring the sub-treasury and split-table framework team to provide an integrated compatibility scheme, rather than Seata. At present, Seata is communicating with each sub-treasury and split-table framework team to discuss the integration compatibility scheme.

---

<h3 id='31'>Q: 31. What are the restrictions on Seata's address registered with the registry?</h3>

**A:**

The Seata registry cannot register addresses of 0.0.0.0 or 127.0.0.1. When the address is automatically registered as the above address, you can start the parameter `-h` or the container environment variable `SEATA_IP`. When the and business services are on different networks, the registered address can be specified as `NAT_IP` or `public network IP`, but it is necessary to ensure that the health inspection activities of the registration center are unobstructed.

---

<h3 id='32'>Q: 32. seata-server cannot be started due to Unrecognized VM option 'CMSParallelRemarkEnabled'
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.?</h3>

**A:**

This is due to the use of a higher version of JDK. The higher version of JDK cancels the CMS processor and replaces it with ZGC.

There are two solutions. Choose one of them:

1. Downgrade JDK version

2. Delete the JDK command of CMS in the startup script of Seata

---

<h3 id='33'>Q: 33. What is the scope of SQL support for Seata?</h3>

**A:**

Please refer to Appendix ->[SQL Reference](/docs/user/sqlreference/sql-restrictions/)

---

<h3 id='34'>Q: 34.What are the JDK version requirements for Seata? </h3>

**A:**

Currently, the JDK versions supported by Seata are JDK8 and 11. The remaining versions are not guaranteed to be 100% compatible

---

<h3 id='35'>Q: 35. When the length of Oracle's NUMBER exceeds 19, entities use Long mapping, which results in the inability to obtain row information, causing undo_log to be unable to be inserted and also unable to be rolled back? </h3>

**A:**

When the length of the NUMBER in Oracle exceeds 19, if Long is used, setObject will not be able to retrieve the data. Modifying the Long of the entity to BigInteger or BigDecimal can solve the problem.

---

<h3 id='36'>Q: 36. How to deal with the io.seata.rm.datasource.exec.LockConflictException: get global lock fail ? </h3>

**A:**

Failure to obtain a global lock is usually caused by distributed resource competition. Please ensure that the cycle of your resource competition is reasonable and that retries are properly implemented in your business. When a global transaction fails to acquire the lock, it should be restarted completely from the TM end of `@Globaltransational`.

Seata provides a "Global Lock Retry" feature. In versions prior to 1.5, this feature was not enabled by default when combined with the @Transactional annotation or when manually starting local transactions. It can be enabled through the following configuration (there is a possibility of deadlock due to the global lock and local lock competing for each other when facing a rollback). It is recommended to upgrade directly to version 1.5 or above. Do not modify this configuration item directly.

```properties
# Whether to roll back when encountering a global lock conflict, the default is true
client.rm.lock.retryPolicyBranchRollbackOnConflict=false
```

After enabling it, the default global lock retry logic is: the thread sleeps for 10ms and then compets for the global lock again, up to a maximum of 30 times

```properties
#You can modify the lock retry mechanism through these two configurations
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
```
In addition, you can also directly configure the retry logic separately on `@GlobalTransactional` or `@GlobalLock`, which has a higher priority than the global configuration of Seata

```java
@GlobalTransactional(lockRetryInternal = 100, lockRetryTimes = 30)  // v1.4.2
@GlobalTransactional(lockRetryInterval = 100, lockRetryTimes = 30)  // v1.5
```

---

<h3 id='37'>Q：37. Why does the java.nio.ByteBuffer.flip()Ljava/nio/ByteBuffer error occur when the client's JDK version is 1.8 when compiling and running？ </h3>

**A:**

This is because the seata source code was compiled and then the local seata dependency package was overwritten. JDK 11 was used when compiling the seata source code. In JDK 11, the `flip()` method was rewritten, resulting in incompatibility.

Solution:

- Make sure that the JDK version is 1.8 when compiling seata source code to avoid compatibility issues
- If you have compiled the source code of seata with JDK 11, please delete all packages under the io.seata path in the local maven repository. Then recompile your project and let the project re-pull the seata dependency package of the central warehouse

---

<h3 id='38'>Q：38. Why when using Apple M1 chip maven dependence, unable to download the dependence `com.google.protobuf:protoc:exe:3.3.0`? </h3>

**A:**

In the `serializer/seata-serializer-protobuf/pom.xml` file, the dependent versions are defined by identifying the operating system variables: `com. Google. Protobuf: protoc: 3.3.0: exe: ${OS. Detected. Classifier}`.
In the remote repository, there is no dependent version corresponding to Apple's M1 chip architecture.

Solution
This dependence to fixed version: `com. Google. Protobuf: protoc: 3.3.0: exe: osx - x86_64`, version can be downloaded to the remote warehouse corresponding dependencies.

---

<h3 id='39'>Q：39. Versions 1.4.2 and below throw "Cannot construct instance of 'java.time.LocalDateTime'" when rolling back </h3>

**A:**

Upgrade to version 1.5.0 or above

**B:**

Do not use mysql Driver 8.0.x version

**C:**

Introduce Kryo-related dependencies

```java
            <dependency>
                <groupId>com.esotericsoftware</groupId>
                <artifactId>kryo</artifactId>
                <version>4.0.2</version>
            </dependency>
            <dependency>
                <groupId>de.javakaffee</groupId>
                <artifactId>kryo-serializers</artifactId>
                <version>0.42</version>
            </dependency>
```

If the configuration center is file and the dependency is seata-all, please add the following configuration in the file.conf file of the application

```java
client {
  undo {
    logSerialization = "kryo"
    }
 }
```

If the configuration center is file and the dependency is seata-spring-boot-starter, you can convert it to yml format by yourself using yml

```
seata.client.undo.logSerialization=kryo
```

If it is a third-party configuration center such as nacos

Please use the configuration of the related seata group, adding a dataid namespace: client. Undo. LogSerialization, value of kryo

**D**:

Modify the datetime type in the database table to timestamp

**E:**

Refer to this [pr](https://github.com/apache/incubator-seata/pull/3738), can cover or extension SPI way with class a new analytic way

---

<h3 id='40'>Q: 40. What are the precautions when Seata-Server uses DB as the storage mode? </h3>

**A:**

- When using the DB storage mode, it is necessary to pay attention to using the corresponding version of the table creation script of the seata-server. The address obtained by the table creation script is: https://github.com/apache/incubator-seata/tree/${version}/script/server/db，such as：Obtain the table creation script corresponding to seata-server 1.5.0，Can get upgrade seata https://github.com/apache/incubator-seata/tree/1.5.0/script/server/db server before ever address need to change table structure first.
- Do not enable read-write separation for the backend DB that seata-server relies on. After enabling read-write separation, the latency varies depending on the synchronization mode, seata-server As a stateless computing node, all states need to be verified in the DB storage. In the case of a large master-slave synchronization delay, it will lead to inaccurate read states, thereby causing transaction logic processing problems. For higher read and write performance, the DB can set the isolation level to read committed.

---

<h3 id='41'>Q: 41. Did Oracle fail to roll back using the timestamp field type? </h3>

**A:**

- [seata/seata-plugin at develop · apache/incubator-seata (github.com)](https://github.com/apache/incubator-seata/tree/develop/seata-plugin) Pull this plugin code, package it locally and import it yourself, or you can directly copy the code for spi extension support.

---

<h3 id='42'>Q: 42. Did the transaction not roll back after an exception was thrown? </h3>

- Check if the exception has been caught and not thrown to the tm end. If rm has a global exception catcher,rm wraps the exception as a normal result response and gives it to tm, causing seata's transaction interceptor to fail to detect that the transaction has an exception. At this point, it will automatically check the code in the result within the code Return content that can determine if the business has an exception and throw an exception, or use [Seata api](/docs/user/api/) for rollback. Remember that api rollback must end the call. For example, if tm calls rm1 and an error occurs, api is performed If you roll back, you should not let this call chain go back to rm2. Instead, you should directly return to end the method call.
- Check whether the rm service throws an exception that causes the circuit breaker to be downgraded. If so, please refer to the above solution for handling.
- If it is confirmed that there is no such possibility, the exception is explicitly thrown. Please retrieve the resolution result of xid and the registration status of rm from the tc end and tm and rm through the relevant xid. When the rm branch is registered, Register branch successfully can be retrieved through xid. Xid = 10.242.2.19:8094:3404997337200687005. For the log with branchId = xxxx, if it does not indicate that the branch is not registered, and it is in AT or XA mode, please check the data source proxy or xid transfer issue. If the branch is registered, then check the resolution result, such as transaction commit,tm End there will be a similar [10.242.2.19:8094-3404997337200687005] commit status: Committed log, if is to rollback the relevant keyword to rollback status: Rollbacked, etc., if the exception resolution thrown is a commit, then in 99% of cases, it is an exception swallowed. Please carefully check the situations in the first and second points. Remember not to consider the log print stack as an exception stack thrown!!!!
- If the resolution result is rolled back but rm is not registered, you can determine whether there is a value at the rm calling end through Rootcontext.getXid. If there is no value, please refer to Q24.
- How to determine if a data source is a proxy? If it is in AT mode, please set a breakpoint in ConnectionProxy#registry to see if it will enter. If it is in XA mode, set a breakpoint in ConnectionProxyXA#commit to see if it will enter. Remember, it is a branch that does not roll back!!

---

<h3 id='43'>Q: 43. How to deal with the @FeignClient annotation url not working and the error prompt "Load balancer does not have available server for client"? </h3>

- This problem usually occurs when Zipkin is integrated with Seata.

Solution

- if you don't need to Feign link tracking, can through the Spring Cloud Sleuth provides the properties of the Spring. The Sleuth. Feign. Enabled = false to close it.
- if need to use at the same time, in the start class to rule out @ SpringBootApplication(exclude = \{SeataFeignClientAutoConfiguration.class})

Reconfigure the interceptor of Feign

```java
@Component
@ConditionalOnClass({RequestInterceptor.class, GlobalTransactional.class})
public class SetSeataInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {

        String currentXid = RootContext.getXID();
        if (!StringUtils.isEmpty(currentXid)) {
            template.header(RootContext.KEY_XID, currentXid);
        }
    }
}
```

---

<h3 id='44'>Q: 44. Why does the error "pk contains illegal character!" occur? </h3>

- Check if the primary key contains a comma.

---

<h3 id='45'>Q: 45. Why do namingserver and console require JDK 25 for packaging and compiling? & Why are namingserver and console not involved in the compilation and packaging process? </h3>

1. What changes have been made so far?
   - Currently, the target JDK compilation version for namingserver is set to 25, and a new profile has been added to ensure that namingserver and console are included in the compilation and packaging only in the JDK 25 environment.
   - ```
     <!-- profile: onlyBuildOnJDK25+ -->
             <profile>
                 <id>JDK25Plus</id>
                 <activation>
                     <jdk>[25,)</jdk>
                 </activation>
                 <modules>
                     <module>namingserver</module>
                     <module>console</module>
                 </modules>
             </profile>
     ```
   - If you use JDK25 or later versions, the namingserver and console modules will be excluded by default during compilation and packaging.
2. Why use JDK25?
   - In order to support the Spring AI dependencies introduced in the subsequent versions of namingserver and console, the versions of Spring Boot and JDK must be upgraded. Choosing JDK 25 as the target version not only meets the technical requirements of Spring AI, but also lays the foundation for the development of new functions and the adaptation of brand-new functions in the future, ensuring the forward-looking and scalability of the technology stack.

---