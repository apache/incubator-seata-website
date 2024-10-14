/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Overview',
      collapsible: false,
      items: [
        'overview/what-is-seata',
        'overview/history',
        'overview/terminology',
        'overview/faq',
      ],
    },
    {
      type: 'category',
      label: 'User Doc',
      collapsible: false,
      items: [
        'user/quickstart',
        'user/configurations',
        {
          type: 'category',
          label: 'Transaction Mode',
          items: [
            'user/mode/at',
            'user/mode/tcc',
            'user/mode/saga',
            'user/mode/xa',
          ],
        },
        {
          type: 'category',
          label: 'Transactions Grouping',
          items: [
            'user/txgroup/transaction-group',
            'user/txgroup/transaction-group-and-ha',
          ],
        },
        {
          type: 'category',
          label: 'Configuration Center',
          items: [
            'user/configuration/index',
            'user/configuration/nacos',
            'user/configuration/apollo',
            'user/configuration/etcd3',
            'user/configuration/consul',
            'user/configuration/zookeeper',
          ],
        },
        {
          type: 'category',
          label: 'Registration Authority',
          items: [
            'user/registry/index',
            'user/registry/nacos',
            'user/registry/eureka',
            'user/registry/etcd3',
            'user/registry/consul',
            'user/registry/zookeeper',
            'user/registry/namingserver',
          ],
        },
        'user/api',
        'user/microservice',
        'user/ormframework',
        'user/datasource',
        {
          type: 'category',
          label: 'SQL Reference',
          items: [
            'user/sqlreference/sql-restrictions',
            'user/sqlreference/dml',
            'user/sqlreference/sql-decoration',
            'user/sqlreference/function',
          ],
        },
        {
          type: 'category',
          label: 'APM',
          items: ['user/apm/skywalking', 'user/apm/prometheus'],
        },
        {
          type: 'category',
          label: 'Testing Report',
          items: ['user/performance'],
        },
        {
          type: 'category',
          label: 'Appendix',
          items: [
            'user/appendix/global-transaction-status',
            'user/appendix/isolation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Developer Guide',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Transaction Mode',
          items: [
            'dev/mode/at-mode',
            'dev/mode/tcc-mode',
            'dev/mode/saga-mode',
            'dev/mode/xa-mode',
          ],
        },
        {
          type: 'category',
          label: 'Domain Model',
          items: [
            'dev/domain/overviewDomainModel',
            'dev/domain/tm',
            'dev/domain/rm',
            'dev/domain/tc',
          ],
        },
        'dev/seata-mertics',
      ],
    },
    {
      type: 'category',
      label: 'Ops Guide',
      collapsible: false,
      items: [
        'ops/upgrade',
        'ops/multi-configuration-isolation',
        {
          type: 'category',
          label: 'Deploy',
          items: [
            'ops/deploy-guide-beginner',
            'ops/deploy-server',
            'ops/deploy-server-raft',
            'ops/deploy-by-docker',
            'ops/deploy-by-docker-compose',
            'ops/deploy-by-kubernetes',
            'ops/deploy-by-helm',
            'ops/deploy-ha',
          ],
        },
      ],
    },
  ],
  developers: [
    {
      type: 'category',
      label: 'Contribute Guide',
      collapsible: false,
      items: [
        'developers/contributor-guide/new-contributor-guide_dev',
        'developers/contributor-guide/test-coverage-guide_dev',
        'developers/contributor-guide/reporting-security-issues_dev',
        'developers/guide_dev',
      ],
    },
    {
      type: 'category',
      label: 'Committer Guide',
      collapsible: false,
      items: [
        'developers/committer-guide/label-an-issue-guide_dev',
        'developers/committer-guide/website-guide_dev'
      ],

    },
    {
      type: 'category',
      label: 'PPMC Guide',
      collapsible: false,
      items: [
        'developers/ppmc-guide/release-guide_dev'
      ],
    },
  ],
  'release-notes': [
    {
      type: 'category',
      label: 'release-notes',
      collapsible: false,
      items: ['release-notes'],
    },
  ],
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
