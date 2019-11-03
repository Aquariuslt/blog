export interface Keyword {
  id: string;
  label: string;
  link: string;
  total: number;
}

export interface ArticleMetadata {
  id: string;
  title: string;
  description: string;
  created: string;
  updated: string;
  categories: string[] | Keyword[];
  tags: string[] | Keyword[];
  cover: string;
}
