import axios, { AxiosPromise } from 'axios';
import Post = BlogModel.Post;
import PagesOverview = BlogApiModel.PagesOverview;

const API_QUERY_PREFIX = '/api/v1/';
const API_PREFIX = '/api/v1/pages';
const API_SUFFIX = '.json';

function loadPages(): AxiosPromise<PagesOverview> {
  return axios.get(API_PREFIX + API_SUFFIX);
}

function loadPage(path: string): AxiosPromise<Post> {
  return axios.get(`${API_QUERY_PREFIX}${path}${API_SUFFIX}`);
}

export default {
  loadPages,
  loadPage
};
