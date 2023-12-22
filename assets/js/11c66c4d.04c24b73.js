"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[65420],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,k=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(k,i(i({ref:t},c),{},{components:n})):r.createElement(k,i({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},71976:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=n(87462),a=(n(67294),n(3905));const o={hidden:!0,title:"Deploy Seata Server By Docker",keywords:["docker","docker-compose","ops"],description:"Deploy Seata Server by Docker",author:"helloworlde",date:new Date("2019-11-25T00:00:00.000Z")},i="Deploy Seata Server By Docker",l={unversionedId:"ops/deploy-by-docker-142",id:"version-v1.3/ops/deploy-by-docker-142",title:"Deploy Seata Server By Docker",description:"Deploy Seata Server by Docker",source:"@site/i18n/en/docusaurus-plugin-content-docs/version-v1.3/ops/deploy-by-docker-142.md",sourceDirName:"ops",slug:"/ops/deploy-by-docker-142",permalink:"/docs/v1.3/ops/deploy-by-docker-142",draft:!1,tags:[],version:"v1.3",frontMatter:{hidden:!0,title:"Deploy Seata Server By Docker",keywords:["docker","docker-compose","ops"],description:"Deploy Seata Server by Docker",author:"helloworlde",date:"2019-11-25T00:00:00.000Z"},sidebar:"docs",previous:{title:"Deploy Server",permalink:"/docs/v1.3/ops/deploy-server"},next:{title:"Deploy Seata Server By Docker Compose",permalink:"/docs/v1.3/ops/deploy-by-docker-compose-142"}},s={},p=[{value:"Precautions",id:"precautions",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Start seata-server instance",id:"start-seata-server-instance",level:4},{value:"Specify seata-server IP and port to start",id:"specify-seata-server-ip-and-port-to-start",level:4},{value:"Docker compose startup",id:"docker-compose-startup",level:4},{value:"Container command line and view logs",id:"container-command-line-and-view-logs",level:2},{value:"Use custom configuration file",id:"use-custom-configuration-file",level:2},{value:"Environment variables",id:"environment-variables",level:2}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"deploy-seata-server-by-docker"},"Deploy Seata Server By Docker"),(0,a.kt)("h2",{id:"precautions"},"Precautions"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Please avoid directly pulling the latest version image. The latest version is not necessarily a stable version. To avoid unnecessary problems, please go to ",(0,a.kt)("a",{parentName:"li",href:"https://hub.docker.com/r/seataio/seata-server/tags"},"docker image warehouse")," to determine the image version to be pulled.")),(0,a.kt)("h2",{id:"quick-start"},"Quick Start"),(0,a.kt)("h4",{id:"start-seata-server-instance"},"Start seata-server instance"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker run --name seata-server -p 8091:8091 seataio/seata-server:1.4.2\n")),(0,a.kt)("h4",{id:"specify-seata-server-ip-and-port-to-start"},"Specify seata-server IP and port to start"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker run --name seata-server \\\n         -p 8091:8091 \\\n         -e SEATA_IP=192.168.1.1 \\\n         -e SEATA_PORT=8091 \\\n         seataio/seata-server\n")),(0,a.kt)("h4",{id:"docker-compose-startup"},"Docker compose startup"),(0,a.kt)("p",null,"Take ",(0,a.kt)("inlineCode",{parentName:"p"},"docker-compose.yaml")," for example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'version: "3"\nservices:\n   seata-server:\n     image: seataio/seata-server:${latest-release-version}\n     hostname: seata-server\n     ports:\n       - "8091:8091"\n     environment:\n       - SEATA_PORT=8091\n       - STORE_MODE=file\n')),(0,a.kt)("h2",{id:"container-command-line-and-view-logs"},"Container command line and view logs"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker exec -it seata-server sh\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker logs -f seata-server\n")),(0,a.kt)("h2",{id:"use-custom-configuration-file"},"Use custom configuration file"),(0,a.kt)("p",null,"Custom configuration files need to be implemented by mounting files. Mount ",(0,a.kt)("inlineCode",{parentName:"p"},"registry.conf")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"file.conf")," on the host to the corresponding directory in the container."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Specify registry.conf")),(0,a.kt)("p",null,"When using a custom configuration file, the environment variable ",(0,a.kt)("inlineCode",{parentName:"p"},"SEATA_CONFIG_NAME")," must be specified, and the value needs to start with ",(0,a.kt)("inlineCode",{parentName:"p"},"file:"),", such as: ",(0,a.kt)("inlineCode",{parentName:"p"},"file:/root/seata-config/registry")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker run --name seata-server \\\n         -p 8091:8091 \\\n         -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \\\n         -v /User/seata/config:/root/seata-config \\\n         seataio/seata-server\n")),(0,a.kt)("p",null,"Among them ",(0,a.kt)("inlineCode",{parentName:"p"},"-e")," is used to configure environment variables, ",(0,a.kt)("inlineCode",{parentName:"p"},"-v")," is used to mount the host directory."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Specify file.conf")),(0,a.kt)("p",null,"If you also need to specify the ",(0,a.kt)("inlineCode",{parentName:"p"},"file.conf")," configuration file at the same time, you need to change the ",(0,a.kt)("inlineCode",{parentName:"p"},"config")," configuration in the ",(0,a.kt)("inlineCode",{parentName:"p"},"registry.conf")," file to the following content. The value of ",(0,a.kt)("inlineCode",{parentName:"p"},"name")," is the corresponding path in the container."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'config {\n   type = "file"\n\n   file {\n     name = "file:/root/seata-config/file.conf"\n   }\n}\n')),(0,a.kt)("h2",{id:"environment-variables"},"Environment variables"),(0,a.kt)("p",null,"seata-server supports the following environment variables:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SEATA_IP"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Optional. It specifies the IP started by seata-server. This IP is used when registering with the registration center, such as eureka, etc.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SEATA_PORT"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Optional. It is used to specify the port where seata-server starts. The default port is ",(0,a.kt)("inlineCode",{parentName:"p"},"8091"),".")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"STORE_MODE"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Optional. It is used to specify the transaction log storage method of seata-server, supports ",(0,a.kt)("inlineCode",{parentName:"p"},"db"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"file"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"redis")," (supported by Seata-Server 1.3 and above). The default value is ",(0,a.kt)("inlineCode",{parentName:"p"},"file"),".")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SERVER_NODE"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Optional. It is used to specify the seata-server node ID, such as ",(0,a.kt)("inlineCode",{parentName:"p"},"1"),",",(0,a.kt)("inlineCode",{parentName:"p"},"2"),",",(0,a.kt)("inlineCode",{parentName:"p"},"3"),"... The default value is ",(0,a.kt)("inlineCode",{parentName:"p"},"generated based on ip"),".")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SEATA_ENV"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Optional. It is used to specify the seata-server operating environment, such as ",(0,a.kt)("inlineCode",{parentName:"p"},"dev"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"test"),", etc. When the service is started, configurations such as ",(0,a.kt)("inlineCode",{parentName:"p"},"registry-dev.conf")," will be used.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SEATA_CONFIG_NAME"))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Optional. It is used to specify the configuration file location, such as ",(0,a.kt)("inlineCode",{parentName:"p"},"file:/root/registry"),", which will load ",(0,a.kt)("inlineCode",{parentName:"p"},"/root/registry.conf")," as the configuration file. If you need to specify the ",(0,a.kt)("inlineCode",{parentName:"p"},"file.conf")," file at the same time, you need to change the value of ",(0,a.kt)("inlineCode",{parentName:"p"},"config.file.name")," in ",(0,a.kt)("inlineCode",{parentName:"p"},"registry.conf")," to something like ",(0,a.kt)("inlineCode",{parentName:"p"},"file:/root/file.conf"),".")))}d.isMDXComponent=!0}}]);