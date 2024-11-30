import { useAppState } from '@/hooks/state';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

import '@/locales';
import { commands } from '@/bindings';
import { TanStackRouterDevtools } from '@/components/devtools/router-devtools';
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

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <RootLayout />
      <TanStackRouterDevtools />
    </React.Fragment>
  ),
});

export default function RootLayout() {
  if (typeof window !== 'undefined') {
    attachConsole();
  }

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

  return (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  );
}
