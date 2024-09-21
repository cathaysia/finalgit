import type { CommitInfo } from '@/bindings';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { ScrollBar } from '@/components/ui/scroll-area';
import Commit from '../atoms/Commit';
import { DEFAULT_STYLE } from '@/lib/style';

export interface GitHistoryProps
    extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    history: CommitInfo[];
}

export default function GitHistory({
    className,
    history,
    ...props
}: GitHistoryProps) {
    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: history.length,
        getScrollElement: () => parentRef.current || null,
        estimateSize: () => 65,
    });

    return (
        <ScrollAreaPrimitive.Root
            className={cn(
                'relative overflow-hidden rounded-lg border',
                DEFAULT_STYLE,
                className,
            )}
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
                        const item = history[virtualItem.index];

                        return (
                            <div
                                key={virtualItem.key}
                                className={'absolute top-0 left-0 w-full'}
                                style={{
                                    height: `${virtualItem.size}px`,
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            >
                                <Commit commit={item} />
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
