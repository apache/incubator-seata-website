# Seata Official Website

[![CI Status](https://github.com/seata/seata.github.io/workflows/CI/badge.svg)](https://github.com/seata/seata.github.io/actions)

All website material  of https://seata.io


## Prerequisite

seata.github.io is powered by [docsite](https://github.com/txd-team/docsite).please read [https://docsite.js.org](https://docsite.js.org) 
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

Make sure `npm` and `docsite` are configured in the environmet configuration of os . eg: /etc/profile or .bash_profile of Macos

Then you are all set to run and build the website. Follow the build instruction above for the details.


## How To Write Documents

### Add a new doc
 
1. Add new .md file under docs/en-us or docs/zh-cn. Corresponding to Chinese file and English file , and the Chinese and English file names should be consistent.
2. Update site_config/docs.js, add a new entry to the blog in either en-us or zh-cn.
3. Run docsite start locally to verify the blog can be displayed correctly.
4. Send the pull request contains the .md and doc.js only.

### Add a new article for developers

1. Add new .md file under docs/en-us/developers or docs/zh-cn/developers, the file name should end up with _dev.md. Note that the suffix _dev is necessary.
2. Update site_config/develop.js, add a new entry in either en-us or zh-cn.
3. Run docsite start locally to verify the article can be displayed correctly.
4. Send the pull request contains the *_dev.md and develop.js only.

### Add a new blog

1. Add new .md file under blog/en-us or blog/zh-cn. Corresponding to Chinese file and English file , and the Chinese and English file names should be consistent.
2. ~~Update site_config/blog.js, add a new entry to the blog in either en-us or zh-cn.~~
3. Run docsite start locally to verify the blog can be displayed correctly.
4. Send the pull request contains the .md ~~and blog.js~~ only.
5. `SEO` config is required.

notice : Blog documents will be automatically sorted by time, without menu configuration         
Set 'hidden' to 'true' for documents you don't want to display temporarily`

## SEO

the type is :
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

## Others

+ If you want to add `search in site`，see [https://docsite.js.org/zh-cn/docs/search.html](https://docsite.js.org/zh-cn/docs/search.html)
+ This is docsite docs :[https://docsite.js.org/zh-cn/docs/path.html](https://docsite.js.org/zh-cn/docs/path.html)

+ If you want to update saga statemachine designer, rebuild it, see [https://github.com/seata/seata/tree/develop/saga/seata-saga-statemachine-designer](https://github.com/seata/seata/tree/develop/saga/seata-saga-statemachine-designer), and copy `index.html` and `dist/` directory to  `seata.github.io/saga_designer/` directory.



