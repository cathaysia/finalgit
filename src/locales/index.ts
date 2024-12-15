import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUsLicenseCard from './en_US/license-card.json';
import enUs from './en_US/translation.json';
import zhCnLicenseCard from './zh_CN/license-card.json';
import zhCn from './zh_CN/translation.json';

const resources = {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  en_US: {
    translation: enUs,
    'license-card': enUsLicenseCard,
  },
  // biome-ignore lint/style/useNamingConvention: <explanation>
  zh_CN: {
    translation: zhCn,
    'license-card': zhCnLicenseCard,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en_US',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
