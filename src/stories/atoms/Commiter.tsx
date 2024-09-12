import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMagic } from "react-icons/fa";
import { VscDiff } from "react-icons/vsc";
import { VscGitStash } from "react-icons/vsc";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VscDiscard } from "react-icons/vsc";

export interface CommiterProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function Commiter({ className, ...props }: CommiterProps) {
    const t = useTranslation().t;
    const [isCommiting, setIsCommiting] = useState(false);

    if (!isCommiting) {
        return (
            <div className={cn("flex gap-2", className)}>
                <Button className="w-full" onClick={() => setIsCommiting(true)}>
                    {t("commiter.start_commit")}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                            <DotsHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <VscDiff className="w-4 h-4 mr-2" />
                                {t("workspace.generate_patch")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <VscGitStash className="w-4 h-4 mr-2" />
                                {t("workspace.stash")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <VscDiscard className="w-4 h-4 mr-2" />
                                {t("workspace.discard")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-2", className)} {...props}>
            <div className="flex flex-col gap-2">
                <Textarea placeholder={t("commiter.commit_summary")} />
                <Button>
                    <FaMagic className="w-4 h-4 mr-2" />
                    {t("commiter.generate_message")}
                </Button>
            </div>
            <div className="flex gap-2">
                <Button className="w-4/5">{t("commiter.commit")}</Button>
                <Button
                    className="w-1/5"
                    variant={"outline"}
                    onClick={() => setIsCommiting(false)}
                >
                    {t("Cancel")}
                </Button>
            </div>
        </div>
    );
}
