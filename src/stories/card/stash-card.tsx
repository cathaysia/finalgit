import type { StashInfo } from '@/bindings';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import StashList from '../lists/stash-list';

export interface StashCardProps
  extends React.ComponentProps<typeof Collapsible> {
  stashList: StashInfo[];
  defaultOpen?: boolean;
}

export default function StashCard({
  className,
  defaultOpen = false,
  stashList,
  style,
  ...props
}: Omit<StashCardProps, 'open' | 'onOpenCange'>) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      className={cn('flex w-full flex-col space-y-2', className)}
      onOpenChange={setIsOpen}
      style={{ width: 'var(--radix-popper-anchor-width)', ...style }}
      {...props}
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger asChild className="w-full items-center">
          {isOpen ? <GoTriangleDown /> : <GoTriangleUp />}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <StashList stashList={stashList} className="grow" />
      </CollapsibleContent>
    </Collapsible>
  );
}
