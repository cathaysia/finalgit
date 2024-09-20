import {
    commands,
    type CommitInfo,
    type BranchInfo,
    type TagInfo,
} from "@/bindings";
import { cn } from "@/lib/utils";
import ControlPanel from "./ControlPanel";
import WorkspacePanel from "./WorkspacePanel";
import { useAppState, useRefreshRequest } from "@/lib/state";
import { useEffect, useState } from "react";
import { useErrorState } from "@/lib/error";
import { match } from "ts-pattern";
import { debug } from "@tauri-apps/plugin-log";
import GitHistory from "../lists/GitHistory";

export interface MainPanelProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    project_name: string;
    branches: BranchInfo[];
    tags: TagInfo[];
}

export default function MainPanel({
    className,
    project_name,
    tags,
    ...props
}: MainPanelProps) {
    const [repo_path, branches, changes, setChanges, files, setFiles] =
        useAppState((s) => [
            s.repo_path,
            s.branches,
            s.changes,
            s.setChanges,
            s.files,
            s.setFiles,
        ]);

    const setError = useErrorState((s) => s.setError);
    const [stageListener] = useRefreshRequest((s) => [s.stageListener]);
    const [currentHistory, setCurrentHisotry] = useState<CommitInfo[]>([]);

    const item = branches.find((item) => item.is_head);
    let branchName = "";
    if (item) {
        branchName = item.name;
    }
    useEffect(() => {
        if (repo_path) {
            debug("refresh stage");
            commands.getCurrentStatus(repo_path).then((v) => {
                match(v)
                    .with({ status: "ok" }, (v) => {
                        setChanges(v.data);
                    })
                    .with({ status: "error" }, (err) => {
                        setError(err.error);
                    });
            });
        }
    }, [repo_path, stageListener]);

    useEffect(() => {
        const head = branches.find((item) => item.is_head);
        if (repo_path && head) {
            debug("refresh branch");
            commands.getFileTree(repo_path, head.commit).then((v) => {
                match(v)
                    .with({ status: "ok" }, (v) => {
                        setFiles(v.data);
                    })
                    .with({ status: "error" }, (err) => {
                        setError(err.error);
                    });
            });
            commands.getHistory(repo_path, head.commit).then((v) => {
                match(v)
                    .with({ status: "ok" }, (v) => {
                        setCurrentHisotry(v.data);
                    })
                    .with({ status: "error" }, (err) => {
                        setError(err.error);
                    });
            });
        }
    }, [branches]);

    return (
        <div
            className={cn(
                "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 h-screen p-2",
                className,
            )}
            data-tauri-drag-region={true}
            {...props}
        >
            <ControlPanel />
            <WorkspacePanel
                branchName={branchName}
                changeSet={changes}
                files={files}
            />
            <GitHistory history={currentHistory} />
        </div>
    );
}