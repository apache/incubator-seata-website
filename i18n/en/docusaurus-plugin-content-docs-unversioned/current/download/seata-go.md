---
title: Seata Go Download
keywords: [Seata, Seata-Go, Download]
description: Install and configure the Seata Go SDK to work with Seata Server
hide_table_of_contents: true
---

# Download

:::tip
Seata Go v2.0.0 is the current stable release, covering AT, TCC, and XA modes with registry options for file, Nacos, and Etcd.
:::

## System Requirements

```mdx-code-block
<section class="full_width_table_section">
```

| Item              | Requirement / Notes                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| Go toolchain      | Go 1.20 or newer with modules enabled (`go env GOPATH` configured)                    |
| Seata Server      | Seata Server 2.5.0+ reachable from your services (HTTP/2 enabled by default in 2.5.0) |
| Registry / Config | File, Nacos, or Etcd v3 registry; optional config center via file or Nacos            |
| Database          | MySQL 5.7/8.0 for AT & XA; Oracle supported through go-ora (XA)                       |
| Operating system  | Linux, macOS, Windows (amd64/arm64)                                                   |

```mdx-code-block
</section>
```

## Stable Version

```mdx-code-block
<section class="full_width_table_section">
```

| Version | Source                                                                                                                                                                                                                                                                                                                                                                                                  | Binary                                                                                                                                                                                                                                                                                                                                                                                                    | Release Notes                                                                   | Reference Docs                                                                |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------- |
| 2.0.0   | [apache-seata-go-2.0.0-incubating-src.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-src.tar.gz?action=download) [ASC](https://downloads.apache.org/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-src.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-src.tar.gz.sha512) | [apache-seata-go-2.0.0-incubating-bin.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-bin.tar.gz?action=download) [ASC](https://downloads.apache.org/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-bin.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-bin.tar.gz.sha512) | [v2.0.0 changelog](https://github.com/apache/incubator-seata-go/releases/tag/v2.0.0) | [Samples & docs](https://github.com/apache/incubator-seata-go-samples) |

```mdx-code-block
</section>
```

1. For upgrade guidance, follow the project README and keep module dependencies in sync with Seata Server.
2. Older releases are available from the [Seata Go archive](https://archive.apache.org/dist/incubator/seata/incubator-seata-go/).

## Install via Go Modules
- (Optional) Pin a proxy for faster downloads: `go env -w GOPROXY=https://goproxy.cn,direct`.
- Add the SDK to your module: `go get seata.apache.org/seata-go@v2.0.0` (records to `go.mod` / `go.sum`).
- Lock the dependency explicitly by keeping `require seata.apache.org/seata-go v2.0.0` and running `go mod tidy`.
- Verify dependency integrity before committing: `go list seata.apache.org/seata-go/...`.

## Verify the releases
It is crucial to verify the integrity of downloaded artifacts using GPG signatures or SHA checksums. Download the KEYS, `.asc`, and `.sha512` files directly from the Apache distribution directory rather than mirrors.

### Verify Signatures
1. Download the signatures [KEYS](https://downloads.apache.org/incubator/seata/KEYS) and the desired release files with their `.asc` signatures.
2. Import the public keys:
   ```bash
   gpg --import KEYS
   ```
3. Validate each artifact, for example:
   ```bash
   gpg --verify apache-seata-go-2.0.0-incubating-src.tar.gz.asc apache-seata-go-2.0.0-incubating-src.tar.gz
   gpg --verify apache-seata-go-2.0.0-incubating-bin.tar.gz.asc apache-seata-go-2.0.0-incubating-bin.tar.gz
   ```
   A result similar to the following indicates a valid signature:
   ```bash
   gpg: Signature made Tue Apr 29 12:11:09 2025 CST
   gpg:                using RSA key 775377BF271D659E591249CD63E269707E8BF0FB
   gpg: Good signature from "xxx" [ultimate]
   ```

### Verify Checksums
1. Download the `.sha512` file corresponding to the artifact.
2. Run the checksum validation:
   ```bash
   shasum -c apache-seata-go-2.0.0-incubating-src.tar.gz.sha512
   shasum -c apache-seata-go-2.0.0-incubating-bin.tar.gz.sha512
   ```
   Output ending with `OK` confirms the archive is intact.

## Additional Resources
- Seata Go repository: [apache/incubator-seata-go](https://github.com/apache/incubator-seata-go)
- Go samples: [apache/incubator-seata-go-samples](https://github.com/apache/incubator-seata-go-samples)
- Configuration reference: `pkg/client/config.go`
- Transaction mode overview: [Seata documentation](/docs/overview/what-is-seata)
