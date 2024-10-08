import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

import '@/app/global.css';
import '@/locales';
import NOTIFY from '@/lib/notify';
import {
  refreshBranches,
  refreshChanges,
  refreshFiles,
  refreshStashList,
  refreshTags,
  useModifyTimes,
} from '@/lib/query';
import { attachConsole } from '@tauri-apps/plugin-log';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
        })),
      );

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

  return (
    <>
      <App />
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  );
}

function App() {
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
