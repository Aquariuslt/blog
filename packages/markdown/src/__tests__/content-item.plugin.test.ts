import * as MarkdownIt from 'markdown-it';
import { ContentItemPlugin } from '../content-item.plugin';

import { read } from '../__tests__/test.fixtures.helper';

describe('markdown-it plugin: content items', (): void => {
  it('# should get toc data at env', (): void => {
    const md = MarkdownIt().use(ContentItemPlugin);
    const raw = read(`sample-article.md`);
    const context = {};

    md.parse(raw, context);
    expect(context).toHaveProperty('toc');
  });

  it('# should have no toc when no context', (): void => {
    const md = MarkdownIt().use(ContentItemPlugin);
    const raw = read(`sample-article.md`);
    md.parse(raw, undefined);
  });

  it('# should detect level 2 contents', (): void => {
    const md = MarkdownIt().use(ContentItemPlugin);
    const raw = read(`sample-article.md`);
    const context = {};

    md.parse(raw, context);

    const toc = context['toc'];

    expect(toc[0]).toHaveProperty('children');
    expect(toc[0].children).toHaveLength(3);
  });
});
