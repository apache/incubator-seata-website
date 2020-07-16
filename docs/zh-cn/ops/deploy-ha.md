---
hidden: true
title: Seata 高可用部署
keywords: kubernetes,ops
description: Seata 高可用部署
author: helloworlde
date: 2020-04-10
---

# Seata 高可用部署

> Seata 的高可用依赖于注册中心、配置中心和数据库来实现

## Seata-Server

Seata-Server 需要使用注册中心，并把事务数据保存到数据库中，以 Nacos 为例

- 修改`registry.conf`的注册中心配置

```
registry {
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "192.168.199.2"
    namespace = ""
    cluster = "default"
    username = ""
    password = ""
  }
}

config {
  type = "nacos"
  
  nacos {
    serverAddr = "192.168.199.2"
    namespace = ""
    group = "SEATA_GROUP"
    username = ""
    password = ""
  }
}
```

-  需要修改配置中心的以下几个配置(含db与redis,二者选其一 注:redis需seata-server 1.3版本及以上)

```
service.vgroupMapping.my_test_tx_group=default
store.mode=db|redis
-----db-----
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true
store.db.user=root
store.db.password=123456
----redis----
store.redis.host=127.0.0.1
store.redis.port=6379
store.redis.maxConn=10
store.redis.minConn=1
store.redis.database=0
store.redis.password=null
store.redis.queryLimit=100
```

- db模式需要在数据库创建 `global_table`, `branch_table`, `lock_table`表

相应的脚本在GitHub 的 [/script/server/db/](https://github.com/seata/seata/tree/develop/script/server/db) 目录下

这样，启动多个seata-server，即可实现其高可用

----

以 Kubernetes 为例，部署文件参考:

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
    - port: 8091
      protocol: TCP
      name: http
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
          image: docker.io/seataio/seata-server:latest
          imagePullPolicy: IfNotPresent
          env:
            - name: SEATA_CONFIG_NAME
              value: file:/root/seata-config/registry
          ports:
            - name: http
              containerPort: 8091
              protocol: TCP
          volumeMounts:
            - name: seata-config
              mountPath: /root/seata-config
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
  registry.conf: |
    registry {
        type = "nacos"
        nacos {
          application = "seata-server"
          serverAddr = "192.168.199.2"
        }
    }
    config {
      type = "nacos"
      nacos {
        serverAddr = "192.168.199.2"
        group = "SEATA_GROUP"
      }
    }
```

关于 Seata 高可用部署的实践可以参考 [Seata 高可用部署实践](https://seata.io/zh-cn/blog/seata-ha-practice.html)
