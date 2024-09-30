import { commands, type TagInfo } from '@/bindings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NOTIFY from '@/lib/notify';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTag } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { match } from 'ts-pattern';
import HighLightLabel from './HighlightLabel';

export interface TagItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  info: TagInfo;
  filter?: string;
}
export function TagItem({ info, filter, className, ...props }: TagItemProps) {
  const t = useTranslation().t;
  const [repoPath, head] = useAppState(s => [s.repoPath, s.head]);
  const [refreshBranch] = useRefreshRequest(s => [s.refreshBranch]);

  async function checkoutTag() {
    if (!repoPath) {
      return;
    }
    console.log(`checkout to ${info.commit}`);
    const res = await commands?.commitCheckout(repoPath, info.commit);
    match(res).with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
    refreshBranch();
  }

  return (
    <div
      className={cn(
        'w-full flex justify-between border rounded-none px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2',
        className,
        DEFAULT_STYLE,
        info.ref_hash === head && 'border-green-600 dark:border-green-600',
      )}
      {...props}
    >
      <span className="text-sm font-medium leading-none items-center flex gap-2">
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
            <DropdownMenuItem>
              <MdDelete className="text-red-600 mr-2 h-4 w-4" />
              <span>{t('tag.delete')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={checkoutTag}>
              <div className="w-4 h-4 mr-2" />
              <span>{t('branch.checkout')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="w-4 h-4 mr-2" />
              <span>{t('tags.create_branch')}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
