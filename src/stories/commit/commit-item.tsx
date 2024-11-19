import { type CommitInfo, commands } from '@/bindings';
import { AvatarGroup } from '@/components/ext/avatar-group';
import {
  CollapseGroupItem,
  CollapseGroupTrigger,
  CollapseMenuGroup,
} from '@/components/ext/collapse-group';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { refreshBisectNext, refreshBisectRange } from '@/hooks/bisect';
import {
  refreshBranches,
  refreshChanges,
  refreshHeadOid,
  refreshHeadState,
  refreshHistory,
  useChanges,
  useHeadOid,
  useTags,
} from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTag } from 'react-icons/fa';
import { isMatching, match } from 'ts-pattern';
import HighLightLabel from '../atoms/highlight-label';
import { UserAvatar } from '../atoms/user-avatar';
import CommitCard from './commit-card';
import HoverAvatar from './hover-avatar';

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
    const { data: tags } = useTags();
    const tag = tags?.find(item => {
      return item.ref_hash === commit.oid || item.oid === commit.oid;
    });
    const summary = commit.summary.slice(0, 50);
    const { t } = useTranslation();
    const names = [
      {
        name: commit.author.name,
        email: commit.author.email,
      },
    ];
    const [repoPath, useEmoji] = useAppState(s => [s.repoPath, s.useEmoji]);
    const { data: head } = useHeadOid();
    const { data: changes } = useChanges();
    const isDirty = changes === undefined ? false : changes.length !== 0;

    if (commit.author.name !== commit.commiter.name) {
      names.push({
        name: commit.commiter.name,
        email: commit.commiter.email,
      });
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
          <div className="flex min-w-0 grow flex-col gap-2">
            <HoverCard>
              <HoverCardTrigger>
                <HighLightLabel
                  className="min-w-0 grow overflow-hidden"
                  text={replaceEmoji(summary, useEmoji)}
                  value={summary}
                  filter={filter}
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-auto">
                <CommitCard info={commit} />
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-center gap-2">
            {tag && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge>
                      <FaTag />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>{tag.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
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
            <AvatarGroup>
              {names.map(item => {
                return (
                  <HoverCard key={item.name}>
                    <HoverCardTrigger>
                      <UserAvatar
                        userName={item.name}
                        className="max-h-8 max-w-8"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[120]">
                      <HoverAvatar userName={item.name} email={item.email} />
                    </HoverCardContent>
                  </HoverCard>
                );
              })}
            </AvatarGroup>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size="sm">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                {t('commit.details')}
              </DropdownMenuItem>
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
              <CollapseMenuGroup
                isOpen={false}
                trigger={
                  <CollapseGroupTrigger isOpen={false} disabled>
                    {t('commit.cherrypick')}
                  </CollapseGroupTrigger>
                }
              >
                <DropdownMenuItem disabled>{t('commit.copy')}</DropdownMenuItem>
                <DropdownMenuItem disabled>{t('commit.cut')}</DropdownMenuItem>
                <DropdownMenuItem disabled>
                  {t('commit.insert_before')}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  {t('commit.insert_after')}
                </DropdownMenuItem>
              </CollapseMenuGroup>
              <DropdownMenuItem className="text-red-600" disabled>
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
              <CollapseMenuGroup
                isOpen={isBisecting}
                trigger={
                  <CollapseGroupTrigger
                    isOpen={isBisecting}
                    onClick={e => {
                      if (!repoPath) {
                        return;
                      }
                      if (isBisecting) {
                        bisectStop(repoPath);
                      } else {
                        bisectStart(repoPath);
                        e.preventDefault();
                      }
                    }}
                  >
                    {isBisecting ? t('bisect.stop') : t('bisect.start')}
                  </CollapseGroupTrigger>
                }
              >
                <CollapseGroupItem
                  onClick={() => {
                    if (repoPath) {
                      markGood(repoPath, commit.oid);
                    }
                  }}
                >
                  {t('bisect.mark_good')}
                  <div className="h-2 w-2 bg-green-600" />
                </CollapseGroupItem>
                <CollapseGroupItem
                  onClick={() => {
                    if (repoPath) {
                      markBad(repoPath, commit.oid);
                    }
                  }}
                >
                  {t('bisect.mark_bad')}
                  <div className="h-2 w-2 bg-red-600" />
                </CollapseGroupItem>
              </CollapseMenuGroup>
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

export async function bisectStop(repoPath: string) {
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
