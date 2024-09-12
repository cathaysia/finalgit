import type { FileTree } from "@/bindings";
import { commands } from "@/bindings";
import Icon from "@/components/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useErrorState } from "@/lib/error";
import { useCommitState, useFileContentState } from "@/lib/state";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

export const Route = createLazyFileRoute("/filetree")({
    component: FileTreeComponent,
});

function FileTreeComponent() {
    const commit = useCommitState((s) => s.commit);
    const setError = useErrorState((s) => s.setError);
    const [files, setFiles] = useState<FileTree[]>([]);
    const setFileContent = useFileContentState((s) => s.setContent);

    useEffect(() => {
        if (commit) {
            commands.getFileTree(commit).then((v) => {
                match(v)
                    .with({ status: "ok" }, (v) => {
                        setFiles(v.data);
                    })
                    .with({ status: "error" }, (err) => {
                        setError(err.error);
                    });
            });
        }
    }, [commit, setError]);

    function on_clicked(path: string) {
        if (commit) {
            let stripped_path = path;
            if (path.startsWith("/")) {
                stripped_path = path.substring(1);
            }
            commands.getFileContent(commit, stripped_path).then((v) => {
                match(v)
                    .with({ status: "ok" }, (v) => {
                        setFileContent(stripped_path, v.data);
                    })
                    .with({ status: "error" }, (err) => {
                        setError(err.error);
                    });
            });
        }
    }

    return (
        <ScrollArea className="h-screen">
            <SimpleTreeView>
                {files.map((v) => {
                    return generate_tree("", v, on_clicked);
                })}
            </SimpleTreeView>
        </ScrollArea>
    );
}

function generate_tree(
    parent: string,
    file: FileTree,
    callback: (path: string) => void,
) {
    if ("File" in file) {
        const entry = file.File;
        const key = `${parent}/${entry.filename}`;
        return (
            <TreeItem
                itemId={key}
                key={key}
                label={
                    <span>
                        <Icon fileName={entry.filename} />
                        {entry.filename}
                    </span>
                }
                onClick={() => {
                    callback(key);
                }}
            />
        );
    }

    const tree = file.Dir;
    const key = `${parent}/${tree.dir}`;

    return (
        <TreeItem
            itemId={key}
            key={key}
            label={
                <span>
                    <Icon fileName={tree.dir} isDir={true} />
                    {tree.dir}
                </span>
            }
        >
            <div>
                {tree.files.map((v) => {
                    return generate_tree(key, v, callback);
                })}
            </div>
        </TreeItem>
    );
}
