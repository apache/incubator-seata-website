"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[56144],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},s="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=u(r),d=o,m=s["".concat(l,".").concat(d)]||s[d]||f[d]||a;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[s]="string"==typeof e?e:o,i[1]=c;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},59172:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>c,toc:()=>u});var n=r(87462),o=(r(67294),r(3905));const a={title:"\u7b80\u4ecb",keywords:["Seata","configuration center"],description:"\u914d\u7f6e\u4e2d\u5fc3\u7b80\u4ecb\u3002"},i="\u7b80\u4ecb",c={unversionedId:"user/configuration/index",id:"version-v1.1/user/configuration/index",title:"\u7b80\u4ecb",description:"\u914d\u7f6e\u4e2d\u5fc3\u7b80\u4ecb\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.1/user/configuration/index.md",sourceDirName:"user/configuration",slug:"/user/configuration/",permalink:"/zh-cn/docs/v1.1/user/configuration/",draft:!1,tags:[],version:"v1.1",frontMatter:{title:"\u7b80\u4ecb",keywords:["Seata","configuration center"],description:"\u914d\u7f6e\u4e2d\u5fc3\u7b80\u4ecb\u3002"},sidebar:"docs",previous:{title:"\u4e8b\u52a1\u5206\u7ec4\u4e0e\u9ad8\u53ef\u7528",permalink:"/zh-cn/docs/v1.1/user/txgroup/transaction-group-and-ha"},next:{title:"Nacos \u914d\u7f6e\u4e2d\u5fc3",permalink:"/zh-cn/docs/v1.1/user/configuration/nacos"}},l={},u=[],p={toc:u},s="wrapper";function f(e){let{components:t,...r}=e;return(0,o.kt)(s,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u7b80\u4ecb"},"\u7b80\u4ecb"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},'\u4ec0\u4e48\u662f\u914d\u7f6e\u4e2d\u5fc3?\u914d\u7f6e\u4e2d\u5fc3\u53ef\u4ee5\u8bf4\u662f\u4e00\u4e2a"\u5927\u8d27\u4ed3",\u5185\u90e8\u653e\u7f6e\u7740\u5404\u79cd\u914d\u7f6e\u6587\u4ef6,\u4f60\u53ef\u4ee5\u901a\u8fc7\u81ea\u5df1\u6240\u9700\u8fdb\u884c\u83b7\u53d6\u914d\u7f6e\u52a0\u8f7d\u5230\u5bf9\u5e94\u7684\u5ba2\u6237\u7aef.\u6bd4\u5982Seata Client\u7aef(TM,RM),Seata Server(TC),\u4f1a\u53bb\u8bfb\u53d6\u5168\u5c40\u4e8b\u52a1\u5f00\u5173,\u4e8b\u52a1\u4f1a\u8bdd\u5b58\u50a8\u6a21\u5f0f\u7b49\u4fe1\u606f.'),(0,o.kt)("li",{parentName:"ul"},"Seata\u7684\u914d\u7f6e\u4e2d\u5fc3\u4e0eSpring cloud\u7684\u914d\u7f6e\u4e2d\u5fc3\u533a\u522b\u662f?\u5728\u5e7f\u4e49\u4e0a\u6765\u8bf4,\u5e76\u65e0\u533a\u522b,\u53ea\u4e0d\u8fc7Spring cloud\u7684\u914d\u7f6e\u4e2d\u5fc3\u4ec5\u662f\u4f5c\u7528\u4e8e\u5b83\u4eec\u81ea\u8eab\u7684\u7ec4\u4ef6,\u800cSeata\u7684\u914d\u7f6e\u4e2d\u5fc3\u4e5f\u662f\u4e00\u6837\u662f\u4f5c\u7528\u4e8eSeata\u81ea\u8eab.(\u6ce8:Spring cloud\u7684\u914d\u7f6e\u4e2d\u5fc3\u4e0eSeata\u65e0\u5173)"),(0,o.kt)("li",{parentName:"ul"},"Seata\u652f\u6301\u54ea\u4e9b\u914d\u7f6e\u4e2d\u5fc3?",(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},"nacos"),(0,o.kt)("li",{parentName:"ol"},"consul"),(0,o.kt)("li",{parentName:"ol"},"apollo"),(0,o.kt)("li",{parentName:"ol"},"etcd"),(0,o.kt)("li",{parentName:"ol"},"zookeeper"),(0,o.kt)("li",{parentName:"ol"},"file (\u8bfb\u672c\u5730\u6587\u4ef6, \u5305\u542bconf\u3001properties\u3001yml\u914d\u7f6e\u6587\u4ef6\u7684\u652f\u6301)")))))}f.isMDXComponent=!0}}]);