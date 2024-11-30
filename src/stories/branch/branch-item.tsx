import { type BranchInfo, commands } from '@/bindings';
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
  refreshBranches,
  refreshPushStatus,
  useChanges,
  usePushstatus,
  useTags,
} from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { branchCheckout, branchRemove } from '@/lib/operator';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import { FaCodeBranch, FaTag } from 'react-icons/fa';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { match } from 'ts-pattern';
import HighLightLabel from '../atoms/highlight-label';
import BranchRename from './branch-rename';

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
  const { data: tags } = useTags();
  const tag = tags?.find(item => {
    return item.ref_hash === info.oid || item.oid === info.oid;
  });
  const t = useTranslation().t;
  const [opState, setOpState] = useState<OpState>();
  const isHead = info.is_head;
  const isLocal = info.kind === 'Local';
  const [isPulling, setIsPulling] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [repoPath, useEmoji, setCommitHead] = useAppState(s => [
    s.repoPath,
    s.useEmoji,
    s.setCommitHead,
  ]);
  const [isRemoteOpen, setIsRemoteOpen] = useState(false);

  const { error: changeErr, data: changes } = useChanges();
  if (changeErr) {
    NOTIFY.error(changeErr.message);
  }
  const isDirty = changes?.length !== 0;
  const { data: branchStatus } = usePushstatus(
    info.kind === 'Local' ? info.name : '',
  );

  const needPush = branchStatus ? branchStatus.unpush !== 0 : false;
  const needPull = branchStatus ? branchStatus.unpull !== 0 : false;
  const needSync = needPush || needPull;

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
      const res = await commands?.branchCreate(repoPath, newName, info.oid);
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
          defaultValue={info.name}
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
          className="flex w-full min-w-0 flex-col gap-2"
          onClick={async () => {
            if (!repoPath || info.kind !== 'Local' || isHead) {
              return;
            }
            if (await branchCheckout(repoPath, info)) {
              setCommitHead(info.oid);
            }
          }}
        >
          <HighLightLabel
            text={replaceEmoji(info.name, useEmoji)}
            value={info.name}
            filter={filter}
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          />
          <div className="flex min-w-0 gap-2">
            <Badge className="whitespace-nowrap">
              {isLocal ? t('branch.local') : t('branch.remote')}
            </Badge>
            {info.upstream && <Badge>{info.upstream}</Badge>}
            {info.remote && <Badge>{info.remote}</Badge>}
            {tag && (
              <Badge className="flex min-w-0 gap-2">
                <FaTag />
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                  {tag.name}
                </span>
              </Badge>
            )}
          </div>
        </div>
      </div>
      {(isPulling || isPushing) && (
        <CgSpinner className="inline-block animate-spin" />
      )}
      <div className={cn('flex gap-2 text-sm', !needSync && 'hidden')}>
        <div className={cn('flex items-center gap-2', !needPull && 'hidden')}>
          <FaArrowDown />
          <span>{branchStatus?.unpull}</span>
        </div>
        <div className={cn('flex items-center gap-2', !needPush && 'hidden')}>
          <FaArrowUp />
          <span>{branchStatus?.unpush}</span>
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
                onClick={async () => {
                  if (!repoPath) {
                    return;
                  }
                  if (await branchCheckout(repoPath, info)) {
                    setCommitHead(info.oid);
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
            <DropdownMenuItem disabled>{t('branch.details')}</DropdownMenuItem>
            <CollapseMenuGroup
              isOpen={isRemoteOpen}
              trigger={
                <CollapseGroupTrigger
                  isOpen={isRemoteOpen}
                  onClick={e => {
                    setIsRemoteOpen(!isRemoteOpen);
                    e.preventDefault();
                  }}
                >
                  {t('branch.remote')}
                </CollapseGroupTrigger>
              }
            >
              {!isLocal && (
                <CollapseGroupItem disabled>
                  {t(`branch.set_url_of ${info.remote}`)}
                </CollapseGroupItem>
              )}
              <CollapseGroupItem>{t('branch.add_remote')}</CollapseGroupItem>
              {isLocal && (
                <CollapseGroupItem>
                  {t('branch.set_upstream')}
                </CollapseGroupItem>
              )}
            </CollapseMenuGroup>
            <DropdownMenuItem>
              <Link
                to="/filetree/$commit"
                params={{
                  commit: info.oid,
                }}
              >
                {t('branch.view_tree')}
              </Link>
            </DropdownMenuItem>
            {isLocal && (
              <DropdownMenuItem
                disabled={!isHead || isPulling}
                onClick={async () => {
                  if (!repoPath) {
                    return;
                  }
                  setIsPulling(true);
                  await commands.pullBranch(repoPath, info, true, false);
                  setIsPulling(false);
                  refreshPushStatus();
                }}
              >
                {t('branch.pull')}
              </DropdownMenuItem>
            )}
            {isHead && (
              <DropdownMenuItem
                disabled={isPulling || isPushing}
                onClick={async () => {
                  if (!repoPath) {
                    return;
                  }
                  setIsPushing(true);
                  await commands.pushBranch(repoPath, info, false);
                  setIsPushing(false);
                  refreshPushStatus();
                }}
              >
                {t('branch.push')}
              </DropdownMenuItem>
            )}
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
