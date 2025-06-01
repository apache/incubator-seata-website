---
hidden: true
title: Kubernetes部署
keywords: [kubernetes,ops]
description: 使用 Kubernetes 部署 Seata Server
author: helloworlde
date: 2019-12-01
---

# 使用 Kubernetes 部署 Seata Server

### 快速启动

创建 `seata-server.yaml`

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
      name: http
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
          image: docker.io/seataio/seata-server:1.8.0
          imagePullPolicy: IfNotPresent
          env:
            - name: SEATA_PORT
              value: "8091"
            - name: STORE_MODE
              value: file
          ports:
            - name: http
              containerPort: 8091
              protocol: TCP
```



```bash
$ kubectl apply -f seata-server.yaml
```



## 自定义配置

### 环境变量

支持的环境变量和 Docker 相同，可以参考 [使用 Docker 部署 Seata Server](./deploy-by-docker)



### 使用自定义配置文件


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
          image: docker.io/seataio/seata-server:latest
          imagePullPolicy: IfNotPresent
          ports:
            - name: service
              containerPort: 8091
              protocol: TCP
            - name: console
              containerPort: 7091
              protocol: TCP
          resources:
            limits:
              cpu: '2'
              memory: 4Gi
            requests:
              cpu: '1'
              memory: 2Gi
          volumeMounts:
            - name: seata-config
              mountPath: /seata-server/resources/application.yml
              subPath: application.yml
      volumes:
        - name: seata-config
          configMap:
            name: seata-server-config
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
        path: ${log.home:${user.home}/logs/seata}
    
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

      security:
        secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
        tokenValidityInMilliseconds: 1800000
        ignore:
          urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```
