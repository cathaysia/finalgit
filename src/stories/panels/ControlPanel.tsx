import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import BranchPanel from './BranchPanel';
import Project from '@/stories/atoms/Project';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { useEffect } from 'react';
import { match } from 'ts-pattern';
import ControlBar from '../atoms/ControlBar';
import NOTIFY from '@/lib/notify';

export interface ControlPanelProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function ControlPanel({
  className,
  ...props
}: ControlPanelProps) {
  const { t } = useTranslation();
  const [repoPath, branches, setBranches, tags, setTags] = useAppState(s => [
    s.repoPath,
    s.branches,
    s.setBranches,
    s.tags,
    s.setTags,
  ]);
  const [branchListener] = useRefreshRequest(s => [s.branchListener]);

  useEffect(() => {
    if (repoPath) {
      commands?.getBranchInfo(repoPath).then(v => {
        match(v)
          .with({ status: 'ok' }, val => {
            setBranches(val.data);
          })
          .with({ status: 'error' }, err => {
            NOTIFY.error(err.error);
          });
      });
    }
  }, [repoPath, branchListener]);

  useEffect(() => {
    if (repoPath) {
      commands?.getTagInfo(repoPath).then(v => {
        match(v)
          .with({ status: 'ok' }, val => {
            setTags(val.data);
          })
          .with({ status: 'error' }, err => {
            NOTIFY.error(err.error);
          });
      });
    }
  }, [repoPath]);

  return (
    <aside
      className={cn(
        'w-full flex flex-col max-h-full overflow-hidden gap-4',
        className,
      )}
      {...props}
    >
      <ControlBar />
      <Project />
      <Button variant={'secondary'} className="w-full h-12">
        {t('Workspace')}
      </Button>

      <BranchPanel
        branches={branches}
        tags={tags}
        className="border-none w-full"
      />
    </aside>
  );
}
