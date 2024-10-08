import { Button } from '@/components/ui/button';
import NOTIFY from '@/lib/notify';
import { useBranches, useTags } from '@/lib/query';
import { cn } from '@/lib/utils';
import Project from '@/stories/atoms/Project';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import ControlBar from '../atoms/ControlBar';
import BranchPanel from './BranchPanel';

type ControlPanelProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function ControlPanel({
  className,
  ...props
}: ControlPanelProps) {
  const { t } = useTranslation();

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
        branches={branches || []}
        tags={tags || []}
        className="h-full w-full border-none"
      />
    </aside>
  );
}
