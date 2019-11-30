import * as _ from 'lodash';
import * as uslug from 'uslug';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { groupByArticleTags } from '@blog/article';
import { createArticleOverview } from './article.util';

export const createTagDetailLinkItem = (rawTag: string, total?: number) => ({
  id: uslug(rawTag),
  label: rawTag,
  total: total,
  link: buildURLPath(RoutePathPrefix.TAGS, uslug(rawTag))
});

export const createTagsOverviewApiData = (contexts: ArticleContext[]) => {
  const tagsMap = groupByArticleTags(contexts);
  return _.map(_.keys(tagsMap), (tag) => createTagDetailLinkItem(tag, tagsMap[tag].length));
};

export const createTagDetailApiData = (rawTag: string, contexts: ArticleContext[]) => {
  return _.map(
    _.filter(contexts, (context) => _.includes(context.tags, rawTag)),
    createArticleOverview
  );
};
