import * as uslug from 'uslug';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';

export const createCategoriesOverviewRouteItem = () => ({
  id: RoutePathPrefix.CATEGORIES,
  label: 'Categories' // TODO: add i18n support
});

export const createCategoryDetailRouteItem = (rawCategory: string) => ({
  id: uslug(rawCategory),
  label: `Category: ${rawCategory}`
});
