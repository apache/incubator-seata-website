---
hidden: true
title: Docker compose部署
keywords: [docker-compose,ops]
description: 使用 Docker-compose 快速部署 Seata Server
author: zouwei
date: 2022-09-06
---

# 使用 docker-compose 部署 Seata Server

## 历史版本部署

[1.5.0以前版本](/docs/ops/deploy-by-docker-compose-142/)

[1.5.0以后版本(含1.5.0)](/docs/ops/deploy-by-docker-compose/)

## 注意事项 
- 避免直接拉取latest版本镜像，latest版本并不一定是稳定版本，为避免不必要的问题，请到[docker镜像仓库](https://hub.docker.com/r/seataio/seata-server/tags)确定要拉取的镜像版本。
- Seata Server 1.5.0版本开始，配置文件改为application.yml，所以在使用自定义配置的时候，需要先把原生配置拷贝出来。

## 使用自定义配置文件
为了获取seata server 1.5.0的配置文件，我们需要先启动一个seata server 1.5.0的服务，然后再从启动的容器实例中把默认的配置文件复制出来，再进行修改。

docker-compose.yaml
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:${latest-release-version}
    ports:
      - "7091:7091"
      - "8091:8091"
```
接下来通过`docker cp`命令把容器中`/seata-server/resources`位置的资源文件拷贝到宿主机指定位置。
在宿主机指定位置我们就可以看到对应的`application.yml`配置文件，相关的配置只需要修改这个文件即可。

> `application.yml`配置可参考[application.example.yml](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml)

## 快速开始 

* <a href="#file-file">无注册中心，file存储</a>
* <a href="#file-db">无注册中心，db存储</a>
* <a href="#nacos-db">nacos注册中心，db存储</a>
* <a href="#ha-nacos-db">高可用部署</a>

### <a id="file-file">无注册中心，file存储</a>

该模式下，不需要注册中心，也不需要任何第三方存储中心。

docker-compose.yaml
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:${latest-release-version}
    hostname: seata-server
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
```

### <a id="file-db">无注册中心，DB存储</a>

> db模式需要在数据库创建对应的表结构，<a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[建表脚本]</a>。

**（1）application.yml配置文件**

`application.yml`配置可参考[application.example.yml](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml)


更多存储模式支持可参考<a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">更多存储模式</a>

```yaml
server:
  port: 7091

spring:
  application:
    name: seata-server

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${user.home}/logs/seata
  extend:
    logstash-appender:
      destination: 127.0.0.1:4560
    kafka-appender:
      bootstrap-servers: 127.0.0.1:9092
      topic: logback_to_logstash

console:
  user:
    username: seata
    password: seata

seata:
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: file
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: file
  store:
    # support: file 、 db 、 redis
    mode: db
    db:
      datasource: druid
      dbType: mysql
      # 需要根据mysql的版本调整driverClassName
      # mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
      # mysql8以下版本的driver：com.mysql.jdbc.Driver
      driverClassName: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
      user: 用户名
      password: 密码
      
  #  server:
  #    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```

**（2）准备docker-compose.yaml文件**
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:1.5.2
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - STORE_MODE=db
      # 以SEATA_IP作为host注册seata server
      - SEATA_IP=seata_ip
      - SEATA_PORT=8091
    volumes:
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime"        #设置系统时区
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/timezone"  #设置时区
      # 假设我们通过docker cp命令把资源文件拷贝到相对路径`./seata-server/resources`中
      # 如有问题，请阅读上面的[注意事项]以及[使用自定义配置文件]
      - "./seata-server/resources:/seata-server/resources"
```
### <a id="nacos-db">nacos注册中心，db存储</a>

> db模式需要在数据库创建对应的表结构，<a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[建表脚本]</a>。

**（1）application.yml配置文件**

`application.yml`配置可参考[application.example.yml](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml)

nacos注册中心。

```yaml
server:
  port: 7091

spring:
  application:
    name: seata-server

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${user.home}/logs/seata
  extend:
    logstash-appender:
      destination: 127.0.0.1:4560
    kafka-appender:
      bootstrap-servers: 127.0.0.1:9092
      topic: logback_to_logstash

console:
  user:
    username: seata
    password: seata

seata:
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: nacos
    nacos:
      server-addr: nacos_ip:nacos_port
      namespace: seata-server
      group: SEATA_GROUP
      username: nacos
      password: nacos
      data-id: seataServer.properties

  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: nacos
    nacos:
      application: seata-server
      server-addr: nacos_ip:nacos_port
      group: SEATA_GROUP
      namespace: seata-server
      # tc集群名称
      cluster: default
      username: nacos
      password: nacos
#  server:
#    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```

**（2）准备nacos配置中心配置**

更多存储模式支持可参考<a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">更多存储模式</a>

> 你需要在nacos新建配置，此处dataId为seataServer.properties

```properties
store.mode=db
#-----db-----
store.db.datasource=druid
store.db.dbType=mysql
# 需要根据mysql的版本调整driverClassName
# mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
# mysql8以下版本的driver：com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
store.db.user= 用户名
store.db.password=密码
# 数据库初始连接数
store.db.minConn=1
# 数据库最大连接数
store.db.maxConn=20
# 获取连接时最大等待时间 默认5000，单位毫秒
store.db.maxWait=5000
# 全局事务表名 默认global_table
store.db.globalTable=global_table
# 分支事务表名 默认branch_table
store.db.branchTable=branch_table
# 全局锁表名 默认lock_table
store.db.lockTable=lock_table
# 查询全局事务一次的最大条数 默认100
store.db.queryLimit=100


# undo保留天数 默认7天,log_status=1（附录3）和未正常清理的undo
server.undo.logSaveDays=7
# undo清理线程间隔时间 默认86400000，单位毫秒
server.undo.logDeletePeriod=86400000
# 二阶段提交重试超时时长 单位ms,s,m,h,d,对应毫秒,秒,分,小时,天,默认毫秒。默认值-1表示无限重试
# 公式: timeout>=now-globalTransactionBeginTime,true表示超时则不再重试
# 注: 达到超时时间后将不会做任何重试,有数据不一致风险,除非业务自行可校准数据,否者慎用
server.maxCommitRetryTimeout=-1
# 二阶段回滚重试超时时长
server.maxRollbackRetryTimeout=-1
# 二阶段提交未完成状态全局事务重试提交线程间隔时间 默认1000，单位毫秒
server.recovery.committingRetryPeriod=1000
# 二阶段异步提交状态重试提交线程间隔时间 默认1000，单位毫秒
server.recovery.asynCommittingRetryPeriod=1000
# 二阶段回滚状态重试回滚线程间隔时间  默认1000，单位毫秒
server.recovery.rollbackingRetryPeriod=1000
# 超时状态检测重试线程间隔时间 默认1000，单位毫秒，检测出超时将全局事务置入回滚会话管理器
server.recovery.timeoutRetryPeriod=1000
```


**（3）准备docker-compose.yaml文件**
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:1.5.2
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - STORE_MODE=db
      # 以SEATA_IP作为host注册seata server
      - SEATA_IP=seata_ip
      - SEATA_PORT=8091
    volumes:
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime"        #设置系统时区
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/timezone"  #设置时区
      # 假设我们通过docker cp命令把资源文件拷贝到相对路径`./seata-server/resources`中
      # 如有问题，请阅读上面的[注意事项]以及[使用自定义配置文件]
      - "./seata-server/resources:/seata-server/resources"
```

### <a id="ha-nacos-db">高可用部署</a>

> seata高可用依赖于注册中心、数据库，可不依赖配置中心。
> 
> 请保证多个Seata Server使用同一个注册中心和同一个存储中心，这样才能形成高可用部署
> 

> db模式需要在数据库创建对应的表结构，<a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[建表脚本]</a>。


**（1）application.yml配置文件**

`application.yml`配置可参考[application.example.yml](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml)


更多存储模式支持可参考<a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">更多存储模式</a>

```yaml
server:
  port: 7091

spring:
  application:
    name: seata-server

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${user.home}/logs/seata
  extend:
    logstash-appender:
      destination: 127.0.0.1:4560
    kafka-appender:
      bootstrap-servers: 127.0.0.1:9092
      topic: logback_to_logstash

console:
  user:
    username: seata
    password: seata

seata:
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: nacos
    nacos:
      server-addr: nacos_ip:nacos_port
      namespace: seata-server
      group: SEATA_GROUP
      usernam: nacos
      password: nacos
      data-id: seataServer.properties

  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: nacos
    nacos:
      application: seata-server
      server-addr: nacos_ip:nacos_port
      group: SEATA_GROUP
      namespace: seata-server
      # tc集群名称
      cluster: default
      username: nacos
      password: nacos
    #  store:
    # support: file 、 db 、 redis
  #    mode: file
  #  server:
  #    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```

**（2）准备nacos配置中心配置**

更多存储模式支持可参考<a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">更多存储模式</a>

> 你需要在nacos新建配置，此处dataId为seataServer.properties

```properties
store.mode=db
#-----db-----
store.db.datasource=druid
store.db.dbType=mysql
# 需要根据mysql的版本调整driverClassName
# mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
# mysql8以下版本的driver：com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
store.db.user= 用户名
store.db.password=密码
# 数据库初始连接数
store.db.minConn=1
# 数据库最大连接数
store.db.maxConn=20
# 获取连接时最大等待时间 默认5000，单位毫秒
store.db.maxWait=5000
# 全局事务表名 默认global_table
store.db.globalTable=global_table
# 分支事务表名 默认branch_table
store.db.branchTable=branch_table
# 全局锁表名 默认lock_table
store.db.lockTable=lock_table
# 查询全局事务一次的最大条数 默认100
store.db.queryLimit=100


# undo保留天数 默认7天,log_status=1（附录3）和未正常清理的undo
server.undo.logSaveDays=7
# undo清理线程间隔时间 默认86400000，单位毫秒
server.undo.logDeletePeriod=86400000
# 二阶段提交重试超时时长 单位ms,s,m,h,d,对应毫秒,秒,分,小时,天,默认毫秒。默认值-1表示无限重试
# 公式: timeout>=now-globalTransactionBeginTime,true表示超时则不再重试
# 注: 达到超时时间后将不会做任何重试,有数据不一致风险,除非业务自行可校准数据,否者慎用
server.maxCommitRetryTimeout=-1
# 二阶段回滚重试超时时长
server.maxRollbackRetryTimeout=-1
# 二阶段提交未完成状态全局事务重试提交线程间隔时间 默认1000，单位毫秒
server.recovery.committingRetryPeriod=1000
# 二阶段异步提交状态重试提交线程间隔时间 默认1000，单位毫秒
server.recovery.asynCommittingRetryPeriod=1000
# 二阶段回滚状态重试回滚线程间隔时间  默认1000，单位毫秒
server.recovery.rollbackingRetryPeriod=1000
# 超时状态检测重试线程间隔时间 默认1000，单位毫秒，检测出超时将全局事务置入回滚会话管理器
server.recovery.timeoutRetryPeriod=1000
```

**（3）准备docker-compose.yaml文件**

> 只要保持配置一致，seata服务可在一台机器上部署多实例，也可同时部署在多台不同的主机下面实现服务高可用。
> [高可用部署](/docs/ops/deploy-ha/)

```yaml
version: "3.1"
services:
  seata-server-1:
    image: seataio/seata-server:${latest-release-version}
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - STORE_MODE=db
      # 以SEATA_IP作为host注册seata server
      - SEATA_IP=seata_ip
      - SEATA_PORT=8091
    volumes:
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime"        #设置系统时区
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/timezone"  #设置时区
      # 假设我们通过docker cp命令把资源文件拷贝到相对路径`./seata-server/resources`中
      # 如有问题，请阅读上面的[注意事项]以及[使用自定义配置文件]
      - "./seata-server/resources:/seata-server/resources"

  seata-server-2:
    image: seataio/seata-server:${latest-release-version}
    ports:
      - "7092:7091"
      - "8092:8092"
    environment:
      - STORE_MODE=db
      # 以SEATA_IP作为host注册seata server
      - SEATA_IP=seata_ip
      - SEATA_PORT=8092
    volumes:
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime"        #设置系统时区
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/timezone"  #设置时区
      # 假设我们通过docker cp命令把资源文件拷贝到相对路径`./seata-server/resources`中
      # 如有问题，请阅读上面的[注意事项]以及[使用自定义配置文件]
      - "./seata-server/resources:/seata-server/resources"

  # seata服务3......seata服务N
```

## 环境变量

seata-server 支持以下环境变量： 

- **SEATA_IP**

> 可选, 指定seata-server启动的IP, 该IP用于向注册中心注册时使用, 如eureka等

- **SEATA_PORT**

> 可选, 指定seata-server启动的端口, 默认为 `8091`

- **STORE_MODE**

> 可选, 指定seata-server的事务日志存储方式, 支持`db`, `file`, `redis`(Seata-Server 1.3及以上版本支持), 默认是 `file`

- **SERVER_NODE**

> 可选, 用于指定seata-server节点ID, 如 `1`,`2`,`3`..., 默认为 `根据ip生成`

- **SEATA_ENV**

> 可选, 指定 seata-server 运行环境, 如 `dev`, `test` 等, 服务启动时会使用 `registry-dev.conf` 这样的配置

- **SEATA_CONFIG_NAME**

> 可选, 指定配置文件位置, 如 `file:/root/registry`, 将会加载 `/root/registry.conf` 作为配置文件，如果需要同时指定 `file.conf`文件，需要将`registry.conf`的`config.file.name`的值改为类似`file:/root/file.conf`：
