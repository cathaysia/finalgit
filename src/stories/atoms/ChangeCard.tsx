import { commands, type FileStatus } from "@/bindings";
import { cn } from "@/lib/utils";
import type React from "react";
import { Separator } from "@/components/ui/separator";
import Commiter from "./Commiter";
import { useAppState, useRefreshRequest } from "@/lib/state";
import ChangeItem from "./ChangeItem";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";

export interface ChangeCardProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    changeSet: FileStatus[];
}

export default function ChangeCard({ className, changeSet }: ChangeCardProps) {
    const repo_path = useAppState((s) => s.repo_path);
    const refreshStage = useRefreshRequest((s) => s.refreshStage);
    const setError = useErrorState((s) => s.setError);

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <div className="grow flex flex-col gap-2">
                {changeSet.map((item) => {
                    return (
                        <ChangeItem
                            key={item.path}
                            item={{
                                path: item.path,
                                status: item.status,
                            }}
                            onCheckedChange={(e) => {
                                if (e === true) {
                                    repo_path &&
                                        commands
                                            .addFiles(repo_path, [item.path])
                                            .then((v) => {
                                                match(v)
                                                    .with(
                                                        { status: "ok" },
                                                        () => {
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
                                } else if (e === false) {
                                    repo_path &&
                                        commands
                                            .removeFiles(repo_path, [item.path])
                                            .then((v) => {
                                                match(v)
                                                    .with(
                                                        { status: "ok" },
                                                        () => {
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
                                }
                            }}
                        />
                    );
                })}
            </div>
            <Separator />
            <Commiter changeSet={changeSet} />
        </div>
    );
}
