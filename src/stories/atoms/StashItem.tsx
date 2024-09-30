import { commands, type StashInfo } from '@/bindings';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { match } from 'ts-pattern';
import NOTIFY from '@/lib/notify';

export interface StashItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  stash: StashInfo;
}

export default function StashItem({
  className,
  stash,
  ...props
}: StashItemProps) {
  const { t } = useTranslation();
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [refreshStash] = useRefreshRequest(s => [s.refreshStash]);

  async function applyStash() {
    if (!repoPath) {
      return;
    }
    const res = await commands?.stashApply(repoPath, stash.id);
    match(res)
      .with({ status: 'ok' }, _ => {
        refreshStash();
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
        refreshStash();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  return (
    <div
      className={cn('flex gap-2 justify-between w-full', className)}
      {...props}
    >
      <div className="min-w-0">
        <div className="flex gap-2 items-center min-w-0">
          <span
            className="whitespace-nowrap overflow-hidden text-ellipsis"
            title={stash.message}
          >
            {stash.message}
          </span>
          <Badge className="font-mono h-8">{stash.oid.slice(0, 6)}</Badge>
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
