import { commands, type BranchInfo } from '@/bindings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCodeBranch } from 'react-icons/fa';
import { match } from 'ts-pattern';
import BranchRename from './BranchRename';
import { Label } from '@/components/ui/label';
import { DEFAULT_STYLE } from '@/lib/style';
import NOTIFY from '@/lib/notify';

export interface BranchProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    info: BranchInfo;
    filter?: string;
    className?: string;
    onRename?: (name: string) => void;
    onDelete?: () => void;
}

enum OpState {
    Renaming = 1,
    NewBranch = 2,
}

export default function Branch({
    info,
    filter,
    onRename,
    onDelete,
    className,
    ...props
}: BranchProps) {
    const t = useTranslation().t;
    const [opState, setOpState] = useState<OpState>();
    const isHead = info.is_head;
    const branchName = info.name;
    const upstream = info.remote;
    const isLocal = info.kind === 'Local';
    const [repoPath, changes] = useAppState(s => [s.repoPath, s.changes]);
    const [refreshBranch] = useRefreshRequest(s => [s.refreshBranch]);
    const isDirty = changes.length !== 0;

    function removeBranch() {
        if (isLocal && repoPath) {
            commands?.removeBranch(repoPath, info).then(v => {
                match(v)
                    .with({ status: 'ok' }, () => {
                        refreshBranch();
                    })
                    .with({ status: 'error' }, err => {
                        NOTIFY.error(err.error);
                    });
            });
        }
    }

    async function checkout() {
        if (!repoPath) {
            return;
        }
        if (isLocal) {
            const v = await commands?.checkoutBranch(repoPath, info.name);
            match(v)
                .with({ status: 'ok' }, () => {
                    refreshBranch();
                })
                .with({ status: 'error' }, err => {
                    NOTIFY.error(err.error);
                });
        } else {
            const v = await commands?.checkoutRemote(repoPath, info.name);
            match(v)
                .with({ status: 'ok' }, () => {
                    refreshBranch();
                })
                .with({ status: 'error' }, err => {
                    NOTIFY.error(err.error);
                });
        }
    }

    async function renameBranch(newName: string) {
        if (!repoPath || !opState) {
            return;
        }
        if (opState === OpState.Renaming) {
            const res = await commands?.renameBranch(repoPath, info, newName);
            match(res)
                .with({ status: 'ok' }, () => {
                    refreshBranch();
                })
                .with({ status: 'error' }, err => {
                    NOTIFY.error(err.error);
                });
        } else {
            const res = await commands?.createBranch(
                repoPath,
                newName,
                info.commit,
            );
            match(res)
                .with({ status: 'ok' }, () => {
                    refreshBranch();
                })
                .with({ status: 'error' }, err => {
                    NOTIFY.error(err.error);
                });
        }
        setOpState(undefined);
    }

    if (opState) {
        return (
            <div
                className={cn(
                    'w-full flex justify-between border rounded-none px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2',
                    DEFAULT_STYLE,
                    isHead && 'border-green-600',
                    className,
                )}
                {...props}
            >
                <BranchRename
                    defaultValue={branchName}
                    onCancel={() => {
                        setOpState(undefined);
                    }}
                    onConfirm={renameBranch}
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                'w-full flex justify-between border rounded-none px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2',
                DEFAULT_STYLE,
                isHead && 'border-green-600 dark:border-green-600',
                className,
            )}
            {...props}
        >
            <div className="text-sm font-medium leading-none items-center flex gap-2 overflow-ellipsis overflow-x-hidden text-nowrap">
                <FaCodeBranch className="inline-block" />
                {(() => {
                    if (!filter) {
                        return <Label>{branchName}</Label>;
                    }
                    const v = branchName.replace(
                        filter,
                        `<span class="bg-yellow-300 dark:bg-yellow-500">${filter}</span>`,
                    );
                    return <Label dangerouslySetInnerHTML={{ __html: v }} />;
                })()}
                <Badge>
                    {isLocal ? t('branch.local') : t('branch.remote')}
                </Badge>
                {upstream && <Badge>{upstream}</Badge>}
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} size="sm">
                            <DotsHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => {
                                    setOpState(OpState.Renaming);
                                }}
                            >
                                {t('branch.rename')}
                            </DropdownMenuItem>
                            {!isHead && (
                                <DropdownMenuItem
                                    disabled={isDirty}
                                    onClick={() => {
                                        checkout();
                                    }}
                                    className={cn(
                                        !isLocal &&
                                            'text-yellow-500 hover:text-yellow-500',
                                    )}
                                    title={(() => {
                                        if (isDirty) {
                                            return t('branch.disable_dirty');
                                        }
                                        if (!isLocal) {
                                            return t('branch.checkout_remote');
                                        }
                                    })()}
                                >
                                    {t('branch.checkout')}
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                                onClick={() => {
                                    setOpState(OpState.NewBranch);
                                }}
                            >
                                {t('branch.create_new_branch')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {t('branch.details')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {t('branch.set_upstream')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {t('branch.pull')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {t('branch.push')}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                    removeBranch();
                                }}
                            >
                                {t('branch.delete')}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
