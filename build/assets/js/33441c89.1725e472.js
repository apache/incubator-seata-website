"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[3007],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>b});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=r.createContext({}),p=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(a),d=n,b=c["".concat(i,".").concat(d)]||c[d]||m[d]||l;return a?r.createElement(b,o(o({ref:t},u),{},{components:a})):r.createElement(b,o({ref:t},u))}));function b(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[c]="string"==typeof e?e:n,o[1]=s;for(var p=2;p<l;p++)o[p]=a[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},53988:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var r=a(87462),n=(a(67294),a(3905));const l={title:"Mac\u4e0b\u7684Seata Demo\u73af\u5883\u642d\u5efa\uff08AT\u6a21\u5f0f\uff09",author:"portman xu",date:"2020/07/20",keywords:["seata","\u5206\u5e03\u5f0f\u4e8b\u52a1","demo","mac","at"]},o="Mac\u4e0b\u7684Seata Demo\u73af\u5883\u642d\u5efa\uff08AT\u6a21\u5f0f\uff09",s={permalink:"/blog/seata-at-demo-in-mac",source:"@site/blog/seata-at-demo-in-mac.md",title:"Mac\u4e0b\u7684Seata Demo\u73af\u5883\u642d\u5efa\uff08AT\u6a21\u5f0f\uff09",description:"\u524d\u8a00",date:"2020-07-20T00:00:00.000Z",formattedDate:"July 20, 2020",tags:[],readingTime:8.785,hasTruncateMarker:!1,authors:[{name:"portman xu"}],frontMatter:{title:"Mac\u4e0b\u7684Seata Demo\u73af\u5883\u642d\u5efa\uff08AT\u6a21\u5f0f\uff09",author:"portman xu",date:"2020/07/20",keywords:["seata","\u5206\u5e03\u5f0f\u4e8b\u52a1","demo","mac","at"]},prevItem:{title:"\u5206\u5e03\u5f0f\u4e8b\u52a1Seata\u6e90\u7801-Client\u7aef\u542f\u52a8\u6d41\u7a0b",permalink:"/blog/seata-sourcecode-client-bootstrap"},nextItem:{title:"Seata RPC \u6a21\u5757\u7684\u91cd\u6784\u4e4b\u8def",permalink:"/blog/seata-rpc-refactor"}},i={authorsImageUrls:[void 0]},p=[{value:"\u524d\u8a00",id:"\u524d\u8a00",level:2},{value:"Seata\u603b\u89c8",id:"seata\u603b\u89c8",level:2},{value:"cloc\u4ee3\u7801\u7edf\u8ba1",id:"cloc\u4ee3\u7801\u7edf\u8ba1",level:3},{value:"\u4ee3\u7801\u8d28\u91cf",id:"\u4ee3\u7801\u8d28\u91cf",level:3},{value:"Demo\u4ee3\u7801",id:"demo\u4ee3\u7801",level:3},{value:"\u89e3\u51b3\u7684\u6838\u5fc3\u95ee\u9898",id:"\u89e3\u51b3\u7684\u6838\u5fc3\u95ee\u9898",level:2},{value:"\u89e3\u51b3\u65b9\u6848",id:"\u89e3\u51b3\u65b9\u6848",level:2},{value:"Demo\u4ee3\u7801\u7ed3\u6784",id:"demo\u4ee3\u7801\u7ed3\u6784",level:2},{value:"\u65f6\u5e8f\u56fe",id:"\u65f6\u5e8f\u56fe",level:3},{value:"\u8fd0\u884cDemo",id:"\u8fd0\u884cdemo",level:2},{value:"MySQL",id:"mysql",level:3},{value:"\u5efa\u8868",id:"\u5efa\u8868",level:3},{value:"ZooKeeper",id:"zookeeper",level:3},{value:"\u542f\u52a8TC\u4e8b\u52a1\u534f\u8c03\u5668",id:"\u542f\u52a8tc\u4e8b\u52a1\u534f\u8c03\u5668",level:3},{value:"IDE\u4e2d\u542f\u52a8\u6a21\u62df\u7684\u5fae\u670d\u52a1",id:"ide\u4e2d\u542f\u52a8\u6a21\u62df\u7684\u5fae\u670d\u52a1",level:3},{value:"\u4f7f\u7528Business\u9a8c\u8bc1\u6548\u679c",id:"\u4f7f\u7528business\u9a8c\u8bc1\u6548\u679c",level:3},{value:"\u6b63\u5e38\u60c5\u51b5",id:"\u6b63\u5e38\u60c5\u51b5",level:4},{value:"\u5f02\u5e38\u60c5\u51b5",id:"\u5f02\u5e38\u60c5\u51b5",level:4},{value:"\u5f85\u601d\u8003\u95ee\u9898",id:"\u5f85\u601d\u8003\u95ee\u9898",level:2},{value:"\u53c2\u8003\u6587\u732e",id:"\u53c2\u8003\u6587\u732e",level:2},{value:"\u4f5c\u8005\u4fe1\u606f",id:"\u4f5c\u8005\u4fe1\u606f",level:2}],u={toc:p},c="wrapper";function m(e){let{components:t,...a}=e;return(0,n.kt)(c,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,n.kt)("p",null,"\u6700\u8fd1\u56e0\u4e3a\u5de5\u4f5c\u9700\u8981\uff0c\u7814\u7a76\u5b66\u4e60\u4e86Seata\u5206\u5e03\u5f0f\u4e8b\u52a1\u6846\u67b6\uff0c\u672c\u6587\u628a\u81ea\u5df1\u5b66\u4e60\u7684\u77e5\u8bc6\u8bb0\u5f55\u4e00\u4e0b"),(0,n.kt)("h2",{id:"seata\u603b\u89c8"},"Seata\u603b\u89c8"),(0,n.kt)("h3",{id:"cloc\u4ee3\u7801\u7edf\u8ba1"},"cloc\u4ee3\u7801\u7edf\u8ba1"),(0,n.kt)("p",null,"\u5148\u770b\u4e00\u4e0bseata\u9879\u76eecloc\u4ee3\u7801\u7edf\u8ba1\uff08\u622a\u6b62\u52302020-07-20\uff09"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/cloc-seata.png?raw=true",alt:"cloc-seata"})),(0,n.kt)("p",null,"Java\u4ee3\u7801\u884c\u6570\u5927\u7ea6\u662f 97K"),(0,n.kt)("h3",{id:"\u4ee3\u7801\u8d28\u91cf"},"\u4ee3\u7801\u8d28\u91cf"),(0,n.kt)("p",null,"\u5355\u5143\u6d4b\u8bd5\u8986\u76d6\u738750%"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/coverage.png?raw=true",alt:"cloc-seata"})),(0,n.kt)("h3",{id:"demo\u4ee3\u7801"},"Demo\u4ee3\u7801"),(0,n.kt)("p",null,"\u672c\u6587\u8bb2\u7684Demo\u4ee3\u7801\u662fseata-samples\u9879\u76ee\u4e0b\u7684seata-samples-dubbo\u6a21\u5757\uff0c\u5730\u5740\u5982\u4e0b\uff1a"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/seata/seata-samples/tree/master/dubbo"},"https://github.com/seata/seata-samples/tree/master/dubbo")),(0,n.kt)("h2",{id:"\u89e3\u51b3\u7684\u6838\u5fc3\u95ee\u9898"},"\u89e3\u51b3\u7684\u6838\u5fc3\u95ee\u9898"),(0,n.kt)("p",null,"AT\u6a21\u5f0f\u7684Demo\u4f8b\u5b50\u7ed9\u51fa\u4e86\u4e00\u4e2a\u5178\u578b\u7684\u5206\u5e03\u5f0f\u4e8b\u52a1\u573a\u666f\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5728\u4e00\u4e2a\u91c7\u8d2d\u4ea4\u6613\u4e2d\uff0c\u9700\u8981\uff1a")),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u6263\u51cf\u5546\u54c1\u5e93\u5b58"),(0,n.kt)("li",{parentName:"ol"},"\u6263\u51cf\u7528\u6237\u8d26\u53f7\u4f59\u989d"),(0,n.kt)("li",{parentName:"ol"},"\u751f\u6210\u91c7\u8d2d\u8ba2\u5355")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5f88\u660e\u663e\uff0c\u4ee5\u4e0a3\u4e2a\u6b65\u9aa4\u5fc5\u987b\uff1a\u8981\u4e48\u5168\u90e8\u6210\u529f\uff0c\u8981\u4e48\u5168\u90e8\u5931\u8d25\uff0c\u5426\u5219\u7cfb\u7edf\u7684\u6570\u636e\u4f1a\u9519\u4e71"),(0,n.kt)("li",{parentName:"ul"},"\u800c\u73b0\u5728\u6d41\u884c\u7684\u5fae\u670d\u52a1\u67b6\u6784\uff0c\u4e00\u822c\u6765\u8bf4\uff0c\u5e93\u5b58\uff0c\u8d26\u53f7\u4f59\u989d\uff0c\u8ba2\u5355\u662f3\u4e2a\u72ec\u7acb\u7684\u7cfb\u7edf"),(0,n.kt)("li",{parentName:"ul"},"\u6bcf\u4e2a\u5fae\u670d\u52a1\u6709\u81ea\u5df1\u7684\u6570\u636e\u5e93\uff0c\u76f8\u4e92\u72ec\u7acb")),(0,n.kt)("p",null,"\u8fd9\u91cc\u5c31\u662f\u5206\u5e03\u5f0f\u4e8b\u52a1\u7684\u573a\u666f\u3002"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"http://seata.io/img/architecture.png",alt:"\u8bbe\u8ba1\u56fe"})),(0,n.kt)("h2",{id:"\u89e3\u51b3\u65b9\u6848"},"\u89e3\u51b3\u65b9\u6848"),(0,n.kt)("p",null,"AT\u6a21\u5f0f\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\u7684\u601d\u8def\u5176\u5b9e\u5f88\u7b80\u5355\uff0c\u4e00\u53e5\u8bdd\u6982\u62ec\u5c31\u662f\uff1a"),(0,n.kt)("p",null,"\u5728\u5206\u5e03\u5f0f\u4e8b\u52a1\u8fc7\u7a0b\u4e2d\uff0c\u8bb0\u5f55\u5f85\u4fee\u6539\u7684\u6570\u636e\u4fee\u6539\u524d\u548c\u4fee\u6539\u540e\u7684\u503c\u5230undo_log\u8868\uff0c\u4e07\u4e00\u4ea4\u6613\u4e2d\u51fa\u73b0\u5f02\u5e38\uff0c\u901a\u8fc7\u8fd9\u4e2a\u91cc\u7684\u6570\u636e\u505a\u56de\u6eda"),(0,n.kt)("p",null,"\u5f53\u7136\uff0c\u5177\u4f53\u4ee3\u7801\u5b9e\u73b0\u8d77\u6765\uff0c\u6211\u76f8\u4fe1\u5f88\u591a\u7ec6\u8282\u8fdc\u6ca1\u8fd9\u4e48\u7b80\u5355\u3002"),(0,n.kt)("h2",{id:"demo\u4ee3\u7801\u7ed3\u6784"},"Demo\u4ee3\u7801\u7ed3\u6784"),(0,n.kt)("p",null,"\u4ecegithub\u4e0aclone\u6700\u65b0\u7684\u4ee3\u7801"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"git clone git@github.com:seata/seata-samples.git\n")),(0,n.kt)("p",null,"\u9605\u8bfbDemo\u4ee3\u7801\u7ed3\u6784"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"$ cd seata-samples/dubbo/\n$ tree -C  -I 'target' .\n.\n\u251c\u2500\u2500 README.md\n\u251c\u2500\u2500 pom.xml\n\u251c\u2500\u2500 seata-samples-dubbo.iml\n\u2514\u2500\u2500 src\n    \u2514\u2500\u2500 main\n        \u251c\u2500\u2500 java\n        \u2502   \u2514\u2500\u2500 io\n        \u2502       \u2514\u2500\u2500 seata\n        \u2502           \u2514\u2500\u2500 samples\n        \u2502               \u2514\u2500\u2500 dubbo\n        \u2502                   \u251c\u2500\u2500 ApplicationKeeper.java\n        \u2502                   \u251c\u2500\u2500 Order.java\n        \u2502                   \u251c\u2500\u2500 service\n        \u2502                   \u2502   \u251c\u2500\u2500 AccountService.java\n        \u2502                   \u2502   \u251c\u2500\u2500 BusinessService.java\n        \u2502                   \u2502   \u251c\u2500\u2500 OrderService.java\n        \u2502                   \u2502   \u251c\u2500\u2500 StorageService.java\n        \u2502                   \u2502   \u2514\u2500\u2500 impl\n        \u2502                   \u2502       \u251c\u2500\u2500 AccountServiceImpl.java\n        \u2502                   \u2502       \u251c\u2500\u2500 BusinessServiceImpl.java\n        \u2502                   \u2502       \u251c\u2500\u2500 OrderServiceImpl.java\n        \u2502                   \u2502       \u2514\u2500\u2500 StorageServiceImpl.java\n        \u2502                   \u2514\u2500\u2500 starter\n        \u2502                       \u251c\u2500\u2500 DubboAccountServiceStarter.java\n        \u2502                       \u251c\u2500\u2500 DubboBusinessTester.java\n        \u2502                       \u251c\u2500\u2500 DubboOrderServiceStarter.java\n        \u2502                       \u2514\u2500\u2500 DubboStorageServiceStarter.java\n        \u2514\u2500\u2500 resources\n            \u251c\u2500\u2500 file.conf\n            \u251c\u2500\u2500 jdbc.properties\n            \u251c\u2500\u2500 log4j.properties\n            \u251c\u2500\u2500 registry.conf\n            \u251c\u2500\u2500 spring\n            \u2502   \u251c\u2500\u2500 dubbo-account-service.xml\n            \u2502   \u251c\u2500\u2500 dubbo-business.xml\n            \u2502   \u251c\u2500\u2500 dubbo-order-service.xml\n            \u2502   \u2514\u2500\u2500 dubbo-storage-service.xml\n            \u2514\u2500\u2500 sql\n                \u251c\u2500\u2500 dubbo_biz.sql\n                \u2514\u2500\u2500 undo_log.sql\n\n13 directories, 27 files\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"\u5728io.seata.samples.dubbo.starter\u5305\u4e0b\u76844\u4e2a","*","Starter\u7c7b\uff0c\u5206\u522b\u6a21\u62df\u4e0a\u9762\u6240\u8ff0\u76844\u4e2a\u5fae\u670d\u52a1"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Account"),(0,n.kt)("li",{parentName:"ul"},"Business"),(0,n.kt)("li",{parentName:"ul"},"Order"),(0,n.kt)("li",{parentName:"ul"},"Storage"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"4\u4e2a\u670d\u52a1\u90fd\u662f\u6807\u51c6\u7684dubbo\u670d\u52a1\uff0c\u914d\u7f6e\u6587\u4ef6\u5728seata-samples/dubbo/src/main/resources/spring\u76ee\u5f55\u4e0b")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"\u8fd0\u884cdemo\u9700\u8981\u628a\u8fd94\u4e2a\u670d\u52a1\u90fd\u542f\u52a8\u8d77\u6765\uff0cBusiness\u6700\u540e\u542f\u52a8")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"\u4e3b\u8981\u7684\u903b\u8f91\u5728io.seata.samples.dubbo.service\uff0c4\u4e2a\u5b9e\u73b0\u7c7b\u5206\u522b\u5bf9\u5e944\u4e2a\u5fae\u670d\u52a1\u7684\u4e1a\u52a1\u903b\u8f91")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"\u6570\u636e\u5e93\u4fe1\u606f\u7684\u914d\u7f6e\u6587\u4ef6\uff1asrc/main/resources/jdbc.properties"))),(0,n.kt)("h3",{id:"\u65f6\u5e8f\u56fe"},"\u65f6\u5e8f\u56fe"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/timing-diagram.png?raw=true",alt:"cloc-seata"})),(0,n.kt)("p",null,"Ok, \u8d76\u7d27\u52a8\u624b, Make It Happen!"),(0,n.kt)("h2",{id:"\u8fd0\u884cdemo"},"\u8fd0\u884cDemo"),(0,n.kt)("h3",{id:"mysql"},"MySQL"),(0,n.kt)("h3",{id:"\u5efa\u8868"},"\u5efa\u8868"),(0,n.kt)("p",null,"\u6267\u884cseata-samples/dubbo/src/main/resources/sql\u7684\u811a\u672cdubbo_biz.sql\u548cundo_log.sql"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"mysql> show tables;\n+-----------------+\n| Tables_in_seata |\n+-----------------+\n| account_tbl     |\n| order_tbl       |\n| storage_tbl     |\n| undo_log        |\n+-----------------+\n4 rows in set (0.01 sec)\n")),(0,n.kt)("p",null,"\u6267\u884c\u5b8c\u4e4b\u540e\uff0c\u6570\u636e\u5e93\u91cc\u5e94\u8be5\u67094\u4e2a\u8868"),(0,n.kt)("p",null,"\u4fee\u6539seata-samples/dubbo/src/main/resources/jdbc.properties\u6587\u4ef6"),(0,n.kt)("p",null,"\u6839\u636e\u4f60MySQL\u8fd0\u884c\u7684\u73af\u5883\u4fee\u6539\u53d8\u91cf\u7684\u503c"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-properties"},"jdbc.account.url=jdbc:mysql://localhost:3306/seata\njdbc.account.username=your_username\njdbc.account.password=your_password\njdbc.account.driver=com.mysql.jdbc.Driver\n# storage db config\njdbc.storage.url=jdbc:mysql://localhost:3306/seata\njdbc.storage.username=your_username\njdbc.storage.password=your_password\njdbc.storage.driver=com.mysql.jdbc.Driver\n# order db config\njdbc.order.url=jdbc:mysql://localhost:3306/seata\njdbc.order.username=your_username\njdbc.order.password=your_password\njdbc.order.driver=com.mysql.jdbc.Driver\n")),(0,n.kt)("h3",{id:"zookeeper"},"ZooKeeper"),(0,n.kt)("p",null,"\u542f\u52a8ZooKeeper\uff0c\u6211\u7684\u672c\u5730\u7684Mac\u662f\u4f7f\u7528Homebrew\u5b89\u88c5\u542f\u52a8\u7684"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"$ brew services start zookeeper \n==> Successfully started `zookeeper` (label: homebrew.m\n\n$ brew services list           \nName              Status  User    Plist\ndocker-machine    stopped         \nelasticsearch     stopped         \nkafka             stopped         \nkibana            stopped         \nmysql             started portman /Users/portman/Librar\ny/LaunchAgents/homebrew.mxcl.mysql.plist\nnginx             stopped         \npostgresql        stopped         \nredis             stopped         \nzookeeper         started portman /Users/portman/Librar\ny/LaunchAgents/homebrew.mxcl.zookeeper.plist\n")),(0,n.kt)("h3",{id:"\u542f\u52a8tc\u4e8b\u52a1\u534f\u8c03\u5668"},"\u542f\u52a8TC\u4e8b\u52a1\u534f\u8c03\u5668"),(0,n.kt)("p",null,"\u5728\u8fd9\u4e2a",(0,n.kt)("a",{parentName:"p",href:"https://github.com/seata/seata/releases"},"\u94fe\u63a5"),"\u91cc\u9875\u9762\u4e2d\uff0c\u4e0b\u8f7d\u5bf9\u5e94\u7248\u672c\u7684seata-server\u7a0b\u5e8f\uff0c\u6211\u672c\u5730\u4e0b\u8f7d\u7684\u662f1.2.0\u7248\u672c"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u8fdb\u5165\u6587\u4ef6\u6240\u5728\u76ee\u5f55\u5e76\u89e3\u538b\u6587\u4ef6"),(0,n.kt)("li",{parentName:"ol"},"\u8fdb\u5165seata\u76ee\u5f55"),(0,n.kt)("li",{parentName:"ol"},"\u6267\u884c\u542f\u52a8\u811a\u672c")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"$ tar -zxvf seata-server-1.2.0.tar.gz\n$ cd seata\n$ bin/seata-server.sh\n")),(0,n.kt)("p",null,"\u89c2\u5bdf\u542f\u52a8\u65e5\u5fd7\u662f\u5426\u6709\u62a5\u9519\u4fe1\u606f\uff0c\u5982\u679c\u4e00\u5207\u6b63\u5e38\uff0c\u5e76\u770b\u5230\u4e86\u4ee5\u4e0b\u7684Server started\u7684\u4fe1\u606f\uff0c\u8bf4\u660e\u542f\u52a8\u6210\u529f\u4e86\u3002"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"2020-07-23 13:45:13.810 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started ...\n")),(0,n.kt)("h3",{id:"ide\u4e2d\u542f\u52a8\u6a21\u62df\u7684\u5fae\u670d\u52a1"},"IDE\u4e2d\u542f\u52a8\u6a21\u62df\u7684\u5fae\u670d\u52a1"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u9996\u5148\u8981\u628aseata-samples\u9879\u76ee\u5bfc\u5165\u5230\u672c\u5730IDE\u4e2d\uff0c\u8fd9\u91cc\u6211\u7528\u7684\u662fIntelliJ IDEA"),(0,n.kt)("li",{parentName:"ol"},"\u5237\u65b0Maven\u7684\u5de5\u7a0b\u4f9d\u8d56"),(0,n.kt)("li",{parentName:"ol"},"\u5148\u542f\u52a8Account\uff0cOrder\uff0cStorage\u8fd9\u4e2a3\u4e2a\u670d\u52a1\uff0c\u7136\u540eBusiness\u624d\u80fd\u53bb\u8c03\u7528\uff0c\u5bf9\u5e94\u7684\u542f\u52a8\u7c7b\u5206\u522b\u662f\uff1a")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},"io.seata.samples.dubbo.starter.DubboStorageServiceStarter\nio.seata.samples.dubbo.starter.DubboOrderServiceStarter\nio.seata.samples.dubbo.starter.DubboStorageServiceStarter\n")),(0,n.kt)("p",null,"\u6bcf\u4e2a\u670d\u52a1\u542f\u52a8\u5b8c\u4e4b\u540e\uff0c\u770b\u5230\u8fd9\u53e5\u63d0\u793a\u4fe1\u606f\uff0c\u8bf4\u660e\u670d\u52a1\u542f\u52a8\u6210\u529f\u4e86"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"Application is keep running ...\n")),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/service-boot.png?raw=true",alt:"cloc-seata"})),(0,n.kt)("p",null,"\u542f\u52a8\u6210\u529f\u540e\uff0caccount_tbl\uff0cstorage_tbl\u8868\u4f1a\u6709\u4e24\u6761\u521d\u59cb\u5316\u7684\u6570\u636e\uff0c\u5206\u522b\u662f\u8d26\u6237\u4f59\u989d\u548c\u5546\u54c1\u5e93\u5b58"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"mysql> SELECT * FROM account_tbl; SELECT * FROM storage_tbl;\n+----+---------+-------+\n| id | user_id | money |\n+----+---------+-------+\n|  1 | U100001 |   999 |\n+----+---------+-------+\n1 row in set (0.00 sec)\n\n+----+----------------+-------+\n| id | commodity_code | count |\n+----+----------------+-------+\n|  1 | C00321         |   100 |\n+----+----------------+-------+\n1 row in set (0.00 sec)\n")),(0,n.kt)("h3",{id:"\u4f7f\u7528business\u9a8c\u8bc1\u6548\u679c"},"\u4f7f\u7528Business\u9a8c\u8bc1\u6548\u679c"),(0,n.kt)("h4",{id:"\u6b63\u5e38\u60c5\u51b5"},"\u6b63\u5e38\u60c5\u51b5"),(0,n.kt)("p",null,"\u8fd8\u662f\u5728IDE\u4e2d\u6267\u884cDubboBusinessTester\u7c7b\u7684\u4e3b\u51fd\u6570\uff0c\u7a0b\u5e8f\u8dd1\u5b8c\u4f1a\u81ea\u52a8\u9000\u51fa"),(0,n.kt)("p",null,"\u5728\u7a0b\u5e8f\u4e00\u5207\u6b63\u5e38\u7684\u60c5\u51b5\u4e0b\uff0c\u6bcf\u4e2a\u5fae\u670d\u52a1\u7684\u4e8b\u7269\u90fd\u5e94\u8be5\u662f\u63d0\u4ea4\u4e86\u7684\uff0c\u6570\u636e\u4fdd\u6301\u4e00\u81f4"),(0,n.kt)("p",null,"\u6211\u4eec\u6765\u770b\u4e00\u4e0bMySQL\u4e2d\u6570\u636e\u7684\u53d8\u5316"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"mysql> SELECT * FROM account_tbl; SELECT * FROM order_tbl; SELECT * FROM storage_tbl;\n+----+---------+-------+\n| id | user_id | money |\n+----+---------+-------+\n|  1 | U100001 |   599 |\n+----+---------+-------+\n1 row in set (0.00 sec)\n\n+----+---------+----------------+-------+-------+\n| id | user_id | commodity_code | count | money |\n+----+---------+----------------+-------+-------+\n|  1 | U100001 | C00321         |     2 |   400 |\n+----+---------+----------------+-------+-------+\n1 row in set (0.00 sec)\n\n+----+----------------+-------+\n| id | commodity_code | count |\n+----+----------------+-------+\n|  1 | C00321         |    98 |\n+----+----------------+-------+\n1 row in set (0.00 sec)\n")),(0,n.kt)("p",null,"\u4ece3\u4e2a\u8868\u7684\u6570\u636e\u53ef\u4ee5\u770b\u5230\uff1a\u8d26\u6237\u4f59\u989d\u6263\u51cf\u4e86400\u5757\uff1b\u8ba2\u5355\u8868\u589e\u52a0\u4e861\u6761\u8bb0\u5f55\uff1b\u5546\u54c1\u5e93\u5b58\u6263\u51cf\u4e862\u4e2a"),(0,n.kt)("p",null,"\u8fd9\u4e2a\u7ed3\u679c\u662f\u7a0b\u5e8f\u7684\u903b\u8f91\u662f\u4e00\u81f4\u7684\uff0c\u8bf4\u660e\u4e8b\u52a1\u6ca1\u6709\u95ee\u9898"),(0,n.kt)("h4",{id:"\u5f02\u5e38\u60c5\u51b5"},"\u5f02\u5e38\u60c5\u51b5"),(0,n.kt)("p",null,"\u5176\u5b9e\u5373\u4f7f\u4e0d\u52a0\u5165\u5206\u5e03\u5f0f\u4e8b\u52a1\u7684\u63a7\u5236\uff0c\u4e00\u5207\u90fd\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0c\u4e8b\u52a1\u672c\u8eab\u5c31\u4e0d\u4f1a\u6709\u95ee\u9898\u7684"),(0,n.kt)("p",null,"\u6240\u4ee5\u6211\u4eec\u6765\u91cd\u70b9\u5173\u6ce8\uff0c\u5f53\u7a0b\u5e8f\u51fa\u73b0\u5f02\u5e38\u65f6\u7684\u60c5\u51b5"),(0,n.kt)("p",null,"\u73b0\u5728\u6211\u628aBusinessServiceImpl\u7684\u629b\u5f02\u5e38\u7684\u4ee3\u7801\u6ce8\u91ca\u653e\u5f00\uff0c\u7136\u540e\u518d\u6267\u884c\u4e00\u6b21DubboBusinessTester\uff0c\u6765\u770b\u770b\u6709\u4ec0\u4e48\u60c5\u51b5\u53d1\u751f"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},'        @Override\n    @GlobalTransactional(timeoutMills = 300000, name = "dubbo-demo-tx")\n    public void purchase(String userId, String commodityCode, int orderCount) {\n        LOGGER.info("purchase begin ... xid: " + RootContext.getXID());\n        storageService.deduct(commodityCode, orderCount);\n        orderService.create(userId, commodityCode, orderCount);\n      \n        //\u653e\u5f00\u8fd9\u53e5\u629b\u5f02\u5e38\u7684\u6ce8\u91ca\uff0c\u6a21\u62df\u7a0b\u5e8f\u51fa\u73b0\u5f02\u5e38\n        throw new RuntimeException("portman\'s foooooobar error.");\n\n    }\n')),(0,n.kt)("p",null,"\u63a5\u7740\uff0c\u6211\u518d\u4e00\u6b21\u6267\u884cDubboBusinessTester\uff0c\u6267\u884c\u8fc7\u7a0b\u4e2d\u5728\u63a7\u5236\u53f0\u53ef\u4ee5\u770b\u5230\u5f02\u5e38\u62a5\u9519\u4fe1\u606f"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},'Exception in thread "main" java.lang.RuntimeException: portman\'s foooooobar error.\n')),(0,n.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u518d\u770b\u4e00\u4e0bMySQL\u91cc\u7684\u6570\u636e\u53d8\u5316\uff0c\u53d1\u73b0\u6570\u636e\u6ca1\u6709\u4efb\u4f55\u53d8\u5316\uff0c\u8bf4\u660e\u5206\u5e03\u5f0f\u4e8b\u52a1\u7684\u63a7\u5236\u5df2\u7ecf\u8d77\u4f5c\u7528\u4e86"),(0,n.kt)("h2",{id:"\u5f85\u601d\u8003\u95ee\u9898"},"\u5f85\u601d\u8003\u95ee\u9898"),(0,n.kt)("p",null,"\u4e0a\u9762\u7684\u6b65\u9aa4\u53ea\u662f\u6f14\u793a\u4e86seata\u6700\u7b80\u5355\u7684demo\u7a0b\u5e8f\uff0c\u66f4\u591a\u66f4\u590d\u6742\u7684\u60c5\u51b5\u540e\u7eed\u5927\u5bb6\u53ef\u4ee5\u4e00\u8d77\u8ba8\u8bba\u548c\u9a8c\u8bc1"),(0,n.kt)("p",null,"\u5b66\u4e60\u8fc7\u7a0b\u4e2d\u8fd8\u6709\u4e00\u4e9b\u95ee\u9898\u548c\u7591\u60d1\uff0c\u540e\u7eed\u8fdb\u4e00\u6b65\u5b66\u4e60"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5168\u5c40\u9501\u5bf9\u6027\u80fd\u7684\u5f71\u54cd\u7a0b\u5ea6"),(0,n.kt)("li",{parentName:"ul"},"undo_log\u65e5\u5fd7\u53ef\u4ee5\u56de\u6eda\u5230\u539f\u6765\u72b6\u6001\uff0c\u4f46\u662f\u5982\u679c\u6570\u636e\u72b6\u6001\u5df2\u7ecf\u53d1\u751f\u53d8\u5316\u5982\u4f55\u5904\u7406\uff08\u6bd4\u5982\u589e\u52a0\u7684\u7528\u6237\u79ef\u5206\u5df2\u7ecf\u88ab\u522b\u7684\u672c\u5730\u4e8b\u52a1\u82b1\u6389\u4e86\uff09")),(0,n.kt)("h2",{id:"\u53c2\u8003\u6587\u732e"},"\u53c2\u8003\u6587\u732e"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"http://seata.io/zh-cn/docs/overview/what-is-seata.html"},"Seata \u662f\u4ec0\u4e48?")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"http://seata.io/zh-cn/docs/user/quickstart.html"},"\u5feb\u901f\u5f00\u59cb"))),(0,n.kt)("h2",{id:"\u4f5c\u8005\u4fe1\u606f"},"\u4f5c\u8005\u4fe1\u606f"),(0,n.kt)("p",null,"\u8bb8\u6653\u52a0\uff0c\u91d1\u8776\u8f6f\u4ef6\u67b6\u6784\u5e08"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/iportman"},"Github")))}m.isMDXComponent=!0}}]);