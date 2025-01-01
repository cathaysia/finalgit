import '@/assets/global.css';
import { queryClient } from '@/hooks/query';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, StoryFn } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import nextIntl from './next-intl';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
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
  initialGlobals: {
    locale: 'en',
    locales: {
      en: 'English',
      cn: '简体中文',
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextIntl,
  },
  tags: ['autodocs'],
};

export default preview;
