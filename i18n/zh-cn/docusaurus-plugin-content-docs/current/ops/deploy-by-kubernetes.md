---
hidden: true
title: Kubernetes部署
keywords: [Seata, Kubernetes, ops]
description: 使用 Kubernetes 部署 Seata Server 与 NamingServer。
author: helloworlde
date: 2019-12-01
---

# 使用 Kubernetes 部署 Seata Server

:::tip 生产环境推荐
在生产级 Kubernetes 集群中部署 Seata（尤其是 Raft 模式与自动化运维场景），推荐优先使用官方提供的 [Apache Seata K8s Operator (`incubator-seata-k8s`)](https://github.com/apache/incubator-seata-k8s)。
:::

## 快速启动

创建 `seata-server.yaml`：

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
      name: seata
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
          image: docker.io/apache/seata-server:2.6.0
          imagePullPolicy: IfNotPresent
          env:
            - name: SEATA_PORT
              value: "8091"
            - name: STORE_MODE
              value: file
          ports:
            - name: seata
              containerPort: 8091
              protocol: TCP
```

部署到集群：

```bash
kubectl apply -f seata-server.yaml
```

## 自定义配置

### 环境变量

支持的环境变量与 Docker 相同，请参考 [使用 Docker 部署 Seata Server](./deploy-by-docker)。

### 使用自定义配置文件

通过 `ConfigMap` 将自定义 `application.yml` 挂载到 `/seata-server/resources/application.yml`：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: seata-server-config
  namespace: default
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
        # support: nacos, consul, apollo, zk, etcd3
        type: nacos
        nacos:
          server-addr: 127.0.0.1:8848
          group: SEATA_GROUP
          username: nacos
          password: nacos
          ## if use MSE Nacos with auth, mutex with username/password attribute
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
          ## if use MSE Nacos with auth, mutex with username/password attribute
          #access-key: ""
          #secret-key: ""

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
            name: seata-server-config
```

:::note
如果需要使用容器环境变量覆盖 `SEATA_IP`（向外部注册中心注册 Pod IP），可在 Deployment `env` 中通过 Downward API 注入 `status.podIP`。
:::

## 部署 Seata NamingServer（可选）

如果希望在 Kubernetes 中使用 Seata 原生注册中心与控制台（`8081` 端口），可参考以下示例部署 `seata-naming-server`（完整配置见 [部署 NamingServer](./deploy-namingserver)）：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: seata-naming-server
  namespace: default
  labels:
    k8s-app: seata-naming-server
spec:
  type: ClusterIP
  ports:
    - name: http
      port: 8081
      targetPort: 8081
      protocol: TCP
  selector:
    k8s-app: seata-naming-server

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: seata-naming-server
  namespace: default
  labels:
    k8s-app: seata-naming-server
spec:
  replicas: 1
  selector:
    matchLabels:
      k8s-app: seata-naming-server
  template:
    metadata:
      labels:
        k8s-app: seata-naming-server
    spec:
      containers:
        - name: seata-naming-server
          image: docker.io/apache/seata-naming-server:2.6.0.jdk25
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8081
              protocol: TCP
          readinessProbe:
            httpGet:
              path: /naming/v1/health
              port: 8081
            initialDelaySeconds: 15
            periodSeconds: 10
```
