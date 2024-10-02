'use client';

import '@/app/global.css';
import '@/locales';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { attachConsole } from '@tauri-apps/plugin-log';
import { trace } from '@tauri-apps/plugin-log';
import NOTIFY from '@/lib/notify';
import { commands } from '@/bindings';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { match } from 'ts-pattern';
import { useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

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
      <body
        className={cn(
          'bg-white dark:bg-zinc-950 text-slate-500 dark:text-slate-400 max-h-screen antialiased font-sans',
        )}
      >
        <ThemeProvider
          defaultTheme="dark"
          storageKey="vite-ui-theme"
          attribute="class"
        >
          <QueryClientProvider client={queryClient}>
            <App />
            {children}
            <Toaster richColors position="top-right" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function App() {
  const repoPath = useAppState(s => s.repoPath);
  const [setBranchListener, setStageListener] = useRefreshRequest(s => [
    s.setBranchListener,
    s.setStageListener,
  ]);

  useQuery({
    queryKey: ['.git/logs/HEAD'],
    queryFn: async () => {
      if (!repoPath) {
        return 0;
      }
      const res = await commands?.getHeadModifyTime(repoPath);
      match(res)
        .with({ status: 'ok' }, v => {
          setBranchListener(v.data);
          setStageListener(v.data);
          trace(`refreshTime: ${v.data}`);
          return v.data;
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });

      return 0;
    },
    retry: false,
    refetchInterval: 1000,
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: true,
  });

  return <></>;
}
