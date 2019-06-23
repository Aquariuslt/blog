import axios, { AxiosPromise } from 'axios';
import PostsOverview = BlogApiModel.PostsOverview;
import Post = BlogModel.Post;
import { trim } from 'lodash';

const API_QUERY_PREFIX = 'api/v1/';
const API_POST_PREFIX = 'api/v1/posts';
const API_SUFFIX = '.json';

function loadAllPosts(): AxiosPromise<PostsOverview> {
  return axios.get(`${API_POST_PREFIX}${API_SUFFIX}`);
}

function loadPosts(path: string): AxiosPromise<PostsOverview> {
  if (path === '/' || path === '') {
    return loadAllPosts();
  }
  path = trim(path, '/');
  return axios.get(`${API_QUERY_PREFIX}${path}${API_SUFFIX}`);
}


function findPosts(year: string, month?: string): AxiosPromise<PostsOverview> {
  const url = month ? `${API_POST_PREFIX}/${year}/${month}${API_SUFFIX}` : `${API_POST_PREFIX}/${year}${API_SUFFIX}`;
  return axios.get(url);
}

function loadPost(permalink: string): AxiosPromise<Post> {
  return axios.get(`${API_POST_PREFIX}${permalink}${API_SUFFIX}`);
}


export default {
  findPosts,
  loadAllPosts,
  loadPosts,
  loadPost
};
