"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[92341],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>g});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=o.createContext({}),c=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return o.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=c(n),f=r,g=u["".concat(p,".").concat(f)]||u[f]||d[f]||a;return n?o.createElement(g,i(i({ref:t},s),{},{components:n})):o.createElement(g,i({ref:t},s))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:r,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},14871:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var o=n(87462),r=(n(67294),n(3905));const a={title:"Apollo Configuration Center",keywords:["Seata","Apollo"],description:"Apollo Configuration Center."},i="Apollo Configuration Center",l={unversionedId:"user/configuration/apollo",id:"version-v1.8/user/configuration/apollo",title:"Apollo Configuration Center",description:"Apollo Configuration Center.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-v1.8/user/configuration/apollo.md",sourceDirName:"user/configuration",slug:"/user/configuration/apollo",permalink:"/docs/v1.8/user/configuration/apollo",draft:!1,tags:[],version:"v1.8",frontMatter:{title:"Apollo Configuration Center",keywords:["Seata","Apollo"],description:"Apollo Configuration Center."},sidebar:"docs",previous:{title:"Nacos Configuration Center",permalink:"/docs/v1.8/user/configuration/nacos"},next:{title:"Etcd3 Configuration Center",permalink:"/docs/v1.8/user/configuration/etcd3"}},p={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Adding Maven Dependencies",id:"adding-maven-dependencies",level:3},{value:"Client-side Configuration Center",id:"client-side-configuration-center",level:3},{value:"Server-side Configuration Center",id:"server-side-configuration-center",level:3},{value:"Upload Configuration to Apollo Configuration Center",id:"upload-configuration-to-apollo-configuration-center",level:3}],s={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,o.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"apollo-configuration-center"},"Apollo Configuration Center"),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("p",null,"Before integrating ",(0,r.kt)("inlineCode",{parentName:"p"},"apollo-client")," into your Seata project, make sure that the Apollo service has been started on the backend. If you are not familiar with the basic usage of Apollo, you can refer to the ",(0,r.kt)("a",{parentName:"p",href:"https://www.apolloconfig.com/"},"Apollo Quick Start")," for preliminary understanding. It is recommended to use Apollo version ",(0,r.kt)("inlineCode",{parentName:"p"},"1.6.0")," or above."),(0,r.kt)("h2",{id:"quick-start"},"Quick Start"),(0,r.kt)("p",null,'The steps to integrate Seata with the Apollo Configuration Center are very simple and can be roughly divided into "Adding Maven Dependencies" and "Configuring the Apollo Configuration Center" and "submitting the configuration to Apollo-Server".'),(0,r.kt)("h3",{id:"adding-maven-dependencies"},"Adding Maven Dependencies"),(0,r.kt)("p",null,"First, you need to add the Maven dependency of ",(0,r.kt)("inlineCode",{parentName:"p"},"apollo-client")," to your project's ",(0,r.kt)("inlineCode",{parentName:"p"},"pom.xml")," file. It is recommended to use Seata ",(0,r.kt)("inlineCode",{parentName:"p"},"1.4.0+"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"           <dependency>\n                <groupId>io.seata</groupId>\n                <artifactId>seata-spring-boot-starter</artifactId>\n                <version>latest version</version>\n            </dependency>\n            <dependency>\n                <groupId>com.ctrip.framework.apollo</groupId>\n                <artifactId>apollo-client</artifactId>\n                <version>${apollo-client.version}</version>\n            </dependency>\n")),(0,r.kt)("h3",{id:"client-side-configuration-center"},"Client-side Configuration Center"),(0,r.kt)("p",null,"Add the corresponding configuration center in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/client/spring/application.yml"},(0,r.kt)("strong",{parentName:"a"},"application.yml")),", and refer to the rest of the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/client"},"configuration"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'seata:\n  config:\n    type: apollo\n    apollo:\n      apollo-meta: http://192.168.1.204:8801\n      app-id: seata-server\n      namespace: application\n      apollo-accesskey-secret: ""\n')),(0,r.kt)("h3",{id:"server-side-configuration-center"},"Server-side Configuration Center"),(0,r.kt)("p",null,"Add the corresponding configuration center in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/server/config/registry.conf"},"registry.conf"),", and refer to the rest of the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/server"},"configuration"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'config {\n  type = "apollo"\n\n  apollo {\n    appId = "seata-server"\n    apolloMeta = "http://192.168.1.204:8801"\n    namespace = "application"\n    apolloAccesskeySecret = ""\n  }\n}\n\n')),(0,r.kt)("h3",{id:"upload-configuration-to-apollo-configuration-center"},"Upload Configuration to Apollo Configuration Center"),(0,r.kt)("p",null,"Refer to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/config-center"},"config.txt")," in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/tree/develop/script/config-center"},"https://github.com/seata/seata/tree/develop/script/config-center")," and make modifications. Then run the provided Apollo script in the repository to submit the information to the Apollo console. If there is a need for changes, they can be directly made through the console."),(0,r.kt)("p",null,"eg: sh ${SEATAPATH}/script/config-center/apollo/apollo-config.sh -h localhost -p 8070 -e DEV -a seata-server -c default -n application -d apollo -r apollo -t 3aa026fc8435d0fc4505b345b8fa4578fb646a2c"),(0,r.kt)("p",null,"For detailed analysis, refer to the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/config-center/README.md"},"Readme document")),(0,r.kt)("p",null,"Then, start the Seata-Server and Client (business side) applications. If the Seata-Server and Client (business side) applications were already started before importing the configuration to Apollo, they need to be restarted."))}d.isMDXComponent=!0}}]);