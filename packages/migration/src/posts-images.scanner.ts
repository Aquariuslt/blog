import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as MarkdownIt from 'markdown-it';
import { source, metadata } from '@blog/markdown';
import { ImagesDetectionPlugin } from '@blog/markdown';

/**
 * @description scan images in markdown files
 * */
export const scan = (filepath: string) => {
  const sourceText = fs.readFileSync(filepath);
  const meta = metadata(sourceText);
  const src = source(sourceText);
  const md = new MarkdownIt().use(ImagesDetectionPlugin);
  const context = Object.assign({});
  md.parse(src, context);

  const contentImages = context.images;
  const coverImage = meta.cover;

  return contentImages.concat([coverImage]);
};

export const isImageHosting = (imageUrl: string): boolean => {
  const MATCHING_PREFIXS = ['https://', 'http://', '//'];
  return _.includes(_.map(MATCHING_PREFIXS, (prefix) => _.startsWith(imageUrl, prefix)), true);
};

export const getImageFilename = (imageUrl: string): string => {
  return path.basename(url.parse(imageUrl).pathname);
};
