---
title: Setting Up Seata Demo Environment on Mac (AT Mode)
author: portman xu
date: 2020/07/20
keywords: [seata, distributed transaction, demo, mac, at]
---

## Seata Demo environment build under Mac (AT mode)

## Preface

Recently, because of work needs, research and study Seata distributed transaction framework, this article to learn the knowledge of their own record!

## Seata overview

## cloc code statistics

First look at the seata project cloc code statistics (as of 2020-07-20)

! [cloc-seata](https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/cloc-seata.png?raw=true)

The number of Java code lines is about 97K

### Code quality

Unit test coverage 50%

! [cloc-seata](https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/coverage.png?raw=true)

### Demo code

The demo code in this article is the seata-samples-dubbo module under the seata-samples project at the following address:

https://github.com/apache/incubator-seata-samples/tree/master/dubbo

### Core problem solved

The AT pattern Demo example gives a typical distributed transaction scenario:

- In a purchase transaction, it is necessary to:

1. deduct the inventory of a product
2. deduct the user account balance
3. generate a purchase order

- Obviously, all three steps must either succeed or fail, otherwise the system's data will be messed up.
- With the popular microservices architecture, generally speaking, inventory, account balance, and purchase order are three separate systems.
- Each microservice has its own database and is independent of each other.

Here is the scenario for distributed transactions.

! [Design diagram](/img/architecture.png)

## Solution

The idea of the AT pattern to solve this problem is actually quite simple and is summarised in one sentence:

In the distributed transaction process, record the data to be modified before and after the modification of the value to the undo_log table, in case of abnormalities in the transaction, through the data in this to do a rollback!

Of course, the specific code to implement, I believe that many details are far from being so simple.

## Demo code structure

Clone the latest code from github.

```sh
git clone git@github.com:apache/incubator-seata-samples.git
``

Read the Demo code structure

```sh
$ cd seata-samples/dubbo/
$ tree -C -I 'target' .
.
├── README.md
├─ pom.xml
├── seata-samples-dubbo.iml
└── src
└── main
├─ java
│ └── io
│ └── seata
│ └── samples
│ └─ dubbo
│ ├── ApplicationKeeper.java
│ ├── Order.java
│ ├── service
│ │ ├── AccountService.java
│ │ ├── BusinessService.java
│ ├── OrderService.java │ ├── OrderService.java
│ │ ├── StorageService.java
│ │ └── impl
│ │ ├── AccountServiceImpl.java
│ │ ├── BusinessServiceImpl.java
│ │ ├── OrderServiceImpl.java
│ │ └── StorageServiceImpl.java
│ └── starter
│ ├── DubboAccountServiceStarter.java │ ├── DubboAccountServiceStarter.java
│ ├── DubboBusinessTester.java
│ ├── DubboOrderServiceStarter.java
│ └── DubboStorageServiceStarter.java
└── resources
├── file.conf
├── jdbc.properties
├── log4j.properties
├── registry.conf
├─ spring
│ ├── dubbo-account-service.xml
│ ├── dubbo-business.xml
│ ├── dubbo-order-service.xml
│ └── dubbo-storage-service.xml
└── sql
├── dubbo_biz.sql
└── undo_log.sql

13 directories, 27 files
```

- The four \*Starter classes under the io.seata.samples.dubbo.starter package emulate each of the four microservices described above
- Account
- Business
- Order
- Storage

- 4 services are standard dubbo services, configuration files in the seata-samples/dubbo/src/main/resources/spring directory
- To run the demo, you need to start all four services, and Business is the last one to start.
- The main logic is in io.seata.samples.dubbo.service, and the four implementation classes correspond to the business logic of the four microservices.
- Configuration file for database information: src/main/resources/jdbc.properties

### Timing diagram

! [cloc-seata](https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/timing-diagram.png?raw=true)

Ok, get going, Make It Happen!

## Run the demo

### MySQL

### Create a table

Execute the scripts dubbo_biz.sql and undo_log.sql in seata-samples/dubbo/src/main/resources/sql.

```sh
mysql> show tables;
+-----------------+
| Tables_in_seata |
+-----------------+
| account_tbl |
| order_tbl |
| storage_tbl |
| undo_log |
+-----------------+
4 rows in set (0.01 sec)
```

After execution, there should be 4 tables in the database


Modify the seata-samples/dubbo/src/main/resources/jdbc.properties file

Modify the values of the variables according to the environment in which you are running MySQL

```properties
jdbc.account.url=jdbc:mysql://localhost:3306/seata
jdbc.account.username=your_username
jdbc.account.password=your_password
jdbc.account.driver=com.mysql.jdbc.
# storage db config
jdbc.storage.url=jdbc:mysql://localhost:3306/seata
jdbc.storage.username=your_username
jdbc.storage.password=your_password
jdbc.storage.driver=com.mysql.jdbc.
# order db config
jdbc.order.url=jdbc:mysql://localhost:3306/seata
jdbc.order.username=your_username
jdbc.order.password=your_password
jdbc.order.driver=com.mysql.jdbc.
```

### ZooKeeper

Start ZooKeeper, my local Mac is using Homebrew installation to start it

```sh
$ brew services start zookeeper
==> Successfully started `zookeeper` (label: homebrew.

$ brew services list
Name Status User Plist
docker-machine stopped
elasticsearch stopped
kafka stopped
kibana stopped
mysql started portman /Users/portman/Librar
y/LaunchAgents/homebrew.mxcl.mysql.plist
nginx stopped
postgresql stopped
postgresql stopped
zookeeper started portman /Users/portman/Librar
y/LaunchAgents/homebrew.mxcl.zookeeper.plist
```

### Start the TC transaction coordinator

In this [link](https://github.com/apache/incubator-seata/releases) page, download the corresponding version of seata-server, I downloaded version 1.2.0 locally.

1. Go to the directory where the file is located and extract the file.
2. Enter the seata directory
3. Execute the startup script

```sh
$ tar -zxvf seata-server-1.2.0.tar.gz
$ cd seata
$ bin/seata-server.sh
```

Observe the startup log for error messages, if everything is fine and you see the following Server started message, the startup was successful.

```sh
2020-07-23 13:45:13.810 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started ...
```

### Starting a simulated microservice in the IDE

1. First import the seata-samples project into your local IDE, I'm using IntelliJ IDEA here.
2. Refresh the Maven project dependencies.
3. Start the Account, Order and Storage services before Business can invoke them, the corresponding startup classes are:

The corresponding startup classes are:
```java
io.seata.samples.dubbo.starter.DubboStorageServiceStarter
io.seata.samples.dubbo.starter.DubboOrderServiceStarter
io.seata.samples.dubbo.starter.DubboStorageServiceStarter
```

After each service is started, you see this message indicating that the service was started successfully

```sh
Application is keep running ...
```

! [cloc-seata](https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/service-boot.png?raw=true)

After successful startup, the account_tbl, storage_tbl tables will have two initialised data, the account balance and the product inventory respectively

```sh
mysql> SELECT * FROM account_tbl; SELECT * FROM storage_tbl;
+----+---------+-------+
| id | user_id | money |
+----+---------+-------+ | id | user_id | money | ----+---------+-------+
| 1 | U100001 | 999 |
+----+---------+-------+ | 1 row in set (0.00.00)
1 row in set (0.00 sec)

+----+----------------+-------+
| id | commodity_code | count |
+----+----------------+-------+ | id | commodity_code | count | ----+----------------+-------+
| 1 | C00321 | 100 |
+----+----------------+-------+
1 row in set (0.00 sec)
```

### Use Business to verify results

#### Normal

Still executing the main function of the DubboBusinessTester class in the IDE, the programme will exit automatically after running.

If everything is working properly, everything should be committed for each microservice, and the data should be consistent.

Let's take a look at the data changes in MySQL

```sh
mysql> SELECT * FROM account_tbl; SELECT * FROM order_tbl; SELECT * FROM storage_tbl.
+----+---------+-------+
| id | user_id | money |
+----+---------+-------+ | id | user_id | money | ----+---------+-------+
| 1 | U100001 | 599 |
+----+---------+-------+ | 1 row in set (0.00.00)
1 row in set (0.00 sec)

+----+---------+----------------+-------+-------+
| id | user_id | commodity_code | count | money |
+----+---------+----------------+-------+-------+
| 1 | U100001 | C00321 | 2 | 400 |
+----+---------+----------------+-------+-------+
1 row in set (0.00 sec)

+----+----------------+-------+
| id | commodity_code | count |
+----+----------------+-------+ | id | commodity_code | count | ----+----------------+-------+
| 1 | C00321 | 98 |
+----+----------------+-------+
1 row in set (0.00 sec)
```

From the data of the 3 tables, we can see: account balance is deducted by 400; the order table is increased by 1 record; the product inventory is deducted by 2

This result is consistent with the logic of the programme, which means that there is no problem with the transaction.

#### exception

In fact, even if you do not join the distributed transaction control, everything is normal, the transaction itself will not be a problem

So let's focus on what happens when an exception occurs.

Now I'm going to comment out the exception-throwing code in BusinessServiceImpl and execute DubboBusinessTester once more to see what happens.

```java
		@Override
    @GlobalTransactional(timeoutMills = 300000, name = "dubbo-demo-tx")
    public void purchase(String userId, String commodityCode, int orderCount) {
        LOGGER.info("purchase begin ... xid: " + RootContext.getXID());
        storageService.deduct(commodityCode, orderCount); orderService.create(userId)
        orderService.create(userId, commodityCode, orderCount); // release this exception throw.

        //Leave this exception comment alone to simulate an exception in the application.
        throw new RuntimeException("portman's foooooobar error.");;

    }
```

Next, I executed DubboBusinessTester once again, and during the execution I could see the exception message on the console

```java
Exception in thread "main" java.lang.RuntimeException: portman's foooooobar error.
```

Now we look again at the data changes in MySQL and see that there are no changes in the data, indicating that the distributed transaction control has worked

## Questions to ponder

The above steps just demonstrates seata's simplest demo programme, more complex cases can be discussed and verified later!

There are still some questions and doubts in the learning process, followed by further study

- Global lock on the performance of the degree of impact
- undo_log log can be rolled back to the original state, but if the data state has changed how to deal with (for example, increased user points have been spent by other local transactions)

## References

- [What is Seata?] (/docs/overview/what-is-seata)
- [Quickstart] (/docs/user/quickstart)

## Author information

Xu Xiaoga, Software Architect, Kingdee

[Github](https://github.com/iportman)
