import { TagInfo } from "@/bindings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaTag } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export interface TagProps {
    info: TagInfo;
    filter?: string;
    className?: string;
}
export function Tag({ info, filter, className }: TagProps) {
    const { t, i18n } = useTranslation();
    return (
        <div
            className={cn(
                "w-full flex justify-between border rounded-none px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2",
                className,
            )}
        >
            <span className="text-sm font-medium leading-none items-center flex gap-2">
                <FaTag className="inline-block" />
                {(() => {
                    console.log(filter);
                    if (!filter) {
                        return <span>{info.name}</span>;
                    }
                    let v = info.name.replace(
                        filter,
                        `<span class="bg-yellow-300 dark:bg-yellow-500">${filter}</span>`,
                    );
                    return (
                        <span dangerouslySetInnerHTML={{ __html: v }}></span>
                    );
                })()}
                <Badge>{info.commit.slice(0, 6)}</Badge>
            </span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size="sm">
                        <DotsHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <MdDelete className="text-red-600 mr-2 h-4 w-4" />
                            <span>{t("tag.delete")}</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
