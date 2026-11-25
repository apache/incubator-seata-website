---
hidden: true
title: Deploy Seata Server By Docker Compose
keywords: [Seata, Docker Compose, ops]
description: Deploy Seata Server and NamingServer quickly using Docker Compose.
author: zouwei
date: 2022-09-06
---

# Deploy Seata Server By Docker Compose

[View 1.4.2 and earlier legacy guide](./deploy-by-docker-compose-142)

## Precautions

- Avoid pulling `latest` directly in production. Check [DockerHub (`apache/seata-server`)](https://hub.docker.com/r/apache/seata-server/tags) and [DockerHub (`apache/seata-naming-server`)](https://hub.docker.com/r/apache/seata-naming-server/tags) to choose an explicit release tag.
- Since Seata 2.4, the Console has been moved to `seata-naming-server` (port `8081`). `seata-server` multiplexes RPC and HTTP APIs on port `8091` via Netty-HTTP (**port `7091` is no longer used**), and `console` / `seata.security` are removed from `seata-server`'s `application.yml`.
- Official images already set `TZ=Asia/Shanghai`; do not mount `/etc/timezone`.

## Using Custom Configuration Files

### 1. Export Default Configuration Files

Start a temporary container and copy default configurations from `/seata-server/resources`:

```bash
docker run -d --name seata-server-tmp apache/seata-server:2.6.0
mkdir -p ./seata-server/resources
docker cp seata-server-tmp:/seata-server/resources/. ./seata-server/resources/
docker rm -f seata-server-tmp
```

### 2. Edit Configuration

Edit `./seata-server/resources/application.yml` (see [application.example.yml](https://github.com/apache/incubator-seata/blob/2.x/server/src/main/resources/application.example.yml) for all options).

## Quick Start

- [No Registry, File Storage](#file-file)
- [NamingServer + Seata Server](#namingserver-server)
- [No Registry, DB Storage](#file-db)
- [Nacos Registry, DB Storage](#nacos-db)
- [Multi-Instance High Availability (Nacos + DB)](#ha-nacos-db)

### No Registry, File Storage {#file-file}

Suitable for local quick evaluation with no external dependencies. Create `docker-compose.yaml`:

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

Run `docker compose up -d`.

### NamingServer + Seata Server {#namingserver-server}

Seata NamingServer provides native service discovery and the Web Console on port `8081` (requires the JDK 25 image `2.6.0.jdk25`):

#### 1. Configure `./seata-server/resources/application.yml`

Register `seata-server` with NamingServer:

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

#### 2. Create `docker-compose.yaml`

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

### No Registry, DB Storage {#file-db}

Initialize the database tables using the [DB schema scripts](https://github.com/apache/incubator-seata/tree/2.x/script/server/db) first.

#### 1. Configure `application.yml` for DB Storage

Edit `./seata-server/resources/application.yml` (see [config.txt](https://github.com/apache/incubator-seata/blob/2.x/script/config-center/config.txt) for more store properties):

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

#### 2. Prepare `docker-compose.yaml`

```yaml
services:
  seata-server:
    image: apache/seata-server:2.6.0
    ports:
      - "8091:8091"
    environment:
      - STORE_MODE=db
      # Registered IP must be an IPv4/IPv6 literal
      - SEATA_IP=192.168.1.10
      - SEATA_PORT=8091
      - TZ=Asia/Shanghai
    volumes:
      - ./seata-server/resources:/seata-server/resources
```

### Nacos Registry, DB Storage {#nacos-db}

Create the required database tables using the [DB schema scripts](https://github.com/apache/incubator-seata/tree/2.x/script/server/db) first.

#### 1. Configure `application.yml` for Nacos

Configure Nacos as both configuration and registry center:

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

#### 2. Create `seataServer.properties` in Nacos

See [config.txt](https://github.com/apache/incubator-seata/blob/2.x/script/config-center/config.txt) for additional options:

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

#### 3. Prepare `docker-compose.yaml`

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

### Multi-Instance High Availability (Nacos + DB) {#ha-nacos-db}

Point multiple `seata-server` instances to the same registry center and database to form a highly available cluster (see [High Availability Deployment](./deploy-ha)). When running multiple containers on a single host, assign distinct listening and host ports (for example `8091` and `8092`):

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

## Environment Variables

| Environment Variable | Description | Default |
| :--- | :--- | :--- |
| `SEATA_IP` | Registered IP (must be an IPv4/IPv6 literal) | Auto-detected container IP |
| `SEATA_PORT` | `seata-server` listening port | `8091` |
| `STORE_MODE` | Unified session and lock store mode (`file`, `db`, `redis`) | `file` |
| `SESSION_STORE_MODE` | Session store mode | Inherits `STORE_MODE` |
| `LOCK_STORE_MODE` | Lock store mode | Inherits `STORE_MODE` |
| `SERVER_NODE` | Node ID | Auto-generated via Snowflake |
| `SEATA_ENV` | Multi-configuration environment identifier | Unset |
| `TZ` | Container timezone | `Asia/Shanghai` |
