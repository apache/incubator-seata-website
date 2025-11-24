---
title: Seata Namingserver 注册中心
keywords: [ Seata, Namingserver ]
description: namingserver 注册中心。
---

# Namingserver 注册中心（beta）

Namingserver 是 Seata 原生的注册中心.

## 预备工作

从[链接](https://seata.apache.org/download/seata-server/)下载seata的二进制压缩包

### 编译器运行namingserver

如果您需要本地调试或开发namingserver，请导入Seata源码，并找到`namingserver`模块，在`resources/application.yml`下设置namingserver启动的端口号，启动namingserver

### 运行namingserver

解压后进入seata-namingserver目录，打开目录下的conf/application.yml中配置namingserver启动的端口号，
mac或linux运行
```shell
bin\seata-namingserver.sh
```
windows环境运行
```shell
bin\seata-namingserver.bat
```

### Docker 运行 namingserver

#### 拉取镜像
```shell
docker pull apache/seata-naming-server:latest
```

#### 快速启动
```shell
docker run -d --name seata-naming-server \
  -p 8081:8081 \
  apache/seata-naming-server:latest
```

**重要提示**：如果不配置控制台密码，系统会在启动时自动生成一个随机密码并在日志中显示。使用以下命令查看：
```shell
docker logs seata-naming-server | grep "auto-generated password"
```

#### 使用环境变量启动
```shell
docker run -d --name seata-naming-server \
  -p 8081:8081 \
  -p 10055:10055 \
  -e SERVER_PORT=8081 \
  -e SEATA_SECURITY_SECRETKEY=TXlDdXN0b21TZWNyZXRLZXlGb3JTZWF0YUpXVDIwMjQ= \
  -e SEATA_SECURITY_TOKEN_VALIDITY=1800000 \
  -v ./logs:/logs/seata \
  apache/seata-naming-server:latest
```

#### 使用自定义配置文件启动
```shell
docker run -d --name seata-naming-server \
  -p 8081:8081 \
  -v /path/to/application.yml:/seata-namingserver/conf/application.yml \
  -v ./logs:/logs/seata \
  apache/seata-naming-server:latest
```

#### 使用 Docker Compose 启动

创建 `docker-compose.yml` 文件：
```yaml
version: "3"

services:
  seata-naming-server:
    image: apache/seata-naming-server:latest
    container_name: seata-naming-server
    hostname: seata-naming-server
    ports:
      - "8081:8081"
      - "10055:10055"
    environment:
      - SERVER_PORT=8081
      - SEATA_SECURITY_SECRETKEY=TXlDdXN0b21TZWNyZXRLZXlGb3JTZWF0YUpXVDIwMjQ=
      - SEATA_SECURITY_TOKEN_VALIDITY=1800000
    volumes:
      - ./logs:/logs/seata
      # 可选：挂载自定义配置文件
      # 官方镜像(JIB构建)示例：
      # - ./conf/application.yml:/seata-naming-server/resources/application.yml
      # Dockerfile构建镜像示例(https://github.com/apache/incubator-seata/blob/2.x/distribution/docker/namingserver/Dockerfile)：
      # - ./conf/application.yml:/seata-namingserver/conf/application.yml
    restart: unless-stopped
```

启动服务：
```shell
docker-compose up -d
```

查看日志：
```shell
docker-compose logs -f seata-naming-server
```

停止服务：
```shell
docker-compose down
```

#### Docker 环境变量说明

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| SERVER_PORT | Namingserver HTTP 端口 | 8081 |
| SEATA_SECURITY_SECRETKEY | JWT Token 签名密钥（Base64 编码） | 内置密钥 |
| SEATA_SECURITY_TOKEN_VALIDITY | Token 有效期（毫秒） | 1800000（30分钟） |
| LOG_HOME | 日志存储路径 | `${user.home}/logs/seata` |


**注意**：控制台账户和密码配置不支持通过环境变量设置，必须在 `application.yml` 配置文件中配置。

#### 生成安全密钥

JWT 密钥必须是 Base64 编码的字符串，可使用以下命令生成：
```shell
# 生成随机密钥
openssl rand -base64 32

# 或将自定义字符串转为 Base64
echo -n "MyCustomSecretKeyForSeataJWT2024" | base64
```
## 快速上手

Seata 使用 namingserver 作为注册中心的操作步骤非常简单，分为在client端的配置以及在server端的配置

### Namingserver 配置说明

```yaml
server:
  port: 8081 ## namingserver的端口
spring:
  application:
    name: seata-namingserver
logging:
  config: classpath:logback-spring.xml
  file:
    path: ${log.home:${user.home}/logs/seata}
console: ## 2.4开始控制台从Seata-server迁移至Namingserver，故此配置为控制台相关配置
  user:
    username: seata ## 控制台界面，和open-api鉴权所需账号，强烈建议修改不要采用默认值
    password: seata ## 控制台界面，和open-api鉴权所需密码，强烈建议修改不要采用默认值
heartbeat:
  threshold: 90000  ## 当Seata-server节点非优雅下线时，摘除时间
  period: 60000 ## 每60秒检查节点心跳是否正常，如果超过threshold的配置，将进行摘除
seata:
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017 ## 签发token秘钥，强烈建议修改，不要采用默认值
    tokenValidityInMilliseconds: 1800000 ## token过期时间
    csrf-ignore-urls: /naming/v1/**,/api/v1/naming/** ## 无需csrf防护接口，采用默认值即可，因为此默认值是提供给client的open-api，不通过控制台。
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.jpeg,/**/*.ico,/api/v1/auth/login,/version.json,/naming/v1/health,/error ## 无需鉴权的相关接口
```

### Client端配置注册中心

在 [**application.yml**](https://github.com/apache/incubator-seata/blob/2.x/script/client/spring/application.yml)
中加入对应的注册中心。

```yaml
seata:
  registry:
    type: seata
    seata:
      server-addr: 127.0.0.1:8081   ##第一步配置的namingserver的ip+端口，若有多个namingserver节点则用逗号分割
      namespace: public  ##命名空间
      heartbeat-period: 5000  ##心跳时间
      username: seata
      password: seata
```

### Server端配置注册中心

在 `conf/application.yaml`加入以下配置,
其余配置参考 [configuration options](https://github.com/apache/incubator-seata/blob/2.x/server/src/main/resources/application.example.yml):

```yaml
seata:
  registry:
    type: seata
    seata:
      server-addr: 127.0.0.1:8081   ##第一步配置的namingserver的ip+端口，若有多个namingserver节点则用逗号分割
      cluster: default  ##集群名称
      namespace: public  ##命名空间
      heartbeat-period: 5000  ##心跳时间
      username: seata
      password: seata
```

### 获取token

如果你使用idea自带的httpclient，可参考以下方式获取token

```
POST http://localhost:8081/api/v1/auth/login
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}
```

如果你使用curl，可参考以下方式获取token

```shell
curl -X POST http://localhost:8081/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "username", "password": "password"}'
```

将会得到如下响应，请复制其中的data放入后续的`authorization`请求头中

```
{
  "code": "200",
  "message": "success",
  "data": "Bearer xxxxxxxxxx",
  "success": true
}
```

### 创建client端的事务分组->seata集群的映射关系

先启动namingserver,随后,启动 Seata-Server

向一个namingserver节点发起创建事务分组映射关系的http请求（namingserver节点会自动同步给其它节点）

```shell
curl -X POST -H "authorization: Bearer xxxxxxx" http://127.0.0.1:8081/naming/v1/addGroup?clusterName=cluster2&namespace=public&unitName&vGroup=my_test_tx_group
```

（其中namespace是client端配置的命名空间，vGroup是client端配置的事务分组，clusterName是需要映射到的server端的集群名称）

### 切换client端的事务分组->seata集群的映射关系（切流）

向一个namingserver节点发起修改事务分组映射关系的http请求（namingserver节点会自动同步给其它节点）

```shell
curl -X POST -H "authorization: Bearer xxxxxxx" http://127.0.0.1:8081/naming/v1/changeGroup?clusterName=cluster2&namespace=public&unitName&vGroup=my_test_tx_group
```

（其中namespace是client端配置的命名空间，vGroup是client端配置的事务分组，clusterName是需要映射到的server端的集群名称）

如果你创建事务分组时指定的namespace和clusterName下没有对应的Seata-Server，那么创建事务分组会失败。
Client 配置完成后启动应用就可以正式体验 Seata 服务。

Tips：
- 1.请确保client与server的注册处于同一个namespace，不然会找不到服务。
- 2.注意namingserver只允许在内网使用,切勿暴露到公网环境
- 3.namingserver处于实验性feature，故后续可能有一定改动，请评估和测试到位后再投入使用
- 4.针对事务分组的增删改必须通过namingserver的open-api，如果绕过可能会导致数据不一致，造成服务发现失败或者异常
