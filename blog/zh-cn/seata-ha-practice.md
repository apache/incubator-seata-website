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

## 准备工作

需要准备可用的注册中心、配置中心 Nacos 和 MySQL，在大多数情况下，注册中心、配置中心和数据库都是已有的，不需要特别配置，在这个实践中，为了简单，只部署单机的注册中心、配置中心和数据库，假设他们是可靠的

- 部署 Nacos 

在服务器部署 Nacos，开放 8848 端口，用于 seata-server 注册，服务器地址为 `192.168.199.2`

```bash
docker run --name nacos -p 8848:8848 -e MODE=standalone nacos/nacos-server
```

- 部署 MySQL 

部署一台MySQL 数据库，用于 seata-server 保存事务数据，服务器地址为 `192.168.199.2`

```bash
docker run --name mysql7 -p 30060:3306-e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.17
```

## 部署 seata-server

- 创建seata-server需要的表

具体的 SQL 参考 [script/server/db](https://github.com/seata/seata/tree/develop/script/server/db)，这里使用的是 MySQL 的脚本，数据库名称为 `seata`

同时，也需要创建 undo_log 表， 可以参考 [script/client/at/db/](https://github.com/seata/seata/blob/develop/script/client/at/db/)

- 修改seata-server配置

将以下配置添加到配置中心，具体添加方法可以参考 [script/config-center](https://github.com/seata/seata/tree/develop/script/config-center)

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
kind: Deployment
metadata:
  name: seata-ha-server
  namespace: default
  labels:
    app.kubernetes.io/name: seata-ha-server
spec:
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

## 部署服务

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
      serviceAccountName: springcloud
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

![seata-ha-service-register.png](/img/blog/seata-ha-service-register.png)


## 测试


- 测试成功场景

调用 placeOrder 接口，将 price 设置为 1，此时余额为 10，可以下单成功

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

- 测试失败场景

设置 price 为 100，此时余额不足，会下单失败，pay-service会抛出异常，事务会回滚

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

多次调用查看服务日志，发现会随机的向其中某台TC发起事务注册，当扩容或缩容后，有相应的 TC 参与或退出

