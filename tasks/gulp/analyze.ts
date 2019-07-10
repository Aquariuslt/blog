import * as gulp from 'gulp';
import * as logger from 'fancy-log';
import * as webpack from 'webpack';

import webpackAnalyzeConfig from '../webpack/webpack.analyze';

gulp.task('analyze', (done): void => {
  webpack(webpackAnalyzeConfig, (error, stats): void => {
    logger.info('Webpack analyze done');
    if (error || stats.hasErrors()) {
      logger.error('Webpack analyze error:', error);
    }
    done();
  });
});
