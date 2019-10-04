import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';

@Module({
  providers: [ArticleService]
})
export class ArticleModule {}
