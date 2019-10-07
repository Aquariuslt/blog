import { Layout } from './layout';

export enum RoutePathPrefix {
  HOME = '',
  HOME_ALIAS = 'home', // alias for empty path ``
  TAGS = 'tags',
  CATEGORIES = 'categories',
  POSTS = 'posts',
  PAGES = 'pages'
}

export interface RouteMeta {
  /** raw key */
  key: string;

  /** full url including protocol, domain, path */
  url: string;

  /** same as layout */
  type: string | Layout;

  /** the sub path: like `/categories`, `/tags */
  path: string;

  /** title with base title as suffix */
  title: string;

  /** key - value pair of meta */
  meta?;

  /* breadcrumbs data*/
  breadcrumbs;

  /** content data, suppose to be api response */
  data?;
}
