import { attachConsole } from '@tauri-apps/plugin-log';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource-variable/fira-code';

import '@/assets/global.css';
import { TanStackQueryDevtools } from '@/components/devtools/query-devtools';
import { Toaster } from '@/components/ui/sonner';
import RebaseCard from '@/stories/rebase/rebase-card';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from 'next-themes';
import { App } from './ui/app';
import { MuiThemeProvider } from './ui/mui/mui-theme-provider';
import { QueryProvider } from './ui/query-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== 'undefined') {
    attachConsole();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen max-h-screen w-screen max-w-screen select-none bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          defaultTheme="system"
          storageKey="next-themes"
          enableSystem
          attribute="class"
        >
          <MuiThemeProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <QueryProvider>
                <App />
                {children}
                <Toaster richColors position="top-right" />
                <RebaseCard />
                <TanStackQueryDevtools />
              </QueryProvider>
            </AppRouterCacheProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
