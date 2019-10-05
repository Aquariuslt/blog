import * as _ from 'lodash';
import { Profile } from '@blog/common/interfaces/profile';

export const createProfileInfo = (profile: Profile) => {
  const urls = _.values(profile.url);

  const url = _.head(urls);
  const sameAsUrls = _.slice(urls, 1);

  return {
    '@context': 'http://www.schema.org',
    '@type': 'person',
    name: profile.name,
    image: profile.logo.url,
    url: url,
    sameAs: sameAsUrls
  };
};
