import type { StashInfo } from '@/bindings';
import StashItem from '../atoms/StashItem';

export interface StashListProps {
  stashs: StashInfo[];
}

export default function StashList({ stashs }: StashListProps) {
  return (
    <>
      {stashs.map(item => {
        return <StashItem key={item.oid} stash={item} />;
      })}
    </>
  );
}
