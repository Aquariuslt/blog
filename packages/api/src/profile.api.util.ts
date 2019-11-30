import { Profile, RawProfile } from '@blog/common/interfaces/profile';

export const createProfileApiData = (rawProfile: RawProfile): Profile => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    email: rawProfile.email,
    logo: { '@type': 'ImageObject', url: rawProfile.logo.url },
    name: rawProfile.name,
    url: rawProfile.url
  };
};
