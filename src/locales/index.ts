import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export enum Language {
  EnUs = 'en_US',
  ZhCn = 'zh_CN',
}

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    lng: Language.EnUs,
    fallbackLng: Language.EnUs,
    supportedLngs: [Language.EnUs, Language.ZhCn],
    load: 'currentOnly',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
