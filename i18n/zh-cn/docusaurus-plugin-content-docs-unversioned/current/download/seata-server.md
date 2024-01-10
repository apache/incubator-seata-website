---
title: Seata-Server下载
keywords: [Seata, Seata-Server, 下载]
description: Seata-Server发布版本下载
---


# Seata-Server下载

:::tip

2.0.0版本已发布，支持Raft集群；AT事务模式新增达梦、SQLServer和PolarDB-X 2.0数据库支持；支持IPV6；支持统一API；支持事务二阶段并行处理。欢迎下载试用。

:::tip

## 系统要求

:::note

以下系统要求是部署Seata-Server的最低要求，如果您的设备不满足这些要求，您可能无法在设备上部署Seata-Server。

:::note

| 项目 | 要求                         |
| ---- |----------------------------|
| JDK  | JDK 8 或更高版本                |
| CPU  | 1核及以上，支持64位的CPU            |
| 内存 | 2G及以上                      |
| 硬盘 | 无最小要求，需要根据日志、存储模式等配置具体调整   |
| 系统 | 64位的Linux、Mac OS X、Windows |

## 稳定版

| 版本号 | 二进制下载                                                   | Docker镜像                                                   | CheckSum                         | 发布说明                                    | 参考文档                                      |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------- | ------------------------------------------- | --------------------------------------------- |
| 2.0.0  | [2.0.0.zip](https://github.com/apache/incubator-seata/releases/download/v2.0.0/seata-server-2.0.0.zip) | [seataio/seata-server:2.0.0](https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=2.0.0) | 5c5c6a98649f37ed7894743b21bc8777 | [2.0.x 发布说明](/docs/release-notes/)      | [2.0.x 快速开始](/docs/user/quickstart/)      |
| 1.8.0  | [1.8.0.zip](https://github.com/apache/incubator-seata/releases/download/v1.8.0/seata-server-1.8.0.zip) | [seataio/seata-server:1.8.0](https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.8.0) | f5de162a4577f5f96828cba75d912240 | [1.8.x 发布说明](/docs/v1.8/release-notes/) | [1.8.x 快速开始](/docs/v1.8/user/quickstart/) |
| 1.7.1  | [1.7.1.zip](https://github.com/apache/incubator-seata/releases/download/v1.7.1/seata-server-1.7.1.zip) | [seataio/seata-server:1.7.1](https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.7.1) | 5e7f41965f8f26a46b727d204eef3054 | [1.7.x 发布说明](/docs/v1.7/release-notes/) | [1.7.x 快速开始](/docs/v1.7/user/quickstart/) |

1. Seata版本维护策略，请参考[版本维护文档](https://seata.apache.org/)，请您尽快升级低版本至当前维护版本。版本升级请参考[升级指南](/docs/ops/upgrade)
2. 更多历史版本下载，请参考[版本历史](/unversioned/release-history/seata-server)

## 快照版

| 版本号 | 二进制下载 | docker镜像 | checksum | 发布说明 | 版本文档 |
| ---- | ---- | ---- | ---- | ---- | -- |
