---
hidden: true
title: Deploy Seata Server By Helm
keywords: kubernetes,helm,ops
description: Deploy Seata Server By Helm
author: helloworlde
date: 2019-12-01
---

# Deploy Seata Server By Helm

### Quick start

```bash
$ cd ./script/server/helm/seata-server
$ helm install seata-server ./seata-server
```

## Custom configuration

### Environment

The environment is same with Docker, can reference [Deploy Seata Server By Docker](./deploy-by-docker.md)

### Use specify configuration file

Can specify configuration file by mount files, like mount files under `/root/workspace/seata/seata-config/file` to pod. And need specify environment `SEATA_CONFIG_NAME` also, the value need start with `file:`, like `file:/root/seata-config/registry`

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
