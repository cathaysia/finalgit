import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import React from 'react';

interface CollapseMenuGroupProps {
  trigger?: React.ReactNode;
  isOpen: boolean;
}

export function CollapseMenuGroup({
  isOpen,
  children,
  trigger,
}: React.PropsWithChildren<CollapseMenuGroupProps>) {
  return (
    <div>
      {trigger}
      <motion.div
        className={cn(
          'overflow-hidden border-r border-b border-l dark:border-zinc-800',
          !isOpen && 'border-transparent dark:border-transparent',
        )}
        variants={{
          visible: {
            height: 'auto',
            transition: { duration: 0.2 },
          },
          hidden: {
            height: 0,
            transition: { duration: 0.2 },
          },
        }}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    </div>
  );
}

export const CollapseGroupItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuItem>
>(({ className, ...props }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={cn(
      'flex justify-between gap-2 rounded-none dark:bg-zinc-900 dark:hover:bg-zinc-800',
      className,
    )}
    {...props}
  />
));

interface CollapseGroupTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuItem> {
  isOpen: boolean;
}

export const CollapseGroupTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  CollapseGroupTriggerProps
>(({ className, isOpen, children, ...props }, ref) => {
  return (
    <DropdownMenuItem
      ref={ref}
      className={cn(
        isOpen
          ? 'rounded-b-none border-t border-r border-l dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800'
          : 'border-transparent border-t border-r border-l',
      )}
      {...props}
    >
      <div className="item-center flex w-full justify-between gap-2 align-middle">
        <div>{children}</div>
        {isOpen ? (
          <ChevronDownIcon className="mt-1" />
        ) : (
          <ChevronUpIcon className="mt-1" />
        )}
      </div>
    </DropdownMenuItem>
  );
});
