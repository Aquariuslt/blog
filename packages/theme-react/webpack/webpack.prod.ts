import merge from 'webpack-merge';

import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

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
    chunkFilename: `static/js/[id].[chunkhash].js`,
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
      chunkFilename: `static/css/[id].[chunkhash].css`
    }),
    new FaviconsWebpackPlugin({
      prefix: `static/img`,
      outputPath: `static/img`,
      logo: BASE_DIR + `/favicon.svg`,
      cache: true,
      inject: true,
      favicons: {
        start_url: '/',
        appName: BASE_TITLE,
        appShortName: BASE_TITLE,
        appDescription: ``,
        theme_color: `#FAFAFA`,
        background_color: `#FAFAFA`,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          firefox: true,
          opengraph: true,
          twitter: true,
          windows: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: `${BASE_DIR}/index.html`,
      favicon: `${BASE_DIR}/favicon.svg`,
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
          filename: `static/js/vendor.[chunkhash].js`,
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
