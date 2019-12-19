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
  5. 查看seata/conf/nacos-config.txt 事务分组service.vgroup_mapping.trade_group=default配置与项目分组配置名称是否一致
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
