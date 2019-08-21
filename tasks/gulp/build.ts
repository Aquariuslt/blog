/* eslint-disable @typescript-eslint/camelcase */
import * as gulp from 'gulp';
import { dest } from 'gulp';
import * as rename from 'gulp-rename';
import * as logger from 'fancy-log';
import * as webpack from 'webpack';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import * as PrerenderSPAPlugin from 'prerender-spa-plugin';
import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import * as PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import * as workbox from 'workbox-build';

import pathUtil from '../utils/path-util';

import * as packageJson from '../../package.json';
import webpackProdConfig from '../webpack/webpack.prod';

import configProcessor from '@blog/config-processor';
import apiGenerator from '@blog/api-generator';

const baseConfig = packageJson.config.base;

const DEFAULT_BG_COLOR = '#FAFAFA';
const ROUTES_FILENAME = 'routes.json';
const FALLBACK_FILENAME = '404.html';


gulp.task('build:webpack', (done): void => {
    const configPath = pathUtil.resolve('') + '/' + 'config.yml';
    const routes = JSON.parse(fs.readFileSync(pathUtil.resolve(baseConfig.dir.dist.root) + '/' + ROUTES_FILENAME).toString());
    const config = configProcessor.read(configPath);

    const themeColor = config.build.colors ? config.build.colors['primary']['main'] : DEFAULT_BG_COLOR;

    webpackProdConfig.plugins.push(new FaviconsWebpackPlugin({
      prefix: baseConfig.dir.dist.img,
      outputPath: baseConfig.dir.dist.img,
      logo: `./${baseConfig.dir.src}/favicon.png`,
      cache: true,
      inject: true,
      favicons: {
        start_url: '/',
        appName: config.site.title,
        appShortName: config.site.title,
        appDescription: config.site.description,
        theme_color: themeColor,
        background_color: themeColor,
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
    }));


    webpackProdConfig.plugins.push(new PrerenderSPAPlugin({
      staticDir: pathUtil.resolve(baseConfig.dir.dist.root),
      routes: routes,
      renderer: new PuppeteerRenderer({
        // Optional - defaults to 0, no limit.
        // Routes are rendered asynchronously.
        // Use this to limit the number of routes rendered in parallel.
        maxConcurrentRoutes: 4,
        // Other puppeteer options.
        // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
        headless: true // Display the browser window when rendering. Useful for debugging.
      }),
      minify: {
        minifyCSS: true
      }
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

gulp.task('build:service-worker', (): void => {
  const dist = pathUtil.resolve(baseConfig.dir.dist.root);
  return workbox.generateSW({
    globDirectory: dist,
    globPatterns: [
      '\*\*/\*.{js,json,css}',
      '\*\*/\*.{jpg,jpeg,png}',
      'index.html'
    ],
    importWorkboxFrom: 'local',
    swDest: `${dist}/sw.js`,
    clientsClaim: true,
    skipWaiting: true
  }).then(({ warnings }): void => {
    for (const warning of warnings) {
      logger.warn('Service worker warning:', warning);
    }
    logger.info('Generate Service worker complete');
  }).catch((error): void => {
    logger.error('Service worker generation failed:', error);
  });
});

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
    const config = configProcessor.read(configPath);

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

gulp.task('build:pages', (done): void => {
  logger.info('Generating CNAME file');
  const configPath = pathUtil.resolve('') + '/' + 'config.yml';
  const config = configProcessor.read(configPath);

  const CNAME_FILENAME = 'CNAME';
  const hostname = config.site.host;
  const distPath = pathUtil.resolve('') + '/' + config.build.directory.public;

  fs.writeFileSync(distPath + '/' + CNAME_FILENAME, hostname);

  gulp.src(pathUtil.resolve(baseConfig.dir.dist.root) + '/index.html')
    .pipe(rename(FALLBACK_FILENAME))
    .pipe(dest(pathUtil.resolve(baseConfig.dir.dist.root)))
    .on('end', (): void => {
      done();
    });
});


gulp.task('build', gulp.series(
  'clean:dist',
  'build:config',
  'build:api',
  'build:webpack',
  'build:service-worker',
  'build:pages'
));
