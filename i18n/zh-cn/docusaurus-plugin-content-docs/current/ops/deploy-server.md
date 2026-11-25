---
title: 直接部署
keywords: [Seata, Server, 部署]
description: Seata Server 支持多种方式部署：二进制包直接部署、NamingServer、Raft 集群、Docker、Docker Compose、Kubernetes、Helm。
---

# 部署 Server

Seata Server 支持二进制包直接部署以及 Docker、Docker Compose、Kubernetes、Helm 等多种容器化部署方式。

## 环境要求与端口说明

### JDK 要求

- **`seata-server`**：`2.x` 主干（2.7.0 及以上）需要 **JDK 17 及以上**；`2.6.0` 发行版兼容 JDK 8 / 17 / 21 / 25。
- **`seata-namingserver`**：需要 **JDK 25 及以上**。

### 默认端口汇总

| 组件 | 端口 | 用途 | 说明 |
| :--- | :--- | :--- | :--- |
| `seata-server` | `8091` | RPC 与 HTTP API 端口 | 基于 Netty-HTTP 复用端口，**不再使用 7091 端口** |
| `seata-server` | `9091` | Raft 选举与通信端口 | 仅在 Raft 模式下启用，默认为业务端口 `+ 1000` |
| `seata-server` | `9898` | Prometheus Metrics 端口 | 开启 `seata.metrics.enabled: true` 时启用 |
| `seata-namingserver` | `8081` | NamingServer / 控制台 / MCP | 自 2.4 起控制台已迁移至 NamingServer |

## 直接部署

### 1. 下载并解压

前往 [下载页面](/download/seata-server) 或 [GitHub Releases](https://github.com/apache/incubator-seata/releases) 下载对应版本的二进制包并解压：

```bash
tar -zxvf apache-seata-2.6.0-incubating-bin.tar.gz
cd apache-seata-2.6.0-incubating-bin
```

解压后包含两个独立组件目录：

- `seata-server/`：Seata TC 服务端（配置文件位于 `conf/application.yml`）
- `seata-namingserver/`：Seata 原生注册中心与控制台（配置文件位于 `conf/application.yml`）

### 2. 启动 `seata-server`

- Linux / macOS：

```bash
cd seata-server
sh ./bin/seata-server.sh start
```

停止或重启服务：

```bash
sh ./bin/seata-server.sh stop
sh ./bin/seata-server.sh restart
```

- Windows：

```cmd
cd seata-server
bin\seata-server.bat
```

### 支持的启动参数

| 参数 | 全写 | 作用 | 备注 |
| :--- | :--- | :--- | :--- |
| `-h` | `--host` | 指定注册到注册中心的 IP | **必须为 IPv4/IPv6 字面量**（2.x 禁止传主机名）；未指定时自动探测本机可用网卡 IP |
| `-p` | `--port` | 指定 Server 监听端口 | 默认为 `8091`，同时用于业务 RPC 与控制面 HTTP API |
| `-m` | `--storeMode` | 事务会话与锁统一存储模式 | 支持 `file`、`db`、`redis`，默认为 `file`（`raft` 请在 `application.yml` 中配置 `seata.store.mode: raft`） |
| `-ssm` | `--sessionStoreMode` | 事务会话（Session）存储模式 | 支持 `file`、`db`、`redis`，可与 `-lsm` 拆分开配 |
| `-lsm` | `--lockStoreMode` | 全局锁（Lock）存储模式 | 支持 `file`、`db`、`redis` |
| `-n` | `--serverNode` | 指定节点 ID | 如 `1`、`2`、`3`；未指定时默认按雪花算法自动生成 |
| `-e` | `--seataEnv` | 指定运行环境标识 | 如 `dev`、`test`，用于多环境配置隔离 |

示例：

```bash
sh ./bin/seata-server.sh -p 8091 -h 127.0.0.1 -m file
```

## 其他部署方式

- [部署 NamingServer（原生注册中心与控制台）](./deploy-namingserver)
- [部署 Raft 高可用集群](./deploy-server-raft)
- [使用 Docker 部署](./deploy-by-docker)
- [使用 Docker Compose 部署](./deploy-by-docker-compose)
- [使用 Kubernetes 部署](./deploy-by-kubernetes)
- [使用 Helm 部署](./deploy-by-helm)
- [高可用部署方案](./deploy-ha)
