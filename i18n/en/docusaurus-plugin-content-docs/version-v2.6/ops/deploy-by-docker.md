---
hidden: true
title: Deploy Seata Server By Docker
keywords: [Seata, Docker, Container, ops]
description: Deploy Seata Server and NamingServer using Docker.
author: helloworlde
date: 2019-11-25
---

# Deploy Seata Server By Docker

[View 1.4.2 Legacy Guide](./deploy-by-docker-142)

## Precautions and Image Tags

- Avoid pulling `latest` blindly in production. Check DockerHub ([`apache/seata-server`](https://hub.docker.com/r/apache/seata-server/tags) and [`apache/seata-naming-server`](https://hub.docker.com/r/apache/seata-naming-server/tags)) and pin an explicit release tag.
- Since Seata 2.4, the Web Console lives in `apache/seata-naming-server` (port `8081`). `apache/seata-server` multiplexes RPC and HTTP APIs on port `8091` via Netty-HTTP (**port `7091` is no longer used**).
- Official images default to `TZ=Asia/Shanghai`. Override timezone with `-e TZ=...`; do not mount `/etc/timezone`.

### `2.6.0` Image Tags

| Image | Tag | Notes |
| :--- | :--- | :--- |
| `apache/seata-server` | `2.6.0` | JDK 8 base |
| `apache/seata-server` | `2.6.0.jdk17` / `2.6.0.jdk21` / `2.6.0.jdk25` | Multi-arch images for JDK 17 / 21 / 25 |
| `apache/seata-naming-server` | `2.6.0.jdk25` | JDK 25 base, provides native registry and Console |

## Quick Start

### Start `seata-server`

```bash
docker run -d --name seata-server \
  -p 8091:8091 \
  apache/seata-server:2.6.0
```

For Raft mode, also expose the Raft port `9091`:

```bash
docker run -d --name seata-server \
  -p 8091:8091 \
  -p 9091:9091 \
  -v $(pwd)/seata-config:/seata-server/resources \
  -v $(pwd)/sessionStore:/seata-server/sessionStore \
  apache/seata-server:2.6.0
```

### Specify Registered IP and Port

```bash
docker run -d --name seata-server \
  -p 8091:8091 \
  -e SEATA_IP=192.168.1.1 \
  -e SEATA_PORT=8091 \
  apache/seata-server:2.6.0
```

:::caution
`SEATA_IP` must be an IPv4 or IPv6 address literal (for example, `192.168.1.1`). Hostnames are rejected on startup.
:::

### Start `seata-naming-server` (Native Registry & Console)

```bash
docker run -d --name seata-naming-server \
  -p 8081:8081 \
  apache/seata-naming-server:2.6.0.jdk25
```

See [Deploy NamingServer](./deploy-namingserver) for full configuration instructions.

## Access Container and View Logs

```bash
docker exec -it seata-server bash
docker logs -f seata-server
```

## Using Custom Configuration

Inside the official image, configuration files are stored under `/seata-server/resources/`. Extract the default configuration from a temporary container first:

```bash
docker run -d --name seata-server-tmp apache/seata-server:2.6.0
mkdir -p ./seata-config
docker cp seata-server-tmp:/seata-server/resources/. ./seata-config/
docker rm -f seata-server-tmp
```

The extracted directory contains `application.yml`, `application.example.yml`, `application.raft.example.yml`, and `logback-spring.xml`. After customizing `application.yml`, mount the directory back into the container:

```bash
docker run -d --name seata-server \
  -p 8091:8091 \
  -e TZ=Asia/Shanghai \
  -v $(pwd)/seata-config:/seata-server/resources \
  -v $(pwd)/sessionStore:/seata-server/sessionStore \
  -v $(pwd)/logs:/root/logs/seata \
  apache/seata-server:2.6.0
```

When using `file` or `raft` store mode, always mount `/seata-server/sessionStore` so session data survives container restarts.

## Environment Variables

`seata-server` supports the following environment variables:

| Environment Variable | Description | Default |
| :--- | :--- | :--- |
| `SEATA_IP` | IP registered to the registry center (must be an IPv4/IPv6 literal) | Auto-detected container IP |
| `SEATA_PORT` | Listening port of `seata-server` | `8091` |
| `STORE_MODE` | Unified session and lock store mode (`file`, `db`, `redis`) | `file` |
| `SESSION_STORE_MODE` | Session store mode (`file`, `db`, `redis`) | Inherits `STORE_MODE` |
| `LOCK_STORE_MODE` | Lock store mode (`file`, `db`, `redis`) | Inherits `STORE_MODE` |
| `SERVER_NODE` | Server node ID (e.g., `1`, `2`, `3`) | Auto-generated via Snowflake |
| `SEATA_ENV` | Environment identifier for multi-config isolation (`dev`, `test`, etc.) | Unset |
| `JVM_XMX` / `JVM_XMS` | JVM max / initial heap size | Auto-calculated from cgroup limit; fallback `2048m` |
| `JVM_MaxDirectMemorySize` | JVM max direct memory | `1024m` |
| `LOG_HOME` | Log directory path | `$HOME/logs/seata` |
| `TZ` | Container timezone | `Asia/Shanghai` |
