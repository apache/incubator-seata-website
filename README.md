# Seata Official Website

[![CI Status](https://github.com/seata/seata.github.io/workflows/CI/badge.svg)](https://github.com/seata/seata.github.io/actions)

All website material of https://seata.io.

### Quick Start

1. `npm install`

2. `npm run start`

3. Visit
```
localhost:3000/
```

### Build

1. `npm run build`

2. `npm run serve`

3. Visit
```
localhost:3000/
```

## Requirements
Base docusaurus v2.4.1
Node.js version 16.14+

## Note for i18n
Please be noted that locale switching function doesn't work if you start the website in development mode using `npm run start -- --locale zh-cn` or `npm run start -- --locale en`. Please run it in production mode using the build-and-serve process to enable the locale switching function.

## How To Write Documents

### Add a new doc
 
1. Add new .md file under i18n/en/docusaurus-plugin-content-docs/current or i18n/zh-cn/docusaurus-plugin-content-docs/current. Corresponding to Chinese file and English file , and the Chinese and English file names should be consistent.
2. Update sidebar.js, add a new entry to the blog in either en or zh-cn.

### Add a new article for developers

1. Add new .md file under i18n/en/docusaurus-plugin-content-docs/current/developers or i18n/zh-cn/docusaurus-plugin-content-docs/current/developers, the file name should end up with _dev.md. Note that the suffix _dev is necessary.
2. Update sidebar.js, add a new entry in either en or zh-cn.

### Add a new blog

1. Add new .md file under i18n/en/docusaurus-plugin-content-blog/current or i18n/zh-cn/docusaurus-plugin-content-blog/current. Corresponding to Chinese file and English file , and the Chinese and English file names should be consistent.
2. `SEO` config is required.

## SEO

the type is :
```
---
title: title
keywords: [keywords1,keywords2]
description: some description
author: author name
date: 2018-12-29
custom_edit_url: https://github.com/seata/seata.github.io/blob/docusaurus/i18n/en/docusaurus-plugin-content-blog/download.md
---
```
**Note:**
1. `title` can not include `:` 
2. `keywords` must be a `Array`
3. `custom_edit_url` is a link to the doc in this repo, required.

## Note for .md file
1. Do not use un correct html tag like `<img>、<br>`, replace with `<img /> <br />`
2. If you want show `<xx>`, replace with `&lt;xx&gt;`

## Others

+ This is docusaurus docs :[https://docusaurus.io/zh-CN/docs](https://docusaurus.io/zh-CN/docs)
