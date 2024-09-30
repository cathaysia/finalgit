import type { BranchInfo } from '@/bindings';
import BranchItem from '@/stories/atoms/BranchItem';
import VirtualScrollArea from '../atoms/VirtualScrollArea';
import { cn } from '@/lib/utils';

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
      className={cn('min-h-0 h-full', className)}
      {...props}
    />
  );
}
