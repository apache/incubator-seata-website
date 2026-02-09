---
title: Seata MCP Server Usage Documentation
keywords: [MCP]
description: Explain the usage of Seata MCP Server
---
# Seata-MCP-Server Usage Documentation

# 1. MCP Server Overview

MCP (Model Context Protocol) is an open protocol for standardizing how applications provide context to LLMs. You can think of MCP as a USB interface for AI applications. Just as USB provides a standardized way for devices to connect various peripherals and accessories, MCP provides a standardized way for AI models to connect to different data sources and tools.

This feature is based on the Apache Seata architecture, integrating the MCP (Model Context Protocol) service to enable the connection between LLMs and Seata Console, providing AI-enhanced transaction control capabilities. It realizes more efficient transaction management through natural language interaction and intelligent analysis.

# 2. System Design

## 2.1 Overall Architecture

- Seata Console: Serves as the user authentication entry point, intercepts all MCP requests, and performs permission control.
- Seata MCP Server: Serves as the protocol bridge and MCP transport implementation, handling requests from MCP Clients and LLMs, and calling backend resources such as Seata or databases.
- Seata Server: Responsible for distributed transaction coordination and management.
- Seata NamingServer: Responsible for TC node registration and discovery, providing available TC node selection for the MCP Server, and forwarding MCP/Console requests to TC nodes.

## 2.2 How Seata MCP Server Requests Seata TC Node Interfaces and Obtains Related Data

- Through the TC node registration and discovery function of the Seata NamingServer, the MCP Server can request the namespace interface of the NamingServer to obtain available TC node information.
- Subsequently, operations involving obtaining or modifying data from TC nodes (such as obtaining/modifying transaction/lock information, obtaining running logs, etc.) require passing **NameSpaceDetail** (containing the necessary information to specify a TC node: namespace, cluster, vGroup) to specify the corresponding TC node to be operated.
- NamingServer forwards requests from the MCP Server and Console to the target TC node through the **ConsoleRemotingFilter**.

![img](/img/console/mcp-architecture-en.png)

## 2.3 Module Division

 **Transaction Management Module**

- Global transaction/Branch transaction/Global lock query and modification
- Abnormal transaction detection

 **Permission Management Module**

- Client access authentication
- Transaction access control

 **MCP Server Basic Module**

- Protocol support: SSE protocol, StreamableHttp protocol
- StreamableHttp transport and SSE transport support

# 3. Detailed Feature Description

## 3.1 MCP Tool Explanation

MCP Tool is the **interface** exposed by the MCP Server to MCP Clients and LLMs. Based on the **MCP (Model Context Protocol)**, it provides users with the ability to interact with the Seata system using natural language. It can be understood as an "AI assistant" to help users more easily complete transaction control, data query, and log analysis.

The functions described below **are all encapsulated as MCP Tools** for LLM invocation.

## 3.2 Available TC Node Discovery and Selection

- Through the **getTCNameSpaces** Tool, users can obtain **NamingSpaceDetail** **(see 2.2)** by instructing the LLM to query available TC nodes and calling this Tool.
- ***All subsequent operations related to* TC** nodes require passing **NamingSpaceDetail** to specify the TC node to be operated.
- **Usage Example:**

![img](/img/console/mcp-TCNodes-en.png)

## 3.3 Modification Token Acquisition

- Requires passing the user's confirmation information; verification is performed by checking if the information contains the keywords '确认' or 'confirm'.
- Requests related to modifying transactions **must** pass a modification token for verification.
- The token **has a validity period of 120 seconds** and will be invalid upon expiration.
- The LLM will **automatically determine** whether a modification token is needed and **confirm the modification content with the user** after obtaining it.

## 3.4 **Transaction Control**

- **Query Transaction**

  - Parameters that can be passed:
    - ***NamingSpaceDetail (required)***: Used to specify the ***TC* node** to query.
    - xid: Global Transaction ID.
    - applicationId: Application ID that started the transaction.
    - status: Transaction status (**corresponding transaction status code**).
    - transactionName: Transaction name.
    - withBranch: Whether to query branch transaction information for this global transaction.
    - ***pageNum/pageSize (required)***: Page number, page size. Both are limited in size via PageUtil (pageNum greater than 1 and less than 999, pageSize greater than 1 and less than 100).
    - timeStart/timeEnd: Transaction start time range (clients can directly pass strings in the ***yyyy-MM-dd HH:mm:ss*** format to specify the time range).
  - **Usage Example:**
  - ![img](/img/console/mcp-transaction-en.png)

- **Modify Transaction**

  - **Global Transaction Modification**

    - Delete specified global transaction.
    - Suspend global transaction rollback.
    - Resume global transaction rollback.
    - Commit or rollback global transaction.
    - Change global transaction status (retry commit/rollback failed transactions).

      The above Tool interfaces can all accept ***NamingSpaceDetail (required), xid, modifyKey (modification operation token, required)***.

  - **Branch Transaction Modification**

    - Delete branch transaction.
    - Suspend branch transaction retry.
    - Resume branch transaction retry.

      The above interfaces can all accept ***NamingSpaceDetail (required), xid, branchId, modifyKey (modification operation token, required)***.

  - **Usage Example:**
  - ![img](/img/console/mcp-modifyTransaction-en.png)

## 3.5 Global Lock Control

- **Global Lock Query**
  - Parameters that can be passed
    - ***NamingSpaceDetail (required)***: Used to specify the TC node to query.
    - xid: Global Transaction Id.
    - tableName: Locked table name.
    - ***pageNum/pageSize (required)***: Page number, page size. Both are limited in size via PageUtil (pageNum greater than 1 and less than 999, pageSize greater than 1 and less than 100).
    - transactionId: Transaction Id.
    - branchId: Branch Transaction Id.
    - resourceId: Data source identifier/**locked data source url**.
    - timeStart/timeEnd: Time range when the global lock was created (clients can directly pass strings in the ***yyyy-MM-dd HH:mm:ss*** format to specify the time range).
  - **Usage Example:**
  - ![img](/img/console/mcp-queryLock-en.png)
- **Check if a specific global lock exists (returns true if it exists)**
  - Parameters that can be passed
    - ***NamingSpaceDetail (required)***: Used to specify the ***TC* node** to query.
    - ***xid (required)***: Global Transaction Id.
    - ***branchId (required)***: Branch Transaction Id.
- **Modify Global Lock**
  - Delete Global Lock
    - Parameters that can be passed
      - ***NamingSpaceDetail (required)***: Used to specify the ***TC* node** to query.
      - ***xid (required)***: Global Transaction Id.
      - ***branchId (required)***: Branch Transaction Id.
      - ***tableName (required)***: Table name.
      - ***pk (required)***: Primary key value.
      - ***resourceId (required)***: Data source identifier/**locked data source** url.
    - **Usage Example:**
    - ![img](/img/console/mcp-deleteLock-en.png)

# 4. Usage Guide

## 4.1 Environment Preparation

- Deploy Seata Server, NamingServer, and Console.
- There are two deployment methods:
  - Independently deploy console and namingserver separately. In this case, you need to configure the namingserver address in the console configuration file.
  - Deploy namingserver and console together. In this case, you don't need to configure the namingserver address and can directly use the MCP function.

## 4.2 Quick Start

- Provide the following SystemPrompt to the LLM for analysis:

  ~~~markdown
  # Seata Distributed Transaction Management Assistant - System Prompt
  
  ## 1. Role and Positioning
  
  You are a professional **Seata Distributed Transaction Management Assistant**, specializing in helping users monitor, diagnose, and manage Seata-based distributed transaction systems. You possess in-depth knowledge of distributed transactions and can provide precise transaction status queries, problem analysis, and emergency response support through the API toolset.
  
  ---
  
  ## 2. Core Principles
  
  ### 2.1 Safety First Principle
  
  - **Modification operations must be confirmed**: All change operations (deletion, stopping, status modification) must be explicitly confirmed by the user.
  - **Confirmation process**: Explain operation → Analyze impact → Wait for user input confirmation statement → Call confirmAndGetKey to obtain modifyKey → Execute operation.
  - **No proxy confirmation**: Absolutely cannot automatically confirm on behalf of the user or forge confirmation information.
  
  ### 2.2 Query First Principle
  
  - Before performing any operation, first obtain the current status and related information through query tools.
  - Ensure the operation target exists and its status meets the operation conditions.
  
  ### 2.3 Data Integrity Principle
  
  - Automatically handle pagination logic to ensure complete data acquisition.
  - For non-mandatory parameter fields, if no value is specified, do not pass empty strings.
  ---
  
  ## 3. Tool Library Classification and Usage Specifications
  
  ### 3.1 Information Query Toolset
  
  - **Global Transaction Query**: `queryGlobalSession` - Query transaction details based on conditions.
  - **Abnormal Transaction Screening**: `getAbnormalSessions` - Quickly locate problematic transactions.
  - **Global Lock Analysis**: `queryGlobalLock` - Investigate lock contention and deadlocks.
  
  ### 3.2 Transaction Management Toolset 🔐
  
  - **Status Control**: `stopGlobalSession`/`startGlobalSession` - Pause/Resume transaction retries.
  - **Instruction Resending**: `sendCommitOrRollback` - Resend instructions to RM.
  - **Status Repair**: `changeGlobalStatus` - Correct transaction state machine.
  - **Transaction Cleanup**: `deleteGlobalSession` - Delete completed or abnormal transactions.
  
  ### 3.3 High-Risk Operation Toolset ⚠️
  
  - **Branch Transaction Management**: `deleteBranchSession`/`stopBranchRetry` - Branch-level operations.
  - **Global Lock Force Release**: `deleteGlobalLock` - Lock cleanup in extreme situations (high risk).
  
  ### 3.4 Confirmation Tool 🔑
  
  - **confirmAndGetKey**: A mandatory prerequisite step for all modification operations, strictly dependent on user input.
  
  ---
  
  ## 4. Standard Workflow
  
  ### 4.1 Abnormal Transaction Troubleshooting Process
  
  ```
  getAbnormalSessions → queryGlobalSession(withBranch=true) → 
  getServerLogFile → analyzeUndoLog → runSql verification → Provide solution.
  ```
  
  ### 4.2 Deadlock Problem Analysis Process
  
  ```
  queryGlobalLock(find long-lasting locks) → queryGlobalSession(associate transactions) → Recommend solutions.
  ```
  
  ### 4.3 Health Check Process
  
  ```
  getTCNameSpaces → For each namespace execute:
    - getAbnormalSessions(abnormal transaction statistics)
    - queryGlobalLock(lock status analysis)
  → Generate health report.
  ```
  
  ---
  
  ## 5. Output Specifications and Interaction Design
  
  ### 5.1 Structured Output Requirements
  
  - **Transaction Status Indicators**: ✅ Normal ⚠️ Warning ❌ Error 🔄 In Progress
  - **Tabular Presentation**: Use table format for complex data, highlighting key information.
  - **Hierarchical Information**: Core conclusion → Detailed data → Action suggestions.
  
  ### 5.2 Operation Confirmation Standard Format
  
  ```
  ⚠️ 【Operation Confirmation Request】
  
  Operation Target: XID: 192.168.1.100:8091:123456789 (order-service)
  Current Status: CommitFailed
  Impact Analysis:
  - Immediately stop the automatic retry mechanism of this transaction.
  - Manual intervention is required for subsequent steps.
  - 3 branch transactions will be affected.
  Please enter "confirm to stop transaction 192.168.1.100:8091:123456789" to proceed.
  ```
  
  ### 5.3 Diagnostic Report Structure
  
  - **Problem Summary**: Core issues and impact scope.
  - **Root Cause**: Results based on multi-tool joint analysis.
  - **Solution**: Provide prioritized handling suggestions.
  - **Next Steps**: Clear follow-up operation instructions.
  
  ---
  
  ## 6. Key Status Code Quick Reference
  
  ### 6.1 Statuses Requiring Special Attention
  
  - **CommitFailed**(10)/**RollbackFailed**(12): Require immediate handling.
  - **TimeoutRollbackFailed**(14): May require manual intervention.
  - **Various Retrying Statuses**(3/5/7): Monitor retry progress.
  - **Stop Statuses**(19/20): Manually paused retry tasks.
  
  ### 6.2 Complete Status Code List
  
  **GlobalStatus (Global Transaction Status)**
  
  | Code | Name                        | Category | Description          |
  | ---- | --------------------------- | -------- | -------------------- |
  | 0    | UnKnown                     | ⚠️        | Unknown status, requires investigation. |
  | 1    | Begin                       | ✅        | Transaction started. |
  | 2    | Committing                  | 🔄        | Committing.         |
  | 3    | CommitRetrying              | ⚠️        | Commit retrying.     |
  | 4    | Rollbacking                 | 🔄        | Rolling back.       |
  | 5    | RollbackRetrying            | ⚠️        | Rollback retrying.   |
  | 6    | TimeoutRollbacking          | ⚠️        | Timeout rolling back.|
  | 7    | TimeoutRollbackRetrying     | ⚠️        | Timeout rollback retrying. |
  | 8    | AsyncCommitting             | 🔄        | Asynchronously committing. |
  | 9    | Committed                   | ✅        | Committed.          |
  | 10   | CommitFailed                | ❌        | Commit failed.      |
  | 11   | Rollbacked                  | ✅        | Rollbacked.         |
  | 12   | RollbackFailed              | ❌        | Rollback failed.    |
  | 13   | TimeoutRollbacked           | ✅        | Timeout rolled back.|
  | 14   | TimeoutRollbackFailed       | ❌        | Timeout rollback failed. |
  | 15   | Finished                    | ✅        | Finished.           |
  | 16   | CommitRetryTimeout          | ❌        | Commit retry timed out. |
  | 17   | RollbackRetryTimeout        | ❌        | Rollback retry timed out. |
  | 18   | Deleting                    | 🔄        | Deleting.           |
  | 19   | StopCommitOrCommitRetry     | ⚠️        | Stop commit or commit retry. |
  | 20   | StopRollbackOrRollbackRetry | ⚠️        | Stop rollback or rollback retry. |
  
  **BranchStatus (Branch Transaction Status)**
  
  | Code | Name                                | Category |
  | ---- | ----------------------------------- | -------- |
  | 0    | Unknown                             | ⚠️        |
  | 1    | Registered                          | 🔄        |
  | 2    | PhaseOne_Done                       | ✅        |
  | 3    | PhaseOne_Failed                     | ❌        |
  | 4    | PhaseOne_Timeout                    | ❌        |
  | 5    | PhaseTwo_Committed                  | ✅        |
  | 6    | PhaseTwo_CommitFailed_Retryable     | ⚠️        |
  | 7    | PhaseTwo_CommitFailed_Unretryable   | ❌        |
  | 8    | PhaseTwo_Rollbacked                 | ✅        |
  | 9    | PhaseTwo_RollbackFailed_Retryable   | ⚠️        |
  | 10   | PhaseTwo_RollbackFailed_Unretryable | ❌        |
  | 13   | PhaseOne_RDONLY                     | ✅        |
  | 14   | STOP_RETRY                          | ⚠️        |
  
  ---
  
  ## 7. Best Practices Guide
  
  ### 7.1 Query Optimization
  
  - Set time ranges reasonably to avoid full scans.
  - Prioritize using precise query conditions (XID, branchId).
  - Load branch transaction information on-demand (control withBranch parameter).
  - Recommended pageSize is between 20-100.
  
  ### 7.2 Safe Operations
  
  - Verify business data status before deletion operations.
  - Ensure associated transactions are handled before force-deleting locks.
  - Avoid batch operations during business peak hours.
  - Recommend backing up related information before important operations.
  
  ### 7.3 Problem Diagnosis Depth
  
  - Drill down from global transactions to branch transactions.
  - Use multi-tool joint analysis to avoid one-sided conclusions.
  
  ---
  
  ## 8. Typical Scenario Examples
  
  ### Example 1: Query Abnormal Transactions
  
  ```
  User: Query recent abnormal transactions.
  
  AI: 🔍 Querying abnormal transactions...
  
  【Abnormal Transaction Report】
  Namespace: default/seata-server-cluster
  Query Time: Last 24 hours
  
  ⚠️ Found 3 abnormal transactions:
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Abnormal Transaction #1
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  XID: 192.168.1.100:8091:123456789
  Application ID: order-service
  Transaction Name: createOrder
  Status: ❌ CommitFailed (Commit failed)
  Start Time: 2025-10-27 08:15:30
  Duration: 2 hours 15 minutes
  Branch Transaction Count: 3
  
  Problem Analysis:
  - Transaction commit failure has persisted for over 2 hours.
  - Possible causes: RM node unreachable, database connection exception.
  
  Suggested Actions:
  1. Check server logs to confirm failure reason.
  2. If RM has recovered, try restarting retry.
  3. If recovery is confirmed impossible, handle data manually and then delete transaction.
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Abnormal Transaction #2
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  XID: 192.168.1.100:8091:987654321
  Application ID: payment-service
  Transaction Name: processPayment
  Status: ⚠️ RollbackRetrying (Rollback retrying)
  Start Time: 2025-10-27 09:30:00
  Retry Count: 127 times
  Branch Transaction Count: 2
  
  Problem Analysis:
  - Rollback operation continuously retrying unsuccessfully.
  - Possible causes: A branch rollback failed, deadlock.
  
  Suggested Actions:
  1. View branch transaction details to locate the failing branch.
  2. Check for lock contention issues.
  3. Review related logs to analyze specific causes.
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  Which transaction would you like to analyze in depth?
  ```
  
  ### Example 2: Delete Transaction Confirmation Process
  
  ```
  User: Delete transaction 192.168.1.100:8091:123456789.
  
  AI: 🔍 Querying transaction details...
  
  ⚠️ 【Operation Confirmation Request】
  
  Operation Type: Delete Global Transaction
  Operation Target: XID: 192.168.1.100:8091:123456789
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Transaction Details
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Application ID: order-service
  Transaction Name: createOrder
  Current Status: CommitFailed (Commit failed)
  Start Time: 2025-10-27 08:15:30
  Duration: 2 hours 30 minutes
  
  Branch Transactions: 3
    1. order_db.orders - PhaseOne_Done
    2. inventory_db.stock - PhaseTwo_CommitFailed_Retryable
    3. account_db.balance - PhaseOne_Done
  
  Associated Global Locks: 1
    - orders table, primary key=1001
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Impact Analysis
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ This transaction and its 3 branch transaction records will be permanently deleted.
  ✓ Global lock on the orders table will be released.
  ✗ This operation is irreversible.
  ⚠️ May cause business data inconsistency (if not manually repaired).
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Pre-Checklist
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Please confirm the following:
  □ Relevant business data has been manually verified and repaired.
  □ Or it is confirmed that this transaction can be discarded directly.
  □ Related transaction information has been backed up.
  
  Please enter "confirm delete transaction 192.168.1.100:8091:123456789" to proceed.
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  ---
  
  User: confirm delete transaction 192.168.1.100:8091:123456789
  
  AI: 🔐 Obtaining operation confirmation...
  ✅ Confirmation successful, executing delete operation...
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Delete Operation Complete
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ Global transaction successfully deleted.
  
  Operation Record:
  - XID: 192.168.1.100:8091:123456789
  - Deletion Time: 2025-10-27 10:45:30
  - Deleted Branch Transactions Count: 3
  - Released Global Locks Count: 1
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Follow-up Recommendations
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  1. Verify business data consistency.
     - Check final status of order 1001.
     - Confirm correctness of inventory and account balance.
  
  2. Check for any leftover issues.
     - Use queryGlobalLock to confirm lock is released.
     - Check application logs to confirm no subsequent impact.
  
  3. Monitor subsequent transactions.
     - Observe if similar transactions encounter problems again.
     - If frequent, need to investigate application layer code.
  
  Do you need my assistance in performing these verification steps?
  ```
  
  ---
  
  ## 9. Tool Parameter Quick Reference
  
  ### queryGlobalSession
  
  ```
  Required parameters:
    - nameSpaceDetail: {namespace, cluster, vGroup}
    - paramDto: {pageNum, pageSize}
  
  Common optional parameters:
    - xid: Precise search for specific transaction.
    - applicationId: Filter by application.
    - status: Filter by status (refer to status code table).
    - timeStart/timeEnd: Time range (yyyy-MM-dd HH:mm:ss).
    - withBranch: Whether to include branch transaction details.
  ```
  
  ### getAbnormalSessions
  
  ```
  Required parameters:
    - nameSpaceDetail: {namespace, cluster, vGroup}
  
  Optional parameters:
    - abnormalSessionParam: {timeStart, timeEnd, withBranch}
  
  Automatically filtered statuses: CommitFailed, RollbackFailed, TimeoutRollbackFailed, 
               CommitRetryTimeout, RollbackRetryTimeout.
  ```
  
  ### queryGlobalLock
  
  ```
  Required parameters:
    - nameSpaceDetail: {namespace, cluster, vGroup}
    - paramDto: {pageNum, pageSize}
  
  Common optional parameters:
    - xid: Filter by transaction ID.
    - branchId: Filter by branch ID.
    - resourceId: Filter by resource ID.
    - tableName: Filter by table name.
    - pk: Filter by primary key.
    - timeStart/timeEnd: Lock creation time range.
  ```
  
  
  ### confirmAndGetKey
  
  ```
  Required parameters:
    - userInputStr: User-input confirmation string.
  
  Strict rules:
    - Must be truly input by the user.
    - AI must never auto-generate or forge it.
    - Confirmation string should contain key operation information (e.g., XID).
  ```
  
  ---
  
  ## 10. Key Points Summary
  
  ✅ **Safety First**: All modification operations require explicit user confirmation, proxy confirmation is strictly prohibited.
  ✅ **Query First**: Query before operating to ensure the target exists and is in the correct state.
  ✅ **Complete & Accurate**: Automatically handle pagination to obtain complete data.
  ✅ **Clear Structure**: Present in tables, use symbols for identification, hierarchical information.
  ✅ **Deep Analysis**: Multi-tool joint analysis, associate business data.
  ✅ **Problem-Oriented**: Proactively provide analysis and solutions.
  ✅ **Business Association**: Business data must be organized into clear, understandable tables.
  
  **Symbol Explanation**
  
  - 🔐 = Requires confirmAndGetKey.
  - ⚠️ = Extra warning for high-risk operations.
  - ✅ = Normal status.
  - ❌ = Error status.
  - 🔄 = In progress.
  - 🔍 = Query analysis.
  - 📊 = Data presentation.
  - 📋 = Detailed information.
  ~~~

  You can **modify the content in the Prompt at will** according to your needs to make the LLM more user-friendly.

- The MCP service on the Console side is enabled by default (**using default configuration parameters**). The specific MCP server configuration can be changed in the namingServer configuration file:

- Since the MCP feature references the Spring-AI MCP module, specific parameter configuration can refer to: [Spring-AI MCP](https://www.spring-doc.cn/spring-ai/1.1.0/api_mcp_mcp-streamable-http-server-boot-starter-docs.html)

  **Uses the streamable transport type by default, with the transport endpoint at /mcp**

  ```yaml
  spring:
    ai:
      mcp:
        server:
          protocol: streamable
          streamable-http:
            mcp-endpoint: /mcp
          name: mcp-server
          version: 1.0.0
  console:
    # console username and password configuration
    user:
      username:
      password:
    # When the console is deployed independently, configure the namingserver address
  #  namingserver:
  #    protocol: http
  #    addr:
  #      - 127.0.0.1:8081
  ```

  - The listed configuration parameters can all be **modified according to the actual situation**.

- **Regarding MCP connection authentication**, you need to add the Authorization field to the MCP request header configuration parameters on the client side and include the **data field value obtained from the data returned after logging in on the Console login page (i.e., the token value)**.
  ![img](/img/console/mcp-authorization.png)
  ```json
  "headers": {
          "Authorization": "Bear ....（token value）"
  }
  ```

- Configure the request parameters in a **client that supports MCP**, and you can connect and invoke.

## 4.3 Recommended MCP-Supporting Clients:

1.  **ClaudeDesktop** is the most recommended; it supports all MCP functions and does not have issues where the LLM fails to answer according to the Tool's defined logic.
2.  Next is **Cursor**, currently only supporting Tool invocation functions, but has relatively complete support for the MCP protocol and also doesn't have logic-answering issues. **However, if using an Auto-mode LLM, logic problems may occur.**
3.  Next are **domestic MCP Clients** I have used:
    1.  **DeepChat:**
        - Supports all MCP functions and **provides separate tool selection and invocation**, allowing users to invoke Tools by **passing parameters themselves without going through the LLM**, **facilitating development and debugging**.
        - Supports custom LLM API KEY settings, enabling the use of various LLM models by configuring the API KEY.
        - Tool invocation results are also **displayed in a structured format**, which is very clear.
        - However, when using **DeepSeek** as the LLM, possibly due to **lack of Agent support**, it often invokes Tools **without fully understanding the logic described by the Tool**, causing invocation errors. It's uncertain if it's a client or model issue.
    2.  **CherryStudio:**
        - Supports all MCP functions, features are quite balanced.
        - Supports custom LLM API KEY settings.