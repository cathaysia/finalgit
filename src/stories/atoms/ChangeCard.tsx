import { commands, type FileStatus } from '@/bindings';
import { cn } from '@/lib/utils';
import type React from 'react';
import { Separator } from '@/components/ui/separator';
import Commiter from './Commiter';
import { useAppState, useRefreshRequest } from '@/lib/state';
import ChangeItem from './ChangeItem';
import { match } from 'ts-pattern';
import { useErrorState } from '@/lib/error';
import type { CheckedState } from '@radix-ui/react-checkbox';

export interface ChangeCardProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    changeSet: FileStatus[];
}

export default function ChangeCard({ className, changeSet }: ChangeCardProps) {
    const repoPath = useAppState(s => s.repoPath);
    const refreshStage = useRefreshRequest(s => s.refreshStage);
    const setError = useErrorState(s => s.setError);

    async function handleCheckedChange(e: CheckedState, item: FileStatus) {
        if (!repoPath) {
            return;
        }
        if (e === true) {
            const v = await commands?.addToStage(repoPath, [item.path]);
            match(v)
                .with({ status: 'ok' }, () => {
                    refreshStage();
                })
                .with({ status: 'error' }, err => {
                    setError(err.error);
                });
        }
        if (e === false) {
            const v = await commands?.removeFromStage(repoPath, [item.path]);
            match(v)
                .with({ status: 'ok' }, () => {
                    refreshStage();
                })
                .with({ status: 'error' }, err => {
                    setError(err.error);
                });
        }
    }

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className="grow flex flex-col gap-2">
                {changeSet.map(item => {
                    return (
                        <ChangeItem
                            key={item.path}
                            item={{
                                path: item.path,
                                status: item.status,
                            }}
                            onCheckedChange={async state =>
                                handleCheckedChange(state, item)
                            }
                        />
                    );
                })}
            </div>
            <Separator />
            <Commiter changeSet={changeSet} />
        </div>
    );
}
