const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  appOutputPath: path.resolve(__dirname, '../', 'dist'),
  appEntryPath: path.resolve(__dirname, '../', 'src/index.tsx'),
  templatePath: path.resolve(__dirname, '../', 'public/index.html'),
  imagesFolder: path.resolve(__dirname, '../', 'public/assets'),
  fontsFolder: path.resolve(__dirname, '../', 'public/fonts'),
  nodeModulesPath: path.resolve(__dirname, 'node_modules'),
  messagesPath: path.resolve(
    __dirname,
    '../',
    'src/core-utils/messages/index.ts',
  ),
};
