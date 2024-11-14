import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource-variable/fira-code';
import '@/locales';
import '@/assets/global.css';

import { queryClient } from '@/hooks/query';
import { routeTree } from '@/routeTree.gen';
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import reactDom from 'react-dom/client';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const rootElement = document.getElementById('root') as HTMLElement;
const root = reactDom.createRoot(rootElement);

const theme = createTheme({
  components: {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    // biome-ignore lint/style/useNamingConvention: <explanation>
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    // biome-ignore lint/style/useNamingConvention: <explanation>
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
      attribute="class"
    >
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </PersistQueryClientProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
