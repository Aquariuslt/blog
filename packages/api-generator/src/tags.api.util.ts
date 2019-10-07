import * as _ from 'lodash';
import * as uslug from 'uslug';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { groupByArticleTags } from '@blog/article-tools';
import { createArticleOverview } from './article.util';

export const createTagApiInfo = (rawTag: string, total: number) => ({
  id: uslug(rawTag),
  label: rawTag,
  total: total,
  link: buildURLPath(RoutePathPrefix.TAGS, uslug(rawTag))
});

export const createTagsApiInfo = (contexts: ArticleContext[]) => {
  const tagsMap = groupByArticleTags(contexts);
  return _.map(_.keys(tagsMap), (tag) => createTagApiInfo(tag, tagsMap[tag].length));
};

export const buildTagsApiData = (contexts: Partial<ArticleContext>[]) => {
  const tagsMap = Object.create({});

  _.each(contexts, (context) => {
    _.each(context.tags, (rawTag) => {
      const tagPath = buildURLPath(RoutePathPrefix.TAGS, uslug(rawTag));
      if (tagsMap.hasOwnProperty(tagPath)) {
        tagsMap[tagPath].push(context);
      } else {
        tagsMap[tagPath] = [context];
      }
    });
  });

  console.log(``);

  return _.map(_.keys(tagsMap), (key) => {
    return {
      key: key,
      data: tagsMap[key]
    };
  });
};

/**  @description simply `/tags/:tag` api response, including article overviews */
export const createTagsDetailApiInfo = (contexts: ArticleContext[]) =>
  buildTagsApiData(_.map(contexts, createArticleOverview));
