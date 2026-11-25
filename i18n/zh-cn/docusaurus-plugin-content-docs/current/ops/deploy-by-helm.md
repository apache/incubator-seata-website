---
hidden: true
title: Helm部署
keywords: [Seata, Kubernetes, Helm, ops]
description: 使用 Helm 部署 Seata Server。
author: helloworlde
date: 2019-12-01
---

# 使用 Helm 部署 Seata Server

:::tip 生产环境推荐
在生产级 Kubernetes 集群中部署与运维 Seata（含 Raft 集群生命周期管理），推荐优先使用官方提供的 [Apache Seata K8s Operator (`incubator-seata-k8s`)](https://github.com/apache/incubator-seata-k8s)。
:::

## 快速启动

1. 克隆仓库并进入 Helm Chart 目录：

   ```bash
   git clone -b 2.x https://github.com/apache/incubator-seata.git
   cd incubator-seata/script/server/helm
   ```

2. 若当前节点尚未在宿主机准备 `/root/workspace/seata/seata-config/application.yml`，可先禁用默认 `hostPath` 挂载快速体验；或按后文修改 `values.yaml` 后再安装：

   ```bash
   helm install seata-server ./seata-server --set image.repository=apache/seata-server --set image.tag=2.6.0 --set volume=null
   ```

更新或卸载：

```bash
helm upgrade seata-server ./seata-server -f my-values.yaml
helm uninstall seata-server
```

## 自定义配置

### 环境变量

支持的环境变量与 Docker 相同，请参考 [使用 Docker 部署 Seata Server](./deploy-by-docker)。

### 使用自定义配置文件

可通过挂载宿主机配置文件或定制 `values.yaml` 将 `application.yml` 覆盖到容器内的 `/seata-server/resources/application.yml`：

- `values.yaml` 示例：

```yaml
replicaCount: 1

namespace: default

image:
  repository: apache/seata-server
  tag: 2.6.0
  pullPolicy: IfNotPresent

service:
  type: NodePort
  port: 30091

env:
  seataPort: "8091"
  storeMode: "file"
  seataIp: "192.168.1.10"

volume:
  - name: seata-config
    mountPath: /seata-server/resources/application.yml
    subPath: application.yml
    hostPath: /root/workspace/seata/seata-config/application.yml
```

:::caution

1. `SEATA_IP`（即 `env.seataIp`）必须为 IPv4 或 IPv6 字面量，不能传入主机名。
2. `hostPath` 挂载要求宿主机目标路径下已存在 `application.yml` 文件，否则 Pod 会因挂载失败无法启动。

:::
