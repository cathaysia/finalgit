import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { FaCodeBranch, FaInfo, FaInfoCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { BranchInfo } from "@/bindings";

export interface BranchProps {
    info: BranchInfo;
    filter?: string;
    className?: string;
    on_rename?: (name: string) => void;
    on_delete?: () => void;
}

export default function Branch({
    info,
    filter,
    className,
    on_rename,
    on_delete,
}: BranchProps) {
    const { t, i18n } = useTranslation();
    const [newName, setNewName] = useState<string>();
    const is_head = info.is_head;
    const branch = info.name;
    const upstream = info.remote;
    const is_local = info.kind == "Local";

    return (
        <div
            className={cn(
                "w-full flex justify-between border rounded-none px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2",
                is_head && "border-green-600",
                className,
            )}
        >
            {!newName ? (
                <span className="text-sm font-medium leading-none items-center flex gap-2">
                    <FaCodeBranch className="inline-block" />
                    {(() => {
                        console.log(filter);
                        if (!filter) {
                            return <span>{branch}</span>;
                        }
                        let v = branch.replace(
                            filter,
                            `<span class="bg-yellow-300 dark:bg-yellow-500">${filter}</span>`,
                        );
                        return (
                            <span
                                dangerouslySetInnerHTML={{ __html: v }}
                            ></span>
                        );
                    })()}
                    <Badge>{is_local ? t("Local") : t("Remote")}</Badge>
                    {upstream && <Badge>{upstream}</Badge>}
                </span>
            ) : (
                <div className="w-full">
                    <Input
                        type="text"
                        autoFocus
                        value={newName}
                        onChange={(v) => setNewName(v.target.value)}
                        onKeyUp={(e) => {
                            if (newName && e.key == "Escape") {
                                setNewName(undefined);
                            }
                            if (newName && e.key == "Enter") {
                                on_rename && on_rename(newName);
                                setNewName(undefined);
                            }
                        }}
                    />
                </div>
            )}
            <div>
                {!newName ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size="sm">
                                <DotsHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() => setNewName(branch)}
                                >
                                    {t("Rename")}
                                </DropdownMenuItem>
                                {!is_head && (
                                    <DropdownMenuItem>
                                        {t("Checkout")}
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                    {t("Details")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    {t("Set upstream")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>{t("Pull")}</DropdownMenuItem>
                                <DropdownMenuItem>{t("Push")}</DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => {
                                        on_delete && on_delete();
                                    }}
                                >
                                    {t("Delete")}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                on_rename && on_rename(newName);
                            }}
                        >
                            {t("Enter")}
                        </Button>
                        <Button
                            onClick={() => setNewName(undefined)}
                            variant={"outline"}
                        >
                            {t("Cancel")}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
