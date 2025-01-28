'use client';
import { DragDropProvider } from '@dnd-kit/react';

export default function Layout({
  control,
  mainpanel,
  commit,
}: Readonly<{
  control: React.ReactNode;
  mainpanel: React.ReactNode;
  commit: React.ReactNode;
}>) {
  return (
    <div
      className="grid h-screen w-screen grid-cols-4 gap-2 p-2"
      data-tauri-drag-region
    >
      <DragDropProvider>
        {control}
        {mainpanel}
        {commit}
      </DragDropProvider>
    </div>
  );
}
