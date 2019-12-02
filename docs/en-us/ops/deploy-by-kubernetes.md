---
hidden: true
title: Deploy Seata Server By Kubernetes
keywords: kubernetes,ops
description: Deploy Seata Server By Kubernetes
author: helloworlde
date: 2019-12-01
---

# Deploy Seata Server By Kubernetes

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
          image: docker.io/seataio/seata-server:latest
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

## Custom configuration

### Environment

The environment is same with Docker, can reference [Deploy Seata Server By Docker](./deploy-by-docker.md)

### Use specify configuration file

Can specify configuration file by mount files, like mount files under `/root/workspace/seata/seata-config/file` to pod. And need specify environment `SEATA_CONFIG_NAME` also, the value need start with `file:`, like `file:/root/seata-config/registry`

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
          env:
            - name: SEATA_PORT
              value: "8091"
            - name: STORE_MODE
              value: file
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
          hostPath:
            path: /root/workspace/seata/seata-config/file
```
