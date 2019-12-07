import { RouteMeta } from '../routes';

export interface ApiData extends RouteMeta {
  /** raw key */
  key: string;

  /** api data content **/
  data;
}
