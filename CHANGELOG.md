## [5.1.1](https://github.com/aquariuslt/blog/compare/v5.1.0...v5.1.1) (2019-07-13)



# [5.1.0](https://github.com/aquariuslt/blog/compare/v5.0.0...v5.1.0) (2019-07-13)


### Bug Fixes

* **DocHead:** use `property` instead of `name` in opengraph meta tag ([4d4e896](https://github.com/aquariuslt/blog/commit/4d4e896))
* **posts:** fix a probably title generate error when url ends with `/` ([7e55bd8](https://github.com/aquariuslt/blog/commit/7e55bd8))
* move json-ld from react-schemaaorg to PostJsonLd ([9c7a417](https://github.com/aquariuslt/blog/commit/9c7a417))


### Features

* **ga:** add ga-verification code injection ([afe6228](https://github.com/aquariuslt/blog/commit/afe6228))
* **google-analytics:** update config.features.ga schema and add google analytics code ([5fab3b2](https://github.com/aquariuslt/blog/commit/5fab3b2))
* **i18n:** enable i18n feature ([fad4cf3](https://github.com/aquariuslt/blog/commit/fad4cf3))
* **i18n:** initial i18n module ([939ded9](https://github.com/aquariuslt/blog/commit/939ded9))
* **jsonld:** add jsonld in generate workflow ([de5d6d7](https://github.com/aquariuslt/blog/commit/de5d6d7))
* **links:** add friend links at schema ([2247863](https://github.com/aquariuslt/blog/commit/2247863))
* **links:** enable friend links ([93cbb6a](https://github.com/aquariuslt/blog/commit/93cbb6a))
* **opengraph:** add opengraph injection ([c9b111b](https://github.com/aquariuslt/blog/commit/c9b111b))
* **seo:** update feed file generation to correct url ([f73dc7b](https://github.com/aquariuslt/blog/commit/f73dc7b))
* **TOC:** add scroll animation at toc content link ([d4b21ce](https://github.com/aquariuslt/blog/commit/d4b21ce))



# [5.0.0](https://github.com/aquariuslt/blog/compare/v5.0.0-beta.2...v5.0.0) (2019-06-30)


### Bug Fixes

* a injectable mobx props issue? ([9735d94](https://github.com/aquariuslt/blog/commit/9735d94))
* fix App.test.tsx for un injected mobx store ([d3d7dad](https://github.com/aquariuslt/blog/commit/d3d7dad))
* fix host name in config schema design and relate tests ([fc828ed](https://github.com/aquariuslt/blog/commit/fc828ed))


### Features

* **@blog/api-generator:** add byMonth, byYear posts overview query ([7598e92](https://github.com/aquariuslt/blog/commit/7598e92))
* **@blog/api-generator:** add feed.category ([151b350](https://github.com/aquariuslt/blog/commit/151b350))
* **@blog/api-generator:** add persist-util and tests ([35951bd](https://github.com/aquariuslt/blog/commit/35951bd))
* **@blog/api-generator:** add robots.txt generate ([7c5d4b7](https://github.com/aquariuslt/blog/commit/7c5d4b7))
* **@blog/api-generator:** add seo-api functions & tests ([2869588](https://github.com/aquariuslt/blog/commit/2869588))
* **@blog/config-processor:** add module: @blog/config-processor ([e9e08ba](https://github.com/aquariuslt/blog/commit/e9e08ba))
* **@blog/config-processor:** add property: features ([25abd0d](https://github.com/aquariuslt/blog/commit/25abd0d))
* **@theme:** init package: `@theme/r-material` ([2013cc8](https://github.com/aquariuslt/blog/commit/2013cc8))
* **@theme/r-material:** add Navigation Component and tests ([1168166](https://github.com/aquariuslt/blog/commit/1168166))
* **@theme/r-material:** add state management dependencies ([66dce72](https://github.com/aquariuslt/blog/commit/66dce72))
* **@theme/v-material:** init module: @theme/v-material ([ab88181](https://github.com/aquariuslt/blog/commit/ab88181))
* **core:** add component DocHead to pass helmet ([55892a6](https://github.com/aquariuslt/blog/commit/55892a6))
* **gallery:** add `@utils/gallery-api` ([5bf0ed5](https://github.com/aquariuslt/blog/commit/5bf0ed5))
* **Icons:** add component BundledIcon ([f525487](https://github.com/aquariuslt/blog/commit/f525487))
* **markdown-it-plugins:** refactor metadata plugin ([1934d27](https://github.com/aquariuslt/blog/commit/1934d27))
* **post:** add component PostContent ([ba9af8e](https://github.com/aquariuslt/blog/commit/ba9af8e))
* **post:** add components PostComment, PostTOC ([ae5802f](https://github.com/aquariuslt/blog/commit/ae5802f))
* **post:** add PostCard compnent and test ([f5ff874](https://github.com/aquariuslt/blog/commit/f5ff874))
* **Profile:** add component Profile ([e26aea3](https://github.com/aquariuslt/blog/commit/e26aea3))
* **Profile:** add component Profile ([b1466c6](https://github.com/aquariuslt/blog/commit/b1466c6))
* **pwa:** remove offline-plugin, use webpack-pwa-manifest + google workbox plugin to generate manifest.json and service-worker ([b9e89d3](https://github.com/aquariuslt/blog/commit/b9e89d3))
* **pwa:** update injected configuration from devtools suggestions ([2158e86](https://github.com/aquariuslt/blog/commit/2158e86))
* **pwa:** update injected configuration from devtools suggestions ([5dde377](https://github.com/aquariuslt/blog/commit/5dde377))
* **pwa:** update service-worker installation ([3e34ccc](https://github.com/aquariuslt/blog/commit/3e34ccc))
* **r-material:** add component PostNavBreadcrumbs ([151e460](https://github.com/aquariuslt/blog/commit/151e460))
* add gulp compile task instead of running `lerna run tsc` ([de963b7](https://github.com/aquariuslt/blog/commit/de963b7))
* pre-render ([05b9228](https://github.com/aquariuslt/blog/commit/05b9228))
* **r-material:** refactor breadcrumb styles ([57f8290](https://github.com/aquariuslt/blog/commit/57f8290))
* **theme:** add theme injection ([35dcd97](https://github.com/aquariuslt/blog/commit/35dcd97))
* **unsplash-api:** add module `@utils/unsplash-api` ([2fff784](https://github.com/aquariuslt/blog/commit/2fff784))
* use mobx instead of redux series ([b6e5edb](https://github.com/aquariuslt/blog/commit/b6e5edb))
* **unsplash-api:** update api example ([6c4b05d](https://github.com/aquariuslt/blog/commit/6c4b05d))



# [5.0.0-beta.2](https://github.com/aquariuslt/blog/compare/c33498e...v5.0.0-beta.2) (2019-04-05)


### Features

* add `serve:prod` gulp task to serve production assets file for local testing ([c33498e](https://github.com/aquariuslt/blog/commit/c33498e))
* **@blog/schemas:** add core type definitions ([08dbb4c](https://github.com/aquariuslt/blog/commit/08dbb4c))
* add module `markdown-it-toc` ([e17e6b0](https://github.com/aquariuslt/blog/commit/e17e6b0))
* add module: @blog/api-generator ([28780ed](https://github.com/aquariuslt/blog/commit/28780ed))
* **markdown:** add @utils/markdown-it-plugins for parsing images ([95b5fe7](https://github.com/aquariuslt/blog/commit/95b5fe7))
* **markdown:** add plugins: @utils/markdown-it-summary ([2ead7d9](https://github.com/aquariuslt/blog/commit/2ead7d9))
* **markdown-it-context:** add token update basic tests ([aa4efdf](https://github.com/aquariuslt/blog/commit/aa4efdf))
* **markdown-it-metadata:** add metadata plugins ([65eae8c](https://github.com/aquariuslt/blog/commit/65eae8c))
* **tasks:** add ip-util to get lan ip like vue-cli/create-react-app ([a1a5f37](https://github.com/aquariuslt/blog/commit/a1a5f37))



