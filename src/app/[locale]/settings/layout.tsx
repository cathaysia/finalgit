'use client';
import Panel from '@/app/[locale]/settings/ui/panel';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen" data-tauri-drag-region={true}>
      <Panel className="h-screen w-1/6 min-w-36 border-r" />
      <ScrollArea className="h-full grow" data-tauri-drag-region={true}>
        <div className="m-2 flex grow flex-col items-center">
          <div
            className="flex w-1/2 flex-col items-center gap-4"
            data-tauri-drag-region={true}
          >
            {children}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
