import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import * as en_US from "./locales/en_US/translation.json";
import * as zh_CN from "./locales/zh_CN/translation.json";

const resources = {
    en_US: {
        translation: en_US,
    },
    zh_CN: {
        translation: zh_CN,
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: "en_US",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
