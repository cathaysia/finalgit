import type { FileStatus } from "@/bindings";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import GitFileStatus from "@/lib/file_status";
import { DEFAULT_STYLE } from "@/lib/style";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type CheckedState = boolean | "indeterminate";
export interface ChangeItemProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    item: FileStatus;
    checked?: boolean;
    onCheckedChange?(checked: CheckedState): void;
}

export default function ChangeItem({
    className,
    item,
    checked,
    onCheckedChange,
    ...props
}: ChangeItemProps) {
    const { t } = useTranslation();

    function is_indexed(item: FileStatus) {
        return (
            (item.status & GitFileStatus.INDEX_NEW ||
                item.status & GitFileStatus.INDEX_MODIFIED ||
                item.status & GitFileStatus.INDEX_DELETED ||
                item.status & GitFileStatus.INDEX_RENAMED ||
                item.status & GitFileStatus.INDEX_TYPECHANGE) !== 0
        );
    }

    return (
        <FormItem className={cn("flex justify-between", className)} {...props}>
            <div className="flex gap-2">
                <FormControl>
                    <Checkbox
                        defaultChecked={is_indexed(item)}
                        checked={checked}
                        onCheckedChange={onCheckedChange}
                    />
                </FormControl>
                <FormLabel
                    className={DEFAULT_STYLE}
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
                    {item.path}
                </FormLabel>
            </div>
            <div
                key={item.path}
                className={cn(
                    "w-3 h-3 rounded-lg",
                    (item.status & GitFileStatus.WT_MODIFIED ||
                        item.status & GitFileStatus.INDEX_MODIFIED) &&
                        "bg-yellow-600",
                    (item.status & GitFileStatus.WT_DELETED ||
                        item.status & GitFileStatus.INDEX_DELETED) &&
                        "bg-red-600",
                    (item.status & GitFileStatus.WT_NEW ||
                        item.status & GitFileStatus.INDEX_NEW) &&
                        "bg-green-600",
                )}
            />
        </FormItem>
    );
}
