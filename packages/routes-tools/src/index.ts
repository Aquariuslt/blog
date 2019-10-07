// context collection processing
import { format } from 'date-fns';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { RouteMeta, RoutePathPrefix } from '@blog/common/interfaces/routes';
import { Layout } from '@blog/common/interfaces/routes/layout';
import { buildFullURL, buildURLPath } from '@blog/common/utils/path.util';
import { buildTitle } from './title.util';
import { createTagDetailRouteItem, createTagsOverviewRouteItem } from './tag.util';
import { createCategoryDetailRouteItem, createCategoriesOverviewRouteItem } from './category.util';
import { createPostsOverviewRouteItem } from './post.util';
import {
  createBreadcrumbList,
  createCategoryDetailBreadcrumbItem,
  createCategoriesOverviewBreadcrumbItem,
  createHomeBreadcrumbItem,
  createPostDetailBreadcrumbItem,
  createPostsOverviewBreadcrumbItem,
  createTagDetailBreadcrumbItem,
  createTagsOverviewBreadcrumbItem
} from './breadcrumb.util';

export interface RoutesOptions {
  baseUrl: string;
  baseTitle: string;
  titleSeparator: string;
}

export const createTagsOverviewRouteMeta = (
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
): RouteMeta => {
  const tagsOverviewRouteItem = createTagsOverviewRouteItem();
  const path = buildURLPath(RoutePathPrefix.TAGS);
  const title = buildTitle(tagsOverviewRouteItem.label, options.baseTitle, options.titleSeparator);
  const url = buildFullURL(options.baseUrl, path);

  return {
    key: path,
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(options.baseUrl, options.baseTitle, RoutePathPrefix.HOME),
      createTagsOverviewBreadcrumbItem(options.baseUrl, title, path)
    ]),
    type: Layout.TABLE,
    meta: undefined,
    data: undefined
  };
};
export const createCategoriesOverviewRouteMeta = (
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
): RouteMeta => {
  const categoriesOverviewRouteItem = createCategoriesOverviewRouteItem();
  const path = buildURLPath(RoutePathPrefix.CATEGORIES);
  const title = buildTitle(categoriesOverviewRouteItem.label, options.baseTitle, options.titleSeparator);
  const url = buildFullURL(options.baseUrl, path);

  return {
    key: path,
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(options.baseUrl, options.baseTitle, RoutePathPrefix.HOME),
      createCategoriesOverviewBreadcrumbItem(options.baseUrl, title, path)
    ]),
    type: Layout.TABLE,
    meta: undefined,
    data: undefined
  };
};
export const createPostsOverviewRouteMeta = (
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
): RouteMeta => {
  const postsOverviewRouteItem = createPostsOverviewRouteItem();
  const path = buildURLPath(RoutePathPrefix.POSTS);
  const title = buildTitle(postsOverviewRouteItem.label, options.baseTitle, options.titleSeparator);
  const url = buildFullURL(options.baseUrl, path);

  return {
    key: path,
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(options.baseUrl, options.baseTitle, RoutePathPrefix.HOME),
      createPostsOverviewBreadcrumbItem(options.baseUrl, title, path)
    ]),
    type: Layout.LIST,
    meta: undefined,
    data: undefined
  };
};

export const createHomeRouteMeta = (options?: Partial<RoutesOptions>): RouteMeta => {
  const path = buildURLPath();
  const title = options.baseTitle;
  const url = buildFullURL(options.baseUrl, path);

  return {
    key: path,
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
export const createTagDetailRouteMeta = (
  rawTag: string,
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
): RouteMeta => {
  const tagsRootRouteInfo = createTagsOverviewRouteMeta(contexts, options);

  const tagInfo = createTagDetailRouteItem(rawTag);
  const path = buildURLPath(RoutePathPrefix.TAGS, tagInfo.id);
  const title = buildTitle(tagInfo.label, options.baseTitle, options.titleSeparator);
  const url = buildFullURL(options.baseUrl, path);

  return {
    key: path,
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(options.baseUrl, options.baseTitle, RoutePathPrefix.HOME),
      createTagsOverviewBreadcrumbItem(options.baseUrl, tagsRootRouteInfo.title, tagsRootRouteInfo.path),
      createTagDetailBreadcrumbItem(options.baseUrl, title, path)
    ]),
    type: Layout.LIST,
    data: undefined
  };
};

export const createCategoryDetailRouteMeta = (
  rawCategory: string,
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
): RouteMeta => {
  const categoriesRootRouteInfo = createCategoriesOverviewRouteMeta(contexts, options);

  const categoryInfo = createCategoryDetailRouteItem(rawCategory);
  const path = buildURLPath(RoutePathPrefix.CATEGORIES, categoryInfo.id);
  const title = buildTitle(categoryInfo.label, options.baseTitle, options.titleSeparator);
  const url = buildFullURL(options.baseUrl, path);

  return {
    key: path,
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(options.baseUrl, options.baseTitle, RoutePathPrefix.HOME),
      createCategoriesOverviewBreadcrumbItem(
        options.baseUrl,
        categoriesRootRouteInfo.title,
        categoriesRootRouteInfo.path
      ),
      createCategoryDetailBreadcrumbItem(options.baseUrl, title, path)
    ]),
    type: Layout.LIST,
    data: undefined
  };
};

export const createPostDetailRouteMeta = (
  article: ArticleContext,
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
): RouteMeta => {
  const postsRootRouteInfo = createPostsOverviewRouteMeta(contexts, options);
  const created = new Date(article.created);

  const year = format(created, 'yyyy');
  const month = format(created, 'MM');
  const date = format(created, 'dd');
  const id = article.id;

  const path = buildURLPath(RoutePathPrefix.POSTS, year, month, date, id);
  const title = buildTitle(article.title, options.baseTitle, options.titleSeparator);
  const url = buildFullURL(options.baseUrl, path);

  return {
    key: path,
    url: url,
    path: path,
    title: title,
    breadcrumbs: createBreadcrumbList([
      createHomeBreadcrumbItem(options.baseUrl, options.baseTitle, RoutePathPrefix.HOME),
      createPostsOverviewBreadcrumbItem(options.baseUrl, postsRootRouteInfo.title, postsRootRouteInfo.path),
      createPostDetailBreadcrumbItem(options.baseUrl, title, path)
    ]),
    type: Layout.DETAIL,
    meta: undefined,
    data: undefined
  };
};
