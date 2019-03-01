# website
All website material  of Fescar

开发前请仔细阅读[https://docsite.js.org](https://docsite.js.org)

### 准备

+ 确保终端中有安装node
+ 在终端中执行`npm i docsite -g`全局安装`docsite`
+ git下载整个工程文件
+ 进入工程目录，执行 `npm i`执行依赖安装
+ 执行`docsite start`进行本地验证查看
+ 执行`docsite build`进行本地代码构建
+ 提交代码推送至仓库

### 文档编写及放置

#### 一般文档

放置在`docs/en-us`和`docs/zh-cn`下，分别对应中文文档和英文文档，中英文件名需保持一致。

#### 博客文档

放置在`blog/en-us`和`blog/zh-cn`下，分别对应中文文档和英文文档，中英文件名需保持一致。
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



