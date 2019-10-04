/**
 * @description site configuration, dynamic set from different deployment settings
 * */
export interface SiteConfig {
  https: boolean;
  domain: string;
  name: string;
}
