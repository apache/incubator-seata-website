# 新贡献者向导

这篇向导旨在给正在准备向Seata提交贡献的新手提供指导。

### 邮件列表描述

TBD

### 报告问题

### 发送 pull request

* 参考[pull request template](https://github.com/seata/seata/blob/develop/.github/PULL_REQUEST_TEMPLATE.md)
* 在您发送pull request之前，请同步您的github仓库和远程仓库，这会使您的pull request简单明了，具体操作请看如下所示步骤：

```sh
git remote add upstream git@github.com:seata/seata.git
git fetch upstream
git rebase upstream/master
git checkout -b your_awesome_patch
... add some work
git push origin your_awesome_patch
```

### 编码规范

请按照[CONTRIBUTING.md](https://github.com/seata/seata/blob/develop/CONTRIBUTING.md)中的编码规范对自己的代码进行检查。


### 参与发布投票

参与发布投票是一种重要的贡献社区的方式，Seata社区非常欢迎和鼓励任何人参与投票，每当一个版本需要正式发布的时候，会在开发者邮件列表上进行发布投票，只有当投票取得通过之后，才会正式发布，可以参考这个[检查列表](https://wiki.apache.org/incubator/IncubatorReleaseChecklist)对源码进行合规性检查。如果有任何问题，可以在开发者邮件列表上提问。
