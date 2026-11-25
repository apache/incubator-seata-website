---
hidden: true
title: High Available Usage Deployment
keywords: [Seata, High Availability, Kubernetes, Raft, Nacos, ops]
description: High availability deployment guide for Seata 2.x covering Seata-Raft and external storage (DB/Redis + Registry).
author: helloworlde
date: 2020-04-10
---

# High Available Usage Deployment

Seata 2.x offers two primary High Availability (HA) deployment architectures:

| Option | Mechanism | External Dependencies | Best For |
| :--- | :--- | :--- | :--- |
| **Option 1: Seata-Raft** | Integrated storage and compute using Raft consensus | None (optionally paired with NamingServer) | High throughput, low operational overhead, no shared DB needed |
| **Option 2: External Storage** | Stateless `seata-server` scaling with shared DB or Redis | Registry (Nacos / NamingServer, etc.) + DB / Redis | Reusing existing relational databases and registry clusters |

## Option 1: Seata-Raft Mode (Integrated Storage & Compute)

Deploy at least 3 `seata-server` nodes to form a Raft consensus group with no external database required for TC session state. For multi-cluster management and Console governance, pair it with [NamingServer](./deploy-namingserver). See [Deploying Raft Cluster](./deploy-server-raft) for complete setup steps.

## Option 2: External Storage Mode (DB / Redis + Registry)

The following example uses **Nacos (registry and configuration center) + MySQL (`db` store mode)**. You can also replace Nacos with Seata NamingServer.

### 1. Initialize Database Tables

Initialize `global_table`, `branch_table`, `lock_table`, `distributed_lock`, and `vgroup_table` using the SQL scripts under [script/server/db/](https://github.com/apache/incubator-seata/tree/2.x/script/server/db).

### 2. Configure `seata-server` (`application.yml`)

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
      ## For Aliyun MSE Nacos RAM auth (mutually exclusive with username/password)
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

### 3. Publish `seataServer.properties` in the Configuration Center

Create `seataServer.properties` in Nacos under `SEATA_GROUP` (choose either `db` or `redis`):

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

# ----- redis (when store.mode=redis) -----
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

Start multiple `seata-server` instances pointing to the same registry, configuration center, and database to achieve high availability.

### 4. Kubernetes HA Example

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

## NamingServer High Availability

When using `seata-namingserver`, deploy multiple NamingServer instances and specify comma-separated addresses in `seata.registry.seata.server-addr` on both Server and Client sides (for example `192.168.0.10:8081,192.168.0.11:8081`). NamingServer instances automatically synchronize transaction-group mappings across nodes. See [Deploy NamingServer](./deploy-namingserver) and [Namingserver Registry](../user/registry/namingserver) for details.

For additional HA deployment practices, see the blog post [Seata HA Deployment Practice](/blog/seata-ha-practice).
