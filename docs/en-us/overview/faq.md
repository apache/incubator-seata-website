# FAQ

### Q: What's the reason of java.lang.NoSuchMethodError: com.fasterxml.jackson.databind.jsontype.TypeSerializer.typeId(Ljava/lang/Object;Lcom/fasterxml/jackson/core/JsonToken;) ?

**A:**
when the undolog serialization is configured as Jackson, the Jackson version needs to be 2.9.9+

********
### Q: Dose Seata support high availability ?

**A:** 
supported from version 0.6, tc USES db mode to share global transaction session information, and the registry USES non-file seata-supported third-party registries

********
### Q: What is the use of the record of undo log table log status = 1 ?

**A:** 

* Scenario:  after A branch transaction A registers TC, A global transaction rollback occurs before A local transaction commits
**Consequence:** global transaction rollback succeeds, a resource is occupied, resulting in resource suspension problem
**Anti-suspension measures:** when a rolls back and finds that the rollback undo has not been inserted, an undo record with log_status=1 is inserted. When a local transaction (business write operation SQL and corresponding undo are a local transaction) is committed, it fails due to the primary key conflict of the undo table.

********
### Q: How to use the Seata framework to ensure transaction isolation?

**A:** 
Since seata phase 1 local transactions have been committed, enhanced isolation is needed to prevent other transactions from dirty reads and dirty writes.
  1. Dirty read Select statement with for update, proxy method with @GlobalLock or @GlobalTransaction
  2. Dirty write You must use @globaltransaction
    note：If the interface of the business you are querying does not use the @globaltransactional annotation, which means there is no need for distributed transactions on the method, you can annotate the @globallock annotation on the method and add a for update statement to the query.
        If your query interface has the @globaltransactional annotation on the outer edge of the transactional link, you can simply add a for update statement to your query. The reason for designing this annotation is that before it is available, distributed transactions need to query the committed data, but the business does not need distributed transactions.
        Using the GlobalTransactional annotation adds some unnecessary additional RPC overhead such as begin returning xid, commit transaction, etc. GlobalLock simplifies the RPC process for higher performance.

********
### Q: When Failed to roll back dirty data, what shall I do ?

**A:** 
  1. The dirty data needs to be processed manually, and the data can be corrected according to the log prompt, or the corresponding undo can be deleted (the FailureHandler can be customized for email notification or other purposes).
  2. This option is not recommended when "undo" mirror validation is turned off during rollback.
    node：It is recommended to isolate the dirty data in advance

********
### Q: Why the global transaction state is not "begin" when a branch transaction is registered ？

A:  
    **abnormal：**Could not register branch into global session xid = status = Rollbacked（Two phase state and Rollbacking, AsyncCommitting, etc） while expecting Begin
    **describe：**When a branch transaction is registered, the global transaction status must be a one-phase state "begin", and registration other than "begin" is not allowed. It belongs to the normal processing at the seata framework level, and users can solve it from their own business level.
    This exception can occur in the following situations (you can continue to add).

  1. The branch transaction is asynchronous. The global transaction is not aware of its progress. The global transaction has entered phase 2 before the asynchronous branch comes to register.
  2. Service a rpc service b timed out (dubbo, feign, etc. timeout by default for 1 second), a throws an exception to tm, tm informs tc to roll back, but b still receives the request (network delay or rpc framework retry), and then registers at tc Global transaction was found to be rolling back.
  3. Tc is aware of the global transaction timeout (@globaltransactional (timeoutMills = default 60 seconds)), actively changes the state and notifies each branch transaction to rollback when a new branch transaction is registered.

********
### Q: When Nacos is used as the Seata configuration center, the project startup error report cannot find the service. How to check and deal with it ?

A： 
abnormal：io.seata.common.exception.FrameworkException: can not register RM,err:can not connect to services-server.
  1. Check the nacos configuration list to see if the seata configuration has been imported successfully.
  2. Check the list of nacos services to see if serverAddr has been registered successfully.
  3. Check the namespace, registry.nacos.namespace and config.nacos.namespace in the client's registry.conf and enter the nacos namespace ID. The default is "". The server and client correspond to the namespace.
      It is public and is a reserved control of nacos. If you need to create your own namespace, it is better not to use the same name as public, and use a name that has specific semantics in an actual business scenario.
  4. For the list of services on nacos, the IP address corresponding to serverAddr address should be the IP address specified for seata startup, such as: sh seata-server.sh-p 8091-h 122.51.204.197-m file.
  5. Check to see if the seata/conf/nacos-config.txt, transaction group service.vgroup_mapping.trade_group=default configuration is the same as the project group configuration name.
  6. Telnet IP port view ports are open as well as firewall status.
    note：1.Version 080 starts the specified IP problem, the exception "Exception in thread "main" java.lang.RuntimeException: java.net.BindException: Cannot assign request address", please upgrade to version 081 or above.
    The project USES jdk13 and starts with 
```verilog
   Error: Could not create the Java Virtual Machine
   Error: A fatal exception has occurred. Program will exit.
```
​    If the environment is sh, replace the last paragraph in the script：
```shell
        exec "$JAVACMD" $JAVA_OPTS -server -Xmx2048m -Xms2048m -Xmn1024m -Xss512k -XX:SurvivorRatio=10 -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -XX:
MaxDirectMemorySize=1024m -XX:-OmitStackTraceInFastThrow -XX:-UseAdaptiveSizePolicy -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath="$BASEDIR"/logs
/java_heapdump.hprof -XX:+DisableExplicitGC -XX:+CMSParallelRemarkEnabled -XX:+
UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=75 -verbose:gc -Dio.netty.leakDetectionLevel=advanced \
          -classpath "$CLASSPATH" \
          -Dapp.name="seata-server" \
          -Dapp.pid="$$" \
          -Dapp.repo="$REPO" \
          -Dapp.home="$BASEDIR" \
          -Dbasedir="$BASEDIR" \
          io.seata.server.Server \
          "$@"
```
