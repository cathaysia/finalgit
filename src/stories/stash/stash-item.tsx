import { type StashInfo, commands } from '@/bindings';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { refreshChanges } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { match } from 'ts-pattern';

export interface StashItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  stash: StashInfo;
}

export default function StashItem({
  className,
  stash,
  ...props
}: StashItemProps) {
  const t = useTranslations();
  const [repoPath] = useAppState(s => [s.repoPath]);

  async function applyStash() {
    if (!repoPath) {
      return;
    }
    const res = await commands?.stashApply(repoPath, stash.id);
    match(res)
      .with({ status: 'ok' }, _ => {
        refreshChanges();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  async function deleteStash() {
    if (!repoPath) {
      return;
    }
    const res = await commands?.stashRemove(repoPath, stash.id);
    match(res)
      .with({ status: 'ok' }, _ => {
        refreshChanges();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  return (
    <div
      className={cn('flex w-full justify-between gap-2', className)}
      {...props}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="overflow-hidden text-ellipsis whitespace-nowrap"
            title={stash.message}
          >
            {stash.message}
          </span>
          <Badge className="h-8 font-mono">{stash.oid.slice(0, 6)}</Badge>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={applyStash}>
              {t('stash.apply')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteStash} className="text-red-600">
              {t('stash.delete')}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
