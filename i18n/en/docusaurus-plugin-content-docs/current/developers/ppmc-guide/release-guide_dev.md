---
title: Release Guide
keywords: [Seata]
description: Release Guide.
---

# Release Guide

## 1. Foreword

#### 1.1 Apache Version Release Documentation

Refer to the following links to understand the ASF version release process:

- [Apache Release Guide](http://www.apache.org/dev/release-publishing)
- [Apache Release Policy](http://www.apache.org/dev/release.html)
- [Maven Release Info](http://www.apache.org/dev/publishing-maven-artifacts.html)

#### 1.2 PGP Signature

Follow the Apache release guide to sign the release version. Users can also use this to determine if the downloaded version has been tampered with.

Create a `pgp` key for version signing, using **\<your Apache ID>@apache.org** as the key USER-ID.

For details, refer to [Apache Releases Signing documentation](https://infra.apache.org/release-signing) and [Cryptography with OpenPGP](http://www.apache.org/dev/openpgp.html).

Brief process for generating a key:

- Generate a new `gpg` key using `gpg --full-gen-key`, setting the key length to 4096.

    Note: You can set it to never expire, or set a specific expiration time according to your needs. However, after expiration, the public key needs to be updated in the [DEV KEYS file](https://dist.apache.org/repos/dist/dev/incubator/seata/KEYS) and [RELEASE KEYS file](https://dist.apache.org/repos/dist/release/incubator/seata/KEYS).

- Upload the key to a public key server using `gpg --keyserver keys.openpgp.org --send-key <your key id>`.

    Note: If access fails, you can upload the public key online via [OpenPGP Keyserver (ubuntu.com)](https://keyserver.ubuntu.com/).

    ```
    Use this command to find the keyid, e.g., gpg --list-signatures --keyid-format LONG
    pub   rsa4096/XXXXXXXX 2024-09-19 [SC] [expires: 2027-09-19]
                F2D3A28A392129B927C7FB42XXXXXXXX
    uid                   [ultimate] xxxx <xxxx@apache.org>
    sig 3        XXXXXXXX 2024-09-19  [self-signature]
    sub   rsa4096/XXXXX 2024-09-19 [E] [expires: 2027-09-19]
    sig          XXXXXXXX 2024-09-19  [self-signature]
    Then the keyid is XXXXXXXX
    ```

- Export the public key to a text file using `gpg --armor --output ./public-key.txt --export XXXXXXXX`.

- Append the generated key to the [DEV KEYS file](https://dist.apache.org/repos/dist/dev/incubator/seata/KEYS) and [RELEASE KEYS file](https://dist.apache.org/repos/dist/release/incubator/seata/KEYS).

Note:

The DEV SVN repository can be added by the Release Manager. The Release SVN repository requires PMC permission, and a PMC member can assist in uploading the KEY.

**Tips:** You need to set the default public key. If you have multiple public keys, please modify `~/.gnupg/gpg.conf`.

Reference example:

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

Real name: (Set username) (use Apache ID)
Email address: (Set email address) (use Apache email)
Comment: (Enter comment)
You selected this USER-ID:
     "Username (Comment) <Email address>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key. (Set password)

```

Convert the generated public and private keys to ASCII format:

```
gpg --armor --output ./public-key.txt --export XXXXXXXX
gpg --armor --output ./private-key.txt --export-secret-keys XXXXXXXX

```

View the key list:

```
[root@localhost ~]# gpg --list-signatures --keyid-format LONG
[keyboxd]
---------
pub   rsa4096/XXXXXXXX 2024-09-19 [SC] [expires: 2027-09-19]
            F2D3A28A392129B927C7FB42XXXXXXXX
uid                   [ultimate] xxxx <xxxx@apache.org>
sig 3        XXXXXXXX 2024-09-19  [self-signature]
sub   rsa4096/XXXXX 2024-09-19 [E] [expires: 2027-09-19]
sig          XXXXXXXX 2024-09-19  [self-signature]

```

Upload the public key to the public key server:

```
[root@localhost gpgtest]# gpg --keyserver keys.openpgp.org --send-key XXXXXXXX
gpg: sending key XXXXXXXX to hkp server keys.openpgp.org

```

#### 1.3 POM Configuration

Configure the POM file to deploy the version to the ASF Nexus repository.

① Add Apache POM inheritance for default settings

```xml
<parent>
        <groupId>org.apache</groupId>
        <artifactId>apache</artifactId>
        <version>XX</version>
</parent>

```

② Add key information to the Maven configuration file `settings.xml`

```xml
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

**Tips:** It is recommended to use [Maven's password encryption capabilities](http://maven.apache.org/guides/mini/guide-encryption.html) to encrypt `gpg.passphrase`.

#### 1.5 Publish Release Notes

Construct the Release Notes for the corresponding version through the [changelog](https://github.com/apache/incubator-seata/blob/2.x/changes/zh-cn/2.x.md).

## 2. Release Process

### 1. Prepare Branch

Pull a new branch from the main branch as the release branch. For example, if you want to release version `${release_version}`, pull a new branch `${release_version}` from the development branch. Thereafter, modifications and tagging related to `${release_version}` Release Candidates will be done on the `${release_version}` branch. Ensure all GitHub Actions CI on this branch pass. After the final release, merge it into the main branch.

Example: If the Java SDK needs to release version `2.2.0`, pull a new branch `2.2.0` from the `2.x` branch, and submit a commit on this branch that replaces the Snapshot version number with `2.2.0`.

### 2. Pre-release Binary Package

#### 2.1 SDK prepares for release according to [publishing maven artifacts](https://infra.apache.org/publishing-maven-artifacts.html) [4].

```shell
mvn clean deploy -Prelease -DskipTests -e -B -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn
```

At this point, the Seata SDK is published to the [staging repository](https://repository.apache.org/#stagingRepositories) (requires Apache account and password to log in). Find the published version, i.e., `${STAGING.RELEASE}`, and click Close.

Note: If closing fails, it might be because the public key corresponding to the signing key cannot be obtained from keys.openpgp.org. Please check via [OpenPGP Keyserver (ubuntu.com)](https://keyserver.ubuntu.com/).

#### 2.2 Submit Source & Binary to SVN repository

##### 2.2.1 Install SVN

Download and install from [Download Apache Subversion Sources](https://subversion.apache.org/download.cgi#recommended-release).

Or install with one command: `brew install subversion`.

##### 2.2.2 Compile seata-server and seata-namingserver

 `mvn -Prelease-seata -Dmaven.test.skip=true -Dskip.npm=true -T4C -Dpmd.skip=true clean install -U`

##### 2.2.3 Sign Source and Binary

It is recommended to download the Source zip package directly from the corresponding version branch on GitHub (e.g., 2.2.0) to avoid local environment contamination of the Source package content. Then rename it to apache-seata-x.x.x-incubating-src.zip.

`shasum -b -a 512 apache-seata-x.x.x-incubating-src.zip >> apache-seata-x.x.x-incubating-src.zip.sha512 `

`gpg --armor --output apache-seata-x.x.x-incubating-src.zip.asc --detach-sign apache-seata-x.x.x-incubating-src.zip` (Corrected gpg command for source)

Sign Binary:

`shasum -b -a 512 apache-seata-x.x.x-incubating-bin.tar.gz >> apache-seata-x.x.x-incubating-bin.tar.gz.sha512`

`gpg --armor --output apache-seata-x.x.x-incubating-bin.tar.gz.asc --detach-sign apache-seata-x.x.x-incubating-bin.tar.gz` (Corrected gpg command for binary)

Verify sha512:

`shasum -c apache-seata-x.x.x-incubating-bin.tar.gz.sha512`

Verify asc:

`gpg --verify apache-seata-x.x.x-incubating-src.zip.asc apache-seata-x.x.x-incubating-src.zip`

##### 2.2.4 Pull SVN to local, create release version path, and move signed files, Source, and Binary into it

Pull SVN directory:

`svn co --depth=empty https://dist.apache.org/repos/dist/dev/incubator/seata/`

Create release version path (folders in the dev path must carry RC to indicate it's a preparatory state), and move files into it:

`cd seata`

`mkdir x.x.xRCN`

`mv ….. x.x.xRCN` (Corrected target directory)

After moving them, it should look something like this:

```
-rw-r--r--@ 1 fe-work  staff   180M  Sep 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz
-rw-r--r--@ 1 fe-work  staff   180M  Sep 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz.asc
-rw-r--r--@ 1 fe-work  staff   187B  Sep 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz.sha512
-rw-r--r--@ 1 fe-work  staff   6.7M  Sep 20 10:16 apache-seata-2.2.0-incubating-src.zip
-rw-r--r--@ 1 fe-work  staff   6.7M  Sep 20 10:16 apache-seata-2.2.0-incubating-src.zip.asc
-rw-r--r--  1 fe-work  staff   300B  Sep 20 10:16 apache-seata-2.2.0-incubating-src.zip.sha512
```

Ensure that the KEYS file in its parent `seata` directory has the public key appended as mentioned in the first step.

Execute:

`svn add x.x.xRCN` (Corrected directory name)

`svn commit -m "submit x.x.xRCN version"` (Corrected directory name)

If KEYS was updated, execute `svn update KEYS` before committing.

After executing commit, you will be prompted for your Apache LDAP username and password. Enter them to submit successfully.

```
➜  seata svn commit -m 'submit 2.2.0RC1 version'
Adding         2.2.0RC1
Adding  (bin)  2.2.0RC1/apache-seata-2.2.0-incubating-bin.tar.gz
Adding  (bin)  2.2.0RC1/apache-seata-2.2.0-incubating-bin.tar.gz.asc
Adding         2.2.0RC1/apache-seata-2.2.0-incubating-bin.tar.gz.sha512
Adding  (bin)  2.2.0RC1/apache-seata-2.2.0-incubating-src.zip
Adding  (bin)  2.2.0RC1/apache-seata-2.2.0-incubating-src.zip.asc
Adding         2.2.0RC1/apache-seata-2.2.0-incubating-src.zip.sha512
Transmitting file data........done
Committed revision 71769.
```

#### 2.3 Create tag and release note

##### 2.3.1 Create tag

On the x.x.x branch, execute:

`git tag vx.x.x -m 'release: release for x.x.x'`

`git push upstream vx.x.x` (assuming `upstream` points to `apache/incubator-seata`)

##### 2.3.2 Create release note

Create a release note via this link: [New release · apache/incubator-seata (github.com)](https://github.com/apache/incubator-seata/releases/new). Set "Choose a tag" to the corresponding tag.

Set it as "Set as a pre-release". After the overall vote passes, set it as "Set as the latest release".

### 3. Voting Stage

#### 3.1 Community Internal Vote

**The vote lasts for at least 72 hours and requires 3 +1 binding votes.**

Send to:

```
dev@seata.apache.org
```

Subject:

`[VOTE] Release Apache Seata (Incubating) x.x.x (Round N)`

N in Round N represents the attempt number. For example, if the vote for this version fails and it is re-voted after modification, N should be incremented by 1 (e.g., if Round 1 fails, the next vote is Round 2).

Body:

```
Hi Seata Community,

This is a call for vote to release Apache Seata (incubating) vx.x.x.

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/seata/x.x.xRCN/  (Ensure RCN is included if applicable)

The staging repo:
https://repository.apache.org/content/repositories/${STAGING.RELEASE}/

Git tag for the release:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

Hash for the release tag:
(Commit ID of the last commit on the tag branch)

Release Notes:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

The artifacts have been signed with Key [key-id], corresponding to
[email, e.g., xxxx@apache.org]
which can be found in the keys file:
https://downloads.apache.org/incubator/seata/KEYS  (or https://dist.apache.org/repos/dist/dev/incubator/seata/KEYS)

Build Environment: JDK 8+, Apache Maven 3.6.0+.
/mvnw clean package -DskipTests=true (or the actual command used)

CI Test Workflow:
(Links to multiple CI pipelines for the last commit of this version, e.g.)
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

To learn more about Apache Seata, please see https://seata.apache.org/

```

#### 3.1.2 Complete Vote

Publish vote passing email:

```
Hi Community,

The vote to release Apache Seata (Incubating) vx.x.x has passed
with 3 +1 binding votes, and no +0 or -1 votes.

3 (+1 binding)

- XXX
- XXX
- XXX

no further 0 or -1 votes.

The vote thread:
(Link to the corresponding vote email thread, e.g.:)
https://lists.apache.org/thread/rwco6lms9qo10whjj8gg1dr8j7drl2gf

Thank you for reviewing and voting for our release candidate.

We will soon launch the second stage of voting.
```

#### 3.2.1 Vote in Incubator

Similar to the community vote, but requires adding the community vote thread link to demonstrate consensus within the community.

Send email to `general@incubator.apache.org`

Subject:

`[VOTE] Release Apache Seata (Incubating) x.x.x (Round N)`

**The vote lasts for at least 72 hours and requires 3 +1 binding votes from IPMC members.**

```
Hello everyone,

This is a call for vote to release Apache Seata (incubating) vx.x.x.

The Apache Seata community has voted and approved the release of Apache
Seata (incubating) vx.x.x. We now kindly request the IPMC members
review and vote for this release.

The community vote thread:
(Link to the community vote thread, e.g.:)
https://lists.apache.org/thread/rwco6lms9qo10whjj8gg1dr8j7drl2gf

Vote Result (community):
(Link to the community vote result thread, e.g.:)
https://lists.apache.org/thread/ybo9c5hrx2h2glg2bdgs3t22xg734y7r

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/seata/x.x.xRCN/ (Ensure RCN is included if applicable)

The staging repo:
https://repository.apache.org/content/repositories/${STAGING.RELEASE}/

Git tag for the release:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

Hash for the release tag:
(Commit ID of the last commit on the tag branch)

Release Notes:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

The artifacts have been signed with Key [key-id], corresponding to
[email, e.g., xxxx@apache.org]
which can be found in the keys file:
https://downloads.apache.org/incubator/seata/KEYS (or https://dist.apache.org/repos/dist/dev/incubator/seata/KEYS)

Build Environment: JDK 8+, Apache Maven 3.6.0+.
/mvnw clean package -DskipTests=true (or the actual command used)

CI Test Workflow:
(Links to multiple CI pipelines for the last commit of this version, e.g.)
https://github.com/apache/incubator-seata/actions/runs/10938949607/job/30411922716
https://github.com/apache/incubator-seata/actions/runs/10938949623/job/30410204492
https://github.com/apache/incubator-seata/actions/runs/10938949605/job/30411747821

The vote will be open for at least 72 hours.

Please vote accordingly:

[ ] +1 approve (binding)
[ ] +0 no opinion
[ ] -1 disapprove with the reason (binding)

Checklist for reference:

[ ] Download links are valid.
[ ] Checksums and signatures.
[ ] LICENSE/NOTICE files exist
[ ] No unexpected binary files
[ ] All source files have ASF headers
[ ] Can compile from source

To learn more about Apache Seata, please see https://seata.apache.org/
```

#### 3.2.2 Announce Incubator Vote Result

After 72 hours, if there are at least 3 +1 binding votes and no -1 binding votes, send the result email as follows:

Send email to `general@incubator.apache.org`

Subject: `[RESULT][VOTE] Release Apache Seata (incubating) x.x.x (Round N)`

```
Hi Incubator PMC,

The vote to release Apache Seata (incubating) X.X.X has passed with
N +1 binding and M +1 non-binding votes, no -1 binding votes. (Adjust numbers accordingly)

Binding votes:

- XXX (IPMC)
- YYY (IPMC)
- ZZZ (IPMC)

Non-Binding votes:

- AAA (Committer/Mentor, non-IPMC)

Vote thread:
(Link to the IPMC vote thread, e.g.:)
https://lists.apache.org/thread/o7vwdvtolclcv1y4j4ozshj923ppwlnl

Thanks for reviewing and voting for our release candidate. We will
proceed with publishing the approved artifacts and sending out the
announcement soon.
```

#### 3.2.3 Vote Interruption

If verification fails during the voting process (e.g., license issues, bugs in the version) and it is assessed that a fix is needed before release, the current vote needs to be interrupted.
Subject: `[CANCEL][VOTE] Release Apache Seata (incubating) x.x.x (Round N)`

```
Hi Incubator PMC,

I'm cancelling this vote:
(Link to the previous vote email)

Reason for cancellation: (e.g., missing license, bug found in the version, etc.)

```

Note: If the vote in the incubator is terminated, the new voting process needs to restart from the community internal vote.

# 4. Complete Release

### 4.1 Release Version

1.  From the Apache Nexus repository, select the previously closed **orgapacheseata-XXX** and click the `Release` icon to publish.

2.  Move the signed files, src, and bin from the dev path to the release path. Refer to the following command:

        `svn mv https://dist.apache.org/repos/dist/dev/incubator/seata/x.x.xRCN https://dist.apache.org/repos/dist/release/incubator/seata/x.x.x -m "Release Seata X.X.X"`
        (Note: The source path should be the RC path, e.g., `seata/x.x.xRCN`. The destination path should be `seata/x.x.x`. The `incubator-seata` part in the original command might be specific to a project structure, adjust if `seata` is the direct subdirectory under `dev/incubator/` or `release/incubator/`.)

3.  Set the previous release note to "Set as the latest release" and submit.

4.  Update the x.x.x documentation on the Seata official website and add download links for the corresponding binary and source.

### 4.2 Version Announcement

Send email to `dev@seata.apache.org`, `announce@apache.org` (and optionally `general@incubator.apache.org` while incubating).

Subject: `[ANNOUNCE] Apache Seata (Incubating) vx.x.x available`

```
Hi All,

The Apache Seata (Incubating) community is pleased to announce the release of
Apache Seata (Incubating) version x.x.x.

Apache Seata is an easy-to-use, high-performance, open source distributed transaction solution.

This release contains a number of bug fixes and improvements.
We encourage you to download and try it out!

Download Links: https://seata.apache.org/download/ (or direct link to the release on downloads.apache.org/incubator/seata/x.x.x/)

Release Notes:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

Website: https://seata.apache.org/

Seata Resources:
- Issue tracker: https://github.com/apache/incubator-seata/issues
- Mailing list: dev@seata.apache.org

The Apache Seata (Incubating) Team
```
