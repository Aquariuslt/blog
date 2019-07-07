import * as _ from 'lodash';

import generator from '../../lib/v1/opengraph-generator';

import * as posts from './__fixtures__/json/posts-sample.json';


describe('@blog/api-generator: opengraph-generator', () => {
  it('# should generate opengraph begin with `og:` in post content', () => {
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

    expect(_.head(posts)).not.toHaveProperty('opengraph');


    _.each(posts, (post) => {
      post['opengraph'] = generator.generatePostOGMeta(mockConfig, post);
    });

    expect(_.head(posts)).toHaveProperty('opengraph');

    const updatedPost = posts[0];
    const ogMeta = updatedPost['opengraph'];

    expect(_.get(ogMeta, 'og:title')).not.toBeUndefined();
    expect(_.get(ogMeta, 'og:type')).not.toBeUndefined();
    expect(_.get(ogMeta, 'og:description')).not.toBeUndefined();
    expect(_.get(ogMeta, 'og:url')).not.toBeUndefined();
    expect(_.get(ogMeta, 'og:image')).not.toBeUndefined();

  });

  it('# should `tag` content empty if post dont have any tags', () => {
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

    const examplePost = posts[0];
    const ogMeta = generator.generatePostOGMeta(mockConfig, examplePost);
    expect(ogMeta).toHaveProperty('article:tag');
    expect(ogMeta['article:tag'].length).toBeGreaterThan(0);

    const postWoTags = _.cloneDeep(examplePost);
    delete postWoTags.metadata.tags;
    const osMetaWithEmptyTag = generator.generatePostOGMeta(mockConfig, postWoTags);
    expect(osMetaWithEmptyTag).toHaveProperty('article:tag');
    expect(osMetaWithEmptyTag['article:tag']).toEqual('');

  });
});
