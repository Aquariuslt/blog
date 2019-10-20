import * as MarkdownIt from 'markdown-it';
import { SummaryPlugin } from '../summary.plugin';
import { source } from '../metadata';
import { read } from '../__tests__/test.fixtures.helper';

describe('markdown-it plugin: summary', () => {
  it('# should get summary with more than 120 chars without any options', () => {
    const md = MarkdownIt().use(SummaryPlugin);
    const raw = source(read(`sample-article.md`));
    const context = {};

    md.parse(raw, context);
    expect(context).toHaveProperty('summary');
    expect(context['summary'].length).toBeGreaterThanOrEqual(120);
    expect(context['summary']).toMatchSnapshot();
  });

  it('# should get summary with spec chars with options.len', () => {
    const options = {
      len: 50
    };
    const md = MarkdownIt().use(SummaryPlugin, options);
    const raw = source(read(`sample-article.md`));
    const context = {};

    md.parse(raw, context);
    expect(context).toHaveProperty('summary');
    expect(context['summary'].length).toBeGreaterThanOrEqual(options.len);
  });

  it('# should get no summary when no context', () => {
    const md = MarkdownIt().use(SummaryPlugin);
    const raw = source(read(`sample-article.md`));
    md.parse(raw, undefined);
  });
});
