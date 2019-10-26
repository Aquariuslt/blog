import merge from 'webpack-merge';

import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { resolve } from './path.util';
import { webpackBaseConfig } from './webpack.base';

import { BASE_DIR } from './webpack.base';
const THEME_DIST_DIR = resolve(`dist`);

const webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: THEME_DIST_DIR,
    filename: `${THEME_DIST_DIR}/static/js/[name].[chunkhash].js`,
    chunkFilename: `${THEME_DIST_DIR}/static/js/[id].[chunkhash].js`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: [BASE_DIR],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        include: [BASE_DIR],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new TerserJSPlugin({}),
    new MiniCssExtractPlugin({
      filename: `${THEME_DIST_DIR}/static/css/[name].[chunkhash].js`,
      chunkFilename: `${THEME_DIST_DIR}/static/css/[id].[chunkhash].js`
    }),
    new HtmlWebpackPlugin({
      template: `${BASE_DIR}/index.html`,
      favicon: `${BASE_DIR}/favicon.ico`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: `${THEME_DIST_DIR}/static/js/vendor.[chunkhash].js`,
          chunks: 'all'
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
  stats: {
    colors: true,
    env: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    chunksSort: 'field',
    children: false,
    modules: false,
    reasons: false,
    warnings: false,
    assets: false,
    version: true,
    publicPath: true
  }
});

export default webpackProdConfig;
