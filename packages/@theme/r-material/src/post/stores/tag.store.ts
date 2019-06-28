import tagApi from '@/api/tag-api';

import { action, observable, runInAction } from 'mobx';

import navigationStore, { NavMenu, NavMenuItem } from '../../core/stores/navigation.store';

export class TagStore {
  @observable tags: BlogApiModel.TagsOverview = [];

  @action loadTags(): void {
    tagApi.loadTags().then(
      (apiResult): void => {
        runInAction(
          (): void => {
            this.tags = apiResult.data;
            navigationStore.registerMenus(this.toMenus());
          }
        );
      }
    );
  }

  toMenus(): NavMenu {
    return {
      name: 'Tags',
      link: '/tags',
      icon: 'bookmark',
      priority: 5,
      child: this.tags.map(
        (item: BlogApiModel.Overview): NavMenuItem => ({
          name: item.name,
          link: item.link
        })
      )
    };
  }
}

export default new TagStore();
