import axios from 'axios';

interface GalleryApiConfig {
  width?: number;
  height?: number;

  collection?: number; // collection id

  random?: boolean;
  grayscale?: boolean;
  blur?: boolean;
}

type GalleryConfig = GalleryApiConfig & {
  hash?: Function | boolean;
};

const PICSUM_PHOTOS_URL = 'https://picsum.photos';

const DEFAULT_CONFIG: GalleryConfig = {
  hash: true,

  width: 800,
  height: 300,

  random: true,
  grayscale: false,
  blur: false
};

class GalleryApi {
  private readonly config: GalleryConfig;

  private caches = {};

  constructor(config: GalleryConfig) {
    this.config = Object.assign(config, DEFAULT_CONFIG);
  }

  async getPhoto(criteria: string): Promise<string> {
    const queryConfig = Object.assign({}, this.config);

    if (this.caches.hasOwnProperty(criteria)) {
      return this.caches[criteria];
    } else {
      const response = await axios.get(`${PICSUM_PHOTOS_URL}/${queryConfig.width}/${queryConfig.height}`);

      const responseUrl = response.request.res.responseUrl;
      this.caches[criteria] = responseUrl;
      return responseUrl;
    }
  }
}

export default GalleryApi;
