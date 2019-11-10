import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { loadConfig } from '@blog/config';
import { resolve } from './path.util';

const config = loadConfig();

export const BASE_TITLE = config.site.baseTitle;
export const BASE_DIR = resolve(`src`);
export const DIST_DIR = config.dirs.dest;

export const webpackBaseConfig = {
  entry: {
    main: resolve(`src/main.tsx`)
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@theme-react': BASE_DIR
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: `static/fonts/[name].[ext]`
        }
      },
      {
        test: /\.properties$/,
        include: [BASE_DIR],
        loader: 'properties-json-loader'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BASE_TITLE: BASE_TITLE
    })
  ]
};
