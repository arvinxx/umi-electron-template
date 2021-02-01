import OverrideGenerator from './generate';

import path from 'path';

import fs from 'fs';

import lessToJs from 'less-vars-to-js';

const generate = new OverrideGenerator();

generate.generateFiles();

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, './override.less'), 'utf8'),
);

export default {
  'primary-color': '#233ad2',
};
