'use client';
import '@/app/global.css';
import '@/locales';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorSonner from '@/stories/ErrorSonner';

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-white dark:bg-zinc-950 text-slate-500 dark:text-slate-400 max-h-screen overflow-scroll antialiased">
                <ThemeProvider
                    defaultTheme="dark"
                    storageKey="vite-ui-theme"
                    attribute="class"
                >
                    <QueryClientProvider client={queryClient}>
                        <div>{children}</div>
                        <ErrorSonner />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
