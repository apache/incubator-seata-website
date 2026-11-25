---
hidden: true
title: Docker compose部署
keywords: [Seata, Docker Compose, ops]
description: 使用 Docker Compose 快速部署 Seata Server 与 NamingServer。
author: zouwei
date: 2022-09-06
---

# 使用 Docker Compose 部署 Seata Server

[查看 1.4.2 及以前历史版本](./deploy-by-docker-compose-142)

## 注意事项

- 请避免直接拉取 `latest` 标签，建议到 [DockerHub (`apache/seata-server`)](https://hub.docker.com/r/apache/seata-server/tags) 与 [DockerHub (`apache/seata-naming-server`)](https://hub.docker.com/r/apache/seata-naming-server/tags) 确认并固定所需版本。
- 自 Seata 2.4 起控制台已迁移至 `seata-naming-server`（默认端口 `8081`）；`seata-server` 基于 Netty-HTTP 复用 `8091` 端口，**不再使用 `7091` 端口**，其 `application.yml` 中也不再配置 `console` 或 `seata.security`。
- 镜像已默认设置 `TZ=Asia/Shanghai`，无需挂载宿主机 `/etc/timezone`。

## 使用自定义配置文件

### 1. 导出默认配置文件

先通过临时容器将 `/seata-server/resources` 下的默认配置文件拷贝到宿主机：

```bash
docker run -d --name seata-server-tmp apache/seata-server:2.6.0
mkdir -p ./seata-server/resources
docker cp seata-server-tmp:/seata-server/resources/. ./seata-server/resources/
docker rm -f seata-server-tmp
```

### 2. 编辑配置文件

编辑 `./seata-server/resources/application.yml`（完整配置项可参考 [application.example.yml](https://github.com/apache/incubator-seata/blob/2.x/server/src/main/resources/application.example.yml)）。

## 快速开始

- [无注册中心，file 存储](#file-file)
- [NamingServer + Seata Server 联调](#namingserver-server)
- [无注册中心，DB 存储](#file-db)
- [Nacos 注册中心，DB 存储](#nacos-db)
- [多实例高可用部署（Nacos + DB）](#ha-nacos-db)

### 无注册中心，file 存储 {#file-file}

该模式下无需注册中心和外部数据库，适合本地快速验证。创建 `docker-compose.yaml`：

```yaml
services:
  seata-server:
    image: apache/seata-server:2.6.0
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
      - TZ=Asia/Shanghai
    volumes:
      - ./sessionStore:/seata-server/sessionStore
```

启动：`docker compose up -d`。

### NamingServer + Seata Server 联调 {#namingserver-server}

Seata NamingServer 提供原生服务发现与 Web 控制台（`8081` 端口，需要 JDK 25 镜像 `2.6.0.jdk25`）：

#### 1. 配置 `./seata-server/resources/application.yml`

配置连接 NamingServer：

```yaml
server:
  port: 8091

spring:
  application:
    name: seata-server
  main:
    web-application-type: none

seata:
  config:
    type: file
  registry:
    type: seata
    seata:
      server-addr: seata-naming-server:8081
      cluster: default
      namespace: public
      username: seata
      password: seata
  store:
    mode: file
```

#### 2. 编写 `docker-compose.yaml`

```yaml
services:
  seata-naming-server:
    image: apache/seata-naming-server:2.6.0.jdk25
    container_name: seata-naming-server
    ports:
      - "8081:8081"
    environment:
      - SERVER_PORT=8081
      - TZ=Asia/Shanghai

  seata-server:
    image: apache/seata-server:2.6.0
    container_name: seata-server
    depends_on:
      - seata-naming-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
      - TZ=Asia/Shanghai
    volumes:
      - ./seata-server/resources:/seata-server/resources
      - ./sessionStore:/seata-server/sessionStore
```

### 无注册中心，DB 存储 {#file-db}

使用 `db` 模式前，请先执行 [建表脚本](https://github.com/apache/incubator-seata/tree/2.x/script/server/db) 创建所需数据库表。

#### 1. 配置 DB 存储的 `application.yml`

编辑 `./seata-server/resources/application.yml`（更多存储配置参见 [config.txt](https://github.com/apache/incubator-seata/blob/2.x/script/config-center/config.txt)）：

```yaml
server:
  port: 8091

spring:
  application:
    name: seata-server
  main:
    web-application-type: none

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${log.home:${user.home}/logs/seata}

seata:
  config:
    type: file
  registry:
    type: file
  store:
    mode: db
    db:
      datasource: druid
      db-type: mysql
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
      user: your_db_user
      password: your_db_password
```

#### 2. 准备 `docker-compose.yaml`

```yaml
services:
  seata-server:
    image: apache/seata-server:2.6.0
    ports:
      - "8091:8091"
    environment:
      - STORE_MODE=db
      # 以 SEATA_IP 作为向注册中心注册的 IP（须为 IPv4/IPv6 字面量）
      - SEATA_IP=192.168.1.10
      - SEATA_PORT=8091
      - TZ=Asia/Shanghai
    volumes:
      - ./seata-server/resources:/seata-server/resources
```

### Nacos 注册中心，DB 存储 {#nacos-db}

请先执行 [建表脚本](https://github.com/apache/incubator-seata/tree/2.x/script/server/db) 创建数据库表。

#### 1. 配置接入 Nacos 的 `application.yml`

配置 Nacos 作为配置中心与注册中心：

```yaml
server:
  port: 8091

spring:
  application:
    name: seata-server
  main:
    web-application-type: none

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${log.home:${user.home}/logs/seata}

seata:
  config:
    type: nacos
    nacos:
      server-addr: nacos_ip:8848
      namespace: seata-server
      group: SEATA_GROUP
      username: nacos
      password: nacos
      data-id: seataServer.properties
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: nacos_ip:8848
      group: SEATA_GROUP
      namespace: seata-server
      cluster: default
      username: nacos
      password: nacos
```

#### 2. 在 Nacos 配置中心创建配置

Data ID 为 `seataServer.properties`（更多配置项参考 [config.txt](https://github.com/apache/incubator-seata/blob/2.x/script/config-center/config.txt)）：

```properties
store.mode=db
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
store.db.user=your_db_user
store.db.password=your_db_password
store.db.minConn=1
store.db.maxConn=20
store.db.maxWait=5000
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.lockTable=lock_table
store.db.queryLimit=100

server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
```

#### 3. 准备 `docker-compose.yaml`

```yaml
services:
  seata-server:
    image: apache/seata-server:2.6.0
    ports:
      - "8091:8091"
    environment:
      - STORE_MODE=db
      - SEATA_IP=192.168.1.10
      - SEATA_PORT=8091
      - TZ=Asia/Shanghai
    volumes:
      - ./seata-server/resources:/seata-server/resources
```

### 多实例高可用部署（Nacos + DB） {#ha-nacos-db}

多个 `seata-server` 实例连接到同一个注册中心和同一个数据库即可组成高可用集群（详细架构参见 [高可用部署](./deploy-ha)）。如果在同一台宿主机启动多个容器实例，请注意区分每个实例的监听端口与映射端口（如 `8091` 和 `8092`）：

```yaml
services:
  seata-server-1:
    image: apache/seata-server:2.6.0
    ports:
      - "8091:8091"
    environment:
      - STORE_MODE=db
      - SEATA_IP=192.168.1.10
      - SEATA_PORT=8091
      - SERVER_NODE=1
      - TZ=Asia/Shanghai
    volumes:
      - ./seata-server/resources:/seata-server/resources

  seata-server-2:
    image: apache/seata-server:2.6.0
    ports:
      - "8092:8092"
    environment:
      - STORE_MODE=db
      - SEATA_IP=192.168.1.10
      - SEATA_PORT=8092
      - SERVER_NODE=2
      - TZ=Asia/Shanghai
    volumes:
      - ./seata-server/resources:/seata-server/resources
```

## 环境变量说明

| 环境变量 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `SEATA_IP` | 向注册中心注册的 IP（须为 IPv4/IPv6 字面量） | 自动探测容器 IP |
| `SEATA_PORT` | `seata-server` 监听端口 | `8091` |
| `STORE_MODE` | 事务会话与锁统一存储模式（`file`/`db`/`redis`） | `file` |
| `SESSION_STORE_MODE` | 事务会话存储模式 | 继承 `STORE_MODE` |
| `LOCK_STORE_MODE` | 全局锁存储模式 | 继承 `STORE_MODE` |
| `SERVER_NODE` | 节点 ID | 按雪花算法自动生成 |
| `SEATA_ENV` | 多环境配置隔离标识 | 空 |
| `TZ` | 容器时区 | `Asia/Shanghai` |
