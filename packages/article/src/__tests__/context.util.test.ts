import * as path from 'path';
import { createArticleContext } from '../context.util';

describe('context.util', () => {
  const ARTICLE_PATH = path.join(__dirname, '__fixtures__', 'sample-article-a.md');

  it('# should create article context', () => {
    const context = createArticleContext(ARTICLE_PATH);

    expect(context).toHaveProperty('src');
    expect(context).toHaveProperty('html');
    expect(context).toMatchSnapshot();
  });
});
