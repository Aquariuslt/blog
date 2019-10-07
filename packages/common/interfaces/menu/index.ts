export interface NavigationMenu {
  id: string;
  label: string;
  link: string;
  icon?: string;
  children?: NavigationMenu;
}
