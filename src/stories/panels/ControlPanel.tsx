import { commands } from "@/bindings";
import {
    getCurrentWindow,
} from "@tauri-apps/api/window";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type React from "react";
import { useTranslation } from "react-i18next";
import BranchPanel from "./BranchPanel";
import Project from "@/stories/atoms/Project";
import { useAppState, useRefreshRequest } from "@/lib/state";
import { useEffect, } from "react";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";

export interface ControlPanelProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function ControlPanel({
    className,
    ...props
}: ControlPanelProps) {
    const { t } = useTranslation();
    const [repo_path, branches, setBranches, tags, setTags] = useAppState(
        (s) => [s.repo_path, s.branches, s.setBranches, s.tags, s.setTags],
    );
    const [branchListener] = useRefreshRequest((s) => [s.branchListener]);
    const setError = useErrorState((s) => s.setError);

    useEffect(() => {
        if (repo_path) {
            commands.getBranchInfo(repo_path).then((v) => {
                match(v)
                    .with({ status: "ok" }, (val) => {
                        setBranches(val.data);
                    })
                    .with({ status: "error" }, (err) => {
                        setError(err.error);
                    });
            });
        }
    }, [repo_path, branchListener]);

    useEffect(() => {
        if (repo_path) {
            commands.getTagInfo(repo_path).then((v) => {
                match(v)
                    .with({ status: "ok" }, (val) => {
                        setTags(val.data);
                    })
                    .with({ status: "error" }, (err) => {
                        setError(err.error);
                    });
            });
        }
    }, [repo_path]);

    return (
        <aside
            className={cn(
                "w-full flex flex-col max-h-full overflow-hidden gap-4",
                className,
            )}
            {...props}
        >
            <div data-tauri-drag-region={true} className="flex gap-2">
                <div
                    className="h-4 w-4 bg-red-600 rounded-lg"
                    onClick={() => {
                        getCurrentWindow().close();
                    }}
                />
                <div
                    className="h-4 w-4 bg-yellow-600 rounded-lg"
                    onClick={() => {
                        getCurrentWindow().toggleMaximize();
                    }}
                />
                <div
                    className="h-4 w-4 bg-green-600 rounded-lg"
                    onClick={() => {
                        getCurrentWindow().minimize();
                    }}
                />
            </div>
            <Project />
            <Button variant={"secondary"} className="w-full h-12">
                {t("Workspace")}
            </Button>

            <BranchPanel
                branches={branches}
                tags={tags}
                className="border-none w-full"
            />
        </aside>
    );
}
