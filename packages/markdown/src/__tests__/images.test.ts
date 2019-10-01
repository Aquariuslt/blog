import * as MarkdownIt from 'markdown-it';

import { ImagesDetectionPlugin } from '../images';
import { read } from '../__tests__/test.fixtures.helper';

describe('markdown-it plugins: images', (): void => {
  it('# should detect images at env', (): void => {
    const md = MarkdownIt().use(ImagesDetectionPlugin);
    const raw = read(`sample-article.md`);
    const context = {};
    md.parse(raw, context);

    expect(context).toHaveProperty('images');
    expect(context['images'].length).toBe(2);
    expect(context['images']).toMatchSnapshot();
  });

  it('# should detect no images when no env', (): void => {
    const md = MarkdownIt().use(ImagesDetectionPlugin);
    const raw = read(`sample-article.md`);
    md.parse(raw, undefined);
  });
});
