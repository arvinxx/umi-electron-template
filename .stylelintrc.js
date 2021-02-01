const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: {
    'no-invalid-double-slash-comments': null,
    'function-name-case': null,
  },
};
