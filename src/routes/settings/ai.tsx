import AiCard from "@/stories/settings/AiCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/ai")({
    component: AiComponent,
});

function AiComponent() {
    return (
        <div className="flex flex-col gap-4 items-center grow m-2">
            <div className="w-1/2 items-center">
                <AiCard />
            </div>
        </div>
    );
}
