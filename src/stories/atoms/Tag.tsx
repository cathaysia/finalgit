import type { TagInfo } from '@/bindings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTag } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export interface TagProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    info: TagInfo;
    filter?: string;
}
export function Tag({ info, filter, className, ...props }: TagProps) {
    const t = useTranslation().t;
    return (
        <div
            className={cn(
                'w-full flex justify-between border rounded-none px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2',
                className,
                DEFAULT_STYLE,
            )}
            {...props}
        >
            <span className="text-sm font-medium leading-none items-center flex gap-2">
                <FaTag className="inline-block" />
                {(() => {
                    console.log(filter);
                    if (!filter) {
                        return <span>{info.name}</span>;
                    }
                    const v = info.name.replace(
                        filter,
                        `<span class="bg-yellow-300 dark:bg-yellow-500">${filter}</span>`,
                    );
                    return <span dangerouslySetInnerHTML={{ __html: v }} />;
                })()}
                <Badge>{info.commit.slice(0, 6)}</Badge>
            </span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} size="sm">
                        <DotsHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <MdDelete className="text-red-600 mr-2 h-4 w-4" />
                            <span>{t('tag.delete')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="w-4 h-4 mr-2" />
                            <span>{t('branch.checkout')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="w-4 h-4 mr-2" />
                            <span>{t('tags.create_branch')}</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
