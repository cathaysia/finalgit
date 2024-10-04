'use client';
import { type CommitInfo, commands } from '@/bindings';
import NOTIFY from '@/lib/notify';
import { useAppState } from '@/lib/state';
import GitHistory from '@/stories/lists/GitHistory';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

export default function Page() {
  const [repoPath, branches] = useAppState(s => [s.repoPath, s.branches]);
  const [currentHistory, setCurrentHisotry] = useState<CommitInfo[]>([]);

  useEffect(() => {
    const head = branches.find(item => item.is_head);
    if (repoPath && head) {
      commands?.getHistory(repoPath, head.commit).then(v => {
        match(v)
          .with({ status: 'ok' }, v => {
            setCurrentHisotry(v.data);
          })
          .with({ status: 'error' }, err => {
            NOTIFY.error(err.error);
          });
      });
    }
  }, [branches]);
  return <GitHistory history={currentHistory} className="h-full" />;
}
