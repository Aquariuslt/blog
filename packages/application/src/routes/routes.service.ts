import * as _ from 'lodash';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RouteMeta } from '@blog/common/interfaces/routes';
import { createPagesDetailRouteMeta, RoutesOptions } from '@blog/router';
import { getAllTagsFromContexts, getAllCategoriesFromContexts } from '@blog/article';
import {
  createHomeRouteMeta,
  createPostsOverviewRouteMeta,
  createPostDetailRouteMeta,
  createCategoriesOverviewRouteMeta,
  createCategoryDetailRouteMeta,
  createTagsOverviewRouteMeta,
  createTagDetailRouteMeta
} from '@blog/router';

@Injectable()
export class RoutesService implements OnModuleInit {
  private readonly logger = new Logger(RoutesService.name);
  private $inited = false;

  public routes: RouteMeta[] = [];

  public home: RouteMeta;

  public tagsOverview: RouteMeta;
  public tagDetails: RouteMeta[] = [];

  public categoriesOverview: RouteMeta;
  public categoryDetails: RouteMeta[] = [];

  public postsOverview: RouteMeta;
  public postDetails: RouteMeta[] = [];

  public pageDetails: RouteMeta[] = [];

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
    this.home = this.createHomeRoute();
    this.tagsOverview = this.createTagsOverviewRoute();
    this.tagDetails = this.createTagDetailRoutes();
    this.categoriesOverview = this.createCategoriesOverviewRoute();
    this.categoryDetails = this.createCategoryDetailRoutes();
    this.postsOverview = this.createPostsOverviewRoute();
    this.postDetails = this.createPostDetailRoutes();
    this.pageDetails = this.createPageDetailRoutes();

    this.routes = _.concat(
      [this.home],
      [this.tagsOverview],
      [this.categoriesOverview],
      [this.postsOverview],
      this.tagDetails,
      this.categoryDetails,
      this.postDetails,
      this.pageDetails
    );

    _.each(this.routes, (route) => {
      this.logger.log(`Created Route Meta for path: ${route.path}`);
    });
  }

  createHomeRoute() {
    return createHomeRouteMeta(this.routesOptions);
  }

  createTagsOverviewRoute() {
    return createTagsOverviewRouteMeta(this.article.postContexts, this.routesOptions);
  }

  createTagDetailRoutes() {
    const tags = getAllTagsFromContexts(this.article.postContexts);

    return _.map(tags, (rawTag) => {
      return createTagDetailRouteMeta(rawTag, this.article.postContexts, this.routesOptions);
    });
  }

  createCategoriesOverviewRoute() {
    return createCategoriesOverviewRouteMeta(this.article.postContexts, this.routesOptions);
  }

  createCategoryDetailRoutes() {
    const categories = getAllCategoriesFromContexts(this.article.postContexts);
    return _.map(categories, (rawCategory) => {
      return createCategoryDetailRouteMeta(rawCategory, this.article.postContexts, this.routesOptions);
    });
  }

  createPostsOverviewRoute() {
    return createPostsOverviewRouteMeta(this.article.postContexts, this.routesOptions);
  }

  createPostDetailRoutes() {
    return _.map(this.article.postContexts, (context) => {
      return createPostDetailRouteMeta(context, this.article.postContexts, this.routesOptions);
    });
  }

  createPageDetailRoutes() {
    return _.map(this.article.pageContexts, (context) => {
      return createPagesDetailRouteMeta(context, this.routesOptions);
    });
  }

  get routesOptions(): RoutesOptions {
    return {
      baseTitle: this.config.site.baseTitle,
      baseUrl: this.config.site.baseUrl,
      titleSeparator: this.config.pageOptions.titleSeparator
    };
  }
}
