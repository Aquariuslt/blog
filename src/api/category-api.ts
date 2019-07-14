import axios, { AxiosPromise } from 'axios';
import CategoriesOverview = BlogApiModel.CategoriesOverview;
import PostsOverview = BlogApiModel.PostsOverview;

const API_PREFIX = '/api/v1/categories';
const API_SUFFIX = '.json';

function loadCategories(): AxiosPromise<CategoriesOverview> {
  return axios.get(API_PREFIX + API_SUFFIX);
}

function loadCategory(category: string): AxiosPromise<PostsOverview> {
  return axios.get(`${API_PREFIX}/${category}${API_SUFFIX}`);
}

export default {
  loadCategories,
  loadCategory
};
