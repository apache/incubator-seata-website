"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[24141],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=o,f=p["".concat(i,".").concat(m)]||p[m]||d[m]||a;return n?r.createElement(f,l(l({ref:t},u),{},{components:n})):r.createElement(f,l({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:o,l[1]=s;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},68116:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=n(87462),o=(n(67294),n(3905));const a={title:"Consul \u914d\u7f6e\u4e2d\u5fc3",keywords:["Seata","Consul"],description:"Consul \u914d\u7f6e\u4e2d\u5fc3\u3002"},l="Consul \u914d\u7f6e\u4e2d\u5fc3",s={unversionedId:"user/configuration/consul",id:"version-v1.0/user/configuration/consul",title:"Consul \u914d\u7f6e\u4e2d\u5fc3",description:"Consul \u914d\u7f6e\u4e2d\u5fc3\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.0/user/configuration/consul.md",sourceDirName:"user/configuration",slug:"/user/configuration/consul",permalink:"/zh-cn/docs/v1.0/user/configuration/consul",draft:!1,tags:[],version:"v1.0",frontMatter:{title:"Consul \u914d\u7f6e\u4e2d\u5fc3",keywords:["Seata","Consul"],description:"Consul \u914d\u7f6e\u4e2d\u5fc3\u3002"},sidebar:"docs",previous:{title:"Etcd3 \u914d\u7f6e\u4e2d\u5fc3",permalink:"/zh-cn/docs/v1.0/user/configuration/etcd3"},next:{title:"Zookeeper \u914d\u7f6e\u4e2d\u5fc3",permalink:"/zh-cn/docs/v1.0/user/configuration/zookeeper"}},i={},c=[{value:"\u51c6\u5907\u5de5\u4f5c",id:"\u51c6\u5907\u5de5\u4f5c",level:2},{value:"\u5feb\u901f\u4e0a\u624b",id:"\u5feb\u901f\u4e0a\u624b",level:2},{value:"\u914d\u7f6e Consul \u4e3a\u914d\u7f6e\u4e2d\u5fc3",id:"\u914d\u7f6e-consul-\u4e3a\u914d\u7f6e\u4e2d\u5fc3",level:3},{value:"\u63d0\u4ea4 Key-Value \u914d\u7f6e\u81f3 Consul",id:"\u63d0\u4ea4-key-value-\u914d\u7f6e\u81f3-consul",level:3},{value:"Client \u7aef \u914d\u7f6e Consul \u4e3a\u914d\u7f6e\u4e2d\u5fc3",id:"client-\u7aef-\u914d\u7f6e-consul-\u4e3a\u914d\u7f6e\u4e2d\u5fc3",level:3},{value:"Client\u7aef\u914d\u7f6e",id:"client\u7aef\u914d\u7f6e",level:3}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"consul-\u914d\u7f6e\u4e2d\u5fc3"},"Consul \u914d\u7f6e\u4e2d\u5fc3"),(0,o.kt)("p",null,"\u5728 ",(0,o.kt)("a",{parentName:"p",href:"http://seata.io/zh-cn/docs/user/registry/consul.html"},"\u4ee5 Consul \u4f5c\u4e3a\u6ce8\u518c\u4e2d\u5fc3")," \u7684\u57fa\u7840\u4e0a\uff0c\u5c06 Seata \u914d\u7f6e\u653e\u5230 Consul \u4e2d"),(0,o.kt)("p",null,"\u672c\u6587\u57fa\u4e8e Seata 1.4.2\uff0cConsul \u7248\u672c\u5efa\u8bae 1.8+\uff0c\u4e0b\u6587\u4ee5 Consul 1.11.2 \u4e3a\u4f8b"),(0,o.kt)("h2",{id:"\u51c6\u5907\u5de5\u4f5c"},"\u51c6\u5907\u5de5\u4f5c"),(0,o.kt)("p",null,"\u5f53\u60a8\u51b3\u5b9a\u4f7f\u7528 Consul \u4f5c\u4e3a Seata \u914d\u7f6e\u4e2d\u5fc3\u524d\uff0c\u8bf7\u786e\u4fdd\u5df2\u7ecf\u542f\u52a8 Consul \u670d\u52a1\u3002"),(0,o.kt)("h2",{id:"\u5feb\u901f\u4e0a\u624b"},"\u5feb\u901f\u4e0a\u624b"),(0,o.kt)("p",null,"\u5c06 Consul \u4f5c\u4e3a Seata \u914d\u7f6e\u4e2d\u5fc3\u7684\u64cd\u4f5c\u6b65\u9aa4\u975e\u5e38\u7b80\u5355\uff0c\u53ef\u5206\u4e3a\u4ee5\u4e0b\u51e0\u6b65\uff1a"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"seata-server \u914d\u7f6e Consul \u4e3a\u914d\u7f6e\u4e2d\u5fc3"),(0,o.kt)("li",{parentName:"ol"},"\u63d0\u4ea4 Key-Value \u914d\u7f6e\u81f3 Consul"),(0,o.kt)("li",{parentName:"ol"},"Client \u7aef \u914d\u7f6e Consul \u4e3a\u914d\u7f6e\u4e2d\u5fc3")),(0,o.kt)("h3",{id:"\u914d\u7f6e-consul-\u4e3a\u914d\u7f6e\u4e2d\u5fc3"},"\u914d\u7f6e Consul \u4e3a\u914d\u7f6e\u4e2d\u5fc3"),(0,o.kt)("p",null,"\u9996\u5148\uff0c\u8bf7\u786e\u4fdd\u60a8\u7684 Consul \u670d\u52a1\u5df2\u542f\u52a8"),(0,o.kt)("p",null,"\u5728 Seata \u76ee\u5f55\u4e0b /conf/registry.conf\n\u4e2d\u52a0\u5165\u5bf9\u5e94\u914d\u7f6e\u4e2d\u5fc3,\u5176\u4f59",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/1.4.2/script/server/config/registry.conf"},"\u914d\u7f6e\u53c2\u8003")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'config {\n  type = "consul"\n\n  consul {\n    serverAddr = "127.0.0.1:8500"\n    aclToken = ""\n  }\n}\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u6b64\u65f6\u542f\u52a8 Seata \u670d\u52a1\uff0c\u4f1a\u63d0\u793a\u5982\u4e0b\u5b57\u6837\u4fe1\u606f\uff0c\u53ef\u5148\u5173\u95ed\u670d\u52a1")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"config operation timeout,cost:5015 ms,op:GET,dataId:store.mode\nconfig operation timeout,cost:5006 ms,op:GET,dataId:metrics.enabled\nconfig operation timeout,cost:5001 ms,op:GET,dataId:transport.threadFactory.bossThreadPrefix\nconfig operation timeout,cost:5009 ms,op:GET,dataId:transport.threadFactory.workerThreadPrefix\n# \u6b64\u5904\u7701\u7565\u7c7b\u4f3c\u7684\u5176\u4ed6\u4fe1\u606f~\n")),(0,o.kt)("h3",{id:"\u63d0\u4ea4-key-value-\u914d\u7f6e\u81f3-consul"},"\u63d0\u4ea4 Key-Value \u914d\u7f6e\u81f3 Consul"),(0,o.kt)("p",null,"\u51fa\u73b0\u4ee5\u4e0a\u62a5\u9519\u4fe1\u606f\u662f\u56e0\u4e3a Consul \u4e2d\u7f3a\u5c11\u5bf9\u5e94\u914d\u7f6e\uff0c\u8bf7\u4ece\u4ee5\u4e0b\u65b9\u5f0f\u4e2d",(0,o.kt)("strong",{parentName:"p"},"\u9009\u62e9\u5176\u4e2d\u4e00\u79cd\u65b9\u5f0f"),"\u63d0\u4ea4\u914d\u7f6e\u5230 Consul Key/Value \u4e2d"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u901a\u8fc7 Consul \u63a7\u5236\u53f0 ui\uff0cKey/Value -> create"),(0,o.kt)("li",{parentName:"ol"},"\u901a\u8fc7 ",(0,o.kt)("a",{parentName:"li",href:"https://www.consul.io/api-docs/kv"},"http \u8bf7\u6c42")),(0,o.kt)("li",{parentName:"ol"},"\u901a\u8fc7 ",(0,o.kt)("a",{parentName:"li",href:"https://www.consul.io/commands/kv"},"Consul \u547d\u4ee4\u884c\u5de5\u5177")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"\u63a8\u8350\uff1a\u4f7f\u7528\u5b98\u65b9\u63d0\u4f9b\u7684\u4e0a\u4f20\u914d\u7f6e\u811a\u672c"))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"tips"),": 1.4.2 \u9700\u8981\u9010\u4e2a\u521b\u5efa key-value\uff0c1.5.0 \u540e\u652f\u6301 key \u5bf9\u5e94\u6587\u4ef6"),(0,o.kt)("p",null,"\u4ee5 store.mode=file\n\u4e3a\u4f8b\uff0c\u63d0\u4ea4\u62a5\u9519\u4fe1\u606f\u5bf9\u5e94\u7684\u914d\u7f6e\uff0c\u5728\u8fd9\u91cc\u53ef\u4ee5\u627e\u5230",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/1.4.2/script/config-center/config.txt"},"\u9ed8\u8ba4\u914d\u7f6e")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-properties"},"store.mode=file\nstore.publicKey=\nstore.file.dir=file_store/data\nstore.file.maxBranchSessionSize=16384\n# \u5269\u4e0b\u7684\u914d\u7f6e\u9879\u7701\u7565~\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u63a8\u8350\u4f7f\u7528\u5b98\u65b9\u811a\u672c\uff1a")," \u4ee5\u4e0a\u65b9\u5f0f 1~3 \u9700\u8981\u9010\u4e2a\u6dfb\u52a0\u914d\u7f6e\uff0c\u64cd\u4f5c\u8f83\u4e3a\u7e41\u7410\uff0c\u4e3a\u6b64\u5b98\u65b9\u63d0\u4f9b\u4e86\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/1.4.2/script/config-center/consul/consul-config.sh"},"\u811a\u672c")," \u548c\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/1.4.2/script/config-center/config.txt"},"\u9ed8\u8ba4\u914d\u7f6e"),"\n\u4ee5\u5feb\u901f\u6dfb\u52a0\u914d\u7f6e"),(0,o.kt)("p",null,"\u5c06 config.txt \u653e\u5728 consul-config.sh \u7684",(0,o.kt)("strong",{parentName:"p"},"\u4e0a\u5c42\u76ee\u5f55"),"\uff0c \u6839\u636e\u81ea\u5df1\u7684\u9700\u8981\u5fae\u8c03 config.txt \u7684\u914d\u7f6e\uff08\u4e3b\u8981\u662f seata.mode \u53ca seata.file | seata.db | seata.redis\n\u8fd9\u51e0\u4e2a\u524d\u7f00\u7684\u914d\u7f6e\uff09"),(0,o.kt)("p",null,"\u6267\u884c\u5982\u4e0b\u547d\u4ee4"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"sh {PATH}/consul-config.sh -h localhost -p 8500\n")),(0,o.kt)("p",null,"\u5177\u4f53\u64cd\u4f5c\u53ef\u53c2\u8003",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/1.4.2/script/config-center/README.md"},"README.md")),(0,o.kt)("p",null,"\u6b64\u65f6\u91cd\u542f Seata \u670d\u52a1\uff0c\u53d1\u73b0\u4e0d\u518d\u62a5\u9519\uff0c\u5373\u6210\u529f\u4f7f\u7528 Consul \u4f5c\u4e3a\u914d\u7f6e\u4e2d\u5fc3\u4e86\uff0c\u540e\u9762\u5982\u9700\u8c03\u6574\u914d\u7f6e\uff0c\u53ef\u524d\u5f80\u63a7\u5236\u53f0\u5355\u72ec\u4fee\u6539\u5bf9\u5e94\u7684\u914d\u7f6e\uff0c\u4fee\u6539\u540e\u9700\u91cd\u542f\u670d\u52a1"),(0,o.kt)("h3",{id:"client-\u7aef-\u914d\u7f6e-consul-\u4e3a\u914d\u7f6e\u4e2d\u5fc3"},"Client \u7aef \u914d\u7f6e Consul \u4e3a\u914d\u7f6e\u4e2d\u5fc3"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u4ee5 SpringBoot \u9879\u76ee\u4e3a\u4f8b\uff0c\u5728\u9879\u76ee pom.xml \u4e2d\u52a0\u5165")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-xml"},"\n<dependency>\n    <groupId>io.seata</groupId>\n    <artifactId>seata-spring-boot-starter</artifactId>\n    <version>\u6700\u65b0\u7248\uff08Seata\u7248\u672c\uff09</version>\n</dependency>\n<dependency>\n<groupId>org.springframework.cloud</groupId>\n<artifactId>spring-cloud-starter-consul-config</artifactId>\n</dependency>\n")),(0,o.kt)("h3",{id:"client\u7aef\u914d\u7f6e"},"Client\u7aef\u914d\u7f6e"),(0,o.kt)("p",null,"\u5728 application.yml \u4e2d\u52a0\u5165\u5bf9\u5e94\u7684\u914d\u7f6e\u4e2d\u5fc3\uff0c\u5176\u4f59",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/client/spring/application.yml"},"\u914d\u7f6e\u53c2\u8003")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"seata:\n  config:\n    type: consul\n    consul:\n      server-addr: 127.0.0.1:8500\n")),(0,o.kt)("p",null,"\u91cd\u542f Client \u5373\u53ef"))}d.isMDXComponent=!0}}]);