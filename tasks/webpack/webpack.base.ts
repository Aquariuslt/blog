import pathUtil from '../utils/path-util';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import * as packageJson from '../../package.json';

const baseConfig = packageJson.config.base;

const webpackBaseConfig = {
  entry: {
    main: pathUtil.resolve(baseConfig.dir.src) + '/' + 'main.ts'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': pathUtil.resolve(baseConfig.dir.src)
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [
          pathUtil.resolve(baseConfig.dir.src),
          pathUtil.resolve(baseConfig.dir.packages),
          pathUtil.resolve(baseConfig.dir.test.unit),
          pathUtil.resolve(baseConfig.dir.test.e2e)
        ],
        exclude: [/node_modules/],
        loader: 'ts-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          useRelativePath: true,
          publicPath: './',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: baseConfig.dir.dist.fonts + '/' + '[name].[ext]'
        }
      },
      {
        test: /\.properties$/,
        include: [
          pathUtil.resolve(baseConfig.dir.src),
          pathUtil.resolve(baseConfig.dir.packages)
        ],
        loader: 'properties-json-loader'
      }
    ]
  }
};

export default webpackBaseConfig;
