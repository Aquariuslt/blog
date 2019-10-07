/**
 * @description article definition from jsonld structured data
 * @see https://jsonld.com/blog-post/
 * */

export interface Article {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  /** author name */
  publisher: string;

  /** post url at production level */
  url: string;

  /** same as created */
  dateCreated: string;

  /** same as created */
  datePublished: string;

  /** same as updated*/
  dateModified: string;

  /** same as cover */
  image: string;

  /** same as summary */
  description: string;

  /** same as tags */
  keywords: string[];
}
