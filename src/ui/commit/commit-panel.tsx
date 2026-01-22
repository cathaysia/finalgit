'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBisectState } from '@/hooks/use-bisect';
import { useHistory } from '@/hooks/use-query';
import { filterCommits } from '@/lib/parser/commit-filter';
import { cn } from '@/lib/utils';
import BisectCard from '@/ui/bisect/bisect-card';
import CommitList from '@/ui/commit/commit-list';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { FaTimes } from 'react-icons/fa';

export interface CommitPanelProps {
  title: string;
  commit: string;
  subtitle?: string;
  onClose?: () => void;
  className?: string;
}

export default function CommitPanel({
  title,
  commit,
  subtitle,
  onClose,
  className,
}: CommitPanelProps) {
  const t = useTranslations();
  const [filter, setFilter] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isHighOrder, setIsHighOrder] = useState<boolean>(false);
  const [debounce] = useDebounce(filter, 200);
  const [keyDown, setKeyDown] = useState<number>();
  const { data: history } = useHistory(commit);
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
  }, [currentHistory, debounce, isHighOrder]);

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
          <div className="truncate text-sm font-medium">{title}</div>
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
      />
      <BisectCard bisectState={bisectState} />
    </div>
  );
}
