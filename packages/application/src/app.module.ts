import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ArticleModule } from '@/article/article.module';
import { RoutesModule } from '@/routes/routes.module';
import { ApiModule } from './api/api.module';
import { AppLogger } from '@/app.logger';

@Module({
  imports: [ConfigModule, ArticleModule, RoutesModule, ApiModule],
  providers: [AppLogger],
  exports: [AppLogger]
})
export class AppModule {}
