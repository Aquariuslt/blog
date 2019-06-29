declare module '*.md' {
  const value: string;
  export = value;
}

declare namespace BlogApiModel {
  interface ApiQuery {
    [path: string]: string | object | object[];
  }

  interface Overview {
    name: string;
    total: number;
    link: string;
  }

  /**
   * @example
   * - /api/v1/posts
   * - /api/v1/posts/:year
   * - /api/v1/posts/:year/:month
   */
  export type PostsOverview = BlogModel.Post[];

  export interface PostsOverviewQuery extends ApiQuery {
    [path: string]: PostsOverview;
  }

  /**
   * @example
   * - /api/v1/posts/:year/month/:date/:filename
   */
  export interface PostsPermalinkQuery extends ApiQuery {
    [path: string]: BlogModel.Post;
  }

  /**
   * @example
   * - /api/v1/categories
   */
  export type CategoriesOverview = BlogApiModel.Overview[];

  export interface CategoriesOverviewQuery extends ApiQuery {
    [path: string]: CategoriesOverview;
  }

  /**
   * @example
   * - /api/v1/categories/:category
   */
  export interface CategoriesQuery extends ApiQuery {
    [path: string]: BlogModel.Post[];
  }

  /**
   * @example
   * - /api/v1/tags
   */
  export type TagsOverview = BlogApiModel.Overview[];

  export interface TagsOverviewQuery extends ApiQuery {
    [path: string]: TagsOverview;
  }

  /**
   * @example
   * - /api/v1/tags/:tag
   */
  export interface TagsQuery extends ApiQuery {
    [path: string]: BlogModel.Post[];
  }
}
declare namespace Config {
  export interface Site {
    host: string;
    title: string;
    subtitle?: string;
    author?: string;
    avatar?: string;
    description?: string;
    language?: string | 'en' | 'zh';
    copyright: string;

    author?: string;
    bio?: string;
  }

  /**
   * 3rd party config
   */
  export interface Features {
    ga?: string;
    disqus?: string;
    gallery?: boolean;
  }

  export interface Build {
    directory: {
      posts: string;
      public: string;
    };

    favicon?: string;
    theme: string;
    colors: object;
  }

  export interface Bundle {
    site: Config.Site;
    build: Config.Build;
    features: Config.Features;
  }
}

/**
 * definition of origin data types from markdown-it & markdown-it plugins
 */
declare namespace BlogModel {
  export interface PostFile {
    filename: string;
    md: string;
  }

  export interface Post extends PostFile {
    filename: string;
    md: string;
    html: string;
    permalink?: string;
    metadata: Metadata;
    toc?: ContentItem[];
    images?: string[];
    summary?: string;
  }

  export interface Metadata {
    title: string;
    created: string;
    updated: string;
    category: string;
    tags?: string[];
    cover?: string;
  }

  export interface ContentItem {
    id: string;
    label: string;
    position?: number;
    level: number;
    pid?: number;
    children: ContentItem[];
  }
}
