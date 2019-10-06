import * as _ from 'lodash';
import * as fs from 'fs';
import * as MarkdownIt from 'markdown-it';
import { metadata, source } from '@blog/markdown';
import { ImagesDetectionPlugin } from '@blog/markdown/dist/images.plugin';
import { ContentItemPlugin } from '@blog/markdown/dist/content-item.plugin';
import { SummaryPlugin } from '@blog/markdown/dist/summary.plugin';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';

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

/** get all tags as key and contexts under each tag as value */
export const groupByArticleTags = (contexts: Partial<ArticleContext>[]) => {
  const tagsMap = Object.create({});

  _.each(contexts, (context) => {
    _.each(context.tags, (tag) => {
      if (tagsMap.hasOwnProperty(tag)) {
        tagsMap[tag].push(context);
      } else {
        tagsMap[tag] = [context];
      }
    });
  });

  return tagsMap;
};

export const groupByArticleCategories = (contexts: Partial<ArticleContext>[]) => {
  const categoriesMap = Object.create({});

  _.each(contexts, (context) => {
    _.each(context.categories, (category) => {
      if (categoriesMap.hasOwnProperty(category)) {
        categoriesMap[category].push(context);
      } else {
        categoriesMap[category] = [context];
      }
    });
  });

  return categoriesMap;
};

export const getAllTagsFromContexts = (contexts: ArticleContext[]) => _.keys(groupByArticleTags(contexts));

export const getAllCategoriesFromContexts = (contexts: ArticleContext[]) => _.keys(groupByArticleCategories(contexts));
