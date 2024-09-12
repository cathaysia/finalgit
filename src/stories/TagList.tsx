import { TagInfo } from "@/bindings";
import { cn } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { Tag } from "./Tag";

export interface TagListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
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
        <div
            ref={parentRef}
            className={cn(className)}
            style={{
                overflow: "auto",
            }}
            {...props}
        >
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                }}
                className="w-full relative"
            >
                {rowVirtualizer.getVirtualItems().map((virtualItem) => {
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
    );
}
