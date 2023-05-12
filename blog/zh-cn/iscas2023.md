---
title: 6大课题现已开放挑选 | 欢迎报名 Seata 开源之夏
author: Seata社区
date: 2023/05/12
keywords: 开源之夏、seata、分布式事务
---

# 6大课题现已开放挑选 | 欢迎报名 Seata 开源之夏

###  欢迎大家报名Seata 开源之夏2023课题
开源之夏 2023 学生报名期为 **4 月 29 日-6月4日**，欢迎报名Seata 2023 课题！在这里，您将有机会深入探讨分布式事务的理论和应用，并与来自不同背景的同学一起合作完成实践项目。我们期待着您的积极参与和贡献，共同推动分布式事务领域的发展。

![summer2023-1](/img/blog/summer2023-1.jpg)

### 开源之夏2023 
开源之夏是由中科院软件所“开源软件供应链点亮计划”发起并长期支持的一项暑期开源活动，旨在鼓励在校学生积极参与开源软件的开发维护，培养和发掘更多优秀的开发者，促进优秀开源软件社区的蓬勃发展，助力开源软件供应链建设。

参与学生通过远程线上协作方式，配有资深导师指导，参与到开源社区各组织项目开发中并收获奖金、礼品与证书。**这些收获，不仅仅是未来毕业简历上浓墨重彩的一笔，更是迈向顶尖开发者的闪亮起点，可以说非常值得一试。**  每个项目难度分为基础和进阶两档，对应学生结项奖金分别为税前人民币 8000 元和税前人民币 12000 元。

### Seata社区介绍 
**Seata** 是一款开源的分布式事务解决方案，GitHub获得超过23K+ Starts致力于在微服务架构下提供高性能和简单易用的分布式事务服务。在 Seata 开源之前，Seata 在阿里内部一直扮演着分布式数据一致性的中间件角色，几乎每笔交易都要使用Seata，历经双11洪荒流量的洗礼，对业务进行了有力的技术支撑。

### Seata社区开源之夏2023项目课题汇总  
Seata社区为开源之夏2023组委会推荐6项精选项目课题，您可以访问以下链接进行选报：   
https://summer-ospp.ac.cn/org/orgdetail/064c15df-705c-483a-8fc8-02831370db14?lang=zh   
请及时与各导师沟通并准备项目申请材料，并登录官方注册申报（以下课题顺序不分先后）：
![seata2023-2](/img/blog/summer2023-2.png)

#### 项目一: 实现用于服务发现和注册的NamingServer

**难度：** 进阶/Advanced

**项目社区导师：** 陈健斌

**导师联系邮箱：** 364176773@qq.com

**项目简述：**   
目前seata的服务暴露及发现主要依赖于第三方注册中心，随着项目的演进发展，带来了额外的学习使用成本，而业内主流具有服务端的中间件大多都开始演进自身的服务自闭环和控制及提供于服务端更高契合度和可靠性的组件或功能如kafka 的KRaft，rocketmq的NameServer，clickhouse的ClickHouse Keeper等.故为了解决如上问题和架构演进要求,seata需要构建自身的nameserver来保证更加稳定可靠。

**项目链接：**
https://summer-ospp.ac.cn/org/prodetail/230640380?list=org&navpage=org
<br/>
<br/>

#### 项目二: 在seata-go中实现saga事务模式

**难度：** 进阶/Advanced

**项目社区导师：** 刘月财

**导师联系邮箱：** luky116@apache.org

**项目简述：**
Saga模式是SEATA提供的长事务解决方案，在Saga模式中，业务流程中每个参与者都提交本地事务，当出现某一个参与者失败则补偿前面已经成功的参与者，一阶段正向服务和二阶段补偿服务都由业务开发实现。Seata-go 中当前没有支持saga模式，希望后面参考Java版本的实现能将该功能支持上。

**项目链接：**
https://summer-ospp.ac.cn/org/prodetail/230640382?list=org&navpage=org
<br/>
<br/>

#### 项目三: seata saga模式产品化能力提升
**难度：** 进阶/Advanced

**项目社区导师：** 李宗杰

**导师联系邮箱：** leezongjie@163.com

**项目简述：**
saga作为分布式事务的解决方案之一，在长事务上应用尤其广泛，seata也提供了对应的状态机实现。随着业务的不断发展和接入，对seata提出了更高的要求，我们需要支持流式saga 编排，对当前状态机的实现进行优化和扩展，进一步服务业务。

**项目链接：**
https://summer-ospp.ac.cn/org/prodetail/230640415?list=org&navpage=org
<br/>
<br/>

#### 项目四:  增加控制台事务控制能力
**难度：** 进阶/Advanced

**项目社区导师：** 王良

**导师联系邮箱：** 841369634@qq.com

**项目简述：**
在分布式事务中，经常会存在非常多的异常情况，这些异常情况往往会导致系统无法继续运行。而这些异常往往需要人工介入排查原因并排除故障，才能够使系统继续正常运行。虽然seata 提供了控制台查询事务数据，但还未提供任何事务控制能力，帮助排除故障。所以，本课题主要是在seata服务端控制台上，添加事务控制能力。

**项目链接：**
https://summer-ospp.ac.cn/org/prodetail/230640423?list=org&navpage=org
<br/>
<br/>

#### 项目五:  提高单测覆盖率和建立集成测试
**难度：** 基础/Basic

**项目社区导师：** 张嘉伟

**导师联系邮箱：** 349071347@qq.com

**项目简述：**
为了进一步提高项目的质量以及稳定性, 需要进一步提升项目单元测试覆盖率以及加入集成测试来模拟生产中不同的场景. 集成测试的目的是为了模拟client与server的交互过程, 而非单一的对某个接口进行测试。

**项目链接：**
https://summer-ospp.ac.cn/org/prodetail/230640424?list=org&navpage=org
<br/>
<br/>

#### 项目六: 实现Seata运维ctl工具
**难度：** 进阶/Advanced

**项目社区导师：** 季敏

**导师联系邮箱：**  jimin.jm@alibaba-inc.com

**项目简述：** 运维ctl命令在Seata中非常重要，它是Seata的命令行工具，可以帮助我们管理和操作Seata的各种组件。运维ctl命令可以让我们快速地启动、停止和管理Seata服务，定位和解决问题。此外，运维ctl 命令还提供了丰富的指令，可以让我们方便地检查Seata的健康状态、模拟事务和打印导出配置信息等，大大提高了我们的工作效率和运维体验。

以下是对实现定制ctl运维命令行的一些建议： 
- 借鉴其他开源项目的实现方式，比如kubectl，helm等，并根据Seata的特点和需求进行定制。
- 将常用的运维操作直接封装进命令行，减少用户的手动操作。
- 考虑使用友好的命令和参数名称，将命令行设计得易于理解和记忆。
- 提供详细的帮助文档和示例，帮助用户快速上手和了解如何使用各种参数和选项。
- 考虑命令行的跨平台支持，例如支持Windows、Linux和MacOS等操作系统。
一款好的ctl命令行应该是易用、灵活、可定制、健壮和易维护的。

项目链接：https://summer-ospp.ac.cn/org/prodetail/230640431?list=org&navpage=org
<br/>
<br/>

###  如何参与开源之夏2023并快速选定项目？  
**欢迎通过上方联系方式，与各导师沟通并准备项目申请材料。**

课题参与期间，学生可以在世界任何地方线上工作，Seata相关项目结项需要在**9月30日**前以 PR 的形式提交到Seata社区仓库中并完成合并，请务必尽早准备。
![seata2023-3](/img/blog/summer2023-3.png)

**需要在课题期间第一时间获取导师及其他信息,可扫码进入钉钉群交流** ——了解Seata社区各领域项目、结识Seata社区开源导师，以助力后续申请。
<br/>
<img src="/img/blog/summer2023-4.jpg" height="290" width="250"/>
<br/>

####  参考资料：
**Seata网站 :**  https://seata.io/

**Seata GitHub :** https://github.com/seata

**开源之夏官网：** https://summer-ospp.ac.cn/org/orgdetail/ab188e59-fab8-468f-bc89-bdc2bd8b5e64?lang=zh

如果同学们对微服务其他领域项目感兴趣，也可以尝试申请，例如：

- 对于**微服务配置注册中心**有兴趣的同学，可以尝试填报[Nacos 开源之夏](https://nacos.io/zh-cn/blog/iscas2023.html)；
- 对于**微服务框架和RPC框架**有兴趣的同学，可以尝试填报[Spring Cloud Alibaba 开源之夏](https://summer-ospp.ac.cn/org/orgdetail/41d68399-ed48-4d6d-9d4d-3ff4128dc132?lang=zh) 和 [Dubbo 开源之夏](https://summer-ospp.ac.cn/org/orgdetail/a7f6e2ad-4acc-47f8-9471-4e54b9a166a6?lang=zh) ；
- 对于**云原生网关**有兴趣的同学，可以尝试填报[Higress 开源之夏](https://higress.io/zh-cn/blog/ospp-2023)；
- 对于**分布式高可用防护**有兴趣的同学，可以尝试填报 [Sentinel 开源之夏](https://summer-ospp.ac. cn/org/orgdetail/5e879522-bd90-4a8b-bf8b-b11aea48626b?lang=zh) ；
- 对于**微服务治理**有兴趣的同学，可以尝试填报  [OpenSergo 开源之夏](https://summer-ospp.ac. cn/org/orgdetail/aaff4eec-11b1-4375-997d-5eea8f51762b?lang=zh)。


