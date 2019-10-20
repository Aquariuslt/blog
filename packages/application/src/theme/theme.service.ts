import * as path from 'path';
import * as fse from 'fs-extra';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RoutesService } from '@/routes/routes.service';
import { ApiService } from '@/api/api.service';
import { createSitemapContent } from '@blog/routes-tools';
import { persistFile } from '@blog/api-generator';

import { buildServiceWorker } from '@blog/pwa-tools';

@Injectable()
export class ThemeService implements OnModuleInit {
  private readonly logger = new Logger(ThemeService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly article: ArticleService,
    private readonly routes: RoutesService,
    private readonly api: ApiService
  ) {}

  async onModuleInit() {
    await this.api.onModuleInit();
    this.logger.log(`Detecting Theme: ${this.config.theme}`);
    this.buildCNAME();
    this.buildThemeAssets();
    this.buildFallbackHtml();
    await this.buildPWAAssets();
    await this.buildSitemap();
  }

  private buildCNAME() {
    const CNAME = this.config.site.baseUrl;
    this.logger.log(`Persisting CNAME: ${CNAME}`);
    persistFile(`CNAME`, CNAME, this.config.dirs.dest);
  }

  private buildThemeAssets() {
    const themeDestDir = path.join(this.config.theme, `dist`);
    const targetDir = this.config.dirs.dest;

    this.logger.log(`Copying theme assets from ${themeDestDir} to ${targetDir}`);
    fse.copySync(themeDestDir, targetDir);
  }

  private buildFallbackHtml() {
    this.logger.log(`Copy index.html as fallback 404.html`);
    const indexHtml = path.join(this.config.dirs.dest, `index.html`);
    const fallbackHtml = path.join(this.config.dirs.dest, `404.html`);
    fse.copySync(indexHtml, fallbackHtml);
  }

  private async buildSitemap() {
    const sitemap = await createSitemapContent(this.article.contexts, this.routes.routesOptions);
    this.logger.log(`Persisting Sitemap`);
    persistFile(`sitemap.xml`, sitemap.toString(), this.config.dirs.dest);
  }

  private async buildPWAAssets() {
    this.logger.log(`Build Service Worker related files to ${this.config.dirs.dest}`);
    await buildServiceWorker(this.config.dirs.dest);
    this.logger.log(`Build Service Worker complete;`);
  }
}
