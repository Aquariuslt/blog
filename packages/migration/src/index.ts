import * as _ from 'lodash';
import * as download from 'download';
import * as path from 'path';
import * as logger from 'fancy-log';
import { lookupMarkdownFiles } from '@blog/article-tools';
import { lookupImagesInMarkdownFile, isImageHosting } from '@blog/article-tools';

export const migrateImage = async (filepath: string) => {
  const images = lookupImagesInMarkdownFile(filepath);
  const imagesOnHosting = _.filter(images, isImageHosting);

  const destDir = path.dirname(filepath);

  await Promise.all(
    imagesOnHosting.map((url) => {
      logger.info(`downloading ${url}`);
      return download(url, destDir);
    })
  );
};

export const migrateImages = async (baseDir: string) => {
  const markdownFiles = lookupMarkdownFiles(baseDir);
  await Promise.all(markdownFiles.map(migrateImage));
};
