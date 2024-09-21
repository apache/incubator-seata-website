---
title: release guide
keywords: [Seata]
description: Release Guide.
---

# 发布手册

## 1. 前言

#### 1.1 Apache 版本发布文档

参考以下链接，了解 ASF 版本发布流程：

- [Apache Release Guide](http://www.apache.org/dev/release-publishing)
- [Apache Release Policy](http://www.apache.org/dev/release.html)
- [Maven Release Info](http://www.apache.org/dev/publishing-maven-artifacts.html)

#### 1.2 PGP 签名

遵循 Apache 版本发布指南，对发布版本签名，用户也可据此判断下载的版本是否被篡改。

创建 `pgp` 密钥用于版本签名，使用 **\<your Apache ID>@apache.org** 作为密钥 USER-ID

详情可参考 [Apache Releases Signing documentation](https://infra.apache.org/release-signing)，[Cryptography with OpenPGP](http://www.apache.org/dev/openpgp.html)

生成密钥的简要流程：

- 通过` gpg --full-gen-key` 生成一个新的 `gpg` 密钥, 设置密钥长度为 4096

  注：可设置永不过期，也可根据自己需求设置一定的过期时间，但需要在过期后更新的公钥到[DEV KEYS file]([dist.apache.org/repos/dist/release/incubator/seata/KEYS](https://dist.apache.org/repos/dist/release/incubator/seata/KEYS)) 和 [RELEASE KEYS file]([dist.apache.org/repos/dist/release/incubator/seata/KEYS](https://dist.apache.org/repos/dist/release/incubator/seata/KEYS))

- 通过 `gpg --keyserver keys.openpgp.org --send-key <your key id>` 上传密钥到公钥服务器

  注：如若访问不通，可通过[OpenPGP Keyserver (ubuntu.com)](https://keyserver.ubuntu.com/) 在线上传公钥

  ```
  使用该命令可查到keyid如：gpg --list-signatures --keyid-format LONG
  pub   rsa4096/561507DBDD81E3D5 2024-09-19 [SC] [有效至：2027-09-19]
        F2D3A28A392129B927C7FB42561507DBDD81E3D5
  uid                   [ 绝对 ] jianbin.chen <jianbin@apache.org>
  sig 3        561507DBDD81E3D5 2024-09-19  [自签名]
  sub   rsa4096/07B6250EB8C9B2A0 2024-09-19 [E] [有效至：2027-09-19]
  sig          561507DBDD81E3D5 2024-09-19  [自签名]
  那么keyid为561507DBDD81E3D5
  ```

- 通过 `gpg --armor --output ./public-key.txt --export 561507DBDD81E3D5` 导出公钥到文本文件

- 将生成的密钥追加到[DEV KEYS file]([dist.apache.org/repos/dist/release/incubator/seata/KEYS](https://dist.apache.org/repos/dist/release/incubator/seata/KEYS)) 和 [RELEASE KEYS file]([dist.apache.org/repos/dist/release/incubator/seata/KEYS](https://dist.apache.org/repos/dist/release/incubator/seata/KEYS))

注意：

DEV SVN 仓库可以由 Release Manager 自行添加，Release SVN 仓库需要 PMC 权限，可以由 PMC 协助将 KEY 进行上传。

**Tips:** 需要设置默认公钥, 若有多个公钥，请修改 `~/.gnupg/gpg.conf`

参考示例：

```
gpg (GnuPG) 2.2.4; Copyright (C) 2017 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
  (1) RSA and RSA (default)
  (2) DSA and Elgamal
  (3) DSA (sign only)
  (4) RSA (sign only)
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
        0 = key does not expire
     <n>  = key expires in n days
     <n>w = key expires in n weeks
     <n>m = key expires in n months
     <n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: （设置用户名）(使用apache id)
Email address: （设置邮件地址）(使用apache邮箱)
Comment: （填写注释）
You selected this USER-ID:
   "用户名 (注释) <邮件地址>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key. （设置密码）

```

将生成的公钥和私钥转化为 ASCII 形式：

```
gpg --armor --output ./public-key.txt --export 561507DBDD81E3D5
gpg --armor --output ./private-key.txt --export-secret-keys 561507DBDD81E3D5

```

查看密钥列表：

```
[root@localhost ~]# gpg --list-signatures --keyid-format LONG
[keyboxd]
---------
pub   rsa4096/561507DBDD81E3D5 2024-09-19 [SC] [有效至：2027-09-19]
      F2D3A28A392129B927C7FB42561507DBDD81E3D5
uid                   [ 绝对 ] jianbin.chen <jianbin@apache.org>
sig 3        561507DBDD81E3D5 2024-09-19  [自签名]
sub   rsa4096/07B6250EB8C9B2A0 2024-09-19 [E] [有效至：2027-09-19]
sig          561507DBDD81E3D5 2024-09-19  [自签名]

```

上传公钥到公钥服务器

```
[root@localhost gpgtest]# gpg --keyserver keys.openpgp.org --send-key 561507DBDD81E3D5
gpg: sending key 561507DBDD81E3D5 to hkp server keys.openpgp.org

```

#### 1.3 POM 配置

配置 POM 文件，以便将版本部署到 ASF Nexus 仓库。

① 添加 Apache POM 继承默认设置

```
<parent>
    <groupId>org.apache</groupId>
    <artifactId>apache</artifactId>
    <version>XX</version>
</parent>

```

② Maven 配置文件 `settings.xml` 中添加密钥信息

```
<settings>
    <profiles>
        <profile>
            <id>signed_release</id>
            <properties>
                <mavenExecutorId>forked-path</mavenExecutorId>
                <gpg.keyname>yourKeyName</gpg.keyname>
          <deploy.url>https://dist.apache.org/repos/dist/dev/incubator/seata/</deploy.url>
            </properties>
        </profile>
    </profiles>
    <servers>
        <!-- To publish a snapshot of some part of Maven -->
        <server>
            <id>apache.snapshots.https</id>
            <username>yourApacheID</username>
            <!-- Use the password encryption by maven -->
            <password>yourApachePassword</password>
        </server>
        <!-- To stage a release of some part of Maven -->
        <server>
            <id>apache.releases.https</id>
            <username>yourApacheID</username>
            <password>yourApachePassword</password>
        </server>
        <server>
            <id>gpg.passphrase</id>
            <passphrase>yourKeyPassword</passphrase>
        </server>
    </servers>
</settings>

```

**Tips:** 推荐使用 [Maven's password encryption capabilities](http://maven.apache.org/guides/mini/guide-encryption.html) 加密 `gpg.passphrase`

#### 1.5 发布 Release Notes

通过[changelog](https://github.com/apache/incubator-seata/blob/2.x/changes/zh-cn/2.x.md)构建出对应版本的Release Notes

## 2.发布流程

### 1. 准备分支

从主干分支拉取新分支作为发布分支，如现在要发布 `${release_version}` 版本，则从开发分支拉出新分支 `${release_version}`，此后`${release_version}` Release Candidates 涉及的修改及打标签等都在`${release_version}`分支进行，并保证该分支的github actions ci全部通过，最终发布完成后合入主干分支。

例：如 Java SDK 需要发布 `2.2.0` 版本，从 `2.x` 分支拉出新分支 `2.2.0`，并在此分支提交从 Snapshot版本号 替换为 `2.2.0` 版本号的 commit。

## 2.预发布二进制包

### 2.1 SDK根据 [publishing maven artifacts](https://infra.apache.org/publishing-maven-artifacts.html) [4] 的说明准备发布。

```
mvn clean deploy -Prelease -DskipTests -e -B -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn
```

此时，seata sdk被发布到 [预发仓库](https://repository.apache.org/#stagingRepositories) （需要apache账号密码登录），找到发布的版本，即 ${STAGING.RELEASE}， 并点击 Close。

注：如果close失败很可能是因为签名的秘钥对应的公钥在keys.openpgp.org中无法获取到，请自行通过[OpenPGP Keyserver (ubuntu.com)](https://keyserver.ubuntu.com/) 检查

### 2.2 Source&Binary提交至svn仓库

#### 2.2.1 安装svn

下载并安装[Download Apache Subversion Sources](https://subversion.apache.org/download.cgi#recommended-release)

或通过 `brew install subversion` 一键安装

#### 2.2.2 编译seata-server及seata-namingserver

 `mvn -Prelease-seata -Dmaven.test.skip=true -Dskip.npm=true -T4C -Dpmd.skip=true clean install -U`

#### 2.2.3 将Source及Binary进行签名

Source 建议直接通过github 对应版本分支如2.2.0 进行下载zip包，避免本地环境污染Source包内容，然后重命名为apache-seata-x.x.x-incubating-src.zip

`gpg --print-md SHA512 apache-seata-x.x.x-incubating-src.zip > apache-seata-x.x.x-incubating-src.zip.sha512 `

`gpg --clearsign apache-seata-2.2.0-incubating-src.zip`

`gpg --armor --output apache-seata-x.x.x-incubating-bin.zip.asc apache-seata-x.x.x-incubating-bin.zip`

Binary进行签名

`gpg --print-md SHA512 apache-seata-x.x.x-incubating-src.zip > apache-seata-x.x.x-incubating-src.zip.sha512`

`gpg --clearsign apache-seata-x.x.x-incubating-bin.tar.gz`

`gpg --armor --output apache-seata-x.x.x-incubating-bin.tar.gz.asc apache-seata-x.x.x-incubating-bin.tar.gz`

#### 2.2.4 拉取svn至本地，并构建发布版本路径，并将签名文件及Source和Binary移入其中

拉取svn目录

`svn co --depth=empty https://dist.apache.org/repos/dist/dev/incubator/seata/`

创建发布版本路径，并将文件移入其中

`cd seata`

`mkdir x.x.x`

`mv ….. x.x.x`

通过以上命令，移入其中后大概如下

```
-rw-r--r--@ 1 fe-work  staff   180M  9 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz
-rw-r--r--@ 1 fe-work  staff   180M  9 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz.asc
-rw-r--r--@ 1 fe-work  staff   187B  9 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz.sha512
-rw-r--r--@ 1 fe-work  staff   6.7M  9 20 10:16 apache-seata-2.2.0-incubating-src.zip
-rw-r--r--@ 1 fe-work  staff   6.7M  9 20 10:16 apache-seata-2.2.0-incubating-src.zip.asc
-rw-r--r--  1 fe-work  staff   300B  9 20 10:16 apache-seata-2.2.0-incubating-src.zip.sha512
```

而其上级seata目录中的KEYS需要保证追加了第一步所说的，将构建的公钥放入其中

执行 

`svn add x.x.x`

`svn commit -m "submit x.x.x version" `

如果更新了KEYS 需要在commit之前执行 `svn update KEYS`

执行commit后会提示输入apache ldap账号密码，输入后即可提交成功

```
➜  seata svn commit -m 'submit 2.2.0 version'
正在增加       2.2.0
正在增加 (二进制) 2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz
正在增加 (二进制) 2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz.asc
正在增加       2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz.sha512
正在增加 (二进制) 2.2.0/apache-seata-2.2.0-incubating-src.zip
正在增加 (二进制) 2.2.0/apache-seata-2.2.0-incubating-src.zip.asc
正在增加       2.2.0/apache-seata-2.2.0-incubating-src.zip.sha512
传输文件数据......done
正在读取事务
提交后的版本为 71769。
```

### 2.3 创建tag及releasenote

#### 2.3.1 创建tag

在x.x.x分支下执行

`git tag vx.x.x -m 'release: release for x.x.x'`

git push upstream(seata仓库repo) vx.x.x

#### 2.3.2 创建release note

通过该链接创建release note [New release · apache/incubator-seata (github.com)](https://github.com/apache/incubator-seata/releases/new) 并将Choose a tag设置为对应的tag

并设置为Set as a pre-release 整体投票通过后再设置为Set as the latest release

# 3.投票阶段

## 3.1 社区内部投票

**投票持续至少 72 小时并获得 3 个+1 binding票**

发送至：

```
dev@seata.apache.org
```

标题：

`[VOTE]Release Apache Seata (Incubating) x.x.x-RCN (RoundN) `

RC N和Round N的N代表次数，该版本的第几次投票

正文：

```
Hi Seata Community,

This is a call for vote to release Apache Seata(incubating)
2.2.0 This is the first release of Apache Seata(incubating).

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/seata/x.x.x/

The staging repo:
https://repository.apache.org/content/repositories/${STAGING.RELEASE}/

Git tag for the release:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

Hash for the release tag:
tag分支最后一条commit的id

Release Notes:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

The artifacts have been signed with Key [ key-id ], corresponding
to
[ 邮箱如jianbin@apache.org ]
which can be found in the keys file:
https://downloads.apache.org/incubator/seata/KEYS

Build Environment: JDK 8+, Apache Maven 3.6.0+.
/mvnw clean package -DskipTests=true

CI Test Workflow:
涉及该版本最后一次commit的多个CI流水线链接，如
https://github.com/apache/incubator-seata/actions/runs/10938949607/job/30411922716
https://github.com/apache/incubator-seata/actions/runs/10938949623/job/30410204492
https://github.com/apache/incubator-seata/actions/runs/10938949605/job/30411747821

The vote will be open for at least 72 hours.

Please vote accordingly:

[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove with the reason

Checklist for reference:

[ ] Download links are valid.
[ ] Checksums and signatures.
[ ] LICENSE/NOTICE files exist
[ ] No unexpected binary files
[ ] All source files have ASF headers
[ ] Can compile from source

To learn more about Apache Seata , please see https://seata.apache.org/

```

#### 3.1.2 完成投票

发布投票通过邮件

```
Hi Community,


The vote to release Apache Seata (Incubating) vx.x.x-RCN has passed
with 3 +1 binding votes, and no +0 or -1 votes.

3 (+1 binding)

- Jianbin Chen

- Jiangke Wu

- Jiawei Zhang

no further 0 or -1 votes.


The vote thread:
所对应投票邮件的thread链接，如:
https://lists.apache.org/thread/rwco6lms9qo10whjj8gg1dr8j7drl2gf

Thank you for reviewing and voting for our release candidate.

We will soon launch the second stage of voting.
```



### 3.2 孵化器中投票

与社区投票类似，但是需要增加社区投票相关的thread链接，以证明已在社区内达成一致

发送邮件至 `general@incubator.apache.org`

```
Hello everyone,

This is a call for vote to release Apache Seata(incubating)
2.2.0 This is the first release of Apache Seata(incubating).

The vote thread:
社区中投票的thread链接, 如：
https://lists.apache.org/thread/rwco6lms9qo10whjj8gg1dr8j7drl2gf

Vote Result:
社区中投票通过的result thread链接，如：
https://lists.apache.org/thread/ybo9c5hrx2h2glg2bdgs3t22xg734y7r

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/seata/x.x.x/

The staging repo:
https://repository.apache.org/content/repositories/${STAGING.RELEASE}/

Git tag for the release:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

Hash for the release tag:
tag分支最后一条commit的id

Release Notes:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

The artifacts have been signed with Key [ key-id ], corresponding
to
[ 邮箱如jianbin@apache.org ]
which can be found in the keys file:
https://downloads.apache.org/incubator/seata/KEYS

Build Environment: JDK 8+, Apache Maven 3.6.0+.
/mvnw clean package -DskipTests=true

CI Test Workflow:
涉及该版本最后一次commit的多个CI流水线链接，如
https://github.com/apache/incubator-seata/actions/runs/10938949607/job/30411922716
https://github.com/apache/incubator-seata/actions/runs/10938949623/job/30410204492
https://github.com/apache/incubator-seata/actions/runs/10938949605/job/30411747821

The vote will be open for at least 72 hours.

Please vote accordingly:

[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove with the reason

Checklist for reference:

[ ] Download links are valid.
[ ] Checksums and signatures.
[ ] LICENSE/NOTICE files exist
[ ] No unexpected binary files
[ ] All source files have ASF headers
[ ] Can compile from source

To learn more about Apache Seata , please see https://seata.apache.org/
```



#### 4.完成发布

1. 从Apache Nexus 仓库, 选择之前进行close过的的 **orgapacheseata-XXX** 点击 `Release` 图标发布
2. 将之前上传到SVN dev中的binary和source采用相同的方式，拉取https://dist.apache.org/repos/dist/release/incubator/seata/  然后将dev中的x.x.x移动到release ,并在dev中执行svn delete x.x.x 再svn commit 提交后删除dev下的x.x.x。再cd 至release中的seata通过svn add 将x.x.x版本提交至release路径下
3. 将之前release note设置为Set as the latest release并提交
4. 将x.x.x的文档更新至seata官网中，并补充对应binary和source的下载链接

