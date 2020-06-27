export interface ContentItem {
  id: string;
  label: string;
  level: number;
  pid?: number;
  position?: number;
  children: ContentItem[];
}
