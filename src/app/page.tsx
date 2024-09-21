'use client';

import { attachConsole } from '@tauri-apps/plugin-log';

import MainPanel from '@/stories/panels/MainPanel';
import { useQuery } from '@tanstack/react-query';
import { commands } from '@/bindings';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { match } from 'ts-pattern';
import { useErrorState } from '@/lib/error';
import { trace } from '@tauri-apps/plugin-log';

export default function Home() {
    typeof window !== 'undefined' && attachConsole();
    const repoPath = useAppState(s => s.repoPath);
    const [setBranchListener, setStageListener] = useRefreshRequest(s => [
        s.setBranchListener,
        s.setStageListener,
    ]);
    const setError = useErrorState(s => s.setError);

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
                .with({ status: 'error' }, v => {
                    setError(v.error);
                });

            return 0;
        },
        retry: false,
        refetchInterval: 1000,
        refetchOnWindowFocus: 'always',
        refetchOnReconnect: true,
    });
    return <MainPanel projectName={''} branches={[]} tags={[]} />;
}
