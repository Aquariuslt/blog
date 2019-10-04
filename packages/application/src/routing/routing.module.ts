import { Module } from '@nestjs/common';
import { ArticleModule } from '@/article/article.module';
import { RoutingService } from './routing.service';

@Module({
  imports: [ArticleModule],
  providers: [RoutingService]
})
export class RoutingModule {}
