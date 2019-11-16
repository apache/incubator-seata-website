# Seata Terminology
Transaction Coordinator(TC):
 Maintain status of global and branch transactions, drive the global commit or rollback.
Transaction Manager(TM):
 Define the scope of global transaction: begin a global transaction, commit or rollback a global transaction.
Resource Manager(RM):
 Manage resources that branch transactions working on, talk to TC for registering branch transactions and reporting status of branch transactions, and drive the branch transaction commit or rollback.
