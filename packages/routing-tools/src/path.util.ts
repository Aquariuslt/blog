import * as _ from 'lodash';

/**
 * @description path util for generating URL from standard web api
 * */
const URL_PATH_SEPARATOR = '/';

export const buildURLPath = (...paths) => {
  return URL_PATH_SEPARATOR + paths.join(URL_PATH_SEPARATOR);
};

export const buildFullURL = (baseUrl, path) => {
  return baseUrl + path;
};
