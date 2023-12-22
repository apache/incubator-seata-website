"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[81713],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>u});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),s=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=s(e.components);return n.createElement(i.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),m=s(r),k=a,u=m["".concat(i,".").concat(k)]||m[k]||c[k]||l;return r?n.createElement(u,o(o({ref:t},d),{},{components:r})):n.createElement(u,o({ref:t},d))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=k;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[m]="string"==typeof e?e:a,o[1]=p;for(var s=2;s<l;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}k.displayName="MDXCreateElement"},83138:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>p,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const l={title:"\u76f4\u63a5\u90e8\u7f72",keywords:["Seata"],description:"Server\u652f\u6301\u591a\u79cd\u65b9\u5f0f\u90e8\u7f72\uff1a\u76f4\u63a5\u90e8\u7f72\uff0c\u4f7f\u7528 Docker, \u4f7f\u7528 Docker-Compose, \u4f7f\u7528 Kubernetes,  \u4f7f\u7528 Helm\u3002"},o="\u90e8\u7f72 Server",p={unversionedId:"ops/deploy-server",id:"version-v1.7/ops/deploy-server",title:"\u76f4\u63a5\u90e8\u7f72",description:"Server\u652f\u6301\u591a\u79cd\u65b9\u5f0f\u90e8\u7f72\uff1a\u76f4\u63a5\u90e8\u7f72\uff0c\u4f7f\u7528 Docker, \u4f7f\u7528 Docker-Compose, \u4f7f\u7528 Kubernetes,  \u4f7f\u7528 Helm\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.7/ops/deploy-server.md",sourceDirName:"ops",slug:"/ops/deploy-server",permalink:"/zh-cn/docs/v1.7/ops/deploy-server",draft:!1,tags:[],version:"v1.7",frontMatter:{title:"\u76f4\u63a5\u90e8\u7f72",keywords:["Seata"],description:"Server\u652f\u6301\u591a\u79cd\u65b9\u5f0f\u90e8\u7f72\uff1a\u76f4\u63a5\u90e8\u7f72\uff0c\u4f7f\u7528 Docker, \u4f7f\u7528 Docker-Compose, \u4f7f\u7528 Kubernetes,  \u4f7f\u7528 Helm\u3002"},sidebar:"docs",previous:{title:"\u65b0\u4eba\u6587\u6863",permalink:"/zh-cn/docs/v1.7/ops/deploy-guide-beginner"},next:{title:"Docker\u90e8\u7f72",permalink:"/zh-cn/docs/v1.7/ops/deploy-by-docker"}},i={},s=[{value:"\u76f4\u63a5\u90e8\u7f72",id:"\u76f4\u63a5\u90e8\u7f72",level:2},{value:"\u652f\u6301\u7684\u542f\u52a8\u53c2\u6570",id:"\u652f\u6301\u7684\u542f\u52a8\u53c2\u6570",level:3},{value:"\u5bb9\u5668\u90e8\u7f72",id:"\u5bb9\u5668\u90e8\u7f72",level:2}],d={toc:s},m="wrapper";function c(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u90e8\u7f72-server"},"\u90e8\u7f72 Server"),(0,a.kt)("p",null,"Server\u652f\u6301\u591a\u79cd\u65b9\u5f0f\u90e8\u7f72\uff1a\u76f4\u63a5\u90e8\u7f72\uff0c\u4f7f\u7528 Docker, \u4f7f\u7528 Docker-Compose, \u4f7f\u7528 Kubernetes,  \u4f7f\u7528 Helm."),(0,a.kt)("h2",{id:"\u76f4\u63a5\u90e8\u7f72"},"\u76f4\u63a5\u90e8\u7f72"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u5728",(0,a.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/releases"},"RELEASE"),"\u9875\u9762\u4e0b\u8f7d\u76f8\u5e94\u7248\u672c\u5e76\u89e3\u538b ")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u76f4\u63a5\u542f\u52a8"))),(0,a.kt)("p",null,"\u5728 Linux/Mac \u4e0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ sh ./bin/seata-server.sh\n")),(0,a.kt)("p",null,"\u5728 Windows \u4e0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cmd"},"bin\\seata-server.bat\n")),(0,a.kt)("h3",{id:"\u652f\u6301\u7684\u542f\u52a8\u53c2\u6570"},"\u652f\u6301\u7684\u542f\u52a8\u53c2\u6570"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"\u53c2\u6570"),(0,a.kt)("th",{parentName:"tr",align:"left"},"\u5168\u5199"),(0,a.kt)("th",{parentName:"tr",align:"left"},"\u4f5c\u7528"),(0,a.kt)("th",{parentName:"tr",align:"left"},"\u5907\u6ce8"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-h"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--host"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u6307\u5b9a\u5728\u6ce8\u518c\u4e2d\u5fc3\u6ce8\u518c\u7684 IP"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u4e0d\u6307\u5b9a\u65f6\u83b7\u53d6\u5f53\u524d\u7684 IP\uff0c\u5916\u90e8\u8bbf\u95ee\u90e8\u7f72\u5728\u4e91\u73af\u5883\u548c\u5bb9\u5668\u4e2d\u7684 server \u5efa\u8bae\u6307\u5b9a")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-p"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--port"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u6307\u5b9a server \u542f\u52a8\u7684\u7aef\u53e3"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u9ed8\u8ba4\u4e3a 8091")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-m"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--storeMode"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u4e8b\u52a1\u65e5\u5fd7\u5b58\u50a8\u65b9\u5f0f"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u652f\u6301",(0,a.kt)("inlineCode",{parentName:"td"},"file"),",",(0,a.kt)("inlineCode",{parentName:"td"},"db"),",",(0,a.kt)("inlineCode",{parentName:"td"},"redis"),"\uff0c\u9ed8\u8ba4\u4e3a ",(0,a.kt)("inlineCode",{parentName:"td"},"file")," \u6ce8:redis\u9700seata-server 1.3\u7248\u672c\u53ca\u4ee5\u4e0a")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-n"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--serverNode"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u7528\u4e8e\u6307\u5b9aseata-server\u8282\u70b9ID"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u5982 ",(0,a.kt)("inlineCode",{parentName:"td"},"1"),",",(0,a.kt)("inlineCode",{parentName:"td"},"2"),",",(0,a.kt)("inlineCode",{parentName:"td"},"3"),"..., \u9ed8\u8ba4\u4e3a ",(0,a.kt)("inlineCode",{parentName:"td"},"1"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"-e"),(0,a.kt)("td",{parentName:"tr",align:"left"},"--seataEnv"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u6307\u5b9a seata-server \u8fd0\u884c\u73af\u5883"),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u5982 ",(0,a.kt)("inlineCode",{parentName:"td"},"dev"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"test")," \u7b49, \u670d\u52a1\u542f\u52a8\u65f6\u4f1a\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"td"},"registry-dev.conf")," \u8fd9\u6837\u7684\u914d\u7f6e")))),(0,a.kt)("p",null,"\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ sh ./bin/seata-server.sh -p 8091 -h 127.0.0.1 -m file\n")),(0,a.kt)("h2",{id:"\u5bb9\u5668\u90e8\u7f72"},"\u5bb9\u5668\u90e8\u7f72"),(0,a.kt)("p",null,"\u5bb9\u5668\u90e8\u7f72\u5f53\u524d\u652f\u6301\u4e09\u79cd\u65b9\u5f0f\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"./deploy-by-docker"},"\u4f7f\u7528 Docker / Docker Compose \u90e8\u7f72 "))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"./deploy-by-kubernetes"},"\u4f7f\u7528 Kubernetes \u90e8\u7f72 "))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"./deploy-by-helm"},"\u4f7f\u7528 Helm \u90e8\u7f72")))))}c.isMDXComponent=!0}}]);