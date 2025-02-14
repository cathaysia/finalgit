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
import { refreshBranches, useHeadOid } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { useTranslations } from 'next-intl';
import type React from 'react';
import { FaTag } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { match } from 'ts-pattern';
import HighLightLabel from '../atoms/highlight-label';

export interface TagItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  info: TagInfo;
  filter?: string;
}
export function TagItem({ info, filter, className, ...props }: TagItemProps) {
  const t = useTranslations();
  const [repoPath] = useAppStore(s => [s.repoPath]);
  const { error: headErr, data: head } = useHeadOid();
  if (headErr) {
    NOTIFY.error(headErr.message);
  }

  return (
    <div
      className={cn(
        'flex w-full items-center gap-2 rounded-none border px-4 py-3 dark:text-white',
        className,
        info.ref_hash === head?.oid && 'border-green-600 dark:border-green-600',
      )}
      {...props}
    >
      <div className="flex grow items-center gap-2">
        <FaTag className="inline-block" />
        <div className="flex min-w-0 grow flex-col gap-2">
          <HighLightLabel
            className="min-w-0"
            text={info.name}
            filter={filter}
          />
          <div>
            <Badge className="font-mono">{info.ref_hash.slice(0, 6)}</Badge>
          </div>
        </div>
      </div>
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
            <DropdownMenuItem onClick={() => checkoutTag(repoPath, info)}>
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

async function checkoutTag(repoPath: string | undefined, info: TagInfo) {
  if (!repoPath) {
    return;
  }
  console.log(`checkout to ${info.oid}`);
  const res = await commands?.commitCheckout(repoPath, info.oid);
  match(res).with({ status: 'error' }, err => {
    NOTIFY.error(err.error);
  });
  refreshBranches();
}
