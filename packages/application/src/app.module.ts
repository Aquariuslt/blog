import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ArticleModule } from '@/article/article.module';
import { RoutesModule } from '@/routes/routes.module';
import { ApiModule } from './api/api.module';
import { AppLogger } from '@/app.logger';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [ConfigModule, ArticleModule, RoutesModule, ApiModule, ThemeModule],
  providers: [AppLogger],
  exports: [AppLogger]
})
export class AppModule {}
