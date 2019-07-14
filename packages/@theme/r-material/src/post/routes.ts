import Posts from './containers/Posts';
import PostDetail from './containers/PostDetail';
import Categories from './containers/Categories';
import Tags from './containers/Tags';

const routes = [
  {
    path: '/',
    exact: true,
    component: Posts
  },
  {
    path: '/posts',
    exact: true,
    component: Posts
  },
  {
    path: '/posts/:year',
    exact: true,
    component: Posts
  },
  {
    path: '/posts/:year/:month',
    exact: true,
    component: Posts
  },
  {
    path: '/posts/:year/:month/:day',
    exact: true,
    component: Posts
  },
  {
    path: '/categories/:category',
    exact: true,
    component: Posts
  },
  {
    path: '/tags/:tag',
    exact: true,
    component: Posts
  },
  {
    path: '/posts/:year/:month/:day/:filename',
    exact: true,
    component: PostDetail
  },
  {
    path: '/categories',
    exact: true,
    component: Categories
  },
  {
    path: '/tags',
    exact: true,
    component: Tags
  }
];

export default routes;
