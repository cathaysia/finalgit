'use client';

import MainPanel from '@/stories/panels/MainPanel';
import { commands, type CommitInfo } from '@/bindings';
import { useAppState } from '@/lib/state';
import { redirect } from 'next/navigation';
import GitHistory from '@/stories/lists/GitHistory';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import NOTIFY from '@/lib/notify';

export default function Home() {
  const [isDiffview] = useAppState(s => [s.isDiffView]);
  if (isDiffview) {
    redirect('/main/diffview/');
  }

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

  return (
    <div className="w-full grid grid-cols-3 h-full">
      <MainPanel className="grow h-full mr-2" />
      <GitHistory history={currentHistory} className="h-full" />
    </div>
  );
}
