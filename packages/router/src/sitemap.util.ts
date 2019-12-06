import * as _ from 'lodash';
import * as path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import {
  buildPostPathFromContext,
  buildPagePathFromContext,
  createCategoriesOverviewRouteMeta,
  createCategoryDetailRouteMeta,
  createHomeRouteMeta,
  createPagesDetailRouteMeta,
  createPostDetailRouteMeta,
  createPostsOverviewRouteMeta,
  createTagDetailRouteMeta,
  createTagsOverviewRouteMeta,
  RoutesOptions
} from './index';
import { getAllCategoriesFromContexts, getAllTagsFromContexts } from '@blog/article';

const CHANGE_FREQ = 'daily';
const DETAIL_PRIORITY = 1;
const LIST_PRIORITY = 0.5;
const KEYWORDS_SEPARATOR = ',';

export const createHomeSitemapItem = (options?: Partial<RoutesOptions>) => {
  const routeMeta = createHomeRouteMeta(options);
  return {
    url: routeMeta.url,
    changefreq: CHANGE_FREQ,
    priority: LIST_PRIORITY,
    lastmod: new Date().toISOString()
  };
};

export const createTagsOverviewSitemapItem = (contexts: ArticleContext[], options?: Partial<RoutesOptions>) => {
  const routeMeta = createTagsOverviewRouteMeta(contexts, options);
  return {
    url: routeMeta.url,
    changefreq: CHANGE_FREQ,
    priority: LIST_PRIORITY,
    lastmod: new Date().toISOString()
  };
};

export const createCategoriesOverviewSitemapItem = (contexts: ArticleContext[], options?: Partial<RoutesOptions>) => {
  const routeMeta = createCategoriesOverviewRouteMeta(contexts, options);
  return {
    url: routeMeta.url,
    changefreq: CHANGE_FREQ,
    priority: LIST_PRIORITY,
    lastmod: new Date().toISOString()
  };
};

export const createPostsOverviewSitemapItem = (contexts: ArticleContext[], options?: Partial<RoutesOptions>) => {
  const routeMeta = createPostsOverviewRouteMeta(contexts, options);

  return {
    url: routeMeta.url,
    changefreq: CHANGE_FREQ,
    priority: LIST_PRIORITY,
    lastmod: new Date().toISOString()
  };
};

export const createTagDetailSitemapItem = (
  rawTag: string,
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
) => {
  const routeMeta = createTagDetailRouteMeta(rawTag, contexts, options);

  return {
    url: routeMeta.url,
    changefreq: CHANGE_FREQ,
    priority: LIST_PRIORITY,
    lastmod: new Date().toISOString()
  };
};

export const createCategoryDetailSitemapItem = (
  rawCategory: string,
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
) => {
  const routeMeta = createCategoryDetailRouteMeta(rawCategory, contexts, options);

  return {
    url: routeMeta.url,
    changefreq: CHANGE_FREQ,
    priority: LIST_PRIORITY,
    lastmod: new Date().toISOString()
  };
};
export const createPostDetailSitemapItem = (
  article: ArticleContext,
  contexts: ArticleContext[],
  options?: Partial<RoutesOptions>
) => {
  const routeMeta = createPostDetailRouteMeta(article, contexts, options);

  return {
    url: routeMeta.url,
    changefreq: CHANGE_FREQ,
    priority: DETAIL_PRIORITY,
    lastmod: new Date(article.updated).toISOString(),
    keywords: article.tags.join(KEYWORDS_SEPARATOR),
    img: _.map(article.images, (image) => ({
      url: path.join(buildPostPathFromContext(article), image)
    }))
  };
};

export const createPageDetailSitemapItem = (article: ArticleContext, options?: Partial<RoutesOptions>) => {
  const routeMeta = createPagesDetailRouteMeta(article, options);

  return {
    url: routeMeta.url,
    changefreq: CHANGE_FREQ,
    priority: DETAIL_PRIORITY,
    lastmod: new Date(article.updated).toISOString(),
    keywords: article.tags.join(KEYWORDS_SEPARATOR),
    img: _.map(article.images, (image) => ({
      url: path.join(buildPagePathFromContext(article), image)
    }))
  };
};

export const createSitemapContent = async (
  postContexts: ArticleContext[],
  pageContexts: ArticleContext[],
  options?: Partial<RoutesOptions>
) => {
  const sitemap = new SitemapStream({ hostname: options.baseUrl });

  const homeSitemapItem = createHomeSitemapItem(options);
  const postsOverviewSitemapItem = createPostsOverviewSitemapItem(postContexts, options);
  const categoriesOverviewSitemapItem = createCategoriesOverviewSitemapItem(postContexts, options);
  const tagsOverviewSitemapItem = createTagsOverviewSitemapItem(postContexts, options);

  const allCategories = getAllCategoriesFromContexts(postContexts);
  const allTags = getAllTagsFromContexts(postContexts);

  const categoryDetailSitemapItems = _.map(allCategories, (category) =>
    createCategoryDetailSitemapItem(category, postContexts, options)
  );
  const tagDetailSitemapItems = _.map(allTags, (tag) => createTagDetailSitemapItem(tag, postContexts, options));
  const postDetailSitemapItems = _.map(postContexts, (article) =>
    createPostDetailSitemapItem(article, postContexts, options)
  );
  const pageDetailSitemapItems = _.map(pageContexts, (article) => createPageDetailSitemapItem(article, options));

  const allSitemapItems = _.concat(
    [homeSitemapItem],
    [postsOverviewSitemapItem],
    [categoriesOverviewSitemapItem],
    [tagsOverviewSitemapItem],
    categoryDetailSitemapItems,
    tagDetailSitemapItems,
    postDetailSitemapItems,
    pageDetailSitemapItems
  );

  _.each(allSitemapItems, (sitemapItem) => {
    sitemap.write(sitemapItem);
  });

  sitemap.end();

  return await streamToPromise(sitemap);
};
