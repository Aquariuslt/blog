import categoryApi from '@/api/category-api';
import { action, observable, runInAction } from 'mobx';

import navigationStore, { NavMenu, NavMenuItem } from '../../core/stores/navigation.store';

export class CategoryStore {
  @observable categories: BlogApiModel.CategoriesOverview = [];

  @action loadCategories(): void {
    categoryApi.loadCategories().then((apiResult): void => {
      runInAction((): void => {
        this.categories = apiResult.data;
        navigationStore.registerMenus(this.toMenus());
      });
    });
  }

  toMenus(): NavMenu {
    return {
      name: 'post.navigation.category.label',
      link: '/categories',
      icon: 'category',
      priority: 5,
      child: this.categories.map(
        (item: BlogApiModel.Overview): NavMenuItem => ({
          name: item.name,
          link: item.link
        })
      )
    };
  }
}

export default new CategoryStore();
