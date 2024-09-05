import { ScrollArea } from "@/components/ui/scroll-area";
import { useCommitState, useOpenState } from "@/lib/state";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FileTree } from "@/bindings";
import Icon from "@/components/Icon";
import { commands } from "@/bindings";
import { match } from "ts-pattern";

export const Route = createLazyFileRoute("/filetree")({
	component: FileTreeComponent,
});

function FileTreeComponent() {
	const { isOpened } = useOpenState();
	const { commit } = useCommitState();

	const [files, setFiles] = useState<FileTree[]>([]);

	if (commit) {
		commands.getFileTree(commit).then((v) => {
			match(v)
				.with({ status: "ok" }, (v) => {
					setFiles(v.data);
				})
				.with({ status: "error" }, (err) => {
					console.log(err.status);
				});
		});
	}

	useEffect(() => {
		if (commit) {
			commands.getFileTree(commit).then((v) => {
				match(v)
					.with({ status: "ok" }, (v) => {
						setFiles(v.data);
					})
					.with({ status: "error" }, (err) => {
						console.log(err.status);
					});
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
	if ("File" in file) {
		let key = file + "/" + file.File;
		return (
			<TreeItem
				itemId={key}
				key={key}
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
	let key = file + "/" + tree.dir;

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
					return generate_tree(parent + tree.dir, v);
				})}
			</div>
		</TreeItem>
	);
}
