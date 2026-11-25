---
hidden: true
title: Deploy with Kubernetes
keywords: [Seata, Kubernetes, ops]
description: Deploy Seata Server and NamingServer on Kubernetes.
author: helloworlde
date: 2019-12-01
---

# Deploy Seata Server with Kubernetes

:::tip Production Recommendation
For production Kubernetes deployments (especially Raft clusters and automated lifecycle operations), consider using the official [Apache Seata K8s Operator (`incubator-seata-k8s`)](https://github.com/apache/incubator-seata-k8s).
:::

## Quick Start

Create `seata-server.yaml`:

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

Apply the manifest:

```bash
kubectl apply -f seata-server.yaml
```

## Custom Configuration

### Environment Variables

The supported environment variables are the same as Docker. See [Deploy Seata Server By Docker](./deploy-by-docker).

### Using Custom Configuration Files

Mount a custom `application.yml` from a `ConfigMap` to `/seata-server/resources/application.yml`:

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
If you need to register the Pod IP via `SEATA_IP`, inject `status.podIP` into `env` using the Kubernetes Downward API.
:::

## Deploy Seata NamingServer (Optional)

To run Seata's native registry and Console (`8081`) on Kubernetes, deploy `seata-naming-server` as well (see [Deploy NamingServer](./deploy-namingserver) for full details):

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
