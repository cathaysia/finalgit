import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as zh_CN from "./locales/zh_CN/translation.json";
import * as en_US from "./locales/en_US/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

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
