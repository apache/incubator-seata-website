"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[15754],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),p=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),l=p(n),f=r,g=l["".concat(c,".").concat(f)]||l[f]||d[f]||o;return n?a.createElement(g,i(i({ref:t},u),{},{components:n})):a.createElement(g,i({ref:t},u))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[l]="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},85514:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const o={title:"Nacos Configuration Center",keywords:["Seata","Nacos"],description:"Nacos Configuration Center."},i="Nacos Configuration Center",s={unversionedId:"user/configuration/nacos",id:"version-v1.7/user/configuration/nacos",title:"Nacos Configuration Center",description:"Nacos Configuration Center.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-v1.7/user/configuration/nacos.md",sourceDirName:"user/configuration",slug:"/user/configuration/nacos",permalink:"/docs/v1.7/user/configuration/nacos",draft:!1,tags:[],version:"v1.7",frontMatter:{title:"Nacos Configuration Center",keywords:["Seata","Nacos"],description:"Nacos Configuration Center."},sidebar:"docs",previous:{title:"Introduction",permalink:"/docs/v1.7/user/configuration/"},next:{title:"Apollo Configuration Center",permalink:"/docs/v1.7/user/configuration/apollo"}},c={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Add Maven Dependencies",id:"add-maven-dependencies",level:3},{value:"Client-side Configuration Center",id:"client-side-configuration-center",level:3},{value:"Server-side Configuration Center",id:"server-side-configuration-center",level:3},{value:"Upload Configuration to Nacos Configuration Center",id:"upload-configuration-to-nacos-configuration-center",level:3},{value:"Configuration through dataId",id:"configuration-through-dataid",level:4},{value:"Upload Configuration to Nacos Using Script",id:"upload-configuration-to-nacos-using-script",level:4}],u={toc:p},l="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(l,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"nacos-configuration-center"},"Nacos Configuration Center"),(0,r.kt)("p",null,"Nacos is an important configuration center implementation in the Seata component."),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("p",null,"Before integrating ",(0,r.kt)("inlineCode",{parentName:"p"},"nacos-client")," into your Seata project, make sure that the Nacos service is already started in the background. If you are not familiar with the basic usage of Nacos, you can refer to the ",(0,r.kt)("a",{parentName:"p",href:"https://nacos.io/en-us/docs/quick-start.html"},"Nacos Quick Start")," first. It is recommended to use Nacos version ",(0,r.kt)("inlineCode",{parentName:"p"},"1.2.0")," or above."),(0,r.kt)("h2",{id:"quick-start"},"Quick Start"),(0,r.kt)("p",null,'The steps to integrate Seata with Nacos configuration center are very simple, and can be roughly divided into "adding Maven dependencies" and "configuring Nacos configuration center" and submitting the configuration to Nacos-Server.'),(0,r.kt)("h3",{id:"add-maven-dependencies"},"Add Maven Dependencies"),(0,r.kt)("p",null,"First, you need to add the Maven dependency of ",(0,r.kt)("inlineCode",{parentName:"p"},"nacos-client")," to your project's ",(0,r.kt)("inlineCode",{parentName:"p"},"pom.xml")," file, it is recommended to use Seata ",(0,r.kt)("inlineCode",{parentName:"p"},"1.4.0+"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>io.seata</groupId>\n    <artifactId>seata-spring-boot-starter</artifactId>\n    <version>latest version</version>\n</dependency>\n<dependency>\n    <groupId>com.alibaba.nacos</groupId>\n    <artifactId>nacos-client</artifactId>\n    <version>1.2.0 or above</version>\n</dependency>\n")),(0,r.kt)("h3",{id:"client-side-configuration-center"},"Client-side Configuration Center"),(0,r.kt)("p",null,"Add the corresponding configuration center in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/client/spring/application.yml"},(0,r.kt)("strong",{parentName:"a"},"application.yml")),", other ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/client"},"configuration references")," are available."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'seata:\n  config:\n    type: nacos\n    nacos:\n      server-addr: 127.0.0.1:8848\n      group : "SEATA_GROUP"\n      namespace: ""\n      username: "nacos"\n      password: "nacos"\n')),(0,r.kt)("h3",{id:"server-side-configuration-center"},"Server-side Configuration Center"),(0,r.kt)("p",null,"Add the corresponding configuration center in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/server/config/registry.conf"},"registry.conf"),", other ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/server"},"configuration references")," are available."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'config {\n  type = "nacos"\n\n  nacos {\n    serverAddr = "127.0.0.1:8848"\n    group = "SEATA_GROUP"\n    namespace = ""\n    username = "nacos"\n    password = "nacos"\n  }\n}\n\n')),(0,r.kt)("h3",{id:"upload-configuration-to-nacos-configuration-center"},"Upload Configuration to Nacos Configuration Center"),(0,r.kt)("h4",{id:"configuration-through-dataid"},"Configuration through dataId"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Starting from version 1.4.2, it is supported to obtain all configuration information from a Nacos dataId. You just need to add an additional dataId configuration item.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"First, you need to create a new configuration in Nacos. The dataId here is seataServer.properties, and the configuration content refers to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/config-center/config.txt"},"https://github.com/seata/seata/tree/develop/script/config-center/config.txt")," and modify it as needed.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"In the client, modify the configuration as follows:"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'seata:\n  config:\n    type: nacos\n    nacos:\n      server-addr: 127.0.0.1:8848\n      group : "SEATA_GROUP"\n      namespace: ""\n      dataId: "seataServer.properties"\n      username: "nacos"\n      password: "nacos"\n')),(0,r.kt)("h4",{id:"upload-configuration-to-nacos-using-script"},"Upload Configuration to Nacos Using Script"),(0,r.kt)("p",null,"Refer to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/config-center/config.txt"},"https://github.com/seata/seata/tree/develop/script/config-center/config.txt")," and make modifications. Then run the provided Nacos script in the repository to submit the information to the Nacos console. If any changes are needed, they can be directly made through the console."),(0,r.kt)("p",null,"Example: sh ${SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca -u username -w password"),(0,r.kt)("p",null,"For detailed instructions, refer to the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/config-center/README.md"},"Readme document")),(0,r.kt)("p",null,"Afterwards, start the Seata-Server and Client (business side) applications. If the Seata-Server and Client (business side) applications were already started before importing the configuration to Nacos, they need to be restarted."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This post is translated using ChatGPT, please ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/linyuxuanlin/Wiki_MkDocs/issues/new"},(0,r.kt)("strong",{parentName:"a"},"feedback"))," if any omissions.")))}d.isMDXComponent=!0}}]);