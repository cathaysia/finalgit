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
        <div className={cn("flex h-screen w-full gap-2", className)} {...props}>
            <ControlPanel
                project_name={project_name}
                branches={branches}
                tags={tags}
                className="w-1/4"
            />
            <WorkspacePanel
                branchName={branchName}
                changeSet={changeSet}
                className="w-1/4"
            />
        </div>
    );
}
