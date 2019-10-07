import { RoutePathPrefix } from '@blog/common/interfaces/routes';

export const createPostsOverviewRouteItem = () => ({
  id: RoutePathPrefix.POSTS,
  label: 'Posts' // TODO: add i18n support
});

export const createPostDetailRouteItem = (context) => ({
  id: context.id,
  label: context.title
});
