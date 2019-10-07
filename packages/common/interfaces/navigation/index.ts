export interface NavigationItem {
  id: string;
  label: string;
  link: string;
  icon?: string;
  children?: NavigationItem;
}
