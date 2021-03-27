import { Meta, MetaName, RoutePathPrefix } from '@blog/common/interfaces/routes';

export const createHomeRouteItem = () => ({
  id: RoutePathPrefix.HOME,
  label: 'Home'
});

export const createHomeDescMeta = (): Meta => ({
  name: MetaName.DESCRIPTION,
  itemprop: MetaName.DESCRIPTION,
  content: `Home`
});

export const createHomeMetas = (): Meta[] => [createHomeDescMeta()];
