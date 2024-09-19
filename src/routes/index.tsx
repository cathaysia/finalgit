import MainPanel from "@/stories/panels/MainPanel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return <MainPanel project_name={""} branches={[]} tags={[]} />;
}
