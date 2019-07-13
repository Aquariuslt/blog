import i18n from 'i18next';

import * as en from './i18n/base.en.properties';
import * as zh from './i18n/base.zh.properties';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const toTranslation = (resource) => ({ translation: resource });

const detectorOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage'],

  // keys or params to lookup language from
  lookupQuerystring: 'lang',
  lookupCookie: 'locale',
  lookupLocalStorage: 'locale',

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'zh',
    fallbackLng: 'zh',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false
    },
    resources: {
      zh: toTranslation(zh),
      en: toTranslation(en)
    },
    detection: detectorOptions
  })
  .then();

export default i18n;
