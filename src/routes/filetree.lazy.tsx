import { ScrollArea } from "@/components/ui/scroll-area";
import { useCommitState, useFileContentState, useOpenState } from "@/lib/state";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FileTree } from "@/bindings";
import Icon from "@/components/icon";
import { commands } from "@/bindings";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";

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
    }, [commit]);

    function on_clicked(path: string) {
        if (commit) {
            if (path.startsWith("/")) {
                path = path.substring(1);
            }
            commands.getFileContent(commit, path).then((v) => {
                match(v)
                    .with({ status: "ok" }, (v) => {
                        setFileContent(path, v.data);
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
        let entry = file.File;
        let key = parent + "/" + entry.filename;
        return (
            <TreeItem
                itemId={key}
                key={key}
                label={
                    <a>
                        <Icon fileName={entry.filename} />
                        {entry.filename}
                    </a>
                }
                onClick={() => {
                    callback(key);
                }}
            />
        );
    }

    let tree = file.Dir;
    let key = parent + "/" + tree.dir;

    return (
        <TreeItem
            itemId={key}
            key={key}
            label={
                <a>
                    <Icon fileName={tree.dir} isDir={true} />
                    {tree.dir}
                </a>
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
