'use client';
import type { FileStatus, FileTree } from '@/bindings';
import { commands } from '@/bindings';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaFolderTree } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import ChangeList from '@/stories/change/change-list';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { VscRepoPull, VscRepoPush } from 'react-icons/vsc';

export interface WorkspacePanelProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  branchName: string;
  upstream?: string;
  files?: FileTree[];
  changeSet: FileStatus[];
}

import {
  refreshPushStatus,
  useBranches,
  useHeadOid,
  usePushstatus,
  useTags,
} from '@/hooks/query';
import { Link } from '@/i18n/routing';
import { produce } from 'immer';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

export default function WorkspacePanel({
  className,
  branchName,
  upstream,
  changeSet,
  ...props
}: WorkspacePanelProps) {
  const t = useTranslations();
  const [repoPath] = useAppState(s => [s.repoPath]);

  const { error: headErr, data: current } = useHeadOid();
  if (headErr) {
    NOTIFY.error(headErr.message);
  }

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
  const { data: pushState } = usePushstatus(branchName);

  const { data: branches } = useBranches();
  const [pushActionState, setPushActionState] = useState({
    isPulling: false,
    isPushing: false,
  });

  return (
    <div
      className={cn(
        'flex h-full max-h-full flex-col gap-2 overflow-y-hidden',
        className,
      )}
      {...props}
    >
      <div className={cn('rounded-xl border p-4 shadow')}>
        <div className="pb-2">
          <div className="pb-2">{branchName}</div>
          {upstream && <Badge>{upstream}</Badge>}
        </div>
        <Separator />
        <div className="pt-2">
          <div className="flex justify-between gap-2">
            <Button disabled>{t('workspace.set_as_default')}</Button>
            <Button disabled>{t('workspace.create_pr')}</Button>
            <Button
              className={cn(
                (!pushState || pushState?.unpull === 0) && 'hidden',
              )}
              onClick={async () => {
                const info = branches?.find(item => item.name === branchName);
                if (!repoPath || !info) {
                  return;
                }

                setPushActionState(
                  produce(d => {
                    d.isPushing = true;
                  }),
                );
                await commands.branchPull(repoPath, info, true, false);
                setPushActionState(
                  produce(d => {
                    d.isPulling = false;
                  }),
                );
                refreshPushStatus();
              }}
            >
              {pushActionState.isPulling ? (
                <CgSpinner className="mr-2 inline-block animate-spin" />
              ) : (
                <VscRepoPull className="mr-2" />
              )}
              {pushState?.unpull}
            </Button>
            <Button
              className={cn(
                (!pushState || pushState?.unpush === 0) && 'hidden',
              )}
              onClick={async () => {
                const info = branches?.find(item => item.name === branchName);
                if (!repoPath || !info) {
                  return;
                }
                setPushActionState(
                  produce(d => {
                    d.isPushing = true;
                  }),
                );

                await commands.branchPush(repoPath, info, true);

                setPushActionState(
                  produce(d => {
                    d.isPushing = false;
                  }),
                );
                refreshPushStatus();
              }}
            >
              {pushActionState.isPushing ? (
                <CgSpinner className="mr-2 inline-block animate-spin" />
              ) : (
                <VscRepoPush className="mr-2" />
              )}
              {pushState?.unpush}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex min-h-0 grow flex-col gap-2 rounded-xl border p-4 shadow',
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
                href={{
                  pathname: '/filetree/',
                  query: {
                    commit: current.oid,
                  },
                }}
              >
                <FaFolderTree className="hover:text-gray-500" />
              </Link>
            )}
          </div>
        </div>
        <ChangeList changeSet={changeSet} className="grow" />
      </div>
    </div>
  );
}
