---
hidden: true
title: 高可用部署
keywords: [Seata, 高可用, Kubernetes, Raft, Nacos, ops]
description: Seata 2.x 高可用部署指南，涵盖 Raft 存算一体模式与外置存储模式（DB/Redis + 注册中心）。
author: helloworlde
date: 2020-04-10
---

# Seata 高可用部署

Seata 2.x 提供两种主流的高可用（HA）部署架构，可根据业务基础设施选择：

| 方案 | 核心机制 | 外部组件依赖 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **方案一：Seata-Raft 模式** | 存算一体，通过 Raft 协议在节点间同步事务状态与全局锁 | 无（或可选搭配 NamingServer） | 追求极致性能、低运维成本或无共享 DB 依赖 |
| **方案二：外置存储模式** | 多个 `seata-server` 无状态水平扩展，通过数据库或 Redis 共享状态 | 注册中心（Nacos / NamingServer 等） + DB / Redis | 复用现有关系型数据库 / Nacos 等微服务基础设施 |

## 方案一：Seata-Raft 模式（存算一体）

部署至少 3 个 `seata-server` 节点组成 Raft 复制组，无需部署独立数据库来持久化 TC 状态；如需多集群管理或控制台治理，可配合 [NamingServer](./deploy-namingserver) 使用。详细部署步骤请参见 [部署 Server-Raft](./deploy-server-raft)。

## 方案二：外置存储模式（DB / Redis + 注册中心）

以下以 **Nacos（配置与注册中心）+ MySQL（`db` 存储）** 为例说明高可用部署步骤（也可将注册中心替换为 Seata NamingServer）。

### 1. 初始化数据库表

在 `db` 模式下，需先在目标数据库执行 [script/server/db/](https://github.com/apache/incubator-seata/tree/2.x/script/server/db) 下对应的 SQL 脚本，创建 `global_table`、`branch_table`、`lock_table`、`distributed_lock`、`vgroup_table` 等表。

### 2. 配置 `seata-server` 的 `application.yml`

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
    # support: nacos, consul, apollo, zk, etcd3
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      username: nacos
      password: nacos
      ## 若使用阿里云 MSE Nacos RAM 鉴权，与 username/password 互斥
      #access-key: ""
      #secret-key: ""
      data-id: seataServer.properties
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa, seata
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      cluster: default
      username: nacos
      password: nacos
      #access-key: ""
      #secret-key: ""
```

### 3. 在配置中心发布 `seataServer.properties`

在 Nacos 的 `SEATA_GROUP` 下创建 `seataServer.properties`（`db` 与 `redis` 二选一）：

```properties
service.vgroupMapping.default_tx_group=default
store.mode=db

# ----- db -----
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&characterEncoding=utf8&useSSL=false
store.db.user=your_db_user
store.db.password=your_db_password

# ----- redis（若 store.mode=redis） -----
#store.redis.mode=single
#store.redis.type=lua
#store.redis.single.host=127.0.0.1
#store.redis.single.port=6379
#store.redis.database=0
#store.redis.password=
#store.redis.minConn=10
#store.redis.maxConn=100
#store.redis.queryLimit=1000
```

同时启动多个指向同一配置中心、注册中心与数据库的 `seata-server` 实例，即可实现高可用。

### 4. Kubernetes 高可用部署示例

```yaml
apiVersion: v1
kind: Service
metadata:
  name: seata-ha-server
  namespace: default
  labels:
    app.kubernetes.io/name: seata-ha-server
spec:
  type: ClusterIP
  ports:
    - name: service
      port: 8091
      protocol: TCP
  selector:
    app.kubernetes.io/name: seata-ha-server

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: seata-ha-server
  namespace: default
  labels:
    app.kubernetes.io/name: seata-ha-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: seata-ha-server
  template:
    metadata:
      labels:
        app.kubernetes.io/name: seata-ha-server
    spec:
      containers:
        - name: seata-ha-server
          image: docker.io/apache/seata-server:2.6.0
          imagePullPolicy: IfNotPresent
          ports:
            - name: service
              containerPort: 8091
              protocol: TCP
          resources:
            limits:
              cpu: "2"
              memory: 4Gi
            requests:
              cpu: "1"
              memory: 2Gi
          volumeMounts:
            - name: seata-config
              mountPath: /seata-server/resources/application.yml
              subPath: application.yml
      volumes:
        - name: seata-config
          configMap:
            name: seata-ha-server-config

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: seata-ha-server-config
data:
  application.yml: |
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
          server-addr: 127.0.0.1:8848
          group: SEATA_GROUP
          username: nacos
          password: nacos
          data-id: seataServer.properties
      registry:
        type: nacos
        nacos:
          application: seata-server
          server-addr: 127.0.0.1:8848
          group: SEATA_GROUP
          cluster: default
          username: nacos
          password: nacos
```

## NamingServer 高可用提示

若注册中心使用 `seata-namingserver`，可部署多个 NamingServer 实例，并在 Server 与 Client 端的 `seata.registry.seata.server-addr` 中使用英文逗号分隔配置多个节点地址（如 `192.168.0.10:8081,192.168.0.11:8081`）。NamingServer 节点间会自动同步事务分组映射关系，详情参见 [部署 NamingServer](./deploy-namingserver) 与 [Namingserver 注册中心文档](../user/registry/namingserver)。

更多高可用部署实践可参考博客 [Seata 高可用部署实践](/blog/seata-ha-practice)。
