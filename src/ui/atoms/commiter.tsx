'use client';

import { type FileStatus, commands } from '@/bindings';
import { refreshChanges } from '@/hooks/query';
import { useAppStore } from '@/hooks/use-store';
import GitFileStatus from '@/lib/git-file-status';
import NOTIFY from '@/lib/notify';
import { useState } from 'react';
import { CommiterButton } from './commiter-button';
import { CommitCommit } from './commiter-commit';

export interface CommiterProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  files?: string[];
  changeSet: FileStatus[];
}

export default function Commiter({ changeSet, ...props }: CommiterProps) {
  const [isCommiting, setIsCommiting] = useState(false);
  const [repoPath] = useAppStore(s => [s.repoPath]);

  return isCommiting ? (
    <CommitCommit
      onCancel={() => {
        setIsCommiting(false);
      }}
      {...props}
    />
  ) : (
    <CommiterButton
      changeSet={changeSet}
      onClicked={() => {
        startCommit(changeSet, repoPath);
        setIsCommiting(true);
      }}
      {...props}
    />
  );
}

async function startCommit(changeSet: FileStatus[], repoPath?: string) {
  if (!repoPath) {
    return;
  }
  const hasIndexed = changeSet
    .map(item => GitFileStatus.isIndexed(item.status))
    .reduce((l, r) => l || r);
  if (!hasIndexed) {
    const allfiles = changeSet.filter(
      item => !GitFileStatus.isConflicted(item.status),
    );
    if (allfiles.length === 0) {
      return;
    }
    const res = await commands?.stageAddFiles(repoPath, allfiles);
    if (res.status === 'error') {
      NOTIFY.error(res.error);
      return;
    }
    refreshChanges();
  }
}
