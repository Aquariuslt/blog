import * as _ from 'lodash';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RouteMeta } from '@blog/common/interfaces/routes';
import { RoutesOptions } from '@blog/routes-tools';
import { getAllTagsFromContexts, getAllCategoriesFromContexts } from '@blog/article-tools';
import {
  createHomeRouteMeta,
  createPostsOverviewRouteMeta,
  createPostDetailRouteMeta,
  createCategoriesOverviewRouteMeta,
  createCategoryDetailRouteMeta,
  createTagsOverviewRouteMeta,
  createTagDetailRouteMeta
} from '@blog/routes-tools';

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

    this.routes = _.concat(
      [this.home],
      [this.tagsOverview],
      [this.categoriesOverview],
      [this.postsOverview],
      this.tagDetails,
      this.categoryDetails,
      this.postDetails
    );

    _.each(this.routes, (route) => {
      this.logger.log(`Created Route Meta for path: ${route.path}`);
    });
  }

  createHomeRoute() {
    return createHomeRouteMeta(this.routesOptions);
  }

  createTagsOverviewRoute() {
    return createTagsOverviewRouteMeta(this.article.contexts, this.routesOptions);
  }

  createTagDetailRoutes() {
    const tags = getAllTagsFromContexts(this.article.contexts);

    return _.map(tags, (rawTag) => {
      return createTagDetailRouteMeta(rawTag, this.article.contexts, this.routesOptions);
    });
  }

  createCategoriesOverviewRoute() {
    return createCategoriesOverviewRouteMeta(this.article.contexts, this.routesOptions);
  }

  createCategoryDetailRoutes() {
    const categories = getAllCategoriesFromContexts(this.article.contexts);
    return _.map(categories, (rawCategory) => {
      return createCategoryDetailRouteMeta(rawCategory, this.article.contexts, this.routesOptions);
    });
  }

  createPostsOverviewRoute() {
    return createPostsOverviewRouteMeta(this.article.contexts, this.routesOptions);
  }

  createPostDetailRoutes() {
    return _.map(this.article.contexts, (context) => {
      return createPostDetailRouteMeta(context, this.article.contexts, this.routesOptions);
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
