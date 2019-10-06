import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RoutingService } from '@/routing/routing.service';

@Injectable()
export class ApiService implements OnModuleInit {
  private readonly logger = new Logger(ApiService.name);

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
    this.buildCategoriesApi();
    this.buildTagsApi();
  }

  buildPostsApi() {}

  buildCategoriesApi() {}

  buildTagsApi() {}
}
