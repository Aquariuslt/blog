import * as path from 'path';

import parser from '../lib';

describe('@blog/config-parser: parser', (): void => {

  const CORRECT_CONFIG_PATH = path.join(__dirname, './__fixtures__/correct-config.yml');
  const MISSING_BUILD_CONFIG_PATH = path.join(__dirname, './__fixtures__/missing-build-config.yml');
  const MISSING_SITE_CONFIG_PATH = path.join(__dirname, './__fixtures__/missing-site-config.yml');
  const NO_FEATURE_CONFIG_PATH = path.join(__dirname, './__fixtures__/no-feature-config.yml');
  const ENABLE_GALLERY_CONFIG = path.join(__dirname, './__fixtures__/enable-gallery-config.yml');

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
});
