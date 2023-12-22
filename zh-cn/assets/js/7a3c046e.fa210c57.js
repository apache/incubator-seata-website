"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[98253],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>v});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),s=p(n),f=a,v=s["".concat(l,".").concat(f)]||s[f]||u[f]||c;return n?r.createElement(v,o(o({ref:t},d),{},{components:n})):r.createElement(v,o({ref:t},d))}));function v(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,o=new Array(c);o[0]=f;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[s]="string"==typeof e?e:a,o[1]=i;for(var p=2;p<c;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},76747:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>c,metadata:()=>i,toc:()=>p});var r=n(87462),a=(n(67294),n(3905));const c={title:"Etcd3 \u914d\u7f6e\u4e2d\u5fc3",keywords:["Seata","Etcd3"],description:"Etcd3 \u914d\u7f6e\u4e2d\u5fc3\u3002"},o="Etcd3 \u914d\u7f6e\u4e2d\u5fc3",i={unversionedId:"user/configuration/etcd3",id:"version-v1.6/user/configuration/etcd3",title:"Etcd3 \u914d\u7f6e\u4e2d\u5fc3",description:"Etcd3 \u914d\u7f6e\u4e2d\u5fc3\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.6/user/configuration/etcd3.md",sourceDirName:"user/configuration",slug:"/user/configuration/etcd3",permalink:"/zh-cn/docs/v1.6/user/configuration/etcd3",draft:!1,tags:[],version:"v1.6",frontMatter:{title:"Etcd3 \u914d\u7f6e\u4e2d\u5fc3",keywords:["Seata","Etcd3"],description:"Etcd3 \u914d\u7f6e\u4e2d\u5fc3\u3002"},sidebar:"docs",previous:{title:"Apollo \u914d\u7f6e\u4e2d\u5fc3",permalink:"/zh-cn/docs/v1.6/user/configuration/apollo"},next:{title:"Consul \u914d\u7f6e\u4e2d\u5fc3",permalink:"/zh-cn/docs/v1.6/user/configuration/consul"}},l={},p=[{value:"\u9884\u5907\u5de5\u4f5c",id:"\u9884\u5907\u5de5\u4f5c",level:2},{value:"\u5feb\u901f\u4e0a\u624b",id:"\u5feb\u901f\u4e0a\u624b",level:2},{value:"\u589e\u52a0 Maven \u4f9d\u8d56",id:"\u589e\u52a0-maven-\u4f9d\u8d56",level:3},{value:"Client\u7aef\u914d\u7f6e\u4e2d\u5fc3",id:"client\u7aef\u914d\u7f6e\u4e2d\u5fc3",level:3},{value:"Server\u7aef\u914d\u7f6e\u4e2d\u5fc3",id:"server\u7aef\u914d\u7f6e\u4e2d\u5fc3",level:3},{value:"\u4e0a\u4f20\u914d\u7f6e\u81f3Etcd3\u914d\u7f6e\u4e2d\u5fc3",id:"\u4e0a\u4f20\u914d\u7f6e\u81f3etcd3\u914d\u7f6e\u4e2d\u5fc3",level:3},{value:"\u901a\u8fc7\u811a\u672c\u4e0a\u4f20\u914d\u7f6e\u5230Etcd3",id:"\u901a\u8fc7\u811a\u672c\u4e0a\u4f20\u914d\u7f6e\u5230etcd3",level:4}],d={toc:p},s="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"etcd3-\u914d\u7f6e\u4e2d\u5fc3"},"Etcd3 \u914d\u7f6e\u4e2d\u5fc3"),(0,a.kt)("p",null,"Etcd3 \u662f Seata \u7ec4\u4ef6\u4e2d\u91cd\u8981\u7684\u914d\u7f6e\u4e2d\u5fc3\u5b9e\u73b0."),(0,a.kt)("h2",{id:"\u9884\u5907\u5de5\u4f5c"},"\u9884\u5907\u5de5\u4f5c"),(0,a.kt)("p",null,"\u5f53\u60a8\u5c06",(0,a.kt)("inlineCode",{parentName:"p"},"Etcd3"),"\u6574\u5408\u5230\u60a8\u7684 Seata\u5de5\u7a0b\u4e4b\u524d\uff0c\u8bf7\u786e\u4fdd\u540e\u53f0\u5df2\u7ecf\u542f\u52a8 Etcd3 Server\u670d\u52a1\u3002\u5982\u679c\u60a8\u5c1a\u4e14\u4e0d\u719f\u6089 Etcd3\u7684\u57fa\u672c\u4f7f\u7528\u7684\u8bdd\uff0c\u53ef\u5148\u884c\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"https://etcd.io/docs/v3.5/quickstart"},"Etcd3\u5feb\u901f\u5165\u95e8"),"\u3002\u5efa\u8bae\u4f7f\u7528 Etcd3 ",(0,a.kt)("inlineCode",{parentName:"p"},"3.5.0")," \u53ca\u4ee5\u4e0a\u7684\u7248\u672c\u3002"),(0,a.kt)("h2",{id:"\u5feb\u901f\u4e0a\u624b"},"\u5feb\u901f\u4e0a\u624b"),(0,a.kt)("p",null,"Seata \u878d\u5408 Etcd3 \u6ce8\u518c\u4e2d\u5fc3\u7684\u64cd\u4f5c\u6b65\u9aa4\u975e\u5e38\u7b80\u5355\uff0c\u5927\u81f4\u6b65\u9aa4\u53ef\u5206\u4e3a\u201c\u589e\u52a0 Maven \u4f9d\u8d56\u201d\u4ee5\u53ca\u201c\u914d\u7f6e\u6ce8\u518c\u4e2d\u5fc3\u201c\u3002"),(0,a.kt)("h3",{id:"\u589e\u52a0-maven-\u4f9d\u8d56"},"\u589e\u52a0 Maven \u4f9d\u8d56"),(0,a.kt)("p",null,"\u9996\u5148\uff0c\u60a8\u9700\u8981\u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"jetcd-core")," \u7684 Maven \u4f9d\u8d56\u6dfb\u52a0\u5230\u60a8\u7684\u9879\u76ee ",(0,a.kt)("inlineCode",{parentName:"p"},"pom.xml")," \u6587\u4ef6\u4e2d\uff0c\u5efa\u8bae\u4f7f\u7528 jetcd-core ",(0,a.kt)("inlineCode",{parentName:"p"},"0.3.0+"),",",(0,a.kt)("inlineCode",{parentName:"p"},"spring-cloud-starter-alibaba-seata"),"\u7684\u7248\u672c\u4e0e\u5bf9\u5e94\u5fae\u670d\u52a1\u7248\u672c\u5bf9\u5e94\u5173\u7cfb\u8bf7\u53c2\u8003",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E"},"\u7248\u672c\u8bf4\u660e")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>io.seata</groupId>\n    <artifactId>seata-spring-boot-starter</artifactId>\n    <version>\u6700\u65b0\u7248</version>\n</dependency>\n        \x3c!-- Etcd3 \u5ba2\u6237\u7aef\u4f9d\u8d56 --\x3e\n<dependency>\n    <groupId>io.etcd</groupId>\n    <artifactId>jetcd-core</artifactId>\n    <version>0.3.0\u53ca\u4ee5\u4e0a</version>\n</dependency>\n")),(0,a.kt)("h3",{id:"client\u7aef\u914d\u7f6e\u4e2d\u5fc3"},"Client\u7aef\u914d\u7f6e\u4e2d\u5fc3"),(0,a.kt)("p",null,"\u5728 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/client/spring/application.yml"},(0,a.kt)("strong",{parentName:"a"},"application.yml"))," \u4e2d\u52a0\u5165\u5bf9\u5e94\u7684\u914d\u7f6e\u4e2d\u5fc3,\u5176\u4f59",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/client"},"\u914d\u7f6e\u53c2\u8003")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"seata:\n  config:\n    type: etcd3\n    etcd3:\n      server-addr: http://localhost:2379\n")),(0,a.kt)("h3",{id:"server\u7aef\u914d\u7f6e\u4e2d\u5fc3"},"Server\u7aef\u914d\u7f6e\u4e2d\u5fc3"),(0,a.kt)("p",null,"\u5728 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/server/config/registry.conf"},"registry.conf")," \u4e2d\u52a0\u5165\u5bf9\u5e94\u914d\u7f6e\u4e2d\u5fc3,\u5176\u4f59",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/server"},"\u914d\u7f6e\u53c2\u8003")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'config {\n  type = "etcd3"\n\n  etcd3 {\n    serverAddr = "http://localhost:2379"\n  }\n}\n\n')),(0,a.kt)("h3",{id:"\u4e0a\u4f20\u914d\u7f6e\u81f3etcd3\u914d\u7f6e\u4e2d\u5fc3"},"\u4e0a\u4f20\u914d\u7f6e\u81f3Etcd3\u914d\u7f6e\u4e2d\u5fc3"),(0,a.kt)("h4",{id:"\u901a\u8fc7\u811a\u672c\u4e0a\u4f20\u914d\u7f6e\u5230etcd3"},"\u901a\u8fc7\u811a\u672c\u4e0a\u4f20\u914d\u7f6e\u5230Etcd3"),(0,a.kt)("p",null,"\u53c2\u8003",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/config-center"},"https://github.com/seata/seata/tree/develop/script/config-center")," \u7684config.txt\u5e76\u4fee\u6539,\u4e4b\u540e\u8fd0\u884c\u4ed3\u5e93\u4e2d\u63d0\u4f9b\u7684etcd3\u811a\u672c,\u5c06\u4fe1\u606f\u63d0\u4ea4\u5230Etcd3\u670d\u52a1\u7aef,\u5982\u679c\u6709\u9700\u8981\u66f4\u6539,\u53ef\u76f4\u63a5\u901a\u8fc7\u63a7\u5236\u53f0\u66f4\u6539."),(0,a.kt)("p",null,"eg: sh ${SEATAPATH}/script/config-center/etcd3/etcd3-config.sh -h localhost -p 2379"),(0,a.kt)("p",null,"\u8be6\u7ec6\u89e3\u6790\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/config-center/README.md"},"Readme\u6587\u6863")),(0,a.kt)("p",null,"\u968f\u540e,\u542f\u52a8 Seata-Server \u548c Client\uff08\u4e1a\u52a1\u4fa7\uff09\u5e94\u7528\uff0c\u5982\u679c\u5728\u5bfc\u5165\u914d\u7f6e\u81f3Etcd3\u524d\uff0c\u5df2\u542f\u52a8Seata-Server \u548cClient\uff08\u4e1a\u52a1\u4fa7\uff09\u5e94\u7528\u9700\u8981\u8fdb\u884c\u91cd\u542f\u3002"))}u.isMDXComponent=!0}}]);