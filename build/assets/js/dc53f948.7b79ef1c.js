"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[46276],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(n),f=o,m=u["".concat(s,".").concat(f)]||u[f]||y[f]||a;return n?r.createElement(m,l(l({ref:t},c),{},{components:n})):r.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},98658:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>y,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var r=n(87462),o=(n(67294),n(3905));const a={hidden:!0,title:"Deploy Seata Server By Helm",keywords:["kubernetes","helm","ops"],description:"Deploy Seata Server By Helm",author:"helloworlde",date:new Date("2019-12-01T00:00:00.000Z")},l="Deploy Seata Server By Helm",i={unversionedId:"ops/deploy-by-helm",id:"ops/deploy-by-helm",title:"Deploy Seata Server By Helm",description:"Deploy Seata Server By Helm",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/ops/deploy-by-helm.md",sourceDirName:"ops",slug:"/ops/deploy-by-helm",permalink:"/docs/next/ops/deploy-by-helm",draft:!1,tags:[],version:"current",frontMatter:{hidden:!0,title:"Deploy Seata Server By Helm",keywords:["kubernetes","helm","ops"],description:"Deploy Seata Server By Helm",author:"helloworlde",date:"2019-12-01T00:00:00.000Z"},sidebar:"docs",previous:{title:"Deploy Seata Server By Kubernetes",permalink:"/docs/next/ops/deploy-by-kubernetes"},next:{title:"High Available Usage Deployment",permalink:"/docs/next/ops/deploy-ha"}},s={},p=[{value:"Quick start",id:"quick-start",level:3},{value:"Custom configuration",id:"custom-configuration",level:2},{value:"Environment",id:"environment",level:3},{value:"Use specify configuration file",id:"use-specify-configuration-file",level:3}],c={toc:p},u="wrapper";function y(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"deploy-seata-server-by-helm"},"Deploy Seata Server By Helm"),(0,o.kt)("h3",{id:"quick-start"},"Quick start"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ cd ./script/server/helm/seata-server\n$ helm install seata-server ./seata-server\n")),(0,o.kt)("h2",{id:"custom-configuration"},"Custom configuration"),(0,o.kt)("h3",{id:"environment"},"Environment"),(0,o.kt)("p",null,"The environment is same with Docker, can reference ",(0,o.kt)("a",{parentName:"p",href:"./deploy-by-docker"},"Deploy Seata Server By Docker")),(0,o.kt)("h3",{id:"use-specify-configuration-file"},"Use specify configuration file"),(0,o.kt)("p",null,"Can specify configuration file by mount files, like mount files under ",(0,o.kt)("inlineCode",{parentName:"p"},"/root/workspace/seata/seata-config/file")," to pod. And need specify environment ",(0,o.kt)("inlineCode",{parentName:"p"},"SEATA_CONFIG_NAME")," also, the value need start with ",(0,o.kt)("inlineCode",{parentName:"p"},"file:"),", like ",(0,o.kt)("inlineCode",{parentName:"p"},"file:/root/seata-config/registry")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Values.yaml")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'replicaCount: 1\n\nnamespace: default\n\nimage:\n  repository: seataio/seata-server\n  tag: latest\n  pullPolicy: IfNotPresent\n\nservice:\n  type: NodePort\n  port: 30091\n\nenv:\n  seataPort: "8091"\n  storeMode: "file"\n  seataIp: "127.0.0.1"\n  seataConfigName: "file:/root/seata-config/registry"\n\nvolume:\n  - name: seata-config\n    mountPath: /root/seata-config\n    hostPath: /root/workspace/seata/seata-config/file\n')))}y.isMDXComponent=!0}}]);