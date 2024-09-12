import { BranchInfo, TagInfo } from "@/bindings";
import BranchCard from "./BranchCard";
import Project from "./Project";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export interface ControlPanelProps {
    project_name: string;
    branches: BranchInfo[];
    tags: TagInfo[];
}

export default function ControlPanel({
    project_name,
    branches,
    tags,
}: ControlPanelProps) {
    const { t, i18n } = useTranslation();
    return (
        <div className="border h-screen flex flex-col items-center p-4 gap-4">
            <Project current={project_name} />
            <Button variant={"secondary"} className="w-full h-12">
                {t("Workspace")}
            </Button>
            <BranchCard
                branches={branches}
                tags={tags}
                className="border-none w-full"
            />
        </div>
    );
}
