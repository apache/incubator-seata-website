---
title: Seata-Go Saga Design and Practice
description: In-depth understanding of the design philosophy and implementation details of Saga mode in Seata-Go
authors: [seata]
tags: [seata, saga, distributed-transaction, golang]
---

## Saga Execution Mode
### Core Components and Interaction Relationships in Saga Mode Distributed Transactions
#### Architecture Diagram
![](https://cdn.nlark.com/yuque/0/2025/png/40375112/1748847880143-1fd39b3e-eb9c-4dee-836d-6fd3ff498b3b.png)
+ **TM (Transaction Manager)**: Responsible for initiating, committing, or rolling back global transactions. It serves as the entry point and manager for global transactions.
+ **TC (Transaction Coordinator)**: Acts as the core hub, interacting with TM to receive transaction instructions while managing RM and Saga state machines. It coordinates various branch transactions, records transaction states, and plays a coordinating role in distributed transactions.
+ **RM (Resource Manager)**: Manages specific resources such as database connections. It collaborates with Saga state machines to operate on resources during transaction execution and perform compensation operations when needed.
+ **Saga State Machine**: Defines the transaction execution flow and state transition logic. It drives various services to execute in sequence through interaction with RM, and performs rollback operations according to predefined compensation logic when transactions fail. The Saga state machine manages a series of states and transition rules to ensure consistency in distributed transactions.

#### Transaction Initiation Flow
![](https://cdn.nlark.com/yuque/0/2025/png/40375112/1748847837996-784d92d4-1ef5-40cb-af0c-13c2e7c6bd04.png)

1. **TM Initiates Global Transaction**: The transaction manager sends a request to the transaction coordinator to begin a global transaction.
2. **TC Initializes State Machine**: After receiving the request, the transaction coordinator initializes the Saga state machine, preparing the initial state and configuration for subsequent transaction execution.
3. **Saga Registers Branch Transaction**: The Saga state machine sends a request to the resource manager to register a branch transaction. RM processes the registration request and provides successful registration feedback to the Saga state machine.
4. **TC Returns Transaction Start Success**: After confirming that branch transaction registration and other preparatory work are completed successfully, the transaction coordinator provides transaction start success feedback to the transaction manager.

#### Transaction Execution Flow
![](https://cdn.nlark.com/yuque/0/2025/png/40375112/1748847870301-aa01c714-c43e-4935-85e6-08b2c36f2300.png)

1. **TM Requests Transaction Execution**: The transaction manager sends transaction execution instructions to the transaction coordinator.
2. **TC Starts State Machine**: After receiving the instructions, the transaction coordinator starts the Saga state machine.
3. **Saga Executes Services**: The Saga state machine calls resource managers RM1, RM2, etc., corresponding to services (such as Service 1, Service 2) in sequence according to the predefined flow. RM executes the corresponding services and returns execution results to the Saga state machine.
4. **TC Returns State Machine Execution Completion**: After the Saga state machine completes all predefined services, the transaction coordinator provides state machine execution completion feedback to the transaction manager.

#### Transaction Compensation Flow
![](https://cdn.nlark.com/yuque/0/2025/png/40375112/1748847898368-08478d6d-d2dc-439a-9979-bb2dbeb79ec9.png)

1. **TM Notifies Transaction Failure**: When the transaction manager detects transaction execution failure, it sends a transaction failure notification to the transaction coordinator.
2. **TC Triggers Compensation**: After receiving the notification, the transaction coordinator triggers the Saga state machine's compensation mechanism.
3. **Saga Executes Compensation**: The Saga state machine calls resource managers RM2, RM1, etc., in reverse order of execution to perform compensation operations (such as executing Compensation 2, Compensation 1). RM executes compensation operations and returns compensation results to the Saga state machine.
4. **TC Returns Compensation Completion**: After the Saga state machine completes all compensation operations, the transaction coordinator provides compensation completion feedback to the transaction manager.

#### How Saga Works


![](https://cdn.nlark.com/yuque/__mermaid_v3/1d0aa5d95def65c333d8b2ab8865d57c.svg)

##### Process Handling
![](https://cdn.nlark.com/yuque/__mermaid_v3/d3a76fa8cbe48857c0f06254ddb539a9.svg)

###### 1. Process Control
`Process Control` is the core of the entire architecture, coordinating and managing the execution of the entire flow. In the code, the `Process` method of the `ProcessControllerImpl` struct embodies this functionality:

```go
func (p *ProcessControllerImpl) Process(ctx context.Context, context ProcessContext) error {
    if err := p.businessProcessor.Process(ctx, context); err != nil {
        return err
    }
    if err := p.businessProcessor.Route(ctx, context); err != nil {
        return err
    }
    return nil
}
```

This method first calls `businessProcessor.Process` to handle business logic, then calls `businessProcessor.Route` for routing processing, ensuring the flow executes in sequence.

###### 2. Process Types
`Process Types` are used to distinguish different flow types. In the code, the `ProcessType` type is defined, currently with only one type `StateLang`:

```go
type ProcessType string

const (
    StateLang ProcessType = "STATE_LANG" // SEATA State Language
)
```

The `matchProcessType` method of the `DefaultBusinessProcessor` struct matches the corresponding `ProcessType` based on variables in the `ProcessContext`:

```go
func (d *DefaultBusinessProcessor) matchProcessType(processContext ProcessContext) process.ProcessType {
    ok := processContext.HasVariable(constant.VarNameProcessType)
    if ok {
        return processContext.GetVariable(constant.VarNameProcessType).(process.ProcessType)
    }
    return process.StateLang
}
```

###### 3. State Handlers
`State Handlers` are responsible for handling different types of states. In the code, the `StateMachineProcessHandler` struct manages all state handlers:

```go
type StateMachineProcessHandler struct {
    mp map[string]StateHandler
    mu sync.RWMutex
}

func (s *StateMachineProcessHandler) Process(ctx context.Context, processContext ProcessContext) error {
    stateInstruction, _ := processContext.GetInstruction().(StateInstruction)
    state, err := stateInstruction.GetState(processContext)
    if err != nil {
        return err
    }
    stateType := state.Type()
    stateHandler := s.GetStateHandler(stateType)
    if stateHandler == nil {
        return errors.New("Not support [" + stateType + "] state handler")
    }
    // ...
    return stateHandler.Process(ctx, processContext)
}
```

This method obtains the corresponding state handler based on the current state type and calls its `Process` method for processing.

###### 4. Specific State Handlers
+ **Service Task Handler**: Handles service task states. In the code, the `ServiceTaskStateHandler` struct implements this functionality:

```go
type ServiceTaskStateHandler struct {
    interceptors []core.StateHandlerInterceptor
}

func (s *ServiceTaskStateHandler) Process(ctx context.Context, processContext core.ProcessContext) error {
    // ...
    serviceTaskStateImpl, ok := stateInterface.(*state.ServiceTaskStateImpl)
    // ...
    // Call service task and record result
    result, resultErr := serviceInvoker.Invoke(ctx, input, serviceTaskStateImpl)
    // ...
    return nil
}
```

This method obtains service task state information from `ProcessContext`, calls the corresponding service invoker to execute the service task, and records the execution result.

+ **Choice Handler**: Handles choice states. Based on choice state configuration information, it selects the next state to execute according to conditions.
+ **Script Handler**: Handles script states. Responsible for executing script tasks.

##### Task Processing
![](https://cdn.nlark.com/yuque/__mermaid_v3/5621a24183de1876d3263a07c72b5862.svg)

###### Client Initiates Processing Request
![](https://cdn.nlark.com/yuque/__mermaid_v3/90ff4bd097157d433f8ba9a33f765aa7.svg)

+ **Explanation**: The client needs to execute a business flow and sends a `Process` request to the handler. This request may contain initial parameters and configuration information needed to execute the business flow.
+ **Code Correspondence**: In the `Process` method of `ServiceTaskStateHandler`, obtaining state instructions and state information from `ProcessContext` and starting to handle service tasks can be seen as the processing starting point after receiving a client request.

```go
func (s *ServiceTaskStateHandler) Process(ctx context.Context, processContext core.ProcessContext) error {
    stateInstruction, ok := processContext.GetInstruction().(core.StateInstruction)
    if !ok {
        return errors.New("invalid state instruction from processContext")
    }
    stateInterface, err := stateInstruction.GetState(processContext)
    if err != nil {
        return err
    }
    // ...
}
```

###### 2. Handler Calls Service


![](https://cdn.nlark.com/yuque/__mermaid_v3/550a6736260570f7b62886b7ca814154.svg)

+ **Explanation**: After receiving the client request, the handler calls the corresponding service based on the information in the request. The service here can be various types of business services, such as HTTP services, GRPC services, etc.
+ **Code Correspondence**: In the `Process` method of `ServiceTaskStateHandler`, if the current state is not a sub-state machine compensation state, it obtains the service invoker and calls the corresponding service.

```go
stateMachineConfig, ok := processContext.GetVariable(constant.VarNameStateMachineConfig).(core.StateMachineConfig)
if !ok {
    handleResultErr(errors.New("invalid stateMachineConfig type from processContext"))
    return nil
}

serviceInvoker := stateMachineConfig.ServiceInvokerManager().ServiceInvoker(serviceTaskStateImpl.ServiceType())
if serviceInvoker == nil {
    resultErr = exception.NewEngineExecutionException(seataErrors.ObjectNotExists,
        "No such ServiceInvoker["+serviceTaskStateImpl.ServiceType()+"]", nil)
    handleResultErr(resultErr)
    return nil
}

result, resultErr = serviceInvoker.Invoke(ctx, input, serviceTaskStateImpl)
```

###### 3. Service Returns Processing Result
![](https://cdn.nlark.com/yuque/__mermaid_v3/4405e8d32a332213f83389d04171442e.svg)

+ **Explanation**: After receiving the handler's call request, the service executes the corresponding business logic and returns the processing result to the handler.
+ **Code Correspondence**: In the `Invoke` method of `HTTPInvoker`, it calls the `Call` method of `HTTPClient` to execute HTTP requests and returns the processing result.

```go
func (h *HTTPInvoker) Invoke(ctx context.Context, input []any, service state.ServiceTaskState) (output []reflect.Value, err error) {
    serviceTaskStateImpl := service.(*state.ServiceTaskStateImpl)
    client := h.GetClient(serviceTaskStateImpl.ServiceName())
    if client == nil {
        return nil, fmt.Errorf("no http client %s for service task state", serviceTaskStateImpl.ServiceName())
    }

    if serviceTaskStateImpl.IsAsync() {
        go func() {
            _, err := client.Call(ctx, serviceTaskStateImpl, input)
            if err != nil {
                log.Errorf("invoke Service[%s].%s failed, err is %s", serviceTaskStateImpl.ServiceName(),
                    serviceTaskStateImpl.ServiceMethod(), err)
            }
        }()
        return nil, nil
    }

    return client.Call(ctx, serviceTaskStateImpl, input)
}
```

###### 4. Handler Updates State to Storage
![](https://cdn.nlark.com/yuque/__mermaid_v3/7daf32088e24b20d5527b781a4e51c49.svg)



+ **Explanation**: After receiving the service processing result, the handler updates the business flow state based on the result and stores the updated state information in storage (such as database, file system, etc.).
+ **Code Correspondence**: The `StateLogStore` interface defines a series of methods for recording state information, such as `RecordStateMachineStarted`, `RecordStateMachineFinished`, etc. Handlers can call these methods to store state information in storage.

```go
type StateLogStore interface {
    RecordStateMachineStarted(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error
    RecordStateMachineFinished(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error
    // ...
}
```

###### 5. Storage Returns Update Success Information
![](https://cdn.nlark.com/yuque/__mermaid_v3/8ab7bc4f4cda49e98d26b4a0c727d266.svg)

+ **Explanation**: After receiving the handler's state update request, storage saves the state information to the appropriate storage medium and returns update success information to the handler.
+ **Code Correspondence**: In specific implementations of `StateLogStore`, such as the `StateLogStore` struct created by the `NewStateLogStore` function, it implements the specific logic for recording state information. When recording is successful, it can be considered as returning update success information.

###### 6. Handler Returns Processing Completion Information to Client
![](https://cdn.nlark.com/yuque/__mermaid_v3/ca5dc96b7724cc1c3ec322003a2efa1b.svg)

+ **Explanation**: After receiving update success information from storage, the handler confirms that the business flow state has been updated and returns processing completion information to the client, indicating that the entire business flow has been processed.
+ **Code Correspondence**: In the `Process` method of `ServiceTaskStateHandler`, when the service call is successful and the result is recorded, the method returns normally, which can be seen as returning processing completion information to the client.

```go
log.Debugf("<<<<<<<<<<<<<<<<<<<<<< State[%s], ServiceName[%s], Method[%s] Execute finish. result: %s",
    serviceTaskStateImpl.Name(), serviceName, methodName, result)

if result != nil {
    stateInstance.SetOutputParams(result)
    hierarchicalProcessContext, ok := processContext.(core.HierarchicalProcessContext)
    if !ok {
        handleResultErr(errors.New("invalid hierarchical process context type from processContext"))
        return nil
    }

    hierarchicalProcessContext.SetVariable(constant.VarNameOutputParams, result)
}

return nil
```

This sequence diagram describes a complete business processing flow from client request initiation, through handler calling services, service returning results, handler updating state to storage, and finally returning processing completion information to the client. In the code, the functions of various participants are implemented through different structs and methods, collaborating to complete the entire business flow.

##### Sub-State Machine Compensation
The sub-state machine compensation flow involves four participants: Parent state machine, Handler, SubMachine, and Store.

![](https://cdn.nlark.com/yuque/__mermaid_v3/322f1127968d6a4c48be34127f55b1f8.svg)

###### Parent State Machine Initiates Compensation Request
![](https://cdn.nlark.com/yuque/__mermaid_v3/8b00226b32af7f13ec38ac09ca10ccce.svg)

+ **Explanation**: The parent state machine detects the need for compensation operation and sends a `Compensate` request to the handler. This request is usually triggered when exceptions occur during business flow execution or when rollback is needed.
+ **Code Correspondence**: The `compensateInternal` method in `saga/statemachine/engine/core/process_ctrl_statemachine_engine.go` can be seen as the entry point for handling compensation requests. This method receives state machine instance ID and replacement parameters, preparing the context information needed for compensation operations.

```go
func (p ProcessCtrlStateMachineEngine) compensateInternal(ctx context.Context, stateMachineInstId string, replaceParams map[string]any,
    async bool, callback CallBack) (statelang.StateMachineInstance, error) {
    stateMachineInstance, err := p.reloadStateMachineInstance(ctx, stateMachineInstId)
    if err != nil {
        return nil, err
    }
    // ...
    contextBuilder := NewProcessContextBuilder().WithProcessType(process.StateLang).
        WithOperationName(constant.OperationNameCompensate).WithAsyncCallback(callback).
        WithStateMachineInstance(stateMachineInstance).
        WithStateMachineConfig(p.StateMachineConfig).WithStateMachineEngine(p).WithIsAsyncExecution(async)
    context := contextBuilder.Build()
    // ...
    if async {
        _, err := p.StateMachineConfig.AsyncEventPublisher().PushEvent(ctx, context)
        if err != nil {
            return nil, err
        }
    } else {
        _, err := p.StateMachineConfig.EventPublisher().PushEvent(ctx, context)
        if err != nil {
            return nil, err
        }
    }
    return stateMachineInstance, nil
}
```

###### Handler Gets Sub-State Machine Information from Storage
![](https://cdn.nlark.com/yuque/__mermaid_v3/cff0029c40e97cb4a1d60158e2e3591a.svg)

+ **Explanation**: After receiving the compensation request from the parent state machine, the handler needs to get sub-state machine related information, so it sends a `Get SubMachine` request to storage. Storage receives the request and returns sub-state machine information to the handler.
+ **Code Correspondence**: The `scanRowsToStateMachineInstance` method in `saga/statemachine/store/db/statelog.go` can be used to get state machine instance information from the database. Handlers can get sub-state machine information by calling storage-related interfaces.

```go
func scanRowsToStateMachineInstance(rows *sql.Rows) (statelang.StateMachineInstance, error) {
    stateMachineInstance := statelang.NewStateMachineInstanceImpl()
    var id, machineId, tenantId, parentId, businessKey, started, end, status, compensationStatus,
        updated, startParams, endParams sql.NullString
    var isRunning sql.NullBool
    var errorBlob []byte
    columns, _ := rows.Columns()
    // ...
    err := rows.Scan(args...)
    if err != nil {
        return nil, err
    }
    // ...
    return stateMachineInstance, nil
}
```

###### Handler Calls Sub-State Machine for Compensation
![](https://cdn.nlark.com/yuque/__mermaid_v3/cf082dc3e31e7ae8d47a8ae533a8189c.svg)

+ **Explanation**: After getting sub-state machine information, the handler calls the sub-state machine's `Compensate` method for compensation operation. The sub-state machine executes compensation logic and returns compensation results to the handler.
+ **Code Correspondence**: In the `Process` method in `saga/statemachine/process_ctrl/handlers/service_task_state_handler.go`, if the current state is a sub-state machine compensation state, it calls the `compensateSubStateMachine` method for compensation operation.

```go
if _, ok := stateInterface.(state.CompensateSubStateMachineState); ok {
    // If it is the compensation of the subState machine,
    // directly call the state machine's compensate method
    stateMachineEngine, ok := processContext.GetVariable(constant.VarNameStateMachineEngine).(core.StateMachineEngine)
    if !ok {
        handleResultErr(errors.New("invalid stateMachineEngine type from processContext"))
        return nil
    }
    result, resultErr = s.compensateSubStateMachine(ctx, processContext, serviceTaskStateImpl, input,
        stateInstance, stateMachineEngine)
    if resultErr != nil {
        handleResultErr(resultErr)
        return nil
    }
}
```

###### Handler Returns Compensation Completion Information to Parent State Machine
![](https://cdn.nlark.com/yuque/__mermaid_v3/a79c6b3050f0c975153208b049fd5131.svg)

+ **Explanation**: After receiving compensation results from the sub-state machine, the handler confirms that compensation operation has been completed and returns compensation completion information to the parent state machine.
+ **Code Correspondence**: In the `compensateInternal` method in `saga/statemachine/engine/core/process_ctrl_statemachine_engine.go`, when compensation operation is completed, it returns the state machine instance and error information. If there's no error, it indicates successful compensation completion, which can be seen as returning compensation completion information to the parent state machine.

```go
return stateMachineInstance, nil
```

This sub-state machine compensation flow ensures effective rollback operations when business flows encounter exceptions through parent state machine initiating compensation requests, handler getting sub-state machine information from storage, calling sub-state machine for compensation operations, and finally returning compensation results to the parent state machine. In the code, the functions of various participants are implemented through different structs and methods, collaborating to complete the entire compensation flow.



### Hierarchical Structure of Data Storage and Management
![](https://cdn.nlark.com/yuque/__mermaid_v3/66b3adbfef1bfd1b2a59679add642825.svg)

#### Storage (Store)
+ **Meaning**: Storage is the abstract concept of the entire data storage system, representing the place in the system used to save state machine-related data.
+ **Association**: It is the foundation of the entire system, directly associated with both Repository and Database (DB).
+ **Code Correspondence**: There's no direct corresponding definition of `Store` in the code, but it can be understood as the general term for the entire data storage system.

#### Repository
+ **Meaning**: Repository is the middle layer of data access, responsible for encapsulating operations on stored data and providing unified data access interfaces for upper-level business logic.
+ **Association**: It depends on Storage and is further subdivided into StateMachine Repository and StateLog Repository.
+ **Code Correspondence**:
    - **StateMachine Repository**: Corresponds to the `StateMachineRepositoryImpl` struct in `saga/statemachine/store/repository/state_machine_repository.go`, which contains methods related to state machine storage and management.

```go
type StateMachineRepositoryImpl struct {
    stateMachineMapById            map[string]statelang.StateMachine
    stateMachineMapByNameAndTenant map[string]statelang.StateMachine

    stateLangStore  *db.StateLangStore
    seqGenerator    sequence.SeqGenerator
    defaultTenantId string
    jsonParserName  string
    mutex           *sync.Mutex
}
```

+ **StateLog Repository**: Corresponds to the `StateLogRepositoryImpl` struct in `saga/statemachine/store/repository/state_log_repository.go`, which encapsulates recording and querying operations for state machine instances and state instance logs.

```go
type StateLogRepositoryImpl struct {
    stateLogStore *db.StateLogStore
}
```

#### Database (DB)
+ **Meaning**: Database is the actual place where data is stored, responsible for persisting state machine definitions and execution states.
+ **Association**: It provides specific data storage implementation for Storage, including StateLang Store and StateLog Store.
+ **Code Correspondence**:
    - **StateLang Store**: Corresponds to the `StateLangStore` struct in `saga/statemachine/store/db/statelang.go`, which implements storage and query functionality for state machine definitions.

```go
type StateLangStore struct {
    Store
    tablePrefix                          string
    getStateMachineByIdSql               string
    queryStateMachinesByNameAndTenantSql string
    insertStateMachineSql                string
}
```

+ **StateLog Store**: Corresponds to the `StateLogStore` struct in `saga/statemachine/store/db/statelog.go`, which implements recording and querying functionality for state machine instances and state instance logs.

```go
type StateLogStore struct {
    Store
    tablePrefix string
    // Other fields and methods
}
```

This shows the hierarchical structure of data storage and management in the state machine system. Through Repository as the middle layer, upper-level business logic is isolated from the underlying Database (DB), improving system maintainability and extensibility. Meanwhile, StateLang Store and StateLog Store in the Database (DB) are respectively responsible for persisting state machine definitions and execution states, ensuring data integrity and consistency.

#### Relationships Between State Machine Definitions, State Logs, Storage Components, and Database
![](https://cdn.nlark.com/yuque/__mermaid_v3/e90cbddb4e1ce374da49a00d776c5ee2.svg)

1. **State Machine Definition (StateMachine) and StateLang Store**: State machine definitions (`StateMachine`) need to be stored and managed. `StateLang Store` serves as a specialized storage component responsible for handling persistence and retrieval operations of state machine definitions. This means all properties and configuration information of state machines are stored in the database through `StateLang Store` and can also be read from the database.
2. **State Log and StateLog Store**: State machines generate various state logs (`StateLog`) during operation, recording execution status of state machine instances and state instances. `StateLog Store` is responsible for storing these state logs in the database and providing query functionality for subsequent analysis and auditing.
3. **Database**: The database is the data persistence layer for the entire system. Both `StateLang Store` and `StateLog Store` store data in the database and read required data from the database.

###### Code Analysis
###### State Machine Definition and `StateLang Store`
In the code, `saga/statemachine/store/db/statelang.go` defines the `StateLangStore` struct, which is responsible for storage and query operations of state machine definitions. Here are relevant code snippets:

```go
type StateLangStore struct {
    Store
    tablePrefix                          string
    getStateMachineByIdSql               string
    queryStateMachinesByNameAndTenantSql string
    insertStateMachineSql                string
}

func (s *StateLangStore) GetStateMachineById(stateMachineId string) (statelang.StateMachine, error) {
    return SelectOne(s.db, s.getStateMachineByIdSql, scanRowsToStateMachine, stateMachineId)
}

func (s *StateLangStore) StoreStateMachine(stateMachine statelang.StateMachine) error {
    rows, err := ExecuteUpdate(s.db, s.insertStateMachineSql, execStateMachineStatement, stateMachine)
    if err != nil {
        return err
    }
    if rows <= 0 {
        return errors.New("affected rows is smaller than 0")
    }
    return nil
}
```

From the above code, we can see that `StateLangStore` provides `GetStateMachineById` and `StoreStateMachine` methods for getting state machine definitions from the database and storing state machine definitions to the database respectively.

###### State Log and `StateLog Store`
`StateLogStore` is responsible for recording and querying state logs, with code located in `saga/statemachine/store/db/statelog.go`. Here are relevant code snippets:

```go
type StateLogStore struct {
    Store
    seqGenerator     sequence.SeqGenerator
    paramsSerializer serializer.ParamsSerializer
    errorSerializer  serializer.ErrorSerializer
    // Other fields...
}

func (s *StateLogStore) RecordStateMachineStarted(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error {
    // Logic for recording state machine startup logs
}

func (s *StateLogStore) RecordStateMachineFinished(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error {
    // Logic for recording state machine completion logs
}

func (s *StateLogStore) GetStateMachineInstance(stateMachineInstanceId string) (statelang.StateMachineInstance, error) {
    // Logic for getting state machine instances
}
```

`StateLogStore` provides multiple methods such as `RecordStateMachineStarted`, `RecordStateMachineFinished`, and `GetStateMachineInstance` for recording state machine startup and completion logs, and getting state machine instance information.

### Relationships Between Engine Layers


## Saga Source Code
### 1. Configuration Module
#### **saga/statemachine/engine/core/statemachine_config.go**
+ `**saga/statemachine/engine/core/statemachine_config.go**`: Defines the `StateMachineConfig` interface, which contains various configuration information required for state machine operation, such as state log repository, state machine repository, event publisher, expression parser, etc. Through this interface, various configuration components of the state machine can be uniformly managed.

```go
type StateMachineConfig interface {
    StateLogRepository() StateLogRepository
    StateMachineRepository() StateMachineRepository
    StateLogStore() StateLogStore
    StateLangStore() StateLangStore
    ExpressionFactoryManager() expr.ExpressionFactoryManager
    ExpressionResolver() expr.ExpressionResolver
    SeqGenerator() sequence.SeqGenerator
    StatusDecisionStrategy() StatusDecisionStrategy
    EventPublisher() EventPublisher
    AsyncEventPublisher() EventPublisher
    ServiceInvokerManager() invoker.ServiceInvokerManager
    ScriptInvokerManager() invoker.ScriptInvokerManager
    CharSet() string
    DefaultTenantId() string
    TransOperationTimeout() int
    ServiceInvokeTimeout() int
    ComponentLock() *sync.Mutex
}
```

+ **Storage-related**:
    - `StateLogRepository()`: Get state log repository for managing persistent storage of state machine instances and state instances.
    - `StateMachineRepository()`: Get state machine repository for managing storage and retrieval of state machines.
    - `StateLogStore()`: Get state log storage for recording state machine startup, end, restart, and other events.
    - `StateLangStore()`: Get state language storage for storing and retrieving state machine definition information.
+ **Expression-related**:
    - `ExpressionFactoryManager()`: Get expression factory manager for creating expressions.
    - `ExpressionResolver()`: Get expression resolver for parsing expressions.
+ **Sequence Generation**:
    - `SeqGenerator()`: Get sequence generator for generating unique IDs.
+ **State Decision**:
    - `StatusDecisionStrategy()`: Get state decision strategy for determining state machine execution status.
+ **Event Publishing**:
    - `EventPublisher()`: Get synchronous event publisher for publishing synchronous events.
    - `AsyncEventPublisher()`: Get asynchronous event publisher for publishing asynchronous events.
+ **Service Invocation**:
    - `ServiceInvokerManager()`: Get service invocation manager for managing service invocations.
    - `ScriptInvokerManager()`: Get script invocation manager for managing script invocations.
+ **Other Configurations**:
    - `CharSet()`: Get character set.
    - `DefaultTenantId()`: Get default tenant ID.
    - `TransOperationTimeout()`: Get transaction operation timeout.
    - `ServiceInvokeTimeout()`: Get service invocation timeout.
    - `ComponentLock()`: Get component lock for concurrency control.
+ `**saga/statemachine/engine/core/default_statemachine_config.go**`: Implements the default configuration class `DefaultStateMachineConfig` of the `StateMachineConfig` interface, containing configuration information such as transaction operation timeout, service invocation timeout, character set, as well as event publishers, storage components, expression components, etc.
+ Constant definitions

```go
const (
    DefaultTransOperTimeout                      = 60000 * 30
    DefaultServiceInvokeTimeout                  = 60000 * 5
    DefaultClientSagaRetryPersistModeUpdate      = false
    DefaultClientSagaCompensatePersistModeUpdate = false
    DefaultClientReportSuccessEnable             = false
    DefaultClientSagaBranchRegisterEnable        = true
)
```

Defines some default configuration constants, including transaction operation timeout, service invocation timeout, client SAGA retry persist mode update, client SAGA compensate persist mode update, client report success enable, and client SAGA branch register enable.

+ `DefaultStateMachineConfig` struct definition

```go
type DefaultStateMachineConfig struct {
    // Configuration
    transOperationTimeout           int
    serviceInvokeTimeout            int
    charset                         string
    defaultTenantId                 string
    sagaRetryPersistModeUpdate      bool
    sagaCompensatePersistModeUpdate bool
    sagaBranchRegisterEnable        bool
    rmReportSuccessEnable           bool

    // Components
    syncProcessCtrlEventPublisher  EventPublisher
    asyncProcessCtrlEventPublisher EventPublisher
    stateLogRepository     StateLogRepository
    stateLogStore          StateLogStore
    stateLangStore         StateLangStore
    stateMachineRepository StateMachineRepository
    expressionFactoryManager expr.ExpressionFactoryManager
    expressionResolver       expr.ExpressionResolver
    serviceInvokerManager invoker.ServiceInvokerManager
    scriptInvokerManager  invoker.ScriptInvokerManager
    statusDecisionStrategy StatusDecisionStrategy
    seqGenerator           sequence.SeqGenerator
    componentLock          *sync.Mutex
}
```

This struct contains two parts:

+ **Configuration Information**: Such as transaction operation timeout, service invocation timeout, character set, default tenant ID, etc.
+ **Component Information**: Including event publishers, state log repository, state machine repository, expression factory manager, service invocation manager, etc.
+ Getter and Setter methods

The `DefaultStateMachineConfig` struct provides a series of getter and setter methods for getting and setting various configuration information and components. These methods implement the `StateMachineConfig` interface.

**Key method examples:**

```go
func (d *DefaultStateMachineConfig) StateLogRepository() StateLogRepository {
    return d.stateLogRepository
}

func (d *DefaultStateMachineConfig) SetStateLogRepository(stateLogRepository StateLogRepository) {
    d.stateLogRepository = stateLogRepository
}

func (d *DefaultStateMachineConfig) TransOperationTimeout() int {
    return d.transOperationTimeout
}

func (d *DefaultStateMachineConfig) SetTransOperationTimeout(transOperationTimeout int) {
    d.transOperationTimeout = transOperationTimeout
}
```

#### **Default Configuration Creation**
`saga/statemachine/engine/core/default_statemachine_config.go` also provides the `NewDefaultStateMachineConfig` function for creating a default state machine configuration instance:

```go
func NewDefaultStateMachineConfig() *DefaultStateMachineConfig {
    config := &DefaultStateMachineConfig{
        transOperationTimeout:           DefaultTransOperTimeout,
        serviceInvokeTimeout:            DefaultServiceInvokeTimeout,
        charset:                         "UTF-8",
        defaultTenantId:                 "DEFAULT",
        sagaRetryPersistModeUpdate:      DefaultClientSagaRetryPersistModeUpdate,
        sagaCompensatePersistModeUpdate: DefaultClientSagaCompensatePersistModeUpdate,
        sagaBranchRegisterEnable:        DefaultClientSagaBranchRegisterEnable,
        rmReportSuccessEnable:           DefaultClientReportSuccessEnable,
        componentLock:                   &sync.Mutex{},
    }
    return config
}
```

This function creates a `DefaultStateMachineConfig` instance with default values and can be further customized through setter methods as needed.

#### **Configuration Module Summary**
The configuration module provides a flexible and extensible way to manage all components and configuration information required for state machine operation. Through the `StateMachineConfig` interface, various components can be uniformly managed, and through the `DefaultStateMachineConfig` implementation, default configuration is provided, while also supporting customization. This design makes the state machine engine highly configurable and maintainable.

### 2. State Machine Engine Module
#### **Core Engine Interface**
`saga/statemachine/engine/core/statemachine_engine.go` defines the core interface `StateMachineEngine`:

```go
type StateMachineEngine interface {
    Start(ctx context.Context, stateMachineName string, tenantId string, startParams map[string]any) (statelang.StateMachineInstance, error)
    StartWithBusinessKey(ctx context.Context, stateMachineName string, tenantId string, businessKey string, startParams map[string]any) (statelang.StateMachineInstance, error)
    StartAsync(ctx context.Context, stateMachineName string, tenantId string, startParams map[string]any, callback CallBack) (statelang.StateMachineInstance, error)
    StartAsyncWithBusinessKey(ctx context.Context, stateMachineName string, tenantId string, businessKey string, startParams map[string]any, callback CallBack) (statelang.StateMachineInstance, error)
    Forward(ctx context.Context, stateMachineInstId string) (statelang.StateMachineInstance, error)
    ForwardAsync(ctx context.Context, stateMachineInstId string, callback CallBack) (statelang.StateMachineInstance, error)
    Compensate(ctx context.Context, stateMachineInstId string) (statelang.StateMachineInstance, error)
    CompensateAsync(ctx context.Context, stateMachineInstId string, callback CallBack) (statelang.StateMachineInstance, error)
    SkipAndForward(ctx context.Context, stateMachineInstId string) (statelang.StateMachineInstance, error)
    SkipAndForwardAsync(ctx context.Context, stateMachineInstId string, callback CallBack) (statelang.StateMachineInstance, error)
    ReloadStateMachineInstance(ctx context.Context, instId string) (statelang.StateMachineInstance, error)
    GetStateMachineConfig() StateMachineConfig
}
```

This interface defines the core functionalities of the state machine engine:

+ **Startup Methods**: `Start`, `StartWithBusinessKey`, `StartAsync`, `StartAsyncWithBusinessKey` - for starting state machine instances
+ **Forward Methods**: `Forward`, `ForwardAsync` - for continuing execution of state machine instances
+ **Compensation Methods**: `Compensate`, `CompensateAsync` - for compensating state machine instances
+ **Skip Methods**: `SkipAndForward`, `SkipAndForwardAsync` - for skipping current state and continuing execution
+ **Reload Methods**: `ReloadStateMachineInstance` - for reloading state machine instances
+ **Configuration Access**: `GetStateMachineConfig` - for getting state machine configuration

#### **Process Control State Machine Engine**
`saga/statemachine/engine/core/process_ctrl_statemachine_engine.go` implements the `StateMachineEngine` interface:

```go
type ProcessCtrlStateMachineEngine struct {
    stateMachineConfig StateMachineConfig
}

func NewProcessCtrlStateMachineEngine(stateMachineConfig StateMachineConfig) *ProcessCtrlStateMachineEngine {
    return &ProcessCtrlStateMachineEngine{
        stateMachineConfig: stateMachineConfig,
    }
}
```

**Key implementation methods:**

1. **Start method implementation**:
```go
func (p ProcessCtrlStateMachineEngine) Start(ctx context.Context, stateMachineName string, tenantId string, startParams map[string]any) (statelang.StateMachineInstance, error) {
    return p.startInternal(ctx, stateMachineName, tenantId, "", startParams, false, nil)
}

func (p ProcessCtrlStateMachineEngine) startInternal(ctx context.Context, stateMachineName string, tenantId string, businessKey string, startParams map[string]any, async bool, callback CallBack) (statelang.StateMachineInstance, error) {
    // Get state machine definition
    stateMachine, err := p.stateMachineConfig.StateMachineRepository().GetStateMachine(stateMachineName, tenantId)
    if err != nil {
        return nil, err
    }
    
    // Create state machine instance
    stateMachineInstance := statelang.NewStateMachineInstanceImpl()
    stateMachineInstance.SetMachineId(stateMachine.Id())
    stateMachineInstance.SetTenantId(tenantId)
    stateMachineInstance.SetBusinessKey(businessKey)
    stateMachineInstance.SetStartParams(startParams)
    
    // Build process context
    contextBuilder := NewProcessContextBuilder().WithProcessType(process.StateLang).
        WithOperationName(constant.OperationNameStart).WithAsyncCallback(callback).
        WithStateMachineInstance(stateMachineInstance).
        WithStateMachineConfig(p.stateMachineConfig).WithStateMachineEngine(p).WithIsAsyncExecution(async)
    context := contextBuilder.Build()
    
    // Execute through event publisher
    if async {
        _, err := p.stateMachineConfig.AsyncEventPublisher().PushEvent(ctx, context)
        if err != nil {
            return nil, err
        }
    } else {
        _, err := p.stateMachineConfig.EventPublisher().PushEvent(ctx, context)
        if err != nil {
            return nil, err
        }
    }
    
    return stateMachineInstance, nil
}
```

2. **Compensation method implementation**:
```go
func (p ProcessCtrlStateMachineEngine) Compensate(ctx context.Context, stateMachineInstId string) (statelang.StateMachineInstance, error) {
    return p.compensateInternal(ctx, stateMachineInstId, nil, false, nil)
}

func (p ProcessCtrlStateMachineEngine) compensateInternal(ctx context.Context, stateMachineInstId string, replaceParams map[string]any, async bool, callback CallBack) (statelang.StateMachineInstance, error) {
    // Reload state machine instance
    stateMachineInstance, err := p.reloadStateMachineInstance(ctx, stateMachineInstId)
    if err != nil {
        return nil, err
    }
    
    // Build compensation context
    contextBuilder := NewProcessContextBuilder().WithProcessType(process.StateLang).
        WithOperationName(constant.OperationNameCompensate).WithAsyncCallback(callback).
        WithStateMachineInstance(stateMachineInstance).
        WithStateMachineConfig(p.StateMachineConfig).WithStateMachineEngine(p).WithIsAsyncExecution(async)
    context := contextBuilder.Build()
    
    // Execute compensation through event publisher
    if async {
        _, err := p.StateMachineConfig.AsyncEventPublisher().PushEvent(ctx, context)
        if err != nil {
            return nil, err
        }
    } else {
        _, err := p.StateMachineConfig.EventPublisher().PushEvent(ctx, context)
        if err != nil {
            return nil, err
        }
    }
    
    return stateMachineInstance, nil
}
```

#### **State Machine Engine Builder**
`saga/statemachine/engine/core/statemachine_engine_builder.go` provides a builder pattern for creating state machine engines:

```go
type StateMachineEngineBuilder struct {
    config *DefaultStateMachineConfig
}

func NewStateMachineEngineBuilder() *StateMachineEngineBuilder {
    return &StateMachineEngineBuilder{
        config: NewDefaultStateMachineConfig(),
    }
}

func (b *StateMachineEngineBuilder) Build() StateMachineEngine {
    // Initialize various components
    b.initDefaultComponents()
    
    // Create process control state machine engine
    return NewProcessCtrlStateMachineEngine(b.config)
}

func (b *StateMachineEngineBuilder) initDefaultComponents() {
    // Initialize sequence generator
    if b.config.seqGenerator == nil {
        b.config.seqGenerator = sequence.NewUUIDSeqGenerator()
    }
    
    // Initialize expression factory manager
    if b.config.expressionFactoryManager == nil {
        b.config.expressionFactoryManager = expr.NewExpressionFactoryManager()
    }
    
    // Initialize other components...
}
```

Builder provides fluent API for configuration:

```go
func (b *StateMachineEngineBuilder) SetDataSource(dataSource *sql.DB) *StateMachineEngineBuilder {
    // Set data source and initialize storage components
    return b
}

func (b *StateMachineEngineBuilder) SetTransOperationTimeout(timeout int) *StateMachineEngineBuilder {
    b.config.SetTransOperationTimeout(timeout)
    return b
}

func (b *StateMachineEngineBuilder) SetServiceInvokeTimeout(timeout int) *StateMachineEngineBuilder {
    b.config.SetServiceInvokeTimeout(timeout)
    return b
}
```

#### **Engine Module Summary**
The state machine engine module provides:

1. **Core Interface Definition**: Clear and complete state machine operation interface
2. **Process Control Implementation**: Event-driven state machine execution mechanism
3. **Builder Pattern**: Flexible and easy-to-use engine construction method
4. **Asynchronous Support**: Both synchronous and asynchronous execution modes
5. **Configuration Integration**: Seamless integration with configuration module

This design makes the state machine engine highly flexible, extensible, and maintainable, supporting various complex business scenarios.

### 3. Process Control Module
#### **Process Context**
`saga/statemachine/engine/core/process_context.go` defines the process execution context interface:

```go
type ProcessContext interface {
    GetInstruction() Instruction
    SetInstruction(instruction Instruction)
    GetVariable(name string) any
    SetVariable(name string, value any)
    RemoveVariable(name string) any
    HasVariable(name string) bool
    GetVariables() map[string]any
    SetVariables(variables map[string]any)
    ClearVariables()
    GetParent() ProcessContext
    SetParent(parent ProcessContext)
}
```

This interface defines the data and state information needed during process execution, including:
+ **Instruction Management**: Get and set current execution instructions
+ **Variable Management**: Get, set, delete, and check variables
+ **Hierarchy Support**: Support for parent-child context relationships

**Hierarchical Process Context**:
```go
type HierarchicalProcessContext interface {
    ProcessContext
    GetVariableLocally(name string) any
    GetVariablesLocally() map[string]any
}
```

Extends basic process context, providing local variable access functionality.

**Default Implementation**:
```go
type DefaultProcessContext struct {
    instruction Instruction
    variables   map[string]any
    parent      ProcessContext
    mutex       sync.RWMutex
}

func NewDefaultProcessContext() *DefaultProcessContext {
    return &DefaultProcessContext{
        variables: make(map[string]any),
    }
}
```

#### **Process Context Builder**
`saga/statemachine/engine/core/process_context_builder.go` provides a builder for creating process contexts:

```go
type ProcessContextBuilder struct {
    context *DefaultProcessContext
}

func NewProcessContextBuilder() *ProcessContextBuilder {
    return &ProcessContextBuilder{
        context: NewDefaultProcessContext(),
    }
}

func (b *ProcessContextBuilder) WithProcessType(processType process.ProcessType) *ProcessContextBuilder {
    b.context.SetVariable(constant.VarNameProcessType, processType)
    return b
}

func (b *ProcessContextBuilder) WithOperationName(operationName string) *ProcessContextBuilder {
    b.context.SetVariable(constant.VarNameOperationName, operationName)
    return b
}

func (b *ProcessContextBuilder) WithStateMachineInstance(instance statelang.StateMachineInstance) *ProcessContextBuilder {
    b.context.SetVariable(constant.VarNameStateMachineInstance, instance)
    return b
}

func (b *ProcessContextBuilder) WithStateMachineConfig(config StateMachineConfig) *ProcessContextBuilder {
    b.context.SetVariable(constant.VarNameStateMachineConfig, config)
    return b
}

func (b *ProcessContextBuilder) Build() ProcessContext {
    return b.context
}
```

#### **Business Processor**
`saga/statemachine/engine/core/default_business_processor.go` implements business logic processing:

```go
type BusinessProcessor interface {
    Process(ctx context.Context, processContext ProcessContext) error
    Route(ctx context.Context, processContext ProcessContext) error
}

type DefaultBusinessProcessor struct {
    processHandlerMap map[process.ProcessType]process.ProcessHandler
    routerMap         map[process.ProcessType]process.Router
}

func (d *DefaultBusinessProcessor) Process(ctx context.Context, processContext ProcessContext) error {
    processType := d.matchProcessType(processContext)
    processHandler := d.processHandlerMap[processType]
    if processHandler == nil {
        return errors.New("Process type [" + string(processType) + "] not support")
    }
    return processHandler.Process(ctx, processContext)
}

func (d *DefaultBusinessProcessor) Route(ctx context.Context, processContext ProcessContext) error {
    processType := d.matchProcessType(processContext)
    router := d.routerMap[processType]
    if router == nil {
        return errors.New("Process type [" + string(processType) + "] router not support")
    }
    return router.Route(ctx, processContext)
}
```

#### **Process Controller**
`saga/statemachine/engine/core/process_controller_impl.go` implements process control logic:

```go
type ProcessController interface {
    Process(ctx context.Context, context ProcessContext) error
}

type ProcessControllerImpl struct {
    businessProcessor BusinessProcessor
}

func NewProcessControllerImpl(businessProcessor BusinessProcessor) *ProcessControllerImpl {
    return &ProcessControllerImpl{
        businessProcessor: businessProcessor,
    }
}

func (p *ProcessControllerImpl) Process(ctx context.Context, context ProcessContext) error {
    // First execute business processing
    if err := p.businessProcessor.Process(ctx, context); err != nil {
        return err
    }
    // Then execute routing
    if err := p.businessProcessor.Route(ctx, context); err != nil {
        return err
    }
    return nil
}
```

#### **Event Publisher**
`saga/statemachine/engine/core/event_publisher.go` defines event publishing interface:

```go
type EventPublisher interface {
    PushEvent(ctx context.Context, processContext ProcessContext) (any, error)
}

type DefaultEventPublisher struct {
    processController ProcessController
}

func NewDefaultEventPublisher(processController ProcessController) *DefaultEventPublisher {
    return &DefaultEventPublisher{
        processController: processController,
    }
}

func (d *DefaultEventPublisher) PushEvent(ctx context.Context, processContext ProcessContext) (any, error) {
    return nil, d.processController.Process(ctx, processContext)
}
```

**Asynchronous Event Publisher**:
```go
type AsyncEventPublisher struct {
    processController ProcessController
    goroutinePool     *goroutinepool.Pool
}

func (a *AsyncEventPublisher) PushEvent(ctx context.Context, processContext ProcessContext) (any, error) {
    return a.goroutinePool.Submit(func() any {
        err := a.processController.Process(ctx, processContext)
        if err != nil {
            log.Errorf("Async process failed: %v", err)
        }
        return nil
    }), nil
}
```

#### **Process Control Module Summary**
The process control module provides:

1. **Context Management**: Complete process execution context management
2. **Builder Pattern**: Convenient context creation method
3. **Business Processing**: Modular business logic processing framework
4. **Process Control**: Unified process execution control logic
5. **Event Publishing**: Both synchronous and asynchronous event processing mechanisms

This design makes process control highly flexible and maintainable, supporting various complex business process scenarios.

### 4. State Processing Module
#### **State Handler Interface**
`saga/statemachine/engine/core/state_handler.go` defines the state handler interface:

```go
type StateHandler interface {
    Process(ctx context.Context, processContext ProcessContext) error
}
```

This interface defines the basic contract for state processing, where all specific state handlers must implement this interface.

#### **State Machine Process Handler**
`saga/statemachine/process_ctrl/handlers/statemachine_process_handler.go` manages all state handlers:

```go
type StateMachineProcessHandler struct {
    mp map[string]StateHandler
    mu sync.RWMutex
}

func NewStateMachineProcessHandler() *StateMachineProcessHandler {
    return &StateMachineProcessHandler{
        mp: make(map[string]StateHandler),
    }
}

func (s *StateMachineProcessHandler) AddStateHandler(stateType string, handler StateHandler) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.mp[stateType] = handler
}

func (s *StateMachineProcessHandler) GetStateHandler(stateType string) StateHandler {
    s.mu.RLock()
    defer s.mu.RUnlock()
    return s.mp[stateType]
}

func (s *StateMachineProcessHandler) Process(ctx context.Context, processContext ProcessContext) error {
    stateInstruction, ok := processContext.GetInstruction().(StateInstruction)
    if !ok {
        return errors.New("invalid state instruction from processContext")
    }
    
    state, err := stateInstruction.GetState(processContext)
    if err != nil {
        return err
    }
    
    stateType := state.Type()
    stateHandler := s.GetStateHandler(stateType)
    if stateHandler == nil {
        return errors.New("Not support [" + stateType + "] state handler")
    }
    
    return stateHandler.Process(ctx, processContext)
}
```

#### **Service Task State Handler**
`saga/statemachine/process_ctrl/handlers/service_task_state_handler.go` handles service task states:

```go
type ServiceTaskStateHandler struct {
    interceptors []core.StateHandlerInterceptor
}

func NewServiceTaskStateHandler() *ServiceTaskStateHandler {
    return &ServiceTaskStateHandler{
        interceptors: make([]core.StateHandlerInterceptor, 0),
    }
}

func (s *ServiceTaskStateHandler) Process(ctx context.Context, processContext core.ProcessContext) error {
    // Get state instruction
    stateInstruction, ok := processContext.GetInstruction().(core.StateInstruction)
    if !ok {
        return errors.New("invalid state instruction from processContext")
    }
    
    // Get state information
    stateInterface, err := stateInstruction.GetState(processContext)
    if err != nil {
        return err
    }
    
    serviceTaskStateImpl, ok := stateInterface.(*state.ServiceTaskStateImpl)
    if !ok {
        return errors.New("invalid service task state")
    }
    
    // Create state instance
    stateInstance := statelang.NewServiceTaskStateInstanceImpl()
    stateInstance.SetName(serviceTaskStateImpl.Name())
    stateInstance.SetType(serviceTaskStateImpl.Type())
    
    // Execute interceptors
    for _, interceptor := range s.interceptors {
        if err := interceptor.PreProcess(ctx, processContext); err != nil {
            return err
        }
    }
    
    var result any
    var resultErr error
    
    // Check if it's sub-state machine compensation
    if _, ok := stateInterface.(state.CompensateSubStateMachineState); ok {
        // Compensate sub-state machine
        stateMachineEngine, ok := processContext.GetVariable(constant.VarNameStateMachineEngine).(core.StateMachineEngine)
        if !ok {
            return errors.New("invalid stateMachineEngine type from processContext")
        }
        result, resultErr = s.compensateSubStateMachine(ctx, processContext, serviceTaskStateImpl, input, stateInstance, stateMachineEngine)
    } else {
        // Normal service invocation
        stateMachineConfig, ok := processContext.GetVariable(constant.VarNameStateMachineConfig).(core.StateMachineConfig)
        if !ok {
            return errors.New("invalid stateMachineConfig type from processContext")
        }
        
        serviceInvoker := stateMachineConfig.ServiceInvokerManager().ServiceInvoker(serviceTaskStateImpl.ServiceType())
        if serviceInvoker == nil {
            return errors.New("No such ServiceInvoker[" + serviceTaskStateImpl.ServiceType() + "]")
        }
        
        result, resultErr = serviceInvoker.Invoke(ctx, input, serviceTaskStateImpl)
    }
    
    // Handle result
    if resultErr != nil {
        stateInstance.SetException(resultErr)
        return resultErr
    }
    
    if result != nil {
        stateInstance.SetOutputParams(result)
        hierarchicalProcessContext, ok := processContext.(core.HierarchicalProcessContext)
        if ok {
            hierarchicalProcessContext.SetVariable(constant.VarNameOutputParams, result)
        }
    }
    
    // Execute post-interceptors
    for _, interceptor := range s.interceptors {
        if err := interceptor.PostProcess(ctx, processContext); err != nil {
            return err
        }
    }
    
    return nil
}
```

#### **Choice State Handler**
`saga/statemachine/process_ctrl/handlers/choice_state_handler.go` handles choice states:

```go
type ChoiceStateHandler struct{}

func NewChoiceStateHandler() *ChoiceStateHandler {
    return &ChoiceStateHandler{}
}

func (c *ChoiceStateHandler) Process(ctx context.Context, processContext core.ProcessContext) error {
    stateInstruction, ok := processContext.GetInstruction().(core.StateInstruction)
    if !ok {
        return errors.New("invalid state instruction from processContext")
    }
    
    choiceState, err := stateInstruction.GetState(processContext)
    if err != nil {
        return err
    }
    
    choiceStateImpl, ok := choiceState.(*state.ChoiceStateImpl)
    if !ok {
        return errors.New("invalid choice state")
    }
    
    // Evaluate choice conditions
    choices := choiceStateImpl.Choices()
    for _, choice := range choices {
        condition := choice.Expression()
        if condition != nil {
            // Evaluate expression
            stateMachineConfig, ok := processContext.GetVariable(constant.VarNameStateMachineConfig).(core.StateMachineConfig)
            if !ok {
                return errors.New("invalid stateMachineConfig type from processContext")
            }
            
            expressionResolver := stateMachineConfig.ExpressionResolver()
            result, err := expressionResolver.Resolve(condition, processContext.GetVariables())
            if err != nil {
                return err
            }
            
            if boolResult, ok := result.(bool); ok && boolResult {
                // Condition met, set next state
                nextStateName := choice.Next()
                hierarchicalProcessContext, ok := processContext.(core.HierarchicalProcessContext)
                if ok {
                    hierarchicalProcessContext.SetVariable(constant.VarNameNextStateName, nextStateName)
                }
                return nil
            }
        }
    }
    
    // No condition met, use default
    defaultChoice := choiceStateImpl.Default()
    if defaultChoice != "" {
        hierarchicalProcessContext, ok := processContext.(core.HierarchicalProcessContext)
        if ok {
            hierarchicalProcessContext.SetVariable(constant.VarNameNextStateName, defaultChoice)
        }
    }
    
    return nil
}
```

#### **Script Task State Handler**
`saga/statemachine/process_ctrl/handlers/script_task_state_handler.go` handles script task states:

```go
type ScriptTaskStateHandler struct{}

func NewScriptTaskStateHandler() *ScriptTaskStateHandler {
    return &ScriptTaskStateHandler{}
}

func (s *ScriptTaskStateHandler) Process(ctx context.Context, processContext core.ProcessContext) error {
    stateInstruction, ok := processContext.GetInstruction().(core.StateInstruction)
    if !ok {
        return errors.New("invalid state instruction from processContext")
    }
    
    scriptState, err := stateInstruction.GetState(processContext)
    if err != nil {
        return err
    }
    
    scriptStateImpl, ok := scriptState.(*state.ScriptTaskStateImpl)
    if !ok {
        return errors.New("invalid script task state")
    }
    
    // Get script invoker
    stateMachineConfig, ok := processContext.GetVariable(constant.VarNameStateMachineConfig).(core.StateMachineConfig)
    if !ok {
        return errors.New("invalid stateMachineConfig type from processContext")
    }
    
    scriptInvoker := stateMachineConfig.ScriptInvokerManager().ScriptInvoker(scriptStateImpl.ScriptType())
    if scriptInvoker == nil {
        return errors.New("No such ScriptInvoker[" + scriptStateImpl.ScriptType() + "]")
    }
    
    // Execute script
    result, err := scriptInvoker.Invoke(ctx, scriptStateImpl.Script(), processContext.GetVariables())
    if err != nil {
        return err
    }
    
    // Set result
    if result != nil {
        hierarchicalProcessContext, ok := processContext.(core.HierarchicalProcessContext)
        if ok {
            hierarchicalProcessContext.SetVariable(constant.VarNameOutputParams, result)
        }
    }
    
    return nil
}
```

#### **State Processing Module Summary**
The state processing module provides:

1. **Unified Interface**: Consistent state handler interface design
2. **Handler Management**: Centralized state handler registration and dispatch
3. **Service Tasks**: Complete service invocation and compensation mechanism
4. **Choice Logic**: Flexible conditional branching processing
5. **Script Support**: Script task execution capability
6. **Interceptor Pattern**: Extensible pre/post processing mechanism

This design makes state processing highly modular and extensible, supporting various types of state processing requirements.

### 5. Storage Module
#### **Storage Interface Definition**
`saga/statemachine/store/db/store.go` defines the core storage interface:

```go
type Store struct {
    db           *sql.DB
    driverName   string
    tablePrefix  string
}

func NewStore(db *sql.DB, driverName string, tablePrefix string) *Store {
    return &Store{
        db:          db,
        driverName:  driverName,
        tablePrefix: tablePrefix,
    }
}
```

#### **State Language Store**
`saga/statemachine/store/db/statelang.go` implements state machine definition storage:

```go
type StateLangStore struct {
    Store
    tablePrefix                          string
    getStateMachineByIdSql               string
    queryStateMachinesByNameAndTenantSql string
    insertStateMachineSql                string
}

func NewStateLangStore(store *Store) *StateLangStore {
    stateLangStore := &StateLangStore{
        Store:       *store,
        tablePrefix: store.tablePrefix,
    }
    
    // Initialize SQL statements
    stateLangStore.initSql()
    return stateLangStore
}

func (s *StateLangStore) initSql() {
    s.getStateMachineByIdSql = "SELECT id, name, tenant_id, app_name, type, comment, definition, recover_strategy, status, gmt_create, gmt_modified FROM " + s.tablePrefix + "state_machine WHERE id = ?"
    s.queryStateMachinesByNameAndTenantSql = "SELECT id, name, tenant_id, app_name, type, comment, definition, recover_strategy, status, gmt_create, gmt_modified FROM " + s.tablePrefix + "state_machine WHERE name = ? AND tenant_id = ?"
    s.insertStateMachineSql = "INSERT INTO " + s.tablePrefix + "state_machine (id, name, tenant_id, app_name, type, comment, definition, recover_strategy, status, gmt_create, gmt_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
}

func (s *StateLangStore) GetStateMachineById(stateMachineId string) (statelang.StateMachine, error) {
    return SelectOne(s.db, s.getStateMachineByIdSql, scanRowsToStateMachine, stateMachineId)
}

func (s *StateLangStore) StoreStateMachine(stateMachine statelang.StateMachine) error {
    rows, err := ExecuteUpdate(s.db, s.insertStateMachineSql, execStateMachineStatement, stateMachine)
    if err != nil {
        return err
    }
    if rows <= 0 {
        return errors.New("affected rows is smaller than 0")
    }
    return nil
}

func (s *StateLangStore) QueryStateMachinesByName(name string, tenantId string) ([]statelang.StateMachine, error) {
    return SelectList(s.db, s.queryStateMachinesByNameAndTenantSql, scanRowsToStateMachine, name, tenantId)
}
```

#### **State Log Store**
`saga/statemachine/store/db/statelog.go` implements state machine execution log storage:

```go
type StateLogStore struct {
    Store
    seqGenerator     sequence.SeqGenerator
    paramsSerializer serializer.ParamsSerializer
    errorSerializer  serializer.ErrorSerializer
    tablePrefix      string
    
    // SQL statements for state machine instances
    insertStateMachineInstanceSql string
    updateStateMachineInstanceSql string
    selectStateMachineInstanceSql string
    
    // SQL statements for state instances
    insertStateInstanceSql string
    updateStateInstanceSql string
    selectStateInstanceSql string
}

func NewStateLogStore(store *Store, seqGenerator sequence.SeqGenerator, paramsSerializer serializer.ParamsSerializer, errorSerializer serializer.ErrorSerializer) *StateLogStore {
    stateLogStore := &StateLogStore{
        Store:            *store,
        seqGenerator:     seqGenerator,
        paramsSerializer: paramsSerializer,
        errorSerializer:  errorSerializer,
        tablePrefix:      store.tablePrefix,
    }
    
    stateLogStore.initSql()
    return stateLogStore
}

func (s *StateLogStore) RecordStateMachineStarted(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error {
    // Serialize start parameters
    startParamsJson, err := s.paramsSerializer.Serialize(machineInstance.StartParams())
    if err != nil {
        return err
    }
    
    // Generate instance ID
    if machineInstance.Id() == "" {
        machineInstance.SetId(s.seqGenerator.Generate())
    }
    
    // Set start time
    machineInstance.SetGmtStarted(time.Now())
    machineInstance.SetStatus(constant.StatusRunning)
    
    // Insert into database
    _, err = ExecuteUpdate(s.db, s.insertStateMachineInstanceSql, func(stmt *sql.Stmt, args ...any) (*sql.Stmt, []any) {
        return stmt, []any{
            machineInstance.Id(),
            machineInstance.MachineId(),
            machineInstance.TenantId(),
            machineInstance.ParentId(),
            machineInstance.BusinessKey(),
            machineInstance.GmtStarted(),
            machineInstance.Status(),
            startParamsJson,
        }
    })
    
    return err
}

func (s *StateLogStore) RecordStateMachineFinished(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error {
    // Set end time and status
    machineInstance.SetGmtEnd(time.Now())
    
    // Serialize end parameters
    var endParamsJson string
    if machineInstance.EndParams() != nil {
        endParams, err := s.paramsSerializer.Serialize(machineInstance.EndParams())
        if err != nil {
            return err
        }
        endParamsJson = endParams
    }
    
    // Update database
    _, err := ExecuteUpdate(s.db, s.updateStateMachineInstanceSql, func(stmt *sql.Stmt, args ...any) (*sql.Stmt, []any) {
        return stmt, []any{
            machineInstance.Status(),
            machineInstance.GmtEnd(),
            endParamsJson,
            machineInstance.Id(),
        }
    })
    
    return err
}

func (s *StateLogStore) GetStateMachineInstance(stateMachineInstanceId string) (statelang.StateMachineInstance, error) {
    return SelectOne(s.db, s.selectStateMachineInstanceSql, scanRowsToStateMachineInstance, stateMachineInstanceId)
}
```

#### **Repository Layer**
**State Machine Repository**:
`saga/statemachine/store/repository/state_machine_repository.go`:

```go
type StateMachineRepository interface {
    GetStateMachine(name string, tenantId string) (statelang.StateMachine, error)
    RegisterStateMachine(stateMachine statelang.StateMachine) error
}

type StateMachineRepositoryImpl struct {
    stateMachineMapById            map[string]statelang.StateMachine
    stateMachineMapByNameAndTenant map[string]statelang.StateMachine
    stateLangStore                 *db.StateLangStore
    seqGenerator                   sequence.SeqGenerator
    defaultTenantId                string
    jsonParserName                 string
    mutex                          *sync.Mutex
}

func (s *StateMachineRepositoryImpl) GetStateMachine(name string, tenantId string) (statelang.StateMachine, error) {
    s.mutex.Lock()
    defer s.mutex.Unlock()
    
    if tenantId == "" {
        tenantId = s.defaultTenantId
    }
    
    key := name + "#" + tenantId
    stateMachine, exists := s.stateMachineMapByNameAndTenant[key]
    if exists {
        return stateMachine, nil
    }
    
    // Load from database
    stateMachines, err := s.stateLangStore.QueryStateMachinesByName(name, tenantId)
    if err != nil {
        return nil, err
    }
    
    if len(stateMachines) == 0 {
        return nil, errors.New("StateMachine[" + name + "] not found")
    }
    
    stateMachine = stateMachines[0]
    s.stateMachineMapById[stateMachine.Id()] = stateMachine
    s.stateMachineMapByNameAndTenant[key] = stateMachine
    
    return stateMachine, nil
}
```

**State Log Repository**:
`saga/statemachine/store/repository/state_log_repository.go`:

```go
type StateLogRepository interface {
    RecordStateMachineStarted(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error
    RecordStateMachineFinished(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error
    GetStateMachineInstance(stateMachineInstanceId string) (statelang.StateMachineInstance, error)
}

type StateLogRepositoryImpl struct {
    stateLogStore *db.StateLogStore
}

func NewStateLogRepositoryImpl(stateLogStore *db.StateLogStore) *StateLogRepositoryImpl {
    return &StateLogRepositoryImpl{
        stateLogStore: stateLogStore,
    }
}

func (s *StateLogRepositoryImpl) RecordStateMachineStarted(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error {
    return s.stateLogStore.RecordStateMachineStarted(ctx, machineInstance, context)
}

func (s *StateLogRepositoryImpl) RecordStateMachineFinished(ctx context.Context, machineInstance statelang.StateMachineInstance, context ProcessContext) error {
    return s.stateLogStore.RecordStateMachineFinished(ctx, machineInstance, context)
}

func (s *StateLogRepositoryImpl) GetStateMachineInstance(stateMachineInstanceId string) (statelang.StateMachineInstance, error) {
    return s.stateLogStore.GetStateMachineInstance(stateMachineInstanceId)
}
```

#### **Storage Module Summary**
The storage module provides:

1. **Layered Architecture**: Clear separation of Store, Repository layers
2. **State Machine Management**: Complete state machine definition storage and retrieval
3. **Execution Log**: Detailed state machine and state instance execution records
4. **Transaction Support**: Database transaction consistency guarantee
5. **Performance Optimization**: Memory caching and efficient SQL operations
6. **Serialization Support**: Flexible parameter and error serialization mechanisms

This design ensures data persistence reliability while providing good performance and scalability.

## Practical Projects

In the context of Seata-Go Saga development, two important practical projects demonstrate the powerful application potential of Saga mode: **txn-agent** and **AgentHub**. These projects not only validate the effectiveness of Saga mode in complex business scenarios but also showcase innovation in AI-driven transaction management.

### txn-agent Project: AI-Driven Saga Configuration Generation

txn-agent is an innovative project that applies AI technology to simplify Saga transaction configuration design and generation. The project addresses the complexity pain point of manually writing Saga state machine configurations.

#### Core Innovation Points

**1. Natural Language to Configuration Translation**
- Users can describe business processes in natural language
- AI parses business logic and automatically generates corresponding Saga state machine configurations
- Significantly reduces the learning curve and development cost

**2. Intelligent State Machine Design**
- Automatically identifies business steps and dependencies
- Generates appropriate compensation logic
- Optimizes state transition paths

**3. Configuration Validation and Optimization**
- Validates generated configuration completeness and correctness
- Provides optimization suggestions
- Ensures configuration complies with Seata Saga specifications

#### Technical Implementation Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Input    │───▶│   AI Processor  │───▶│ Configuration   │
│ (Natural Lang)  │    │   (LLM Model)   │    │   Generator     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Validator    │◀───│ State Machine   │───▶│   Optimizer     │
│   & Quality     │    │  Configuration  │    │  & Formatter    │
│    Checker      │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### Workflow Example

**User Input**:
```
"I need to process an order: first check inventory, then make payment, finally arrange delivery. If any step fails, need to restore inventory and refund payment."
```

**AI Generated Configuration**:
```json
{
  "Name": "OrderProcessSaga",
  "StartAt": "CheckInventory",
  "States": {
    "CheckInventory": {
      "Type": "ServiceTask",
      "ServiceName": "inventoryService",
      "ServiceMethod": "checkAndReserve",
      "CompensateState": "RestoreInventory",
      "Next": "ProcessPayment"
    },
    "ProcessPayment": {
      "Type": "ServiceTask", 
      "ServiceName": "paymentService",
      "ServiceMethod": "charge",
      "CompensateState": "RefundPayment",
      "Next": "ArrangeDelivery"
    },
    "ArrangeDelivery": {
      "Type": "ServiceTask",
      "ServiceName": "deliveryService", 
      "ServiceMethod": "schedule",
      "End": true
    },
    "RestoreInventory": {
      "Type": "ServiceTask",
      "ServiceName": "inventoryService",
      "ServiceMethod": "restore"
    },
    "RefundPayment": {
      "Type": "ServiceTask",
      "ServiceName": "paymentService",
      "ServiceMethod": "refund"
    }
  }
}
```

#### Quality Assurance Mechanism

**Core Objective**: Validate and summarize complete workflow solutions

**Quality Check Dimensions:**

1. **Completeness Check**: Ensure all states have reasonable transition paths
2. **Consistency Check**: Verify consistency between forward processes and compensation processes
3. **Specification Check**: Ensure generated configuration complies with Seata Saga specifications

## AgentHub Project:
### Core Philosophy
The AgentHub project innovatively proposes a **skill-based service discovery model**, which is a completely new service governance concept:

**Traditional Mode vs Skill Mode Comparison:**

| Dimension | Traditional Service Discovery | Skill-Based Discovery |
| --- | --- | --- |
| Registration Unit | Service Instances | Skills |
| Discovery Granularity | Instance Level | Capability Level |
| Scalability | Static Deployment | Dynamic Skill Registration |
| Reusability | Holistic Reuse | Skill-Level Reuse |
| Governance Complexity | High | Low |


**Core Design Principles:**

1. **Skill Atomization**: Treat each skill of an Agent as an independent service unit, achieving atomic management of capabilities
2. **Independent Registration**: Each skill registers to an independent vGroup to avoid mutual interference between skills
3. **Precise Discovery**: Perform precise service discovery through skill names, improving discovery efficiency and accuracy
4. **Dynamic Composition**: Support dynamic registration, deregistration, and composition of skills, achieving flexible configuration of service capabilities

The core advantage of this design philosophy is: it decouples service "capabilities" from "instances", making service discovery no longer limited to "finding a service instance" but upgraded to "finding service providers with specific capabilities".

### System Architecture
The skill-based service discovery system adopts a layered architecture design, with the entire system divided into four core layers:

```plain
┌──────────────────────────────────────────────────────────────────┐
│                        Client Discovery Layer                    │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │  Web Dashboard  │    │   API Gateway   │    │  Agent Client   │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
└──────────────────────────┬───────────────────────────────────────┘
                           │ Skill Query Requests
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                   Smart Routing & Cache Layer                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              SkillBasedNamingServerStorage                 │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │ │
│  │  │  Skill Cache  │  │  Agent Cache  │  │  Route Cache  │  │ │
│  │  └───────────────┘  └───────────────┘  └───────────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────────────┘
                           │ NamingServer Query
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                       Seata NamingServer                        │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │skill-python-code│    │skill-data-analysis│  │skill-doc-process│ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
└──────────────────────────┬───────────────────────────────────────┘
                           │ Service Instance Management
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                        Agent Service Layer                       │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   Agent A       │    │   Agent B       │    │   Agent C       │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │ │
│  │ │python-coding│ │    │ │data-analysis│ │    │ │doc-process  │ │ │
│  │ └─────────────┘ │    │ │web-scraping │ │    │ │translation  │ │ │
│  │ ┌─────────────┐ │    │ └─────────────┘ │    │ └─────────────┘ │ │
│  │ │unit-testing │ │    │                 │    │                 │ │
│  │ └─────────────┘ │    │                 │    │                 │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

**Architecture Characteristics Analysis:**

1. **Client Discovery Layer**: Provides multiple access methods, including Web console, API gateway, and direct Agent client calls
2. **Smart Routing & Cache Layer**: Implements multi-level caching mechanisms and intelligent routing strategies, ensuring high performance and high availability
3. **Seata NamingServer**: Serves as a distributed registry center, managing all skill vGroup registration information
4. **Agent Service Layer**: Actual service providers, each Agent can register multiple skills to different vGroups

**Data Flow Process:**

1. **Registration Phase**: When Agent starts, it parses its skill list into independent vGroup entries and registers them separately to NamingServer
2. **Discovery Phase**: When clients request specific skills, the system first queries local cache, then queries NamingServer
3. **Invocation Phase**: After obtaining the service address corresponding to the skill, it directly calls the skill interface of the target Agent
4. **Update Phase**: When Agent skills change, it intelligently identifies change types and only updates necessary registration information

## Core Implementation Deep Dive
### 1. NamingServer Interface Design Philosophy
In traditional service registry design, interfaces are often simple and crude, mainly revolving around the basic "register-discover" pattern. In our skill-based service discovery system, the NamingServer interface design embodies a deeper design philosophy:

```go
type NamingserverRegistry interface {
    Register(instance *ServiceInstance) error     // Service instance registration
    Deregister(instance *ServiceInstance) error   // Service instance deregistration
    doHealthCheck(addr string) bool               // Health status check
    RefreshToken(addr string) error               // Authentication token refresh
    RefreshGroup(vGroup string) error             // Service group information refresh
    Watch(vGroup string) (bool, error)            // Service change monitoring
    Lookup(key string) ([]*ServiceInstance, error) // Service instance lookup
}
```

The elegance of this interface design lies in:

1. **Lifecycle Management**: From Register to Deregister, completely covering the entire service lifecycle
2. **Health Monitoring**: Providing real-time health status awareness through doHealthCheck
3. **Security Assurance**: RefreshToken ensures secure access in distributed environments
4. **Dynamic Updates**: RefreshGroup and Watch mechanisms support dynamic service information updates
5. **Efficient Lookup**: Lookup method performs precise lookup through key (vGroup in our scenario)

### 2. Skill Mapping Mechanism Design Considerations
Skill mapping is the core innovation of the entire system. It solves the key problem of "how to convert abstract Agent skills into specific service registration entries".

**Design Challenges and Solutions:**

When designing the skill mapping mechanism, we faced several key challenges:

1. How to ensure skill name uniqueness?
2. How to handle the mapping relationship between skills and physical service instances?
3. How to achieve independent lifecycle management for skills?

Our solution is to create the SkillMapping data structure:

```go
type SkillMapping struct {
    SkillName       string              // Skill unique identifier
    HostUrl         string              // Host address providing this skill
    VGroup          string              // Corresponding virtual group name in NamingServer
    ServiceInstance *ServiceInstance    // Service instance information
}

func (m *SkillServiceMapper) ExtractSkillMappings(card models.AgentCard) []SkillMapping {
    var mappings []SkillMapping

    for _, skill := range card.Skills {
        // Key design: Use "skill-" prefix + skill ID to construct vGroup name
        // This ensures skill uniqueness and identifiability in NamingServer
        vGroup := fmt.Sprintf("skill-%s", skill.ID)

        mapping := SkillMapping{
            SkillName: skill.ID,
            HostUrl:   card.URL,
            VGroup:    vGroup,
            ServiceInstance: &ServiceInstance{
                Addr: card.URL,
                Port: extractPortFromURL(card.URL),
            },
        }
        mappings = append(mappings, mapping)
    }

    return mappings
}
```

**Core Design Philosophy of Skill Mapping:**

1. **Namespace Isolation**: Through the "skill-" prefix, distinguish skill-related vGroups from other business vGroups, avoiding naming conflicts
2. **One Skill One Group**: Each skill corresponds to an independent vGroup, achieving skill-level precise management
3. **Unified Mapping**: Multiple skills of the same Agent map to different vGroups but all point to the same service instance address
4. **Scalability Consideration**: SkillMapping structure reserves expansion space, allowing future addition of skill versions, weights, and other information

**Actual Operation Example:**
Suppose a Python Agent provides three skills: code generation, data analysis, unit testing, the mapping results are as follows:

+ `python-coding` → vGroup: `skill-python-coding` → Service Address: `http://agent-python:8080`
+ `data-analysis` → vGroup: `skill-data-analysis` → Service Address: `http://agent-python:8080`
+ `unit-testing` → vGroup: `skill-unit-testing` → Service Address: `http://agent-python:8080`

### 3. Intelligent Storage Layer Architecture Design
`SkillBasedNamingServerStorage` is the core storage abstraction layer of the entire system. It cleverly combines the advantages of distributed service discovery and local high-speed caching. The elegance of this design is that it's not just a simple storage layer, but a storage hub with intelligent perception and adaptive capabilities.

```go
type SkillBasedNamingServerStorage struct {
    // Core components
    registry NamingserverRegistry      // Seata NamingServer registry interface
    mapper   *SkillServiceMapper       // Skill to service mapper

    // Multi-dimensional cache matrix - key to system performance
    skillToUrl    map[string]string                  // Skill name → Host URL
    skillToVGroup map[string]string                  // Skill name → vGroup name
    agentToSkills map[string][]string                // Agent ID → Skill list
    skillToAgent  map[string]string                  // Skill name → Agent ID owning this skill
    agentCache    map[string]*models.RegisteredAgent // Agent ID → Complete Agent information

    // Global aggregation capability
    globalCard *models.AgentCard       // System-level skill aggregation card

    // Concurrency safety guarantee
    cacheMutex sync.RWMutex           // Read-write lock, ensuring concurrent access safety
}
```

**Six Core Design Principles of Storage Layer:**

1. **Multi-dimensional Index Design**:
    - Different business scenarios require different query paths
    - `skillToUrl`: Directly get service address through skill name, this is the most common query path
    - `agentToSkills`: Get all skills through Agent ID, used for Agent management
    - `skillToAgent`: Reverse query, find Agent providing specific skill based on skill
    - This multi-dimensional index design ensures O(1) time complexity query performance
2. **Intelligent Caching Strategy**:
    - Local cache as first-level query, reducing network overhead
    - NamingServer query as second-level, ensuring data consistency
    - Intelligent cache invalidation and update strategies, avoiding cache avalanche
3. **Global View Management**:
    - `globalCard` provides system-level skill panoramic view
    - Facilitates cross-Agent skill discovery and capability analysis
    - Supports skill statistical analysis and capacity planning
4. **Concurrency Safety Guarantee**:
    - Uses read-write locks instead of ordinary mutexes, improving concurrent read performance
    - Fine-grained lock strategies, avoiding unnecessary lock contention
5. **Storage Abstraction Unification**:
    - Implements standard Storage interface (Create, Read, Update, Delete, List, Watch)
    - Provides unified resource management abstraction, facilitating integration with other storage backends
6. **Fault Isolation and Degradation**:
    - When NamingServer fails, system can degrade to local cache mode
    - Ensures high availability of service discovery functionality

## Key Features Deep Implementation
### 1. Intelligent Registration Mechanism: Perfect Balance of Atomicity and Consistency
In distributed systems, service registration is a seemingly simple but actually challenging process. Traditional service registration is usually a coarse-grained "all or nothing" operation, while our skill-based registration mechanism needs to handle more complex scenarios: an Agent may have multiple skills, these skills need to be registered to different vGroups separately, how to ensure atomicity and consistency of this process?

**Core Challenges:**

1. **Partial Failure Problem**: If an Agent has 5 skills, the first 3 register successfully but the 4th fails, what to do?
2. **Rollback Complexity**: How to gracefully rollback already successfully registered skills?
3. **State Consistency**: How to maintain consistency between local cache and NamingServer state?

Our solution adopts a "progressive registration + intelligent rollback" strategy:

```go
func (s *SkillBasedNamingServerStorage) Create(ctx context.Context, resource Resource) error {
    agent := resource.(*models.RegisteredAgent)
    agentId := agent.GetID()

    // Step 1: Skill mapping parsing
    skillMappings := s.mapper.ExtractSkillMappings(agent.AgentCard)
    if len(skillMappings) == 0 {
        return fmt.Errorf("agent %s has no skills to register", agentId)
    }

    s.logger.Info("Starting to register Agent %s, %d skills need to be registered to NamingServer",
        agentId, len(skillMappings))

    // Step 2: Progressive registration, record successful registrations for possible rollback
    var registeredSkills []SkillMapping

    for i, mapping := range skillMappings {
        s.logger.Debug("Registering skill %d/%d: '%s' → vGroup '%s'",
            i+1, len(skillMappings), mapping.SkillName, mapping.VGroup)

        // Set vGroup context for Mock Registry (handled differently in production)
        if mockRegistry, ok := s.registry.(*MockNamingserverRegistry); ok {
            mockRegistry.SetVGroup(mapping.VGroup)
        }

        // Attempt to register to NamingServer
        if err := s.registry.Register(mapping.ServiceInstance); err != nil {
            s.logger.Error("Skill '%s' registration failed: %v", mapping.SkillName, err)

            // Step 3: Intelligent rollback on failure
            s.rollbackSkillRegistrations(registeredSkills)
            return fmt.Errorf("failed to register skill %s to NamingServer: %w",
                mapping.SkillName, err)
        }

        registeredSkills = append(registeredSkills, mapping)
        s.logger.Debug("Skill '%s' registered successfully", mapping.SkillName)
    }

    // Step 4: After all skills register successfully, atomically update local cache
    s.updateCaches(agent, skillMappings)

    s.logger.Info("Agent %s registration completed, successfully registered %d skills", agentId, len(skillMappings))
    return nil
}
```

**Four Key Phases of Intelligent Registration Mechanism:**

1. **Pre-check Phase**: Validate Agent skill validity, avoid invalid registrations
2. **Progressive Registration Phase**: Register skills one by one, track registration status in real-time
3. **Failure Rollback Phase**: Once registration failure is detected, immediately rollback registered skills
4. **Cache Synchronization Phase**: After all registrations succeed, atomically update local cache

This design ensures that even under network instability or partial NamingServer failures, system state remains consistent.

### 2. Multi-level Service Discovery: Dual Guarantee of Performance and Reliability
In the field of distributed service discovery, there's a classic trade-off: performance vs consistency. Traditional solutions usually can only choose one, while our multi-level service discovery mechanism achieves perfect balance through clever layered design.

**Design Philosophy:**

+ **First-level Query**: Local cache (ultra-high performance, millisecond response)
+ **Second-level Query**: NamingServer (strong consistency, second-level response)
+ **Degradation Strategy**: Intelligent fault detection and graceful degradation

The core idea of this design is the "proximity principle": prioritize the fastest data source while maximizing performance under reliability guarantees.

```go
func (s *SkillBasedNamingServerStorage) DiscoverUrlBySkill(ctx context.Context, skillName string) (string, error) {
    // 1. Priority lookup from NamingServer
    if hostUrl := s.lookupFromNamingServer(skillName); hostUrl != "" {
        return hostUrl, nil
    }

    // 2. Degrade to local cache
    s.cacheMutex.RLock()
    hostUrl, exists := s.skillToUrl[skillName]
    s.cacheMutex.RUnlock()

    if exists {
        return hostUrl, nil
    }

    return "", fmt.Errorf("skill %s not found", skillName)
}

func (s *SkillBasedNamingServerStorage) lookupFromNamingServer(skillName string) string {
    vGroup := fmt.Sprintf("skill-%s", skillName)
    instances, err := s.registry.Lookup(vGroup)

    if err != nil || len(instances) == 0 {
        return ""
    }

    return instances[0].Addr
}
```

### 3. Intelligent Update Strategy
The system can intelligently identify Agent change types and only re-register when skill structure changes:

```go
func (s *SkillBasedNamingServerStorage) updateAgent(ctx context.Context, newAgent *models.RegisteredAgent) error {
    existingAgent := s.agentCache[newAgent.GetID()]

    // Check if skills have structural changes
    if s.hasSkillsChanged(existingAgent.AgentCard.Skills, newAgent.AgentCard.Skills) {
        // Skills changed: delete + recreate
        s.Delete(ctx, newAgent.GetID())
        return s.Create(ctx, newAgent)
    }

    // Only metadata changed: in-place update
    s.agentCache[newAgent.GetID()] = newAgent
    return nil
}
```

## Configuration and Deployment
### Configuration File
```yaml
# config.yaml
naming_server:
  enabled: true
  address: "127.0.0.1:8091"
  username: ""
  password: ""

seata:
  server_addr: "127.0.0.1:8091"
  namespace: "public"
  cluster: "default"
  heartbeat_period: 5000
```

### Initialization Code
```go
func initializeStorage(config *Config) storage.Storage {
    if config.NamingServer.Enabled {
        // Use real Seata NamingServer
        registry := seata.NewNamingServerRegistry(config.NamingServer)
        return storage.NewSkillBasedNamingServerStorage(registry)
    } else {
        // Development mode uses Mock
        mockRegistry := storage.NewMockNamingserverRegistry()
        return storage.NewSkillBasedNamingServerStorage(mockRegistry)
    }
}
```

## Usage Examples
### 1. Agent Registration
```go
// Create Agent instance
agent := &models.RegisteredAgent{
    BaseResource: &common.BaseResource{
        ID: "python-agent-001",
    },
    AgentCard: models.AgentCard{
        URL: "http://localhost:8080",
        Skills: []models.AgentSkill{
            {
                ID:          "python-coding",
                Name:        "Python Programming",
                Description: "Provides Python code writing and debugging services",
                Tags:        []string{"programming", "python"},
            },
            {
                ID:          "data-analysis",
                Name:        "Data Analysis",
                Description: "Provides data processing and visualization services",
                Tags:        []string{"data", "analysis"},
            },
        },
    },
}

// Register to NamingServer
err := storage.Create(context.Background(), agent)
```

### 2. Skill Discovery
```go
// Discover service through skill name
pythonServiceUrl, err := storage.DiscoverUrlBySkill(ctx, "python-coding")
if err != nil {
    log.Printf("Python service discovery failed: %v", err)
    return
}

// Call specific skill service
client := &http.Client{}
req, _ := http.NewRequest("POST", pythonServiceUrl+"/execute", bytes.NewReader(payload))
resp, err := client.Do(req)
```

### 3. Skill Query
```go
// Query matching skills
matchingSkills := storage.FindSkillsByQuery("python")
for _, skill := range matchingSkills {
    fmt.Printf("Found skill: %s - %s\n", skill.Name, skill.Description)
}

// Get global skill card
globalCard := storage.GetGlobalAgentCard()
fmt.Printf("System has %d available skills\n", len(globalCard.Skills))
```

## Test Verification
Complete integration tests ensure system reliability:

```go
func TestNamingServerIntegration() {
    // 1. Create test environment
    mockRegistry := storage.NewMockNamingserverRegistry()
    skillStorage := storage.NewSkillBasedNamingServerStorage(mockRegistry)

    // 2. Register test Agent
    err := skillStorage.Create(ctx, testAgent)
    assert.NoError(t, err)

    // 3. Verify skill discovery
    url, err := skillStorage.DiscoverUrlBySkill(ctx, "python-coding")
    assert.NoError(t, err)
    assert.Equal(t, "http://localhost:8080", url)

    // 4. Verify skill deletion
    err = skillStorage.Delete(ctx, "test-agent-001")
    assert.NoError(t, err)

    // 5. Verify no discovery after deletion
    _, err = skillStorage.DiscoverUrlBySkill(ctx, "python-coding")
    assert.Error(t, err)
}
```

## Summary

This article provides an in-depth analysis of the design and implementation of Saga mode in Seata-Go, from theoretical foundations to practical applications, showcasing a complete distributed transaction processing solution. Through the txn-agent and AgentHub practical projects, we see the powerful application potential of Saga mode in modern microservice architectures.

The core value of Seata-Go Saga lies in:

1. **Complete Transaction Guarantee**: Through state machine design, ensuring eventual consistency of distributed transactions
2. **Flexible Compensation Mechanism**: Supporting complex business rollback logic, adapting to various business scenarios
3. **Robust Exception Handling**: Comprehensive error capture and fault tolerance mechanisms, ensuring system stability
4. **AI-Driven Innovation**: Combined with AI technology, simplifying Saga configuration design and generation processes