'use client';
import { type CommitInfo, commands } from '@/bindings';
import NOTIFY from '@/lib/notify';
import { queryBranches } from '@/lib/query';
import { useAppState } from '@/lib/state';
import GitHistory from '@/stories/lists/GitHistory';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

export default function Page() {
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [currentHistory, setCurrentHisotry] = useState<CommitInfo[]>([]);
  const { error, data: branches } = queryBranches();
  if (error) {
    NOTIFY.error(error.message);
  }

  useEffect(() => {
    if (!branches) {
      return;
    }
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
