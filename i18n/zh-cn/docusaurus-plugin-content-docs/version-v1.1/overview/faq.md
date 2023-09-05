---
title: FAQ
keywords: [Seata]
description: Seata 常见问题。
---

# 常见问题

<a href="#1" target="_self">1.Seata 目前可以用于生产环境吗？</a>
<br/>

<a href="#2" target="_self">2.Seata 目前支持高可用吗？</a>
<br/>

<a href="#3" target="_self">3.undo_log表log_status=1的记录是做什么用的？</a>
<br/>

<a href="#4" target="_self">4.怎么使用Seata框架，来保证事务的隔离性？</a>
<br/>

<a href="#5" target="_self">5.脏数据回滚失败如何处理?</a>
<br/>

<a href="#6" target="_self">6.为什么分支事务注册时, 全局事务状态不是begin？</a>
<br/>

<a href="#7" target="_self">7.Nacos 作为 Seata 配置中心时，项目启动报错找不到服务。如何排查，如何处理?</a>
<br/>

<a href="#8" target="_self">8.Eureka做注册中心，TC高可用时，如何在TC端覆盖Eureka属性?</a>
<br/>

<a href="#9" target="_self">9.java.lang.NoSuchMethodError: com.fasterxml.jackson.databind.jsontype.TypeSerializer.typeId(Ljava/lang/Object;Lcom/fasterxml/jackson/core/JsonToken;)?</a>
<br/>

<a href="#10" target="_self">10.为什么mybatis没有返回自增ID? </a>
<br/>

<a href="#11" target="_self">11.io.seata.codec.protobuf.generated不存在，导致seata server启动不了? </a>
<br/>

<a href="#12" target="_self">12.TC如何使用mysql8? </a>
<br/>

<a href="#13" target="_self">13.支持多主键? </a>
<br/>

<a href="#14" target="_self">14.使用HikariDataSource报错如何解决 ? </a>
<br/>

<a href="#15" target="_self">15.是否可以不使用conf类型配置文件，直接将配置写入application.properties? </a>
<br/>

<a href="#16" target="_self">16.如何自己修改源码后打包seata-server ? </a>
<br/>

<a href="#17" target="_self">17. Seata 支持哪些 RPC 框架 ？</a>
<br/>

<a href="#18" target="_self">18. java.lang.NoSuchMethodError: com.alibaba.druid.sql.ast.statement
.SQLSelect.getFirstQueueBlockLcom/alibaba/druid/sql/ast/statement/SQLSelectQueryBlock;</a>
<br/>

<a href="#19" target="_self">19. apache-dubbo 2.7.0出现NoSuchMethodError ？</a>
<br/>

<a href="#20" target="_self">20. 使用 AT 模式需要的注意事项有哪些 ？</a>
<br/>

<a href="#21" target="_self">21. win系统使用同步脚本进行同步配置时为什么属性会多一个空行？</a>
<br/>

<a href="#22" target="_self">22. AT 模式和 Spring @Transactional 注解连用时需要注意什么 ？</a>
<br/>

<a href="#23" target="_self">23. Spring boot 1.5.x 出现 jackson 相关 NoClassDefFoundException ？</a>
<br/>

<a href="#24" target="_self">24. SpringCloud xid无法传递 ？</a>
<br/>

<a href="#25" target="_self">25. 使用动态数据源后的常见问题 ？</a>
<br/>

<a href="#26" target="_self">26. Could not found global transaction xid = %s, may be has finished.</a>
<br/>

<a href="#27" target="_self">27. TC报这个错：An exceptionCaught() event was fired, and it reached at the tail of the pipeline. It usually means the last handler in the pipeline did not handle the exception是什么原因？</a>
<br/>

<a href="#28" target="_self">28. 数据库开启自动更新时间戳导致脏数据无法回滚？</a>
<br/>

<a href="#29" target="_self">29. 还没到全局事务超时时间就出现了timeoutrollcking?</a>
<br/>

<a href="#30" target="_self">30. Seata现阶段支持的分库分表解决方案？</a>
<br/>

<a href="#31" target="_self">31. Seata 使用注册中心注册的地址有什么限制？</a>
<br/>

<a href="#32" target="_self">32. seata-server cannot be started due to Unrecognized VM option 'CMSParallelRemarkEnabled'
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.导致seata-server无法启动？</a>
<br/>

<a href="#33" target="_self">33. Seata的SQL支持范围？</a>
<br/>

<a href="#34" target="_self">34. Seata的JDK版本要求？</a>
<br/>

<a href="#35" target="_self">35. Oracle的NUMBER长度超过19之后，实体使用Long映射，导致获取不到行信息，导致undo_log无法插入，也无法回滚？</a>
<br/>

<a href="#36" target="_self">36. 怎么处理 io.seata.rm.datasource.exec.LockConflictException: get global lock fail ? </a>
<br/>

<a href="#37" target="_self">37. 为什么在客户端在编译和运行时 JDK 版本都是 1.8 的情况下还会出现 java.nio.ByteBuffer.flip()Ljava/nio/ByteBuffer 错误 ? </a>
<br/>

<a href="#38" target="_self">38.   为什么在使用Apple的M1芯片下载maven依赖时，无法下载依赖`com.google.protobuf:protoc:exe:3.3.0`？ </a>
<br/>

<a href="#39" target="_self">39. 1.4.2及以下版本回滚时抛出Cannot construct instance of `java.time.LocalDateTime` </a>
<br/>

<a href="#40" target="_self">40. Seata-Server 使用 DB 作为存储模式时，有哪些注意事项？ </a>
<br/>

<a href="#41" target="_self">41. Oracle使用timestamp字段类型回滚失败？ </a>
<br/>

<a href="#42" target="_self">42. 抛出异常后事务未回滚？ </a>
<br/>

<a href="#43" target="_self">43. 怎么处理@FeignClient注解url不起效，提示 Load balancer does not have available server for client错误？ </a>
<br/>

********
<h3 id='1'>Q: 1.Seata 目前可以用于生产环境吗？</h3>

**A:** 
0.4.2版本之后就可以上生产环境，欢迎已经在使用的企业参与此issue:[who's using Seata](https://github.com/seata/seata/issues/1246)

********
<h3 id='2'>Q: 2.Seata 目前支持高可用吗？</h3>

**A:** 
0.6版本开始支持，tc使用db模式共享全局事务会话信息，注册中心使用非file的seata支持的第三方注册中心

********
<h3 id='3'>Q: 3.undo_log表log_status=1的记录是做什么用的？</h3>

**A:** 

* 场景 ： 分支事务a注册TC后，a的本地事务提交前发生了全局事务回滚
* 后果 ： 全局事务回滚成功，a资源被占用掉，产生了资源悬挂问题
* 防悬挂措施： a回滚时发现回滚undo还未插入，则插入一条log_status=1的undo记录，a本地事务（业务写操作sql和对应undo为一个本地事务）提交时会因为undo表唯一索引冲突而提交失败。

********
<h3 id='4'>Q: 4.怎么使用Seata框架，来保证事务的隔离性？</h3>

**A:** 
    因seata一阶段本地事务已提交，为防止其他事务脏读脏写需要加强隔离。
  1. 脏读 select语句加for update，代理方法增加@GlobalLock+@Transactional或@GlobalTransactional
  2. 脏写 必须使用@GlobalTransactional  
        注：如果你查询的业务的接口没有@GlobalTransactional 包裹，也就是这个方法上压根没有分布式事务的需求，这时你可以在方法上标注@GlobalLock+@Transactional 注解，并且在查询语句上加 for update。
        如果你查询的接口在事务链路上外层有@GlobalTransactional注解，那么你查询的语句只要加for update就行。设计这个注解的原因是在没有这个注解之前，需要查询分布式事务读已提交的数据，但业务本身不需要分布式事务。
        若使用@GlobalTransactional注解就会增加一些没用的额外的rpc开销比如begin 返回xid，提交事务等。GlobalLock简化了rpc过程，使其做到更高的性能。

********
<h3 id='5'>Q: 5.脏数据回滚失败如何处理?</h3>

**A:** 
  1. 脏数据需手动处理，根据日志提示修正数据或者将对应undo删除（可自定义实现FailureHandler做邮件通知或其他）
  2. 关闭回滚时undo镜像校验，不推荐该方案。  

    注：建议事前做好隔离保证无脏数据

********
<h3 id='6'>Q: 6.为什么分支事务注册时, 全局事务状态不是begin?</h3>

**A:**  
* 异常：Could not register branch into global session xid = status = Rollbacked（还有Rollbacking、AsyncCommitting等等二阶段状态） while expecting Begin
* 描述：分支事务注册时，全局事务状态需是一阶段状态begin，非begin不允许注册。属于seata框架层面正常的处理，用户可以从自身业务层面解决。
* 出现场景（可继续补充）
```
  1. 分支事务是异步，全局事务无法感知它的执行进度，全局事务已进入二阶段，该异步分支才来注册
  2. 服务a rpc 服务b超时（dubbo、feign等默认1秒超时），a上抛异常给tm，tm通知tc回滚，但是b还是收到了请求（网络延迟或rpc框架重试），然后去tc注册时发现全局事务已在回滚
  3. tc感知全局事务超时(@GlobalTransactional(timeoutMills = 默认60秒))，主动变更状态并通知各分支事务回滚，此时有新的分支事务来注册
```
********
<h3 id='7'>Q: 7.Nacos 作为 Seata 配置中心时，项目启动报错找不到服务。如何排查，如何处理?</h3>

**A：** 
   异常：io.seata.common.exception.FrameworkException: can not register RM,err:can not connect to services-server.
  1. 查看nacos配置列表，seata配置是否已经导入成功
  2. 查看nacos服务列表，serverAddr是否已经注册成功
  3. 检查client端的registry.conf里面的namespace，registry.nacos.namespace和config.nacos.namespace填入nacos的命名空间ID，默认""，server端和client端对应，namespace
为public是nacos的一个保留控件，如果您需要创建自己的namespace，最好不要和public重名，以一个实际业务场景有具体语义的名字来命名
  4. nacos上服务列表，serverAddr地址对应ip地址应为seata启动指定ip地址，如：sh seata-server.sh -p 8091 -h 122.51.204.197 -m file
  5. 查看seata/conf/nacos-config.txt 事务分组service.vgroupMapping.trade_group=default配置与项目分组配置名称是否一致
  6. telnet ip 端口 查看端口是都开放，以及防火墙状态  

    注：1.080版本启动指定ip问题，出现异常Exception in thread "main" java.lang.RuntimeException: java.net.BindException: Cannot assign request address，请升级到081以上版本  
        2.项目使用jdk13，启动出现
```verilog 
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.
```
        如环境为sh，替换脚本中最后一段：
```shell
        exec "$JAVACMD" $JAVA_OPTS -server -Xmx2048m -Xms2048m -Xmn1024m -Xss512k -XX:SurvivorRatio=10 -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -XX:MaxDirectMemorySize=1024m -XX:-OmitStackTraceInFastThrow -XX:-UseAdaptiveSizePolicy -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath="$BASEDIR"/logs/java_heapdump.hprof -XX:+DisableExplicitGC -XX:+CMSParallelRemarkEnabled -XX:+
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

********
<h3 id='8'>Q: 8.Eureka做注册中心，TC高可用时，如何在TC端覆盖Eureka属性?</h3>

**A：**
  在seata\conf目录下新增eureka-client.properties文件，添加要覆盖的Eureka属性即可。  
  例如，要覆盖eureka.instance.lease-renewal-interval-in-seconds和eureka.instance.lease-expiration-duration-in-seconds，添加如下内容：
```
eureka.lease.renewalInterval=1
eureka.lease.duration=2
```
  属性前缀为eureka，其后的属性名可以参考类com.netflix.appinfo.PropertyBasedInstanceConfigConstants，也可研究seata源码中的discovery模块的seata-discovery-eureka工程

********
<h3 id='9'>Q: 9.发生下面异常是啥原因？ java.lang.NoSuchMethodError: com.fasterxml.jackson.databind.jsontype.TypeSerializer.typeId(Ljava/lang/Object;Lcom/fasterxml/jackson/core/JsonToken;)?</h3>

**A:** 
undolog序列化配置为jackson时，jackson版本需要为2.9.9+

********
<h3 id='10'>Q: 10.为什么mybatis没有返回自增ID?</h3>

**A:** 
方案1.需要修改mybatis的配置: 在`@Options(useGeneratedKeys = true, keyProperty = "id")`或者在xml中指定useGeneratedKeys 和 keyProperty属性  
方案2.删除undo_log表的id字段
********
<h3 id='11'>Q: 11.io.seata.codec.protobuf.generated不存在，导致seata server启动不了?</h3>

**A:** 
本地执行下: `./mvnw clean install -DskipTests=true` (Mac,Linux) 或 `mvnw.cmd clean install -DskipTests=true` (Win), [参考issues/2438](https://github.com/seata/seata/issues/2438),相关代码在0.8.1已经移除。

********
<h3 id='12'>Q: 12.TC如何使用mysql8?</h3>

**A:** 1.修改file.conf的驱动配置store.db.driver-class-name;  2.lib目录下删除mysql5驱动,添加mysql8驱动  
ps: oracle同理;1.2.0支持mysql驱动多版本隔离，无需再添加驱动
********
<h3 id='13'>Q: 13.支持多主键?</h3>

**A:** 
目前支持mysql，oracle，pgsql，mariadb，其他类型数据库建议先建一列自增id主键，原复合主键改为唯一键来规避下

********
<h3 id='14'>Q: 14.使用HikariDataSource报错如何解决?</h3>

**A:** 
``` 
异常1:ClassCastException: com.sun.proxy.$Proxy153 cannot be cast to com.zaxxer.hikari.HikariDataSource
原因: 自动代理时，实例类型转换错误，注入的是$Proxy153实例，不是HikariDataSource的本身或子类实例。
解决: seata自动代理数据源功能使用jdk proxy, 对DataSource进行代理，生成的代理类 extends Proxy implements DataSource, 接收方可改成DataSource接收实现。
1.1.0将同时支持jdk proxy和cglib，届时该问题还可切换cglib解决。
```
********
<h3 id='15'>Q: 15.是否可以不使用conf类型配置文件，直接将配置写入application.properties?</h3>

**A:** 
目前seata-all是需要使用conf类型配置文件，后续会支持properties和yml类型文件。当前可以在项目中依赖seata-spring-boot-starter，然后将配置项写入到application
.properties 这样可以不使用conf类型文件。

********
<h3 id='16'>Q: 16.如何自己修改源码后打包seata-server?</h3>

**A:** 

```xml
1. 删除 distribution 模块的bin、conf和lib目录。
2. ./mvnw clean install -DskipTests=true(Mac,Linux) 或 mvnw.cmd clean install -DskipTests=true(Win) -P release-seata。
3. 在 distribution 模块的 target 目录下解压相应的压缩包即可。
4. seata-1.5之后(最新develop分支)的打包命令：mvn -Prelease-seata -Dmaven.test.skip=true clean install -U
```
********
<h3 id='17'>Q: 17.Seata 支持哪些 RPC 框架?</h3>

**A:** 

```
目前支持 Dubbo、Spring Cloud、Motan、gRPC、sofa-RPC、EDAS-HSF 和 bRPC 框架。
```
********
<h3 id='18'>Q: 18. java.lang.NoSuchMethodError: com.alibaba.druid.sql.ast.statement
.SQLSelect.getFirstQueueBlockLcom/alibaba/druid/sql/ast/statement/SQLSelectQueryBlock;</h3>
**A:** 

```
需要将druid的依赖版本升级至1.1.12+ 版本，Seata内部默认依赖的版本是1.1.12（provided）。

```
********

<h3 id='19'>Q: 19. apache-dubbo 2.7.0出现NoSuchMethodError ?</h3>

**A:** 

由于apache-dubbo 在加载Filter时,会将 alibaba-dubbo 的filter一并加载且 2.7.0 版本com.alibaba.dubbo.rpc.Invoker中   
``Result invoke(org.apache.dubbo.rpc.Invocation invocation) throws RpcException;``  
误使用了org.apache.dubbo.rpc.Invocation来入参(2.7.1修复),导致出现    

```java
java.lang.NoSuchMethodError: com.alibaba.dubbo.rpc.Invoker.invoke(Lcom/alibaba/dubbo/rpc/Invocation;)Lcom/alibaba/dubbo/rpc/Result;
```
所以请升级dubbo到2.7.1及以上,保证兼容.本身是alibaba-dubbo可放心使用,alibaba-dubbo并不包含apache-dubbo的包。   
参考链接:[issue](https://github.com/apache/dubbo/issues/3570),[PR](https://github.com/apache/dubbo/pull/3622/files)

********

<h3 id='20'>Q: 20. 使用 AT 模式需要的注意事项有哪些 ？</h3>

**A:** 

1. 必须使用代理数据源，有 3 种形式可以代理数据源：
- 依赖 seata-spring-boot-starter 时，自动代理数据源，无需额外处理。
- 依赖 seata-all 时，使用 @EnableAutoDataSourceProxy (since 1.1.0) 注解，注解参数可选择 jdk 代理或者 cglib 代理。
- 依赖 seata-all 时，也可以手动使用 DatasourceProxy 来包装 DataSource。
2. 配置 GlobalTransactionScanner，使用 seata-all 时需要手动配置，使用 seata-spring-boot-starter 时无需额外处理。
3. 业务表中必须包含单列主键，若存在复合主键，请参考问题 13 。
4. 每个业务库中必须包含 undo_log 表，若与分库分表组件联用，分库不分表。
5. 跨微服务链路的事务需要对相应 RPC 框架支持，目前 seata-all 中已经支持：Apache Dubbo、Alibaba Dubbo、sofa-RPC、Motan、gRpc、httpClient，对于 Spring Cloud 的支持，请大家引用 spring-cloud-alibaba-seata。其他自研框架、异步模型、消息消费事务模型请结合 API 自行支持。
6. 目前AT模式支持的数据库有：MySQL、Oracle、PostgreSQL和 TiDB。   
7. 使用注解开启分布式事务时，若默认服务 provider 端加入 consumer 端的事务，provider 可不标注注解。但是，provider 同样需要相应的依赖和配置，仅可省略注解。   
8. 使用注解开启分布式事务时，若要求事务回滚，必须将异常抛出到事务的发起方，被事务发起方的 @GlobalTransactional 注解感知到。provide 直接抛出异常 或 定义错误码由 consumer 判断再抛出异常。

********

<h3 id='21'>Q: 21. win系统使用同步脚本进行同步配置时为什么属性会多一个空行？</h3>

**A:** 

目前是知道为什么配置会有个\r，大概是因为这个文件你是在win编写的，所以有换行符为\r\n，然后你用git bash执行（这个可认为是linux）只认\n换行，所以就多了\r
解决办法目前有两个：
1、sed -i ""s/\r//"" config.txt
2、vim 进入文本，再用命令 set fileformat=unix（亲测可用）

********

<h3 id='22'>Q: 22. AT 模式和 Spring @Transactional 注解连用时需要注意什么 ？</h3>

**A:** 

@Transactional 可与 DataSourceTransactionManager 和 JTATransactionManager 连用分别表示本地事务和XA分布式事务，大家常用的是与本地事务结合。当与本地事务结合时，@Transactional和@GlobalTransactional连用，@Transactional 只能位于标注在@GlobalTransactional的同一方法层次或者位于@GlobalTransaction 标注方法的内层。这里分布式事务的概念要大于本地事务，若将 @Transactional 标注在外层会导致分布式事务空提交，当@Transactional 对应的 connection 提交时会报全局事务正在提交或者全局事务的xid不存在。

********
<h3 id='23'>Q: 23. Spring boot 1.5.x 出现 jackson 相关 NoClassDefFoundException ？</h3>

**A:** 

```xml
Caused by: java.lang.NoClassDefFoundError: Could not initialize class com.fasterxml.jackson.databind.ObjectMapper
```
目前发现在 Spring Boot 1.5.x 版本中原始引入的 jackson 版本过低，会导致 Seata 依赖 jackson 的新特性找不到，Seata 要求 jackson 版本2.9.9+，但是使用 jackson 2.9.9+ 版本会导致Spring Boot中使用的jackson API找不到，也就是jackson本身的向前兼容性存在问题。因此,建议大家将Seata的序列化方式切换到非 jackson 序列化方式，比如 kryo，配置项为client.undo.logSerialization = "kryo"



********

<h3 id='24'>Q: 24. SpringCloud xid无法传递 ？</h3>

**A:** 

1.首先确保你引入了`spring-cloud-starter-alibaba-seata`的依赖.

2.如果xid还无法传递,请确认你是否实现了WebMvcConfigurer,如果是,请参考com.alibaba.cloud.seata.web.SeataHandlerInterceptorConfiguration#addInterceptors的方法.把SeataHandlerInterceptor加入到你的拦截链路中.

------

<h3 id='25'>Q: 25. 使用动态数据源后的常见问题 ？</h3>

**A:**  使用dynamic-datasource-spring-boot-starter组件后undolog无法删除,或使用AbstractRoutingDataSource等动态数据源后无法正常回滚

dynamic-datasource-spring-boot-starter 组件内部开启seata后会自动使用DataSourceProxy来包装DataSource,所以需要以下方式来保持兼容

1.如果你引入的是seata-all,请不要使用@EnableAutoDataSourceProxy注解.

2.如果你引入的是seata-spring-boot-starter 请关闭自动代理

```yaml
seata:
  enable-auto-data-source-proxy: false
  
```

如果是后者,保证以上两项处理后,请不要手动代码AbstractRoutingDataSource等动态数据源,而是将其实际使用的物理datasource进行代理,具体可参考如下例子[seata-samples/DataSourceProxyConfig.java at master · seata/seata-samples (github.com)](https://github.com/seata/seata-samples/blob/master/multiple-datasource-mybatis-plus/src/main/java/io/seata/samples/mutiple/mybatisplus/config/DataSourceProxyConfig.java)

------



<h3 id='26'>Q: 26. Could not found global transaction xid = %s, may be has finished.</h3>

**A:**

举例说明：

@GlobalTransactional(timeout=60000)
public void A（）{

​	call remoting B();//远程调用B服务
​	local DB operation;

}

public void B(){

}

可能原因：

1. A 执行的总体时间超过了60000ms，导致全局事务发起了全局回滚，此时A或B方法继续执行DB操作，校验全局事务状态，发现全局事务已经回滚。

2. B服务执行超出其设定的readTimeout 返回异常给A并将异常抛出导致全局事务回滚，此时B服务执行DB操作时，校验全局事务状态，发现全局事务已经回滚。
   
3. tc集群节点时间不一致。

影响：出现这种情况时，数据会整体回滚至A方法执行前的数据的初态，从数据一致性的视角上看，数据是整体一致的。

除了上述情况，如果引用的是`seata-spring-boot-starter`的话，产生这个错误的原因也可能是因为一个bug，目前在1.5版本进行了修复，具体可以参考[issues4020](https://github.com/seata/seata/issues/4020)，[PR4039](https://github.com/seata/seata/pull/4039)。

------

<h3 id='27'>Q: 27. TC报这个错：An exceptionCaught() event was fired, and it reached at the tail of the pipeline. It usually means the last handler in the pipeline did not handle the exception是什么原因？</h3>

**A：**

这个错误是由非正常Seata客户端建立连接引起（如通过http访问Seata server的端口，云服务器的端口扫描等）。这种连接没有发送注册信息，被认为是无用连接，该异常可以忽视。

****

<h3 id='28'>Q: 28. 数据库开启自动更新时间戳导致脏数据无法回滚？</h3>

**A:**

由于业务提交，seata记录当前镜像后，数据库又进行了一次时间戳的更新，导致镜像校验不通过。

**解决方案1:**关闭数据库的时间戳自动更新。数据的时间戳更新，如修改、创建时间由代码层面去维护，比如MybatisPlus就能做自动填充。

**解决方案2:**update语句别把没更新的字段也放入更新语句。

****

<h3 id='29'>Q: 29. 还没到全局事务超时时间就出现了timeoutrollcking?</h3>

**A:**

有可能是多tc时区不一致导致的，建议将多个tc时区与db模式数据库时区保持一致统一。

****

<h3 id='30'>Q: 30. Seata现阶段支持的分库分表解决方案？</h3>

**A:**

现阶段只支持ShardingSphere。关于分库分表与Seata兼容的问题，Seata支持某一个分库分表方案是需要分库分表框架团队来提供集成兼容方案，而不是Seata提供。目前Seata正与各分库分表框架团队进行沟通来商讨集成兼容方案。

****

<h3 id='31'>Q: 31.Seata 使用注册中心注册的地址有什么限制？</h3>

**A:**

Seata 注册中心不能注册 0.0.0.0 或 127.0.0.1 的地址，当自动注册为上述地址时可以通过启动参数 -h 或容器环境变量SEATA_IP来指定。当和业务服务处于不同的网络时注册地址可以指定为 NAT_IP或公网IP，但需要保证注册中心的健康检查探活是通畅的。

****

<h3 id='32'>Q: 32.Unrecognized VM option 'CMSParallelRemarkEnabled'
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.导致seata-server无法启动？</h3>
**A:**

这个是因为使用了高版本的jdk导致。高版本的jdk取消了cms处理器，转而采用了zgc代替他。
解决方案有两个，选其中之一便可：
1、降级jdk版本
2、在seata的启动脚本中删除cms的jdk命令

****

<h3 id='33'>Q: 33.Seata的SQL支持范围？</h3>

**A:**

请参考附录->[SQL参考](http://seata.io/zh-cn/docs/user/sqlreference/sql-restrictions.html)

****

<h3 id='34'>Q: 34.Seata的JDK版本要求？</h3>

**A:**

目前Seata支持的JDK版本为JDK8、11。其余版本不确保100%兼容

****

<h3 id='35'>Q: 35.Oracle的NUMBER长度超过19之后，实体使用Long映射，导致获取不到行信息，导致undo_log无法插入，也无法回滚？</h3>

**A:**

Oracle的NUMBER长度超过19之后，用Long的话，setObject会查不出数据来，将实体的Long修改为BigInteger或BigDecimal即可解决问题。

***

<h3 id='36'>Q: 36.怎么处理 io.seata.rm.datasource.exec.LockConflictException: get global lock fail </h3>

**A:**

获取全局锁失败，一般是出现分布式资源竞争导致，请保证你竞争资源的周期是合理的，并且在业务上做好重试。当一个全局事务因为获取锁失败的时候，应该重新完整地从`@Globaltransational`的TM端重新发起。

Seata提供了一个“全局锁重试”功能，1.5之前的版本中默认在结合@Transactional注解或手动开启本地事务下未开启该，可以通过下面这个配置来开启(面临回滚时可能全局锁和本地锁互相争抢导致死锁的可能)。建议直接升级1.5及以上版本,不要直接改动这个配置项.
```properties
#遇到全局锁冲突时是否回滚，默认为true
client.rm.lock.retryPolicyBranchRollbackOnConflict=false
```
开启后，默认的全局锁重试逻辑是：线程sleep 10ms，再次争全局锁，最多30次
```properties
#你可通过这2个配置来修改锁重试机制
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
```
另外，你也可以直接在`@GlobalTransactional` 或者 `@GlobalLock`上单独配置重试逻辑，优先级比Seata全局配置更高
```java
@GlobalTransactional(lockRetryInternal = 100, lockRetryTimes = 30)  // v1.4.2
@GlobalTransactional(lockRetryInterval = 100, lockRetryTimes = 30)  // v1.5
```
***
<h3 id='37'>Q：37. 为什么在客户端在编译和运行时 JDK 版本都是 1.8 的情况下还会出现 java.nio.ByteBuffer.flip()Ljava/nio/ByteBuffer 错误 ? </h3>

**A:**

这是因为编译了 seata 源码然后覆盖了本地的 seata 依赖包的原因，在编译 seata 源码时使用了 JDK 11，而在 JDK 11 中由于改写了 `flip()` 方法，所以导致不兼容。

解决办法：
- 编译 seata 源码时确认 JDK 版本为 1.8，以免导致兼容问题
- 如果已经用 JDK 11 编译了 seata 的源码，请删除本地 maven 仓库下 io.seata 路径下所有包。然后重新编译你的项目，让项目重新拉取中央仓库的 seata 的依赖包

***

<h3 id='38'>Q：38. 为什么在使用Apple的M1芯片下载maven依赖时，无法下载依赖`com.google.protobuf:protoc:exe:3.3.0` ？</h3>

**A:**

在`serializer/seata-serializer-protobuf/pom.xml`文件中，依赖版本是通过识别操作系统变量定义的：`com.google.protobuf:protoc:3.3.0:exe:${os.detected.classifier}`。
在远程仓库中，不存在Apple的M1芯片架构对应的依赖版本。

解决方案：
将上述依赖改写为固定版本：`com.google.protobuf:protoc:3.3.0:exe:osx-x86_64`，即可到远程仓库下载对应版本依赖。

***

<h3 id='39'>Q：39. 1.4.2及以下版本回滚时抛出Cannot construct instance of `java.time.LocalDateTime` ？</h3>

**A:**

升级1.5.0及以上版本

**B:**

不要使用mysql driver8.0.x版本

**C:**

引入kryo相关依赖

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

如果配置中心是file,依赖是seata-all,请在应用的file.conf文件中添加如下配置

```java
client {
  undo {
    logSerialization = "kryo"
    }
 }
```

如果配置中心是file,依赖是seata-spring-boot-starter,使用yml 自行转成yml格式即可

```
seata.client.undo.logSerialization=kryo
```

如果是第三方配置中心如nacos

请在seata使用的配置相关group,namespace上添加dataid: client.undo.logSerialization,值为kryo

**D**:

修改数据库表中的datetime类型为timestamp

**E:**

参考此[pr](https://github.com/seata/seata/pull/3738)做法,可以用类覆盖或SPI方式扩展新的解析方式处理

****

<h3 id='40'>Q: 40. Seata-Server 使用 DB 作为存储模式时，有哪些注意事项？</h3>

**A:**

 - 使用 DB 存储模式时，需要注意使用相应seata-server对应版本的建表脚本，建表脚本获取地址：https://github.com/seata/seata/tree/${版本}/script/server/db，例如：获取seata-server 1.5.0 对应的建表脚本，可从此地址获取 https://github.com/seata/seata/tree/1.5.0/script/server/db 升级 seata-server 前需要先变更表结构。
 - seata-server 依赖的后端的DB，不要开启读写分离。开启读写分离后根据同步模式的不同延迟也有所不同，seata-server 
   为无状态计算节点，所有状态都需要到DB存储中校验，在主从同步延迟较大的情况下会导致读取的状态不准确从而导致事务逻辑处理问题。为了更高的读写性能，DB可将隔离级别设置为读已提交。



****

<h3 id='41'>Q: 41. Oracle使用timestamp字段类型回滚失败？</h3>

**A:**

 - [seata/seata-plugin at develop · seata/seata (github.com)](https://github.com/seata/seata/tree/develop/seata-plugin) 拉取此plugin代码,本地打包自行引入,也可直接拷贝代码进行spi扩展支持




****

<h3 id='42'>Q: 42. 抛出异常后事务未回滚？</h3>

 - 检查异常是否被捕获,没有抛至tm端,如rm存在全局异常捕获器,rm将异常包装成了一个正常的result响应给了tm,导致seata的事务拦截器无法发现事务出现了异常,此时自行在代码中根据result中的code之类可判断业务出现异常的返回内容进行抛出异常,或者使用[Seata api](https://seata.io/zh-cn/docs/user/api.html) 进行回滚,切记api回滚必须结束调用,假设tm调用了rm1就出现错误,进行了api回滚,那么不应该让这个调用链再走到rm2去,应该直接return结束方法调用
 - 检查是否rm服务抛出异常导致进行了熔断降级处理,如果是请参考方案上述方案进行处理
 - 如确认无上述可能,异常明确抛出,请通过相关的xid到tc端和tm和rm检索xid的决议结果和rm注册情况,当rm分支注册时,通过xid可以检索到Register branch successfully, xid = 10.242.2.19:8094:3404997337200687005 , branchId = xxxx的日志,如果没有说明分支没有注册,如是AT或XA模式请检查数据源代理或xid传递问题,如分支已注册,那么检查决议结果,如事务提交,tm端会有类似[10.242.2.19:8094:3404997337200687005] commit status: Committed的日志,如果是回滚那么相关关键字为rollback status: Rollbacked等,如果抛出异常决议缺是commit,那么99%的情况为异常被吞,请仔细检查第一点和第二点的情况,切记不要把日志打印堆栈认为是抛出了异常堆栈!!!!
 - 如决议结果是回滚,但是rm没注册,可在rm调用端通过Rootcontext.getXid来判断是否有值,如果无值请参考Q24
 - 如何判断数据源是否代理,如果是AT模式请在ConnectionProxy#registry打上断点,看是否会进入,XA模式ConnectionProxyXA#commit 打断点看是否会进入,切记是不回滚的分支!!!

****

<h3 id='43'>Q: 43. 怎么处理@FeignClient注解url不起效，提示 Load balancer does not have available server for client的问题？</h3>

 - 通常Zipkin与Seata整合的时候会出现该问题。

解决办法：
- 若不需要对Feign链路追踪，可以通过Spring Cloud Sleuth提供的属性spring.sleuth.feign.enabled=false来使其关闭。
- 若需要同时使用，在启动类加入排除@SpringBootApplication(exclude = {SeataFeignClientAutoConfiguration.class})

再配置Feign的拦截器
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
****
