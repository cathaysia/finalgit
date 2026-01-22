'use client';
import { useAppStore } from '@/hooks/use-store';
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
  const [addCommitPanelToStart, moveCommitPanel] = useAppStore(s => [
    s.addCommitPanelToStart,
    s.moveCommitPanel,
  ]);
  return (
    <div
      className="grid h-screen w-screen grid-cols-4 gap-2 p-2"
      data-tauri-drag-region
    >
      <DragDropProvider
        onDragEnd={(_event, manager) => {
          const source = manager?.dragOperation?.source;
          const target = manager?.dragOperation?.target;
          if (!source || !target) {
            return;
          }
          const sourceId = String(source.id || '');
          const targetId = String(target.id || '');
          if (
            sourceId.startsWith('panel:') &&
            targetId.startsWith('panel-drop:')
          ) {
            const fromId = sourceId.replace('panel:', '');
            const toId = targetId.replace('panel-drop:', '');
            if (fromId && toId) {
              moveCommitPanel(fromId, toId);
            }
            return;
          }

          if (targetId !== 'commit-panel-drop') {
            return;
          }
          const data = source.data as
            | {
                type?: string;
                panelBaseId?: string;
                panelName?: string;
                branch?: { oid: string };
              }
            | undefined;
          if (data?.type === 'branch' && data.branch) {
            addCommitPanelToStart({
              id: makePanelInstanceId(
                data.panelBaseId || `branch:${data.branch.oid}`,
              ),
              name: data.panelName || data.branch.oid.slice(0, 6),
              baseName: data.panelName || data.branch.oid.slice(0, 6),
              oid: data.branch.oid,
            });
          }
        }}
      >
        {side}
        {workspace}
        {history}
      </DragDropProvider>
    </div>
  );
}

function makePanelInstanceId(baseId: string) {
  return `${baseId}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
}
