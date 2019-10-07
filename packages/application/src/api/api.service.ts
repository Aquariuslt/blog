import * as _ from 'lodash';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RoutesService } from '@/routes/routes.service';
import {
  createCategoriesApInfo,
  createCategoriesDetailApiInfo,
  createTagsApiInfo,
  createTagsDetailApiInfo,
  createPostsApiInfo,
  createPostsDetailInfo,
  persistApi
} from '@blog/api-generator';
import { mergeByKey } from '@blog/common/utils/collection.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';

@Injectable()
export class ApiService implements OnModuleInit {
  private readonly logger = new Logger(ApiService.name);

  private tagsApiResponse;
  private tagsDetailApiResponse;

  private categoriesApiResponse;
  private categoriesDetailApiResponse;

  private postsApiResponse;
  private postsDetailMapApiResponse;

  private homeApiResponse;

  constructor(
    private readonly config: ConfigService,
    private readonly article: ArticleService,
    private readonly routes: RoutesService
  ) {}

  onModuleInit() {
    this.routes.onModuleInit();
    this.buildApi();
  }

  buildApi() {
    this.buildTagsApi();
    this.buildCategoriesApi();
    this.buildPostsApi();
    this.buildHomeApi();
  }

  buildHomeApi() {
    this.homeApiResponse = {
      ...this.routes.home,
      data: createPostsApiInfo(this.article.contexts)
    };
    this.logger.log(`Persisting posts api for path: ${this.homeApiResponse.path}`);
    persistApi(RoutePathPrefix.HOME_ALIAS, this.homeApiResponse, this.config.dirs.api);
  }

  buildPostsApi() {
    this.postsApiResponse = {
      ...this.routes.postsOverview,
      data: createPostsApiInfo(this.article.contexts)
    };

    this.logger.log(`Persisting posts api for path: ${this.postsApiResponse.path}`);
    persistApi(this.postsApiResponse.path, this.postsApiResponse, this.config.dirs.api);

    const postsDetailApiInfo = createPostsDetailInfo(this.article.contexts);
    const postsDetailsApiResponse = mergeByKey(this.routes.postDetails, postsDetailApiInfo, 'key');

    _.each(postsDetailsApiResponse, (postDetailApiResponse) => {
      this.logger.log(`Persisting posts api for path: ${postDetailApiResponse.path}`);
      persistApi(postDetailApiResponse.path, postDetailApiResponse, this.config.dirs.api);
    });

    this.postsDetailMapApiResponse = postsDetailsApiResponse;
  }

  buildCategoriesApi() {
    this.categoriesApiResponse = {
      ...this.routes.categoriesOverview,
      data: createCategoriesApInfo(this.article.contexts)
    };
    this.logger.log(`Persisting categories api for path: ${this.categoriesApiResponse.path}`);
    persistApi(this.categoriesApiResponse.path, this.categoriesApiResponse, this.config.dirs.api);

    // key is rawCategory
    const categoriesDetailApiInfo = createCategoriesDetailApiInfo(this.article.contexts);
    const categoriesDetailsApiResponse = mergeByKey(this.routes.categoryDetails, categoriesDetailApiInfo, 'key');

    _.each(categoriesDetailsApiResponse, (categoryDetailApiResponse) => {
      this.logger.log(`Persisting categories api for path: ${categoryDetailApiResponse.path}`);
      persistApi(categoryDetailApiResponse.path, categoryDetailApiResponse, this.config.dirs.api);
    });
    this.categoriesDetailApiResponse = categoriesDetailsApiResponse;
  }

  buildTagsApi() {
    this.tagsApiResponse = {
      ...this.routes.tagsOverview,
      data: createTagsApiInfo(this.article.contexts)
    };
    this.logger.log(`Persisting tags api for path: ${this.tagsApiResponse.path}`);
    persistApi(this.tagsApiResponse.path, this.tagsApiResponse, this.config.dirs.api);

    // key is rawTag
    const tagsDetailApiInfo = createTagsDetailApiInfo(this.article.contexts);
    const tagsDetailApiResponse = mergeByKey(this.routes.tagDetails, tagsDetailApiInfo, 'key');

    _.each(tagsDetailApiResponse, (tagDetailApiResponse) => {
      this.logger.log(`Persisting tags api for path: ${tagDetailApiResponse.path}`);
      persistApi(tagDetailApiResponse.path, tagsDetailApiResponse, this.config.dirs.api);
    });

    this.tagsDetailApiResponse = tagsDetailApiResponse;
  }
}
