/**
 * @description create article data as api response
 * */
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { RawProfile } from '@blog/common/interfaces/profile';
import { Article } from '@blog/common/interfaces/articles';
import { RouteMeta } from '@blog/common/interfaces/routes';

export const createArticle = (context: ArticleContext, author: RawProfile, route: RouteMeta): Article => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    dateCreated: context.created,
    datePublished: context.created,
    dateModified: context.updated,
    description: context.summary,
    image: context.cover,
    keywords: context.tags,
    publisher: author.name,
    url: route.url
  };
};
