import * as _ from 'lodash';
import { NavigationItem } from '@blog/common/interfaces/navigation';
import { createCategoriesOverviewRouteItem, createHomeRouteItem, createTagsOverviewRouteItem } from '@blog/router';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';

export const createCategoriesOverviewNavigationItem = (): NavigationItem => {
  const categoriesOverviewInfo = createCategoriesOverviewRouteItem();
  return _.merge({}, categoriesOverviewInfo, {
    icon: 'shape',
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

export const createHomeNavigationItem = (): NavigationItem => {
  const homeRouteItem = createHomeRouteItem();
  return _.merge({}, homeRouteItem, {
    icon: 'home',
    link: buildURLPath(RoutePathPrefix.HOME)
  });
};

export const createPageNavigationItem = (context: ArticleContext): NavigationItem => {
  return {
    id: context.id,
    label: context.title,
    icon: 'navigate_next',
    link: buildURLPath(RoutePathPrefix.PAGES, context.id)
  };
};

/** @description provide navigation menu options*/
export const createNavigationApiData = () => {
  return [createHomeNavigationItem(), createCategoriesOverviewNavigationItem(), createTagsOverviewNavigationItem()];
};
