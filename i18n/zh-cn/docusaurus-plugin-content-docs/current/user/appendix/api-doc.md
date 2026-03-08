---
title: API 接口文档
keywords: [Seata API, NamingServer API, Server API, Open API, Admin API]
description: Seata namingserver open-api、server admin-api、server open-api 接口说明
---

# Seata API 文档

## 1. API Overview

### 1.1 namingserver open-api

| API | Method | Path | Description | Detail |
|---|---|---|---|---|
| Health Check | GET | `/naming/v1/health` | namingserver 健康检查 | [查看](#ns-health-check) |
| Register Instance | POST | `/naming/v1/register` `/api/v1/naming/register` | 注册单节点 | [查看](#ns-register-instance) |
| Batch Register | POST | `/naming/v1/batchRegister` `/api/v1/naming/batchRegister` | 批量注册节点 | [查看](#ns-batch-register) |
| Unregister Instance | POST | `/naming/v1/unregister` `/api/v1/naming/unregister` | 注销单节点 | [查看](#ns-unregister-instance) |
| Cluster Monitor | GET | `/naming/v1/clusters` `/api/v1/naming/clusters` | 查询集群监控视图 | [查看](#ns-clusters) |
| Cluster Data | GET | `/naming/v1/clusterData` `/api/v1/naming/clusterData` | 查询单集群原始数据 | [查看](#ns-cluster-data) |
| Discovery | GET | `/naming/v1/discovery` `/api/v1/naming/discovery` | 按 vGroup 发现集群 | [查看](#ns-discovery) |
| Add Group | POST | `/naming/v1/addGroup` `/api/v1/naming/addGroup` | 新增 vGroup 映射 | [查看](#ns-add-group) |
| Change Group | POST | `/naming/v1/changeGroup` `/api/v1/naming/changeGroup` | 切换 vGroup 映射 | [查看](#ns-change-group) |
| Namespace (v1) | GET | `/naming/v1/namespace` `/api/v1/naming/namespace` | namespace 概览(v1) | [查看](#ns-namespace-v1) |
| Watch | POST | `/naming/v1/watch` `/api/v1/naming/watch` | 长轮询订阅 vGroup 变化 | [查看](#ns-watch) |
| Watch List | GET | `/naming/v1/watchList` `/api/v1/naming/watchList` | 当前 watch 列表 | [查看](#ns-watch-list) |
| Namespace (v2) | GET | `/naming/v2/namespace` `/api/v2/naming/namespace` | namespace 概览(v2) | [查看](#ns-namespace-v2) |

### 1.2 server admin-api

| API | Method | Path | Description | Detail |
|---|---|---|---|---|
| Delete Branch Session | DELETE | `/api/v1/console/branchSession/deleteBranchSession` | 删除分支会话 | [查看](#adm-delete-branch-session) |
| Force Delete Branch Session | DELETE | `/api/v1/console/branchSession/forceDeleteBranchSession` | 强制删除分支会话 | [查看](#adm-force-delete-branch-session) |
| Stop Branch Session | PUT | `/api/v1/console/branchSession/stopBranchSession` | 停止分支重试 | [查看](#adm-stop-branch-session) |
| Start Branch Session | PUT | `/api/v1/console/branchSession/startBranchSession` | 启动分支重试 | [查看](#adm-start-branch-session) |
| Query Global Session | GET | `/api/v1/console/globalSession/query` | 分页查询全局会话 | [查看](#adm-query-global-session) |
| Delete Global Session | DELETE | `/api/v1/console/globalSession/deleteGlobalSession` | 删除全局会话 | [查看](#adm-delete-global-session) |
| Force Delete Global Session | DELETE | `/api/v1/console/globalSession/forceDeleteGlobalSession` | 强制删除全局会话 | [查看](#adm-force-delete-global-session) |
| Stop Global Session | PUT | `/api/v1/console/globalSession/stopGlobalSession` | 停止全局重试 | [查看](#adm-stop-global-session) |
| Start Global Session | PUT | `/api/v1/console/globalSession/startGlobalSession` | 启动全局重试 | [查看](#adm-start-global-session) |
| Send Commit/Rollback | PUT | `/api/v1/console/globalSession/sendCommitOrRollback` | 手工触发提交或回滚下发 | [查看](#adm-send-commit-rollback) |
| Change Global Status | PUT | `/api/v1/console/globalSession/changeGlobalStatus` | 修改全局状态 | [查看](#adm-change-global-status) |
| Query Global Lock | GET | `/api/v1/console/globalLock/query` | 分页查询全局锁 | [查看](#adm-query-global-lock) |
| Delete Global Lock | DELETE | `/api/v1/console/globalLock/delete` | 删除全局锁 | [查看](#adm-delete-global-lock) |
| Check Global Lock | GET | `/api/v1/console/globalLock/check` | 检查分支是否存在锁 | [查看](#adm-check-global-lock) |

### 1.3 server open-api

| API | Method | Path | Description | Detail |
|---|---|---|---|---|
| Server Health Check | GET (recommended) | `/health` | server 健康检查 | [查看](#srv-health-check) |
| Change Cluster | POST | `/metadata/v1/changeCluster` | 变更 raft peers | [查看](#srv-change-cluster) |
| Query Cluster Metadata | GET | `/metadata/v1/cluster` | 查询 leader/term/nodes/storeMode | [查看](#srv-cluster) |
| Watch Metadata | POST | `/metadata/v1/watch` | 长轮询订阅 group 变化 | [查看](#srv-watch) |
| Add VGroup | GET | `/vgroup/v1/addVGroup` | 新增 vGroup 映射 | [查看](#srv-add-vgroup) |
| Remove VGroup | GET | `/vgroup/v1/removeVGroup` | 删除 vGroup 映射 | [查看](#srv-remove-vgroup) |

---

## 2. namingserver open-api

### <a id="ns-health-check"></a>2.1 Health Check
- 作用：返回 namingserver 可用状态。
- 请求：`GET /naming/v1/health`
- 参数：无
- 返回：`Result<?>`
- 说明：返回体默认 `code="200"`、`message="success"`。

### <a id="ns-register-instance"></a>2.2 Register Instance
- 作用：注册单个 `NamingServerNode` 到指定 `namespace + clusterName + unit`。
- 请求：`POST /naming/v1/register` 或 `POST /api/v1/naming/register`
- Query 参数：

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| namespace | string | Y | query (`@RequestParam`) | 命名空间 |
| clusterName | string | Y | query (`@RequestParam`) | 集群名 |
| unit | string | Y | query (`@RequestParam`) | 单元名 |

- Body：`NamingServerNode`

| Field | Type | Required | Note |
|---|---|---|---|
| control | object | N | 控制端点 |
| transaction | object | N | 事务端点 |
| internal | object | N | 内部端点 |
| role | string | N | 节点角色 |
| version | string | N | 版本 |
| metadata | object | N | 扩展元数据 |
| weight | number | N | 权重 |
| healthy | boolean | N | 健康状态 |
| term | long | N | 节点 term |
| unit | string | N | 节点 unit |

- 返回：`Result<String>`
- 说明：失败通常通过 `code=500` 表达，HTTP 仍可能是 200。

### <a id="ns-batch-register"></a>2.3 Batch Register
- 作用：批量注册节点。
- 请求：`POST /naming/v1/batchRegister` 或 `POST /api/v1/naming/batchRegister`
- Query 参数：`namespace`、`clusterName`（均必填，`@RequestParam`）
- Body：`List<NamingServerNode>`
- 返回：`Result<String>`

### <a id="ns-unregister-instance"></a>2.4 Unregister Instance
- 作用：注销单节点。
- 请求：`POST /naming/v1/unregister` 或 `POST /api/v1/naming/unregister`
- Query 参数：`namespace`、`clusterName`、`unit`（必填）
- Body：`NamingServerNode`
- 返回：`Result<String>`

### <a id="ns-clusters"></a>2.5 Cluster Monitor
- 作用：查询 namespace 下的集群监控视图。
- 请求：`GET /naming/v1/clusters` 或 `GET /api/v1/naming/clusters`
- 参数：

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| namespace | string | Y (recommended) | query (默认绑定) | 方法参数未显式 `@RequestParam` |

- 返回：`List<ClusterVO>`（`clusterName`、`clusterType`、`vGroupMapping`、`unitData`）

### <a id="ns-cluster-data"></a>2.6 Cluster Data
- 作用：查询单个 cluster 原始数据。
- 请求：`GET /naming/v1/clusterData` 或 `GET /api/v1/naming/clusterData`
- 参数：`namespace`、`clusterName`（均必填，`@RequestParam`）
- 返回：`SingleResult<ClusterData>`
- 说明：找不到集群时 `SingleResult.failure("Cluster not found")`。

### <a id="ns-discovery"></a>2.7 Discovery
- 作用：按 `vGroup + namespace` 发现 cluster 列表。
- 请求：`GET /naming/v1/discovery` 或 `GET /api/v1/naming/discovery`
- 参数：`vGroup`、`namespace`（均必填）
- 返回：`MetaResponse`

| Field | Type | Note |
|---|---|---|
| clusterList | list | 匹配到的集群列表 |
| term | long | 当前 vGroup 的 term |

### <a id="ns-add-group"></a>2.8 Add Group
- 作用：创建 vGroup 到 cluster 的映射。
- 请求：`POST /naming/v1/addGroup` 或 `POST /api/v1/naming/addGroup`
- 参数：

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| namespace | string | Y | query (`@RequestParam`) | 命名空间 |
| clusterName | string | Y | query (`@RequestParam`) | 目标集群 |
| unitName | string | N | query (默认绑定) | 未显式注解，可空 |
| vGroup | string | Y | query (`@RequestParam`) | 事务组 |

- 返回：`Result<String>`

### <a id="ns-change-group"></a>2.9 Change Group
- 作用：将 vGroup 切换到新 cluster。
- 请求：`POST /naming/v1/changeGroup` 或 `POST /api/v1/naming/changeGroup`
- 参数：`namespace`、`clusterName`、`vGroup`（必填）+ `unitName`（可选，默认 `""`）
- 返回：`Result<String>`

### <a id="ns-namespace-v1"></a>2.10 Namespace (v1)
- 作用：返回 namespace 聚合信息。
- 请求：`GET /naming/v1/namespace` 或 `GET /api/v1/naming/namespace`
- 参数：无
- 返回：`SingleResult<Map<String, NamespaceVO>>`

| NamespaceVO Field | Type |
|---|---|
| clusters | List<String> |
| vgroups | List<String> |

### <a id="ns-watch"></a>2.11 Watch
- 作用：订阅指定 vGroup 的变更（长轮询）。
- 请求：`POST /naming/v1/watch` 或 `POST /api/v1/naming/watch`
- 参数：

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| clientTerm | string | Y | query (`@RequestParam`) | 需可转 `long` |
| vGroup | string | Y | query (`@RequestParam`) | 事务组 |
| timeout | string | Y | query (`@RequestParam`) | 需可转 `int` |

- 返回：`void`（异步）
- 关键行为：
  - 使用 `request.startAsync()` 开启异步。
  - `AsyncContext` timeout 被设为 `0`（容器无限超时）。
  - 真实等待窗口由 `timeout` 参数传入 watcher。

### <a id="ns-watch-list"></a>2.12 Watch List
- 作用：查看已注册 watcher。
- 请求：`GET /naming/v1/watchList` 或 `GET /api/v1/naming/watchList`
- 参数：无
- 返回：`List<WatcherVO>`（`vGroup`、`watcherIp`）

### <a id="ns-namespace-v2"></a>2.13 Namespace (v2)
- 作用：返回 v2 结构 namespace 聚合信息。
- 请求：`GET /naming/v2/namespace` 或 `GET /api/v2/naming/namespace`
- 参数：无
- 返回：`SingleResult<Map<String, org.apache.seata.namingserver.entity.vo.v2.NamespaceVO>>`

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
- 请求：`DELETE /api/v1/console/branchSession/deleteBranchSession`
- 作用：删除分支会话。
- 参数：`xid`、`branchId`（默认绑定，推荐 query/form 传递）
- 返回：`SingleResult<Void>`

### <a id="adm-force-delete-branch-session"></a>3.2 Force Delete Branch Session
- 请求：`DELETE /api/v1/console/branchSession/forceDeleteBranchSession`
- 作用：强制删除分支会话。
- 参数：`xid`、`branchId`
- 返回：`SingleResult<Void>`

### <a id="adm-stop-branch-session"></a>3.3 Stop Branch Session
- 请求：`PUT /api/v1/console/branchSession/stopBranchSession`
- 作用：停止分支重试。
- 参数：`xid`、`branchId`
- 返回：`SingleResult<Void>`

### <a id="adm-start-branch-session"></a>3.4 Start Branch Session
- 请求：`PUT /api/v1/console/branchSession/startBranchSession`
- 作用：启动分支重试。
- 参数：`xid`、`branchId`
- 返回：`SingleResult<Void>`

### <a id="adm-query-global-session"></a>3.5 Query Global Session
- 请求：`GET /api/v1/console/globalSession/query`
- 作用：分页查询全局会话。
- 参数来源：`@ModelAttribute GlobalSessionParam`（query 绑定）

| Field | Type | Note |
|---|---|---|
| pageNum | int | 分页参数 |
| pageSize | int | 分页参数 |
| timeStart | long | 时间区间开始 |
| timeEnd | long | 时间区间结束 |
| xid | string | 过滤条件 |
| applicationId | string | 过滤条件 |
| status | int | 过滤条件 |
| transactionName | string | 过滤条件 |
| vgroup | string | 过滤条件 |
| withBranch | boolean | 是否带分支明细 |

- 返回：`PageResult<GlobalSessionVO>`

### <a id="adm-delete-global-session"></a>3.6 Delete Global Session
- 请求：`DELETE /api/v1/console/globalSession/deleteGlobalSession`
- 作用：删除全局会话。
- 参数：`xid`
- 返回：`SingleResult<Void>`

### <a id="adm-force-delete-global-session"></a>3.7 Force Delete Global Session
- 请求：`DELETE /api/v1/console/globalSession/forceDeleteGlobalSession`
- 作用：强制删除全局会话。
- 参数：`xid`
- 返回：`SingleResult<Void>`

### <a id="adm-stop-global-session"></a>3.8 Stop Global Session
- 请求：`PUT /api/v1/console/globalSession/stopGlobalSession`
- 作用：停止全局重试。
- 参数：`xid`
- 返回：`SingleResult<Void>`

### <a id="adm-start-global-session"></a>3.9 Start Global Session
- 请求：`PUT /api/v1/console/globalSession/startGlobalSession`
- 作用：启动全局重试。
- 参数：`xid`
- 返回：`SingleResult<Void>`

### <a id="adm-send-commit-rollback"></a>3.10 Send Commit/Rollback
- 请求：`PUT /api/v1/console/globalSession/sendCommitOrRollback`
- 作用：手工触发提交/回滚下发。
- 参数：`xid`
- 返回：`SingleResult<Void>`

### <a id="adm-change-global-status"></a>3.11 Change Global Status
- 请求：`PUT /api/v1/console/globalSession/changeGlobalStatus`
- 作用：修改全局事务状态。
- 参数：`xid`
- 返回：`SingleResult<Void>`

### <a id="adm-query-global-lock"></a>3.12 Query Global Lock
- 请求：`GET /api/v1/console/globalLock/query`
- 作用：分页查询全局锁。
- 参数来源：`@ModelAttribute GlobalLockParam`

| Field | Type | Note |
|---|---|---|
| pageNum | int | 分页参数 |
| pageSize | int | 分页参数 |
| timeStart | long | 时间区间开始 |
| timeEnd | long | 时间区间结束 |
| xid | string | 过滤条件 |
| tableName | string | 过滤条件 |
| transactionId | string | 过滤条件 |
| branchId | string | 过滤条件 |
| pk | string | 过滤条件 |
| resourceId | string | 过滤条件 |

- 返回：`PageResult<GlobalLockVO>`

### <a id="adm-delete-global-lock"></a>3.13 Delete Global Lock
- 请求：`DELETE /api/v1/console/globalLock/delete`
- 作用：删除全局锁。
- 参数来源：`@ModelAttribute GlobalLockParam`
- 返回：`SingleResult<Void>`

### <a id="adm-check-global-lock"></a>3.14 Check Global Lock
- 请求：`GET /api/v1/console/globalLock/check`
- 作用：检查指定分支是否存在锁。
- 参数：`xid`、`branchId`（默认绑定）
- 返回：`SingleResult<Boolean>`

---

## 4. server open-api（详细）

### <a id="srv-health-check"></a>4.1 Health Check
- 请求：`/health`（`@RequestMapping`，建议按 GET 调用）
- 作用：返回 server 启动状态。
- 参数：无
- 返回：`String`，值为 `ok` 或 `not_ok`

### <a id="srv-change-cluster"></a>4.2 Change Cluster
- 请求：`POST /metadata/v1/changeCluster`
- 作用：变更 raft peers 配置。
- 参数：

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| raftClusterStr | string | Y | query (`@RequestParam`) | jraft `Configuration#parse` 格式 |

- 返回：`Result<?>`
- 注意：解析失败时仅设置 `message`，`code` 可能仍保持默认 `200`。

### <a id="srv-cluster"></a>4.3 Query Cluster Metadata
- 请求：`GET /metadata/v1/cluster`
- 作用：获取 group 的 `storeMode/term/nodes`。
- 参数：

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| group | string | N | query (默认绑定) | 为空时回退 `server.raft.group`，默认 `default` |

- 返回：`MetadataResponse`

| Field | Type |
|---|---|
| storeMode | string |
| term | long |
| nodes | List<Node> |

### <a id="srv-watch"></a>4.4 Watch Metadata
- 请求：`POST /metadata/v1/watch`
- 作用：按 group+term 订阅变更。
- 参数：

| Name | Type | Required | Source | Note |
|---|---|---|---|---|
| groupTerms | map | Y | body (`@RequestBody`) | key=group, value=term |
| timeout | int | N | query (`@RequestParam`) | 默认 `28000` |
| context | HttpContext | 框架注入 | method arg | 非用户传入 |

- 返回：`void`（异步）
- 注意：term 会执行 `Long.parseLong(String.valueOf(term))` 转换。

### <a id="srv-add-vgroup"></a>4.5 Add VGroup
- 请求：`GET /vgroup/v1/addVGroup`
- 作用：新增 vGroup 映射（有副作用）。
- 参数：`vGroup`、`unit`（`@RequestParam`）
- 返回：`Result<?>`
- 注意：非 raft 模式会刷新本机 term（`System.currentTimeMillis()`）。

### <a id="srv-remove-vgroup"></a>4.6 Remove VGroup
- 请求：`GET /vgroup/v1/removeVGroup`
- 作用：删除 vGroup 映射（有副作用）。
- 参数：`vGroup`（`@RequestParam`）
- 返回：`Result<?>`
- 注意：非 raft 模式会刷新本机 term。

---

## 5. 通用返回结构

### 5.1 Result
| Field | Type | Note |
|---|---|---|
| code | string | 默认 `200` |
| message | string | 默认 `success` |

### 5.2 SingleResult
| Field | Type | Note |
|---|---|---|
| code | string | 继承 `Result` |
| message | string | 继承 `Result` |
| data | any | 业务数据 |

### 5.3 PageResult
| Field | Type | Note |
|---|---|---|
| code | string | 继承 `Result` |
| message | string | 继承 `Result` |
| data | list | 当前页数据 |
| total | int | 总条数 |
| pages | int | 总页数 |
| pageNum | int | 当前页 |
| pageSize | int | 页大小 |

---
