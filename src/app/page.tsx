'use client';
import '@/assets/global.css';

import { Skeleton } from '@/components/ui/skeleton';
import { useAppStore } from '@/hooks/use-store';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ThemeProvider } from 'next-themes';

export default function Page() {
  const [lang, setLang] = useState<string | null>(null);

  const [isHydrated, storeLang] = useAppStore(s => [s.isHydrated, s.lang]);

  useEffect(() => {
    if (isHydrated) {
      setLang(storeLang);
    }
  }, [isHydrated]);

  if (lang) {
    redirect(`/${lang}`);
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen w-screen">
        <ThemeProvider
          defaultTheme="system"
          storageKey="next-themes"
          enableSystem
          attribute="class"
        >
          <div className="grid h-full w-full grid-cols-4 gap-2 p-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
