'use client';

import { useAppState } from '@/lib/state';
import ControlPanel from '@/stories/panels/ControlPanel';

export default function MainLayout({
  children,
  branch,
  commit,
  diffview,
}: Readonly<{
  children: React.ReactNode;
  branch: React.ReactNode;
  commit: React.ReactNode;
  diffview: React.ReactNode;
}>) {
  const [isDiffview] = useAppState(s => [s.isDiffView]);
  return (
    <div className="grid h-screen w-screen grid-cols-4 gap-2 p-2">
      {!isDiffview && <ControlPanel className="h-full" />}
      {branch}
      {!isDiffview && commit}
      {isDiffview && diffview}
      {children}
    </div>
  );
}
