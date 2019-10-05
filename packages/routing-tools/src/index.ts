// context collection processing
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { RouteMeta, RoutePathPrefix } from '@blog/common/interfaces/routes';
import { Layout } from '@blog/common/interfaces/routes/layout';
import { buildTitle } from './title.util';
import { buildURLPath } from './path.util';
import { createTagsRootInfo } from './tag.util';
import { createCategoryRootInfo } from './category.util';
import {
  createCategoryListBreadcrumbItem,
  createHomeBreadcrumbItem,
  createTagListBreadcrumbItem
} from './breadcrumb.util';

export interface RoutingExtraOption {
  baseUrl: string;
  baseTitle: string;
  titleSeparator: string;
}

export const createTagListRouteInfo = (contexts: ArticleContext[], extra?: Partial<RoutingExtraOption>): RouteMeta => {
  const tagsRootInfo = createTagsRootInfo();
  const path = buildURLPath(RoutePathPrefix.TAGS);
  const title = buildTitle(tagsRootInfo.label, extra.baseTitle, extra.titleSeparator);

  return {
    path: path,
    title: title,
    breadcrumbs: [
      createHomeBreadcrumbItem(extra.baseUrl, extra.baseTitle, RoutePathPrefix.HOME),
      createTagListBreadcrumbItem(extra.baseUrl, title, path)
    ],
    type: Layout.LIST,
    data: undefined
  };
};
export const createCategoryListRouteInfo = (contexts: ArticleContext[], extra?: Partial<RoutingExtraOption>) => {
  const categoriesRootInfo = createCategoryRootInfo();
  const path = buildURLPath(RoutePathPrefix.CATEGORIES);
  const title = buildTitle(categoriesRootInfo.label, extra.baseTitle, extra.titleSeparator);

  return {
    path: path,
    title: title,
    breadcrumbs: [
      createHomeBreadcrumbItem(extra.baseUrl, extra.baseTitle, RoutePathPrefix.HOME),
      createCategoryListBreadcrumbItem(extra.baseUrl, title, path)
    ],
    type: Layout.LIST,
    data: undefined
  };
};
export const createPostListRouteInfo = (contexts: ArticleContext[], extra?: Partial<RoutingExtraOption>) => {};

// single item
export const createTagDetailInfo = (context: ArticleContext, extra?: Partial<RoutingExtraOption>) => {};
export const createCategoryDetailRouteInfo = (context: ArticleContext, extra?: Partial<RoutingExtraOption>) => {};
export const createPostDetailRouteInfo = (context: ArticleContext, extra?: Partial<RoutingExtraOption>) => {};
