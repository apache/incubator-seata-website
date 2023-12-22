"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[3169],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(r),m=o,f=p["".concat(s,".").concat(m)]||p[m]||d[m]||a;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},43707:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var n=r(87462),o=(r(67294),r(3905));const a={title:"Version Upgrade Guide",keywords:["Seata"],description:"Seata upgrade."},i="Version Upgrade Guide",l={unversionedId:"ops/upgrade",id:"version-v1.3/ops/upgrade",title:"Version Upgrade Guide",description:"Seata upgrade.",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-v1.3/ops/upgrade.md",sourceDirName:"ops",slug:"/ops/upgrade",permalink:"/docs/v1.3/ops/upgrade",draft:!1,tags:[],version:"v1.3",frontMatter:{title:"Version Upgrade Guide",keywords:["Seata"],description:"Seata upgrade."},sidebar:"docs",previous:{title:"Metrics Design",permalink:"/docs/v1.3/dev/seata-mertics"},next:{title:"Multi-configuration Isolation",permalink:"/docs/v1.3/ops/multi-configuration-isolation"}},s={},u=[],c={toc:u},p="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"version-upgrade-guide"},"Version Upgrade Guide"),(0,o.kt)("hr",null),(0,o.kt)("h3",null,"1. What compatibility matters need to be paid attention to when upgrading to seata 1.3.0? "),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("mark",null,"Notes")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"The nacos registration center adds a new group attribute configuration ",(0,o.kt)("inlineCode",{parentName:"li"},"seata.registry.nacos.group"),". If it is not configured, the default value is ",(0,o.kt)("inlineCode",{parentName:"li"},"DEFAULT_GROUP"),". The server and client must be consistent."),(0,o.kt)("li",{parentName:"ol"},"The mysql ",(0,o.kt)("inlineCode",{parentName:"li"},"undolog")," table removes the ",(0,o.kt)("inlineCode",{parentName:"li"},"id")," field and enhances the timestamp accuracy together with ",(0,o.kt)("inlineCode",{parentName:"li"},"branch_table")," to prevent dirty data from being rolled back due to sequence errors during undolog rollback. (Note: mysql version 5.6 or above is required)"))))}d.isMDXComponent=!0}}]);