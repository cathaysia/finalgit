import type { CommitInfo } from "@/bindings";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { DEFAULT_STYLE } from "@/lib/style";
import { cn } from "@/lib/utils";
import UserAvatar from "@/stories/atoms/UserAvatar";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import NOTIFY from "@/lib/notify";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const names = [commit.author.name];

    if (commit.author.name !== commit.commiter.name) {
        names.push(commit.commiter.name);
    }
    return (
        <div
            className={cn(
                "border h-16 py-4 px-2 text-sm font-medium items-center flex justify-between",
                DEFAULT_STYLE,
                className,
            )}
            {...props}
        >
            <div className="flex items-center gap-2">
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
                <Badge
                    title={commit.hash}
                    onClick={async () => {
                        const _ = await writeText(commit.hash);
                        NOTIFY.info(
                            t("commit.copy_to_clipboard", {
                                val: commit.hash,
                            }),
                        );
                    }}
                >
                    {commit.hash.slice(0, 6)}
                </Badge>
                <UserAvatar user_name={names} />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size="sm">
                        <DotsHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            {t("commit.details")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            {t("commit.delete")}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
