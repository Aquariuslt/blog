import * as _ from 'lodash';
import * as path from 'path';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { createArticleOverview } from './article.util';
import { createTagDetailLinkItem } from './tags.api.util';
import { createCategoryLinkItem } from './categories.api.util';
import { buildPathFromContext } from '@blog/routes-tools';

/** @description simply `/` and `/posts` api response */
export const createPostsOverviewApiData = (contexts: ArticleContext[]) => _.map(contexts, createArticleOverview);

export const createPostDetailApiData = (id: string, contexts: ArticleContext[]) => {
  const context = _.find(contexts, { id });

  const contextPath = buildPathFromContext(context);

  let html = context.html;
  _.each(context.images, (image) => {
    html = html.replace(image, path.join(contextPath, image));
  });

  return Object.assign({}, context, {
    tags: _.map(context.tags, createTagDetailLinkItem),
    categories: _.map(context.categories, createCategoryLinkItem),
    cover: path.join(contextPath, context.cover),
    html: html
  });
};
