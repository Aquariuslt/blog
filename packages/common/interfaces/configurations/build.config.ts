/**
 * @description the build config
 * */
export interface BuildConfig {
  /** the destination directory, which will be the root folder to serve static, default is `dist` */
  dest: string;

  /** the asset's root directory of application static resources, default is `static` */
  /** and js/css/fonts/img will be under below */
  assets: string;
}
