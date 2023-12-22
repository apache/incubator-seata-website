"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[35019],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>v});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i=a.createContext({}),p=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(i.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(t),m=r,v=u["".concat(i,".").concat(m)]||u[m]||d[m]||o;return t?a.createElement(v,s(s({ref:n},c),{},{components:t})):a.createElement(v,s({ref:n},c))}));function v(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=m;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l[u]="string"==typeof e?e:r,s[1]=l;for(var p=2;p<o;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},80492:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=t(87462),r=(t(67294),t(3905));const o={hidden:!0,title:"High Available Usage Deployment",keywords:["kubernetes","ops"],description:"High Available Usage Deployment",author:"helloworlde",date:new Date("2020-04-10T00:00:00.000Z")},s="High Available Usage Deployment",l={unversionedId:"ops/deploy-ha",id:"version-v2.0/ops/deploy-ha",title:"High Available Usage Deployment",description:"High Available Usage Deployment",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-v2.0/ops/deploy-ha.md",sourceDirName:"ops",slug:"/ops/deploy-ha",permalink:"/docs/ops/deploy-ha",draft:!1,tags:[],version:"v2.0",frontMatter:{hidden:!0,title:"High Available Usage Deployment",keywords:["kubernetes","ops"],description:"High Available Usage Deployment",author:"helloworlde",date:"2020-04-10T00:00:00.000Z"},sidebar:"docs",previous:{title:"Deploy Seata Server By Helm",permalink:"/docs/ops/deploy-by-helm"}},i={},p=[{value:"Seata-Server",id:"seata-server",level:2}],c={toc:p},u="wrapper";function d(e){let{components:n,...t}=e;return(0,r.kt)(u,(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"high-available-usage-deployment"},"High Available Usage Deployment"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"High available usage deployment of Seata depends on registry center, configuration center and database.")),(0,r.kt)("h2",{id:"seata-server"},"Seata-Server"),(0,r.kt)("p",null,"The Seata-Server need registry center, and save transaction data into database, for example, use Nacos"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Modify configuration in ",(0,r.kt)("inlineCode",{parentName:"li"},"registry.conf"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'registry {\n  type = "nacos"\n\n  nacos {\n    application = "seata-server"\n    serverAddr = "192.168.199.2"\n    namespace = ""\n    cluster = "default"\n    username = ""\n    password = ""\n  }\n}\n\nconfig {\n  type = "nacos"\n  \n  nacos {\n    serverAddr = "192.168.199.2"\n    namespace = ""\n    group = "SEATA_GROUP"\n    username = ""\n    password = ""\n  }\n}\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Modify configuration in configuration center")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"service.vgroupMapping.my_test_tx_group=default\nstore.mode=db\nstore.db.datasource=druid\nstore.db.dbType=mysql\nstore.db.driverClassName=com.mysql.jdbc.Driver\nstore.db.url=jdbc:mysql://192.168.199.2:30060/seata?useUnicode=true\nstore.db.user=root\nstore.db.password=123456\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Create table ",(0,r.kt)("inlineCode",{parentName:"li"},"global_table"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"branch_table"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"lock_table")," in database")),(0,r.kt)("p",null,"Please reference script on ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/server/db"},"/script/server/db/")),(0,r.kt)("p",null,"Now, startup multiple seata-server, and then the server is support high available usage."),(0,r.kt)("hr",null),(0,r.kt)("p",null,"For example, using Kubernetes deploy, the configuration file like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Service\nmetadata:\n  name: seata-ha-server\n  namespace: default\n  labels:\n    app.kubernetes.io/name: seata-ha-server\nspec:\n  type: ClusterIP\n  ports:\n    - port: 8091\n      protocol: TCP\n      name: http\n  selector:\n    app.kubernetes.io/name: seata-ha-server\n\n---\n\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: seata-ha-server\n  namespace: default\n  labels:\n    app.kubernetes.io/name: seata-ha-server\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app.kubernetes.io/name: seata-ha-server\n  template:\n    metadata:\n      labels:\n        app.kubernetes.io/name: seata-ha-server\n    spec:\n      containers:\n        - name: seata-ha-server\n          image: docker.io/seataio/seata-server:latest\n          imagePullPolicy: IfNotPresent\n          env:\n            - name: SEATA_CONFIG_NAME\n              value: file:/root/seata-config/registry\n          ports:\n            - name: http\n              containerPort: 8091\n              protocol: TCP\n          volumeMounts:\n            - name: seata-config\n              mountPath: /root/seata-config\n      volumes:\n        - name: seata-config\n          configMap:\n            name: seata-ha-server-config\n\n\n---\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: seata-ha-server-config\ndata:\n  registry.conf: |\n    registry {\n        type = "nacos"\n        nacos {\n          application = "seata-server"\n          serverAddr = "192.168.199.2"\n        }\n    }\n    config {\n      type = "nacos"\n      nacos {\n        serverAddr = "192.168.199.2"\n        group = "SEATA_GROUP"\n      }\n    }\n')),(0,r.kt)("p",null,"You can reference ",(0,r.kt)("a",{parentName:"p",href:"https://seata.io/zh-cn/blog/seata-ha-practice.html"},"seata-ha-deploy-practice")," for more detail about practice of HA deploy."))}d.isMDXComponent=!0}}]);