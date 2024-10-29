import { type BranchInfo, commands } from '@/bindings';
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
import { branchCheckout, branchRemove } from '@/lib/operator';
import { refreshBranches, useChanges } from '@/lib/query';
import { useAppState } from '@/lib/state';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCodeBranch } from 'react-icons/fa';
import { match } from 'ts-pattern';
import BranchRename from './BranchRename';
import HighLightLabel from './HighlightLabel';

export interface BranchItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  info: BranchInfo;
  filter?: string;
  className?: string;
  onRename?: (name: string) => void;
  onDelete?: () => void;
}

enum OpState {
  Renaming = 1,
  NewBranch = 2,
}

export default function BranchItem({
  info,
  filter,
  onRename,
  onDelete,
  className,
  ...props
}: BranchItemProps) {
  const t = useTranslation().t;
  const [opState, setOpState] = useState<OpState>();
  const isHead = info.is_head;
  const branchName = info.name;
  const upstream = info.remote;
  const isLocal = info.kind === 'Local';
  const [repoPath, useEmoji] = useAppState(s => [s.repoPath, s.useEmoji]);

  const { error: changeErr, data: changes } = useChanges();
  if (changeErr) {
    NOTIFY.error(changeErr.message);
  }
  const isDirty = changes?.length !== 0;

  async function renameBranch(newName: string) {
    if (!repoPath || !opState) {
      return;
    }
    if (opState === OpState.Renaming) {
      const res = await commands?.branchRename(repoPath, info, newName);
      match(res)
        .with({ status: 'ok' }, () => {
          refreshBranches();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    } else {
      const res = await commands?.branchCreate(repoPath, newName, info.commit);
      match(res)
        .with({ status: 'ok' }, () => {
          refreshBranches();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    }
    setOpState(undefined);
  }

  if (opState) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-none border px-4 py-3 dark:bg-neutral-900 dark:text-white',
          DEFAULT_STYLE,
          isHead && 'border-green-600',
          className,
        )}
        {...props}
      >
        <BranchRename
          defaultValue={branchName}
          onCancel={() => {
            setOpState(undefined);
          }}
          onConfirm={renameBranch}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-none border px-4 py-3',
        DEFAULT_STYLE,
        isHead && 'border-green-600 dark:border-green-600',
        className,
      )}
      {...props}
    >
      <div className="flex w-full min-w-0 items-center gap-2">
        <FaCodeBranch className="inline-block max-h-4 min-h-4 min-w-4 max-w-4" />
        <div
          className="flex w-full flex-col gap-2"
          onClick={() => {
            if (repoPath && info.kind === 'Local' && !isHead) {
              branchCheckout(repoPath, info);
            }
          }}
        >
          <HighLightLabel
            text={replaceEmoji(branchName, useEmoji)}
            value={branchName}
            filter={filter}
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          />
          <div className="flex gap-2">
            <Badge>{isLocal ? t('branch.local') : t('branch.remote')}</Badge>
            {upstream && <Badge>{upstream}</Badge>}
          </div>
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
            <DropdownMenuItem
              onClick={() => {
                setOpState(OpState.Renaming);
              }}
            >
              {t('branch.rename')}
            </DropdownMenuItem>
            {!isHead && (
              <DropdownMenuItem
                disabled={isDirty}
                onClick={() => {
                  if (repoPath) {
                    branchCheckout(repoPath, info);
                  }
                }}
                className={cn(
                  !isLocal && 'text-yellow-500 hover:text-yellow-500',
                )}
                title={(() => {
                  if (isDirty) {
                    return t('branch.disable_dirty');
                  }
                  if (!isLocal) {
                    return t('branch.checkout_remote');
                  }
                })()}
              >
                {t('branch.checkout')}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                setOpState(OpState.NewBranch);
              }}
            >
              {t('branch.create_new_branch')}
            </DropdownMenuItem>
            <DropdownMenuItem>{t('branch.details')}</DropdownMenuItem>
            <DropdownMenuItem>{t('branch.set_upstream')}</DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to="/filetree/$commit"
                params={{
                  commit: info.commit,
                }}
              >
                {t('branch.view_tree')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>{t('branch.pull')}</DropdownMenuItem>
            <DropdownMenuItem>{t('branch.push')}</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                if (repoPath) {
                  branchRemove(repoPath, info);
                }
              }}
            >
              {t('branch.delete')}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function replaceEmoji(text: string, replace: boolean) {
  if (!replace) {
    return text;
  }

  if (text.startsWith('dev/')) {
    return text.replace('dev/', '🔧');
  }
  if (text.startsWith('feature/')) {
    return text.replace('feature/', '✨');
  }
  if (text.startsWith('feat/')) {
    return text.replace('feat/', '✨');
  }
  if (text.startsWith('bugfix/')) {
    return text.replace('bugfix/', '🐛');
  }
  if (text.startsWith('fix/')) {
    return text.replace('fix/', '🐛');
  }
  if (text.startsWith('hotfix/')) {
    return text.replace('hotfix/', '🚑');
  }
  if (text.startsWith('release/')) {
    return text.replace('release/', '🔖');
  }
  if (text.startsWith('dependabot/')) {
    return text.replace('dependabot/', '🤖');
  }

  return text;
}
