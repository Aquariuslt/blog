import * as glob from 'glob';

/**
 * @description provide a scan function to scan all markdown files
 * */
export const scan = (baseDir: string): string[] => {
  const MD_RULES = '/**/*.md';
  return glob.sync(baseDir + MD_RULES);
};
