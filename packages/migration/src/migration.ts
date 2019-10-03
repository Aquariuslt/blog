import * as path from 'path';
import * as logger from 'fancy-log';
import { migrateImages } from './index';

const DATA_DIR = path.resolve(__dirname, '../../../data');

migrateImages(DATA_DIR).then(() => {
  logger.info(`migration completed`);
});
