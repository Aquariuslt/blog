import { action, computed, observable } from 'mobx';

export interface NavMenu {
  name: string;
  link: string;
  icon?: string;
  priority?: number;
  description?: string;
  child: NavMenuItem[];
}

export interface NavMenuItem {
  name: string;
  link: string;
  ext?: boolean;
  icon?: string;
}

export class NavigationStore {
  @observable $menus: NavMenu[] = [];

  @computed get menus(): NavMenu[] {
    const DEFAULT_PRIORITY = -1;

    return this.$menus.slice().sort((a, b): number => {
      const ap = a.priority || DEFAULT_PRIORITY;
      const bp = b.priority || DEFAULT_PRIORITY;
      return ap - bp;
    });
  }

  @action registerMenus(newMenus: NavMenu): void {
    this.$menus.push(newMenus);
  }
}

export default new NavigationStore();
