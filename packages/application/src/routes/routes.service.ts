import * as _ from 'lodash';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RoutingExtraOption } from '@blog/routes-tools';
import {
  createCategoryDetailRouteInfo,
  createPostDetailRouteInfo,
  createPostListRouteInfo,
  createCategoryListRouteInfo,
  createTagListRouteInfo,
  createTagDetailRouteInfo,
  createHomeRouteInfo
} from '@blog/routes-tools';

import { getAllTagsFromContexts, getAllCategoriesFromContexts } from '@blog/article-tools';

@Injectable()
export class RoutesService implements OnModuleInit {
  private readonly logger = new Logger(RoutesService.name);
  private $inited = false;

  public routes = [];

  public homeRoute;

  public tagListRoute;
  public tagDetailRouteList = [];

  public categoryListRoute;
  public categoryDetailRouteList = [];

  public postListRoute;
  public postDetailRouteList = [];

  constructor(private config: ConfigService, private article: ArticleService) {}

  onModuleInit() {
    if (this.$inited) {
      return;
    }
    this.article.onModuleInit();
    this.createRoutes();
    this.$inited = true;
  }

  createRoutes() {
    const homeRoute = this.createHomeRoute();
    const tagRoutes = this.createTagsRoutes();
    const categoryRoutes = this.createCategoriesRoutes();
    const postRoutes = this.createPostsRoutes();

    const allRoutes = _.concat(homeRoute, tagRoutes, categoryRoutes, postRoutes);

    this.routes = allRoutes;

    _.each(allRoutes, (route) => {
      this.logger.debug(`Created Route Meta for path: ${route.path}`);
    });
  }

  createHomeRoute() {
    const homeRouteInfo = createHomeRouteInfo(this.routingExtraOption);
    this.homeRoute = homeRouteInfo;
    return [homeRouteInfo];
  }

  createTagsRoutes() {
    const tagListRouteInfo = createTagListRouteInfo(this.article.contexts, this.routingExtraOption);
    const tags = getAllTagsFromContexts(this.article.contexts);

    const tagDetailRouteInfoList = _.map(tags, (rawTag) => {
      return createTagDetailRouteInfo(rawTag, this.article.contexts, this.routingExtraOption);
    });

    this.tagListRoute = tagListRouteInfo;
    this.tagDetailRouteList = tagDetailRouteInfoList;

    return _.concat([tagListRouteInfo], tagDetailRouteInfoList);
  }
  createCategoriesRoutes() {
    const categoryListRouteInfo = createCategoryListRouteInfo(this.article.contexts, this.routingExtraOption);
    const categories = getAllCategoriesFromContexts(this.article.contexts);

    const categoryDetailRouteInfoList = _.map(categories, (rawCategory) => {
      return createCategoryDetailRouteInfo(rawCategory, this.article.contexts, this.routingExtraOption);
    });

    this.categoryListRoute = categoryListRouteInfo;
    this.categoryDetailRouteList = categoryDetailRouteInfoList;

    return _.concat([categoryListRouteInfo], categoryDetailRouteInfoList);
  }

  createPostsRoutes() {
    const postsRouteInfo = createPostListRouteInfo(this.article.contexts, this.routingExtraOption);
    const postDetailRouteInfoList = _.map(this.article.contexts, (context) => {
      return createPostDetailRouteInfo(context, this.article.contexts, this.routingExtraOption);
    });

    this.postListRoute = postsRouteInfo;
    this.postDetailRouteList = postDetailRouteInfoList;

    return _.concat([postsRouteInfo], postDetailRouteInfoList);
  }

  get routingExtraOption(): RoutingExtraOption {
    return {
      baseTitle: this.config.site.baseTitle,
      baseUrl: this.config.site.baseUrl,
      titleSeparator: this.config.pageOptions.titleSeparator
    };
  }
}
