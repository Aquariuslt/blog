import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as log from 'fancy-log';

import persistUtil from '../utils/persist-util';
import postsApi from './posts-api';
import seoApi from './seo-api';
import routesApi from './routes-api';
import jsonLdGenerator from './jsonld-generator';
import ogMetaGenerator from './opengraph-generator';

import articleProcessor, { scanner as articleScanner } from '@blog/article-processor';
import configParser from '@blog/config-processor';

import GalleryApi from '@utils/gallery-api';

async function handleFeatures(posts: BlogModel.Post[], features: Config.Features): Promise<void> {
  if (features.gallery) {
    const galleryApi = new GalleryApi({});

    const allTasks = posts.map(
      (post): Function => {
        return async function(): Promise<BlogModel.Post> {
          if (_.isUndefined(post.metadata.cover)) {
            post.metadata.cover = await galleryApi.getPhoto(post.filename);
            log.info('Generate cover image for post:', post.filename, post.metadata.cover);
          }
          return post;
        };
      }
    );

    await Promise.all(allTasks.map((func): BlogModel.Post => func()));
  }
}

function generateOGMeta(posts: BlogModel.Post[], config: Config.Site) {
  _.each(posts, (post) => {
    post.opengraph = ogMetaGenerator.generatePostOGMeta(config, post);
  });
}

function generateJsonLd(posts: BlogModel.Post[], config: Config.Site) {
  _.each(posts, (post) => {
    post.jsonld = jsonLdGenerator.generateArticleJsonLd(config, post);
  });
}

/**
 * @param configPath: extra injected config filepath
 * @param dataPath: the base folder to scan posts
 * @param outputPath: the base folder to generate all offline apis
 */
async function generate(configPath: string, dataPath: string, outputPath: string): Promise<void> {
  const config = configParser.read(configPath);
  const pagesFilePath = config.build.directory.pages;
  const mdFiles: string[] = articleScanner.scan(dataPath);
  const pageFiles: string[] = articleScanner.scan(pagesFilePath);
  const posts: BlogModel.Post[] = mdFiles.map(
    (postFile): BlogModel.Post => {
      const filename = path.basename(postFile, '.md');
      const mdContent = fs.readFileSync(postFile).toString();
      return articleProcessor.parse(filename, mdContent);
    }
  );

  const pages = pageFiles.map((pageFile) => {
    const filename = path.basename(pageFile, '.md');
    const mdContent = fs.readFileSync(pageFile).toString();
    return articleProcessor.parse(filename, mdContent);
  });

  await handleFeatures(posts, config.features);
  generateOGMeta(posts, config.site);
  generateOGMeta(pages, config.site);
  generateJsonLd(posts, config.site);
  generateJsonLd(pages, config.site);

  const postsApiMap = _.merge(
    {},
    postsApi.generateTagsOverview(posts),
    postsApi.generatePostsQuery(posts),
    postsApi.generatePostsOverview(posts),
    postsApi.generateTagsQuery(posts),
    postsApi.generateCategoriesOverview(posts),
    postsApi.generateCategoriesQuery(posts),
    postsApi.generatePagesOverview(pages),
    postsApi.generatePagesQuery(pages)
  );

  persistUtil.persist(outputPath, postsApiMap);

  const seoApiMap = _.merge(
    {},
    await seoApi.generateRobotsTxt(config.site),
    seoApi.generateFeedsApi(config.site, posts),
    seoApi.generateSiteMapApi(config.site, posts)
  );

  persistUtil.persist(outputPath, seoApiMap, '');

  const pageRoutes = routesApi.generatePageRoutes(postsApiMap);
  persistUtil.persist(outputPath, pageRoutes);
}

export default {
  generate
};
