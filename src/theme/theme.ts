const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, 'token', './override.less'), 'utf8'),
);

export default themeVariables;
