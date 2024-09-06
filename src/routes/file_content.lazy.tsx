import { useFileContentState } from "@/lib/state";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

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

	return (
		<div>
			<Editor
				value={fileContent}
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
