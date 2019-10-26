import * as logger from 'fancy-log';
import * as gulp from 'gulp';
import webpack from 'webpack';

/** webpack-dev-server related */
import addEntries from 'webpack-dev-server/lib/utils/addEntries';
import WebpackDevServer from 'webpack-dev-server';

import { webpackDevConfig } from './webpack/webpack.dev';
import { LOCAL_URL } from './webpack/webpack.dev';

gulp.task('serve', () => {
  logger.info('Webpack building.');
  addEntries(webpackDevConfig, webpackDevConfig.devServer);
  const compilerConfig = webpack(webpackDevConfig);

  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer).listen(
    webpackDevConfig.devServer.port,
    webpackDevConfig.devServer.host,
    () => {
      logger.info('You can visit at below urls:');
      logger.info('Local: ', LOCAL_URL);
    }
  );
});
