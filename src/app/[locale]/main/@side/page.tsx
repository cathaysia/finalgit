'use client';
import ControlBar from '@/app/[locale]/main/ui/controlbar';
import { useBranches, useTags } from '@/hooks/use-query';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import BranchPanel from '@/ui/branch/branch-panel';
import Project from '@/ui/main/project';

export default function ControlPanel() {
  const { error, data: branches } = useBranches();
  if (error) {
    NOTIFY.error(error.message);
  }

  const { error: tagErr, data: tags } = useTags();
  if (tagErr) {
    NOTIFY.error(tagErr.message);
  }

  return (
    <aside
      className={cn(
        'flex h-full max-h-full w-full flex-col gap-2 overflow-hidden',
      )}
    >
      <ControlBar />
      <Project />

      <BranchPanel branches={branches || []} tags={tags || []} />
    </aside>
  );
}
