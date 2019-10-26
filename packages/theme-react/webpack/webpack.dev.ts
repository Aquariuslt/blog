import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { resolve } from './path.util';
import { webpackBaseConfig } from './webpack.base';
import { BASE_DIR, DIST_DIR } from './webpack.base';

const PROTOCOL = 'http://';
const LOCAL_IP = '127.0.0.1';
const LOCAL_PORT = 8080;
export const LOCAL_URL = `${PROTOCOL}${LOCAL_IP}:${LOCAL_PORT}`;

export const webpackDevConfig = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    path: resolve(`build`),
    publicPath: LOCAL_URL,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: [BASE_DIR],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        include: [BASE_DIR],
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].bundle.css',
      ignoreOrder: false
    }),
    new HtmlWebpackPlugin({
      template: `${BASE_DIR}/index.html`,
      favicon: `${BASE_DIR}/favicon.ico`
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    host: LOCAL_IP,
    port: LOCAL_PORT,
    historyApiFallback: true,
    open: true,
    quiet: false,
    noInfo: true,
    stats: {
      cached: false,
      assets: false,
      colors: true,
      version: false,
      hash: false,
      children: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    publicPath: LOCAL_URL,
    contentBase: DIST_DIR,
    hot: true
  }
});

export default webpackDevConfig;
