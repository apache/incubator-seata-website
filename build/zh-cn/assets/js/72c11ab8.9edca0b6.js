"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[2451],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>m});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(r),f=o,m=u["".concat(s,".").concat(f)]||u[f]||d[f]||a;return r?n.createElement(m,i(i({ref:t},l),{},{components:r})):n.createElement(m,i({ref:t},l))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[u]="string"==typeof e?e:o,i[1]=c;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},47498:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var n=r(87462),o=(r(67294),r(3905));const a={title:"\u7248\u672c\u5347\u7ea7\u6307\u5357",keywords:["Seata"],description:"Seata upgrade."},i="\u7248\u672c\u5347\u7ea7\u6307\u5357",c={unversionedId:"ops/upgrade",id:"version-v2.0/ops/upgrade",title:"\u7248\u672c\u5347\u7ea7\u6307\u5357",description:"Seata upgrade.",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v2.0/ops/upgrade.md",sourceDirName:"ops",slug:"/ops/upgrade",permalink:"/zh-cn/docs/ops/upgrade",draft:!1,tags:[],version:"v2.0",frontMatter:{title:"\u7248\u672c\u5347\u7ea7\u6307\u5357",keywords:["Seata"],description:"Seata upgrade."},sidebar:"docs",previous:{title:"Metrics \u8bbe\u8ba1",permalink:"/zh-cn/docs/dev/seata-mertics"},next:{title:"\u591a\u914d\u7f6e\u9694\u79bb",permalink:"/zh-cn/docs/ops/multi-configuration-isolation"}},s={},p=[],l={toc:p},u="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u7248\u672c\u5347\u7ea7\u6307\u5357"},"\u7248\u672c\u5347\u7ea7\u6307\u5357"),(0,o.kt)("hr",null),(0,o.kt)("h3",null,"1. \u5347\u7ea7\u5230 seata 2.0.x \u6709\u54ea\u4e9b\u517c\u5bb9\u6027\u4e8b\u9879\u662f\u9700\u8981\u6ce8\u610f\u7684\uff1f"),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("mark",null,"\u6ce8\u610f\u4e8b\u9879")),"\u4ece1.8.x \u7248\u672c\u5347\u7ea72.0.x \u7248\u672c\uff0c\u5982\u679cundolog\u6216\u901a\u4fe1\u7f16\u89e3\u7801\u4e3afst\u90fd\u9700\u8981\u5148\u63d0\u524d\u5728client\u4fee\u6539\u4e3afst\u4ee5\u5916\u7684\u5e8f\u5217\u5316\u65b9\u5f0f,server\u4fa7\u624d\u53ef\u8fdb\u884c\u5347\u7ea7\u3002 \u6ce8: 2.0.0\u7684server \u5b58\u5728at\u6a21\u5f0f\u4e0b\u8d44\u6e90\u91cd\u5165,\u6bd4\u5982\u4e00\u4e2a\u5168\u5c40\u4e8b\u52a1\u4e2d,\u975e\u540c\u4e00\u4e2a\u672c\u5730\u4e8b\u52a1\u8fdb\u884c\u4e86\u591a\u6b21\u76f8\u540c\u7684\u6570\u636e\u4fee\u6539,\u6ce8\u518c\u4e86\u591a\u4e2a\u5206\u652f\u540e\u4f1a\u5bfc\u81f4\u4e8c\u9636\u6bb5\u4e0b\u53d1\u987a\u5e8f\u5f02\u5e38,\u6545\u5982\u679c\u6709\u6b64\u7c7b\u573a\u666f\u8bf7\u52ff\u5347\u7ea7\u52302.0.0\u7248\u672c,\u5efa\u8bae\u5347\u7ea7\u5230\u6700\u65b0snapshot\u6216\u66f4\u9ad8\u7248\u672c\u3002"))}d.isMDXComponent=!0}}]);