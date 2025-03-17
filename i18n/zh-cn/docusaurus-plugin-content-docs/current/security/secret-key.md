---
title: SecretKey 安全公告
keywords: [Seata]
description: SecretKey 安全公告.
---

# SecretKey 安全公告

## 背景
自1.5.0 版本开始，Seata 提供了用户控制台 Seata-Console。在用户控制台中提供了全局事务和分支事务的查询功能，用户可以方便的根据各种匹配条件查询全局事务，分支事务和全局锁信息，以此帮助用户快速的定义和排查问题。

用户登录Seata-Console，需要输入用户名和密码。Seata-Console 会将用户名和密码发送到后端，后端验证用户名和密码是否正确。如果正确则根据 SecretKey 生成一个具有时效性的JWT Token，返回给前端。前端下次访问时，将 JWT Token发送到后端，后端验证JWT Token是否正确，如果正确则返回数据，如果错误则拒绝访问。

在Seata-Console默认的配置文件存在默认的用户名，密码和SecretKey。在生产环境中，用户需要修改默认的用户名，密码和SecretKey，以保证安全性。以下是对生产环境的配置建议，请您参考。

## 解决方案
- 在生产环境中，禁止非必要的公网访问，若要开启公网访问，请配置好防火墙或者ACL规则，限制IP访问。即使Seata-Console中并不存储和展示敏感数据，我们也强烈的要求您这么做。
- 首次部署Seata-Console时，必须修改默认的用户名，密码和SecretKey后再进行部署，避免因默认凭据导致数据泄露或入侵风险。需要修改配置文件`application.yml`中的`seata.console.user.username`，`seata.user.password`和`seata.security.secretKey`。在Kubernetes部署模式下可以通过ConfigMap/Secret资源对相关信息进行独立分级管理。具备需要修改的配置项如下：
```yml
console:
  user:
    username: ${SEATA_CONSOLE_USERNAME}
    password: ${SEATA_CONSOLE_PASSWORD}
}
seata:
  security:
    secretKey: ${SEATA_SECRET_KEY}
```
