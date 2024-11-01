import { type CommitInfo, commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBranches, useHeadOid, useHeadState } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { filterCommits } from '@/lib/parser/commitFilter';
import { cn } from '@/lib/utils';
import CommitList from '@/stories/lists/CommitList';
import ControlPanel from '@/stories/panels/ControlPanel';
import MainPanel from '@/stories/panels/MainPanel';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'sonner';
import { isMatching, match } from 'ts-pattern';
import { useDebounce } from 'use-debounce';

export const Route = createFileRoute('/main/')({
  component: Layout,
});

function Layout() {
  const [repoPath, isDiffview] = useAppState(s => [s.repoPath, s.isDiffView]);
  const { t } = useTranslation();

  const [bisectId, setBisectId] = useState<number | string | undefined>();

  const { data: state } = useHeadState();
  useEffect(() => {
    const isBisect = isMatching('Bisect', state);
    if (isBisect && !bisectId) {
      const id = toast(
        <div
          className={cn(
            'flex items-center gap-2',
            'rounded-2xl bg-primary pt-1 pr-4 pb-1 pl-4 text-white dark:text-black',
          )}
        >
          <CgSpinner className="inline-block animate-spin" />
          <span>{t('island.bisecting')}</span>
        </div>,
        {
          duration: Number.POSITIVE_INFINITY,
          unstyled: true,
          position: 'top-center',
        },
      );
      setBisectId(id);
    }
  }, [state]);

  useEffect(() => {
    const isBisect = isMatching('Bisect', state);
    if (!isBisect && bisectId) {
      toast.dismiss(bisectId);
      setBisectId(undefined);
    }
  }, [bisectId, state]);

  return (
    <div
      className="grid h-screen w-screen grid-cols-4 gap-2 p-2"
      data-tauri-drag-region={true}
    >
      {!isDiffview && <ControlPanel className="h-full" />}
      <MainPanel className="mr-2 h-full grow" />
      {repoPath && !isDiffview && <Commit />}
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
        <Button
          onClick={() => {
            setFilter('');
          }}
        >
          {t('Cancel')}
        </Button>
      </div>
      <CommitList
        history={filteredData}
        filter={filter.startsWith('$') ? undefined : filter}
      />
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
