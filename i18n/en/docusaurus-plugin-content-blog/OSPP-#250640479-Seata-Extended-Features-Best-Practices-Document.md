---
title: OSPP-#250640479-Seata Extended Features Best Practices Document
keywords: [Seata, Config, ospp]
description: This document is a user guide for the extended features of the Seata ecosystem, covering gRPC communication, NamingServer service discovery, Seata-Raft storage, and PostgreSQL adaptation. It provides configuration recommendations for multiple environments and scenario-specific advice to help developers implement distributed transactions.
author: Sun Haoran, OSPP Student Participant for Seata
date: 2025-09-26
---

# 1. Introduction
## 1.1 Project Background
This project is an extended development based on the Seata ecosystem, with the core goal of solving Seata's limitations in communication, service discovery, storage, and database adaptation under specific scenarios. By implementing gRPC communication support, Seata NamingServer service discovery/registration, Seata-Raft storage integration, and PostgreSQL database adaptation (AT/XA modes), it addresses the gaps in Seata's native functionality and provides a more flexible and stable solution for distributed transaction applications in the Go language ecosystem.

## 1.2 Document Purpose
This document serves as a user guide and best practices reference for the project's implemented features. It aims to help developers:
- Understand the core value and applicable scenarios of each feature;
- Master the parameter configuration methods and their effects for each feature;
- Rapidly implement features using recommended configurations and avoid common issues;
- Quickly build distributed transaction scenarios with the help of demos.


# 2. Core Features User Guide
## 2.1 Feature 1: gRPC Communication with Seata-Server (P0)
### 2.1.1 Function Overview
Seata natively uses Netty for communication by default. This feature adds support for the gRPC communication protocol, which offers the following advantages over native communication:
- Lower communication latency: gRPC is based on HTTP/2, supporting multiplexing to reduce connection overhead;
- Better cross-language compatibility: gRPC uses Protocol Buffers, enabling seamless communication with Seata clients in other languages (e.g., Java/Python);
- More stable high-traffic support: Optimized data packet fragmentation and retransmission mechanisms, suitable for high-concurrency distributed transaction scenarios.

### 2.1.2 Applicable Scenarios
- High-concurrency distributed transaction scenarios: Such as e-commerce order creation and payment callbacks, where low-latency communication is required to ensure transaction efficiency;
- Cross-language Seata cluster scenarios: Go clients need to interact with Seata-Server or other clients implemented in Java;
- Cloud-native environments: gRPC is better adapted to service communication standards in cloud-native environments like Kubernetes.

### 2.1.3 Parameter Configuration and Effects
#### Basic gRPC Configuration
```yaml
seata:
  remoting:
    # gRPC configuration
    stream:
      max-recv-msg-size: 10485760
      max-send-msg-size: 10485760
      keep-alive-time: 30s
      keep-alive-timeout: 10s
      permit-without-stream: true
      heartbeat-interval: 1s
      dial-timeout: 5s
```

1. Message Size Configuration
- max-recv-msg-size: Controls the maximum size of received messages
  - Default value: 10MB
  - Recommended value: Adjust based on business data volume, typically 4-16MB
  - Impact: Too small a value may reject messages for large transactions; too large a value consumes more memory
- max-send-msg-size: Controls the maximum size of sent messages
  - Default value: 10MB
  - Recommended value: Keep consistent with max-recv-msg-size
  - Impact: Affects the processing capability of batch transaction operations

2. Connection Keep-Alive Configuration
- keep-alive-time: Interval for sending gRPC keep-alive pings
  - Default value: 30s
  - Recommended value: 30-60s for production environments; can be shortened appropriately for development environments
  - Impact: Too short an interval increases network overhead; too long may cause connection "false death"
- keep-alive-timeout: Timeout for keep-alive ping responses
  - Default value: 10s
  - Recommended value: 5-15s
  - Impact: Affects the sensitivity of connection failure detection
- permit-without-stream: Whether to allow keep-alive when there are no active streams
  - Default value: true
  - Recommended value: true (to maintain connection stability)
  - Impact: false may cause idle connections to be closed prematurely

3. Heartbeat and Connection Configuration
- heartbeat-interval: Application-layer heartbeat interval
  - Default value: 1s
  - Recommended value: 5-15s for production environments; 1-5s for development environments
  - Impact: Affects the frequency of connection health checks
- dial-timeout: Timeout for establishing a connection
  - Default value: 5s
  - Recommended value: 5-10s
  - Impact: Affects the success rate and response speed of connection establishment

### 2.1.4 Recommended Configurations
#### Production Environment Configuration
```yaml
seata:
  remoting:
    stream:
      max-recv-msg-size: 16777216  # 16MB
      max-send-msg-size: 16777216  # 16MB
      keep-alive-time: 60s
      keep-alive-timeout: 10s
      permit-without-stream: true
      heartbeat-interval: 10s
      dial-timeout: 8s
  transport:
    # RPC request timeout configuration
    rpc-rm-request-timeout: 30s
    rpc-tm-request-timeout: 30s
```

#### High-Concurrency Scenario Configuration
```yaml
seata:
  remoting:
    stream:
      max-recv-msg-size: 33554432  # 32MB
      max-send-msg-size: 33554432  # 32MB
      keep-alive-time: 30s
      keep-alive-timeout: 5s
      permit-without-stream: true
      heartbeat-interval: 5s
      dial-timeout: 5s
  client:
    rm:
      # Increase the asynchronous commit buffer
      async-commit-buffer-limit: 50000
    tm:
      # Increase the global transaction timeout
      default-global-transaction-timeout: 120s
```

#### Development and Testing Environment Configuration
```yaml
seata:
  remoting:
    stream:
      max-recv-msg-size: 4194304   # 4MB
      max-send-msg-size: 4194304   # 4MB
      keep-alive-time: 20s
      keep-alive-timeout: 5s
      permit-without-stream: true
      heartbeat-interval: 2s
      dial-timeout: 3s
```


## 2.2 Feature 2: Seata NamingServer Service Discovery and Registration (P1)
### 2.2.1 Function Overview
Seata natively supports third-party registration centers such as Nacos/Eureka. This feature adds adaptation for Seata's native NamingServer, enabling:
- Clients to automatically discover Seata-Server nodes from NamingServer (no need to hardcode Server addresses);
- Seata-Server nodes to automatically register with NamingServer, supporting dynamic scaling of nodes;
- Built-in load balancing: After clients obtain the Server list from NamingServer, they select nodes using the "round-robin" strategy by default.

### 2.2.2 Applicable Scenarios
1. Microservice scenarios: Supports service registration, discovery, and load balancing; automatically removes faulty nodes to achieve failover.
2. SeataGo transactions: Helps discover TCs (Transaction Coordinators), manages TC cluster roles, and ensures high availability of transaction coordination services.
3. Multi-environment management: Isolates environments through namespaces, supporting multi-cluster management and unified configuration control.

### 2.2.3 Parameter Configuration and Effects
```yaml
registry:
  type: naming-server
  naming-server:
    cluster: "default"
    server-addr: "127.0.0.1:8081"
    namespace: "public"
    heartbeat-period: 5000
    metadata-max-age-ms: 30000
    username: ""
    password: ""
    token-validity-in-milliseconds: 1740000
```

| Parameter | Type | Default Value | Description | Configuration Effect |
|-----------|------|---------------|-------------|---------------------|
| cluster | string | "default" | Cluster name | Used for cluster isolation; services between different clusters are not interconnected |
| server-addr | string | "127.0.0.1:8081" | Server address list | Supports multi-address failover; separated by commas |
| namespace | string | "public" | Namespace | Isolates environments; services in different namespaces are isolated |
| heartbeat-period | int | 5000 | Heartbeat check interval (ms) | Smaller values enable faster fault detection but increase network overhead |
| metadata-max-age-ms | int64 | 30000 | Metadata refresh interval (ms) | Controls the frequency of service information updates |
| username | string | "" | Authentication username | Authentication is disabled if left empty |
| password | string | "" | Authentication password | Used with username for JWT authentication |
| token-validity-in-milliseconds | int64 | 1740000 | Token validity period (ms) | Tokens are automatically refreshed before expiration |

### 2.2.4 Recommended Configurations
1. **Production Environment Configuration**
```yaml
registry:
  type: naming-server
  naming-server:
    cluster: "production"
    # Configure multiple addresses for high availability
    server-addr: "ns1.prod.com:8081,ns2.prod.com:8081,ns3.prod.com:8081"
    namespace: "prod"
    # Shorter heartbeat interval for faster fault detection
    heartbeat-period: 3000
    # Moderate metadata refresh interval
    metadata-max-age-ms: 20000
    # Enable authentication
    username: "seata-prod"
    password: "${SEATA_PASSWORD}"
    # Longer token validity to reduce refresh frequency
    token-validity-in-milliseconds: 3600000
```

2. **Development Environment Configuration**
```yaml
registry:
  type: naming-server
  naming-server:
    cluster: "development"
    server-addr: "localhost:8081"
    namespace: "dev"
    # Longer heartbeat interval to reduce log output
    heartbeat-period: 10000
    metadata-max-age-ms: 60000
    # Authentication can be disabled in development environments
    username: ""
    password: ""
```

3. **Testing Environment Configuration**
```yaml
registry:
  type: naming-server
  naming-server:
    cluster: "testing"
    server-addr: "test-ns1:8081,test-ns2:8081"
    namespace: "test"
    heartbeat-period: 5000
    metadata-max-age-ms: 30000
    username: "seata-test"
    password: "test123"
    token-validity-in-milliseconds: 1800000
```


## 2.3 Feature 3: Seata-Raft Storage Mode Integration (P1)
### 2.3.1 Function Overview
Seata natively supports storage modes such as file and database. This feature integrates Seata-Raft distributed storage, with core values including:
- High availability: The Raft protocol ensures data consistency and fault tolerance (supports 3/5-node clusters, tolerating 1/2 node failures);
- High performance: Based on local disk storage, avoiding network overhead of database storage, suitable for high-transaction-volume scenarios;
- Dynamic scaling: Supports dynamic addition of Raft cluster nodes, enabling storage capacity expansion without service downtime.

### 2.3.2 Applicable Scenarios
- Seata TC clusters requiring strong consistency guarantees and high reliability for service discovery;
- Cross-regional Seata cluster deployments and distributed systems requiring unified service governance;
- Systems with high availability requirements (e.g., finance, payment) and strict data consistency requirements for business systems.

### 2.3.3 Parameter Configuration and Effects
```yaml
seata:
  registry:
    type: raft
    namingserver-addr: 127.0.0.1:8081
    username: seata
    password: seata
    raft:
      metadata-max-age-ms: 30000
      server-addr:
      token-validity-in-milliseconds: 1740000
```

| Parameter Name | Type | Default Value | Description | Configuration Recommendation |
|----------------|------|---------------|-------------|------------------------------|
| metadata-max-age-ms | int64 | 30000 | Maximum survival time of metadata cache; forced refresh after expiration | 30000-60000ms for production environments; can be shortened for development environments |
| server-addr | string | "127.0.0.1:7091" | Raft cluster node address list; separated by commas | Configure at least 3 nodes for high availability; odd number of nodes is recommended |
| token-validity-in-milliseconds | int64 | 1740000 | JWT token validity period (29 minutes by default); automatically refreshed before expiration | Recommended to set to 1740000ms (29 minutes); do not exceed 30 minutes |
| naming-server-addr | string | - | Naming server address; used for token authentication and cluster information retrieval | Must be configured to ensure address accessibility |
| username | string | "seata" | Authentication username | Use strong password policies; avoid default values |
| password | string | "seata" | Authentication password | Use strong password policies; change regularly; avoid default values |

### 2.3.4 Recommended Configurations
#### High-Availability Configuration Example
```yaml
seata:
  enabled: true
  vgroup-mapping: seata-business-app
  tx-service-group: business_tx_group

  service:
    vgroup-mapping:
      business_tx_group: seata-cluster   # Map to Raft cluster
    enable-degrade: false                # Disable degradation in production environments
    disable-global-transaction: false    # Enable global transactions

  registry:
    type: raft
    namingserver-addr: 10.1.1.100:8081  # Production environment IP
    username: ${SEATA_USERNAME:seata}     # Read from environment variables
    password: ${SEATA_PASSWORD:seata}     # Read from environment variables
    raft:
      metadata-max-age-ms: 45000          # Extend cache time appropriately to reduce network overhead
      # Configure 3 or 5 Raft cluster nodes for high availability
      server-addr: "10.1.1.101:7091,10.1.1.102:7091,10.1.1.103:7091"
      tokenvalidityinmilliseconds: 1740000
```

#### Multi-Cluster Configuration Example
```yaml
seata:
  service:
    vgroup-mapping:
      # Different businesses use different clusters
      user_tx_group: user-cluster         # User service cluster
      order_tx_group: order-cluster       # Order service cluster
      payment_tx_group: payment-cluster   # Payment service cluster

  registry:
    type: raft
    namingserver-addr: 10.1.1.100:8081
    username: seata
    password: seata
    raft:
      metadata-max-age-ms: 30000
      # Include addresses of all cluster nodes
      server-addr: "10.1.1.101:7091,10.1.1.102:7091,10.1.1.103:7091,10.1.1.104:7092,10.1.1.105:7092,10.1.1.106:7092"
      token-validity-in-milliseconds: 1740000
```


## 2.4 Feature 4: PostgreSQL Database Support (P1)
This feature enables adaptation of PostgreSQL databases for Seata's AT and XA modes, addressing Seata's insufficient native support for PostgreSQL.

### 2.4.1 Sub-Feature 4.1: AT Mode - PostgreSQL
#### 2.4.1.1 Function Overview
AT mode is Seata's mainstream transaction mode (non-intrusive, high-performance). This feature implements:
- Automatic transaction management: A non-intrusive distributed transaction solution;
- Automatic undo log generation: Supports automatic rollback of INSERT, UPDATE, and DELETE operations;
- Multi-table operation support: Supports complex joint operations across multiple tables.

#### 2.4.1.2 Applicable Scenarios
- Non-intrusive transaction scenarios: Business code requires no SQL modifications; distributed transactions can be implemented using annotations (e.g., @GlobalTransactional);
- Businesses using PostgreSQL as the primary database: Scenarios such as data analysis and IoT that rely on PostgreSQL features (e.g., jsonb);
- High-concurrency read-heavy scenarios: AT mode does not lock reads, making it suitable for read-heavy businesses (e.g., product details, order queries).

#### 2.4.1.3 Parameter Configuration and Effects
Basic Seata service configuration for specifying application ID, transaction group, and data source proxy mode.
```yaml
seata:
  enabled: true
  application-id: your-app-name
  tx-service-group: default_tx_group
  # Enable automatic data source proxy
  enable-auto-data-source-proxy: true
  # Set proxy mode to AT (Seata's mainstream transaction mode)
  data-source-proxy-mode: AT
```

Fine-grained configuration for AT mode clients (RM, Resource Manager), including asynchronous commit, status reporting, and lock policies.
```yaml
seata:
  client:
    rm:
      # Maximum cache size of the asynchronous commit queue (caches up to 10,000 uncommitted records)
      async-commit-buffer-limit: 10000
      # Maximum number of retries for status reporting (retry 5 times if reporting fails)
      report-retry-count: 5
      # Enable periodic table metadata checks (recommended to ensure normal transactions after table structure changes)
      table-meta-check-enable: true
      # Whether to report status for successfully executed transactions (can be disabled to reduce communication overhead)
      report-success-enable: false
      # SQL parser selection (druid is recommended for better compatibility)
      sql-parser-type: druid
      # Lock-related configuration (resolves resource competition in distributed transactions)
      lock:
        retry-interval: 30s    # Lock retry interval (retry to acquire lock after 30 seconds)
        retry-times: 10        # Maximum number of lock retries (up to 10 retries)
        # Whether to roll back branch transactions on lock conflicts (recommended to avoid deadlocks)
        retry-policy-branch-rollback-on-conflict: true
```

Core undo log configuration for AT mode, controlling log generation, serialization, and compression policies.
```yaml
seata:
  client:
    undo:
      # Validate consistency between before and after images; skip undo log if consistent
      data-validation: true
      # Serialization method
      log-serialization: json
      # Undo log table name (create this table in the business database in advance)
      log-table: undo_log
      # Only record modified columns (performance optimization to reduce log storage size)
      only-care-update-columns: true
      # Compression configuration (automatic compression when log size exceeds threshold)
      compress:
        enable: true          # Enable compression
        type: zip             # Compression algorithm (zip)
        threshold: 64k        # Compression threshold (triggered when log exceeds 64KB)
```

#### 2.4.1.4 Recommended Configurations
##### Production Environment Recommended Configuration
Optimized configuration for production environments, balancing performance, stability, and data consistency.
```yaml
seata:
  enabled: true
  enable-auto-data-source-proxy: true
  data-source-proxy-mode: AT
  client:
    rm:
      async-commit-buffer-limit: 10000
      report-retry-count: 5
      table-meta-check-enable: true
      report-success-enable: true
      sql-parser-type: druid
      lock:
        retry-interval: 30s
        retry-times: 10
        retry-policy-branch-rollback-on-conflict: true
    tm:
      commit-retry-count: 5
      rollback-retry-count: 5
      default-global-transaction-timeout: 60s
    undo:
      data-validation: true
      log-serialization: json
      log-table: undo_log
      only-care-update-columns: true
      compress:
        enable: true
        type: zip
        threshold: 64k
```

##### Development Environment Configuration
Simplified validation and checks for easier development and debugging, reducing environment complexity.
```yaml
seata:
  enabled: true
  enable-auto-data-source-proxy: true
  data-source-proxy-mode: AT
  client:
    rm:
      table-meta-check-enable: false  # Disable in development to speed up startup
      report-success-enable: true     # Enable to view transaction status during debugging
      sql-parser-type: druid
    undo:
      data-validation: true
      log-serialization: json
      only-care-update-columns: false  # Record all columns in development for easier debugging comparison
```

### 2.4.2 Sub-Feature 4.2: XA Mode - PostgreSQL
#### 2.4.2.1 Function Overview
XA mode is a standard distributed transaction mode (strong consistency). This feature implements:
- All core operations defined in the XA specification (Start, End, Prepare, Commit, Rollback, Recover, Forget);
- Special optimizations for PostgreSQL's transaction characteristics;
- Transaction timeout settings to prevent long-term blocking.

#### 2.4.2.2 Applicable Scenarios
- Scenarios where business logic requires operations across multiple PostgreSQL database instances; XA mode ensures all operations either succeed or roll back;
- Microservice architectures where different services use independent PostgreSQL databases; XA mode ensures cross-service transaction consistency;
- Systems using both PostgreSQL and other XA-supported databases (e.g., MySQL); enables cross-database distributed transactions.

#### 2.4.2.3 Recommended Configurations
##### Production Environment Recommended Configuration
Optimized XA mode configuration for production environments, balancing stability and performance with scenario-specific optimizations.
```yaml
seata:
  enabled: true
  application-id: "production-service"
  tx-service-group: "production_tx_group"
  enable-auto-data-source-proxy: true
  data-source-proxy-mode: "XA"  # Key: Enable XA transaction mode

  client:
    rm:
      async-commit-buffer-limit: 10000
      report-retry-count: 3
      table-meta-check-enable: false  # Table metadata checks are generally not required for XA mode
      report-success-enable: true
      sql-parser-type: "druid"
      lock:
        retry-interval: "30s"
        retry-times: 5
        retry-policy-branch-rollback-on-conflict: true
    tm:
      commit-retry-count: 3
      rollback-retry-count: 3
      default-global-transaction-timeout: "30s"  # Shorter timeout recommended for production
      degrade-check: false
    undo:
      data-validation: false  # XA mode does not rely on undo logs; disable data validation
      log-serialization: "json"
      log-table: "undo_log"
      compress:
        enable: false

  transport:
    rpc-rm-request-timeout: "30s"
    rpc-tm-request-timeout: "30s"
    serialization: "seata"
    compressor: "gzip"  # Enable compression in production to reduce network transmission
```

##### Development Environment Configuration
Optimized XA mode configuration for development and debugging, with relaxed restrictions for easier issue troubleshooting.
```yaml
seata:
  enabled: true
  application-id: "dev-service"
  tx-service-group: "dev_tx_group"
  enable-auto-data-source-proxy: true
  data-source-proxy-mode: "XA"

  client:
    rm:
      async-commit-buffer-limit: 1000
      report-retry-count: 5  # Increase retries in development for easier debugging
      table-meta-check-enable: false
      report-success-enable: true
      sql-parser-type: "druid"
    tm:
      commit-retry-count: 5
      rollback-retry-count: 5
      default-global-transaction-timeout: "120s"  # Longer timeout in development
    undo:
      data-validation: false
      log-serialization: "json"
      compress:
        enable: false  # Disable compression in development for easier raw data inspection

  transport:
    rpc-rm-request-timeout: "60s"
    rpc-tm-request-timeout: "60s"
```
