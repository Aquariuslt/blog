import * as uslug from 'uslug';
import { Meta, MetaName, RoutePathPrefix } from '@blog/common/interfaces/routes';
export const createCategoriesOverviewRouteItem = () => ({
  id: RoutePathPrefix.CATEGORIES,
  label: `Categories` // TODO: add i18n support
});

export const createCategoryDetailRouteItem = (rawCategory: string) => ({
  id: uslug(rawCategory),
  label: `Category: ${rawCategory}`
});

export const createCategoriesOverviewDescMeta = (): Meta => ({
  name: MetaName.DESCRIPTION,
  content: `Categories`
});

export const createCategoryDetailDescMeta = (rawCategory: string): Meta => ({
  name: MetaName.DESCRIPTION,
  content: `Category: ${rawCategory}`
});

export const createCategoryDetailOpenGraphMetas = (rawCategory: string): Meta[] => [
  {
    name: MetaName.OPEN_GRAPH_DESCRIPTION,
    content: `Category: ${rawCategory}`
  }
];

export const createCategoriesOverviewMetas = (): Meta[] => [createCategoriesOverviewDescMeta()];
export const createCategoryDetailMetas = (rawCategory: string): Meta[] =>
  createCategoryDetailOpenGraphMetas(rawCategory);
