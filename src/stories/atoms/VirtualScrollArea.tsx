import { cn } from '@/lib/utils';
import { ScrollBar } from '@/components/ui/scroll-area';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';

export interface VirtualScrollAreaProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  count: number;
  height: number;
  getItem: (idx: number) => React.ReactElement;
}

export default function VirtualScrollArea({
  className,
  count,
  height,
  getItem,
}: VirtualScrollAreaProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: count,
    getScrollElement: () => parentRef.current || null,
    estimateSize: () => height,
  });

  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative overflow-hidden', className)}
    >
      <ScrollAreaPrimitive.Viewport
        ref={parentRef}
        className="h-full w-full rounded-[inherit]"
        data-tauri-drag-region={true}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          className="w-full relative"
        >
          {rowVirtualizer.getVirtualItems().map(item => {
            return (
              <div
                key={item.key}
                className={'absolute top-0 left-0 w-full'}
                style={{
                  height: `${item.size}px`,
                  transform: `translateY(${item.start}px)`,
                }}
              >
                {getItem(item.index)}
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
