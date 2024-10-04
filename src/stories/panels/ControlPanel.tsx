import { commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import NOTIFY from '@/lib/notify';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { cn } from '@/lib/utils';
import Project from '@/stories/atoms/Project';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import ControlBar from '../atoms/ControlBar';
import BranchPanel from './BranchPanel';

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

  const currentPath = usePathname();

  return (
    <aside
      className={cn(
        'flex max-h-full w-full flex-col gap-4 overflow-hidden',
        className,
      )}
      {...props}
    >
      <ControlBar />
      <Project />
      <Button variant={'link'} disabled={currentPath === '/main/workspace'}>
        <Link href="/main/workspace">{t('Workspace')}</Link>
      </Button>

      <BranchPanel
        branches={branches}
        tags={tags}
        className="h-full w-full border-none"
      />
    </aside>
  );
}
