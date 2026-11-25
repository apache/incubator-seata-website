---
hidden: true
title: Docker部署
keywords: [Seata, Docker, 容器部署, ops]
description: 使用 Docker 部署 Seata Server 与 NamingServer。
author: helloworlde
date: 2019-11-25
---

# 使用 Docker 部署 Seata Server

[查看 1.4.2 历史版本](./deploy-by-docker-142)

## 注意事项与镜像说明

- 请避免在生产环境直接拉取 `latest` 标签，建议前往 DockerHub（[`apache/seata-server`](https://hub.docker.com/r/apache/seata-server/tags) 与 [`apache/seata-naming-server`](https://hub.docker.com/r/apache/seata-naming-server/tags)）确认并固定具体版本标签。
- 自 Seata 2.4 起控制台已迁移至 `apache/seata-naming-server`（端口 `8081`）；`apache/seata-server` 使用 Netty-HTTP 复用 `8091` 端口，**不再使用 `7091` 端口**。
- 官方镜像已默认内置 `TZ=Asia/Shanghai`；如需调整时区，通过 `-e TZ=...` 设置即可，无需挂载 `/etc/timezone`。

### 可用镜像标签（以 `2.6.0` 为例）

| 镜像 | 标签示例 | 基础环境说明 |
| :--- | :--- | :--- |
| `apache/seata-server` | `2.6.0` | 基于 JDK 8（注：`2.x` 主干 2.7.0+ 需 JDK 17+） |
| `apache/seata-server` | `2.6.0.jdk17` / `2.6.0.jdk21` / `2.6.0.jdk25` | 对应 JDK 17 / 21 / 25 多架构镜像 |
| `apache/seata-naming-server` | `2.6.0.jdk25` | 基于 JDK 25，承载原生注册中心与控制台 |

## 快速开始

### 启动 `seata-server` 实例

```bash
docker run -d --name seata-server \
  -p 8091:8091 \
  apache/seata-server:2.6.0
```

若启用 Raft 模式，需同时暴露 Raft 端口 `9091`：

```bash
docker run -d --name seata-server \
  -p 8091:8091 \
  -p 9091:9091 \
  -v $(pwd)/seata-config:/seata-server/resources \
  -v $(pwd)/sessionStore:/seata-server/sessionStore \
  apache/seata-server:2.6.0
```

### 指定注册 IP 与端口启动

```bash
docker run -d --name seata-server \
  -p 8091:8091 \
  -e SEATA_IP=192.168.1.1 \
  -e SEATA_PORT=8091 \
  apache/seata-server:2.6.0
```

:::caution
`SEATA_IP` 必须传入具体的 IPv4 或 IPv6 地址字面量（如 `192.168.1.1`），`2.x` 版本在启动时会校验并拒绝传入主机名。
:::

### 启动 `seata-naming-server`（原生注册中心与控制台）

```bash
docker run -d --name seata-naming-server \
  -p 8081:8081 \
  apache/seata-naming-server:2.6.0.jdk25
```

详细配置说明请参考 [部署 NamingServer](./deploy-namingserver)。

## 容器命令行及查看日志

```bash
docker exec -it seata-server bash
docker logs -f seata-server
```

## 使用自定义配置文件

官方镜像内部配置文件位于 `/seata-server/resources/`。建议先启动一个临时容器拷贝出默认配置：

```bash
docker run -d --name seata-server-tmp apache/seata-server:2.6.0
mkdir -p ./seata-config
docker cp seata-server-tmp:/seata-server/resources/. ./seata-config/
docker rm -f seata-server-tmp
```

拷贝完成后，目录中会包含 `application.yml`、`application.example.yml`、`application.raft.example.yml` 和 `logback-spring.xml`。按需修改 `application.yml` 后，将其挂载回容器：

```bash
docker run -d --name seata-server \
  -p 8091:8091 \
  -e TZ=Asia/Shanghai \
  -v $(pwd)/seata-config:/seata-server/resources \
  -v $(pwd)/sessionStore:/seata-server/sessionStore \
  -v $(pwd)/logs:/root/logs/seata \
  apache/seata-server:2.6.0
```

若使用 `file` 或 `raft` 存储模式，务必挂载 `/seata-server/sessionStore`，以免容器重建时丢失事务会话数据。

## 环境变量

`seata-server` 支持以下常用环境变量：

| 环境变量 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `SEATA_IP` | 指定向注册中心注册的 IP（须为 IPv4/IPv6 字面量） | 自动探测容器网卡 IP |
| `SEATA_PORT` | 指定 `seata-server` 监听端口 | `8091` |
| `STORE_MODE` | 事务会话与锁统一存储模式，支持 `file`、`db`、`redis` | `file` |
| `SESSION_STORE_MODE` | 单独指定会话存储模式（`file`/`db`/`redis`） | 继承 `STORE_MODE` |
| `LOCK_STORE_MODE` | 单独指定全局锁存储模式（`file`/`db`/`redis`） | 继承 `STORE_MODE` |
| `SERVER_NODE` | 指定节点 ID（如 `1`、`2`、`3`） | 按雪花算法自动生成 |
| `SEATA_ENV` | 多环境配置隔离标识（如 `dev`、`test`） | 空 |
| `JVM_XMX` / `JVM_XMS` | JVM 最大 / 初始堆内存 | 未指定时按 cgroup 内存限额自动计算，回退 `2048m` |
| `JVM_MaxDirectMemorySize` | JVM 最大堆外内存 | `1024m` |
| `LOG_HOME` | 日志目录路径 | `$HOME/logs/seata` |
| `TZ` | 容器时区 | `Asia/Shanghai` |
