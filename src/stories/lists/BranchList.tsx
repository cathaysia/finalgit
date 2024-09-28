import type { BranchInfo } from '@/bindings';
import { ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
import Branch from '@/stories/atoms/Branch';

export interface BranchListProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  branches: BranchInfo[];
  filter?: string;
}

export default function BranchList({
  branches,
  filter,
  className,
  ...props
}: BranchListProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: branches.length,
    getScrollElement: () => parentRef.current || null,
    estimateSize: () => 65,
  });

  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={parentRef}
        className="h-full w-full rounded-[inherit] max-h-screen"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          className="w-full relative"
        >
          {rowVirtualizer.getVirtualItems().map(virtualItem => {
            const item = branches[virtualItem.index];

            return (
              <div
                key={virtualItem.key}
                className={'absolute top-0 left-0 w-full'}
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Branch info={item} filter={filter} />
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
