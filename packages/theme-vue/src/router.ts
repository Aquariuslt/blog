import Vue from 'vue';
import Router from 'vue-router';
import List from './views/List.vue';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { buildURLPath } from '@blog/common/utils/path.util';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: List,
      props: () => ({
        apiPath: buildURLPath(RoutePathPrefix.HOME_ALIAS)
      })
    },
    {
      path: '/posts/:year/:month/:date/:id',
      name: 'post-detail',
      component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue'),
      props: (route) => ({
        apiPath: buildURLPath(
          RoutePathPrefix.POSTS,
          route.params['year'],
          route.params['month'],
          route.params['date'],
          route.params['id']
        )
      })
    },
    {
      path: '/posts',
      name: 'posts',
      component: List,
      props: () => ({
        apiPath: buildURLPath(RoutePathPrefix.POSTS)
      })
    },
    {
      path: '/categories/:category',
      name: 'category-detail',
      component: List,
      props: (route) => ({
        apiPath: buildURLPath(RoutePathPrefix.CATEGORIES, route.params['category'])
      })
    },
    {
      path: '/tags/:tag',
      name: 'tag-detail',
      component: List,
      props: (route) => ({
        apiPath: buildURLPath(RoutePathPrefix.TAGS, route.params['tag'])
      })
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import(/* webpackChunkName: "about" */ './views/Table.vue'),
      props: () => ({
        apiPath: buildURLPath(RoutePathPrefix.CATEGORIES)
      })
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import(/* webpackChunkName: "about" */ './views/Table.vue'),
      props: () => ({
        apiPath: buildURLPath(RoutePathPrefix.TAGS)
      })
    },
    {
      path: '*',
      name: '404',
      component: List,
      props: () => ({
        apiPath: buildURLPath(RoutePathPrefix.HOME_ALIAS)
      })
    }
  ]
});
