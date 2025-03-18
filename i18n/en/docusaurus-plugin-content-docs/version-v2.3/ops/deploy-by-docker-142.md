---
hidden: true
title: Deploy Seata Server By Docker
keywords: [docker,docker-compose,ops]
description: Deploy Seata Server by Docker
author: helloworlde
date: 2019-11-25
---

# Deploy Seata Server By Docker

## Precautions 
- Please avoid directly pulling the latest version image. The latest version is not necessarily a stable version. To avoid unnecessary problems, please go to [docker image warehouse](https://hub.docker.com/r/seataio/seata-server/tags) to determine the image version to be pulled.

## Quick Start

#### Start seata-server instance

```bash
$ docker run --name seata-server -p 8091:8091 seataio/seata-server:1.4.2
```

#### Specify seata-server IP and port to start

```bash
$ docker run --name seata-server \
         -p 8091:8091 \
         -e SEATA_IP=192.168.1.1 \
         -e SEATA_PORT=8091 \
         seataio/seata-server
```

#### Docker compose startup

Take `docker-compose.yaml` for example

```yaml
version: "3"
services:
   seata-server:
     image: seataio/seata-server:${latest-release-version}
     hostname: seata-server
     ports:
       - "8091:8091"
     environment:
       - SEATA_PORT=8091
       - STORE_MODE=file
```

## Container command line and view logs

```bash
$ docker exec -it seata-server sh
```

```bash
$ docker logs -f seata-server
```

## Use custom configuration file

Custom configuration files need to be implemented by mounting files. Mount `registry.conf` and `file.conf` on the host to the corresponding directory in the container.

- Specify registry.conf

When using a custom configuration file, the environment variable `SEATA_CONFIG_NAME` must be specified, and the value needs to start with `file:`, such as: `file:/root/seata-config/registry`

```bash
$ docker run --name seata-server \
         -p 8091:8091 \
         -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
         -v /User/seata/config:/root/seata-config \
         seataio/seata-server
```

Among them `-e` is used to configure environment variables, `-v` is used to mount the host directory.

- Specify file.conf

If you also need to specify the `file.conf` configuration file at the same time, you need to change the `config` configuration in the `registry.conf` file to the following content. The value of `name` is the corresponding path in the container.

```
config {
   type = "file"

   file {
     name = "file:/root/seata-config/file.conf"
   }
}
```

## Environment variables

seata-server supports the following environment variables:

- **SEATA_IP**

> Optional. It specifies the IP started by seata-server. This IP is used when registering with the registration center, such as eureka, etc.

- **SEATA_PORT**

> Optional. It is used to specify the port where seata-server starts. The default port is `8091`.

- **STORE_MODE**

> Optional. It is used to specify the transaction log storage method of seata-server, supports `db`, `file`, `redis` (supported by Seata-Server 1.3 and above). The default value is `file`.

- **SERVER_NODE**

> Optional. It is used to specify the seata-server node ID, such as `1`,`2`,`3`... The default value is `generated based on ip`.

- **SEATA_ENV**

> Optional. It is used to specify the seata-server operating environment, such as `dev`, `test`, etc. When the service is started, configurations such as `registry-dev.conf` will be used.

- **SEATA_CONFIG_NAME**

> Optional. It is used to specify the configuration file location, such as `file:/root/registry`, which will load `/root/registry.conf` as the configuration file. If you need to specify the `file.conf` file at the same time, you need to change the value of `config.file.name` in `registry.conf` to something like `file:/root/file.conf`.
