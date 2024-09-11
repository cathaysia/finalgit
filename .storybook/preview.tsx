import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "@/main.css";
import { withI18next } from "./i18n.tsx";

export const decorators = [
    withThemeByClassName({
        themes: {
            light: "light",
            dark: "dark",
        },
        defaultTheme: "light",
    }),
    withI18next,
];
const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export const globalTypes = {
    locale: {
        name: "Locale",
        description: "Internationalization locale",
        toolbar: {
            icon: "globe",
            items: [
                { value: "en_US", title: "English" },
                { value: "zh_CN", title: "简体中文" },
            ],
            showName: true,
        },
    },
};

export default preview;
