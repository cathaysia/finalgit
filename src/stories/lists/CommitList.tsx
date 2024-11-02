import type { CommitInfo } from '@/bindings';
import type { BisectState } from '@/hooks/bisect';
import type React from 'react';
import CommitItem from '../atoms/CommitItem';
import VirtualScrollArea from '../atoms/VirtualScrollArea';

export interface CommitListProps
  extends React.ComponentProps<typeof VirtualScrollArea> {
  filter?: string;
  history: CommitInfo[];
  bisectState: BisectState;
}

export default function CommitList({
  className,
  filter,
  history,
  bisectState,
  ...props
}: Omit<CommitListProps, 'count' | 'height' | 'getItem'>) {
  return (
    <VirtualScrollArea
      count={history.length}
      height={75}
      getItem={(idx: number) => {
        const item = history[idx];
        return (
          <CommitItem
            filter={filter}
            commit={item}
            isGood={bisectState.good === item.oid}
            isBad={bisectState.bad === item.oid}
            isBisecting={bisectState.isBisecting}
            isNext={bisectState.next === item.oid}
          />
        );
      }}
      className={className}
      {...props}
    />
  );
}
