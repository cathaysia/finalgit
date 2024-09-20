import ThemeCard from "@/stories/settings/ThemeCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/profile")({
    component: ProfileComponent,
});

function ProfileComponent() {
    return (
        <div className="flex flex-col gap-4 items-center grow m-2">
            <ThemeCard />
        </div>
    );
}
