import { type CommitInfo, commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBisectState } from '@/hooks/bisect';
import { useBranches, useHeadOid } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { filterCommits } from '@/lib/parser/commit-filter';
import { cn } from '@/lib/utils';
import RebaseCard from '@/stories/card/rebase-card';
import CommitList from '@/stories/lists/commit-list';
import ControlPanel from '@/stories/panels/control-panel';
import MainPanel from '@/stories/panels/main-panel';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { useDebounce } from 'use-debounce';

export const Route = createFileRoute('/main/')({
  component: Layout,
});

function Layout() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return (
    <div
      className="grid h-screen w-screen grid-cols-4 gap-2 p-2"
      data-tauri-drag-region={true}
    >
      <ControlPanel className="h-full" />
      <MainPanel className="mr-2 h-full grow" />
      {repoPath && <Commit />}
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
  const { error: headErr, data: head } = useHeadOid();
  if (headErr) {
    NOTIFY.error(headErr.message);
  }

  const [filter, setFilter] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isHighOrder, setIsHighOrder] = useState<boolean>(false);
  const [debounce] = useDebounce(filter, 200);
  const [keyDown, setKeyDown] = useState<number>();

  useEffect(() => {
    let trueHead = branches?.find(item => {
      return item.is_head;
    })?.commit;
    if (trueHead === undefined) {
      trueHead = head?.oid;
    }
    if (repoPath && trueHead) {
      commands?.getCommitsFrom(repoPath, trueHead).then(v => {
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

  const bisectState = useBisectState(currentHistory);
  const filteredData = useMemo(() => {
    if (!debounce) {
      return currentHistory;
    }
    if (isHighOrder) {
      if (debounce.length !== 0) {
        try {
          const res = filterCommits(debounce, currentHistory);
          setIsValid(true);
          return res;
        } catch {
          setIsValid(false);
        }
      }
    } else {
      setIsValid(true);
      return currentHistory.filter(item => {
        return item.message.includes(debounce) || item.oid.includes(debounce);
      });
    }

    return currentHistory;
  }, [currentHistory, debounce]);

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {isHighOrder && (
            <motion.span
              className="absolute ml-2 h-6 w-6 rounded bg-gray-800 text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              $
            </motion.span>
          )}
        </AnimatePresence>
        <Input
          value={filter}
          className={cn(!isValid && 'text-red-600', isHighOrder && 'pl-10')}
          spellCheck={false}
          onChange={e => {
            if (!isHighOrder) {
              if (e.target.value.startsWith('$')) {
                setFilter(e.target.value.replace('$', ''));
                setIsHighOrder(true);
                return;
              }
            }
            setFilter(e.target.value);
          }}
          onKeyDown={e => {
            if (!keyDown && filter.length === 0 && e.key === 'Backspace') {
              setKeyDown(new Date().getTime());
            }
          }}
          onKeyUp={e => {
            if (e.key === 'Backspace' && filter.length === 0 && keyDown) {
              const duration = new Date().getTime() - keyDown;
              if (duration <= 200) {
                setIsHighOrder(false);
              }
            }
            setKeyDown(undefined);
          }}
        />
        <motion.div
          variants={{
            visible: {
              width: 'auto',
              transition: { duration: 0.2 },
            },
            hidden: {
              width: 0,
              transition: { duration: 0.2 },
            },
          }}
          initial="hidden"
          animate={filter.length !== 0 ? 'visible' : 'hidden'}
        >
          <Button
            onClick={() => {
              setFilter('');
            }}
            className={cn(filter.length === 0 && 'hidden')}
          >
            {t('Cancel')}
          </Button>
        </motion.div>
      </div>
      <CommitList
        history={filteredData}
        bisectState={bisectState}
        filter={filter.startsWith('$') ? undefined : filter}
      />
      <RebaseCard bisectState={bisectState} />
    </div>
  );
}
