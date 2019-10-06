import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import * as _ from 'lodash';
import { buildPathFromContext, createArticleOverview } from './article.util';

/** @description simply `/` and `/posts` api response */
export const createPostsApiInfo = (contexts: ArticleContext[]) => _.map(contexts, createArticleOverview);

export const groupByArticlePath = (contexts: ArticleContext[]) => {
  const postsMap = Object.create({});

  _.each(contexts, (context) => {
    const postPath = buildPathFromContext(context);
    postsMap[postPath] = context;
  });

  return postsMap;
};

/** @description `/posts/:post-id` api response */
export const createPostsDetailInfo = (contexts: ArticleContext[]) => groupByArticlePath(contexts);
