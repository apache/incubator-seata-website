---
title: Deploying Raft Cluster
keywords: [Seata]
description: Server-Raft mode deploy
---

# Deploying Server-Raft
Seata-Raft mode is a transaction storage mode that integrates storage and computing, with high performance, easy scalability, low entry barriers, and low operational costs. For more detailed information about the architecture and usage, please click here.

Note: Since this mode does not support integration with third-party registry centers, only one TC cluster is allowed for the entire chain, which means that the TC cluster corresponding to the client's transaction group must remain consistent. In the future, the Seata community will launch a self-contained NamingServer that is compatible with the Seata-Raft mode and supports multi-raft.

## Server
1. Download the server application from [RELEASE](https://github.com/apache/incubator-seata/releases) and unzip. 

2. Change config
Add the following parameters under seata: in the application.yml file in the conf.
```
seata:
  server:
    raft:
      group: default #This value represents the group of the Raft cluster, and the value corresponding to the client's transaction branch must correspond to it
      server-addr: 192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091 # The IP address and port of the 3 nodes, the port is the netty port of the node + 1000, and the default netty port is 8091
      snapshot-interval: 600 # Take a snapshot of the data every 600 seconds to ensure fast rolling of the Raft log. However, if there is too much transaction data in memory during each snapshot, it may cause fluctuations in business response time (rt) every 600 seconds. Adjusting the snapshot interval to 30 minutes or 1 hour is also acceptable, depending on the specific business requirements. It is recommended to conduct performance testing to determine if there are any rt fluctuations. Find a balance point between rt fluctuations and fault recovery that suits your business needs.
      apply-batch: 32 # Commit the Raft log with a maximum batch of 32 actions at a time.
      max-append-bufferSize: 262144 #The maximum size of the log storage buffer is 256 KB by default.
      max-replicator-inflight-msgs: 256 #在When using pipeline requests, the maximum number of in-flight requests is 256 by default.
      disruptor-buffer-size: 16384 #The size of the internal disruptor buffer is 16384 by default. If the write throughput is high, you may need to increase this value appropriately.
      election-timeout-ms: 1000 #The duration after which a leader without heartbeat triggers a new election.
      reporter-enabled: false # raft monitor enable
      reporter-initial-delay: 60 # The interval between monitoring intervals.
      serialization: jackson # Serialization method, do not modify.
      compressor: none # The compression method used for the Raft log, such as gzip, zstd, lz4，etc
      sync: true # The flushing method for Raft logs is synchronous flushing by default.
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: file # This configuration can select different configuration centers.
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: file # In Raft mode, it is not allowed to use non-file-based registry centers.
  store:
    # support: file 、 db 、 redis 、 raft
    mode: raft # use raft mode
    file:
      dir: sessionStore # This path is the storage location for Raft logs and transaction-related logs. By default, it is a relative path, but it is recommended to set a fixed location.
```
If the addresses in server-addr: are all on the local machine, then you need to add an offset of 1000 to the Netty port for different servers on this machine. For example, if `server.port: 7092`, the Netty port would be `8092`, and the Raft election and communication port would be `9092`. You need to add the startup parameter `-Dserver.raftPort=9092`.
On Linux, you can specify the export `JAVA_OPT="-Dserver.raftPort=9092"` command to set the desired value.。

3. Startup

On Linux/Mac

```bash
$ sh ./bin/seata-server.sh
```

On Windows

```cmd
bin\seata-server.bat
```

4. Volume expansion and contraction

Assuming the original cluster list is "192.168.0.111:7091, 192.168.0.112:7091, 192.168.0.113:7091", whether it is scaling or shrinking, only need to modify this string and submit it to the volume expansion and contraction interface of a member, such as scaling "curl -X POST -i http://192.168.0.111:7091/metadata/v1/changeCluster?raftClusterStr=192.168.0.111: 7091, 192.168.0.112:7091, 192.168.0.113:7091, 192.168.0.114:7091" ', if it is scaling, only need to remove the nodes in the cluster connection string that need to be offline, and call the volume expansion and contraction interface.
Note: The seata.server.raft.server-addr configuration is invalid as long as the cluster is built. Please perform volume expansion and contraction through the API. The subsequent console will also integrate volume expansion and contraction and cluster management functions.

## Client

1. Change `registry.type`
```
   registry:
      type: raft
      raft:
         server-addr: 192.168.0.111:7091, 192.168.0.112:7091, 192.168.0.113:7091
```
2. Change the TC cluster corresponding to the transaction group to the Raft group of the server.
```
seata:
   tx-service-group: default_tx_group
   service:
      vgroup-mapping:
         default_tx_group: If server.raft.group is set to "default", then this field should be set to "default" as well.
```