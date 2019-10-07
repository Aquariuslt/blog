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

export const buildCategoriesApiData = (contexts: Partial<ArticleContext>[]) => {
  const categoriesMap = Object.create({});

  _.each(contexts, (context) => {
    _.each(context.categories, (rawCategory) => {
      const categoryPath = buildURLPath(RoutePathPrefix.CATEGORIES, uslug(rawCategory));
      if (categoriesMap.hasOwnProperty(categoryPath)) {
        categoriesMap[categoryPath].push(context);
      } else {
        categoriesMap[categoryPath] = [context];
      }
    });
  });

  return _.map(_.keys(categoriesMap), (key) => {
    return {
      key: key,
      data: categoriesMap[key]
    };
  });
};

/** @description simply `/categories/:category` api response, including article overviews */
export const createCategoriesDetailApiInfo = (contexts: ArticleContext[]) =>
  buildCategoriesApiData(_.map(contexts, createArticleOverview));
