// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsUnversioned = {
  download: [
    {
      type: 'category',
      label: 'download',
      collapsible: false,
      items: ['download/seata-server', 'download/java-sdk'],
    },
  ],
  'release-history': [
    {
      type: 'category',
      label: 'release-history',
      collapsible: false,
      items: ['release-history/seata-server', 'release-history/java-sdk'],
    },
  ],
};

module.exports = sidebarsUnversioned;
