'use client';

import { useAppState } from '@/lib/state';
import ControlPanel from '@/stories/panels/ControlPanel';
import { DragDropContext } from '@hello-pangea/dnd';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDiffview] = useAppState(s => [s.isDiffView]);
  return (
    <DragDropContext
      onDragEnd={() => {
        console.log('drag end');
      }}
    >
      <div className="flex gap-2 w-screen h-screen p-2">
        {!isDiffview && <ControlPanel className="w-1/4 h-full" />}
        {children}
      </div>
    </DragDropContext>
  );
}
