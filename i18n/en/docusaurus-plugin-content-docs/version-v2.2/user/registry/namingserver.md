---
Title: Seata Namingserver Registration Center
Keywords: [ Seata, Namingserver ]
Description: Namingserver registration center.
---


# Namingserver Registration Center
Namingserver is the native registration center of Seata.

## Preparations
You can choose to run the naming server in the compiler or after packaging it.

### Running the naming server in the compiler
Go to the namingserver directory, set the port number for the naming server in resources/application.yml, and start the naming server.

### Running the naming server after packaging
Execute the packaging command:
```shell
mvn clean install -U -Prelease-seata-namingserver
```
Set the naming server port number in the `conf/application.yml` file located in the `\\distribution\\target\\apache-seata-2.2.0-SNAPSHOT-incubating-bin\\seata-namingserver` directory.
For macOS or Linux, run:

```shell
bin\\seata-namingserver.sh
```
For Windows, run:

```shell
bin\\seata-namingserver.bat
```
## Getting Started Quickly
The process to use the naming server as Seata's registration center is very simple and involves configuring both the client and server sides.

### Client-side Configuration for the Registration Center
Add the corresponding registration center in the application.yml:

```yaml
seata:
  registry:
    type: seata
  seata:
    server-addr: 127.0.0.1:8081   ## IP + port of the naming server configured in the first step. Use commas to separate multiple naming server nodes.
    namespace: public  ## Namespace
    heartbeat-period: 5000  ## Heartbeat interval
```
### Server-side Configuration for the Registration Center
Add the following configuration to `conf/application.yaml`, with the rest of the configuration referring to configuration options:

```yaml
seata:
  registry:
    type: seata
  seata:
    server-addr: 127.0.0.1:8081   ## IP + port of the naming server configured in the first step. Use commas to separate multiple naming server nodes.
    cluster: default  ## Cluster name
    namespace: public  ## Namespace
    heartbeat-period: 5000  ## Heartbeat interval
```
Create a Mapping Between the Client's Transaction Group and the Seata Cluster
Send an HTTP request to one naming server node to create a transaction group-to-cluster mapping (the naming server node will automatically synchronize with other nodes):

```shell
http://127.0.0.1:8081/naming/v1/changeGroup?clusterName=cluster2&namespace=public&unitName&vGroup=my_test_tx_group
```
(In this, namespace is the namespace configured on the client side, vGroup is the transaction group configured on the client side, and clusterName is the cluster name on the server side that needs to be mapped.)

Afterward, once Seata-Server is started and the client configuration is complete, you can begin to experience Seata services.

Tips: Ensure that both the client and server are registered under the same namespace; otherwise, the service won't be found.
