import { Button } from '@/components/ui/button';
import { useBranches, useTags } from '@/hooks/query';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import Project from '@/stories/atoms/project';
import BranchPanel from '@/stories/branch/barnch-panel';
import { Link, useLocation } from '@tanstack/react-router';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import ControlBar from '../atoms/controlbar';

type ControlPanelProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function ControlPanel({
  className,
  ...props
}: ControlPanelProps) {
  const { t } = useTranslation();

  const currentPath = useLocation().pathname;
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
        'flex max-h-full w-full flex-col gap-4 overflow-hidden',
        className,
      )}
      {...props}
    >
      <ControlBar />
      <Project />
      <Button variant={'link'} disabled={currentPath === '/main/workspace'}>
        <Link to="/main">{t('Workspace')}</Link>
      </Button>

      <BranchPanel
        branches={branches || []}
        tags={tags || []}
        className="h-full w-full border-none"
      />
    </aside>
  );
}
