import { cn } from '@/lib/utils';
import type { StashInfo } from '@/bindings';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/components/ui/avatar';

export interface StashCardProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    info: StashInfo;
}

export default function StashCard({
    className,
    info,
    ...props
}: StashCardProps) {
    const { t } = useTranslation();
    return (
        <div className={cn(className)} {...props}>
            {info.message}
            <Avatar>{info.oid.slice(0, 6)}</Avatar>
        </div>
    );
}
