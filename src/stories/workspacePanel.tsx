import { FileStatus } from "@/bindings";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import ChangeCard from "./ChangeCard";
import Commiter from "./Commiter";

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
    const { t, i18n } = useTranslation();

    return (
        <div className={cn(className)} {...props}>
            <div className="p-4 border rounded-xl shadow">
                <div className="pb-2">
                    <div className="pb-2">{branchName}</div>
                    {upstream && <Badge>{upstream}</Badge>}
                </div>
                <Separator />
                <div className="pt-2">
                    <div className="flex justify-between">
                        <Button>{t("Set as default")}</Button>
                        <Button>{t("Create PR")}</Button>
                    </div>
                </div>
            </div>
            <div className="p-2"></div>
            <div className="p-4 border rounded-xl shadow flex flex-col gap-2">
                <div>
                    <div>
                        <span>{t("Changed files")} </span>
                        <Avatar className="bg-gray-50 inline-block w-6 h-6">
                            <AvatarFallback>{changeSet.length}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <ChangeCard changeSet={changeSet} />
                <Separator />
                <Commiter />
            </div>
        </div>
    );
}