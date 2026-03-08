---
title: API Documentation
keywords: [Seata API, NamingServer API, Server API, Open API, Admin API]
description: Seata namingserver open-api, server admin-api, and server open-api reference
---

# Seata API Documentation

## 1. API Overview

### 1.1 namingserver open-api

| API | Method | Path | Description | Detail |
|---|---|---|---|---|
| Health Check | GET | `/naming/v1/health` | namingserver health check | [View](#ns-health-check) |
| Register Instance | POST | `/naming/v1/register` `/api/v1/naming/register` | register a single node | [View](#ns-register-instance) |
| Batch Register | POST | `/naming/v1/batchRegister` `/api/v1/naming/batchRegister` | register nodes in batch | [View](#ns-batch-register) |
| Unregister Instance | POST | `/naming/v1/unregister` `/api/v1/naming/unregister` | unregister a single node | [View](#ns-unregister-instance) |
| Cluster Monitor | GET | `/naming/v1/clusters` `/api/v1/naming/clusters` | query cluster monitoring view | [View](#ns-clusters) |
| Cluster Data | GET | `/naming/v1/clusterData` `/api/v1/naming/clusterData` | query raw data of one cluster | [View](#ns-cluster-data) |
| Discovery | GET | `/naming/v1/discovery` `/api/v1/naming/discovery` | discover clusters by vGroup | [View](#ns-discovery) |
| Add Group | POST | `/naming/v1/addGroup` `/api/v1/naming/addGroup` | add vGroup mapping | [View](#ns-add-group) |
| Change Group | POST | `/naming/v1/changeGroup` `/api/v1/naming/changeGroup` | switch vGroup mapping | [View](#ns-change-group) |
| Namespace (v1) | GET | `/naming/v1/namespace` `/api/v1/naming/namespace` | namespace overview (v1) | [View](#ns-namespace-v1) |
| Watch | POST | `/naming/v1/watch` `/api/v1/naming/watch` | long-poll subscribe to vGroup changes | [View](#ns-watch) |
| Watch List | GET | `/naming/v1/watchList` `/api/v1/naming/watchList` | current watch list | [View](#ns-watch-list) |
| Namespace (v2) | GET | `/naming/v2/namespace` `/api/v2/naming/namespace` | namespace overview (v2) | [View](#ns-namespace-v2) |

### 1.2 server admin-api

| API | Method | Path | Description | Detail |
|---|---|---|---|---|
| Delete Branch Session | DELETE | `/api/v1/console/branchSession/deleteBranchSession` | delete branch session | [View](#adm-delete-branch-session) |
| Force Delete Branch Session | DELETE | `/api/v1/console/branchSession/forceDeleteBranchSession` | force delete branch session | [View](#adm-force-delete-branch-session) |
| Stop Branch Session | PUT | `/api/v1/console/branchSession/stopBranchSession` | stop branch retries | [View](#adm-stop-branch-session) |
| Start Branch Session | PUT | `/api/v1/console/branchSession/startBranchSession` | start branch retries | [View](#adm-start-branch-session) |
| Query Global Session | GET | `/api/v1/console/globalSession/query` | page query global sessions | [View](#adm-query-global-session) |
| Delete Global Session | DELETE | `/api/v1/console/globalSession/deleteGlobalSession` | delete global session | [View](#adm-delete-global-session) |
| Force Delete Global Session | DELETE | `/api/v1/console/globalSession/forceDeleteGlobalSession` | force delete global session | [View](#adm-force-delete-global-session) |
| Stop Global Session | PUT | `/api/v1/console/globalSession/stopGlobalSession` | stop global retries | [View](#adm-stop-global-session) |
| Start Global Session | PUT | `/api/v1/console/globalSession/startGlobalSession` | start global retries | [View](#adm-start-global-session) |
| Send Commit/Rollback | PUT | `/api/v1/console/globalSession/sendCommitOrRollback` | manually trigger commit or rollback dispatch | [View](#adm-send-commit-rollback) |
| Change Global Status | PUT | `/api/v1/console/globalSession/changeGlobalStatus` | change global status | [View](#adm-change-global-status) |
| Query Global Lock | GET | `/api/v1/console/globalLock/query` | page query global locks | [View](#adm-query-global-lock) |
| Delete Global Lock | DELETE | `/api/v1/console/globalLock/delete` | delete global lock | [View](#adm-delete-global-lock) |
| Check Global Lock | GET | `/api/v1/console/globalLock/check` | check whether lock exists for a branch | [View](#adm-check-global-lock) |

### 1.3 server open-api

| API | Method | Path | Description | Detail |
|---|---|---|---|---|
| Server Health Check | GET (recommended) | `/health` | server health check | [View](#srv-health-check) |
| Change Cluster | POST | `/metadata/v1/changeCluster` | change raft peers | [View](#srv-change-cluster) |
| Query Cluster Metadata | GET | `/metadata/v1/cluster` | query leader/term/nodes/storeMode | [View](#srv-cluster) |
| Watch Metadata | POST | `/metadata/v1/watch` | long-poll subscribe to group changes | [View](#srv-watch) |
| Add VGroup | GET | `/vgroup/v1/addVGroup` | add vGroup mapping | [View](#srv-add-vgroup) |
| Remove VGroup | GET | `/vgroup/v1/removeVGroup` | remove vGroup mapping | [View](#srv-remove-vgroup) |

---

## 2. namingserver open-api

### <a id="ns-health-check"></a>2.1 Health Check
- Purpose: return namingserver availability status.
- Request: `GET /naming/v1/health`
- Parameters: none
- Response: `Result<?>`
- Notes: response body defaults to `code="200"` and `message="success"`.

### <a id="ns-register-instance"></a>2.2 Register Instance
- Purpose: register a single `NamingServerNode` under `namespace + clusterName + unit`.
- Request: `POST /naming/v1/register` or `POST /api/v1/naming/register`
- Query parameters:

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| namespace | string | Y | query (`@RequestParam`) | namespace |
| clusterName | string | Y | query (`@RequestParam`) | cluster name |
| unit | string | Y | query (`@RequestParam`) | unit name |

- Body: `NamingServerNode`

| Field | Type | Required | Note |
|---|---|---|---|
| control | object | N | control endpoint |
| transaction | object | N | transaction endpoint |
| internal | object | N | internal endpoint |
| role | string | N | node role |
| version | string | N | version |
| metadata | object | N | extended metadata |
| weight | number | N | weight |
| healthy | boolean | N | health status |
| term | long | N | node term |
| unit | string | N | node unit |

- Response: `Result<String>`
- Notes: failures are usually represented by `code=500`, while HTTP status may still be 200.

### <a id="ns-batch-register"></a>2.3 Batch Register
- Purpose: register nodes in batch.
- Request: `POST /naming/v1/batchRegister` or `POST /api/v1/naming/batchRegister`
- Query parameters: `namespace`, `clusterName` (both required, `@RequestParam`)
- Body: `List<NamingServerNode>`
- Response: `Result<String>`

### <a id="ns-unregister-instance"></a>2.4 Unregister Instance
- Purpose: unregister a single node.
- Request: `POST /naming/v1/unregister` or `POST /api/v1/naming/unregister`
- Query parameters: `namespace`, `clusterName`, `unit` (all required)
- Body: `NamingServerNode`
- Response: `Result<String>`

### <a id="ns-clusters"></a>2.5 Cluster Monitor
- Purpose: query cluster monitoring view under a namespace.
- Request: `GET /naming/v1/clusters` or `GET /api/v1/naming/clusters`
- Parameters:

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| namespace | string | Y (recommended) | query (default binding) | method argument is not explicitly annotated with `@RequestParam` |

- Response: `List<ClusterVO>` (`clusterName`, `clusterType`, `vGroupMapping`, `unitData`)

### <a id="ns-cluster-data"></a>2.6 Cluster Data
- Purpose: query raw data for one cluster.
- Request: `GET /naming/v1/clusterData` or `GET /api/v1/naming/clusterData`
- Parameters: `namespace`, `clusterName` (both required, `@RequestParam`)
- Response: `SingleResult<ClusterData>`
- Notes: when cluster is not found, it returns `SingleResult.failure("Cluster not found")`.

### <a id="ns-discovery"></a>2.7 Discovery
- Purpose: discover cluster list by `vGroup + namespace`.
- Request: `GET /naming/v1/discovery` or `GET /api/v1/naming/discovery`
- Parameters: `vGroup`, `namespace` (both required)
- Response: `MetaResponse`

| Field | Type | Note |
|---|---|---|
| clusterList | list | matched cluster list |
| term | long | current vGroup term |

### <a id="ns-add-group"></a>2.8 Add Group
- Purpose: create vGroup-to-cluster mapping.
- Request: `POST /naming/v1/addGroup` or `POST /api/v1/naming/addGroup`
- Parameters:

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| namespace | string | Y | query (`@RequestParam`) | namespace |
| clusterName | string | Y | query (`@RequestParam`) | target cluster |
| unitName | string | N | query (default binding) | no explicit annotation, nullable |
| vGroup | string | Y | query (`@RequestParam`) | transaction group |

- Response: `Result<String>`

### <a id="ns-change-group"></a>2.9 Change Group
- Purpose: switch a vGroup to a new cluster.
- Request: `POST /naming/v1/changeGroup` or `POST /api/v1/naming/changeGroup`
- Parameters: `namespace`, `clusterName`, `vGroup` (required) + `unitName` (optional, default `""`)
- Response: `Result<String>`

### <a id="ns-namespace-v1"></a>2.10 Namespace (v1)
- Purpose: return aggregated namespace information.
- Request: `GET /naming/v1/namespace` or `GET /api/v1/naming/namespace`
- Parameters: none
- Response: `SingleResult<Map<String, NamespaceVO>>`

| NamespaceVO Field | Type |
|---|---|
| clusters | List<String> |
| vgroups | List<String> |

### <a id="ns-watch"></a>2.11 Watch
- Purpose: subscribe to specified vGroup changes (long polling).
- Request: `POST /naming/v1/watch` or `POST /api/v1/naming/watch`
- Parameters:

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| clientTerm | string | Y | query (`@RequestParam`) | must be convertible to `long` |
| vGroup | string | Y | query (`@RequestParam`) | transaction group |
| timeout | string | Y | query (`@RequestParam`) | must be convertible to `int` |

- Response: `void` (asynchronous)
- Key behaviors:
  - Uses `request.startAsync()` to enable async processing.
  - `AsyncContext` timeout is set to `0` (container-level infinite timeout).
  - Actual waiting window is controlled by the `timeout` parameter passed to watcher.

### <a id="ns-watch-list"></a>2.12 Watch List
- Purpose: view registered watchers.
- Request: `GET /naming/v1/watchList` or `GET /api/v1/naming/watchList`
- Parameters: none
- Response: `List<WatcherVO>` (`vGroup`, `watcherIp`)

### <a id="ns-namespace-v2"></a>2.13 Namespace (v2)
- Purpose: return namespace aggregate information in v2 structure.
- Request: `GET /naming/v2/namespace` or `GET /api/v2/naming/namespace`
- Parameters: none
- Response: `SingleResult<Map<String, org.apache.seata.namingserver.entity.vo.v2.NamespaceVO>>`

| v2 NamespaceVO Field | Type |
|---|---|
| clusters | Map<String, ClusterVO> |

| v2 ClusterVO Field | Type |
|---|---|
| vgroups | List<String> |
| units | List<String> |
| type | String |

---

## 3. server admin-api

### <a id="adm-delete-branch-session"></a>3.1 Delete Branch Session
- Request: `DELETE /api/v1/console/branchSession/deleteBranchSession`
- Purpose: delete branch session.
- Parameters: `xid`, `branchId` (default binding, recommended via query/form)
- Response: `SingleResult<Void>`

### <a id="adm-force-delete-branch-session"></a>3.2 Force Delete Branch Session
- Request: `DELETE /api/v1/console/branchSession/forceDeleteBranchSession`
- Purpose: force delete branch session.
- Parameters: `xid`, `branchId`
- Response: `SingleResult<Void>`

### <a id="adm-stop-branch-session"></a>3.3 Stop Branch Session
- Request: `PUT /api/v1/console/branchSession/stopBranchSession`
- Purpose: stop branch retries.
- Parameters: `xid`, `branchId`
- Response: `SingleResult<Void>`

### <a id="adm-start-branch-session"></a>3.4 Start Branch Session
- Request: `PUT /api/v1/console/branchSession/startBranchSession`
- Purpose: start branch retries.
- Parameters: `xid`, `branchId`
- Response: `SingleResult<Void>`

### <a id="adm-query-global-session"></a>3.5 Query Global Session
- Request: `GET /api/v1/console/globalSession/query`
- Purpose: page query global sessions.
- Parameter source: `@ModelAttribute GlobalSessionParam` (query binding)

| Field | Type | Note |
|---|---|---|
| pageNum | int | pagination parameter |
| pageSize | int | pagination parameter |
| timeStart | long | start of time range |
| timeEnd | long | end of time range |
| xid | string | filter condition |
| applicationId | string | filter condition |
| status | int | filter condition |
| transactionName | string | filter condition |
| vgroup | string | filter condition |
| withBranch | boolean | include branch details |

- Response: `PageResult<GlobalSessionVO>`

### <a id="adm-delete-global-session"></a>3.6 Delete Global Session
- Request: `DELETE /api/v1/console/globalSession/deleteGlobalSession`
- Purpose: delete global session.
- Parameters: `xid`
- Response: `SingleResult<Void>`

### <a id="adm-force-delete-global-session"></a>3.7 Force Delete Global Session
- Request: `DELETE /api/v1/console/globalSession/forceDeleteGlobalSession`
- Purpose: force delete global session.
- Parameters: `xid`
- Response: `SingleResult<Void>`

### <a id="adm-stop-global-session"></a>3.8 Stop Global Session
- Request: `PUT /api/v1/console/globalSession/stopGlobalSession`
- Purpose: stop global retries.
- Parameters: `xid`
- Response: `SingleResult<Void>`

### <a id="adm-start-global-session"></a>3.9 Start Global Session
- Request: `PUT /api/v1/console/globalSession/startGlobalSession`
- Purpose: start global retries.
- Parameters: `xid`
- Response: `SingleResult<Void>`

### <a id="adm-send-commit-rollback"></a>3.10 Send Commit/Rollback
- Request: `PUT /api/v1/console/globalSession/sendCommitOrRollback`
- Purpose: manually trigger commit/rollback dispatch.
- Parameters: `xid`
- Response: `SingleResult<Void>`

### <a id="adm-change-global-status"></a>3.11 Change Global Status
- Request: `PUT /api/v1/console/globalSession/changeGlobalStatus`
- Purpose: change global transaction status.
- Parameters: `xid`
- Response: `SingleResult<Void>`

### <a id="adm-query-global-lock"></a>3.12 Query Global Lock
- Request: `GET /api/v1/console/globalLock/query`
- Purpose: page query global locks.
- Parameter source: `@ModelAttribute GlobalLockParam`

| Field | Type | Note |
|---|---|---|
| pageNum | int | pagination parameter |
| pageSize | int | pagination parameter |
| timeStart | long | start of time range |
| timeEnd | long | end of time range |
| xid | string | filter condition |
| tableName | string | filter condition |
| transactionId | string | filter condition |
| branchId | string | filter condition |
| pk | string | filter condition |
| resourceId | string | filter condition |

- Response: `PageResult<GlobalLockVO>`

### <a id="adm-delete-global-lock"></a>3.13 Delete Global Lock
- Request: `DELETE /api/v1/console/globalLock/delete`
- Purpose: delete global lock.
- Parameter source: `@ModelAttribute GlobalLockParam`
- Response: `SingleResult<Void>`

### <a id="adm-check-global-lock"></a>3.14 Check Global Lock
- Request: `GET /api/v1/console/globalLock/check`
- Purpose: check whether a specified branch has a lock.
- Parameters: `xid`, `branchId` (default binding)
- Response: `SingleResult<Boolean>`

---

## 4. server open-api (detailed)

### <a id="srv-health-check"></a>4.1 Health Check
- Request: `/health` (`@RequestMapping`, recommended to call with GET)
- Purpose: return server startup status.
- Parameters: none
- Response: `String`, value is `ok` or `not_ok`

### <a id="srv-change-cluster"></a>4.2 Change Cluster
- Request: `POST /metadata/v1/changeCluster`
- Purpose: change raft peers configuration.
- Parameters:

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| raftClusterStr | string | Y | query (`@RequestParam`) | jraft `Configuration#parse` format |

- Response: `Result<?>`
- Notes: when parsing fails, only `message` is set, and `code` may still remain the default `200`.

### <a id="srv-cluster"></a>4.3 Query Cluster Metadata
- Request: `GET /metadata/v1/cluster`
- Purpose: fetch `storeMode/term/nodes` for a group.
- Parameters:

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| group | string | N | query (default binding) | if empty, fallback to `server.raft.group`, default `default` |

- Response: `MetadataResponse`

| Field | Type |
|---|---|
| storeMode | string |
| term | long |
| nodes | List<Node> |

### <a id="srv-watch"></a>4.4 Watch Metadata
- Request: `POST /metadata/v1/watch`
- Purpose: subscribe to changes by group+term.
- Parameters:

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| groupTerms | map | Y | body (`@RequestBody`) | key=group, value=term |
| timeout | int | N | query (`@RequestParam`) | default `28000` |
| context | HttpContext | framework-injected | method arg | not user input |

- Response: `void` (asynchronous)
- Notes: term is converted using `Long.parseLong(String.valueOf(term))`.

### <a id="srv-add-vgroup"></a>4.5 Add VGroup
- Request: `GET /vgroup/v1/addVGroup`
- Purpose: add vGroup mapping (side effect).
- Parameters: `vGroup`, `unit` (`@RequestParam`)
- Response: `Result<?>`
- Notes: in non-raft mode, local term is refreshed using `System.currentTimeMillis()`.

### <a id="srv-remove-vgroup"></a>4.6 Remove VGroup
- Request: `GET /vgroup/v1/removeVGroup`
- Purpose: remove vGroup mapping (side effect).
- Parameters: `vGroup` (`@RequestParam`)
- Response: `Result<?>`
- Notes: in non-raft mode, local term is refreshed.

---

## 5. Common Response Structures

### 5.1 Result
| Field | Type | Note |
|---|---|---|
| code | string | default `200` |
| message | string | default `success` |

### 5.2 SingleResult
| Field | Type | Note |
|---|---|---|
| code | string | inherits from `Result` |
| message | string | inherits from `Result` |
| data | any | business payload |

### 5.3 PageResult
| Field | Type | Note |
|---|---|---|
| code | string | inherits from `Result` |
| message | string | inherits from `Result` |
| data | list | current page data |
| total | int | total records |
| pages | int | total pages |
| pageNum | int | current page |
| pageSize | int | page size |

---
