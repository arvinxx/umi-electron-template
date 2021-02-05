module.exports = {
  yarn: {
    path: [
      `${process.env.HOME}/.npm`,
      '~/.npm',
      '~/cache',
      !'~/cache/exclude',
      '**/node_modules',
      '.umi',
    ],
    // */* is for supporting lerna monorepo with depth=2
    hashFiles: [`yarn.lock`],
  },
};
