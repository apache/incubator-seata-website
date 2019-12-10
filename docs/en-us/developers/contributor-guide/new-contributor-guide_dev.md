---
title: New contributor guide
keywords: Seata, contributor
description: This is a guide for new comers who wants to contribute to Seata.
---

# New contributor guide

This is a guide for new comers who wants to contribute to Seata.

### Subscribe to the mailing list

TBD

### Reporting issue

You can always reporting an issue to Seata via Github [Issues](https://github.com/seata/seata/issues).

If you are reporting bugs, please refer to the issue report [template](https://github.com/seata/seata/issues/new?template=BUG_REPORT.md).

If you are reporting feature, please refer to the issue report [template](https://github.com/seata/seata/issues/new?template=FEATURE_REQUEST.md).

If you are reporting regular issues, like raise an question, you can open an [regular issue](https://github.com/seata/seata/issues/new).

### Sending pull request

* Follow the checklist in the [pull request template](https://github.com/seata/seata/blob/develop/.github/PULL_REQUEST_TEMPLATE.md)
* Before you sending out the pull request, please sync your forked repository with remote repository, this will make your pull request simple and clear. See guide below:

```sh
git remote add upstream git@github.com:seata/seata.git
git fetch upstream
git rebase upstream/master
git checkout -b your_awesome_patch
... add some work
git push origin your_awesome_patch
```

### Code convention

Please check the [CONTRIBUTING.md](https://github.com/seata/seata/blob/develop/CONTRIBUTING.md) for code convention.
