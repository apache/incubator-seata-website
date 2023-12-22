"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[57841],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),p=c(n),g=o,f=p["".concat(l,".").concat(g)]||p[g]||d[g]||i;return n?r.createElement(f,s(s({ref:t},u),{},{components:n})):r.createElement(f,s({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,s=new Array(i);s[0]=g;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a[p]="string"==typeof e?e:o,s[1]=a;for(var c=2;c<i;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},96787:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var r=n(87462),o=(n(67294),n(3905));const i={title:"Consul Registry Center",keywords:["Seata","Consul","Registry Center"],description:"Consul Registry Center."},s="Consul Registry",a={unversionedId:"user/registry/consul",id:"version-v1.8/user/registry/consul",title:"Consul Registry Center",description:"Consul Registry Center.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-v1.8/user/registry/consul.md",sourceDirName:"user/registry",slug:"/user/registry/consul",permalink:"/docs/v1.8/user/registry/consul",draft:!1,tags:[],version:"v1.8",frontMatter:{title:"Consul Registry Center",keywords:["Seata","Consul","Registry Center"],description:"Consul Registry Center."},sidebar:"docs",previous:{title:"Etcd3 Registry Center",permalink:"/docs/v1.8/user/registry/etcd3"},next:{title:"Zookeeper Registry Center",permalink:"/docs/v1.8/user/registry/zookeeper"}},l={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Server-side configuration of registry",id:"server-side-configuration-of-registry",level:3},{value:"Client-side adding Maven dependencies",id:"client-side-adding-maven-dependencies",level:3},{value:"Client-side configuration",id:"client-side-configuration",level:3}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"consul-registry"},"Consul Registry"),(0,o.kt)("p",null,"Consul is an important registry implementation in the Seata component."),(0,o.kt)("p",null,"This article is based on Seata 1.4.2 and registers Seata to Consul with file as the configuration center."),(0,o.kt)("p",null,"Consul version recommended is 1.8+. The following text uses Consul 1.11.2 as an example."),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("p",null,"Before you register ",(0,o.kt)("strong",{parentName:"p"},"Seata")," to Consul, make sure that the Consul service is already running. If you are not familiar with the basic usage of Consul, you can refer to the ",(0,o.kt)("a",{parentName:"p",href:"https://www.consul.io/docs"},"Consul official documentation")," first."),(0,o.kt)("p",null,"If you just want to experience it quickly, you can also use the following docker command to start a Consul container and access the Consul console at http://localhost:8500."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"docker run -d --name=consul -p 8500:8500 -p 8600:8600/udp consul:1.11.2 agent -dev -client=0.0.0.0 -ui\n")),(0,o.kt)("h2",{id:"quick-start"},"Quick Start"),(0,o.kt)("p",null,"Integrating Consul registry into Seata is very simple, with a Server-side and a Client-side."),(0,o.kt)("p",null,'The Server-side only needs to configure the "registry".'),(0,o.kt)("p",null,"The Client-side needs to add Maven dependencies and configure them."),(0,o.kt)("h3",{id:"server-side-configuration-of-registry"},"Server-side configuration of registry"),(0,o.kt)("p",null,"Download ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/releases/tag/v1.4.2"},"Seata 1.4.2 release")," and extract it."),(0,o.kt)("p",null,"Modify the corresponding configuration center in /conf/registry.conf, and refer to the rest of the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/client/conf/registry.conf"},"configuration"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'registry {\n  type = "consul"\n\n  consul {\n    # The cluster name registered to Consul, default is default\n    cluster = "default"\n    serverAddr = "127.0.0.1:8500"\n    aclToken = ""\n  }\n}\n')),(0,o.kt)("p",null,"Execute /bin/seata-server.bat (Windows) or /bin/seata-server.sh (Unix) to start Seata. The service will run on port 8091 locally."),(0,o.kt)("p",null,"Go to the Consul console to check if Seata is registered successfully."),(0,o.kt)("h3",{id:"client-side-adding-maven-dependencies"},"Client-side adding Maven dependencies"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Taking a SpringBoot project as an example, add the following to the project's pom.xml")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>io.seata</groupId>\n    <artifactId>seata-spring-boot-starter</artifactId>\n    <version>latest version (Seata version)</version>\n</dependency>\n<dependency>\n    <groupId>org.springframework.cloud</groupId>\n    <artifactId>spring-cloud-starter-consul-discovery</artifactId>\n</dependency>\n")),(0,o.kt)("h3",{id:"client-side-configuration"},"Client-side configuration"),(0,o.kt)("p",null,"Add the corresponding registry to application.yml, and refer to the rest of the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/blob/develop/script/client/spring/application.yml"},"configuration"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"seata:\n  registry:\n    consul:\n      server-addr: 127.0.0.1:8500\n  # Transaction group configuration, default name is my_test_tx_group in version 1.4.2, will be changed to default_tx_group in version 1.5\n  # For more information about transaction groups, please refer to https://seata.io/docs/user/txgroup/transaction-group\n  tx-service-group: my_test_tx_group\n  service:\n    # Mapping between transaction group and cluster\n    vgroup-mapping:\n      my_test_tx_group: default\n")),(0,o.kt)("p",null,"After completing the client configuration, start the application and wait for a moment. When the following log appears, you can officially experience the Seata service."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},"register TM success. client version:1.4.2, server version:1.4.2,channel:[id: 0xa4675e28, L:/127.0.0.1:8238 - R:/127.0.0.1:8091]\nregister RM success. client version:1.4.2, server version:1.4.2,channel:[id: 0x408192d3, L:/127.0.0.1:8237 - R:/127.0.0.1:8091]\nregister success, cost 94 ms, version:1.4.2,role:RMROLE,channel:[id: 0x408192d3, L:/127.0.0.1:8237 - R:/127.0.0.1:8091]\nregister success, cost 94 ms, version:1.4.2,role:TMROLE,channel:[id: 0xa4675e28, L:/127.0.0.1:8238 - R:/127.0.0.1:8091]\n")))}d.isMDXComponent=!0}}]);