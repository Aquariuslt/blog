import { compile } from 'path-to-regexp';
import { RoutesPathRegex } from '@blog/common/interfaces/routes';

describe('match.util', () => {
  it('# should build post detail path without any extra unused properties', () => {
    const toPath = compile(RoutesPathRegex.POST_DETAIL);

    const detailPath = toPath({
      year: '2019',
      month: '12',
      date: '09',
      id: 'awesome-post'
    });

    const expectedPath = '/posts/2019/12/09/awesome-post';
    expect(detailPath).toEqual(expectedPath);
  });

  it('# should build post detail path with extra unused properties', () => {
    const toPath = compile(RoutesPathRegex.POST_DETAIL);

    const detailPath = toPath({
      year: '2019',
      month: '12',
      date: '09',
      id: 'awesome-post',
      tag: 'useless-tag-args'
    });

    const expectedPath = '/posts/2019/12/09/awesome-post';
    expect(detailPath).toEqual(expectedPath);
  });
});
