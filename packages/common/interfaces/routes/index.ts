import { Layout } from './layout';

export enum RoutePathPrefix {
  HOME = '',
  TAGS = 'tags',
  CATEGORIES = 'categories',
  POSTS = 'posts',
  PAGES = 'pages'
}

export interface RouteMeta {
  /** same as layout */
  type: string | Layout;

  /** the sub path: like `/categories`, `/tags */
  path: string;

  /** tie bundle title */
  title: string;

  /* breadcrumbs data*/
  breadcrumbs;

  /** content data, suppose to be api response */
  data?;
}
