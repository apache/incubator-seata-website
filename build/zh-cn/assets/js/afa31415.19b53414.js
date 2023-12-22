"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[97884],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=a,d=u["".concat(s,".").concat(m)]||u[m]||f[m]||o;return n?r.createElement(d,l(l({ref:t},p),{},{components:n})):r.createElement(d,l({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},96776:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>f,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const o={title:"\u591a\u914d\u7f6e\u9694\u79bb",keywords:["Seata"],description:"Seata\u4ece0.6.1\u7248\u672c\u5f00\u59cb\u652f\u6301\u591a\u914d\u7f6e\u9694\u79bb\uff0c\u53ef\u4ee5\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u8fdb\u884c\u914d\u7f6e\u3002"},l="\u591a\u914d\u7f6e\u9694\u79bb",i={unversionedId:"ops/multi-configuration-isolation",id:"version-v1.3/ops/multi-configuration-isolation",title:"\u591a\u914d\u7f6e\u9694\u79bb",description:"Seata\u4ece0.6.1\u7248\u672c\u5f00\u59cb\u652f\u6301\u591a\u914d\u7f6e\u9694\u79bb\uff0c\u53ef\u4ee5\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u8fdb\u884c\u914d\u7f6e\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.3/ops/multi-configuration-isolation.md",sourceDirName:"ops",slug:"/ops/multi-configuration-isolation",permalink:"/zh-cn/docs/v1.3/ops/multi-configuration-isolation",draft:!1,tags:[],version:"v1.3",frontMatter:{title:"\u591a\u914d\u7f6e\u9694\u79bb",keywords:["Seata"],description:"Seata\u4ece0.6.1\u7248\u672c\u5f00\u59cb\u652f\u6301\u591a\u914d\u7f6e\u9694\u79bb\uff0c\u53ef\u4ee5\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u8fdb\u884c\u914d\u7f6e\u3002"},sidebar:"docs",previous:{title:"\u7248\u672c\u5347\u7ea7\u6307\u5357",permalink:"/zh-cn/docs/v1.3/ops/upgrade"},next:{title:"\u65b0\u4eba\u6587\u6863",permalink:"/zh-cn/docs/v1.3/ops/deploy-guide-beginner"}},s={},c=[{value:"\u7528\u4f8b",id:"\u7528\u4f8b",level:2},{value:"1.\u73af\u5883\u914d\u7f6e",id:"1\u73af\u5883\u914d\u7f6e",level:3},{value:"2.\u91cd\u547d\u540d\u65b0\u7684\u914d\u7f6e\u6587\u4ef6",id:"2\u91cd\u547d\u540d\u65b0\u7684\u914d\u7f6e\u6587\u4ef6",level:3}],p={toc:c},u="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u591a\u914d\u7f6e\u9694\u79bb"},"\u591a\u914d\u7f6e\u9694\u79bb"),(0,a.kt)("p",null,"Seata\u4ece0.6.1\u7248\u672c\u5f00\u59cb\u652f\u6301\u591a\u914d\u7f6e\u9694\u79bb\uff0c\u4f60\u53ef\u4ee5\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u8fdb\u884c\u914d\u7f6e\u3002"),(0,a.kt)("h2",{id:"\u7528\u4f8b"},"\u7528\u4f8b"),(0,a.kt)("p",null,"\u5047\u8bbe\u6211\u4eec\u73b0\u5728\u6709\u4e00\u4e2a\u6d4b\u8bd5\u73af\u5883\uff0c\u6211\u4eec\u53ea\u60f3\u8bfb\u53d6\u6d4b\u8bd5\u73af\u5883\u5bf9\u5e94\u7684\u914d\u7f6e\u9879\u3002"),(0,a.kt)("h3",{id:"1\u73af\u5883\u914d\u7f6e"},"1.\u73af\u5883\u914d\u7f6e"),(0,a.kt)("p",null,"Seata \u63d0\u4f9b\u4e86\u4e24\u79cd\u8bbe\u7f6e\u4e0d\u540c\u73af\u5883\u7684\u65b9\u6cd5\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"-e test"),"\uff0c\u5176\u4e2dtest\u662f\u73af\u5883\u540d\u79f0\u3002(",(0,a.kt)("strong",{parentName:"li"},"\u4ec5\u9002\u7528\u4e8e\u670d\u52a1\u5668\u7aef"),")")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"\n\u4f8b\u5982\uff0c\u5728Linux\u4e0b\u4f7f\u7528\u547d\u4ee4\uff1a\n\nsh Seata-server.sh -e test\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"[ ",(0,a.kt)("strong",{parentName:"li"},"\u63a8\u8350")," ]"," \u4f7f\u7528",(0,a.kt)("strong",{parentName:"li"},"SEATA_ENV"),"\u4f5c\u4e3a\u73af\u5883\u53d8\u91cf\u7684\u952e\uff0c\u5176\u503c\u662f\u73af\u5883\u540d\u79f0\u3002\uff08",(0,a.kt)("strong",{parentName:"li"},"\u4ec5\u9002\u7528\u4e8e\u5ba2\u6237\u7aef"),"\uff09")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"\n\u4f8b\u5982\uff0c\u5728Linux\u4e0b\u4f7f\u7528\u547d\u4ee4\uff1a\n\n#vi /etc/profile \n\nexport SEATA_ENV=test\n\n:wq\n\n#source /etc/profile\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"[ ",(0,a.kt)("strong",{parentName:"li"},"\u63a8\u8350")," ]","\u4f7f\u7528",(0,a.kt)("strong",{parentName:"li"},"seataEnv"),"\u4f5c\u4e3ajvm\u9009\u9879\u7684\u952e\uff0c\u5b83\u7684\u503c\u5c06\u662f\u73af\u5883\u7684\u540d\u79f0\u3002\uff08",(0,a.kt)("strong",{parentName:"li"},"\u4ec5\u9002\u7528\u4e8e\u5ba2\u6237\u7aef"),"\uff09")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"-DseataEnv=test\n")),(0,a.kt)("h3",{id:"2\u91cd\u547d\u540d\u65b0\u7684\u914d\u7f6e\u6587\u4ef6"},"2.\u91cd\u547d\u540d\u65b0\u7684\u914d\u7f6e\u6587\u4ef6"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u590d\u5236 file.conf \u5e76\u5c06\u5176\u91cd\u547d\u540d\u4e3a file-env.conf\uff0c\u5176\u4e2d env \u662f\u73af\u5883\u540d\u79f0\u3002\u4f8b\u5982 ",(0,a.kt)("strong",{parentName:"li"},"file-test.conf")),(0,a.kt)("li",{parentName:"ul"},"\u5c06registry.conf \u590d\u5236\u5e76\u91cd\u547d\u540d\u4e3a registry-env.conf\uff0c\u5176\u4e2d env \u662f\u73af\u5883\u7684\u540d\u79f0\u3002\u4f8b\u5982 ",(0,a.kt)("strong",{parentName:"li"},"registry-test.conf")),(0,a.kt)("li",{parentName:"ul"},"\u5728registry-test.conf\u6587\u4ef6\u4e2d\uff0c\u8fdb\u884c\u5982\u4e0b\u4fee\u6539\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'registry {\n...\nfile {\n    name = "file-test.conf"\n  }\n\nconfig {\n...\nfile {\n    name = "file-test.conf"\n  }\n')),(0,a.kt)("p",null,"\u505a\u5b8c\u4ee5\u4e0a\u7684\u6240\u6709\u6b65\u9aa4\u540e\uff0c\u4f60\u5c31\u53ef\u4ee5\u5f00\u59cb\u4f7f\u7528 Seata \u914d\u7f6e\u9694\u79bb\u4e86\u3002"))}f.isMDXComponent=!0}}]);