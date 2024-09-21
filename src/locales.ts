import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import * as enUs from './locales/en_US/translation.json';
import * as zhCn from './locales/zh_CN/translation.json';

const resources = {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    en_US: {
        translation: enUs,
    },
    // biome-ignore lint/style/useNamingConvention: <explanation>
    zh_CN: {
        translation: zhCn,
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: 'en_US',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
