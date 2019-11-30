import * as _ from 'lodash';
import * as uslug from 'uslug';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { groupByArticleCategories } from '@blog/article';
import { createArticleOverview } from './article.util';

export const createCategoryLinkItem = (rawCategory: string, total?: number) => ({
  id: uslug(rawCategory),
  label: rawCategory,
  total: total,
  link: buildURLPath(RoutePathPrefix.CATEGORIES, uslug(rawCategory))
});

export const createCategoriesOverviewApiData = (contexts: ArticleContext[]) => {
  const categoriesMap = groupByArticleCategories(contexts);
  return _.map(_.keys(categoriesMap), (category) => createCategoryLinkItem(category, categoriesMap[category].length));
};

export const createCategoryDetailApiData = (rawCategory: string, contexts: ArticleContext[]) => {
  return _.map(
    _.filter(contexts, (context) => _.includes(context.categories, rawCategory)),
    createArticleOverview
  );
};
