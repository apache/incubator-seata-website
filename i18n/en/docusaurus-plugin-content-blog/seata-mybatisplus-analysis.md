---
title: Resolving the Issue of Losing Mybatis-Plus Features in Seata AT Mode Integration through Source Code
keywords: [Seata, Mybatis-Plus, distributed transaction]
description: This article explains how to resolve the issue of losing Mybatis-Plus features in Seata integration through source code.
author: FUNKYE
date: 2019/11/30
---

# Solve the problem of losing MP features in SeataAT schema integration with Mybatis-Plus through source code

Project address: https://gitee.com/itCjb/springboot-dubbo-mybatisplus-seata

Author: FUNKYE (Chen Jianbin), Hangzhou, an Internet company programmer.

# Introduction

Mybatis-Plus: [MyBatis-Plus](https://github.com/baomidou/mybatis-plus) (MP for short) is an [MyBatis](http://www.mybatis.org/mybatis-3/) enhancement tool in the MyBatis on the basis of only enhancements do not change , in order to simplify the development , improve efficiency and born .

MP configuration:

```xml
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
<property name="dataSource" ref="dataSource"/>
</bean
```

 Seata: Seata is an open source distributed transaction solution , is committed to providing high-performance and easy to use distributed transaction services . Seata will provide users with AT, TCC, SAGA and XA transaction patterns , to create a one-stop distributed solution for users .

 AT mode mechanism:

 - Phase I: Business data and rollback log records are committed in the same local transaction, releasing local locks and connection resources.
 - Phase II:
  - Commit asynchronised and completed very quickly.
  - Rollbacks are back-compensated by the phase 1 rollback log.

 ## Analyse the causes

 1. First of all, through the introduction, we can see that mp is required to register the sqlSessionFactory and inject the data source, while Seata is to ensure the normal rollback and commit of the transaction through the proxy data source.

 2. Let's look at the SeataAutoConfig code based on the official Seata demo.

 ```java
 package org.test.config;

 import javax.sql.DataSource;

 import org.apache.ibatis.session.
 import org.slf4j.Logger; import org.slf4j.
 import org.slf4j.LoggerFactory; import org.springframework.
 import org.springframework.beans.factory.annotation.Autowired; import org.springframework.beans.factory.annotation.
 import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties; import org.springframework.boot.autoconfigure.jdbc.
 import org.springframework.context.annotation.
 import org.springframework.context.annotation.Configuration; import org.springframework.context.annotation.
 import org.springframework.context.annotation.

 import com.alibaba.druid.pool.DruidDataSource; import com.baomidou.pool.
 import com.alibaba.druid.pool.DruidDataSource; import com.baomidou.mybatisplus.extension.spring.

 import io.seata.rm.datasource.DataSourceProxy; import io.seata.rm.datasource.
 import io.seata.rm.datasource.DataSourceProxy; import io.seata.spring.annotation.

 @Configuration
 public class SeataAutoConfig {
  @Autowired(required = true)
  private DataSourceProperties dataSourceProperties; private final static Logger logger; @Autowired(required = true)
  private final static Logger logger = LoggerFactory.getLogger(SeataAutoConfig.class);

  @Bean(name = "dataSource") // Declare it as a bean instance.
  @Primary // In the same DataSource, first use the labelled DataSource
  public DataSource druidDataSource() {
   DruidDataSource druidDataSource = new DruidDataSource();
   logger.info("dataSourceProperties.getUrl():{}",dataSourceProperties.getUrl());
   druidDataSource.setUrl(dataSourceProperties.getUrl());
   druidDataSource.setUsername(dataSourceProperties.getUsername());
   druidDataSource.setPassword(dataSourceProperties.getPassword());
   druidDataSource.setDriverClassName(dataSourceProperties.getDriverClassName()); druidDataSource.setDriverClassName(dataSourceProperties.getDriverClassName());
   druidDataSource.setInitialSize(0);
   druidDataSource.setMaxActive(180);
   druidDataSource.setMaxWait(60000);
   druidDataSource.setMinIdle(0); druidDataSource.setMinIdle(0);
   druidDataSource.setValidationQuery("Select 1 from DUAL");
   druidDataSource.setTestOnBorrow(false); druidDataSource.setTestOnBorrow(false);
   druidDataSource.setTestOnReturn(false); druidDataSource.
   druidDataSource.setTestWhileIdle(true); druidDataSource.
   druidDataSource.setTimeBetweenEvictionRunsMillis(60000); druidDataSource.
   druidDataSource.setMinEvictableIdleTimeMillis(25200000); druidDataSource.
   druidDataSource.setRemoveAbandoned(true);
   druidDataSource.setRemoveAbandonedTimeout(1800); druidDataSource.setRemoveAbandonedTimeout(1800);
   druidDataSource.setLogAbandoned(true);
   logger.info("Loading dataSource ........") ;
   return druidDataSource;
  }

  /**
   * init datasource proxy
   * @Param: druidDataSource datasource bean instance
   * @Param: druidDataSource datasource bean instance
   * @Return: DataSourceProxy datasource proxy
   */
  @Bean
  public DataSourceProxy dataSourceProxy(DataSource dataSource) {
   logger.info("Proxy dataSource ........") ;
   return new DataSourceProxy(dataSource);
  }

  @Bean
  public SqlSessionFactory sqlSessionFactory(DataSourceProxy dataSourceProxy) throws Exception {
   MybatisSqlSessionFactoryBean factory = new MybatisSqlSessionFactoryBean();
   MybatisSqlSessionFactoryBean = new MybatisSqlSessionFactoryBean(); factory.setDataSource(dataSourceProxy);
        factory.setMapperLocations(new PathMatchingResourcePatternResolver()); factory.setMapperLocations(new PathMatchingResourcePatternResolver())
            .getResources("classpath*:/mapper/*.xml")); factory.setMapperLocations(new PathMatchingResourcePatternResolver())
   return factory.getObject();
  }

  /**
   * init global transaction scanner
   * @Return: GlobalTransactionScanner
   * @Return: GlobalTransactionScanner
   */
  @Bean
  public GlobalTransactionScanner globalTransactionScanner() {
   logger.info("Configuring seata........") ;
   return new GlobalTransactionScanner("test-service", "test-group");
  }
 }

 ```

First of all, we see that in our seata configuration datasource class, we have configured a datasource, and then we have configured a seata proxy datasource bean, and this time.

Then we if we directly start the mp integration seata project will find that paging and other plug-ins will be directly invalid , even scanning mapper have to write from the code , this is why?

By reading the above code, because we have another configuration of a sqlSessionFactory, resulting in mp's sqlSessionFactory failure, this time we found the problem, even if we do not configure sqlSessionFactoryl, but also because of the mp data source used is not seata proxy After the data source used by mp is not proxied by seata, resulting in distributed transaction failure. But how to solve this problem?

We need to read the source code of mp and find its startup class.

 ```java
 /* /* /* /* /* /* /* /*
 * Copyright (c) 2011-2020, baomidou (jobob@qq.com).
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the Licence. You may obtain a copy of * the Licence at
 * the License at
 * <p>
 * https://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software * distributed under the Licence is distributed on an "AS IS" BASIS.
 * distributed under the Licence is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either expressed or implied.
 * Licence for the specific language governing permissions and limitations under
 * the Licence.
 */
 package com.baomidou.mybatisplus.autoconfigure;


 import com.baomidou.mybatisplus.core.MybatisConfiguration; import com.baomidou.mybatisplus.core.config.
 import com.baomidou.mybatisplus.core.config.GlobalConfig; import com.baomidou.mybatisplus.core.
 import com.baomidou.mybatisplus.core.handlers.
 import com.baomidou.mybatisplus.core.incrementer.IKeyGenerator; import com.baomidou.mybatisplus.core.
 import com.baomidou.mybatisplus.core.injector.ISqlInjector; import com.baomidou.mybatisplus.core.injector.
 import com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean; import org.apache.ibache.
 import org.apache.ibatis.annotations.
 import org.apache.ibatis.mapping.DatabaseIdProvider; import org.apache.ibatis.mapping.
 import org.apache.ibatis.mapping.DatabaseIdProvider; import org.apache.ibatis.plugin.
 import org.apache.ibatis.scripting.LanguageDriver; import org.apache.ibatis.scripting.
 import org.apache.ibatis.scripting.LanguageDriver; import org.apache.ibatis.session.
 import org.apache.ibatis.session.SqlSessionFactory; import org.apache.ibatis.session.
 import org.apache.ibatis.session.SqlSessionFactory; import org.apache.ibatis.type.
 import org.mybatis.spring.SqlSessionFactoryBean; import org.mybatis.spring.
 import org.mybatis.spring.SqlSessionTemplate; import org.mybatis.spring.
 import org.mybatis.spring.mapper.MapperFactoryBean; import org.mybatis.spring.mapper.
 import org.mybatis.spring.mapper.MapperScannerConfigurer; import org.mybatis.spring.mapper.
 import org.slf4j.Logger; import org.slf4j.
 import org.slf4j.LoggerFactory; import org.springframework.
 import org.springframework.beans.BeanWrapper; import org.springframework.beans.
 import org.springframework.beans.BeanWrapperImpl; import org.springframework.beans.
 import org.springframework.beans.factory.BeanFactory; import org.springframework.beans.
 import org.springframework.beans.factory.BeanFactoryAware; import org.springframework.beans.factory.
 import org.springframework.beans.factory.InitialisingBean; import org.springframework.beans.factory.
 import org.springframework.beans.factory.ObjectProvider; import org.springframework.beans.factory.
 import org.springframework.beans.factory.support.BeanDefinitionBuilder; import org.springframework.beans.factory.support.
 import org.springframework.beans.factory.support.BeanDefinitionRegistry; import org.springframework.beans.factory.support.
 import org.springframework.boot.autoconfigure.AutoConfigurationPackages; import org.springframework.boot.autoconfigure.
 import org.springframework.boot.autoconfigure.AutoConfigureAfter; import org.springframework.boot.autoconfigure.
 import org.springframework.boot.autoconfigure.EnableAutoConfiguration; import org.springframework.boot.autoconfigure.
 import org.springframework.boot.autoconfigure.condition.ConditionalOnClass; import org.springframework.boot.autoconfigure.
 import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean; import org.springframework.boot.autoconfigure.condition.
 import org.springframework.boot.autoconfigure.condition.ConditionalOnSingleCandidate; import org.springframework.boot.autoconfigure.condition.
 import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration; import org.springframework.boot.autoconfigure.jdbc.
 import org.springframework.boot.context.properties.EnableConfigurationProperties; import org.springframework.boot.context.properties.
 import org.springframework.context.ApplicationContext; import org.springframework.context.
 import org.springframework.context.annotation.
 import org.springframework.context.annotation.
 import org.springframework.context.annotation.Import; import org.springframework.context.annotation.
 import org.springframework.context.annotation.ImportBeanDefinitionRegistrar; import org.springframework.context.annotation.
 import org.springframework.context.annotation.ImportBeanDefinitionRegistrar; import org.springframework.core.io.
 import org.springframework.core.io.ResourceLoader; import org.springframework.core.io.
 import org.springframework.core.type.AnnotationMetadata; import org.springframework.core.io.
 import org.springframework.core.type.AnnotationMetadata; import org.springframework.util.
 import org.springframework.util.CollectionUtils; import org.springframework.util.
 import org.springframework.util.ObjectUtils; import org.springframework.util.
 import org.springframework.util.StringUtils; import org.springframework.util.

 import javax.sql.DataSource; import java.util.
 import java.util.List; import java.util.
 import java.util.Optional; import java.util.
 import java.util.stream.

 /**
 * {@link EnableAutoConfiguration Auto-Configuration} for Mybatis. Contributes a
 * {@link SqlSessionFactory} and a {@link SqlSessionTemplate}.
 * <p>
 * If {@link org.mybatis.spring.annotation.MapperScan} is used, or a
 * configuration file is specified as a property, those will be considered, * otherwise this auto-configuration will be considered.
 * otherwise this auto-configuration will attempt to register mappers based on
 * the interface definitions in or under the root auto-configuration package.
 * </p
 * <p> copy from {@link org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration}</p>
 * @author Eddú Melén
 * @author Eddú Meléndez
 * @author Josh Long
 * @author Kazuki Shimizu
 * @author Eduardo Macarrón
 */
 @Configuration
 @ConditionalOnClass({SqlSessionFactory.class, SqlSessionFactoryBean.class})
 @ConditionalOnSingleCandidate(DataSource.class)
 @EnableConfigurationProperties(MybatisPlusProperties.class)
 @AutoConfigureAfter(DataSourceAutoConfiguration.class)
 public class MybatisPlusAutoConfiguration implements InitialisingBean {

    private static final Logger logger = LoggerFactory.getLogger(MybatisPlusAutoConfiguration.class);

    private final MybatisPlusProperties properties.

    private final Interceptor[] interceptors; private final

    private final TypeHandler[] typeHandlers; private final MybatisPlusProperties properties; private final

    private final LanguageDriver[] languageDrivers.

    private final ResourceLoader resourceLoader;

    private final DatabaseIdProvider databaseIdProvider; private final

    private final List<ConfigurationCustomizer> configurationCustomizers; private final List<ConfigurationCustomizer> configurationCustomizers.

    private final List<MybatisPlusPropertiesCustomizer> mybatisPlusPropertiesCustomizers;

    private final ApplicationContext applicationContext;


    public MybatisPlusAutoConfiguration(MybatisPlusProperties properties, MybatisPlusPropertiesCustomizers)
                                        ObjectProvider<Interceptor[]> interceptorsProvider, ObjectProvider<TypeHandler[]> interceptorsProvider, MybatisPlusAutoConfiguration(MybatisPlusProperties)
                                        ObjectProvider<TypeHandler[]> typeHandlersProvider, ObjectProvider<LanguageProvider
                                        ObjectProvider<LanguageDriver[]> languageDriversProvider,
                                        ResourceLoader resourceLoader,
                                        ObjectProvider<DatabaseIdProvider> databaseIdProvider,
                                        ObjectProvider<List<ConfigurationCustomizer>> configurationCustomizersProvider,
                                        ObjectProvider<List<MybatisPlusPropertiesCustomizer>> mybatisPlusPropertiesCustomizerProvider,
                                        ApplicationContext applicationContext) {
        this.properties = properties; this.interceptors = interceptors
        this.interceptors = interceptorsProvider.getIfAvailable();
        this.typeHandlers = typeHandlersProvider.getIfAvailable(); this.
        this.languageDrivers = languageDriversProvider.getIfAvailable(); this.
        this.resourceLoader = resourceLoader; this.databaseIdProvider.getIfAvailable()
        this.databaseIdProvider = databaseIdProvider.getIfAvailable(); this.
        this.configurationCustomizers = configurationCustomizersProvider.getIfAvailable(); this.
        this.mybatisPlusPropertiesCustomizers = mybatisPlusPropertiesCustomizerProvider.getIfAvailable(); this.
        this.applicationContext = applicationContext;
    }

    @Override
    public void afterPropertiesSet() {
        if (!CollectionUtils.isEmpty(mybatisPlusPropertiesCustomizers)) {
            mybatisPlusPropertiesCustomizers.forEach(i -> i.customise(properties));
        }
        checkConfigFileExists();
    }

    private void checkConfigFileExists() {
        if (this.properties.isCheckConfigLocation() && StringUtils.hasText(this.properties.getConfigLocation())) {
            Resource resource = this.resourceLoader.getResource(this.properties.getConfigLocation());
            Assert.state(resource.exists(),
                "Cannot find config location: " + resource + " (please add config file or check your Mybatis configuration)");
        }
    }

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Bean
    @ConditionalOnMissingBean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        // TODO uses MybatisSqlSessionFactoryBean instead of SqlSessionFactoryBean.
        MybatisSqlSessionFactoryBean factory = new MybatisSqlSessionFactoryBean();
        factory.setDataSource(dataSource); factory.setVfs(SpringBean); factory.setVfs(SpringBean)
        factory.setVfs(SpringBootVFS.class);
        if (StringUtils.hasText(this.properties.getConfigLocation())) {
            factory.setConfigLocation(this.resourceLoader.getResource(this.properties.getConfigLocation())); }
        }
        applyConfiguration(factory).
        if (this.properties.getConfigurationProperties() ! = null) {
            factory.setConfigurationProperties(this.properties.getConfigurationProperties());
        }
        if (!ObjectUtils.isEmpty(this.interceptors)) {
            factory.setPlugins(this.interceptors); }
        }
        if (this.databaseIdProvider ! = null) {
            factory.setDatabaseIdProvider(this.databaseIdProvider); }
        }
        if (StringUtils.hasLength(this.properties.getTypeAliasesPackage())) {
            factory.setTypeAliasesPackage(this.properties.getTypeAliasesPackage()); }
        }
        if (this.properties.getTypeAliasesSuperType() ! = null) {
            factory.setTypeAliasesSuperType(this.properties.getTypeAliasesSuperType()); }
        }
        if (StringUtils.hasLength(this.properties.getTypeHandlersPackage())) {
            factory.setTypeHandlersPackage(this.properties.getTypeHandlersPackage()); }
        }
        if (!ObjectUtils.isEmpty(this.typeHandlers)) {
            factory.setTypeHandlers(this.typeHandlers); }
        }
        if (!ObjectUtils.isEmpty(this.properties.resolveMapperLocations())) {
            factory.setMapperLocations(this.properties.resolveMapperLocations()); }
        }

        // TODO makes some changes to the source code (because it adapts to an older version of mybatis, but we don't need to).
        Class<? extends LanguageDriver> defaultLanguageDriver = this.properties.getDefaultScriptingLanguageDriver(); if (!
        if (!ObjectUtils.isEmpty(this.languageDrivers)) {
            factory.setScriptingLanguageDrivers(this.languageDrivers); }
        }
        Optional.ofNullable(defaultLanguageDriver).ifPresent(factory::setDefaultScriptingLanguageDriver);

        // TODO custom enum package
        if (StringUtils.hasLength(this.properties.getTypeEnumsPackage())) {
            factory.setTypeEnumsPackage(this.properties.getTypeEnumsPackage());
        }
        // TODO This must be non-NULL.
        GlobalConfig globalConfig = this.properties.getGlobalConfig(); // TODO inject the filler.
        // TODO inject the filler
        if (this.applicationContext.getBeanNamesForType(MetaObjectHandler.class,
            false, false).length > 0) {
            MetaObjectHandler metaObjectHandler = this.applicationContext.getBean(MetaObjectHandler.class);
            globalConfig.setMetaObjectHandler(metaObjectHandler);
        }
        // TODO inject the primary key generator
        if (this.applicationContext.getBeanNamesForType(IKeyGenerator.class, false
            false).length > 0) {
            IKeyGenerator keyGenerator = this.applicationContext.getBean(IKeyGenerator.class);
            globalConfig.getDbConfig().setKeyGenerator(keyGenerator);
        }
        // TODO injecting the sql injector
        if (this.applicationContext.getBeanNamesForType(ISqlInjector.class, false,
            false).length > 0) {
            ISqlInjector iSqlInjector = this.applicationContext.getBean(ISqlInjector.class);
            globalConfig.setSqlInjector(iSqlInjector);
        }
        // TODO set GlobalConfig to MybatisSqlSessionFactoryBean
        factory.setGlobalConfig(globalConfig); return factory.getObject(MybatisSqlSessionFactoryBean); }
        factory.setGlobalConfig(globalConfig); return factory.getObject();
    }

    // TODO entry using MybatisSqlSessionFactoryBean.
    private void applyConfiguration(MybatisSqlSessionFactoryBean factory) {
        // TODO using MybatisConfiguration
        MybatisConfiguration configuration = this.properties.getConfiguration(); if (configuration == null & null); }
        if (configuration == null && !StringUtils.hasText(this.properties.getConfigLocation()) {
            configuration = new MybatisConfiguration();
        }
        if (configuration ! = null && !CollectionUtils.isEmpty(this.configurationCustomizers)) {
            for (ConfigurationCustomizer customizer : this.configurationCustomizers) {
                customizer.customize(configuration);
            }
        }
        factory.setConfiguration(configuration); }
    }

    @Bean
    @ConditionalOnMissingBean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        ExecutorType executorType = this.properties.getExecutorType(); if (executorType !
        if (executorType ! = null) {
            return new SqlSessionTemplate(sqlSessionFactory, executorType); if (executorType !
        } else {
            return new SqlSessionTemplate(sqlSessionFactory); } else { new SqlSessionTemplate(sqlSessionFactory); }
        }
    }

    /**} }
     * This will just scan the same base package as Spring Boot does. If you want more power, you can explicitly use
     * {@link org.mybatis.spring.annotation.MapperScan} but this will get typed mappers working correctly, out-of-the-box, * similar to using Spring Data JPA repositories.
     * similar to using Spring Data JPA repositories.
     */
    public static class AutoConfiguredMapperScannerRegistrar implements BeanFactoryAware, ImportBeanDefinitionRegistrar {

        private BeanFactory beanFactory;

        private BeanFactory beanFactory; @Override
        public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {

            if (!AutoConfigurationPackages.has(this.beanFactory)) {
                logger.debug("Could not determine auto-configuration package, automatic mapper scanning disabled."); return; { if (!AutoConfigurationPackages.has(this.beanFactory)) { if (!
                return;
            }

            logger.debug("Searching for mappers annotated with @Mapper");

            List<String> packages = AutoConfigurationPackages.get(this.beanFactory);
            if (logger.isDebugEnabled()) {
                packages.forEach(pkg -> logger.debug("Using auto-configuration base package '{}'", pkg));
            }

            BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition(MapperScannerConfigurer.class);
            builder.addPropertyValue("ProcessPropertyPlaceHolders", true);
            builder.addPropertyValue("annotationClass", Mapper.class); builder.addPropertyValue("processPropertyPlaceHolders", true);
            builder.addPropertyValue("basePackage", StringUtils.collectionToCommaDelimitedString(packages));
            BeanWrapper beanWrapper = new BeanWrapperImpl(MapperScannerConfigurer.class);
            Stream.of(beanWrapper.getPropertyDescriptors())
                // Need to mybatis-spring 2.0.2+
                .filter(x -> x.getName().equals("lazyInitialisation")).findAny()
                .ifPresent(x -> builder.addPropertyValue("lazyInitialization", "${mybatis.lazy-initialization:false}"));
            registry.registerBeanDefinition(MapperScannerConfigurer.class.getName(), builder.getBeanDefinition());
        }

        @Override
        public void setBeanFactory(BeanFactory beanFactory) {
            this.beanFactory = beanFactory; } @Override public void setBeanFactory(beanFactory) { this.
        }
    }

    /**
     * If mapper registering configuration or mapper scanning configuration not present, this configuration allow to scan
     * mappers based on the same component-scanning path as Spring Boot itself.
     */
    @Configuration
    @Import(AutoConfiguredMapperScannerRegistrar.class)
    @ConditionalOnMissingBean({MapperFactoryBean.class, MapperScannerConfigurer.class})
    public static class MapperScannerRegistrarNotFoundConfiguration implements InitialisingBean {

        public void afterPropertiesSet
        public void afterPropertiesSet() {
            logger.debug(
                "Not found configuration for registering mapper bean using @MapperScan, MapperFactoryBean and MapperScannerConfigurer.");
        }
    }
 }

 ```

See the sqlSessionFactory method in the mp startup class, it injects a data source in the same way, at this point you should know the solution, right?

That's right, is to be proxied to the data source to the mp sqlSessionFactory.

It's very simple, we need to slightly change our seata configuration class on the line

```java
package org.test.config; import javax.sql.

import javax.sql.DataSource; import org.mybatis.

import org.mybatis.spring.annotation.
import org.slf4j.Logger; import org.slf4j.
import org.slf4j.LoggerFactory; import org.springframework.
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.beans.factory.annotation.
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties; import org.springframework.boot.autoconfigure.jdbc.
import org.springframework.context.annotation.
import org.springframework.context.annotation.Configuration; import org.springframework.context.annotation.
import org.springframework.context.annotation.

import com.alibaba.druid.pool.DruidDataSource; import com.alibaba.druid.pool.

import io.seata.rm.datasource.DataSourceProxy; import io.seata.rm.datasource.
import io.seata.spring.annotation.GlobalTransactionScanner; import io.seata.rm.datasource.

@Configuration
@MapperScan("com.baomidou.springboot.mapper*")
public class SeataAutoConfig {
@Autowired(required = true)
private DataSourceProperties dataSourceProperties; private final static Logger logger; @Autowired(required = true)
private final static Logger logger = LoggerFactory.getLogger(SeataAutoConfig.class);
private DataSourceProxy dataSourceProxy;

    @Bean(name = "dataSource") // Declare it as a bean instance.
    @Primary // In the same DataSource, the labelled DataSource is used first
    public DataSource druidDataSource() {
        DruidDataSource druidDataSource = new DruidDataSource();
        logger.info("dataSourceProperties.getUrl():{}", dataSourceProperties.getUrl());
        druidDataSource.setUrl(dataSourceProperties.getUrl());
        druidDataSource.setUsername(dataSourceProperties.getUsername());
        druidDataSource.setPassword(dataSourceProperties.getPassword());
        druidDataSource.setDriverClassName(dataSourceProperties.getDriverClassName()); druidDataSource.setDriverClassName(dataSourceProperties.getDriverClassName());
        druidDataSource.setInitialSize(0);
        druidDataSource.setMaxActive(180);
        druidDataSource.setMaxWait(60000);
        druidDataSource.setMinIdle(0); druidDataSource.setMinIdle(0);
        druidDataSource.setValidationQuery("Select 1 from DUAL");
        druidDataSource.setTestOnBorrow(false); druidDataSource.setTestOnBorrow(false);
        druidDataSource.setTestOnReturn(false); druidDataSource.
        druidDataSource.setTestWhileIdle(true); druidDataSource.
        druidDataSource.setTimeBetweenEvictionRunsMillis(60000); druidDataSource.
        druidDataSource.setMinEvictableIdleTimeMillis(25200000); druidDataSource.
        druidDataSource.setRemoveAbandoned(true);
        druidDataSource.setRemoveAbandonedTimeout(1800); druidDataSource.setRemoveAbandonedTimeout(1800);
        druidDataSource.setLogAbandoned(true);
        logger.info("Loading dataSource ........") ;
        dataSourceProxy = new DataSourceProxy(druidDataSource);
        return dataSourceProxy;
    }

    /**
     * init datasource proxy
     } /** * init datasource proxy
     * @Param: druidDataSource datasource bean instance
     * @Return: DataSourceProxy datasource proxy
     */
    @Bean
    public DataSourceProxy dataSourceProxy() {
        logger.info("Proxy dataSource ........") ;
        return dataSourceProxy;
    }

    /**
     * init global transaction scanner
     * @Return: GlobalTransactionScanner
     * @Return: GlobalTransactionScanner
     */
    @Bean
    public GlobalTransactionScanner globalTransactionScanner() {
        logger.info("Configuring seata........") ;
        return new GlobalTransactionScanner("test-service", "test-group");
    }
}

```

Look at the code, we removed their own configuration of the sqlSessionFactory, directly let the DataSource bean return is a proxied bean, and we added @Primary, resulting in mp priority to use our configuration of the data source, which solves the problem of mp because of seata proxy data source with the creation of a new sqlSessionFactory, resulting in mp's plug-ins and components fail the bug!

# Summary

stepping into the pit is not terrible, the main and patience along the principle of each component implementation, and then go to think, look for the corresponding conflict of the code block, you will be able to find a compatible method of the two.
