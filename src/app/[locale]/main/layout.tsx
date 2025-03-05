'use client';
import { DragDropProvider } from '@dnd-kit/react';

export default function Layout({
  side,
  workspace,
  history,
}: Readonly<{
  side: React.ReactNode;
  workspace: React.ReactNode;
  history: React.ReactNode;
}>) {
  return (
    <div
      className="grid h-screen w-screen grid-cols-4 gap-2 p-2"
      data-tauri-drag-region
    >
      <DragDropProvider>
        {side}
        {workspace}
        {history}
      </DragDropProvider>
    </div>
  );
}
