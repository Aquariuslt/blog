import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import * as _ from 'lodash';
import { createArticleOverview } from './article.util';

/** @description simply `/` and `/posts` api response */
export const createPostListDetailApiInfo = (contexts: ArticleContext[]) => _.map(contexts, createArticleOverview);
