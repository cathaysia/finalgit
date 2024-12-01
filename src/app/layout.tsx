'use client';

import { useAppState } from '@/hooks/state';

import '@/locales';
import { commands } from '@/bindings';
import {
  refreshBranches,
  refreshChanges,
  refreshFiles,
  refreshStashList,
  refreshTags,
  useModifyTimes,
} from '@/hooks/query';
import NOTIFY from '@/lib/notify';
import i18n from '@/locales';
import { attachConsole } from '@tauri-apps/plugin-log';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource-variable/fira-code';
import '@/locales';
import '@/assets/global.css';
// import 'virtual:svg-icons-register';

import { queryClient } from '@/hooks/query';

import { TanStackQueryDevtools } from '@/components/devtools/query-devtools';
import RebaseCard from '@/stories/rebase/rebase-card';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(
  () => import('next-themes').then(e => e.ThemeProvider),
  {
    ssr: false,
  },
);
const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== 'undefined') {
    attachConsole();
  }

  return (
    <html lang="en">
      <body className="max-h-screen select-none bg-background font-sans text-foreground antialiased">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider
            defaultTheme="dark"
            storageKey="next-themes"
            attribute="class"
          >
            <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{ persister }}
            >
              <App />
              {children}
              <Toaster richColors position="top-right" />
              <RebaseCard />
              <TanStackQueryDevtools />
            </PersistQueryClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

function App() {
  const [setRepoPath, lang] = useAppState(s => [s.setRepoPath, s.lang]);

  useEffect(() => {
    i18n.changeLanguage(lang);
    commands.takeRepoPath().then(v => {
      if (!v) {
        return;
      }
      setRepoPath(v);
    });
  });

  const { error, data } = useModifyTimes();
  if (error) {
    NOTIFY.error(error.message);
  }

  useEffect(() => {
    refreshBranches();
    refreshTags();
    refreshFiles();
    refreshChanges();
    refreshStashList();
  }, [data]);
  return <></>;
}
