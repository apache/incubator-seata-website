"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[84877],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,k=d["".concat(i,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(k,s(s({ref:t},p),{},{components:n})):a.createElement(k,s({ref:t},p))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[d]="string"==typeof e?e:r,s[1]=l;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},91651:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=n(87462),r=(n(67294),n(3905));const o={hidden:!0,title:"\u4f7f\u7528 Docker compose \u5feb\u901f\u90e8\u7f72 Seata Server",keywords:["docker-compose","ops"],description:"\u4f7f\u7528 Docker-compose \u5feb\u901f\u90e8\u7f72 Seata Server",author:"zouwei",date:new Date("2021-12-05T00:00:00.000Z")},s="\u4f7f\u7528 docker-compose \u90e8\u7f72 Seata Server",l={unversionedId:"ops/deploy-by-docker-compose-142",id:"version-v1.5/ops/deploy-by-docker-compose-142",title:"\u4f7f\u7528 Docker compose \u5feb\u901f\u90e8\u7f72 Seata Server",description:"\u4f7f\u7528 Docker-compose \u5feb\u901f\u90e8\u7f72 Seata Server",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.5/ops/deploy-by-docker-compose-142.md",sourceDirName:"ops",slug:"/ops/deploy-by-docker-compose-142",permalink:"/zh-cn/docs/v1.5/ops/deploy-by-docker-compose-142",draft:!1,tags:[],version:"v1.5",frontMatter:{hidden:!0,title:"\u4f7f\u7528 Docker compose \u5feb\u901f\u90e8\u7f72 Seata Server",keywords:["docker-compose","ops"],description:"\u4f7f\u7528 Docker-compose \u5feb\u901f\u90e8\u7f72 Seata Server",author:"zouwei",date:"2021-12-05T00:00:00.000Z"}},i={},c=[{value:"\u5386\u53f2\u7248\u672c\u90e8\u7f72",id:"\u5386\u53f2\u7248\u672c\u90e8\u7f72",level:2},{value:"\u6ce8\u610f\u4e8b\u9879",id:"\u6ce8\u610f\u4e8b\u9879",level:2},{value:"\u5feb\u901f\u5f00\u59cb",id:"\u5feb\u901f\u5f00\u59cb",level:2},{value:'<a id="file-file">\u65e0\u6ce8\u518c\u4e2d\u5fc3\uff0cfile\u5b58\u50a8</a>',id:"\u65e0\u6ce8\u518c\u4e2d\u5fc3file\u5b58\u50a8",level:3},{value:'<a id="file-db">\u65e0\u6ce8\u518c\u4e2d\u5fc3\uff0cDB\u5b58\u50a8</a>',id:"\u65e0\u6ce8\u518c\u4e2d\u5fc3db\u5b58\u50a8",level:3},{value:'<a id="nacos-db">nacos\u6ce8\u518c\u4e2d\u5fc3\uff0cdb\u5b58\u50a8</a>',id:"nacos\u6ce8\u518c\u4e2d\u5fc3db\u5b58\u50a8",level:3},{value:'<a id="ha-nacos-db">\u9ad8\u53ef\u7528\u90e8\u7f72</a>',id:"\u9ad8\u53ef\u7528\u90e8\u7f72",level:3},{value:"\u73af\u5883\u53d8\u91cf",id:"\u73af\u5883\u53d8\u91cf",level:2}],p={toc:c},d="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u4f7f\u7528-docker-compose-\u90e8\u7f72-seata-server"},"\u4f7f\u7528 docker-compose \u90e8\u7f72 Seata Server"),(0,r.kt)("h2",{id:"\u5386\u53f2\u7248\u672c\u90e8\u7f72"},"\u5386\u53f2\u7248\u672c\u90e8\u7f72"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://seata.io/zh-cn/docs/ops/deploy-by-docker-compose-142.html"},"1.5.0\u4ee5\u524d\u7248\u672c")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://seata.io/zh-cn/docs/ops/deploy-by-docker-compose.html"},"1.5.0\u4ee5\u540e\u7248\u672c(\u542b1.5.0)")),(0,r.kt)("h2",{id:"\u6ce8\u610f\u4e8b\u9879"},"\u6ce8\u610f\u4e8b\u9879"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u907f\u514d\u76f4\u63a5\u62c9\u53d6latest\u7248\u672c\u955c\u50cf\uff0clatest\u7248\u672c\u5e76\u4e0d\u4e00\u5b9a\u662f\u7a33\u5b9a\u7248\u672c\uff0c\u4e3a\u907f\u514d\u4e0d\u5fc5\u8981\u7684\u95ee\u9898\uff0c\u8bf7\u5230",(0,r.kt)("a",{parentName:"li",href:"https://hub.docker.com/r/seataio/seata-server/tags"},"docker\u955c\u50cf\u4ed3\u5e93"),"\u786e\u5b9a\u8981\u62c9\u53d6\u7684\u955c\u50cf\u7248\u672c\u3002")),(0,r.kt)("h2",{id:"\u5feb\u901f\u5f00\u59cb"},"\u5feb\u901f\u5f00\u59cb"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{href:"#file-file"},"\u65e0\u6ce8\u518c\u4e2d\u5fc3\uff0cfile\u5b58\u50a8")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{href:"#file-db"},"\u65e0\u6ce8\u518c\u4e2d\u5fc3\uff0cdb\u5b58\u50a8")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{href:"#nacos-db"},"nacos\u6ce8\u518c\u4e2d\u5fc3\uff0cdb\u5b58\u50a8")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{href:"#ha-nacos-db"},"\u9ad8\u53ef\u7528\u90e8\u7f72"))),(0,r.kt)("h3",{id:"\u65e0\u6ce8\u518c\u4e2d\u5fc3file\u5b58\u50a8"},(0,r.kt)("a",{id:"file-file"},"\u65e0\u6ce8\u518c\u4e2d\u5fc3\uff0cfile\u5b58\u50a8")),(0,r.kt)("p",null,"\u8be5\u6a21\u5f0f\u4e0b\uff0c\u4e0d\u9700\u8981\u6ce8\u518c\u4e2d\u5fc3\uff0c\u4e5f\u4e0d\u9700\u8981\u4efb\u4f55\u7b2c\u4e09\u65b9\u5b58\u50a8\u4e2d\u5fc3\u3002"),(0,r.kt)("p",null,"docker-compose.yaml"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'version: "3.1"\nservices:\n  seata-server:\n    image: seataio/seata-server:${latest-release-version}\n    hostname: seata-server\n    ports:\n      - "8091:8091"\n    environment:\n      - SEATA_PORT=8091\n      - STORE_MODE=file\n')),(0,r.kt)("h3",{id:"\u65e0\u6ce8\u518c\u4e2d\u5fc3db\u5b58\u50a8"},(0,r.kt)("a",{id:"file-db"},"\u65e0\u6ce8\u518c\u4e2d\u5fc3\uff0cDB\u5b58\u50a8")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"db\u6a21\u5f0f\u9700\u8981\u5728\u6570\u636e\u5e93\u521b\u5efa\u5bf9\u5e94\u7684\u8868\u7ed3\u6784\uff0c",(0,r.kt)("a",{href:"https://github.com/seata/seata/tree/develop/script/server/db"},"[\u5efa\u8868\u811a\u672c]"),"\u3002")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff081\uff09\u51c6\u5907file.conf\u914d\u7f6e\u6587\u4ef6")),(0,r.kt)("p",null,"\u66f4\u591a\u5b58\u50a8\u6a21\u5f0f\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://github.com/seata/seata/blob/develop/script/config-center/config.txt"},"\u66f4\u591a\u5b58\u50a8\u6a21\u5f0f")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-properties"},"# \u5b58\u50a8\u6a21\u5f0f\nstore.mode=db\n\nstore.db.datasource=druid\nstore.db.dbType=mysql\n# \u9700\u8981\u6839\u636emysql\u7684\u7248\u672c\u8c03\u6574driverClassName\n# mysql8\u53ca\u4ee5\u4e0a\u7248\u672c\u5bf9\u5e94\u7684driver\uff1acom.mysql.cj.jdbc.Driver\n# mysql8\u4ee5\u4e0b\u7248\u672c\u7684driver\uff1acom.mysql.jdbc.Driver\nstore.db.driverClassName=com.mysql.cj.jdbc.Driver\n# \u6ce8\u610f\u6839\u636e\u751f\u4ea7\u5b9e\u9645\u60c5\u51b5\u8c03\u6574\u53c2\u6570host\u548cport\nstore.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false\n# \u6570\u636e\u5e93\u7528\u6237\u540d\nstore.db.user=\n# \u7528\u6237\u540d\u5bc6\u7801\nstore.db.password=\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff082\uff09\u51c6\u5907registry.conf\u6587\u4ef6")),(0,r.kt)("p",null,"\u66f4\u591a\u6ce8\u518c\u4e2d\u5fc3\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://seata.io/zh-cn/docs/user/registry/index.html"},"\u6ce8\u518c\u4e2d\u5fc3")),(0,r.kt)("p",null,"\u66f4\u591a\u914d\u7f6e\u4e2d\u5fc3\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://seata.io/zh-cn/docs/user/configuration/index.html"},"\u914d\u7f6e\u4e2d\u5fc3")),(0,r.kt)("p",null,"\u76f4\u8fde\u6a21\u5f0f\uff08\u65e0\u6ce8\u518c\u4e2d\u5fc3\uff09"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'registry {\n  type = "file"\n}\n\nconfig {\n  type = "file"\n  \n  file {\n    name="file:/root/seata-config/file.conf"\n  }\n}\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff083\uff09\u51c6\u5907docker-compose.yaml\u6587\u4ef6")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'version: "3.1"\nservices:\n  seata-server:\n    image: seataio/seata-server:${latest-release-version}\n    hostname: seata-server\n    ports:\n      - "8091:8091"\n    environment:\n      - SEATA_PORT=8091\n      - SEATA_CONFIG_NAME=file:/root/seata-config/registry\n    volumes:\n    # \u9700\u8981\u628afile.conf\u548cregistry.conf\u90fd\u653e\u5230./seata-server/config\u6587\u4ef6\u5939\u4e2d\n      - "./seata-server/config:/root/seata-config"\n')),(0,r.kt)("h3",{id:"nacos\u6ce8\u518c\u4e2d\u5fc3db\u5b58\u50a8"},(0,r.kt)("a",{id:"nacos-db"},"nacos\u6ce8\u518c\u4e2d\u5fc3\uff0cdb\u5b58\u50a8")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"db\u6a21\u5f0f\u9700\u8981\u5728\u6570\u636e\u5e93\u521b\u5efa\u5bf9\u5e94\u7684\u8868\u7ed3\u6784\uff0c",(0,r.kt)("a",{href:"https://github.com/seata/seata/tree/develop/script/server/db"},"[\u5efa\u8868\u811a\u672c]"),"\u3002")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff081\uff09\u51c6\u5907registry.conf\u6587\u4ef6")),(0,r.kt)("p",null,"nacos\u6ce8\u518c\u4e2d\u5fc3\u3002"),(0,r.kt)("p",null,"\u66f4\u591a\u6ce8\u518c\u4e2d\u5fc3\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://seata.io/zh-cn/docs/user/registry/index.html"},"\u6ce8\u518c\u4e2d\u5fc3")),(0,r.kt)("p",null,"\u66f4\u591a\u914d\u7f6e\u4e2d\u5fc3\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://seata.io/zh-cn/docs/user/configuration/index.html"},"\u914d\u7f6e\u4e2d\u5fc3")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'registry {\n  type = "nacos"\n  \n  nacos {\n  # seata\u670d\u52a1\u6ce8\u518c\u5728nacos\u4e0a\u7684\u522b\u540d\uff0c\u5ba2\u6237\u7aef\u901a\u8fc7\u8be5\u522b\u540d\u8c03\u7528\u670d\u52a1\n    application = "seata-server"\n  # \u8bf7\u6839\u636e\u5b9e\u9645\u751f\u4ea7\u73af\u5883\u914d\u7f6enacos\u670d\u52a1\u7684ip\u548c\u7aef\u53e3\n    serverAddr = "127.0.0.1:8848"\n  # nacos\u4e0a\u6307\u5b9a\u7684namespace\n    namespace = ""\n    cluster = "default"\n    username = "nacos"\n    password = "nacos"\n  }\n}\n\nconfig {\n  type = "nacos"\n  \n  nacos {\n    # \u8bf7\u6839\u636e\u5b9e\u9645\u751f\u4ea7\u73af\u5883\u914d\u7f6enacos\u670d\u52a1\u7684ip\u548c\u7aef\u53e3\n    serverAddr = "127.0.0.1:8848"\n    # nacos\u4e0a\u6307\u5b9a\u7684namespace\n    namespace = ""\n    group = "SEATA_GROUP"\n    username = "nacos"\n    password = "nacos"\n  # \u4ecev1.4.2\u7248\u672c\u5f00\u59cb\uff0c\u5df2\u652f\u6301\u4ece\u4e00\u4e2aNacos dataId\u4e2d\u83b7\u53d6\u6240\u6709\u914d\u7f6e\u4fe1\u606f,\u4f60\u53ea\u9700\u8981\u989d\u5916\u6dfb\u52a0\u4e00\u4e2adataId\u914d\u7f6e\u9879\n    dataId: "seataServer.properties"\n  }\n}\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff082\uff09\u51c6\u5907nacos\u914d\u7f6e\u4e2d\u5fc3\u914d\u7f6e")),(0,r.kt)("p",null,"\u66f4\u591a\u5b58\u50a8\u6a21\u5f0f\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://github.com/seata/seata/blob/develop/script/config-center/config.txt"},"\u66f4\u591a\u5b58\u50a8\u6a21\u5f0f")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u4f60\u9700\u8981\u5728nacos\u65b0\u5efa\u914d\u7f6e\uff0c\u6b64\u5904dataId\u4e3aseataServer.properties")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-properties"},"# \u5b58\u50a8\u6a21\u5f0f\nstore.mode=db\n\nstore.db.datasource=druid\nstore.db.dbType=mysql\n# \u9700\u8981\u6839\u636emysql\u7684\u7248\u672c\u8c03\u6574driverClassName\n# mysql8\u53ca\u4ee5\u4e0a\u7248\u672c\u5bf9\u5e94\u7684driver\uff1acom.mysql.cj.jdbc.Driver\n# mysql8\u4ee5\u4e0b\u7248\u672c\u7684driver\uff1acom.mysql.jdbc.Driver\nstore.db.driverClassName=com.mysql.cj.jdbc.Driver\n# \u6ce8\u610f\u6839\u636e\u751f\u4ea7\u5b9e\u9645\u60c5\u51b5\u8c03\u6574\u53c2\u6570host\u548cport\nstore.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false\n# \u6570\u636e\u5e93\u7528\u6237\u540d\nstore.db.user=\n# \u7528\u6237\u540d\u5bc6\u7801\nstore.db.password=\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff083\uff09\u51c6\u5907docker-compose.yaml\u6587\u4ef6")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'version: "3.1"\nservices:\n  seata-server:\n    image: seataio/seata-server:${latest-release-version}\n    hostname: seata-server\n    ports:\n      - "8091:8091"\n    environment:\n      # \u6307\u5b9aseata\u670d\u52a1\u542f\u52a8\u7aef\u53e3\n      - SEATA_PORT=8091\n      # \u6ce8\u518c\u5230nacos\u4e0a\u7684ip\u3002\u5ba2\u6237\u7aef\u5c06\u901a\u8fc7\u8be5ip\u8bbf\u95eeseata\u670d\u52a1\u3002\n      # \u6ce8\u610f\u516c\u7f51ip\u548c\u5185\u7f51ip\u7684\u5dee\u5f02\u3002\n      - SEATA_IP=127.0.0.1\n      - SEATA_CONFIG_NAME=file:/root/seata-config/registry\n    volumes:\n    # \u56e0\u4e3aregistry.conf\u4e2d\u662fnacos\u914d\u7f6e\u4e2d\u5fc3\uff0c\u53ea\u9700\u8981\u628aregistry.conf\u653e\u5230./seata-server/config\u6587\u4ef6\u5939\u4e2d\n      - "./seata-server/config:/root/seata-config"\n')),(0,r.kt)("h3",{id:"\u9ad8\u53ef\u7528\u90e8\u7f72"},(0,r.kt)("a",{id:"ha-nacos-db"},"\u9ad8\u53ef\u7528\u90e8\u7f72")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"seata\u9ad8\u53ef\u7528\u4f9d\u8d56\u4e8e\u6ce8\u518c\u4e2d\u5fc3\u3001\u6570\u636e\u5e93\uff0c\u53ef\u4e0d\u4f9d\u8d56\u914d\u7f6e\u4e2d\u5fc3\u3002")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"db\u6a21\u5f0f\u9700\u8981\u5728\u6570\u636e\u5e93\u521b\u5efa\u5bf9\u5e94\u7684\u8868\u7ed3\u6784\uff0c",(0,r.kt)("a",{href:"https://github.com/seata/seata/tree/develop/script/server/db"},"[\u5efa\u8868\u811a\u672c]"),"\u3002")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff081\uff09\u51c6\u5907file.conf\u914d\u7f6e\u6587\u4ef6")),(0,r.kt)("p",null,"\u66f4\u591a\u5b58\u50a8\u6a21\u5f0f\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://github.com/seata/seata/blob/develop/script/config-center/config.txt"},"\u66f4\u591a\u5b58\u50a8\u6a21\u5f0f")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-properties"},"# \u5b58\u50a8\u6a21\u5f0f\nstore.mode=db\n\nstore.db.datasource=druid\nstore.db.dbType=mysql\n# \u9700\u8981\u6839\u636emysql\u7684\u7248\u672c\u8c03\u6574driverClassName\n# mysql8\u53ca\u4ee5\u4e0a\u7248\u672c\u5bf9\u5e94\u7684driver\uff1acom.mysql.cj.jdbc.Driver\n# mysql8\u4ee5\u4e0b\u7248\u672c\u7684driver\uff1acom.mysql.jdbc.Driver\nstore.db.driverClassName=com.mysql.cj.jdbc.Driver\n# \u6ce8\u610f\u6839\u636e\u751f\u4ea7\u5b9e\u9645\u60c5\u51b5\u8c03\u6574\u53c2\u6570host\u548cport\nstore.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false\n# \u6570\u636e\u5e93\u7528\u6237\u540d\nstore.db.user=\n# \u7528\u6237\u540d\u5bc6\u7801\nstore.db.password=\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff082\uff09\u51c6\u5907registry.conf\u6587\u4ef6")),(0,r.kt)("p",null,"nacos\u6ce8\u518c\u4e2d\u5fc3\u3002"),(0,r.kt)("p",null,"\u66f4\u591a\u6ce8\u518c\u4e2d\u5fc3\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://seata.io/zh-cn/docs/user/registry/index.html"},"\u6ce8\u518c\u4e2d\u5fc3")),(0,r.kt)("p",null,"\u66f4\u591a\u914d\u7f6e\u4e2d\u5fc3\u652f\u6301\u53ef\u53c2\u8003",(0,r.kt)("a",{href:"https://seata.io/zh-cn/docs/user/configuration/index.html"},"\u914d\u7f6e\u4e2d\u5fc3")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'registry {\n  type = "nacos"\n  \n  nacos {\n  # seata\u670d\u52a1\u6ce8\u518c\u5728nacos\u4e0a\u7684\u522b\u540d\uff0c\u5ba2\u6237\u7aef\u901a\u8fc7\u8be5\u522b\u540d\u8c03\u7528\u670d\u52a1\n    application = "seata-server"\n  # nacos\u670d\u52a1\u7684ip\u548c\u7aef\u53e3\n    serverAddr = "127.0.0.1:8848"\n  # nacos\u4e0a\u6307\u5b9a\u7684namespace\n    namespace = ""\n    cluster = "default"\n    username = "nacos"\n    password = "nacos"\n  }\n}\n\nconfig {\n  type = "file"\n  \n  file {\n    name="file:/root/seata-config/file.conf"\n  }\n}\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\uff083\uff09\u51c6\u5907docker-compose.yaml\u6587\u4ef6")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u53ea\u8981\u4fdd\u6301\u914d\u7f6e\u4e00\u81f4\uff0cseata\u670d\u52a1\u53ef\u5728\u4e00\u53f0\u673a\u5668\u4e0a\u90e8\u7f72\u591a\u5b9e\u4f8b\uff0c\u4e5f\u53ef\u540c\u65f6\u90e8\u7f72\u5728\u591a\u53f0\u4e0d\u540c\u7684\u4e3b\u673a\u4e0b\u9762\u5b9e\u73b0\u670d\u52a1\u9ad8\u53ef\u7528\u3002\n",(0,r.kt)("a",{parentName:"p",href:"https://seata.io/zh-cn/docs/ops/deploy-ha.html"},"\u9ad8\u53ef\u7528\u90e8\u7f72"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'version: "3.1"\nservices:\n  # seata\u670d\u52a11\n  seata-server-1:\n    image: seataio/seata-server:${latest-release-version}\n    hostname: seata-server\n    ports:\n      - "8091:8091"\n    environment:\n      # \u6307\u5b9aseata\u670d\u52a1\u542f\u52a8\u7aef\u53e3\n      - SEATA_PORT=8091\n      # \u6ce8\u518c\u5230nacos\u4e0a\u7684ip\u3002\u5ba2\u6237\u7aef\u5c06\u901a\u8fc7\u8be5ip\u8bbf\u95eeseata\u670d\u52a1\u3002\n      # \u6ce8\u610f\u516c\u7f51ip\u548c\u5185\u7f51ip\u7684\u5dee\u5f02\u3002\n      - SEATA_IP=127.0.0.1\n      - SEATA_CONFIG_NAME=file:/root/seata-config/registry\n    volumes:\n    # \u9700\u8981\u628afile.conf\u548cregistry.conf\u90fd\u653e\u5230./seata-server/config\u6587\u4ef6\u5939\u4e2d\n      - "./seata-server/config:/root/seata-config"\n  # seata\u670d\u52a12\n  seata-server-2:\n    image: seataio/seata-server:${latest-release-version}\n    hostname: seata-server\n    ports:\n      - "8092:8092"\n    environment:\n      # \u6307\u5b9aseata\u670d\u52a1\u542f\u52a8\u7aef\u53e3\n      - SEATA_PORT=8092\n      # \u6ce8\u518c\u5230nacos\u4e0a\u7684ip\u3002\u5ba2\u6237\u7aef\u5c06\u901a\u8fc7\u8be5ip\u8bbf\u95eeseata\u670d\u52a1\u3002\n      # \u6ce8\u610f\u516c\u7f51ip\u548c\u5185\u7f51ip\u7684\u5dee\u5f02\u3002\n      - SEATA_IP=127.0.0.1\n      - SEATA_CONFIG_NAME=file:/root/seata-config/registry\n    volumes:\n    # \u9700\u8981\u628afile.conf\u548cregistry.conf\u90fd\u653e\u5230./seata-server/config\u6587\u4ef6\u5939\u4e2d\n      - "./seata-server/config:/root/seata-config"\n  \n  # seata\u670d\u52a13......seata\u670d\u52a1N\n')),(0,r.kt)("h2",{id:"\u73af\u5883\u53d8\u91cf"},"\u73af\u5883\u53d8\u91cf"),(0,r.kt)("p",null,"seata-server \u652f\u6301\u4ee5\u4e0b\u73af\u5883\u53d8\u91cf\uff1a "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"SEATA_IP"))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9aseata-server\u542f\u52a8\u7684IP, \u8be5IP\u7528\u4e8e\u5411\u6ce8\u518c\u4e2d\u5fc3\u6ce8\u518c\u65f6\u4f7f\u7528, \u5982eureka\u7b49")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"SEATA_PORT"))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9aseata-server\u542f\u52a8\u7684\u7aef\u53e3, \u9ed8\u8ba4\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"8091"))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"STORE_MODE"))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9aseata-server\u7684\u4e8b\u52a1\u65e5\u5fd7\u5b58\u50a8\u65b9\u5f0f, \u652f\u6301",(0,r.kt)("inlineCode",{parentName:"p"},"db"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"file"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"redis"),"(Seata-Server 1.3\u53ca\u4ee5\u4e0a\u7248\u672c\u652f\u6301), \u9ed8\u8ba4\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"file"))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"SERVER_NODE"))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u7528\u4e8e\u6307\u5b9aseata-server\u8282\u70b9ID, \u5982 ",(0,r.kt)("inlineCode",{parentName:"p"},"1"),",",(0,r.kt)("inlineCode",{parentName:"p"},"2"),",",(0,r.kt)("inlineCode",{parentName:"p"},"3"),"..., \u9ed8\u8ba4\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"\u6839\u636eip\u751f\u6210"))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"SEATA_ENV"))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9a seata-server \u8fd0\u884c\u73af\u5883, \u5982 ",(0,r.kt)("inlineCode",{parentName:"p"},"dev"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"test")," \u7b49, \u670d\u52a1\u542f\u52a8\u65f6\u4f1a\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"registry-dev.conf")," \u8fd9\u6837\u7684\u914d\u7f6e")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"SEATA_CONFIG_NAME"))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u53ef\u9009, \u6307\u5b9a\u914d\u7f6e\u6587\u4ef6\u4f4d\u7f6e, \u5982 ",(0,r.kt)("inlineCode",{parentName:"p"},"file:/root/registry"),", \u5c06\u4f1a\u52a0\u8f7d ",(0,r.kt)("inlineCode",{parentName:"p"},"/root/registry.conf")," \u4f5c\u4e3a\u914d\u7f6e\u6587\u4ef6\uff0c\u5982\u679c\u9700\u8981\u540c\u65f6\u6307\u5b9a ",(0,r.kt)("inlineCode",{parentName:"p"},"file.conf"),"\u6587\u4ef6\uff0c\u9700\u8981\u5c06",(0,r.kt)("inlineCode",{parentName:"p"},"registry.conf"),"\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"config.file.name"),"\u7684\u503c\u6539\u4e3a\u7c7b\u4f3c",(0,r.kt)("inlineCode",{parentName:"p"},"file:/root/file.conf"),"\uff1a")))}u.isMDXComponent=!0}}]);