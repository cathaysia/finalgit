import type { CommitInfo } from '@/bindings';
import Commit from '../atoms/Commit';
import VirtualScrollArea from '../atoms/VirtualScrollArea';

export interface GitHistoryProps
  extends React.ComponentProps<typeof VirtualScrollArea> {
  history: CommitInfo[];
}

export default function GitHistory({
  className,
  history,
  ...props
}: Omit<GitHistoryProps, 'count' | 'height' | 'getItem'>) {
  return (
    <VirtualScrollArea
      count={history.length}
      height={65}
      getItem={(idx: number) => {
        const item = history[idx];
        return <Commit commit={item} />;
      }}
      className={className}
      {...props}
    />
  );
}
