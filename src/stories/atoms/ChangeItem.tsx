import { commands, type FileStatus } from '@/bindings';
import { VscDiff, VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import GitFileStatus from '@/lib/file_status';
import { DEFAULT_STYLE } from '@/lib/style';
import { cn } from '@/lib/utils';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { match } from 'ts-pattern';
import NOTIFY from '@/lib/notify';

type CheckedState = boolean | 'indeterminate';
export interface ChangeItemProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    item: FileStatus;
    checked?: boolean;
    onCheckedChange?(checked: CheckedState): void;
}

export default function ChangeItem({
    className,
    item,
    onCheckedChange,
    ...props
}: ChangeItemProps) {
    const { t } = useTranslation();
    const [repoPath] = useAppState(s => [s.repoPath]);
    const [refreshStage] = useRefreshRequest(s => [s.refreshStage]);

    function getCheckedStatus(status: number) {
        const isIndexed = GitFileStatus.isIndexed(status);
        const isWt = GitFileStatus.isWt(status);
        if (isIndexed && isWt) {
            return 'indeterminate';
        }

        return isIndexed;
    }

    const isChecked = getCheckedStatus(item.status);

    return (
        <div
            className={cn('flex justify-between items-center', className)}
            {...props}
        >
            <div className="flex gap-2">
                <Checkbox
                    defaultChecked={GitFileStatus.isIndexed(item.status)}
                    checked={isChecked}
                    onCheckedChange={onCheckedChange}
                />
                <Label
                    className={DEFAULT_STYLE}
                    title={
                        ((item.status & GitFileStatus.WtModified ||
                            item.status & GitFileStatus.IndexModified) &&
                            t('change.modified')) ||
                        ((item.status & GitFileStatus.WtDeleted ||
                            item.status & GitFileStatus.IndexDeleted) &&
                            t('change.deleted')) ||
                        ((item.status & GitFileStatus.WtNew ||
                            item.status & GitFileStatus.IndexNew) &&
                            t('change.new_file')) ||
                        undefined
                    }
                >
                    {item.path}
                </Label>
            </div>
            <div className="flex items-center">
                <div
                    key={item.path}
                    className={cn(
                        'w-3 h-3 rounded-lg',
                        (item.status & GitFileStatus.WtModified ||
                            item.status & GitFileStatus.IndexModified) &&
                            'bg-yellow-600',
                        (item.status & GitFileStatus.WtDeleted ||
                            item.status & GitFileStatus.IndexDeleted) &&
                            'bg-red-600',
                        (item.status & GitFileStatus.WtNew ||
                            item.status & GitFileStatus.IndexNew) &&
                            'bg-green-600',
                    )}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} size="sm">
                            <DotsHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className={cn(isChecked && 'hidden')}
                                onClick={async () => {
                                    if (!repoPath) {
                                        return;
                                    }
                                    const v = await commands.addToStage(
                                        repoPath,
                                        [item.path],
                                    );
                                    match(v)
                                        .with({ status: 'ok' }, () =>
                                            refreshStage(),
                                        )
                                        .with({ status: 'error' }, err =>
                                            NOTIFY.error(err.error),
                                        );
                                }}
                            >
                                <VscDiffAdded className="w-4 h-4 mr-2" />
                                {t('changes.add')}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className={cn(!isChecked && 'hidden')}
                                onClick={async () => {
                                    if (!repoPath) {
                                        return;
                                    }
                                    const v = await commands.removeFromStage(
                                        repoPath,
                                        [item.path],
                                    );
                                    match(v)
                                        .with({ status: 'ok' }, () =>
                                            refreshStage(),
                                        )
                                        .with({ status: 'error' }, err =>
                                            NOTIFY.error(err.error),
                                        );
                                }}
                            >
                                <VscDiffRemoved className="w-4 h-4 mr-2" />
                                {t('changes.unstage')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <VscDiff className="w-4 h-4 mr-2" />
                                {t('changes.diff')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <VscDiffRemoved className="w-4 h-4 mr-2" />
                                {t('changes.discard')}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
