---
title: Release Guide
keywords: [Seata]
description: Release Guide.
---

# Release Guide

## 1. Introduction

#### 1.1 Apache Seata™ (incubating) Release Documentation

Refer to the following links to understand the ASF release process:

- [Apache Release Guide](http://www.apache.org/dev/release-publishing)
- [Apache Release Policy](http://www.apache.org/dev/release.html)
- [Maven Release Info](http://www.apache.org/dev/publishing-maven-artifacts.html)

#### 1.2 PGP Signatures

Following the Apache Release Guidelines, release versions must be signed, allowing users to verify if downloaded versions have been tampered with.

Create a `pgp` key for signing releases, using **\<your Apache ID>@apache.org** as the key USER-ID.

For details, refer to [Apache Releases Signing documentation](https://infra.apache.org/release-signing) and [Cryptography with OpenPGP](http://www.apache.org/dev/openpgp.html).

Brief process for generating keys:

- Generate a new `gpg` key using `gpg --full-gen-key`, setting the key length to 4096 bits

    Note: You can set the key to never expire or set a specific expiration time. If you set an expiration time, you'll need to update your public key in the [DEV KEYS file](https://dist.apache.org/repos/dist/dev/incubator/seata/KEYS) and [RELEASE KEYS file](https://dist.apache.org/repos/dist/release/incubator/seata/KEYS) after renewal.

- Upload the key to the public key server using `gpg --keyserver keys.openpgp.org --send-key <your key id>`

    Note: If you can't access this server, you can upload your public key online via [OpenPGP Keyserver (ubuntu.com)](https://keyserver.ubuntu.com/)

    ```
    Use this command to find your keyid: gpg --list-signatures --keyid-format LONG
    pub   rsa4096/XXXXXXXX 2024-09-19 [SC] [expires: 2027-09-19]
                F2D3A28A392129B927C7FB42XXXXXXXX
    uid                   [ultimate] xxxx <xxxx@apache.org>
    sig 3        XXXXXXXX 2024-09-19  [self-signature]
    sub   rsa4096/XXXXX 2024-09-19 [E] [expires: 2027-09-19]
    sig          XXXXXXXX 2024-09-19  [self-signature]
    The keyid is XXXXXXXX
    ```

- Export your public key to a text file using `gpg --armor --output ./public-key.txt --export XXXXXXXX`

- Append your generated key to the [DEV KEYS file](https://dist.apache.org/repos/dist/dev/incubator/seata/KEYS) and [RELEASE KEYS file](https://dist.apache.org/repos/dist/release/incubator/seata/KEYS)

Note:

The Release Manager can add keys to the DEV SVN repository themselves, but adding to the Release SVN repository requires PMC permissions. PMC members can help upload the keys.

**Tips:** You should set a default public key. If you have multiple keys, modify `~/.gnupg/gpg.conf`.

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

Real name: (Set user name) (Use Apache ID)
Email address: (Set email address) (Use Apache email)
Comment: (Add comments)
You selected this USER-ID:
     "User Name (Comment) <Email Address>"

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

Upload the public key to the key server:

```
[root@localhost gpgtest]# gpg --keyserver keys.openpgp.org --send-key XXXXXXXX
gpg: sending key XXXXXXXX to hkp server keys.openpgp.org

```

#### 1.3 POM Configuration

Configure the POM file to deploy versions to the ASF Nexus repository.

① Add Apache POM inheritance for default settings:

```
<parent>
        <groupId>org.apache</groupId>
        <artifactId>apache</artifactId>
        <version>XX</version>
</parent>

```

② Add key information in Maven configuration file `settings.xml`:

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

**Tips:** It's recommended to use [Maven's password encryption capabilities](http://maven.apache.org/guides/mini/guide-encryption.html) to encrypt `gpg.passphrase`

#### 1.5 Publishing Release Notes

Build Release Notes for the respective version through the [changelog](https://github.com/apache/incubator-seata/blob/2.x/changes/zh-cn/2.x.md).

## 2. Release Process

### 1. Preparing the Branch

Create a new branch from the main branch as the release branch. For instance, if you're releasing version `${release_version}`, create a new branch `${release_version}` from the development branch. All changes, tags, and fixes related to the `${release_version}` Release Candidates should be made on this branch. Ensure all GitHub Actions CI tests pass on this branch. After the release is completed, merge it back into the main branch.

Example: To release Java SDK version `2.2.0`, create a new branch `2.2.0` from the `2.x` branch, and commit changes to replace the Snapshot version number with the `2.2.0` version number on this branch.

### 2. Pre-Release Binary Packages

#### 2.1 Prepare the SDK release according to [publishing maven artifacts](https://infra.apache.org/publishing-maven-artifacts.html) [4] guidelines.

```
mvn clean deploy -Prelease -DskipTests -e -B -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn
```

At this point, the Seata SDK is published to the [staging repository](https://repository.apache.org/#stagingRepositories) (requires Apache account login). Find the released version, `${STAGING.RELEASE}`, and click Close.

Note: If closing fails, it's likely because the public key corresponding to your signing key is not available on keys.openpgp.org. Please verify through [OpenPGP Keyserver (ubuntu.com)](https://keyserver.ubuntu.com/)

#### 2.2 Submit Source & Binary to SVN Repository

##### 2.2.1 Install SVN

Download and install [Apache Subversion Sources](https://subversion.apache.org/download.cgi#recommended-release)

Or install via `brew install subversion`

##### 2.2.2 Compile seata-server and seata-namingserver

 `mvn -Prelease-seata -Dmaven.test.skip=true -Dskip.npm=true -T4C -Dpmd.skip=true clean install -U`

##### 2.2.3 Sign Source and Binary packages

For the Source package, it's recommended to download the zip directly from the corresponding version branch on GitHub (e.g., 2.2.0) to avoid local environment contamination, then rename it to apache-seata-x.x.x-incubating-src.zip

`shasum -b -a 512 apache-seata-x.x.x-incubating-src.zip >> apache-seata-x.x.x-incubating-src.zip.sha512 `

`gpg --armor --output apache-seata-x.x.x-incubating-bin.zip.asc apache-seata-x.x.x-incubating-bin.zip`

For the Binary package:

`shasum -b -a 512 apache-seata-x.x.x-incubating-bin.tar.gz >> apache-seata-x.x.x-incubating-bin.tar.gz.sha512`

`gpg --armor --output apache-seata-x.x.x-incubating-bin.tar.gz.asc apache-seata-x.x.x-incubating-bin.tar.gz`

Verify SHA512:

`shasum -c apache-seata-x.x.x-incubating-bin.tar.gz.sha512`

Verify ASC:

`gpg --verify  apache-seata-x.x.x-incubating-src.zip.asc apache-seata-x.x.x-incubating-src.zip`

##### 2.2.4 Pull SVN locally, create release version path, and move the signed files and Source/Binary packages into it

Pull SVN directory:

`svn co --depth=empty https://dist.apache.org/repos/dist/dev/incubator/seata/`

Create release version path (in the dev path, folders must include "RC" to indicate they are in a preparatory state), and move files into it:

`cd seata`

`mkdir x.x.xRCN`

`mv ….. x.x.x`

After moving files in, it should look like this:

```
-rw-r--r--@ 1 fe-work  staff   180M  9 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz
-rw-r--r--@ 1 fe-work  staff   180M  9 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz.asc
-rw-r--r--@ 1 fe-work  staff   187B  9 20 10:16 apache-seata-2.2.0-incubating-bin.tar.gz.sha512
-rw-r--r--@ 1 fe-work  staff   6.7M  9 20 10:16 apache-seata-2.2.0-incubating-src.zip
-rw-r--r--@ 1 fe-work  staff   6.7M  9 20 10:16 apache-seata-2.2.0-incubating-src.zip.asc
-rw-r--r--  1 fe-work  staff   300B  9 20 10:16 apache-seata-2.2.0-incubating-src.zip.sha512
```

Ensure the KEYS file in the parent seata directory has been updated with your public key as mentioned in step 1.

Execute:

`svn add x.x.x`

`svn commit -m "submit x.x.x version" `

If you've updated the KEYS file, execute `svn update KEYS` before committing.

After the commit command, you'll be prompted to enter your Apache LDAP username and password. Once entered, the submission will be successful:

```
➜  seata svn commit -m 'submit 2.2.0 version'
Adding       2.2.0
Adding (bin) 2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz
Adding (bin) 2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz.asc
Adding       2.2.0/apache-seata-2.2.0-incubating-bin.tar.gz.sha512
Adding (bin) 2.2.0/apache-seata-2.2.0-incubating-src.zip
Adding (bin) 2.2.0/apache-seata-2.2.0-incubating-src.zip.asc
Adding       2.2.0/apache-seata-2.2.0-incubating-src.zip.sha512
Transmitting file data......done
Reading transaction
Committed revision 71769.
```

#### 2.3 Create tag and release note

##### 2.3.1 Create tag

In the x.x.x branch, execute:

`git tag vx.x.x -m 'release: release for x.x.x'`

`git push upstream(seata repository repo) vx.x.x`

##### 2.3.2 Create release note

Create a release note through [New release · apache/incubator-seata (github.com)](https://github.com/apache/incubator-seata/releases/new) and set "Choose a tag" to the corresponding tag.

Mark it as "Set as a pre-release". After the overall vote passes, set it as "Set as the latest release".

### 3. Voting Stage

#### 3.1 Community Internal Voting

**The vote must last at least 72 hours and receive at least 3 +1 binding votes**

Send to:

```
dev@seata.apache.org
```

Subject:

`[VOTE]Release Apache Seata (Incubating) x.x.x(RoundN)`

Where N in RoundN represents the number of attempts. If a vote doesn't pass and the version is modified for a new vote, N should be incremented (e.g., if Round1 doesn't pass, the next vote would be Round2).

Body:

```
Hi Seata Community,

This is a call for vote to release Apache Seata(incubating) vx.x.x.

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/seata/x.x.x/

The staging repo:
https://repository.apache.org/content/repositories/${STAGING.RELEASE}/

Git tag for the release:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

Hash for the release tag:
ID of the last commit on the tag branch

Release Notes:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

The artifacts have been signed with Key [ key-id ], corresponding
to
[ email like xxxx@apache.org ]
which can be found in the keys file:
https://downloads.apache.org/incubator/seata/KEYS

Build Environment: JDK 8+, Apache Maven 3.6.0+.
/mvnw clean package -DskipTests=true

CI Test Workflow:
CI pipeline links for the last commit of this version, such as:
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

#### 3.1.2 Complete the vote

Send a vote passed email:

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
The link to the corresponding vote email thread, e.g.:
https://lists.apache.org/thread/rwco6lms9qo10whjj8gg1dr8j7drl2gf

Thank you for reviewing and voting for our release candidate.

We will soon launch the second stage of voting.
```

#### 3.2.1 Voting in the Incubator

Similar to community voting, but you need to add links to the community vote thread to prove consensus was reached within the community.

Send an email to `general@incubator.apache.org`

Subject:

`[VOTE]Release Apache Seata (Incubating) x.x.x(RoundN)`

**The vote must last at least 72 hours and receive at least 3 +1 binding votes**

```
Hello everyone,

This is a call for vote to release Apache Seata(incubating) vx.x.x

The Apache Seata community has voted and approved the release of Apache
Seata(incubating) vx.x.x. We now kindly request the IPMC members
review and vote for this release.


The vote thread:
Community vote thread link, e.g.:
https://lists.apache.org/thread/rwco6lms9qo10whjj8gg1dr8j7drl2gf

Vote Result:
Community vote result thread link, e.g.:
https://lists.apache.org/thread/ybo9c5hrx2h2glg2bdgs3t22xg734y7r

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/seata/x.x.x/

The staging repo:
https://repository.apache.org/content/repositories/${STAGING.RELEASE}/

Git tag for the release:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

Hash for the release tag:
ID of the last commit on the tag branch

Release Notes:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x

The artifacts have been signed with Key [ key-id ], corresponding
to
[ email like xxxx@apache.org ]
which can be found in the keys file:
https://downloads.apache.org/incubator/seata/KEYS

Build Environment: JDK 8+, Apache Maven 3.6.0+.
/mvnw clean package -DskipTests=true

CI Test Workflow:
CI pipeline links for the last commit of this version, such as:
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

#### 3.2.2 Announce the Incubator vote result

After 72 hours, if there are at least 3 passing votes and no opposing votes, send an email as follows:

Send an email to `general@incubator.apache.org`

Subject: `[RESULT][VOTE] Release Apache Seata (incubating) x.x.x(RoundN)`

```
Hi Incubator PMC,

The vote to release Apache Seata(incubating) X.X.X has passed with
3 +1 binding and 1 +1 non-binding votes, no +0 or -1 votes.

Binding votes：

- XXX
- XXX
- XXX

Non-Binding votes:

- XXX

Vote thread:
https://lists.apache.org/thread/o7vwdvtolclcv1y4j4ozshj923ppwlnl

Thanks for reviewing and voting for our release candidate. We will
proceed with publishing the approved artifacts and sending out the
announcement soon.

```

### 3.2.3 Vote Interruption

If issues are found during the voting process, such as license problems or bugs that need to be fixed before release, the vote must be interrupted.

Subject: `[CANCEL][VOTE] Release Apache Seata (incubating) x.x.x(RoundN)`

```
Hi Incubator PMC,
I'm cancelling this vote:
Link to the previous vote

Describe the reason for cancellation: such as missing licenses, or bugs in the version

```

Note: After cancelling a vote in the Incubator, a new vote must start again from within the community.

# 4. Complete the Release

### 4.1 Release the Version

1. From Apache Nexus repository, select the previously closed **orgapacheseata-XXX** and click the `Release` icon to publish.

2. Move the signature files, src, and bin from the dev path to the release path using the following command:

     `svn mv https://dist.apache.org/repos/dist/dev/incubator/seata/incubator-seata/x.x.x-RCN https://dist.apache.org/repos/dist/release/incubator/seata/x.x.x -m "Release Seata X.X.X"`

3. Set the previous release note to "Set as the latest release" and submit.

4. Update the documentation for version x.x.x on the Seata official website, and add download links for the binary and source packages.

### 4.2 Announce the Release

Send an email to `general@incubator.apache.org`

Subject: `[ANNOUNCE] Apache Seata(Incubating) vx.x.x available`

```
Hi All,

The Apache Seata(Incubating) vx.x.x has been released!

Apache Seata is an easy-to-use, high-performance, open source distributed transaction solution.

Download Links: https://seata.apache.org/download/seata-server/

Release Notes:
https://github.com/apache/incubator-seata/releases/tag/vx.x.x/

Website: https://seata.apache.org/

Resources:
- Issue: https://github.com/apache/incubator-seata/issues
- Mailing list: dev@seata.apache.org
```
