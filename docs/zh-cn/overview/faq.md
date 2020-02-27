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

<a href="#14" target="_self">14.使用HikariDataSource报错如何解决? </a>   

<a href="#15" target="_self">15.是否可以不使用conf类型配置文件，直接将配置写入application.properties? </a>

<a href="#16" target="_self">16.如何自己修改源码后打包seata-server? </a>

<a href="#17" target="_self">17. 0.8、0.9版本如何升级到1.0版本？</a>

<a href="#18" target="_self">18. Seata 支持哪些 RPC 框架？</a>

<a href="#19" target="_self">19. java.lang.NoSuchMethodError: com.alibaba.druid.sql.ast.statement
.SQLSelect.getFirstQueueBlockLcom/alibaba/druid/sql/ast/statement/SQLSelectQueryBlock;</a>
 
 <a href="#20" target="_self">20. apache-dubbo 2.7.0出现NoSuchMethodError？</a>
 
 <a href="#21" target="_self">21. 升级到 seata 1.1.0 有哪些兼容性事项是需要注意的？</a>
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
* 防悬挂措施： a回滚时发现回滚undo还未插入，则插入一条log_status=1的undo记录，a本地事务（业务写操作sql和对应undo为一个本地事务）提交时会因为undo表主键冲突而提交失败。

********
<h3 id='4'>Q: 4.怎么使用Seata框架，来保证事务的隔离性？</h3>

**A:** 
    因seata一阶段本地事务已提交，为防止其他事务脏读脏写需要加强隔离。
  1. 脏读 select语句加for update，代理方法增加@GlobalLock或@GlobalTransaction
  2. 脏写 必须使用@GlobalTransaction  
        注：如果你查询的业务的接口没有GlobalTransactional 包裹，也就是这个方法上压根没有分布式事务的需求，这时你可以在方法上标注@GlobalLock 注解，并且在查询语句上加 for update。
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
需要修改mybatis的配置: 在`@Options(useGeneratedKeys = true, keyProperty = "id")`或者在xml中指定useGeneratedKeys 和 keyProperty属性

********
<h3 id='11'>Q: 11.io.seata.codec.protobuf.generated不存在，导致seata server启动不了?</h3>

**A:** 
本地执行下:mvn clean install -DskipTests=true,相关代码在0.8.1已经移除。

********
<h3 id='12'>Q: 12.TC如何使用mysql8?</h3>

**A:** 1.修改file.conf的驱动配置store.db.driver-class-name;  2.lib目录下删除mysql5驱动,添加mysql8驱动  
ps: oracle同理
********
<h3 id='13'>Q: 13.支持多主键?</h3>

**A:** 
暂不支持，建议先建一列自增id主键，原复合主键改为唯一键来规避下

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
2. mvn clean install -DskipTests=true -P release-seata。
3. 在 distribution 模块的 target 目录下解压相应的压缩包即可。

```
********
<h3 id='17'>Q: 17. 0.8、0.9版本如何升级到1.0版本？</h3>

**A:** 
* （可选）1.0支持yml、properties，需用seata-spring-boot-starter替换掉seata-all
* （必选）TC端表lock_table字段branch_id增加普通索引
* （可选）部分参数命名改动，<a href="https://seata.io/zh-cn/docs/user/configurations.html" target="_blank">点击查看参数配置</a>
* （可选） client.report.success.enable可以置为false，提升性能

********
<h3 id='18'>Q: 18.Seata 支持哪些 RPC 框架?</h3>

**A:** 
```
1. AT 模式支持Dubbo、Spring Cloud、Motan、gRPC 和 sofa-RPC。
2. TCC 模式支持Dubbo 和 sofa-RPC。

```
********
<h3 id='19'>Q: 19. java.lang.NoSuchMethodError: com.alibaba.druid.sql.ast.statement
.SQLSelect.getFirstQueueBlockLcom/alibaba/druid/sql/ast/statement/SQLSelectQueryBlock;</a>

**A:** 
```
需要将druid的依赖版本升级至1.1.12+ 版本，Seata内部默认依赖的版本是1.1.12（provided）。

```
********

<h3 id='20'>Q: 20. apache-dubbo 2.7.0出现NoSuchMethodError ?</h3>

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

<h3 id='21'>Q: 21. 升级到 seata 1.1.0 有哪些兼容性事项是需要注意的？</a>

**A:** 

1. 需要注意配置项的兼容性，1.1.0 版本对于配置项的风格进行了统一。
若程序中依赖的是 seata-all，对应于 *.conf 文件，conf文件中配置项的命名风格统一为 点号+驼峰式组合，[1.1.0 配置项说明](https://seata.io/zh-cn/docs/user/configurations.html)， [1.1.0 配置参考](https://github.com/seata/seata/tree/1.1.0/script/client/conf); 
若程序中依赖的是seata-spring-boot-starter，对应于 *.properties 或 *.yml。propertie、 yml文件命名风格统一为 点号+中划线组合 
[1.1.0 配置参考](https://github.com/seata/seata/tree/1.1.0/script/client/spring) 需要特别注意的是1.0.0 版本配置项 seata.service
.vgroup-mapping=default 1.1.0 更改为: seata.service.vgroup-mapping
.my_test_tx_group=default,其中my_test_tx_group代表程序所使用的事务分组； 1.0.0 版本配置项seata.service.grouplist=127.0.0.1:8091 1.1.0 
更改为：seata.service.grouplist.default=127.0.0.1:8091 其中 default 代表 seata注册服务名。

2. seata-all 默认不开启数据源自动代理。原 seata-all中 conf 文件配置项
client.support.spring.datasource.autoproxy 配置项失效，由注解 @EnableAutoDataSourceProxy 
注解代替，注解参数可选择使用jdk代理或者cglib代理，当使用HikariDataSource 时推荐使用 cglib 代理模式。
seata-spring-boot-starter 默认开启数据源代理，对应数据源自动代理配置项与1.0.0 版本保持不变。

3. 使用spring cloud框架时需要使用[Spring Cloud Alibaba](https://github.com/alibaba/spring-cloud-alibaba)来进行seata 
事务上下文的传递，与Spring Cloud Alibaba 版本集成依赖关系，参考 [版本说明](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)     
spring-cloud-alibaba-seata 在 2.2.0.RELEASE 版本前 依赖的是seata-all 若继续使用低版本的 spring-cloud-alibaba-seata 可以使用高版本的 seata-all 取代内置的 seata-all 版本；   
从spring-cloud-alibaba-seata 在 2.2.0.RELEASE 开始后（含）内部开始依赖seata-spring-boot-starter,2.2.0.RELEASE 内部集成 
seata-spring-boot-starter 1.0.0 可以升级为 seata-spring-boot-starter 1.1.0，seata-spring-boot-starter 集成了seata-all，seata-spring-boot-starter 包装了对于properties或yml 配置的autoconfig 功能，在spring-cloud-alibaba-seata 2.2.0.RELEASE 前 
autoconfig 功能由其本身支持，在其后去掉 spring-cloud-alibaba-seata 中关于 seata 本身的autoconfig 由seata-spring-boot-starter 支持，因此低版本spring-cloud-alibaba-seata 只能配合 seata-all使用，高版本spring-cloud-alibaba-seata 只能配合seata-spring-boot-starter 使用，以2.2.0.RELEASE为分界点。

4. TC端采用 db 存储模式时 branch_table 中增加 gmt_create，gmt_modified 字段的精度，用于精确确认回滚的顺序，
[各数据库脚本参考](https://github.com/seata/seata/tree/1.1.0/script/server/db)

********