import { Article } from 'schema-dts';
import * as _ from 'lodash';

function generateArticleJsonLd(config: Config.Site, post: BlogModel.Post): Article {
  return {
    '@type': 'Article',

    // Article Base
    articleBody: post.summary,
    articleSection: _.map(post.toc, (item) => item.label),
    wordCount: post.md.length,

    // Creative Work Base
    author: {
      '@type': 'Person',
      image: config.avatar,
      name: config.author,
      url: config.host,
      identifier: config.author,
      description: config.description,
      mainEntityOfPage: config.description
    },
    keywords: post.metadata.tags,
    thumbnailUrl: post.metadata.cover,
    version: post.metadata.updated,
    text: post.summary
  };
}

export default {
  generateArticleJsonLd
};
