import '@/app/global.css';
import { queryClient } from '@/lib/query';
import { DragDropContext } from '@hello-pangea/dnd';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { withI18next } from './i18n.tsx';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
  withI18next,
  (Story, _) => {
    return (
      <DragDropContext>
        <QueryClientProvider client={queryClient}>
          <Story />
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      </DragDropContext>
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
