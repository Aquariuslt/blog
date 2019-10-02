import * as path from 'path';
import { migrateImages } from './index';

const DATA_DIR = path.resolve(__dirname, '../../../data');

migrateImages(DATA_DIR).then(() => {
  console.log(`migration completed`);
});
