import { Module } from '@nestjs/common';
import { ApiService } from '@/api/api.service';
import { ApiController } from '@/api/api.controller';
import { ArticleModule } from '@/article/article.module';
import { RoutingModule } from '@/routing/routing.module';

@Module({
  imports: [ArticleModule, RoutingModule],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}
