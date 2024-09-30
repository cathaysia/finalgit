import type { FileStatus, FileTree, StashInfo } from '@/bindings';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { commands, type PushStatus } from '@/bindings';
import { FaFolderTree } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import ChangeList from '@/stories/lists/ChangeList';
import { DEFAULT_STYLE } from '@/lib/style';
import Link from 'next/link';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { VscDiff, VscRepoPull, VscRepoPush } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import NOTIFY from '@/lib/notify';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';

export interface WorkspacePanelProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  branchName: string;
  upstream?: string;
  files?: FileTree[];
  changeSet: FileStatus[];
}

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import StashList from '../lists/StashList';

export default function WorkspacePanel({
  className,
  branchName,
  upstream,
  changeSet,
  ...props
}: WorkspacePanelProps) {
  const { t } = useTranslation();
  const [repoPath, branches, tags, tree, head, setHead] = useAppState(s => [
    s.repoPath,
    s.branches,
    s.tags,
    s.files,
    s.head,
    s.setHead,
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [stashList, setStashList] = useState<StashInfo[]>([]);
  const [refreshStash] = useRefreshRequest(s => [s.refreshStash]);

  async function refreshStashList() {
    if (!repoPath) {
      return;
    }

    const stash = await commands?.stashList(repoPath);
    match(stash).with({ status: 'ok' }, val => {
      setStashList(val.data);
    });
  }

  useEffect(() => {
    refreshStashList();
  }, [refreshStash, repoPath]);

  const [stateListener, refreshState] = useRefreshRequest(s => [
    s.branchListener,
    s.refreshPush,
  ]);
  const [pushState, setPushState] = useState<PushStatus>({
    unpush: 0,
    unpull: 0,
  });

  async function refreshHead() {
    if (!repoPath) {
      return;
    }

    const head = await commands?.getRepoHead(repoPath);
    match(head)
      .with({ status: 'ok' }, val => {
        setHead(val.data);
        console.log(`head === ${val.data}`);
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  if (branchName === '') {
    const item = tags.find(item => {
      return item.ref_hash === head;
    });
    if (item !== undefined) {
      branchName = item.name;
    }
  }

  async function refreshBranchStatus() {
    if (!repoPath) {
      return;
    }
    const currentBranch = branches.find(item => item.is_head);
    if (!currentBranch) {
      return;
    }
    if (currentBranch.remote === null) {
      return;
    }
    const status = await commands.branchStatus(repoPath, currentBranch.name);
    match(status)
      .with({ status: 'ok' }, val => {
        setPushState(val.data);
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  useEffect(() => {
    refreshBranchStatus();
    refreshHead();
  }, [branches, stateListener]);

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
    if (!repoPath) {
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
      <div className={cn('p-4 border rounded-xl shadow', DEFAULT_STYLE)}>
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
          'flex flex-col gap-2 grow p-4 border rounded-xl shadow',
          DEFAULT_STYLE,
        )}
      >
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span>{t('workspace.changed_files')} </span>
            <Avatar className="bg-gray-50 inline-block w-6 h-6">
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
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className={cn(
            'w-[350px] space-y-2',
            stashList.length === 0 && 'hidden',
          )}
          style={{ width: 'var(--radix-popper-anchor-width)' }}
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <CollapsibleTrigger asChild className="w-full items-center">
              {isOpen ? <GoTriangleDown /> : <GoTriangleUp />}
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <StashList stashs={stashList} className="grow" />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
