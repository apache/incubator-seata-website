---
hidden: true
title: Seata 高可用部署实践
keywords: kubernetes,ops
description: Seata 高可用部署实践
author: helloworlde
date: 2020-04-10
---

# Seata 高可用部署实践

使用配置中心和数据库来实现 Seata 的高可用，以 Nacos 和 MySQL 为例，将[cloud-seata-nacos](https://github.com/helloworlde/spring-cloud-alibaba-component/blob/master/cloud-seata-nacos/)应用部署到 Kubernetes 集群中

该应用使用 Nacos 作为配置和注册中心，总共有三个服务: order-service, pay-service, storage-service, 其中 order-service 对外提供下单接口，当余额和库存充足时，下单成功，会提交事务，当不足时会抛出异常，下单失败，回滚事务

## 准备工作

需要准备可用的注册中心、配置中心 Nacos 和 MySQL，通常情况下，注册中心、配置中心和数据库都是已有的，不需要特别配置，在这个实践中，为了简单，只部署单机的注册中心、配置中心和数据库，假设他们是可靠的

- 部署 Nacos 

在服务器部署 Nacos，开放 8848 端口，用于 seata-server 注册，服务器地址为 `192.168.199.2`

```bash
docker run --name nacos -p 8848:8848 -e MODE=standalone nacos/nacos-server
```

- 部署 MySQL 

部署一台MySQL 数据库，用于保存事务数据，服务器地址为 `192.168.199.2`

```bash
docker run --name mysql -p 30060:3306-e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.17
```

## 部署 seata-server

- 创建seata-server需要的表

具体的 SQL 参考 [script/server/db](https://github.com/seata/seata/tree/develop/script/server/db)，这里使用的是 MySQL 的脚本，数据库名称为 `seata`

同时，也需要创建 undo_log 表， 可以参考 [script/client/at/db/](https://github.com/seata/seata/blob/develop/script/client/at/db/)

- 修改seata-server配置

将以下配置添加到 Nacos 配置中心，具体添加方法可以参考 [script/config-center](https://github.com/seata/seata/tree/develop/script/config-center)

```
service.vgroupMapping.my_test_tx_group=default
store.mode=db
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://192.168.199.2:30060/seata?useUnicode=true
store.db.user=root
store.db.password=123456
```

### 部署 seata-server 到 Kubernetes

- seata-server.yaml

需要将 ConfigMap 的注册中心和配置中心地址改成相应的地址

```yaml
apiVersion: v1
kind: Service
metadata:
  name: seata-ha-server
  namespace: default
  labels:
    app.kubernetes.io/name: seata-ha-server
spec:
  type: ClusterIP
  ports:
    - port: 8091
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: seata-ha-server

---

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: seata-ha-server
  namespace: default
  labels:
    app.kubernetes.io/name: seata-ha-server
spec:
  serviceName: seata-ha-server
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: seata-ha-server
  template:
    metadata:
      labels:
        app.kubernetes.io/name: seata-ha-server
    spec:
      containers:
        - name: seata-ha-server
          image: docker.io/seataio/seata-server:latest
          imagePullPolicy: IfNotPresent
          env:
            - name: SEATA_CONFIG_NAME
              value: file:/root/seata-config/registry
          ports:
            - name: http
              containerPort: 8091
              protocol: TCP
          volumeMounts:
            - name: seata-config
              mountPath: /root/seata-config
      volumes:
        - name: seata-config
          configMap:
            name: seata-ha-server-config


---
apiVersion: v1
kind: ConfigMap
metadata:
  name: seata-ha-server-config
data:
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

- 部署

```bash
kubectl apply -f seata-server.yaml
```

部署完成后，会有三个 pod

```bash
kubectl get pod | grep seata-ha-server

seata-ha-server-645844b8b6-9qh5j    1/1     Running   0          3m14s
seata-ha-server-645844b8b6-pzczs    1/1     Running   0          3m14s
seata-ha-server-645844b8b6-wkpw8    1/1     Running   0          3m14s
```

待启动完成后，可以在 Nacos 的服务列表中发现三个 seata-server 的实例，至此，已经完成 seata-server 的高可用部署

- 查看服务日志 

```bash
kubelet logs -f seata-ha-server-645844b8b6-9qh5j
```

```java
[0.012s][info   ][gc] Using Serial
2020-04-15 00:55:09.880 INFO [main]io.seata.server.ParameterParser.init:90 -The server is running in container.
2020-04-15 00:55:10.013 INFO [main]io.seata.config.FileConfiguration.<init>:110 -The configuration file used is file:/root/seata-config/registry.conf
2020-04-15 00:55:12.426 INFO [main]com.alibaba.druid.pool.DruidDataSource.init:947 -{dataSource-1} inited
2020-04-15 00:55:13.127 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started 
```

其中`{dataSource-1} `说明使用了数据库，并正常初始化完成

- 查看注册中心，此时seata-serve 这个服务会有三个实例

![seata-ha-nacos-list.png](/img/blog/seata-ha-nacos-list.png)


## 部署业务服务

- 创建业务表并初始化数据

具体的业务表可以参考 [cloud-seata-nacos/README.md](https://github.com/helloworlde/spring-cloud-alibaba-component/blob/master/cloud-seata-nacos/README.md)

- 添加 Nacos 配置

在 public 的命名空间下，分别创建 data-id 为 `order-service.properties`, `pay-service.properties`, `storage-service.properties` 的配置，内容相同，需要修改数据库的地址、用户名和密码

```
# MySQL
spring.datasource.url=jdbc:mysql://192.168.199.2:30060/seata?useUnicode=true&characterEncoding=utf8&allowMultiQueries=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# Seata
spring.cloud.alibaba.seata.tx-service-group=my_test_tx_group
```

- 部署服务

通过 application.yaml 配置文件部署服务，需要注意的是修改 ConfigMap 的 `NACOS_ADDR`为自己的 Nacos 地址

```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: default
  name: seata-ha-service
  labels:
    app.kubernetes.io/name: seata-ha-service
spec:
  type: NodePort
  ports:
    - port: 8081
      nodePort: 30081
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: seata-ha-service

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: seata-ha-service-config
data:
  NACOS_ADDR: 192.168.199.2:8848

---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: seata-ha-account
  namespace: default
  
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: seata-ha-account
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: seata-ha-account
    namespace: default

---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: default
  name: seata-ha-service
  labels:
    app.kubernetes.io/name: seata-ha-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: seata-ha-service
  template:
    metadata:
      labels:
        app.kubernetes.io/name: seata-ha-service
    spec:
      serviceAccountName: seata-ha-account
      containers:
        - name: seata-ha-order-service
          image: "registry.cn-qingdao.aliyuncs.com/hellowoodes/seata-ha-order-service:1.1"
          imagePullPolicy: IfNotPresent
          env:
            - name: NACOS_ADDR
              valueFrom:
                configMapKeyRef:
                  key: NACOS_ADDR
                  name: seata-ha-service-config
          ports:
            - name: http
              containerPort: 8081
              protocol: TCP
        - name: seata-ha-pay-service
          image: "registry.cn-qingdao.aliyuncs.com/hellowoodes/seata-ha-pay-service:1.1"
          imagePullPolicy: IfNotPresent
          env:
            - name: NACOS_ADDR
              valueFrom:
                configMapKeyRef:
                  key: NACOS_ADDR
                  name: seata-ha-service-config
          ports:
            - name: http
              containerPort: 8082
              protocol: TCP
        - name: seata-ha-storage-service
          image: "registry.cn-qingdao.aliyuncs.com/hellowoodes/seata-ha-storage-service:1.1"
          imagePullPolicy: IfNotPresent
          env:
            - name: NACOS_ADDR
              valueFrom:
                configMapKeyRef:
                  key: NACOS_ADDR
                  name: seata-ha-service-config
          ports:
            - name: http
              containerPort: 8083
              protocol: TCP
```

通过以下命令，将应用部署到集群中

```bash
kubectl apply -f application.yaml
```

然后查看创建的 pod，seata-ha-service 这个服务下有三个 pod

```bash
kubectl get pod | grep seata-ha-service

seata-ha-service-7dbdc6894b-5r8q4      3/3     Running   0          12m
```

待应用启动后，在 Nacos 的服务列表中，会有相应的服务

![seata-ha-service-list.png](/img/blog/seata-ha-service-list.png)

此时查看服务的日志，会看到服务向每一个 TC 都注册了

```bash
kubectl logs -f seata-ha-service-7dbdc6894b-5r8q4 seata-ha-order-service
```

![seata-ha-service-register.png](/img/blog/seata-ha-service-register.png)

查看任意的 TC 日志，会发现每一个服务都向 TC 注册了

```bash
kubelet logs -f seata-ha-server-645844b8b6-9qh5j
```

![seata-ha-tc-register.png](/img/blog/seata-ha-tc-register.png)


## 测试


### 测试成功场景

调用下单接口，将 price 设置为 1，因为初始化的余额为 10，可以下单成功

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

此时返回结果为：

```json
{"success":true,"message":null,"data":null}
```

查看TC 的日志，事务成功提交：

![seata-ha-commit-tc-success.png](/img/blog/seata-ha-commit-tc-success.png)

查看 order-service 服务日志
![seata-ha-commit-success.png](/img/blog/seata-ha-commit-service-success.png)


### 测试失败场景

设置 price 为 100，此时余额不足，会下单失败抛出异常，事务会回滚

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

查看 TC 的日志：
![seata-ha-commit-tc-rollback.png](/img/blog/seata-ha-commit-tc-rollback.png)

查看服务的日志 ：
![seata-ha-commit-service-rollback.png](/img/blog/seata-ha-commit-service-rollback.png)

多次调用查看服务日志，发现会随机的向其中某台TC发起事务注册，当扩容或缩容后，有相应的 TC 参与或退出，证明高可用部署生效

