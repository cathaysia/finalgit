import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGhAvatar } from '@/hooks/gh';
import { cn } from '@/lib/utils';
import { stringToColor } from '@/utils/string2color';
import { type VariantProps, cva } from 'class-variance-authority';

function stringAvatar(name: string) {
  let tag = null;
  if (tag == null) {
    const sp = name.split(' ');
    if (sp[0] && sp[1]) {
      tag = `${sp[0][0]}${sp[1][0]}`.toUpperCase();
    }
  }
  if (tag == null) {
    const sp = name.split('-');
    if (sp[0] && sp[1]) {
      tag = `${sp[0][0]}${sp[1][0]}`.toUpperCase();
    }
  }
  if (tag == null) {
    const sp = name.split('.');
    if (sp[0] && sp[1]) {
      tag = `${sp[0][0]}${sp[1][0]}`.toUpperCase();
    }
  }
  if (tag == null) {
    tag = name.slice(0, 2).toUpperCase();
  }

  return {
    bgColor: stringToColor(name),
    text: tag,
  };
}

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

export interface UserAvatarProps
  extends React.ComponentProps<typeof Avatar>,
    VariantProps<typeof avatarGroupVariant> {
  userName: string[];
}

export default function UserAvatar({
  className,
  userName,
  orientation,
  ...props
}: UserAvatarProps) {
  if (userName.length === 1) {
    return (
      <UserAvatarItem
        className={cn(className)}
        userName={userName[0]}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        avatarGroupVariant({
          orientation,
        }),
      )}
    >
      {userName.map(item => {
        return (
          <UserAvatarItem
            className={className}
            key={item}
            userName={item}
            {...props}
          />
        );
      })}
    </div>
  );
}

interface UserAvatarItemProps extends React.ComponentProps<typeof Avatar> {
  userName: string;
}

function UserAvatarItem({ userName, ...props }: UserAvatarItemProps) {
  const { data: src } = useGhAvatar(userName);
  const { bgColor, text } = stringAvatar(userName);
  return (
    <Avatar className="text-center text-2xl" title={userName} {...props}>
      <AvatarImage src={src} />
      <AvatarFallback
        className="text-xl"
        style={{
          backgroundColor: bgColor,
        }}
      >
        {text}
      </AvatarFallback>
    </Avatar>
  );
}
