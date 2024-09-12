import { BranchInfo, TagInfo } from "@/bindings";
import BranchCard from "./BranchCard";
import Project from "./Project";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export interface ControlPanelProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    project_name: string;
    branches: BranchInfo[];
    tags: TagInfo[];
}

export default function ControlPanel({
    project_name,
    branches,
    tags,
    className,
    ...props
}: ControlPanelProps) {
    const { t, i18n } = useTranslation();
    return (
        <div
            className={cn(
                "border h-screen flex flex-col items-center p-4 gap-4",
                className,
            )}
            {...props}
        >
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
