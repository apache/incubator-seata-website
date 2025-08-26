---
title: serialization security
keywords: [serialization,security]
description: serialization security
---

# Serialization Security

## Overview
Seata supports the extension of serialization protocols for communication transmission and database persistence fields. In theory, users can enable any serialization protocol based on this extension mechanism, which offers significant flexibility. However, it is critical to be aware of the inherent security risks.
Data deserialization is one of the most vulnerable points attackers may exploit to execute Remote Code Execution (RCE) attacks, steal data, or compromise server operations. Before switching to or implementing a serialization protocol, users must thoroughly evaluate the security safeguards of both the target protocol and its framework implementation. The Seata framework itself cannot guarantee the security of any serialization mechanism other than the default Seata serialization.

The serialization protocols officially supported by Seata include:
- Seata
- Protobuf
- Kryo
- Hessian2
- Fury
- Fastjson2
- FST
- Jackson

For these serialization extensions, upon discovering or receiving vulnerability reports, the Seata team will follow up and upgrade dependencies to the latest secure versions. However, the final vulnerability resolution depends on the implementation of the serialization framework.

## Recommendations
In scenarios without specific requirements, we strongly recommend using the default Seata serialization. The Seata serialization implements custom Encode and Decode logic for all Messages, with zero dependency on third-party serialization frameworks, ensuring both performance and security.
