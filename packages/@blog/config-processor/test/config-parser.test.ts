import * as path from 'path';

import parser from '../lib';

describe('@blog/config-parser: parser', (): void => {

  const CORRECT_CONFIG_PATH = path.join(__dirname, './__fixtures__/correct-config.yml');
  const MISSING_BUILD_CONFIG_PATH = path.join(__dirname, './__fixtures__/missing-build-config.yml');
  const MISSING_SITE_CONFIG_PATH = path.join(__dirname, './__fixtures__/missing-site-config.yml');
  const NO_FEATURE_CONFIG_PATH = path.join(__dirname, './__fixtures__/no-feature-config.yml');
  const ENABLE_GALLERY_CONFIG = path.join(__dirname, './__fixtures__/enable-gallery-config.yml');
  const MISSING_LINKS_CONFIG = path.join(__dirname, './__fixtures__/missing-links-config.yml');

  it('# should read and valid sample ', (): void => {
    const config = parser.read(CORRECT_CONFIG_PATH);
    expect(config).toHaveProperty('site');
    expect(config).toHaveProperty('build');
  });

  it('# should throw validation error when `site` property is missing', (): void => {
    expect((): void => {
      parser.read(MISSING_SITE_CONFIG_PATH);
    }).toThrowError('data should have required property \'site\'');
  });

  it('# should throw validation error when `build` property is missing', (): void => {
    expect((): void => {
      parser.read(MISSING_BUILD_CONFIG_PATH);
    }).toThrowError('data should have required property \'build\'');
  });

  it('# should resolve features when config contains optional `features` field', (): void => {
    const config = parser.read(CORRECT_CONFIG_PATH);
    expect(config).toHaveProperty('features');
    expect(config.features).toHaveProperty('ga');
    expect(config.features).toHaveProperty('disqus');
  });

  it('# should resolve no feature config when no `features` field', (): void => {
    const config = parser.read(NO_FEATURE_CONFIG_PATH);
    expect(config).not.toHaveProperty('features');
  });

  it('# should enable gallery config when `features.gallery` is set to true', (): void => {
    const config = parser.read(ENABLE_GALLERY_CONFIG);
    expect(config).toHaveProperty('features');
    expect(config.features).toHaveProperty('gallery');
    expect(config.features.gallery).toBeTruthy();
  });

  it('# should got friend links when `features` links is not a empty object', () => {
    const config = parser.read(CORRECT_CONFIG_PATH);
    expect(config).toHaveProperty('features');
    expect(config.features).toHaveProperty('links');
    expect(config.features.links).not.toBeUndefined();

    if (config.features.links) {
      expect(Object.keys(config.features.links).length).toEqual(2);
    }
  });

  it('# should got friend links when `features` links is undefined', () => {
    const config = parser.read(MISSING_LINKS_CONFIG);
    expect(config).toHaveProperty('features');
    expect(config.features).not.toHaveProperty('links');
    expect(config.features.links).toBeUndefined();

  });
});
