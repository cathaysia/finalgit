import type { BranchInfo } from '@/bindings';
import { cn } from '@/lib/utils';
import BranchItem from '@/ui/branch/branch-item';
import VirtualScrollArea from '../atoms/virtualscroll-area';

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
      className={cn('min-h-0', className)}
      {...props}
    />
  );
}
