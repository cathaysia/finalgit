import '@/assets/global.css';
import { queryClient } from '@/hooks/use-query';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import nextIntl from './next-intl';

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
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    Story => {
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
