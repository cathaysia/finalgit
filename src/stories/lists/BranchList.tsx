import type { BranchInfo } from '@/bindings';
import { cn } from '@/lib/utils';
import BranchItem from '@/stories/atoms/BranchItem';
import VirtualScrollArea from '../atoms/VirtualScrollArea';

export interface BranchListProps
  extends React.ComponentProps<typeof VirtualScrollArea> {
  branches: BranchInfo[];
  filter?: string;
}

export default function BranchList({
  branches,
  filter,
  className,
  ...props
}: Omit<BranchListProps, 'count' | 'height' | 'getItem'>) {
  return (
    <VirtualScrollArea
      count={branches.length}
      height={85}
      getItem={(idx: number) => {
        const item = branches[idx];
        return <BranchItem info={item} filter={filter} />;
      }}
      className={cn('h-full min-h-0', className)}
      {...props}
    />
  );
}
