import axios, { AxiosPromise } from 'axios';
import TagsOverview = BlogApiModel.TagsOverview;
import PostsOverview = BlogApiModel.PostsOverview;

const API_PREFIX = '/api/v1/tags';
const API_SUFFIX = '.json';

function loadTags(): AxiosPromise<TagsOverview> {
  return axios.get(API_PREFIX + API_SUFFIX);
}

function loadTag(tag: string): AxiosPromise<PostsOverview> {
  return axios.get(`${API_PREFIX}/${tag}${API_SUFFIX}`);
}

export default {
  loadTags,
  loadTag
};
