'use client';

import { commands } from '@/bindings';
import { useBranches } from '@/hooks/use-query';
import {
  COMMIT_HEAD_PANEL_ID,
  type CommitPanelState,
  useAppStore,
} from '@/hooks/use-store';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import CommitPanel from '@/ui/commit/commit-panel';
import CommitPanelPlaceholder from '@/ui/commit/commit-panel-placeholder';
import { useDragOperation, useDraggable, useDroppable } from '@dnd-kit/react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import { isMatching } from 'ts-pattern';

export default function Commit() {
  const [
    repoPath,
    commitHead,
    setCommitHead,
    commitPanels,
    commitPanelOrder,
    setCommitPanelOrder,
    removeCommitPanel,
  ] = useAppStore(s => [
    s.repoPath,
    s.commitHead,
    s.setCommitHead,
    s.commitPanels,
    s.commitPanelOrder,
    s.setCommitPanelOrder,
    s.removeCommitPanel,
  ]);
  const t = useTranslations();
  const { error: branchErr, data: branches } = useBranches();
  if (branchErr) {
    NOTIFY.error(branchErr.message);
  }

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    commands.repoGetHead(repoPath).then(v => {
      if (isMatching({ status: 'ok' }, v)) {
        setCommitHead(v.data.oid);
      }
    });
  }, [repoPath]);

  const dragOperation = useDragOperation();
  const dragSourceType = (
    dragOperation?.source?.data as { type?: string } | undefined
  )?.type;
  const isBranchDragging = dragSourceType === 'branch';
  const isPanelDragging = dragSourceType === 'panel';
  const { ref: dropRef, isDropTarget } = useDroppable({
    id: 'commit-panel-drop',
    data: { type: 'commit-panel-drop' },
    disabled: !isBranchDragging,
  });
  const showTodoPanel = isBranchDragging && isDropTarget;

  useEffect(() => {
    const ids = new Set(commitPanels.map(item => item.id));
    const next = commitPanelOrder.filter(id => {
      if (id === COMMIT_HEAD_PANEL_ID) {
        return !!commitHead;
      }
      return ids.has(id);
    });
    let insertAt = next.indexOf(COMMIT_HEAD_PANEL_ID);
    if (commitHead && insertAt === -1) {
      next.push(COMMIT_HEAD_PANEL_ID);
      insertAt = next.length - 1;
    }
    for (const panel of commitPanels) {
      if (!next.includes(panel.id)) {
        if (insertAt === -1) {
          next.push(panel.id);
        } else {
          next.splice(insertAt, 0, panel.id);
          insertAt += 1;
        }
      }
    }
    if (next.join('|') !== commitPanelOrder.join('|')) {
      setCommitPanelOrder(next);
    }
  }, [commitHead, commitPanels, commitPanelOrder, setCommitPanelOrder]);

  const headBranch =
    branches?.find(item => item.kind === 'Local' && item.oid === commitHead) ||
    branches?.find(item => item.is_head);
  const primaryTitle = headBranch?.name || t('commit.head');
  const panelsById = useMemo(() => {
    return new Map(commitPanels.map(panel => [panel.id, panel]));
  }, [commitPanels]);
  const panelDisplayNames = useMemo(() => {
    const groups = new Map<string, CommitPanelState[]>();
    for (const panel of commitPanels) {
      const key = panel.baseName || panel.name;
      const list = groups.get(key);
      if (list) {
        list.push(panel);
      } else {
        groups.set(key, [panel]);
      }
    }
    const display = new Map<string, string>();
    for (const [key, list] of groups) {
      if (list.length === 1) {
        display.set(list[0].id, key);
        continue;
      }
      const orderIndex = new Map<string, number>();
      commitPanelOrder.forEach((id, idx) => {
        orderIndex.set(id, idx);
      });
      const ordered = list.slice().sort((a, b) => {
        const aIdx = orderIndex.get(a.id) ?? 0;
        const bIdx = orderIndex.get(b.id) ?? 0;
        return aIdx - bIdx;
      });
      ordered.forEach((panel, idx) => {
        display.set(panel.id, `${key}@${idx + 1}`);
      });
    }
    return display;
  }, [commitPanels, commitPanelOrder]);
  const orderedPanels = useMemo(() => {
    const items: Array<
      { type: 'head' } | { type: 'panel'; panel: CommitPanelState }
    > = [];
    for (const id of commitPanelOrder) {
      if (id === COMMIT_HEAD_PANEL_ID) {
        items.push({ type: 'head' });
        continue;
      }
      const panel = panelsById.get(id);
      if (panel) {
        items.push({ type: 'panel', panel });
      }
    }
    return items;
  }, [commitPanelOrder, panelsById]);

  if (!commitHead && commitPanels.length === 0) {
    return <></>;
  }

  return (
    <div
      className="col-span-2 flex h-full flex-col gap-2 overflow-hidden"
      ref={dropRef}
    >
      <div className={cn('relative flex h-full gap-2 overflow-x-auto pb-2')}>
        {isBranchDragging && (
          <div
            className={cn(
              'pointer-events-none absolute inset-1 rounded border-2 border-dashed',
              isDropTarget
                ? 'border-blue-500 bg-blue-200/60 dark:border-blue-400 dark:bg-blue-900/50'
                : 'border-muted-foreground/50 bg-sky-100/50 dark:bg-blue-950/40',
            )}
          />
        )}
        {showTodoPanel && <CommitPanelPlaceholder />}
        {orderedPanels.map(item => {
          if (item.type === 'head') {
            if (!commitHead) {
              return null;
            }
            return (
              <PanelWrapper
                key={COMMIT_HEAD_PANEL_ID}
                panelId={COMMIT_HEAD_PANEL_ID}
                enableDrop={isPanelDragging}
              >
                <CommitPanel
                  title={primaryTitle}
                  subtitle={commitHead.slice(0, 6)}
                  commit={commitHead}
                  isPrimary
                  targetBranch={headBranch}
                />
              </PanelWrapper>
            );
          }
          const panel = item.panel;
          const displayName = panelDisplayNames.get(panel.id) || panel.name;
          return (
            <PanelWrapper
              key={panel.id}
              panelId={panel.id}
              enableDrop={isPanelDragging}
            >
              <CommitPanel
                title={displayName}
                subtitle={panel.oid.slice(0, 6)}
                commit={panel.oid}
                onClose={() => removeCommitPanel(panel.id)}
              />
            </PanelWrapper>
          );
        })}
      </div>
    </div>
  );
}

function PanelWrapper({
  panelId,
  children,
  enableDrop,
}: {
  panelId: string;
  children: React.ReactNode;
  enableDrop: boolean;
}) {
  const { ref: dragRef, isDragSource } = useDraggable({
    id: `panel:${panelId}`,
    data: { type: 'panel', panelId },
  });
  const { ref: dropRef, isDropTarget } = useDroppable({
    id: `panel-drop:${panelId}`,
    data: { type: 'panel-drop', panelId },
    disabled: !enableDrop,
  });
  const setRefs = (element: HTMLDivElement | null) => {
    dragRef(element);
    dropRef(element);
  };

  return (
    <motion.div
      layout
      ref={setRefs}
      className={cn(
        'transition-opacity',
        isDragSource && 'opacity-70',
        isDropTarget && 'ring-2 ring-primary/40',
      )}
    >
      {children}
    </motion.div>
  );
}
