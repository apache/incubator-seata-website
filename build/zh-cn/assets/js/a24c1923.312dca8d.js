"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[60024],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),m=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=m(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=m(n),f=a,u=d["".concat(p,".").concat(f)]||d[f]||s[f]||l;return n?r.createElement(u,i(i({ref:t},c),{},{components:n})):r.createElement(u,i({ref:t},c))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=f;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[d]="string"==typeof e?e:a,i[1]=o;for(var m=2;m<l;m++)i[m]=n[m];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},49236:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>m});var r=n(87462),a=(n(67294),n(3905));const l={title:"DML\u8bed\u53e5",keywords:["Seata"],description:"Seata DML\u8bed\u53e5"},i="DML\u8bed\u53e5",o={unversionedId:"user/sqlreference/dml",id:"version-v1.6/user/sqlreference/dml",title:"DML\u8bed\u53e5",description:"Seata DML\u8bed\u53e5",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.6/user/sqlreference/dml.md",sourceDirName:"user/sqlreference",slug:"/user/sqlreference/dml",permalink:"/zh-cn/docs/v1.6/user/sqlreference/dml",draft:!1,tags:[],version:"v1.6",frontMatter:{title:"DML\u8bed\u53e5",keywords:["Seata"],description:"Seata DML\u8bed\u53e5"},sidebar:"docs",previous:{title:"SQL\u9650\u5236",permalink:"/zh-cn/docs/v1.6/user/sqlreference/sql-restrictions"},next:{title:"SQL\u4fee\u9970",permalink:"/zh-cn/docs/v1.6/user/sqlreference/sql-decoration"}},p={},m=[],c={toc:m},d="wrapper";function s(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"dml\u8bed\u53e5"},"DML\u8bed\u53e5"),(0,a.kt)("p",null,"\u672c\u6587\u4ecb\u7ecd DML \u8bed\u53e5\u7c7b\u578b\u3001SQL \u5b9e\u4f8b\u4ee5\u53ca Seata \u662f\u5426\u652f\u6301\uff0c\u5e2e\u52a9\u60a8\u5728 Seata \u66f4\u987a\u7545\u7684\u4f7f\u7528 SQL\u3002"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"\u7c7b\u578b","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"),(0,a.kt)("th",{parentName:"tr",align:"left"},"SQL \u5b9e\u4f8b"),(0,a.kt)("th",{parentName:"tr",align:"left"},"\u662f\u5426\u652f\u6301","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"," ","\xa0"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"INSERT"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"INSERT INTO tb1_name (col_name,...) VALUES ({expr \\| FAULT},...),(...),..."),"\u6216 ",(0,a.kt)("inlineCode",{parentName:"td"},"INSERT INTO tb1_name SET col_name={expr \\| DEFAULT}, ...")," \u6216",(0,a.kt)("inlineCode",{parentName:"td"},"INSERT INTO tb1_name (col_name,...) VALUES ({expr \\| FAULT},...) ON DUPLICATE KEY UPDATE field1=value1,...;")),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u662f")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"UPDATE"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"UPDATE tb1_name SET col_name1=expr1 [, col_name2=expr2 ...][WHERE where_definition]")),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u662f")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"DELETE"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"DELETE FROM tb1_name [WHERE where_definition]")),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u662f")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"SELECT"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"SELECT [ALL \\| DISTINCT \\| DISTINCTROW ]select_expr, ... FROM tb1_name[WHERE where_definition]")),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u662f")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"REPLACE"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"REPLACE [LOW_PRIORITY \\| DELAYED][INTO] tb1_name [(col_name,...)]VALUES ({expr \\| DEFAULT},...),(...),..."),"\u6216",(0,a.kt)("inlineCode",{parentName:"td"},"REPLACE [LOW_PRIORITY \\| DELAYED][INTO] tb1_nameSET col_name={expr \\| DEFAULT}, ...")),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u5426")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"TRUNCATE"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"TRUNCATE [TABLE] tb1_name")),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u5426")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},"UPDATE JOIN"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"UPDATE tb1_name tb1 JOIN tb2_name tb2 ON tb2.col_name=tb1.col_name SET tb1.col_name1=expr1 [, tb1.col_name2=expr2 ...][ [WHERE where_definition]")),(0,a.kt)("td",{parentName:"tr",align:"left"},"\u662f since 1.6.0")))))}s.isMDXComponent=!0}}]);