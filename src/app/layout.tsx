'use client';

import '@/app/global.css';
import '@/locales';
import { commands } from '@/bindings';
import NOTIFY from '@/lib/notify';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { cn } from '@/lib/utils';
import { DragDropContext } from '@hello-pangea/dnd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { attachConsole } from '@tauri-apps/plugin-log';
import { trace } from '@tauri-apps/plugin-log';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { match } from 'ts-pattern';

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
          'max-h-screen bg-white font-sans text-slate-500 antialiased dark:bg-zinc-950 dark:text-slate-400',
        )}
      >
        <ThemeProvider
          defaultTheme="dark"
          storageKey="vite-ui-theme"
          attribute="class"
        >
          <DragDropContext
            onDragEnd={() => {
              console.log('drag end');
            }}
          >
            <QueryClientProvider client={queryClient}>
              <App />
              {children}
              <Toaster richColors position="top-right" />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </DragDropContext>
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
