---
hidden: true
title: Docker部署
keywords: [docker,docker-compose,ops]
description: 使用 Docker 部署 Seata Server
author: helloworlde
date: 2019-11-25
---

# 使用 Docker 部署 Seata Server (1.5.0及以上)

<a href="./deploy-by-docker-142">查看1.4.2版本</a>

## 注意事项
- 避免直接拉取latest版本镜像，latest版本并不一定是稳定版本，为避免不必要的问题，请到[docker镜像仓库](https://hub.docker.com/r/seataio/seata-server/tags)
  确定要拉取的镜像版本。
- 若docker显示的`date`时间不正确，可通过以下方式之一设置。
    - 加入docker环境变量 TZ=Asia/Shanghai
    - 挂载宿主机的时区配置 -v /etc/localtime:/etc/localtime -v /etc/timezone:/etc/timezone
## 快速开始 

#### 启动seata-server实例

```bash
$ docker run --name seata-server -p 8091:8091 -p 7091:7091 seataio/seata-server:1.5.0
```

#### 指定seata-server IP和端口 启动

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -p 7091:7091 \
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
      - "7091:7091"
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

自定义配置文件需要通过挂载文件的方式实现，将宿主机上的 `application.yml`  挂载到容器中相应的目录

首先启动一个用户将resources目录文件拷出的临时容器

```
docker run -d -p 8091:8091 -p 7091:7091  --name seata-serve seataio/seata-server:latest
docker cp seata-serve:/seata-server/resources /User/seata/config
```

拷出后可以,可以选择修改application.yml再cp进容器,或者rm临时容器,如下重新创建,并做好映射路径设置

- 指定 application.yml

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -p 7091:7091 \
        -v /User/seata/config:/seata-server/resources  \
        seataio/seata-server
```

其中 `-e` 用于配置环境变量， `-v` 用于挂载宿主机的目录,如果是以file存储模式运行,请加上-v /User/seata/sessionStore :/seata-server/sessionStore 将file的数据文件映射到宿主机,以防数据丢失(注:/User/seata/config和/User/seata/sessionStore可自定义宿主机目录,无需照搬)

接下来你可以看到宿主机对应目录下已经有了,logback-spring.xml,application.example.yml,application.yml 如果比较熟悉springboot,那么接下来就很简单了,只需要修改application.yml即可,详细配置可以参考application.example.yml,该文件存放了所有可使用的详细配置

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

