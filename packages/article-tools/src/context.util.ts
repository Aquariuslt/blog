import * as fs from 'fs';
import { metadata, source } from '@blog/markdown';
import * as MarkdownIt from 'markdown-it';
import { ImagesDetectionPlugin } from '@blog/markdown/dist/images.plugin';
import { ContentItemPlugin } from '@blog/markdown/dist/content-item.plugin';
import { SummaryPlugin } from '@blog/markdown/dist/summary.plugin';

export const createArticleContext = (filepath: string) => {
  const fileContent = fs.readFileSync(filepath).toString();
  const meta = metadata(fileContent);
  const src = source(fileContent);

  const md = new MarkdownIt()
    .use(ImagesDetectionPlugin)
    .use(ContentItemPlugin)
    .use(SummaryPlugin);

  const context = Object.assign({}, meta);
  const html = md.render(src, context);

  context.src = src;
  context.html = html;

  // TODO: add validation
  return context;
};
