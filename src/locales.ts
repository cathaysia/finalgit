import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as zh_CN from "./locales/zh_CN/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
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
