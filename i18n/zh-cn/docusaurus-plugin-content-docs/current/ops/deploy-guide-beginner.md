---
title: 新人文档
keywords: [Seata, 部署指南, 快速开始]
description: Seata 分 TC、TM 和 RM 三个角色，TC（Server 端）与 NamingServer 为独立服务端组件，TM 和 RM（Client 端）由业务系统集成。
---

# 部署指南

## Seata 新手部署指南

Apache Seata 分 TC、TM 和 RM 三个角色：

- **TC（Transaction Coordinator）**：即 `seata-server`，作为独立服务端部署，默认监听 `8091` 端口（同时承载业务 RPC 与控制面 HTTP API；自 2.4 起控制台已迁移至独立的 `seata-namingserver`，端口 `8081`）。
- **TM & RM（Client 端）**：由业务微服务应用通过 SDK 集成。

### 环境要求

- **Seata Server**：`2.x` 主干（2.7.0 及以上）需要 **JDK 17 及以上**；`2.6.0` 发行版兼容 JDK 8 / 17 / 21 / 25。
- **Seata NamingServer（可选，原生注册中心与控制台）**：需要 **JDK 25 及以上**。

### 资源目录介绍

查看源码脚本目录：[incubator-seata script（2.x 分支）](https://github.com/apache/incubator-seata/tree/2.x/script)（也可根据目标版本标签切换分支）。

- `client`：存放 Client 端 SQL 脚本（包含 `undo_log` 表）及参数配置示例。
- `config-center`：各个配置中心（Nacos、Apollo、Consul、Etcd3、ZooKeeper）参数导入脚本，`config.txt` 为通用参数模板。
- `server`：Server 端数据库建表脚本（位于 `script/server/db/`，包含 `global_table`、`branch_table`、`lock_table`、`distributed_lock`、`vgroup_table`）以及容器部署配置模板。

### 客户端集成注意事项

- **`seata-spring-boot-starter`**：
  - 内置 `GlobalTransactionScanner` 自动初始化功能；若需自定义装配顺序，可参考 `SeataAutoConfiguration`。
  - 默认开启数据源自动代理（AT 模式），可通过 `seata.enable-auto-data-source-proxy: false` 关闭。
- **`spring-cloud-starter-alibaba-seata` 兼容提示**：
  - 若使用 Spring Cloud Alibaba 并自行升级 Seata 版本，推荐排除其传递引入的旧版 Seata Starter，显式声明 `org.apache.seata:seata-spring-boot-starter`：

```xml
<dependency>
    <groupId>org.apache.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>2.6.0</version>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    <version>最新版本</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### 启动 Server

Server 端存储模式（`seata.store.mode`）支持 `file`、`db`、`redis`、`raft`：

- **`file` 模式**：单机模式，全局事务会话信息在内存中读写并异步（默认）持久化到本地目录 `sessionStore`，性能较高，无需改动即可直接启动。
- **`db` 模式**：高可用模式，通过数据库共享事务会话与全局锁信息。
- **`redis` 模式**：性能较高，但存在持久化配置不当导致事务状态丢失的风险，请提前配置合理的 Redis 持久化策略。
- **`raft` 模式**：存算一体的高可用集群模式，详细配置请查看 [部署 Raft 集群](./deploy-server-raft)。

如需使用 Seata 原生注册中心与控制台（`8081` 端口），请先参考 [部署 NamingServer](./deploy-namingserver)。

#### 步骤一：获取发行包

- 前往 [Seata 下载页面](/download/seata-server) 或 [GitHub Releases](https://github.com/apache/incubator-seata/releases) 下载 `apache-seata-{version}-incubating-bin.tar.gz`（或 `.zip`）并解压。
- 也可加入 [Seata 社区交流群](/community) 获取社区支持。

解压后包含 `seata-server/` 与 `seata-namingserver/` 两个独立组件目录。

#### 步骤二：建表（仅 `db` 模式）

使用 `script/server/db/` 目录下对应数据库类型（如 `mysql.sql`、`postgresql.sql`、`oracle.sql` 等）的 SQL 脚本初始化表结构（包含 `global_table`、`branch_table`、`lock_table`、`distributed_lock`、`vgroup_table`）。

#### 步骤三：修改 `store.mode`

- 二进制包：`seata-server/conf/application.yml`，设置 `seata.store.mode` 为 `db` 或 `redis`（默认 `file`）。
- 源码调试：`server/src/main/resources/application.yml`，设置 `seata.store.mode` 为 `db` 或 `redis`。

#### 步骤四：修改数据库或 Redis 连接配置

`seata-server/conf/application.example.yml`（源码中为 `server/src/main/resources/application.example.yml`）附带了完整配置示例，可将对应的 `seata.store.db` 或 `seata.store.redis` 段落复制到 `application.yml` 并修改连接地址与认证信息。

#### 步骤五：启动 Server

- 源码启动：在 IDE 中运行 `org.apache.seata.server.ServerApplication` 的 `main` 方法。
- 命令启动：进入 `seata-server` 目录后执行：

```bash
sh ./bin/seata-server.sh -h 127.0.0.1 -p 8091 -m db
```

常用参数说明（更多参数见 [直接部署 Server](./deploy-server)）：

```text
-h, --host         指定向注册中心注册的 IP（必须为 IPv4/IPv6 字面量，不可填写主机名）
-p, --port         指定 Server 监听端口（默认 8091，同时承载 RPC 与 HTTP API）
-m, --storeMode    全局事务存储模式：file、db、redis
-n, --serverNode   Server 节点 ID，不指定时默认按雪花算法自动生成
-e, --seataEnv     多环境隔离标识，参见多配置隔离文档
```

- 容器化部署：参见 [使用 Docker 部署](./deploy-by-docker)。
- 内存建议：未手动指定 `JVM_XMX`/`JVM_XMS` 时，启动脚本会自动根据容器或主机内存计算堆大小（默认回退为堆内存 `2048m`、堆外内存 `1024m`）。

### 业务系统集成 Client

#### 步骤一：添加 Seata 依赖（推荐二选一）

- **`seata-spring-boot-starter`**：支持 Spring Boot `application.yml` / `application.properties` 配置，内部已包含 `seata-all`。
- **`seata-all`**：适用于非 Spring Boot 应用。

```xml
<dependency>
    <groupId>org.apache.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>2.6.0</version>
</dependency>
```

#### 步骤二：`undo_log` 建表与配置参数（仅 AT 模式）

在业务数据库中创建 `undo_log` 表（脚本位于 `script/client/at/db/`），配置说明参见 [参数配置](../user/configurations)。

#### 步骤三：数据源代理（不可与手动配置并存）

##### 1. 如果使用 `seata-all`

- 可通过注解 `@EnableAutoDataSourceProxy` 开启自动代理；若采用 XA 模式，配置 `@EnableAutoDataSourceProxy(dataSourceProxyMode = "XA")`。
- 或手动包装数据源 Bean：

```java
@Primary
@Bean("dataSource")
public DataSource dataSource(DataSource druidDataSource) {
    // AT 模式代理与 XA 模式代理二选一
    return new DataSourceProxy(druidDataSource);
    // return new DataSourceProxyXA(druidDataSource);
}
```

##### 2. 如果使用 `seata-spring-boot-starter`

- 默认已开启 AT 自动代理；如需切换为 XA 模式，在 `application.yml` 中配置：

```yaml
seata:
  data-source-proxy-mode: XA
```

- 如需关闭自动代理：

```yaml
seata:
  enable-auto-data-source-proxy: false
```

#### 步骤四：初始化 `GlobalTransactionScanner`

- 使用 `seata-spring-boot-starter` 时会自动完成装配。
- 非 Starter 场景可手动注册 Bean：

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

#### 步骤五：实现 XID 跨服务传递

- 使用 Spring Cloud / Dubbo / gRPC 等常见微服务框架时，确保引入对应支持或检查 `integration` 模块的透传拦截器已生效，以保证分布式调用链中 `XID` 正确传递。

### 业务使用示例

#### 全局事务注解 `@GlobalTransactional`

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

#### TCC 模式 `@TwoPhaseBusinessAction`

```java
/**
 * 定义两阶段提交：name 为全局唯一的 TCC Bean 名称；
 * commitMethod 为二阶段确认方法；rollbackMethod 为二阶段回滚方法；
 * useTCCFence = true 开启防悬挂与幂等控制。
 */
@TwoPhaseBusinessAction(name = "beanName", commitMethod = "commit", rollbackMethod = "rollback", useTCCFence = true)
public void insert(@BusinessActionContextParameter(paramName = "params") Map<String, String> params) {
    logger.info("Try phase: reserve resources or stage messages for phase 2");
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

#### 切点表达式拦截

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
