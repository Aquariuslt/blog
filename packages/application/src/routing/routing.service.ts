import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';

@Injectable()
export class RoutingService implements OnModuleInit {
  private readonly logger = new Logger();

  private routes;

  constructor(private config: ConfigService, private article: ArticleService) {}

  onModuleInit() {
    this.createRoutes();
  }

  createRoutes() {}

  createPostsRoutes() {}
  createTagsRoutes() {}
  createCategoriesRoutes() {}
}
