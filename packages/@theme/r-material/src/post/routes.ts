import Posts from './containers/Posts';
import PostDetail from './containers/PostDetail';

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
  }
];

export default routes;
