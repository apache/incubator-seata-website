---
title: How to Write Test Cases in Seata
keywords: [Seata, unit test, junit, mockito, assertj]
description: This article mainly introduces the testing frameworks already used in Seata and community suggestions on how developers can better write test cases.
author: Wang Zhongxiang - trustdecision Technical Expert
date: 2024-02-20
---

## Background
As the Seata project continues to grow and expand, our contributor community is also continuously growing. With the continuous enhancement of project functionality, the requirements for code quality are also increasing. In this process, we expect every contributor to provide standardized and comprehensive test cases along with their feature code submissions.

An excellent project relies on comprehensive unit tests as a fundamental guarantee. The Test-Driven Development (TDD) concept has been proposed for many years, emphasizing writing test cases before writing functional code. By writing unit tests, developers can gain a deeper understanding of the roles of related classes and methods in the code, grasp the core logic, and become familiar with the running scenarios of various situations. Meanwhile, unit tests also provide stable and secure protection for open-source projects, ensuring the quality and stability of the code when accepting contributor submissions. Unit testing is the first line of defense for quality assurance. Effective unit testing can detect over 90% of code bugs in advance and prevent code deterioration. During project refactoring and evolution, unit testing plays a crucial role, ensuring that the refactored code continues to function properly without introducing new bugs.

In the community's view, contributing reasonable test case code is equally important as contributing functional code. To help developers write high-quality test cases, this article provides some basic standards and recommendations.

## Recommended Frameworks
The community currently uses the following three frameworks to write test cases:

### junit5
junit is the most commonly used unit testing framework in Java, used for writing and running repeatable test cases.


```java
        <junit-jupiter.version>5.8.2</junit-jupiter.version>
        <dependency>
            <groupId>org.junit</groupId>
            <artifactId>junit-bom</artifactId>
            <version>${junit-jupiter.version}</version>
        </dependency>
```

### mockito
[mockito](https://javadoc.io/static/org.mockito/mockito-core/5.10.0/org/mockito/Mockito.html)It is a mock framework mainly used for mock testing. It can simulate any bean managed by Spring, mock method return values, simulate throwing exceptions, etc. This allows us to complete testing and verification in situations where some dependencies are missing.

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
assertj is an assertion library that provides a set of easy-to-use and highly readable assertion methods. When junit's assertions are difficult to meet, assertj can be used for assertions.

Please note: We manage the versions of these three libraries uniformly in the pom.xml of seata-dependencies.


```java
        <assertj-core.version>3.12.2</assertj-core.version>
        <dependency>
            <groupId>org.assertj</groupId>
            <artifactId>assertj-core</artifactId>
            <version>${assertj-core.version}</version>
        </dependency>
```
## Specifications
We have referenced the Alibaba Java Development Manual and compiled some suggestions and specifications, divided into different levels. Among them, the [[mandatory]] parts must be strictly adhered to by developers. The community will review the code according to the mandatory rules when merging it. The [[recommended]] and [[reference]] parts are provided to help everyone better understand our considerations and principles for test cases.

##### 1. [[mandatory]] Unit tests must adhere to the AIR principle.

Explanation: Good unit tests, from a macro perspective, possess characteristics of automation, independence, and repeatability.
- A: Automatic
- I: Independent
- R: Repeatable

##### 2. [[mandatory]] Unit tests should be fully automated and non-interactive.
Test cases are usually executed periodically, and the execution process must be fully automated to be meaningful. Tests that require manual inspection of output results are not good unit tests. System.out should not be used for manual verification in unit tests; assert must be used for verification.

##### 3. [[mandatory]] Maintain the independence of unit tests. To ensure the stability, reliability, and ease of maintenance of unit tests, unit test cases must not call each other or depend on the execution order.
Counterexample: method2 depends on the execution of method1, with the result of method1 being used as input for method2.

##### 4. [[mandatory]] Unit tests must be repeatable and unaffected by external environments.
Explanation: Unit tests are usually included in continuous integration, and unit tests are executed each time code is checked in. If unit tests depend on external environments (network, services, middleware, etc.), it can lead to the unavailability of the continuous integration mechanism.

Example: To avoid being affected by external environments, it is required to design the code to inject dependencies into the SUT. During testing, use a DI framework like Spring to inject a local (in-memory) implementation or a Mock implementation.

##### 5. [[mandatory]] For unit tests, ensure that the granularity of testing is small enough to facilitate precise issue localization. The granularity of unit testing is at most at the class level, generally at the method level.
Explanation: Only with small granularity can errors be quickly located when they occur. Unit tests are not responsible for checking cross-class or cross-system interaction logic; that is the domain of integration testing.

##### 6. [[mandatory]] Incremental code for core business, core applications, and core modules must ensure that unit tests pass.
Explanation: Add unit tests promptly for new code. If new code affects existing unit tests, promptly make corrections.

##### 7. [[mandatory]] Unit test code must be written in the following project directory: src/test/java; it is not allowed to be written in the business code directory.
Explanation: This directory is skipped during source code compilation, and the unit test framework defaults to scanning this directory.

##### 8. [[mandatory]] The basic goal of unit testing: achieve a statement coverage of 70%; the statement coverage and branch coverage of core modules must reach 100%.
Explanation: As mentioned in the application layering of project conventions, DAO layer, Manager layer, and highly reusable Service should all undergo unit testing.

##### 9. [[recommended]] When writing unit test code, adhere to the BCDE principle to ensure the delivery quality of the tested modules.
- B: Border, boundary value testing, including loop boundaries, special values, special time points, data sequences, etc.
- C: Correct, correct input, and expected results.
- D: Design, combined with design documents, to write unit tests.
- E: Error, forced error message input (such as: illegal data, exceptional processes, business allowance outside, etc.), and expected results.

##### 10. [[recommended]] For database-related operations such as queries, updates, and deletions, do not assume that the data in the database exists, or directly manipulate the database to insert data. Please use program insertion or data import to prepare data.
Counterexample: In a unit test for deleting a row of data, manually add a row directly into the database as the deletion target. However, this newly added row of data does not comply with the business insertion rules, resulting in abnormal test results.

##### 11. [[recommended]] For database-related unit tests, an automatic rollback mechanism can be set to prevent dirty data from being left in the database due to unit testing. Alternatively, clear prefix and suffix identifiers can be used for data generated by unit testing.

##### 12. [[recommended]] For code that is untestable, necessary refactoring should be done at the appropriate time to make the code testable, avoiding writing non-standard test code just to meet testing requirements.

##### 13. [[recommended]] Unit tests, as a means of quality assurance, should complete the writing and verification of unit tests before submitting a pull request.

##### 14. [[reference]] To facilitate unit testing, business code should avoid the following situations:
- Doing too much in constructors.
- Having too many global variables and static methods.
- Having too many external dependencies.
- Having too many conditional statements.
Explanation: For multiple conditional statements, it is recommended to refactor using guard clauses, strategy patterns, state patterns, etc.

