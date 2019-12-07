import { ArticleMetadata } from '../articles/article-metadata';
import { ContentItem } from '../articles/content-item';

export interface ArticleContext extends ArticleMetadata {
  src: string;
  html: string;
  toc: ContentItem[];
  summary: string;
  images: string[];

  /** other optional field */
  [key: string]: string | string[] | object | any;
}
