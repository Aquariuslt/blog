/* Created by Aquariuslt on 14/04/2017.*/

import webpack from 'webpack';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

import pkg from '../../package.json';
import appConfig from './app.config';
import baseConfig from './base.config';
import webpackBaseConfig from './webpack.base.babel';

import pathUtil from '../utils/path-util';
import vueLoaderUtil from '../utils/vue-loader-util';

let webpackProdConfig = merge(webpackBaseConfig, {
  devtool: 'source-map',
  output: {
    path: pathUtil.resolve(baseConfig.dir.dist),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderUtil.buildVueStylesLoader({
          sourceMap: true,
          extract: true,
          minimize: true
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin(baseConfig.dir.assets),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: false
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: appConfig['blog']['name'],
      template: baseConfig.dir.src + '/index.html',
      favicon: baseConfig.dir.src + '/' + baseConfig.file.favicon,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            pathUtil.resolve('node_modules')
          ) === 0
        );
      }
    }),
    new WebpackPwaManifest({
      name: appConfig['blog']['name'],
      short_name: appConfig['blog']['name'],
      description: appConfig['blog']['description'],
      background_color: appConfig['blog']['theme'],
      start_url: 'index.html',
      icons: [
        {
          src: pathUtil.resolve(baseConfig.dir.src + '/' + baseConfig.file.favicon),
          sizes: [96, 128, 192, 256, 384, 512],
          type: 'image/png',
          density: 0.75
        }
      ]
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: pkg.name,
      filename: 'service-worker.js',
      staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /\.json$/
      ],
      minify: true
    })
  ],
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    chunksSort: 'name',
    children: false,
    modules: false,
    reasons: false,
    warnings: true,
    assets: false,
    version: false
  }
});

export default webpackProdConfig;
