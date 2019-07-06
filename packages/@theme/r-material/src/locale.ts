import i18n from 'i18next';

import * as en from './i18n/base.en.properties';
import * as zh from './i18n/base.zh.properties';
import { initReactI18next } from 'react-i18next';

const toTranslation = (resource) => ({ translation: resource });

i18n
  .use(initReactI18next)
  .init({
    lng: 'zh',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    resources: {
      zh: toTranslation(zh),
      en: toTranslation(en)
    }
  });


export default i18n;
