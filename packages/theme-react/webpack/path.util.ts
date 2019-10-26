import * as path from 'path';

export const resolve = (p: string) => {
  return path.join(__dirname, '..', p);
};
