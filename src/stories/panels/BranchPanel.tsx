import type { BranchInfo, TagInfo } from "@/bindings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { FaCodeBranch, FaFilter, FaTag } from "react-icons/fa";
import BranchList from "@/stories/lists/BranchList";
import { TagList } from "@/stories/lists/TagList";

export interface BranchCardProps {
    branches: BranchInfo[];
    tags: TagInfo[];
    className?: string;
}

export default function BranchPanel({
    branches,
    tags,
    className,
}: BranchCardProps) {
    const t = useTranslation().t;
    const [filter, setFilter] = useState<string>("");
    const [isSearching, setIsSearching] = useState(false);
    const searchBar = useRef<HTMLInputElement>(null);

    useHotkeys(
        "/",
        () => {
            setIsSearching(true);
            searchBar?.current?.focus();
        },
        { preventDefault: true },
    );

    const filteredBranches = branches.filter((item) => {
        if (!filter) {
            return true;
        }

        return item.name.includes(filter);
    });
    const filteredTags = tags.filter((item) => {
        if (!filter) {
            return true;
        }

        return item.name.includes(filter);
    });

    return (
        <Tabs
            defaultValue="branch"
            className={cn("border focus:bg-red-50", className)}
        >
            <div className="flex gap-2 flex-col px-2">
                <div className="flex justify-between">
                    <TabsList className={cn("flex gap-2 items-center")}>
                        <TabsTrigger value="branch">
                            <FaCodeBranch />
                            {t("branch.branches")}
                        </TabsTrigger>
                        <TabsTrigger value="tags">
                            <FaTag />
                            {t("branch.tags")}
                        </TabsTrigger>
                    </TabsList>
                    {isSearching ? (
                        <Button onClick={() => setIsSearching(false)}>
                            {t("Cancel")}
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                setIsSearching(true);
                            }}
                            variant={"ghost"}
                        >
                            <FaFilter />
                        </Button>
                    )}
                </div>
                {isSearching && (
                    <Input
                        value={filter || ""}
                        onChange={(e) => {
                            setFilter(e.target.value);
                        }}
                        ref={searchBar}
                        autoFocus
                        onKeyUp={(e) => {
                            if (e.key === "Escape") {
                                setIsSearching(false);
                            }
                        }}
                    />
                )}
            </div>
            <TabsContent value="branch">
                <BranchList
                    branches={filteredBranches}
                    filter={filter || undefined}
                />
            </TabsContent>
            <TabsContent value="tags">
                <TagList tags={filteredTags} filter={filter || undefined} />
            </TabsContent>
        </Tabs>
    );
}
