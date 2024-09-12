import type { FileStatus } from "@/bindings";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type React from "react";
import { useTranslation } from "react-i18next";
import ChangeCard from "@/stories/atoms/ChangeCard";
import Commiter from "@/stories/atoms/Commiter";

export interface WorkspacePanelProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    branchName: string;
    upstream?: string;
    changeSet: FileStatus[];
}

export default function WorkspacePanel({
    className,
    branchName,
    upstream,
    changeSet,
    ...props
}: WorkspacePanelProps) {
    const { t } = useTranslation();

    return (
        <div className={cn("flex flex-col gap-2", className)} {...props}>
            <div className="p-4 border rounded-xl shadow">
                <div className="pb-2">
                    <div className="pb-2">{branchName}</div>
                    {upstream && <Badge>{upstream}</Badge>}
                </div>
                <Separator />
                <div className="pt-2">
                    <div className="flex justify-between">
                        <Button>{t("workspace.set_as_default")}</Button>
                        <Button>{t("workspace.create_pr")}</Button>
                    </div>
                </div>
            </div>
            <div className="p-4 border rounded-xl shadow flex flex-col gap-2 grow">
                <div>
                    <span>{t("workspace.changed_files")} </span>
                    <Avatar className="bg-gray-50 inline-block w-6 h-6">
                        <AvatarFallback>{changeSet.length}</AvatarFallback>
                    </Avatar>
                </div>
                <ChangeCard changeSet={changeSet} className="grow" />
                <Separator />
                <Commiter />
            </div>
        </div>
    );
}
