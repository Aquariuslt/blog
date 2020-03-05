import * as _ from 'lodash';
import * as path from 'path';
import * as fse from 'fs-extra';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import { ArticleService } from '@/article/article.service';
import { RoutesService } from '@/routes/routes.service';
import { ApiService } from '@/api/api.service';
import { RenderService } from '@/render/render.service';
import { createSitemapContent } from '@blog/router';
import { persistFile } from '@blog/api';
import { buildServiceWorker } from '@blog/pwa';

@Injectable()
export class ThemeService implements OnModuleInit {
  private readonly logger = new Logger(ThemeService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly article: ArticleService,
    private readonly routes: RoutesService,
    private readonly api: ApiService,
    private readonly renderer: RenderService
  ) {}

  async onModuleInit() {
    await this.routes.onModuleInit();
    await this.api.onModuleInit();
    await this.renderer.onModuleInit();
    this.logger.log(`Detecting Theme: ${this.config.theme}`);
    this.buildCNAME();
    this.buildNoJekyll();
    this.buildSitemap();
    if (process.env.NODE_ENV === 'production') {
      this.buildThemeAssets();
      this.buildFallbackHtml();
      await this.prerender();
      await this.buildPWAAssets();
      await this.buildNowConfig();
    }
  }

  private buildCNAME() {
    const CNAME = this.config.site.baseUrl;
    this.logger.log(`Persisting CNAME: ${CNAME}`);
    persistFile(`CNAME`, CNAME, this.config.dirs.dest);
  }

  private buildNoJekyll() {
    this.logger.log(`Persisting .nojekyll`);
    persistFile(`.nojekyll`, null, this.config.dirs.dest);
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
    const sitemap = await createSitemapContent(
      this.article.postContexts,
      this.article.pageContexts,
      this.routes.routesOptions
    );
    this.logger.log(`Persisting Sitemap`);
    persistFile(`sitemap.xml`, sitemap.toString(), this.config.dirs.dest);
  }

  private async buildPWAAssets() {
    this.logger.log(`Build Service Worker related files to ${this.config.dirs.dest}`);
    await buildServiceWorker(this.config.dirs.dest);
    this.logger.log(`Build Service Worker complete;`);
  }

  private async buildNowConfig() {
    this.logger.log(`Build now.json for static routing`);
    const routes = this.routes.routes
      .filter((route) => route.path !== `/`)
      .map((route) => ({
        src: route.path,
        dest: `${route.path}/index.html`
      }));
    const nowConfiguration = {
      version: 2,
      trailingSlash: true,
      routes
    };
    fse.writeFileSync(path.join(this.config.dirs.dest, `/now.json`), JSON.stringify(nowConfiguration));
    this.logger.log(`Build now.json complete`);
  }

  private async prerender() {
    const prerenderTasks = _.map(this.routes.routes, (route) => {
      if (route.path === '/') {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        this.captureAndSaveRoute(route.path)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            this.logger.error(error.message);
          });
      });
    });

    await Promise.all(prerenderTasks);

    await this.captureAndSaveRoute('/');
  }

  private async captureAndSaveRoute(p: string) {
    const htmlPath = path.join(this.config.dirs.dest, p, `/index.html`);
    if (p !== '/') {
      fse.removeSync(htmlPath);
    }
    fse.ensureDirSync(path.dirname(htmlPath));
    const html = await this.renderer.render(p);
    this.logger.log(`Pre-rendering html content to ${htmlPath}`);
    fse.writeFileSync(htmlPath, html);
  }
}
