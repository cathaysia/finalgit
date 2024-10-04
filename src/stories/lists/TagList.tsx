import type { TagInfo } from '@/bindings';
import { cn } from '@/lib/utils';
import { TagItem } from '@/stories/atoms/TagItem';
import VirtualScrollArea from '../atoms/VirtualScrollArea';

export interface TagListProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof VirtualScrollArea>,
    'count' | 'height' | 'getItem'
  > {
  tags: TagInfo[];
  filter?: string;
}

export function TagList({ tags, filter, className, ...props }: TagListProps) {
  return (
    <div className={cn('flex h-full flex-col', className)} {...props}>
      <VirtualScrollArea
        count={tags.length}
        height={60}
        getItem={(idx: number) => {
          const item = tags[idx];
          return <TagItem info={item} filter={filter} />;
        }}
        className={className}
        {...props}
      />
    </div>
  );
}
