import { read } from '@/__tests__/helper';

import { metadata, source } from '@/metadata';

describe('markdown: preprocess', () => {
  it('# should read file content in pre-process steps', () => {
    const raw = read(`sample-article.md`);
    const meta = metadata(raw);
    const src = source(raw);

    expect(meta).not.toBeUndefined();
    expect(meta).toHaveProperty('title');
    expect(meta).toHaveProperty('created');
    expect(src).not.toBeUndefined();

    expect(meta).toMatchSnapshot();
    expect(src).toMatchSnapshot();
  });
});
