"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[86374],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>h});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},s=Object.keys(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),m=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=m(e.components);return a.createElement(c.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,s=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),p=m(r),d=n,h=p["".concat(c,".").concat(d)]||p[d]||u[d]||s;return r?a.createElement(h,o(o({ref:t},l),{},{components:r})):a.createElement(h,o({ref:t},l))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=r.length,o=new Array(s);o[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:n,o[1]=i;for(var m=2;m<s;m++)o[m]=r[m];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},29209:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>m});var a=r(87462),n=(r(67294),r(3905));const s={title:"Prometheus",keywords:["Seata"],description:"Seata\u652f\u6301\u5728TC\u5f00\u542fMetrics\u6570\u636e\u91c7\u96c6\u5e76\u8f93\u51fa\u5230Prometheus\u76d1\u63a7\u7cfb\u7edf\u4e2d\u3002"},o="Prometheus Metrics \u914d\u7f6e\u6307\u5357",i={unversionedId:"user/apm/prometheus",id:"version-v1.0/user/apm/prometheus",title:"Prometheus",description:"Seata\u652f\u6301\u5728TC\u5f00\u542fMetrics\u6570\u636e\u91c7\u96c6\u5e76\u8f93\u51fa\u5230Prometheus\u76d1\u63a7\u7cfb\u7edf\u4e2d\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-v1.0/user/apm/prometheus.md",sourceDirName:"user/apm",slug:"/user/apm/prometheus",permalink:"/zh-cn/docs/v1.0/user/apm/prometheus",draft:!1,tags:[],version:"v1.0",frontMatter:{title:"Prometheus",keywords:["Seata"],description:"Seata\u652f\u6301\u5728TC\u5f00\u542fMetrics\u6570\u636e\u91c7\u96c6\u5e76\u8f93\u51fa\u5230Prometheus\u76d1\u63a7\u7cfb\u7edf\u4e2d\u3002"},sidebar:"docs",previous:{title:"SkyWalking",permalink:"/zh-cn/docs/v1.0/user/apm/skywalking"},next:{title:"\u6027\u80fd\u6d4b\u8bd5\u62a5\u544a",permalink:"/zh-cn/docs/v1.0/user/performance"}},c={},m=[{value:"\u5728 TC \u4e2d\u914d\u7f6e\u5f00\u542f Metrics",id:"\u5728-tc-\u4e2d\u914d\u7f6e\u5f00\u542f-metrics",level:3},{value:"\u6b65\u9aa4\u4e00\uff1a\u6253\u5f00 TC \u4e2d Metrics \u7684\u914d\u7f6e\u9879",id:"\u6b65\u9aa4\u4e00\u6253\u5f00-tc-\u4e2d-metrics-\u7684\u914d\u7f6e\u9879",level:4},{value:"\u6b65\u9aa4\u4e8c\uff1a\u4fee\u6539Prometheus\u914d\u7f6e\u6587\u4ef6\u5e76\u542f\u52a8Prometheus",id:"\u6b65\u9aa4\u4e8c\u4fee\u6539prometheus\u914d\u7f6e\u6587\u4ef6\u5e76\u542f\u52a8prometheus",level:4},{value:"\u6b65\u9aa4\u4e09\uff1a\u5728Prometheus UI\u6216Grafana\u4e2d\u67e5\u770bSeata TC\u7684Metrics",id:"\u6b65\u9aa4\u4e09\u5728prometheus-ui\u6216grafana\u4e2d\u67e5\u770bseata-tc\u7684metrics",level:4}],l={toc:m},p="wrapper";function u(e){let{components:t,...r}=e;return(0,n.kt)(p,(0,a.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"prometheus-metrics-\u914d\u7f6e\u6307\u5357"},"Prometheus Metrics \u914d\u7f6e\u6307\u5357"),(0,n.kt)("p",null,"Seata\u652f\u6301\u5728TC\u5f00\u542fMetrics\u6570\u636e\u91c7\u96c6\u5e76\u8f93\u51fa\u5230Prometheus\u76d1\u63a7\u7cfb\u7edf\u4e2d\u3002"),(0,n.kt)("h3",{id:"\u5728-tc-\u4e2d\u914d\u7f6e\u5f00\u542f-metrics"},"\u5728 TC \u4e2d\u914d\u7f6e\u5f00\u542f Metrics"),(0,n.kt)("h4",{id:"\u6b65\u9aa4\u4e00\u6253\u5f00-tc-\u4e2d-metrics-\u7684\u914d\u7f6e\u9879"},"\u6b65\u9aa4\u4e00\uff1a\u6253\u5f00 TC \u4e2d Metrics \u7684\u914d\u7f6e\u9879"),(0,n.kt)("p",null,"Seata Server \u5df2\u7ecf\u5305\u542b\u4e86 metrics(seata-metrics-all)\u4f9d\u8d56, \u4f46\u662f\u9ed8\u8ba4\u662f\u5173\u95ed\u72b6\u6001\uff0c\u9700\u8981\u5f00\u542f metrics \u7684\u91c7\u96c6\u914d\u7f6e\u3002"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yml"},"seata:\n  metrics:\n    enabled: true\n    registry-type: compact\n    exporter-list: prometheus\n    exporter-prometheus-port: 9898\n\n")),(0,n.kt)("p",null,"\u8f93\u5165",(0,n.kt)("inlineCode",{parentName:"p"},"http://tc-server-ip:9898/metrics"),"\uff0c\u5373\u53ef\u83b7\u5f97\u6700\u65b0\u7684Metrics\u6570\u636e\uff0c\u4f8b\u5982\uff1a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'# HELP seata seata\n# TYPE seata untyped\nseata_transaction{meter="counter",role="tc",status="committed",} 1358.0 1551946035372\nseata_transaction{meter="counter",role="tc",status="active",} 0.0 1551946035372\nseata_transaction{meter="summary",role="tc",statistic="count",status="committed",} 6.0 1551946035372\nseata_transaction{meter="summary",role="tc",statistic="total",status="committed",} 6.0 1551946035372\nseata_transaction{meter="summary",role="tc",statistic="tps",status="committed",} 1.6163793103448276 1551946035372\nseata_transaction{meter="timer",role="tc",statistic="count",status="committed",} 6.0 1551946035372\nseata_transaction{meter="timer",role="tc",statistic="total",status="committed",} 910.0 1551946035372\nseata_transaction{meter="timer",role="tc",statistic="max",status="committed",} 164.0 1551946035372\nseata_transaction{meter="timer",role="tc",statistic="average",status="committed",} 151.66666666666666 1551946035372\n')),(0,n.kt)("p",null,"\u5f97\u5230\u4ee5\u4e0a\u7c7b\u4f3c\u6570\u636e\u8bc1\u660emertric\u5f00\u542f\u6210\u529f\u3002"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u63d0\u793a\uff1a"),(0,n.kt)("ol",{parentName:"blockquote"},(0,n.kt)("li",{parentName:"ol"},"\u5982\u679c\u67d0\u4e9bTransaction\u72b6\u6001\u6ca1\u6709\u53d1\u751f\uff0c\u4f8b\u5982rollback\uff0c\u90a3\u4e48\u5bf9\u5e94\u7684Metrics\u6307\u6807\u4e5f\u4e0d\u4f1a\u5b58\u5728\uff08\u8f93\u51fa\uff09\u3002"))),(0,n.kt)("h4",{id:"\u6b65\u9aa4\u4e8c\u4fee\u6539prometheus\u914d\u7f6e\u6587\u4ef6\u5e76\u542f\u52a8prometheus"},"\u6b65\u9aa4\u4e8c\uff1a\u4fee\u6539Prometheus\u914d\u7f6e\u6587\u4ef6\u5e76\u542f\u52a8Prometheus"),(0,n.kt)("p",null,"\u6253\u5f00Prometheus\u7684\u914d\u7f6e\u6587\u4ef6 ",(0,n.kt)("inlineCode",{parentName:"p"},"prometheus.yml"),"\uff0c\u5728 ",(0,n.kt)("inlineCode",{parentName:"p"},"scrape_configs")," \u4e2d\u589e\u52a0\u4e00\u9879\u6293\u53d6Seata TC\u7684Metrics\u6570\u636e\uff1a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"scrape_configs:\n  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.\n  - job_name: 'prometheus'\n\n    # metrics_path defaults to '/metrics'\n    # scheme defaults to 'http'.\n\n    static_configs:\n    - targets: ['localhost:9090']\n\n  - job_name: 'seata'\n\n    # metrics_path defaults to '/metrics'\n    # scheme defaults to 'http'.\n\n    static_configs:\n    - targets: ['tc-server-ip:9898']\n")),(0,n.kt)("h4",{id:"\u6b65\u9aa4\u4e09\u5728prometheus-ui\u6216grafana\u4e2d\u67e5\u770bseata-tc\u7684metrics"},"\u6b65\u9aa4\u4e09\uff1a\u5728Prometheus UI\u6216Grafana\u4e2d\u67e5\u770bSeata TC\u7684Metrics"),(0,n.kt)("p",null,"\u5728\u6d4f\u89c8\u5668\u4e2d\u6253\u5f00Prometheus UI",(0,n.kt)("inlineCode",{parentName:"p"},"http://localhost:9090/graph"),"\uff0c\u9009\u62e9",(0,n.kt)("inlineCode",{parentName:"p"},"seata_transaction"),"\uff0c\u70b9\u51fb\u67e5\u8be2\uff0c\u5373\u53ef\u83b7\u53d6\u5230\u6700\u65b0\u6570\u636e\uff1a"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://img.alicdn.com/imgextra/i2/O1CN01r6916n1DiXhwH07dj_!!6000000000250-2-tps-1698-959.png",alt:"tc-prometheus"})),(0,n.kt)("p",null,"\u63a8\u8350\u5728Prometheus\u4e2d\u7ed3\u5408\u914d\u7f6e",(0,n.kt)("a",{parentName:"p",href:"https://prometheus.io/docs/visualization/grafana/"},"Grafana"),"\u83b7\u5f97\u66f4\u597d\u7684\u67e5\u8be2\u6548\u679c\uff1a"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://img.alicdn.com/imgextra/i2/O1CN01IdJk5G25B62KpD5If_!!6000000007487-2-tps-1694-973.png",alt:"tc-grafana"})),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u63d0\u793a\uff1a\u6b64\u914d\u7f6e\u662f\u5c06Prometheus\u4f5c\u4e3aGrafana\u7684\u6570\u636e\u6e90\uff0c\u56e0\u6b64\u6570\u636e\u5b8c\u5168\u76f8\u540c\uff0c\u53ea\u662f\u4f7f\u7528Grafana\u663e\u793a\u6548\u679c\u66f4\u4f73\u3002")))}u.isMDXComponent=!0}}]);