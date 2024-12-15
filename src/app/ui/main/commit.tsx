'use client';

import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBisectState } from '@/hooks/bisect';
import { useHistory } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import { filterCommits } from '@/lib/parser/commit-filter';
import { cn } from '@/lib/utils';
import BisectCard from '@/stories/bisect/bisect-card';
import CommitList from '@/stories/commit/commit-list';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMatching } from 'ts-pattern';
import { useDebounce } from 'use-debounce';

export default function Commit() {
  const [repoPath, commitHead, setCommitHead] = useAppState(s => [
    s.repoPath,
    s.commitHead,
    s.setCommitHead,
  ]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    commands.getRepoHead(repoPath).then(v => {
      if (isMatching({ status: 'ok' }, v)) {
        setCommitHead(v.data.oid);
      }
    });
  }, [repoPath]);

  const [filter, setFilter] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isHighOrder, setIsHighOrder] = useState<boolean>(false);
  const [debounce] = useDebounce(filter, 200);
  const [keyDown, setKeyDown] = useState<number>();
  const { data: history } = useHistory(commitHead || '');
  const currentHistory = history || [];

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
              className="absolute ml-2 h-6 w-6 rounded bg-secondary text-center"
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
      <BisectCard bisectState={bisectState} />
    </div>
  );
}
