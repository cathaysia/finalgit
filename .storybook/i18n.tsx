import i18n from "../src/locales.ts";
import React from "react";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

export function withI18next(Story, context) {
    const { locale } = context.globals;

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale]);

    return (
        <I18nextProvider i18n={i18n}>
            <Story />
        </I18nextProvider>
    );
}
