'use client';
import Panel from '@/app/[locale]/settings/ui/panel';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="relative flex h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_hsl(var(--secondary)/0.6),_transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,_hsl(var(--secondary)/0.15),_transparent_70%)]"
      data-tauri-drag-region={true}
    >
      <div className="-left-24 -top-24 pointer-events-none absolute h-64 w-64 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.25),_transparent_70%)] blur-2xl" />
      <div className="-bottom-32 pointer-events-none absolute right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_bottom,_hsl(var(--accent)/0.35),_transparent_70%)] blur-3xl" />
      <Panel className="h-screen w-72 min-w-56 border-r bg-background/75 backdrop-blur" />
      <ScrollArea className="h-full grow" data-tauri-drag-region={true}>
        <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-6 px-6 py-6">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
