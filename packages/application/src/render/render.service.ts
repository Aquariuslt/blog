import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RenderServerModule } from '@/render/render-server.module';

import * as getPort from 'get-port';
import * as puppeteer from 'puppeteer';

const DOC_TYPE_HEADER = `<!DOCTYPE html>`;

@Injectable()
export class RenderService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RenderService.name);

  private $inited = false;

  private RENDER_SERVER_PORT;
  private RENDER_SERVER_HOST;

  private server;
  private browser;

  async onModuleInit() {
    if (this.$inited) {
      return;
    }

    this.RENDER_SERVER_PORT = await getPort();
    this.RENDER_SERVER_HOST = `http://localhost:${this.RENDER_SERVER_PORT}`;

    this.server = await NestFactory.create(RenderServerModule);
    await this.server.listen(this.RENDER_SERVER_PORT);
    this.browser = await puppeteer.launch();
    this.logger.log(`Render Server listen port: ${this.RENDER_SERVER_PORT}`);
    this.$inited = true;
  }

  async onModuleDestroy() {
    await this.server.close();
    await this.browser.close();
  }

  async render(path: string) {
    const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

    const targetUrl = `${this.RENDER_SERVER_HOST}${path}`;
    this.logger.log(`Rendering ${targetUrl}`);
    const page = await this.browser.newPage();
    await page.goto(targetUrl);
    await sleep();
    this.logger.log(`Capturing html content for ${targetUrl}`);
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    await page.close();
    return DOC_TYPE_HEADER + html;
  }
}
