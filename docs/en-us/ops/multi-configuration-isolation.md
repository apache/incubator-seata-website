---
title: Multi-configuration Isolation
keywords: Seata
description: Seata supports Multi-configuration Isolation since 0.6.1,You can configure it in the following steps.
---

# Multi-configuration Isolation

Seata supports Multi-configuration Isolation since 0.6.1,You can configure it in the following steps.

## use case 

Suppose we now have a test environment in which we want to read only the configuration items corresponding to the test environment.

### 1.Environment Configuration 

Seata provides two ways to set up different environments:

- **-e test**,where test is the name of the environment.(**This can be only used for server side**)
```shell

e.g.(Linux)

sh seata-server.sh -e test
```
- Use **SEATA_ENV** as the key of environment variable,and it's value will be the name of the environment.(**This can be only used for client side**)[**recommended**]
```shell

e.g.(Linux)

#vi /etc/profile 

export SEATA_ENV=test

:wq

#source /etc/profile
```
- Use **seataEnv** as the key of jvm options,and it's value will be the name of the environment.(**This can be only used for client side**)[**recommended**]
```
-DseataEnv=test
```
### 2.Name the new configuration file

- Copy and rename file.conf to file-env.conf,where env is the name of the environment. e.g. **file-test.conf**
- Copy and rename registry.conf to registry-env.conf,where env is the name of the environment. e.g. **registry-test.conf**
- In the registry-test.conf file, modify as follows:
```shell
registry {
...
file {
    name = "file-test.conf"
  }

config {
...
file {
    name = "file-test.conf"
  }

```


After all the steps have been set up, you can start using Seata configuration isolation.