import * as _ from 'lodash';

import generator from '../../lib/v1/jsonld-generator';

import * as posts from './__fixtures__/json/posts-sample.json';

describe('@blog/api-generator: jsonld', () => {
  it('# should generate json-ld in post level', () => {
    const mockConfig: Config.Site = {
      title: 'site title',
      subtitle: 'site subtitle',
      author: 'some author',
      avatar: 'https://your-gavator.com/your-id',
      copyright: '',
      description: 'some description',
      host: 'example.com',
      language: 'zh'
    };

    expect(_.head(posts)).not.toHaveProperty('jsonld');

    _.each(posts, (post) => {
      post['jsonld'] = generator.generateArticleJsonLd(mockConfig, post);
    });

    expect(_.head(posts)).toHaveProperty('jsonld');

    const updatedPost = posts[0];
    const jsonLdMeta = updatedPost['jsonld'];

    expect(_.get(jsonLdMeta, '@type')).toEqual('Article');
  });
});
