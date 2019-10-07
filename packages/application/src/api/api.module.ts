import { Module } from '@nestjs/common';
import { ApiService } from '@/api/api.service';
import { ApiController } from '@/api/api.controller';
import { ArticleModule } from '@/article/article.module';
import { RoutesModule } from '@/routes/routes.module';

@Module({
  imports: [ArticleModule, RoutesModule],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}
