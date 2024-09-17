import type { CommitInfo } from "@/bindings";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { DEFAULT_STYLE } from "@/lib/style";
import { cn } from "@/lib/utils";

export interface CommitProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    filter?: string;
    commit: CommitInfo;
}

export default function Commit({
    className,
    filter,
    commit,
    ...props
}: CommitProps) {
    const branchName = commit.summary.slice(0, 50);
    return (
        <div
            className={cn(
                "border h-56 py-4 px-2 pt-6",
                DEFAULT_STYLE,
                className,
            )}
            {...props}
        >
            <div className="text-sm font-medium leading-none items-center flex gap-2 overflow-ellipsis overflow-x-hidden text-nowrap">
                {(() => {
                    if (!filter) {
                        return <Label>{branchName}</Label>;
                    }
                    const v = branchName.replace(
                        filter,
                        `<span class="bg-yellow-300 dark:bg-yellow-500">${filter}</span>`,
                    );
                    return <Label dangerouslySetInnerHTML={{ __html: v }} />;
                })()}
                <Badge>{commit.hash.slice(0, 6)}</Badge>
                <Badge>{commit.author.name}</Badge>
            </div>
        </div>
    );
}
