import { stringToColor } from "@/lib/stringColor";
import { cn } from "@/lib/utils";
import { Avatar, AvatarGroup } from "@mui/material";

function stringAvatar(name: string) {
    let tag = null;
    if (tag == null) {
        const sp = name.split(" ");
        if (sp[0] && sp[1]) {
            tag = `${sp[0][0]}${sp[1][0]}`.toUpperCase();
        }
    }
    if (tag == null) {
        const sp = name.split("-");
        if (sp[0] && sp[1]) {
            tag = `${sp[0][0]}${sp[1][0]}`.toUpperCase();
        }
    }
    if (tag == null) {
        const sp = name.split(".");
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
    user_name: string[];
}

export default function UserAvatar({
    className,
    user_name,
    ...props
}: UserAvatarProps) {
    if (user_name.length === 1) {
        return (
            <Avatar
                className={cn(className)}
                {...stringAvatar(user_name[0])}
                {...props}
            />
        );
    }

    return (
        <AvatarGroup>
            {user_name.map((item) => {
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