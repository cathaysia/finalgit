'use client';
import { Button } from '@/components/ui/button';
import { useBranches, useTags } from '@/hooks/query';
import { Link } from '@/i18n/routing';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import Project from '@/stories/atoms/project';
import BranchPanel from '@/stories/branch/barnch-panel';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import type React from 'react';
import ControlBar from '../atoms/controlbar';

type ControlPanelProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function ControlPanel({
  className,
  ...props
}: ControlPanelProps) {
  const t = useTranslations();

  const currentPath = usePathname();
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
        className,
      )}
      {...props}
    >
      <ControlBar />
      <Project />
      <Button variant={'link'} disabled={currentPath === '/main/workspace'}>
        <Link href="/main">{t('Workspace')}</Link>
      </Button>

      <BranchPanel
        branches={branches || []}
        tags={tags || []}
        className="h-full w-full border-none"
      />
    </aside>
  );
}
