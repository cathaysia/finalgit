'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface CommitPanelPlaceholderProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function CommitPanelPlaceholder({
  className,
  ...props
}: CommitPanelPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex h-full w-[380px] shrink-0 flex-col gap-2 rounded border border-dashed p-2 text-muted-foreground shadow',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 px-1 pt-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-7 w-7" />
      </div>
      <Skeleton className="h-8 w-full" />
      <div className="min-h-0 flex-1 space-y-2">
        {Array.from({ length: 100 }, (_, idx) => (
          <Skeleton key={idx} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
