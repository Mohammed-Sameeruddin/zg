import path from 'path';

export default {
  process(filename: string) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
