import { type TagInfo, commands } from '@/bindings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { refreshBranches, useHeadOid } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTag } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { match } from 'ts-pattern';
import HighLightLabel from '../atoms/highlight-label';

export interface TagItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  info: TagInfo;
  filter?: string;
}
export function TagItem({ info, filter, className, ...props }: TagItemProps) {
  const t = useTranslation().t;
  const [repoPath] = useAppState(s => [s.repoPath]);
  const { error: headErr, data: head } = useHeadOid();
  if (headErr) {
    NOTIFY.error(headErr.message);
  }

  async function checkoutTag() {
    if (!repoPath) {
      return;
    }
    console.log(`checkout to ${info.commit}`);
    const res = await commands?.commitCheckout(repoPath, info.commit);
    match(res).with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
    refreshBranches();
  }

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-none border px-4 py-3 dark:bg-neutral-900 dark:text-white',
        className,
        DEFAULT_STYLE,
        info.ref_hash === head?.oid && 'border-green-600 dark:border-green-600',
      )}
      {...props}
    >
      <span className="flex items-center gap-2 font-medium text-sm leading-none">
        <FaTag className="inline-block" />
        <HighLightLabel text={info.name} filter={filter} />
        <Badge className="font-mono">{info.ref_hash.slice(0, 6)}</Badge>
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size="sm">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <MdDelete className="mr-2 h-4 w-4 text-red-600" />
              <span>{t('tag.delete')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={checkoutTag}>
              <div className="mr-2 h-4 w-4" />
              <span>{t('branch.checkout')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <div className="mr-2 h-4 w-4" />
              <span>{t('tags.create_branch')}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
