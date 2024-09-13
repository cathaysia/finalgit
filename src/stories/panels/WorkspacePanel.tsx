import type { FileStatus, FileTree } from "@/bindings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type React from "react";
import { useTranslation } from "react-i18next";
import ChangeCard from "@/stories/atoms/ChangeCard";
import Commiter from "@/stories/atoms/Commiter";
import FilePanel from "./FilePanel";

export interface WorkspacePanelProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    branchName: string;
    upstream?: string;
    files: FileTree[];
    changeSet: FileStatus[];
}

export default function WorkspacePanel({
    className,
    branchName,
    upstream,
    changeSet,
    files,
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
                        <Button disabled={true}>
                            {t("workspace.set_as_default")}
                        </Button>
                        <Button>{t("workspace.create_pr")}</Button>
                    </div>
                </div>
            </div>
            <div className="p-4 border rounded-xl shadow flex flex-col gap-2 grow">
                <div className="flex flex-col grow gap-2">
                    <Tabs defaultValue="changes">
                        <TabsList className="w-full">
                            <TabsTrigger value="changes">
                                {t("workspace.change_list")}
                            </TabsTrigger>
                            <TabsTrigger value="files">
                                {t("workspace.file_tree")}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="changes"
                            className="flex flex-col gap-2"
                        >
                            <div className="flex items-center gap-2">
                                <span>{t("workspace.changed_files")} </span>
                                <Avatar className="bg-gray-50 inline-block w-6 h-6">
                                    <AvatarFallback>
                                        {changeSet.length}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <ChangeCard
                                changeSet={changeSet}
                                className="grow"
                            />
                            <Separator />
                            <Commiter />
                        </TabsContent>
                        <TabsContent value="files">
                            <FilePanel files={files} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
