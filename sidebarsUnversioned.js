// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsUnversioned = {
  download: [
    {
      type: 'category',
      label: 'download',
      collapsible: false,
      items: ['download/seata-server'],
    },
  ],
  'release-history': [
    {
      type: 'category',
      label: 'release-history',
      collapsible: false,
      items: ['release-history/seata-server'],
    },
  ],
};

module.exports = sidebarsUnversioned;
