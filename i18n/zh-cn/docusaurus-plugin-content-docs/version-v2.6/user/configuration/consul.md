---
title: Consul 配置中心
keywords: [Seata, Consul]
description: Consul 配置中心。
---

# Consul 配置中心

在 [以 Consul 作为注册中心](/docs/user/registry/consul/) 的基础上，将 Seata 配置放到 Consul 中

本文基于 Seata 1.4.2，Consul 版本建议 1.8+，下文以 Consul 1.11.2 为例

## 准备工作

当您决定使用 Consul 作为 Seata 配置中心前，请确保已经启动 Consul 服务。

## 快速上手

将 Consul 作为 Seata 配置中心的操作步骤非常简单，可分为以下几步：

1. seata-server 配置 Consul 为配置中心
2. 提交 Key-Value 配置至 Consul
3. Client 端 配置 Consul 为配置中心

### 配置 Consul 为配置中心

首先，请确保您的 Consul 服务已启动

在 Seata 目录下 /conf/registry.conf
中加入对应配置中心,其余[配置参考](https://github.com/apache/incubator-seata/blob/1.4.2/script/server/config/registry.conf)

```
config {
  type = "consul"

  consul {
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
}
```

**此时启动 Seata 服务，会提示如下字样信息，可先关闭服务**

```
config operation timeout,cost:5015 ms,op:GET,dataId:store.mode
config operation timeout,cost:5006 ms,op:GET,dataId:metrics.enabled
config operation timeout,cost:5001 ms,op:GET,dataId:transport.threadFactory.bossThreadPrefix
config operation timeout,cost:5009 ms,op:GET,dataId:transport.threadFactory.workerThreadPrefix
# 此处省略类似的其他信息~
```

### 提交 Key-Value 配置至 Consul

出现以上报错信息是因为 Consul 中缺少对应配置，请从以下方式中**选择其中一种方式**提交配置到 Consul Key/Value 中

1. 通过 Consul 控制台 ui，Key/Value -> create
2. 通过 [http 请求](https://www.consul.io/api-docs/kv)
3. 通过 [Consul 命令行工具](https://www.consul.io/commands/kv)
4. **推荐：使用官方提供的上传配置脚本**

**tips**: 1.4.2 需要逐个创建 key-value，1.5.0 后支持 key 对应文件

以 store.mode=file
为例，提交报错信息对应的配置，在这里可以找到[默认配置](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/config.txt)

```properties
store.mode=file
store.publicKey=
store.file.dir=file_store/data
store.file.maxBranchSessionSize=16384
# 剩下的配置项省略~
```

**推荐使用官方脚本：** 以上方式 1~3 需要逐个添加配置，操作较为繁琐，为此官方提供了
[脚本](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/consul/consul-config.sh) 和
[默认配置](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/config.txt)
以快速添加配置

将 config.txt 放在 consul-config.sh 的**上层目录**， 根据自己的需要微调 config.txt 的配置（主要是 seata.mode 及 seata.file | seata.db | seata.redis
这几个前缀的配置）

执行如下命令

```shell
sh {PATH}/consul-config.sh -h localhost -p 8500
```

具体操作可参考[README.md](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/README.md)

此时重启 Seata 服务，发现不再报错，即成功使用 Consul 作为配置中心了，后面如需调整配置，可前往控制台单独修改对应的配置，修改后需重启服务

### Client 端 配置 Consul 为配置中心

**以 SpringBoot 项目为例，在项目 pom.xml 中加入**

```xml

<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>最新版（Seata版本）</version>
</dependency>
<dependency>
<groupId>org.springframework.cloud</groupId>
<artifactId>spring-cloud-starter-consul-config</artifactId>
</dependency>
```

### Client端配置

在 application.yml 中加入对应的配置中心，其余[配置参考](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml)

```yaml
seata:
  config:
    type: consul
    consul:
      server-addr: 127.0.0.1:8500
```

重启 Client 即可