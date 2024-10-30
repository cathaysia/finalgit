import React from 'react';
import reactDom from 'react-dom/client';
import './locales.ts';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { queryClient } from './lib/query.js';
import { routeTree } from './routeTree.gen';

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
  <React.StrictMode>
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
    </ThemeProvider>
  </React.StrictMode>,
);
