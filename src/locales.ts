import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./locales/en/translation.json";
import * as cn from "./locales/cn/translation.json";

const resources = {
	cn: {
		translation: cn,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
