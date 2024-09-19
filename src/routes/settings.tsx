import Panel from "@/stories/settings/Panel";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
    component: Settings,
});

function Settings() {
    return (
        <div className="h-screen flex">
            <Panel />
            <hr />
            <Outlet />
        </div>
    );
}
