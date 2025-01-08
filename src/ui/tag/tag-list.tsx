import type { TagInfo } from '@/bindings';
import { cn } from '@/lib/utils';
import { TagItem } from '@/ui/tag/tagitem';
import VirtualScrollArea from '../atoms/virtualscroll-area';

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
        height={85}
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
