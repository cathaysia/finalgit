import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { FaMagic } from "react-icons/fa";
import { VscDiff } from "react-icons/vsc";
import { VscGitStash } from "react-icons/vsc";

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
import { commands } from "@/bindings";
import { useAppState, useRefreshRequest } from "@/lib/state";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";

export interface CommiterProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    files?: string[];
    isCommiting: boolean;
    on_commit_complete?: () => void;
}

export default function Commiter({
    className,
    files,
    isCommiting,
    on_commit_complete,
    ...props
}: CommiterProps) {
    const t = useTranslation().t;
    const repo_path = useAppState((s) => s.repo_path);
    const setError = useErrorState((s) => s.setError);
    const refreshStage = useRefreshRequest((s) => s.refreshStage);

    useHotkeys(
        "Escape",
        () => {
            on_commit_complete?.();
        },
        {
            preventDefault: true,
        },
    );

    const [commitMsg, setCommitMsg] = useState<string>("");

    if (!isCommiting) {
        return (
            <div className={cn("flex gap-2", className)}>
                <Button type="submit" className="w-full">
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
                            <DropdownMenuItem>
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
                            on_commit_complete?.();
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
                        if (repo_path && files) {
                            commands.addFiles(repo_path, files).then((v) => {
                                match(v)
                                    .with({ status: "ok" }, () => {
                                        commands
                                            .createCommit(repo_path, commitMsg)
                                            .then((v) => {
                                                match(v)
                                                    .with(
                                                        { status: "ok" },
                                                        () => {
                                                            on_commit_complete?.();
                                                            refreshStage();
                                                        },
                                                    )
                                                    .with(
                                                        { status: "error" },
                                                        (err) => {
                                                            setError(err.error);
                                                        },
                                                    );
                                            });
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
                    onClick={() => on_commit_complete?.()}
                >
                    {t("Cancel")}
                </Button>
            </div>
        </div>
    );
}
