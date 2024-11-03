import { useGhAvatar } from '@/hooks/gh';
import { cn } from '@/lib/utils';
import { stringToColor } from '@/utils/string2color';
import { Avatar, AvatarGroup } from '@mui/material';

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
    sx: {
      bgcolor: stringToColor(name),
    },
    children: tag,
  };
}

export interface UserAvatarProps extends React.ComponentProps<typeof Avatar> {
  userName: string[];
}

export default function UserAvatar({
  className,
  userName,
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
    <AvatarGroup>
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
    </AvatarGroup>
  );
}

interface UserAvatarItemProps extends React.ComponentProps<typeof Avatar> {
  userName: string;
}

function UserAvatarItem({ userName, ...props }: UserAvatarItemProps) {
  const { data: src } = useGhAvatar(userName);
  return (
    <Avatar
      {...stringAvatar(userName)}
      title={userName}
      alt={userName}
      src={src}
      {...props}
    />
  );
}