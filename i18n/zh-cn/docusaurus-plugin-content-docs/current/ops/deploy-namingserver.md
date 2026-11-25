---
title: 部署 NamingServer
keywords: [Seata, NamingServer, Console, 注册中心]
description: 使用二进制包、Docker、Docker Compose 或 Kubernetes 部署 Seata NamingServer。
---

# 部署 NamingServer

Seata NamingServer 是 Seata 原生的服务注册中心，同时自 Seata 2.4 起承载了 **Seata Console（控制台）** 与 **MCP Server**（端点 `/mcp`），默认监听 HTTP 端口 `8081`。

:::caution

1. NamingServer 当前为实验性（Beta）特性，用于生产环境前请充分评估与测试。
2. NamingServer 及其内置控制台仅限在内网环境中使用，切勿直接暴露到公网；部署前务必配置强密码与自定义 JWT `secretKey`。

:::

## 环境要求与端口说明

- **JDK 要求**：运行或源码编译 `seata-namingserver` 需使用 **JDK 25 及以上版本**。
- **默认端口**：

| 端口 | 用途 | 说明 |
| :--- | :--- | :--- |
| `8081` | HTTP / 控制台 / 注册 API / MCP | NamingServer 主服务端口（支持通过 `SERVER_PORT` 或 `server.port` 修改） |
| `10055` | JMX 监控端口 | 仅在开启 `JMX_ENABLE=true` 时启用 |

## 方式一：二进制包直接部署

### 1. 下载并解压

前往 [下载页面](/download/seata-server) 或 [GitHub Releases](https://github.com/apache/incubator-seata/releases) 下载 Seata 二进制发布包并解压：

```bash
tar -zxvf apache-seata-2.6.0-incubating-bin.tar.gz
cd apache-seata-2.6.0-incubating-bin/seata-namingserver
```

### 2. 修改配置文件

编辑 `conf/application.yml`：

```yaml
server:
  port: 8081

console:
  user:
    username: seata
    password: your_strong_password

seata:
  security:
    # 生产环境请替换为至少 32 字节随机串的 Base64 编码，例如：openssl rand -base64 32
    secretKey: <your-base64-secret-key>
    tokenValidityInMilliseconds: 14400000
```

:::tip
如果未配置 `console.user.password`，NamingServer 启动时会自动生成一个 8 位随机密码并打印在日志中，可通过日志关键字 `auto-generated password` 查看。
:::

### 3. 启动服务

- Linux / macOS：

```bash
sh ./bin/seata-namingserver.sh start
```

常用启停命令：

```bash
sh ./bin/seata-namingserver.sh stop
sh ./bin/seata-namingserver.sh restart
```

- Windows：

```cmd
bin\seata-namingserver.bat
```

启动后可在浏览器访问控制台 `http://<host>:8081`，或通过 `GET http://<host>:8081/naming/v1/health` 检查健康状态。

## 方式二：Docker 部署

DockerHub 官方镜像仓库为 `apache/seata-naming-server`，`2.6.0` 版本镜像标签为 `2.6.0.jdk25`。

### 快速启动

```bash
docker run -d --name seata-naming-server \
  -p 8081:8081 \
  apache/seata-naming-server:2.6.0.jdk25
```

若未显式设置控制台密码，可通过以下命令查看自动生成的随机密码：

```bash
docker logs seata-naming-server | grep "auto-generated password"
```

### 使用自定义配置文件启动

官方 Jib 镜像内部配置路径为 `/seata-naming-server/resources/application.yml`（若使用仓库中的 `distribution/docker/namingserver/Dockerfile` 自建镜像，则路径为 `/seata-namingserver/conf/application.yml`）。

1. 先启动临时容器导出默认配置：

   ```bash
   docker run -d --name seata-naming-tmp apache/seata-naming-server:2.6.0.jdk25
   mkdir -p ./namingserver-conf
   docker cp seata-naming-tmp:/seata-naming-server/resources/. ./namingserver-conf/
   docker rm -f seata-naming-tmp
   ```

2. 编辑 `./namingserver-conf/application.yml`（配置 `console.user.username`、`console.user.password` 和 `seata.security.secretKey`），然后挂载目录启动：

   ```bash
   docker run -d --name seata-naming-server \
     -p 8081:8081 \
     -e TZ=Asia/Shanghai \
     -v $(pwd)/namingserver-conf:/seata-naming-server/resources \
     -v $(pwd)/namingserver-logs:/root/logs/seata \
     apache/seata-naming-server:2.6.0.jdk25
   ```

### 常用环境变量

| 环境变量 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `SERVER_PORT` | NamingServer HTTP 监听端口 | `8081` |
| `SEATA_SECURITY_SECRETKEY` | JWT 签名密钥（Base64 编码） | 内置示例密钥（生产务必替换） |
| `LOG_HOME` | 日志输出目录 | `$HOME/logs/seata` |
| `JVM_XMX` / `JVM_XMS` | JVM 最大 / 初始堆内存 | `2048m` |
| `JVM_MaxDirectMemorySize` | JVM 最大堆外内存 | `1024m` |
| `JMX_ENABLE` / `JMX_PORT` | 是否开启 JMX 及监听端口 | `false` / `10055` |
| `TZ` | 容器时区 | `Asia/Shanghai` |

:::note
控制台密码（`console.user.password`）及集群配置建议通过挂载 `application.yml` 进行管理。生成随机 Base64 JWT 密钥可使用 `openssl rand -base64 32`。
:::

## 方式三：Docker Compose 部署

创建 `docker-compose.yaml`：

```yaml
services:
  seata-naming-server:
    image: apache/seata-naming-server:2.6.0.jdk25
    container_name: seata-naming-server
    hostname: seata-naming-server
    ports:
      - "8081:8081"
    environment:
      - SERVER_PORT=8081
      - TZ=Asia/Shanghai
    volumes:
      - ./namingserver-conf:/seata-naming-server/resources
      - ./namingserver-logs:/root/logs/seata
    restart: unless-stopped
```

启动与查看日志：

```bash
docker compose up -d
docker compose logs -f seata-naming-server
```

## 方式四：Kubernetes 部署

以下示例通过 `ConfigMap` 挂载配置文件，并配置 `/naming/v1/health` 存活与就绪探针：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: seata-naming-server-config
  namespace: default
data:
  application.yml: |
    server:
      port: 8081
    spring:
      threads:
        virtual:
          enabled: true
      application:
        name: seata-namingserver
    logging:
      config: classpath:logback-spring.xml
      file:
        path: ${log.home:${user.home}/logs/seata}
    heartbeat:
      threshold: 90000
      period: 60000
    console:
      user:
        username: seata
        password: change_this_password
    seata:
      namingserver:
        metrics:
          enabled: true
      security:
        secretKey: <your-base64-secret-key>
        tokenValidityInMilliseconds: 14400000
        csrf-ignore-urls: /naming/v1/**,/api/v1/naming/**
        ignore:
          urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.jpeg,/**/*.ico,/**/*.woff,/**/*.woff2,/**/*.ttf,/api/v1/auth/login,/version.json,/naming/v1/health,/error,/saga-statemachine-designer/**

---

apiVersion: v1
kind: Service
metadata:
  name: seata-naming-server
  namespace: default
  labels:
    app: seata-naming-server
spec:
  type: ClusterIP
  ports:
    - name: http
      port: 8081
      targetPort: 8081
      protocol: TCP
  selector:
    app: seata-naming-server

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: seata-naming-server
  namespace: default
  labels:
    app: seata-naming-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: seata-naming-server
  template:
    metadata:
      labels:
        app: seata-naming-server
    spec:
      containers:
        - name: seata-naming-server
          image: docker.io/apache/seata-naming-server:2.6.0.jdk25
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8081
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /naming/v1/health
              port: 8081
            initialDelaySeconds: 30
            periodSeconds: 15
          readinessProbe:
            httpGet:
              path: /naming/v1/health
              port: 8081
            initialDelaySeconds: 15
            periodSeconds: 10
          volumeMounts:
            - name: namingserver-config
              mountPath: /seata-naming-server/resources/application.yml
              subPath: application.yml
      volumes:
        - name: namingserver-config
          configMap:
            name: seata-naming-server-config
```

## 后续配置

部署完成后，请参考 [Namingserver 注册中心使用指南](../user/registry/namingserver) 配置 `seata-server` 与客户端的 `seata.registry.type: seata`，并通过 Open-API 或控制台维护事务分组与集群的映射关系。
