'use client';

import '@/app/global.css';
import '@/locales';
import NOTIFY from '@/lib/notify';
import {
  queryClient,
  queryModifyTimes,
  refreshBranches,
  refreshChanges,
  refreshFiles,
  refreshTags,
} from '@/lib/query';
import { cn } from '@/lib/utils';
import { DragDropContext } from '@hello-pangea/dnd';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { attachConsole } from '@tauri-apps/plugin-log';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

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
          'max-h-screen bg-background font-sans text-foreground antialiased',
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
  const { error, data } = queryModifyTimes();
  if (error) {
    NOTIFY.error(error.message);
  }

  useEffect(() => {
    refreshBranches();
    refreshTags();
    refreshFiles();
    refreshChanges();
  }, [data]);

  return <></>;
}
