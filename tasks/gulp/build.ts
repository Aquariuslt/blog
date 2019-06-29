import * as gulp from 'gulp';
import * as logger from 'fancy-log';
import * as webpack from 'webpack';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import * as PrerenderSPAPlugin from 'prerender-spa-plugin';

import pathUtil from '../utils/path-util';

import * as packageJson from '../../package.json';
import webpackProdConfig from '../webpack/webpack.prod';

import configProcessor from '@blog/config-processor';
import apiGenerator from '@blog/api-generator';

const baseConfig = packageJson.config.base;

const ROUTES_FILENAME = 'routes.json';

gulp.task('build:webpack', (done): void => {
    const routes = JSON.parse(fs.readFileSync(pathUtil.resolve(baseConfig.dir.dist.root) + '/' + ROUTES_FILENAME).toString());

    webpackProdConfig.plugins.push(new PrerenderSPAPlugin({
      staticDir: pathUtil.resolve(baseConfig.dir.dist.root),
      routes: routes
    }));

    webpack(
      webpackProdConfig,
      (error, stats): void => {
        logger.info('Webpack build done');
        if (error || stats.hasErrors()) {
          logger.error('Webpack build error:', error);
        }
        stats
          .toString(webpackProdConfig.stats)
          .split('\n')
          .map(
            (line: string): void => {
              logger.info(line);
            }
          );
        done();
      }
    );
  }
);

gulp.task('build:config', async (done): Promise<void> => {
    const configPath = pathUtil.resolve('') + '/' + 'config.yml';

    const configProcessor = await import('@blog/config-processor');
    const config = configProcessor.default.read(configPath);

    const injectableConfig = {
      site: config.site,
      features: config.features,
      theme: config.build.theme,
      colors: config.build.colors
    };

    mkdirp.sync(pathUtil.resolve(baseConfig.dir.build));
    fs.writeFileSync(pathUtil.resolve(baseConfig.dir.build) + '/' + 'config.json', JSON.stringify(injectableConfig));
    done();
  }
);

gulp.task('build:api', (done): void => {
    const configPath = pathUtil.resolve('') + '/' + 'config.yml';
    let config = configProcessor.read(configPath);

    const mdFilePath = pathUtil.resolve('') + '/' + config.build.directory.posts;
    const distPath = pathUtil.resolve('') + '/' + config.build.directory.public;

    apiGenerator.generate(configPath, mdFilePath, distPath).then(
      (): void => {
        done();
      }
    );
  }
);

gulp.task('build:dev-api', (done): void => {
    const configPath = pathUtil.resolve('') + '/' + 'config.yml';
    const config = configProcessor.read(configPath);

    const mdFilePath = pathUtil.resolve('') + '/' + config.build.directory.posts;
    const distPath = pathUtil.resolve('') + '/' + baseConfig.dir.build;

    apiGenerator.generate(configPath, mdFilePath, distPath).then(
      (): void => {
        logger.info('Write api complete');
        done();
      }
    );
  }
);

gulp.task('build:cname', (done): void => {
  logger.info('Generating CNAME file');
  const configPath = pathUtil.resolve('') + '/' + 'config.yml';
  const config = configProcessor.read(configPath);

  const CNAME_FILENAME = 'CNAME';
  const hostname = config.site.host;
  const distPath = pathUtil.resolve('') + '/' + config.build.directory.public;

  fs.writeFileSync(distPath + '/' + CNAME_FILENAME, hostname);

  done();
});

gulp.task('build', gulp.series('clean:dist', 'build:config', 'build:api', 'build:webpack', 'build:cname'));
