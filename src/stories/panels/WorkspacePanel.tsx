import type { FileStatus, FileTree } from '@/bindings';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaFolderTree } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import ChangeCard from '@/stories/atoms/ChangeCard';
import { DEFAULT_STYLE } from '@/lib/style';
import Link from 'next/link';
import { useAppState } from '@/lib/state';

export interface WorkspacePanelProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    branchName: string;
    upstream?: string;
    files?: FileTree[];
    changeSet: FileStatus[];
}

export default function WorkspacePanel({
    className,
    branchName,
    upstream,
    changeSet,
    ...props
}: WorkspacePanelProps) {
    const { t } = useTranslation();
    const [tree] = useAppState(s => [s.files]);

    return (
        <div className={cn('flex flex-col gap-2', className)} {...props}>
            <div className={cn('p-4 border rounded-xl shadow', DEFAULT_STYLE)}>
                <div className="pb-2">
                    <div className="pb-2">{branchName}</div>
                    {upstream && <Badge>{upstream}</Badge>}
                </div>
                <Separator />
                <div className="pt-2">
                    <div className="flex justify-between">
                        <Button disabled={true}>
                            {t('workspace.set_as_default')}
                        </Button>
                        <Button>{t('workspace.create_pr')}</Button>
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    'flex flex-col gap-2 grow p-4 border rounded-xl shadow',
                    DEFAULT_STYLE,
                )}
            >
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <span>{t('workspace.changed_files')} </span>
                        <Avatar className="bg-gray-50 inline-block w-6 h-6">
                            <AvatarFallback>{changeSet.length}</AvatarFallback>
                        </Avatar>
                    </div>
                    <Link
                        href="/filetree"
                        className={cn(
                            tree.length === 0 && 'pointer-events-none',
                        )}
                    >
                        <FaFolderTree />
                    </Link>
                </div>
                <ChangeCard changeSet={changeSet} className="grow" />
            </div>
        </div>
    );
}
