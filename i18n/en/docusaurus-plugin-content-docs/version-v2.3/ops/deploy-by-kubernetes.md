---
hidden: true
title: Deploy Seata Server By Kubernetes
keywords: [kubernetes,ops]
description: Deploy Seata Server By Kubernetes
author: helloworlde
date: 2022-07-23
---

# Deploy Seata Server By Kubernetes

### Last Updated

- 2022.07.23 适配 Seata 1.5.x 增加控制台默认端口7091；seata-sever 在1.5.x 以下版本读取conf配置更改为yml配置文件。

### Quick Start

Create file `seata-server.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: seata-server
  namespace: default
  labels:
    k8s-app: seata-server
spec:
  type: NodePort
  ports:
    - port: 8091
      nodePort: 30091
      protocol: TCP
      name: service
    - port: 7091
      nodePort: 30092
      protocol: TCP
      name: console
  selector:
    k8s-app: seata-server

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: seata-server
  namespace: default
  labels:
    k8s-app: seata-server
spec:
  replicas: 1
  selector:
    matchLabels:
      k8s-app: seata-server
  template:
    metadata:
      labels:
        k8s-app: seata-server
    spec:
      containers:
        - name: seata-server
          image: apache/seata-server:2.1.0
          imagePullPolicy: IfNotPresent
          env:
            - name: SEATA_PORT
              value: "8091"
            - name: STORE_MODE
              value: file
          ports:
            - name: service
              containerPort: 8091
              protocol: TCP
            - name: console
              containerPort: 7091
              protocol: TCP
```



```bash
$ kubectl apply -f seata-server.yaml
```

## Custom configuration

### Environment

The environment is same with Docker, can reference [Deploy Seata Server By Docker](./deploy-by-docker)

### Use specify configuration file

Can specify configuration file by mount files or use ConfigMap, and then need specify environment `SEATA_CONFIG_NAME`, the value need start with `file:`, like `file:/root/seata-config/registry`

- Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: seata-server
  namespace: default
  labels:
    k8s-app: seata-server
spec:
  replicas: 1
  selector:
    matchLabels:
      k8s-app: seata-server
  template:
    metadata:
      labels:
        k8s-app: seata-server
    spec:
      containers:
        - name: seata-server
          image: apache/seata-server:2.1.0
          imagePullPolicy: IfNotPresent
          env:
            - name: SEATA_CONFIG_NAME
              value: file:/seata-server/conf/
          ports:
            - name: service
              containerPort: 8091
              protocol: TCP
            - name: console
              containerPort: 7091
              protocol: TCP
          volumeMounts:
            - name: seata-config
              mountPath: /root/seata-config
      volumes:
        - name: seata-config
          configMap:
            name: seata-server-config

---
1.5.x 以下版本 ConfigMap
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: seata-server-config
data:
  registry.conf: |
    registry {
        type = "nacos"
        nacos {
          application = "seata-server"
          serverAddr = "127.0.0.1:8848"
        }
    }
    config {
      type = "nacos"
      nacos {
        serverAddr = "127.0.0.1:8848"
        group = "SEATA_GROUP"
      }
    }

---
1.5.x 版本 ConfigMap
---

apiVersion: v1
kind: ConfigMap
metadata:
  name: seata-server-config
data:
  application.yml: |
    server:
      port: 7091

    spring:
      application:
        name: seata-server

    logging:
      config: classpath:logback-spring.xml
      file:
        path: ${user.home}/logs/seata

    console:
      user:
        username: seata
        password: seata

    seata:
      config:
        # support: nacos, consul, apollo, zk, etcd3
        type: nacos
        nacos:
          server-addr: 127.0.0.1:8848
          group: SEATA_GROUP
          username: xxx
          password: xxx
          ##if use MSE Nacos with auth, mutex with username/password attribute
          #access-key: ""
          #secret-key: ""
          data-id: seataServer.properties
      registry:
        # support: nacos, eureka, redis, zk, consul, etcd3, sofa
        type: nacos
        nacos:
          application: seata-server
          server-addr: 127.0.0.1:8848
          group: SEATA_GROUP
          cluster: default
          username: xxx
          password: xxx
          ##if use MSE Nacos with auth, mutex with username/password attribute
          #access-key: ""
          #secret-key: ""
      store:
        # support: file 、 db 、 redis
        mode: db
        db:
          datasource: druid
          db-type: mysql
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://xxx:3306/seata
          user: xxx
          password: xxx
          min-conn: 5
          max-conn: 100
      security:
        secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
        tokenValidityInMilliseconds: 1800000
        ignore:
          urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```
