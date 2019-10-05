/**
 * @description author profile
 * */
export interface Profile {
  name: string;
  logo: {
    url: string;
  };
  email: string;
  url: Map<string, string>;
}
