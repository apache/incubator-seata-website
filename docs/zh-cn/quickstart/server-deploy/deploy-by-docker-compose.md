---
hidden: true
title: 使用 Docker compose 快速部署 Seata Server
keywords: docker-compose,ops
description: 使用 Docker-compose 快速部署 Seata Server
author: zouwei
date: 2021-12-05
---

# 使用 docker-compose 部署 Seata Server

## 注意事项 
- 避免直接拉取latest版本镜像，latest版本并不一定是released版本，为避免不必要的问题，请到[docker镜像仓库](https://hub.docker.com/r/seataio/seata-server/tags)确定要拉取的镜像版本。

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
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
```

### <a id="file-db">无注册中心，DB存储</a>

> db模式需要在数据库创建对应的表结构，<a href="https://github.com/seata/seata/tree/develop/script/server/db">[建表脚本]</a>。

**（1）准备file.conf配置文件**

更多存储模式支持可参考<a href="https://github.com/seata/seata/blob/develop/script/config-center/config.txt">更多存储模式</a>

```properties
# 存储模式
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# 需要根据mysql的版本调整driverClassName
# mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
# mysql8以下版本的driver：com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# 注意根据生产实际情况调整参数host和port
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# 数据库用户名
store.db.user=
# 用户名密码
store.db.password=
```

**（2）准备registry.conf文件**

更多注册中心支持可参考<a href="https://seata.io/zh-cn/docs/user/registry/index.html">注册中心</a>

更多配置中心支持可参考<a href="https://seata.io/zh-cn/docs/user/configuration/index.html">配置中心</a>

直连模式（无注册中心）
```
registry {
  type = "file"
}

config {
  type = "file"
  
  file {
    name="file:/root/seata-config/file.conf"
  }
}
```

**（3）准备docker-compose.yaml文件**
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:${latest-release-version}
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 需要把file.conf和registry.conf都放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
```
### <a id="nacos-db">nacos注册中心，db存储</a>

> db模式需要在数据库创建对应的表结构，<a href="https://github.com/seata/seata/tree/develop/script/server/db">[建表脚本]</a>。

**（1）准备registry.conf文件**

nacos注册中心。

更多注册中心支持可参考<a href="https://seata.io/zh-cn/docs/user/registry/index.html">注册中心</a>

更多配置中心支持可参考<a href="https://seata.io/zh-cn/docs/user/configuration/index.html">配置中心</a>

```
registry {
  type = "nacos"
  
  nacos {
  # seata服务注册在nacos上的别名，客户端通过该别名调用服务
    application = "seata-server"
  # 请根据实际生产环境配置nacos服务的ip和端口
    serverAddr = "127.0.0.1:8848"
  # nacos上指定的namespace
    namespace = ""
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
}

config {
  type = "nacos"
  
  nacos {
    # 请根据实际生产环境配置nacos服务的ip和端口
    serverAddr = "127.0.0.1:8848"
    # nacos上指定的namespace
    namespace = ""
    group = "SEATA_GROUP"
    username = "nacos"
    password = "nacos"
  # 从v1.4.2版本开始，已支持从一个Nacos dataId中获取所有配置信息,你只需要额外添加一个dataId配置项
    dataId: "seataServer.properties"
  }
}
```

**（2）准备nacos配置中心配置**

更多存储模式支持可参考<a href="https://github.com/seata/seata/blob/develop/script/config-center/config.txt">更多存储模式</a>

> 你需要在nacos新建配置，此处dataId为seataServer.properties

```properties
# 存储模式
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# 需要根据mysql的版本调整driverClassName
# mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
# mysql8以下版本的driver：com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# 注意根据生产实际情况调整参数host和port
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# 数据库用户名
store.db.user=
# 用户名密码
store.db.password=
```


**（3）准备docker-compose.yaml文件**
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:${latest-release-version}
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      # 指定seata服务启动端口
      - SEATA_PORT=8091
      # 注册到nacos上的ip。客户端将通过该ip访问seata服务。
      # 注意公网ip和内网ip的差异。
      - SEATA_IP=127.0.0.1
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 因为registry.conf中是nacos配置中心，只需要把registry.conf放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
```

### <a id="ha-nacos-db">高可用部署</a>

> seata高可用依赖于注册中心、数据库，可不依赖配置中心。

> db模式需要在数据库创建对应的表结构，<a href="https://github.com/seata/seata/tree/develop/script/server/db">[建表脚本]</a>。

**（1）准备file.conf配置文件**

更多存储模式支持可参考<a href="https://github.com/seata/seata/blob/develop/script/config-center/config.txt">更多存储模式</a>

```properties
# 存储模式
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# 需要根据mysql的版本调整driverClassName
# mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
# mysql8以下版本的driver：com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# 注意根据生产实际情况调整参数host和port
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# 数据库用户名
store.db.user=
# 用户名密码
store.db.password=
```

**（2）准备registry.conf文件**

nacos注册中心。

更多注册中心支持可参考<a href="https://seata.io/zh-cn/docs/user/registry/index.html">注册中心</a>

更多配置中心支持可参考<a href="https://seata.io/zh-cn/docs/user/configuration/index.html">配置中心</a>

```
registry {
  type = "nacos"
  
  nacos {
  # seata服务注册在nacos上的别名，客户端通过该别名调用服务
    application = "seata-server"
  # nacos服务的ip和端口
    serverAddr = "127.0.0.1:8848"
  # nacos上指定的namespace
    namespace = ""
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
}

config {
  type = "file"
  
  file {
    name="file:/root/seata-config/file.conf"
  }
}
```

**（3）准备docker-compose.yaml文件**

> 只要保持配置一致，seata服务可在一台机器上部署多实例，也可同时部署在多台不同的主机下面实现服务高可用。
> [高可用部署](https://seata.io/zh-cn/docs/ops/deploy-ha.html)

```yaml
version: "3.1"
services:
  # seata服务1
  seata-server-1:
    image: seataio/seata-server:${latest-release-version}
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      # 指定seata服务启动端口
      - SEATA_PORT=8091
      # 注册到nacos上的ip。客户端将通过该ip访问seata服务。
      # 注意公网ip和内网ip的差异。
      - SEATA_IP=127.0.0.1
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 需要把file.conf和registry.conf都放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
  # seata服务2
  seata-server-2:
    image: seataio/seata-server:${latest-release-version}
    hostname: seata-server
    ports:
      - "8092:8092"
    environment:
      # 指定seata服务启动端口
      - SEATA_PORT=8092
      # 注册到nacos上的ip。客户端将通过该ip访问seata服务。
      # 注意公网ip和内网ip的差异。
      - SEATA_IP=127.0.0.1
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 需要把file.conf和registry.conf都放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
  
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
