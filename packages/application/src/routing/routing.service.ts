import * as _ from 'lodash';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import {
  createCategoryDetailRouteInfo,
  createPostDetailRouteInfo,
  createPostListRouteInfo,
  RoutingExtraOption
} from '@blog/routing-tools';
import {
  createCategoryListRouteInfo,
  createTagListRouteInfo,
  createTagDetailRouteInfo,
  createHomeRouteInfo
} from '@blog/routing-tools';

@Injectable()
export class RoutingService implements OnModuleInit {
  private readonly logger = new Logger(RoutingService.name);

  private routes;

  constructor(private config: ConfigService, private article: ArticleService) {}

  onModuleInit() {
    this.article.onModuleInit();
    this.createRoutes();
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
    return [createHomeRouteInfo(this.routingExtraOption)];
  }

  createTagsRoutes() {
    const tagListRouteInfo = createTagListRouteInfo(this.article.contexts, this.routingExtraOption);
    const tags = this.getAllTagsFromContexts(this.article.contexts);

    const tagDetailRouteInfoList = _.map(tags, (rawTag) => {
      return createTagDetailRouteInfo(rawTag, this.article.contexts, this.routingExtraOption);
    });

    return _.concat([tagListRouteInfo], tagDetailRouteInfoList);
  }
  createCategoriesRoutes() {
    const categoryListRouteInfo = createCategoryListRouteInfo(this.article.contexts, this.routingExtraOption);
    const categories = this.getAllCategoriesFromContexts(this.article.contexts);

    const categoryDetailRouteInfoList = _.map(categories, (rawCategory) => {
      return createCategoryDetailRouteInfo(rawCategory, this.article.contexts, this.routingExtraOption);
    });

    return _.concat([categoryListRouteInfo], categoryDetailRouteInfoList);
  }

  createPostsRoutes() {
    const postsRouteInfo = createPostListRouteInfo(this.article.contexts, this.routingExtraOption);
    const postDetailRouteInfoList = _.map(this.article.contexts, (context) => {
      return createPostDetailRouteInfo(context, this.article.contexts, this.routingExtraOption);
    });

    return _.concat([postsRouteInfo], postDetailRouteInfoList);
  }

  get routingExtraOption(): RoutingExtraOption {
    return {
      baseTitle: this.config.site.baseTitle,
      baseUrl: this.config.site.baseUrl,
      titleSeparator: this.config.pageOptions.titleSeparator
    };
  }

  getAllTagsFromContexts(contexts) {
    return _.uniq(_.flatten(_.map(contexts, (context) => context.tags)));
  }

  getAllCategoriesFromContexts(contexts) {
    return _.uniq(_.flatten(_.map(contexts, (context) => context.categories)));
  }
}
