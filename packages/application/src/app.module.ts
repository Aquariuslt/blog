import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ArticleModule } from '@/article/article.module';
import { RoutesModule } from '@/routes/routes.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ConfigModule, ArticleModule, RoutesModule, ApiModule]
})
export class AppModule {}
