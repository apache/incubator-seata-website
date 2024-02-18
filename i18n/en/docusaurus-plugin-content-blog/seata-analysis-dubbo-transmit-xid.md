---
title: Source Code Analysis of Seata-XID Propagation in Dubbo
keywords: [Seata, Dubbo, distributed transaction, spring]
description: This article explores the propagation of XID in Seata-Dubbo through source code analysis.
author: FUNKYE
date: 2020/01/01
---

# Seata-XID Transmission Source Code Analysis: Dubbo Edition

Author: FUNKYE (Chen Jianbin), Principal Engineer at a certain Internet company in Hangzhou.

# Preface

1. Let's start by examining the package structure. Under seata-dubbo and seata-dubbo-alibaba, there is a common class named TransactionPropagationFilter, corresponding to Apache Dubbo and Alibaba Dubbo respectively.

![20200101203229](/img/blog/20200101203229.png)

## Source Code Analysis

```java
package io.seata.integration.dubbo;

import io.seata.core.context.RootContext;
import org.apache.dubbo.common.Constants;
import org.apache.dubbo.common.extension.Activate;
import org.apache.dubbo.rpc.Filter;
import org.apache.dubbo.rpc.Invocation;
import org.apache.dubbo.rpc.Invoker;
import org.apache.dubbo.rpc.Result;
import org.apache.dubbo.rpc.RpcContext;
import org.apache.dubbo.rpc.RpcException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Activate(group = {Constants.PROVIDER, Constants.CONSUMER}, order = 100)
public class TransactionPropagationFilter implements Filter {

    private static final Logger LOGGER = LoggerFactory.getLogger(TransactionPropagationFilter.class);

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        // get local XID
        String xid = RootContext.getXID();
        String xidInterceptorType = RootContext.getXIDInterceptorType();
        // get XID from dubbo param
        String rpcXid = getRpcXid();
        String rpcXidInterceptorType = RpcContext.getContext().getAttachment(RootContext.KEY_XID_INTERCEPTOR_TYPE);
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("xid in RootContext[{}] xid in RpcContext[{}]", xid, rpcXid);
        }
        boolean bind = false;
        if (xid != null) {
            //transfer xid
            RpcContext.getContext().setAttachment(RootContext.KEY_XID, xid);
            RpcContext.getContext().setAttachment(RootContext.KEY_XID_INTERCEPTOR_TYPE, xidInterceptorType);
        } else {
            if (rpcXid != null) {
                //bind XID
                RootContext.bind(rpcXid);
                RootContext.bindInterceptorType(rpcXidInterceptorType);
                bind = true;
                if (LOGGER.isDebugEnabled()) {
                    LOGGER.debug("bind[{}] interceptorType[{}] to RootContext", rpcXid, rpcXidInterceptorType);
                }
            }
        }
        try {
            return invoker.invoke(invocation);
        } finally {
            if (bind) {
                //remove xid which has finished
                String unbindInterceptorType = RootContext.unbindInterceptorType();
                String unbindXid = RootContext.unbind();
                if (LOGGER.isDebugEnabled()) {
                    LOGGER.debug("unbind[{}] interceptorType[{}] from RootContext", unbindXid, unbindInterceptorType);
                }
                // if unbind xid is not current rpc xid
                if (!rpcXid.equalsIgnoreCase(unbindXid)) {
                    LOGGER.warn("xid in change during RPC from {} to {}, xidInterceptorType from {} to {} ", rpcXid, unbindXid, rpcXidInterceptorType, unbindInterceptorType);
                    if (unbindXid != null) {
                        // bind xid
                        RootContext.bind(unbindXid);
                        RootContext.bindInterceptorType(unbindInterceptorType);
                        LOGGER.warn("bind [{}] interceptorType[{}] back to RootContext", unbindXid, unbindInterceptorType);
                    }
                }
            }
        }
    }

    /**
     * get rpc xid
     * @return
     */
    private String getRpcXid() {
        String rpcXid = RpcContext.getContext().getAttachment(RootContext.KEY_XID);
        if (rpcXid == null) {
            rpcXid = RpcContext.getContext().getAttachment(RootContext.KEY_XID.toLowerCase());
        }
        return rpcXid;
    }

}
```

​ 1. Based on the source code, we can deduce the corresponding logic processing.

![20200101213336](/img/blog/20200101213336.png)

## Key Points

1. Dubbo @Activate Annotation:

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface Activate {

    String[] group() default {};


    String[] value() default {};


    String[] before() default {};


    String[] after() default {};


    int order() default 0;
}
```

It can be analyzed that the @Activate annotation on Seata's Dubbo filter, with parameters @Activate(group = \{Constants.PROVIDER, Constants.CONSUMER}, order = 100), indicates that both the Dubbo service provider and consumer will trigger this filter. Therefore, our Seata initiator will initiate an XID transmission. The above flowchart and code have clearly represented this.

2. Dubbo implicit parameter passing can be achieved through setAttachment and getAttachment on RpcContext for implicit parameter transmission between service consumers and providers.

Fetching: RpcContext.getContext().getAttachment(RootContext.KEY_XID);

Passing: RpcContext.getContext().setAttachment(RootContext.KEY_XID, xid);

# Conclusion

For further source code reading, please visit the [Seata official website](https://seata.apache.org/)
