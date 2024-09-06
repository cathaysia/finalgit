import { useFileContentState } from "@/lib/state";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/file_content")({
	component: FileContent,
});

function FileContent() {
	const content = useFileContentState((s) => s.content);
	const [fileContent, setFileContent] = useState<string>();

	useEffect(() => {
		const v = new TextDecoder().decode(new Uint8Array(content));
		setFileContent(v);
	}, [content]);

	return (
		<textarea
			value={fileContent}
			className="w-full min-h-svh font-mono text-base"
		/>
	);
}
