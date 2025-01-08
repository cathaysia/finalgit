import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen" data-tauri-drag-region>
      <Suspense fallback={<Skeleton className="h-screen w-screen" />}>
        {children}
      </Suspense>
    </div>
  );
}
