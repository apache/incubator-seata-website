"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[13830],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},v=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,c=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=l(r),v=a,m=d["".concat(p,".").concat(v)]||d[v]||u[v]||c;return r?n.createElement(m,i(i({ref:t},s),{},{components:r})):n.createElement(m,i({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=r.length,i=new Array(c);i[0]=v;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[d]="string"==typeof e?e:a,i[1]=o;for(var l=2;l<c;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}v.displayName="MDXCreateElement"},15316:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>c,metadata:()=>o,toc:()=>l});var n=r(87462),a=(r(67294),r(3905));const c={title:"Etcd3 \u6ce8\u518c\u4e2d\u5fc3",keywords:["Seata","Etcd3"],description:"Etcd3 \u6ce8\u518c\u4e2d\u5fc3\u3002"},i="Etcd3 \u6ce8\u518c\u4e2d\u5fc3",o={unversionedId:"user/registry/etcd3",id:"version-v1.4/user/registry/etcd3",title:"Etcd3 \u6ce8\u518c\u4e2d\u5fc3",description:"Etcd3 \u6ce8\u518c\u4e2d\u5fc3\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.4/user/registry/etcd3.md",sourceDirName:"user/registry",slug:"/user/registry/etcd3",permalink:"/zh-cn/docs/v1.4/user/registry/etcd3",draft:!1,tags:[],version:"v1.4",frontMatter:{title:"Etcd3 \u6ce8\u518c\u4e2d\u5fc3",keywords:["Seata","Etcd3"],description:"Etcd3 \u6ce8\u518c\u4e2d\u5fc3\u3002"},sidebar:"docs",previous:{title:"Eureka \u6ce8\u518c\u4e2d\u5fc3",permalink:"/zh-cn/docs/v1.4/user/registry/eureka"},next:{title:"Consul \u6ce8\u518c\u4e2d\u5fc3",permalink:"/zh-cn/docs/v1.4/user/registry/consul"}},p={},l=[{value:"\u9884\u5907\u5de5\u4f5c",id:"\u9884\u5907\u5de5\u4f5c",level:2},{value:"\u5feb\u901f\u4e0a\u624b",id:"\u5feb\u901f\u4e0a\u624b",level:2},{value:"\u589e\u52a0 Maven \u4f9d\u8d56",id:"\u589e\u52a0-maven-\u4f9d\u8d56",level:3},{value:"Client\u7aef\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3",id:"client\u7aef\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3",level:3},{value:"Server\u7aef\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3",id:"server\u7aef\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3",level:3}],s={toc:l},d="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"etcd3-\u6ce8\u518c\u4e2d\u5fc3"},"Etcd3 \u6ce8\u518c\u4e2d\u5fc3"),(0,a.kt)("p",null,"Etcd3\u662f Seata \u7ec4\u4ef6\u4e2d\u91cd\u8981\u7684\u6ce8\u518c\u4e2d\u5fc3\u5b9e\u73b0."),(0,a.kt)("h2",{id:"\u9884\u5907\u5de5\u4f5c"},"\u9884\u5907\u5de5\u4f5c"),(0,a.kt)("p",null,"\u5f53\u60a8\u5c06",(0,a.kt)("inlineCode",{parentName:"p"},"Etcd3"),"\u6574\u5408\u5230\u60a8\u7684 Seata\u5de5\u7a0b\u4e4b\u524d\uff0c\u8bf7\u786e\u4fdd\u540e\u53f0\u5df2\u7ecf\u542f\u52a8 Etcd3 Server\u670d\u52a1\u3002\u5982\u679c\u60a8\u5c1a\u4e14\u4e0d\u719f\u6089 Etcd3\u7684\u57fa\u672c\u4f7f\u7528\u7684\u8bdd\uff0c\u53ef\u5148\u884c\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"https://etcd.io/docs/v3.5/quickstart"},"Etcd3\u5feb\u901f\u5165\u95e8"),"\u3002\u5efa\u8bae\u4f7f\u7528 Etcd3 ",(0,a.kt)("inlineCode",{parentName:"p"},"3.5.0")," \u53ca\u4ee5\u4e0a\u7684\u7248\u672c\u3002"),(0,a.kt)("h2",{id:"\u5feb\u901f\u4e0a\u624b"},"\u5feb\u901f\u4e0a\u624b"),(0,a.kt)("p",null,"Seata \u878d\u5408 Etcd3 \u6ce8\u518c\u4e2d\u5fc3\u7684\u64cd\u4f5c\u6b65\u9aa4\u975e\u5e38\u7b80\u5355\uff0c\u5927\u81f4\u6b65\u9aa4\u53ef\u5206\u4e3a\u201c\u589e\u52a0 Maven \u4f9d\u8d56\u201d\u4ee5\u53ca\u201c\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3\u201c\u3002"),(0,a.kt)("h3",{id:"\u589e\u52a0-maven-\u4f9d\u8d56"},"\u589e\u52a0 Maven \u4f9d\u8d56"),(0,a.kt)("p",null,"\u9996\u5148\uff0c\u60a8\u9700\u8981\u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"jetcd-core")," \u7684 Maven \u4f9d\u8d56\u6dfb\u52a0\u5230\u60a8\u7684\u9879\u76ee ",(0,a.kt)("inlineCode",{parentName:"p"},"pom.xml")," \u6587\u4ef6\u4e2d\uff0c\u5efa\u8bae\u4f7f\u7528 jetcd-core ",(0,a.kt)("inlineCode",{parentName:"p"},"0.3.0+"),",",(0,a.kt)("inlineCode",{parentName:"p"},"spring-cloud-starter-alibaba-seata"),"\u7684\u7248\u672c\u4e0e\u5bf9\u5e94\u5fae\u670d\u52a1\u7248\u672c\u5bf9\u5e94\u5173\u7cfb\u8bf7\u53c2\u8003",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E"},"\u7248\u672c\u8bf4\u660e")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>io.seata</groupId>\n    <artifactId>seata-spring-boot-starter</artifactId>\n    <version>\u6700\u65b0\u7248</version>\n</dependency>\n        \x3c!-- Etcd3 \u5ba2\u6237\u7aef\u4f9d\u8d56 --\x3e\n<dependency>\n    <groupId>io.etcd</groupId>\n    <artifactId>jetcd-core</artifactId>\n    <version>0.3.0\u53ca\u4ee5\u4e0a</version>\n</dependency>\n\n")),(0,a.kt)("h3",{id:"client\u7aef\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3"},"Client\u7aef\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3"),(0,a.kt)("p",null,"\u5728 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/client/spring/application.yml"},(0,a.kt)("strong",{parentName:"a"},"application.yml"))," \u4e2d\u52a0\u5165\u5bf9\u5e94\u7684\u914d\u7f6e\u4e2d\u5fc3,\u5176\u4f59",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/client"},"\u914d\u7f6e\u53c2\u8003")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"seata:\n  tx-service-group: default_tx_group\n  service:\n    vgroup-mapping:\n      my_test_tx_group: seata-server # \u6b64\u5904\u914d\u7f6e\u5bf9\u5e94Server\u7aef\u914d\u7f6eregistry.eureka.application\u7684\u503c\n  registry:\n    type: etcd3\n    etcd3:\n      server-addr: http://localhost:2379\n")),(0,a.kt)("h3",{id:"server\u7aef\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3"},"Server\u7aef\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3"),(0,a.kt)("p",null,"\u5728 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/server/config/registry.conf"},"registry.conf")," \u4e2d\u52a0\u5165\u5bf9\u5e94\u914d\u7f6e\u4e2d\u5fc3,\u5176\u4f59",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/server"},"\u914d\u7f6e\u53c2\u8003")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'registry {\n  type = "etcd3"\n \n  etcd3 {\n    serverAddr = "http://localhost:2379"\n  }\n}\n')),(0,a.kt)("p",null,"\u914d\u7f6e\u5b8c\u6210\u540e\u542f\u52a8\u5e94\u7528\u5c31\u53ef\u4ee5\u6b63\u5f0f\u4f53\u9a8c Seata \u670d\u52a1\u3002"))}u.isMDXComponent=!0}}]);