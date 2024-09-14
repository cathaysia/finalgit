import type { FileStatus } from "@/bindings";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import GitFileStatus from "@/lib/file_status";
import { cn } from "@/lib/utils";
import type React from "react";
import { useTranslation } from "react-i18next";

export interface ChangeCardProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    changeSet: FileStatus[];
}

export default function ChangeCard({ className, changeSet }: ChangeCardProps) {
    const t = useTranslation().t;

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            {changeSet.map((item) => {
                return (
                    <div
                        className="flex justify-between"
                        key={item.path}
                        title={
                            ((item.status & GitFileStatus.WT_MODIFIED ||
                                item.status & GitFileStatus.INDEX_MODIFIED) &&
                                t("change.modified")) ||
                            ((item.status & GitFileStatus.WT_DELETED ||
                                item.status & GitFileStatus.INDEX_DELETED) &&
                                t("change.deleted")) ||
                            ((item.status & GitFileStatus.WT_NEW ||
                                item.status & GitFileStatus.INDEX_NEW) &&
                                t("change.new_file")) ||
                            undefined
                        }
                    >
                        <span>
                            <Checkbox
                                className="w-4 h-4 mr-2"
                                key={item.path}
                                checked={
                                    (item.status & GitFileStatus.INDEX_NEW ||
                                        item.status &
                                            GitFileStatus.INDEX_MODIFIED ||
                                        item.status &
                                            GitFileStatus.INDEX_DELETED ||
                                        item.status &
                                            GitFileStatus.INDEX_RENAMED ||
                                        item.status &
                                            GitFileStatus.INDEX_TYPECHANGE) !==
                                    0
                                }
                            />
                            <Label htmlFor={item.path}>{item.path}</Label>
                        </span>
                        <div
                            key={item.path}
                            className={cn(
                                "w-3 h-3 rounded-lg",
                                (item.status & GitFileStatus.WT_MODIFIED ||
                                    item.status &
                                        GitFileStatus.INDEX_MODIFIED) &&
                                    "bg-yellow-600",
                                (item.status & GitFileStatus.WT_DELETED ||
                                    item.status &
                                        GitFileStatus.INDEX_DELETED) &&
                                    "bg-red-600",
                                (item.status & GitFileStatus.WT_NEW ||
                                    item.status & GitFileStatus.INDEX_NEW) &&
                                    "bg-green-600",
                            )}
                        />
                    </div>
                );
            })}
        </div>
    );
}
