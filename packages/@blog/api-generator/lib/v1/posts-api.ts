import { format } from 'date-fns';
import * as _ from 'lodash';

const API_PREFIX = '/api/v1';
const POSTS_API_PREFIX = '/posts';
const CATEGORIES_API_PREFIX = '/categories';
const TAGS_API_PREFIX = '/tags';
const PAGES_API_PREFIX = '/pages';

const buildPermalink = (created: string, filename: string): string =>
  format(new Date(created), '/YYYY/MM/DD') + '/' + filename;
const buildPageLink = (filename: string): string => PAGES_API_PREFIX + '/' + filename;
const buildCategoriesQueryLink = (category): string => CATEGORIES_API_PREFIX + '/' + category;
const buildTagsQueryLink = (tag): string => TAGS_API_PREFIX + '/' + tag;
const buildByYearLink = (created: string): string =>
  API_PREFIX + POSTS_API_PREFIX + '/' + format(new Date(_.clone(created)), 'YYYY');
const buildByMonthLink = (created: string): string =>
  API_PREFIX + POSTS_API_PREFIX + '/' + format(new Date(_.clone(created)), 'YYYY/MM');
const buildByDayLink = (created: string): string =>
  API_PREFIX + POSTS_API_PREFIX + '/' + format(new Date(_.clone(created)), 'YYYY/MM/DD');

const fillPagePermalink = (data: BlogModel.Post[]) => {
  _.each(data, (page): void => {
    page.permalink = buildPageLink(page.filename);
  });
};

const fillPermalink = (data: BlogModel.Post[]): void => {
  _.each(data, (post): void => {
    post.permalink = buildPermalink(post.metadata.created, post.filename);
  });
};

const sortByCreated = (data: BlogModel.Post[]): void => {
  data.sort((a, b): number => {
    return a.metadata.created < b.metadata.created ? 1 : -1;
  });
};

/**
 * @desc to reduce query response size, set `md` and `html` to empty string
 */
const reduceSizes = (data: BlogModel.Post[]): BlogModel.Post[] => {
  const mutableCopies = _.cloneDeep(data);

  _.each(mutableCopies, (post): void => {
    post.md = '';
    post.html = '';
  });

  return mutableCopies;
};

function generatePostsQuery(data: BlogModel.Post[]): BlogApiModel.PostsPermalinkQuery {
  fillPermalink(data);

  const postApiMap = {};
  _.each(data, (post): void => {
    const permalink = post.permalink;
    postApiMap[API_PREFIX + POSTS_API_PREFIX + permalink] = post;
  });

  return postApiMap;
}

function generatePostsOverview(data: BlogModel.Post[]): BlogApiModel.PostsOverviewQuery {
  fillPermalink(data);
  sortByCreated(data);

  const allPosts = reduceSizes(data);
  const byYearPostMap = _.groupBy(allPosts, (post): string => buildByYearLink(post.metadata.created));
  const byMonthPostMap = _.groupBy(allPosts, (post): string => buildByMonthLink(post.metadata.created));
  const byDayPostMap = _.groupBy(allPosts, (post): string => buildByDayLink(post.metadata.created));
  return _.merge({}, { [API_PREFIX + POSTS_API_PREFIX]: allPosts }, byYearPostMap, byMonthPostMap, byDayPostMap);
}

function generateCategoriesQuery(data: BlogModel.Post[]): BlogApiModel.CategoriesQuery {
  fillPermalink(data);
  sortByCreated(data);

  return _.groupBy(reduceSizes(data), (post): string => {
    return API_PREFIX + buildCategoriesQueryLink(post.metadata.category);
  });
}

function generateCategoriesOverview(data: BlogModel.Post[]): BlogApiModel.CategoriesOverviewQuery {
  const categoriesMap = _.groupBy(data, (post): string => {
    return post.metadata.category;
  });

  const categoriesOverview: BlogApiModel.Overview[] = [];
  _.each(_.keys(categoriesMap), (category): void => {
    categoriesOverview.push({
      name: category,
      total: categoriesMap[category].length,
      link: buildCategoriesQueryLink(category)
    });
  });

  return {
    [API_PREFIX + CATEGORIES_API_PREFIX]: categoriesOverview
  };
}

function generateTagsQuery(data: BlogModel.Post[]): BlogApiModel.TagsQuery {
  fillPermalink(data);
  sortByCreated(data);

  const tagsQuery = {};

  _.each(reduceSizes(data), (post): void => {
    if (post.metadata.tags) {
      _.each(post.metadata.tags, (tag): void => {
        const tagApiPrefix = API_PREFIX + buildTagsQueryLink(tag);
        if (!tagsQuery.hasOwnProperty(tagApiPrefix)) {
          tagsQuery[tagApiPrefix] = [];
        }
        tagsQuery[tagApiPrefix].push(post);
      });
    }
  });

  return tagsQuery;
}

function generateTagsOverview(data: BlogModel.Post[]): BlogApiModel.TagsOverviewQuery {
  const tagsMap = {};
  _.each(data, (post): void => {
    if (post.metadata.tags) {
      _.each(post.metadata.tags, (tag): void => {
        if (!tagsMap.hasOwnProperty(tag)) {
          tagsMap[tag] = {
            name: tag,
            total: 0,
            link: buildTagsQueryLink(tag)
          };
        }
        tagsMap[tag].total++;
      });
    }
  });

  return {
    [API_PREFIX + TAGS_API_PREFIX]: _.values(tagsMap)
  };
}

function generatePagesOverview(data: BlogModel.Post[]): BlogApiModel.PagesOverviewQuery {
  fillPagePermalink(data);
  const allPages = reduceSizes(data);

  return {
    [API_PREFIX + PAGES_API_PREFIX]: allPages
  };
}

function generatePagesQuery(data: BlogModel.Post[]): BlogApiModel.PagesQuery {
  fillPagePermalink(data);

  const pagesApiMap = {};

  _.each(data, (page) => {
    pagesApiMap[API_PREFIX + buildPageLink(page.filename)] = page;
  });
  return pagesApiMap;
}

export default {
  generatePostsQuery,
  generatePostsOverview,
  generateCategoriesOverview,
  generateCategoriesQuery,
  generateTagsOverview,
  generateTagsQuery,
  generatePagesOverview,
  generatePagesQuery
};
