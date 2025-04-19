---
title: Seata Java Download
keywords: [Seata, Seata-Server, Download]
description: Seata release version download
hide_table_of_contents: true
---

# Download

:::tip

 V2.3.0 is now officially released with major upgrades! This update introduces full support for Kingbase and ShenTong databases, integrates gRPC communication protocol and serializers to significantly enhance distributed transaction capabilities. Core optimizations include: boosted JSON efficiency via fastjson2 serialization/parsing, simplified transaction development with Saga annotations, and hardened security through SSL-encrypted Raft node communication. This release delivers stronger stability and security for your system infrastructure!
:::

## System Requirements

:::note

The following system requirements are the minimum required to deploy Seata-Server: if your device does not meet these
requirements, you may not be able to deploy Seata-Server on your device.

:::

```mdx-code-block
<section class="full_width_table_section">
```

| Items                      | Requirements                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Java Development Kit (JDK) | JDK 8 or higher                                                                                                |
| CPU                        | 1 core and above, supports 64-bit CPUs                                                                         |
| Memory                     | 2G and above                                                                                                   |
| Disk                       | No minimum requirement, requires specific adjustments based on logging, storage mode, and other configurations |
| Operating System           | 64-bit Linux, Mac OS X, Windows                                                                                |

```mdx-code-block
</section>
```

## Stable Version

```mdx-code-block
<section class="full_width_table_section">
```
### ASF Release
| Version | Source                                                                                                                                                                                                                                                                                                                                                                               | Binary                                                                                                                                                                                                                                                                                                                                                               | Release Notes                               | Reference Docs                              |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|---------------------------------------------|
| 2.3.0   | [apache-seata-2.3.0-incubating-src.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.3.0/apache-seata-2.3.0-incubating-src.tar.gz?action=download) [ASC](https://downloads.apache.org/incubator/seata/2.3.0/apache-seata-2.3.0-incubating-src.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/2.3.0/apache-seata-2.3.0-incubating-src.tar.gz.sha512)<br/>                     | [apache-seata-2.3.0-incubating-bin.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.3.0/apache-seata-2.3.0-incubating-bin.tar.gz?action=download)    [ASC](https://downloads.apache.org/incubator/seata/2.3.0/apache-seata-2.3.0-incubating-bin.tar.gz.asc)  [SHA512](https://downloads.apache.org/incubator/seata/2.3.0/apache-seata-2.3.0-incubating-bin.tar.gz.sha512)<br/> | [2.3.0 Release Notes](https://github.com/apache/incubator-seata/releases/tag/v2.3.0) | [2.3.0 Quick Start](/docs/user/quickstart/) |
| 2.2.0   | [apache-seata-2.2.0-incubating-src.zip](https://www.apache.org/dyn/closer.lua/incubator/seata/2.2.0/apache-seata-2.2.0-incubating-src.zip?action=download) [ASC](https://downloads.apache.org/incubator/seata/2.2.0/apache-seata-2.2.0-incubating-src.zip.asc) [SHA512](https://downloads.apache.org/incubator/seata/2.2.0/apache-seata-2.2.0-incubating-src.zip.sha512)<br/>     | [apache-seata-2.2.0-incubating-bin.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz?action=download)  [ASC](https://downloads.apache.org/incubator/seata/2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz.sha512)<br/>    | [2.2.0 Release Notes](https://github.com/apache/incubator-seata/releases/tag/v2.2.0) | [2.2.0 Quick Start](/docs/user/quickstart/) |
| 2.1.0   | [apache-seata-2.1.0-incubating-src.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-src.tar.gz?action=download) [ASC](https://downloads.apache.org/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-src.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-src.tar.gz.sha512) | [apache-seata-2.1.0-incubating-bin.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-bin.tar.gz?action=download)  [ASC](https://downloads.apache.org/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-bin.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-bin.tar.gz.sha512)        | [2.1.0 Release Notes](https://github.com/apache/incubator-seata/releases/tag/v2.1.0) | [2.1.0 Quick Start](/docs/user/quickstart/) |

```mdx-code-block
</section>
```

1. Seata version maintenance policy, please refer to the [version maintenance document](/docs/ops/version-maintain-plan)
   , please upgrade the lower version to the current maintenance version as soon as possible. For version upgrade,
   please refer to the [upgrade guide](/docs/ops/upgrade)
2. For more release history downloads, please refer to [Release History](/release-history/seata-server)

[//]: # (## Snapshot Version)

[//]: # ()
[//]: # (```mdx-code-block)

[//]: # (<section class="full_width_table_section">)

[//]: # (```)

[//]: # ()
[//]: # (| Version | Binary Link | Docker Image | CheckSum | Release Notes | Reference Docs | Is ASF Release |)

[//]: # (| ------- | ----------- | ------------ | -------- | ------------- | -------------- | -------------- |)

[//]: # ()
[//]: # (```mdx-code-block)

[//]: # (</section>)

[//]: # (```)
