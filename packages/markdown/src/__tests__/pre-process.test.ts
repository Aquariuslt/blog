import { read } from '@/__tests__/helper';
import * as matter from 'gray-matter';

describe('markdown: preprocess', () => {
  it('# should read file content in pre-process steps', () => {
    const raw = read(`sample-article.md`);
    const { data, content } = matter(raw);

    expect(data).not.toBeUndefined();
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('created');
    expect(content).not.toBeUndefined();

    expect(data).toMatchSnapshot();
    expect(content).toMatchSnapshot();
  });
});
