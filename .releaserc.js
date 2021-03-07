const createConfig = require('semantic-release-config-gitmoji/lib/createConfig');

const config = createConfig({
  changelogTitle: '# Umi Electron Template 更新日志',
  githubAssets: ['release'],
});

module.exports = {
  extends: [config],
};
