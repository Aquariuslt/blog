import * as cosmiconfig from 'cosmiconfig';
import * as path from 'path';
import * as pkg from './package.json';

const explorer = cosmiconfig(`blog`);
const config = explorer.searchSync().config;
const configBasePath = path.dirname(explorer.searchSync().filepath);

// TODO: refactor from `@blog/config`
const DIST_DIR = path.join(configBasePath, config.dirs.dest);
const BASE_DIR = path.join(__dirname, 'src');

const USE_CURRENT_THEME = pkg.name.indexOf(config.theme) !== -1;
console.log(`USE_CURRENT_THEME:`, USE_CURRENT_THEME);

module.exports = {
  outputDir: USE_CURRENT_THEME ? DIST_DIR : undefined,
  configureWebpack: {
    resolve: {
      alias: {
        '@theme-vue': BASE_DIR
      }
    }
  },
  devServer: {
    contentBase: DIST_DIR,
    hot: true
  },
  pwa: {
    name: config.site.title,
    manifestOptions: {
      name: config.site.title,
      short_name: config.site.title
    }
  }
};
