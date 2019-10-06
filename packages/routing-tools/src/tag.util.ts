import * as uslug from 'uslug';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { buildURLPath } from '@blog/common/utils/path.util';

export const createTagsRootInfo = () => ({
  id: RoutePathPrefix.TAGS,
  label: 'Tags' // TODO: add i18n support
});

export const createTagInfo = (rawTag: string) => ({
  id: uslug(rawTag),
  label: `Tag: ${rawTag}`
});
