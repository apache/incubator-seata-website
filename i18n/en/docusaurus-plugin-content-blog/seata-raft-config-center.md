---
title: Seata Raft Configuration Center
author: JiangYichen - Tsinghua University, participant in Seata Summer of Code
description: In this blog, I will share the Seata Configuration Center based on Raft and RocksDB design and how it is used.
date: 2024/09/19
keywords: [seata, distributed transactions, configuration center, Raft, RocksDB]
---

# 1. Backgroud
Currently seata supports rich third-party configuration center, but consider the convenience of using at the same time in order to reduce the threshold of using seata, in seata-server using the existing sofa-jraft+rocksdb to build a configuration center function, seata-client directly communicate with the seata-server to obtain the seata-related configuration. seata-related configuration , do not need to go to the third-party configuration center to read , to achieve the configuration center since the closed loop .


# 2. Design Description
## 2.1 Configuration Center

In the current third-party configuration center implementation, the Client and Server are decoupled when it comes to configuration centers. Both the Client and Server access configuration items through the Configuration instance. The initialization behavior for Configuration is consistent on both the Client and Server sides, involving connecting to the configuration center middleware to fetch configurations and add listeners, etc.
![img](/img/blog/seata-raft-config-center1.png)

When the configuration center is implemented using Raft, the configuration data is stored on the Server-side. Therefore, the behavior when initializing the `Configuration` instance differs between the Client and Server sides.

To ensure consistency with the original configuration center logic, both the Client and Server still access configuration items through the `RaftConfiguration` instance without directly interacting with RocksDB.
![img](/img/blog/seata-raft-config-center2.png)



![img](/img/blog/seata-raft-config-center3.png)

`RaftConfiguration` is divided into Server-side and Client-side implementations, returning different configuration instances based on the runtime environment.

```Java
public class RaftConfigurationProvider implements ConfigurationProvider {
    @Override
    public Configuration provide() {
        String applicationType = System.getProperty(APPLICATION_TYPE_KEY);
        if (APPLICATION_TYPE_SERVER.equals(applicationType)){
            return RaftConfigurationServer.getInstance();
        }else{
            return RaftConfigurationClient.getInstance();
        }
    }
}

@SpringBootApplication(scanBasePackages = {"org.apache.seata"})
public class ServerApplication {
    public static void main(String[] args) throws IOException {
        System.setProperty(APPLICATION_TYPE_KEY, APPLICATION_TYPE_SERVER);
        // run the spring-boot application
        SpringApplication.run(ServerApplication.class, args);
    }
}
```


## 2.2 Configuration Storage Module
![img](/img/blog/seata-raft-config-center4.png)
### Abstract Design

To support and extend more KV in-memory key-value pair databases in the future (such as LevelDB, Caffeine), an abstract `ConfigStoreManager` interface and an abstract class `AbstractConfigStoreManager` have been defined, providing the following common methods:

- Get: Acquire a specific configuration item named `key` from a given `namespace` and `dataId`.
- GetAll: Acquire all configuration items from a given  `namespace` and `dataId`.
- Put: Add/Update a configuration item `<key, value>` in a specific `namespace` and `dataId`.
- Delete: Delete a configuration item named `key` in a given  `namespace` and `dataId`.
- DeleteAll: Delete all configuration items in a given  `namespace` and `dataId`.
- Clear: Clear all configurations.
- GetAllNamespaces: Acquire all namespaces.
- GetAllDataIds: Acquire all configuration dataIds under a specific namespace.
- ...

`ConfigStoreManagerFactory` and `ConfigStoreManagerProvider`: Configuration storage factory class and provider implemented using SPI mechanism.



### Configuration Listening

Both the Server and Client configuration centers need to listen for changes to configuration items.

On the Server-side, since the configurations are stored locally, we can directly intercept the configuration change methods. We define `addConfigListener` and `removeConfigListener` methods in the abstract interface to allow users to add and remove configuration listeners. The specific implementation class handles the listening logic.

In `RocksDBConfigStoreManager`, the `notifyConfigChange()` method is defined to trigger listeners. When performing write-related operations (e.g., Put, Delete), this method notifies listeners about the configuration change, triggering callback events to notify the Server configuration center.

On the Client-side, we implement configuration listening through **configuration versioning** and **long connection mechanisms**. Specifically, the Client establishes a long connection with the Server on startup and periodically refreshes this connection. The Server maintains a `watchMap` to store all client-side listening information. Whenever the Raft state machine executes a configuration update operation, an `ApplicationEvent` event is triggered, which is listened to by the `ClusterConfigWatcherManager`, notifying all clients in the `watchMap` of the configuration change. Additionally, configuration versioning is used for optimization. When establishing a long connection, the Client must provide a version number. If the version number is lower than the version number on the Server-side, the latest configuration is returned directly. If the Server version number is lower than the local version number, the Client considers the Server configuration outdated (possibly due to server downtime or cluster split-brain) and retries the request to other nodes in the cluster.

### Multi-Tenancy Solution

When storing configurations on the Seata-Server, we need to implement multi-tenancy configuration isolation, ensuring that configurations between different tenants are independent and isolated both physically and logically.

1. We researched the implementations of several open-source projects using RocksDB and summarized them as follows:
   1. JRaft uses a single RocksDB instance with two column families: one for storing Raft entries and the other for storing metadata.
   2. TiKV uses two RocksDB instances: raftDB and kvDB. In kvDB, multiple column families are used to store metadata, user data, lock data, etc.
   3. Pika creates a RocksDB instance for each data structure (String, Hash, List, Set, Zset), and each instance uses multiple column families to store data, such as Data, Meta.

Considering that the number of tenants is unknown in advance (and thus we cannot create a fixed number of RocksDB instances at startup), we use a single RocksDB instance with multiple column families. Different tenants are distinguished using `namespace`, and logical isolation is achieved by using column families in RocksDB, where one namespace corresponds to one column family. Column families in RocksDB are conceptually similar to tables in relational databases. When performing configuration CRUD operations, the appropriate column family is specified based on the namespace, achieving multi-tenancy isolation. Additionally, a column family named `config_version` is built-in to track the version numbers of the configurations.
![img](/img/blog/seata-raft-config-center5.png)

# 3. Usage
## 3.0 Prepare Configuration File

First, prepare the configuration file. You can refer to the example configuration file [here](https://github.com/apache/incubator-seata/blob/2.x/script/config-center/config.txt). Place this configuration file in the resource directory of the Seata server project.

## 3.1 Server-side Configuration

In the **[application.yml](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml)** file, add the Raft configuration center settings. For other configurations, refer to the [configuration documentation](https://seata.apache.org/en-us/docs/next/user/configurations).

```YAML
config:
  # support: nacos, consul, apollo, zk, etcd3, raft
  type: raft
  raft:
    db:
      type: rocksdb  # database type, currently only rocksdb is supported
      dir: configStore  # directory for storing db files
      destroy-on-shutdown: false  # whether to clear db files on shutdown, default is false
      namespace: 'default'  # namespace
      dataId: 'seata.properties'  # configuration file ID
  file:
    name: 'file'  # initial configuration file name

server:
  raft:
    group: default  # this value represents the group of the Raft cluster; the transaction group on the client must correspond to this value
    server-addr: 192.168.241.1:9091, 192.168.241.2:9091, 192.168.241.3:9091  # IP and port of other Raft nodes; the port is the netty port of the node +1000, the default netty port is 8091
    snapshot-interval: 600  # take a snapshot every 600 seconds for fast raftlog rolling. However, if there are many transactions in memory, this may cause performance jitter every 600 seconds. You can adjust it to 30 minutes or 1 hour depending on your business needs and test for jitter.
    apply-batch: 32  # apply up to 32 actions in one raftlog commit
    max-append-bufferSize: 262144  # maximum size of the log storage buffer, default is 256K
    max-replicator-inflight-msgs: 256  # maximum number of in-flight requests when pipeline requests are enabled, default is 256
    disruptor-buffer-size: 16384  # internal disruptor buffer size, increase this value for high write throughput scenarios; default is 16384
    election-timeout-ms: 1000  # timeout for leader re-election if no heartbeat is received
    reporter-enabled: false  # enable monitoring of Raft itself
    reporter-initial-delay: 60  # interval for monitoring
    serialization: jackson  # serialization method, do not change
    compressor: none  # compression method for raftlog, e.g., gzip, zstd
    sync: true  # log syncing method, default is synchronous syncing
```

In Seata-Server, an **initial configuration file** is required as the Server-side configuration file (as mentioned in the previous step). The `file.name` configuration item must match the name of this file. When the Server is first started, this configuration file will be used as the initial configuration for the Raft configuration center. Supported file types include: conf, yaml, properties, txt.

> Note: The **initial configuration file** of the nodes in the Raft cluster must be consistent.

## 3.2 Console Configuration Management Interface
When the **Raft mode** is used as the configuration center on the server side, you can manage the configuration center through the built-in configuration management page in [Seata Console](http://127.0.0.1:7091). Users can perform CRUD operations (create, read, update, delete) on configurations stored in the Seata-Server cluster. Note that these operations affect the entire cluster, so changes can be made on **any node** in the cluster, and all operations will be synchronized across the cluster via Raft.

> Note: This configuration management page is only available when the configuration center is set to **Raft mode** and is not accessible for other configuration center types.

### 3.2.1 Configuration Isolation

The Raft configuration center provides a **namespace** mechanism to achieve multi-tenant configuration isolation. Configurations in different **namespaces** are logically isolated through the underlying storage mechanism. Within the same **namespace**, multiple configuration files can exist, differentiated by **dataId**. A set of configurations is uniquely identified by both **namespace** and **dataId**.

For example:

- namespace=default (default), dataId=seata.properties (default)
- namespace=dev, dataId=seata-server.properties, dataId=seata-client.yaml
- namespace=prop, dataId=seata-server.properties, dataId=seata-client.txt


![img](/img/blog/seata-raft-config-center配置隔离.png)


### 3.2.2 Configuration Upload

When the server starts, the initial configuration file on the server will automatically be uploaded to the configuration center. In addition, users can manually upload configuration files to a specified **namespace** and **dataId** by clicking the "Upload" button. Once uploaded to the server's configuration center, the client can retrieve the specific configuration file via **namespace** and **dataId**.

![img](/img/blog/seata-raft-config-center配置上传.png)

Currently, supported configuration file types include txt, text, yaml, and properties. You can refer to the sample configuration files here: [Configuration File Example](https://github.com/apache/incubator-seata/blob/2.x/script/config-center/config.txt).

### 3.2.3 Configuration Query

After selecting the **namespace** and **dataId**, click the "**Search**" button to query all configuration item information under that configuration. The configuration is presented in a list, where each row represents a configuration item, displayed as **Key** and **Value** pairs.

![img](/img/blog/seata-raft-config-center配置查询.png)

### 3.2.4 Configuration Deletion

When a configuration set is no longer needed, users can delete the configuration data for the specified **namespace** and **dataId**.

Note that once this operation is completed, all configuration item information under that configuration will be cleared and cannot be recovered. Please avoid deleting configurations that are currently in use.

![img](/img/blog/seata-raft-config-center配置删除.png)

### 3.2.5 Configuration Modification

In the configuration item list, users can **add**, **modify**, or **delete** a specific configuration item. Once an operation is successful, both the server and client sides will receive the configuration change promptly, and the latest value will be available.

- **Add:** Add a new configuration item to the current configuration.


![img](/img/blog/seata-raft-config-center配置修改1.png)

- **Update:** Change the value of a specified configuration item.


![img](/img/blog/seata-raft-config-center配置修改2.png)

- **Delete:** Remove a specified configuration item.


![img](/img/blog/seata-raft-config-center配置修改3.png)



## 3.3 Client-Side Configuration

The client needs to add the following configuration items. The `raft.server-addr` should match the **IP address list** of the server-side Raft cluster.

```YAML
config:
    type: raft  # Raft mode
    raft:
        server-addr: 192.168.241.1:7091, 192.168.241.2:7091, 192.168.241.3:7091  # Raft metadata server addresses
        username: 'seata'  # Authentication
        password: 'seata'  # Authentication
        db:
            namespace: 'default'  # Namespace
            dataId: 'seata.properties'  # Configuration file Id
```

Additionally, the client needs to include the **HttpClient** dependency to retrieve configuration information from the Seata-Server cluster via HTTP requests.

```YAML
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
</dependency>
```

After the configuration is complete, when the client application starts, it will subscribe to and retrieve the configuration specified by **namespace** and **dataId** from the server configured in `raft.server-addr`. The client will also automatically fetch the latest configuration when changes are detected through the listener mechanism.

