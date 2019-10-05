import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { createCategoryListRouteInfo, createTagListRouteInfo, RoutingExtraOption } from '@blog/routing-tools';

@Injectable()
export class RoutingService implements OnModuleInit {
  private readonly logger = new Logger();

  private routes;

  constructor(private config: ConfigService, private article: ArticleService) {}

  onModuleInit() {
    this.createRoutes();
  }

  createRoutes() {
    this.createTagsRoutes();
    this.createCategoriesRoutes();
  }

  createTagsRoutes() {
    const tagListRouteInfo = createTagListRouteInfo(this.article.contexts, this.routingExtraOption);
  }
  createCategoriesRoutes() {
    const categoryListRouteInfo = createCategoryListRouteInfo(this.article.contexts, this.routingExtraOption);
  }

  createPostsRoutes() {}

  get routingExtraOption(): RoutingExtraOption {
    return {
      baseTitle: this.config.site.baseTitle,
      baseUrl: this.config.site.baseUrl,
      titleSeparator: this.config.pageOptions.titleSeparator
    };
  }
}
