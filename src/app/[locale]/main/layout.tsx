'use client';
import { DragDropProvider } from '@dnd-kit/react';
import React from 'react';

const WindowsControl =
  process.platform === 'win32'
    ? React.lazy(() =>
        import('./ui/windows-control').then(res => ({
          default: res.WindowsControl,
        })),
      )
    : () => null;

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
      <WindowsControl />
      <DragDropProvider>
        {control}
        {mainpanel}
        {commit}
      </DragDropProvider>
    </div>
  );
}
