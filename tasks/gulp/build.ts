import * as gulp from 'gulp';
import * as logger from 'fancy-log';
import * as webpack from 'webpack';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import pathUtil from '../utils/path-util';
import apiGenerator from '@blog/api-generator';
import configProcessor from '@blog/config-processor';

import * as packageJson from '../../package.json';
import webpackProdConfig from '../webpack/webpack.prod';


const baseConfig = packageJson.config.base;

gulp.task('webpack', (done): void => {
  webpack(webpackProdConfig,
    (error, stats): void => {
      logger.info('Webpack build done');
      if (error || stats.hasErrors()) {
        logger.error('Webpack build error:', error);
      }
      logger.info(stats.toString(webpackProdConfig.stats));
      done();
    });
});

gulp.task('build:config', (done): void => {
  const configPath = pathUtil.resolve('') + '/' + 'config.yml';
  const config = configProcessor.read(configPath);

  const injectableConfig = {
    site: config.site,
    features: config.features,
    theme: config.build.theme
  };

  mkdirp.sync(pathUtil.resolve(baseConfig.dir.build));
  fs.writeFileSync(pathUtil.resolve(baseConfig.dir.build) + '/' + 'config.json', JSON.stringify(injectableConfig));
  done();
});


gulp.task('build:api', (done): void => {
  const configPath = pathUtil.resolve('') + '/' + 'config.yml';
  let config = configProcessor.read(configPath);

  const mdFilePath = pathUtil.resolve('') + '/' + config.build.directory.posts;
  const distPath = pathUtil.resolve('') + '/' + config.build.directory.public;

  apiGenerator.generate(configPath, mdFilePath, distPath).then((): void => {
    done();
  });
});


gulp.task('build', gulp.series('clean', 'build:config', 'build:api', 'webpack'));
