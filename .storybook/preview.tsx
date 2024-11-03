import '@/assets/global.css';
import { queryClient } from '@/hooks/query';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, StoryFn } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { withI18next } from './i18n';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
  withI18next,
  (Story: StoryFn) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    );
  },
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
  tags: ['autodocs'],
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en_US', title: 'English' },
        { value: 'zh_CN', title: '简体中文' },
      ],
      showName: true,
    },
  },
};

export default preview;
