import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as zh from '../../../../i18n/base.zh.properties';
import * as en from '../../../../i18n/base.en.properties';

const toTranslation = (resource) => ({ translation: resource });

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false // not needed for react!!
    },
    resources: {
      zh: toTranslation(zh),
      en: toTranslation(en)
    }
  })
  .then();

export default i18n;
