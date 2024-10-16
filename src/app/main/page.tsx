import { type CommitInfo, commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NOTIFY from '@/lib/notify';
import { useBranches, useHeadState } from '@/lib/query';
import { useAppState } from '@/lib/state';
import { cn } from '@/lib/utils';
import { RevKind, type Rule, parseReversion } from '@/parser/parser';
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

  const [filter, setFilter] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isHighOrder, setIsHighOrder] = useState<boolean>(false);
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
        return item.message.includes(debounce) || item.hash.includes(debounce);
      });
    }

    return currentHistory;
  }, [currentHistory, debounce]);

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <div className="flex items-center gap-2">
        {isHighOrder && (
          <span className="absolute ml-2 h-6 w-6 rounded bg-gray-800 text-center">
            $
          </span>
        )}
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
          onKeyUp={e => {
            if (e.key === 'Backspace' && filter.length === 0) {
              setIsHighOrder(false);
            }
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
      <GitHistory
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

function filterCommits(filter: string, commits: CommitInfo[]) {
  const expr = parseReversion(filter);
  return expressionFilter(expr, commits);
}

function expressionFilter(expr: Rule, commits: CommitInfo[]): CommitInfo[] {
  if (expr.kind === RevKind.Single) {
    return commits.filter(item => {
      let hash = expr.data.slice(0, 6);
      if (expr.data === 'HEAD') {
        hash = commits[0].hash.slice(0, 6);
      }

      if (expr.isExclude) {
        return item.hash.slice(0, 6) !== hash;
      }
      return item.hash.slice(0, 6) === hash;
    });
  }

  if (expr.kind === RevKind.Since) {
    return commits.filter(item => {
      if (expr.data.isBefore) {
        return item.time < expr.data.data;
      }
      return item.time > expr.data.data;
    });
  }

  if (expr.kind === RevKind.Until) {
    return commits.filter(item => {
      if (expr.data.isBefore) {
        return item.time > expr.data.data;
      }
      return item.time < expr.data.data;
    });
  }

  if (expr.kind === RevKind.Skip) {
    return commits.slice(expr.data);
  }
  if (expr.kind === RevKind.Author) {
    return commits.filter(item => {
      return item.author.name.includes(expr.data);
    });
  }
  if (expr.kind === RevKind.Commiter) {
    return commits.filter(item => {
      return item.commiter.name.includes(expr.data);
    });
  }
  if (expr.kind === RevKind.Grep) {
    return commits.filter(item => {
      const pat = new RegExp(expr.data);
      return pat.test(item.message);
    });
  }
  if (expr.kind === RevKind.RevRange) {
    // TODO
  }
  if (expr.kind === RevKind.RevMulti) {
    return expr.rules.flatMap(expr => {
      return expressionFilter(expr, commits);
    });
  }

  return [];
}
