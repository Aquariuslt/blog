import * as config from '@/config.json';
import { action, observable, runInAction } from 'mobx';
import navigationStore, { NavMenu, NavMenuItem } from '../../core/stores/navigation.store';

export class LinkStore {
  @observable links = {};

  @action registerLinks() {
    if (config.features.links) {
      runInAction(() => {
        this.links = config.features.links;
        navigationStore.registerMenus(this.toMenus());
      });
    }
  }

  toMenus(): NavMenu {
    return {
      name: 'post.navigation.link.label',
      link: '/links',
      icon: 'link',
      priority: 10,
      child: Object.keys(this.links).map(
        (key: string): NavMenuItem => ({
          name: key,
          link: this.links[key],
          icon: 'link',
          ext: true
        })
      )
    };
  }
}

export default new LinkStore();
