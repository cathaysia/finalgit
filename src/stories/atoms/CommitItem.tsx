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
import NOTIFY from '@/lib/notify';
import {
  refreshBranches,
  refreshChanges,
  refreshHead,
  useChanges,
  useHeadState,
} from '@/lib/query';
import { useAppState } from '@/lib/state';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import UserAvatar from '@/stories/atoms/UserAvatar';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import HighLightLabel from './HighlightLabel';

export interface CommitItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  filter?: string;
  commit: CommitInfo;
}

const CommitItem = React.forwardRef<HTMLDivElement, CommitItemProps>(
  ({ className, filter, commit, ...props }, ref) => {
    const summary = commit.summary.slice(0, 50);
    const { t } = useTranslation();
    const names = [commit.author.name];
    const [repoPath, useEmoji] = useAppState(s => [s.repoPath, s.useEmoji]);
    const { data: head } = useHeadState();
    const { data: changes } = useChanges();
    const isDirty = changes === undefined ? false : changes.length !== 0;

    if (commit.author.name !== commit.commiter.name) {
      names.push(commit.commiter.name);
    }
    return (
      <div
        className={cn(
          'flex h-16 items-center justify-between text-wrap border px-2 py-4 font-medium text-sm',
          DEFAULT_STYLE,
          head?.is_detached &&
            head?.oid === commit.oid &&
            'border border-green-600 dark:border-green-600',
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2">
          <HighLightLabel
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
          <UserAvatar userName={names} className="w-4" />
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
      refreshHead();
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
    return text.replace('chore', '⬆️');
  }
  if (text.startsWith('bump')) {
    return text.replace('bump', '⬆️');
  }
  if (text.startsWith('Bump')) {
    return text.replace('Bump', '⬆️');
  }
  if (text.startsWith('Update')) {
    return text.replace('Update', '⬆️');
  }
  if (text.startsWith('Upgrade')) {
    return text.replace('Upgrade', '⬆️');
  }

  return text;
}
