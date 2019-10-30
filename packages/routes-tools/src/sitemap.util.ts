import * as _ from 'lodash';
import * as path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import {
  buildPathFromContext,
  createCategoriesOverviewRouteMeta,
  createCategoryDetailRouteMeta,
  createHomeRouteMeta,
  createPostDetailRouteMeta,
  createPostsOverviewRouteMeta,
  createTagDetailRouteMeta,
  createTagsOverviewRouteMeta,
  RoutesOptions
} from './index';
import { getAllCategoriesFromContexts, getAllTagsFromContexts } from '@blog/article-tools';

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
      url: path.join(buildPathFromContext(article), image)
    }))
  };
};

export const createSitemapContent = async (contexts: ArticleContext[], options?: Partial<RoutesOptions>) => {
  const sitemap = new SitemapStream({ hostname: options.baseUrl });

  const homeSitemapItem = createHomeSitemapItem(options);
  const postsOverviewSitemapItem = createPostsOverviewSitemapItem(contexts, options);
  const categoriesOverviewSitemapItem = createCategoriesOverviewSitemapItem(contexts, options);
  const tagsOverviewSitemapItem = createTagsOverviewSitemapItem(contexts, options);

  const allCategories = getAllCategoriesFromContexts(contexts);
  const allTags = getAllTagsFromContexts(contexts);

  const categoryDetailSitemapItems = _.map(allCategories, (category) =>
    createCategoryDetailSitemapItem(category, contexts, options)
  );
  const tagDetailSitemapItems = _.map(allTags, (tag) => createTagDetailSitemapItem(tag, contexts, options));
  const postDetailSitemapItems = _.map(contexts, (article) => createPostDetailSitemapItem(article, contexts, options));

  const allSitemapItems = _.concat(
    [homeSitemapItem],
    [postsOverviewSitemapItem],
    [categoriesOverviewSitemapItem],
    [tagsOverviewSitemapItem],
    categoryDetailSitemapItems,
    tagDetailSitemapItems,
    postDetailSitemapItems
  );

  _.each(allSitemapItems, (sitemapItem) => {
    sitemap.write(sitemapItem);
  });

  sitemap.end();

  return await streamToPromise(sitemap);
};
