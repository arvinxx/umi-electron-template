const { execSync } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');
const { join } = require('path');

const { name: appName, version } = require('../package.json');

const productName = 'Umi Electron Template';

const dir = join(__dirname, '../release');

const appPath = `${dir}/mac/${productName}.app`;

const zipFileName = `${appName}_setup_${version}.zip`;

const zipFilePath = `${dir}/${zipFileName}`;
const appBuilder = join(
  __dirname,
  '../node_modules/app-builder-bin/mac/app-builder',
);

console.log('Zipping...');
execSync(
  `ditto -c -k --sequesterRsrc --keepParent "${appPath}" "${zipFilePath}"`,
);

console.log('Finished zipping!');

console.log('Collect data...');

const blockmap = JSON.parse(
  execSync(
    `${appBuilder} blockmap -i ${zipFilePath} -o ${dir}/th.zip`,
  ).toString(),
);
console.log(blockmap);

// eslint-disable-next-line radix
blockmap.blockMapSize = parseInt(
  execSync(
    `ls -l ${dir}/th.zip | awk '{print $5}' && rm ${dir}/th.zip`,
  ).toString(),
);

const doc = yaml.load(fs.readFileSync(`${dir}/latest-mac.yml`, 'utf8'));

doc.files.unshift({
  url: zipFileName,
  ...blockmap,
});

doc.path = zipFileName;
doc.sha512 = blockmap.sha512;

fs.writeFileSync(
  `${dir}/latest-mac.yml`,
  yaml.dump(doc, { lineWidth: 65535 }),
  'utf8',
);
