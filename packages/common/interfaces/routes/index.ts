import { Layout } from './layout';

export enum RoutePathPrefix {
  HOME = '',
  HOME_ALIAS = 'home', // alias for empty path ``
  TAGS = 'tags',
  CATEGORIES = 'categories',
  POSTS = 'posts',
  PAGES = 'pages',
  NAVIGATION = 'navigation',
  PROFILE = 'profile'
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
  metas?;

  /* breadcrumbs data*/
  breadcrumbs;

  /** content data, suppose to be api response */
  data?;
}

export const EmptyRouteMeta: RouteMeta = {
  breadcrumbs: [],
  key: '',
  path: '',
  title: '',
  type: '',
  url: ''
};

export interface Meta {
  name?: string;
  property?: string;
  content: string;
}

export enum MetaName {
  DESCRIPTION = 'description',
  AUTHOR = 'author',

  OPEN_GRAPH_TITLE = 'og:title',
  OPEN_GRAPH_DESCRIPTION = 'og:description',
  OPEN_GRAPH_IMAGE = 'og:image',
  OPEN_GRAPH_URL = 'og:url',
  OPEN_GRAPH_TYPE = 'og:type',
  OPEN_GRAPH_SITE_NAME = 'og:site_name'
}

export enum MetaValue {
  WEBSITE = 'website',
  ARTICLE = 'article'
}
