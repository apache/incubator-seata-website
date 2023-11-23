---
title: Transaction Group Introduction
keywords: [Seata]
description: Seata transaction grouping.
---

# Introduction

### What is a transaction group?
- Transaction group: The logical resource of Seata can be defined by the application (client) according to the needs of microservices, with each group having a unique name.
- Cluster: A cluster is made up of one or more nodes of the Seata server. When using the application (client), the mapping relationship between the transaction logic group and the Seata server cluster needs to be specified.

### How to find the backend Seata cluster for the transaction group?
1. First, the application (client) configures the transaction group (txServiceGroup parameter of the GlobalTransactionScanner constructor). If the application is SpringBoot, it is configured through seata.tx-service-group.
2. The application (client) will use the user-configured configuration center to find service.vgroupMapping.[*transaction group configuration item*], and the value of the configuration item is the name of the TC cluster. If the application is SpringBoot, it is configured through seata.service.vgroup-mapping.transaction group name=cluster name.
3. With the cluster name, the program constructs the service name by adding a certain prefix and suffix to the cluster name. The service name implementation varies in different configuration centers (provided that Seata-Server has completed service registration and Seata-Server reports that the cluster name is consistent with the cluster name configured by the application (client)).
4. With the service name, the program goes to the corresponding registration center to pull the service list of the corresponding service name and obtain the real backend TC service list (i.e., the Seata-Server cluster node list).

### Why is it designed this way instead of directly using the service name?
There is an additional layer of configuration to map the transaction group to the cluster. With this design, the transaction group can serve as the logical isolation unit of resources. When a cluster failure occurs, failover can be quickly performed by switching to the corresponding group, reducing the impact of the failure to the service level. However, this requires a sufficient number of server clusters.

## Transaction Group Usage Case
Seata registration and configuration centers are divided into two categories:
- Built-in File
- Third-party registration (configuration) centers, such as Nacos, etc. There are no constraints between the registration center and the configuration center, and different specific options can be used for each.

### Category 1: Built-in File
#### Seata Server-side
registry.conf
```
registry {
  # file, nacos, eureka, redis, zk, consul, etcd3, sofa
  type = "file"                ---------------> Use file as the registry center
}
config {
  # file, nacos, apollo, zk, consul, etcd3
  type = "file"                ---------------> Use file as the configuration center
  file {
    name = "file.conf"
  }
}
```
- Start Seata Server in file or db mode, see the node at the top of the article: Start Seata Server
#### Client-side
registry.conf
```
registry {
  # file, nacos, eureka, redis, zk, consul, etcd3, sofa
  type = "file"                ---------------> Use file as the registry center
}
config {
  # file, nacos, apollo, zk, consul, etcd3
  type = "file"                ---------------> Use file as the configuration center
  file {
    name = "file.conf"         ---------------> Configuration parameter storage file
  }
}
```
file.conf
```
    service {
      vgroupMapping.my_test_tx_group = "default"
      default.grouplist = "127.0.0.1:8091"
    }
```
application.properties
```
seata.tx-service-group=my_test_tx_group ---------------> Transaction group configuration (default value is default_tx_group after v1.5)
```
- Read configuration
 Load the configuration parameters of file.conf through FileConfiguration locally
- Get transaction group (load configuration when the service starts)
 For spring/springboot, it can be configured in yml or properties, and the corresponding value "my_test_tx_group" is the transaction group name. If not configured, the default value is the concatenation of spring.application.name value and "-seata-service-group" as the group name.
- Find TC cluster name
 Concatenate the transaction group name "my_test_tx_group" into "service.vgroupMapping.my_test_tx_group" and find the TC cluster name clusterName as "default"
- Query TC service
 Concatenate "service."+clusterName+".grouplist" to find the real TC service address 127.0.0.1:8091

----
### Type 2: Registry Center and Configuration Center (Using Nacos as an Example)
#### Seata Server
registry.conf
```
registry {
  # file, nacos, eureka, redis, zk, consul, etcd3, sofa
  type = "nacos"                  ---------------> Use Nacos as the registry center
  nacos {
    application = "seata-server"  ---------------> Specify the service name registered in Nacos registry center
    group = "SEATA_GROUP"         ---------------> Specify the group name registered in Nacos registry center
    serverAddr = "localhost"      ---------------> Nacos registry center IP:port
    namespace = ""                ---------------> Nacos namespace ID, "" represents the reserved public namespace in Nacos, users should not configure namespace = "public"
    cluster = "default"           ---------------> Specify the cluster name registered in Nacos registry center
  }
}
config {
  # file, nacos, apollo, zk, consul, etcd3
  type = "nacos"                  ------------> Use Nacos as the configuration center
  nacos {
    serverAddr = "localhost"      ---------------> Nacos registry center IP:port
    namespace = ""
    group = "SEATA_GROUP"         ---------------> Nacos configuration center group name
    dataId = "seataServer.properties"  ---------------> Nacos configuration center configuration ID
  }
}

```
- Configuration Center Configuration

  The `README-zh.md` or `README.md` file in the installation directory `conf` of Seata Server introduces the common script URL links required by Seata, including three types: client configuration and SQL, Seata Server deployment SQL and scripts, and configuration center configuration templates and scripts.
  Among them, there are files and directories under `script/config-center` as follows:
     - README.md     User guide
     - config.txt    Configuration template (including Server and Client)
     - nacos/        Python and shell scripts for pushing to Nacos
     - apollo/       Shell scripts for pushing to Apollo
     - consul/       Shell scripts for pushing to Consul
     - etcd3/        Shell scripts for pushing to etcd3
     - zk/           Shell scripts for pushing to ZooKeeper
  
  The configuration items in the `config.txt` template need to be selected and modified according to the actual situation.
  Then configure them to the configuration center: you can refer to the user guide in `README.md` to push them to the configuration center through scripts. You can also manually copy the contents of `config.txt` to the configuration center (for example, through the web page of Nacos configuration center). After the configuration is completed, check if the results are correct.

- Registered in the registry center
  Start `seata-server` and register it in the Nacos registry center. Check the service list in the Nacos console to confirm if the registration is successful.

#### Client side
```
seata.tx-service-group=my_test_tx_group ---------------> Transaction group configuration (default value is default_tx_group after v1.5)
registry {
  # file, nacos, eureka, redis, zk, consul, etcd3, sofa
  type = "nacos"                ---------------> Get TC service from Nacos
  nacos {
    serverAddr = "localhost"
    namespace = ""
  }
}
config {
  # file, nacos, apollo, zk, consul, etcd3
  type = "nacos"                ---------------> Use Nacos as the configuration center
  nacos {
    serverAddr = "localhost"
    namespace = ""
  }
}
```

#### Client side (SpringBoot)
application.properties
```
seata.tx-service-group=my_test_tx_group ---------------> Transaction group configuration (default value is default_tx_group after v1.5)
seata.service.vgroup-mapping.my_test_tx_group=default  ---------------> Specify the transaction group to cluster mapping (the cluster name on the right side of the equal sign should be consistent with the cluster registered in Seata-server)
seata.registry.type=nacos      ---------------> Use Nacos as the registry center
seata.registry.nacos.server-addr=nacos registry center IP:port
seata.registry.nacos.application=seata-server     ---------------> Seata service name (should be consistent with the actual registered service name in seata-server)
seata.registry.nacos.group=SEATA_GROUP            ---------------> Seata group name (should be consistent with the actual registered group name in seata-server)
```
> In addition: If the Client does not obtain the seata-server service information through Nacos, but directly specifies the IP and port information of the seata-server service-side node, the nacos-related configurations in the above application.properties can be changed to the following two configurations:
> 
> seata.registry.type=file       ----> Not recommended for production environment
> 
> seata.service.grouplist.cluster_beijing=127.0.0.1:8091    ----> vgroup-mapping (server-side cluster) information of each seata-server node



- Read configuration
  You can read seata configuration parameters remotely through NacosConfiguration
- Get transaction group (load configuration when the service starts)
  For spring/springboot, it can be configured in yml or properties. The corresponding value "my_test_tx_group" is the transaction group name. If not configured, the default value is the concatenation of spring.application.name value + "-seata-service-group" as the group name.
- Find TC cluster name
  Concatenate the transaction group name "my_test_tx_group" to "service.vgroupMapping.my_test_tx_group" and find the TC cluster name "default" from the configuration center.
- Find TC service
  Find the real TC service list in the registry center based on serverAddr, namespace, and clusterName.

Note: serverAddr and namespace should be consistent with the Server-side, and clusterName should be consistent with the Server-side cluster.
