import { type FileStatus, commands } from '@/bindings';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import GitFileStatus from '@/lib/file_status';
import NOTIFY from '@/lib/notify';
import { refreshChanges } from '@/lib/query';
import { useAppState } from '@/lib/state';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { match } from 'ts-pattern';
import ChangeItem from '../atoms/ChangeItem';
import Commiter from '../atoms/Commiter';
import VirtualScrollArea from '../atoms/VirtualScrollArea';

export interface ChangeListProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  changeSet: FileStatus[];
}

export default function ChangeList({ className, changeSet }: ChangeListProps) {
  const repoPath = useAppState(s => s.repoPath);

  const allChecked = useMemo(() => {
    const hasUnIndexed =
      changeSet.find(item => !GitFileStatus.isIndexed(item.status)) !==
      undefined;
    const hasIndexed =
      changeSet.find(item => GitFileStatus.isIndexed(item.status)) !==
      undefined;

    if (hasUnIndexed && hasIndexed) {
      return 'indeterminate';
    }

    return !hasUnIndexed;
  }, [changeSet]);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex w-full">
        <Checkbox
          checked={allChecked}
          onCheckedChange={() =>
            repoPath &&
            toggleAllChecked(repoPath, changeSet, allChecked === true)
          }
          hidden={changeSet.length === 0}
        />
      </div>
      <VirtualScrollArea
        count={changeSet.length}
        height={35}
        getItem={(idx: number) => {
          const item = changeSet[idx];
          return (
            <ChangeItem
              key={item.path}
              item={{
                path: item.path,
                status: item.status,
              }}
            />
          );
        }}
        className="grow"
      />
      <Separator />
      <Commiter changeSet={changeSet} />
    </div>
  );
}

async function toggleAllChecked(
  repoPath: string,
  changeSet: FileStatus[],
  allChecked: boolean,
) {
  if (!repoPath) {
    return;
  }
  const changed = changeSet.map(item => item.path);

  if (allChecked) {
    const res = await commands.removeFromStage(repoPath, changed);
    match(res)
      .with({ status: 'ok' }, () => {
        refreshChanges();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  } else {
    const res = await commands.addToStage(repoPath, changeSet);
    match(res)
      .with({ status: 'ok' }, () => {
        refreshChanges();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }
}
