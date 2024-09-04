import { ScrollArea } from "@/components/ui/scroll-area";
import { GitDir, GitFileTree, GitFile } from "@/lib/files";
import { useOpenState } from "@/lib/state";
import { createLazyFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { GoFile, GoFileDirectory, GoFileDirectoryFill } from "react-icons/go";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FaGithub, FaMarkdown, FaRust } from "react-icons/fa";
import { TbLicense, TbToml } from "react-icons/tb";
import { SiAsciidoctor, SiEditorconfig, SiYaml } from "react-icons/si";

export const Route = createLazyFileRoute("/filetree")({
	component: FileTreeComponent,
});

function FileTreeComponent() {
	const { isOpened } = useOpenState();

	const [files, setFiles] = useState<GitFileTree[]>([]);

	useEffect(() => {
		invoke("get_file_tree", {
			commit: "a980365813f6909dc952f4adf96412dcde4ff709",
		}).then((v) => {
			let value = v as GitFileTree[];
			setFiles(value);
		});
	}, [isOpened]);

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

function get_icon_by_name(name: string) {
	if (name.endsWith(".rs")) {
		return <FaRust className="inline" />;
	}
	if (name.endsWith(".toml")) {
		return <TbToml className="inline" />;
	}
	if (name == "LICENSE") {
		return <TbLicense className="inline" />;
	}
	if (name.endsWith(".md")) {
		return <FaMarkdown className="inline" />;
	}
	if (name.endsWith(".adoc")) {
		return <SiAsciidoctor className="inline" />;
	}
	if (name.endsWith(".yaml") || name.endsWith(".yml")) {
		return <SiYaml className="inline" />;
	}
	if (name == ".github") {
		return <FaGithub className="inline" />;
	}
	if (name == ".editorconfig") {
		return <SiEditorconfig className="inline" />;
	}
	return <GoFile className="inline" />;
}

function generate_tree(parent: string, file: GitFileTree) {
	console.log(file);
	if ("File" in file) {
		let gitfile = file as GitFile;
		return (
			<TreeItem
				itemId={file + "/" + gitfile.File}
				label={
					<a>
						{get_icon_by_name(gitfile.File)}
						{gitfile.File}
					</a>
				}
			/>
		);
	}

	let tree = (file as GitDir).Dir;
	if (parent != "") {
		parent += "/";
	}

	return (
		<TreeItem
			itemId={parent + "/" + tree.dir}
			label={
				<a>
					{get_icon_by_name(tree.dir)}
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
