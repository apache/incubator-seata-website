---
title: Seata Java Download
keywords: [Seata, Seata-Server, Download]
description: Seata-Server release version download
hide_table_of_contents: true
---

# Download

:::tip

Version 2.1.0 has been released, support for support RocketMQ transaction message; full support for states in the refactored state machine designer; support raft node metadata sync; support autolayout in seata-statemachine-designer; support mock server; compatible with io.seata package API and data below 2.1.0. You are welcome to download and try it out.

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

| Version | Src                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Binary | Release Notes                               | Reference Docs                              | Is ASF Release |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -------------------------------- |---------------------------------------------|---------------------------------------------|----------------|
| 2.1.0   | [apache-seata-2.1.0-incubating-src.tar.gz](https://downloads.apache.org/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-src.tar.gz) <br/> [apache-seata-2.1.0-incubating-src.tar.gz.asc](https://dist.apache.org/repos/dist/release/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-src.tar.gz.asc) <br/> [apache-seata-2.1.0-incubating-src.tar.gz.sha512](https://dist.apache.org/repos/dist/release/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-src.tar.gz.sha512) | [apache-seata-2.1.0-incubating-bin.tar.gz](https://dist.apache.org/repos/dist/release/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-bin.tar.gz) <br/> [apache-seata-2.1.0-incubating-bin.tar.gz.asc](https://dist.apache.org/repos/dist/release/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-bin.tar.gz.asc)<br/> [apache-seata-2.1.0-incubating-bin.tar.gz.sha512](https://dist.apache.org/repos/dist/release/incubator/seata/2.1.0/apache-seata-2.1.0-incubating-bin.tar.gz.sha512) | [2.1.0 Release Notes](https://github.com/apache/incubator-seata/releases/tag/v2.1.0) | [2.1.0 Quick Start](/docs/user/quickstart/) | YES            |

| Version | Binary Link                                                                                            | Docker Image                                                                                       | CheckSum                         | Release Notes                                    | Reference Docs                                   | Is ASF Release |
| ------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------ | ------------------------------------------------ | -------------- |
| 2.0.0   | [2.0.0.zip](https://github.com/apache/incubator-seata/releases/download/v2.0.0/seata-server-2.0.0.zip) | [seataio/seata-server:2.0.0](https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=2.0.0) | 5c5c6a98649f37ed7894743b21bc8777 | [2.0.x Release Notes](/docs/release-notes/)      | [2.0.x Quick Start](/docs/user/quickstart/)      | NO             |
| 1.8.0   | [1.8.0.zip](https://github.com/apache/incubator-seata/releases/download/v1.8.0/seata-server-1.8.0.zip) | [seataio/seata-server:1.8.0](https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.8.0) | f5de162a4577f5f96828cba75d912240 | [1.8.x Release Notes](/docs/v1.8/release-notes/) | [1.8.x Quick Start](/docs/v1.8/user/quickstart/) | NO             |
| 1.7.1   | [1.7.1.zip](https://github.com/apache/incubator-seata/releases/download/v1.7.1/seata-server-1.7.1.zip) | [seataio/seata-server:1.7.1](https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.7.1) | 5e7f41965f8f26a46b727d204eef3054 | [1.7.x Release Notes](/docs/v1.7/release-notes/) | [1.7.x Quick Start](/docs/v1.7/user/quickstart/) | NO             |

```mdx-code-block
</section>
```

1. Seata version maintenance policy, please refer to the [version maintenance document](/docs/ops/version-maintain-plan)
   , please upgrade the lower version to the current maintenance version as soon as possible. For version upgrade,
   please refer to the [upgrade guide](/docs/ops/upgrade)
2. For more release history downloads, please refer to [Release History](/unversioned/release-history/seata-server)

## Snapshot Version

```mdx-code-block
<section class="full_width_table_section">
```

| Version | Binary Link | Docker Image | CheckSum | Release Notes | Reference Docs | Is ASF Release |
| ------- | ----------- | ------------ | -------- | ------------- | -------------- | -------------- |

```mdx-code-block
</section>
```
