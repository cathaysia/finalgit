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
import GitFileStatus from '@/lib/gitFileStatus';
import NOTIFY from '@/lib/notify';
import { stageAddFile, stageDiscardFile } from '@/lib/operator';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VscDiff, VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc';
import { match } from 'ts-pattern';

export interface ChangeItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  item: FileStatus;
  checked?: boolean;
}

const ChangeItem = React.forwardRef<HTMLDivElement, ChangeItemProps>(
  ({ className, item, ...props }, ref) => {
    const { t } = useTranslation();
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
        <div className="flex gap-2">
          <Checkbox
            defaultChecked={GitFileStatus.isIndexed(item.status)}
            checked={isChecked}
            onCheckedChange={s =>
              repoPath && handleCheckedChange(repoPath, s, item)
            }
          />
          <Label
            className={cn(
              DEFAULT_STYLE,
              isConflicted &&
                'text-red-600 underline decoration-wavy dark:text-red-600',
              isDeleted && 'line-through',
              isNew && 'text-green-600 dark:text-gray-600',
              isModified && 'text-yellow-600 dark:text-yellow-600',
            )}
            title={
              (isModified && t('change.modified')) ||
              (isDeleted && t('change.deleted')) ||
              (isNew && t('change.new_file')) ||
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
                  className={cn(isChecked && 'hidden')}
                  onClick={() => repoPath && stageAddFile(repoPath, item)}
                >
                  <VscDiffAdded className="mr-2 h-4 w-4" />
                  {t('changes.add')}
                </DropdownMenuItem>
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
                  <VscDiffRemoved className="mr-2 h-4 w-4" />
                  {t('changes.unstage')}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <VscDiff className="mr-2 h-4 w-4" />
                  {t('changes.diff')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => repoPath && stageDiscardFile(repoPath, item)}
                >
                  <VscDiffRemoved className="mr-2 h-4 w-4" />
                  {t('changes.discard')}
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
