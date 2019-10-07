/**
 * @description author profile
 * */
import { Person } from 'schema-dts';

export interface RawProfile {
  name: string;
  logo: {
    url: string;
  };
  email: string;
  url: Map<string, string>;
}

export interface Profile {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  logo: {
    '@type': 'ImageObject';
    url: string;
  };
  email: string;
  url: Map<string, string>;
}
