"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[59225],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=u(r),m=a,f=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return r?n.createElement(f,l(l({ref:t},c),{},{components:r})):n.createElement(f,l({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[d]="string"==typeof e?e:a,l[1]=i;for(var u=2;u<o;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},483:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var n=r(87462),a=(r(67294),r(3905));const o={Title:"Seata parameter configuration version 0.9.0",keywords:["Seata"],Description:"The seata parameter configuration version is 0.9.0."},l=void 0,i={unversionedId:"user/configurations090",id:"user/configurations090",title:"configurations090",description:"Public sector",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/user/configurations090.md",sourceDirName:"user",slug:"/user/configurations090",permalink:"/docs/next/user/configurations090",draft:!1,tags:[],version:"current",frontMatter:{Title:"Seata parameter configuration version 0.9.0",keywords:["Seata"],Description:"The seata parameter configuration version is 0.9.0."}},s={},u=[{value:"Not in used",id:"not-in-used",level:3}],c={toc:u},d="wrapper";function p(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"#Seata parameter configuration version 0.9.0"),(0,a.kt)("p",null,"###Public sector"),(0,a.kt)("p",null,"| key | desc | remark|"),(0,a.kt)("p",null,"|---------------|--------------|----|"),(0,a.kt)("p",null,"|transport.serialization | client and server communication codec method | seata, protobuf|"),(0,a.kt)("p",null,"|transport.heartbeat | the heartbeat detection switch for client server communication | The default value is true|"),(0,a.kt)("p",null,"|registry.type | registry type | Default file, which supports file, nacos, redis, eureka, zk, consumer, etcd3, sofa, and custom | Version 1.6.0 Server supports simultaneous registration to multiple registries, separated by commas|"),(0,a.kt)("p",null,"|config.type | configuration center type | default file, supporting file, nacos, apollo, zk, consult, etcd3, springcloud, custom|"),(0,a.kt)("p",null,"###Server side"),(0,a.kt)("p",null,"| key | desc | remark|"),(0,a.kt)("p",null,"|---------------|--------------|----|"),(0,a.kt)("p",null,"| transaction.undo.log.save.days | undo retention days | 7 days by default, log_ Status=1 (Appendix 3) and undo not normally cleaned|"),(0,a.kt)("p",null,"| transaction.undo.log.delete.period | undo Cleanup thread interval | 86400000 by default, in milliseconds|"),(0,a.kt)("p",null,"| service.max.commit.retry.timeout | timeout duration of two-phase commit retry | Unit: ms, s, m, h, d, corresponding to ms, s, min, h, d, and the default is ms. The default value of - 1 means unlimited retries. Formula: timeout>=now globalTransactionBeginTime, true means no retry if timeout occurs|"),(0,a.kt)("p",null,"| service.max.rollback.retry.timeout | timeout duration of two-phase rollback retry | Same as commit|"),(0,a.kt)("p",null,"| recovery.committing-retry-period | Phase2 commit unfinished status Global transaction retry commit thread interval | 1000 by default, in milliseconds|"),(0,a.kt)("p",null,"| recovery.async-committing-retry-period | Phase2 asynchronous submission status Retry submission thread interval | 1000 by default, in milliseconds|"),(0,a.kt)("p",null,"| recovery.rollback-retry-period | Phase2 rollback status Retry rollback thread interval | 1000 by default, in milliseconds|"),(0,a.kt)("p",null,"| recovery.timeout-retry-period | Timeout status detection Retry thread interval | 1000 by default, in milliseconds. If timeout is detected, put the global transaction into the rollback session manager|"),(0,a.kt)("p",null,"| store.mode | Transaction session information storage mode | file Local file (HA is not supported), db database (HA is supported)|"),(0,a.kt)("p",null,"| store.file.dir | file mode file storage folder name | default sessionStore|"),(0,a.kt)("p",null,"| store.file.maxBranchSessionSize | file mode file storage branch session maximum bytes | 16384 (16kb) by default, in bytes|"),(0,a.kt)("p",null,"| store.file.maxGlobalSessionSize | file mode file stores the maximum number of global session bytes | 512b by default, in bytes|"),(0,a.kt)("p",null,"| store.file.fileWriteBufferCacheSize | file mode file storage buffer maximum cache size | 16384 (16kb) by default, in bytes. When the amount of data such as session written is greater than this value, an exception will be thrown|"),(0,a.kt)("p",null,"| store.file.flushDiskMode | file mode file storage flushing policy | default async, optional sync|"),(0,a.kt)("p",null,"| store.file.sessionReloadReadSize | file mode File storage The maximum number of session or lock keys recovered from the backup file after the server node restarts | 100 by default|"),(0,a.kt)("p",null,"| store.db.datasource | db mode data source type | default dbcp|"),(0,a.kt)("p",null,"| store.db.db type | db mode database type | default mysql|"),(0,a.kt)("p",null,"| store.db.driver class name | db mode database driver | default com.mysql.jdbc Driver |"),(0,a.kt)("p",null,"| store.db.url | db mode data source library url | default jdbc: mysql://127.0.0.1:3306/seata |"),(0,a.kt)("p",null,"| store.db.user | db mode database account | default MySQL|"),(0,a.kt)("p",null,"| store.db.min-conn | the number of initial connections to the database in db mode | 1 by default|"),(0,a.kt)("p",null,"| store.db.max-conn | Maximum number of database connections in db mode | 3 by default|"),(0,a.kt)("p",null,"| store.db.global.table | db mode global transaction table name | default global_ table |"),(0,a.kt)("p",null,"| store.db.branch.table | db mode branch transaction table name | default branch_ table |"),(0,a.kt)("p",null,"| store.db.lock table | db mode global lock table name | default lock_ table |"),(0,a.kt)("p",null,"| store.db.query-limit | the maximum number of global transactions queried in db mode | 1000 by default|"),(0,a.kt)("p",null,"| metrics.enabled | whether to enable Metrics | False is off by default. In the false state, all Metrics related components will not be initialized to minimize the performance loss|"),(0,a.kt)("p",null,"| metrics.registry-type | indicator registrar type | The indicator registrar type used by Metrics is a built-in compact (simple) implementation by default. Meters in this implementation only use limited memory counts, and the performance is high enough to meet most scenarios; Currently, only one indicator registrar can be set|"),(0,a.kt)("p",null,'| metrics.exporter list | indicator result Measurement data outputter list | default prometheus. Multiple outputters are separated by English commas, such as "prometheus, jmx". Currently, only the prometheus outputters are connected|'),(0,a.kt)("p",null,"| metrics.exporter-prometheus-port | prometheus exporter client port number | 9898 by default|"),(0,a.kt)("p",null,"###Client side"),(0,a.kt)("p",null,"| key | role | desc | remark|"),(0,a.kt)("p",null,"|----------|--------|--------------|----|"),(0,a.kt)("p",null,"| service.vgroup",(0,a.kt)("em",{parentName:"p"},"mapping.my_test_tx_group | TM, RM | Transaction group (Appendix 1) | my")," test",(0,a.kt)("em",{parentName:"p"}," tx")," Group refers to grouping, and the configuration item value is TC cluster name|"),(0,a.kt)("p",null,"| service.default.grouplist | TM, RM | TC service list (Appendix 2) | Only used when the registry is file|"),(0,a.kt)("p",null,"| service.disableGlobalTransaction | TM, RM | Global Transaction Switch | False by default. false is on, true is off|"),(0,a.kt)("p",null,"| service.enableDegradation | TM | Degradation switch (to be implemented) | False by default. The business side automatically downgrades according to the number of consecutive errors and does not go through the seata transaction|"),(0,a.kt)("p",null,"| client.async.commit.buffer.limit | RM | Asynchronous commit cache queue length | 10000 by default. Phase II commit succeeded. RM asynchronously cleans the undo queue|"),(0,a.kt)("p",null,"| client.lock.retry.internal | RM | Check or occupy the global lock retry interval | 10 by default, in milliseconds|"),(0,a.kt)("p",null,"| client.lock.retry.times | RM | Number of retries to verify or occupy the global lock | 30 by default|"),(0,a.kt)("p",null,"| client.lock.retry.policy.branch-rollback-on-conflict | RM | The lock policy when a branch transaction conflicts with other global rollback transactions | The default is true. The local lock is released first to allow rollback to succeed|"),(0,a.kt)("p",null,"| client.report.retry.count | TM, RM | Number of TC retries for reporting the results of the first phase | 5 by default|"),(0,a.kt)("p",null,"| client.tm.commit.retry.count | TM | The number of TC retries for reporting the results of the first phase global submission | 1 by default, it is recommended to be greater than 1|"),(0,a.kt)("p",null,"| client.tm.rollback.retry.count | TM | The number of TC retries reported in the first phase global rollback results | 1 by default, and it is recommended to be greater than 1|"),(0,a.kt)("p",null,"| client.table.meta.check.enable | RM | Automatically refresh the table structure in the cache | Default true|"),(0,a.kt)("p",null,"| transaction.undo.data.validation | RM | Phase II rollback image verification | True is enabled by default, false is disabled|"),(0,a.kt)("p",null,"| transaction.undo.log.serialization | RM | undo serialization method | default jackson|"),(0,a.kt)("p",null,"| transaction.undo.log.table | RM | User defined undo table name | Default undo_ log |"),(0,a.kt)("p",null,"| support.spring.datasource.autoproxy | RM | Data source auto proxy switch | False is off by default|"),(0,a.kt)("h3",{id:"not-in-used"},"Not in used"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"key"),(0,a.kt)("th",{parentName:"tr",align:null},"desc"),(0,a.kt)("th",{parentName:"tr",align:null},"remark"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"lock.mode"),(0,a.kt)("td",{parentName:"tr",align:null},"lock store mode"),(0,a.kt)("td",{parentName:"tr",align:null},"local\u3001remote")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"lock.local"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"lock.remote"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("p",null,"###Appendix 1:"),(0,a.kt)("p",null,"Description of transaction grouping."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"What is a transaction group?")),(0,a.kt)("p",null,"Transaction grouping is the resource logic of seata, similar to service instance. My in file.conf",(0,a.kt)("em",{parentName:"p"}," test")," tx_ A group is a transaction group."),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"How to find the back-end cluster through transaction grouping?")),(0,a.kt)("p",null,"First, the program configures transaction grouping (txServiceGroup parameter of GlobalTransactionScanner construction method), and the program will search for service.vgroup through the user configured configuration center_ mapping. Transaction grouping configuration item. The value of the configuration item obtained is the name of the TC cluster. The program that obtains the cluster name constructs the service name through a certain prefix+cluster name. The service name of each configuration center is different. Get the service name, go to the corresponding registry, pull the service list of the corresponding service name, and get the real TC service list of the back-end."),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"Why is the design so that the service name is not directly taken?")),(0,a.kt)("p",null,"There is an additional layer to obtain the configuration of transaction groups to the mapping cluster. After this design, the transaction group can be used as the logical isolation unit of resources, which can quickly fail over when a failure occurs."),(0,a.kt)("p",null,"###Appendix 2:"),(0,a.kt)("p",null,"About the grouplist question."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"When will the default.grouplist in file.conf be used?")),(0,a.kt)("p",null,"It is used when registry.type=file. It is not read in other times."),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"Can multiple value lists be configured for default.grouplist?")),(0,a.kt)("p",null,"Multiple can be configured, which means cluster, but when store When mode=file, an error will be reported. The reason is that the file storage mode does not provide synchronization of local files, so you need to use store.mode=db to share data between TC clusters through db"),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"Is default.grouplist recommended?")),(0,a.kt)("p",null,"Not recommended. For example, question 1, when registering It is used when type=file, which means that the real registry is not used here, and the health check mechanism without specific services cannot automatically remove the list when the tc is unavailable. It is recommended to use nacos, eureka, redis, zk, consumer, etcd3, and sofa. Registry. type=file or config The original purpose of type=file design is to enable users to quickly verify the seata service through direct connection without relying on a third-party registry or configuration center."),(0,a.kt)("p",null,"###Appendix 3:"),(0,a.kt)("p",null,"log_ Status=1 is defensive. It means that a global rollback request is received, but it is uncertain whether the local transaction of a transaction branch has been executed. At this time, a piece of data with the same branch ID is inserted in advance, and the inserted false data is successful. If the local transaction continues to execute, the master key conflict will be automatically rolled back."),(0,a.kt)("p",null,"If the insertion is unsuccessful, it indicates that the local transaction has been completed, and the undo data is taken out for reverse rollback."))}p.isMDXComponent=!0}}]);