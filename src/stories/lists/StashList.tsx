import type { StashInfo } from '@/bindings';
import StashItem from '../atoms/StashItem';
import VirtualScrollArea from '../atoms/VirtualScrollArea';

export interface StashListProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  stashs: StashInfo[];
}

export default function StashList({
  className,
  stashs,
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
