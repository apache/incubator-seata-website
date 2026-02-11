---
title: Seata Java Download
keywords: [Seata, Seata-Server, Download]
description: Seata release version download
hide_table_of_contents: true
---

# Download

:::tip

2.6.0 latest version with a major upgrade! This update enforces MCP Server support for the Console, optimizing the netty protocol with simplified configuration, fixing yaml compatibility, enabling branch transaction consolidation for multi-data sources, and removing the @localTCC annotation in Saga mode.

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
| -------------------------- |----------------------------------------------------------------------------------------------------------------|
| Java Development Kit (JDK) | JDK 25 or higher                                                                                               |
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
| 2.6.0   | [apache-seata-2.6.0-incubating-src.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.6.0/apache-seata-2.6.0-incubating-src.tar.gz?action=download) [ASC](https://downloads.apache.org/incubator/seata/2.6.0/apache-seata-2.6.0-incubating-src.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/2.6.0/apache-seata-2.6.0-incubating-src.tar.gz.sha512)<br/>                     | [apache-seata-2.6.0-incubating-bin.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/2.6.0/apache-seata-2.6.0-incubating-bin.tar.gz?action=download)    [ASC](https://downloads.apache.org/incubator/seata/2.6.0/apache-seata-2.6.0-incubating-bin.tar.gz.asc)  [SHA512](https://downloads.apache.org/incubator/seata/2.6.0/apache-seata-2.6.0-incubating-bin.tar.gz.sha512)<br/> | [2.6.0 Release Notes](https://github.com/apache/incubator-seata/releases/tag/v2.6.0) | [2.6.0 Quick Start](/docs/user/quickstart/) |

```mdx-code-block
</section>
```

1.  For version upgrade, please refer to the [upgrade guide](/docs/ops/upgrade)
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

## Verify the releases
It is crucial to verify the integrity of downloaded files using GPG or SHA signatures. You should download the KEYS along with the .asc and .sha512 signature files for the appropriate distribution. It is recommended to obtain these files directly from the main distribution directory, rather than from mirror sites.

### Verify Signatures
1. Download the GPG signatures [KEYS](https://downloads.apache.org/incubator/seata/KEYS) and the release along with its .asc signature file.

2. Import the public key:
   ```bash
   gpg --import KEYS
   ```
3. Verify the signature:
   ```bash
   gpg --verify apache-seata-***.asc apache-seata-***
   ```

   If something like the following appears, it means the signature is correct:
   ```bash
    gpg: Signature made Wed Jan 28 11:45:10 2026 UTC
    gpg:                using RSA key 75B1D3D23E3D0A2D9C41AA1F9F97432623F70638
    gpg: Good signature from "xxx" [ultimate]
   ```

### Verify Checksums

1. Download the release along with its .sha512 signature file.

2. Verify the checksum:
   ```bash
   shasum -c apache-seata-***.sha512
   ```
   If something like the following appears, it means the checksum is correct:

   ```bash
   apache-seata-***.tar.gz: OK
   ```
