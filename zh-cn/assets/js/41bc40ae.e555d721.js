"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[63989],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>k});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=r.createContext({}),p=function(e){var t=r.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},u=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(a),m=n,k=c["".concat(o,".").concat(m)]||c[m]||d[m]||l;return a?r.createElement(k,s(s({ref:t},u),{},{components:a})):r.createElement(k,s({ref:t},u))}));function k(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,s=new Array(l);s[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[c]="string"==typeof e?e:n,s[1]=i;for(var p=2;p<l;p++)s[p]=a[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1369:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var r=a(87462),n=(a(67294),a(3905));const l={title:"Seata-Server\u7248\u672c\u5386\u53f2",keywords:["Seata","Seata-Server","\u7248\u672c\u5386\u53f2"],description:"Seata-Server\u7248\u672c\u5386\u53f2"},s="Seata-Server\u7248\u672c\u5386\u53f2",i={unversionedId:"release-history/seata-server",id:"release-history/seata-server",title:"Seata-Server\u7248\u672c\u5386\u53f2",description:"Seata-Server\u7248\u672c\u5386\u53f2",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs-unversioned/current/release-history/seata-server.md",sourceDirName:"release-history",slug:"/release-history/seata-server",permalink:"/zh-cn/unversioned/release-history/seata-server",draft:!1,tags:[],version:"current",frontMatter:{title:"Seata-Server\u7248\u672c\u5386\u53f2",keywords:["Seata","Seata-Server","\u7248\u672c\u5386\u53f2"],description:"Seata-Server\u7248\u672c\u5386\u53f2"},sidebar:"release-history",next:{title:"Seata Java-SDK\u7248\u672c\u5386\u53f2",permalink:"/zh-cn/unversioned/release-history/java-sdk"}},o={},p=[{value:"Seata 2.x",id:"seata-2x",level:2},{value:"Seata 1.x",id:"seata-1x",level:2}],u={toc:p},c="wrapper";function d(e){let{components:t,...a}=e;return(0,n.kt)(c,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"seata-server\u7248\u672c\u5386\u53f2"},"Seata-Server\u7248\u672c\u5386\u53f2"),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Seata\u56e2\u961f\u7ef4\u62a4\u7740\u6700\u8fd1\u76843\u4e2a\u7a33\u5b9a\u7248\u672c\u3002\u5982\uff1a\u6700\u540e\u4e00\u4e2a\u7248\u672c\u4e3a2.0.0\uff0cSeata\u56e2\u961f\u5c06\u4f1a\u7ef4\u62a4\u4ee5\u4e0b\u7a33\u5b9a\u7248\u672c\uff1a"),(0,n.kt)("ul",{parentName:"admonition"},(0,n.kt)("li",{parentName:"ul"},"2.0.0"),(0,n.kt)("li",{parentName:"ul"},"1.8.0"),(0,n.kt)("li",{parentName:"ul"},"1.7.1"))),(0,n.kt)("h2",{id:"seata-2x"},"Seata 2.x"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"\u7248\u672c\u53f7"),(0,n.kt)("th",{parentName:"tr",align:null},"\u4e8c\u8fdb\u5236\u4e0b\u8f7d"),(0,n.kt)("th",{parentName:"tr",align:null},"docker\u955c\u50cf"),(0,n.kt)("th",{parentName:"tr",align:null},"checksum"),(0,n.kt)("th",{parentName:"tr",align:null},"\u53d1\u5e03\u8bf4\u660e"),(0,n.kt)("th",{parentName:"tr",align:null},"\u53c2\u8003\u6587\u6863"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"2.0.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/seata/seata/releases/download/v2.0.0/seata-server-2.0.0.zip"},"2.0.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=2.0.0"},"seataio/seata-server:2.0.0")),(0,n.kt)("td",{parentName:"tr",align:null},"5c5c6a98649f37ed7894743b21bc8777"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/release-notes/"},"2.0.x \u53d1\u5e03\u8bf4\u660e")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/user/quickstart/"},"2.0.x \u5feb\u901f\u5f00\u59cb"))))),(0,n.kt)("h2",{id:"seata-1x"},"Seata 1.x"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"\u7248\u672c\u53f7"),(0,n.kt)("th",{parentName:"tr",align:null},"\u4e8c\u8fdb\u5236\u4e0b\u8f7d"),(0,n.kt)("th",{parentName:"tr",align:null},"docker\u955c\u50cf"),(0,n.kt)("th",{parentName:"tr",align:null},"checksum"),(0,n.kt)("th",{parentName:"tr",align:null},"\u53d1\u5e03\u8bf4\u660e"),(0,n.kt)("th",{parentName:"tr",align:null},"\u53c2\u8003\u6587\u6863"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.8.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/seata/seata/releases/download/v1.8.0/seata-server-1.8.0.zip"},"1.8.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.8.0"},"seataio/seata-server:1.8.0")),(0,n.kt)("td",{parentName:"tr",align:null},"f5de162a4577f5f96828cba75d912240"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.8/release-notes/"},"1.8.x \u53d1\u5e03\u8bf4\u660e")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.8/user/quickstart/"},"1.8.x \u5feb\u901f\u5f00\u59cb"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.7.1"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/seata/seata/releases/download/v1.7.1/seata-server-1.7.1.zip"},"1.7.1.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.7.1"},"seataio/seata-server:1.7.1")),(0,n.kt)("td",{parentName:"tr",align:null},"5e7f41965f8f26a46b727d204eef3054"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.7/release-notes/"},"1.7.x \u53d1\u5e03\u8bf4\u660e")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.7/user/quickstart/"},"1.7.x \u5feb\u901f\u5f00\u59cb"))))))}d.isMDXComponent=!0}}]);