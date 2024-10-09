---
hidden: true
title: Deploy Seata Server By Docker Compose
keywords: [docker-compose,ops]
description: Deploy Seata Server By Docker Compose
author: zouwei
date: 2022-09-06
---

# Deploy Seata Server By Docker Compose

## Precautions
- Please avoid directly pulling the latest version image. The latest version is not necessarily a stable version. To avoid unnecessary problems, please go to [docker image warehouse](https://hub.docker.com/r/apache/seata-server/tags) to determine the image version to be pulled.
- Starting from Seata Server version 1.5.0, the configuration file has been changed to application.yml. So when using custom configuration, you need to copy the native configuration first.

## Use custom configuration file
In order to obtain the configuration file of seata server 1.5.0, we need to first start a service of seata server 1.5.0, then copy the default configuration file from the started container instance, and then modify it.

docker-compose.yaml
```yaml
version: "3.1"
services:
  seata-server:
    image: apache/seata-server:${latest-release-version}
    ports:
      - "7091:7091"
      - "8091:8091"
```

Next, copy the resource file in the `/seata-server/resources` location in the container to the specified location of the host through the `docker cp` command.
In the specified location of the host, we can see the corresponding `application.yml` configuration file, and the relevant configuration only needs to modify this file.

> The configuration of `application.yml` can refer to [application.example.yml](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml)

## Quick Start

* <a href="#file-file">No Registration Center, File Storage</a>
* <a href="#file-db">No Registration Center, db Storage</a>
* <a href="#nacos-db">Nacos Registration Center, db Storage</a>
* <a href="#ha-nacos-db">High Available Usage Deployment</a>

### <a id="file-file">No Registration Center, File Storage</a>

In this mode, there is no need for a registration center or any third-party storage center.

docker-compose.yaml
```yaml
version: "3.1"
services:
  seata-server:
    image: apache/seata-server:${latest-release-version}
    hostname: seata-server
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
```

### <a id="file-db">No Registration Center, db Storage</a>

> The db mode needs to create the corresponding table structure in the database, please refer to <a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[table creation script]</a>.

**（1）application.yml**

> The configuration of `application.yml` can refer to [application.example.yml](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml)

For more storage mode support, please refer to <a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">More Storage Modes</a>.

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
      # Need to adjust driverClassName according to mysql version
      # Driver corresponding to mysql8 and above versions is: com.mysql.cj.jdbc.Driver
      # Driver for versions below mysql8 is: com.mysql.jdbc.Driver
      driverClassName: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
      user: "username"
      password: "password"

  #  server:
  #    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```

**（2）Prepare file: docker-compose.yaml**
```yaml
version: "3.1"
services:
  seata-server:
    image: apache/seata-server:2.1.0
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - STORE_MODE=db
      # Register the seata server with SEATA_IP as the host
      - SEATA_IP=seata_ip
      - SEATA_PORT=8091
    volumes:
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime" # Set the system time zone
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/timezone"  # Set the time zone
      # Suppose we copy the resource file to the relative path `./seata-server/resources` via the `docker cp` command
      # If you have questions, please read [Precautions] and [Using Custom Configuration Files] above
      - "./seata-server/resources:/seata-server/resources"
```

### <a id="nacos-db">Nacos Registration Center, db Storage</a>

> The db mode needs to create the corresponding table structure in the database, please refer to <a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[table creation script]</a>.

**（1）application.yml**

> The configuration of `application.yml` can refer to [application.example.yml](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml)

Nacos Registration Center.

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
      # TC cluster name
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

**（2）Prepare nacos configuration center configuration**

For more storage mode support, please refer to <a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">More Storage Modes</a>.

> You need to create a new configuration in nacos, where the dataId is seataServer.properties


```properties
store.mode=db
#-----db-----
store.db.datasource=druid
store.db.dbType=mysql
# Need to adjust driverClassName according to mysql version
# Driver corresponding to mysql8 and above versions is: com.mysql.cj.jdbc.Driver
# Driver for versions below mysql8 is: com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
store.db.user= "username"
store.db.password= "password"
# Number of initial database connections
store.db.minConn=1
# Maximum number of database connections
store.db.maxConn=20
# Maximum wait time when getting connection. The default value is 5000 milliseconds.
store.db.maxWait=5000
# Global transaction table name. The default value is global_table.
store.db.globalTable=global_table
# Branch transaction table name. The default value is branch_table.
store.db.branchTable=branch_table
# Global lock table name. The default value is lock_table.
store.db.lockTable=lock_table
# Maximum number of global transactions queried at one time. The default value is 100.
store.db.queryLimit=100


# Undo retention days. The default value is 7 days, log_status=1 (Appendix 3) and undo that is not cleaned up properly
server.undo.logSaveDays=7
# Undo cleanup thread interval time. The default value is 86400000 milliseconds.
server.undo.logDeletePeriod=86400000
# Two-stage commit retry timeout. The units are ms, s, m, h, d, corresponding to milliseconds, seconds, minutes, hours, days, default milliseconds. The default value of -1 means unlimited retries.
# Formula: timeout>=now-globalTransactionBeginTime, if it's true means that the timeout will not be retried.
# Note: After the timeout period is reached, no retries will be made. So there is a risk of data inconsistency, unless the business can calibrate the data by itself, otherwise use with caution.
server.maxCommitRetryTimeout=-1
# Two-phase rollback retry timeout
server.maxRollbackRetryTimeout=-1
# Two-phase commit incomplete state Global transaction retry commit thread interval time. The default value is 1000 milliseconds.
server.recovery.committingRetryPeriod=1000
# Two-phase asynchronous commit status retry submission thread interval time. The default value is 1000 milliseconds.
server.recovery.asynCommittingRetryPeriod=1000
# Two-stage rollback state retry rollback thread interval time. The default value is 1000 milliseconds.
server.recovery.rollbackingRetryPeriod=1000
# Timeout Status Detection Retry Thread Interval. The default value is 1000 milliseconds, and if timeout is detected, then it puts the global transaction into the rollback session manager.
server.recovery.timeoutRetryPeriod=1000
```


**（3）Prepare file: docker-compose.yaml**
```yaml
version: "3.1"
services:
  seata-server:
    image: apache/seata-server:2.1.0
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - STORE_MODE=db
      # Register the seata server with SEATA_IP as the host
      - SEATA_IP=seata_ip
      - SEATA_PORT=8091
    volumes:
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime" # Set the system time zone
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/timezone"  # Set the time zone
      # Suppose we copy the resource file to the relative path `./seata-server/resources` via the `docker cp` command
      # If you have questions, please read [Precautions] and [Using Custom Configuration Files] above
      - "./seata-server/resources:/seata-server/resources"
```

### <a id="ha-nacos-db">High Available Usage Deployment</a>

> Seata high availability usage deployment relies on the registration center and database, but does not depend on the configuration center. <br/>
> Ensure that multiple Seata Servers use the same registry and the same storage center to form a highly available deployment.<br/>
> The db mode needs to create the corresponding table structure in the database,  please refer to <a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[table creation script]</a>.<br/>



**（1）application.yml**


> The configuration of `application.yml` can refer to [application.example.yml](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml)

For more storage mode support, please refer to <a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">More Storage Modes</a>.

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
      # TC cluster name
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

**（2）Prepare nacos configuration center configuration**

For more storage mode support, please refer to <a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">More Storage Modes</a>.

> You need to create a new configuration in nacos, where the dataId is seataServer.properties

```properties
store.mode=db
#-----db-----
store.db.datasource=druid
store.db.dbType=mysql
# Need to adjust driverClassName according to mysql version
# Driver corresponding to mysql8 and above versions is: com.mysql.cj.jdbc.Driver
# Driver for versions below mysql8 is: com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
store.db.user= "username"
store.db.password= "password"
# Number of initial database connections
store.db.minConn=1
# Maximum number of database connections
store.db.maxConn=20
# Maximum wait time when getting connection. The default value is 5000 milliseconds.
store.db.maxWait=5000
# Global transaction table name. The default value is global_table.
store.db.globalTable=global_table
# Branch transaction table name. The default value is branch_table.
store.db.branchTable=branch_table
# Global lock table name. The default value is lock_table.
store.db.lockTable=lock_table
# Maximum number of global transactions queried at one time. The default value is 100.
store.db.queryLimit=100

# Undo retention days. The default value is 7 days, log_status=1 (Appendix 3) and undo that is not cleaned up properly
server.undo.logSaveDays=7
# Undo cleanup thread interval time. The default value is 86400000 milliseconds.
server.undo.logDeletePeriod=86400000
# Two-stage commit retry timeout. The units are ms, s, m, h, d, corresponding to milliseconds, seconds, minutes, hours, days, default milliseconds. The default value of -1 means unlimited retries.
# Formula: timeout>=now-globalTransactionBeginTime, if it's true means that the timeout will not be retried.
# Note: After the timeout period is reached, no retries will be made. So there is a risk of data inconsistency, unless the business can calibrate the data by itself, otherwise use with caution.
server.maxCommitRetryTimeout=-1
# Two-phase rollback retry timeout
server.maxRollbackRetryTimeout=-1
# Two-phase commit incomplete state Global transaction retry commit thread interval time. The default value is 1000 milliseconds.
server.recovery.committingRetryPeriod=1000
# Two-phase asynchronous commit status retry submission thread interval time. The default value is 1000 milliseconds.
server.recovery.asynCommittingRetryPeriod=1000
# Two-stage rollback state retry rollback thread interval time. The default value is 1000 milliseconds.
server.recovery.rollbackingRetryPeriod=1000
# Timeout Status Detection Retry Thread Interval. The default value is 1000 milliseconds, and if timeout is detected, then it puts the global transaction into the rollback session manager.
server.recovery.timeoutRetryPeriod=1000
```

**（3）Prepare file: docker-compose.yaml**

> As long as the configuration is consistent, the seata service can be deployed on multiple instances on one machine or on multiple different hosts at the same time to achieve high service availability. <br />
> [High Availability Usage Deployment](/docs/ops/deploy-ha)

```yaml
version: "3.1"
services:
  seata-server-1:
    image: apache/seata-server:${latest-release-version}
    ports:
      - "7091:7091"
      - "8091:8091"
    environment:
      - STORE_MODE=db
      # Register the seata server with SEATA_IP as the host
      - SEATA_IP=seata_ip
      - SEATA_PORT=8091
    volumes:
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime" # Set the system time zone
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/timezone"  # Set the time zone
      # Suppose we copy the resource file to the relative path `./seata-server/resources` via the `docker cp` command
      # If you have questions, please read [Precautions] and [Using Custom Configuration Files] above
      - "./seata-server/resources:/seata-server/resources"

  seata-server-2:
    image: apache/seata-server:${latest-release-version}
    ports:
      - "7092:7091"
      - "8092:8092"
    environment:
      - STORE_MODE=db
      # Register the seata server with SEATA_IP as the host
      - SEATA_IP=seata_ip
      - SEATA_PORT=8091
    volumes:
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime" # Set the system time zone
      - "/usr/share/zoneinfo/Asia/Shanghai:/etc/timezone"  # Set the time zone
      # Suppose we copy the resource file to the relative path `./seata-server/resources` via the `docker cp` command
      # If you have questions, please read [Precautions] and [Using Custom Configuration Files] above
      - "./seata-server/resources:/seata-server/resources"

  # seata Service 3......seata Service N
```


## Environment variables

seata-server supports the following environment variables:

- **SEATA_IP**

> Optional. It specifies the IP started by seata-server. This IP is used when registering with the registration center, such as eureka, etc.

- **SEATA_PORT**

> Optional. It is used to specify the port where seata-server starts. The default port is `8091`.

- **STORE_MODE**

> Optional. It is used to specify the transaction log storage method of seata-server, supports `db`, `file`, `redis` (supported by Seata-Server 1.3 and above). The default value is `file`.

- **SERVER_NODE**

> Optional. It is used to specify the seata-server node ID, such as `1`,`2`,`3`... The default value is `generated based on ip`.

- **SEATA_ENV**

> Optional. It is used to specify the seata-server operating environment, such as `dev`, `test`, etc. When the service is started, configurations such as `registry-dev.conf` will be used.

- **SEATA_CONFIG_NAME**

> Optional. It is used to specify the configuration file location, such as `file:/root/registry`, which will load `/root/registry.conf` as the configuration file. If you need to specify the `file.conf` file at the same time, you need to change the value of `config.file.name` in `registry.conf` to something like `file:/root/file.conf`.
