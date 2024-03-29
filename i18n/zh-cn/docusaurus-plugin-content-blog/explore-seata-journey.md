---
title: 探索 Seata 项目开源开发之旅
keywords: [Seata,开源,开源之夏,分布式事务]
description: 本文中，我将与大家分享我在 Seata 社区中的开发者之旅，以及在这个旅程中积累的经验和见解。
author: 尹祥琨-清华大学，Seata 开源之夏学生参与者
date: 2023-11-27
---

> Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。在今年的开源之夏活动中，我加入了 Apache Seata (Incubator) 社区，完成了开源之夏的课题，并从此一直积极参与社区。我有幸在云栖大会-开发者秀场上分享了我的开发者经验。在本文中，我将与大家分享我在 Seata 社区中的开发者之旅，以及在这个旅程中积累的经验和见解。希望通过我的故事，能够激励更多人踏上这充满挑战和激励的开源之路，为开源社区的繁荣做出自己的贡献。


## 相关背景

在正式介绍我的经历之前，我想先提供一些相关的背景信息，以解释为什么我要参与开源以及如何参与开源。关于参与开源的原因，我相信每个人都有不同的动机。以下是我认为一些主要的原因：

-  **学习**：参与开源使我们有机会为不同组织开发的开源项目做出贡献，与行业专家互动，提供了学习的机会。 
-  **技能提升**：以我为例，我通常使用 Java 和 Python 进行后端开发。但在参与Seata项目时，我有机会学习Go语言，拓宽了我的后端技术栈。此外作为学生，我很难接触到生产级框架或应用，而开源社区为我提供了这个机会。 
-  **兴趣**：我身边的朋友都是热衷于开源的，他们享受编程，对开源充满热情。 
-  **求职**：参与开源可以丰富我们的作品集，为简历增加分量。 
-  **工作需求**：有时参与开源是为了解决工作中遇到的问题或满足工作需求。 

这些都是参与开源的原因，对我来说，学习、技能提升和兴趣是我参与开源的主要动机。无论你是在校学生还是在职人员，如果你有参与开源的意愿，不要犹豫，任何人都可以为开源项目做出贡献。年龄、性别、工作和所在地都不重要，关键是你的热情和对开源项目的好奇心。

**我参与开源的契机是参加了中科院软件所举办的开源之夏活动。**	

开源之夏是一个面向高校开发者的开源活动，社区发布开源项目，学生开发者在导师的指导下完成项目的开发，结项成果贡献给社区，合入社区仓库，获得项目奖金和证书。开源之夏是踏入开源社区的一个绝佳契机，也是我第一次比较正式地接触开源项目，而这个经历为我打开了一扇全新的大门。自此我深刻地认识到参与开源项目的建设，分享自己的技术成果，让更多的开发者能够使用你所贡献的东西，是一件极富乐趣和意义的事情。

下面我分享的这张图片是开源之夏官方公开的数据，从 2020 年开始参与的社区数量还有学生数量都在逐年增加，活动也是越办越好。可以看到今年的参与的社区项目共有 133 个，每个社区又提供了若干个课题，而每位学生只能选择一个课题。想要在这么多个社区中找到想要参与的社区和适合自己的课题是一个相对复杂的任务。

![img](/img/blog/explore-seata-ospp.png)

**综合考虑社区的活跃程度、技术栈契合度、新人引导情况等，最终我选择加入 Seata 社区。**

Seata 是一款开源的分布式事务框架，提供了完整的分布式事务解决方案，包括 AT、TCC、Saga 和 XA 事务模式，可支持多种编程语言和数据存储方案。从 19 年开源起到今年已经走过了 **5** 个年头，社区中有超过 **300** 多位贡献者，项目收获了 **24k+** 星标，是一个非常成熟的社区。同时 Seata 兼容 **10** 余种主流 RPC 框架和 RDBMS，与 **20** 多个社区存在集成和被集成的关系，被**几千**家客户应用到业务系统中，可以说是分布式事务解决方案的事实标准。

![img](/img/blog/explore-seata-apache.png)

2023 年 10 月 29 日，Seata 正式捐赠给了 Apache 软件基金会，成为孵化项目。经过孵化之后，Seata将有望成为首个 Apache 软件基金会的分布式事务框架顶级项目。这次捐赠也将推动 Seata 更广泛地发展，对生态系统的建设产生深远的影响，从而使更多的开发者受益。这个重要的里程碑也为 Seata 带来更广阔的发展空间。

## 开发之旅

**介绍完了一些基本情况，后文中我将分享我在 Seata 社区的开发之旅。**

在正式开始开发之前，我进行了许多准备工作。因为 Seata 已经经历了五年的发展，积累了数十万行代码，因此直接参与开发需要一定的上手成本。我分享了一些准备经验，希望能够为大家提供一些启发。

1.  文档和博客是第一手材料
      	文档和博客这类的文本材料可以帮助社区新人迅速了解项目背景和代码结构。
      	首先，官方文档是最主要的参考资料，从这里可以了解到一切官方认为你需要了解的东西。
   ![img](/img/blog/explore-seata-docs.png)
   	博客，仅次于官方文档的材料，一般是开发者或者是深度用户编写的，和文档不同的点在于博客可能会更深入到某个专项上去介绍，比如一些项目的理论模型、项目结构、某个模块的源码分析等等。
   ![img](/img/blog/explore-seata-blogs.png)
   	公众号，和博客类似，一般是偏技术性的文章，公众号还有个优点是可以订阅推送，利用碎片时间阅读一些技术。
   ![img](/img/blog/explore-seata-pubs.png)
   	此外，开源社区的一些在线分享或线下 Meetup 公开的幻灯片也是非常有意义的文本资料。
   ![img](/img/blog/explore-seata-slides.png)
   	除了官方资料之外，还有许多第三方资料可供学习，比如可以通过用户分享的 use cases 了解项目的具体实施和实践；通过第三方社区的集成文档了解项目的生态；还有就是通过第三方的视频教程来学习。但在所有这些资料中，我认为官方文档和博客是最有帮助的。 
2.  熟悉使用框架
      	当然刚才说的这些文本资料肯定不需要面面俱到的看完，纸上得来终觉浅，看到感觉差不多明白了就可以去实践了。可以按照官方文档的"Get Started"章节逐步了解项目的基本流程。另一种方法是查找官方提供的示例或演示，构建并运行它们，理解代码和配置的含义，并通过使用项目了解项目的需求、目标以及现有功能和架构。
      	例如，Seata有一个名为 seata-samples 的仓库，其中包含20多种用例，比如 Seata 和 Dubbo 集成，和 SCA, Nacos 集成的案例，基本可以覆盖到支持的所有场景。
3.  粗略阅读源代码把握主要逻辑
      	在准备阶段，粗略地阅读源代码以把握项目的主要逻辑也很重要。了解如何高效地把握项目的主要内容是一个需要长期积累的技能。首先，通过前述的准备步骤，了解项目的概念、交互和流程模型是很有帮助的。
      	以Seata为例，通过官方文档和实际操作，可以了解Seata事务领域的三个角色：TC（Transaction Coordinator）、TM（Transaction Manager）和 RM（Resource Manager）。TC 作为独立部署的 Server 用于维护全局和分支事务的状态，是 Seata 实现高可用的关键；TM 用于与 TC 交互，定义全局事务的开始、提交或回滚；RM 用于管理分支事务处理的资源，与 TC 交互以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。粗略地了解这些角色之间的交互后，可以更轻松地把握项目的主要逻辑。
   ![img](/img/solution.png)
   	脑海里刻下了这些模型的印象，对源码的主干提取就相对得心应手了一些。比如 Seata TC 事务协调者，作为 Server 端，是一个独立于业务部署的单独应用。那为了分析源码，就可以直接在本地把 server 起起来，通过启动类开始追踪。可以分析到一些初始化的逻辑比如服务注册、全局锁的初始化等等。还有可以通过 RPC 的调用来追踪到交互逻辑的代码，比如 TC 是如何对全局事务和分支事务进行持久化，如何驱动全局事务提交或者回滚的。
   	然而内嵌客户端的框架代码，没有一个启动类入口可以入手分析。那其实可以从一个 sample 入手，找到其对框架代码的引用从而进行阅读。比如 Seata 一个很重要的注解是 `GlobalTransaction`，用于标识一个全局事务。想要知道 TM 是如何对这个注解分析的，那我们通过 IDE 的搜索功能，找到 `GlobalTransaction` 的拦截器即可分析其中的逻辑。
   	还有一个小 tips 分享给大家，往往来说单测注重于单一模块的职能，可以通过阅读单测可以了解一个模块的输入输出、逻辑边界，也可以顺着单测的调用链去阅读代码，也是理解源码一个很重要的手段。 

**万事俱备只欠东风，做完充足的准备，下一步就是区积极参与到社区之中。**

参与的方式也有很多种，最常见的参与方式是查看项目的 Issues 列表，社区通常会为新贡献者标记一些带有特殊标签的 Issue，如“good-first-issue”、“contributions-welcome”和“help-wanted”等。可以通过这些标签筛选感兴趣的任务。

![img](/img/blog/explore-seata-issues.png)

除了 Issues，GitHub 还提供了讨论的功能，可以参与一些公开的讨论并获取新的想法。

![img](/img/blog/explore-seata-discussion.png)

此外，社区通常会定期举行会议，比如周会或双周会，可以通过参加这些会议来了解社区的最新进展，提出问题以及与其他社区成员交流。

## 总结与心得

我加入 Seata 社区最初是通过开源之夏活动。我完成了我的课题，为 Seata Saga 实现了一些新的功能，也做了一系列的优化。但我不止于此，因为在 Seata 的开源经历中我获得了学生生涯中最宝贵的一次开发者体验，在之后的时间我也持续通过上述参与方式持续活跃在社区中。这主要得益于以下几个方面：

1.  **沟通与社交**：导师制度为我提供了重要的支持。在开发过程中，我与我的导师亦夏之间的密切合作对我适应社区文化和工作流程起到了关键作用。他不仅帮助我适应了社区，还为我提供了程序设计的思路，也与我分享了一些在工作中的经验和见解，这些都对我的发展非常有帮助。此外，Seata 社区创始人清铭也提供了很多帮助，包括建立了与其他同学的联系，帮助我进行 Code Review，也为我提供了许多机会。 
2.  **正反馈**：在 Seata 的开发过程中，我经历了一个良性的循环。许多细节为我提供了许多正反馈，例如我的贡献能被用户广泛使用和受益，比如开发得到了社区的认可。这些正反馈加强了我继续在 Seata 社区贡献的意愿。 
3.  **技能提升**：再就是参与 Seata 开发，对我能力的提升也是巨大的。在这里，我能学习到生产级别的代码，包括性能优化，接口设计，边界判断的技巧。可以直接参与一个开源项目的运作，包括项目计划，安排，沟通等。当然还了解一个分布式事务框架是如何设计并实现的。 

除了这些宝贵的开发者体验，我也从这次经历中体悟到了一些关于参与开源的个人心得，为激励其他有兴趣参与开源社区的同学，我做了简单的总结：

1.  **了解和学习社区文化和价值观**：每个开源社区都有不同的文化和价值观。了解社区的文化和价值观对于成功参与社区至关重要。观察和了解社区其他成员的日常开发和交流方式是学习社区文化的好方法。在社区中要尊重他人的意见和包容不同的观点。 
2.  **敢于迈出第一步**：不要害怕面对困难，迈出第一步是参与开源社区的关键。可以通过领取标有"good-first-issue"等标签的 Issue，编写文档、单元测试等方式来开始。重要的是要克服畏难情绪，积极尝试并学习。 
3.  **对自己的工作要充满信心**：不要怀疑自己的能力。每个人都是从零开始的，没有人天生就是专家。参与开源社区是一个学习和成长的过程，需要不断的实践和积累经验。 
4.  **积极参与讨论，持续学习不同技术**：不要害怕提出问题，无论是关于项目的具体技术还是开发过程中的挑战。同时也不要局限于一个领域。尝试学习和掌握不同编程语言、框架和工具，这可以拓宽技术视野，为项目提供有价值的洞见。 

------

通过我的开源之旅，我积累了宝贵的经验和技能，这些不仅帮助我成长为一个更有价值的开发者，也让我深刻地了解了开源社区的力量。然而，我不仅仅是个别的参与者，我代表着 Seata 社区的一部分。Seata 作为一个正在不断成长和演变的开源项目，有着巨大的潜力，同时也面临着新的挑战。因此我要强调 Seata 社区的重要性和未来的潜力，它已经进入 Apache 软件基金会的孵化阶段，这个重要的里程碑将为 Seata 带来更广阔的发展空间。Seata 欢迎更多的开发者和贡献者的加入，让我们共同推动这个开源项目的发展，为分布式事务领域的进步贡献一份力量。
