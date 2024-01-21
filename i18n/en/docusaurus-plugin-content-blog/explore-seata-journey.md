---
title: Exploring the Journey of Open Source Development in Seata Project
keywords: [Seata, open source, Summer of Code, distributed transactions]
description: In this article, I will share my journey as a developer in the Seata community, along with the experiences and insights I have gained during this adventure.
author: Yinxiangkun - Tsinghua University, participant in Seata Summer of Code
date: 2023-11-27
---

> Seata is an open-source distributed transaction solution dedicated to providing high-performance and user-friendly distributed transaction services in a microservices architecture. During this year's Summer of Code event, I joined the Apache Seata (Incubator) community, completed the Summer of Code project, and have been actively involved in the community ever since. I was fortunate to share my developer experience at the YunQi Developer Show during the Cloud Conferen

## Relevant Background

Before formally introducing my experiences, I would like to provide some relevant background information to explain why I chose to participate in open source and how I got involved. There are various motivations for participating in open source, and here are some of the main reasons I believe exist:

- **Learning**: Participating in open source provides us with the opportunity to contribute to open-source projects developed by different organizations, interact with industry experts, and offers learning opportunities.
- **Skill Enhancement**: In my case, I usually work with Java and Python for backend development. However, when participating in the Seata project, I had the chance to learn the Go language, expanding my backend technology stack. Additionally, as a student, it's challenging to encounter production-level frameworks or applications, and the open-source community provided me with this opportunity.
- **Interest**: Many of my friends are passionate about open source, enjoying programming and being enthusiastic about open source.
- **Job Seeking**: Participating in open source can enrich our portfolio, adding weight to resumes.
- **Work Requirements**: Sometimes, involvement in open source is to address work-related challenges or meet job requirements.

These are some reasons for participating in open source. For me, learning, skill enhancement, and interest are the primary motivations. Whether you are a student or a working professional, if you have the willingness to participate in open source, don't hesitate. Anyone can contribute to open-source projects. Age, gender, occupation, and location are not important; the key is your passion and curiosity about open-source projects.

**The opportunity for me to participate in open source arose when I joined the Open Source Promotion Plan (OSPP) organized by the Institute of Software, Chinese Academy of Sciences.**

OSPP is an open-source activity for university developers. The community releases open-source projects, and student developers complete project development under the guidance of mentors. The completed results are contributed to the community, merged into the community repository, and participants receive project bonuses and certificates. OSPP is an excellent opportunity to enter the open-source community, and it was my first formal encounter with open-source projects. This experience opened a new door for me. I deeply realized that participating in the construction of open-source projects, sharing your technical achievements, and enabling more developers to use what you contribute is a joyful and meaningful endeavor.

The image below, officially released by OSPP, shows that the number of participating communities and students has been increasing year by year since 2020, and the event is getting better. This year, a total of 133 community projects were involved, each providing several topics, with each student selecting only one topic. Choosing a community to participate in and finding a suitable topic in such a large number of communities is a relatively complex task.

![img](/img/blog/explore-seata-ospp.png)

**Considering factors such as community activity, technical stack compatibility, and guidance for newcomers, I ultimately chose to join the Seata community.**

Seata is an open-source distributed transaction framework that provides a complete distributed transaction solution, including AT, TCC, Saga, and XA transaction modes, and supports multiple programming languages and data storage solutions. Since its open source in 2019, Seata has been around for **5** years, with over **300** contributors in the community. The project has received **24k+** stars and is a mature community. Seata is compatible with **10+** mainstream RPC frameworks and RDBMS, has integration relationships with **20+** communities, and is applied to business systems by **thousands** of customers. It can be considered the de facto standard for distributed transaction solutions.

![img](/img/blog/explore-seata-apache.png)

### Seata's Journey to Apache Incubator

On October 29, 2023, Seata was formally donated to the Apache Software Foundation and became an incubating project. After incubation, Seata is expected to become the first top-level distributed transaction framework project under the Apache Software Foundation. This donation will propel Seata to a broader development scope, profoundly impacting ecosystem construction, and benefiting more developers. This significant milestone also opens up broader development opportunities for Seata.

## Development Journey

**Having introduced some basic information, the following sections will delve into my development journey in the Seata community.**

Before officially starting development, I undertook several preparatory steps. Given Seata's five years of development and the accumulation of hundreds of thousands of lines of code, direct involvement requires a certain learning curve. I share some preparatory experiences in the hope of providing inspiration.

1. **Documentation and Blogs as Primary Resources**
   - Text materials such as documentation and blogs help newcomers quickly understand project background and code structure.
   - Official documentation is the primary reference material, providing insights into everything the official documentation deems necessary to know.
   ![img](/img/blog/explore-seata-docs.png)
   - Blogs, secondary to official documentation, are often written by developers or advanced users. Blogs may delve deeper into specific topics, such as theoretical models of projects, project structure, and source code analysis of specific modules.
   ![img](/img/blog/explore-seata-blogs.png)
   - Public accounts (such as WeChat) are similar to blogs, generally containing technical articles. An advantage of public accounts is the ability to subscribe for push notifications, allowing for technical reading during spare time.
   ![img](/img/blog/explore-seata-pubs.png)
   - Additionally, slides from online or offline community presentations and meetups provide meaningful textual materials.
   ![img](/img/blog/explore-seata-slides.png)
   - Apart from official materials, many third-party resources are available for learning, such as understanding specific implementations and practices through user-shared use cases, exploring the project's ecosystem through integration documentation from third-party communities, and learning through video tutorials. However, among all these materials, I consider official documentation and blogs to be the most helpful.

2. **Familiarizing Yourself with the Framework**
   - Not all text materials need to be thoroughly read. Understanding is superficial if confined to paper. Practice should commence when you feel you understand enough. The "Get Started" section in the official documentation is a step-by-step guide to understanding the project's basic workflow.
   - Another approach is to find examples or demonstrations provided by the official project, build and run them, understand the meanings of code and configurations, and learn about the project's requirements, goals, existing features, and architecture through usage.
   - For instance, Seata has a repository named "seata-samples" containing over 20 use cases, covering scenarios like Seata integration with Dubbo, integration with SCA, and Nacos integration. These examples cover almost all supported scenarios.

3. **Roughly Reading Source Code to Grasp Main Logic**
   - In the preparation phase, roughly reading the source code to grasp the project's main logic is crucial. Efficiently understanding a project's core content is a skill that requires long-term accumulation.
   - First, through the previously mentioned preparation steps, understanding the project's concepts, interactions, and process models is helpful.
   - Taking Seata as an example, through official documentation and practical operations, you can understand the three roles in Seata's transaction domain: TC (Transaction Coordinator), TM (Transaction Manager), and RM (Resource Manager). TC, deployed independently as a server, maintains the state of global and branch transactions, crucial for Seata's high availability. TM interacts with TC, defining the start, commit, or rollback of global transactions. RM manages resources for branch transaction processing, interacts with TC to register branch transactions and report branch transaction states, and drives branch transaction commit or rollback. After roughly understanding the interaction between these roles, grasping the project's main logic becomes easier.
   ![img](/img/solution.png)
   - Having a mental impression of these models makes it easier to extract the main logic from the source code. For example, analyzing the Seata TC transaction coordinator, as a server-side application deployed independently of the business, involves starting the server locally and tracking it through the startup class. This analysis can reveal some initialization logic, such as service registration and initialization of global locks. Tracking the code through RPC calls can reveal how TC persists global and branch transactions and how it drives global transaction commit or rollback.
   - However, for embedded client framework code without a startup class entry point for analysis, starting with a sample can be effective. Finding references to framework code in a sample allows for code reading. For instance, a crucial annotation in Seata is `GlobalTransaction`, used to identify a global transaction. To understand how TM analyzes this annotation, one can use the IDE's search function to find the interceptor for `GlobalTransaction` and analyze its logic.
   - Here's a tip: Unit tests often focus on the functional aspects of a single module. Reading unit tests can reveal a module's input-output, logic boundaries, and understanding the code through the unit test's call chain is an essential means of understanding the source code.

**With everything prepared, the next step is to actively participate in the community.**

## Ways to Contribute and Personal Insights

There are various ways to participate, with one of the most common being to check the project's Issues list. Communities often mark issues suitable for new contributors with special labels such as "good-first-issue," "contributions-welcome," and "help-wanted." Interested tasks can be filtered through these labels.

![img](/img/blog/explore-seata-issues.png)

In addition to Issues, GitHub provides a discussion feature where you can participate in open discussions and gain new ideas.

![img](/img/blog/explore-seata-discussion.png)

Furthermore, communities often hold regular meetings, such as weekly or bi-weekly meetings, where you can stay updated on the community's latest progress, ask questions, and interact with other community members.

## Summary and Insights

I initially joined the Seata community through the Open Source Summer Program. I completed my project, implemented new features for Seata Saga, and carried out a series of optimizations. However, I didn't stop there. My open-source experience with Seata provided me with the most valuable developer experience in my student career. Over time, I continued to stay active in the community through the aforementioned participation methods. This was mainly due to the following factors:

1. **Communication and Networking:** The mentorship system provided crucial support. During development, the close collaboration between my mentor and me played a key role in adapting to community culture and workflow. My mentor not only helped me acclimate to the community but also provided design ideas and shared work-related experiences and insights, all of which were very helpful for my development. Additionally, Seata community founder Ming Cai provided a lot of assistance, including establishing contacts with other students, helping with code reviews, and offering many opportunities.

2. **Positive Feedback:** During Seata's development, I experienced a virtuous cycle. Many details provided positive feedback, such as my contributions being widely used and beneficial to users, and the recognition of my development efforts by the community. This positive feedback strengthened my desire to continue contributing to the Seata community.

3. **Skill Enhancement:** Participating in Seata development greatly enhanced my abilities. Here, I could learn production-level code, including performance optimization, interface design, and techniques for boundary judgment. I could directly participate in the operation of an open-source project, including project planning, scheduling, and communication. Additionally, I gained insights into how a distributed transaction framework is designed and implemented.

In addition to these valuable developer experiences, I gained some personal insights into participating in open source. To inspire other students interested in joining open-source communities, I made a simple summary:

1. **Understand and Learn Community Culture and Values:** Every open-source community has different cultures and values. Understanding a community's culture and values is crucial for successful participation. Observing and understanding the daily development and communication styles of other community members is a good way to learn community culture. Respect others' opinions and embrace different viewpoints in the community.

2. **Dare to Take the First Step:** Don't be afraid of challenges; taking the first step is key to participating in open-source communities. You can start by tackling issues labeled "good-first-issue" or by contributing to documentation, unit tests, etc. Overcoming the fear of difficulties, actively trying, and learning are crucial.

3. **Have Confidence in Your Work:** Don't doubt your abilities. Everyone starts from scratch, and no one is born an expert. Participating in open-source communities is a process of learning and growth that requires continuous practice and experience accumulation.

4. **Actively Participate in Discussions, Keep Learning Different Technologies:** Don't hesitate to ask questions, whether about specific project technologies or challenges in the development process. Also, don't limit yourself to one domain. Try to learn and master different programming languages, frameworks, and tools. This broadens your technical perspective and provides valuable insights for the project.

---

Through my open-source journey, I accumulated valuable experience and skills. This not only helped me grow into a more valuable developer but also gave me a profound understanding of the power of open-source communities. However, I am not just an individual participant; I represent a part of the Seata community. Seata, as a continuously growing and evolving open-source project, has tremendous potential and faces new challenges. Therefore, I want to emphasize the importance of the Seata community and its future potential. It has entered the incubation stage of the Apache Software Foundation, a significant milestone that will bring broader development opportunities for Seata. Seata welcomes more developers and contributors to join us. Let's work together to drive the development of this open-source project and contribute to the advancement of the distributed transaction field.


