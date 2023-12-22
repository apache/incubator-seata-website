"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[28922],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},k="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),k=s(r),d=a,m=k["".concat(p,".").concat(d)]||k[d]||u[d]||o;return r?n.createElement(m,l(l({ref:t},c),{},{components:r})):n.createElement(m,l({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[k]="string"==typeof e?e:a,l[1]=i;for(var s=2;s<o;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},81669:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const o={hidden:!0,title:"\u4f7f\u7528 Docker \u90e8\u7f72 Seata Server",keywords:["docker","docker-compose","ops"],description:"\u4f7f\u7528 Docker \u90e8\u7f72 Seata Server",author:"helloworlde",date:new Date("2019-11-25T00:00:00.000Z")},l="\u4f7f\u7528 Docker \u90e8\u7f72 Seata Server",i={unversionedId:"ops/deploy-by-docker-142",id:"version-v1.0/ops/deploy-by-docker-142",title:"\u4f7f\u7528 Docker \u90e8\u7f72 Seata Server",description:"\u4f7f\u7528 Docker \u90e8\u7f72 Seata Server",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.0/ops/deploy-by-docker-142.md",sourceDirName:"ops",slug:"/ops/deploy-by-docker-142",permalink:"/zh-cn/docs/v1.0/ops/deploy-by-docker-142",draft:!1,tags:[],version:"v1.0",frontMatter:{hidden:!0,title:"\u4f7f\u7528 Docker \u90e8\u7f72 Seata Server",keywords:["docker","docker-compose","ops"],description:"\u4f7f\u7528 Docker \u90e8\u7f72 Seata Server",author:"helloworlde",date:"2019-11-25T00:00:00.000Z"},sidebar:"docs",previous:{title:"\u76f4\u63a5\u90e8\u7f72",permalink:"/zh-cn/docs/v1.0/ops/deploy-server"},next:{title:"\u4f7f\u7528 Docker compose \u5feb\u901f\u90e8\u7f72 Seata Server",permalink:"/zh-cn/docs/v1.0/ops/deploy-by-docker-compose-142"}},p={},s=[{value:"\u6ce8\u610f\u4e8b\u9879",id:"\u6ce8\u610f\u4e8b\u9879",level:2},{value:"\u5feb\u901f\u5f00\u59cb",id:"\u5feb\u901f\u5f00\u59cb",level:2},{value:"\u542f\u52a8seata-server\u5b9e\u4f8b",id:"\u542f\u52a8seata-server\u5b9e\u4f8b",level:4},{value:"\u6307\u5b9aseata-server IP\u548c\u7aef\u53e3 \u542f\u52a8",id:"\u6307\u5b9aseata-server-ip\u548c\u7aef\u53e3-\u542f\u52a8",level:4},{value:"Docker compose \u542f\u52a8",id:"docker-compose-\u542f\u52a8",level:4},{value:"\u5bb9\u5668\u547d\u4ee4\u884c\u53ca\u67e5\u770b\u65e5\u5fd7",id:"\u5bb9\u5668\u547d\u4ee4\u884c\u53ca\u67e5\u770b\u65e5\u5fd7",level:2},{value:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u914d\u7f6e\u6587\u4ef6",id:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u914d\u7f6e\u6587\u4ef6",level:2},{value:"\u73af\u5883\u53d8\u91cf",id:"\u73af\u5883\u53d8\u91cf",level:2}],c={toc:s},k="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(k,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u4f7f\u7528-docker-\u90e8\u7f72-seata-server"},"\u4f7f\u7528 Docker \u90e8\u7f72 Seata Server"),(0,a.kt)("h2",{id:"\u6ce8\u610f\u4e8b\u9879"},"\u6ce8\u610f\u4e8b\u9879"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u907f\u514d\u76f4\u63a5\u62c9\u53d6latest\u7248\u672c\u955c\u50cf\uff0clatest\u7248\u672c\u5e76\u4e0d\u4e00\u5b9a\u662f\u7a33\u5b9a\u7248\u672c\uff0c\u4e3a\u907f\u514d\u4e0d\u5fc5\u8981\u7684\u95ee\u9898\uff0c\u8bf7\u5230",(0,a.kt)("a",{parentName:"li",href:"https://hub.docker.com/r/seataio/seata-server/tags"},"docker\u955c\u50cf\u4ed3\u5e93"),"\u786e\u5b9a\u8981\u62c9\u53d6\u7684\u955c\u50cf\u7248\u672c\u3002")),(0,a.kt)("h2",{id:"\u5feb\u901f\u5f00\u59cb"},"\u5feb\u901f\u5f00\u59cb"),(0,a.kt)("h4",{id:"\u542f\u52a8seata-server\u5b9e\u4f8b"},"\u542f\u52a8seata-server\u5b9e\u4f8b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker run --name seata-server -p 8091:8091 seataio/seata-server:1.4.2\n")),(0,a.kt)("h4",{id:"\u6307\u5b9aseata-server-ip\u548c\u7aef\u53e3-\u542f\u52a8"},"\u6307\u5b9aseata-server IP\u548c\u7aef\u53e3 \u542f\u52a8"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker run --name seata-server \\\n        -p 8091:8091 \\\n        -e SEATA_IP=192.168.1.1 \\\n        -e SEATA_PORT=8091 \\\n        seataio/seata-server\n")),(0,a.kt)("h4",{id:"docker-compose-\u542f\u52a8"},"Docker compose \u542f\u52a8"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker-compose.yaml")," \u793a\u4f8b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'version: "3"\nservices:\n  seata-server:\n    image: seataio/seata-server:${latest-release-version}\n    hostname: seata-server\n    ports:\n      - "8091:8091"\n    environment:\n      - SEATA_PORT=8091\n      - STORE_MODE=file\n')),(0,a.kt)("h2",{id:"\u5bb9\u5668\u547d\u4ee4\u884c\u53ca\u67e5\u770b\u65e5\u5fd7"},"\u5bb9\u5668\u547d\u4ee4\u884c\u53ca\u67e5\u770b\u65e5\u5fd7"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker exec -it seata-server sh\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker logs -f seata-server\n")),(0,a.kt)("h2",{id:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u914d\u7f6e\u6587\u4ef6"},"\u4f7f\u7528\u81ea\u5b9a\u4e49\u914d\u7f6e\u6587\u4ef6"),(0,a.kt)("p",null,"\u81ea\u5b9a\u4e49\u914d\u7f6e\u6587\u4ef6\u9700\u8981\u901a\u8fc7\u6302\u8f7d\u6587\u4ef6\u7684\u65b9\u5f0f\u5b9e\u73b0\uff0c\u5c06\u5bbf\u4e3b\u673a\u4e0a\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"registry.conf")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"file.conf")," \u6302\u8f7d\u5230\u5bb9\u5668\u4e2d\u76f8\u5e94\u7684\u76ee\u5f55"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6307\u5b9a registry.conf ")),(0,a.kt)("p",null,"\u4f7f\u7528\u81ea\u5b9a\u4e49\u914d\u7f6e\u6587\u4ef6\u65f6\u5fc5\u987b\u6307\u5b9a\u73af\u5883\u53d8\u91cf ",(0,a.kt)("inlineCode",{parentName:"p"},"SEATA_CONFIG_NAME"),", \u5e76\u4e14\u503c\u9700\u8981\u4ee5",(0,a.kt)("inlineCode",{parentName:"p"},"file:"),"\u5f00\u59cb, \u5982: ",(0,a.kt)("inlineCode",{parentName:"p"},"file:/root/seata-config/registry")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker run --name seata-server \\\n        -p 8091:8091 \\\n        -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \\\n        -v /User/seata/config:/root/seata-config  \\\n        seataio/seata-server\n")),(0,a.kt)("p",null,"\u5176\u4e2d ",(0,a.kt)("inlineCode",{parentName:"p"},"-e")," \u7528\u4e8e\u914d\u7f6e\u73af\u5883\u53d8\u91cf\uff0c ",(0,a.kt)("inlineCode",{parentName:"p"},"-v")," \u7528\u4e8e\u6302\u8f7d\u5bbf\u4e3b\u673a\u7684\u76ee\u5f55"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6307\u5b9a file.conf ")),(0,a.kt)("p",null,"\u5982\u679c\u9700\u8981\u540c\u65f6\u6307\u5b9a ",(0,a.kt)("inlineCode",{parentName:"p"},"file.conf")," \u914d\u7f6e\u6587\u4ef6\uff0c\u5219\u9700\u8981\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"registry.conf")," \u6587\u4ef6\u4e2d\u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"config")," \u914d\u7f6e\u6539\u4e3a\u4ee5\u4e0b\u5185\u5bb9\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"name")," \u7684\u503c\u4e3a\u5bb9\u5668\u4e2d\u5bf9\u5e94\u7684\u8def\u5f84"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'config {\n  type = "file"\n\n  file {\n    name = "file:/root/seata-config/file.conf"\n  }\n}\n')),(0,a.kt)("h2",{id:"\u73af\u5883\u53d8\u91cf"},"\u73af\u5883\u53d8\u91cf"),(0,a.kt)("p",null,"seata-server \u652f\u6301\u4ee5\u4e0b\u73af\u5883\u53d8\u91cf\uff1a "),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SEATA_IP"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9aseata-server\u542f\u52a8\u7684IP, \u8be5IP\u7528\u4e8e\u5411\u6ce8\u518c\u4e2d\u5fc3\u6ce8\u518c\u65f6\u4f7f\u7528, \u5982eureka\u7b49")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SEATA_PORT"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9aseata-server\u542f\u52a8\u7684\u7aef\u53e3, \u9ed8\u8ba4\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"8091"))),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"STORE_MODE"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9aseata-server\u7684\u4e8b\u52a1\u65e5\u5fd7\u5b58\u50a8\u65b9\u5f0f, \u652f\u6301",(0,a.kt)("inlineCode",{parentName:"p"},"db")," ,",(0,a.kt)("inlineCode",{parentName:"p"},"file"),",redis(Seata-Server 1.3\u53ca\u4ee5\u4e0a\u7248\u672c\u652f\u6301), \u9ed8\u8ba4\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"file"))),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SERVER_NODE"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u7528\u4e8e\u6307\u5b9aseata-server\u8282\u70b9ID, \u5982 ",(0,a.kt)("inlineCode",{parentName:"p"},"1"),",",(0,a.kt)("inlineCode",{parentName:"p"},"2"),",",(0,a.kt)("inlineCode",{parentName:"p"},"3"),"..., \u9ed8\u8ba4\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"\u6839\u636eip\u751f\u6210"))),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SEATA_ENV"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9a seata-server \u8fd0\u884c\u73af\u5883, \u5982 ",(0,a.kt)("inlineCode",{parentName:"p"},"dev"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"test")," \u7b49, \u670d\u52a1\u542f\u52a8\u65f6\u4f1a\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"registry-dev.conf")," \u8fd9\u6837\u7684\u914d\u7f6e")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SEATA_CONFIG_NAME"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9a\u914d\u7f6e\u6587\u4ef6\u4f4d\u7f6e, \u5982 ",(0,a.kt)("inlineCode",{parentName:"p"},"file:/root/registry"),", \u5c06\u4f1a\u52a0\u8f7d ",(0,a.kt)("inlineCode",{parentName:"p"},"/root/registry.conf")," \u4f5c\u4e3a\u914d\u7f6e\u6587\u4ef6\uff0c\u5982\u679c\u9700\u8981\u540c\u65f6\u6307\u5b9a ",(0,a.kt)("inlineCode",{parentName:"p"},"file.conf"),"\u6587\u4ef6\uff0c\u9700\u8981\u5c06",(0,a.kt)("inlineCode",{parentName:"p"},"registry.conf"),"\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"config.file.name"),"\u7684\u503c\u6539\u4e3a\u7c7b\u4f3c",(0,a.kt)("inlineCode",{parentName:"p"},"file:/root/file.conf"),"\uff1a")))}u.isMDXComponent=!0}}]);