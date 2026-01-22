'use client';

import { commands } from '@/bindings';
import { useBranches } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import CommitPanel from '@/ui/commit/commit-panel';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { isMatching } from 'ts-pattern';

export default function Commit() {
  const [repoPath, commitHead, setCommitHead, commitPanels, removeCommitPanel] =
    useAppStore(s => [
      s.repoPath,
      s.commitHead,
      s.setCommitHead,
      s.commitPanels,
      s.removeCommitPanel,
    ]);
  const t = useTranslations();
  const { error: branchErr, data: branches } = useBranches();
  if (branchErr) {
    NOTIFY.error(branchErr.message);
  }

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    commands.repoGetHead(repoPath).then(v => {
      if (isMatching({ status: 'ok' }, v)) {
        setCommitHead(v.data.oid);
      }
    });
  }, [repoPath]);

  if (!commitHead && commitPanels.length === 0) {
    return <></>;
  }

  const headBranch =
    branches?.find(item => item.oid === commitHead) ||
    branches?.find(item => item.is_head);
  const primaryTitle = headBranch?.name || t('commit.head');
  const extraPanels = commitPanels.filter(panel => panel.oid !== commitHead);

  return (
    <div className="col-span-2 flex h-full flex-col gap-2 overflow-hidden">
      <div className={cn('flex h-full gap-2 overflow-x-auto pb-2')}>
        {commitHead && (
          <CommitPanel
            title={primaryTitle}
            subtitle={commitHead.slice(0, 6)}
            commit={commitHead}
          />
        )}
        {extraPanels.map(panel => (
          <CommitPanel
            key={panel.id}
            title={panel.name}
            subtitle={panel.oid.slice(0, 6)}
            commit={panel.oid}
            onClose={() => removeCommitPanel(panel.id)}
          />
        ))}
      </div>
    </div>
  );
}
