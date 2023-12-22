"use strict";(self.webpackChunkseata_website=self.webpackChunkseata_website||[]).push([[60631],{3905:(n,t,e)=>{e.d(t,{Zo:()=>u,kt:()=>b});var a=e(67294);function o(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function r(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,a)}return e}function l(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?r(Object(e),!0).forEach((function(t){o(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function i(n,t){if(null==n)return{};var e,a,o=function(n,t){if(null==n)return{};var e,a,o={},r=Object.keys(n);for(a=0;a<r.length;a++)e=r[a],t.indexOf(e)>=0||(o[e]=n[e]);return o}(n,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(a=0;a<r.length;a++)e=r[a],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(o[e]=n[e])}return o}var c=a.createContext({}),s=function(n){var t=a.useContext(c),e=t;return n&&(e="function"==typeof n?n(t):l(l({},t),n)),e},u=function(n){var t=s(n.components);return a.createElement(c.Provider,{value:t},n.children)},p="mdxType",m={inlineCode:"code",wrapper:function(n){var t=n.children;return a.createElement(a.Fragment,{},t)}},x=a.forwardRef((function(n,t){var e=n.components,o=n.mdxType,r=n.originalType,c=n.parentName,u=i(n,["components","mdxType","originalType","parentName"]),p=s(e),x=o,b=p["".concat(c,".").concat(x)]||p[x]||m[x]||r;return e?a.createElement(b,l(l({ref:t},u),{},{components:e})):a.createElement(b,l({ref:t},u))}));function b(n,t){var e=arguments,o=t&&t.mdxType;if("string"==typeof n||o){var r=e.length,l=new Array(r);l[0]=x;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=n,i[p]="string"==typeof n?n:o,l[1]=i;for(var s=2;s<r;s++)l[s]=e[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,e)}x.displayName="MDXCreateElement"},60753:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var a=e(87462),o=(e(67294),e(3905));const r={title:"API \u652f\u6301",keywords:["Seata"],description:"Seata API \u5206\u4e3a\u4e24\u5927\u7c7b\uff1aHigh-Level API \u548c Low-Level API\u3002"},l="1. \u6982\u8ff0",i={unversionedId:"user/api",id:"user/api",title:"API \u652f\u6301",description:"Seata API \u5206\u4e3a\u4e24\u5927\u7c7b\uff1aHigh-Level API \u548c Low-Level API\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/current/user/api.md",sourceDirName:"user",slug:"/user/api",permalink:"/zh-cn/docs/next/user/api",draft:!1,tags:[],version:"current",frontMatter:{title:"API \u652f\u6301",keywords:["Seata"],description:"Seata API \u5206\u4e3a\u4e24\u5927\u7c7b\uff1aHigh-Level API \u548c Low-Level API\u3002"},sidebar:"docs",previous:{title:"Zookeeper \u6ce8\u518c\u4e2d\u5fc3",permalink:"/zh-cn/docs/next/user/registry/zookeeper"},next:{title:"\u5fae\u670d\u52a1\u6846\u67b6\u652f\u6301",permalink:"/zh-cn/docs/next/user/microservice"}},c={},s=[{value:"2.1 GlobalTransaction",id:"21-globaltransaction",level:2},{value:"2.2 GlobalTransactionContext",id:"22-globaltransactioncontext",level:2},{value:"2.3 TransactionalTemplate",id:"23-transactionaltemplate",level:2},{value:"3.1 RootContext",id:"31-rootcontext",level:2},{value:"1. \u8fdc\u7a0b\u8c03\u7528\u4e8b\u52a1\u4e0a\u4e0b\u6587\u7684\u4f20\u64ad",id:"1-\u8fdc\u7a0b\u8c03\u7528\u4e8b\u52a1\u4e0a\u4e0b\u6587\u7684\u4f20\u64ad",level:3},{value:"2. \u4e8b\u52a1\u7684\u6682\u505c\u548c\u6062\u590d",id:"2-\u4e8b\u52a1\u7684\u6682\u505c\u548c\u6062\u590d",level:3},{value:"4.1 TCC\u6ce8\u89e3\u63cf\u8ff0",id:"41-tcc\u6ce8\u89e3\u63cf\u8ff0",level:2},{value:"4.1.1 @TwoPhaseBusinessAction",id:"411-twophasebusinessaction",level:3},{value:"4.1.2 @LocalTCC",id:"412-localtcc",level:3},{value:"4.2 \u91cd\u8981\u53c2\u6570\u63cf\u8ff0",id:"42-\u91cd\u8981\u53c2\u6570\u63cf\u8ff0",level:2},{value:"4.2.1 BusinessActionContext",id:"421-businessactioncontext",level:2},{value:"4.2.2 @BusinessActionContextParameter",id:"422-businessactioncontextparameter",level:2}],u={toc:s},p="wrapper";function m(n){let{components:t,...e}=n;return(0,o.kt)(p,(0,a.Z)({},u,e,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"1-\u6982\u8ff0"},"1. \u6982\u8ff0"),(0,o.kt)("p",null,"Seata API \u5206\u4e3a\u4e24\u5927\u7c7b\uff1aHigh-Level API \u548c Low-Level API \uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"High-Level API")," \uff1a\u7528\u4e8e\u4e8b\u52a1\u8fb9\u754c\u5b9a\u4e49\u3001\u63a7\u5236\u53ca\u4e8b\u52a1\u72b6\u6001\u67e5\u8be2\u3002"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Low-Level API")," \uff1a\u7528\u4e8e\u63a7\u5236\u4e8b\u52a1\u4e0a\u4e0b\u6587\u7684\u4f20\u64ad\u3002")),(0,o.kt)("h1",{id:"2-high-level-api"},"2. High-Level API"),(0,o.kt)("h2",{id:"21-globaltransaction"},"2.1 GlobalTransaction"),(0,o.kt)("p",null,"\u5168\u5c40\u4e8b\u52a1\uff1a\u5305\u62ec\u5f00\u542f\u4e8b\u52a1\u3001\u63d0\u4ea4\u3001\u56de\u6eda\u3001\u83b7\u53d6\u5f53\u524d\u72b6\u6001\u7b49\u65b9\u6cd5\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"public interface GlobalTransaction {\n\n    /**\n     * \u5f00\u542f\u4e00\u4e2a\u5168\u5c40\u4e8b\u52a1\uff08\u4f7f\u7528\u9ed8\u8ba4\u7684\u4e8b\u52a1\u540d\u548c\u8d85\u65f6\u65f6\u95f4\uff09\n     */\n    void begin() throws TransactionException;\n\n    /**\n     * \u5f00\u542f\u4e00\u4e2a\u5168\u5c40\u4e8b\u52a1\uff0c\u5e76\u6307\u5b9a\u8d85\u65f6\u65f6\u95f4\uff08\u4f7f\u7528\u9ed8\u8ba4\u7684\u4e8b\u52a1\u540d\uff09\n     */\n    void begin(int timeout) throws TransactionException;\n\n    /**\n     * \u5f00\u542f\u4e00\u4e2a\u5168\u5c40\u4e8b\u52a1\uff0c\u5e76\u6307\u5b9a\u4e8b\u52a1\u540d\u548c\u8d85\u65f6\u65f6\u95f4\n     */\n    void begin(int timeout, String name) throws TransactionException;\n\n    /**\n     * \u5168\u5c40\u63d0\u4ea4\n     */\n    void commit() throws TransactionException;\n\n    /**\n     * \u5168\u5c40\u56de\u6eda\n     */\n    void rollback() throws TransactionException;\n\n    /**\n     * \u83b7\u53d6\u4e8b\u52a1\u7684\u5f53\u524d\u72b6\u6001\n     */\n    GlobalStatus getStatus() throws TransactionException;\n\n    /**\n     * \u83b7\u53d6\u4e8b\u52a1\u7684 XID\n     */\n    String getXid();\n\n}\n")),(0,o.kt)("h2",{id:"22-globaltransactioncontext"},"2.2 GlobalTransactionContext"),(0,o.kt)("p",null,"GlobalTransaction \u5b9e\u4f8b\u7684\u83b7\u53d6\u9700\u8981\u901a\u8fc7 GlobalTransactionContext\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},'\n    /**\n     * \u83b7\u53d6\u5f53\u524d\u7684\u5168\u5c40\u4e8b\u52a1\u5b9e\u4f8b\uff0c\u5982\u679c\u6ca1\u6709\u5219\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u5b9e\u4f8b\u3002\n     */\n    public static GlobalTransaction getCurrentOrCreate() {\n        GlobalTransaction tx = getCurrent();\n        if (tx == null) {\n            return createNew();\n        }\n        return tx;\n    }\n\n    /**\n     * \u91cd\u65b0\u8f7d\u5165\u7ed9\u5b9a XID \u7684\u5168\u5c40\u4e8b\u52a1\u5b9e\u4f8b\uff0c\u8fd9\u4e2a\u5b9e\u4f8b\u4e0d\u5141\u8bb8\u6267\u884c\u5f00\u542f\u4e8b\u52a1\u7684\u64cd\u4f5c\u3002\n     * \u8fd9\u4e2a API \u901a\u5e38\u7528\u4e8e\u5931\u8d25\u7684\u4e8b\u52a1\u7684\u540e\u7eed\u96c6\u4e2d\u5904\u7406\u3002\n     * \u6bd4\u5982\uff1a\u5168\u5c40\u63d0\u4ea4\u8d85\u65f6\uff0c\u540e\u7eed\u96c6\u4e2d\u5904\u7406\u901a\u8fc7\u91cd\u65b0\u8f7d\u5165\u8be5\u5b9e\u4f8b\uff0c\u901a\u8fc7\u5b9e\u4f8b\u65b9\u6cd5\u83b7\u53d6\u4e8b\u52a1\u5f53\u524d\u72b6\u6001\uff0c\u5e76\u6839\u636e\u72b6\u6001\u5224\u65ad\u662f\u5426\u9700\u8981\u91cd\u8bd5\u5168\u5c40\u63d0\u4ea4\u64cd\u4f5c\u3002\n     */\n    public static GlobalTransaction reload(String xid) throws TransactionException {\n        GlobalTransaction tx = new DefaultGlobalTransaction(xid, GlobalStatus.UnKnown, GlobalTransactionRole.Launcher) {\n            @Override\n            public void begin(int timeout, String name) throws TransactionException {\n                throw new IllegalStateException("Never BEGIN on a RELOADED GlobalTransaction. ");\n            }\n        };\n        return tx;\n    }\n')),(0,o.kt)("h2",{id:"23-transactionaltemplate"},"2.3 TransactionalTemplate"),(0,o.kt)("p",null,"\u4e8b\u52a1\u5316\u6a21\u677f\uff1a\u901a\u8fc7\u4e0a\u8ff0 GlobalTransaction \u548c GlobalTransactionContext API \u628a\u4e00\u4e2a\u4e1a\u52a1\u670d\u52a1\u7684\u8c03\u7528\u5305\u88c5\u6210\u5e26\u6709\u5206\u5e03\u5f0f\u4e8b\u52a1\u652f\u6301\u7684\u670d\u52a1\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"public class TransactionalTemplate {\n\n    public Object execute(TransactionalExecutor business) throws TransactionalExecutor.ExecutionException {\n\n        // 1. \u83b7\u53d6\u5f53\u524d\u5168\u5c40\u4e8b\u52a1\u5b9e\u4f8b\u6216\u521b\u5efa\u65b0\u7684\u5b9e\u4f8b\n        GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();\n\n        // 2. \u5f00\u542f\u5168\u5c40\u4e8b\u52a1\n        try {\n            tx.begin(business.timeout(), business.name());\n\n        } catch (TransactionException txe) {\n            // 2.1 \u5f00\u542f\u5931\u8d25\n            throw new TransactionalExecutor.ExecutionException(tx, txe,\n                TransactionalExecutor.Code.BeginFailure);\n\n        }\n\n        Object rs = null;\n        try {\n            // 3. \u8c03\u7528\u4e1a\u52a1\u670d\u52a1\n            rs = business.execute();\n\n        } catch (Throwable ex) {\n\n            // \u4e1a\u52a1\u8c03\u7528\u672c\u8eab\u7684\u5f02\u5e38\n            try {\n                // \u5168\u5c40\u56de\u6eda\n                tx.rollback();\n\n                // 3.1 \u5168\u5c40\u56de\u6eda\u6210\u529f\uff1a\u629b\u51fa\u539f\u59cb\u4e1a\u52a1\u5f02\u5e38\n                throw new TransactionalExecutor.ExecutionException(tx, TransactionalExecutor.Code.RollbackDone, ex);\n\n            } catch (TransactionException txe) {\n                // 3.2 \u5168\u5c40\u56de\u6eda\u5931\u8d25\uff1a\n                throw new TransactionalExecutor.ExecutionException(tx, txe,\n                    TransactionalExecutor.Code.RollbackFailure, ex);\n\n            }\n\n        }\n\n        // 4. \u5168\u5c40\u63d0\u4ea4\n        try {\n            tx.commit();\n\n        } catch (TransactionException txe) {\n            // 4.1 \u5168\u5c40\u63d0\u4ea4\u5931\u8d25\uff1a\n            throw new TransactionalExecutor.ExecutionException(tx, txe,\n                TransactionalExecutor.Code.CommitFailure);\n\n        }\n        return rs;\n    }\n\n}\n")),(0,o.kt)("p",null,"\u6a21\u677f\u65b9\u6cd5\u6267\u884c\u7684\u5f02\u5e38\uff1aExecutionException"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"    class ExecutionException extends Exception {\n\n        // \u53d1\u751f\u5f02\u5e38\u7684\u4e8b\u52a1\u5b9e\u4f8b\n        private GlobalTransaction transaction;\n\n        // \u5f02\u5e38\u7f16\u7801\uff1a\n        // BeginFailure\uff08\u5f00\u542f\u4e8b\u52a1\u5931\u8d25\uff09\n        // CommitFailure\uff08\u5168\u5c40\u63d0\u4ea4\u5931\u8d25\uff09\n        // RollbackFailure\uff08\u5168\u5c40\u56de\u6eda\u5931\u8d25\uff09\n        // RollbackDone\uff08\u5168\u5c40\u56de\u6eda\u6210\u529f\uff09\n        private Code code;\n\n        // \u89e6\u53d1\u56de\u6eda\u7684\u4e1a\u52a1\u539f\u59cb\u5f02\u5e38\n        private Throwable originalException;\n")),(0,o.kt)("p",null,"\u5916\u5c42\u8c03\u7528\u903b\u8f91 try-catch \u8fd9\u4e2a\u5f02\u5e38\uff0c\u6839\u636e\u5f02\u5e38\u7f16\u7801\u8fdb\u884c\u5904\u7406\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"BeginFailure")," \uff08\u5f00\u542f\u4e8b\u52a1\u5931\u8d25\uff09\uff1agetCause() \u5f97\u5230\u5f00\u542f\u4e8b\u52a1\u5931\u8d25\u7684\u6846\u67b6\u5f02\u5e38\uff0cgetOriginalException() \u4e3a\u7a7a\u3002"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CommitFailure")," \uff08\u5168\u5c40\u63d0\u4ea4\u5931\u8d25\uff09\uff1agetCause() \u5f97\u5230\u5168\u5c40\u63d0\u4ea4\u5931\u8d25\u7684\u6846\u67b6\u5f02\u5e38\uff0cgetOriginalException() \u4e3a\u7a7a\u3002"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"RollbackFailure")," \uff08\u5168\u5c40\u56de\u6eda\u5931\u8d25\uff09\uff1agetCause() \u5f97\u5230\u5168\u5c40\u56de\u6eda\u5931\u8d25\u7684\u6846\u67b6\u5f02\u5e38\uff0cgetOriginalException() \u4e1a\u52a1\u5e94\u7528\u7684\u539f\u59cb\u5f02\u5e38\u3002"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"RollbackDone")," \uff08\u5168\u5c40\u56de\u6eda\u6210\u529f\uff09\uff1agetCause() \u4e3a\u7a7a\uff0cgetOriginalException() \u4e1a\u52a1\u5e94\u7528\u7684\u539f\u59cb\u5f02\u5e38\u3002")),(0,o.kt)("h1",{id:"3-low-level-api"},"3. Low-Level API"),(0,o.kt)("h2",{id:"31-rootcontext"},"3.1 RootContext"),(0,o.kt)("p",null,"\u4e8b\u52a1\u7684\u6839\u4e0a\u4e0b\u6587\uff1a\u8d1f\u8d23\u5728\u5e94\u7528\u7684\u8fd0\u884c\u65f6\uff0c\u7ef4\u62a4 XID \u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},'    /**\n     * \u5f97\u5230\u5f53\u524d\u5e94\u7528\u8fd0\u884c\u65f6\u7684\u5168\u5c40\u4e8b\u52a1 XID\n     */\n    public static String getXID() {\n        return CONTEXT_HOLDER.get(KEY_XID);\n    }\n\n    /**\n     * \u5c06\u5168\u5c40\u4e8b\u52a1 XID \u7ed1\u5b9a\u5230\u5f53\u524d\u5e94\u7528\u7684\u8fd0\u884c\u65f6\u4e2d\n     */\n    public static void bind(String xid) {\n        if (LOGGER.isDebugEnabled()) {\n            LOGGER.debug("bind " + xid);\n        }\n        CONTEXT_HOLDER.put(KEY_XID, xid);\n    }\n\n    /**\n     * \u5c06\u5168\u5c40\u4e8b\u52a1 XID \u4ece\u5f53\u524d\u5e94\u7528\u7684\u8fd0\u884c\u65f6\u4e2d\u89e3\u9664\u7ed1\u5b9a\uff0c\u540c\u65f6\u5c06 XID \u8fd4\u56de\n     */\n    public static String unbind() {\n        String xid = CONTEXT_HOLDER.remove(KEY_XID);\n        if (LOGGER.isDebugEnabled()) {\n            LOGGER.debug("unbind " + xid);\n        }\n        return xid;\n    }\n\n    /**\n     * \u5224\u65ad\u5f53\u524d\u5e94\u7528\u7684\u8fd0\u884c\u65f6\u662f\u5426\u5904\u4e8e\u5168\u5c40\u4e8b\u52a1\u7684\u4e0a\u4e0b\u6587\u4e2d\n     */\n    public static boolean inGlobalTransaction() {\n        return CONTEXT_HOLDER.get(KEY_XID) != null;\n    }\n')),(0,o.kt)("p",null,"High-Level API \u7684\u5b9e\u73b0\u90fd\u662f\u57fa\u4e8e RootContext \u4e2d\u7ef4\u62a4\u7684 XID \u6765\u505a\u7684\u3002"),(0,o.kt)("p",null,"\u5e94\u7528\u7684\u5f53\u524d\u8fd0\u884c\u7684\u64cd\u4f5c\u662f\u5426\u5728\u4e00\u4e2a\u5168\u5c40\u4e8b\u52a1\u7684\u4e0a\u4e0b\u6587\u4e2d\uff0c\u5c31\u662f\u770b RootContext \u4e2d\u662f\u5426\u6709 XID\u3002"),(0,o.kt)("p",null,"RootContext \u7684\u9ed8\u8ba4\u5b9e\u73b0\u662f\u57fa\u4e8e ThreadLocal \u7684\uff0c\u5373 XID \u4fdd\u5b58\u5728\u5f53\u524d\u7ebf\u7a0b\u4e0a\u4e0b\u6587\u4e2d\u3002"),(0,o.kt)("p",null,"Low-Level API \u7684\u4e24\u4e2a\u5178\u578b\u7684\u5e94\u7528\u573a\u666f\uff1a"),(0,o.kt)("h3",{id:"1-\u8fdc\u7a0b\u8c03\u7528\u4e8b\u52a1\u4e0a\u4e0b\u6587\u7684\u4f20\u64ad"},"1. \u8fdc\u7a0b\u8c03\u7528\u4e8b\u52a1\u4e0a\u4e0b\u6587\u7684\u4f20\u64ad"),(0,o.kt)("p",null,"\u8fdc\u7a0b\u8c03\u7528\u524d\u83b7\u53d6\u5f53\u524d XID\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"String xid = RootContext.getXID();\n")),(0,o.kt)("p",null,"\u8fdc\u7a0b\u8c03\u7528\u8fc7\u7a0b\u628a XID \u4e5f\u4f20\u9012\u5230\u670d\u52a1\u63d0\u4f9b\u65b9\uff0c\u5728\u6267\u884c\u670d\u52a1\u63d0\u4f9b\u65b9\u7684\u4e1a\u52a1\u903b\u8f91\u524d\uff0c\u628a XID \u7ed1\u5b9a\u5230\u5f53\u524d\u5e94\u7528\u7684\u8fd0\u884c\u65f6\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"RootContext.bind(rpcXid);\n")),(0,o.kt)("h3",{id:"2-\u4e8b\u52a1\u7684\u6682\u505c\u548c\u6062\u590d"},"2. \u4e8b\u52a1\u7684\u6682\u505c\u548c\u6062\u590d"),(0,o.kt)("p",null,"\u5728\u4e00\u4e2a\u5168\u5c40\u4e8b\u52a1\u4e2d\uff0c\u5982\u679c\u9700\u8981\u67d0\u4e9b\u4e1a\u52a1\u903b\u8f91\u4e0d\u5728\u5168\u5c40\u4e8b\u52a1\u7684\u7ba1\u8f96\u8303\u56f4\u5185\uff0c\u5219\u5728\u8c03\u7528\u524d\uff0c\u628a XID \u89e3\u7ed1\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"String unbindXid = RootContext.unbind();\n")),(0,o.kt)("p",null,"\u5f85\u76f8\u5173\u4e1a\u52a1\u903b\u8f91\u6267\u884c\u5b8c\u6210\uff0c\u518d\u628a XID \u7ed1\u5b9a\u56de\u53bb\uff0c\u5373\u53ef\u5b9e\u73b0\u5168\u5c40\u4e8b\u52a1\u7684\u6062\u590d\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"RootContext.bind(unbindXid);\n")),(0,o.kt)("h1",{id:"4-tcc-api"},"4. TCC API"),(0,o.kt)("p",null,"TCC\u63a5\u53e3\u5b9a\u4e49"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},'@LocalTCC\npublic interface NormalTccAction {\n\n    /**\n     * Prepare boolean.\n     *\n     * @param a             the a\n     * @param b             the b\n     * @param tccParam      the tcc param\n     * @return the boolean\n     */\n    @TwoPhaseBusinessAction(name = "tccActionForTest", commitMethod = "commit", rollbackMethod = "rollback", commitArgsClasses = {BusinessActionContext.class, TccParam.class}, rollbackArgsClasses = {BusinessActionContext.class, TccParam.class})\n    String prepare(@BusinessActionContextParameter("a") int a,\n                    @BusinessActionContextParameter(paramName = "b", index = 0) List b,\n                    @BusinessActionContextParameter(isParamInProperty = true) TccParam tccParam);\n\n    /**\n     * Commit boolean.\n     *\n     * @param actionContext the action context\n     * @return the boolean\n     */\n    boolean commit(BusinessActionContext actionContext,\n                   @BusinessActionContextParameter("tccParam") TccParam param);\n\n    /**\n     * Rollback boolean.\n     *\n     * @param actionContext the action context\n     * @return the boolean\n     */\n    boolean rollback(BusinessActionContext actionContext, @BusinessActionContextParameter("tccParam") TccParam param);\n}\n')),(0,o.kt)("p",null,"TCC\u63a5\u53e3\u5b9a\u4e49\u5b9e\u73b0"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},'public class NormalTccActionImpl implements NormalTccAction {\n\n    @Override\n    public String prepare(int a, List b, TccParam tccParam) {\n        return "a";\n    }\n\n    @Override\n    public boolean commit(BusinessActionContext actionContext, TccParam param) {\n        return false;\n    }\n\n    @Override\n    public boolean rollback(BusinessActionContext actionContext, TccParam param) {\n        return false;\n    }\n\n    public boolean otherMethod(){\n        return true;\n    }\n\n}\n')),(0,o.kt)("p",null,"TCC API \u4f7f\u7528\u65b9\u5f0f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},'    @Test\n    public void testTcc() {\n\n        // \u5b9e\u4f8b\u5316\u4e00\u4e2a\u672a\u4ee3\u7406\u7684\u666e\u901aTCC\u63a5\u53e3\u5b9e\u73b0\u7c7b\n        NormalTccAction tccAction = new NormalTccActionImpl();\n\n        // \u901a\u8fc7\u4ee3\u7406\u5de5\u5177ProxyUtil\uff0c\u521b\u5efa\u4e00\u4e2a\u4ee3\u7406\u7684TCC\u63a5\u53e3\u7c7b\n        NormalTccAction tccActionProxy = ProxyUtil.createProxy(tccAction);\n\n        // \u51c6\u5907\u4e00\u4e9bTCC\u63a5\u53e3\u7684\u53c2\u6570\n        TccParam tccParam = new TccParam(1, "abc@163.com");\n        List<String> listB = Arrays.asList("b");\n\n        // TCC\u4e00\u9636\u6bb5\u63d0\u4ea4\n        String result = tccActionProxy.prepare(0, listB, tccParam);\n\n        // \u9a8c\u8bc1\n        Assertions.assertEquals("a", result);\n        Assertions.assertNotNull(result);\n        Assertions.assertEquals("tccActionForTest", branchReference.get());\n\n    }\n')),(0,o.kt)("p",null,"\u7b80\u8ff0\u8bf4\u660e"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"1\uff0c\u9996\u5148\u5b9a\u4e49TCC\u63a5\u53e3\uff0cprepare\uff08@TwoPhaseBusinessAction\u4fee\u9970\uff09\uff0cconfirm\uff0crollback\u3002"),(0,o.kt)("li",{parentName:"ul"},"2\uff0c\u5b9e\u73b0\u63a5\u53e3\uff0c\u53ef\u4ee5\u901a\u8fc7BusinessActionContext\u6765\u4f20\u9012\u53c2\u6570\u3002"),(0,o.kt)("li",{parentName:"ul"},"3\uff0c\u7528ProxyUtil.createProxy(T target)\u521b\u5efaTCC\u4ee3\u7406\u5bf9\u8c61\u3002(io.seata.integration.tx.api.util.ProxyUtil)"),(0,o.kt)("li",{parentName:"ul"},"4\uff0c\u7528\u4ee3\u7406\u7c7b\u4e00\u9636\u6bb5\u63d0\u4ea4\u3002")),(0,o.kt)("h2",{id:"41-tcc\u6ce8\u89e3\u63cf\u8ff0"},"4.1 TCC\u6ce8\u89e3\u63cf\u8ff0"),(0,o.kt)("p",null,"TCC\u6709\u4e24\u4e2a\u6838\u5fc3\u6ce8\u89e3\uff0c\u5206\u522b\u662fTwoPhaseBusinessAction\u548cLocalTCC\u3002"),(0,o.kt)("h3",{id:"411-twophasebusinessaction"},"4.1.1 @TwoPhaseBusinessAction"),(0,o.kt)("p",null,"@TwoPhaseBusinessAction\u8868\u793a\u4e86\u5f53\u524d\u65b9\u6cd5\u4f7f\u7528TCC\u6a21\u5f0f\u7ba1\u7406\u4e8b\u52a1\u63d0\u4ea4\u3002"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},'name\u5c5e\u6027\uff0c\u7ed9\u5f53\u524d\u4e8b\u52a1\u6ce8\u518c\u4e86\u4e00\u4e2a\u5168\u5c40\u552f\u4e00\u7684\u7684TCC bean name\u3002\n\u5982\u4ee3\u7801\u793a\u4f8b\u4e2d\uff0cname = "TccActionOne"')),(0,o.kt)("p",null,"TCC\u6a21\u5f0f\u7684\u4e09\u4e2a\u6267\u884c\u9636\u6bb5\u5206\u522b\u662f\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Try \u9636\u6bb5\uff0c\u9884\u5b9a\u64cd\u4f5c\u8d44\u6e90\uff08Prepare\uff09\n\u8fd9\u4e00\u9636\u6bb5\u6240\u4ee5\u6267\u884c\u7684\u65b9\u6cd5\u4fbf\u662f\u88ab@TwoPhaseBusinessAction\u6240\u4fee\u9970\u7684\u65b9\u6cd5\u3002\u5982\u793a\u4f8b\u4ee3\u7801\u4e2d\u7684prepare\u65b9\u6cd5\u3002")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Confirm \u9636\u6bb5\uff0c\u6267\u884c\u4e3b\u8981\u4e1a\u52a1\u903b\u8f91\uff08Commit\uff09\n\u8fd9\u4e00\u9636\u6bb5\u4f7f\u7528commitMethod\u5c5e\u6027\u6240\u6307\u5411\u7684\u65b9\u6cd5\uff0c\u6765\u6267\u884cConfirm\u7684\u5de5\u4f5c\u3002")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Cancel \u9636\u6bb5\uff0c\u4e8b\u52a1\u56de\u6eda\uff08Rollback\uff09\n\u8fd9\u4e00\u9636\u6bb5\u4f7f\u7528rollbackMethod\u5c5e\u6027\u6240\u6307\u5411\u7684\u65b9\u6cd5\uff0c\u6765\u6267\u884cRollback\u7684\u5de5\u4f5c\u3002"))),(0,o.kt)("h3",{id:"412-localtcc"},"4.1.2 @LocalTCC"),(0,o.kt)("p",null,"@LocalTCC\u6ce8\u89e3\u7528\u6765\u8868\u793a\u5b9e\u73b0\u4e86\u4e8c\u9636\u6bb5\u63d0\u4ea4\u7684\u672c\u5730\u7684TCC\u63a5\u53e3\u3002\u5982\u679c\u4f7f\u7528Dubbo\u4f5c\u4e3aRPC\u901a\u4fe1\u7ec4\u4ef6\u5219\u65e0\u987b\u7528\u6b64\u6ce8\u89e3\u3002"),(0,o.kt)("h2",{id:"42-\u91cd\u8981\u53c2\u6570\u63cf\u8ff0"},"4.2 \u91cd\u8981\u53c2\u6570\u63cf\u8ff0"),(0,o.kt)("h2",{id:"421-businessactioncontext"},"4.2.1 BusinessActionContext"),(0,o.kt)("p",null,"\u53ef\u4ee5\u4f7f\u7528\u6b64\u5165\u53c2\u5728TCC\u6a21\u5f0f\u4e0b\uff0c\u5728\u4e8b\u52a1\u4e0a\u4e0b\u6587\u4e2d\uff0c\u4f20\u9012\u67e5\u8be2\u53c2\u6570\u3002\u5982\u4e0b\u5c5e\u6027\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"xid \u5168\u5c40\u4e8b\u52a1id"),(0,o.kt)("li",{parentName:"ul"},"branchId \u5206\u652f\u4e8b\u52a1id"),(0,o.kt)("li",{parentName:"ul"},"actionName \u5206\u652f\u8d44\u6e90id\uff0c\uff08resource id\uff09"),(0,o.kt)("li",{parentName:"ul"},"actionContext \u4e1a\u52a1\u4f20\u9012\u53c2\u6570Map\uff0c\u53ef\u4ee5\u901a\u8fc7@BusinessActionContextParameter\u6765\u6807\u6ce8\u9700\u8981\u4f20\u9012\u7684\u53c2\u6570\u3002")),(0,o.kt)("h2",{id:"422-businessactioncontextparameter"},"4.2.2 @BusinessActionContextParameter"),(0,o.kt)("p",null,"\u7528\u6b64\u6ce8\u89e3\u6807\u6ce8\u9700\u8981\u5728\u4e8b\u52a1\u4e0a\u4e0b\u6587\u4e2d\u4f20\u9012\u7684\u53c2\u6570\u3002\u88ab\u6b64\u6ce8\u89e3\u4fee\u9970\u7684\u53c2\u6570\uff0c\u4f1a\u88ab\u8bbe\u7f6e\u5728BusinessActionContext\u4e2d\uff0c\n\u53ef\u4ee5\u5728commit\u548crollback\u9636\u6bb5\u4e2d\uff0c\u53ef\u4ee5\u901a\u8fc7BusinessActionContext\u7684getActionContext\u65b9\u6cd5\u83b7\u53d6\u4f20\u9012\u7684\u4e1a\u52a1\u53c2\u6570\u503c\u3002\n\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},'context.getActionContext("id").toString();\n')))}m.isMDXComponent=!0}}]);