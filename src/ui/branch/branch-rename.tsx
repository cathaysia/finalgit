import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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
  const t = useTranslations();
  const [value, setValue] = useState<string>(defaultValue || '');

  return (
    <div
      className={cn(
        '@container/renamer flex w-full justify-between gap-2',
        className,
      )}
    >
      <datalist id="gitflow">
        <option value="bugfix" />
        <option value="feature" />
        <option value="release" />
        <option value="hotfix" />
        <option value="support" />
      </datalist>
      <Input
        list="gitflow"
        className={cn('w-full', className)}
        type="text"
        autoFocus
        autoCorrect="off"
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
      <div className="@sm/renamer:flex hidden @sm/renamer:gap-2">
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
