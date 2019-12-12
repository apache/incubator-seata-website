---
hidden: true
title: 使用 Helm 部署 Seata Server
keywords: kubernetes,helm,ops
description: 使用 Helm 部署 Seata Server
author: helloworlde
date: 2019-12-01
---

# 使用 Helm 部署 Seata Server

### 快速启动



```bash
$ cd ./script/server/helm/seata-server
$ helm install seata-server ./seata-server
```



## 自定义配置

### 环境变量

支持的环境变量和 Docker 相同，可以参考 [使用 Docker 部署 Seata Server](./deploy-by-docker.md)



### 使用自定义配置文件

指定配置文件可以通过挂载的方式实现，如将`/root/workspace/seata/seata-config/file`  下的配置文件挂载到 pod 中，挂载后需要通过指定 `SEATA_CONFIG_NAME` 指定配置文件位置，并且环境变量的值需要以`file:`开始, 如: `file:/root/seata-config/registry`

- Values.yaml

```yaml
replicaCount: 1

namespace: default

image:
  repository: seataio/seata-server
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: NodePort
  port: 30091

env:
  seataPort: "8091"
  storeMode: "file"
  seataIp: "127.0.0.1"
  seataConfigName: "file:/root/seata-config/registry"

volume:
  - name: seata-config
    mountPath: /root/seata-config
    hostPath: /root/workspace/seata/seata-config/file
```





