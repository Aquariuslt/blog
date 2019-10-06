import * as _ from 'lodash';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RoutingService } from '@/routing/routing.service';
import {
  createCategoriesApInfo,
  createCategoriesDetailApiInfo,
  createTagsApiInfo,
  createTagsDetailApiInfo,
  createPostsApiInfo,
  createPostsDetailInfo,
  persistApi
} from '@blog/api-generator';

@Injectable()
export class ApiService implements OnModuleInit {
  private readonly logger = new Logger(ApiService.name);

  private tagsApiResponse;
  private tagsDetailMapApiResponse;

  private categoriesApiResponse;
  private categoriesDetailMapApiResponse;

  private postsApiResponse;
  private postsDetailMapApiResponse;

  private homeApiResponse;

  constructor(
    private readonly config: ConfigService,
    private readonly article: ArticleService,
    private readonly routing: RoutingService
  ) {}

  onModuleInit() {
    this.routing.onModuleInit();
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
      ...this.routing.homeRoute,
      data: createPostsApiInfo(this.article.contexts)
    };
    this.logger.log(`Persisting posts api for path: ${this.homeApiResponse.path}`);
    persistApi(this.homeApiResponse.path, this.homeApiResponse, this.config.dirs.api);
  }

  buildPostsApi() {
    this.postsApiResponse = {
      ...this.routing.postListRoute,
      data: createPostsApiInfo(this.article.contexts)
    };

    this.logger.log(`Persisting posts api for path: ${this.postsApiResponse.path}`);
    persistApi(this.postsApiResponse.path, this.postsApiResponse, this.config.dirs.api);

    const postsDetailApiInfo = createPostsDetailInfo(this.article.contexts);
    const postsDetailMapApiResponse = Object.create({});
    _.each(this.routing.postDetailRouteList, (postDetailRouteInfo) => {
      postsDetailMapApiResponse[postDetailRouteInfo.path] = {
        ...postDetailRouteInfo,
        data: postsDetailApiInfo[postDetailRouteInfo.path]
      };

      this.logger.log(`Persisting posts api for path: ${postDetailRouteInfo.path}`);
      persistApi(postDetailRouteInfo.path, postsDetailMapApiResponse[postDetailRouteInfo.path], this.config.dirs.api);
    });

    this.postsDetailMapApiResponse = postsDetailMapApiResponse;
  }

  buildCategoriesApi() {
    this.categoriesApiResponse = {
      ...this.routing.categoryListRoute,
      data: createCategoriesApInfo(this.article.contexts)
    };
    this.logger.log(`Persisting categories api for path: ${this.categoriesApiResponse.path}`);
    persistApi(this.categoriesApiResponse.path, this.categoriesApiResponse, this.config.dirs.api);

    // key is rawCategory
    const categoriesDetailApiInfo = createCategoriesDetailApiInfo(this.article.contexts);
    const categoriesDetailMapApiResponse = Object.create({});

    _.each(this.routing.categoryDetailRouteList, (categoryDetailRouteInfo) => {
      categoriesDetailMapApiResponse[categoryDetailRouteInfo.path] = {
        ...categoryDetailRouteInfo,
        data: categoriesDetailApiInfo[categoryDetailRouteInfo.path]
      };

      this.logger.log(`Persisting categories api for path: ${categoryDetailRouteInfo.path}`);
      persistApi(
        categoryDetailRouteInfo.path,
        categoriesDetailMapApiResponse[categoryDetailRouteInfo.path],
        this.config.dirs.api
      );
    });

    this.categoriesDetailMapApiResponse = categoriesDetailMapApiResponse;
  }

  buildTagsApi() {
    this.tagsApiResponse = {
      ...this.routing.tagListRoute,
      data: createTagsApiInfo(this.article.contexts)
    };
    this.logger.log(`Persisting tags api for path: ${this.tagsApiResponse.path}`);
    persistApi(this.tagsApiResponse.path, this.tagsApiResponse, this.config.dirs.api);

    // key is rawTag
    const tagsDetailApiInfo = createTagsDetailApiInfo(this.article.contexts);
    const tagsDetailMapApiResponse = Object.create({});

    _.each(this.routing.tagDetailRouteList, (tagDetailRouteInfo) => {
      tagsDetailMapApiResponse[tagDetailRouteInfo.path] = {
        ...tagDetailRouteInfo,
        data: tagsDetailApiInfo[tagDetailRouteInfo.path]
      };

      this.logger.log(`Persisting tags api for path: ${tagDetailRouteInfo.path}`);
      persistApi(tagDetailRouteInfo.path, tagsDetailMapApiResponse[tagDetailRouteInfo.path], this.config.dirs.api);
    });

    this.tagsDetailMapApiResponse = tagsDetailMapApiResponse;
  }
}
