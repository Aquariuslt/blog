import { ArticleMetadata } from './article-metadata';
import { ContentItem } from './content-item';

export interface ArticleContext extends ArticleMetadata {
  src: string;
  html: string;
  toc: ContentItem[];
  summary: string;
  images: string[];

  /** other optional field */
  [key: string]: string | string[] | object;
}
