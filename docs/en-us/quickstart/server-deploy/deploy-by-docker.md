---
hidden: true
title: Deploy Seata Server By Docker
keywords: docker
description: Deploy Seata Server By Docker
author: helloworlde
date: 2019-11-25
---

# Deploy Seata Server By Docker

## Quick Start 

#### Start a seata-server instance

```bash
$ docker run --name seata-server -p 8091:8091 seataio/seata-server:1.4.2
```

#### Specify server IP and port

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -e SEATA_IP=192.168.1.1 \
        -e SEATA_PORT=8091 \
        seataio/seata-server
```

#### Docker compose 

Example of `docker-compose.yaml`

```yaml
version: "3"
services:
  seata-server:
    image: seataio/seata-server
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
```

## Access container and view log

```bash
$ docker exec -it seata-server sh
```

```bash
$ docker logs -f seata-server
```

## Using custom configuration file

Custom configuration implement by mount `registry.conf` and `file.conf` to container.

- Specify registry.conf 

The environment variable`SEATA_CONFIG_NAME` is required when use a custom configuration , and the value must be started with `file:` like `file:/root/seata-config/registry`:

```bash
$ docker run --name seata-server \
        -p 8091:8091 \
        -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
        -v /User/seata/config:/root/seata-config  \
        seataio/seata-server
```

The param `-e` specify environment, and the param `-v` specify mount volume.

- Specify file.conf 

If you need specify `file.conf`, just modify `config` like below in `registry.conf` file:

```
config {
  type = "file"

  file {
    name = "file:/root/seata-config/file.conf"
  }
}
```

## Environment Variables 

You can modify configuration of seata-server  by the environment variables like this:

- **SEATA_IP**

> The variable is optional,  specifies registry IP instead of the container IP in registry center like eureka or others. 

- **SEATA_PORT**

> The variable is optional, specifies seata-server port, default is `8091` 

- **STORE_MODE**

> The variable is optional, specifies the log store mode of seata-server,  support `db` and `file`, default is `file`.

- **SERVER_NODE**

> The variable is optional, specifies  the seata-server node ID, like `1`,`2`,`3`..., default is `1`

- **SEATA_ENV**

> The variable is optional, specifies the seata-server environment, like `dev`, `test` etc. Then server will find file like `registry-dev.conf` under the configuration path when start.

- **SEATA_CONFIG_NAME**

> The variable is optional, specifies the configuration file path, like the `file:/root/registry`, will load file`/root/registry.conf` as configuration. If need specify `file.conf` configuration，the `config.file.name` value in `registry.conf` file need to change as related config, like `file:/root/file.conf`
