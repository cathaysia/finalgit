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
import { Label } from '@/components/ui/label';
import { refreshChanges } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import GitFileStatus from '@/lib/git-file-status';
import NOTIFY from '@/lib/notify';
import { stageAddFile, stageDiscardFile } from '@/lib/operator';
import { cn } from '@/lib/utils';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import React from 'react';
import { match } from 'ts-pattern';

export interface ChangeItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  item: FileStatus;
  checked?: boolean;
}

const ChangeItem = React.forwardRef<HTMLDivElement, ChangeItemProps>(
  ({ className, item, ...props }, ref) => {
    const t = useTranslations('stage');
    const [repoPath] = useAppState(s => [s.repoPath]);

    function getCheckedStatus(status: number) {
      const isIndexed = GitFileStatus.isIndexed(status);
      const isWt = GitFileStatus.isWt(status);
      if (isIndexed && isWt) {
        return 'indeterminate';
      }

      return isIndexed;
    }

    const isChecked = getCheckedStatus(item.status);
    const isConflicted = GitFileStatus.isConflicted(item.status);
    const isDeleted = GitFileStatus.isDeleted(item.status);
    const isModified = GitFileStatus.isModified(item.status);
    const isNew = GitFileStatus.isNew(item.status);

    return (
      <div
        className={cn('flex items-center justify-between', className)}
        {...props}
        ref={ref}
      >
        <div className="flex items-center gap-2">
          <Checkbox
            defaultChecked={GitFileStatus.isIndexed(item.status)}
            checked={isChecked}
            onCheckedChange={s =>
              repoPath && handleCheckedChange(repoPath, s, item)
            }
          />
          <Label
            className={cn(
              'line-clamp-2 overflow-y-hidden text-wrap break-all',
              isConflicted &&
                'text-red-600 underline decoration-wavy dark:text-red-600',
              isDeleted && 'line-through',
              isNew && 'text-green-600 dark:text-green-600',
              isModified && 'text-yellow-600 dark:text-yellow-600',
            )}
            title={
              (isModified && t('modified')) ||
              (isDeleted && t('deleted')) ||
              (isNew && t('new_file')) ||
              undefined
            }
          >
            {item.path}
          </Label>
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
                      .with({ status: 'error' }, err =>
                        NOTIFY.error(err.error),
                      );
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
  },
);

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
