export interface BreadcrumbItem {
  '@type': 'ListItem';

  /** level starts from 1*/
  position: number;

  /** display name, suppose support i18n */
  name: string;

  /** the full url */
  item: string;
}

export interface BreadcrumbList {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItem[];
}
