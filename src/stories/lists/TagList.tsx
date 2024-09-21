import type { TagInfo } from '@/bindings';
import { ScrollBar } from '@/components/ui/scroll-area';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
import { Tag } from '@/stories/atoms/Tag';

export interface TagListProps
    extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    tags: TagInfo[];
    filter?: string;
}

export function TagList({ tags, filter, className, ...props }: TagListProps) {
    const parentRef = React.useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: tags.length,
        getScrollElement: () => parentRef.current || null,
        estimateSize: () => 60,
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
                    ref={parentRef}
                    className={cn(className)}
                    style={{
                        overflow: 'auto',
                    }}
                    {...props}
                >
                    <div
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                        }}
                        className="w-full relative"
                    >
                        {rowVirtualizer.getVirtualItems().map(virtualItem => {
                            const item = tags[virtualItem.index];

                            return (
                                <div
                                    key={virtualItem.key}
                                    className="absolute top-0 left-0 w-full"
                                    style={{
                                        height: `${virtualItem.size}px`,
                                        transform: `translateY(${virtualItem.start}px)`,
                                    }}
                                >
                                    <Tag info={item} filter={filter} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}
