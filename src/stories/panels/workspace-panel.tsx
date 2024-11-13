import type { BranchInfo, FileStatus, FileTree } from '@/bindings';
import { type PushStatus, commands } from '@/bindings';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaFolderTree } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import ChangeList from '@/stories/change/change-list';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VscRepoPull, VscRepoPush } from 'react-icons/vsc';
import { match } from 'ts-pattern';

export interface WorkspacePanelProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  branchName: string;
  upstream?: string;
  files?: FileTree[];
  changeSet: FileStatus[];
}

import {
  refreshChanges,
  refreshHeadOid,
  useBranches,
  useFiles,
  useHeadOid,
  useTags,
} from '@/hooks/query';
import { Link } from '@tanstack/react-router';

export default function WorkspacePanel({
  className,
  branchName,
  upstream,
  changeSet,
  ...props
}: WorkspacePanelProps) {
  const { t } = useTranslation();
  const [repoPath] = useAppState(s => [s.repoPath]);
  const { error: fileErr, data: files } = useFiles();
  if (fileErr) {
    NOTIFY.error(fileErr.message);
  }

  const { error: headErr, data: current } = useHeadOid();
  if (headErr) {
    NOTIFY.error(headErr.message);
  }

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
      return item.ref_hash === current?.oid;
    });
    if (item !== undefined && !current?.is_detached) {
      branchName = item.name;
    }
    if (branchName === '' && current) {
      branchName = current?.oid.slice(0, 6);
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
    refreshHeadOid();
    if (!branches) {
      return;
    }
    refreshBranchStatus(repoPath, branches).then(val => {
      if (val) {
        setPushState(val);
      }
    });
  }, [branches, repoPath]);

  return (
    <div
      className={cn(
        'flex h-full max-h-full flex-col gap-2 overflow-y-hidden',
        className,
      )}
      {...props}
    >
      <div className={cn('rounded-xl border p-4 shadow', DEFAULT_STYLE)}>
        <div className="pb-2">
          <div className="pb-2">{branchName}</div>
          {upstream && <Badge>{upstream}</Badge>}
        </div>
        <Separator />
        <div className="pt-2">
          <div className="flex justify-between">
            <Button disabled>{t('workspace.set_as_default')}</Button>
            <Button disabled>{t('workspace.create_pr')}</Button>
            <Button
              className={cn(pushState?.unpull === 0 && 'hidden')}
              onClick={() => {
                if (repoPath && branches) {
                  pullBranch(repoPath, branches);
                }
              }}
            >
              <VscRepoPull />
              {pushState?.unpull}
            </Button>
            <Button className={cn(pushState?.unpush === 0 && 'hidden')}>
              <VscRepoPush />
              {pushState?.unpush}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex min-h-0 grow flex-col gap-2 rounded-xl border p-4 shadow',
          DEFAULT_STYLE,
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>{t('workspace.changed_files')} </span>
            <Avatar
              className={cn(
                'inline-block h-6 w-6 bg-gray-50',
                changeSet.length === 0 && 'hidden',
              )}
            >
              <AvatarFallback>{changeSet.length}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex gap-2">
            {current && (
              <Link
                to="/filetree/$commit"
                params={{
                  commit: current.oid,
                }}
                className={cn(files?.length === 0 && 'pointer-events-none')}
              >
                <FaFolderTree />
              </Link>
            )}
          </div>
        </div>
        <ChangeList changeSet={changeSet} className="grow" />
      </div>
    </div>
  );
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

async function pullBranch(repoPath: string, branches: BranchInfo[]) {
  const currentBranch = branches.find(item => item.is_head);
  if (!currentBranch) {
    return;
  }
  const res = await commands.branchFetch(repoPath, currentBranch.name);
  match(res)
    .with({ status: 'ok' }, () => {
      refreshChanges();
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}
