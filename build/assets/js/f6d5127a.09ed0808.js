"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[5141],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=a.createContext({}),s=function(e){var n=a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return a.createElement(c.Provider,{value:n},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(t),d=r,m=u["".concat(c,".").concat(d)]||u[d]||g[d]||o;return t?a.createElement(m,i(i({ref:n},p),{},{components:t})):a.createElement(m,i({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=d;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[u]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},11698:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=t(87462),r=(t(67294),t(3905));const o={title:"Seata AT \u6a21\u5f0f\u542f\u52a8\u6e90\u7801\u5206\u6790",author:"\u5f20\u4e58\u8f89",keywords:["Seata\u3001\u5206\u5e03\u5f0f\u4e8b\u52a1\u3001AT\u6a21\u5f0f"],description:"Seata \u6e90\u7801\u5206\u6790\u7cfb\u5217",date:"2019/11/27"},i="\u524d\u8a00",l={permalink:"/blog/seata-at-mode-start",source:"@site/blog/seata-at-mode-start.md",title:"Seata AT \u6a21\u5f0f\u542f\u52a8\u6e90\u7801\u5206\u6790",description:"Seata \u6e90\u7801\u5206\u6790\u7cfb\u5217",date:"2019-11-27T00:00:00.000Z",formattedDate:"November 27, 2019",tags:[],readingTime:13.8,hasTruncateMarker:!1,authors:[{name:"\u5f20\u4e58\u8f89"}],frontMatter:{title:"Seata AT \u6a21\u5f0f\u542f\u52a8\u6e90\u7801\u5206\u6790",author:"\u5f20\u4e58\u8f89",keywords:["Seata\u3001\u5206\u5e03\u5f0f\u4e8b\u52a1\u3001AT\u6a21\u5f0f"],description:"Seata \u6e90\u7801\u5206\u6790\u7cfb\u5217",date:"2019/11/27"},prevItem:{title:"Seata \u5ba2\u6237\u7aef\u9700\u8981\u540c\u65f6\u542f\u52a8 RM \u548c TM \u5417\uff1f",permalink:"/blog/seata-at-mode-start-rm-tm"},nextItem:{title:"\u57fa\u4e8e Seata Saga \u8bbe\u8ba1\u66f4\u6709\u5f39\u6027\u7684\u91d1\u878d\u5e94\u7528",permalink:"/blog/design-more-flexable-application-by-saga"}},c={authorsImageUrls:[void 0]},s=[],p={toc:s},u="wrapper";function g(e){let{components:n,...t}=e;return(0,r.kt)(u,(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"\u4ece\u4e0a\u4e00\u7bc7\u6587\u7ae0\u300c",(0,r.kt)("a",{parentName:"p",href:"https://mp.weixin.qq.com/s/Pypkm5C9aLPJHYwcM6tAtA"},"\u5206\u5e03\u5f0f\u4e8b\u52a1\u4e2d\u95f4\u4ef6Seata\u7684\u8bbe\u8ba1\u539f\u7406"),"\u300d\u8bb2\u4e86\u4e0b Seata AT \u6a21\u5f0f\u7684\u4e00\u4e9b\u8bbe\u8ba1\u539f\u7406\uff0c\u4ece\u4e2d\u4e5f\u77e5\u9053\u4e86 AT \u6a21\u5f0f\u7684\u4e09\u4e2a\u89d2\u8272\uff08RM\u3001TM\u3001TC\uff09\uff0c\u63a5\u4e0b\u6765\u6211\u4f1a\u66f4\u65b0 Seata \u6e90\u7801\u5206\u6790\u7cfb\u5217\u6587\u7ae0\u3002\u4eca\u5929\u5c31\u6765\u5206\u6790 Seata AT \u6a21\u5f0f\u5728\u542f\u52a8\u7684\u65f6\u5019\u90fd\u505a\u4e86\u54ea\u4e9b\u64cd\u4f5c\u3002"),(0,r.kt)("h1",{id:"\u5ba2\u6237\u7aef\u542f\u52a8\u903b\u8f91"},"\u5ba2\u6237\u7aef\u542f\u52a8\u903b\u8f91"),(0,r.kt)("p",null,"TM \u662f\u8d1f\u8d23\u6574\u4e2a\u5168\u5c40\u4e8b\u52a1\u7684\u7ba1\u7406\u5668\uff0c\u56e0\u6b64\u4e00\u4e2a\u5168\u5c40\u4e8b\u52a1\u662f\u7531 TM \u5f00\u542f\u7684\uff0cTM \u6709\u4e2a\u5168\u5c40\u7ba1\u7406\u7c7b GlobalTransaction\uff0c\u7ed3\u6784\u5982\u4e0b\uff1a"),(0,r.kt)("p",null,"io.seata.tm.api.GlobalTransaction"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public interface GlobalTransaction {\n\n  void begin() throws TransactionException;\n\n  void begin(int timeout) throws TransactionException;\n\n  void begin(int timeout, String name) throws TransactionException;\n\n  void commit() throws TransactionException;\n\n  void rollback() throws TransactionException;\n  \n  GlobalStatus getStatus() throws TransactionException;\n  \n  // ...\n}\n")),(0,r.kt)("p",null,"\u53ef\u4ee5\u901a\u8fc7 GlobalTransactionContext \u521b\u5efa\u4e00\u4e2a GlobalTransaction\uff0c\u7136\u540e\u7528 GlobalTransaction \u8fdb\u884c\u5168\u5c40\u4e8b\u52a1\u7684\u5f00\u542f\u3001\u63d0\u4ea4\u3001\u56de\u6eda\u7b49\u64cd\u4f5c\uff0c\u56e0\u6b64\u6211\u4eec\u76f4\u63a5\u7528 API \u65b9\u5f0f\u4f7f\u7528 Seata AT \u6a21\u5f0f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'//init seata;\nTMClient.init(applicationId, txServiceGroup);\nRMClient.init(applicationId, txServiceGroup);\n//trx\nGlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();\ntry {\n  tx.begin(60000, "testBiz");\n  // \u4e8b\u52a1\u5904\u7406\n  // ...\n  tx.commit();\n} catch (Exception exx) {\n  tx.rollback();\n  throw exx;\n}\n')),(0,r.kt)("p",null,"\u5982\u679c\u6bcf\u6b21\u4f7f\u7528\u5168\u5c40\u4e8b\u52a1\u90fd\u8fd9\u6837\u5199\uff0c\u96be\u514d\u4f1a\u9020\u6210\u4ee3\u7801\u5197\u4f59\uff0c\u6211\u4eec\u7684\u9879\u76ee\u90fd\u662f\u57fa\u4e8e Spring \u5bb9\u5668\uff0c\u8fd9\u65f6\u6211\u4eec\u53ef\u4ee5\u5229\u7528 Spring AOP \u7684\u7279\u6027\uff0c\u7528\u6a21\u677f\u6a21\u5f0f\u628a\u8fd9\u4e9b\u5197\u4f59\u4ee3\u7801\u5c01\u88c5\u6a21\u7248\u91cc\uff0c\u53c2\u8003 Mybatis-spring \u4e5f\u662f\u505a\u4e86\u8fd9\u4e48\u4e00\u4ef6\u4e8b\u60c5\uff0c\u90a3\u4e48\u63a5\u4e0b\u6765\u6211\u4eec\u6765\u5206\u6790\u4e00\u4e0b\u57fa\u4e8e Spring \u7684\u9879\u76ee\u542f\u52a8 Seata \u5e76\u6ce8\u518c\u5168\u5c40\u4e8b\u52a1\u65f6\u90fd\u505a\u4e86\u54ea\u4e9b\u5de5\u4f5c\u3002"),(0,r.kt)("p",null,"\u6211\u4eec\u5f00\u542f\u4e00\u4e2a\u5168\u5c40\u4e8b\u52a1\u662f\u5728\u65b9\u6cd5\u4e0a\u52a0\u4e0a ",(0,r.kt)("inlineCode",{parentName:"p"},"@GlobalTransactional"),"\u6ce8\u89e3\uff0cSeata \u7684 Spring \u6a21\u5757\u4e2d\uff0c\u6709\u4e2a GlobalTransactionScanner\uff0c\u5b83\u7684\u7ee7\u627f\u5173\u7cfb\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public class GlobalTransactionScanner extends AbstractAutoProxyCreator implements InitializingBean, ApplicationContextAware, DisposableBean {\n  // ...\n}\n")),(0,r.kt)("p",null,"\u5728\u57fa\u4e8e Spring \u9879\u76ee\u7684\u542f\u52a8\u8fc7\u7a0b\u4e2d\uff0c\u5bf9\u8be5\u7c7b\u4f1a\u6709\u5982\u4e0b\u521d\u59cb\u5316\u6d41\u7a0b\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://gitee.com/objcoding/md-picture/raw/master/img/image-20191124155455309.png",alt:"image-20191124155455309"})),(0,r.kt)("p",null,"InitializingBean \u7684 afterPropertiesSet() \u65b9\u6cd5\u8c03\u7528\u4e86 initClient() \u65b9\u6cd5\uff1a"),(0,r.kt)("p",null,"io.seata.spring.annotation.GlobalTransactionScanner#initClient"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"TMClient.init(applicationId, txServiceGroup);\nRMClient.init(applicationId, txServiceGroup);\n")),(0,r.kt)("p",null,"\u5bf9 TM \u548c RM \u505a\u4e86\u521d\u59cb\u5316\u64cd\u4f5c\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"TM \u521d\u59cb\u5316")),(0,r.kt)("p",null,"io.seata.tm.TMClient#init"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public static void init(String applicationId, String transactionServiceGroup) {\n  // \u83b7\u53d6 TmRpcClient \u5b9e\u4f8b\n  TmRpcClient tmRpcClient = TmRpcClient.getInstance(applicationId, transactionServiceGroup);\n  // \u521d\u59cb\u5316 TM Client\n  tmRpcClient.init();\n}\n")),(0,r.kt)("p",null,"\u8c03\u7528 TmRpcClient.getInstance() \u65b9\u6cd5\u4f1a\u83b7\u53d6\u4e00\u4e2a TM \u5ba2\u6237\u7aef\u5b9e\u4f8b\uff0c\u5728\u83b7\u53d6\u8fc7\u7a0b\u4e2d\uff0c\u4f1a\u521b\u5efa Netty \u5ba2\u6237\u7aef\u914d\u7f6e\u6587\u4ef6\u5bf9\u8c61\uff0c\u4ee5\u53ca\u521b\u5efa messageExecutor \u7ebf\u7a0b\u6c60\uff0c\u8be5\u7ebf\u7a0b\u6c60\u7528\u4e8e\u5728\u5904\u7406\u5404\u79cd\u4e0e\u670d\u52a1\u7aef\u7684\u6d88\u606f\u4ea4\u4e92\uff0c\u5728\u521b\u5efa TmRpcClient \u5b9e\u4f8b\u65f6\uff0c\u521b\u5efa ClientBootstrap\uff0c\u7528\u4e8e\u7ba1\u7406 Netty \u670d\u52a1\u7684\u542f\u505c\uff0c\u4ee5\u53ca ClientChannelManager\uff0c\u5b83\u662f\u4e13\u95e8\u7528\u4e8e\u7ba1\u7406 Netty \u5ba2\u6237\u7aef\u5bf9\u8c61\u6c60\uff0cSeata \u7684 Netty \u90e8\u5206\u914d\u5408\u4f7f\u7528\u4e86\u5bf9\u8c61\u6c60\uff0c\u540e\u9762\u5728\u5206\u6790\u7f51\u7edc\u6a21\u5757\u4f1a\u8bb2\u5230\u3002"),(0,r.kt)("p",null,"io.seata.core.rpc.netty.AbstractRpcRemotingClient#init"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public void init() {\n  clientBootstrap.start();\n  // \u5b9a\u65f6\u5c1d\u8bd5\u8fde\u63a5\u670d\u52a1\u7aef\n  timerExecutor.scheduleAtFixedRate(new Runnable() {\n    @Override\n    public void run() {\n      clientChannelManager.reconnect(getTransactionServiceGroup());\n    }\n  }, SCHEDULE_INTERVAL_MILLS, SCHEDULE_INTERVAL_MILLS, TimeUnit.SECONDS);\n  mergeSendExecutorService = new ThreadPoolExecutor(MAX_MERGE_SEND_THREAD,\n                                                    MAX_MERGE_SEND_THREAD,\n                                                    KEEP_ALIVE_TIME, TimeUnit.MILLISECONDS,\n                                                    new LinkedBlockingQueue<>(),\n                                                    new NamedThreadFactory(getThreadPrefix(), MAX_MERGE_SEND_THREAD));\n  mergeSendExecutorService.submit(new MergedSendRunnable());\n  super.init();\n}\n")),(0,r.kt)("p",null,"\u8c03\u7528 TM \u5ba2\u6237\u7aef init() \u65b9\u6cd5\uff0c\u6700\u7ec8\u4f1a\u542f\u52a8 netty \u5ba2\u6237\u7aef\uff08\u6b64\u65f6\u8fd8\u672a\u771f\u6b63\u542f\u52a8\uff0c\u5728\u5bf9\u8c61\u6c60\u88ab\u8c03\u7528\u65f6\u624d\u4f1a\u88ab\u771f\u6b63\u542f\u52a8\uff09\uff1b\u5f00\u542f\u4e00\u4e2a\u5b9a\u65f6\u4efb\u52a1\uff0c\u5b9a\u65f6\u91cd\u65b0\u53d1\u9001 RegisterTMRequest\uff08RM \u5ba2\u6237\u7aef\u4f1a\u53d1\u9001 RegisterRMRequest\uff09\u8bf7\u6c42\u5c1d\u8bd5\u8fde\u63a5\u670d\u52a1\u7aef\uff0c\u5177\u4f53\u903b\u8f91\u662f\u5728 NettyClientChannelManager \u4e2d\u7684 channels \u4e2d\u7f13\u5b58\u4e86\u5ba2\u6237\u7aef channel\uff0c\u5982\u679c\u6b64\u65f6 channels \u4e0d\u5b58\u5728\u83b7\u53d6\u5df2\u8fc7\u671f\uff0c\u90a3\u4e48\u5c31\u4f1a\u5c1d\u8bd5\u8fde\u63a5\u670d\u52a1\u7aef\u4ee5\u91cd\u65b0\u83b7\u53d6 channel \u5e76\u5c06\u5176\u7f13\u5b58\u5230 channels \u4e2d\uff1b\u5f00\u542f\u4e00\u6761\u5355\u72ec\u7ebf\u7a0b\uff0c\u7528\u4e8e\u5904\u7406\u5f02\u6b65\u8bf7\u6c42\u53d1\u9001\uff0c\u8fd9\u91cc\u7528\u5f97\u5f88\u5de7\u5999\uff0c\u4e4b\u540e\u5728\u5206\u6790\u7f51\u7edc\u6a21\u5757\u5728\u5177\u4f53\u5bf9\u5176\u8fdb\u884c\u5206\u6790\u3002"),(0,r.kt)("p",null,"io.seata.core.rpc.netty.AbstractRpcRemoting#init"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'public void init() {\n  timerExecutor.scheduleAtFixedRate(new Runnable() {\n    @Override\n    public void run() {\n      for (Map.Entry<Integer, MessageFuture> entry : futures.entrySet()) {\n        if (entry.getValue().isTimeout()) {\n          futures.remove(entry.getKey());\n          entry.getValue().setResultMessage(null);\n          if (LOGGER.isDebugEnabled()) {\n            LOGGER.debug("timeout clear future: {}", entry.getValue().getRequestMessage().getBody());\n          }\n        }\n      }\n\n      nowMills = System.currentTimeMillis();\n    }\n  }, TIMEOUT_CHECK_INTERNAL, TIMEOUT_CHECK_INTERNAL, TimeUnit.MILLISECONDS);\n}\n')),(0,r.kt)("p",null,"\u5728 AbstractRpcRemoting \u7684 init \u65b9\u6cd5\u4e2d\uff0c\u53c8\u662f\u5f00\u542f\u4e86\u4e00\u4e2a\u5b9a\u65f6\u4efb\u52a1\uff0c\u8be5\u5b9a\u65f6\u4efb\u52a1\u4e3b\u8981\u662f\u7528\u4e8e\u5b9a\u65f6\u6e05\u9664 futures \u5df2\u8fc7\u671f\u7684 futrue\uff0cfutures \u662f\u4fdd\u5b58\u53d1\u9001\u8bf7\u6c42\u9700\u8981\u8fd4\u56de\u7ed3\u679c\u7684 future \u5bf9\u8c61\uff0c\u8be5\u5bf9\u8c61\u6709\u4e2a\u8d85\u65f6\u65f6\u95f4\uff0c\u8fc7\u4e86\u8d85\u65f6\u65f6\u95f4\u5c31\u4f1a\u81ea\u52a8\u629b\u5f02\u5e38\uff0c\u56e0\u6b64\u9700\u8981\u5b9a\u65f6\u6e05\u9664\u5df2\u8fc7\u671f\u7684 future \u5bf9\u8c61\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"RM \u521d\u59cb\u5316")),(0,r.kt)("p",null,"io.seata.rm.RMClient#init"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public static void init(String applicationId, String transactionServiceGroup) {\n  RmRpcClient rmRpcClient = RmRpcClient.getInstance(applicationId, transactionServiceGroup);\n  rmRpcClient.setResourceManager(DefaultResourceManager.get());\n  rmRpcClient.setClientMessageListener(new RmMessageListener(DefaultRMHandler.get()));\n  rmRpcClient.init();\n}\n")),(0,r.kt)("p",null," RmRpcClient.getInstance \u5904\u7406\u903b\u8f91\u4e0e TM \u5927\u81f4\u76f8\u540c\uff1bResourceManager \u662f RM \u8d44\u6e90\u7ba1\u7406\u5668\uff0c\u8d1f\u8d23\u5206\u652f\u4e8b\u52a1\u7684\u6ce8\u518c\u3001\u63d0\u4ea4\u3001\u4e0a\u62a5\u3001\u4ee5\u53ca\u56de\u6eda\u64cd\u4f5c\uff0c\u4ee5\u53ca\u5168\u5c40\u9501\u7684\u67e5\u8be2\u64cd\u4f5c\uff0cDefaultResourceManager \u4f1a\u6301\u6709\u5f53\u524d\u6240\u6709\u7684 RM \u8d44\u6e90\u7ba1\u7406\u5668\uff0c\u8fdb\u884c\u7edf\u4e00\u8c03\u7528\u5904\u7406\uff0c\u800c get() \u65b9\u6cd5\u4e3b\u8981\u662f\u52a0\u8f7d\u5f53\u524d\u7684\u8d44\u6e90\u7ba1\u7406\u5668\uff0c\u4e3b\u8981\u7528\u4e86\u7c7b\u4f3c SPI \u7684\u673a\u5236\uff0c\u8fdb\u884c\u7075\u6d3b\u52a0\u8f7d\uff0c\u5982\u4e0b\u56fe\uff0cSeata \u4f1a\u626b\u63cf META-INF/services/ \u76ee\u5f55\u4e0b\u7684\u914d\u7f6e\u7c7b\u5e76\u8fdb\u884c\u52a8\u6001\u52a0\u8f7d\u3002"),(0,r.kt)("p",null,"ClientMessageListener \u662f RM \u6d88\u606f\u5904\u7406\u76d1\u542c\u5668\uff0c\u7528\u4e8e\u8d1f\u8d23\u5904\u7406\u4ece TC \u53d1\u9001\u8fc7\u6765\u7684\u6307\u4ee4\uff0c\u5e76\u5bf9\u5206\u652f\u8fdb\u884c\u5206\u652f\u63d0\u4ea4\u3001\u5206\u652f\u56de\u6eda\uff0c\u4ee5\u53ca undo log \u5220\u9664\u64cd\u4f5c\uff1b\u6700\u540e init \u65b9\u6cd5\u8ddf TM \u903b\u8f91\u4e5f\u5927\u4f53\u4e00\u81f4\uff1bDefaultRMHandler \u5c01\u88c5\u4e86 RM \u5206\u652f\u4e8b\u52a1\u7684\u4e00\u4e9b\u5177\u4f53\u64cd\u4f5c\u903b\u8f91\u3002"),(0,r.kt)("p",null,"\u63a5\u4e0b\u6765\u518d\u770b\u770b wrapIfNecessary \u65b9\u6cd5\u7a76\u7adf\u505a\u4e86\u54ea\u4e9b\u64cd\u4f5c\u3002"),(0,r.kt)("p",null,"io.seata.spring.annotation.GlobalTransactionScanner#wrapIfNecessary"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'protected Object wrapIfNecessary(Object bean, String beanName, Object cacheKey) {\n  // \u5224\u65ad\u662f\u5426\u6709\u5f00\u542f\u5168\u5c40\u4e8b\u52a1\n  if (disableGlobalTransaction) {\n    return bean;\n  }\n  try {\n    synchronized (PROXYED_SET) {\n      if (PROXYED_SET.contains(beanName)) {\n        return bean;\n      }\n      interceptor = null;\n      //check TCC proxy\n      if (TCCBeanParserUtils.isTccAutoProxy(bean, beanName, applicationContext)) {\n        //TCC interceptor, proxy bean of sofa:reference/dubbo:reference, and LocalTCC\n        interceptor = new TccActionInterceptor(TCCBeanParserUtils.getRemotingDesc(beanName));\n      } else {\n        Class<?> serviceInterface = SpringProxyUtils.findTargetClass(bean);\n        Class<?>[] interfacesIfJdk = SpringProxyUtils.findInterfaces(bean);\n\n        // \u5224\u65ad bean \u4e2d\u662f\u5426\u6709 GlobalTransactional \u548c GlobalLock \u6ce8\u89e3\n        if (!existsAnnotation(new Class[]{serviceInterface})\n            && !existsAnnotation(interfacesIfJdk)) {\n          return bean;\n        }\n\n        if (interceptor == null) {\n          // \u521b\u5efa\u4ee3\u7406\u7c7b\n          interceptor = new GlobalTransactionalInterceptor(failureHandlerHook);\n        }\n      }\n\n      LOGGER.info("Bean[{}] with name [{}] would use interceptor [{}]",\n                  bean.getClass().getName(), beanName, interceptor.getClass().getName());\n      if (!AopUtils.isAopProxy(bean)) {\n        bean = super.wrapIfNecessary(bean, beanName, cacheKey);\n      } else {\n        AdvisedSupport advised = SpringProxyUtils.getAdvisedSupport(bean);\n        // \u6267\u884c\u5305\u88c5\u76ee\u6807\u5bf9\u8c61\u5230\u4ee3\u7406\u5bf9\u8c61  \n        Advisor[] advisor = super.buildAdvisors(beanName, getAdvicesAndAdvisorsForBean(null, null, null));\n        for (Advisor avr : advisor) {\n          advised.addAdvisor(0, avr);\n        }\n      }\n      PROXYED_SET.add(beanName);\n      return bean;\n    }\n  } catch (Exception exx) {\n    throw new RuntimeException(exx);\n  }\n}\n')),(0,r.kt)("p",null,"GlobalTransactionScanner \u7ee7\u627f\u4e86 AbstractAutoProxyCreator\uff0c\u7528\u4e8e\u5bf9 Spring AOP \u652f\u6301\uff0c\u4ece\u4ee3\u7801\u4e2d\u53ef\u770b\u51fa\uff0c\u7528GlobalTransactionalInterceptor \u4ee3\u66ff\u4e86\u88ab GlobalTransactional \u548c GlobalLock \u6ce8\u89e3\u7684\u65b9\u6cd5\u3002"),(0,r.kt)("p",null,"GlobalTransactionalInterceptor \u5b9e\u73b0\u4e86 MethodInterceptor\uff1a"),(0,r.kt)("p",null,"io.seata.spring.annotation.GlobalTransactionalInterceptor#invoke"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public Object invoke(final MethodInvocation methodInvocation) throws Throwable {\n  Class<?> targetClass = methodInvocation.getThis() != null ? AopUtils.getTargetClass(methodInvocation.getThis()) : null;\n  Method specificMethod = ClassUtils.getMostSpecificMethod(methodInvocation.getMethod(), targetClass);\n  final Method method = BridgeMethodResolver.findBridgedMethod(specificMethod);\n\n  final GlobalTransactional globalTransactionalAnnotation = getAnnotation(method, GlobalTransactional.class);\n  final GlobalLock globalLockAnnotation = getAnnotation(method, GlobalLock.class);\n  if (globalTransactionalAnnotation != null) {\n    // \u5168\u5c40\u4e8b\u52a1\u6ce8\u89e3\n    return handleGlobalTransaction(methodInvocation, globalTransactionalAnnotation);\n  } else if (globalLockAnnotation != null) {\n    // \u5168\u5c40\u9501\u6ce8\u89e3\n    return handleGlobalLock(methodInvocation);\n  } else {\n    return methodInvocation.proceed();\n  }\n}\n")),(0,r.kt)("p",null,"\u4ee5\u4e0a\u662f\u4ee3\u7406\u65b9\u6cd5\u6267\u884c\u7684\u903b\u8f91\u903b\u8f91\uff0c\u5176\u4e2d handleGlobalTransaction() \u65b9\u6cd5\u91cc\u9762\u8c03\u7528\u4e86 TransactionalTemplate \u6a21\u7248\uff1a"),(0,r.kt)("p",null,"io.seata.spring.annotation.GlobalTransactionalInterceptor#handleGlobalTransaction"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"private Object handleGlobalTransaction(final MethodInvocation methodInvocation,\n                                       final GlobalTransactional globalTrxAnno) throws Throwable {\n  try {\n    return transactionalTemplate.execute(new TransactionalExecutor() {\n      @Override\n      public Object execute() throws Throwable {\n        return methodInvocation.proceed();\n      }\n      @Override\n      public TransactionInfo getTransactionInfo() {\n        // ...\n      }\n    });\n  } catch (TransactionalExecutor.ExecutionException e) {\n    // ...\n  }\n}\n")),(0,r.kt)("p",null,"handleGlobalTransaction() \u65b9\u6cd5\u6267\u884c\u4e86\u5c31\u662f TransactionalTemplate \u6a21\u7248\u7c7b\u7684 execute \u65b9\u6cd5\uff1a"),(0,r.kt)("p",null,"io.seata.tm.api.TransactionalTemplate#execute"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'public Object execute(TransactionalExecutor business) throws Throwable {\n  // 1. get or create a transaction\n  GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();\n\n  // 1.1 get transactionInfo\n  TransactionInfo txInfo = business.getTransactionInfo();\n  if (txInfo == null) {\n    throw new ShouldNeverHappenException("transactionInfo does not exist");\n  }\n  try {\n\n    // 2. begin transaction\n    beginTransaction(txInfo, tx);\n\n    Object rs = null;\n    try {\n\n      // Do Your Business\n      rs = business.execute();\n\n    } catch (Throwable ex) {\n\n      // 3.the needed business exception to rollback.\n      completeTransactionAfterThrowing(txInfo,tx,ex);\n      throw ex;\n    }\n\n    // 4. everything is fine, commit.\n    commitTransaction(tx);\n\n    return rs;\n  } finally {\n    //5. clear\n    triggerAfterCompletion();\n    cleanUp();\n  }\n}\n')),(0,r.kt)("p",null,"\u4ee5\u4e0a\u662f\u4e0d\u662f\u6709\u4e00\u79cd\u4f3c\u66fe\u76f8\u8bc6\u7684\u611f\u89c9\uff1f\u6ca1\u9519\uff0c\u4ee5\u4e0a\u5c31\u662f\u6211\u4eec\u4f7f\u7528 API \u65f6\u7ecf\u5e38\u5199\u7684\u5197\u4f59\u4ee3\u7801\uff0c\u73b0\u5728 Spring \u901a\u8fc7\u4ee3\u7406\u6a21\u5f0f\uff0c\u628a\u8fd9\u4e9b\u5197\u4f59\u4ee3\u7801\u90fd\u5c01\u88c5\u5e26\u6a21\u7248\u91cc\u9762\u4e86\uff0c\u5b83\u5c06\u90a3\u4e9b\u5197\u4f59\u4ee3\u7801\u7edf\u7edf\u5c01\u88c5\u8d77\u6765\u7edf\u4e00\u6d41\u7a0b\u5904\u7406\uff0c\u5e76\u4e0d\u9700\u8981\u4f60\u663e\u793a\u5199\u51fa\u6765\u4e86\uff0c\u6709\u5174\u8da3\u7684\u4e5f\u53ef\u4ee5\u53bb\u770b\u770b Mybatis-spring \u7684\u6e90\u7801\uff0c\u4e5f\u662f\u5199\u5f97\u975e\u5e38\u7cbe\u5f69\u3002"),(0,r.kt)("h1",{id:"\u670d\u52a1\u7aef\u5904\u7406\u903b\u8f91"},"\u670d\u52a1\u7aef\u5904\u7406\u903b\u8f91"),(0,r.kt)("p",null,"\u670d\u52a1\u7aef\u6536\u5230\u5ba2\u6237\u7aef\u7684\u8fde\u63a5\uff0c\u90a3\u5f53\u7136\u662f\u5c06\u5176 channel \u4e5f\u7f13\u5b58\u8d77\u6765\uff0c\u524d\u9762\u4e5f\u8bf4\u5230\u5ba2\u6237\u7aef\u4f1a\u53d1\u9001 RegisterRMRequest/RegisterTMRequest \u8bf7\u6c42\u7ed9\u670d\u52a1\u7aef\uff0c\u670d\u52a1\u7aef\u6536\u5230\u540e\u4f1a\u8c03\u7528 ServerMessageListener \u76d1\u542c\u5668\u5904\u7406\uff1a"),(0,r.kt)("p",null,"io.seata.core.rpc.ServerMessageListener"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public interface ServerMessageListener {\n  // \u5904\u7406\u5404\u79cd\u4e8b\u52a1\uff0c\u5982\u5206\u652f\u6ce8\u518c\u3001\u5206\u652f\u63d0\u4ea4\u3001\u5206\u652f\u4e0a\u62a5\u3001\u5206\u652f\u56de\u6eda\u7b49\u7b49\n  void onTrxMessage(RpcMessage request, ChannelHandlerContext ctx, ServerMessageSender sender);\n    // \u5904\u7406 RM \u5ba2\u6237\u7aef\u7684\u6ce8\u518c\u8fde\u63a5\n  void onRegRmMessage(RpcMessage request, ChannelHandlerContext ctx,\n                      ServerMessageSender sender, RegisterCheckAuthHandler checkAuthHandler);\n  // \u5904\u7406 TM \u5ba2\u6237\u7aef\u7684\u6ce8\u518c\u8fde\u63a5\n  void onRegTmMessage(RpcMessage request, ChannelHandlerContext ctx,\n                      ServerMessageSender sender, RegisterCheckAuthHandler checkAuthHandler);\n  // \u670d\u52a1\u7aef\u4e0e\u5ba2\u6237\u7aef\u4fdd\u6301\u5fc3\u8df3\n  void onCheckMessage(RpcMessage request, ChannelHandlerContext ctx, ServerMessageSender sender)\n\n}\n")),(0,r.kt)("p",null,"ChannelManager \u662f\u670d\u52a1\u7aef channel \u7684\u7ba1\u7406\u5668\uff0c\u670d\u52a1\u7aef\u6bcf\u6b21\u548c\u5ba2\u6237\u7aef\u901a\u4fe1\uff0c\u90fd\u9700\u8981\u4ece ChannelManager \u4e2d\u83b7\u53d6\u5ba2\u6237\u7aef\u5bf9\u5e94\u7684 channel\uff0c\u5b83\u7528\u4e8e\u4fdd\u5b58 TM \u548c RM \u5ba2\u6237\u7aef channel \u7684\u7f13\u5b58\u7ed3\u6784\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"/**\n * resourceId -> applicationId -> ip -> port -> RpcContext\n */\nprivate static final ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<Integer,\nRpcContext>>>>\n  RM_CHANNELS = new ConcurrentHashMap<String, ConcurrentMap<String, ConcurrentMap<String, ConcurrentMap<Integer,\nRpcContext>>>>();\n\n/**\n * ip+appname,port\n */\nprivate static final ConcurrentMap<String, ConcurrentMap<Integer, RpcContext>> TM_CHANNELS\n  = new ConcurrentHashMap<String, ConcurrentMap<Integer, RpcContext>>();\n")),(0,r.kt)("p",null,"\u4ee5\u4e0a\u7684 Map \u7ed3\u6784\u6709\u70b9\u590d\u6742\uff1a"),(0,r.kt)("p",null,"RM_CHANNELS\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"resourceId \u6307\u7684\u662f RM client \u7684\u6570\u636e\u5e93\u5730\u5740\uff1b"),(0,r.kt)("li",{parentName:"ol"},"applicationId \u6307\u7684\u662f RM client \u7684\u670d\u52a1 Id\uff0c\u6bd4\u5982 springboot \u7684\u914d\u7f6e spring.application.name=account-service \u4e2d\u7684 account-service \u5373\u662f  applicationId\uff1b"),(0,r.kt)("li",{parentName:"ol"},"ip \u6307\u7684\u662f RM client \u670d\u52a1\u5730\u5740\uff1b"),(0,r.kt)("li",{parentName:"ol"},"port \u6307\u7684\u662f RM client \u670d\u52a1\u5730\u5740\uff1b"),(0,r.kt)("li",{parentName:"ol"},"RpcContext \u4fdd\u5b58\u4e86\u672c\u6b21\u6ce8\u518c\u8bf7\u6c42\u7684\u4fe1\u606f\u3002")),(0,r.kt)("p",null,"TM_CHANNELS\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"ip+appname\uff1a\u8fd9\u91cc\u7684\u6ce8\u91ca\u5e94\u8be5\u662f\u5199\u9519\u4e86\uff0c\u5e94\u8be5\u662f appname+ip\uff0c\u5373 TM_CHANNELS \u7684 Map \u7ed3\u6784\u7b2c\u4e00\u4e2a key \u4e3a appname+ip\uff1b"),(0,r.kt)("li",{parentName:"ol"},"port\uff1a\u5ba2\u6237\u7aef\u7684\u7aef\u53e3\u53f7\u3002")),(0,r.kt)("p",null,"\u4ee5\u4e0b\u662f RM Client \u6ce8\u518c\u903b\u8f91\uff1a"),(0,r.kt)("p",null,"io.seata.core.rpc.ChannelManager#registerRMChannel"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public static void registerRMChannel(RegisterRMRequest resourceManagerRequest, Channel channel)\n  throws IncompatibleVersionException {\n  Version.checkVersion(resourceManagerRequest.getVersion());\n  // \u5c06 ResourceIds \u6570\u636e\u5e93\u8fde\u63a5\u8fde\u63a5\u4fe1\u606f\u653e\u5165\u4e00\u4e2aset\u4e2d\n  Set<String> dbkeySet = dbKeytoSet(resourceManagerRequest.getResourceIds());\n  RpcContext rpcContext;\n  // \u4ece\u7f13\u5b58\u4e2d\u5224\u65ad\u662f\u5426\u6709\u8be5channel\u4fe1\u606f\n  if (!IDENTIFIED_CHANNELS.containsKey(channel)) {\n    // \u6839\u636e\u8bf7\u6c42\u6ce8\u518c\u4fe1\u606f\uff0c\u6784\u5efa rpcContext\n    rpcContext = buildChannelHolder(NettyPoolKey.TransactionRole.RMROLE, resourceManagerRequest.getVersion(),\n                                    resourceManagerRequest.getApplicationId(), resourceManagerRequest.getTransactionServiceGroup(),\n                                    resourceManagerRequest.getResourceIds(), channel);\n    // \u5c06 rpcContext \u653e\u5165\u7f13\u5b58\u4e2d\n    rpcContext.holdInIdentifiedChannels(IDENTIFIED_CHANNELS);\n  } else {\n    rpcContext = IDENTIFIED_CHANNELS.get(channel);\n    rpcContext.addResources(dbkeySet);\n  }\n  if (null == dbkeySet || dbkeySet.isEmpty()) { return; }\n  for (String resourceId : dbkeySet) {\n    String clientIp;\n    // \u5c06\u8bf7\u6c42\u4fe1\u606f\u5b58\u5165 RM_CHANNELS \u4e2d\uff0c\u8fd9\u91cc\u7528\u4e86 java8 \u7684 computeIfAbsent \u65b9\u6cd5\u64cd\u4f5c\n    ConcurrentMap<Integer, RpcContext> portMap = RM_CHANNELS.computeIfAbsent(resourceId, resourceIdKey -> new ConcurrentHashMap<>())\n      .computeIfAbsent(resourceManagerRequest.getApplicationId(), applicationId -> new ConcurrentHashMap<>())\n      .computeIfAbsent(clientIp = getClientIpFromChannel(channel), clientIpKey -> new ConcurrentHashMap<>());\n        // \u5c06\u5f53\u524d rpcContext \u653e\u5165 portMap \u4e2d\n    rpcContext.holdInResourceManagerChannels(resourceId, portMap);\n    updateChannelsResource(resourceId, clientIp, resourceManagerRequest.getApplicationId());\n  }\n}\n")),(0,r.kt)("p",null,"\u4ece\u4ee5\u4e0a\u4ee3\u7801\u903b\u8f91\u80fd\u591f\u770b\u51fa\uff0c\u6ce8\u518c RM client \u4e3b\u8981\u662f\u5c06\u6ce8\u518c\u8bf7\u6c42\u4fe1\u606f\uff0c\u653e\u5165 RM_CHANNELS \u7f13\u5b58\u4e2d\uff0c\u540c\u65f6\u8fd8\u4f1a\u4ece IDENTIFIED_CHANNELS \u4e2d\u5224\u65ad\u672c\u6b21\u8bf7\u6c42\u7684 channel \u662f\u5426\u5df2\u9a8c\u8bc1\u8fc7\uff0cIDENTIFIED_CHANNELS \u7684\u7ed3\u6784\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"private static final ConcurrentMap<Channel, RpcContext> IDENTIFIED_CHANNELS\n  = new ConcurrentHashMap<>();\n")),(0,r.kt)("p",null,"IDENTIFIED_CHANNELS \u5305\u542b\u4e86\u6240\u6709 TM \u548c RM \u5df2\u6ce8\u518c\u7684 channel\u3002"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u662f TM \u6ce8\u518c\u903b\u8f91\uff1a"),(0,r.kt)("p",null,"io.seata.core.rpc.ChannelManager#registerTMChannel"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public static void registerTMChannel(RegisterTMRequest request, Channel channel)\n  throws IncompatibleVersionException {\n  Version.checkVersion(request.getVersion());\n  // \u6839\u636e\u8bf7\u6c42\u6ce8\u518c\u4fe1\u606f\uff0c\u6784\u5efa RpcContext\n  RpcContext rpcContext = buildChannelHolder(NettyPoolKey.TransactionRole.TMROLE, request.getVersion(),\n                                             request.getApplicationId(),\n                                             request.getTransactionServiceGroup(),\n                                             null, channel);\n  // \u5c06 RpcContext \u653e\u5165 IDENTIFIED_CHANNELS \u7f13\u5b58\u4e2d\n  rpcContext.holdInIdentifiedChannels(IDENTIFIED_CHANNELS);\n  // account-service:127.0.0.1:63353\n  String clientIdentified = rpcContext.getApplicationId() + Constants.CLIENT_ID_SPLIT_CHAR\n    + getClientIpFromChannel(channel);\n  // \u5c06\u8bf7\u6c42\u4fe1\u606f\u5b58\u5165 TM_CHANNELS \u7f13\u5b58\u4e2d\n  TM_CHANNELS.putIfAbsent(clientIdentified, new ConcurrentHashMap<Integer, RpcContext>());\n  // \u5c06\u4e0a\u4e00\u6b65\u521b\u5efa\u597d\u7684get\u51fa\u6765\uff0c\u4e4b\u540e\u518d\u5c06rpcContext\u653e\u5165\u8fd9\u4e2amap\u7684value\u4e2d\n  ConcurrentMap<Integer, RpcContext> clientIdentifiedMap = TM_CHANNELS.get(clientIdentified);\n  rpcContext.holdInClientChannels(clientIdentifiedMap);\n}\n")),(0,r.kt)("p",null,"TM client \u7684\u6ce8\u518c\u5927\u4f53\u7c7b\u4f3c\uff0c\u628a\u672c\u6b21\u6ce8\u518c\u7684\u4fe1\u606f\u653e\u5165\u5bf9\u5e94\u7684\u7f13\u5b58\u4e2d\u4fdd\u5b58\uff0c\u4f46\u6bd4 RM client \u7684\u6ce8\u518c\u903b\u8f91\u7b80\u5355\u4e00\u4e9b\uff0c\u4e3b\u8981\u662f RM client \u4f1a\u6d89\u53ca\u5206\u652f\u4e8b\u52a1\u8d44\u6e90\u7684\u4fe1\u606f\uff0c\u9700\u8981\u6ce8\u518c\u7684\u4fe1\u606f\u4e5f\u4f1a\u6bd4 TM client \u591a\u3002"),(0,r.kt)("p",null,"\u4ee5\u4e0a\u6e90\u7801\u5206\u6790\u57fa\u4e8e 0.9.0 \u7248\u672c\u3002"),(0,r.kt)("h1",{id:"\u4f5c\u8005\u7b80\u4ecb"},"\u4f5c\u8005\u7b80\u4ecb"),(0,r.kt)("p",null,"\u5f20\u4e58\u8f89\uff0c\u76ee\u524d\u5c31\u804c\u4e8e\u4e2d\u901a\u79d1\u6280\u4fe1\u606f\u4e2d\u5fc3\u6280\u672f\u5e73\u53f0\u90e8\uff0c\u62c5\u4efb Java \u5de5\u7a0b\u5e08\uff0c\u4e3b\u8981\u8d1f\u8d23\u4e2d\u901a\u6d88\u606f\u5e73\u53f0\u4e0e\u5168\u94fe\u8def\u538b\u6d4b\u9879\u76ee\u7684\u7814\u53d1\uff0c\u70ed\u7231\u5206\u4eab\u6280\u672f\uff0c\u5fae\u4fe1\u516c\u4f17\u53f7\u300c\u540e\u7aef\u8fdb\u9636\u300d\u4f5c\u8005\uff0c\u6280\u672f\u535a\u5ba2\uff08",(0,r.kt)("a",{parentName:"p",href:"https://objcoding.com/"},"https://objcoding.com/"),"\uff09\u535a\u4e3b\uff0cSeata Contributor\uff0cGitHub ID\uff1aobjcoding\u3002"))}g.isMDXComponent=!0}}]);