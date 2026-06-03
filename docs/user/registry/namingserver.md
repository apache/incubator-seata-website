---
title: Seata Namingserver Registry
keywords: [Seata, Namingserver, Registry]
description: Use Seata Namingserver as the registry center.
---

# Namingserver Registry

Namingserver is Seata's native registry center. It maintains the mapping between transaction groups and Seata server clusters, and helps Seata clients discover available Seata server nodes.

:::caution
Namingserver is currently a beta feature. Please evaluate it carefully before using it in production, and do not expose the service directly to the public network.
:::

## Start Namingserver

You can start Namingserver from a binary package or by using the Docker image.

### Start from Binary Package

Download and extract the Seata binary package, then enter the `seata-namingserver` directory.

For macOS or Linux:

```shell
bin/seata-namingserver.sh

