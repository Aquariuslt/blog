import { RoutePathPrefix } from '@blog/common/interfaces/routes';

export const createPostListRootInfo = () => ({
  id: RoutePathPrefix.POSTS,
  label: 'Posts' // TODO: add i18n support
});

export const createPostDetailInfo = (context) => ({
  id: context.id,
  label: context.title
});
