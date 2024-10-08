import type { BranchInfo, FileStatus, FileTree } from '@/bindings';
import { type PushStatus, commands } from '@/bindings';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaFolderTree } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import NOTIFY from '@/lib/notify';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import ChangeList from '@/stories/lists/ChangeList';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VscDiff, VscRepoPull, VscRepoPush } from 'react-icons/vsc';
import { match } from 'ts-pattern';

export interface WorkspacePanelProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  branchName: string;
  upstream?: string;
  files?: FileTree[];
  changeSet: FileStatus[];
}

import { useBranches, useFiles, useStashList, useTags } from '@/lib/query';
import StashCard from '../card/StashCard';

export default function WorkspacePanel({
  className,
  branchName,
  upstream,
  changeSet,
  ...props
}: WorkspacePanelProps) {
  const { t } = useTranslation();
  const [repoPath, head, setHead] = useAppState(s => [
    s.repoPath,
    s.head,
    s.setHead,
  ]);
  const { error: stashErr, data: stashList } = useStashList();
  if (stashErr) {
    NOTIFY.error(stashErr.message);
  }
  const { error: fileErr, data: files } = useFiles();
  if (fileErr) {
    NOTIFY.error(fileErr.message);
  }
  const tree = files || [];

  const [refreshState] = useRefreshRequest(s => [s.refreshPush]);
  const [pushState, setPushState] = useState<PushStatus>({
    unpush: 0,
    unpull: 0,
  });

  const { error: tagErr, data: tags } = useTags();
  if (tagErr) {
    NOTIFY.error(tagErr.message);
  }

  if (branchName === '') {
    const item = tags?.find(item => {
      return item.ref_hash === head;
    });
    if (item !== undefined) {
      branchName = item.name;
    }
  }

  const { error, data: branches } = useBranches();
  if (error) {
    NOTIFY.error(error.message);
  }

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    refreshHead(repoPath).then(val => {
      if (val) {
        setHead(val);
      }
    });
    if (!branches) {
      return;
    }
    refreshBranchStatus(repoPath, branches).then(val => {
      if (val) {
        setPushState(val);
      }
    });
  }, [branches, repoPath]);

  async function pushBranch() {
    if (!repoPath) {
      return;
    }
    const res = await commands.branchPush(repoPath, false);
    match(res)
      .with({ status: 'ok' }, () => {
        refreshState();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  async function pullBranch() {
    if (!repoPath || !branches) {
      return;
    }
    const currentBranch = branches.find(item => item.is_head);
    if (!currentBranch) {
      return;
    }
    const res = await commands.branchFetch(repoPath, currentBranch.name);
    match(res)
      .with({ status: 'ok' }, () => {
        refreshState();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className={cn('rounded-xl border p-4 shadow', DEFAULT_STYLE)}>
        <div className="pb-2">
          <div className="pb-2">{branchName}</div>
          {upstream && <Badge>{upstream}</Badge>}
        </div>
        <Separator />
        <div className="pt-2">
          <div className="flex justify-between">
            <Button disabled={true}>{t('workspace.set_as_default')}</Button>
            <Button>{t('workspace.create_pr')}</Button>
            <Button
              className={cn(pushState?.unpull === 0 && 'hidden')}
              onClick={pullBranch}
            >
              <VscRepoPull />
              {pushState?.unpull}
            </Button>
            <Button
              className={cn(pushState?.unpush === 0 && 'hidden')}
              onClick={pushBranch}
            >
              <VscRepoPush />
              {pushState?.unpush}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex grow flex-col gap-2 rounded-xl border p-4 shadow',
          DEFAULT_STYLE,
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>{t('workspace.changed_files')} </span>
            <Avatar className="inline-block h-6 w-6 bg-gray-50">
              <AvatarFallback>{changeSet.length}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex gap-2">
            <Link href="/diff" className={cn(tree.length === 0 && 'hidden')}>
              <VscDiff />
            </Link>
            <Link
              href="/filetree"
              className={cn(tree.length === 0 && 'pointer-events-none')}
            >
              <FaFolderTree />
            </Link>
          </div>
        </div>
        <ChangeList changeSet={changeSet} className="grow" />
        <StashCard
          className={cn(stashList?.length === 0 && 'hidden')}
          stashList={stashList || []}
        />
      </div>
    </div>
  );
}

async function refreshHead(repoPath: string) {
  const head = await commands?.getRepoHead(repoPath);
  return match(head)
    .with({ status: 'ok' }, val => {
      return val.data;
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
      return undefined;
    })
    .exhaustive();
}

async function refreshBranchStatus(repoPath: string, branches: BranchInfo[]) {
  const currentBranch = branches.find(item => item.is_head);
  if (!currentBranch) {
    return;
  }
  if (currentBranch.remote === null) {
    return;
  }
  const status = await commands.branchStatus(repoPath, currentBranch.name);
  return match(status)
    .with({ status: 'ok' }, val => {
      return val.data;
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
      return undefined;
    })
    .exhaustive();
}
