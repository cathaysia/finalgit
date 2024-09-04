import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/filetree")({
	component: FileTree,
});

function FileTree() {
	return <div>Hello /filetree!</div>;
}
