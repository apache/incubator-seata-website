---
hidden: true
title: High Available Usage Deployment
keywords: kubernetes,ops
description: High Available Usage Deployment
author: helloworlde
date: 2020-04-10
---

# High Available Usage Deployment

> High available usage deployment of Seata depends on registry center, configuration center and database.

## Seata-Server

The Seata-Server need registry center, and save transaction data into database, for example, use Nacos

- Modify configuration in `registry.conf`

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

-  Modify configuration in configuration center

```
service.vgroupMapping.my_test_tx_group=default
store.mode=db
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://192.168.199.2:30060/seata?useUnicode=true
store.db.user=root
store.db.password=123456
```

- Create table `global_table`, `branch_table`, `lock_table` in database

Please reference script on [/script/server/db/](https://github.com/seata/seata/tree/develop/script/server/db)

Now, startup multiple seata-server, and then the server is support high available usage.

----

For example, using Kubernetes deploy, the configuration file like:

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

You can reference [seata-ha-deploy-practice](https://seata.io/zh-cn/blog/seata-ha-practice.html) for more detail about practice of HA deploy.
