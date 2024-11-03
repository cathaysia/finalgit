import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
    <div
      className={cn(
        '@container/renamer flex w-full justify-between gap-2',
        className,
      )}
    >
      <Select defaultValue="none">
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('rename.kind')}</SelectLabel>
            <SelectItem value="none">none</SelectItem>
            <SelectItem value="bugfix">bugfix</SelectItem>
            <SelectItem value="feature">feature</SelectItem>
            <SelectItem value="release">release</SelectItem>
            <SelectItem value="hotfix">hotfix</SelectItem>
            <SelectItem value="support">support</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className={cn('w-full', className)}
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
