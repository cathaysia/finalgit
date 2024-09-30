import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import StashList from '../lists/StashList';
import type { StashInfo } from '@/bindings';
import { useState } from 'react';

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
      className={cn('w-full flex flex-col space-y-2', className)}
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
