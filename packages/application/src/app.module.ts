import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ArticleModule } from '@/article/article.module';
import { RoutesModule } from '@/routes/routes.module';
import { ApiModule } from './api/api.module';
import { AppLogger } from '@/app.logger';
import { ThemeModule } from './theme/theme.module';
import { RenderModule } from './render/render.module';
import { RenderServerModule } from '@/render/render-server.module';

@Module({
  imports: [ConfigModule, ArticleModule, RoutesModule, ApiModule, ThemeModule, RenderModule, RenderServerModule],
  providers: [AppLogger],
  exports: [AppLogger]
})
export class AppModule {}
