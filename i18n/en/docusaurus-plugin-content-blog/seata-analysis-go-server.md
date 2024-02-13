---
title: Seata Distributed Go Server Officially Open Source - Introduction to TaaS Design
author: fagongzi(zhangxu19830126@gmail.com)
date: 2019/04/23
keywords: [seata, distributed transaction, high availability]
---
# Seata High-Availability Server TaaS Officially Open Source

### Preface
TaaS is a high-availability implementation of the Seata server (TC, Transaction Coordinator), written in `Golang`. Taas has been contributed to the Seata open-source community by InfiniVision (http://infinivision.cn) and is now officially open source.

Before Seata was open-sourced, we began to reference GTS and some open-source projects to implement the distributed transaction solution TaaS (Transaction as a Service).

After we completed the development of the TaaS server, Seata (then called Fescar) was open-sourced and attracted widespread attention from the open-source community. With Alibaba's platform influence and community activity, we believe that Seata will become the standard for open-source distributed transactions in the future. Therefore, we decided to make TaaS compatible with Seata.

Upon discovering that Seata's server implementation was single-node and lacked high availability, we contacted the Seata community leaders and decided to open-source TaaS to contribute to the open-source community. We will also maintain it in the long term and keep it synchronized with Seata versions.

Currently, the official Java high-availability version of Seata is also under development. TaaS and this high-availability version have different design philosophies and will coexist in the future.

TaaS has been open-sourced on GitHub (https://github.com/apache/incubator-seata-go-server). We welcome everyone to try it out.

### Design Principles
1. High Performance: Performance scales linearly with the number of machines. Adding new machines to the cluster can improve performance.
2. High Availability: If a machine fails, the system can still provide services externally, or the service can be restored externally in a short time (the time it takes to switch leaders).
3. Auto-Rebalance: When new machines are added to the cluster or machines are offline, the system can automatically perform load balancing.
4. Strong Consistency: The system's metadata is stored consistently in multiple replicas.

### Design
![TaaS Design](/img/blog/taas.png)

#### High Performance
TaaS's performance scales linearly with the number of machines. To support this feature, TaaS handles the smallest unit of global transactions called a `Fragment`. The system sets the maximum concurrency of active global transactions supported by each Fragment upon startup. The system also samples each Fragment, and when it becomes overloaded, it generates new Fragments to handle more concurrency.

#### High Availability
Each `Fragment` has multiple replicas and one leader to handle requests. When the leader fails, the system generates a new leader to handle requests. During the election process of the new leader, the Fragment does not provide services externally, typically for a few seconds.

#### Strong Consistency
TaaS itself does not store the metadata of global transactions. The metadata is stored in Elasticell (https://github.com/deepfabric/elasticell), a distributed KV storage compatible with the Redis protocol. Elasticell ensures data consistency based on the Raft protocol.

#### Auto-Rebalance
As the system runs, there will be many `Fragments` and their replicas, resulting in uneven distribution of Fragments on each machine, especially when old machines are offline or new machines come online. When TaaS starts, it selects three nodes as schedulers, responsible for scheduling these `Fragments` to ensure that the number of Fragments and the number of leaders on each machine are roughly equal. It also ensures that the number of replicas for each Fragment remains at the specified number.

##### Fragment Replication Creation
![Fragment Replication Creation](/img/blog/taas_add.png)

1. At time t0, Fragment1 is created on machine Seata-TC1.
2. At time t1, a replica of Fragment1, Fragment1', is created on machine Seata-TC2.
3. At time t2, another replica of Fragment1, Fragment1", is created on machine Seata-TC3.

By time t2, all three replicas of Fragment1 are created.

##### Fragment Replication Migration
![Fragment Replication Migration](/img/blog/taas_move.png)

1. At time t0, the system has four Fragments, each existing on machines Seata-TC1, Seata-TC2, and Seata-TC3.
2. At time t1, a new machine, Seata-TC4, is added.
3. At time t2, replicas of three Fragments are migrated to machine Seata-TC4.

### Online Quick Experience
We have set up an experience environment on the public network:
* Seata Server Address: 39.97.115.141:8091
* UI: http://39.97.115.141:8084/ui/index.html

### Local Quick Experience
Quickly experience TaaS functionality using docker-compose.
```bash
git clone https://github.com/seata/taas.git
docker-compse up -d
```
Due to the many component dependencies, the docker-compose takes about 30 seconds to start and become available for external services.

#### Seata Server Address
The service listens on the default port 8091. Modify the Seata server address accordingly to experience.

#### Seata UI 
Access the WEB UI at `http://127.0.0.1:8084/ui/index.html`

### About InfiniVision
InfiniVision is a technology-driven enterprise service provider dedicated to assisting traditional enterprises in digital transformation and upgrading using technologies such as artificial intelligence, cloud computing, blockchain, big data, and IoT edge computing. InfiniVision actively embraces open source culture and open sources core algorithms and architectures. Notable open-source products include the facial recognition software InsightFace (https://github.com/deepinsight/insightface), which has repeatedly won large-scale facial recognition challenges, and the distributed storage engine Elasticell (https://github.com/deepfabric/elasticell).

### About the Author
The author, Zhang Xu, is the creator of the open-source Gateway (https://github.com/fagongzi/gateway) and currently works at InfiniVision, focusing on infrastructure-related development.
