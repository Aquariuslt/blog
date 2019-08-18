import GalleryApi from '../lib';
import { startsWith } from 'lodash';

describe('@utils/picsum-api', (): void => {
  const REAL_NETWORK_TIMEOUT = 10000;

  it(
    '# should api return real response url',
    async (): Promise<void> => {
      const api = new GalleryApi({});
      const photoUrl = await api.getPhoto('some-article-title');

      expect(photoUrl).not.toBeNull();
      expect(startsWith(photoUrl, 'https://'));
    },
    REAL_NETWORK_TIMEOUT
  );

  it(
    '# should hit cache with call two times with same criteria',
    async (): Promise<void> => {
      const api = new GalleryApi({});
      const photoUrl = await api.getPhoto('some-article-title');
      const dupPhotoUrl = await api.getPhoto('some-article-title');

      expect(photoUrl).toEqual(dupPhotoUrl);
    },
    REAL_NETWORK_TIMEOUT
  );
});
