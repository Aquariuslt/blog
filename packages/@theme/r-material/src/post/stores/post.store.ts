import postApi from '@/api/post-api';

import { action, computed, observable, runInAction } from 'mobx';

const POST_DETAIL_HOLDER: BlogModel.Post = {
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

export class PostStore {
  @observable loaded = false;
  @observable private $posts: BlogApiModel.PostsOverview = [];
  @observable private $detail: BlogModel.Post = POST_DETAIL_HOLDER;

  @computed get posts(): BlogApiModel.PostsOverview {
    return this.$posts;
  }

  @computed get detail(): BlogModel.Post {
    return this.$detail;
  }

  @action loadPosts(path: string): void {
    postApi.loadPosts(path).then((apiResult): void => {
      runInAction((): void => {
        this.loaded = true;
        this.$posts = apiResult.data;
      });
    });
  }

  @action loadPost(path: string): void {
    postApi.loadPostDetail(path).then((apiResult): void => {
      runInAction((): void => {
        this.$detail = apiResult.data;
      });
    });
  }
}

export default new PostStore();
