---
title: Deploying Raft Cluster
keywords: [Seata, Raft, HA, Cluster]
description: Deploy a high-availability Seata cluster using Seata-Raft mode with either direct peer discovery or NamingServer.
---

# Deploying Server-Raft

Seata-Raft integrates storage and computation into a self-contained high-availability transaction store mode with high performance, easy scaling, and no external database requirement. For architectural details, see [Seata-Raft Detailed Explanation](/blog/seata-raft-detailed-explanation).

Seata-Raft supports two service discovery options:

- **`registry.type: file`**: Clients connect directly to any Server node via `registry.type: raft` to fetch cluster metadata (single Raft cluster, no external registry required).
- **`registry.type: seata`**: Integrates with [Seata NamingServer](./deploy-namingserver) to support multi-raft clusters, dynamic transaction group cutover, and Web Console management (third-party registries such as Nacos, Eureka, and ZooKeeper are not supported in Raft mode).

## Server Setup

### 1. Download and Extract

Download the binary distribution from the [Download Page](/download/seata-server) or [GitHub Releases](https://github.com/apache/incubator-seata/releases), extract it, and enter `seata-server/`.

### 2. Edit Configuration

Edit `conf/application.yml` (refer to `application.raft.example.yml` in the same directory for all options):

```yaml
server:
  port: 8091

spring:
  application:
    name: seata-server
  main:
    web-application-type: none

seata:
  server:
    raft:
      group: default # Raft cluster group name; must match the cluster name mapped to the client tx group
      server-addr: 192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091 # IP and Raft port (RPC port + 1000, default 9091) of at least 3 nodes
      snapshot-interval: 600 # Snapshot interval in seconds; balance between RT spikes and restart recovery speed
      apply-batch: 32 # Maximum batch size when committing Raft logs
      max-append-bufferSize: 262144 # Maximum log buffer size, default 256 KB
      max-replicator-inflight-msgs: 256 # Maximum in-flight requests when pipeline is enabled
      disruptor-buffer-size: 16384 # Internal Disruptor buffer size; increase for higher write throughput
      election-timeout-ms: 1000 # Leader heartbeat timeout before triggering a re-election (ms)
      reporter-enabled: false # Enable JRaft built-in metrics reporter
      reporter-initial-delay: 60 # Reporter interval in seconds
      serialization: jackson # Raft log serialization format; keep default
      compressor: none # Raft log compression: none, gzip, zstd, lz4, etc.
      sync: true # Synchronous disk flush for Raft logs
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: file
  registry:
    # Raft mode only supports file or seata (NamingServer)
    type: file
    # To register with NamingServer, switch to type: seata and uncomment below:
    # seata:
    #   server-addr: 127.0.0.1:8081
    #   cluster: default
    #   namespace: public
    #   username: seata
    #   password: seata
  store:
    mode: raft
    file:
      dir: sessionStore # Directory for Raft logs and snapshots; use a fixed absolute path in production
```

:::tip Local Multi-Node Debugging
If all addresses in `seata.server.raft.server-addr` run on the same host (for example, RPC ports `8091`, `8092`, `8093` with Raft ports `9091`, `9092`, `9093`), specify each instance's Raft port with `-Dserver.raftPort=<port>` in addition to `-p` or `server.port`.

On Linux / macOS:

```bash
export JAVA_OPT="-Dserver.raftPort=9092"
sh ./bin/seata-server.sh -p 8092
```

:::

### 3. Start Each Node

- Linux / macOS:

```bash
sh ./bin/seata-server.sh start
```

- Windows:

```cmd
bin\seata-server.bat
```

### 4. Dynamic Scaling

Suppose the initial Raft cluster list is `192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091`. Once a Raft cluster is initialized, modifying `seata.server.raft.server-addr` in the configuration file has no effect. Always scale via `/metadata/v1/changeCluster` on an existing cluster member (note that `raftClusterStr` must use **Raft ports**, e.g. `9091`):

- **Scale out** (adding `192.168.0.114:9091`):

```bash
curl -X POST -i "http://192.168.0.111:8091/metadata/v1/changeCluster?raftClusterStr=192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091,192.168.0.114:9091"
```

- **Scale in** (omit the decommissioned node from `raftClusterStr`):

```bash
curl -X POST -i "http://192.168.0.111:8091/metadata/v1/changeCluster?raftClusterStr=192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091"
```

## Client Configuration

### Option 1: Direct Raft Discovery (`registry.type: file` on Server)

Configure `seata.registry.type: raft` on the client with the Server RPC addresses (`8091` by default):

```yaml
seata:
  tx-service-group: default_tx_group
  service:
    vgroup-mapping:
      default_tx_group: default # Matches seata.server.raft.group on the server
  registry:
    type: raft
    raft:
      server-addr: 192.168.0.111:8091,192.168.0.112:8091,192.168.0.113:8091
```

### Option 2: Discovery via NamingServer (`registry.type: seata` on Server)

When Seata Server registers to NamingServer with `seata.registry.type: seata`, point clients to NamingServer:

```yaml
seata:
  tx-service-group: default_tx_group
  registry:
    type: seata
    seata:
      server-addr: 127.0.0.1:8081
      namespace: public
      username: seata
      password: seata
```

Create the mapping from `default_tx_group` to the target cluster via the NamingServer Console or `/naming/v1/addGroup`. See [Namingserver Registry](../user/registry/namingserver) for details.
