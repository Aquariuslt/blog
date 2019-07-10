import * as gulp from 'gulp';
import * as logger from 'fancy-log';

import * as cp from 'child_process';

gulp.task('compile', (done): void => {
  cp.exec(`lerna run tsc`, (error, stdout): void => {
    stdout.split('\n').map((line): void => {
      logger.info(line);
    });
    done();
  });
});
