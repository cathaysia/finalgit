import { FileStatus } from "@/bindings";
import { cn } from "@/lib/utils";
import React from "react";
import GitFileStatus from "@/lib/file_status";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";

export interface ChangeCardProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    changeSet: FileStatus[];
}

export default function ChangeCard({ className, changeSet }: ChangeCardProps) {
    const { t, i18n } = useTranslation();

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            {changeSet.map((item) => {
                return (
                    <div
                        className="flex justify-between"
                        title={
                            ((item.status & GitFileStatus.WT_MODIFIED ||
                                item.status & GitFileStatus.INDEX_MODIFIED) &&
                                t("modified")) ||
                            ((item.status & GitFileStatus.WT_DELETED ||
                                item.status & GitFileStatus.INDEX_DELETED) &&
                                t("deleted")) ||
                            ((item.status & GitFileStatus.WT_NEW ||
                                item.status & GitFileStatus.INDEX_NEW) &&
                                t("new file")) ||
                            undefined
                        }
                    >
                        <span>
                            <Checkbox
                                className="w-4 h-4 mr-2"
                                checked={
                                    (item.status & GitFileStatus.INDEX_NEW ||
                                        item.status &
                                            GitFileStatus.INDEX_MODIFIED ||
                                        item.status &
                                            GitFileStatus.INDEX_DELETED ||
                                        item.status &
                                            GitFileStatus.INDEX_RENAMED ||
                                        item.status &
                                            GitFileStatus.INDEX_TYPECHANGE) != 0
                                }
                            />
                            {item.path}
                        </span>
                        <div
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
                        ></div>
                    </div>
                );
            })}
        </div>
    );
}
