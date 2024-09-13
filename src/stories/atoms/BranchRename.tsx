import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface BranchRenameProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    on_cancel?: () => void;
    on_confirm?: (name: string) => void;
}

export default function BranchRename({
    className,
    on_cancel,
    on_confirm,
    defaultValue,
    ...props
}: BranchRenameProps) {
    const { t } = useTranslation();
    const [value, setValue] = useState<string>(defaultValue || "");

    return (
        <div className={cn("w-full flex justify-between gap-2", className)}>
            <Input
                className={cn("w-full h-", className)}
                type="text"
                autoFocus
                value={value}
                onChange={(v) => setValue(v.target.value)}
                onKeyUp={(e) => {
                    if (e.key === "Escape") {
                        on_cancel?.();
                    }
                    if (e.key === "Enter") {
                        on_confirm?.(value);
                    }
                }}
                {...props}
            />
            <div className="flex gap-2">
                <Button
                    onClick={() => {
                        on_confirm?.(value);
                    }}
                >
                    {t("branch.apply")}
                </Button>
                <Button onClick={() => on_cancel?.()} variant={"outline"}>
                    {t("Cancel")}
                </Button>
            </div>
        </div>
    );
}
