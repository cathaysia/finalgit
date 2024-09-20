"use client";
import Panel from "@/stories/settings/Panel";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex">
            <Panel />
            <hr />
            {children}
        </div>
    );
}
