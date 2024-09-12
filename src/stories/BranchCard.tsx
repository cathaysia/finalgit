import { BranchInfo, TagInfo } from "@/bindings";
import { Button } from "@/components/ui/button";
import { useHotkeys } from "react-hotkeys-hook";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Children, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    FaArrowLeft,
    FaArrowRight,
    FaCodeBranch,
    FaFilter,
    FaTag,
} from "react-icons/fa";
import Branch from "./Branch";
import { cn } from "@/lib/utils";
import BranchList from "./BranchList";
import { TagList } from "./TagList";

export interface BranchCardProps {
    branches: BranchInfo[];
    tags: TagInfo[];
    className?: string;
}

export default function BranchCard({
    branches,
    tags,
    className,
}: BranchCardProps) {
    const { t, i18n } = useTranslation();
    const [filter, setFilter] = useState<string>("");
    const [isSearching, setIsSearching] = useState(false);
    const [isBranch, setIsBranch] = useState<boolean>(true);
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
        <Tabs defaultValue="branch" className={cn("border", className)}>
            <div className="w-full flex justify-between px-4 py-3 items-center gap-2">
                <TabsList
                    className={cn(
                        "hidden sm:flex sm:gap-2 sm:items-center",
                        filter == null && "flex",
                    )}
                >
                    <TabsTrigger value="branch">
                        <FaCodeBranch />
                        {t("branch.branches")}
                    </TabsTrigger>
                    <TabsTrigger value="tags">
                        <FaTag />
                        {t("branch.tags")}
                    </TabsTrigger>
                </TabsList>
                {!isSearching ? (
                    <Button
                        onClick={() => {
                            setIsSearching(true);
                        }}
                        variant={"ghost"}
                    >
                        <FaFilter />
                    </Button>
                ) : (
                    <>
                        <Input
                            value={filter || ""}
                            onChange={(e) => {
                                setFilter(e.target.value);
                            }}
                            ref={searchBar}
                            autoFocus
                            onKeyUp={(e) => {
                                if (e.key == "Escape") {
                                    setIsSearching(false);
                                }
                            }}
                        />
                        <Button onClick={() => setIsSearching(false)}>
                            {t("Cancel")}
                        </Button>
                    </>
                )}
            </div>
            <div>
                <TabsContent value="branch" className="w-full flex flex-col">
                    <BranchList
                        branches={filteredBranches}
                        filter={filter || undefined}
                    />
                </TabsContent>
                <TabsContent value="tags">
                    <TagList tags={filteredTags} filter={filter || undefined} />
                </TabsContent>
            </div>
        </Tabs>
    );
}
