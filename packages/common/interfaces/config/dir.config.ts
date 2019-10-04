/**
 * @description the build directory config
 * */
export interface DirConfig {
  /** the destination directory, which will be the root folder to serve static, default is `dist` */
  dest: string;

  /** the asset's root directory of application static resources, default is `dist/static` */
  /** and js/css/fonts/img will be under below */
  assets: string;

  /** the post asset's root directory, default is dist/posts */
  posts: string;
}
