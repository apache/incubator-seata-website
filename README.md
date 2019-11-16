# Seata Official Website

[![CI Status](https://github.com/seata/seata.github.io/workflows/CI/badge.svg)](https://github.com/seata/seata.github.io/actions)

All website material  of https://seata.io

开发前请仔细阅读 [https://docsite.js.org](https://docsite.js.org)

## Prerequisite

seata.github.io is powered by [docsite](https://github.com/txd-team/docsite).
If your version of docsite is less than `1.3.3`, please upgrade to `1.3.3`.
Please also make sure your node version is 8.x, versions higher than 8.x is not supported by docsite yet.

## Build instruction

1. Run `npm install docsite -g` to install the dev tool.
2. Run `npm i` in the root directory to install the dependencies.
3. Run `docsite start` in the root directory to start a local server, you will see the website in 'http://127.0.0.1:8080'.
4. Run `docsite build` to build source code.
5. Verify your change locally: `python -m SimpleHTTPServer 8000`, when your python version is 3 use :`python3 -m http.server 8000` instead.

If you have higher version of node installed, you may consider `nvm` to allow different versions of `node` coexisting on your machine.

1. Follow the [instructions](http://nvm.sh) to install nvm
2. Run `nvm install v8.16.0` to install node v8
3. Run `nvm use v8.16.0` to switch the working environment to node v8
4. Run `npm install docsite -g`

Then you are all set to run and build the website. Follow the build instruction above for the details.

### 准备
 
+ git下载整个工程文件
+ 进入工程目录，执行 `npm i`执行依赖安装
+ 执行`docsite start`进行本地验证查看
+ 执行`docsite build`进行本地代码构建
+ 提交代码推送至仓库

## 文档编写及放置

### Add a new doc
 

放置在`docs/en-us`和`docs/zh-cn`下，分别对应中文文档和英文文档，中英文件名需保持一致。
1. Add new .md file under docs/en-us or docs/zh-cn.
2. Update site_config/docs.js, add a new entry to the blog in either en-us or zh-cn.
3. Run docsite start locally to verify the blog can be displayed correctly.
4. Send the pull request contains the .md and doc.js only.

### Add a new blog

放置在`blog/en-us`和`blog/zh-cn`下，分别对应中文文档和英文文档，中英文件名需保持一致。
1. Add new .md file under blog/en-us or blog/zh-cn.
2. Update site_config/blog.js, add a new entry to the blog in either en-us or zh-cn.
3. Run docsite start locally to verify the blog can be displayed correctly.
4. Send the pull request contains the .md and blog.js only.

## SEO

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


## 其他

+ 如需添加全局搜索，详见[https://docsite.js.org/zh-cn/docs/search.html](https://docsite.js.org/zh-cn/docs/search.html)
+ 上线前看下这里[https://docsite.js.org/zh-cn/docs/path.html](https://docsite.js.org/zh-cn/docs/path.html)



