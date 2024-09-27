'use client';

import { attachConsole } from '@tauri-apps/plugin-log';

import MainPanel from '@/stories/panels/MainPanel';
import { useQuery } from '@tanstack/react-query';
import { commands } from '@/bindings';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { match } from 'ts-pattern';
import { trace } from '@tauri-apps/plugin-log';
import NOTIFY from '@/lib/notify';
import ControlPanel from '@/stories/panels/ControlPanel';

export default function Home() {
    typeof window !== 'undefined' && attachConsole();
    const repoPath = useAppState(s => s.repoPath);
    const [setBranchListener, setStageListener] = useRefreshRequest(s => [
        s.setBranchListener,
        s.setStageListener,
    ]);

    useQuery({
        queryKey: ['.git/logs/HEAD'],
        queryFn: async () => {
            if (!repoPath) {
                return 0;
            }
            const res = await commands?.getHeadModifyTime(repoPath);
            match(res)
                .with({ status: 'ok' }, v => {
                    setBranchListener(v.data);
                    setStageListener(v.data);
                    trace(`refreshTime: ${v.data}`);
                    return v.data;
                })
                .with({ status: 'error' }, err => {
                    NOTIFY.error(err.error);
                });

            return 0;
        },
        retry: false,
        refetchInterval: 1000,
        refetchOnWindowFocus: 'always',
        refetchOnReconnect: true,
    });
    return (
        <div className="flex gap-2 w-screen h-screen">
            <ControlPanel className="w-1/4" />
            <MainPanel className="grow" />
        </div>
    );
}
