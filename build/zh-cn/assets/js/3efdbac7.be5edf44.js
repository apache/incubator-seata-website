"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[3536],{3905:(t,e,a)=>{a.d(e,{Zo:()=>u,kt:()=>c});var n=a(67294);function l(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){l(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function i(t,e){if(null==t)return{};var a,n,l=function(t,e){if(null==t)return{};var a,n,l={},r=Object.keys(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||(l[a]=t[a]);return l}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(l[a]=t[a])}return l}var o=n.createContext({}),d=function(t){var e=n.useContext(o),a=e;return t&&(a="function"==typeof t?t(e):p(p({},e),t)),a},u=function(t){var e=d(t.components);return n.createElement(o.Provider,{value:e},t.children)},m="mdxType",k={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},s=n.forwardRef((function(t,e){var a=t.components,l=t.mdxType,r=t.originalType,o=t.parentName,u=i(t,["components","mdxType","originalType","parentName"]),m=d(a),s=l,c=m["".concat(o,".").concat(s)]||m[s]||k[s]||r;return a?n.createElement(c,p(p({ref:e},u),{},{components:a})):n.createElement(c,p({ref:e},u))}));function c(t,e){var a=arguments,l=e&&e.mdxType;if("string"==typeof t||l){var r=a.length,p=new Array(r);p[0]=s;var i={};for(var o in e)hasOwnProperty.call(e,o)&&(i[o]=e[o]);i.originalType=t,i[m]="string"==typeof t?t:l,p[1]=i;for(var d=2;d<r;d++)p[d]=a[d];return n.createElement.apply(null,p)}return n.createElement.apply(null,a)}s.displayName="MDXCreateElement"},34982:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>o,contentTitle:()=>p,default:()=>k,frontMatter:()=>r,metadata:()=>i,toc:()=>d});var n=a(87462),l=(a(67294),a(3905));const r={title:"Seata \u53c2\u6570\u914d\u7f6e",keywords:["Seata"],description:"Seata \u53c2\u6570\u914d\u7f6e\u3002"},p="seata\u53c2\u6570\u914d\u7f6e 1.0.0\u7248\u672c",i={unversionedId:"user/configurations100",id:"user/configurations100",title:"Seata \u53c2\u6570\u914d\u7f6e",description:"Seata \u53c2\u6570\u914d\u7f6e\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/current/user/configurations100.md",sourceDirName:"user",slug:"/user/configurations100",permalink:"/zh-cn/docs/user/configurations100",draft:!1,tags:[],version:"current",frontMatter:{title:"Seata \u53c2\u6570\u914d\u7f6e",keywords:["Seata"],description:"Seata \u53c2\u6570\u914d\u7f6e\u3002"}},o={},d=[{value:"\u53d8\u66f4\u8bb0\u5f55",id:"\u53d8\u66f4\u8bb0\u5f55",level:3},{value:"\u5173\u6ce8\u5c5e\u6027(\u8be6\u7ec6\u63cf\u8ff0\u89c1\u5168\u5c5e\u6027)",id:"\u5173\u6ce8\u5c5e\u6027\u8be6\u7ec6\u63cf\u8ff0\u89c1\u5168\u5c5e\u6027",level:2},{value:"\u5168\u5c5e\u6027",id:"\u5168\u5c5e\u6027",level:2},{value:"\u516c\u5171\u90e8\u5206",id:"\u516c\u5171\u90e8\u5206",level:3},{value:"server\u7aef",id:"server\u7aef",level:3},{value:"client\u7aef",id:"client\u7aef",level:3},{value:"\u672a\u4f7f\u7528",id:"\u672a\u4f7f\u7528",level:3},{value:"\u53c2\u6570\u540c\u6b65\u5230\u914d\u7f6e\u4e2d\u5fc3\u4f7f\u7528demo",id:"\u53c2\u6570\u540c\u6b65\u5230\u914d\u7f6e\u4e2d\u5fc3\u4f7f\u7528demo",level:3},{value:"Nacos",id:"nacos",level:4},{value:"Apollo",id:"apollo",level:4},{value:"Consul",id:"consul",level:4},{value:"Etcd3",id:"etcd3",level:4},{value:"ZK",id:"zk",level:4},{value:"\u9644\u5f551\uff1a",id:"\u9644\u5f551",level:3},{value:"\u9644\u5f552\uff1a",id:"\u9644\u5f552",level:3},{value:"\u9644\u5f553\uff1a",id:"\u9644\u5f553",level:3},{value:"\u9644\u5f554\uff1a",id:"\u9644\u5f554",level:3}],u={toc:d},m="wrapper";function k(t){let{components:e,...a}=t;return(0,l.kt)(m,(0,n.Z)({},u,a,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"seata\u53c2\u6570\u914d\u7f6e-100\u7248\u672c"},"seata\u53c2\u6570\u914d\u7f6e 1.0.0\u7248\u672c"),(0,l.kt)("a",{href:"./configurations090"},"\u67e5\u770b0.9.0.1\u4e4b\u524d\u7248\u672c"),(0,l.kt)("h3",{id:"\u53d8\u66f4\u8bb0\u5f55"},"\u53d8\u66f4\u8bb0\u5f55"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"20191221: \u589e\u52a0seata.enabled\u3001client.report.success.enable\u3001\ntransport.enable-client-batch-send-request\u3001client.log.exceptionRate\n")),(0,l.kt)("h2",{id:"\u5173\u6ce8\u5c5e\u6027\u8be6\u7ec6\u63cf\u8ff0\u89c1\u5168\u5c5e\u6027"},"\u5173\u6ce8\u5c5e\u6027(\u8be6\u7ec6\u63cf\u8ff0\u89c1\u5168\u5c5e\u6027)"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"server\u7aef"),(0,l.kt)("th",{parentName:"tr",align:null},"client\u7aef"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"registry.type"),(0,l.kt)("td",{parentName:"tr",align:null},"registry.type")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"config.type"),(0,l.kt)("td",{parentName:"tr",align:null},"config.type")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.mode"),(0,l.kt)("td",{parentName:"tr",align:null},"service.vgroup_mapping.my_test_tx_group")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.driver-class-name"),(0,l.kt)("td",{parentName:"tr",align:null},"service.default.grouplist")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.url"),(0,l.kt)("td",{parentName:"tr",align:null},"service.disableGlobalTransaction")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.user"),(0,l.kt)("td",{parentName:"tr",align:null},"client.support.spring.datasource.autoproxy")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.password"),(0,l.kt)("td",{parentName:"tr",align:null})))),(0,l.kt)("h2",{id:"\u5168\u5c5e\u6027"},"\u5168\u5c5e\u6027"),(0,l.kt)("h3",{id:"\u516c\u5171\u90e8\u5206"},"\u516c\u5171\u90e8\u5206"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"key"),(0,l.kt)("th",{parentName:"tr",align:null},"desc"),(0,l.kt)("th",{parentName:"tr",align:null},"remark"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"transport.serialization"),(0,l.kt)("td",{parentName:"tr",align:null},"client\u548cserver\u901a\u4fe1\u7f16\u89e3\u7801\u65b9\u5f0f"),(0,l.kt)("td",{parentName:"tr",align:null},"seata\uff08ByteBuf\uff09\u3001protobuf\u3001kryo\u3001hession\uff0c\u9ed8\u8ba4seata")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"transport.compressor"),(0,l.kt)("td",{parentName:"tr",align:null},"client\u548cserver\u901a\u4fe1\u6570\u636e\u538b\u7f29\u65b9\u5f0f"),(0,l.kt)("td",{parentName:"tr",align:null},"none\u3001gzip\uff0c\u9ed8\u8ba4none")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"transport.heartbeat"),(0,l.kt)("td",{parentName:"tr",align:null},"client\u548cserver\u901a\u4fe1\u5fc3\u8df3\u68c0\u6d4b\u5f00\u5173"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4true\u5f00\u542f")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"registry.type"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6ce8\u518c\u4e2d\u5fc3\u7c7b\u578b"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4file\uff0c\u652f\u6301file \u3001nacos \u3001eureka\u3001redis\u3001zk\u3001consul\u3001etcd3\u3001sofa\u3001custom")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"config.type"),(0,l.kt)("td",{parentName:"tr",align:null},"\u914d\u7f6e\u4e2d\u5fc3\u7c7b\u578b"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4file\uff0c\u652f\u6301file\u3001nacos \u3001apollo\u3001zk\u3001consul\u3001etcd3\u3001custom")))),(0,l.kt)("h3",{id:"server\u7aef"},"server\u7aef"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"key"),(0,l.kt)("th",{parentName:"tr",align:null},"desc"),(0,l.kt)("th",{parentName:"tr",align:null},"remark"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"server.undo.log.save.days"),(0,l.kt)("td",{parentName:"tr",align:null},"undo\u4fdd\u7559\u5929\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba47\u5929,log_status=1\uff08\u9644\u5f553\uff09\u548c\u672a\u6b63\u5e38\u6e05\u7406\u7684undo")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"server.undo.log.delete.period"),(0,l.kt)("td",{parentName:"tr",align:null},"undo\u6e05\u7406\u7ebf\u7a0b\u95f4\u9694\u65f6\u95f4"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba486400000\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"server.max.commit.retry.timeout"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e8c\u9636\u6bb5\u63d0\u4ea4\u91cd\u8bd5\u8d85\u65f6\u65f6\u957f"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5355\u4f4dms,s,m,h,d,\u5bf9\u5e94\u6beb\u79d2,\u79d2,\u5206,\u5c0f\u65f6,\u5929,\u9ed8\u8ba4\u6beb\u79d2\u3002\u9ed8\u8ba4\u503c-1\u8868\u793a\u65e0\u9650\u91cd\u8bd5\u3002\u516c\u5f0f: timeout>=now-globalTransactionBeginTime,true\u8868\u793a\u8d85\u65f6\u5219\u4e0d\u518d\u91cd\u8bd5")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"server.max.rollback.retry.timeout"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e8c\u9636\u6bb5\u56de\u6eda\u91cd\u8bd5\u8d85\u65f6\u65f6\u957f"),(0,l.kt)("td",{parentName:"tr",align:null},"\u540ccommit")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"server.recovery.committing-retry-period"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e8c\u9636\u6bb5\u63d0\u4ea4\u672a\u5b8c\u6210\u72b6\u6001\u5168\u5c40\u4e8b\u52a1\u91cd\u8bd5\u63d0\u4ea4\u7ebf\u7a0b\u95f4\u9694\u65f6\u95f4"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba41000\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"server.recovery.asyn-committing-retry-period"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e8c\u9636\u6bb5\u5f02\u6b65\u63d0\u4ea4\u72b6\u6001\u91cd\u8bd5\u63d0\u4ea4\u7ebf\u7a0b\u95f4\u9694\u65f6\u95f4"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba41000\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"server.recovery.rollbacking-retry-period"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e8c\u9636\u6bb5\u56de\u6eda\u72b6\u6001\u91cd\u8bd5\u56de\u6eda\u7ebf\u7a0b\u95f4\u9694\u65f6\u95f4"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba41000\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"server.recovery.timeout-retry-period"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8d85\u65f6\u72b6\u6001\u68c0\u6d4b\u91cd\u8bd5\u7ebf\u7a0b\u95f4\u9694\u65f6\u95f4"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba41000\uff0c\u5355\u4f4d\u6beb\u79d2\uff0c\u68c0\u6d4b\u51fa\u8d85\u65f6\u5c06\u5168\u5c40\u4e8b\u52a1\u7f6e\u5165\u56de\u6eda\u4f1a\u8bdd\u7ba1\u7406\u5668")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.mode"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e8b\u52a1\u4f1a\u8bdd\u4fe1\u606f\u5b58\u50a8\u65b9\u5f0f"),(0,l.kt)("td",{parentName:"tr",align:null},"file\u672c\u5730\u6587\u4ef6(\u4e0d\u652f\u6301HA)\uff0cdb\u6570\u636e\u5e93(\u652f\u6301HA)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.file.dir"),(0,l.kt)("td",{parentName:"tr",align:null},"file\u6a21\u5f0f\u6587\u4ef6\u5b58\u50a8\u6587\u4ef6\u5939\u540d"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4sessionStore")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.datasource"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u6570\u636e\u6e90\u7c7b\u578b"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4dbcp")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.db-type"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u6570\u636e\u5e93\u7c7b\u578b"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4mysql")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.driver-class-name"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u6570\u636e\u5e93\u9a71\u52a8"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4com.mysql.jdbc.Driver")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.url"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u6570\u636e\u5e93url"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4jdbc:mysql://127.0.0.1:3306/seata")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.user"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u6570\u636e\u5e93\u8d26\u6237"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4mysql")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.password"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u6570\u636e\u5e93\u8d26\u6237\u5bc6\u7801"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4mysql")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.min-conn"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u6570\u636e\u5e93\u521d\u59cb\u8fde\u63a5\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba41")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.max-conn"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u6570\u636e\u5e93\u6700\u5927\u8fde\u63a5\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba43")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.global.table"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u5168\u5c40\u4e8b\u52a1\u8868\u540d"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4global_table")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.branch.table"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u5206\u652f\u4e8b\u52a1\u8868\u540d"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4branch_table")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.lock-table"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u5168\u5c40\u9501\u8868\u540d"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4lock_table")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"store.db.query-limit"),(0,l.kt)("td",{parentName:"tr",align:null},"db\u6a21\u5f0f\u67e5\u8be2\u5168\u5c40\u4e8b\u52a1\u4e00\u6b21\u7684\u6700\u5927\u6761\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4100")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"metrics.enabled"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f\u5426\u542f\u7528Metrics"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4false\u5173\u95ed\uff0c\u5728False\u72b6\u6001\u4e0b\uff0c\u6240\u6709\u4e0eMetrics\u76f8\u5173\u7684\u7ec4\u4ef6\u5c06\u4e0d\u4f1a\u88ab\u521d\u59cb\u5316\uff0c\u4f7f\u5f97\u6027\u80fd\u635f\u8017\u6700\u4f4e")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"metrics.registry-type"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6307\u6807\u6ce8\u518c\u5668\u7c7b\u578b"),(0,l.kt)("td",{parentName:"tr",align:null},"Metrics\u4f7f\u7528\u7684\u6307\u6807\u6ce8\u518c\u5668\u7c7b\u578b\uff0c\u9ed8\u8ba4\u4e3a\u5185\u7f6e\u7684compact\uff08\u7b80\u6613\uff09\u5b9e\u73b0\uff0c\u8fd9\u4e2a\u5b9e\u73b0\u4e2d\u7684Meter\u4ec5\u4f7f\u7528\u6709\u9650\u5185\u5b58\u8ba1\u6570\uff0c\u6027\u80fd\u9ad8\u8db3\u591f\u6ee1\u8db3\u5927\u591a\u6570\u573a\u666f\uff1b\u76ee\u524d\u53ea\u80fd\u8bbe\u7f6e\u4e00\u4e2a\u6307\u6807\u6ce8\u518c\u5668\u5b9e\u73b0")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"metrics.exporter-list"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6307\u6807\u7ed3\u679cMeasurement\u6570\u636e\u8f93\u51fa\u5668\u5217\u8868"),(0,l.kt)("td",{parentName:"tr",align:null},'\u9ed8\u8ba4prometheus\uff0c\u591a\u4e2a\u8f93\u51fa\u5668\u4f7f\u7528\u82f1\u6587\u9017\u53f7\u5206\u5272\uff0c\u4f8b\u5982"prometheus,jmx"\uff0c\u76ee\u524d\u4ec5\u5b9e\u73b0\u4e86\u5bf9\u63a5prometheus\u7684\u8f93\u51fa\u5668')),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"metrics.exporter-prometheus-port"),(0,l.kt)("td",{parentName:"tr",align:null},"prometheus\u8f93\u51fa\u5668Client\u7aef\u53e3\u53f7"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba49898")))),(0,l.kt)("h3",{id:"client\u7aef"},"client\u7aef"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"key"),(0,l.kt)("th",{parentName:"tr",align:null},"desc"),(0,l.kt)("th",{parentName:"tr",align:null},"remark"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"seata.enabled"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f\u5426\u5f00\u542fspring-boot\u81ea\u52a8\u88c5\u914d"),(0,l.kt)("td",{parentName:"tr",align:null},"true\u3001false\uff0c\u9ed8\u8ba4true\uff08\u9644\u5f554\uff09")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.report.success.enable"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f\u5426\u4e0a\u62a5\u4e00\u9636\u6bb5\u6210\u529f"),(0,l.kt)("td",{parentName:"tr",align:null},"true\u3001false\uff0c\u9ed8\u8ba4true\u7528\u4e8e\u4fdd\u6301\u5206\u652f\u4e8b\u52a1\u751f\u547d\u5468\u671f\u8bb0\u5f55\u5b8c\u6574\uff0cfalse\u53ef\u63d0\u9ad8\u4e0d\u5c11\u6027\u80fd")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"transport.enable-client-batch-send-request"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5ba2\u6237\u7aef\u4e8b\u52a1\u6d88\u606f\u8bf7\u6c42\u662f\u5426\u6279\u91cf\u5408\u5e76\u53d1\u9001"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4true\uff0cfalse\u5355\u6761\u53d1\u9001")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.log.exceptionRate"),(0,l.kt)("td",{parentName:"tr",align:null},"\u65e5\u5fd7\u5f02\u5e38\u8f93\u51fa\u6982\u7387"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4100\uff0c\u76ee\u524d\u7528\u4e8eundo\u56de\u6eda\u5931\u8d25\u65f6\u5f02\u5e38\u5806\u6808\u8f93\u51fa\uff0c\u767e\u5206\u4e4b\u4e00\u7684\u6982\u7387\u8f93\u51fa\uff0c\u56de\u6eda\u5931\u8d25\u57fa\u672c\u662f\u810f\u6570\u636e\uff0c\u65e0\u9700\u8f93\u51fa\u5806\u6808\u5360\u7528\u786c\u76d8\u7a7a\u95f4")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"service.vgroup_mapping.my_test_tx_group"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e8b\u52a1\u7fa4\u7ec4\uff08\u9644\u5f551\uff09"),(0,l.kt)("td",{parentName:"tr",align:null},"my_test_tx_group\u4e3a\u5206\u7ec4\uff0c\u914d\u7f6e\u9879\u503c\u4e3aTC\u96c6\u7fa4\u540d")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"service.default.grouplist"),(0,l.kt)("td",{parentName:"tr",align:null},"TC\u670d\u52a1\u5217\u8868\uff08\u9644\u5f552\uff09"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4ec5\u6ce8\u518c\u4e2d\u5fc3\u4e3afile\u65f6\u4f7f\u7528")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"service.disableGlobalTransaction"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5168\u5c40\u4e8b\u52a1\u5f00\u5173"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4false\u3002false\u4e3a\u5f00\u542f\uff0ctrue\u4e3a\u5173\u95ed")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"service.enableDegrade"),(0,l.kt)("td",{parentName:"tr",align:null},"\u964d\u7ea7\u5f00\u5173\uff08\u5f85\u5b9e\u73b0\uff09"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4false\u3002\u4e1a\u52a1\u4fa7\u6839\u636e\u8fde\u7eed\u9519\u8bef\u6570\u81ea\u52a8\u964d\u7ea7\u4e0d\u8d70seata\u4e8b\u52a1")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.rm.async.commit.buffer.limit"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5f02\u6b65\u63d0\u4ea4\u7f13\u5b58\u961f\u5217\u957f\u5ea6"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba410000\u3002 \u4e8c\u9636\u6bb5\u63d0\u4ea4\u6210\u529f\uff0cRM\u5f02\u6b65\u6e05\u7406undo\u961f\u5217")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.rm.lock.retry.internal"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6821\u9a8c\u6216\u5360\u7528\u5168\u5c40\u9501\u91cd\u8bd5\u95f4\u9694"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba410\uff0c\u5355\u4f4d\u6beb\u79d2")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.rm.lock.retry.times"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6821\u9a8c\u6216\u5360\u7528\u5168\u5c40\u9501\u91cd\u8bd5\u6b21\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba430")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.rm.lock.retry.policy.branch-rollback-on-conflict"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5206\u652f\u4e8b\u52a1\u4e0e\u5176\u5b83\u5168\u5c40\u56de\u6eda\u4e8b\u52a1\u51b2\u7a81\u65f6\u9501\u7b56\u7565"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4true\uff0c\u4f18\u5148\u91ca\u653e\u672c\u5730\u9501\u8ba9\u56de\u6eda\u6210\u529f")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.rm.report.retry.count"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e00\u9636\u6bb5\u7ed3\u679c\u4e0a\u62a5TC\u91cd\u8bd5\u6b21\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba45\u6b21")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.rm.table.meta.check.enable"),(0,l.kt)("td",{parentName:"tr",align:null},"\u81ea\u52a8\u5237\u65b0\u7f13\u5b58\u4e2d\u7684\u8868\u7ed3\u6784"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4false")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.tm.commit.retry.count"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e00\u9636\u6bb5\u5168\u5c40\u63d0\u4ea4\u7ed3\u679c\u4e0a\u62a5TC\u91cd\u8bd5\u6b21\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba41\u6b21\uff0c\u5efa\u8bae\u5927\u4e8e1")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.tm.rollback.retry.count"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e00\u9636\u6bb5\u5168\u5c40\u56de\u6eda\u7ed3\u679c\u4e0a\u62a5TC\u91cd\u8bd5\u6b21\u6570"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba41\u6b21\uff0c\u5efa\u8bae\u5927\u4e8e1")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.undo.data.validation"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e8c\u9636\u6bb5\u56de\u6eda\u955c\u50cf\u6821\u9a8c"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4true\u5f00\u542f\uff0cfalse\u5173\u95ed")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.undo.log.serialization"),(0,l.kt)("td",{parentName:"tr",align:null},"undo\u5e8f\u5217\u5316\u65b9\u5f0f"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4jackson")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.undo.log.table"),(0,l.kt)("td",{parentName:"tr",align:null},"\u81ea\u5b9a\u4e49undo\u8868\u540d"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4undo_log")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client.support.spring.datasource.autoproxy"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6570\u636e\u6e90\u81ea\u52a8\u4ee3\u7406\u5f00\u5173"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9ed8\u8ba4false\u5173\u95ed")))),(0,l.kt)("h3",{id:"\u672a\u4f7f\u7528"},"\u672a\u4f7f\u7528"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"key"),(0,l.kt)("th",{parentName:"tr",align:null},"desc"),(0,l.kt)("th",{parentName:"tr",align:null},"remark"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"lock.mode"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9501\u5b58\u50a8\u65b9\u5f0f"),(0,l.kt)("td",{parentName:"tr",align:null},"local\u3001remote")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"lock.local"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"lock.remote"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})))),(0,l.kt)("h3",{id:"\u53c2\u6570\u540c\u6b65\u5230\u914d\u7f6e\u4e2d\u5fc3\u4f7f\u7528demo"},"\u53c2\u6570\u540c\u6b65\u5230\u914d\u7f6e\u4e2d\u5fc3\u4f7f\u7528demo"),(0,l.kt)("h4",{id:"nacos"},"Nacos"),(0,l.kt)("p",null,"shell:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"sh ${SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca\n")),(0,l.kt)("p",null,"\u53c2\u6570\u8bf4\u660e\uff1a"),(0,l.kt)("p",null,"-h: host\uff0c\u9ed8\u8ba4\u503c localhost"),(0,l.kt)("p",null,"-p: port\uff0c\u9ed8\u8ba4\u503c 8848"),(0,l.kt)("p",null,"-g: \u914d\u7f6e\u5206\u7ec4\uff0c\u9ed8\u8ba4\u503c\u4e3a 'SEATA_GROUP'"),(0,l.kt)("p",null,"-t: \u79df\u6237\u4fe1\u606f\uff0c\u5bf9\u5e94 Nacos \u7684\u547d\u540d\u7a7a\u95f4ID\u5b57\u6bb5, \u9ed8\u8ba4\u503c\u4e3a\u7a7a ''"),(0,l.kt)("h4",{id:"apollo"},"Apollo"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"sh ${SEATAPATH}/script/config-center/apollo/apollo-config.sh -h localhost -p 8070 -e DEV -a seata-server -c default -n application -d apollo -r apollo -t 3aa026fc8435d0fc4505b345b8fa4578fb646a2c\n")),(0,l.kt)("p",null,"\u53c2\u6570\u8bf4\u660e\uff1a"),(0,l.kt)("p",null,"-h: host\uff0c\u9ed8\u8ba4\u503c localhost"),(0,l.kt)("p",null,"-p: port\uff0c\u9ed8\u8ba4\u503c 8070"),(0,l.kt)("p",null,"-e: \u6240\u7ba1\u7406\u7684\u914d\u7f6e\u73af\u5883\uff0c\u9ed8\u8ba4\u503c DEV"),(0,l.kt)("p",null,"-a: Namespace \u6240\u5c5e\u7684 AppId\uff0c\u9ed8\u8ba4\u503c seata-server"),(0,l.kt)("p",null,"-c: \u6240\u7ba1\u7406\u7684\u914d\u7f6e\u96c6\u7fa4\u540d\uff0c \u4e00\u822c\u60c5\u51b5\u4e0b\u4f20\u5165 default \u5373\u53ef\u3002\u5982\u679c\u662f\u7279\u6b8a\u96c6\u7fa4\uff0c\u4f20\u5165\u76f8\u5e94\u96c6\u7fa4\u7684\u540d\u79f0\u5373\u53ef\uff0c\u9ed8\u8ba4\u503c default"),(0,l.kt)("p",null,"-n: \u6240\u7ba1\u7406\u7684 Namespace \u7684\u540d\u79f0\uff0c\u5982\u679c\u662f\u975e properties \u683c\u5f0f\uff0c\u9700\u8981\u52a0\u4e0a\u540e\u7f00\u540d\uff0c\u5982 sample.yml\uff0c\u9ed8\u8ba4\u503c application"),(0,l.kt)("p",null,"-d: item \u7684\u521b\u5efa\u4eba\uff0c\u683c\u5f0f\u4e3a\u57df\u8d26\u53f7\uff0c\u4e5f\u5c31\u662f sso \u7cfb\u7edf\u7684 User ID"),(0,l.kt)("p",null,"-r: \u53d1\u5e03\u4eba\uff0c\u57df\u8d26\u53f7\uff0c\u6ce8\u610f\uff1a\u5982\u679c ApolloConfigDB.ServerConfig \u4e2d\u7684 namespace.lock.switch \u8bbe\u7f6e\u4e3a true \u7684\u8bdd\uff08\u9ed8\u8ba4\u662f false\uff09\uff0c\u90a3\u4e48\u8be5\u73af\u5883\u4e0d\u5141\u8bb8\u53d1\u5e03\u4eba\u548c\u7f16\u8f91\u4eba\u4e3a\u540c\u4e00\u4eba\u3002\u6240\u4ee5\u5982\u679c\u7f16\u8f91\u4eba\u662f zhangsan\uff0c\u53d1\u5e03\u4eba\u5c31\u4e0d\u80fd\u518d\u662f zhangsan\u3002"),(0,l.kt)("p",null,"-t: Apollo \u7ba1\u7406\u5458\u5728 http://{portal_address}/open/manage.html \u521b\u5efa\u7b2c\u4e09\u65b9\u5e94\u7528\uff0c\u521b\u5efa\u4e4b\u524d\u6700\u597d\u5148\u67e5\u8be2\u6b64AppId\u662f\u5426\u5df2\u7ecf\u521b\u5efa\u3002\u521b\u5efa\u6210\u529f\u4e4b\u540e\u4f1a\u751f\u6210\u4e00\u4e2a token"),(0,l.kt)("p",null,"\u4ee5\u4e0a\u53c2\u6570\u8bf4\u660e\u8be6\u60c5\u8bf7\u770b\uff1a"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/ctripcorp/apollo/wiki/Apollo%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0"},"https://github.com/ctripcorp/apollo/wiki/Apollo%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0")),(0,l.kt)("h4",{id:"consul"},"Consul"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"sh ${SEATAPATH}/script/config-center/consul/consul-config.sh -h localhost -p 8500\n")),(0,l.kt)("p",null,"\u53c2\u6570\u8bf4\u660e\uff1a"),(0,l.kt)("p",null,"-h: host\uff0c\u9ed8\u8ba4\u503c localhost"),(0,l.kt)("p",null,"-p: port\uff0c\u9ed8\u8ba4\u503c 8500"),(0,l.kt)("h4",{id:"etcd3"},"Etcd3"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"sh ${SEATAPATH}/script/config-center/etcd3/etcd3-config.sh -h localhost -p 2379\n")),(0,l.kt)("p",null,"\u53c2\u6570\u8bf4\u660e\uff1a"),(0,l.kt)("p",null,"-h: host\uff0c\u9ed8\u8ba4\u503c localhost"),(0,l.kt)("p",null,"-p: port\uff0c\u9ed8\u8ba4\u503c 2379"),(0,l.kt)("p",null,"python:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"python ${SEATAPATH}/script/config-center/nacos/nacos-config.py localhost:8848\n")),(0,l.kt)("h4",{id:"zk"},"ZK"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'sh ${SEATAPATH}/script/config-center/zk/zk-config.sh -h localhost -p 2181 -z "/Users/zhangchenghui/zookeeper-3.4.14"\n')),(0,l.kt)("p",null,"\u53c2\u6570\u8bf4\u660e\uff1a"),(0,l.kt)("p",null,"-h: host\uff0c\u9ed8\u8ba4\u503c localhost"),(0,l.kt)("p",null,"-p: port\uff0c\u9ed8\u8ba4\u503c 2181"),(0,l.kt)("p",null,"-z: zk\u6240\u5c5e\u8def\u5f84"),(0,l.kt)("h3",{id:"\u9644\u5f551"},"\u9644\u5f551\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"\u4e8b\u52a1\u5206\u7ec4\u8bf4\u660e\u3002\n1.\u4e8b\u52a1\u5206\u7ec4\u662f\u4ec0\u4e48\uff1f\n\u4e8b\u52a1\u5206\u7ec4\u662fseata\u7684\u8d44\u6e90\u903b\u8f91\uff0c\u7c7b\u4f3c\u4e8e\u670d\u52a1\u5b9e\u4f8b\u3002\u5728file.conf\u4e2d\u7684my_test_tx_group\u5c31\u662f\u4e00\u4e2a\u4e8b\u52a1\u5206\u7ec4\u3002\n2.\u901a\u8fc7\u4e8b\u52a1\u5206\u7ec4\u5982\u4f55\u627e\u5230\u540e\u7aef\u96c6\u7fa4\uff1f\n\u9996\u5148\u7a0b\u5e8f\u4e2d\u914d\u7f6e\u4e86\u4e8b\u52a1\u5206\u7ec4\uff08GlobalTransactionScanner \u6784\u9020\u65b9\u6cd5\u7684txServiceGroup\u53c2\u6570\uff09\uff0c\u7a0b\u5e8f\u4f1a\u901a\u8fc7\u7528\u6237\u914d\u7f6e\u7684\u914d\u7f6e\u4e2d\u5fc3\u53bb\u5bfb\u627eservice.vgroup_mapping.\u4e8b\u52a1\u5206\u7ec4\u914d\u7f6e\u9879\uff0c\u53d6\u5f97\u914d\u7f6e\u9879\u7684\u503c\u5c31\u662fTC\u96c6\u7fa4\u7684\u540d\u79f0\u3002\u62ff\u5230\u96c6\u7fa4\u540d\u79f0\u7a0b\u5e8f\u901a\u8fc7\u4e00\u5b9a\u7684\u524d\u540e\u7f00+\u96c6\u7fa4\u540d\u79f0\u53bb\u6784\u9020\u670d\u52a1\u540d\uff0c\u5404\u914d\u7f6e\u4e2d\u5fc3\u7684\u670d\u52a1\u540d\u5b9e\u73b0\u4e0d\u540c\u3002\u62ff\u5230\u670d\u52a1\u540d\u53bb\u76f8\u5e94\u7684\u6ce8\u518c\u4e2d\u5fc3\u53bb\u62c9\u53d6\u76f8\u5e94\u670d\u52a1\u540d\u7684\u670d\u52a1\u5217\u8868\uff0c\u83b7\u5f97\u540e\u7aef\u771f\u5b9e\u7684TC\u670d\u52a1\u5217\u8868\u3002\n3.\u4e3a\u4ec0\u4e48\u8fd9\u4e48\u8bbe\u8ba1\uff0c\u4e0d\u76f4\u63a5\u53d6\u670d\u52a1\u540d\uff1f\n\u8fd9\u91cc\u591a\u4e86\u4e00\u5c42\u83b7\u53d6\u4e8b\u52a1\u5206\u7ec4\u5230\u6620\u5c04\u96c6\u7fa4\u7684\u914d\u7f6e\u3002\u8fd9\u6837\u8bbe\u8ba1\u540e\uff0c\u4e8b\u52a1\u5206\u7ec4\u53ef\u4ee5\u4f5c\u4e3a\u8d44\u6e90\u7684\u903b\u8f91\u9694\u79bb\u5355\u4f4d\uff0c\u5f53\u53d1\u751f\u6545\u969c\u65f6\u53ef\u4ee5\u5feb\u901ffailover\u3002\n")),(0,l.kt)("h3",{id:"\u9644\u5f552"},"\u9644\u5f552\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"\u5173\u4e8egrouplist\u95ee\u9898\u8bf4\u660e\u4e0b\u3002\n1. \u4ec0\u4e48\u65f6\u5019\u4f1a\u7528\u5230file.conf\u4e2d\u7684default.grouplist\uff1f\n\u5f53registry.type=file\u65f6\u4f1a\u7528\u5230\uff0c\u5176\u4ed6\u65f6\u5019\u4e0d\u8bfb\u3002\n2. default.grouplist\u7684\u503c\u5217\u8868\u662f\u5426\u53ef\u4ee5\u914d\u7f6e\u591a\u4e2a\uff1f\n\u53ef\u4ee5\u914d\u7f6e\u591a\u4e2a\uff0c\u914d\u7f6e\u591a\u4e2a\u610f\u5473\u7740\u96c6\u7fa4\uff0c\u4f46\u5f53store.mode=file\u65f6\uff0c\u4f1a\u62a5\u9519\u3002\u539f\u56e0\u662f\u5728file\u5b58\u50a8\u6a21\u5f0f\u4e0b\u672a\u63d0\u4f9b\u672c\u5730\u6587\u4ef6\u7684\u540c\u6b65\uff0c\u6240\u4ee5\u9700\u8981\u4f7f\u7528store.mode=db\uff0c\u901a\u8fc7db\u6765\u5171\u4eabTC\u96c6\u7fa4\u95f4\u6570\u636e\n3. \u662f\u5426\u63a8\u8350\u4f7f\u7528default.grouplist\uff1f\n\u4e0d\u63a8\u8350\uff0c\u5982\u95ee\u98981\uff0c\u5f53registry.type=file\u65f6\u4f1a\u7528\u5230\uff0c\u4e5f\u5c31\u662f\u8bf4\u8fd9\u91cc\u7528\u7684\u4e0d\u662f\u771f\u6b63\u7684\u6ce8\u518c\u4e2d\u5fc3\uff0c\u4e0d\u5177\u4f53\u670d\u52a1\u7684\u5065\u5eb7\u68c0\u67e5\u673a\u5236\u5f53tc\u4e0d\u53ef\u7528\u65f6\u65e0\u6cd5\u81ea\u52a8\u5254\u9664\u5217\u8868\uff0c\u63a8\u8350\u4f7f\u7528nacos \u3001eureka\u3001redis\u3001zk\u3001consul\u3001etcd3\u3001sofa\u3002registry.type=file\u6216config.type=file \u8bbe\u8ba1\u7684\u521d\u8877\u662f\u8ba9\u7528\u6237\u518d\u4e0d\u4f9d\u8d56\u7b2c\u4e09\u65b9\u6ce8\u518c\u4e2d\u5fc3\u6216\u914d\u7f6e\u4e2d\u5fc3\u7684\u524d\u63d0\u4e0b\uff0c\u901a\u8fc7\u76f4\u8fde\u7684\u65b9\u5f0f\uff0c\u5feb\u901f\u9a8c\u8bc1seata\u670d\u52a1\u3002    \n")),(0,l.kt)("h3",{id:"\u9644\u5f553"},"\u9644\u5f553\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"log_status=1\u7684\u662f\u9632\u5fa1\u6027\u7684\uff0c\u662f\u6536\u5230\u5168\u5c40\u56de\u6eda\u8bf7\u6c42\uff0c\u4f46\u662f\u4e0d\u786e\u5b9a\u67d0\u4e2a\u4e8b\u52a1\u5206\u652f\u7684\u672c\u5730\u4e8b\u52a1\u662f\u5426\u5df2\u7ecf\u6267\u884c\u5b8c\u6210\u4e86\uff0c\u8fd9\u65f6\u4e8b\u5148\u63d2\u5165\u4e00\u6761branchid\u76f8\u540c\u7684\u6570\u636e\uff0c\u63d2\u5165\u7684\u5047\u6570\u636e\u6210\u529f\u4e86\uff0c\u672c\u5730\u4e8b\u52a1\u7ee7\u7eed\u6267\u884c\u5c31\u4f1a\u62a5\u4e3b\u952e\u51b2\u7a81\u81ea\u52a8\u56de\u6eda\u3002\n\u5047\u5982\u63d2\u5165\u4e0d\u6210\u529f\u8bf4\u660e\u8868\u91cc\u6709\u6570\u636e\u8fd9\u4e2a\u672c\u5730\u4e8b\u52a1\u5df2\u7ecf\u6267\u884c\u5b8c\u6210\u4e86\uff0c\u90a3\u4e48\u53d6\u51fa\u8fd9\u6761undolog\u6570\u636e\u505a\u53cd\u5411\u56de\u6eda\u64cd\u4f5c\u3002\n")),(0,l.kt)("h3",{id:"\u9644\u5f554"},"\u9644\u5f554\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"\u662f\u5426\u5f00\u542fspring-boot\u81ea\u52a8\u88c5\u914d\uff0c\u5982\u679c\u5f00\u542f\uff0c\u5219\u4f1a\u81ea\u52a8\u914d\u7f6eseata\u4e0espring-boot\u7684\u96c6\u6210\uff0c\u5305\u62ec\u6570\u636e\u6e90\u7684\u81ea\u52a8\u4ee3\u7406\u4ee5\u53caGlobalTransactionScanner\u521d\u59cb\u5316\u3002\n\u6ce8\uff1a1.0\u7248\u672c\u65b0\u7279\u6027\uff0c\u9700\u4f9d\u8d56seata-spring-boot-starter\u3002\n")))}k.isMDXComponent=!0}}]);