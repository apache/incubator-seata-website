---
title: SecretKey Security
keywords: [Seata]
description: SecretKey Security Announcement.
---

# SecretKey Security Announcement

## Background
Starting from version 1.5.0, Seata provides a user console called Seata-Console. The user console offers query functionality for global transactions and branch transactions, allowing users to easily search for global transactions, branch transactions, and global lock information based on various matching conditions. This helps users quickly define and troubleshoot problems.

To log into Seata-Console, users need to enter a username and password. Seata-Console sends the username and password to the backend, which verifies their correctness. If correct, it generates a time-sensitive JWT token based on a SecretKey and returns it to the frontend. On subsequent visits, the frontend sends the JWT token to the backend. The backend verifies the token's validity and, if correct, returns the requested data. If incorrect, access is denied.

In Seata-Console's default configuration file, there are default username, password, and SecretKey settings. In a production environment, users need to modify these default settings to ensure security. Below are configuration recommendations for the production environment for your reference.

## Solution
- In a production environment, prohibit unnecessary public network access. If public network access is required, configure firewalls or ACL rules to restrict IP access. Even though Seata-Console does not store or display sensitive data, we strongly recommend that you do so.
- When deploying Seata-Console for the first time, it is essential to change the default username, password, and SecretKey before deployment to avoid the risk of data leakage or intrusion due to default credentials. You need to modify `seata.console.user.username`, `seata.user.password`, and `seata.security.secretKey` in the application.yml configuration file. In a Kubernetes deployment mode, you can manage this information independently and hierarchically using ConfigMap/Secret resources. The configuration items that need to be modified are as follows:
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
