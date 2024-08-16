---
hidden: true
title: Seata High Availability Deployment Practice
keywords: [kubernetes, ops]
description: Seata High Availability Deployment Practice
author: helloworlde
date: 2020-04-10
---

# Seata High Availability Deployment Practices

To make Seata highly available using a configuration centre and database, take Nacos and MySQL as an example and deploy the [cloud-seata-nacos](https://github.com/helloworlde/spring-cloud-alibaba-component/blob/ master/cloud-seata-nacos/) application to a Kubernetes cluster.

The application uses Nacos as the configuration and registration centre, and has three services: order-service, pay-service, and storage-service. The order-service provides an interface for placing an order, and when the balance and inventory are sufficient, the order succeeds and a transaction is submitted; when they are insufficient, an exception is thrown, the order fails, and the transaction is rolled back. Rollback transaction

## Preparation

You need to prepare available registry, configuration centre Nacos and MySQL, usually, the registry, configuration centre and database are already available and do not need special configuration, in this practice, for simplicity, only deploy a stand-alone registry, configuration centre and database, assuming they are reliable

- Deploying Nacos

Deploy Nacos on a server with port 8848 open for seata-server registration at ``192.168.199.2``.

```bash
docker run --name nacos -p 8848:8848 -e MODE=standalone nacos/nacos-server
 ```

 - Deploying MySQL

 Deploy a MySQL database to hold transaction data at ``192.168.199.2``.

 ```bash
 docker run --name mysql -p 30060:3306-e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.17
 ```

 ## Deploying seata-server

 - Create the tables needed for seata-server.

 Refer to [script/server/db](https://github.com/apache/incubator-seata/tree/develop/script/server/db) for the exact SQL, here we are using MySQL's script and the database name is `seata`.

 You also need to create the undo_log table, see [script/client/at/db/](https://github.com/apache/incubator-seata/blob/develop/script/client/at/db/).

 - Modify the seata-server configuration

 Add the following configuration to the Nacos Configuration Centre, as described in [script/config-center](https://github.com/apache/incubator-seata/tree/develop/script/config-center)

 ```
 service.vgroupMapping.my_test_tx_group=default
 store.mode=db
 store.db.datasource=druid
 store.db.dbType=mysql
 store.db.driverClassName=com.mysql.jdbc.
 store.db.url=jdbc:mysql://192.168.199.2:30060/seata?useUnicode=true
 store.db.user=root
 store.db.password=123456
 ```

### Deploying seata-server to Kubernetes

- seata-server.yaml

You need to change the ConfigMap's Registry and Configuration Centre addresses to the appropriate addresses

 ```yaml
 apiVersion: v1
 kind: Service
 metadata: name: seata-ha-server.yaml
  name: seata-ha-server
  namespace: default
  labels: app.kubernetes.io/name: seata-ha-server
    app.kubernetes.io/name: seata-ha-server
 spec.
  type: ClusterIP
  spec: type: ClusterIP
    - port: 8091
      protocol: TCP
      name: http
  selector: app.kubernetes.io/name: seata-ha-server
    app.kubernetes.io/name: seata-ha-server

 ---apiVersion: apps/v1

 apiVersion: apps/v1
 kind: StatefulSet
 metadata.
  name: seata-ha-server
  namespace: default
  labels: app.kubernetes.io/name: seata-ha-server
    app.kubernetes.io/name: seata-ha-server
 spec: serviceName: seata-ha-server
  serviceName: seata-ha-server
  replicas: 3
  selector: seata-ha-server
    matchLabels.
      app.kubernetes.io/name: seata-ha-server
  template: seata-ha-server
    metadata.
      labels: app.kubernetes.io/name: seata-ha-server
        app.kubernetes.io/name: seata-ha-server
    spec.
      containers: name: seata-ha-server
        - name: seata-ha-server
          image: docker.io/seataio/seata-server:latest
          imagePullPolicy: IfNotPresent
          env: name: SEATA_CONFIG
            - name: SEATA_CONFIG_NAME
              value: file:/root/seata-config/registry
          ports: name: http
            - name: http
              containerPort: 8091
              protocol: TCP
          volumeMounts: name: seata-config
            - name: seata-config
              mountPath: /root/seata-config
      volumes: name: seata-config mountPath: /root/seata-config
        - name: seata-config
          configMap: name: seata-ha-server-config
            name: seata-ha-server-config


 ---apiVersion: v1
 apiVersion: v1
 kind: ConfigMap
 apiVersion: v1 kind: ConfigMap
  name: seata-ha-server-config
 data: name: seata-ha-server-config
  registry.conf: |
    registry {
        type = "nacos"
        nacos {
          application = "seata-server"
          serverAddr = "192.168.199.2"
        }
    }
    config {
      type = "nacos"
      nacos {
        serverAddr = "192.168.199.2"
        group = "SEATA_GROUP"
      }
    }
 ```

- Deployment

 ```bash
 kubectl apply -f seata-server.yaml
 ```

When the deployment is complete, there will be three pods

 ```bash
 kubectl get pod | grep seata-ha-server

 seata-ha-server-645844b8b6-9qh5j 1/1 Running 0 3m14s
 seata-ha-server-645844b8b6-pzczs 1/1 Running 0 3m14s
 seata-ha-server-645844b8b6-wkpw8 1/1 Running 0 3m14s
 ```

After the startup is complete, you can find three instances of seata-server in the Nacos service list, so you have completed the highly available deployment of seata-server.

- Viewing the service logs

 ```bash
 kubelet logs -f seata-ha-server-645844b8b6-9qh5j
 ```

 ```java
 [0.012s][info ][gc] Using Serial
 2020-04-15 00:55:09.880 INFO [main]io.seata.server.ParameterParser.init:90 -The server is running in container.
 2020-04-15 00:55:10.013 INFO [main]io.seata.config.FileConfiguration.<init>:110 -The configuration file used is file:/root/seata- config/registry.conf
 2020-04-15 00:55:12.426 INFO [main]com.alibaba.druid.pool.DruidDataSource.init:947 -{dataSource-1} inited
 2020-04-15 00:55:13.127 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started
 ```

where `{dataSource-1} ` indicates that the database is used and initialised properly

- Looking at the registry, there are three instances of the seata-serve service at this point

! [seata-ha-nacos-list.png](/img/blog/seata-ha-nacos-list.png)


## Deploying the business service

- Create business tables and initialise data

You can refer to [cloud-seata-nacos/README.md](https://github.com/helloworlde/spring-cloud-alibaba-component/blob/master/cloud-seata- nacos/README.md).

- Adding Nacos Configuration

Under the public namespace, create the configurations with data-id `order-service.properties`, `pay-service.properties`, `storage-service.properties`, with the same content. password

```
# MySQL
spring.datasource.url=jdbc:mysql://192.168.199.2:30060/seata?useUnicode=true&characterEncoding=utf8&allowMultiQueries=true &useSSL=false
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.
# Seata
spring.cloud.alibaba.seata.tx-service-group=my_test_tx_group
 ```

 - Deploying the Service

 Deploy the service via the application.yaml configuration file, and note that you need to change the `NACOS_ADDR` of the ConfigMap to your Nacos address.

 ```yaml
 apiVersion: v1
 kind: Service
 metadata: namespace: default
  namespace: default
  name: seata-ha-service
  labels: app.kubernetes.io/name: seata-ha-service
    app.kubernetes.io/name: seata-ha-service
 spec.
  type: NodePort
  spec: type: NodePort
    - nodePort: 30081
      nodePort: 30081
      protocol: TCP
      name: http
  selector: app.kubernetes.io/name: seata-ha-service
    app.kubernetes.io/name: seata-ha-service

 ---
 apiVersion: v1
 kind: ConfigMap
 metadata: name: seata-ha-service-config
  name: seata-ha-service-config
 data: NACOS_ADDR: 192.168.199.2:8848
  NACOS_ADDR: 192.168.199.2:8848

 ---apiVersion: v1
 apiVersion: v1
 kind: ServiceAccount
 metadata: name: seata-ha-account
  name: seata-ha-account
  namespace: default

 ---apiVersion: rbac.authorisation.k8s.io/v1beta1
 apiVersion: rbac.authorisation.k8s.io/v1beta1
 kind: ClusterRoleBinding
 metadata: name: seata-ha-account
  name: seata-ha-account
 roleRef.
  apiGroup: rbac.authorisation.k8s.io/v1beta1 kind: ClusterRoleBinding
  roleRef: apiGroup: rbac.authorisation.k8s.io
  name: cluster-admin
 subjects.
  - kind: ServiceAccount
    name: seata-ha-account
    namespace: default

 ---
 apiVersion: apps/v1
 kind: Deployment
 namespace: default --- --- apiVersion: apps/v1 kind: Deployment
  namespace: default
  name: seata-ha-service
  labels: app.kubernetes.io/name: seata-ha-service
    app.kubernetes.io/name: seata-ha-service
 spec: replicas: 1
  replicas: 1
  selector.
    matchLabels: app.kubernetes.io/name: seata-ha-service
      app.kubernetes.io/name: seata-ha-service
  template: seata-ha-service
    metadata: seata-ha-service template.
      labels: app.kubernetes.io/name: seata-ha-service
        app.kubernetes.io/name: seata-ha-service
    spec: serviceAccountName: seata-ha-service
      serviceAccountName: seata-ha-account
      containers: name: seata-ha-order
        - name: seata-ha-order-service
          image: "registry.cn-qingdao.aliyuncs.com/hellowoodes/seata-ha-order-service:1.1"
          imagePullPolicy: IfNotPresent
          imagePullPolicy: IfNotPresent
            - name: NACOS_ADDR
              valueFrom.
                configMapKeyRef.
                  key: NACOS_ADDR
                  name: seata-ha-service-config
          name: seata-ha-service-config
            - name: http
              containerPort: 8081
              protocol: TCP
        - name: seata-ha-pay-service
          image: "registry.cn-qingdao.aliyuncs.com/hellowoodes/seata-ha-pay-service:1.1"
          imagePullPolicy: IfNotPresent
          env.
            - name: NACOS_ADDR
              valueFrom.
                configMapKeyRef.
                  key: NACOS_ADDR
                  name: seata-ha-service-config
          name: seata-ha-service-config
            - name: http
              containerPort: 8082
              protocol: TCP
        - name: seata-ha-storage-service
          image: "registry.cn-qingdao.aliyuncs.com/hellowoodes/seata-ha-storage-service:1.1"
          imagePullPolicy: IfNotPresent
          env.
            - name: NACOS_ADDR
              valueFrom.
                NACOS_ADDR valueFrom: NACOS_ADDR valueFrom: NACOS_ADDR valueFrom.
                  key: NACOS_ADDR
                  name: seata-ha-service-config
          name: seata-ha-service-config
            - name: http
              containerPort: 8083
              protocol: TCP
 ```

Deploy the application to the cluster with the following command

 ```bash
 kubectl apply -f application.yaml
 ```

Then look at the pods that were created, there are three pods under the seata-ha-service service

 ```bash
 kubectl get pod | grep seata-ha-service

 seata-ha-service-7dbdc6894b-5r8q4 3/3 Running 0 12m
 ```

 Once the application is up and running, in the Nacos service list, there will be the corresponding service

 ! [seata-ha-service-list.png](/img/blog/seata-ha-service-list.png)

 At this point, if you look at the service's logs, you will see that the service has registered with each of the TC's

 ```bash
 kubectl logs -f seata-ha-service-7dbdc6894b-5r8q4 seata-ha-order-service
 ```

 ! [seata-ha-service-register.png](/img/blog/seata-ha-service-register.png)

 Looking at any TC log, you'll see that each service is registered with the TC

 ```bash
 kubelet logs -f seata-ha-server-645844b8b6-9qh5j
 ```

! [seata-ha-tc-register.png](/img/blog/seata-ha-tc-register.png)


## Test


### Test Success Scenario

Call the order interface, set the price to 1, because the initial balance is 10, and the order is placed successfully.

```bash
curl -X POST \
http://192.168.199.2:30081/order/placeOrder \
-H 'Content-Type: application/json' \
-d '{
"userId": 1,
"productId": 1,
"price": 1
}'
 ```

 At this point the return result is:

 ```json
 {"success":true, "message":null, "data":null}
 ```

Checking the TC logs, the transaction was successfully committed:

! [seata-ha-commit-tc-success.png](/img/blog/seata-ha-commit-tc-success.png)

View the order-service service log
! [seata-ha-commit-success.png](/img/blog/seata-ha-commit-service-success.png)


### Test failure scenario

If you set the price to 100 and the balance is not enough, the order fails and throws an exception, and the transaction is rolled back.

```bash
curl -X POST \
http://192.168.199.2:30081/order/placeOrder \
-H 'Content-Type: application/json' \
-d '{
"userId": 1,
"productId": 1,
"price": 100
}'
 ```

 View the logs for TC:
 ! [seata-ha-commit-tc-rollback.png](/img/blog/seata-ha-commit-tc-rollback.png)

 View the logs of the service :
 ! [seata-ha-commit-service-rollback.png](/img/blog/seata-ha-commit-service-rollback.png)

 Multiple calls to view the service logs reveal that transaction registration is randomly initiated to one of the T Cs, and when capacity is expanded or scaled down, the corresponding TC participates or withdraws, proving that the high availability deployment is in effect.
