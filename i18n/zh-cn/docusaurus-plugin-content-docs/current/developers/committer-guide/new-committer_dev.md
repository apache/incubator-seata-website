# 新提交者指南

本文档主要为指导新晋提交者（committer）加入 Apache Seata 社区。

当收到来自 Seata PMC 的邀请邮件后，新提交者应先仔细考虑是否接受。 若决定接受，请点击“全部回复”并明确表达同意意愿。

## 提交 CLA

1. 从 https://www.apache.org/licenses/contributor-agreements.html#clas 下载ICLA。若企业指派员工参与Apache项目，请下载CCLA。
2. 根据个人情况填写ICLA。
  注意：
  - 地址栏需填写详细准确信息。
  - 需选择未被占用的唯一ApacheID，可通过 https://people.apache.org/committer-index.html 查询可用ID。
3. 签署协议（可选择手写签名或电子签名）：
  - 打印文档手写签名后扫描为PDF。
  - 电子签名绘制指引: [详细指引](https://www.apache.org/licenses/cla-faq.html#printer).
  - 使用PGP签名指引: [详细指引](https://www.apache.org/licenses/contributor-agreements.html#submitting).
4. 将签署后的icla.pdf（如使用PGP签名需附带icla.pdf.asc）发送至 [secretary@apache.org](mailto:secretary@apache.org).

等待数日后，您将收到CLA归档成功的确认邮件。

## 配置 ASF 账户


当收到来自 root@apache.org，标题为"Welcome to the Apache Software Foundation"的邮件后，即可开始配置ASF账户。

### 设置LDAP密码

1. 访问 https://id.apache.org/reset/enter 输入ApacheID。
2. 查收邮件并点击重置链接设置密码。

### 绑定GitHub账户

1. 访问 https://gitbox.apache.org/boxer/ 输入ApacheID及密码。
2. 点击"Authenticate with GitHub"按指引完成GitHub授权绑定。
3. 查收标题为"[GitHub] @asfgit has invited you to join the @apache organization"的邮件并接受邀请。
4. 稍等片刻页面将自动刷新。
5. 若GitHub未启用双因素认证，请按照 [指引](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication).

此时 https://gitbox.apache.org/boxer/ 将显示您的ApacheID与GitHub账户绑定状态，恭喜绑定成功！

## 邮件配置

注：Apache不直接提供邮箱服务。

### 接收邮件

可通过 [Apache Account Utility Platform](https://id.apache.org/) 修改邮件转发地址。

### 发送邮件

如需使用apache.org邮箱发信，需在邮件客户端配置mail-relay服务，详见 [指南](https://infra.apache.org/committer-email.html).

以Gmail为例：

1. 进入Gmail设置 → 查看所有设置。
2. 选择"账号和导入" → 找到"用这个地址发送邮件"。
3. 点击"添加其他邮箱地址"，输入姓名及apache.org邮箱地址。
4. 填写SMTP信息：
  - SMTP 服务器: mail-relay.apache.org
  - 端口: 587
  - 用户名: your apacheID
  - 密码: your apacheID password
  - TLS加密
5. 点击"添加账号"后查收验证邮件完成配置。

### 订阅邮件组

1. 发送邮件至 [dev-subscribe@seata.apache.org](mailto:dev-subscribe@seata.apache.org)
2. 查收主题为"confirm subscribe to dev@seata.apache.org" 的确认邮件。
3. 回复确认邮件。

当收到主题为 "WELCOME to dev@seata.apache.org" 的邮件，即表示订阅成功。
