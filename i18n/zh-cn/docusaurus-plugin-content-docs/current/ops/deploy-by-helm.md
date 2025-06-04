---
hidden: true
title: Helm部署
keywords: [kubernetes,helm,ops]
description: 使用 Helm 部署 Seata Server
author: helloworlde
date: 2019-12-01
---

# 使用 Helm 部署 Seata Server

### 快速启动



```bash
$ git clone https://github.com/apache/incubator-seata.git
$ cd ./incubator-seata/script/server/helm/seata-server
$ helm install seata-server ./seata-server
```



## 自定义配置

### 环境变量

支持的环境变量和 Docker 相同，可以参考 [使用 Docker 部署 Seata Server](./deploy-by-docker)



### 使用自定义配置文件

指定配置文件可以通过挂载的方式实现，如将`/root/workspace/seata/seata-config/application.yml`下的配置文件挂载到 pod 中的`/seata-server/resources/application.yml`覆盖项目原有配置文件。
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

volume:
  - name: seata-config
    mountPath: /seata-server/resources/application.yml
    subPath: application.yml
    hostPath: /root/workspace/seata/seata-config/application.yml
```





