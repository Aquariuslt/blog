import * as _ from 'lodash';
import * as download from 'download';
import * as path from 'path';
import { scan } from './markdown-files.scanner';
import { isImageHosting, scan as iscan } from './posts-images.scanner';

export const migrateImage = async (filepath: string) => {
  const images = iscan(filepath);
  const imagesOnHosting = _.filter(images, isImageHosting);

  const destDir = path.dirname(filepath);

  await Promise.all(
    imagesOnHosting.map((url) => {
      console.log(`downloading ${url}`);
      return download(url, destDir);
    })
  );
};

export const migrateImages = async (baseDir: string) => {
  const markdownFiles = scan(baseDir);
  await Promise.all(markdownFiles.map(migrateImage));
};
