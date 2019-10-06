// context collection processing
import { format } from 'date-fns';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { RouteMeta, RoutePathPrefix } from '@blog/common/interfaces/routes';
import { Layout } from '@blog/common/interfaces/routes/layout';
import { buildTitle } from './title.util';
import { buildFullURL, buildURLPath } from '@blog/common/utils/path.util';
import { createTagInfo, createTagsRootInfo } from './tag.util';
import { createCategoryInfo, createCategoryRootInfo } from './category.util';
import { createPostListRootInfo } from './post.util';
import {
  createBreadcrumbList,
  createCategoryDetailBreadcrumbItem,
  createCategoryListBreadcrumbItem,
  createHomeBreadcrumbItem,
  createPostDetailBreadcrumbItem,
  createPostListBreadcrumbItem,
  createTagDetailBreadcrumbItem,
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
  const url = buildFullURL(extra.baseUrl, path);

  return {
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(extra.baseUrl, extra.baseTitle, RoutePathPrefix.HOME),
      createTagListBreadcrumbItem(extra.baseUrl, title, path)
    ]),
    type: Layout.TABLE,
    meta: undefined,
    data: undefined
  };
};
export const createCategoryListRouteInfo = (
  contexts: ArticleContext[],
  extra?: Partial<RoutingExtraOption>
): RouteMeta => {
  const categoriesRootInfo = createCategoryRootInfo();
  const path = buildURLPath(RoutePathPrefix.CATEGORIES);
  const title = buildTitle(categoriesRootInfo.label, extra.baseTitle, extra.titleSeparator);
  const url = buildFullURL(extra.baseUrl, path);

  return {
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(extra.baseUrl, extra.baseTitle, RoutePathPrefix.HOME),
      createCategoryListBreadcrumbItem(extra.baseUrl, title, path)
    ]),
    type: Layout.TABLE,
    meta: undefined,
    data: undefined
  };
};
export const createPostListRouteInfo = (contexts: ArticleContext[], extra?: Partial<RoutingExtraOption>): RouteMeta => {
  const postsRootInfo = createPostListRootInfo();
  const path = buildURLPath(RoutePathPrefix.POSTS);
  const title = buildTitle(postsRootInfo.label, extra.baseTitle, extra.titleSeparator);
  const url = buildFullURL(extra.baseUrl, path);

  return {
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(extra.baseUrl, extra.baseTitle, RoutePathPrefix.HOME),
      createPostListBreadcrumbItem(extra.baseUrl, title, path)
    ]),
    type: Layout.LIST,
    meta: undefined,
    data: undefined
  };
};

export const createHomeRouteInfo = (options?: Partial<RoutingExtraOption>): RouteMeta => {
  const path = buildURLPath();
  const title = options.baseTitle;
  const url = buildFullURL(options.baseUrl, path);

  return {
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(options.baseUrl, options.baseTitle, RoutePathPrefix.HOME)
    ]),
    type: Layout.LIST,
    meta: undefined,
    data: undefined
  };
};

// single item
export const createTagDetailRouteInfo = (
  rawTag: string,
  contexts: ArticleContext[],
  extra?: Partial<RoutingExtraOption>
): RouteMeta => {
  const tagsRootRouteInfo = createTagListRouteInfo(contexts, extra);

  const tagInfo = createTagInfo(rawTag);
  const path = buildURLPath(RoutePathPrefix.TAGS, tagInfo.id);
  const title = buildTitle(tagInfo.label, extra.baseTitle, extra.titleSeparator);
  const url = buildFullURL(extra.baseUrl, path);

  return {
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(extra.baseUrl, extra.baseTitle, RoutePathPrefix.HOME),
      createTagListBreadcrumbItem(extra.baseUrl, tagsRootRouteInfo.title, tagsRootRouteInfo.path),
      createTagDetailBreadcrumbItem(extra.baseUrl, title, path)
    ]),
    type: Layout.LIST,
    data: undefined
  };
};

export const createCategoryDetailRouteInfo = (
  rawCategory: string,
  contexts: ArticleContext[],
  extra?: Partial<RoutingExtraOption>
): RouteMeta => {
  const categoriesRootRouteInfo = createCategoryListRouteInfo(contexts, extra);

  const categoryInfo = createCategoryInfo(rawCategory);
  const path = buildURLPath(RoutePathPrefix.CATEGORIES, categoryInfo.id);
  const title = buildTitle(categoryInfo.label, extra.baseTitle, extra.titleSeparator);
  const url = buildFullURL(extra.baseUrl, path);

  return {
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(extra.baseUrl, extra.baseTitle, RoutePathPrefix.HOME),
      createCategoryListBreadcrumbItem(extra.baseUrl, categoriesRootRouteInfo.title, categoriesRootRouteInfo.path),
      createCategoryDetailBreadcrumbItem(extra.baseUrl, title, path)
    ]),
    type: Layout.LIST,
    data: undefined
  };
};

export const createPostDetailRouteInfo = (
  article: ArticleContext,
  contexts: ArticleContext[],
  extra?: Partial<RoutingExtraOption>
): RouteMeta => {
  const postsRootRouteInfo = createPostListRouteInfo(contexts, extra);
  const created = new Date(article.created);

  const year = format(created, 'yyyy');
  const month = format(created, 'MM');
  const date = format(created, 'dd');
  const id = article.id;

  const path = buildURLPath(RoutePathPrefix.POSTS, year, month, date, id);
  const title = buildTitle(article.title, extra.baseTitle, extra.titleSeparator);
  const url = buildFullURL(extra.baseUrl, path);

  return {
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(extra.baseUrl, extra.baseTitle, RoutePathPrefix.HOME),
      createPostListBreadcrumbItem(extra.baseUrl, postsRootRouteInfo.title, postsRootRouteInfo.path),
      createPostDetailBreadcrumbItem(extra.baseUrl, title, path)
    ]),
    type: Layout.DETAIL,
    meta: undefined,
    data: undefined
  };
};
