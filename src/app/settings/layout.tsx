"use client";
import Panel from "@/stories/settings/Panel";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex p-2" data-tauri-drag-region={true}>
            <Panel className="w-1/6 min-w-36" />
            <hr />
            <div
                className="flex flex-col items-center grow m-2"
                data-tauri-drag-region={true}
            >
                <div
                    className="w-1/2 flex flex-col items-center gap-4"
                    data-tauri-drag-region={true}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
