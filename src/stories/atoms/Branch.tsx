import { commands, type BranchInfo } from "@/bindings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useErrorState } from "@/lib/error";
import { useAppState, useRefreshRequest } from "@/lib/state";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCodeBranch } from "react-icons/fa";
import { match } from "ts-pattern";
import BranchRename from "./BranchRename";
import { Label } from "@/components/ui/label";

export interface BranchProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    info: BranchInfo;
    filter?: string;
    className?: string;
    on_rename?: (name: string) => void;
    on_delete?: () => void;
}

export default function Branch({
    info,
    filter,
    on_rename,
    on_delete,
    className,
    ...props
}: BranchProps) {
    const t = useTranslation().t;
    const [newName, setNewName] = useState<string>();
    const is_head = info.is_head;
    const branchName = info.name;
    const upstream = info.remote;
    const is_local = info.kind === "Local";
    const [repo_path, changes] = useAppState((s) => [s.repo_path, s.changes]);
    const setError = useErrorState((s) => s.setError);
    const [refreshBranch] = useRefreshRequest((s) => [s.refreshBranch]);
    const is_dirty = changes.length !== 0;

    function removeBranch() {
        if (is_local && repo_path) {
            commands.removeBranch(repo_path, info).then((v) => {
                match(v)
                    .with({ status: "ok" }, () => {
                        refreshBranch();
                    })
                    .with({ status: "error" }, (err) => {
                        setError(err.error);
                    });
            });
        }
    }

    function checkout() {
        if (repo_path) {
            if (is_local) {
                commands.checkoutBranch(repo_path, info.name).then((v) => {
                    match(v)
                        .with({ status: "ok" }, () => {
                            refreshBranch();
                        })
                        .with({ status: "error" }, (err) => {
                            setError(err.error);
                        });
                });
            } else {
                commands.checkoutRemote(repo_path, info.name).then((v) => {
                    match(v)
                        .with({ status: "ok" }, () => {
                            refreshBranch();
                        })
                        .with({ status: "error" }, (err) => {
                            setError(err.error);
                        });
                });
            }
        }
    }

    if (newName) {
        return (
            <div
                className={cn(
                    "w-full flex justify-between border rounded-none px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2",
                    is_head && "border-green-600",
                    className,
                )}
                {...props}
            >
                <BranchRename
                    defaultValue={newName}
                    on_cancel={() => {
                        setNewName(undefined);
                    }}
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "w-full flex justify-between border rounded-none px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2",
                is_head && "border-green-600",
                className,
            )}
            {...props}
        >
            <div className="text-sm font-medium leading-none items-center flex gap-2 overflow-ellipsis overflow-x-hidden text-nowrap">
                <FaCodeBranch className="inline-block" />
                {(() => {
                    if (!filter) {
                        return <Label>{branchName}</Label>;
                    }
                    const v = branchName.replace(
                        filter,
                        `<span class="bg-yellow-300 dark:bg-yellow-500">${filter}</span>`,
                    );
                    return <Label dangerouslySetInnerHTML={{ __html: v }} />;
                })()}
                <Badge>
                    {is_local ? t("branch.local") : t("branch.remote")}
                </Badge>
                {upstream && <Badge>{upstream}</Badge>}
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} size="sm">
                            <DotsHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => setNewName(branchName)}
                            >
                                {t("branch.rename")}
                            </DropdownMenuItem>
                            {!is_head && (
                                <DropdownMenuItem
                                    disabled={is_dirty}
                                    onClick={() => {
                                        checkout();
                                    }}
                                    className={cn(
                                        !is_local &&
                                            "text-yellow-500 hover:text-yellow-500",
                                    )}
                                    title={(() => {
                                        if (is_dirty) {
                                            return t("branch.disable_dirty");
                                        }
                                        if (!is_local) {
                                            return t("branch.checkout_remote");
                                        }
                                    })()}
                                >
                                    {t("branch.checkout")}
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                                {t("branch.details")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {t("branch.set_upstream")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {t("branch.pull")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {t("branch.push")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                    removeBranch();
                                }}
                            >
                                {t("branch.delete")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
