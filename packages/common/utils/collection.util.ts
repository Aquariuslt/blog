import * as _ from 'lodash';
/**
 * @description merge two collection with same key
 * @param a: collection a
 * @param b: collection b
 * @param key: property in each item of a & b
 * */
export const mergeByKey = (a, b, key: string) => {
  return _.values(_.merge(_.keyBy(a, key), _.keyBy(b, key)));
};
