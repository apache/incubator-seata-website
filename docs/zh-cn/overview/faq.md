---
title: Seata常见问题
keywords: Seata
description: Seata 常见问题。
---

# 常见问题


<a href="#1" target="_self">1.Seata 目前可以用于生产环境吗？</a>

<a href="#2" target="_self">2.Seata 目前支持高可用吗？</a>

<a href="#3" target="_self">3.undo_log表log_status=1的记录是做什么用的？</a>

<a href="#4" target="_self">4.怎么使用Seata框架，来保证事务的隔离性？</a>

<a href="#5" target="_self">5.脏数据回滚失败如何处理?</a>

<a href="#6" target="_self">6.为什么分支事务注册时, 全局事务状态不是begin？</a>

<a href="#7" target="_self">7.Nacos 作为 Seata 配置中心时，项目启动报错找不到服务。如何排查，如何处理?</a>

<a href="#8" target="_self">8.Eureka做注册中心，TC高可用时，如何在TC端覆盖Eureka属性?</a>

<a href="#9" target="_self">9.java.lang.NoSuchMethodError: com.fasterxml.jackson.databind.jsontype.TypeSerializer.typeId(Ljava/lang/Object;Lcom/fasterxml/jackson/core/JsonToken;)?</a>

<a href="#10" target="_self">10.为什么mybatis没有返回自增ID? </a>

<a href="#11" target="_self">11.io.seata.codec.protobuf.generated不存在，导致seata server启动不了? </a>

<a href="#12" target="_self">12.TC如何使用mysql8? </a>

<a href="#13" target="_self">13.支持多主键? </a>

<a href="#14" target="_self">14.使用HikariDataSource报错如何解决 ? </a>   

<a href="#15" target="_self">15.是否可以不使用conf类型配置文件，直接将配置写入application.properties? </a>

<a href="#16" target="_self">16.如何自己修改源码后打包seata-server ? </a>

<a href="#17" target="_self">17. Seata 支持哪些 RPC 框架 ？</a>

<a href="#18" target="_self">18. java.lang.NoSuchMethodError: com.alibaba.druid.sql.ast.statement
.SQLSelect.getFirstQueueBlockLcom/alibaba/druid/sql/ast/statement/SQLSelectQueryBlock;</a>

 <a href="#19" target="_self">19. apache-dubbo 2.7.0出现NoSuchMethodError ？</a>

 <a href="#20" target="_self">20. 使用 AT 模式需要的注意事项有哪些 ？</a>

<a href="#21" target="_self">21. win系统使用同步脚本进行同步配置时为什么属性会多一个空行？</a>

<a href="#22" target="_self">22. AT 模式和 Spring @Transactional 注解连用时需要注意什么 ？</a>

<a href="#23" target="_self">23. Spring boot 1.5.x 出现 jackson 相关 NoClassDefFoundException ？</a>

<a href="#24" target="_self">24. SpringCloud xid无法传递 ？</a>

<a href="#25" target="_self">25. 使用mybatis-plus 动态数据源组件后undolog无法删除 ？</a>

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
  1. 脏读 select语句加for update，代理方法增加@GlobalLock+@Transactional或@GlobalTransaction
  2. 脏写 必须使用@GlobalTransaction  
        注：如果你查询的业务的接口没有GlobalTransactional 包裹，也就是这个方法上压根没有分布式事务的需求，这时你可以在方法上标注@GlobalLock+@Transactional 注解，并且在查询语句上加 for update。
        如果你查询的接口在事务链路上外层有GlobalTransactional注解，那么你查询的语句只要加for update就行。设计这个注解的原因是在没有这个注解之前，需要查询分布式事务读已提交的数据，但业务本身不需要分布式事务。
        若使用GlobalTransactional注解就会增加一些没用的额外的rpc开销比如begin 返回xid，提交事务等。GlobalLock简化了rpc过程，使其做到更高的性能。

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
暂时只支持mysql，其他类型数据库建议先建一列自增id主键，原复合主键改为唯一键来规避下

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

```
********
<h3 id='17'>Q: 17.Seata 支持哪些 RPC 框架?</h3>

**A:** 
```
1. AT 模式支持Dubbo、Spring Cloud、Motan、gRPC 和 sofa-RPC。
2. TCC 模式支持Dubbo、Spring Cloud和sofa-RPC。
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

@Transactional 可与 DataSourceTransactionManager 和 JTATransactionManager 
连用分别表示本地事务和XA分布式事务，大家常用的是与本地事务结合。当与本地事务结合时，@Transactional和@GlobalTransaction连用，@Transactional
只能位于标注在@GlobalTransaction的同一方法层次或者位于@GlobalTransaction 标注方法的内层。这里分布式事务的概念要大于本地事务，若将 @Transactional 标注在外层会导致分布式事务空提交，当@Transactional 对应的 connection 提交时会报全局事务正在提交或者全局事务的xid不存在。

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

1.首先确保你引入了spring-cloud-alibaba-seata的依赖.

2.如果xid还无法传递,请确认你是否实现了WebMvcConfigurer,如果是,请参考com.alibaba.cloud.seata.web.SeataHandlerInterceptorConfiguration#addInterceptors的方法.把SeataHandlerInterceptor加入到你的拦截链路中.

------

<h3 id='25'>Q: 25. 使用mybatis-plus 动态数据源组件后undolog无法删除 ？</h3>

**A:** 

dynamic-datasource-spring-boot-starter 组件内部开启seata后会自动使用DataSourceProxy来包装DataSource,所以需要以下方式来保持兼容

1.如果你引入的是seata-all,请不要使用@EnableAutoDataSourceProxy注解.

2.如果你引入的是seata-spring-boot-starter 请关闭自动代理

```yaml
seata:
  enable-auto-data-source-proxy: false
```



------

