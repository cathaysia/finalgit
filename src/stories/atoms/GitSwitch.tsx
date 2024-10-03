import { commands } from '@/bindings';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import NOTIFY from '@/lib/notify';
import { useAppState } from '@/lib/state';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { useDebounce } from 'use-debounce';

export interface GitSwitchProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  opt: string;
}

export default function GitSwitch({
  className,
  name,
  id,
  opt,
  ...props
}: GitSwitchProps) {
  const [repoPath] = useAppState(s => [s.repoPath]);
  const [value, setValue] = useState<boolean>(false);
  const [debounce] = useDebounce(value, 1000);

  async function getValue() {
    if (!repoPath) {
      return;
    }
    const res = await commands?.getConfig(repoPath, opt);
    match(res)
      .with({ status: 'ok' }, val => {
        if (val.data === 'true') {
          setValue(true);
        } else if (val.data === 'false') {
          setValue(false);
        }
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  useEffect(() => {
    getValue();
  }, [repoPath]);

  async function handleValueChange(value: boolean) {
    if (!repoPath) {
      return;
    }
    const res = await commands?.setConfig(
      repoPath,
      opt,
      value ? 'true' : 'false',
    );
    match(res)
      .with({ status: 'ok' }, _ => {})
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  useEffect(() => {
    if (!debounce) {
      return;
    }
    handleValueChange(debounce);
  }, [debounce]);

  return (
    <div className={cn('flex justify-between', className)} {...props}>
      <Label htmlFor={id}>{name}</Label>
      <Switch
        id={id}
        checked={value}
        onCheckedChange={e => {
          setValue(e.valueOf);
        }}
      />
    </div>
  );
}
