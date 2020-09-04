const { CLIEngine } = require('eslint');

const cli = new CLIEngine({});

module.exports = {
  '*.{js, jsx,ts,tsx}': (files) =>
    'eslint --fix --max-warnings=10 ' + files.filter((file) => !cli.isPathIgnored(file)).join(' ')
};
