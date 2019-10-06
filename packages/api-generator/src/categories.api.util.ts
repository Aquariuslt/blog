import * as _ from 'lodash';
import * as uslug from 'uslug';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { groupByArticleCategories } from '@blog/article-tools';
import { createArticleOverview } from './article.util';

export const createCategoryApiInfo = (rawCategory: string, total: number) => ({
  id: uslug(rawCategory),
  label: rawCategory,
  total: total,
  link: buildURLPath(RoutePathPrefix.CATEGORIES, uslug(rawCategory))
});

export const createCategoriesApInfo = (contexts: ArticleContext[]) => {
  const categoriesMap = groupByArticleCategories(contexts);
  return _.map(_.keys(categoriesMap), (category) => createCategoryApiInfo(category, categoriesMap[category].length));
};

/** @description simply `/categories/:category` api response, including article overviews */
export const createCategoriesDetailApiInfo = (contexts: ArticleContext[]) =>
  groupByArticleCategories(_.map(contexts, createArticleOverview));
