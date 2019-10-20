import * as path from 'path';

import { loadConfig } from '@blog/config';

const config = loadConfig();

const BASE_DIR = path.join(__dirname, 'src');
const DIST_DIR = config.dirs.dest;

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@theme-vue': BASE_DIR
      }
    }
  },
  chainWebpack: (conf) => {
    conf.plugin('html').tap((args) => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      };
      return args;
    });
  },
  devServer: {
    contentBase: DIST_DIR,
    hot: true
  },
  pwa: {
    name: config.site.baseTitle,
    manifestOptions: {
      name: config.site.baseTitle,
      short_name: config.site.baseTitle,
      start_url: '/'
    },
    themeColor: '#1A73E8'
  }
};
