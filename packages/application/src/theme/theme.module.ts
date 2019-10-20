import { Module } from '@nestjs/common';
import { ThemeService } from '@/theme/theme.service';
import { RoutesModule } from '@/routes/routes.module';
import { ApiModule } from '@/api/api.module';
import { ArticleModule } from '@/article/article.module';
import { RenderModule } from '@/render/render.module';

/**
 * Theme module to load build theme files
 * */
@Module({
  imports: [RoutesModule, ApiModule, ArticleModule, RenderModule],
  providers: [ThemeService]
})
export class ThemeModule {}
