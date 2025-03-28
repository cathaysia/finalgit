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
} from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import { Link } from '@/i18n/routing';
import NOTIFY from '@/lib/notify';
import { branchCheckout, branchRemove } from '@/lib/operator';
import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';
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
  const t = useTranslations('branch');
  const [opState, setOpState] = useState<OpState>();
  const isHead = info.is_head;
  const isLocal = info.kind === 'Local';
  const [isPulling, setIsPulling] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [repoPath, useEmoji, setCommitHead] = useAppStore(s => [
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

  const { ref, isDropTarget } = useDroppable({ id: 'branch' });

  if (opState) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-none border px-4 py-3',
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
          onConfirm={name => {
            renameBranch(name, info, repoPath, opState);
            setOpState(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-none border px-4 py-3',
        isHead && 'border-green-600 dark:border-green-600',
        isDropTarget && 'bg-secondary/80',
        className,
      )}
      ref={ref}
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
              {isLocal ? t('local') : t('remote')}
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
              {t('rename')}
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
                    return t('disable_dirty');
                  }
                  if (!isLocal) {
                    return t('checkout_remote');
                  }
                })()}
              >
                {t('checkout')}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                setOpState(OpState.NewBranch);
              }}
            >
              {t('create_new_branch')}
            </DropdownMenuItem>
            <DropdownMenuItem disabled>{t('details')}</DropdownMenuItem>
            <CollapseMenuGroup
              isOpen={isRemoteOpen}
              trigger={
                <CollapseGroupTrigger
                  isOpen={isRemoteOpen}
                  onClick={e => {
                    setIsRemoteOpen(!isRemoteOpen);
                    e.preventDefault();
                  }}
                  disabled
                >
                  {t('remote')}
                </CollapseGroupTrigger>
              }
            >
              {!isLocal && (
                <CollapseGroupItem disabled>
                  {t('set_url_of', {
                    branch: info.remote,
                  })}
                </CollapseGroupItem>
              )}
              <CollapseGroupItem>{t('add_remote')}</CollapseGroupItem>
              {isLocal && (
                <CollapseGroupItem>{t('set_upstream')}</CollapseGroupItem>
              )}
            </CollapseMenuGroup>
            <DropdownMenuItem>
              <Link
                href={{
                  pathname: '/filetree/',
                  query: {
                    commit: info.oid,
                  },
                }}
              >
                {t('view_tree')}
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
                  await commands.branchPull(repoPath, info, true, false);
                  setIsPulling(false);
                  refreshPushStatus();
                }}
              >
                {t('pull')}
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
                  await commands.branchPush(repoPath, info, false);
                  setIsPushing(false);
                  refreshPushStatus();
                }}
              >
                {t('push')}
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
              {t('delete')}
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

async function renameBranch(
  newName: string,
  info: BranchInfo,
  repoPath?: string,
  opState?: OpState,
) {
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
}
