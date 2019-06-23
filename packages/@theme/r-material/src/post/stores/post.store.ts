import postApi from '@/api/post-api';

import { action, computed, observable, runInAction } from 'mobx';

export class PostStore {
  @observable private $posts: BlogApiModel.PostsOverview = [];

  @observable loaded: boolean = false;


  @computed get posts(): BlogApiModel.PostsOverview {
    return this.$posts;
  }


  @action loadPosts(path: string): void {
    postApi.loadPosts(path).then(
      (apiResult): void => {
        runInAction(
          (): void => {
            this.loaded = true;
            this.$posts = apiResult.data;
          }
        );
      }
    );
  }
}

export default new PostStore();
