---
title: Beginner Deployment Guide
keywords: [Seata, Deployment, Quick Start]
description: Seata has three roles (TC, TM, and RM). TC (Seata Server) and NamingServer run as standalone server components, while TM and RM (Client side) are integrated into business services.
---

# Deployment Guide

## Seata Beginner Deployment Guide

Apache Seata consists of three roles: TC, TM, and RM:

- **TC (Transaction Coordinator)**: `seata-server`, deployed as a standalone server. It listens on port `8091` by default for both RPC and control HTTP APIs (since Seata 2.4, the Console has been moved to `seata-namingserver` on port `8081`).
- **TM & RM (Client side)**: Embedded inside business microservices via the Seata SDK.

### Prerequisites

- **Seata Server**: The `2.6.0` release supports JDK 8 / 17 / 21 / 25 (JDK 17+ is recommended).
- **Seata NamingServer (optional, native registry and Console)**: Requires **JDK 25 or later**.

### Resource Directory Overview

Browse the scripts in the repository: [incubator-seata script (2.x branch)](https://github.com/apache/incubator-seata/tree/2.x/script) (or switch to tag `v2.6.0`).

- `client`: Client-side SQL scripts (including `undo_log`) and sample client configurations.
- `config-center`: Scripts to push configuration items to Nacos, Apollo, Consul, Etcd3, or ZooKeeper, along with the shared `config.txt` template.
- `server`: Server-side database schema scripts (`script/server/db/`, including `global_table`, `branch_table`, `lock_table`, `distributed_lock`, `vgroup_table`) and container deployment templates.

### Client Integration Notes

- **`seata-spring-boot-starter`**:
  - Automatically initializes `GlobalTransactionScanner`. If custom initialization ordering is needed, refer to `SeataAutoConfiguration`.
  - Auto data source proxying (AT mode) is enabled by default and can be disabled via `seata.enable-auto-data-source-proxy: false`.
- **`spring-cloud-starter-alibaba-seata` compatibility**:
  - When using Spring Cloud Alibaba and upgrading Seata explicitly, exclude its transitive old Seata starter and declare `org.apache.seata:seata-spring-boot-starter`:

```xml
<dependency>
    <groupId>org.apache.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>2.6.0</version>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    <version>latest-version</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### Start Server

The server storage mode (`seata.store.mode`) supports `file`, `db`, `redis`, and `raft`:

- **`file` mode**: Standalone mode. Global transaction session state is held in memory and persisted asynchronously (by default) to the local `sessionStore` directory. It works out of the box with high throughput.
- **`db` mode**: High-availability mode sharing transaction state and global locks through a database.
- **`redis` mode**: High-throughput mode; ensure appropriate Redis persistence is configured to avoid losing transaction state on restart.
- **`raft` mode**: Integrated storage-and-compute cluster mode; see [Deploying Raft Cluster](./deploy-server-raft).

If you want to use Seata's native registry center and Web Console (`8081`), deploy NamingServer first by following [Deploy NamingServer](./deploy-namingserver).

#### Step 1: Download the Binary Package

- Download `apache-seata-2.6.0-incubating-bin.tar.gz` (or `.zip`) from the [Download Page](/download/seata-server) or [GitHub Releases](https://github.com/apache/incubator-seata/releases) and extract it.
- Community channels are available on the [Community Page](/community).

After extraction, the archive contains two independent directories: `seata-server/` and `seata-namingserver/`.

#### Step 2: Create Tables (`db` mode only)

Run the SQL script matching your database under `script/server/db/` (e.g., `mysql.sql`, `postgresql.sql`, `oracle.sql`) to create `global_table`, `branch_table`, `lock_table`, `distributed_lock`, and `vgroup_table`.

#### Step 3: Set `store.mode`

- Binary package: Edit `seata-server/conf/application.yml` and set `seata.store.mode` to `db` or `redis` (default is `file`).
- Source code: Edit `server/src/main/resources/application.yml` and set `seata.store.mode` to `db` or `redis`.

#### Step 4: Configure Database or Redis Connection

Full examples are provided in `seata-server/conf/application.example.yml` (`server/src/main/resources/application.example.yml` in source). Copy the `seata.store.db` or `seata.store.redis` section into `application.yml` and update your connection URL and credentials.

#### Step 5: Start Server

- From source: Run `org.apache.seata.server.ServerApplication` in your IDE.
- From CLI: Inside `seata-server/`, run:

```bash
sh ./bin/seata-server.sh -h 127.0.0.1 -p 8091 -m db
```

Common options (see [Deploy Server](./deploy-server) for the complete reference):

```text
-h, --host         IP registered to the registry center (must be an IPv4/IPv6 literal, not a hostname)
-p, --port         Server listening port (default 8091, serves both RPC and HTTP APIs)
-m, --storeMode    Global transaction store mode: file, db, redis
-n, --serverNode   Server node ID (auto-generated via Snowflake by default)
-e, --seataEnv     Environment identifier for multi-configuration isolation
```

- Container deployment: See [Deploy Seata Server By Docker](./deploy-by-docker).
- Memory sizing: When `JVM_XMX`/`JVM_XMS` are not set, the startup script computes heap sizing automatically from host or cgroup memory limits (falling back to `2048m` heap and `1024m` direct memory).

### Integrate Client into Business Applications

#### Step 1: Add Seata Dependency (choose one)

- **`seata-spring-boot-starter`**: Supports Spring Boot `application.yml` / `application.properties` and includes `seata-all`.
- **`seata-all`**: For non-Spring Boot applications.

```xml
<dependency>
    <groupId>org.apache.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>2.6.0</version>
</dependency>
```

#### Step 2: Create `undo_log` Table and Configure Properties (AT mode only)

Create the `undo_log` table in each business database using the scripts in `script/client/at/db/`. Refer to [Configurations](../user/configurations) for client properties.

#### Step 3: Configure DataSource Proxy (do not mix auto and manual configuration)

##### 1. Using `seata-all`

- Enable automatic proxying with `@EnableAutoDataSourceProxy` (for XA mode, use `@EnableAutoDataSourceProxy(dataSourceProxyMode = "XA")`).
- Or wrap the `DataSource` bean manually:

```java
@Primary
@Bean("dataSource")
public DataSource dataSource(DataSource druidDataSource) {
    // Choose either AT or XA proxy
    return new DataSourceProxy(druidDataSource);
    // return new DataSourceProxyXA(druidDataSource);
}
```

##### 2. Using `seata-spring-boot-starter`

- AT auto proxy is enabled by default. To switch to XA mode, configure `application.yml`:

```yaml
seata:
  data-source-proxy-mode: XA
```

- To disable automatic data source proxying:

```yaml
seata:
  enable-auto-data-source-proxy: false
```

#### Step 4: Initialize `GlobalTransactionScanner`

- Automatically configured when using `seata-spring-boot-starter`.
- For manual registration:

```java
@Bean
public GlobalTransactionScanner globalTransactionScanner() {
    String applicationName = this.applicationContext.getEnvironment().getProperty("spring.application.name");
    String txServiceGroup = this.seataProperties.getTxServiceGroup();
    if (StringUtils.isEmpty(txServiceGroup)) {
        txServiceGroup = applicationName + "-seata-service-group";
        this.seataProperties.setTxServiceGroup(txServiceGroup);
    }
    return new GlobalTransactionScanner(applicationName, txServiceGroup);
}
```

#### Step 5: Propagate XID Across Services

- When using Spring Cloud, Dubbo, gRPC, or other RPC frameworks, ensure the corresponding Seata integration interceptor is active so the `XID` header/context propagates across service calls.

### Business Usage Examples

#### Global Transaction Annotation (`@GlobalTransactional`)

```java
@GetMapping(value = "testCommit")
@GlobalTransactional
public Object testCommit(
        @RequestParam(name = "id", defaultValue = "1") Integer id,
        @RequestParam(name = "sum", defaultValue = "1") Integer sum) {
    Boolean ok = productService.reduceStock(id, sum);
    if (Boolean.TRUE.equals(ok)) {
        LocalDateTime now = LocalDateTime.now();
        Orders orders = new Orders();
        orders.setCreateTime(now);
        orders.setProductId(id);
        orders.setReplaceTime(now);
        orders.setSum(sum);
        orderService.save(orders);
        return "ok";
    }
    return "fail";
}
```

#### TCC Mode (`@TwoPhaseBusinessAction`)

```java
/**
 * Define a two-phase TCC action:
 * name must be globally unique; commitMethod and rollbackMethod identify phase-2 methods;
 * useTCCFence = true enables anti-hanging and idempotency protection.
 */
@TwoPhaseBusinessAction(name = "beanName", commitMethod = "commit", rollbackMethod = "rollback", useTCCFence = true)
public void insert(@BusinessActionContextParameter(paramName = "params") Map<String, String> params) {
    logger.info("Try phase: reserve resources or stage phase-2 messages");
}

public boolean commit(BusinessActionContext context) {
    logger.info("Confirm phase: commit reserved resources");
    return true;
}

public boolean rollback(BusinessActionContext context) {
    logger.info("Cancel phase: release reserved resources");
    return true;
}
```

#### Pointcut Expression Interception

```java
@Bean
public AspectTransactionalInterceptor aspectTransactionalInterceptor() {
    return new AspectTransactionalInterceptor();
}

@Bean
public Advisor txAdviceAdvisor(AspectTransactionalInterceptor aspectTransactionalInterceptor) {
    AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
    pointcut.setExpression("execution(* com.example.service..*(..))");
    return new DefaultPointcutAdvisor(pointcut, aspectTransactionalInterceptor);
}
```
