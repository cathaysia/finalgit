import { BranchInfo } from "@/bindings";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ScrollArea } from "@/components/ui/scroll-area";
import Branch from "./Branch";
import { cn } from "@/lib/utils";

export interface BranchListProps {
    branches: BranchInfo[];
    filter?: string;
    className?: string;
}

export default function BranchList({
    branches,
    filter,
    className,
}: BranchListProps) {
    const parentRef = React.useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: branches.length,
        getScrollElement: () => parentRef.current || null,
        estimateSize: () => 65,
    });

    return (
        <div
            ref={parentRef}
            className={cn("max-h-screen", className)}
            style={{
                overflow: "auto",
            }}
        >
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                }}
                className="w-full relative"
            >
                {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    const item = branches[virtualItem.index];

                    return (
                        <div
                            key={virtualItem.key}
                            className="absolute top-0 left-0 w-full"
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
        </div>
    );
}
