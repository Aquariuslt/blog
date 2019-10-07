import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import * as _ from 'lodash';
import { buildPathFromContext, createArticleOverview } from './article.util';

/** @description simply `/` and `/posts` api response */
export const createPostsApiInfo = (contexts: ArticleContext[]) => _.map(contexts, createArticleOverview);

export const buildPostApiData = (contexts: ArticleContext[]) => {
  return _.map(contexts, (context) => {
    const postPath = buildPathFromContext(context);
    return {
      key: postPath,
      data: context
    };
  });
};

/** @description `/posts/:post-id` api response */
export const createPostsDetailInfo = (contexts: ArticleContext[]) => buildPostApiData(contexts);
