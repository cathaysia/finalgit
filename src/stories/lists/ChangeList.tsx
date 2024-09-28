import { commands, type FileStatus } from '@/bindings';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import Commiter from '../atoms/Commiter';
import { useAppState, useRefreshRequest } from '@/lib/state';
import ChangeItem from '../atoms/ChangeItem';
import { match } from 'ts-pattern';
import type { CheckedState } from '@radix-ui/react-checkbox';
import NOTIFY from '@/lib/notify';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ScrollBar } from '@/components/ui/scroll-area';
import GitFileStatus from '@/lib/file_status';
import { Checkbox } from '@/components/ui/checkbox';

export interface ChangeListProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  changeSet: FileStatus[];
}

export default function ChangeList({ className, changeSet }: ChangeListProps) {
  const repoPath = useAppState(s => s.repoPath);
  const refreshStage = useRefreshRequest(s => s.refreshStage);

  async function handleCheckedChange(e: CheckedState, item: FileStatus) {
    if (!repoPath) {
      return;
    }
    if (e === true) {
      const v = await commands?.addToStage(repoPath, [item.path]);
      match(v)
        .with({ status: 'ok' }, () => {
          refreshStage();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    }
    if (e === false) {
      const v = await commands?.removeFromStage(repoPath, [item.path]);
      match(v)
        .with({ status: 'ok' }, () => {
          refreshStage();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    }
  }

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: changeSet.length,
    getScrollElement: () => parentRef.current || null,
    estimateSize: () => 35,
  });

  const allChecked = useMemo(() => {
    const hasUnIndexed =
      changeSet.find(item => !GitFileStatus.isIndexed(item.status)) !==
      undefined;
    const hasIndexed =
      changeSet.find(item => GitFileStatus.isIndexed(item.status)) !==
      undefined;

    if (hasUnIndexed && hasIndexed) {
      return 'indeterminate';
    }

    return !hasUnIndexed;
  }, [changeSet]);

  async function toggleAllChecked() {
    if (!repoPath) {
      return;
    }
    const allFiles = changeSet.map(item => item.path);
    if (allChecked) {
      const res = await commands.removeFromStage(repoPath, allFiles);
      match(res)
        .with({ status: 'ok' }, () => {
          refreshStage();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    } else {
      const res = await commands.addToStage(repoPath, allFiles);
      match(res)
        .with({ status: 'ok' }, () => {
          refreshStage();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="grow flex flex-col gap-2">
        <ScrollAreaPrimitive.Root
          className={cn('relative overflow-hidden', className)}
        >
          <div className="w-full flex">
            <Checkbox
              checked={allChecked}
              onCheckedChange={toggleAllChecked}
              hidden={changeSet.length === 0}
            />
          </div>
          <ScrollAreaPrimitive.Viewport
            ref={parentRef}
            className="h-full w-full rounded-[inherit]"
            style={{
              maxHeight: '60vh',
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
              }}
              className="w-full relative"
            >
              {rowVirtualizer.getVirtualItems().map(virtualItem => {
                const item = changeSet[virtualItem.index];

                return (
                  <div
                    key={virtualItem.key}
                    className={'absolute top-0 left-0 w-full'}
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <ChangeItem
                      key={item.path}
                      item={{
                        path: item.path,
                        status: item.status,
                      }}
                      onCheckedChange={async state =>
                        handleCheckedChange(state, item)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollBar />
          <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
      </div>
      <Separator />
      <Commiter changeSet={changeSet} />
    </div>
  );
}
