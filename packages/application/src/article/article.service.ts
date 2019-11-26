import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@/config/config.service';
import {
  lookupMarkdownFiles,
  lookupImagesInMarkdownFile,
  copyImagesInMarkdown,
  isImageHosting,
  createArticleContext
} from '@blog/article-tools';

@Injectable()
export class ArticleService implements OnModuleInit {
  private readonly logger = new Logger(ArticleService.name);
  private $inited = false;
  private postsFiles: string[] = [];
  private postsContexts = [];

  private pagesFiles: string[] = [];
  private pagesContexts = [];

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    if (this.$inited) {
      return;
    }
    this.logger.log(`Article Service inited with config.version: ${this.config.version}`);
    this.buildPostsData();
    this.buildPagesContexts();
    this.$inited = true;
  }

  buildPostsData() {
    this.lookupPosts();
    this.copyPostsAssets();
    this.createArticleContexts();
  }

  lookupPosts() {
    const postsFiles = lookupMarkdownFiles(this.config.sources.posts);
    this.logger.log(`Load ${postsFiles.length} posts from ${this.config.sources.posts}`);
    this.postsFiles = postsFiles;
  }

  copyPostsAssets() {
    this.postsFiles.forEach((postFile) => {
      const relativeImages = lookupImagesInMarkdownFile(postFile).filter((imagePath) => !isImageHosting(imagePath));
      this.logger.log(`Copying posts assets from post: ${postFile} to  ${this.config.dirs.posts}`);
      copyImagesInMarkdown(postFile, relativeImages, this.config.sources.posts, this.config.dirs.posts);
    });
  }

  createArticleContexts() {
    this.postsContexts = this.postsFiles
      .map((postFile) => {
        return createArticleContext(postFile);
      })
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  }

  buildPagesContexts() {
    this.lookupPages();
    this.copyPagesAssets();
    this.createPageContexts();
  }

  lookupPages() {
    const pagesFiles = lookupMarkdownFiles(this.config.sources.pages);
    this.logger.log(`Load ${pagesFiles.length} pages from ${this.config.sources.pages}`);
    this.pagesFiles = pagesFiles;
  }

  copyPagesAssets() {
    this.pagesFiles.forEach((pageFile) => {
      const relativeImages = lookupImagesInMarkdownFile(pageFile).filter((imagePath) => !isImageHosting(imagePath));
      copyImagesInMarkdown(pageFile, relativeImages, this.config.sources.pages, this.config.dirs.pages);
    });
  }

  createPageContexts() {
    this.pagesContexts = this.pagesFiles
      .map((pageFile) => {
        return createArticleContext(pageFile);
      })
      .sort();
  }

  get contexts() {
    return this.postsContexts;
  }

  get pageContexts() {
    return this.pagesContexts;
  }
}
