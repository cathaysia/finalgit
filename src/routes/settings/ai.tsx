import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/ai")({
    component: () => <div>Hello /settings/ai!</div>,
});
