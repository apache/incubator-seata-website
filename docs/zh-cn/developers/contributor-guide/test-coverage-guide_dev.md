---
title: 测试覆盖率向导
keywords: Seata
description: 测试覆盖率向导。
---

# 测试覆盖率向导

## 测试粒度如何划分
  <img src="https://microservices.io/i/test-pyramid.jpeg">
        测试粒度如何划分是个大问题。Chris Richardson 在" [降低测试金字塔：微服务的有效测试策略](https://microservices.io/microservices/testing/2019/09/20/oracle-code-one-testing.html)" 一文中将服务测试划分为：单元测试、集成测试、组件测试、端到端的测试。我们可以在设计测试用例的过程中,拿来借鉴。

## 单元测试

### 1.写单元测试的收益 
  * 单元测试能帮助每个人深入代码细节，了解代码的功能。
  * 通过测试用例我们能发现bug，并提交代码的健壮性。
  * 测试用例同时也是代码的demo用法。
### 2.单元测试用例的一些设计原则 
  * 应该精心设计好步骤，颗粒度和组合条件。
  * 注意边界条件。
  * 单元测试也应该好好设计，不要写无用的代码。
  * 当你发现一个`方法`很难写单元测试时，如果可以确认这个`方法`是`臭代码`，那么就和开发者一起重构它。
  * Seata中用的mock框架是: [mockito](http://site.mockito.org/). 下面是一些开发向导:[mockito tutorial](http://www.baeldung.com/bdd-mockito),[mockito refcard](https://dzone.com/refcardz/mockito)
  * TDD（可选）：当你开始写一个新的功能时，你可以试着先写测试用例。 
### 3.测试覆盖率设定值
  * 在现阶段，Delta更改代码的测试覆盖设定值为：>＝80%，越高越好。
  * 我们可以在这个页面中看到测试报告: https://codecov.io/gh/seata/seata
### 4.项目约定
  * Seata 项目的单元测试用例分布在项目每个子模块中，测试断言类以Test结尾。

## 集成测试

### 项目约定  
  * 集成测试在本项目泛指单元测试以上级别的测试。
  * 项目使用[github actions](https://help.github.com/cn/actions/automating-your-workflow-with-github-actions)、[jiblib maven 插件](https://github.com/GoogleContainerTools/jib)、[fabric maven 插件](https://github.com/fabric8io/fabric8-maven-plugin)、[testContainers](https://github.com/testcontainers/testcontainers-java)等用来构建[Docker](https://www.docker.com/)镜像，搭建集成测试环境 
  * 区别于单元测试，某个测试用例，需要依赖第三方中间件的，可以不用Mock, 使用上面介绍的工具搭建docker环境,进行测试。但是也要注意搭建组件的粒度。过于复杂的环境，可以：核心测试依赖的中间件可以docker搭建，非强依赖的可以Mock
  * Seata 项目的集成测试用例分布统一放在integration-test子模块中，测试断言类以IT结尾。
  * 这里还用 [Junit5](https://junit.org/junit5/) 
  * 测试用例并行跑的过程中，注意公共中间件的隔离状态，规划好所造数据，防止冲突。