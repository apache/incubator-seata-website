---
title: Introduction
keywords: [Seata, Registry Center]
description: Registry Center Introduction.
---

# Introduction

- What is a registry center? The registry center can be considered as the "address book" in a microservices architecture, which records the mapping relationship between services and service addresses. In a distributed architecture, services are registered here, and when a service needs to call other services, it looks up the address of the service here and makes the call. For example, the Seata client (TM, RM) discovers the address of the Seata server (TC) cluster and communicates with each other.
- What is the difference between Seata's registry center and the registry centers of Dubbo and Spring Cloud? In a broad sense, there is no difference. The only difference is that the registry centers of Dubbo and Spring Cloud only work for their own components, while Seata's registry center also works for Seata itself. (Note: The registry centers of Dubbo and Spring Cloud are not related to Seata)
- What registry centers does Seata support?
  1. Eureka
  2. Consul
  3. Nacos
  4. Etcd
  5. ZooKeeper
  6. Sofa
  7. Redis
  8. File (direct connection)
