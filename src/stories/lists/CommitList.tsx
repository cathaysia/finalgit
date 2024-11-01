import type { CommitInfo } from '@/bindings';
import CommitItem from '../atoms/CommitItem';
import VirtualScrollArea from '../atoms/VirtualScrollArea';

export interface CommitListProps
  extends React.ComponentProps<typeof VirtualScrollArea> {
  filter?: string;
  history: CommitInfo[];
}

export default function CommitList({
  className,
  filter,
  history,
  ...props
}: Omit<CommitListProps, 'count' | 'height' | 'getItem'>) {
  return (
    <VirtualScrollArea
      count={history.length}
      height={75}
      getItem={(idx: number) => {
        const item = history[idx];
        return <CommitItem filter={filter} commit={item} />;
      }}
      className={className}
      {...props}
    />
  );
}
