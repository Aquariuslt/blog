import * as _ from 'lodash';
import * as path from 'path';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { createArticleOverview } from './article.util';
import { createTagDetailLinkItem } from './tags.api.util';
import { createCategoryLinkItem } from './categories.api.util';
import { buildPostPathFromContext, buildPagePathFromContext } from '@blog/router';
import { isImageHosting } from '@blog/article';

/** @description simply `/` and `/posts` api response */
export const createPostsOverviewApiData = (contexts: ArticleContext[]) => _.map(contexts, createArticleOverview);

export const createPostDetailApiData = (id: string, contexts: ArticleContext[]) => {
  const context = _.find(contexts, { id });

  const contextPath = buildPostPathFromContext(context);

  let html = context.html;
  _.each(
    context.images.filter((image) => !isImageHosting(image)),
    (image) => {
      html = html.replace(image, path.join(contextPath, image));
    }
  );

  return Object.assign({}, context, {
    tags: _.map(context.tags, createTagDetailLinkItem),
    categories: _.map(context.categories, createCategoryLinkItem),
    cover: path.join(contextPath, context.cover),
    html: html
  });
};

export const createPageDetailApiData = (context: ArticleContext) => {
  const contextPath = buildPagePathFromContext(context);
  let html = context.html;
  _.each(
    context.images.filter((image) => !isImageHosting(image)),
    (image) => {
      html = html.replace(image, path.join(contextPath, image));
    }
  );

  return Object.assign({}, context, {
    tags: [],
    categories: [],
    cover: path.join(contextPath, context.cover),
    html: html
  });
};
