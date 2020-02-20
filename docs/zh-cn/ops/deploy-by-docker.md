---
hidden: true
title: 使用 Docker 部署 Seata Server
keywords: docker,docker-compose,ops
description: 使用 Docker 部署 Seata Server
author: helloworlde
date: 2019-11-25
---

# 使用 Docker 部署 Seata Server

## 快速开始 

#### 启动seata-server实例

```bash
$ docker run --name seata-server -p 8091:8091 seataio/seata-server:latest
```

#### 指定自定义配置文件启动

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
        -v /PATH/TO/CONFIG_FILE:/root/seata-config  \
        seataio/seata-server
```

#### 指定seata-server IP 启动

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -e SEATA_IP=192.168.1.1 \
        seataio/seata-server
```

#### Docker compose 启动

`docker-conmpose.yaml` 示例

```yaml
version: "3"
services:
  seata-server:
    image: seataio/seata-server
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
```



## 容器命令行及查看日志

```bash
$ docker exec -it seata-server sh
```

```bash
$ tail -f /root/logs/seata/seata-server.log
```

## 使用自定义配置文件

默认的配置文件路径为 `/seata-server/resources`, 建议将自定义配置文件放到其他目录下; 使用自定义配置文件时必须指定环境变量 `SEATA_CONFIG_NAME`, 并且环境变量的值需要以`file:`开始, 如: `file:/root/seata-config/registry`

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
        -v /PATH/TO/CONFIG_FILE:/root/seata-config  \
        seataio/seata-server
```

## 环境变量

seata-server 支持以下环境变量： 

- **SEATA_IP**

> 可选, 指定seata-server启动的IP, 该IP用于向注册中心注册时使用, 如eureka等

- **SEATA_PORT**

> 可选, 指定seata-server启动的端口, 默认为 `8091`

- **STORE_MODE**

> 可选, 指定seata-server的事务日志存储方式, 支持`db` 和 `file`, 默认是 `file`

- **SERVER_NODE**

> 可选, 用于指定seata-server节点ID, 如 `1`,`2`,`3`..., 默认为 `1`

- **SEATA_ENV**

> 可选, 指定 seata-server 运行环境, 如 `dev`, `test` 等, 服务启动时会使用 `registry-dev.conf` 这样的配置

- **SEATA_CONFIG_NAME**

> 可选, 指定配置文件位置, 如 `file:/root/registry`, 将会加载 `/root/registry.conf` 作为配置文件