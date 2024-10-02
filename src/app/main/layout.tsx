'use client';

import ControlPanel from '@/stories/panels/ControlPanel';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-2 w-screen h-screen">
      <ControlPanel className="w-1/4 h-full" />
      {children}
    </div>
  );
}
