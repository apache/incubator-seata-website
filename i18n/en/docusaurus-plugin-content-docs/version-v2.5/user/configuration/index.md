---
title: Introduction
keywords: [Seata, configuration center]
description: Configuration Center Introduction.
---

# Introduction

- What is a configuration center? The configuration center can be described as a "large warehouse" that contains various configuration files. You can obtain and load the required configurations into the corresponding clients. For example, Seata client (TM, RM) and Seata server (TC) will read global transaction switches, transaction session storage modes, and other information.
- What is the difference between Seata's configuration center and Spring Cloud's configuration center? In a broad sense, there is no difference. The only difference is that Spring Cloud's configuration center only applies to its own components, while Seata's configuration center also applies to Seata itself. (Note: Spring Cloud's configuration center is unrelated to Seata)
- Which configuration centers does Seata support?
  1. Nacos
  2. Consul
  3. Apollo
  4. Etcd
  5. ZooKeeper
  7. File (reads local files, including support for conf, properties, and yml configuration files)
