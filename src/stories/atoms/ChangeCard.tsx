import type { FileStatus } from "@/bindings";
import { cn } from "@/lib/utils";
import type React from "react";
import { Separator } from "@/components/ui/separator";
import Commiter from "./Commiter";
import { useMemo } from "react";
import { useChangeState } from "@/lib/state";
import ChangeItem from "./ChangeItem";

export interface ChangeCardProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    changeSet: FileStatus[];
}

export default function ChangeCard({ className, changeSet }: ChangeCardProps) {
    const [
        changeState,
        clearChangeStatus,
        extendChangeState,
        selectChange,
        excludeChange,
    ] = useChangeState((s) => [
        s.changes,
        s.clearChanges,
        s.extend,
        s.selectChange,
        s.excludeChange,
    ]);

    useMemo(() => {
        clearChangeStatus();
        extendChangeState(changeSet);
    }, [changeSet]);

    const v = Array.from(changeState).map(([key, value]) => ({ key, value }));

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <div className="grow flex flex-col gap-2">
                {v.map((item) => {
                    return (
                        <ChangeItem
                            key={item.key}
                            item={{
                                path: item.key,
                                status: item.value.status,
                            }}
                            checked={item.value.checked}
                            onCheckedChange={(e) => {
                                if (e === true) {
                                    selectChange(item.key);
                                } else if (e === false) {
                                    excludeChange(item.key);
                                }
                            }}
                        />
                    );
                })}
            </div>
            <Separator />
            <Commiter />
        </div>
    );
}
