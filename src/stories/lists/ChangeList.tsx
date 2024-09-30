import { commands, type FileStatus } from '@/bindings';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import Commiter from '../atoms/Commiter';
import { useAppState, useRefreshRequest } from '@/lib/state';
import ChangeItem from '../atoms/ChangeItem';
import { match } from 'ts-pattern';
import NOTIFY from '@/lib/notify';
import GitFileStatus from '@/lib/file_status';
import { Checkbox } from '@/components/ui/checkbox';
import VirtualScrollArea from '../atoms/VirtualScrollArea';

export interface ChangeListProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  changeSet: FileStatus[];
}

export default function ChangeList({ className, changeSet }: ChangeListProps) {
  const repoPath = useAppState(s => s.repoPath);
  const refreshStage = useRefreshRequest(s => s.refreshStage);

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

  async function toggleAllChecked() {
    if (!repoPath) {
      return;
    }
    const changed = changeSet.map(item => item.path);

    if (allChecked) {
      const res = await commands.removeFromStage(repoPath, changed);
      match(res)
        .with({ status: 'ok' }, () => {
          refreshStage();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    } else {
      const res = await commands.addToStage(repoPath, changeSet);
      match(res)
        .with({ status: 'ok' }, () => {
          refreshStage();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="w-full flex">
        <Checkbox
          checked={allChecked}
          onCheckedChange={toggleAllChecked}
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
