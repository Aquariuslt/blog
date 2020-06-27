import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { resolve } from './path.util';
import { BASE_DIR, DIST_DIR, webpackBaseConfig } from './webpack.base';

const PROTOCOL = 'http://';
const LOCAL_HOST = 'localhost';
const LOCAL_PORT = 8081;
export const LOCAL_URL = `${PROTOCOL}${LOCAL_HOST}:${LOCAL_PORT}/`;

export const webpackDevConfig = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    path: resolve(`build`),
    publicPath: LOCAL_URL,
    filename: '[name].bundle.js',
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
              hmr: true,
            },
          },
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [BASE_DIR],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].bundle.css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: `${BASE_DIR}/index.html`,
      favicon: `${BASE_DIR}/favicon.png`,
    }),
    new FriendlyErrorsPlugin(),
  ],
  devServer: {
    host: LOCAL_HOST,
    port: LOCAL_PORT,
    historyApiFallback: true,
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
      chunkModules: false,
    },
    publicPath: LOCAL_URL,
    contentBase: DIST_DIR,
    hot: true,
  },
});

export default webpackDevConfig;
