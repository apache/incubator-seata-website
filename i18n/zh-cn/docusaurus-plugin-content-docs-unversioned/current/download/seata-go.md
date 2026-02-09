---
title: Seata Go 下载
keywords: [Seata, Seata-Go, 下载]
description: 安装并配置 Seata Go SDK 以连接 Seata Server
hide_table_of_contents: true
---

# 下载

:::tip
Seata Go v2.0.0 是当前稳定版本，覆盖 AT、TCC、XA 等模式，并支持 File、Nacos、Etcd 等注册/配置中心。
:::

## 系统要求

```mdx-code-block
<section class="full_width_table_section">
```

| 项目           | 要求 / 说明                                                                                |
| -------------- | ------------------------------------------------------------------------------------------- |
| Go 工具链      | Go 1.20 及以上，启用 Go Modules（确保 `go env GOPATH` 已配置）                              |
| Seata Server   | 可访问的 Seata Server 2.5.0+（2.5.0 起默认启用 HTTP/2 通道）                                |
| 注册 / 配置中心 | File、Nacos 或 Etcd v3；如需集中配置可同时使用 File / Nacos                               |
| 数据库         | MySQL 5.7/8.0（AT、XA）；Oracle 可通过 go-ora 驱动接入（XA）                                 |
| 操作系统       | Linux、macOS、Windows（amd64/arm64）                                                         |

```mdx-code-block
</section>
```

## 稳定版本

```mdx-code-block
<section class="full_width_table_section">
```

| 版本  | 源码包                                                                                                                                                                                                                                                                                                                                                                                                   | 二进制包                                                                                                                                                                                                                                                                                                                                                                                                    | 发布说明                                                                         | 参考文档                                                                  |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | -------------------------------------------------------------------------------- |
| 2.0.0 | [apache-seata-go-2.0.0-incubating-src.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-src.tar.gz?action=download) [ASC](https://downloads.apache.org/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-src.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-src.tar.gz.sha512) | [apache-seata-go-2.0.0-incubating-bin.tar.gz](https://www.apache.org/dyn/closer.lua/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-bin.tar.gz?action=download) [ASC](https://downloads.apache.org/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-bin.tar.gz.asc) [SHA512](https://downloads.apache.org/incubator/seata/incubator-seata-go/2.0.0/apache-seata-go-2.0.0-incubating-bin.tar.gz.sha512) | [v2.0.0 更新日志](https://github.com/apache/incubator-seata-go/releases/tag/v2.0.0) | [参考示例](https://github.com/apache/incubator-seata-go-samples) |

```mdx-code-block
</section>
```

1. 升级时请参考仓库 README，并确保与 Seata Server 的版本依赖保持一致。
2. 历史版本可在 [Seata Go 存档站点](https://archive.apache.org/dist/incubator/seata/incubator-seata-go/) 获取。

## 通过 Go Modules 安装
- （可选）设置代理以提升下载速度：`go env -w GOPROXY=https://goproxy.cn,direct`。
- 引入 SDK：`go get seata.apache.org/seata-go/v2@v2.0.0`，依赖会写入 `go.mod` / `go.sum`。
- 在 `go.mod` 中保留 `require seata.apache.org/seata-go/v2 v2.0.0` 并执行 `go mod tidy`，锁定依赖版本。
- 提交前使用 `go list seata.apache.org/seata-go/v2/...` 确认依赖解析正常。


## 验证发布包
下载的发行包应通过 GPG 签名或 SHA 校验和验证完整性。请直接从 Apache 分发目录获取 KEYS、`.asc` 和 `.sha512` 等文件，而非第三方镜像。

### 验证签名
1. 下载签名文件 [KEYS](https://downloads.apache.org/incubator/seata/KEYS) 以及相应的发布包和 `.asc` 文件。
2. 导入公钥：
   ```bash
   gpg --import KEYS
   ```
3. 校验示例：
   ```bash
   gpg --verify apache-seata-go-2.0.0-incubating-src.tar.gz.asc apache-seata-go-2.0.0-incubating-src.tar.gz
   gpg --verify apache-seata-go-2.0.0-incubating-bin.tar.gz.asc apache-seata-go-2.0.0-incubating-bin.tar.gz
   ```
   如出现如下输出，说明签名有效：
   ```bash
   gpg: Signature made Tue Apr 29 12:11:09 2025 CST
   gpg:                using RSA key 775377BF271D659E591249CD63E269707E8BF0FB
   gpg: Good signature from "xxx" [ultimate]
   ```

### 验证校验和
1. 下载对应的 `.sha512` 文件。
2. 执行校验：
   ```bash
   shasum -c apache-seata-go-2.0.0-incubating-src.tar.gz.sha512
   shasum -c apache-seata-go-2.0.0-incubating-bin.tar.gz.sha512
   ```
   输出 `OK` 表示文件完整无误。

## 更多资源
- Seata Go 仓库：[apache/incubator-seata-go](https://github.com/apache/incubator-seata-go)
- Go 示例工程：[apache/incubator-seata-go-samples](https://github.com/apache/incubator-seata-go-samples)
- 配置项参考：`pkg/client/config.go`
- 事务模式与 FAQ：参见 [Seata 官方文档](/zh-cn/docs/overview/what-is-seata)
