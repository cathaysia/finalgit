'use client';

import { type BranchInfo, commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBisectState } from '@/hooks/use-bisect';
import {
  refreshBranches,
  refreshChanges,
  refreshHeadOid,
  refreshHeadState,
  refreshHistory,
  useChanges,
  useHeadOid,
  useHistory,
} from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import NOTIFY from '@/lib/notify';
import { branchCheckout } from '@/lib/operator';
import { filterCommits } from '@/lib/parser/commit-filter';
import { cn } from '@/lib/utils';
import BisectCard from '@/ui/bisect/bisect-card';
import CommitList from '@/ui/commit/commit-list';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { isMatching } from 'ts-pattern';
import { useDebounce } from 'use-debounce';

export interface CommitPanelProps {
  title: string;
  commit: string;
  subtitle?: string;
  onClose?: () => void;
  className?: string;
  isPrimary?: boolean;
  targetBranch?: BranchInfo;
}

export default function CommitPanel({
  title,
  commit,
  subtitle,
  onClose,
  className,
  isPrimary = false,
  targetBranch,
}: CommitPanelProps) {
  const t = useTranslations();
  const [repoPath, cherryPickQueue, addCherryPickCommit, clearCherryPickQueue] =
    useAppStore(s => [
      s.repoPath,
      s.cherryPickQueue,
      s.addCherryPickCommit,
      s.clearCherryPickQueue,
    ]);
  const [filter, setFilter] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isHighOrder, setIsHighOrder] = useState<boolean>(false);
  const [debounce] = useDebounce(filter, 200);
  const [keyDown, setKeyDown] = useState<number>();
  const { data: history } = useHistory(commit);
  const currentHistory = history || [];
  const { data: changes } = useChanges();
  const { data: head } = useHeadOid();
  const [isCherryPicking, setIsCherryPicking] = useState(false);

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
  }, [currentHistory, debounce, isHighOrder]);

  const isDirty = changes ? changes.length !== 0 : false;

  const handleCherryPick = async () => {
    if (!repoPath || !targetBranch) {
      return;
    }
    if (cherryPickQueue.length === 0) {
      return;
    }
    if (isDirty) {
      NOTIFY.error(t('commit.cherrypick_dirty'));
      return;
    }
    setIsCherryPicking(true);
    const canCheckout =
      head?.is_detached || !head || head.oid !== targetBranch.oid;
    if (canCheckout) {
      const checkedOut = await branchCheckout(repoPath, targetBranch);
      if (!checkedOut) {
        setIsCherryPicking(false);
        return;
      }
    }

    let blocked = false;

    for (const oid of cherryPickQueue) {
      const res = await commands.cherrypick(repoPath, oid);
      if (isMatching({ status: 'error' }, res)) {
        NOTIFY.error(res.error);
        blocked = true;
        break;
      }
      const stateRes = await commands.repoGetStatus(repoPath);
      if (
        isMatching({ status: 'ok' }, stateRes) &&
        (stateRes.data === 'CherryPick' ||
          stateRes.data === 'CherryPickSequence')
      ) {
        NOTIFY.error(t('commit.cherrypick_conflict'));
        blocked = true;
        break;
      }
    }

    refreshHeadState();
    refreshBranches();
    refreshHeadOid();
    refreshChanges();
    refreshHistory();
    setIsCherryPicking(false);
    if (!blocked) {
      clearCherryPickQueue();
    }
  };

  if (currentHistory.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex h-full w-[380px] shrink-0 flex-col gap-2 rounded border p-2 shadow',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2 px-1 pt-1">
        <div className="min-w-0">
          <div className="truncate font-medium text-sm">{title}</div>
          {subtitle && (
            <div className="text-muted-foreground text-xs">{subtitle}</div>
          )}
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label={t('commit.close_panel')}
            title={t('commit.close_panel')}
          >
            <FaTimes />
          </Button>
        )}
      </div>
      {isPrimary && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <Button
            className={cn(cherryPickQueue.length === 0 && 'hidden')}
            onClick={handleCherryPick}
            disabled={
              !targetBranch ||
              cherryPickQueue.length === 0 ||
              isCherryPicking ||
              !repoPath ||
              isDirty
            }
          >
            {t('commit.copy')}
          </Button>
        </div>
      )}
      <div className={cn('flex items-center', filter.length !== 0 && 'gap-2')}>
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
          className={cn(
            'rounded-sm',
            !isValid && 'text-red-600',
            isHighOrder && 'pl-10',
          )}
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
        filter={isHighOrder ? undefined : filter}
        className="min-h-0 flex-1"
        onCherryPick={item => {
          addCherryPickCommit(item.oid);
        }}
      />
      <BisectCard bisectState={bisectState} />
    </div>
  );
}
