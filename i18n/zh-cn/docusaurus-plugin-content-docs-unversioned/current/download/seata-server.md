---
title: Seata Java Download
keywords: [ Seata, Seata-Server, 下载 ]
description: Seata 发布版本下载
hide_table_of_contents: true
---

# 下载

:::tip

2.4.0 最新版本重磅升级！本次更新新增对 Kingbase XA 模式支持，增加控制台事务异常控制操作，支持 seata-server
限流，支持 Raft 集群模式向 naming-server 注册，支持 fury 序列化，支持控制台和 naming-server 合并部署。此版本进一步提升了稳定性和安全性！

:::

## 系统要求

:::note

以下系统要求是部署 Seata-Server 的最低要求，如果您的设备不满足这些要求，您可能无法在设备上部署 Seata-Server。

:::

```mdx-code-block
<section class="full_width_table_section">
```

| 项目  | 要求                           |
|-----|------------------------------|
| JDK | JDK 8 或更高版本                  |
| CPU | 1 核及以上，支持 64 位的 CPU          |
| 内存  | 2G 及以上                       |
| 硬盘  | 无最小要求，需要根据日志、存储模式等配置具体调整     |
| 系统  | 64 位的 Linux、Mac OS X、Windows |

```mdx-code-block
</section>
```

## 稳定版

```mdx-code-block
<section class="full_width_table_section">
```

### ASF 发布版本

| 版本号   | 源码下载                                                                                                                                                                                                                                                                                                                                                                                      | 二进制下载                                                                                                                                                                                                                                                                                                                                                                                         | 发布说明                                                                                 | 参考文档                                        |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---------------------------------------------|
| 2.4.0 | [apache-seata-2.4.0-incubating-src.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.4.0/apache-seata-2.4.0-incubating-src.tar.gz?action=download) [ASC](https://downloads.apache.org/incubator/seata/2.4.0/apache-seata-2.4.0-incubating-src.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/2.4.0/apache-seata-2.4.0-incubating-src.tar.gz.sha512)<br/> | [apache-seata-2.4.0-incubating-bin.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.4.0/apache-seata-2.4.0-incubating-bin.tar.gz?action=download)    [ASC](https://downloads.apache.org/incubator/seata/2.4.0/apache-seata-2.4.0-incubating-bin.tar.gz.asc)  [SHA512](https://downloads.apache.org/incubator/seata/2.4.0/apache-seata-2.4.0-incubating-bin.tar.gz.sha512)<br/> | [2.4.0 Release Notes](https://github.com/apache/incubator-seata/releases/tag/v2.4.0) | [2.4.0 Quick Start](/docs/user/quickstart/) |

1. 版本升级请参考[升级指南](/docs/ops/upgrade)
2. 更多历史版本下载，请参考[版本历史](/release-history/seata-server)

```mdx-code-block
</section>
```

[//]: # (## 快照版)

[//]: # ()

[//]: # (```mdx-code-block)

[//]: # (<section class="full_width_table_section">)

[//]: # (```)

[//]: # ()

[//]: # (| 版本号 | 二进制下载 | docker 镜像 | checksum | 发布说明 | 版本文档 | 是否 ASF 版本 |)

[//]: # (| ------ | ---------- | ----------- | -------- | -------- | -------- | ------------- |)

[//]: # ()

[//]: # (```mdx-code-block)

[//]: # (</section>)

[//]: # (```)

## 验证

验证下载文件的完整性对保证文件的安全性至关重要，可以使用 GPG 或 SHA 签名完成这项任务。建议直接从主分发目录下载 KEYS 文件，并对应下载 .asc 和 .sha512 签名文件，而不是通过镜像站获取这些文件。

### 验证签名

1. 下载 GPG 签名 [KEYS](https://downloads.apache.org/incubator/seata/KEYS) 以及发布版本和它的 .asc 签名文件。

2. 导入公钥:
   ```bash
   gpg --import KEYS
   ```
3. 验证签名:
   ```bash
   gpg --verify apache-seata-***.asc apache-seata-***
   ```

   如果出现类似以下内容，说明签名是正确的:

   ```bash
    gpg: Signature made Tue Apr 29 12:11:09 2025 CST
    gpg:                using RSA key 775377BF271D659E591249CD63E269707E8BF0FB
    gpg: Good signature from "xxx" [ultimate]
   ```

### 验证 Checksum

1. 下载发布版本及其 .sha512 签名文件。

2. 验证 checksum:
   ```bash
   shasum -c apache-seata-***.sha512
   ```

   如果出现类似以下内容，说明 checksum 是正确的:

   ```bash
   apache-seata-***.tar.gz: OK
   ```
