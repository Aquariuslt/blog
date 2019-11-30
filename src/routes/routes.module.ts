import { Module } from '@nestjs/common';
import { ArticleModule } from '@/article/article.module';
import { RoutesService } from '@/routes/routes.service';

@Module({
  imports: [ArticleModule],
  providers: [RoutesService],
  exports: [RoutesService]
})
export class RoutesModule {}
