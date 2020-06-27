import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { resolve } from './path.util';

export const BASE_TITLE = `@blog/editor`;
export const BASE_DIR = resolve(`src`);
export const DIST_DIR = resolve(`dist`);

export const webpackBaseConfig = {
  entry: {
    main: resolve(`src/main.tsx`),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@editor': BASE_DIR,
    },
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: `static/fonts/[name].[ext]`,
        },
      },
      {
        test: /\.properties$/,
        include: [BASE_DIR],
        loader: 'properties-json-loader',
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BASE_TITLE: BASE_TITLE,
    }),
  ],
};
