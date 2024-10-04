'use client';

import { useAppState } from '@/lib/state';
import ControlPanel from '@/stories/panels/ControlPanel';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDiffview] = useAppState(s => [s.isDiffView]);
  return (
    <div className="flex gap-2 w-screen h-screen p-2">
      {!isDiffview && <ControlPanel className="w-1/4 h-full" />}
      {children}
    </div>
  );
}
