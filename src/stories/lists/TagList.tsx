import type { TagInfo } from '@/bindings';
import { TagItem } from '@/stories/atoms/TagItem';
import VirtualScrollArea from '../atoms/VirtualScrollArea';
import { cn } from '@/lib/utils';

export interface TagListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  tags: TagInfo[];
  filter?: string;
}

export function TagList({ tags, filter, className, ...props }: TagListProps) {
  return (
    <div className={cn('flex flex-col h-full', className)} {...props}>
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
