---
title: Seata Namingserver Registry
keywords: [ Seata, Namingserver ]
description: Namingserver registry.
---

# Namingserver Registry (beta)

Namingserver is Seata's native registry center.

## Prerequisites

Download the Seata binary package from [this link](https://seata.apache.org/download/seata-server/)

### Running Namingserver in IDE

If you need to debug or develop namingserver locally, import Seata source code, locate the `namingserver` module, set the port number for namingserver in `resources/application.yml`, then start namingserver.

### Running Namingserver

After extracting, navigate to the seata-namingserver directory. Open the conf/application.yml file and configure the port for namingserver.

For Mac or Linux, run:
```shell
bin\seata-namingserver.sh
```

For Windows, run:
```shell
bin\seata-namingserver.bat
```

## Quick Start

Setting up Seata with namingserver as the registry is straightforward, involving configurations on both client and server sides.

### Namingserver Configuration Description

```yaml
server:
  port: 8081 ## namingserver port
spring:
  application:
    name: seata-namingserver
logging:
  config: classpath:logback-spring.xml
  file:
    path: ${log.home:${user.home}/logs/seata}
console: ## As of version 2.4, the console has been moved from Seata-server to Namingserver
  user:
    username: seata ## Account for console interface and open-api authentication, strongly recommended to change from default
    password: seata ## Password for console interface and open-api authentication, strongly recommended to change from default
heartbeat:
  threshold: 90000  ## Time to remove Seata-server nodes when they go down ungracefully
  period: 60000 ## Check node heartbeats every 60 seconds, remove nodes if they exceed the threshold
seata:
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017 ## Token signing key, strongly recommended to change from default
    tokenValidityInMilliseconds: 1800000 ## Token expiration time
    csrf-ignore-urls: /naming/v1/**,/api/v1/naming/** ## URLs that don't require CSRF protection, use default values as these are for client open-api
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.jpeg,/**/*.ico,/api/v1/auth/login,/version.json,/naming/v1/health,/error ## URLs that don't require authentication
```

### Client Registry Configuration

Add the following registry configuration to [**application.yml**](https://github.com/apache/incubator-seata/blob/2.x/script/client/spring/application.yml):

```yaml
seata:
  registry:
    type: seata
    seata:
      server-addr: 127.0.0.1:8081   ## IP and port of configured namingserver, use commas to separate multiple nodes
      namespace: public  ## Namespace
      heartbeat-period: 5000  ## Heartbeat interval
      username: seata
      password: seata
```

### Server Registry Configuration

Add the following configuration to `conf/application.yaml`.
For other configurations, refer to [configuration options](https://github.com/apache/incubator-seata/blob/2.x/server/src/main/resources/application.example.yml):

```yaml
seata:
  registry:
    type: seata
    seata:
      server-addr: 127.0.0.1:8081   ## IP and port of configured namingserver, use commas to separate multiple nodes
      cluster: default  ## Cluster name
      namespace: public  ## Namespace
      heartbeat-period: 5000  ## Heartbeat interval
      username: seata
      password: seata
```

### Getting a Token

If you're using IntelliJ IDEA's built-in HTTP client, you can get a token like this:

```
POST http://localhost:8081/api/v1/auth/login
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}
```

If you're using curl, you can do:

```shell
curl -X POST http://localhost:8081/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "username", "password": "password"}'
```

You'll receive a response like this. Copy the data field for use in the `authorization` header in subsequent requests:

```
{
  "code": "200",
  "message": "success",
  "data": "Bearer xxxxxxxxxx",
  "success": true
}
```

### Create the client transaction-group -> Seata cluster mapping

Start the namingserver, then start the Seata Server.

Send an HTTP request to a namingserver node to create the transaction-group mapping (the namingserver node will automatically synchronize it to other nodes):

```shell
curl -X POST -H "authorization: Bearer xxxxxxx" http://127.0.0.1:8081/naming/v1/addGroup?clusterName=cluster2&namespace=public&unitName&vGroup=my_test_tx_group
```

(where namespace is the namespace configured on the client, vGroup is the transaction group configured on the client, and clusterName is the Seata Server cluster to map to)

### Switch the client transaction-group -> Seata cluster mapping (cutover)

Send an HTTP request to a namingserver node to modify the transaction-group mapping (the namingserver node will automatically synchronize it to other nodes):

```shell
curl -X POST -H "authorization: Bearer xxxxxxx" http://127.0.0.1:8081/naming/v1/changeGroup?clusterName=cluster2&namespace=public&unitName&vGroup=my_test_tx_group
```

(where namespace is the namespace configured on the client, vGroup is the transaction group configured on the client, and clusterName is the Seata Server cluster to map to)

If there is no Seata Server available under the specified namespace and clusterName when creating the transaction group, creation will fail. After configuring the client and starting your application, you can start using Seata services.

Tips:
- 1. Ensure the client and server registries are in the same namespace, otherwise services won't be found.
- 2. Namingserver should only be used on internal networks, never expose it to public networks.
- 3. Namingserver is an experimental feature and may change in future versions. Please evaluate and test thoroughly before using in production.
- 4. Adding, deleting, or modifying transaction groups must be done through namingserver's open-api. Bypassing this may cause data inconsistency, resulting in service discovery failures or exceptions.
