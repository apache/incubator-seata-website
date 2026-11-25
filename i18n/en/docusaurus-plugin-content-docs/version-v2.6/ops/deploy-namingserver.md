---
title: Deploy NamingServer
keywords: [Seata, NamingServer, Console, Registry]
description: Deploy Seata NamingServer via binary package, Docker, Docker Compose, or Kubernetes.
---

# Deploy NamingServer

Seata NamingServer is Seata's native registry center. Since Seata 2.4, it also hosts the **Seata Console** and the **MCP Server** (`/mcp`), listening on HTTP port `8081` by default.

:::caution

1. NamingServer is currently an experimental (Beta) feature. Evaluate and test it thoroughly before deploying to production.
2. NamingServer and its built-in Console are intended for internal network use only. Never expose them directly to the public internet, and always configure a strong console password and custom JWT `secretKey`.

:::

## Prerequisites and Ports

- **JDK Requirement**: Running or building `seata-namingserver` requires **JDK 25 or later**.
- **Default Ports**:

| Port | Purpose | Description |
| :--- | :--- | :--- |
| `8081` | HTTP / Console / Registry API / MCP | Main NamingServer port (configurable via `SERVER_PORT` or `server.port`) |
| `10055` | JMX port | Enabled only when `JMX_ENABLE=true` |

## Option 1: Binary Package

### 1. Download and Extract

Download the Seata 2.6.0 binary distribution from the [Download Page](/download/seata-server) or [GitHub Releases](https://github.com/apache/incubator-seata/releases) and extract it:

```bash
tar -zxvf apache-seata-2.6.0-incubating-bin.tar.gz
cd apache-seata-2.6.0-incubating-bin/seata-namingserver
```

### 2. Edit Configuration

Edit `conf/application.yml`:

```yaml
server:
  port: 8081

console:
  user:
    username: seata
    password: your_strong_password

seata:
  security:
    # Replace with a Base64-encoded random 32-byte key in production, e.g.: openssl rand -base64 32
    secretKey: <your-base64-secret-key>
    tokenValidityInMilliseconds: 14400000
```

:::tip
If `console.user.password` is left empty, NamingServer generates an 8-character random password on startup and logs it with the message `auto-generated password`.
:::

### 3. Start the Service

- Linux / macOS:

```bash
sh ./bin/seata-namingserver.sh start
```

Common lifecycle commands:

```bash
sh ./bin/seata-namingserver.sh stop
sh ./bin/seata-namingserver.sh restart
```

- Windows:

```cmd
bin\seata-namingserver.bat
```

Once started, open the Console at `http://<host>:8081` or verify readiness via `GET http://<host>:8081/naming/v1/health`.

## Option 2: Docker

The official DockerHub repository is `apache/seata-naming-server`. For `2.6.0`, the image tag is `2.6.0.jdk25`.

### Quick Start

```bash
docker run -d --name seata-naming-server \
  -p 8081:8081 \
  apache/seata-naming-server:2.6.0.jdk25
```

If no password was configured, retrieve the auto-generated password from container logs:

```bash
docker logs seata-naming-server | grep "auto-generated password"
```

### Using Custom Configuration

In the official Jib-built image, configuration files reside at `/seata-naming-server/resources/application.yml` (whereas images built from `distribution/docker/namingserver/Dockerfile` use `/seata-namingserver/conf/application.yml`).

1. Start a temporary container to extract the default configuration:

   ```bash
   docker run -d --name seata-naming-tmp apache/seata-naming-server:2.6.0.jdk25
   mkdir -p ./namingserver-conf
   docker cp seata-naming-tmp:/seata-naming-server/resources/. ./namingserver-conf/
   docker rm -f seata-naming-tmp
   ```

2. Update `./namingserver-conf/application.yml` (`console.user.username`, `console.user.password`, `seata.security.secretKey`) and mount it when starting the container:

   ```bash
   docker run -d --name seata-naming-server \
     -p 8081:8081 \
     -e TZ=Asia/Shanghai \
     -v $(pwd)/namingserver-conf:/seata-naming-server/resources \
     -v $(pwd)/namingserver-logs:/root/logs/seata \
     apache/seata-naming-server:2.6.0.jdk25
   ```

### Common Environment Variables

| Environment Variable | Description | Default |
| :--- | :--- | :--- |
| `SERVER_PORT` | NamingServer HTTP port | `8081` |
| `SEATA_SECURITY_SECRETKEY` | Base64-encoded JWT signing key | Built-in demo key (must change in production) |
| `LOG_HOME` | Log output directory | `$HOME/logs/seata` |
| `JVM_XMX` / `JVM_XMS` | JVM max / initial heap size | `2048m` |
| `JVM_MaxDirectMemorySize` | JVM max direct memory | `1024m` |
| `JMX_ENABLE` / `JMX_PORT` | Enable JMX and JMX port | `false` / `10055` |
| `TZ` | Container timezone | `Asia/Shanghai` |

:::note
Configure console credentials (`console.user.password`) and cluster settings via mounted `application.yml`. You can generate a random Base64 JWT key with `openssl rand -base64 32`.
:::

## Option 3: Docker Compose

Create `docker-compose.yaml`:

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

Start and follow logs:

```bash
docker compose up -d
docker compose logs -f seata-naming-server
```

## Option 4: Kubernetes

The following manifest mounts `application.yml` via a `ConfigMap` and configures `/naming/v1/health` liveness and readiness probes:

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
      security:
        secretKey: <your-base64-secret-key>
        tokenValidityInMilliseconds: 14400000
        csrf-ignore-urls: /naming/v1/**,/api/v1/naming/**
        ignore:
          urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.jpeg,/**/*.ico,/api/v1/auth/login,/version.json,/naming/v1/health,/error,/saga-statemachine-designer/**

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

## Next Steps

After NamingServer is running, refer to the [Namingserver Registry Guide](../user/registry/namingserver) to configure `seata.registry.type: seata` on both `seata-server` and client applications, and bind transaction groups to Seata clusters via the Console or Open-API.
