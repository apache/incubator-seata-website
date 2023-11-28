"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[4137],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),g=a,f=p["".concat(c,".").concat(g)]||p[g]||d[g]||i;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=g;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},25094:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(87462),a=(n(67294),n(3905));const i={title:"Transaction Group Introduction",keywords:["Seata"],description:"Seata transaction grouping."},o="Introduction",s={unversionedId:"user/txgroup/transaction-group",id:"version-v1.8/user/txgroup/transaction-group",title:"Transaction Group Introduction",description:"Seata transaction grouping.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-v1.8/user/txgroup/transaction-group.md",sourceDirName:"user/txgroup",slug:"/user/txgroup/transaction-group",permalink:"/en/docs/user/txgroup/transaction-group",draft:!1,tags:[],version:"v1.8",frontMatter:{title:"Transaction Group Introduction",keywords:["Seata"],description:"Seata transaction grouping."},sidebar:"docs",previous:{title:"Seata Parameter Configuration",permalink:"/en/docs/user/configurations"},next:{title:"Transaction Group and High Availability",permalink:"/en/docs/user/txgroup/transaction-group-and-ha"}},c={},l=[{value:"What is a transaction group?",id:"what-is-a-transaction-group",level:3},{value:"How to find the backend Seata cluster for the transaction group?",id:"how-to-find-the-backend-seata-cluster-for-the-transaction-group",level:3},{value:"Why is it designed this way instead of directly using the service name?",id:"why-is-it-designed-this-way-instead-of-directly-using-the-service-name",level:3},{value:"Transaction Group Usage Case",id:"transaction-group-usage-case",level:2},{value:"Category 1: Built-in File",id:"category-1-built-in-file",level:3},{value:"Seata Server-side",id:"seata-server-side",level:4},{value:"Client-side",id:"client-side",level:4},{value:"Type 2: Registry Center and Configuration Center (Using Nacos as an Example)",id:"type-2-registry-center-and-configuration-center-using-nacos-as-an-example",level:3},{value:"Seata Server",id:"seata-server",level:4},{value:"Client side",id:"client-side-1",level:4},{value:"Client side (SpringBoot)",id:"client-side-springboot",level:4}],u={toc:l},p="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"introduction"},"Introduction"),(0,a.kt)("h3",{id:"what-is-a-transaction-group"},"What is a transaction group?"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Transaction group: The logical resource of Seata can be defined by the application (client) according to the needs of microservices, with each group having a unique name."),(0,a.kt)("li",{parentName:"ul"},"Cluster: A cluster is made up of one or more nodes of the Seata server. When using the application (client), the mapping relationship between the transaction logic group and the Seata server cluster needs to be specified.")),(0,a.kt)("h3",{id:"how-to-find-the-backend-seata-cluster-for-the-transaction-group"},"How to find the backend Seata cluster for the transaction group?"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"First, the application (client) configures the transaction group (txServiceGroup parameter of the GlobalTransactionScanner constructor). If the application is SpringBoot, it is configured through seata.tx-service-group."),(0,a.kt)("li",{parentName:"ol"},"The application (client) will use the user-configured configuration center to find service.vgroupMapping.","[",(0,a.kt)("em",{parentName:"li"},"transaction group configuration item"),"]",", and the value of the configuration item is the name of the TC cluster. If the application is SpringBoot, it is configured through seata.service.vgroup-mapping.transaction group name=cluster name."),(0,a.kt)("li",{parentName:"ol"},"With the cluster name, the program constructs the service name by adding a certain prefix and suffix to the cluster name. The service name implementation varies in different configuration centers (provided that Seata-Server has completed service registration and Seata-Server reports that the cluster name is consistent with the cluster name configured by the application (client))."),(0,a.kt)("li",{parentName:"ol"},"With the service name, the program goes to the corresponding registration center to pull the service list of the corresponding service name and obtain the real backend TC service list (i.e., the Seata-Server cluster node list).")),(0,a.kt)("h3",{id:"why-is-it-designed-this-way-instead-of-directly-using-the-service-name"},"Why is it designed this way instead of directly using the service name?"),(0,a.kt)("p",null,"There is an additional layer of configuration to map the transaction group to the cluster. With this design, the transaction group can serve as the logical isolation unit of resources. When a cluster failure occurs, failover can be quickly performed by switching to the corresponding group, reducing the impact of the failure to the service level. However, this requires a sufficient number of server clusters."),(0,a.kt)("h2",{id:"transaction-group-usage-case"},"Transaction Group Usage Case"),(0,a.kt)("p",null,"Seata registration and configuration centers are divided into two categories:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Built-in File"),(0,a.kt)("li",{parentName:"ul"},"Third-party registration (configuration) centers, such as Nacos, etc. There are no constraints between the registration center and the configuration center, and different specific options can be used for each.")),(0,a.kt)("h3",{id:"category-1-built-in-file"},"Category 1: Built-in File"),(0,a.kt)("h4",{id:"seata-server-side"},"Seata Server-side"),(0,a.kt)("p",null,"registry.conf"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'registry {\n  # file, nacos, eureka, redis, zk, consul, etcd3, sofa\n  type = "file"                ---------------\x3e Use file as the registry center\n}\nconfig {\n  # file, nacos, apollo, zk, consul, etcd3\n  type = "file"                ---------------\x3e Use file as the configuration center\n  file {\n    name = "file.conf"\n  }\n}\n')),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Start Seata Server in file or db mode, see the node at the top of the article: Start Seata Server")),(0,a.kt)("h4",{id:"client-side"},"Client-side"),(0,a.kt)("p",null,"registry.conf"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'registry {\n  # file, nacos, eureka, redis, zk, consul, etcd3, sofa\n  type = "file"                ---------------\x3e Use file as the registry center\n}\nconfig {\n  # file, nacos, apollo, zk, consul, etcd3\n  type = "file"                ---------------\x3e Use file as the configuration center\n  file {\n    name = "file.conf"         ---------------\x3e Configuration parameter storage file\n  }\n}\n')),(0,a.kt)("p",null,"file.conf"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'    service {\n      vgroupMapping.my_test_tx_group = "default"\n      default.grouplist = "127.0.0.1:8091"\n    }\n')),(0,a.kt)("p",null,"application.properties"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"seata.tx-service-group=my_test_tx_group ---------------\x3e Transaction group configuration (default value is default_tx_group after v1.5)\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Read configuration\nLoad the configuration parameters of file.conf through FileConfiguration locally"),(0,a.kt)("li",{parentName:"ul"},'Get transaction group (load configuration when the service starts)\nFor spring/springboot, it can be configured in yml or properties, and the corresponding value "my_test_tx_group" is the transaction group name. If not configured, the default value is the concatenation of spring.application.name value and "-seata-service-group" as the group name.'),(0,a.kt)("li",{parentName:"ul"},'Find TC cluster name\nConcatenate the transaction group name "my_test_tx_group" into "service.vgroupMapping.my_test_tx_group" and find the TC cluster name clusterName as "default"'),(0,a.kt)("li",{parentName:"ul"},'Query TC service\nConcatenate "service."+clusterName+".grouplist" to find the real TC service address 127.0.0.1:8091')),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"type-2-registry-center-and-configuration-center-using-nacos-as-an-example"},"Type 2: Registry Center and Configuration Center (Using Nacos as an Example)"),(0,a.kt)("h4",{id:"seata-server"},"Seata Server"),(0,a.kt)("p",null,"registry.conf"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'registry {\n  # file, nacos, eureka, redis, zk, consul, etcd3, sofa\n  type = "nacos"                  ---------------\x3e Use Nacos as the registry center\n  nacos {\n    application = "seata-server"  ---------------\x3e Specify the service name registered in Nacos registry center\n    group = "SEATA_GROUP"         ---------------\x3e Specify the group name registered in Nacos registry center\n    serverAddr = "localhost"      ---------------\x3e Nacos registry center IP:port\n    namespace = ""                ---------------\x3e Nacos namespace ID, "" represents the reserved public namespace in Nacos, users should not configure namespace = "public"\n    cluster = "default"           ---------------\x3e Specify the cluster name registered in Nacos registry center\n  }\n}\nconfig {\n  # file, nacos, apollo, zk, consul, etcd3\n  type = "nacos"                  ------------\x3e Use Nacos as the configuration center\n  nacos {\n    serverAddr = "localhost"      ---------------\x3e Nacos registry center IP:port\n    namespace = ""\n    group = "SEATA_GROUP"         ---------------\x3e Nacos configuration center group name\n    dataId = "seataServer.properties"  ---------------\x3e Nacos configuration center configuration ID\n  }\n}\n\n')),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Configuration Center Configuration"),(0,a.kt)("p",{parentName:"li"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"README-zh.md")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"README.md")," file in the installation directory ",(0,a.kt)("inlineCode",{parentName:"p"},"conf")," of Seata Server introduces the common script URL links required by Seata, including three types: client configuration and SQL, Seata Server deployment SQL and scripts, and configuration center configuration templates and scripts.\nAmong them, there are files and directories under ",(0,a.kt)("inlineCode",{parentName:"p"},"script/config-center")," as follows:"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"README.md     User guide"),(0,a.kt)("li",{parentName:"ul"},"config.txt    Configuration template (including Server and Client)"),(0,a.kt)("li",{parentName:"ul"},"nacos/        Python and shell scripts for pushing to Nacos"),(0,a.kt)("li",{parentName:"ul"},"apollo/       Shell scripts for pushing to Apollo"),(0,a.kt)("li",{parentName:"ul"},"consul/       Shell scripts for pushing to Consul"),(0,a.kt)("li",{parentName:"ul"},"etcd3/        Shell scripts for pushing to etcd3"),(0,a.kt)("li",{parentName:"ul"},"zk/           Shell scripts for pushing to ZooKeeper")),(0,a.kt)("p",{parentName:"li"},"The configuration items in the ",(0,a.kt)("inlineCode",{parentName:"p"},"config.txt")," template need to be selected and modified according to the actual situation.\nThen configure them to the configuration center: you can refer to the user guide in ",(0,a.kt)("inlineCode",{parentName:"p"},"README.md")," to push them to the configuration center through scripts. You can also manually copy the contents of ",(0,a.kt)("inlineCode",{parentName:"p"},"config.txt")," to the configuration center (for example, through the web page of Nacos configuration center). After the configuration is completed, check if the results are correct.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Registered in the registry center\nStart ",(0,a.kt)("inlineCode",{parentName:"p"},"seata-server")," and register it in the Nacos registry center. Check the service list in the Nacos console to confirm if the registration is successful."))),(0,a.kt)("h4",{id:"client-side-1"},"Client side"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'seata.tx-service-group=my_test_tx_group ---------------\x3e Transaction group configuration (default value is default_tx_group after v1.5)\nregistry {\n  # file, nacos, eureka, redis, zk, consul, etcd3, sofa\n  type = "nacos"                ---------------\x3e Get TC service from Nacos\n  nacos {\n    serverAddr = "localhost"\n    namespace = ""\n  }\n}\nconfig {\n  # file, nacos, apollo, zk, consul, etcd3\n  type = "nacos"                ---------------\x3e Use Nacos as the configuration center\n  nacos {\n    serverAddr = "localhost"\n    namespace = ""\n  }\n}\n')),(0,a.kt)("h4",{id:"client-side-springboot"},"Client side (SpringBoot)"),(0,a.kt)("p",null,"application.properties"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"seata.tx-service-group=my_test_tx_group ---------------\x3e Transaction group configuration (default value is default_tx_group after v1.5)\nseata.service.vgroup-mapping.my_test_tx_group=default  ---------------\x3e Specify the transaction group to cluster mapping (the cluster name on the right side of the equal sign should be consistent with the cluster registered in Seata-server)\nseata.registry.type=nacos      ---------------\x3e Use Nacos as the registry center\nseata.registry.nacos.server-addr=nacos registry center IP:port\nseata.registry.nacos.application=seata-server     ---------------\x3e Seata service name (should be consistent with the actual registered service name in seata-server)\nseata.registry.nacos.group=SEATA_GROUP            ---------------\x3e Seata group name (should be consistent with the actual registered group name in seata-server)\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"In addition: If the Client does not obtain the seata-server service information through Nacos, but directly specifies the IP and port information of the seata-server service-side node, the nacos-related configurations in the above application.properties can be changed to the following two configurations:"),(0,a.kt)("p",{parentName:"blockquote"},"seata.registry.type=file       ----\x3e Not recommended for production environment"),(0,a.kt)("p",{parentName:"blockquote"},"seata.service.grouplist.cluster_beijing=127.0.0.1:8091    ----\x3e vgroup-mapping (server-side cluster) information of each seata-server node")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Read configuration\nYou can read seata configuration parameters remotely through NacosConfiguration"),(0,a.kt)("li",{parentName:"ul"},'Get transaction group (load configuration when the service starts)\nFor spring/springboot, it can be configured in yml or properties. The corresponding value "my_test_tx_group" is the transaction group name. If not configured, the default value is the concatenation of spring.application.name value + "-seata-service-group" as the group name.'),(0,a.kt)("li",{parentName:"ul"},'Find TC cluster name\nConcatenate the transaction group name "my_test_tx_group" to "service.vgroupMapping.my_test_tx_group" and find the TC cluster name "default" from the configuration center.'),(0,a.kt)("li",{parentName:"ul"},"Find TC service\nFind the real TC service list in the registry center based on serverAddr, namespace, and clusterName.")),(0,a.kt)("p",null,"Note: serverAddr and namespace should be consistent with the Server-side, and clusterName should be consistent with the Server-side cluster."))}d.isMDXComponent=!0}}]);