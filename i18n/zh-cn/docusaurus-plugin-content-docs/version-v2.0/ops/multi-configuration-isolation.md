---
title: 多配置隔离
keywords: [Seata]
description: Seata从0.6.1版本开始支持多配置隔离，可以按照以下步骤进行配置。
---

# 多配置隔离

Seata从0.6.1版本开始支持多配置隔离，你可以按照以下步骤进行配置。

## 用例

假设我们现在有一个测试环境，我们只想读取测试环境对应的配置项。

### 1.环境配置

Seata 提供了两种设置不同环境的方法：

- **-e test**，其中test是环境名称。(**仅适用于服务器端**)
```shell

例如，在Linux下使用命令：

sh Seata-server.sh -e test
```
- [ **推荐** ] 使用**SEATA_ENV**作为环境变量的键，其值是环境名称。（**仅适用于客户端**）
```shell

例如，在Linux下使用命令：

#vi /etc/profile 

export SEATA_ENV=test

:wq

#source /etc/profile
```
- [ **推荐** ]使用**seataEnv**作为jvm选项的键，它的值将是环境的名称。（**仅适用于客户端**）
```
-DseataEnv=test
```

### 2.重命名新的配置文件

- 复制 file.conf 并将其重命名为 file-env.conf，其中 env 是环境名称。例如 **file-test.conf**
- 将registry.conf 复制并重命名为 registry-env.conf，其中 env 是环境的名称。例如 **registry-test.conf**
- 在registry-test.conf文件中，进行如下修改：
```shell
registry {
...
file {
    name = "file-test.conf"
  }

config {
...
file {
    name = "file-test.conf"
  }
```

做完以上的所有步骤后，你就可以开始使用 Seata 配置隔离了。
