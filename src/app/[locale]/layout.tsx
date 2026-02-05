import { attachConsole } from '@tauri-apps/plugin-log';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource-variable/fira-code';
import '@fontsource/material-icons';

import '@/assets/global.css';
import { TanStackQueryDevtools } from '@/components/devtools/query-devtools';
import { Toaster } from '@/components/ui/sonner';
import CherryPickCard from '@/ui/cherry-pick/cherry-pick-card';
import RebaseCard from '@/ui/rebase/rebase-card';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from 'next-themes';
import { App } from './ui/app';
import { MuiThemeProvider } from './ui/mui/mui-theme-provider';
import { QueryProvider } from './ui/query-provider';

import type { Langs } from '@/i18n';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  if (typeof window !== 'undefined') {
    attachConsole();
  }
  const locale = (await params).locale;
  setRequestLocale(locale);
  if (!routing.locales.includes(locale as Langs)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="h-screen max-h-screen w-screen max-w-screen select-none bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
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
                  <CherryPickCard />
                  <RebaseCard />
                  <TanStackQueryDevtools />
                </QueryProvider>
              </AppRouterCacheProvider>
            </MuiThemeProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
