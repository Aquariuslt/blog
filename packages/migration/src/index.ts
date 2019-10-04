import * as _ from 'lodash';
import * as fs from 'fs';
import * as download from 'download';
import * as path from 'path';
import * as logger from 'fancy-log';
import { metadata } from '@blog/markdown';
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
  logger.info(`migrating images from ${baseDir}`);
  const markdownFiles = lookupMarkdownFiles(baseDir);
  logger.info(`found ${markdownFiles.length} markdown files`);
  await Promise.all(markdownFiles.map(migrateImage));
};

/**
 * @description in previous version, we use filename as post id in url.
 *              this method will detect filename then update markdown source file
 * */
export const migrateId = async (filepath: string) => {
  const filename = path.basename(filepath, '.md');
  logger.info(`try to add id: ${filename}`);

  const fileContent = fs.readFileSync(filepath).toString();
  const meta = metadata(fileContent);
  if (meta.id) {
    logger.info(`skip file ${filename} cause it already has id`);
    return;
  }
  const ID_STR = `\nid: ${filename}\ncreated`;
  const CREATED_REGEX = `\ncreated`;

  const replacedFileContent = fileContent.replace(CREATED_REGEX, ID_STR);

  fs.writeFileSync(filepath, replacedFileContent, { encoding: 'utf-8' });
};

export const migrateIds = async (baseDir: string) => {
  logger.info(`update ids from ${baseDir}`);
  const markdownFiles = lookupMarkdownFiles(baseDir);
  logger.info(`found ${markdownFiles.length} markdown files`);
  await Promise.all(markdownFiles.map(migrateId));
};
