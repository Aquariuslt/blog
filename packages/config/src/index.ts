import * as path from 'path';
import * as cosmiconfig from 'cosmiconfig';

export interface Config {
  /** meta */
  location: string;
  version: string;
  basePath: string;

  /** content */

  sources: {
    pages: string;
    posts: string;
  };

  dirs: {
    dest: string;
    api: string;
    posts: string;
    pages: string;
  };

  site: {
    domain: string;
    baseUrl: string;
    baseTitle: string;
    disqus: string; // TODO: refactor as comment/feature?
    googleAnalytics?: {
      verification: string;
      tracking: string;
    };
  };
  profile;
  pageOptions: {
    titleSeparator: string;
  };
  theme: string;
}

/**
 * @description detect theme package location by name
 * @example detectThemePackage(`theme-vue`) => BASE_PATH + `/packages/theme-vue`
 **/
export const detectThemePackage = (theme: string) => {
  return `/packages/${theme}`;
};

export const loadConfig = (id = `blog`, lookupPath?: string): Config => {
  const explorer = cosmiconfig(id);
  const configLookupResult = explorer.searchSync(lookupPath);
  const configLocation = configLookupResult.filepath;
  const config = configLookupResult.config;
  const basePath = path.dirname(configLocation);

  const site = config['site'];
  const protocol = site.https ? 'https://' : 'http://';
  const baseUrl = protocol + site.domain;

  const pageOptions = config['pages'];

  return {
    location: configLocation,
    version: config['version'],
    basePath: basePath,
    sources: {
      posts: path.join(basePath, config.sources.posts),
      pages: path.join(basePath, config.sources.pages)
    },
    dirs: {
      dest: path.join(basePath, config.dirs.dest),
      api: path.join(basePath, config.dirs.api),
      posts: path.join(basePath, config.dirs.posts),
      pages: path.join(basePath, config.dirs.pages)
    },
    site: {
      baseTitle: site.title,
      baseUrl: baseUrl,
      disqus: site.disqus,
      domain: site.domain,
      googleAnalytics: config.site['google_analytics']
        ? {
            verification: config.site['google_analytics']['verification'],
            tracking: config.site['google_analytics']['tracking']
          }
        : undefined
    },
    profile: config.profile,
    theme: path.join(basePath, detectThemePackage(config.theme)),
    pageOptions: {
      titleSeparator: pageOptions['title_separator']
    }
  };
};
