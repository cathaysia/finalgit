import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGhAvatar } from '@/hooks/gh';
import { stringToColor } from '@/lib/string2color';

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

interface UserAvatarProps extends React.ComponentProps<typeof Avatar> {
  userName: string;
}

export function UserAvatar({ userName, ...props }: UserAvatarProps) {
  const { data: src } = useGhAvatar(userName);
  const { bgColor, text } = stringAvatar(userName);
  return (
    <Avatar className="text-center text-2xl" {...props}>
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
