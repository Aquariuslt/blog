import * as _ from 'lodash';
import { NavigationItem } from '@blog/common/interfaces/navigation';
import { createCategoriesOverviewRouteItem, createTagsOverviewRouteItem } from '@blog/routes-tools';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';

export const createCategoriesOverviewNavigationItem = (): NavigationItem => {
  const categoriesOverviewInfo = createCategoriesOverviewRouteItem();
  return _.merge({}, categoriesOverviewInfo, {
    icon: 'category',
    link: buildURLPath(RoutePathPrefix.CATEGORIES)
  });
};

export const createTagsOverviewNavigationItem = (): NavigationItem => {
  const tagsOverviewInfo = createTagsOverviewRouteItem();
  return _.merge({}, tagsOverviewInfo, {
    icon: 'bookmark',
    link: buildURLPath(RoutePathPrefix.TAGS)
  });
};

/** @description provide navigation menu options*/
export const createNavigationApiData = () => {
  return [createCategoriesOverviewNavigationItem(), createTagsOverviewNavigationItem()];
};
