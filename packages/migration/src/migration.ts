import * as path from 'path';
import * as logger from 'fancy-log';
import { compressImages, migrateIds, migrateImages } from './index';

const DATA_DIR = path.resolve(__dirname, '../../../data');

migrateImages(DATA_DIR).then(() => {
  logger.info(`migration images completed`);
});

migrateIds(DATA_DIR).then(() => {
  logger.info(`migrate ids completed`);
});

compressImages(DATA_DIR).then(() => {
  logger.info(`compress images completed`);
});
