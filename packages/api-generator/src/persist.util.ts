/**
 * @description persistence api as file (default JSON format)
 **/
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

const API_FILE_EXTENSION = `.json`;

/**
 * @param apiPath: api path like `/api/v1/posts`
 * @param response: api response content base on route meta
 * @param dest: destination folder, mostly is `<rootDir>/dist`
 * */
export const persistApi = (apiPath: string, response, dest: string) => {
  const fullFilePath = path.join(dest, apiPath + API_FILE_EXTENSION);
  mkdirp.sync(path.dirname(fullFilePath));
  fs.writeFileSync(fullFilePath, JSON.stringify(response));
};

export const persistFile = (filepath: string, content, dest: string) => {
  const fullFilePath = path.join(dest, filepath);
  mkdirp.sync(path.dirname(fullFilePath));
  fs.writeFileSync(fullFilePath, content);
};
