---
title: Deploy Server
keywords: Seata
description: The server can deploy by multiple method: Directly, Docker, Docker-Compose, Kubernetes, Helm.
---

# Deploy Server

The server can deploy by multiple method: Directly, Docker, Docker-Compose, Kubernetes, Helm.

## Directly 

1. Download the server application from [RELEASE](https://github.com/seata/seata/releases) and unzip. 

2. Startup

On Linux/Mac

```bash
$ sh ./bin/seata-server.sh
```

On Windows

```cmd
bin\seata-server.bat
```

### Arguments

|Argument|Fullname|Effect|Comment|
|:--|:--|:--|:--|
|-h|--host|Specify IP in registry center|Suggest to specify Virtural machine or cloud server, or will use internal IP|
|-p|--port|Specify startup port |default is 8091|
|-m|--storeMode|The way to save transaction log | Support `file` and `db`default is  `file`|
|-n|--serverNode|Specify the seata-server node ID |Like `1`,`2`,`3`..., default is `1`|
|-e|--seataEnv|Specify the environment of  seata-server |Like `dev`, `test` etc. Then will use file like `registry-dev.conf` as configuraiton|

For example：

```bash
$ sh ./bin/seata-server.sh -p 8091 -h 127.0.0.1 -m file
```

## Deploy in container

Now support these method：

- [Deploy Seata Server By Docker](./deploy-by-docker.md)

- [Deploy Seata Server By Kubernetes](./deploy-by-kubernetes.md)

- [Deploy Seata Server By Helm](./deploy-by-helm.md)
