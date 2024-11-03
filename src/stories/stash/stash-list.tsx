import type { StashInfo } from '@/bindings';
import VirtualScrollArea from '../atoms/virtualscroll-area';
import StashItem from './stash-item';

export interface StashListProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof VirtualScrollArea>,
    'count' | 'height' | 'getItem'
  > {
  stashList: StashInfo[];
}

export default function StashList({
  className,
  stashList: stashs,
  ...props
}: StashListProps) {
  return (
    <VirtualScrollArea
      count={stashs.length}
      height={35}
      getItem={(idx: number): React.ReactElement => {
        const item = stashs[idx];
        return <StashItem key={item.oid} stash={item} />;
      }}
      className={className}
      {...props}
    />
  );
}
