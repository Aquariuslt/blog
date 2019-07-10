import * as gulp from 'gulp';
import * as logger from 'fancy-log';
import * as rimraf from 'gulp-rimraf';

import * as packageJson from '../../package.json';
import pathUtil from '../utils/path-util';

const baseConfig = packageJson.config.base;

const SRC_OPTIONS = {
  allowEmpty: true
};

gulp.task('clean:build', (): void => {
  logger.info('Deleting build folder');
  return gulp.src(pathUtil.resolve(baseConfig.dir.build), SRC_OPTIONS).pipe(rimraf());
});

gulp.task('clean:tsc-build', (): void => {
  logger.info('Deleting tsc-build folder');
  return gulp.src(pathUtil.resolve(baseConfig.dir.tscbuild), SRC_OPTIONS).pipe(rimraf());
});

gulp.task('clean:dist', (): void => {
  logger.info('Deleting dist folder');
  return gulp.src(pathUtil.resolve(baseConfig.dir.dist.root), SRC_OPTIONS).pipe(rimraf());
});

gulp.task('clean:packages-dist', (): void => {
  logger.info('Deleting packages dist');
  return gulp.src(baseConfig.dir.dist.packages, SRC_OPTIONS).pipe(rimraf());
});

gulp.task('clean', gulp.series('clean:build', 'clean:tsc-build', 'clean:dist', 'clean:packages-dist'));
