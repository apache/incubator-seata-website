---
title: 部署Raft集群
keywords: [Seata, Raft, 高可用, 集群部署]
description: 使用 Seata-Raft 存算一体模式部署高可用集群，支持直连与 NamingServer 两种服务发现方式。
---

# 部署 Server-Raft

Seata-Raft 模式是一种存算一体的高可用事务存储模式，具备高性能、易扩展、无需额外数据库存储依赖、运维成本低等特点。架构设计与实现原理可参考 [Seata-Raft 详解](/blog/seata-raft-detailed-explanation)。

Seata-Raft 在服务发现层面支持两种方式：

- **`registry.type: file`**：客户端通过 `registry.type: raft` 直连 Server 节点获取元数据，全链路只存在一个 Raft 集群（无需独立注册中心）。
- **`registry.type: seata`**：结合 [Seata NamingServer](./deploy-namingserver)，支持 multi-raft 多集群管理、事务分组动态切流以及控制台可视化管控（不支持 Nacos、Eureka、ZooKeeper 等其他第三方注册中心）。

## Server 端部署

### 1. 下载并解压

前往 [下载页面](/download/seata-server) 或 [GitHub Releases](https://github.com/apache/incubator-seata/releases) 下载 `2.6.0` 二进制包并解压，进入 `seata-server` 目录。

### 2. 修改配置

修改 `conf/application.yml`（完整配置项可参考同目录下的 `application.raft.example.yml`）：

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
      group: default # Raft 集群分组名称，需与 Client 端事务分组映射的集群名一致
      server-addr: 192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091 # 至少 3 个节点的 IP 与 Raft 端口（默认为业务端口 + 1000，即 9091）
      snapshot-interval: 600 # Raft 快照间隔（秒）；过大将延长故障恢复时间，过小会在快照期间影响请求响应时间
      apply-batch: 32 # 每次提交 Raft 日志的最大批次数
      max-append-bufferSize: 262144 # 日志存储缓冲区最大大小，默认 256 KB
      max-replicator-inflight-msgs: 256 # pipeline 模式下最大 in-flight 请求数，默认 256
      disruptor-buffer-size: 16384 # 内部 Disruptor 队列大小，高吞吐场景可适当调高
      election-timeout-ms: 1000 # 超过该时间未收到 Leader 心跳则触发重新选举
      reporter-enabled: false # 是否开启 JRaft 自身监控输出
      reporter-initial-delay: 60 # 监控输出间隔（秒）
      serialization: jackson # Raft 日志序列化方式，请保持默认
      compressor: none # Raft 日志压缩算法，可选 none、gzip、zstd、lz4 等
      sync: true # Raft 日志刷盘方式，默认同步刷盘
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: file
  registry:
    # Raft 模式仅支持 file 或 seata（NamingServer）
    type: file
    # 若使用 NamingServer，请改为 type: seata 并取消下方注释
    # seata:
    #   server-addr: 127.0.0.1:8081
    #   cluster: default
    #   namespace: public
    #   username: seata
    #   password: seata
  store:
    mode: raft
    file:
      dir: sessionStore # Raft 日志与快照持久化目录，生产环境建议配置为固定绝对路径
```

:::tip 单机多实例调试
若 `seata.server.raft.server-addr` 中的节点均位于同一台机器（例如三个节点业务端口分别为 `8091`、`8092`、`8093`，对应 Raft 端口为 `9091`、`9092`、`9093`），除通过 `-p` 或 `server.port` 区分业务端口外，还需通过 `-Dserver.raftPort=<port>` 指定各实例自身的 Raft 端口。

在 Linux / macOS 下可通过环境变量指定：

```bash
export JAVA_OPT="-Dserver.raftPort=9092"
sh ./bin/seata-server.sh -p 8092
```

:::

### 3. 启动各节点

- Linux / macOS：

```bash
sh ./bin/seata-server.sh start
```

- Windows：

```cmd
bin\seata-server.bat
```

### 4. 动态扩缩容

假设当前 Raft 集群成员为 `192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091`。集群初始化完成后，直接修改配置文件中的 `seata.server.raft.server-addr` 不再生效，请统一通过任意成员的 HTTP 接口 `/metadata/v1/changeCluster` 进行扩缩容（注意 `raftClusterStr` 参数必须使用 **Raft 端口**，如 `9091`）：

- **扩容示例**（新增节点 `192.168.0.114:9091`）：

```bash
curl -X POST -i "http://192.168.0.111:8091/metadata/v1/changeCluster?raftClusterStr=192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091,192.168.0.114:9091"
```

- **缩容示例**（从集群列表中移除待下线节点后提交）：

```bash
curl -X POST -i "http://192.168.0.111:8091/metadata/v1/changeCluster?raftClusterStr=192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091"
```

## Client 端配置

### 方式一：直接发现 Raft 节点（`registry.type: file` 模式）

1. 将客户端 `seata.registry.type` 设置为 `raft`，并配置各 Seata Server 的业务端口（默认 `8091`）：

```yaml
seata:
  tx-service-group: default_tx_group
  service:
    vgroup-mapping:
      default_tx_group: default # 与 Server 端 seata.server.raft.group 保持一致
  registry:
    type: raft
    raft:
      server-addr: 192.168.0.111:8091,192.168.0.112:8091,192.168.0.113:8091
```

### 方式二：通过 NamingServer 发现 Raft 集群（`registry.type: seata` 模式）

当 Server 端配置 `seata.registry.type: seata` 注册到 NamingServer 后，客户端只需配置 NamingServer 地址即可：

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

并在 NamingServer 控制台或通过 `/naming/v1/addGroup` 接口创建 `default_tx_group` 到对应集群名称的映射，详情参见 [Namingserver 注册中心文档](../user/registry/namingserver)。
