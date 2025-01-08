import { ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';

export interface VirtualScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  count: number;
  height: number;
  getItem: (idx: number) => React.ReactElement;
}

const VirtualScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  VirtualScrollAreaProps
>(({ className, count, height, getItem, ...props }, ref) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: count,
    getScrollElement: () => parentRef.current || null,
    estimateSize: () => height,
  });

  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative overflow-hidden', className)}
      {...props}
      ref={ref}
    >
      <ScrollAreaPrimitive.Viewport
        ref={parentRef}
        className="h-full w-full rounded-[inherit]"
        data-tauri-drag-region
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          className="relative w-full"
        >
          {rowVirtualizer.getVirtualItems().map(item => {
            return (
              <div
                key={item.key}
                className={'absolute left-0 w-full'}
                style={{
                  height: `${item.size}px`,
                  top: item.start,
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
});

export default VirtualScrollArea;
