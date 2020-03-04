import merge from 'webpack-merge';

import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import PreloadPlugin from 'preload-webpack-plugin';
import RobotsTxtPlugin from 'robotstxt-webpack-plugin';

import { resolve } from './path.util';
import { BASE_DIR, BASE_TITLE, webpackBaseConfig } from './webpack.base';

const THEME_DIST_DIR = resolve(`dist`);
const NODE_MODULES = resolve(`node_modules`);

export const webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: THEME_DIST_DIR,
    filename: `static/js/[name].[chunkhash].js`,
    chunkFilename: `static/js/[name].[chunkhash].js`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: [BASE_DIR, NODE_MODULES],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        include: [BASE_DIR, NODE_MODULES],
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new TerserJSPlugin({}),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].[chunkhash].css`,
      chunkFilename: `static/css/[name].[chunkhash].css`
    }),
    new HtmlWebpackPlugin({
      template: `${BASE_DIR}/index.html`,
      favicon: `${BASE_DIR}/favicon.png`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      }
    }),
    new FaviconsWebpackPlugin({
      prefix: `static/img`,
      outputPath: `static/img`,
      logo: BASE_DIR + `/favicon.png`,
      cache: true,
      inject: true,
      favicons: {
        start_url: '/',
        appName: BASE_TITLE,
        appShortName: BASE_TITLE,
        appDescription: ``,
        theme_color: `#FFFFFF`,
        background: `#FFFFFF`,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          firefox: true,
          windows: true
        }
      }
    }),
    new PreloadPlugin({
      rel: 'preload',
      include: 'allChunks'
    }),
    new RobotsTxtPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ]
  },
  stats: 'minimal'
});
