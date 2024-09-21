import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface BranchRenameProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onCancel?: () => void;
    onConfirm?: (name: string) => void;
}

export default function BranchRename({
    className,
    onCancel,
    onConfirm,
    defaultValue,
    ...props
}: BranchRenameProps) {
    const { t } = useTranslation();
    const [value, setValue] = useState<string>(defaultValue || '');

    return (
        <div className={cn('w-full flex justify-between gap-2', className)}>
            <Input
                className={cn('w-full h-', className)}
                type="text"
                autoFocus
                value={value}
                onChange={v => setValue(v.target.value)}
                onKeyUp={e => {
                    if (e.key === 'Escape') {
                        onCancel?.();
                    }
                    if (e.key === 'Enter') {
                        onConfirm?.(value);
                    }
                }}
                {...props}
            />
            <div className="flex gap-2">
                <Button
                    onClick={() => {
                        onConfirm?.(value);
                    }}
                >
                    {t('branch.apply')}
                </Button>
                <Button onClick={() => onCancel?.()} variant={'outline'}>
                    {t('Cancel')}
                </Button>
            </div>
        </div>
    );
}
