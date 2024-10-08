import { type CommitInfo, commands } from '@/bindings';
import NOTIFY from '@/lib/notify';
import { useBranches } from '@/lib/query';
import { useAppState } from '@/lib/state';
import GitHistory from '@/stories/lists/GitHistory';
import ControlPanel from '@/stories/panels/ControlPanel';
import MainPanel from '@/stories/panels/MainPanel';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

export const Route = createFileRoute('/main/')({
  component: Layout,
});

function Layout() {
  const [isDiffview] = useAppState(s => [s.isDiffView]);

  return (
    <div className="grid h-screen w-screen grid-cols-4 gap-2 p-2">
      {!isDiffview && <ControlPanel className="h-full" />}
      <MainPanel className="mr-2 h-full grow" />
      {!isDiffview && <Commit />}
      {isDiffview && <DiffView />}
    </div>
  );
}

export default function Commit() {
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [currentHistory, setCurrentHisotry] = useState<CommitInfo[]>([]);
  const { error, data: branches } = useBranches();
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
  }, [repoPath, branches]);
  return <GitHistory history={currentHistory} className="h-full" />;
}

function DiffView() {
  return (
    <div className="flex h-full w-full gap-2">
      <div>TODO</div>
    </div>
  );
}
