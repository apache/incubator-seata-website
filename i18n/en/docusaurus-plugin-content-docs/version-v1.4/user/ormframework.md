---
title: ORM Framework Support
keywords: [Seata, ORM Framework]
description: Seata ORM framework support
---

# ORM Framework Support
Although Seata is a component that ensures data consistency, it has no special requirements for ORM frameworks, supporting many mainstream ORM frameworks such as Mybatis, Mybatis-Plus, Spring Data JPA, Hibernate and so on. This is because the ORM framework is located on the upper layer of the JDBC structure, and Seata's AT and XA transaction modes intercept and enhance JDBC standard interface operations.