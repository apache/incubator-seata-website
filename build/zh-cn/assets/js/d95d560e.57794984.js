"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[23470],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=p(r),f=a,d=u["".concat(l,".").concat(f)]||u[f]||m[f]||o;return r?n.createElement(d,i(i({ref:t},s),{},{components:r})):n.createElement(d,i({ref:t},s))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},8964:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var n=r(87462),a=(r(67294),r(3905));const o={title:"\u53d1\u5c55\u5386\u53f2",keywords:["Seata","\u53d1\u5c55\u5386\u53f2"],description:"Seata \u53d1\u5c55\u5386\u53f2\u3002"},i="\u9879\u76ee\u5386\u53f2",c={unversionedId:"overview/history",id:"overview/history",title:"\u53d1\u5c55\u5386\u53f2",description:"Seata \u53d1\u5c55\u5386\u53f2\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/current/overview/history.md",sourceDirName:"overview",slug:"/overview/history",permalink:"/zh-cn/docs/next/overview/history",draft:!1,tags:[],version:"current",frontMatter:{title:"\u53d1\u5c55\u5386\u53f2",keywords:["Seata","\u53d1\u5c55\u5386\u53f2"],description:"Seata \u53d1\u5c55\u5386\u53f2\u3002"},sidebar:"docs",previous:{title:"Seata \u662f\u4ec0\u4e48\uff1f",permalink:"/zh-cn/docs/next/overview/what-is-seata"},next:{title:"Seata\u672f\u8bed\u8868",permalink:"/zh-cn/docs/next/overview/terminology"}},l={},p=[],s={toc:p},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u9879\u76ee\u5386\u53f2"},"\u9879\u76ee\u5386\u53f2"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u65e9\u5728 2007 \u5e74\uff0c\u963f\u91cc\u5df4\u5df4\u548c\u8682\u8681\u96c6\u56e2\u5185\u90e8\u5f00\u53d1\u4e86\u5206\u5e03\u5f0f\u4e8b\u52a1\u4e2d\u95f4\u4ef6\uff0c\u7528\u4e8e\u89e3\u51b3\u7535\u5546\u3001\u652f\u4ed8\u3001\u7269\u6d41\u7b49\u4e1a\u52a1\u573a\u666f\u4e2d\u5e94\u7528\u6570\u636e\u7684\u4e00\u81f4\u6027\u95ee\u9898\u3002\u5185\u90e8\u9879\u76ee\u5206\u522b\u88ab\u79f0\u4e3a TXC (Taobao Transaction Constructor)/XTS(eXtended Transaction Service)\uff0c\u8be5\u9879\u76ee\u51e0\u4e4e\u5728\u6bcf\u7b14\u8ba2\u5355\u7684\u4ea4\u6613\u652f\u4ed8\u94fe\u8def\u51e0\u4e4e\u90fd\u6709\u4f7f\u7528\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u81ea 2013 \u5e74\u4ee5\u6765\uff0c\u963f\u91cc\u5df4\u5df4\u548c\u8682\u8681\u96c6\u56e2\u5df2\u5728\u963f\u91cc\u4e91\u548c\u91d1\u878d\u4e91\u4e0a\u5411\u4f01\u4e1a\u5ba2\u6237\u5206\u522b\u53d1\u5e03\u4e86\u5206\u5e03\u5f0f\u4e8b\u52a1\u4e91\u670d\u52a1\u4ea7\u54c1 GTS(global transaction service)/DTX(Distributed Transaction-eXtended)\uff0c\u5728\u5404\u4e2a\u884c\u4e1a\u9886\u57df\u79ef\u7d2f\u4e86\u5927\u91cf\u7528\u6237\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"2019 \u5e74 1 \u6708\uff0c\u963f\u91cc\u5df4\u5df4\u96c6\u56e2\u6b63\u5f0f\u5f00\u6e90\u4e86\u8be5\u9879\u76ee\uff0c\u9879\u76ee\u547d\u540d\u4e3a Fescar (Fast & Easy Commit and Rollback)\uff09\u3002\u9879\u76ee\u5f00\u6e90\u4ee5\u6765\uff0c\u5b83\u53d7\u5230\u4e86\u4f17\u591a\u5f00\u53d1\u4eba\u5458\u7684\u70ed\u70c8\u6b22\u8fce\u548c\u8d5e\u626c\uff0c\u5f00\u6e90\u4e00\u5468\u6536\u83b7\u4e86\u8d85 3k star\uff0c\u66fe\u4e00\u5ea6\u8749\u8054 GitHub Trending \u6392\u884c\u699c\u7b2c\u4e00\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"2019 \u5e74 4 \u6708\uff0c\u8682\u8681\u96c6\u56e2\u6570\u636e\u4e2d\u95f4\u4ef6\u56e2\u961f\u52a0\u5165\u4e86 Fescar \u793e\u533a\u3002\u4e3a\u4e86\u521b\u5efa\u4e00\u4e2a\u66f4\u52a0\u5f00\u653e\u548c\u4e2d\u7acb\u7684\u793e\u533a\uff0cFescar \u6539\u540d\u4e3a Seata\uff08Simple Extensible Autonomous Transaction Architecture\uff09\uff0c\u4ee3\u7801\u4ed3\u5e93\u4ece Alibaba organization \u8fc1\u79fb\u5230\u5176\u72ec\u7acb\u7684 Seata organization\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"2019 \u5e74 12 \u6708\uff0cSeata \u5f00\u6e90\u9879\u76ee\u6b63\u5f0f\u53d1\u5e03 1.0.0 GA \u7248\u672c\uff0c\u6807\u5fd7\u7740\u9879\u76ee\u5df2\u57fa\u672c\u53ef\u751f\u4ea7\u4f7f\u7528\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"2023 \u5e74 10 \u6708\uff0c\u4e3a\u4e86\u66f4\u597d\u7684\u901a\u8fc7\u793e\u533a\u9a71\u52a8\u6280\u672f\u7684\u6f14\u8fdb\uff0c\u963f\u91cc\u548c\u8682\u8681\u96c6\u56e2\u6b63\u5f0f\u5c06 Seata \u6350\u8d60\u7ed9 Apache \u57fa\u91d1\u4f1a\uff0c\u8be5\u63d0\u6848\u5df2\u901a\u8fc7\u4e86 Apache \u57fa\u91d1\u4f1a\u7684\u6295\u7968\u51b3\u8bae\uff0cSeata \u6b63\u5f0f\u8fdb\u5165 Apache \u5b75\u5316\u5668\u3002"))))}m.isMDXComponent=!0}}]);