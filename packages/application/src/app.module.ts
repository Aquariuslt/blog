import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ArticleModule } from '@/article/article.module';
import { RoutingModule } from '@/routing/routing.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ConfigModule, ArticleModule, RoutingModule, ApiModule]
})
export class AppModule {}
