"use client";
import GitCore from "@/stories/settings/GitCore";
import GitUser from "@/stories/settings/GitUser";

export default function GitComponent() {
    return (
        <div className="w-full flex flex-col gap-4 m-2 items-center">
            <div className="w-1/2 flex flex-col items-center gap-4">
                <GitCore />
                <GitUser />
            </div>
        </div>
    );
}
