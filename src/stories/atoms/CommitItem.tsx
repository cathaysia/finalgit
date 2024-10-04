import type { CommitInfo } from '@/bindings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import UserAvatar from '@/stories/atoms/UserAvatar';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import NOTIFY from '@/lib/notify';
import { useTranslation } from 'react-i18next';
import HighLightLabel from './HighlightLabel';
import React from 'react';

export interface CommitItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  filter?: string;
  commit: CommitInfo;
}

const CommitItem = React.forwardRef<HTMLDivElement, CommitItemProps>(
  ({ className, filter, commit, ...props }, ref) => {
    const branchName = commit.summary.slice(0, 50);
    const { t } = useTranslation();
    const names = [commit.author.name];

    if (commit.author.name !== commit.commiter.name) {
      names.push(commit.commiter.name);
    }
    return (
      <div
        className={cn(
          'border h-16 py-4 px-2 text-sm font-medium items-center flex justify-between text-wrap',
          DEFAULT_STYLE,
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2">
          <HighLightLabel text={branchName} filter={filter} />
          <Badge
            title={commit.hash}
            className="font-mono"
            onClick={async () => {
              const _ = await writeText(commit.hash);
              NOTIFY.info(
                t('commit.copy_to_clipboard', {
                  val: commit.hash,
                }),
              );
            }}
          >
            {commit.hash.slice(0, 6)}
          </Badge>
          <UserAvatar userName={names} className="w-4" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size="sm">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>{t('commit.details')}</DropdownMenuItem>
              <DropdownMenuItem>{t('commit.copy')}</DropdownMenuItem>
              <DropdownMenuItem>{t('commit.cut')}</DropdownMenuItem>
              <DropdownMenuItem>{t('commit.insert_before')}</DropdownMenuItem>
              <DropdownMenuItem>{t('commit.insert_after')}</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                {t('commit.delete')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
);

export default CommitItem;
