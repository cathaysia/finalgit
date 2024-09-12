import { commands, type BranchInfo, type TagInfo } from "@/bindings";
import { cn } from "@/lib/utils";
import ControlPanel from "./ControlPanel";
import WorkspacePanel from "./WorkspacePanel";
import { useAppState } from "@/lib/state";
import { useEffect } from "react";
import { useErrorState } from "@/lib/error";
import { match } from "ts-pattern";

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

    const item = branches.find((item) => item.is_head);
    let branchName = "";
    if (item) {
        branchName = item.name;
    }
    useEffect(() => {
        if (repo_path) {
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
    }, [repo_path]);

    useEffect(() => {
        const head = branches.find((item) => item.is_head);
        if (repo_path && head) {
            commands.getFileTree(repo_path, head.commit).then((v) => {
                match(v)
                    .with({ status: "ok" }, (v) => {
                        setFiles(v.data);
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
                "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-4 h-screen max-h-screen",
                className,
            )}
            {...props}
        >
            <ControlPanel />
            <WorkspacePanel
                branchName={branchName}
                changeSet={changes}
                files={files}
            />
        </div>
    );
}
