import Posts from './containers/Posts';

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
  }
];

export default routes;
