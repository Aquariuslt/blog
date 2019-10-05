import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ArticleModule } from '@/article/article.module';
import { RoutingModule } from '@/routing/routing.module';

@Module({
  imports: [ConfigModule, ArticleModule, RoutingModule]
})
export class AppModule {}
