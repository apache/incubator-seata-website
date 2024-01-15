"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[89959],{3905:(e,t,a)=>{a.d(t,{Zo:()=>o,kt:()=>c});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),d=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},o=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,p=e.parentName,o=i(e,["components","mdxType","originalType","parentName"]),m=d(a),k=n,c=m["".concat(p,".").concat(k)]||m[k]||u[k]||l;return a?r.createElement(c,s(s({ref:t},o),{},{components:a})):r.createElement(c,s({ref:t},o))}));function c(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,s=new Array(l);s[0]=k;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[m]="string"==typeof e?e:n,s[1]=i;for(var d=2;d<l;d++)s[d]=a[d];return r.createElement.apply(null,s)}return r.createElement.apply(null,a)}k.displayName="MDXCreateElement"},99511:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var r=a(87462),n=(a(67294),a(3905));const l={title:"Seata-Server Release History",keywords:["Seata","Seata-Server","Release History"],description:"Seata-Server Release History"},s="Seata-Server Release History",i={unversionedId:"release-history/seata-server",id:"release-history/seata-server",title:"Seata-Server Release History",description:"Seata-Server Release History",source:"@site/i18n/en/docusaurus-plugin-content-docs-unversioned/current/release-history/seata-server.md",sourceDirName:"release-history",slug:"/release-history/seata-server",permalink:"/unversioned/release-history/seata-server",draft:!1,editUrl:"https://github.com/apache/incubator-seata-website/blob/docusaurus/i18n/en/docusaurus-plugin-content-docs-unversioned/current/release-history/seata-server.md",tags:[],version:"current",frontMatter:{title:"Seata-Server Release History",keywords:["Seata","Seata-Server","Release History"],description:"Seata-Server Release History"},sidebar:"release-history"},p={},d=[{value:"Seata 2.x",id:"seata-2x",level:2},{value:"Seata 1.x",id:"seata-1x",level:2}],o={toc:d},m="wrapper";function u(e){let{components:t,...a}=e;return(0,n.kt)(m,(0,r.Z)({},o,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"seata-server-release-history"},"Seata-Server Release History"),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"The Seata team maintains the last 3 stable releases. For example, the last version was 2.0.0, and the Seata team will maintain the following stable versions:"),(0,n.kt)("ul",{parentName:"admonition"},(0,n.kt)("li",{parentName:"ul"},"2.0.0"),(0,n.kt)("li",{parentName:"ul"},"1.8.0"),(0,n.kt)("li",{parentName:"ul"},"1.7.1"))),(0,n.kt)("h2",{id:"seata-2x"},"Seata 2.x"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Version"),(0,n.kt)("th",{parentName:"tr",align:null},"Binary Link"),(0,n.kt)("th",{parentName:"tr",align:null},"Docker Image"),(0,n.kt)("th",{parentName:"tr",align:null},"CheckSum"),(0,n.kt)("th",{parentName:"tr",align:null},"Release Notes"),(0,n.kt)("th",{parentName:"tr",align:null},"Reference Docs"),(0,n.kt)("th",{parentName:"tr",align:null},"Date"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"2.0.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v2.0.0/seata-server-2.0.0.zip"},"2.0.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=2.0.0"},"seataio/seata-server:2.0.0")),(0,n.kt)("td",{parentName:"tr",align:null},"5c5c6a98649f37ed7894743b21bc8777"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/release-notes/"},"2.0.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/user/quickstart/"},"2.0.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2023-11-24")))),(0,n.kt)("h2",{id:"seata-1x"},"Seata 1.x"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Version"),(0,n.kt)("th",{parentName:"tr",align:null},"Binary Link"),(0,n.kt)("th",{parentName:"tr",align:null},"Docker Image"),(0,n.kt)("th",{parentName:"tr",align:null},"CheckSum"),(0,n.kt)("th",{parentName:"tr",align:null},"Release Notes"),(0,n.kt)("th",{parentName:"tr",align:null},"Reference Docs"),(0,n.kt)("th",{parentName:"tr",align:null},"Date"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.8.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.8.0/seata-server-1.8.0.zip"},"1.8.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.8.0"},"seataio/seata-server:1.8.0")),(0,n.kt)("td",{parentName:"tr",align:null},"f5de162a4577f5f96828cba75d912240"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.8/release-notes/"},"1.8.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.8/user/quickstart/"},"1.8.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2023-10-31")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.7.1"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.7.1/seata-server-1.7.1.zip"},"1.7.1.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.7.1"},"seataio/seata-server:1.7.1")),(0,n.kt)("td",{parentName:"tr",align:null},"5e7f41965f8f26a46b727d204eef3054"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.7/release-notes/"},"1.7.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.7/user/quickstart/"},"1.7.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2023-09-05")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.7.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.7.0/seata-server-1.7.0.zip"},"1.7.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.7.0"},"seataio/seata-server:1.7.0")),(0,n.kt)("td",{parentName:"tr",align:null},"ca1f7444f19db7245df1e460fd468d30"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.7/release-notes/"},"1.7.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.7/user/quickstart/"},"1.7.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2023-07-11")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.6.1"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.6.1/seata-server-1.6.1.zip"},"1.6.1.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.6.1"},"seataio/seata-server:1.6.1")),(0,n.kt)("td",{parentName:"tr",align:null},"736ded86ab3adca52e95d253889179ef"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.6/release-notes/"},"1.6.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.6/user/quickstart/"},"1.6.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2022-12-22")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.6.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.6.0/seata-server-1.6.0.zip"},"1.6.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.6.0"},"seataio/seata-server:1.6.0")),(0,n.kt)("td",{parentName:"tr",align:null},"cacf323b8653c549fef806049f9e01f2"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.6/release-notes/"},"1.6.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.6/user/quickstart/"},"1.6.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2022-12-17")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.5.2"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.5.2/seata-server-1.5.2.zip"},"1.5.2.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.5.2"},"seataio/seata-server:1.5.2")),(0,n.kt)("td",{parentName:"tr",align:null},"41dbc4e3519a71d92afc212bb71a41c4"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.5/release-notes/"},"1.5.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.5/user/quickstart/"},"1.5.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2022-07-13")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.5.1"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.5.1/seata-server-1.5.1.zip"},"1.5.1.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.5.1"},"seataio/seata-server:1.5.1")),(0,n.kt)("td",{parentName:"tr",align:null},"3f75a4dc7bf553849dd439cc0faa2fdc"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.5/release-notes/"},"1.5.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.5/user/quickstart/"},"1.5.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2022-05-17")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.4.2"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.4.2/seata-server-1.4.2.zip"},"1.4.2.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.4.2"},"seataio/seata-server:1.4.2")),(0,n.kt)("td",{parentName:"tr",align:null},"4fb356c3c08e0bbebe2af66419f62f2d"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.4/release-notes/"},"1.4.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.4/user/quickstart/"},"1.4.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2021-04-25")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.4.1"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.4.1/seata-server-1.4.1.zip"},"1.4.1.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.4.1"},"seataio/seata-server:1.4.1")),(0,n.kt)("td",{parentName:"tr",align:null},"fd5f05b3d2894e6f6cb6ab7ab21c5207"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.4/release-notes/"},"1.4.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.4/user/quickstart/"},"1.4.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2021-02-08")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.4.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.4.0/seata-server-1.4.0.zip"},"1.4.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.4.0"},"seataio/seata-server:1.4.0")),(0,n.kt)("td",{parentName:"tr",align:null},"5a8304aee9ba2bdf80a7f96cb2328f69"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.4/release-notes/"},"1.4.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.4/user/quickstart/"},"1.4.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2020-11-02")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.3.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.3.0/seata-server-1.3.0.zip"},"1.3.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.3.0"},"seataio/seata-server:1.3.0")),(0,n.kt)("td",{parentName:"tr",align:null},"d888a04eb35f1de7cd7e89efabbbe779"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.3/release-notes/"},"1.3.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.3/user/quickstart/"},"1.3.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2020-07-16")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.2.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.2.0/seata-server-1.2.0.zip"},"1.2.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.2.0"},"seataio/seata-server:1.2.0")),(0,n.kt)("td",{parentName:"tr",align:null},"420ccff3f69377ee2114c9a390a5e0e3"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.2/release-notes/"},"1.2.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.2/user/quickstart/"},"1.2.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2020-04-21")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.1.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.1.0/seata-server-1.1.0.zip"},"1.1.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.1.0"},"seataio/seata-server:1.1.0")),(0,n.kt)("td",{parentName:"tr",align:null},"1653d4af05bccf48c8417a829c9ca0cf"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.1/release-notes/"},"1.1.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.1/user/quickstart/"},"1.1.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2020-02-20")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1.0.0"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://github.com/apache/incubator-seata/releases/download/v1.0.0/seata-server-1.0.0.zip"},"1.0.0.zip")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"https://hub.docker.com/r/seataio/seata-server/tags?page=1&name=1.0.0"},"seataio/seata-server:1.0.0")),(0,n.kt)("td",{parentName:"tr",align:null},"c889eab52fc658cd1c4a293858ded87f"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.0/release-notes/"},"1.0.x Release Notes")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/v1.0/user/quickstart/"},"1.0.x Quick Start")),(0,n.kt)("td",{parentName:"tr",align:null},"2019-12-21")))))}u.isMDXComponent=!0}}]);