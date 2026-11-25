---
hidden: true
title: Deploy Seata Server By Helm
keywords: [Seata, Kubernetes, Helm, ops]
description: Deploy Seata Server using Helm.
author: helloworlde
date: 2019-12-01
---

# Deploy Seata Server By Helm

:::tip Production Recommendation
For production Kubernetes deployments (including Raft cluster lifecycle management), consider using the official [Apache Seata K8s Operator (`incubator-seata-k8s`)](https://github.com/apache/incubator-seata-k8s).
:::

## Quick Start

1. Clone the repository and switch to the Helm chart directory:

   ```bash
   git clone -b 2.x https://github.com/apache/incubator-seata.git
   cd incubator-seata/script/server/helm
   ```

2. Install the chart (disable the default `hostPath` volume if `/root/workspace/seata/seata-config/application.yml` does not exist on the node, or customize `values.yaml` first):

   ```bash
   helm install seata-server ./seata-server --set image.repository=apache/seata-server --set image.tag=2.6.0 --set volume=null
   ```

Upgrade or uninstall:

```bash
helm upgrade seata-server ./seata-server -f my-values.yaml
helm uninstall seata-server
```

## Custom Configuration

### Environment Variables

The supported environment variables are the same as Docker. Refer to [Deploy Seata Server By Docker](./deploy-by-docker).

### Using Custom Configuration Files

Mount your `application.yml` to `/seata-server/resources/application.yml` inside the container via `values.yaml`:

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

1. `SEATA_IP` (`env.seataIp`) must be an IPv4 or IPv6 address literal, not a hostname.
2. When using `hostPath`, ensure `application.yml` already exists on the host path before deploying; otherwise the Pod will fail to start.

:::
