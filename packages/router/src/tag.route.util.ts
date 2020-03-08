import * as _ from 'lodash';
import * as uslug from 'uslug';
import { Meta, MetaName, RoutePathPrefix } from '@blog/common/interfaces/routes';

export const createTagsOverviewRouteItem = () => ({
  id: RoutePathPrefix.TAGS,
  label: `Tags` // TODO: add i18n support
});

export const createTagDetailRouteItem = (rawTag: string) => ({
  id: uslug(rawTag),
  label: `Tag: ${rawTag}`
});

export const createTagsOverviewDescMeta = (): Meta => ({
  name: MetaName.DESCRIPTION,
  itemprop: MetaName.DESCRIPTION,
  content: `Tags`
});

export const createTagDetailDescMeta = (rawTag: string): Meta => ({
  name: MetaName.DESCRIPTION,
  itemprop: MetaName.DESCRIPTION,
  content: `Tag: ${rawTag}`
});

export const createTagDetailOpenGraphMetas = (rawTag: string): Meta[] => [
  {
    name: MetaName.OPEN_GRAPH_DESCRIPTION,
    itemprop: MetaName.DESCRIPTION,
    content: `Tag: ${rawTag}`
  }
];

export const createTagsOverviewMetas = (): Meta[] => [createTagsOverviewDescMeta()];
export const createTagDetailMetas = (rawTag: string): Meta[] =>
  _.concat(createTagDetailOpenGraphMetas(rawTag), [createTagDetailDescMeta(rawTag)]);
