import { ScrollArea } from "@/components/ui/scroll-area";
import { useCommitState, useOpenState } from "@/lib/state";
import { createLazyFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FileTree } from "@/bindings";
import Icon from "@/components/Icon";

export const Route = createLazyFileRoute("/filetree")({
	component: FileTreeComponent,
});

function FileTreeComponent() {
	const { isOpened } = useOpenState();
	const { commit } = useCommitState();

	const [files, setFiles] = useState<FileTree[]>([]);

	useEffect(() => {
		if (commit) {
			invoke("get_file_tree", {
				commit: commit,
			}).then((v) => {
				let value = v as FileTree[];
				setFiles(value);
			});
		}
	}, [commit]);

	return (
		<ScrollArea className="h-screen">
			<SimpleTreeView>
				{files.map((v) => {
					return generate_tree("", v);
				})}
			</SimpleTreeView>
		</ScrollArea>
	);
}

function generate_tree(parent: string, file: FileTree) {
	console.log(file);
	if ("File" in file) {
		return (
			<TreeItem
				itemId={file + "/" + file.File}
				label={
					<a>
						<Icon fileName={file.File} />
						{file.File}
					</a>
				}
			/>
		);
	}

	if (parent != "") {
		parent += "/";
	}

	let tree = file.Dir;

	return (
		<TreeItem
			itemId={parent + "/" + tree.dir}
			label={
				<a>
					<Icon fileName={tree.dir} isDir={true} />
					{tree.dir}
				</a>
			}
		>
			<div>
				{tree.files.map((v) => {
					return generate_tree(parent + tree.dir, v);
				})}
			</div>
		</TreeItem>
	);
}
