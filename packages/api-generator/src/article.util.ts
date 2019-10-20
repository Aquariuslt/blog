import * as _ from 'lodash';
import * as path from 'path';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { buildPathFromContext } from '@blog/routes-tools';

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
