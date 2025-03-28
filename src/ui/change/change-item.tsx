import { type FileStatus, commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { refreshChanges } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import GitFileStatus from '@/lib/git-file-status';
import NOTIFY from '@/lib/notify';
import { stageAddFile, stageDiscardFile } from '@/lib/operator';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { match } from 'ts-pattern';
import { Diff } from './diff';
import { FilePreview } from './file_preview';

export interface ChangeItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  item: FileStatus;
  checked?: boolean;
}

function ChangeItem({ className, item, ...props }: ChangeItemProps) {
  const t = useTranslations('stage');
  const [repoPath] = useAppStore(s => [s.repoPath]);

  const isChecked = getCheckedStatus(item.status);
  const isConflicted = GitFileStatus.isConflicted(item.status);
  const isDeleted = GitFileStatus.isDeleted(item.status);
  const isModified = GitFileStatus.isModified(item.status);
  const isNew = GitFileStatus.isNew(item.status);

  const { ref } = useDraggable({
    id: item.path,
  });

  return (
    <div
      className={cn('flex items-center justify-between', className)}
      {...props}
      ref={ref}
    >
      <div className="flex grow items-center gap-2">
        <Checkbox
          defaultChecked={GitFileStatus.isIndexed(item.status)}
          checked={isChecked}
          onCheckedChange={s =>
            repoPath && handleCheckedChange(repoPath, s, item)
          }
        />
        <HoverCard>
          <HoverCardTrigger className="grow">
            <Label
              className={cn(
                'line-clamp-2 overflow-y-hidden text-wrap break-all',
                isConflicted &&
                  'text-red-600 underline decoration-wavy dark:text-red-600',
                isDeleted && 'line-through',
                isNew && 'text-green-600 dark:text-green-600',
                isModified && 'text-yellow-600 dark:text-yellow-600',
              )}
            >
              {item.path}
            </Label>
          </HoverCardTrigger>
          <HoverCardContent className="w-[520px]">
            {isNew && !GitFileStatus.isIndexed(item.status) ? (
              <FilePreview item={item} />
            ) : (
              <Diff item={item} />
            )}
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size="sm">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={cn(!isChecked && 'hidden')}
                onClick={async () => {
                  if (!repoPath) {
                    return;
                  }
                  const v = await commands.stageRemoveFiles(repoPath, [
                    item.path,
                  ]);
                  match(v)
                    .with({ status: 'ok' }, () => refreshChanges())
                    .with({ status: 'error' }, err => NOTIFY.error(err.error));
                }}
              >
                {t('unstage')}
              </DropdownMenuItem>
              <DropdownMenuItem disabled>{t('diff')}</DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  if (!repoPath) {
                    return;
                  }
                  const res = await commands?.fileAddIgnore(
                    repoPath,
                    item.path,
                  );
                  if (res.status === 'error') {
                    NOTIFY.error(res.error);
                  }
                }}
              >
                {t('ignore file')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  if (!repoPath) {
                    return;
                  }
                  const res = await commands?.fileAddExclude(
                    repoPath,
                    item.path,
                  );
                  if (res.status === 'error') {
                    NOTIFY.error(res.error);
                  }
                }}
              >
                {t('exclude file')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => repoPath && stageDiscardFile(repoPath, item)}
              >
                {t('discard')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

async function handleCheckedChange(
  repoPath: string,
  e: CheckedState,
  item: FileStatus,
) {
  if (e === true) {
    stageAddFile(repoPath, item);
  }
  if (e === false) {
    const v = await commands?.stageRemoveFiles(repoPath, [item.path]);
    match(v)
      .with({ status: 'ok' }, () => {
        refreshChanges();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }
}

export default ChangeItem;

export function getCheckedStatus(status: number) {
  const isIndexed = GitFileStatus.isIndexed(status);
  const isWt = GitFileStatus.isWt(status);
  if (isIndexed && isWt) {
    return 'indeterminate';
  }

  return isIndexed;
}
