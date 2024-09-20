import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/git")({
    component: GitComponent,
});

function GitComponent() {
    return <div>Hello /settings/Git!</div>;
}
