'use client';
import Panel from '@/app/[locale]/settings/ui/panel';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen p-2" data-tauri-drag-region={true}>
      <Panel className="h-screen w-1/6 min-w-36 border-r" />
      <div
        className="m-2 flex grow flex-col items-center"
        data-tauri-drag-region={true}
      >
        <div
          className="flex w-1/2 flex-col items-center gap-4"
          data-tauri-drag-region={true}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
