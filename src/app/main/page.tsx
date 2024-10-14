import { type CommitInfo, commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NOTIFY from '@/lib/notify';
import { useBranches, useHeadState } from '@/lib/query';
import { useAppState } from '@/lib/state';
import { parseReversion } from '@/parser/parser';
import GitHistory from '@/stories/lists/GitHistory';
import ControlPanel from '@/stories/panels/ControlPanel';
import MainPanel from '@/stories/panels/MainPanel';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { useDebounce } from 'use-debounce';

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
  const { t } = useTranslation();
  if (error) {
    NOTIFY.error(error.message);
  }
  const { error: headErr, data: head } = useHeadState();
  if (headErr) {
    NOTIFY.error(headErr.message);
  }

  const [filter, setFilter] = useState<string>();
  const [debounce] = useDebounce(filter, 200);

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

  const filteredData = useMemo(() => {
    if (!debounce) {
      return currentHistory;
    }
    const tree = parseReversion(debounce);
    console.log(tree);
    // TODO: support more grammar
    // https://git-scm.com/docs/revisions#Documentation/revisions.txt
    const Matcher = /^(HEAD|@|[0-9a-z]{6,40})[~\^](\d+)$/;
    const v = Matcher.exec(debounce);
    if (v?.length === 3) {
      const refname = v[1].slice(0, 6);
      const starts = currentHistory.findIndex(item => {
        return refname === item.hash.slice(0, 6);
      });
      const skip = Number(v[2]) + (starts === -1 ? 0 : starts);
      return currentHistory.slice(skip);
    }

    return currentHistory.filter(item => {
      return item.message.includes(debounce) || item.hash.includes(debounce);
    });
  }, [currentHistory, debounce]);

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <div className="flex gap-2">
        <Input
          value={filter}
          spellCheck={false}
          onChange={e => {
            setFilter(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            setFilter(undefined);
          }}
        >
          {t('Cancel')}
        </Button>
      </div>
      <GitHistory history={filteredData} filter={filter} />
    </div>
  );
}

function DiffView() {
  return (
    <div className="flex h-full w-full gap-2">
      <div>TODO</div>
    </div>
  );
}
