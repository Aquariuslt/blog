import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as MarkdownIt from 'markdown-it';
import { source } from '@blog/markdown';
import { ImagesDetectionPlugin } from '@blog/markdown';

/**
 * @description scan images in markdown files
 * */
export const scan = (filepath: string) => {
  const src = source(fs.readFileSync(filepath));
  const md = new MarkdownIt().use(ImagesDetectionPlugin);
  const context = Object.assign({});
  md.parse(src, context);

  return context.images;
};

export const isImageHosting = (imageUrl: string): boolean => {
  const MATCHING_PREFIXS = ['https://', 'http://', '//'];
  return _.includes(_.map(MATCHING_PREFIXS, (prefix) => _.startsWith(imageUrl, prefix)), true);
};

export const getImageFilename = (imageUrl: string): string => {
  return path.basename(url.parse(imageUrl).pathname);
};
