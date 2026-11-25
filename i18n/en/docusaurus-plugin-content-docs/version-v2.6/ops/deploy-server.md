---
title: Deploy Server
keywords: [Seata, Server, Deployment]
description: Seata Server can be deployed directly from a binary package or via NamingServer, Raft, Docker, Docker Compose, Kubernetes, or Helm.
---

# Deploy Server

Seata Server can be deployed directly from a binary distribution or via container platforms such as Docker, Docker Compose, Kubernetes, and Helm.

## Prerequisites and Ports

### JDK Requirements

- **`seata-server`**: The `2.6.0` release supports JDK 8 / 17 / 21 / 25 (JDK 17+ is recommended).
- **`seata-namingserver`**: Requires **JDK 25 or later**.

### Default Ports

| Component | Port | Purpose | Notes |
| :--- | :--- | :--- | :--- |
| `seata-server` | `8091` | RPC & HTTP API port | Multiplexed via Netty-HTTP (**port `7091` is no longer used**) |
| `seata-server` | `9091` | Raft election & replication port | Enabled in Raft mode; defaults to RPC port `+ 1000` |
| `seata-server` | `9898` | Prometheus metrics port | Enabled when `seata.metrics.enabled: true` |
| `seata-namingserver` | `8081` | NamingServer / Console / MCP | Hosts the Web Console since Seata 2.4 |

## Deploy Directly

### 1. Download and Extract

Download the `2.6.0` binary distribution from the [Download Page](/download/seata-server) or [GitHub Releases](https://github.com/apache/incubator-seata/releases) and extract it:

```bash
tar -zxvf apache-seata-2.6.0-incubating-bin.tar.gz
cd apache-seata-2.6.0-incubating-bin
```

The extracted archive contains two independent component directories:

- `seata-server/`: Seata TC server (`conf/application.yml`)
- `seata-namingserver/`: Seata native registry center and Console (`conf/application.yml`)

### 2. Start `seata-server`

- Linux / macOS:

```bash
cd seata-server
sh ./bin/seata-server.sh start
```

Stop or restart:

```bash
sh ./bin/seata-server.sh stop
sh ./bin/seata-server.sh restart
```

- Windows:

```cmd
cd seata-server
bin\seata-server.bat
```

### Arguments

| Argument | Full Name | Effect | Notes |
| :--- | :--- | :--- | :--- |
| `-h` | `--host` | Specify IP registered to registry center | **Must be an IPv4/IPv6 literal**; auto-detects local IP if omitted |
| `-p` | `--port` | Specify server listening port | Default `8091`, serving both RPC and HTTP APIs |
| `-m` | `--storeMode` | Unified session and lock store mode | Supports `file`, `db`, `redis`; default is `file` (for `raft`, configure `seata.store.mode: raft` in `application.yml`) |
| `-ssm` | `--sessionStoreMode` | Session store mode | Supports `file`, `db`, `redis`; can be set independently from `-lsm` |
| `-lsm` | `--lockStoreMode` | Lock store mode | Supports `file`, `db`, `redis` |
| `-n` | `--serverNode` | Specify the seata-server node ID | Such as `1`, `2`, `3`; auto-generated via Snowflake by default |
| `-e` | `--seataEnv` | Specify the environment name | Such as `dev`, `test`, for multi-configuration isolation |

For example:

```bash
sh ./bin/seata-server.sh -p 8091 -h 127.0.0.1 -m file
```

## Other Deployment Options

- [Deploy NamingServer (Native Registry & Console)](./deploy-namingserver)
- [Deploying Raft Cluster](./deploy-server-raft)
- [Deploy Seata Server By Docker](./deploy-by-docker)
- [Deploy Seata Server By Docker Compose](./deploy-by-docker-compose)
- [Deploy Seata Server with Kubernetes](./deploy-by-kubernetes)
- [Deploy Seata Server By Helm](./deploy-by-helm)
- [High Availability Deployment](./deploy-ha)
