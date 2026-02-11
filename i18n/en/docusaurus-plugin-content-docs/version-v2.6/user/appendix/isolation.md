---
title: Transaction Isolation
keywords: [Seata Transaction Isolation]  
description: Seata Transaction Isolation
---

# Seata Transaction Isolation

> This article aims to help users understand how to correctly implement transaction isolation when using Seata **AT mode** to prevent dirty reads and writes.
>
> **It is expected that readers have already read the introduction to the AT mode on the Seata official website and have an understanding of local database locks.**
>
> (For example, when two transactions are simultaneously updating the same record, only the transaction that holds the record lock can update successfully, while the other transaction must wait until the record lock is released, or until the transaction times out)

First, take a look at this piece of code. Although it looks "basic," the main thing that the persistence layer framework actually does for us is just that.
```java
@Service
public class StorageService {

    @Autowired
    private DataSource dataSource;

    @GlobalTransactional
    public void batchUpdate() throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = dataSource.getConnection();
            connection.setAutoCommit(false);
            String sql = "update storage_tbl set count = ?" +
                "    where id = ? and commodity_code = ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, 100);
            preparedStatement.setLong(2, 1);
            preparedStatement.setString(3, "2001");
            preparedStatement.executeUpdate();
            connection.commit();
        } catch (Exception e) {
            throw e;
        } finally {
            IOutils.close(preparedStatement);
            IOutils.close(connection);
        }
    }

}
```
## Starting with the Proxy Data Source

When using the AT mode, the most important thing is the proxy data source. So what is the purpose of using `DataSourceProxy` to proxy the data source?

`DataSourceProxy` can help us obtain several important proxy objects

- Obtain `ConnectionProxy` through `DataSourceProxy.getConnection()`

- Obtain `StatementProxy` through `ConnectionProxy.prepareStatement(...)`

Seata's implementation of transaction isolation is hidden in these 2 proxies, let me outline the implementation logic first.

### **Processing logic of `StatementProxy.executeXXX()`**

- When calling `io.seata.rm.datasource.StatementProxy.executeXXX()`, the SQL is passed to `io.seata.rm.datasource.exec.ExecuteTemplate.execute(...)` to process.

    - In the `ExecuteTemplate.execute(...)` method, Seata uses different Executers based on different `dbType` and SQL statement types, and calls the `execute(Object... args)` method of the `io.seata.rm.datasource.exec.Executer` class.
    - If a DML type Executer is chosen, the following main actions are performed:
        - Pre-query image (select for update, obtaining local lock at this time)
        - Execute business SQL
        - Post-query image
        - Prepare undoLog
    - If your SQL is `select for update`, then `SelectForUpdateExecutor` will be used (Seata proxies `select for update`), and the logic for post-processing after proxying is as follows:
        - First, execute select for update (obtain the database's local lock)
        - If in `@GlobalTransactional` or `@GlobalLock`, **check** if there is a global lock
        - If there is a global lock, under the condition of not starting a local transaction, rollback the local transaction, then re-acquire the local lock and global lock, and so on, unless the global lock is obtained.

### **Handling logic of `ConnectionProxy.commit()`**
- In a global transaction (i.e., the data persistence method has `@GlobalTransactional`)
    - Register branch transaction, obtain global lock
    - UndoLog data persistence
    - Let the database commit the current transaction
- In `@GlobalLock` (i.e., the data persistence method has `@GlobalLock`)
    - Query the TC for the existence of a global lock, and if it exists, throw an exception
    - Let the database commit the current transaction
- For other cases (the `else` branch)
    - Let the database commit the current transaction

### **Purpose of `@GlobalTransactional`**
Identifies a global transaction

### **Purpose of `@GlobalLock` + `select for update`**
If a method like `updateA()` has `@GlobalLock + select for update`, Seata, in processing, will first obtain a database local lock, then query if there is a global lock for that record, and if there is, it will throw a LockConflictException.

## Let's first give an example of dirty write, and then see how Seata prevents dirty write

Let's assume your business code is like this:
- `updateAll()` is used to update records in both table A and B, `updateA()` and `updateB()` are used to update records in table A and B respectively
- `updateAll()` has already been annotated with `@GlobalTransactional`
```java
class YourBussinessService {

    DbServiceA serviceA;
    DbServiceB serviceB;

    @GlobalTransactional
    public boolean updateAll(DTO dto) {
        serviceA.update(dto.getA());
        serviceB.update(dto.getB());
    }

    public boolean updateA(DTO dto) {
        serviceA.update(dto.getA());
    }

}
```
```java
class DbServiceA {
    @Transactional
    public boolean update(A a) {
    
    }
}
```
![dirty-write](/img/seata-isolation/dirty-write.png)
                                                                                       |

## **How to prevent dirty write using Seata?**

### Method 1: Add `@GlobalTransactional` to `updateA()` as well, how does Seata ensure transaction isolation in this case?

```java
class DbServiceA {

    @GlobalTransactional
    @Transactional
    public boolean updateA(DTO dto) {

        serviceA.update(dto.getA());

    }
}
```
- `updateAll()` is called first (not completed), `updateA()` is called afterwards
  
![dirty-write](/img/seata-isolation/prevent-dirty-write-by-GlobalTransaction.png)


### Method 2: **@GlobalLock + select for update**
```java
class DbServiceA {
    
    @GlobalLock
    @Transactional
    public boolean updateA(DTO dto) {

        serviceA.selectForUpdate(dto.getA());

        serviceA.update(dto.getA());

    }
}
```
- `updateAll()` is called first (not completed), `updateA()` is called afterwards

![dirty-write](/img/seata-isolation/prevent-dirty-write-by-GlobalLock.png)



- What if `updateA()` is called first (not completed), and then `updateAll()` is called?
  Since both transactions need to acquire local locks first, dirty write will not occur.
- Someone may ask, "Why do we need to add select for update here? Can't we prevent dirty write with just @GlobalLock?"
  Yes. But please refer to the diagram above, select for update brings a few advantages:
  - Lock conflicts are handled more gracefully. If only @GlobalLock is used, it immediately throws an exception when a global lock is detected. It's a pity to release the global lock after a little "persistence" and throw an exception.
  - In `updateA()`, we can use select for update to get the latest A and then perform the update.


## **How to prevent dirty reads?**

### Scenario:   One business calls `updateAll()` first, `updateAll()` is not completed, and then another business calls `queryA()`

![dirty-write](/img/seata-isolation/prevent-dirty-read.png)

---

# **Source Code Display**
```java
@Service
public class StorageService {

    @Autowired
    private DataSource dataSource;

    @GlobalTransactional
    public void update() throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = dataSource.getConnection();
            connection.setAutoCommit(false);
            String sql = "update storage_tbl set count = ?" +
                "    where id = ? and commodity_code = ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, 100);
            preparedStatement.setLong(2, 1);
            preparedStatement.setString(3, "2001");
            preparedStatement.execute();
            connection.commit();
        } catch (Exception e) {
            throw e;
        } finally {
            IOutils.close(preparedStatement);
            IOutils.close(connection);
        }
    }

}
```
Although this code looks very basic and does not use the persistence layer framework, if we abstract what the framework does for us, it is actually the above code.


**Brief explanation of the context of the following source code introduction (mainly focusing on source code related to transaction isolation)**
- Purpose of proxy data source
   - The role of `DataSourceProxy` (returns `ConnectionProxy`)
     - Introducing a small function of `ConnectionProxy` (storing undolog)
   - The role of `ConnectionProxy` (returns `StatementProxy`)
   - Processing logic of `StatementProxy.execute()`
     - Execution logic of `io.seata.rm.datasource.exec.UpdateExecutor` (pre-check image, execute sql, post-check image, prepare undoLog)
     - Execution logic of `SelectForUpdateExecutor` (fight for local lock, check global lock. If there is a global lock, roll back, fight again...)
   - Processing logic of `ConnectionProxy.commit()` (register branch transaction (fight for global lock), write undoLog, database commit)
- Introducing RootContext
- Different proxy logic for `GlobalTransactionalInterceptor`
   - How to handle with `@GlobalTransactional`
   - How to deal with `@GlobalLock`

## **The role of DataSourceProxy**

DataSourceProxy helps us obtain several important proxy objects

- Obtain `ConnectionProxy` through `DataSourceProxy.getConnection()`


  ```java
  package io.seata.rm.datasource;

  import java.sql.Connection;

  public class DataSourceProxy extends AbstractDataSourceProxy implements Resource {
      
      @Override
      public ConnectionProxy getConnection() throws SQLException {
          Connection targetConnection = targetDataSource.getConnection();
          return new ConnectionProxy(this, targetConnection);
      }
  }
  ```

  - First, let's introduce `ConnectionContext` in `ConnectionProxy`, one of its functions is to **store undoLog**.

    ```java
    package io.seata.rm.datasource;
    
    import io.seata.rm.datasource.undo.SQLUndoLog;

    public class ConnectionProxy extends AbstractConnectionProxy {

        private ConnectionContext context = new ConnectionContext();

        public void appendUndoLog(SQLUndoLog sqlUndoLog) {
            context.appendUndoItem(sqlUndoLog);
        }

    }
    ```
    ```java
    package io.seata.rm.datasource;

    public class ConnectionContext {

        private static final Savepoint DEFAULT_SAVEPOINT = new Savepoint() {
            @Override
            public int getSavepointId() throws SQLException {
                return 0;
            }

            @Override
            public String getSavepointName() throws SQLException {
                return "DEFAULT_SEATA_SAVEPOINT";
            }
        };
        
        private final Map<Savepoint, List<SQLUndoLog>> sqlUndoItemsBuffer = new LinkedHashMap<>();

        private Savepoint currentSavepoint = DEFAULT_SAVEPOINT;

        void appendUndoItem(SQLUndoLog sqlUndoLog) {
            sqlUndoItemsBuffer.computeIfAbsent(currentSavepoint, k -> new ArrayList<>()).add(sqlUndoLog);
        }

    }
    
    ```

## **Get `StatementProxy` through `ConnectionProxy.prepareStatement(...)`**

  ```java
  package io.seata.rm.datasource;

  public class ConnectionProxy extends AbstractConnectionProxy {

      public ConnectionProxy(DataSourceProxy dataSourceProxy, Connection targetConnection) {
          super(dataSourceProxy, targetConnection);
      }

  }
  ```
  ```java
  package io.seata.rm.datasource;

  import java.sql.Connection;

  public abstract class AbstractConnectionProxy implements Connection {

      protected Connection targetConnection;

      public AbstractConnectionProxy(DataSourceProxy dataSourceProxy, Connection targetConnection) {
          this.dataSourceProxy = dataSourceProxy;
          this.targetConnection = targetConnection;
      }

      @Override
      public PreparedStatement prepareStatement(String sql) throws SQLException {
          String dbType = getDbType();
          // support oracle 10.2+
          PreparedStatement targetPreparedStatement = null;
          if (BranchType.AT == RootContext.getBranchType()) { //为什么这里会返回AT？
              List<SQLRecognizer> sqlRecognizers = SQLVisitorFactory.get(sql, dbType);
              if (sqlRecognizers != null && sqlRecognizers.size() == 1) {
                  SQLRecognizer sqlRecognizer = sqlRecognizers.get(0);
                  if (sqlRecognizer != null && sqlRecognizer.getSQLType() == SQLType.INSERT) {
                      TableMeta tableMeta = TableMetaCacheFactory.getTableMetaCache(dbType).getTableMeta(getTargetConnection(),
                              sqlRecognizer.getTableName(), getDataSourceProxy().getResourceId());
                      String[] pkNameArray = new String[tableMeta.getPrimaryKeyOnlyName().size()];
                      tableMeta.getPrimaryKeyOnlyName().toArray(pkNameArray);

                      // If it is an insert statement, the PreparedStatement created here needs to be able to return the automatically generated primary key, so use this prepareStatement()
                      targetPreparedStatement = getTargetConnection().prepareStatement(sql,pkNameArray);

                  }
              }
          }
          if (targetPreparedStatement == null) {
              targetPreparedStatement = getTargetConnection().prepareStatement(sql);
          }
          return new PreparedStatementProxy(this, targetPreparedStatement, sql);
      }


      public Connection getTargetConnection() {
          return targetConnection;
      }

  }
  ```

  > First, let's raise a question here, and explain it later.  
  > **How could `RootContext.getBranchType()` return AT?**

## **Processing logic for `StatementProxy.execute()`**

- When calling `io.seata.rm.datasource.StatementProxy.execute()`, the SQL will be handed over to `io.seata.rm.datasource.exec.ExecuteTemplate.execute(...)` for processing.
    ```java
    package io.seata.rm.datasource;

    public class PreparedStatementProxy extends AbstractPreparedStatementProxy
        implements PreparedStatement, ParametersHolder {

        @Override
        public boolean execute() throws SQLException {
            return ExecuteTemplate.execute(this, (statement, args) -> statement.execute());
        }

    }
    ```

    - In the `ExecuteTemplate.execute(...)` method, Seata uses different Executers based on the dbType and the type of SQL statement, and calls the `execute(Object... args)` method of the `io.seata.rm.datasource.exec.Executer` class.
        ```java
        package io.seata.rm.datasource.exec;


        public class ExecuteTemplate {

            public static <T, S extends Statement> T execute(StatementProxy<S> statementProxy,
                                                     StatementCallback<T, S> statementCallback,
                                                     Object... args) throws SQLException {
                return execute(null, statementProxy, statementCallback, args);
            }

            public static <T, S extends Statement> T execute(List<SQLRecognizer> sqlRecognizers,
                                                 StatementProxy<S> statementProxy,
                                                 StatementCallback<T, S> statementCallback,
                                                 Object... args) throws SQLException {
                if (!RootContext.requireGlobalLock() && BranchType.AT != RootContext.getBranchType()) {
                    // Just work as original statement
                    return statementCallback.execute(statementProxy.getTargetStatement(), args);
                }

                String dbType = statementProxy.getConnectionProxy().getDbType();
                if (CollectionUtils.isEmpty(sqlRecognizers)) {
                    sqlRecognizers = SQLVisitorFactory.get(
                            statementProxy.getTargetSQL(),
                            dbType);
                }
                Executor<T> executor;
                if (CollectionUtils.isEmpty(sqlRecognizers)) {
                    executor = new PlainExecutor<>(statementProxy, statementCallback);
                } else {
                    if (sqlRecognizers.size() == 1) {
                        SQLRecognizer sqlRecognizer = sqlRecognizers.get(0);
                        switch (sqlRecognizer.getSQLType()) {
                            case INSERT:
                                executor = EnhancedServiceLoader.load(InsertExecutor.class, dbType,
                                        new Class[]{StatementProxy.class, StatementCallback.class, SQLRecognizer.class},
                                        new Object[]{statementProxy, statementCallback, sqlRecognizer});
                                break;
                            case UPDATE:
                                executor = new UpdateExecutor<>(statementProxy, statementCallback, sqlRecognizer);
                                break;
                            case DELETE:
                                executor = new DeleteExecutor<>(statementProxy, statementCallback, sqlRecognizer);
                                break;
                            case SELECT_FOR_UPDATE:
                                executor = new SelectForUpdateExecutor<>(statementProxy, statementCallback, sqlRecognizer);
                                break;
                            default:
                                executor = new PlainExecutor<>(statementProxy, statementCallback);
                                break;
                        }
                    } else {
                        executor = new MultiExecutor<>(statementProxy, statementCallback, sqlRecognizers);
                    }
                }
                T rs;
                try {
                    rs = executor.execute(args);
                } catch (Throwable ex) {
                    if (!(ex instanceof SQLException)) {
                        // Turn other exception into SQLException
                        ex = new SQLException(ex);
                    }
                    throw (SQLException) ex;
                }
                return rs;
            }

        }
        ```
        >
        > Also, a question is raised here, explained later.
        > **How does `RootContext.requireGlobalLock()` determine if the global lock is needed?**
        >
        Taking `io.seata.rm.datasource.exec.UpdateExecutor` as an example, `UpdateExecutor` extends `AbstractDMLBaseExecutor` extends `BaseTransactionalExecutor`.
        Observing what the `execute()` method does
        ```java
        package io.seata.rm.datasource.exec;

        public abstract class BaseTransactionalExecutor<T, S extends Statement> implements Executor<T> {
            

            protected StatementProxy<S> statementProxy;

            protected StatementCallback<T, S> statementCallback;

            protected SQLRecognizer sqlRecognizer;

            public BaseTransactionalExecutor(StatementProxy<S> statementProxy, StatementCallback<T, S> statementCallback,
                SQLRecognizer sqlRecognizer) {
                this.statementProxy = statementProxy;
                this.statementCallback = statementCallback;
                this.sqlRecognizer = sqlRecognizer;
            }

            @Override
            public T execute(Object... args) throws Throwable {
                String xid = RootContext.getXID();
                if (xid != null) {
                    statementProxy.getConnectionProxy().bind(xid);
                }

                statementProxy.getConnectionProxy().setGlobalLockRequire(RootContext.requireGlobalLock());
                return doExecute(args);
            }

        }
        ```
        ```java
        public abstract class AbstractDMLBaseExecutor<T, S extends Statement> extends BaseTransactionalExecutor<T, S> {
            
            public AbstractDMLBaseExecutor(StatementProxy<S> statementProxy, StatementCallback<T, S> statementCallback,
                                   SQLRecognizer sqlRecognizer) {
                super(statementProxy, statementCallback, sqlRecognizer);
            }

            @Override
            public T doExecute(Object... args) throws Throwable {
                AbstractConnectionProxy connectionProxy = statementProxy.getConnectionProxy();
                if (connectionProxy.getAutoCommit()) {
                    return executeAutoCommitTrue(args);
                } else {
                    return executeAutoCommitFalse(args);
                }
            }

            protected T executeAutoCommitTrue(Object[] args) throws Throwable {
                ConnectionProxy connectionProxy = statementProxy.getConnectionProxy();
                try {
                    connectionProxy.changeAutoCommit(); // 注意，你如果没开启事务，seata帮你开启
                    return new LockRetryPolicy(connectionProxy).execute(() -> {
                        T result = executeAutoCommitFalse(args);
                        connectionProxy.commit(); // 帮你开启事务后，通过connectionProxy来提交
                        return result;
                    });
                } catch (Exception e) {
                    // when exception occur in finally,this exception will lost, so just print it here
                    LOGGER.error("execute executeAutoCommitTrue error:{}", e.getMessage(), e);
                    if (!LockRetryPolicy.isLockRetryPolicyBranchRollbackOnConflict()) {
                        connectionProxy.getTargetConnection().rollback();
                    }
                    throw e;
                } finally {
                    connectionProxy.getContext().reset();
                    connectionProxy.setAutoCommit(true);
                }
            }

            protected T executeAutoCommitFalse(Object[] args) throws Exception {
                if (!JdbcConstants.MYSQL.equalsIgnoreCase(getDbType()) && isMultiPk()) {
                    throw new NotSupportYetException("multi pk only support mysql!");
                }
                TableRecords beforeImage = beforeImage();
                T result = statementCallback.execute(statementProxy.getTargetStatement(), args);
                TableRecords afterImage = afterImage(beforeImage);
                prepareUndoLog(beforeImage, afterImage);
                return result;
            }
        }
        ```
        ```java
        package io.seata.rm.datasource.exec;

        public class UpdateExecutor<T, S extends Statement> extends AbstractDMLBaseExecutor<T, S> {
            
            public UpdateExecutor(StatementProxy<S> statementProxy, StatementCallback<T, S> statementCallback,
                                SQLRecognizer sqlRecognizer) {
                super(statementProxy, statementCallback, sqlRecognizer);
            }

        }

        ```

    - If you have chosen a DML type Executer, you can see in the executeAutoCommitFalse() method above, it mainly does the following:
        - Query before image (select for update, so local lock is acquired at this time)
            ```java
            package io.seata.rm.datasource.exec;

            public class UpdateExecutor<T, S extends Statement> extends AbstractDMLBaseExecutor<T, S> {
                
                private static final boolean ONLY_CARE_UPDATE_COLUMNS = CONFIG.getBoolean(
                        ConfigurationKeys.TRANSACTION_UNDO_ONLY_CARE_UPDATE_COLUMNS, DefaultValues.DEFAULT_ONLY_CARE_UPDATE_COLUMNS); // 默认为true

                @Override
                protected TableRecords beforeImage() throws SQLException {
                    ArrayList<List<Object>> paramAppenderList = new ArrayList<>();
                    TableMeta tmeta = getTableMeta();
                    String selectSQL = buildBeforeImageSQL(tmeta, paramAppenderList);
                    // SELECT id, count FROM storage_tbl WHERE id = ? FOR UPDATE
                    return buildTableRecords(tmeta, selectSQL, paramAppenderList);
                }

                private String buildBeforeImageSQL(TableMeta tableMeta, ArrayList<List<Object>> paramAppenderList) {
                    SQLUpdateRecognizer recognizer = (SQLUpdateRecognizer) sqlRecognizer;
                    List<String> updateColumns = recognizer.getUpdateColumns();
                    StringBuilder prefix = new StringBuilder("SELECT ");
                    StringBuilder suffix = new StringBuilder(" FROM ").append(getFromTableInSQL());
                    String whereCondition = buildWhereCondition(recognizer, paramAppenderList);
                    if (StringUtils.isNotBlank(whereCondition)) {
                        suffix.append(WHERE).append(whereCondition);
                    }
                    String orderBy = recognizer.getOrderBy();
                    if (StringUtils.isNotBlank(orderBy)) {
                        suffix.append(orderBy);
                    }
                    ParametersHolder parametersHolder = statementProxy instanceof ParametersHolder ? (ParametersHolder)statementProxy : null;
                    String limit = recognizer.getLimit(parametersHolder, paramAppenderList);
                    if (StringUtils.isNotBlank(limit)) {
                        suffix.append(limit);
                    }
                    suffix.append(" FOR UPDATE");
                    StringJoiner selectSQLJoin = new StringJoiner(", ", prefix.toString(), suffix.toString());
                    if (ONLY_CARE_UPDATE_COLUMNS) {
                        if (!containsPK(updateColumns)) {// 如果本次更新的行不包含主键，那select for update的时候加上主键
                            selectSQLJoin.add(getColumnNamesInSQL(tableMeta.getEscapePkNameList(getDbType())));
                        }
                        for (String columnName : updateColumns) {
                            selectSQLJoin.add(columnName);
                        }
                    } else {
                        for (String columnName : tableMeta.getAllColumns().keySet()) {
                            selectSQLJoin.add(ColumnUtils.addEscape(columnName, getDbType()));
                        }
                    }
                    return selectSQLJoin.toString();
                }


                protected TableRecords buildTableRecords(TableMeta tableMeta, String selectSQL, ArrayList<List<Object>> paramAppenderList) throws SQLException {
                    ResultSet rs = null;
                    try (PreparedStatement ps = statementProxy.getConnection().prepareStatement(selectSQL)) { // 执行select for update，然后就拿到了本地锁
                        if (CollectionUtils.isNotEmpty(paramAppenderList)) {
                            for (int i = 0, ts = paramAppenderList.size(); i < ts; i++) {
                                List<Object> paramAppender = paramAppenderList.get(i);
                                for (int j = 0, ds = paramAppender.size(); j < ds; j++) {
                                    ps.setObject(i * ds + j + 1, paramAppender.get(j));
                                }
                            }
                        }
                        rs = ps.executeQuery();
                        return TableRecords.buildRecords(tableMeta, rs);
                    } finally {
                        IOUtil.close(rs);
                    }
                }
            }

            ```

        - Execute business SQL
        - Query the mirrored image
          ```java
            package io.seata.rm.datasource.exec;

            public class UpdateExecutor<T, S extends Statement> extends AbstractDMLBaseExecutor<T, S> {
                
                @Override
                protected TableRecords afterImage(TableRecords beforeImage) throws SQLException {
                    TableMeta tmeta = getTableMeta();
                    if (beforeImage == null || beforeImage.size() == 0) {
                        return TableRecords.empty(getTableMeta());
                    }
                    String selectSQL = buildAfterImageSQL(tmeta, beforeImage);
                    //SELECT id, count FROM storage_tbl WHERE (id) in ( (?) )
                    ResultSet rs = null;
                    try (PreparedStatement pst = statementProxy.getConnection().prepareStatement(selectSQL)) {
                        SqlGenerateUtils.setParamForPk(beforeImage.pkRows(), getTableMeta().getPrimaryKeyOnlyName(), pst);
                        rs = pst.executeQuery();
                        return TableRecords.buildRecords(tmeta, rs);
                    } finally {
                        IOUtil.close(rs);
                    }
                }
            }
          ```
        - Prepare undoLog
            ```java
            public abstract class BaseTransactionalExecutor<T, S extends Statement> implements Executor<T> {
                
                protected void prepareUndoLog(TableRecords beforeImage, TableRecords afterImage) throws SQLException {
                    if (beforeImage.getRows().isEmpty() && afterImage.getRows().isEmpty()) {
                        return;
                    }
                    if (SQLType.UPDATE == sqlRecognizer.getSQLType()) {
                        if (beforeImage.getRows().size() != afterImage.getRows().size()) {
                            throw new ShouldNeverHappenException("Before image size is not equaled to after image size, probably because you updated the primary keys.");
                        }
                    }
                    ConnectionProxy connectionProxy = statementProxy.getConnectionProxy();

                    TableRecords lockKeyRecords = sqlRecognizer.getSQLType() == SQLType.DELETE ? beforeImage : afterImage;
                    String lockKeys = buildLockKey(lockKeyRecords);
                    if (null != lockKeys) {
                        connectionProxy.appendLockKey(lockKeys);

                        SQLUndoLog sqlUndoLog = buildUndoItem(beforeImage, afterImage);
                        connectionProxy.appendUndoLog(sqlUndoLog); // 把undoLog存到connectionProxy中，具体怎么回事上面有提过
                    }
                }
            }
            ```
    - If your sql is select for update, `SelectForUpdateExecutor` will be used (Seata proxies select for update), and the processing logic after proxy is as follows:
        - First execute select for update (obtain the database local lock)
        - If it is in `@GlobalTransactional` or `@GlobalLock`, **check** whether there is a global lock
        - If there is a global lock, and local transaction is not started, roll back the local transaction, then re-acquire the local lock and query the global lock until the global lock is released
        ```java
           package io.seata.rm.datasource.exec;

           public class SelectForUpdateExecutor<T, S extends Statement> extends BaseTransactionalExecutor<T, S> {
                   @Override
                    public T doExecute(Object... args) throws Throwable {
                        Connection conn = statementProxy.getConnection();
                        DatabaseMetaData dbmd = conn.getMetaData();
                        T rs;
                        Savepoint sp = null;
                        boolean originalAutoCommit = conn.getAutoCommit();
                        try {
                            if (originalAutoCommit) {
                                /*
                                 * In order to hold the local db lock during global lock checking
                                 * set auto commit value to false first if original auto commit was true
                                 */
                                conn.setAutoCommit(false);
                            } else if (dbmd.supportsSavepoints()) {
                                /*
                                 * In order to release the local db lock when global lock conflict
                                 * create a save point if original auto commit was false, then use the save point here to release db
                                 * lock during global lock checking if necessary
                                 */
                                sp = conn.setSavepoint();
                            } else {
                                throw new SQLException("not support savepoint. please check your db version");
                            }

                            LockRetryController lockRetryController = new LockRetryController();
                            ArrayList<List<Object>> paramAppenderList = new ArrayList<>();
                            String selectPKSQL = buildSelectSQL(paramAppenderList);
                            while (true) {
                                try {
                                    // #870
                                    // execute return Boolean
                                    // executeQuery return ResultSet
                                    rs = statementCallback.execute(statementProxy.getTargetStatement(), args); // execute select for update (get database local lock)
                                    // Try to get global lock of those rows selected
                                    TableRecords selectPKRows = buildTableRecords(getTableMeta(), selectPKSQL, paramAppenderList);
                                    String lockKeys = buildLockKey(selectPKRows);
                                    if (StringUtils.isNullOrEmpty(lockKeys)) {
                                        break;
                                    }

                                    if (RootContext.inGlobalTransaction() || RootContext.requireGlobalLock()) {
                                        // Do the same thing under either @GlobalTransactional or @GlobalLock, 
                                        // that only check the global lock  here.
                                        statementProxy.getConnectionProxy().checkLock(lockKeys);
                                    } else {
                                        throw new RuntimeException("Unknown situation!");
                                    }
                                    break;
                                } catch (LockConflictException lce) {
                                    if (sp != null) {
                                        conn.rollback(sp);
                                    } else {
                                        conn.rollback();// Roll back and release local lock
                                    }
                                    // trigger retry
                                    lockRetryController.sleep(lce);
                                }
                            }
                        } finally {
                            if (sp != null) {
                                try {
                                    if (!JdbcConstants.ORACLE.equalsIgnoreCase(getDbType())) {
                                        conn.releaseSavepoint(sp);
                                    }
                                } catch (SQLException e) {
                                    LOGGER.error("{} release save point error.", getDbType(), e);
                                }
                            }
                            if (originalAutoCommit) {
                                conn.setAutoCommit(true);
                            }
                        }
                        return rs;
                    }



           }
        ```

## **Processing Logic of `ConnectionProxy.commit()`**
```java
public class ConnectionProxy extends AbstractConnectionProxy {

    private final static LockRetryPolicy LOCK_RETRY_POLICY = new LockRetryPolicy();

    private ConnectionContext context = new ConnectionContext();

    @Override
    public void commit() throws SQLException {
        try {
            LOCK_RETRY_POLICY.execute(() -> {
                doCommit();
                return null;
            });
        } catch (SQLException e) {
            if (targetConnection != null && !getAutoCommit() && !getContext().isAutoCommitChanged()) {
                rollback();
            }
            throw e;
        } catch (Exception e) {
            throw new SQLException(e);
        }
    }

    private void doCommit() throws SQLException {
        if (context.inGlobalTransaction()) {
            processGlobalTransactionCommit();
        } else if (context.isGlobalLockRequire()) {
            processLocalCommitWithGlobalLocks();
        } else {
            targetConnection.commit();
        }
    }

}
```

   > Also, a question has been raised here, which will be explained later.
   > How does `ConnectionContext` in `ConnectionProxy` determine `inGlobalTransaction()` or `isGlobalLockRequire()`?

- In a global transaction (i.e., data persistence method with `@GlobalTransactional`)
    - Register branch transaction, acquire global lock
    - Store undo log data
    - Commit the transaction in the database
    ```java
        public class ConnectionProxy extends AbstractConnectionProxy {

            private final static LockRetryPolicy LOCK_RETRY_POLICY = new LockRetryPolicy();

            private ConnectionContext context = new ConnectionContext();
            
            private void processGlobalTransactionCommit() throws SQLException {
                try {
                    register(); // Register branch and contend for global lock
                } catch (TransactionException e) {
                    recognizeLockKeyConflictException(e, context.buildLockKeys());
                }
                try {
                    UndoLogManagerFactory.getUndoLogManager(this.getDbType()).flushUndoLogs(this); // Store undolog
                    targetConnection.commit(); // Commit branch transaction
                } catch (Throwable ex) {
                    LOGGER.error("process connectionProxy commit error: {}", ex.getMessage(), ex);
                    report(false);
                    throw new SQLException(ex);
                }
                if (IS_REPORT_SUCCESS_ENABLE) {
                    report(true);
                }
                context.reset();
            }

            private void register() throws TransactionException {
                if (!context.hasUndoLog() || !context.hasLockKey()) {
                    return;
                }
                Long branchId = DefaultResourceManager.get().branchRegister(BranchType.AT, getDataSourceProxy().getResourceId(),
                    null, context.getXid(), null, context.buildLockKeys());
                context.setBranchId(branchId);
            }


        }
        ```

- In `@GlobalLock` (i.e., data persistence method with `@GlobalLock`):
    - Query tc for the presence of global lock
    - Commit the transaction to the database
     ```java
        public class ConnectionProxy extends AbstractConnectionProxy {

            private final static LockRetryPolicy LOCK_RETRY_POLICY = new LockRetryPolicy();

            private ConnectionContext context = new ConnectionContext();
            
            private void processLocalCommitWithGlobalLocks() throws SQLException {
                checkLock(context.buildLockKeys());
                try {
                    targetConnection.commit();
                } catch (Throwable ex) {
                    throw new SQLException(ex);
                }
                context.reset();
            }

            public void checkLock(String lockKeys) throws SQLException {
                if (StringUtils.isBlank(lockKeys)) {
                    return;
                }
                // Just check lock without requiring lock by now.
                try {
                    boolean lockable = DefaultResourceManager.get().lockQuery(BranchType.AT,
                        getDataSourceProxy().getResourceId(), context.getXid(), lockKeys);
                    if (!lockable) {
                        throw new LockConflictException();
                    }
                } catch (TransactionException e) {
                    recognizeLockKeyConflictException(e, lockKeys);
                }
            }


        }
        ```

- Other than the above cases (the `else` branch)
    - Let the database commit the current transaction.

## Introduction to `RootContext`

We left three "clues" above, now it's time to answer them in conjunction with the `RootContext` source code.
1. **How could the return value of `RootContext.getBranchType()` be AT?**  
   The logic in this method is: as long as it is determined that the **current transaction is in a global state** (i.e., as long as `RootContext.bind(xid)` has been called somewhere), it will return the default `BranchType.AT`.
   ```java
   public class RootContext {

       public static final String KEY_XID = "TX_XID";

       private static ContextCore CONTEXT_HOLDER = ContextCoreLoader.load();

       private static BranchType DEFAULT_BRANCH_TYPE;

       @Nullable
       public static BranchType getBranchType() {
           if (inGlobalTransaction()) {
               BranchType branchType = (BranchType) CONTEXT_HOLDER.get(KEY_BRANCH_TYPE);
               if (branchType != null) {
                   return branchType;
               }
               //Returns the default branch type.
               return DEFAULT_BRANCH_TYPE != null ? DEFAULT_BRANCH_TYPE : BranchType.AT;
           }
           return null;
       }

       public static boolean inGlobalTransaction() {
           return CONTEXT_HOLDER.get(KEY_XID) != null;
       }

       public static void bind(@Nonnull String xid) {
           if (StringUtils.isBlank(xid)) {
               if (LOGGER.isDebugEnabled()) {
                   LOGGER.debug("xid is blank, switch to unbind operation!");
               }
               unbind();
           } else {
               MDC.put(MDC_KEY_XID, xid);
               if (LOGGER.isDebugEnabled()) {
                   LOGGER.debug("bind {}", xid);
               }
               CONTEXT_HOLDER.put(KEY_XID, xid);
           }
       }
   }
   ```

2. **How to determine whether `RootContext.requireGlobalLock()` needs a global lock?**
   Somewhere needs to call `RootContext.bindGlobalLockFlag()`
   ```java
   public class RootContext {

       public static final String KEY_GLOBAL_LOCK_FLAG = "TX_LOCK";
       public static final Boolean VALUE_GLOBAL_LOCK_FLAG = true;

       private static ContextCore CONTEXT_HOLDER = ContextCoreLoader.load();

       public static boolean requireGlobalLock() {
           return CONTEXT_HOLDER.get(KEY_GLOBAL_LOCK_FLAG) != null;
       }

       public static void bindGlobalLockFlag() {
           if (LOGGER.isDebugEnabled()) {
               LOGGER.debug("Local Transaction Global Lock support enabled");
           }

           //just put something not null
           CONTEXT_HOLDER.put(KEY_GLOBAL_LOCK_FLAG, VALUE_GLOBAL_LOCK_FLAG);
       }

   }
   ```

3. **How does `ConnectionProxy.commit()` distinguish between different states based on the context, and how does `ConnectionContext` determine `inGlobalTransaction()` or `isGlobalLockRequire()`?**
   ```java
    public class ConnectionProxy extends AbstractConnectionProxy {

       private ConnectionContext context = new ConnectionContext();

       private void doCommit() throws SQLException {
           if (context.inGlobalTransaction()) {
               processGlobalTransactionCommit();
           } else if (context.isGlobalLockRequire()) {
               processLocalCommitWithGlobalLocks();
           } else {
               targetConnection.commit();
           }
       }
   }
   ```

    - How is `inGlobalTransaction()` determined? (Note that this is different from the mentioned `RootContext` above)
      ```java
      public class ConnectionContext {

          private String xid;

          void setXid(String xid) {
              this.xid = xid;
          }

          public boolean inGlobalTransaction() {
              return xid != null;
          }

          void bind(String xid) {
              if (xid == null) {
                  throw new IllegalArgumentException("xid should not be null");
              }
              if (!inGlobalTransaction()) {
                  setXid(xid);
              } else {
                  if (!this.xid.equals(xid)) {
                      throw new ShouldNeverHappenException();
                  }
              }
          }

      }
      ```
      Where is `ConnectionContext.bind(xid)` called?
      ```java
      package io.seata.rm.datasource.exec;

      public abstract class BaseTransactionalExecutor<T, S extends Statement> implements Executor<T> {

        @Override
        public T execute(Object... args) throws Throwable {
            // So, where does the XID come from here? Look ahead and you will know that it comes from when the global transaction is opened, and is related to @GlobalTransactional
            String xid = RootContext.getXID(); 
            if (xid != null) {
                statementProxy.getConnectionProxy().bind(xid);
            }

            // This is the position to set isGlobalLockRequire, related to @GlobalLock
            statementProxy.getConnectionProxy().setGlobalLockRequire(RootContext.requireGlobalLock());
            return doExecute(args);
        }
      }
      ```
      ```java
      public class ConnectionProxy extends AbstractConnectionProxy {

         private ConnectionContext context = new ConnectionContext();

          public void bind(String xid) {
              context.bind(xid);
          }

          public void setGlobalLockRequire(boolean isLock) {
              context.setGlobalLockRequire(isLock);
          }

      }
      ```

    - How to determine `isGlobalLockRequire()`?
      ```java
      public class ConnectionContext {

          private boolean isGlobalLockRequire;

          boolean isGlobalLockRequire() {
             return isGlobalLockRequire;
          }

          void setGlobalLockRequire(boolean isGlobalLockRequire) {
              this.isGlobalLockRequire = isGlobalLockRequire;
          }

      }
      ```

    After looking at the code, we know that as long as somewhere in `RootContext` sets xid, or `bindGlobalLockFlag()`, it will be recognized as a different state.
    So where is it called? The answer is in the `GlobalTransactionalInterceptor` below.

## **`GlobalTransactionalInterceptor` handles methods with `@GlobalTransactional` or `@GlobalLock`**
Methods with `@GlobalTransactional` and `@GlobalLock` will be proxied and handled by `GlobalTransactionalInterceptor`
```java
public class GlobalTransactionalInterceptor implements ConfigurationChangeListener, MethodInterceptor {

    @Override
    public Object invoke(final MethodInvocation methodInvocation) throws Throwable {
        Class<?> targetClass =
            methodInvocation.getThis() != null ? AopUtils.getTargetClass(methodInvocation.getThis()) : null;
        Method specificMethod = ClassUtils.getMostSpecificMethod(methodInvocation.getMethod(), targetClass);
        if (specificMethod != null && !specificMethod.getDeclaringClass().equals(Object.class)) {
            final Method method = BridgeMethodResolver.findBridgedMethod(specificMethod);
            final GlobalTransactional globalTransactionalAnnotation =
                getAnnotation(method, targetClass, GlobalTransactional.class);
            final GlobalLock globalLockAnnotation = getAnnotation(method, targetClass, GlobalLock.class);
            boolean localDisable = disable || (degradeCheck && degradeNum >= degradeCheckAllowTimes);
            if (!localDisable) {
                if (globalTransactionalAnnotation != null) {
                    return handleGlobalTransaction(methodInvocation, globalTransactionalAnnotation);// Handle @GlobalTransactional
                } else if (globalLockAnnotation != null) {
                    return handleGlobalLock(methodInvocation, globalLockAnnotation); // Handle @GlobalLock
                }
            }
        }
        return methodInvocation.proceed();
    }

}

```


### **First, handle `@GlobalTransactional`**

```java
public class GlobalTransactionalInterceptor implements ConfigurationChangeListener, MethodInterceptor {

    private final TransactionalTemplate transactionalTemplate = new TransactionalTemplate();

    Object handleGlobalTransaction(final MethodInvocation methodInvocation,
        final GlobalTransactional globalTrxAnno) throws Throwable {
        
        //...
        try {
            return transactionalTemplate.execute(...);
        } catch (TransactionalExecutor.ExecutionException e) {
          // ...
        } finally {
            //...
        }
    }
}

```

We have arrived at the classic seata transaction template method, and we need to focus on the part where the transaction is initiated.
```java
public class TransactionalTemplate {

    public Object execute(TransactionalExecutor business) throws Throwable {
        // 1. Get transactionInfo
        //...
        // 1.1 Get current transaction, if not null, the tx role is 'GlobalTransactionRole.Participant'.
        GlobalTransaction tx = GlobalTransactionContext.getCurrent();

        // 1.2 Handle the transaction propagation.
        // ...

            // 1.3 If null, create new transaction with role 'GlobalTransactionRole.Launcher'.
            if (tx == null) {
                tx = GlobalTransactionContext.createNew();
            }

           //...

            try {
                // 2. If the tx role is 'GlobalTransactionRole.Launcher', send the request of beginTransaction to TC,
                //    else do nothing. Of course, the hooks will still be triggered.
                beginTransaction(txInfo, tx);

                Object rs;
                try {
                    // Do Your Business
                    rs = business.execute();
                } catch (Throwable ex) {
                    // 3. The needed business exception to rollback.
                    completeTransactionAfterThrowing(txInfo, tx, ex);
                    throw ex;
                }

                // 4. everything is fine, commit.
                commitTransaction(tx);
                return rs;
            } finally {
                //5. clear
                //...
            }
        } finally {
            // If the transaction is suspended, resume it.
           // ...
        }
    }


    private void beginTransaction(TransactionInfo txInfo, GlobalTransaction tx) throws TransactionalExecutor.ExecutionException {
        try {
            triggerBeforeBegin();
            tx.begin(txInfo.getTimeOut(), txInfo.getName());
            triggerAfterBegin();
        } catch (TransactionException txe) {
            throw new TransactionalExecutor.ExecutionException(tx, txe,
                TransactionalExecutor.Code.BeginFailure);

        }
    }


}

```

```java
public class DefaultGlobalTransaction implements GlobalTransaction {

    @Override
    public void begin(int timeout, String name) throws TransactionException {
        if (role != GlobalTransactionRole.Launcher) {
            assertXIDNotNull();
            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("Ignore Begin(): just involved in global transaction [{}]", xid);
            }
            return;
        }
        assertXIDNull();
        String currentXid = RootContext.getXID();
        if (currentXid != null) {
            throw new IllegalStateException("Global transaction already exists," +
                " can't begin a new global transaction, currentXid = " + currentXid);
        }
        xid = transactionManager.begin(null, null, name, timeout);
        status = GlobalStatus.Begin;
        RootContext.bind(xid); // Bind xid
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("Begin new global transaction [{}]", xid);
        }
    }
}
```
See `RootContext.bind(xid);`

### **Continue to handle `@GlobalLock`**
```java
public class GlobalTransactionalInterceptor implements ConfigurationChangeListener, MethodInterceptor {

    private final GlobalLockTemplate globalLockTemplate = new GlobalLockTemplate();

    Object handleGlobalLock(final MethodInvocation methodInvocation,
        final GlobalLock globalLockAnno) throws Throwable {

        return globalLockTemplate.execute(new GlobalLockExecutor() {...});
    }
}
```
Also using the template method to handle GlobalLock
```java
public class GlobalLockTemplate {

    public Object execute(GlobalLockExecutor executor) throws Throwable {
        boolean alreadyInGlobalLock = RootContext.requireGlobalLock();
        if (!alreadyInGlobalLock) {
            RootContext.bindGlobalLockFlag();
        }

        // set my config to config holder so that it can be access in further execution
        // for example, LockRetryController can access it with config holder
        GlobalLockConfig myConfig = executor.getGlobalLockConfig();
        GlobalLockConfig previousConfig = GlobalLockConfigHolder.setAndReturnPrevious(myConfig);

        try {
            return executor.execute();
        } finally {
            // only unbind when this is the root caller.
            // otherwise, the outer caller would lose global lock flag
            if (!alreadyInGlobalLock) {
                RootContext.unbindGlobalLockFlag();
            }

            // if previous config is not null, we need to set it back
            // so that the outer logic can still use their config
            if (previousConfig != null) {
                GlobalLockConfigHolder.setAndReturnPrevious(previousConfig);
            } else {
                GlobalLockConfigHolder.remove();
            }
        }
    }
}
```
See, as soon as it enters the template method, `RootContext.bindGlobalLockFlag();`
