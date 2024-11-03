import { type CommitInfo, commands } from '@/bindings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { refreshBisectNext, refreshBisectRange } from '@/hooks/bisect';
import {
  refreshBranches,
  refreshChanges,
  refreshHeadOid,
  refreshHeadState,
  refreshHistory,
  useChanges,
  useHeadOid,
} from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import UserAvatar from '@/stories/atoms/user-avatar';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isMatching, match } from 'ts-pattern';
import HighLightLabel from '../atoms/highlight-label';

export interface CommitItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  filter?: string;
  commit: CommitInfo;
  isGood: boolean | undefined;
  isBad: boolean | undefined;
  isBisecting: boolean | undefined;
  isNext: boolean | undefined;
}

const CommitItem = React.forwardRef<HTMLDivElement, CommitItemProps>(
  (
    {
      className,
      filter,
      commit,
      isGood = false,
      isBad = false,
      isBisecting = false,
      isNext = false,
      ...props
    },
    ref,
  ) => {
    const summary = commit.summary.slice(0, 50);
    const { t } = useTranslation();
    const names = [commit.author.name];
    const [repoPath, useEmoji] = useAppState(s => [s.repoPath, s.useEmoji]);
    const { data: head } = useHeadOid();
    const { data: changes } = useChanges();
    const isDirty = changes === undefined ? false : changes.length !== 0;

    if (commit.author.name !== commit.commiter.name) {
      names.push(commit.commiter.name);
    }
    return (
      <div
        className={cn(
          'flex h-16 items-center justify-between gap-2 text-wrap border px-2 py-4 font-medium text-sm',
          DEFAULT_STYLE,
          isBisecting && 'border-l-2 border-l-gray-600 dark:border-l-gray-600',
          isBad && 'border-l-red-600 dark:border-l-red-600',
          isGood && 'border-l-green-600 dark:border-l-green-600',
          isNext && 'border-l-pink-600 dark:border-l-pink-600',
          !isBisecting &&
            head?.is_detached &&
            head?.oid === commit.oid &&
            'border-green-600 dark:border-green-600',
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="flex grow items-center gap-2 overflow-hidden">
          <HighLightLabel
            className="min-w-0 grow overflow-hidden"
            text={replaceEmoji(summary, useEmoji)}
            value={summary}
            filter={filter}
            onClick={() => {
              if (repoPath && !isDirty) {
                checkoutCommit(repoPath, commit.oid);
                refreshBranches();
              }
            }}
          />
          <Badge
            title={commit.oid}
            className="font-mono"
            onClick={async () => {
              const _ = await writeText(commit.oid);
              NOTIFY.info(
                t('commit.copy_to_clipboard', {
                  val: commit.oid,
                }),
              );
            }}
          >
            {commit.oid.slice(0, 6)}
          </Badge>
          <UserAvatar userName={names} className="max-h-8 max-w-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size="sm">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>{t('commit.details')}</DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/filetree/$commit"
                  params={{
                    commit: commit.oid,
                  }}
                >
                  {t('commit.viewtree')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (repoPath && !isDirty) {
                    checkoutCommit(repoPath, commit.oid);
                    refreshBranches();
                  }
                }}
              >
                {t('commit.checkout')}
              </DropdownMenuItem>
              <DropdownMenuItem>{t('commit.copy')}</DropdownMenuItem>
              <DropdownMenuItem>{t('commit.cut')}</DropdownMenuItem>
              <DropdownMenuItem>{t('commit.insert_before')}</DropdownMenuItem>
              <DropdownMenuItem>{t('commit.insert_after')}</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                {t('commit.delete')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-yellow-600"
                onClick={() => {
                  if (repoPath) {
                    revertCommit(repoPath, commit.oid);
                  }
                }}
              >
                {t('commit.revert')}
              </DropdownMenuItem>
              {isBisecting ? (
                <DropdownMenuItem
                  className="rounded-b-none border-t border-r border-l dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  onClick={() => {
                    if (repoPath) {
                      bisectStop(repoPath);
                    }
                  }}
                >
                  {t('commit.bisect_stop')}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="border-transparent border-t border-r border-l"
                  onClick={e => {
                    if (repoPath) {
                      bisectStart(repoPath);
                    }
                    e.preventDefault();
                  }}
                >
                  {t('commit.bisect_start')}
                </DropdownMenuItem>
              )}
              <motion.div
                className={cn(
                  'overflow-hidden border-r border-b border-l dark:border-zinc-800',
                  !isBisecting && 'border-transparent dark:border-transparent',
                )}
                variants={{
                  visible: {
                    height: 'auto',
                    transition: { duration: 0.2 },
                  },
                  hidden: {
                    height: 0,
                    transition: { duration: 0.2 },
                  },
                }}
                initial="hidden"
                animate={isBisecting ? 'visible' : 'hidden'}
              >
                <DropdownMenuItem
                  className={
                    'flex justify-between gap-2 rounded-none dark:bg-zinc-900 dark:hover:bg-zinc-800'
                  }
                  onClick={() => {
                    if (repoPath) {
                      markGood(repoPath, commit.oid);
                    }
                  }}
                >
                  {t('commit.bisect_mark_good')}
                  <div className="h-2 w-2 bg-green-600" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    'flex justify-between gap-2 dark:bg-zinc-900 dark:hover:bg-zinc-800'
                  }
                  onClick={() => {
                    if (repoPath) {
                      markBad(repoPath, commit.oid);
                    }
                  }}
                >
                  {t('commit.bisect_mark_bad')}
                  <div className="h-2 w-2 bg-red-600" />
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
);

export default CommitItem;

async function checkoutCommit(repoPath: string, commit: string) {
  const res = await commands?.commitCheckout(repoPath, commit);
  match(res)
    .with({ status: 'ok' }, () => {
      refreshHeadOid();
      refreshChanges();
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}

function replaceEmoji(text: string, replace: boolean) {
  if (!replace) {
    return text;
  }

  if (text.startsWith('feat')) {
    return text.replace('feat', '✨');
  }
  if (text.startsWith('fix')) {
    return text.replace('fix', '🐛');
  }
  if (text.startsWith('perf')) {
    return text.replace('perf', '⚡');
  }
  if (text.startsWith('Merge pull request')) {
    return text.replace('Merge pull request', '🔀');
  }
  if (text.startsWith('Merge branch')) {
    return text.replace('Merge branch', '🔀');
  }
  if (text.startsWith('docs')) {
    return text.replace('docs', '📝');
  }
  if (text.startsWith('Revert')) {
    return text.replace('Revert', '⏪');
  }
  if (text.startsWith('refactor')) {
    return text.replace('refactor', '🚚');
  }
  if (text.startsWith('test')) {
    return text.replace('test', '✅');
  }
  if (text.startsWith('ci')) {
    return text.replace('ci', '👷');
  }
  if (text.startsWith('style')) {
    return text.replace('style', '🎨');
  }
  if (text.startsWith('chore')) {
    return text.replace('chore', '⬆');
  }
  if (text.startsWith('bump')) {
    return text.replace('bump', '⬆');
  }
  if (text.startsWith('Bump')) {
    return text.replace('Bump', '⬆');
  }
  if (text.startsWith('Update')) {
    return text.replace('Update', '⬆');
  }
  if (text.startsWith('Upgrade')) {
    return text.replace('Upgrade', '⬆');
  }

  return text;
}

async function revertCommit(repoPath: string, commit: string) {
  const res = await commands.commitRevert(repoPath, commit);
  if (isMatching({ status: 'error' }, res)) {
    NOTIFY.error(res.error);
  }

  refreshHistory();
}

async function markGood(repoPath: string, commit: string) {
  const res = await commands.bisectMarkGood(repoPath, commit);
  if (isMatching({ status: 'error' }, res)) {
    NOTIFY.error(res.error);
    return;
  }
  refreshHeadState();
  refreshBisectRange();
  refreshBisectNext();
}

async function markBad(repoPath: string, commit: string) {
  const res = await commands.bisectMarkBad(repoPath, commit);
  if (isMatching({ status: 'error' }, res)) {
    NOTIFY.error(res.error);
    return;
  }
  refreshHeadState();
  refreshBisectRange();
  refreshBisectNext();
}

async function bisectStart(repoPath: string) {
  const res = await commands.bisectStart(repoPath);
  if (isMatching({ status: 'error' }, res)) {
    NOTIFY.error(res.error);
    return;
  }
  refreshHeadState();
  refreshBisectNext();
}

async function bisectStop(repoPath: string) {
  const res = await commands.bisectStop(repoPath);
  if (isMatching({ status: 'error' }, res)) {
    NOTIFY.error(res.error);
  }

  refreshHeadState();
  refreshBisectRange();
  refreshBisectNext();
  refreshHeadOid();
  refreshHeadState();
}