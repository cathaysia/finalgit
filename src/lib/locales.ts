import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// biome-ignore lint/style/useNamingConvention: <explanation>
import * as en_US from '@/locales/en_US/translation.json';
// biome-ignore lint/style/useNamingConvention: <explanation>
import * as zh_CN from '@/locales/zh_CN/translation.json';

const resources = {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  en_US: {
    translation: en_US,
  },
  // biome-ignore lint/style/useNamingConvention: <explanation>
  zh_CN: {
    translation: zh_CN,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en_US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
