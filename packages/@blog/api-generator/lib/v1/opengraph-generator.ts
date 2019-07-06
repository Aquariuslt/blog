import { format } from 'date-fns';

const PROTOCOL_PREFIX = 'https://';
const POSTS_URL_PREFIX = '/posts';

const DEFAULT_OG_TYPE = 'article';

const buildPostPermalink = (created: string, filename: string): string =>
  POSTS_URL_PREFIX + '/' + format(new Date(created), 'YYYY/MM/DD') + '/' + filename;

const MetaKeyType: OpenGraph.MetaKey = {
  title: 'og:title',
  type: 'og:type',
  cover: 'og:image',
  permalink: 'og:url',
  description: 'og:description',


  // article related
  author: 'article:author',
  category: 'article:section',
  tags: 'article:tag',
  created: 'article:published_time',
  updated: 'article:modified_time',

  // website
  website: 'website'
};

function generatePostOGMeta(config: Config.Site, post: BlogModel.Post): OpenGraph.Meta {

  const website = PROTOCOL_PREFIX + config.host;

  return {
    [MetaKeyType.title]: post.metadata.title,
    [MetaKeyType.type]: DEFAULT_OG_TYPE,
    [MetaKeyType.cover]: post.metadata.cover,
    [MetaKeyType.permalink]: website + buildPostPermalink(post.metadata.created, post.filename),
    [MetaKeyType.description]: post.summary,
    [MetaKeyType.author]: config.author,
    [MetaKeyType.category]: post.metadata.category,
    [MetaKeyType.tags]: post.metadata.tags ? post.metadata.tags.join(',') : '',
    [MetaKeyType.created]: post.metadata.created,
    [MetaKeyType.updated]: post.metadata.updated,
    [MetaKeyType.website]: website
  };
}


export default {
  generatePostOGMeta
};
