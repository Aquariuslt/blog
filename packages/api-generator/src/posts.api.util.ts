import * as _ from 'lodash';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { createArticleOverview } from './article.util';
import { createTagDetailLinkItem } from './tags.api.util';
import { createCategoryLinkItem } from './categories.api.util';

/** @description simply `/` and `/posts` api response */
export const createPostsOverviewApiData = (contexts: ArticleContext[]) => _.map(contexts, createArticleOverview);

export const createPostDetailApiData = (id: string, contexts: ArticleContext[]) => {
  const context = _.find(contexts, { id });

  return Object.assign(context, {
    tags: _.map(context.tags, createTagDetailLinkItem),
    categories: _.map(context.categories, createCategoryLinkItem)
  });
};
