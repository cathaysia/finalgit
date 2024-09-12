import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import ControlPanel from "./ControlPanel";
import WorkspacePanel from "./WorkspacePanel";
import { BranchInfo, FileStatus, TagInfo } from "@/bindings";

export interface MainPanelProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    project_name: string;
    branches: BranchInfo[];
    tags: TagInfo[];
    changeSet: FileStatus[];
    branchName: string;
}

export default function MainPanel({
    className,
    project_name,
    branches,
    tags,
    changeSet,
    branchName,
    ...props
}: MainPanelProps) {
    const { t, i18n } = useTranslation();

    return (
        <div
            className={cn(
                "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-4 h-screen max-h-screen",
                className,
            )}
            {...props}
        >
            <ControlPanel
                project_name={project_name}
                branches={branches}
                tags={tags}
            />
            <WorkspacePanel branchName={branchName} changeSet={changeSet} />
        </div>
    );
}
