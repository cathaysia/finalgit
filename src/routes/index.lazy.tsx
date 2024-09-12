import type { BranchInfo, TagInfo } from "@/bindings";
import EditBranch from "@/components/editBranch";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { commands } from "@/bindings";
import EditTag from "@/components/editTag";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useErrorState } from "@/lib/error";
import {
    useBranchState,
    useCommitState,
    useOpenState,
    useTagStatte,
} from "@/lib/state";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { FaCodeBranch, FaTag } from "react-icons/fa";
import { match } from "ts-pattern";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

function Index() {
    const [isOpened, setIsOpened] = useOpenState((s) => [
        s.isOpened,
        s.setIsOpened,
    ]);
    const [branches, setBranches] = useBranchState((s) => [
        s.branches,
        s.setBranches,
    ]);
    const [tags, refreshTags] = useTagStatte((s) => [s.tags, s.refreshTags]);
    const t = useTranslation().t;
    const [targetBranch, setTargetBranch] = useState<BranchInfo>();
    const [targetTag, setTargetTag] = useState<TagInfo>();
    const setCommit = useCommitState((s) => s.setCommit);
    const setError = useErrorState((s) => s.setError);

    commands.isOpened().then((value) => {
        match(value)
            .with({ status: "ok" }, (v) => {
                if (v.data && !isOpened) {
                    setIsOpened(true);
                }
            })
            .with({ status: "error" }, (err) => {
                setError(err.error);
            });
    });

    useEffect(() => {
        if (!isOpened) {
            return;
        }

        commands.getBranchInfo().then((value) => {
            match(value)
                .with({ status: "ok" }, (v) => {
                    v.data.forEach((item) => {
                        if (item.is_head) {
                            console.log(`set head commit to ${item.commit}`);
                            setCommit(item.commit);
                        }
                    });
                    setBranches(v.data);
                })
                .with({ status: "error" }, (err) => {
                    setError(err.error);
                });
        });
    }, [isOpened]);

    useEffect(() => {
        if (!isOpened) {
            return;
        }

        refreshTags();
    }, [isOpened]);

    return (
        <div>
            <Sheet>
                <Tabs defaultValue="local">
                    <TabsList className="flex items-center">
                        <TabsTrigger value="local">{t("Local")}</TabsTrigger>
                        <TabsTrigger value="remote">{t("Remote")}</TabsTrigger>
                        <TabsTrigger value="tags">{t("Tag")}</TabsTrigger>
                    </TabsList>
                    <ScrollArea className="h-screen">
                        <TabsContent value="local">
                            {branches
                                .filter((v) => v.kind === "Local")
                                .map((value) => {
                                    return (
                                        <SheetTrigger
                                            asChild
                                            onClick={() => {
                                                setTargetBranch(value);
                                            }}
                                            key={value.name}
                                        >
                                            <li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
                                                <FaCodeBranch />
                                                <span
                                                    className={clsx(
                                                        "pr-4 pl-4",
                                                        value.is_head
                                                            ? "font-bold text-slate-700"
                                                            : "",
                                                    )}
                                                >
                                                    {value.name}
                                                </span>
                                                <Badge>
                                                    {value.kind || "Local"}
                                                </Badge>
                                            </li>
                                        </SheetTrigger>
                                    );
                                })}
                        </TabsContent>
                        <TabsContent value="remote">
                            {branches
                                .filter((v) => v.kind === "Remote")
                                .map((value) => {
                                    return (
                                        <SheetTrigger
                                            asChild
                                            onClick={() => {
                                                setTargetBranch(value);
                                                setTargetTag(undefined);
                                            }}
                                            key={value.name}
                                        >
                                            <li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
                                                <FaCodeBranch />
                                                <span className="pr-4 pl-4">
                                                    {value.name}
                                                </span>
                                                <Badge>
                                                    {value.kind || "Local"}
                                                </Badge>
                                            </li>
                                        </SheetTrigger>
                                    );
                                })}
                        </TabsContent>
                        <TabsContent value="tags">
                            {tags.map((item) => {
                                return (
                                    <SheetTrigger
                                        asChild
                                        onClick={() => {
                                            setTargetTag(item);
                                            setTargetBranch(undefined);
                                        }}
                                        key={item.commit}
                                    >
                                        <li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
                                            <FaTag />
                                            <span className="pr-4 pl-4">
                                                {item.name}
                                            </span>
                                            <Badge>
                                                {item.commit.slice(0, 6)}
                                            </Badge>
                                        </li>
                                    </SheetTrigger>
                                );
                            })}
                        </TabsContent>
                        {targetBranch && <EditBranch branch={targetBranch} />}
                        {targetTag && <EditTag tag={targetTag} />}
                    </ScrollArea>
                </Tabs>
            </Sheet>
        </div>
    );
}
