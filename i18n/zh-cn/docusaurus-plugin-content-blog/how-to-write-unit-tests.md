---
title: 如何在seata中编写测试用例
keywords: [Seata, unit test, junit, mockito, assertj]
description: 这篇文章主要介绍了Seata中已经使用的测试用例相关框架，以及社区建议开发者如何更好的编写测试用例
author: 汪忠祥 - trustdecision 技术专家
date: 2024-02-20
---

## 背景
随着 Seata 项目的不断发展和壮大，我们的贡献者群体也在持续扩大。项目的功能不断增强，对于代码质量的要求也在提高。在这个过程中，我们期望每一位贡献者在提交功能代码的同时，能够附带规范、完备的测试用例。

一个优秀的项目，其完备的单元测试是基本保障。Test-Driven Development（TDD）理念已经提出多年，它强调在编写功能代码之前先编写测试用例。通过编写单元测试，开发者可以更深入地理解代码中相关类和方法的作用，掌握核心逻辑，熟悉各种场景的运行情况。同时，单元测试也为开源项目提供了稳定安全的保障，使得项目在接受贡献者代码时，能够确保代码的质量和稳定性。  单元测试是质量保障的第一环，有效的单元测试能够提前发现90%以上的代码Bug问题，同时也能防止代码的腐化。在项目重构和演进过程中，单元测试起到了至关重要的作用，它能够确保重构后的代码仍然能够正常工作，不会引入新的Bug。

 在社区看来，贡献合理的测试用例代码和贡献功能代码同样重要，为了帮助开发者编写出高质量的测试用例，本文给出一些基础的规范和建议。
## 推荐的框架
当前社区使用以下三个框架编写测试用例；
### junit5
junit是Java中最常用的单元测试框架，用于编写和运行可重复的测试用例。
```java
        <junit-jupiter.version>5.8.2</junit-jupiter.version>
        <dependency>
            <groupId>org.junit</groupId>
            <artifactId>junit-bom</artifactId>
            <version>${junit-jupiter.version}</version>
        </dependency>
```

### mockito
[mockito](https://javadoc.io/static/org.mockito/mockito-core/5.10.0/org/mockito/Mockito.html)是一个mock框架，主要是用来做mock测试，他可以模拟任何 Spring管理的 bean、模拟方法的返回值、模拟抛出异常等，可以让我们在缺乏一些依赖的情况下，完成测试及验证。
```java
        <mockito.version>4.11.0</mockito.version>
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-core</artifactId>
            <version>${mockito.version}</version>
        </dependency>
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-junit-jupiter</artifactId>
            <version>${mockito.version}</version>
        </dependency>
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-inline</artifactId>
            <version>${mockito.version}</version>
        </dependency>
```
### assertj
assertj是一个断言库，提供了一组易于使用和可读性很强的断言方法，当junit的断言难以满足时，可以使用assertj进行断言；

请注意：我们在seata-dependencies的pom.xml中统一管理了这三个库的版本。

```java
        <assertj-core.version>3.12.2</assertj-core.version>
        <dependency>
            <groupId>org.assertj</groupId>
            <artifactId>assertj-core</artifactId>
            <version>${assertj-core.version}</version>
        </dependency>
```
## 规范
我们参考阿里巴巴JAVA开发手册，整理了一些建议及规范，分为不同的级别，其中【【强制】部分，开发者需要严格遵守，社区在合并代码时会按照强制规则进行review，【【推荐】【参考】部分，方便大家更好的了解我们对于测试用例的考量和原则。
##### 1.【强制】单元测试必须遵守 AIR 原则。

说明：好的单元测试宏观上来说，具有自动化、独立性、可重复执行的特点。
- A：Automatic（自动化）
- I：Independent（独立性）
- R：Repeatable（可重复）
##### 2.【强制】单元测试应该是全自动执行的，并且非交互式的。
测试用例通常是被定期执行的，执行过程必须完全自动化才有意义。输出结果需要人工检查的测试不是一个好的单元测试。单元测试中不准使用 System.out 来进行人肉验证，必须使用 assert 来验证。
##### 3.【强制】保持单元测试的独立性。为了保证单元测试稳定可靠且便于维护，单元测试用例之间决不能互相调用，也不能依赖执行的先后次序。
反例：method2 需要依赖 method1 的执行，将执行结果作为 method2 的输入。
##### 4.【强制】单元测试是可以重复执行的，不能受到外界环境的影响。
说明：单元测试通常会被放到持续集成中，每次有代码 check in 时单元测试都会被执行。如果单测对外部环境（网络、服务、中间件等）有依赖，容易导致持续集成机制的不可用。

正例：为了不受外界环境影响，要求设计代码时就把 SUT 的依赖改成注入，在测试时用 spring 这样的 DI框架注入一个本地（内存）实现或者 Mock 实现。
##### 5.【强制】对于单元测试，要保证测试粒度足够小，有助于精确定位问题。单测粒度至多是类级别，一般是方法级别。
说明：只有测试粒度小才能在出错时尽快定位到出错位置。单测不负责检查跨类或者跨系统的交互逻辑，那是集成测试的领域。
##### 6.【强制】核心业务、核心应用、核心模块的增量代码确保单元测试通过。
说明：新增代码及时补充单元测试，如果新增代码影响了原有单元测试，请及时修正。
##### 7.【强制】单元测试代码必须写在如下工程目录：src/test/java，不允许写在业务代码目录下。
说明：源码编译时会跳过此目录，而单元测试框架默认是扫描此目录。
##### 8.【强制】单元测试的基本目标：语句覆盖率达到 70%；核心模块的语句覆盖率和分支覆盖率都要达到 100%。
说明：在工程规约的应用分层中提到的 DAO 层，Manager 层，可重用度高的 Service，都应该进行单元测试。
##### 9.【推荐】编写单元测试代码遵守 BCDE 原则，以保证被测试模块的交付质量。
- B：Border，边界值测试，包括循环边界、特殊取值、特殊时间点、数据顺序等。
- C：Correct，正确的输入，并得到预期的结果。
- D：Design，与设计文档相结合，来编写单元测试。
- E：Error，强制错误信息输入（如：非法数据、异常流程、业务允许外等），并得到预期的结果。
##### 10.【推荐】对于数据库相关的查询，更新，删除等操作，不能假设数据库里的数据是存在的，或者直接操作数据库把数据插入进去，请使用程序插入或者导入数据的方式来准备数据。
反例：删除某一行数据的单元测试，在数据库中，先直接手动增加一行作为删除目标，但是这一行新增数据并不符合业务插入规则，导致测试结果异常。
##### 11.【推荐】和数据库相关的单元测试，可以设定自动回滚机制，不给数据库造成脏数据。或者对单元测试产生的数据有明确的前后缀标识。

##### 12.【推荐】对于不可测的代码在适当的时机做必要的重构，使代码变得可测，避免为了达到测试要求而书写不规范测试代码。

##### 13.【推荐】单元测试作为一种质量保障手段，在提交pr前完成单元测试的编写及验证。
##### 14.【参考】为了更方便地进行单元测试，业务代码应避免以下情况：
- 构造方法中做的事情过多。
- 存在过多的全局变量和静态方法。
- 存在过多的外部依赖。
- 存在过多的条件语句。
说明：多层条件语句建议使用卫语句、策略模式、状态模式等方式重构。
