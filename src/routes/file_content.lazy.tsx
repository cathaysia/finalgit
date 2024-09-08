import { useFileContentState } from "@/lib/state";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import languageMap from "@/lib/languageMap";
import { basename } from "path";

export const Route = createLazyFileRoute("/file_content")({
	component: FileContent,
});

function FileContent() {
	const [content, file_name] = useFileContentState((s) => [
		s.content,
		s.file_name,
	]);
	const [fileContent, setFileContent] = useState<string>();

	useEffect(() => {
		const v = new TextDecoder().decode(new Uint8Array(content));
		setFileContent(v);
	}, [content]);

	let file_type = get_file_type(file_name);

	return (
		<div>
			<Editor
				value={fileContent}
				defaultLanguage={file_type || undefined}
				width="100vw"
				height="100vh"
				options={{
					fontSize: 16,
					lineHeight: 24,
					fontFamily:
						'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
				}}
			/>
		</div>
	);
}

function get_file_type(file_name: string) {
	const base_name = file_name.split("/").at(-1);
	if (!base_name) {
		return null;
	}
	if (languageMap.fileNames[base_name]) {
		return languageMap.fileNames[base_name];
	}
	const idx = base_name.indexOf(".");
	const ext = base_name.slice(idx);
	if (languageMap.fileExtensions[ext]) {
		return languageMap.fileExtensions[ext];
	}
	const lastExt = base_name.split(".").at(-1);
	if (!lastExt) {
		return null;
	}
	if (lastExt && languageMap.fileExtensions[lastExt]) {
		return languageMap.fileExtensions[lastExt];
	}

	const EXT_MAP: Record<string, string> = {
		md: "markdown",
		toml: "toml",
		rs: "rust",
	};

	if (EXT_MAP[lastExt]) {
		return EXT_MAP[lastExt];
	}

	return null;
}
