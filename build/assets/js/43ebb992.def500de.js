"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[6407],{3905:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>d});var n=t(67294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),p=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},u=function(e){var r=p(e.components);return n.createElement(c.Provider,{value:r},e.children)},l="mdxType",m={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),l=p(t),f=o,d=l["".concat(c,".").concat(f)]||l[f]||m[f]||a;return t?n.createElement(d,s(s({ref:r},u),{},{components:t})):n.createElement(d,s({ref:r},u))}));function d(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=f;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i[l]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=t[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},46830:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var n=t(87462),o=(t(67294),t(3905));const a={title:"ORM Framework Support",keywords:["Seata","ORM Framework"],description:"Seata ORM framework support"},s="ORM Framework Support",i={unversionedId:"user/ormframework",id:"version-v1.3/user/ormframework",title:"ORM Framework Support",description:"Seata ORM framework support",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-v1.3/user/ormframework.md",sourceDirName:"user",slug:"/user/ormframework",permalink:"/docs/v1.3/user/ormframework",draft:!1,tags:[],version:"v1.3",frontMatter:{title:"ORM Framework Support",keywords:["Seata","ORM Framework"],description:"Seata ORM framework support"},sidebar:"docs",previous:{title:"Microservice Framework Guide",permalink:"/docs/v1.3/user/microservice"},next:{title:"Data Source support",permalink:"/docs/v1.3/user/datasource"}},c={},p=[],u={toc:p},l="wrapper";function m(e){let{components:r,...t}=e;return(0,o.kt)(l,(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"orm-framework-support"},"ORM Framework Support"),(0,o.kt)("p",null,"Although Seata is a component that ensures data consistency, it has no special requirements for ORM frameworks, supporting many mainstream ORM frameworks such as Mybatis, Mybatis-Plus, Spring Data JPA, Hibernate and so on. This is because the ORM framework is located on the upper layer of the JDBC structure, and Seata's AT and XA transaction modes intercept and enhance JDBC standard interface operations."))}m.isMDXComponent=!0}}]);