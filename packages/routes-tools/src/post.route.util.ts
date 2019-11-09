import * as _ from 'lodash';
import { Meta, MetaName, MetaValue, RoutePathPrefix } from '@blog/common/interfaces/routes';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { format } from 'date-fns';
import { buildURLPath } from '@blog/common/utils/path.util';

export const buildPathFromContext = (context: ArticleContext) => {
  // build link
  const created = new Date(context.created);
  const year = format(created, 'yyyy');
  const month = format(created, 'MM');
  const date = format(created, 'dd');
  const id = context.id;
  return buildURLPath(RoutePathPrefix.POSTS, year, month, date, id);
};

export const createPostsOverviewRouteItem = () => ({
  id: RoutePathPrefix.POSTS,
  label: 'Posts' // TODO: add i18n support
});

export const createPostDetailRouteItem = (context) => ({
  id: context.id,
  label: context.title
});

export const createPostsOverviewDescMeta = (): Meta => ({
  name: MetaName.DESCRIPTION,
  content: `Posts`
});

export const createPostDetailDescMeta = (context: ArticleContext): Meta => ({
  name: MetaName.DESCRIPTION,
  content: context.summary
});

export const createPostDetailOpenGraphMetas = (context: ArticleContext): Meta[] => [
  {
    name: MetaName.OPEN_GRAPH_TITLE,
    content: context.title
  },
  {
    name: MetaName.OPEN_GRAPH_DESCRIPTION,
    content: context.summary
  },
  {
    name: MetaName.OPEN_GRAPH_IMAGE,
    content: context.cover
  },
  {
    name: MetaName.OPEN_GRAPH_TYPE,
    content: MetaValue.ARTICLE
  }
];

export const createPostsOverviewMetas = (): Meta[] => [createPostsOverviewDescMeta()];
export const createPostDetailMetas = (context: ArticleContext): Meta[] =>
  _.concat(createPostDetailOpenGraphMetas(context), [createPostDetailDescMeta(context)]);
