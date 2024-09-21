import { stringToColor } from '@/lib/stringColor';
import { cn } from '@/lib/utils';
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
            <Avatar
                className={cn(className)}
                {...stringAvatar(userName[0])}
                {...props}
            />
        );
    }

    return (
        <AvatarGroup>
            {userName.map(item => {
                return (
                    <Avatar
                        key={item}
                        {...stringAvatar(item)}
                        title={item}
                        alt={item}
                        {...props}
                    />
                );
            })}
        </AvatarGroup>
    );
}
