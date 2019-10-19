import * as cosmiconfig from 'cosmiconfig';
import * as path from 'path';

const explorer = cosmiconfig(`blog`);
const config = explorer.searchSync().config;
const configBasePath = path.dirname(explorer.searchSync().filepath);

// TODO: refactor from `@blog/config`
const API_BASE_DIR = path.join(configBasePath, config.dirs.dest);

const BASE_DIR = path.join(__dirname, 'src');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('@theme', BASE_DIR);
  },
  devServer: {
    contentBase: API_BASE_DIR,
    hot: true
  }
};
