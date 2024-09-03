import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as zh_CN from "./i18n/zh_CN.json";

const resources = {
	zh_CN: {
		translation: zh_CN,
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
