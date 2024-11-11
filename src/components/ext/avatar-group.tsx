import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const avatarGroupVariant = cva('flex *:ring *:ring-background', {
  variants: {
    orientation: {
      row: 'flex-row -space-x-3',
      col: 'flex-col -space-y-3',
    },
  },
  defaultVariants: {
    orientation: 'row',
  },
});

export interface AvatarGroupProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariant> {}

export function AvatarGroup({
  orientation,
  className,
  children,
  ...props
}: AvatarGroupProps) {
  return (
    <div
      className={cn(
        avatarGroupVariant({
          orientation,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
