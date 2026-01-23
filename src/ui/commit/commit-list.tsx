import type { CommitInfo } from '@/bindings';
import { ScrollBar } from '@/components/ui/scroll-area';
import type { BisectState } from '@/hooks/use-bisect';
import { cn } from '@/lib/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import {
  type VirtualizerOptions,
  elementScroll,
  useVirtualizer,
} from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import React from 'react';
import type VirtualScrollArea from '../atoms/virtualscroll-area';
import CommitItem from './commit-item';

export interface CommitListProps
  extends React.ComponentProps<typeof VirtualScrollArea> {
  filter?: string;
  history: CommitInfo[];
  bisectState: BisectState;
  panelId: string;
  allowReorder: boolean;
  onCherryPick?: (commit: CommitInfo) => void;
}

function easeInOutQuint(t: number) {
  // biome-ignore lint/style/noParameterAssign: <explanation>
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

export default function CommitList({
  className,
  filter,
  history,
  bisectState,
  panelId,
  allowReorder,
  onCherryPick,
  ...props
}: Omit<CommitListProps, 'count' | 'height' | 'getItem'>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollingRef = React.useRef<number>(undefined);

  // biome-ignore lint/suspicious/noExplicitAny:any
  const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] =
    React.useCallback((offset, canSmooth, instance) => {
      const duration = 1000;
      const start = parentRef.current?.scrollTop || 0;
      scrollingRef.current = Date.now();
      const startTime = scrollingRef.current;

      const run = () => {
        if (scrollingRef.current !== startTime) return;
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
        const interpolated = start + (offset - start) * progress;

        if (elapsed < duration) {
          elementScroll(interpolated, canSmooth, instance);
          requestAnimationFrame(run);
        } else {
          elementScroll(interpolated, canSmooth, instance);
        }
      };

      requestAnimationFrame(run);
    }, []);

  const rowVirtualizer = useVirtualizer({
    count: history.length,
    getScrollElement: () => parentRef.current || null,
    estimateSize: () => 75,
    scrollToFn: scrollToFn,
  });

  useEffect(() => {
    if (!bisectState.isBisecting || bisectState.firstBad) {
      return;
    }
    if (bisectState.good === null || bisectState.bad == null) {
      return;
    }
    if (bisectState.next) {
      const idx = history.findIndex(item => item.oid === bisectState.next);
      if (idx !== -1) {
        rowVirtualizer.scrollToIndex(idx);
      }
    }
  }, [bisectState.next, bisectState.firstBad]);

  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={parentRef}
        className="h-full w-full rounded-[inherit]"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          className="relative w-full"
        >
          {rowVirtualizer.getVirtualItems().map(item => {
            const v = history[item.index];
            return (
              <div
                key={item.key}
                className={'absolute left-0 w-full'}
                style={{
                  height: `${item.size}px`,
                  top: item.start,
                }}
              >
                <CommitItem
                  filter={filter}
                  commit={v}
                  panelId={panelId}
                  allowReorder={allowReorder}
                  isGood={bisectState.good === v.oid}
                  isBad={bisectState.bad === v.oid}
                  isBisecting={bisectState.isBisecting}
                  isNext={bisectState.next === v.oid}
                  onCherryPick={onCherryPick}
                />
              </div>
            );
          })}
        </div>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}
