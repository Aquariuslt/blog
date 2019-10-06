import * as _ from 'lodash';
import * as path from 'path';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { format } from 'date-fns';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';

export const buildPathFromContext = (context: ArticleContext) => {
  // build link
  const created = new Date(context.created);
  const year = format(created, 'yyyy');
  const month = format(created, 'MM');
  const date = format(created, 'dd');
  const id = context.id;
  return buildURLPath(RoutePathPrefix.POSTS, year, month, date, id);
};

/**
 * @description create an overview in optimized size, simply remove `src`, `html`, `toc` field in context
 * */
export const createArticleOverview = (context: ArticleContext): Partial<ArticleContext> => {
  const overview = _.cloneDeep(context);
  delete overview.html;
  delete overview.src;
  delete overview.toc;
  delete overview.images;

  overview.link = buildPathFromContext(context);

  // build cover image link
  overview.cover = path.join(overview.link, overview.cover);

  return overview;
};
