import * as MarkdownIt from 'markdown-it';
import TOCPlugin from '../lib/toc';

import * as sample from './__fixtures__/sample-toc.md';

describe('@utils/markdown-it-toc', (): void => {
  it('# should got toc data at env', (): void => {
    const md = MarkdownIt().use(TOCPlugin);

    const context = {};

    md.parse(sample, context);
    expect(context).toHaveProperty('toc');
  });


  it('# should have no toc when no context', (): void => {
    const md = MarkdownIt().use(TOCPlugin);
    md.parse(sample);
  });

  it('# should detect level 2 contents', (): void => {
    const md = MarkdownIt().use(TOCPlugin);

    const context = {};

    md.parse(sample, context);

    const toc = context['toc'];

    expect(toc[0]).toHaveProperty('children');
    expect(toc[0].children).toHaveLength(4);
  });
});
