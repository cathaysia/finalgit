import { createFileRoute } from "@tanstack/react-router";
import { BranchType, commands, CommitInfo } from "@/bindings";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchProps {
    branch: string;
    kind: BranchType;
}

export const Route = createFileRoute("/commit")({
    component: CommitList,
    validateSearch: (search): SearchProps => {
        return {
            branch: search.branch as string,
            kind: search.kind as BranchType,
        };
    },
});

function CommitList() {
    const { branch, kind } = Route.useSearch();
    const [commit, setCommit] = useState<CommitInfo[]>([]);
    const setError = useErrorState((s) => s.setError);

    useEffect(() => {
        commands.getCommits(branch, kind).then((v) => {
            match(v)
                .with({ status: "ok" }, (v) => {
                    setCommit(v.data);
                })
                .with({ status: "error" }, (v) => {
                    setError(v.error);
                });
        });
    }, [branch]);

    return (
        <ScrollArea className="w-screen h-screen">
            <Accordion collapsible type="single">
                {commit.map((item) => {
                    const time = new Date(item.time);
                    const datetime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
                    return (
                        <AccordionItem value={item.hash}>
                            <AccordionTrigger>
                                <Badge>{item.hash.slice(0, 6)}</Badge>
                                <a>{item.summary}</a>
                                <Badge title={item.author.email}>
                                    {item.author.name}
                                </Badge>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div>{item.hash}</div>
                                <div>{item.message}</div>
                                <div>
                                    {item.author.name} {item.author.email}
                                </div>
                                <div title={`${item.time}`}>{datetime}</div>
                                <div>
                                    commiter: {item.commiter.name}{" "}
                                    {item.commiter.email}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </ScrollArea>
    );
}
