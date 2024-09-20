import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { FaMagic } from "react-icons/fa";
import { VscDiff } from "react-icons/vsc";
import { VscGitStash } from "react-icons/vsc";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VscDiscard } from "react-icons/vsc";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
import { commands, type FileStatus } from "@/bindings";
import { useAppState, useRefreshRequest } from "@/lib/state";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";
import GitFileStatus from "@/lib/file_status";
import { debug } from "@tauri-apps/plugin-log";
import { generate_commit } from "@/lib/ai";
import { Loader2 } from "lucide-react";

export interface CommiterProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    files?: string[];
    changeSet: FileStatus[];
}

export default function Commiter({
    className,
    changeSet,
    ...props
}: CommiterProps) {
    const [isCommiting, setIsCommiting] = useState(false);
    const t = useTranslation().t;
    const repo_path = useAppState((s) => s.repo_path);
    const setError = useErrorState((s) => s.setError);
    const refreshStage = useRefreshRequest((s) => s.refreshStage);
    const [isLoading, setIsLoading] = useState(false);

    useHotkeys(
        "Escape",
        () => {
            setIsCommiting(false);
        },
        {
            preventDefault: true,
        },
    );

    const [commitMsg, setCommitMsg] = useState<string>("");

    if (!isCommiting) {
        return (
            <div className={cn("flex gap-2", className)}>
                <Button
                    className="w-full"
                    disabled={changeSet.length === 0}
                    onClick={async () => {
                        if (!repo_path) {
                            return;
                        }
                        const has_indexed = changeSet
                            .map((item) =>
                                GitFileStatus.is_indexed(item.status),
                            )
                            .reduce((l, r) => l && r);
                        if (!has_indexed) {
                            const allfiles = changeSet.map((item) => item.path);
                            const res = await commands?.addToStage(
                                repo_path,
                                allfiles,
                            );
                            match(res)
                                .with({ status: "ok" }, () => {
                                    refreshStage();
                                })
                                .with({ status: "error" }, (err) => {
                                    setError(err.error);
                                });
                        }
                        setIsCommiting(true);
                    }}
                >
                    {t("commiter.start_commit")}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                            <DotsHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={async () => {
                                    const path = await save({
                                        title: t("workspace.patch_save_path"),
                                        defaultPath: repo_path,
                                        canCreateDirectories: true,
                                    });
                                    if (path === null || !repo_path) {
                                        return;
                                    }
                                    const res =
                                        await commands?.createPatch(repo_path);
                                    match(res)
                                        .with({ status: "ok" }, async (v) => {
                                            await writeTextFile(path, v.data);
                                        })
                                        .with({ status: "error" }, (err) => {
                                            setError(err.error);
                                        });
                                    debug(`save patch file to ${path}`);
                                }}
                            >
                                <VscDiff className="w-4 h-4 mr-2" />
                                {t("workspace.generate_patch")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <VscGitStash className="w-4 h-4 mr-2" />
                                {t("workspace.stash")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <VscDiscard className="w-4 h-4 mr-2" />
                                {t("workspace.discard")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-2", className)} {...props}>
            <div className="flex flex-col gap-2">
                <Textarea
                    placeholder={t("commiter.commit_summary")}
                    autoFocus
                    value={commitMsg}
                    onChange={(e) => setCommitMsg(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === "Escape") {
                            setIsCommiting(false);
                        }
                    }}
                />
                <Button
                    onClick={async () => {
                        if (!repo_path) {
                            return;
                        }
                        setIsLoading(true);
                        const res = await commands?.createPatch(repo_path);
                        match(res)
                            .with({ status: "ok" }, (v) => {
                                generate_commit(v.data).then((v) => {
                                    const lines = v.split("\n");
                                    if (lines.length !== 0) {
                                        setCommitMsg(lines[0]);
                                    }
                                    setIsLoading(false);
                                });
                            })
                            .with({ status: "error" }, (err) => {
                                setError(err.error);
                            });
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("commiter.generating")}
                        </>
                    ) : (
                        <>
                            <FaMagic className="w-4 h-4 mr-2" />
                            {t("commiter.generate_message")}
                        </>
                    )}
                </Button>
            </div>
            <div className="flex gap-2">
                <Button
                    className="w-4/5"
                    disabled={commitMsg.trim().length === 0}
                    onClick={async () => {
                        if (repo_path) {
                            const v = await commands?.createCommit(
                                repo_path,
                                commitMsg,
                            );
                            match(v)
                                .with({ status: "ok" }, () => {
                                    setIsCommiting(false);
                                    refreshStage();
                                })
                                .with({ status: "error" }, (err) => {
                                    setError(err.error);
                                });
                        }
                    }}
                >
                    {t("commiter.commit")}
                </Button>
                <Button
                    className="w-1/5"
                    variant={"outline"}
                    onClick={() => setIsCommiting(false)}
                >
                    {t("Cancel")}
                </Button>
            </div>
        </div>
    );
}
