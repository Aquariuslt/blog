import pageApi from '@/api/page-api';

import { action, computed, observable, runInAction } from 'mobx';

import navigationStore, { NavMenu, NavMenuItem } from '../../core/stores/navigation.store';

const PAGE_DETAIL_HOLDER: BlogModel.Post = {
  filename: '',
  md: '',
  html: '',
  permalink: '',
  metadata: {
    title: '',
    created: '',
    updated: '',
    category: ''
  }
};

export class PageStore {
  @observable loaded = false;
  @observable pages: BlogApiModel.PagesOverview = [];
  @observable private $detail: BlogModel.Post = PAGE_DETAIL_HOLDER;

  @computed get detail(): BlogModel.Post {
    return this.$detail;
  }

  @action loadPages(): void {
    pageApi.loadPages().then((apiResult): void => {
      runInAction((): void => {
        this.pages = apiResult.data;
        navigationStore.registerMenus(this.toMenus());
      });
    });
  }

  @action loadPage(path: string) {
    pageApi.loadPage(path).then((apiResult) => {
      runInAction(() => {
        this.$detail = apiResult.data;
      });
    });
  }

  toMenus(): NavMenu {
    return {
      name: 'post.navigation.pages.label',
      link: '/pages',
      icon: 'page',
      priority: 6,
      child: this.pages.map(
        (item): NavMenuItem => ({
          name: item.metadata.title,
          link: item.permalink
        })
      )
    };
  }
}

export default new PageStore();
