---
title: Seata Terminology
keywords: Seata
description: Seata Terminology.
---

# Seata Terminology
#### TC - Transaction Coordinator
 Maintain status of global and branch transactions, drive the global commit or rollback.
 
#### TM - Transaction Manager 
 Define the scope of global transaction: begin a global transaction, commit or rollback a global transaction.
 
#### RM - Resource Manager 
 Manage resources that branch transactions working on, talk to TC for registering branch transactions and reporting status of branch transactions, and drive the branch transaction commit or rollback.
