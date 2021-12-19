---
hidden: true
title: 使用 Docker 部署 Seata Server
keywords: docker,docker-compose,ops
description: 使用 Docker 部署 Seata Server
author: helloworlde
date: 2019-11-25
---

# 使用 Docker 部署 Seata Server

## 注意事项 
- 避免直接拉取latest版本镜像，latest版本并不一定是released版本，为避免不必要的问题，请到[docker镜像仓库](https://hub.docker.com/r/seataio/seata-server/tags)确定要拉取的镜像版本。

## 快速开始 

#### 启动seata-server实例

```bash
$ docker run --name seata-server -p 8091:8091 seataio/seata-server:1.4.2
```

#### 指定seata-server IP和端口 启动

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -e SEATA_IP=192.168.1.1 \
        -e SEATA_PORT=8091 \
        seataio/seata-server
```

#### Docker compose 启动

`docker-compose.yaml` 示例

```yaml
version: "3"
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



## 容器命令行及查看日志

```bash
$ docker exec -it seata-server sh
```

```bash
$ docker logs -f seata-server
```

## 使用自定义配置文件

自定义配置文件需要通过挂载文件的方式实现，将宿主机上的 `registry.conf` 和 `file.conf` 挂载到容器中相应的目录

- 指定 registry.conf 

使用自定义配置文件时必须指定环境变量 `SEATA_CONFIG_NAME`, 并且值需要以`file:`开始, 如: `file:/root/seata-config/registry`

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
        -v /User/seata/config:/root/seata-config  \
        seataio/seata-server
```

其中 `-e` 用于配置环境变量， `-v` 用于挂载宿主机的目录

- 指定 file.conf 

如果需要同时指定 `file.conf` 配置文件，则需要在 `registry.conf` 文件中将 `config` 配置改为以下内容，`name` 的值为容器中对应的路径

```
config {
  type = "file"

  file {
    name = "file:/root/seata-config/file.conf"
  }
}
```

## 环境变量

seata-server 支持以下环境变量： 

- **SEATA_IP**

> 可选, 指定seata-server启动的IP, 该IP用于向注册中心注册时使用, 如eureka等

- **SEATA_PORT**

> 可选, 指定seata-server启动的端口, 默认为 `8091`

- **STORE_MODE**

> 可选, 指定seata-server的事务日志存储方式, 支持`db` ,`file`,redis(Seata-Server 1.3及以上版本支持), 默认是 `file`

- **SERVER_NODE**

> 可选, 用于指定seata-server节点ID, 如 `1`,`2`,`3`..., 默认为 `根据ip生成`

- **SEATA_ENV**

> 可选, 指定 seata-server 运行环境, 如 `dev`, `test` 等, 服务启动时会使用 `registry-dev.conf` 这样的配置

- **SEATA_CONFIG_NAME**

> 可选, 指定配置文件位置, 如 `file:/root/registry`, 将会加载 `/root/registry.conf` 作为配置文件，如果需要同时指定 `file.conf`文件，需要将`registry.conf`的`config.file.name`的值改为类似`file:/root/file.conf`：

