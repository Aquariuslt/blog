export interface Route {
  /** same as layout */
  type: string;

  /** the sub path: like `/categories`, `/tags */
  path: string;

  /** tie bundle title */
  title: string;

  /** content data */
  data;
}
