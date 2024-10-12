import { type CommitInfo, commands } from '@/bindings';
import NOTIFY from '@/lib/notify';
import { useBranches, useHeadState } from '@/lib/query';
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
  const { error: headErr, data: head } = useHeadState();
  if (headErr) {
    NOTIFY.error(headErr.message);
  }

  useEffect(() => {
    let trueHead = branches?.find(item => {
      return item.is_head;
    })?.commit;
    if (trueHead === undefined) {
      trueHead = head?.oid;
    }
    if (repoPath && trueHead) {
      commands?.getHistory(repoPath, trueHead).then(v => {
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
