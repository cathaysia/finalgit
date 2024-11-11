import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource-variable/fira-code';
import '@/locales';
import '@/assets/global.css';

import { queryClient } from '@/hooks/query';
import { routeTree } from '@/routeTree.gen';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
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

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider
    defaultTheme="dark"
    storageKey="vite-ui-theme"
    attribute="class"
  >
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  </ThemeProvider>,
);
