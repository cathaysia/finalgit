'use client';

import RawTooltip from '@mui/material/Tooltip';

import { cn } from '@/lib/utils';
import React from 'react';

export const Tooltip = React.forwardRef<
  React.ElementRef<typeof RawTooltip>,
  React.ComponentPropsWithoutRef<typeof RawTooltip>
>(({ className, ...props }, ref) => (
  <RawTooltip
    ref={ref}
    classes={{
      tooltip: cn(
        'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      ),
    }}
    {...props}
  />
));
