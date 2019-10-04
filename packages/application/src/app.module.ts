import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [ConfigModule, ArticleModule]
})
export class AppModule {}
