---
title: Seata:Bridging Data and Applications
keywords: [Seata, Distributed Transactions, Data Consistency, Microservices]
description: This article introduces the past, present, and future evolution of Seata.
author: Ji Min - Founder of the Seata Open Source Community, Leader of the Distributed Transactions Team
date: June 30, 2023
---
This article mainly introduces the evolutionary journey of distributed transactions from internal development to commercialization and open source, as well as the current progress and future planning of the Seata community.
Seata is an open-source distributed transaction solution designed to provide a comprehensive solution for distributed transactions under modern microservices architecture. Seata offers complete distributed transaction solutions, including AT, TCC, Saga, and XA transaction modes, supporting various programming languages and data storage schemes. Seata also provides easy-to-use APIs, extensive documentation, and examples to facilitate quick development and deployment for enterprises applying Seata.
**Seata's advantages lie in its high availability, high performance, and high scalability, and it does not require extra complex operations for horizontal scaling.** Seata is currently used in thousands of customer business systems on Alibaba Cloud, and its reliability has been recognized and applied by major industry manufacturers.
As an open-source project, the Seata community is also expanding continuously, becoming an important platform for developers to exchange, share, and learn, attracting more and more attention and support from enterprises.
Today, I will primarily share about Seata on the following three topics:
- **From TXC/GTS to Seata**
- **Latest developments in the Seata community**
- **Future planning for the Seata community**
  <br/>
### From TXC/GTS to Seata
#### The Origin of Distributed Transactions
![Product Matrix](/img/blog/产品矩阵.jpg)
Seata is internally codenamed TXC (taobao transaction constructor) within Alibaba, a name with a strong organizational structure flavor. TXC originated from Alibaba's Wushi (Five Color Stones) project, which in ancient mythology were the stones used by the goddess Nüwa to mend the heavens, symbolizing Alibaba's important milestone in the evolution from monolithic architecture to distributed architecture. During this project, a batch of epoch-making Internet middleware was developed, including the well-known "Big Three":
- **HSF service invocation framework**
  Solves service communication issues after the transition from monolithic applications to service-oriented architectures.
- **TDDL database sharding framework**
  Addresses storage capacity and connection count issues of databases at scale.
- **MetaQ messaging framework**
  Addresses asynchronous invocation issues.
  The birth of the Big Three satisfied the basic requirements of microservices-based business development, but the data consistency issues that arose after microservices were not properly addressed, lacking a unified solution. The likelihood of data consistency issues in microservices is much higher than in monolithic applications, and the increased complexity of moving from in-process calls to network calls exacerbates the production of exceptional scenarios. The increase in service hops also makes it impossible for upstream and downstream services to coordinate data rollback in the event of a business processing exception. TXC was born to address the pain points of data consistency at the application architecture layer, and the core data consistency scenarios it aimed to address included:
- **Consistency across services.** Coordinates rollback of upstream and downstream service nodes in the event of system exceptions such as call timeouts and business exceptions.
- **Data consistency in database sharding.** Ensures internal transactions during logical SQL operations on business layers are consistent across different data shards.
- **Data consistency in message sending.** Addresses the inconsistency between data operations and successful message sending.
  To overcome the common scenarios encountered, TXC was seamlessly integrated with the Big Three. When businesses use the Big Three for development, they are completely unaware of TXC's presence in the background, do not have to consider the design of data consistency, and leave it to the framework to ensure, allowing businesses to focus more on their own development, greatly improving development efficiency.
  <br/>
  ![GTS Architecture](/img/blog/GTS架构.jpg)
  TXC has been widely used within Alibaba Group for many years and has been baptized by the surging traffic of large-scale events like Singles' Day, significantly improving business development efficiency and ensuring data accuracy, eliminating financial and reputational issues caused by data inconsistencies. With the continuous evolution of the architecture, **a standard three-node cluster can now handle peak values of nearly 100K TPS and millisecond-level transaction processing. In terms of availability and performance, it has reached a four-nines SLA guarantee, ensuring no failures throughout the year even in unattended conditions.**
  <br/>
#### The Evolution of Distributed Transactions
The birth of new things is always accompanied by doubts. Is middleware capable of ensuring data consistency reliable? The initial birth of TXC was just a vague theory, lacking theoretical models and engineering practice. After we conducted MVP (Minimum Viable Product) model testing and promoted business deployment, we often encountered faults and frequently had to wake up in the middle of the night to deal with issues, wearing wristbands to sleep to cope with emergency responses. These were the most painful years I went through technically after taking over the team.
![Evolution of Distributed Transactions](/img/blog/分布式事务演进.jpg)
Subsequently, we had extensive discussions and systematic reviews. We first needed to define the consistency problem. Were we to achieve majority consensus consistency like RAFT, solve database consistency issues like Google Spanner, or something else? Looking at the top-down layered structure from the application node, it mainly includes development frameworks, service invocation frameworks, data middleware, database drivers, and databases. We had to decide at which layer to solve the data consistency problem. We compared the consistency requirements, universality, implementation complexity, and business integration costs faced when solving data consistency issues at different levels. In the end, we weighed the pros and cons, decided to keep the implementation complexity to ourselves, and adopted the AT mode initially as a consistency component. We needed to ensure high consistency, but not be locked into specific database implementations, ensuring the generality of scenarios and the business integration costs were low enough to be easily implemented. This is also why TXC initially adopted the AT mode.
**A distributed transaction is not just a framework; it's a system.** We defined the consistency problem in theory, abstractly conceptualized modes, roles, actions, and isolation, etc. From an engineering practice perspective, we defined the programming model, including low-intrusion annotations, simple method templates, and flexible APIs, and defined basic and enhanced transaction capabilities (e.g., how to support a large number of activities at low cost), as well as capabilities in operations, security, performance, observability, and high availability.
![Transaction Logical Model](/img/blog/事务逻辑模型.jpg)
What problems do distributed transactions solve? A classic and tangible example is the money transfer scenario. The transfer process includes subtracting balance and adding balance, how do we ensure the atomicity of the operation? Without any intervention, these two steps may encounter various problems, such as account B being canceled or service call timeouts, etc.
**Timeout issues have always been a difficult problem to solve in distributed applications**; we cannot accurately know whether service B has executed and in what order. From a data perspective, this means the money in account B may not be successfully added. After the service-oriented transformation, each node only has partial information, while the transaction itself requires global coordination of all nodes, thus requiring a centralized role with a god's-eye view, capable of obtaining all information, which is the **TC (transaction coordinator)**, used to globally coordinate the transaction state. The **TM (Transaction Manager)** is the role that drives the generation of transaction proposals. However, even gods nod off, and their judgments are not always correct, so we need an **RM (resource manager)** role to verify the authenticity of the transaction as a representative of the soul. This is TXC's most basic philosophical model. We have methodologically verified that its data consistency is very complete, of course, our cognition is bounded. Perhaps the future will prove we were turkey engineers, but under current circumstances, its model is already sufficient to solve most existing problems.
![Distributed Transaction Performance](/img/blog/分布式事务性能.jpg)
**After years of architectural evolution, from the perspective of transaction single-link latency, TXC takes an average of about 0.2 milliseconds to process at the start of the transaction and about 0.4 milliseconds for branch registration, with the entire transaction's additional latency within the millisecond range. This is also the theoretical limit value we have calculated. In terms of throughput, the TPS of a single node reaches 30,000 times/second, and the TPS of a standard cluster is close to 100,000 times/second.**
<br/>
#### Seata Open Source
Why go open source? This is a question many people have asked me. In 2017, we commercialized the GTS (Global Transaction Service) product sold on Alibaba Cloud, with both public and private cloud forms. At this time, the internal group developed smoothly, but we encountered various problems in the process of commercialization. The problems can be summed up in two main categories: **First, developers are quite lacking in the theory of distributed transactions,** most people do not even understand what local transactions are, let alone distributed transactions. **Second, there are problems with product maturity,** often encountering various strange scenario issues, leading to a sharp rise in support and delivery costs, and R&D turning into after-sales customer service.
We reflected on why we encountered so many problems. The main issue here is that Alibaba Group internally has a unified language stack and unified technology stack, and our polishing of specific scenarios is very mature. Serving Alibaba, one company, and serving thousands of enterprises on the cloud is fundamentally different, which also made us realize that our product's scenario ecology was not well developed. On GitHub, more than 80% of open-source software is basic software, and basic software primarily solves the problem of scenario universality, so it cannot be locked in by a single enterprise, like Linux, which has a large number of community distributions. Therefore, in order to make our product better, we chose to open source and co-build with developers to popularize more enterprise users.
![Alibaba Open Source](/img/blog/阿里开源.jpg)
Alibaba's open-source journey has gone through three main stages. **The first stage is the stage where Dubbo is located, where developers contribute out of love,** Dubbo has been open sourced for over 10 years, and time has fully proven that Dubbo is an excellent open-source software, and its microkernel plugin extensibility design is an important reference for me when I initially open sourced Seata. When designing software, we need to consider which is more important between extensibility and performance, whether we are doing a three-year design, a five-year design, or a ten-year design that meets business development. While solving the 0-1 service call problem, can we predict the governance problems after the 1-100 scale-up?
**The second stage is the closed loop of open source and commercialization, where commercialization feeds back into the open-source community, promoting the development of the open-source community.** I think cloud manufacturers are more likely to do open source well for the following reasons:
- First, the cloud is a scaled economy, which must be established on a stable and mature kernel foundation, packaging its product capabilities including high availability, maintenance-free, and elasticity on top of it. An unstable kernel will inevitably lead to excessive delivery and support costs, and high penetration of the R&D team's support Q&A will prevent large-scale replication, and high penetration rates will prevent rapid evolution and iteration of products.
- Second, commercial products know business needs better. Our internal technical teams often YY requirements from a development perspective, and what they make is not used by anyone, and thus does not form a value conversion. The business requirements collected through commercialization are all real, so its open source kernel must also evolve in this direction. Failure to evolve in this direction will inevitably lead to architectural splits on both sides, increasing the team's maintenance costs.
- Finally, the closed loop of open source and commercialization can promote better development of both parties. If the open-source kernel often has various problems, would you believe that its commercial product is good enough?
  **The third stage is systematization and standardization.** First, systematization is the basis of open-source solutions. Alibaba's open-source projects are mostly born out of internal e-commerce scenario practices. For example, Higress is used to connect Ant Group's gateways; Nacos carries services with millions of instances and tens of millions of connections; Sentinel provides degradation and throttling capabilities for high availability during major promotions; and Seata ensures transaction data consistency. This set of systematized open-source solutions is designed based on the best practices of Alibaba's e-commerce ecosystem. Second, standardization is another important feature. Taking OpenSergo as an example, it is both a standard and an implementation. In the past few years, the number of domestic open-source projects has exploded. However, the capabilities of various open-source products vary greatly, and many compatibility issues arise when integrating with each other. Therefore, open-source projects like OpenSergo can define some standardized capabilities and interfaces and provide some implementations, which will greatly help the development of the entire open-source ecosystem.
  <br/>
### Latest Developments in the Seata Community
#### Introduction to the Seata Community
![Community Introduction](/img/blog/社区简介.jpg)
**At present, Seata has open-sourced 4 transaction modes, including AT, TCC, Saga, and XA, and is actively exploring other viable transaction solutions.** Seata has integrated with more than 10 mainstream RPC frameworks and relational databases, and has integrated or been integrated relationships with more than 20 communities. In addition, we are also exploring languages other than Java in the multi-language system, such as Golang, PHP, Python, and JS.
Seata has been applied to business systems by thousands of customers. Seata applications have become more mature, with successful cooperation with the community in the financial business scenarios of CITIC Bank and Everbright Bank, and successfully adopted into core accounting systems. The landing of microservices systems in financial scenarios is very stringent, which also marks a new level of maturity for Seata's kernel.
<br/>
#### Seata Ecosystem Expansion
![Ecosystem Expansion](/img/blog/扩展生态.jpg)
**Seata adopts a microkernel and plugin architecture design, exposing rich extension points in APIs, registry configuration centers, storage modes, lock control, SQL parsers, load balancing, transport, protocol encoding and decoding, observability, and more.** This allows businesses to easily perform flexible extensions and select technical components.
<br/>
#### Seata Application Cases
![Application Cases](/img/blog/应用案例.jpg)
**Case 1: China Aviation Information's Air Travel Project**
The China Aviation Information Air Travel project introduced Seata in the 0.2 version to solve the data consistency problem of ticket and coupon business, greatly improving development efficiency, reducing asset losses caused by data inconsistency, and enhancing user interaction experience.
**Case 2: Didi Chuxing's Two-Wheeler Business Unit**
Didi Chuxing's Two-Wheeler Business Unit introduced Seata in version 0.6.1, solving the data consistency problem of business processes such as blue bicycles, electric vehicles, and assets, optimizing the user experience, and reducing asset loss.
**Case 3: Meituan's Infrastructure**
Meituan's infrastructure team developed the internal distributed transaction solution Swan based on the open-source Seata project, which is used to solve distributed transaction problems within Meituan's various businesses.
**Case 4: Hema Town**
Hema Town uses Seata to control the flower-stealing process in game interactions, significantly shortening the development cycle from 20 days to 5 days, effectively reducing development costs.
<br/>
#### Evolution of Seata Transaction Modes
![Mode Evolution](/img/blog/模式演进.jpg)
<br/>
#### Current Progress of Seata
- Support for Oracle and PostgreSQL multi-primary keys.
- Support for Dubbo3.
- Support for Spring Boot3.
- Support for JDK 17.
- Support for ARM64 images.
- Support for multiple registration models.
- Extended support for various SQL syntaxes.
- Support for GraalVM Native Image.
- Support for Redis lua storage mode.
  <br/>
### Seata 2.x Development Planning
![Development Planning](/img/blog/发展规划.jpg)
Mainly includes the following aspects:
- **Storage/Protocol/Features**
  Explore storage and computing separation in Raft cluster mode; better experience, unify the current 4 transaction mode APIs; compatible with GTS protocol; support Saga annotations; support distributed lock control; support data perspective insight and governance.
- **Ecosystem**
  Support more databases, more service frameworks, while exploring support for the domestic trust creation ecosystem; support the MQ ecosystem; further enhance APM support.
- **Solutions**
  In addition to supporting microservices ecosystems, explore multi-cloud solutions; closer to cloud-native solutions; add security and traffic protection capabilities; achieve self-convergence of core components in the architecture.
- **Multi-Language Ecosystem**
  Java is the most mature in the multi-language ecosystem, continue to improve other supported programming languages, while exploring Transaction Mesh solutions that are independent of languages.
- **R&D Efficiency/Experience**
  Improve test coverage, prioritize quality, compatibility, and stability; restructure the official website's documentation to improve the hit rate of document searches; simplify operations and deployment on the experience side, achieve one-click installation and metadata simplification; console supports transaction control and online analysis capabilities.

In one sentence, the 2.x plan is summarized as: **Bigger scenarios, bigger ecosystems, from usable to user-friendly.**
<br/>
### Contact Information for the Seata Community
![Contact Information](/img/blog/联系方式.jpg)
