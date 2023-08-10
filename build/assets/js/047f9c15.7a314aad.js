"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[6231],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>k});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),s=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=s(e.components);return n.createElement(i.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),m=s(r),u=a,k=m["".concat(i,".").concat(u)]||m[u]||c[u]||l;return r?n.createElement(k,o(o({ref:t},d),{},{components:r})):n.createElement(k,o({ref:t},d))}));function k(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=u;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[m]="string"==typeof e?e:a,o[1]=p;for(var s=2;s<l;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},75628:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>p,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const l={title:"Deploy Server",keywords:["Seata"],description:"The server can deploy by multiple metho - Directly, Docker, Docker-Compose, Kubernetes, Helm."},o="Deploy Server",p={unversionedId:"ops/deploy-server",id:"ops/deploy-server",title:"Deploy Server",description:"The server can deploy by multiple metho - Directly, Docker, Docker-Compose, Kubernetes, Helm.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/ops/deploy-server.md",sourceDirName:"ops",slug:"/ops/deploy-server",permalink:"/docs/ops/deploy-server",draft:!1,tags:[],version:"current",frontMatter:{title:"Deploy Server",keywords:["Seata"],description:"The server can deploy by multiple metho - Directly, Docker, Docker-Compose, Kubernetes, Helm."},sidebar:"docs",previous:{title:"\u7248\u672c\u5347\u7ea7\u6307\u5357",permalink:"/docs/ops/upgrade"},next:{title:"Deploy Seata Server By Docker",permalink:"/docs/ops/deploy-by-docker"}},i={},s=[{value:"Directly",id:"directly",level:2},{value:"Arguments",id:"arguments",level:3},{value:"Deploy in container",id:"deploy-in-container",level:2}],d={toc:s},m="wrapper";function c(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"deploy-server"},"Deploy Server"),(0,a.kt)("p",null,"The server can deploy by multiple method: Directly, Docker, Docker-Compose, Kubernetes, Helm."),(0,a.kt)("h2",{id:"directly"},"Directly"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Download the server application from ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/releases"},"RELEASE")," and unzip. ")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Startup"))),(0,a.kt)("p",null,"On Linux/Mac"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ sh ./bin/seata-server.sh\n")),(0,a.kt)("p",null,"On Windows"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cmd"},"bin\\seata-server.bat\n")),(0,a.kt)("h3",{id:"arguments"},"Arguments"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Argument"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Fullname"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Effect"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Comment"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-h"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--host"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Specify IP in registry center"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Suggest to specify Virtural machine or cloud server, or will use internal IP")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-p"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--port"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Specify startup port"),(0,a.kt)("td",{parentName:"tr",align:"left"},"default is 8091")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-m"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--storeMode"),(0,a.kt)("td",{parentName:"tr",align:"left"},"The way to save transaction log"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Support ",(0,a.kt)("inlineCode",{parentName:"td"},"file")," and ",(0,a.kt)("inlineCode",{parentName:"td"},"db"),"default is  ",(0,a.kt)("inlineCode",{parentName:"td"},"file"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-n"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--serverNode"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Specify the seata-server node ID"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Like ",(0,a.kt)("inlineCode",{parentName:"td"},"1"),",",(0,a.kt)("inlineCode",{parentName:"td"},"2"),",",(0,a.kt)("inlineCode",{parentName:"td"},"3"),"..., default is ",(0,a.kt)("inlineCode",{parentName:"td"},"1"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-e"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--seataEnv"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Specify the environment of  seata-server"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Like ",(0,a.kt)("inlineCode",{parentName:"td"},"dev"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"test")," etc. Then will use file like ",(0,a.kt)("inlineCode",{parentName:"td"},"registry-dev.conf")," as configuraiton")))),(0,a.kt)("p",null,"For example\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ sh ./bin/seata-server.sh -p 8091 -h 127.0.0.1 -m file\n")),(0,a.kt)("h2",{id:"deploy-in-container"},"Deploy in container"),(0,a.kt)("p",null,"Now support these method\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"./deploy-by-docker"},"Deploy Seata Server By Docker"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"./deploy-by-kubernetes"},"Deploy Seata Server By Kubernetes"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"./deploy-by-helm"},"Deploy Seata Server By Helm")))))}c.isMDXComponent=!0}}]);