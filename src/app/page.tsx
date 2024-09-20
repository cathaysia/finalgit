"use client";

import { attachConsole } from "@tauri-apps/plugin-log";

import MainPanel from "@/stories/panels/MainPanel";
import { useQuery } from "@tanstack/react-query";
import { commands } from "@/bindings";
import { useAppState, useRefreshRequest } from "@/lib/state";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";
import { trace } from "@tauri-apps/plugin-log";
import ErrorSonner from "@/stories/ErrorSonner";

export default function Home() {
    return (
        <div>
            <App />
            <ErrorSonner />
        </div>
    );
}

function App() {
    typeof window !== "undefined" && attachConsole();
    const repo_path = useAppState((s) => s.repo_path);
    const [setBranchListener, setStageListener] = useRefreshRequest((s) => [
        s.setBranchListener,
        s.setStageListener,
    ]);
    const setError = useErrorState((s) => s.setError);

    useQuery({
        queryKey: [".git/logs/HEAD"],
        queryFn: async () => {
            if (!repo_path) {
                return 0;
            }
            const res = await commands?.getHeadModifyTime(repo_path);
            match(res)
                .with({ status: "ok" }, (v) => {
                    setBranchListener(v.data);
                    setStageListener(v.data);
                    trace(`refreshTime: ${v.data}`);
                    return v.data;
                })
                .with({ status: "error" }, (v) => {
                    setError(v.error);
                });

            return 0;
        },
        retry: false,
        refetchInterval: 1000,
        refetchOnWindowFocus: "always",
        refetchOnReconnect: true,
    });
    return <MainPanel project_name={""} branches={[]} tags={[]} />;
}
