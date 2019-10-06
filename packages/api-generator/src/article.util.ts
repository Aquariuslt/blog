import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import * as _ from 'lodash';
import { format } from 'date-fns';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';

/**
 * @description create an overview in optimized size, simply remove `src`, `html`, `toc` field in context
 * */
export const createArticleOverview = (context: ArticleContext): Partial<ArticleContext> => {
  const overview = _.cloneDeep(context);
  delete overview.html;
  delete overview.src;
  delete overview.toc;

  const created = new Date(context.created);

  const year = format(created, 'yyyy');
  const month = format(created, 'MM');
  const date = format(created, 'dd');
  const id = context.id;
  overview.link = buildURLPath(RoutePathPrefix.POSTS, year, month, date, id);
  return overview;
};
