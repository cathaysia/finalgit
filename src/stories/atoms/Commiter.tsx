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
    const [patchPath, setPatchPath] = useState("");
    const t = useTranslation().t;
    const repo_path = useAppState((s) => s.repo_path);
    const setError = useErrorState((s) => s.setError);
    const refreshStage = useRefreshRequest((s) => s.refreshStage);

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
                    onClick={() => {
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
                            commands
                                .addToStage(repo_path, allfiles)
                                .then((v) => {
                                    match(v)
                                        .with({ status: "ok" }, () => {
                                            refreshStage();
                                        })
                                        .with({ status: "error" }, (err) => {
                                            setError(err.error);
                                        });
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
                                onClick={() => {
                                    const path =
                                        repo_path && `${repo_path}/patch.patch`;
                                    save({
                                        title: t("workspace.patch_save_path"),
                                        defaultPath: repo_path,
                                        canCreateDirectories: true,
                                    }).then((path) => {
                                        if (path === null || !repo_path) {
                                            return;
                                        }
                                        commands
                                            .createPatch(repo_path)
                                            .then((v) => {
                                                match(v)
                                                    .with(
                                                        { status: "ok" },
                                                        (v) => {
                                                            writeTextFile(
                                                                path,
                                                                v.data,
                                                            );
                                                            // TODO: handle error
                                                        },
                                                    )
                                                    .with(
                                                        { status: "error" },
                                                        (err) => {
                                                            setError(err.error);
                                                        },
                                                    );
                                            });
                                        debug(`save patch file to ${path}`);
                                    });
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
                <Button>
                    <FaMagic className="w-4 h-4 mr-2" />
                    {t("commiter.generate_message")}
                </Button>
            </div>
            <div className="flex gap-2">
                <Button
                    className="w-4/5"
                    disabled={commitMsg.trim().length === 0}
                    onClick={() => {
                        if (repo_path) {
                            commands
                                .createCommit(repo_path, commitMsg)
                                .then((v) => {
                                    match(v)
                                        .with({ status: "ok" }, () => {
                                            setIsCommiting(false);
                                            refreshStage();
                                        })
                                        .with({ status: "error" }, (err) => {
                                            setError(err.error);
                                        });
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
