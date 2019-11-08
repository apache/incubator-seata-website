# Seata Official Website

[![CI Status](https://github.com/seata/seata.github.io/workflows/CI/badge.svg)](https://github.com/seata/seata.github.io/actions)

All website material  of https://seata.io

开发前请仔细阅读 [https://docsite.js.org](https://docsite.js.org)

### 准备

+ 确保终端中有安装node, node保证是8.x版本
+ 在终端中执行`npm i docsite -g`全局安装`docsite`   
+ git下载整个工程文件
+ 进入工程目录，执行 `npm i`执行依赖安装
+ 执行`docsite start`进行本地验证查看
+ 执行`docsite build`进行本地代码构建
+ 提交代码推送至仓库

### 文档编写及放置

### Add a new blog



#### 一般文档

放置在`docs/en-us`和`docs/zh-cn`下，分别对应中文文档和英文文档，中英文件名需保持一致。
1. Add new .md file under doc/en-us or doc/zh-cn.
2. Update site_config/doc.js, add a new entry to the blog in either en-us or zh-cn.
3. Run docsite start locally to verify the blog can be displayed correctly.
4. Send the pull request contains the .md and doc.js only.

#### 博客文档

放置在`blog/en-us`和`blog/zh-cn`下，分别对应中文文档和英文文档，中英文件名需保持一致。
1. Add new .md file under blog/en-us or blog/zh-cn.
2. Update site_config/blog.js, add a new entry to the blog in either en-us or zh-cn.
3. Run docsite start locally to verify the blog can be displayed correctly.
4. Send the pull request contains the .md and blog.js only.

### SEO

内容形式为
```
---
hidden: false
title: title
keywords: keywords1,keywords2
description: some description
author: author name
date: 2018-12-29
---
```
博客文档会按时间先后自动进行排序，无需进行菜单配置.

暂时不想显示的文档`hidden`设为`true`


### 其他

+ 如需添加全局搜索，详见[https://docsite.js.org/zh-cn/docs/search.html](https://docsite.js.org/zh-cn/docs/search.html)
+ 上线前看下这里[https://docsite.js.org/zh-cn/docs/path.html](https://docsite.js.org/zh-cn/docs/path.html)



